import "server-only";

import { cache } from "react";
import { after } from "next/server";

import { CATEGORY_META } from "@/components/pages/tools/ai-readiness/bands";
import {
  recordAiReadinessLookup,
  type AiReadinessLookupWrite,
} from "@/lib/ai-readiness-lookups";
import { domainInputSchema, parseDomainParam } from "@/lib/domain-input";

export { parseDomainParam };

export type CheckStatus = "pass" | "warn" | "fail" | "skip";

export type ReadinessCategoryId = "crawl" | "identity" | "cite" | "extras";

export type ReadinessCheck = {
  id: string;
  category: ReadinessCategoryId;
  label: string;
  status: CheckStatus;
  detail: string;
  weight: number;
  score: number;
};

export type ReadinessCategoryScore = {
  id: ReadinessCategoryId;
  label: string;
  score: number;
  max: number;
};

export type ReadinessSnippet = {
  filename: string;
  code: string;
};

export type ReadinessAction = {
  id: string;
  title: string;
  why: string;
  impact: "High" | "Medium";
  snippet?: ReadinessSnippet;
};

export type AiReadinessReport = {
  domain: string;
  origin: string;
  score: number;
  summary: string;
  passed: number;
  warned: number;
  failed: number;
  checks: ReadinessCheck[];
  categories: ReadinessCategoryScore[];
  actions: ReadinessAction[];
};

const USER_AGENT =
  "AnnyAIReadinessChecker/1.0 (+https://anny.dodoxhq.com/tools/ai-readiness-checker)";

const FETCH_MS = 8_000;
const MAX_HTML_BYTES = 400_000;
const MAX_TEXT_BYTES = 80_000;
const MAX_REDIRECTS = 4;

const BRAND_SCHEMA_TYPES = new Set([
  "organization",
  "corporation",
  "localbusiness",
  "website",
  "softwareapplication",
  "person",
]);

const CITE_SCHEMA_TYPES = new Set(["faqpage", "howto", "article"]);

const OPENAI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User"] as const;
const OTHER_BOTS = ["ClaudeBot", "PerplexityBot"] as const;

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
          Accept:
            "text/html, text/plain, text/markdown, application/json, */*",
          "User-Agent": USER_AGENT,
        },
        cache: "force-cache",
        signal: AbortSignal.timeout(FETCH_MS),
        next: {
          revalidate: 3600,
          tags: ["ai-readiness"],
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

function isRealDocument(probeResult: Probe, kind: "text" | "json") {
  if (!probeResult.ok || probeResult.html) return false;
  if (kind === "json") {
    try {
      JSON.parse(probeResult.body);
      return true;
    } catch {
      const ct = probeResult.contentType.toLowerCase();
      return ct.includes("json") && !ct.includes("html");
    }
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

function collectJsonLd(html: string) {
  const types = new Set<string>();
  let sameAs = false;
  const re =
    /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = re.exec(html))) {
    const raw = match[1]
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .trim();
    if (!raw) continue;

    try {
      walkJsonLd(JSON.parse(raw), types, () => {
        sameAs = true;
      });
    } catch {
      // Invalid JSON-LD still counts as a block if the tag exists.
    }
  }

  return { types, sameAs };
}

function walkJsonLd(
  value: unknown,
  types: Set<string>,
  onSameAs: () => void,
) {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    for (const item of value) walkJsonLd(item, types, onSameAs);
    return;
  }

  const record = value as Record<string, unknown>;
  const type = record["@type"];
  if (typeof type === "string") {
    types.add(type);
  } else if (Array.isArray(type)) {
    for (const item of type) {
      if (typeof item === "string") types.add(item);
    }
  }

  if (record.sameAs != null) onSameAs();
  if (record["@graph"]) walkJsonLd(record["@graph"], types, onSameAs);
}

function decodeEntities(value: string) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTitle(html: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? decodeEntities(match[1].replace(/<[^>]+>/g, "")) : "";
}

function extractMeta(html: string, key: string) {
  const name = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `<meta\\b[^>]*(?:name|property)=["']${name}["'][^>]*content=["']([^"']*)["'][^>]*>|<meta\\b[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${name}["'][^>]*>`,
    "i",
  );
  const match = html.match(re);
  return decodeEntities(match?.[1] || match?.[2] || "");
}

function extractCanonical(html: string) {
  return /<link\b[^>]*rel=["']canonical["'][^>]*>/i.test(html);
}

function extractH1(html: string) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return "";
  return decodeEntities(match[1].replace(/<[^>]+>/g, ""));
}

function jsonLdBlockCount(html: string) {
  return (
    html.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi,
    )?.length ?? 0
  );
}

function botLine(allowed: boolean, name: string) {
  return allowed ? `${name} allowed` : `${name} blocked`;
}

function check(
  id: string,
  category: ReadinessCategoryId,
  label: string,
  weight: number,
  status: CheckStatus,
  detail: string,
  score?: number,
): ReadinessCheck {
  const awarded =
    score ??
    (status === "pass"
      ? weight
      : status === "warn"
        ? Math.round(weight / 2)
        : 0);
  return { id, category, label, status, detail, weight, score: awarded };
}

function buildSummary(
  domain: string,
  crawlOpen: boolean,
  brandNamed: boolean,
  actions: ReadinessAction[],
) {
  if (!crawlOpen) {
    return `${domain} is blocking at least one major AI crawler. Until those bots can fetch the site, ChatGPT and similar tools cannot reliably use it as a source.`;
  }
  if (!brandNamed) {
    return `Crawlers can reach ${domain}, but the homepage does not clearly name the brand in structured data. Models may crawl the page and still not know who it belongs to.`;
  }
  if (actions.length === 0) {
    return `${domain} is set up for AI crawlers to fetch and identify the brand. On-site readiness is in good shape — the next question is whether models actually mention you.`;
  }
  return `${domain} can be crawled. The highest-leverage on-site gaps are listed below — copy the snippets onto the site, then track whether ChatGPT cites the brand.`;
}

function buildActions({
  origin,
  domain,
  title,
  description,
  blockedBots,
  missingBrandSchema,
  missingLlms,
  missingMeta,
  missingSitemap,
}: {
  origin: string;
  domain: string;
  title: string;
  description: string;
  blockedBots: string[];
  missingBrandSchema: boolean;
  missingLlms: boolean;
  missingMeta: boolean;
  missingSitemap: boolean;
}): ReadinessAction[] {
  const brand = title || domain;
  const dek =
    description ||
    `${brand} — add a one-sentence description of what the company does.`;
  const actions: ReadinessAction[] = [];

  if (blockedBots.length > 0) {
    actions.push({
      id: "allow-bots",
      title: "Allow AI crawlers in robots.txt",
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

  if (missingBrandSchema) {
    actions.push({
      id: "org-jsonld",
      title: "Add Organization JSON-LD",
      why: "Answer engines use structured data to attach a name, URL, and entity to the page. Paste this in the homepage <head>.",
      impact: "High",
      snippet: {
        filename: "homepage <head>",
        code: `<script type="application/ld+json">
${JSON.stringify(
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand,
    url: origin,
    description: dek,
  },
  null,
  2,
)}
</script>`,
      },
    });
  }

  if (missingMeta) {
    actions.push({
      id: "meta",
      title: "Write a clear meta description",
      why: "If the page has no summary, models and crawlers have to guess what the company does from the rest of the HTML.",
      impact: "Medium",
      snippet: {
        filename: "homepage <head>",
        code: `<meta name="description" content="${dek.replace(/"/g, "'")}" />`,
      },
    });
  }

  if (missingSitemap) {
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

  if (missingLlms && actions.length < 3) {
    actions.push({
      id: "llms",
      title: "Optional: add a short llms.txt",
      why: "This does not rank you in ChatGPT. It does help coding agents and tool-using LLMs find the pages you actually want them to read.",
      impact: "Medium",
      snippet: {
        filename: "llms.txt",
        code: `# ${brand}\n\n> ${dek}\n\n## Site\n\n- [Home](${origin}/): Overview\n`,
      },
    });
  }

  return actions.slice(0, 3);
}

export const getAiReadiness = cache(async function getAiReadiness(
  domain: string,
): Promise<AiReadinessReport | { error: string }> {
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

  const [
    homepage,
    robots,
    llms,
    skillsIndex,
    agentsMd,
    sitemap,
  ] = await Promise.all([
    probe(`${origin}/`, MAX_HTML_BYTES),
    probe(`${origin}/robots.txt`, MAX_TEXT_BYTES),
    probe(`${origin}/llms.txt`, MAX_TEXT_BYTES),
    probe(`${origin}/.well-known/agent-skills/index.json`, MAX_TEXT_BYTES),
    probe(`${origin}/agents.md`, MAX_TEXT_BYTES),
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

  const html = homepage.ok && homepage.html ? homepage.body : "";
  const robotsReal = isRealDocument(robots, "text");
  const robotsGroups = robotsReal ? parseRobots(robots.body) : [];
  const starAllowed = robotsReal ? isPathAllowed(robotsGroups, "*") : true;

  const openai = OPENAI_BOTS.map((name) => ({
    name,
    allowed: robotsReal ? isPathAllowed(robotsGroups, name) : true,
  }));
  const others = OTHER_BOTS.map((name) => ({
    name,
    allowed: robotsReal ? isPathAllowed(robotsGroups, name) : true,
  }));
  const openaiAllowed = openai.filter((bot) => bot.allowed).length;
  const othersAllowed = others.filter((bot) => bot.allowed).length;
  const blockedBots = [...openai, ...others]
    .filter((bot) => !bot.allowed)
    .map((bot) => bot.name);

  const title = html ? extractTitle(html) : "";
  const description = html
    ? extractMeta(html, "description") || extractMeta(html, "og:description")
    : "";
  const h1 = html ? extractH1(html) : "";
  const canonical = html ? extractCanonical(html) : false;
  const ldCount = html ? jsonLdBlockCount(html) : 0;
  const jsonLd = html ? collectJsonLd(html) : { types: new Set<string>(), sameAs: false };
  const brandType = [...jsonLd.types].find((type) =>
    BRAND_SCHEMA_TYPES.has(type.toLowerCase()),
  );
  const citeType = [...jsonLd.types].find((type) =>
    CITE_SCHEMA_TYPES.has(type.toLowerCase()),
  );
  const sitemapReal =
    isRealDocument(sitemap, "text") ||
    (sitemap.ok && /<urlset|<sitemapindex/i.test(sitemap.body));
  const llmsReal = isRealDocument(llms, "text");
  const skillsReal =
    isRealDocument(skillsIndex, "json") || isRealDocument(agentsMd, "text");

  const checks: ReadinessCheck[] = [];

  checks.push(
    robotsReal
      ? check(
          "robots",
          "crawl",
          "robots.txt",
          8,
          "pass",
          "A real robots.txt is live — crawlers have an explicit map.",
        )
      : check(
          "robots",
          "crawl",
          "robots.txt",
          8,
          robots.html && robots.status === 200 ? "warn" : "fail",
          robots.html && robots.status === 200
            ? "That URL returns HTML, not a robots file."
            : "No robots.txt. Add one so AI bots know they are allowed.",
          robots.html && robots.status === 200 ? 2 : 0,
        ),
  );

  checks.push(
    check(
      "star-allow",
      "crawl",
      "Site is crawlable",
      8,
      starAllowed ? "pass" : "fail",
      starAllowed
        ? "User-agent * can fetch the homepage."
        : "User-agent * disallows the whole site — most crawlers will stop.",
    ),
  );

  checks.push(
    check(
      "openai-bots",
      "crawl",
      "OpenAI bots (training, search, live fetch)",
      12,
      openaiAllowed === OPENAI_BOTS.length
        ? "pass"
        : openaiAllowed === 0
          ? "fail"
          : "warn",
      openai.map((bot) => botLine(bot.allowed, bot.name)).join(" · "),
      Math.round((openaiAllowed / OPENAI_BOTS.length) * 12),
    ),
  );

  checks.push(
    check(
      "other-bots",
      "crawl",
      "Claude & Perplexity",
      7,
      othersAllowed === OTHER_BOTS.length
        ? "pass"
        : othersAllowed === 0
          ? "fail"
          : "warn",
      others.map((bot) => botLine(bot.allowed, bot.name)).join(" · "),
      Math.round((othersAllowed / OTHER_BOTS.length) * 7),
    ),
  );

  checks.push(
    check(
      "title",
      "identity",
      "Page title",
      8,
      title.length >= 8 ? "pass" : "fail",
      title
        ? title.length > 70
          ? `${title.slice(0, 70)}…`
          : title
        : "No <title>. Crawlers and models get no brand name from the tab.",
    ),
  );

  checks.push(
    check(
      "meta",
      "identity",
      "Meta description",
      6,
      description.length >= 40
        ? "pass"
        : description
          ? "warn"
          : "fail",
      description
        ? description.length > 140
          ? `${description.slice(0, 140)}…`
          : description
        : "No meta description — add a one-line “what we do.”",
    ),
  );

  checks.push(
    check(
      "h1",
      "identity",
      "H1 heading",
      6,
      h1 ? "pass" : "fail",
      h1 ? h1.slice(0, 120) : "No H1 on the homepage.",
    ),
  );

  checks.push(
    check(
      "brand-schema",
      "identity",
      "Brand structured data",
      15,
      brandType ? "pass" : ldCount > 0 ? "warn" : "fail",
      brandType
        ? `${brandType} markup is present.`
        : ldCount > 0
          ? "JSON-LD exists, but not Organization / WebSite / SoftwareApplication."
          : "No Organization JSON-LD. Models have no machine-readable brand name.",
    ),
  );

  checks.push(
    check(
      "sitemap",
      "cite",
      "Sitemap",
      6,
      sitemapReal ? "pass" : "fail",
      sitemapReal
        ? "sitemap.xml is reachable."
        : "No sitemap.xml — crawlers often never leave the homepage.",
    ),
  );

  checks.push(
    check(
      "canonical",
      "cite",
      "Canonical URL",
      5,
      canonical ? "pass" : "fail",
      canonical
        ? "A canonical link is present."
        : "No rel=canonical — duplicate URLs confuse citation.",
    ),
  );

  checks.push(
    check(
      "cite-schema",
      "cite",
      "FAQ / HowTo / Article schema",
      4,
      citeType ? "pass" : "skip",
      citeType
        ? `${citeType} markup can help answer engines reuse the page.`
        : "Optional. FAQ or HowTo schema helps when the page actually answers a question.",
    ),
  );

  checks.push(
    check(
      "sameas",
      "cite",
      "sameAs profile links",
      5,
      jsonLd.sameAs ? "pass" : "skip",
      jsonLd.sameAs
        ? "JSON-LD includes sameAs links to confirm the entity."
        : "Optional. sameAs (LinkedIn, Wikipedia, Crunchbase) helps disambiguate the brand.",
    ),
  );

  checks.push(
    check(
      "llms",
      "extras",
      "llms.txt",
      6,
      llmsReal ? "pass" : llms.html && llms.status === 200 ? "warn" : "skip",
      llmsReal
        ? "A real llms.txt is live. Useful for agents — not a ChatGPT ranking lever."
        : llms.html && llms.status === 200
          ? "HTTP 200 but the body is HTML, not a text file."
          : "Optional. A short llms.txt helps coding agents; it does not buy AI search traffic.",
      llmsReal ? 6 : 0,
    ),
  );

  checks.push(
    check(
      "agent-docs",
      "extras",
      "Agent docs",
      4,
      skillsReal ? "pass" : "skip",
      skillsReal
        ? "Agent-skills index or agents.md is present."
        : "Optional. Skill files help tool-using agents, not classic GEO.",
    ),
  );

  const counted = checks.filter((item) => item.status !== "skip");
  const available = counted.reduce((sum, item) => sum + item.weight, 0);
  const earned = counted.reduce((sum, item) => sum + item.score, 0);
  const score =
    available === 0 ? 0 : Math.min(100, Math.round((earned / available) * 100));

  const categoryIds: ReadinessCategoryId[] = [
    "crawl",
    "identity",
    "cite",
    "extras",
  ];

  const categories = categoryIds.map((id) => {
    const items = checks.filter(
      (item) => item.category === id && item.status !== "skip",
    );
    const skipped = checks.filter(
      (item) => item.category === id && item.status === "skip",
    );
    const max =
      items.reduce((sum, item) => sum + item.weight, 0) ||
      skipped.reduce((sum, item) => sum + item.weight, 0);
    return {
      id,
      label: CATEGORY_META[id].label,
      score: items.reduce((sum, item) => sum + item.score, 0),
      max,
    };
  });

  const actions = buildActions({
    origin,
    domain: parsed.data,
    title,
    description,
    blockedBots,
    missingBrandSchema: !brandType,
    missingLlms: !llmsReal,
    missingMeta: description.length < 40,
    missingSitemap: !sitemapReal,
  });

  const report: AiReadinessReport = {
    domain: parsed.data,
    origin,
    score,
    summary: buildSummary(
      parsed.data,
      starAllowed && openaiAllowed > 0,
      Boolean(brandType),
      actions,
    ),
    passed: counted.filter((item) => item.status === "pass").length,
    warned: counted.filter((item) => item.status === "warn").length,
    failed: counted.filter((item) => item.status === "fail").length,
    checks,
    categories,
    actions,
  };

  scheduleLookupRecord(parsed.data, origin, report);
  return report;
});

function toLookupWrite(
  domain: string,
  origin: string,
  result: AiReadinessReport | { error: string },
): AiReadinessLookupWrite {
  if ("error" in result) {
    return { domain, origin, status: "failed", error: result.error };
  }

  return {
    domain,
    origin,
    status: "success",
    score: result.score,
    summary: result.summary,
    actionIds: result.actions.map((action) => action.id),
    failedCheckIds: result.checks
      .filter((item) => item.status === "fail")
      .map((item) => item.id),
    passed: result.passed,
    warned: result.warned,
    failed: result.failed,
  };
}

function scheduleLookupRecord(
  domain: string,
  origin: string,
  result: AiReadinessReport | { error: string },
) {
  const write = toLookupWrite(domain, origin, result);

  after(async () => {
    try {
      await recordAiReadinessLookup(write);
    } catch (error) {
      console.error("[ai-readiness] failed to store lookup", error);
    }
  });
}
