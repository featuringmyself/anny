import "server-only";

import { cache } from "react";
import { after } from "next/server";

import { bandForScore } from "@/components/pages/tools/ai-crawlability/bands";
import { AI_CRAWL_BOTS } from "@/components/pages/tools/ai-crawlability/bots";
import {
  recordAiCrawlabilityLookup,
  type AiCrawlabilityLookupWrite,
} from "@/lib/ai-crawlability-lookups";
import { domainInputSchema, parseDomainParam } from "@/lib/domain-input";

export { parseDomainParam, AI_CRAWL_BOTS };

export type CrawlBotStatus = {
  agent: string;
  vendor: string;
  role: string;
  allowed: boolean;
};

export type CrawlSignal = {
  id: "robots" | "sitemap" | "llms" | "homepage";
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

export type CrawlAction = {
  id: string;
  title: string;
  why: string;
  impact: "High" | "Medium";
  snippet?: { filename: string; code: string };
};

export type AiCrawlabilityReport = {
  domain: string;
  origin: string;
  score: number;
  summary: string;
  robotsPresent: boolean;
  sitemapPresent: boolean;
  llmsPresent: boolean;
  homepageReachable: boolean;
  allowedCount: number;
  blockedCount: number;
  bots: CrawlBotStatus[];
  signals: CrawlSignal[];
  actions: CrawlAction[];
};

const USER_AGENT =
  "AnnyAICrawlabilityChecker/1.0 (+https://anny.dodoxhq.com/tools/ai-crawlability-checker)";

const FETCH_MS = 8_000;
const MAX_HTML_BYTES = 120_000;
const MAX_TEXT_BYTES = 80_000;
const MAX_REDIRECTS = 4;

type Probe = {
  url: string;
  ok: boolean;
  status: number;
  contentType: string;
  body: string;
  html: boolean;
};

type RobotsGroup = {
  agents: string[];
  rules: { allow: boolean; path: string }[];
};

function isBlockedHost(hostname: string) {
  const host = hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host.endsWith(".internal")
  ) {
    return true;
  }
  return /^\d{1,3}(?:\.\d{1,3}){3}$/.test(host);
}

function looksLikeHtml(contentType: string, body: string) {
  const ct = contentType.toLowerCase();
  if (ct.includes("text/html") || ct.includes("application/xhtml")) return true;
  const head = body.slice(0, 240).trim().toLowerCase();
  return head.startsWith("<!doctype") || head.startsWith("<html");
}

async function readLimited(response: Response, maxBytes: number) {
  const reader = response.body?.getReader();
  if (!reader) {
    const text = await response.text();
    return text.slice(0, maxBytes);
  }

  const chunks: Uint8Array[] = [];
  let received = 0;

  while (received < maxBytes) {
    const { done, value } = await reader.read();
    if (done) break;
    if (!value) continue;
    chunks.push(value);
    received += value.byteLength;
  }

  try {
    await reader.cancel();
  } catch {
    // ignore
  }

  const merged = new Uint8Array(Math.min(received, maxBytes));
  let offset = 0;
  for (const chunk of chunks) {
    const slice = chunk.subarray(0, merged.length - offset);
    merged.set(slice, offset);
    offset += slice.length;
    if (offset >= merged.length) break;
  }

  return new TextDecoder("utf-8", { fatal: false }).decode(merged);
}

async function probe(url: string, maxBytes: number): Promise<Probe> {
  const empty: Probe = {
    url,
    ok: false,
    status: 0,
    contentType: "",
    body: "",
    html: false,
  };

  try {
    let current = url;

    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      const response = await fetch(current, {
        method: "GET",
        redirect: "manual",
        headers: {
          Accept: "text/html, text/plain, text/markdown, application/xml, */*",
          "User-Agent": USER_AGENT,
        },
        cache: "force-cache",
        signal: AbortSignal.timeout(FETCH_MS),
        next: {
          revalidate: 3600,
          tags: ["ai-crawlability"],
        },
      });

      if ([301, 302, 303, 307, 308].includes(response.status)) {
        const location = response.headers.get("location");
        if (!location || hop === MAX_REDIRECTS) {
          return { ...empty, url: current, status: response.status };
        }

        const nextUrl = new URL(location, current);
        if (nextUrl.protocol !== "https:" && nextUrl.protocol !== "http:") {
          return { ...empty, url: current, status: response.status };
        }
        if (isBlockedHost(nextUrl.hostname)) {
          return { ...empty, url: current, status: response.status };
        }
        current = nextUrl.toString();
        continue;
      }

      const contentType = response.headers.get("content-type") ?? "";
      const body = await readLimited(response, maxBytes);
      const html = looksLikeHtml(contentType, body);
      const ok = response.ok && body.trim().length > 0;

      return {
        url: current,
        ok,
        status: response.status,
        contentType,
        body,
        html,
      };
    }
  } catch {
    return empty;
  }

  return empty;
}

function isRealDocument(probeResult: Probe, kind: "text" | "xml") {
  if (!probeResult.ok || probeResult.html) return false;
  if (kind === "xml") {
    return (
      /<urlset|<sitemapindex/i.test(probeResult.body) ||
      probeResult.contentType.toLowerCase().includes("xml")
    );
  }
  return probeResult.body.trim().length >= 20;
}

function parseRobots(text: string): RobotsGroup[] {
  const groups: RobotsGroup[] = [];
  let current: RobotsGroup | null = null;
  let expectingAgent = true;

  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, "").trim();
    if (!line) continue;

    const colon = line.indexOf(":");
    if (colon === -1) continue;

    const key = line.slice(0, colon).trim().toLowerCase();
    const value = line.slice(colon + 1).trim();

    if (key === "user-agent") {
      if (!current || !expectingAgent) {
        current = { agents: [value.toLowerCase()], rules: [] };
        groups.push(current);
      } else {
        current.agents.push(value.toLowerCase());
      }
      expectingAgent = true;
      continue;
    }

    if (!current) continue;
    expectingAgent = false;

    if (key === "disallow") {
      current.rules.push({ allow: false, path: value || "/" });
    } else if (key === "allow") {
      current.rules.push({ allow: true, path: value || "/" });
    }
  }

  return groups;
}

/** Whether `/` is allowed for this user-agent under robots.txt rules. */
function isPathAllowed(groups: RobotsGroup[], agent: string) {
  const needle = agent.toLowerCase();
  const specific = groups.filter((group) =>
    group.agents.some((name) => name === needle),
  );
  const wildcard = groups.filter((group) =>
    group.agents.some((name) => name === "*"),
  );
  const applicable = specific.length > 0 ? specific : wildcard;

  if (applicable.length === 0) return true;

  let best: { allow: boolean; score: number } | null = null;

  for (const group of applicable) {
    for (const rule of group.rules) {
      const prefix = rule.path === "" ? "/" : rule.path;
      if (prefix !== "/") continue;
      const score = prefix.length;
      if (!best || score >= best.score) {
        best = { allow: rule.allow, score };
      }
    }
  }

  return best ? best.allow : true;
}

function buildSummary(
  domain: string,
  bots: CrawlBotStatus[],
  robotsPresent: boolean,
  sitemapPresent: boolean,
  llmsPresent: boolean,
) {
  const blocked = bots.filter((bot) => !bot.allowed);
  const allowed = bots.length - blocked.length;

  if (blocked.length === bots.length) {
    return `${domain} blocks every major AI crawler we check. Until those bots can fetch the site, ChatGPT, Claude, and Perplexity cannot use it as a source.`;
  }
  if (blocked.length > 0) {
    return `${domain} allows ${allowed} of ${bots.length} AI crawlers, but blocks ${blocked.map((b) => b.agent).join(", ")}. Fix those rules first.`;
  }
  if (!robotsPresent) {
    return `${domain} is reachable and no AI bot is explicitly blocked, but there is no robots.txt. Add one so crawlers have a clear map.`;
  }
  if (!sitemapPresent && !llmsPresent) {
    return `Major AI crawlers can fetch ${domain}. Add a sitemap and an optional llms.txt so agents discover more than the homepage.`;
  }
  if (!sitemapPresent) {
    return `AI crawlers can fetch ${domain} and llms.txt is live. A sitemap.xml would still help them find deeper pages.`;
  }
  if (!llmsPresent) {
    return `AI crawlers can fetch ${domain} and the sitemap is live. An optional llms.txt helps coding agents find the pages you care about.`;
  }
  return `${domain} looks open to major AI crawlers. robots.txt, sitemap, and llms.txt are all present.`;
}

function buildActions({
  origin,
  domain,
  blockedBots,
  robotsPresent,
  sitemapPresent,
  llmsPresent,
}: {
  origin: string;
  domain: string;
  blockedBots: string[];
  robotsPresent: boolean;
  sitemapPresent: boolean;
  llmsPresent: boolean;
}): CrawlAction[] {
  const actions: CrawlAction[] = [];

  if (blockedBots.length > 0) {
    actions.push({
      id: "allow-bots",
      title: "Allow blocked AI crawlers in robots.txt",
      why: "Training, search, and live-answer bots each need access. If they are blocked, no amount of content work helps.",
      impact: "High",
      snippet: {
        filename: "robots.txt (append)",
        code: blockedBots
          .map((bot) => `User-agent: ${bot}\nAllow: /`)
          .join("\n\n"),
      },
    });
  }

  if (!robotsPresent) {
    actions.push({
      id: "add-robots",
      title: "Publish a robots.txt with AI bot rules",
      why: "Without robots.txt, crawlers guess. Explicit Allow rules for major AI bots make intent clear.",
      impact: "High",
      snippet: {
        filename: "robots.txt",
        code: `User-agent: *\nAllow: /\n\n${AI_CRAWL_BOTS.slice(0, 8)
          .map((bot) => `User-agent: ${bot.agent}\nAllow: /`)
          .join("\n\n")}\n\nSitemap: ${origin}/sitemap.xml\n`,
      },
    });
  }

  if (!sitemapPresent) {
    actions.push({
      id: "sitemap",
      title: "Publish a sitemap",
      why: "A sitemap.xml is the map crawlers use after the homepage. Without it they often stop at /.",
      impact: "Medium",
      snippet: {
        filename: "robots.txt (append)",
        code: `Sitemap: ${origin}/sitemap.xml`,
      },
    });
  }

  if (!llmsPresent && actions.length < 3) {
    actions.push({
      id: "llms",
      title: "Optional: add a short llms.txt",
      why: "This does not rank you in ChatGPT. It does help coding agents and tool-using LLMs find the pages you want them to read.",
      impact: "Medium",
      snippet: {
        filename: "llms.txt",
        code: `# ${domain}\n\n> Add a one-sentence description of what the company does.\n\n## Site\n\n- [Home](${origin}/): Overview\n`,
      },
    });
  }

  return actions.slice(0, 3);
}

function scoreReport({
  homepageReachable,
  robotsPresent,
  sitemapPresent,
  llmsPresent,
  allowedCount,
  totalBots,
}: {
  homepageReachable: boolean;
  robotsPresent: boolean;
  sitemapPresent: boolean;
  llmsPresent: boolean;
  allowedCount: number;
  totalBots: number;
}) {
  let score = 0;

  if (homepageReachable) score += 15;
  if (robotsPresent) score += 15;
  else if (homepageReachable) score += 5;

  const botShare = totalBots === 0 ? 0 : allowedCount / totalBots;
  score += Math.round(botShare * 50);

  if (sitemapPresent) score += 10;
  if (llmsPresent) score += 10;

  return Math.min(100, Math.max(0, score));
}

export const getAiCrawlability = cache(async function getAiCrawlability(
  domain: string,
): Promise<AiCrawlabilityReport | { error: string }> {
  const parsed = domainInputSchema.safeParse(domain);

  if (!parsed.success) {
    return {
      error: parsed.error.issues[0]?.message ?? "Enter a valid domain.",
    };
  }

  if (isBlockedHost(parsed.data)) {
    return { error: "Enter a public website." };
  }

  const origin = `https://${parsed.data}`;

  const [homepage, robots, llms, sitemap] = await Promise.all([
    probe(`${origin}/`, MAX_HTML_BYTES),
    probe(`${origin}/robots.txt`, MAX_TEXT_BYTES),
    probe(`${origin}/llms.txt`, MAX_TEXT_BYTES),
    probe(`${origin}/sitemap.xml`, MAX_TEXT_BYTES),
  ]);

  const reached = homepage.status > 0 || robots.status > 0;

  if (!reached) {
    const result = {
      error: "Couldn’t reach that site. Try again in a moment.",
    };
    scheduleLookupRecord(parsed.data, origin, result);
    return result;
  }

  const homepageReachable = homepage.ok;
  const robotsPresent = isRealDocument(robots, "text");
  const robotsGroups = robotsPresent ? parseRobots(robots.body) : [];
  const sitemapPresent =
    isRealDocument(sitemap, "xml") ||
    (sitemap.ok && /<urlset|<sitemapindex/i.test(sitemap.body));
  const llmsPresent = isRealDocument(llms, "text");

  const bots: CrawlBotStatus[] = AI_CRAWL_BOTS.map((bot) => ({
    agent: bot.agent,
    vendor: bot.vendor,
    role: bot.role,
    allowed: robotsPresent ? isPathAllowed(robotsGroups, bot.agent) : true,
  }));

  const allowedCount = bots.filter((bot) => bot.allowed).length;
  const blockedCount = bots.length - allowedCount;
  const blockedBots = bots.filter((bot) => !bot.allowed).map((bot) => bot.agent);

  const signals: CrawlSignal[] = [
    homepageReachable
      ? {
          id: "homepage",
          label: "Homepage",
          status: "pass",
          detail: "The site responds and can be fetched.",
        }
      : {
          id: "homepage",
          label: "Homepage",
          status: "fail",
          detail: "We could not load the homepage over HTTPS.",
        },
    robotsPresent
      ? {
          id: "robots",
          label: "robots.txt",
          status: "pass",
          detail: "A real robots.txt is live for crawlers.",
        }
      : {
          id: "robots",
          label: "robots.txt",
          status: "warn",
          detail: "No robots.txt. Crawlers lack an explicit map.",
        },
    sitemapPresent
      ? {
          id: "sitemap",
          label: "sitemap.xml",
          status: "pass",
          detail: "A sitemap is published for deeper discovery.",
        }
      : {
          id: "sitemap",
          label: "sitemap.xml",
          status: "warn",
          detail: "No sitemap.xml. Crawlers may stop at /.",
        },
    llmsPresent
      ? {
          id: "llms",
          label: "llms.txt",
          status: "pass",
          detail: "llms.txt is live for agent discovery.",
        }
      : {
          id: "llms",
          label: "llms.txt",
          status: "warn",
          detail: "No llms.txt. Optional, but useful for coding agents.",
        },
  ];

  const actions = buildActions({
    origin,
    domain: parsed.data,
    blockedBots,
    robotsPresent,
    sitemapPresent,
    llmsPresent,
  });

  const score = scoreReport({
    homepageReachable,
    robotsPresent,
    sitemapPresent,
    llmsPresent,
    allowedCount,
    totalBots: bots.length,
  });

  const report: AiCrawlabilityReport = {
    domain: parsed.data,
    origin,
    score,
    summary: buildSummary(
      parsed.data,
      bots,
      robotsPresent,
      sitemapPresent,
      llmsPresent,
    ),
    robotsPresent,
    sitemapPresent,
    llmsPresent,
    homepageReachable,
    allowedCount,
    blockedCount,
    bots,
    signals,
    actions,
  };

  scheduleLookupRecord(parsed.data, origin, report);
  return report;
});

function scheduleLookupRecord(
  domain: string,
  origin: string,
  result: AiCrawlabilityReport | { error: string },
) {
  after(async () => {
    try {
      const write: AiCrawlabilityLookupWrite =
        "error" in result
          ? { domain, origin, error: result.error }
          : {
              domain,
              origin,
              score: result.score,
              band: bandForScore(result.score).label,
              allowedCount: result.allowedCount,
              blockedCount: result.blockedCount,
              robotsPresent: result.robotsPresent,
              sitemapPresent: result.sitemapPresent,
              llmsPresent: result.llmsPresent,
              actionCount: result.actions.length,
            };
      await recordAiCrawlabilityLookup(write);
    } catch (error) {
      console.error("[ai-crawlability] failed to store lookup", error);
    }
  });
}
