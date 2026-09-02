import "server-only";

import type { ReadinessReport } from "@/components/pages/audits/types";
import {
  SCAN_PHASE_LABELS,
  SCAN_PHASE_ORDER,
  type ScanPhaseId,
} from "@/lib/ai-readiness-scan-phases";

export type { ScanPhaseId };
export { SCAN_PHASE_LABELS, SCAN_PHASE_ORDER };

export type ScanPhaseResult = {
  phase: ScanPhaseId;
  partial: Partial<ReadinessReport>;
  detail: string;
};

const USER_AGENT =
  "AnnyAIReadinessChecker/1.0 (+https://anny.dodoxhq.com/tools/ai-readiness-checker)";

const FETCH_MS = 8_000;
const MAX_HTML_BYTES = 400_000;
const MAX_TEXT_BYTES = 80_000;
const MAX_REDIRECTS = 4;
const MAX_PAGES = 5;
const CRAWL_CONCURRENCY = 3;
const PHASE_TIMEOUT_MS = 45_000;

const BRAND_SCHEMA_TYPES = new Set([
  "organization",
  "corporation",
  "localbusiness",
  "website",
  "softwareapplication",
  "person",
]);

const CITE_SCHEMA_TYPES = new Set(["faqpage", "howto", "article"]);

export const AI_AGENT_BOTS = [
  { agent: "GPTBot", vendor: "OpenAI" },
  { agent: "OAI-SearchBot", vendor: "OpenAI" },
  { agent: "ChatGPT-User", vendor: "OpenAI" },
  { agent: "anthropic-ai", vendor: "Anthropic" },
  { agent: "ClaudeBot", vendor: "Anthropic" },
  { agent: "claude-web", vendor: "Anthropic" },
  { agent: "Google-Extended", vendor: "Google" },
  { agent: "PerplexityBot", vendor: "Perplexity" },
  { agent: "cohere-ai", vendor: "Cohere" },
  { agent: "Amazonbot", vendor: "Amazon" },
  { agent: "Applebot", vendor: "Apple" },
  { agent: "Applebot-Extended", vendor: "Apple" },
  { agent: "BingBot", vendor: "Microsoft" },
  { agent: "FacebookBot", vendor: "Meta" },
  { agent: "LinkedInBot", vendor: "LinkedIn" },
  { agent: "Bytespider", vendor: "ByteDance" },
  { agent: "DuckAssistBot", vendor: "DuckDuckGo" },
  { agent: "AI2Bot", vendor: "Allen Institute" },
  { agent: "CCBot", vendor: "Common Crawl" },
  { agent: "Diffbot", vendor: "Diffbot" },
  { agent: "omgili", vendor: "Omgili" },
  { agent: "YouBot", vendor: "You.com" },
  { agent: "MistralAI-User", vendor: "Mistral" },
] as const;

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

export type ScannedPage = {
  url: string;
  ok: boolean;
  html: string;
};

export type FormFinding = {
  severity: "P1" | "P2";
  groupId: string;
  title: string;
  example: string;
};

export type FullScanContext = {
  domain: string;
  origin: string;
  company: string;
  quickScore?: number;
  email?: string;
  reportId: string;
  pages: ScannedPage[];
  probes: Map<string, Probe>;
  robotsGroups: RobotsGroup[];
  robotsReal: boolean;
  sitemapReal: boolean;
  sitemapUrlCount: number;
  sitemapLastmod?: string;
  jsonLdTypes: Set<string>;
  jsonLdValid: boolean;
  jsonLdBlocks: number;
  title: string;
  description: string;
  canonicalPages: number;
  h1Count: number;
  h2Count: number;
  h3Count: number;
  questionHeadings: number;
  totalImages: number;
  missingAlt: number;
  genericAlt: number;
  internalLinks: number;
  externalLinks: number;
  semanticLandmarks: number;
  semanticDivs: number;
  semanticSpans: number;
  footerYear?: number;
  formFindings: FormFinding[];
  captchaDetected: boolean;
  homepageImages: number;
  homepageMissingAlt: number;
  homepageGenericAlt: number;
  homepageWords: number;
  homepageH1: number;
  llmsReal: boolean;
  agentsMdReal: boolean;
  skillsIndexReal: boolean;
  skillMdReal: boolean;
  ucpReal: boolean;
  mcpLinkFound: boolean;
  discoveryProbes: Record<string, boolean>;
};

function isBlockedHost(hostname: string) {
  const host = hostname.toLowerCase();
  if (
    host === "localhost" ||
    host.endsWith(".local") ||
    host.endsWith(".internal") ||
    /^\d+\.\d+\.\d+\.\d+$/.test(host) ||
    host.startsWith("127.") ||
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  ) {
    return true;
  }
  return false;
}

function looksLikeHtml(contentType: string, body: string) {
  const ct = contentType.toLowerCase();
  if (ct.includes("html")) return true;
  return /<!doctype html|<html[\s>]/i.test(body.slice(0, 500));
}

async function readLimited(response: Response, maxBytes: number) {
  const reader = response.body?.getReader();
  if (!reader) return "";

  const chunks: Uint8Array[] = [];
  let total = 0;

  while (total < maxBytes) {
    const { done, value } = await reader.read();
    if (done || !value) break;
    chunks.push(value);
    total += value.byteLength;
  }

  reader.cancel().catch(() => undefined);

  const merged = new Uint8Array(Math.min(total, maxBytes));
  let offset = 0;
  for (const chunk of chunks) {
    const slice = chunk.subarray(0, maxBytes - offset);
    merged.set(slice, offset);
    offset += slice.byteLength;
    if (offset >= maxBytes) break;
  }

  return new TextDecoder("utf-8", { fatal: false }).decode(merged);
}

export async function probe(url: string, maxBytes: number): Promise<Probe> {
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
        cache: "no-store",
        signal: AbortSignal.timeout(FETCH_MS),
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

function countTag(html: string, tag: string) {
  const re = new RegExp(`<${tag}\\b`, "gi");
  return html.match(re)?.length ?? 0;
}

function collectJsonLd(html: string) {
  const types = new Set<string>();
  let parseErrors = 0;
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
      walkJsonLd(JSON.parse(raw), types);
    } catch {
      parseErrors += 1;
    }
  }

  return { types, parseErrors, blockCount: (html.match(re)?.length ?? 0) || 0 };
}

function walkJsonLd(value: unknown, types: Set<string>) {
  if (!value || typeof value !== "object") return;

  if (Array.isArray(value)) {
    for (const item of value) walkJsonLd(item, types);
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

  if (record["@graph"]) walkJsonLd(record["@graph"], types);
}

function countQuestionHeadings(html: string) {
  const headings = [
    ...html.matchAll(/<h[1-6][^>]*>([\s\S]*?)<\/h[1-6]>/gi),
  ];
  let count = 0;
  for (const match of headings) {
    const text = decodeEntities(match[1].replace(/<[^>]+>/g, ""));
    if (/\?/.test(text) || /^(what|why|how|when|where|who)\b/i.test(text)) {
      count += 1;
    }
  }
  return count;
}

function analyzeImages(html: string) {
  const tags = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  let missingAlt = 0;
  let genericAlt = 0;

  for (const tag of tags) {
    const altMatch = tag.match(/\balt\s*=\s*["']([^"']*)["']/i);
    const alt = altMatch?.[1]?.trim() ?? "";
    if (!alt) {
      missingAlt += 1;
      continue;
    }
    if (
      /^(image|img|photo|picture|hero\s*\d|logo)$/i.test(alt) ||
      alt.length < 4
    ) {
      genericAlt += 1;
    }
  }

  return { total: tags.length, missingAlt, genericAlt };
}

function analyzeLinks(html: string, origin: string) {
  const originHost = new URL(origin).hostname.replace(/^www\./, "");
  let internal = 0;
  let external = 0;

  for (const match of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
    const href = match[1].trim();
    if (!href || href.startsWith("#") || href.startsWith("mailto:")) continue;
    if (href.startsWith("/")) {
      internal += 1;
      continue;
    }
    try {
      const url = new URL(href, origin);
      const host = url.hostname.replace(/^www\./, "");
      if (host === originHost) internal += 1;
      else external += 1;
    } catch {
      continue;
    }
  }

  return { internal, external };
}

function analyzeSemantics(html: string) {
  const landmarks =
    (html.match(/<(header|nav|main|section|footer|article|aside)\b/gi) || [])
      .length;
  const divs = countTag(html, "div");
  const spans = countTag(html, "span");
  return { landmarks, divs, spans };
}

function isHomepageUrl(url: string, origin: string) {
  try {
    const parsed = new URL(url);
    const base = new URL(origin);
    return parsed.origin === base.origin && (parsed.pathname === "/" || parsed.pathname === "");
  } catch {
    return false;
  }
}

function countVisibleWords(html: string) {
  const text = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!text) return 0;
  return text.split(/\s+/).length;
}

function extractFooterYear(html: string) {
  const match = html.match(/©\s*(\d{4})|copyright\s*(\d{4})/i);
  const year = Number(match?.[1] || match?.[2]);
  return Number.isFinite(year) ? year : undefined;
}

function extractSitemapLastmod(xml: string) {
  const match = xml.match(/<lastmod>([^<]+)<\/lastmod>/i);
  return match?.[1]?.trim();
}

function parseSitemapUrls(xml: string, origin: string, limit: number) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)]
    .map((m) => m[1].trim())
    .filter((url) => {
      try {
        const parsed = new URL(url);
        return (
          parsed.origin === origin &&
          !/\.(jpg|jpeg|png|gif|webp|pdf|zip|xml)$/i.test(parsed.pathname)
        );
      } catch {
        return false;
      }
    });

  const unique = [...new Set(urls)];
  return unique.slice(0, limit);
}

function inputHasLabel(html: string, inputTag: string) {
  const idMatch = inputTag.match(/\bid\s*=\s*["']([^"']+)["']/i);
  if (idMatch) {
    const id = idMatch[1].replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (new RegExp(`<label\\b[^>]*for=["']${id}["']`, "i").test(html)) {
      return true;
    }
  }

  const nameMatch = inputTag.match(/\bname\s*=\s*["']([^"']+)["']/i);
  if (nameMatch && /aria-label\s*=|aria-labelledby\s*=|placeholder\s*=/i.test(inputTag)) {
    return true;
  }

  return false;
}

function analyzeForms(html: string): FormFinding[] {
  const findings: FormFinding[] = [];

  if (/captcha|g-recaptcha|hcaptcha|turnstile/i.test(html)) {
    findings.push({
      severity: "P1",
      groupId: "auto-captcha",
      title: "CAPTCHA detected",
      example: "Page body · CAPTCHA present",
    });
  }

  const inputs = [...html.matchAll(/<input\b[^>]*>/gi)].map((m) => m[0]);
  for (const input of inputs) {
    const typeMatch = input.match(/\btype\s*=\s*["']([^"']+)["']/i);
    const type = (typeMatch?.[1] || "text").toLowerCase();
    if (["hidden", "submit", "button", "checkbox", "radio", "image"].includes(type)) {
      continue;
    }

    if (!inputHasLabel(html, input)) {
      findings.push({
        severity: "P1",
        groupId: "auto-labels",
        title: "Missing programmatic labels on real inputs",
        example: input.slice(0, 120),
      });
    }

    if (!/\bautocomplete\s*=/i.test(input)) {
      findings.push({
        severity: "P2",
        groupId: "auto-autocomplete",
        title: "Missing autocomplete on form fields",
        example: input.slice(0, 120),
      });
    }
  }

  return findings;
}

async function mapPool<T, R>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await fn(items[current]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  return results;
}

export function createScanContext(input: {
  domain: string;
  origin: string;
  reportId: string;
  quickScore?: number;
  email?: string;
}): FullScanContext {
  const company = input.domain.replace(/^www\./, "");
  return {
    domain: input.domain,
    origin: input.origin,
    company,
    quickScore: input.quickScore,
    email: input.email,
    reportId: input.reportId,
    pages: [],
    probes: new Map(),
    robotsGroups: [],
    robotsReal: false,
    sitemapReal: false,
    sitemapUrlCount: 0,
    jsonLdTypes: new Set(),
    jsonLdValid: true,
    jsonLdBlocks: 0,
    title: "",
    description: "",
    canonicalPages: 0,
    h1Count: 0,
    h2Count: 0,
    h3Count: 0,
    questionHeadings: 0,
    totalImages: 0,
    missingAlt: 0,
    genericAlt: 0,
    internalLinks: 0,
    externalLinks: 0,
    semanticLandmarks: 0,
    semanticDivs: 0,
    semanticSpans: 0,
    formFindings: [],
    captchaDetected: false,
    homepageImages: 0,
    homepageMissingAlt: 0,
    homepageGenericAlt: 0,
    homepageWords: 0,
    homepageH1: 0,
    llmsReal: false,
    agentsMdReal: false,
    skillsIndexReal: false,
    skillMdReal: false,
    ucpReal: false,
    mcpLinkFound: false,
    discoveryProbes: {},
  };
}

function aggregatePageMetrics(ctx: FullScanContext) {
  ctx.title = "";
  ctx.description = "";
  ctx.canonicalPages = 0;
  ctx.h1Count = 0;
  ctx.h2Count = 0;
  ctx.h3Count = 0;
  ctx.questionHeadings = 0;
  ctx.totalImages = 0;
  ctx.missingAlt = 0;
  ctx.genericAlt = 0;
  ctx.internalLinks = 0;
  ctx.externalLinks = 0;
  ctx.semanticLandmarks = 0;
  ctx.semanticDivs = 0;
  ctx.semanticSpans = 0;
  ctx.jsonLdTypes = new Set();
  ctx.jsonLdValid = true;
  ctx.jsonLdBlocks = 0;
  ctx.formFindings = [];
  ctx.captchaDetected = false;
  ctx.mcpLinkFound = false;
  ctx.footerYear = undefined;
  ctx.homepageImages = 0;
  ctx.homepageMissingAlt = 0;
  ctx.homepageGenericAlt = 0;
  ctx.homepageWords = 0;
  ctx.homepageH1 = 0;

  for (const page of ctx.pages) {
    if (!page.ok || !page.html) continue;
    const html = page.html;

    if (!ctx.title) {
      ctx.title = extractTitle(html);
      ctx.description =
        extractMeta(html, "description") ||
        extractMeta(html, "og:description");
    }

    if (extractCanonical(html)) ctx.canonicalPages += 1;

    ctx.h1Count += countTag(html, "h1");
    ctx.h2Count += countTag(html, "h2");
    ctx.h3Count += countTag(html, "h3");
    ctx.questionHeadings += countQuestionHeadings(html);

    const images = analyzeImages(html);
    ctx.totalImages += images.total;
    ctx.missingAlt += images.missingAlt;
    ctx.genericAlt += images.genericAlt;

    const links = analyzeLinks(html, ctx.origin);
    ctx.internalLinks += links.internal;
    ctx.externalLinks += links.external;

    const semantics = analyzeSemantics(html);
    ctx.semanticLandmarks += semantics.landmarks;
    ctx.semanticDivs += semantics.divs;
    ctx.semanticSpans += semantics.spans;

    const jsonLd = collectJsonLd(html);
    for (const type of jsonLd.types) ctx.jsonLdTypes.add(type);
    if (jsonLd.parseErrors > 0) ctx.jsonLdValid = false;
    ctx.jsonLdBlocks += jsonLd.blockCount;

    if (/captcha|g-recaptcha|hcaptcha|turnstile/i.test(html)) {
      ctx.captchaDetected = true;
    }
    if (/<link\b[^>]*rel=["']mcp["']/i.test(html)) {
      ctx.mcpLinkFound = true;
    }

    ctx.formFindings.push(...analyzeForms(html));

    const year = extractFooterYear(html);
    if (year) ctx.footerYear = year;

    if (isHomepageUrl(page.url, ctx.origin)) {
      const homeImages = analyzeImages(html);
      ctx.homepageImages = homeImages.total;
      ctx.homepageMissingAlt = homeImages.missingAlt;
      ctx.homepageGenericAlt = homeImages.genericAlt;
      ctx.homepageWords = countVisibleWords(html);
      ctx.homepageH1 = countTag(html, "h1");
    }
  }
}

async function runCrawlPhase(ctx: FullScanContext): Promise<string> {
  const homepageProbe = await probe(`${ctx.origin}/`, MAX_HTML_BYTES);
  ctx.probes.set("homepage", homepageProbe);

  const sitemapProbe = await probe(`${ctx.origin}/sitemap.xml`, MAX_TEXT_BYTES);
  ctx.probes.set("sitemap", sitemapProbe);
  ctx.sitemapReal =
    isRealDocument(sitemapProbe, "text") ||
    (sitemapProbe.ok && /<urlset|<sitemapindex/i.test(sitemapProbe.body));

  let urls = [`${ctx.origin}/`];
  if (ctx.sitemapReal) {
    ctx.sitemapLastmod = extractSitemapLastmod(sitemapProbe.body);
    const fromSitemap = parseSitemapUrls(
      sitemapProbe.body,
      ctx.origin,
      MAX_PAGES,
    );
    ctx.sitemapUrlCount = fromSitemap.length;
    urls = [...new Set([`${ctx.origin}/`, ...fromSitemap])].slice(0, MAX_PAGES);
  }

  const fetched = await mapPool(urls, CRAWL_CONCURRENCY, async (url) => {
    if (url === homepageProbe.url && homepageProbe.ok && homepageProbe.html) {
      return { url: homepageProbe.url, ok: true, html: homepageProbe.body };
    }
    const result = await probe(url, MAX_HTML_BYTES);
    return {
      url: result.url,
      ok: result.ok && result.html,
      html: result.html ? result.body : "",
    };
  });

  ctx.pages = fetched.filter((page) => page.ok);
  if (ctx.pages.length === 0 && homepageProbe.body) {
    ctx.pages = [
      {
        url: homepageProbe.url,
        ok: homepageProbe.ok,
        html: homepageProbe.html ? homepageProbe.body : "",
      },
    ];
  }

  aggregatePageMetrics(ctx);
  return `${ctx.pages.length} page${ctx.pages.length === 1 ? "" : "s"}`;
}

async function runSiteFilesPhase(ctx: FullScanContext): Promise<string> {
  const [robots, llms, agentsMd, skillsIndex, skillMd, ucp] = await Promise.all([
    probe(`${ctx.origin}/robots.txt`, MAX_TEXT_BYTES),
    probe(`${ctx.origin}/llms.txt`, MAX_TEXT_BYTES),
    probe(`${ctx.origin}/agents.md`, MAX_TEXT_BYTES),
    probe(`${ctx.origin}/.well-known/agent-skills/index.json`, MAX_TEXT_BYTES),
    probe(`${ctx.origin}/skill.md`, MAX_TEXT_BYTES),
    probe(`${ctx.origin}/.well-known/ucp`, MAX_TEXT_BYTES),
  ]);

  ctx.probes.set("robots", robots);
  ctx.probes.set("llms", llms);
  ctx.probes.set("agentsMd", agentsMd);
  ctx.probes.set("skillsIndex", skillsIndex);
  ctx.probes.set("skillMd", skillMd);
  ctx.probes.set("ucp", ucp);

  ctx.robotsReal = isRealDocument(robots, "text");
  ctx.robotsGroups = ctx.robotsReal ? parseRobots(robots.body) : [];
  ctx.llmsReal = isRealDocument(llms, "text");
  ctx.agentsMdReal = isRealDocument(agentsMd, "text");
  ctx.skillsIndexReal = isRealDocument(skillsIndex, "json");
  ctx.skillMdReal = isRealDocument(skillMd, "text");
  ctx.ucpReal =
    isRealDocument(ucp, "json") ||
    (ucp.ok && !ucp.html && ucp.body.trim().length > 10);

  const parts = [
    ctx.robotsReal ? "robots.txt" : "no robots.txt",
    ctx.sitemapReal ? "sitemap" : "no sitemap",
    ctx.llmsReal ? "llms.txt" : "no llms.txt",
  ];
  return parts.join(" · ");
}

async function runAgentsPhase(ctx: FullScanContext): Promise<string> {
  const discoveryUrls = {
    webmcp: `${ctx.origin}/.well-known/webmcp/tools.json`,
    mcpJson: `${ctx.origin}/.well-known/mcp.json`,
    serverCard: `${ctx.origin}/.well-known/mcp/server-card.json`,
  };

  const [webmcp, mcpJson, serverCard] = await Promise.all([
    probe(discoveryUrls.webmcp, MAX_TEXT_BYTES),
    probe(discoveryUrls.mcpJson, MAX_TEXT_BYTES),
    probe(discoveryUrls.serverCard, MAX_TEXT_BYTES),
  ]);

  ctx.discoveryProbes = {
    webmcp: isRealDocument(webmcp, "json"),
    mcpJson: isRealDocument(mcpJson, "json"),
    serverCard: isRealDocument(serverCard, "json"),
  };

  const allowed = AI_AGENT_BOTS.filter(({ agent }) =>
    ctx.robotsReal ? isPathAllowed(ctx.robotsGroups, agent) : true,
  ).length;

  return `${allowed}/${AI_AGENT_BOTS.length} agents allowed`;
}

export function getBrandSchemaType(types: Set<string>) {
  return [...types].find((type) => BRAND_SCHEMA_TYPES.has(type.toLowerCase()));
}

export function getCiteSchemaType(types: Set<string>) {
  return [...types].find((type) => CITE_SCHEMA_TYPES.has(type.toLowerCase()));
}

export function semanticRatio(ctx: FullScanContext) {
  const total = ctx.semanticLandmarks + ctx.semanticDivs + ctx.semanticSpans;
  if (total === 0) return 0;
  return ctx.semanticLandmarks / total;
}

export function isAgentAllowed(ctx: FullScanContext, agent: string) {
  return ctx.robotsReal ? isPathAllowed(ctx.robotsGroups, agent) : true;
}

export async function runReadinessScanPhase(
  phase: ScanPhaseId,
  ctx: FullScanContext,
  onDetail?: (detail: string) => void,
): Promise<ScanPhaseResult> {
  const run = async (): Promise<string> => {
    switch (phase) {
      case "crawl": {
        const detail = await runCrawlPhase(ctx);
        onDetail?.(`Reading ${ctx.pages[ctx.pages.length - 1]?.url ?? ctx.origin}…`);
        return detail;
      }
      case "site_files":
        return runSiteFilesPhase(ctx);
      case "seo_schema":
        aggregatePageMetrics(ctx);
        return `${ctx.title ? "title OK" : "no title"} · ${ctx.jsonLdBlocks} JSON-LD block${ctx.jsonLdBlocks === 1 ? "" : "s"}`;
      case "content_images":
        aggregatePageMetrics(ctx);
        return `${ctx.totalImages} images · ${ctx.h1Count} H1`;
      case "automation":
        aggregatePageMetrics(ctx);
        return `${ctx.formFindings.length} form finding${ctx.formFindings.length === 1 ? "" : "s"}`;
      case "agents":
        return runAgentsPhase(ctx);
      case "synthesis":
        aggregatePageMetrics(ctx);
        return "Score and recommendations";
      default:
        return "";
    }
  };

  const detail = await Promise.race([
    run(),
    new Promise<string>((_, reject) =>
      setTimeout(() => reject(new Error(`Phase ${phase} timed out`)), PHASE_TIMEOUT_MS),
    ),
  ]);

  const { mapPhaseToPartial } = await import("@/lib/ai-readiness-to-report");
  const partial = mapPhaseToPartial(phase, ctx);

  return { phase, partial, detail };
}
