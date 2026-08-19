import "server-only";

import { cache } from "react";

import { domainInputSchema, parseDomainParam } from "@/lib/domain-input";

export { parseDomainParam };

export type CheckStatus = "pass" | "warn" | "fail";

export type ReadinessCategoryId =
  | "crawl"
  | "discovery"
  | "schema"
  | "semantics";

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

export type AiReadinessReport = {
  domain: string;
  origin: string;
  score: number;
  passed: number;
  warned: number;
  failed: number;
  checks: ReadinessCheck[];
  categories: ReadinessCategoryScore[];
};

const USER_AGENT =
  "AnnyAIReadinessChecker/1.0 (+https://anny.dodoxhq.com/tools/ai-readiness-checker)";

const FETCH_MS = 8_000;
const MAX_HTML_BYTES = 400_000;
const MAX_TEXT_BYTES = 80_000;
const MAX_REDIRECTS = 4;

const USEFUL_SCHEMA_TYPES = new Set([
  "organization",
  "localbusiness",
  "website",
  "webpage",
  "softwareapplication",
  "product",
  "faqpage",
  "article",
  "person",
  "breadcrumblist",
]);

const AI_AGENTS = [
  { id: "gptbot", label: "GPTBot", vendor: "OpenAI", weight: 3 },
  { id: "oai-searchbot", label: "OAI-SearchBot", vendor: "OpenAI", weight: 3 },
  { id: "claudebot", label: "ClaudeBot", vendor: "Anthropic", weight: 3 },
  {
    id: "perplexitybot",
    label: "PerplexityBot",
    vendor: "Perplexity",
    weight: 3,
  },
] as const;

export const CATEGORY_META: Record<
  ReadinessCategoryId,
  { label: string; copy: string }
> = {
  crawl: {
    label: "Crawl access",
    copy: "robots.txt exists, and major AI crawlers are allowed in.",
  },
  discovery: {
    label: "Agent discovery",
    copy: "llms.txt, skill files, and MCP cards agents can actually read.",
  },
  schema: {
    label: "Structured data",
    copy: "JSON-LD so models can name the brand, product, and page.",
  },
  semantics: {
    label: "HTML semantics",
    copy: "Landmarks and a real heading so the page isn’t a wall of divs.",
  },
};

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
        signal: AbortSignal.timeout(FETCH_MS),
        next: { revalidate: 3600 },
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

function collectJsonLdTypes(html: string) {
  const types = new Set<string>();
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
      walkTypes(JSON.parse(raw), types);
    } catch {
      // Invalid JSON-LD still counts as a block if the tag exists.
    }
  }

  return types;
}

function walkTypes(value: unknown, types: Set<string>) {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    for (const item of value) walkTypes(item, types);
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

  if (record["@graph"]) walkTypes(record["@graph"], types);
}

function countTag(html: string, tag: string) {
  const re = new RegExp(`<${tag}\\b`, "gi");
  return html.match(re)?.length ?? 0;
}

function hasTag(html: string, tag: string) {
  return countTag(html, tag) > 0;
}

function hasH1(html: string) {
  return /<h1\b/i.test(html);
}

function hasMcpLink(html: string) {
  return /<link\b[^>]*rel=["'][^"']*\bmcp\b[^"']*["']/i.test(html);
}

function jsonLdBlockCount(html: string) {
  return (
    html.match(
      /<script[^>]*type=["']application\/ld\+json["'][^>]*>/gi,
    )?.length ?? 0
  );
}

function check(
  id: string,
  category: ReadinessCategoryId,
  label: string,
  weight: number,
  status: CheckStatus,
  detail: string,
  score = status === "pass" ? weight : status === "warn" ? Math.round(weight / 2) : 0,
): ReadinessCheck {
  return { id, category, label, status, detail, weight, score };
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
    llmsFull,
    skillsIndex,
    skillMd,
    agentsMd,
    mcpJson,
    mcpCard,
  ] = await Promise.all([
    probe(`${origin}/`, MAX_HTML_BYTES),
    probe(`${origin}/robots.txt`, MAX_TEXT_BYTES),
    probe(`${origin}/llms.txt`, MAX_TEXT_BYTES),
    probe(`${origin}/llms-full.txt`, MAX_TEXT_BYTES),
    probe(`${origin}/.well-known/agent-skills/index.json`, MAX_TEXT_BYTES),
    probe(`${origin}/skill.md`, MAX_TEXT_BYTES),
    probe(`${origin}/agents.md`, MAX_TEXT_BYTES),
    probe(`${origin}/.well-known/mcp.json`, MAX_TEXT_BYTES),
    probe(`${origin}/.well-known/mcp/server-card.json`, MAX_TEXT_BYTES),
  ]);

  const reached =
    homepage.status > 0 ||
    robots.status > 0 ||
    llms.status > 0 ||
    skillsIndex.status > 0;

  if (!reached) {
    return { error: "Couldn’t reach that site. Try again in a moment." };
  }

  const html = homepage.ok && homepage.html ? homepage.body : "";
  const robotsReal = isRealDocument(robots, "text");
  const robotsGroups = robotsReal ? parseRobots(robots.body) : [];
  const starAllowed = robotsReal ? isPathAllowed(robotsGroups, "*") : true;

  const checks: ReadinessCheck[] = [];

  if (!robotsReal) {
    checks.push(
      check(
        "robots",
        "crawl",
        "robots.txt",
        8,
        robots.html && robots.status === 200 ? "warn" : "fail",
        robots.html && robots.status === 200
          ? "That URL returns HTML, not a robots file."
          : "No robots.txt — crawlers get no explicit map.",
        robots.html && robots.status === 200 ? 2 : 0,
      ),
    );
  } else {
    checks.push(
      check(
        "robots",
        "crawl",
        "robots.txt",
        8,
        "pass",
        "A real robots.txt is live.",
      ),
    );
  }

  checks.push(
    check(
      "star-allow",
      "crawl",
      "Default crawl (*)",
      4,
      starAllowed ? "pass" : "fail",
      starAllowed
        ? "The catch-all user-agent is allowed at /."
        : "User-agent * disallows the whole site.",
    ),
  );

  for (const agent of AI_AGENTS) {
    const allowed = robotsReal
      ? isPathAllowed(robotsGroups, agent.label)
      : true;
    checks.push(
      check(
        agent.id,
        "crawl",
        agent.label,
        agent.weight,
        allowed ? "pass" : "fail",
        allowed
          ? `${agent.vendor} can fetch the homepage.`
          : `${agent.vendor} is disallowed at /.`,
      ),
    );
  }

  const llmsReal = isRealDocument(llms, "text");
  checks.push(
    check(
      "llms",
      "discovery",
      "llms.txt",
      12,
      llmsReal ? "pass" : llms.html && llms.status === 200 ? "warn" : "fail",
      llmsReal
        ? "A real llms.txt is available for agents."
        : llms.html && llms.status === 200
          ? "HTTP 200 but the body is HTML — a SPA shell, not a file."
          : "No llms.txt. Agents have no curated map of the site.",
      llmsReal ? 12 : 0,
    ),
  );

  const llmsFullReal = isRealDocument(llmsFull, "text");
  checks.push(
    check(
      "llms-full",
      "discovery",
      "llms-full.txt",
      4,
      llmsFullReal ? "pass" : "fail",
      llmsFullReal
        ? "Long-form agent brief is present."
        : "No llms-full.txt (optional, but useful).",
    ),
  );

  const skillsReal = isRealDocument(skillsIndex, "json");
  checks.push(
    check(
      "agent-skills",
      "discovery",
      "Agent skills index",
      8,
      skillsReal ? "pass" : skillsIndex.html && skillsIndex.status === 200 ? "warn" : "fail",
      skillsReal
        ? "/.well-known/agent-skills/index.json is real JSON."
        : skillsIndex.html && skillsIndex.status === 200
          ? "Skills URL returns HTML, not JSON."
          : "No agent-skills index.",
      skillsReal ? 8 : 0,
    ),
  );

  const skillFile =
    isRealDocument(skillMd, "text") || isRealDocument(agentsMd, "text");
  checks.push(
    check(
      "skill-md",
      "discovery",
      "skill.md / agents.md",
      4,
      skillFile ? "pass" : "fail",
      skillFile
        ? "A markdown skill or agents file is present."
        : "No /skill.md or /agents.md.",
    ),
  );

  const mcp =
    hasMcpLink(html) ||
    isRealDocument(mcpJson, "json") ||
    isRealDocument(mcpCard, "json");
  checks.push(
    check(
      "mcp",
      "discovery",
      "MCP discovery",
      4,
      mcp ? "pass" : "fail",
      mcp
        ? "An MCP link or well-known card was found."
        : "No MCP link or well-known server card.",
    ),
  );

  const ldCount = html ? jsonLdBlockCount(html) : 0;
  const types = html ? collectJsonLdTypes(html) : new Set<string>();
  const usefulType = [...types].some((type) =>
    USEFUL_SCHEMA_TYPES.has(type.toLowerCase()),
  );

  checks.push(
    check(
      "jsonld",
      "schema",
      "JSON-LD",
      12,
      ldCount > 0 ? "pass" : "fail",
      ldCount > 0
        ? `${ldCount} JSON-LD block${ldCount === 1 ? "" : "s"} on the homepage.`
        : homepage.ok
          ? "Homepage has no JSON-LD."
          : "Couldn’t read the homepage HTML.",
    ),
  );

  checks.push(
    check(
      "schema-type",
      "schema",
      "Useful schema types",
      10,
      usefulType ? "pass" : ldCount > 0 ? "warn" : "fail",
      usefulType
        ? [...types].slice(0, 4).join(", ")
        : ldCount > 0
          ? "JSON-LD is present, but not a common entity type."
          : "No Organization, WebSite, or WebPage markup.",
    ),
  );

  const main = hasTag(html, "main");
  const headerOrNav = hasTag(html, "header") || hasTag(html, "nav");
  const footer = hasTag(html, "footer");
  const sectionOrArticle = hasTag(html, "section") || hasTag(html, "article");

  checks.push(
    check(
      "main",
      "semantics",
      "<main> landmark",
      6,
      main ? "pass" : "fail",
      main ? "A main landmark is present." : "No <main> on the homepage.",
    ),
  );
  checks.push(
    check(
      "header",
      "semantics",
      "Header / nav",
      4,
      headerOrNav ? "pass" : "fail",
      headerOrNav ? "Header or nav landmark found." : "No <header> or <nav>.",
    ),
  );
  checks.push(
    check(
      "footer",
      "semantics",
      "<footer>",
      4,
      footer ? "pass" : "fail",
      footer ? "A footer landmark is present." : "No <footer>.",
    ),
  );
  checks.push(
    check(
      "sections",
      "semantics",
      "Sections / articles",
      4,
      sectionOrArticle ? "pass" : "fail",
      sectionOrArticle
        ? "Section or article tags are in use."
        : "No <section> or <article> — likely a div-heavy tree.",
    ),
  );
  checks.push(
    check(
      "h1",
      "semantics",
      "H1 heading",
      4,
      hasH1(html) ? "pass" : "fail",
      hasH1(html) ? "An H1 is present." : "No H1 on the homepage.",
    ),
  );

  const score = Math.min(
    100,
    checks.reduce((sum, item) => sum + item.score, 0),
  );

  const categoryIds: ReadinessCategoryId[] = [
    "crawl",
    "discovery",
    "schema",
    "semantics",
  ];

  const categories = categoryIds.map((id) => {
    const items = checks.filter((item) => item.category === id);
    return {
      id,
      label: CATEGORY_META[id].label,
      score: items.reduce((sum, item) => sum + item.score, 0),
      max: items.reduce((sum, item) => sum + item.weight, 0),
    };
  });

  return {
    domain: parsed.data,
    origin,
    score,
    passed: checks.filter((item) => item.status === "pass").length,
    warned: checks.filter((item) => item.status === "warn").length,
    failed: checks.filter((item) => item.status === "fail").length,
    checks,
    categories,
  };
});
