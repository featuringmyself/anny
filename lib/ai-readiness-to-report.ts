import type {
  ReadinessAutomation,
  ReadinessCategory,
  ReadinessInsight,
  ReadinessQuickWin,
  ReadinessReport,
  ReadinessStatus,
} from "@/components/pages/audits/types";
import { bandForScore } from "@/components/pages/tools/ai-readiness/bands";
import {
  AI_AGENT_BOTS,
  type FullScanContext,
  type ScanPhaseId,
  getBrandSchemaType,
  getCiteSchemaType,
  isAgentAllowed,
  semanticRatio,
} from "@/lib/ai-readiness-full";
import { mergeReportPartials as mergePartials } from "@/lib/ai-readiness-report-types";

function formatDateLabel(date = new Date()) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function statusFromRatio(good: boolean, ok: boolean): ReadinessStatus {
  if (good) return "good";
  if (ok) return "needs-improvement";
  return "poor";
}

function pct(n: number) {
  return `${Math.round(n * 100)}%`;
}

function truncate(value: string, max: number) {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}…`;
}

function plural(n: number, singular: string, pluralForm = `${singular}s`) {
  return n === 1 ? singular : pluralForm;
}

function usableAltCount(ctx: FullScanContext) {
  return Math.max(
    0,
    ctx.homepageImages - ctx.homepageMissingAlt - ctx.homepageGenericAlt,
  );
}

function imageScope(ctx: FullScanContext) {
  if (ctx.homepageImages > 0) {
    return {
      total: ctx.homepageImages,
      missing: ctx.homepageMissingAlt,
      generic: ctx.homepageGenericAlt,
      label: "homepage",
    };
  }
  return {
    total: ctx.totalImages,
    missing: ctx.missingAlt,
    generic: ctx.genericAlt,
    label: "scanned pages",
  };
}

function buildBaseReport(ctx: FullScanContext): ReadinessReport {
  const company = ctx.company;
  const slug = `ai-readiness-${ctx.reportId}`;

  return {
    kind: "readiness",
    slug,
    company,
    website: ctx.domain,
    industry: "—",
    preparedFor: ctx.email ?? "—",
    email: ctx.email,
    dateLabel: formatDateLabel(),
    overallScore: ctx.quickScore ?? 50,
    scoreLabel: bandForScore(ctx.quickScore ?? 50).label,
    summary: `${company} full AI readiness scan in progress.`,
    tagline: `On-site readiness for ${ctx.domain}.`,
    stats: [],
    insights: [],
    quickWins: [],
    categories: [],
    automation: {
      status: "needs-improvement",
      body: "Form automation scan running.",
      totalIssues: 0,
      p1Count: 0,
      p2Count: 0,
      groups: [],
    },
    agents: AI_AGENT_BOTS.map(({ agent, vendor }) => ({
      agent,
      vendor,
      allowed: true,
    })),
    agentsIntro: `Public robots.txt and site files for ${ctx.domain}.`,
    llmsTxtFound: false,
    discoverySignals: [],
    sprint: {
      name: "90-day AI Visibility Sprint",
      duration: "90 days",
      headline: `Get ${company} cited in AI answers within 90 days`,
      body: `When buyers ask ChatGPT, Perplexity, and Google AI Overview about ${company}, your site should clear the trust gate and show up in the shortlist. On-site readiness from this audit is included in the same 90-day sprint as citation work.`,
      outcomes: [
        "Fix crawl, schema, and form blockers from this audit",
        "Ship agent discovery files models can actually read",
        "Run citation work on priority prompts for your category",
        "Weekly re-tests with a dashboard for gaps and next actions",
      ],
    },
    ctaLabel: "Book a quick chat",
    ctaEyebrow: "90-day sprint",
    ctaHeadline: `Ready to improve ${company}'s AI readiness?`,
    ctaBody:
      "Book a short call and we'll map the 90-day plan from this audit — on-site fixes and citation work in one engagement.",
  };
}

function buildSiteFilesCategory(ctx: FullScanContext): ReadinessCategory {
  const skillsFound = ctx.skillsIndexReal || ctx.skillMdReal;
  const discoveryCount = [
    ctx.llmsReal,
    ctx.agentsMdReal,
    ctx.ucpReal,
    skillsFound,
  ].filter(Boolean).length;
  const allowedAgents = AI_AGENT_BOTS.filter(({ agent }) =>
    isAgentAllowed(ctx, agent),
  ).length;
  const agentsBlocked = AI_AGENT_BOTS.length - allowedAgents;

  const status = statusFromRatio(
    ctx.robotsReal && ctx.llmsReal && skillsFound,
    ctx.robotsReal || ctx.llmsReal || ctx.agentsMdReal,
  );

  let body: string;
  if (!ctx.robotsReal) {
    body = `No robots.txt at ${ctx.domain} — crawlers lack explicit permission rules and the sitemap is harder to discover.`;
  } else if (agentsBlocked > 0) {
    body = `robots.txt is live, but ${agentsBlocked} major AI crawlers appear blocked. The sitemap lists ${ctx.sitemapUrlCount || "no"} ${plural(ctx.sitemapUrlCount || 0, "URL")}${ctx.sitemapLastmod ? "" : " with no last-updated dates"}.`;
  } else {
    body = `robots.txt allows major AI crawlers. The sitemap lists ${ctx.sitemapUrlCount} ${plural(ctx.sitemapUrlCount, "page")}${ctx.sitemapLastmod ? ` (lastmod ${ctx.sitemapLastmod})` : ", but none carry a last-updated date"}.`;
    if (!ctx.llmsReal && !skillsFound) {
      body += " llms.txt and agent-skills paths 404 — tools that look for those files get nothing.";
    } else if (discoveryCount < 3) {
      body += ` Only ${discoveryCount} of 4 agent discovery files are present.`;
    }
  }

  return {
    id: "cat-site-files",
    title: "Site files",
    status,
    body,
    bodyTechnical: [
      ctx.robotsReal ? "robots.txt present" : "robots.txt missing",
      ctx.sitemapReal
        ? `sitemap.xml: ${ctx.sitemapUrlCount} loc${ctx.sitemapLastmod ? `, lastmod ${ctx.sitemapLastmod}` : ", 0 lastmod"}`
        : "sitemap.xml missing",
      ctx.llmsReal ? "/llms.txt found" : "/llms.txt 404",
      ctx.agentsMdReal ? "/agents.md found" : "/agents.md 404",
      skillsFound
        ? "agent-skills index found"
        : "/.well-known/agent-skills/index.json 404",
      ctx.ucpReal ? "/.well-known/ucp found" : "/.well-known/ucp 404",
    ].join(" · "),
    metrics: [
      {
        label: "robots.txt",
        value: ctx.robotsReal
          ? agentsBlocked > 0
            ? `Present · ${agentsBlocked} agents blocked`
            : "Present · agents allowed"
          : "Missing",
      },
      {
        label: "sitemap.xml",
        value: ctx.sitemapReal
          ? `${ctx.sitemapUrlCount} URLs${ctx.sitemapLastmod ? "" : " · no lastmod"}`
          : "Not found",
      },
      {
        label: "llms.txt",
        value: ctx.llmsReal ? "Found" : "404",
      },
      {
        label: "MCP / skills paths",
        value: skillsFound || ctx.agentsMdReal ? "Partial" : "404",
      },
    ],
  };
}

function buildSeoCategory(ctx: FullScanContext): ReadinessCategory {
  const hasTitle = ctx.title.length >= 10;
  const hasDescription = ctx.description.length >= 50;
  const titleLen = ctx.title.length;
  const descLen = ctx.description.length;
  const titleLong = titleLen > 65;
  const descLong = descLen > 160;
  const status = statusFromRatio(hasTitle && hasDescription && !titleLong && !descLong, hasTitle || hasDescription);

  let body: string;
  if (!hasTitle) {
    body = "Homepage lacks a clear title tag — models struggle to name what the page is about.";
  } else if (!hasDescription) {
    body = `Title is present (${titleLen} chars), but the meta description is missing or too short for models to summarize the page.`;
  } else if (titleLong || descLong) {
    body = `Title and description say what ${ctx.company} sells, but both run long (${titleLen}-char title, ${descLen}-char description) — the line AI would quote gets cut.`;
  } else {
    body = `Title (${titleLen} chars) and meta description (${descLen} chars) are in range — solid foundations for search and AI summarization.`;
  }

  return {
    id: "cat-seo",
    title: "SEO fundamentals",
    status,
    body,
    bodyTechnical: [
      hasTitle ? `Title ${titleLen} chars: “${truncate(ctx.title, 60)}”` : "Title missing",
      hasDescription
        ? `Meta description ${descLen} chars`
        : "Meta description missing/short",
      ctx.canonicalPages > 0 ? "Canonical present" : "No canonical on scanned pages",
    ].join(" · "),
    metrics: [
      {
        label: "Title",
        value: hasTitle ? `${titleLen} chars` : "Missing",
      },
      {
        label: "Meta description",
        value: hasDescription ? `${descLen} chars` : "Missing/short",
      },
      {
        label: "Canonical",
        value: ctx.canonicalPages > 0 ? "Present" : "Not found",
      },
    ],
  };
}

function buildFreshnessCategory(ctx: FullScanContext): ReadinessCategory {
  const currentYear = new Date().getFullYear();
  const staleFooter =
    ctx.footerYear != null && ctx.footerYear < currentYear - 1;
  const hasLastmod = Boolean(ctx.sitemapLastmod);
  const status = statusFromRatio(hasLastmod && !staleFooter, !staleFooter);

  let body: string;
  if (staleFooter) {
    body = `Footer shows © ${ctx.footerYear} — two or more years behind ${currentYear}. Models may treat the site as unmaintained even if content changed.`;
  } else if (hasLastmod) {
    body = `Sitemap lastmod (${ctx.sitemapLastmod}) and visible dates suggest the site is actively maintained.`;
  } else {
    body = `No lastmod in the sitemap${ctx.footerYear ? `; footer shows ${ctx.footerYear}` : ""}. Freshness signals are thin for a ${ctx.pages.length}-page scan.`;
  }

  return {
    id: "cat-freshness",
    title: "Content freshness",
    status,
    body,
    bodyTechnical: [
      ctx.sitemapLastmod ? `Sitemap lastmod: ${ctx.sitemapLastmod}` : "Sitemap: 0 lastmod",
      ctx.footerYear ? `Footer year: ${ctx.footerYear}` : "Footer year: not found",
      `${ctx.pages.length} pages scanned`,
    ].join(" · "),
    metrics: [
      {
        label: "Sitemap lastmod",
        value: ctx.sitemapLastmod ?? "Absent",
      },
      {
        label: "Footer year",
        value: ctx.footerYear ? String(ctx.footerYear) : "Not found",
      },
      {
        label: "Pages scanned",
        value: String(ctx.pages.length),
      },
    ],
  };
}

function buildSchemaCategory(ctx: FullScanContext): ReadinessCategory {
  const types = [...ctx.jsonLdTypes];
  const brandType = getBrandSchemaType(ctx.jsonLdTypes);
  const citeType = getCiteSchemaType(ctx.jsonLdTypes);
  const status = statusFromRatio(
    ctx.jsonLdValid && types.length >= 2 && Boolean(brandType),
    types.length > 0,
  );

  let body: string;
  if (types.length === 0) {
    body = `No JSON-LD on the ${ctx.pages.length} pages we checked — search and AI lack explicit entity markup for ${ctx.company}.`;
  } else if (!ctx.jsonLdValid) {
    body = `${ctx.jsonLdBlocks} JSON-LD block${ctx.jsonLdBlocks === 1 ? "" : "s"} exist but at least one failed to parse — fix syntax before models can trust the markup.`;
  } else if (!brandType) {
    body = `${types.length} schema type${types.length === 1 ? "" : "s"} found (${types.slice(0, 3).join(", ")}) but no Organization or brand entity — models cannot attach ${ctx.company} to the page.`;
  } else {
    body = `Structured data is present (${brandType}${citeType ? `, ${citeType}` : ""}). Enrich with FAQPage and Service where relevant.`;
  }

  return {
    id: "cat-schema",
    title: "Structured data (schema)",
    status,
    body,
    bodyTechnical: [
      types.length ? `Types: ${types.slice(0, 6).join(", ")}` : "No JSON-LD",
      ctx.jsonLdValid ? "Parse OK" : "Parse errors",
      brandType ? `Brand type: ${brandType}` : "No brand schema",
      `${ctx.jsonLdBlocks} block${ctx.jsonLdBlocks === 1 ? "" : "s"} on scanned pages`,
    ].join(" · "),
    metrics: [
      { label: "Schema found", value: types.length ? "Yes" : "No" },
      {
        label: "JSON-LD blocks",
        value: String(ctx.jsonLdBlocks),
      },
      {
        label: "Brand entity",
        value: brandType ?? "None",
      },
    ],
  };
}

function buildContentCategory(ctx: FullScanContext): ReadinessCategory {
  const h1 = ctx.homepageH1 > 0 ? ctx.homepageH1 : ctx.h1Count;
  const singleH1 = h1 === 1;
  const hasQuestions = ctx.questionHeadings > 0;
  const status = statusFromRatio(singleH1 && hasQuestions, ctx.h2Count > 0);

  let body: string;
  if (h1 === 0) {
    body = "No H1 on the homepage — agents cannot identify the primary topic.";
  } else if (h1 > 1) {
    body = `${h1} H1 tags on the homepage — competing headings make the primary topic unclear. Demote section titles to H2/H3.`;
  } else if (!hasQuestions) {
    body = `One H1, but only ${ctx.questionHeadings} question-style headings across ${ctx.pages.length} pages — models have little quotable Q&A copy.`;
  } else {
    body = `Heading hierarchy is sane (${h1} H1, ${ctx.h2Count} H2, ${ctx.h3Count} H3) with ${ctx.questionHeadings} question-style headings agents can lift.`;
  }

  return {
    id: "cat-content",
    title: "Content structure",
    status,
    body,
    bodyTechnical: [
      `H1 ${h1} / H2 ${ctx.h2Count} / H3 ${ctx.h3Count} on scanned pages`,
      `Question headings: ${ctx.questionHeadings}`,
      ctx.homepageWords > 0 ? `Homepage ~${ctx.homepageWords} visible words` : undefined,
    ]
      .filter(Boolean)
      .join(" · "),
    metrics: [
      { label: "H1 count", value: String(h1) },
      { label: "H2 / H3", value: `${ctx.h2Count} / ${ctx.h3Count}` },
      { label: "Question headings", value: String(ctx.questionHeadings) },
    ],
  };
}

function buildLinkingCategory(ctx: FullScanContext): ReadinessCategory {
  const total = ctx.internalLinks + ctx.externalLinks;
  const internalPct = total === 0 ? 0 : ctx.internalLinks / total;
  const status = statusFromRatio(internalPct >= 0.6, internalPct >= 0.4);

  let body: string;
  if (total === 0) {
    body = "Few crawlable links on scanned pages — discovery may stop at the homepage.";
  } else if (internalPct >= 0.6) {
    body = `${ctx.internalLinks} internal vs ${ctx.externalLinks} external links (${pct(internalPct)} on-site) — a usable map for crawlers.`;
  } else if (internalPct >= 0.4) {
    body = `${ctx.internalLinks} internal and ${ctx.externalLinks} external links (${pct(internalPct)} on-site) — usable, but deeper topical linking would help.`;
  } else {
    body = `Only ${pct(internalPct)} of ${total} links stay on-site — crawlers may not discover key pages beyond the homepage.`;
  }

  return {
    id: "cat-linking",
    title: "Internal linking",
    status,
    body,
    bodyTechnical: `Internal ${ctx.internalLinks} · external ${ctx.externalLinks} · share ${total ? pct(internalPct) : "—"}.`,
    metrics: [
      { label: "Internal links", value: String(ctx.internalLinks) },
      { label: "External links", value: String(ctx.externalLinks) },
      { label: "Internal share", value: total ? pct(internalPct) : "—" },
    ],
  };
}

function buildImagesCategory(ctx: FullScanContext): ReadinessCategory {
  const scope = imageScope(ctx);
  const usable = Math.max(0, scope.total - scope.missing - scope.generic);
  const status = statusFromRatio(
    scope.missing === 0 && scope.generic === 0,
    scope.missing <= Math.max(1, Math.round(scope.total * 0.1)),
  );

  let body: string;
  if (scope.total === 0) {
    body = "No images on scanned pages — nothing to evaluate for alt text.";
  } else if (scope.missing === 0 && scope.generic === 0) {
    body = `All ${scope.total} ${scope.label} images include descriptive alt text.`;
  } else if (scope.missing > 0) {
    body = `Of ${scope.total} ${scope.label} images, ${scope.missing} have no alt and ${scope.generic} use generic labels — only ~${usable} carry usable context for AI and screen readers.`;
  } else {
    body = `${scope.generic} of ${scope.total} ${scope.label} images use generic alt text (logo, image, photo) that does not describe the content.`;
  }

  return {
    id: "cat-images",
    title: "Image accessibility",
    status,
    body,
    bodyTechnical: [
      `${scope.total} images on ${scope.label}`,
      `${scope.missing} missing alt`,
      `${scope.generic} generic/short alt`,
      ctx.homepageWords > 0 ? `~${ctx.homepageWords} visible words on homepage` : undefined,
    ]
      .filter(Boolean)
      .join(" · "),
    metrics: [
      { label: "Images scanned", value: String(scope.total) },
      { label: "Missing alt", value: String(scope.missing) },
      { label: "Generic alt", value: String(scope.generic) },
      { label: "Usable alt", value: String(usable) },
    ],
  };
}

function buildSemanticsCategory(ctx: FullScanContext): ReadinessCategory {
  const ratio = semanticRatio(ctx);
  const ratioLabel = ratio < 0.01 ? "~1–2%" : pct(ratio);
  const status = statusFromRatio(ratio >= 0.08, ratio >= 0.03);

  let body: string;
  if (ratio >= 0.08) {
    body = `Semantic ratio ${ratioLabel} — landmarks (${ctx.semanticLandmarks}) give agents a readable page structure.`;
  } else if (ratio >= 0.03) {
    body = `Semantic ratio ${ratioLabel} — some landmarks, but ${ctx.semanticDivs} divs and ${ctx.semanticSpans} spans still dominate the DOM.`;
  } else {
    body = `Meaningful structure is almost absent (semantic ratio ${ratioLabel}). The page is mostly div/span wrappers — agents struggle to map sections.`;
  }

  return {
    id: "cat-semantics",
    title: "HTML semantics",
    status,
    body,
    bodyTechnical: `Semantic ratio ${ratioLabel}. Landmarks ${ctx.semanticLandmarks}; div ${ctx.semanticDivs}; span ${ctx.semanticSpans}.`,
    metrics: [
      { label: "Semantic ratio", value: ratioLabel },
      { label: "div / span", value: `${ctx.semanticDivs} / ${ctx.semanticSpans}` },
      { label: "Landmarks", value: String(ctx.semanticLandmarks) },
    ],
  };
}

function buildAutomation(ctx: FullScanContext): ReadinessAutomation {
  const p1 = ctx.formFindings.filter((f) => f.severity === "P1");
  const p2 = ctx.formFindings.filter((f) => f.severity === "P2");
  const groupsMap = new Map<
    string,
    { severity: "P1" | "P2"; title: string; examples: string[] }
  >();

  for (const finding of ctx.formFindings) {
    const existing = groupsMap.get(finding.groupId);
    if (existing) {
      if (existing.examples.length < 3) existing.examples.push(finding.example);
      continue;
    }
    groupsMap.set(finding.groupId, {
      severity: finding.severity,
      title: finding.title,
      examples: [finding.example],
    });
  }

  const groups = [...groupsMap.entries()]
    .map(([id, group]) => {
    const count = ctx.formFindings.filter((f) => f.groupId === id).length;
    let summary: string;
    let summaryTechnical: string;

    if (id === "auto-captcha") {
      summary = "CAPTCHA blocks unattended agents from completing the form — humans must intervene.";
      summaryTechnical = "g-recaptcha, hCaptcha, or Turnstile detected in page HTML.";
    } else if (id === "auto-labels") {
      summary = `${count} visible input${count === 1 ? "" : "s"} lack labels or aria-label — agents and screen readers cannot name field purpose.`;
      summaryTechnical = `${count} inputs without <label>, for/id, or aria-label across ${ctx.pages.length} scanned page${ctx.pages.length === 1 ? "" : "s"}.`;
    } else if (id === "auto-autocomplete") {
      summary = `${count} field${count === 1 ? "" : "s"} missing autocomplete tokens — browsers and agents cannot fill reliably.`;
      summaryTechnical = `No autocomplete on ${count} text/email/tel inputs. Expected: given-name, family-name, email, tel, organization.`;
    } else {
      summary =
        group.severity === "P1"
          ? `${count} critical blocker${count === 1 ? "" : "s"} on scanned forms.`
          : `${count} reliability gap${count === 1 ? "" : "s"} — fix when touching those templates.`;
      summaryTechnical = `${count} instances across scanned pages.`;
    }

    return {
      id,
      severity: group.severity,
      title: group.title,
      count,
      summary,
      summaryTechnical,
      examples: group.examples,
    };
  })
    .sort((a, b) => {
      if (a.severity === b.severity) return b.count - a.count;
      return a.severity === "P1" ? -1 : 1;
    });

  const total = ctx.formFindings.length;
  const uniqueP1Groups = groups.filter((g) => g.severity === "P1").length;
  const status: ReadinessStatus =
    p1.length >= 10 || ctx.captchaDetected
      ? "poor"
      : p1.length > 0
        ? "needs-improvement"
        : total === 0
          ? "good"
          : "needs-improvement";

  let body: string;
  if (total === 0) {
    body = `No form automation blockers detected across ${ctx.pages.length} scanned page${ctx.pages.length === 1 ? "" : "s"}.`;
  } else {
    body = `${total} form issue${total === 1 ? "" : "s"} on ${ctx.pages.length} scanned page${ctx.pages.length === 1 ? "" : "s"} — ${p1.length} critical, ${p2.length} reliability gaps. Grouped below by pattern.`;
  }

  return {
    status,
    body,
    bodyTechnical: [
      `${total} issues across ${ctx.pages.length} pages`,
      `${p1.length} P1 · ${p2.length} P2`,
      uniqueP1Groups > 0 ? `${uniqueP1Groups} P1 pattern${uniqueP1Groups === 1 ? "" : "s"}` : undefined,
      ctx.captchaDetected ? "CAPTCHA present" : undefined,
    ]
      .filter(Boolean)
      .join(" · "),
    totalIssues: total,
    p1Count: p1.length,
    p2Count: p2.length,
    groups,
  };
}

function buildAgentsPartial(ctx: FullScanContext): Partial<ReadinessReport> {
  const agents = AI_AGENT_BOTS.map(({ agent, vendor }) => ({
    agent,
    vendor,
    allowed: isAgentAllowed(ctx, agent),
  }));

  const allowedCount = agents.filter((a) => a.allowed).length;
  const blockedCount = agents.length - allowedCount;
  const discoveryFound = [
    ctx.llmsReal,
    ctx.agentsMdReal,
    ctx.skillsIndexReal || ctx.skillMdReal,
    ctx.discoveryProbes.webmcp,
    ctx.discoveryProbes.mcpJson,
    ctx.mcpLinkFound,
  ].filter(Boolean).length;

  let agentsIntro: string;
  if (!ctx.robotsReal) {
    agentsIntro = `robots.txt is missing on ${ctx.domain} — crawl permission is implicit, but ${blockedCount > 0 ? `${blockedCount} agents may still be blocked if rules appear elsewhere.` : "major crawlers can fetch public pages."}`;
  } else if (blockedCount > 0) {
    agentsIntro = `${blockedCount} of ${agents.length} AI crawlers appear blocked in robots.txt. ${ctx.llmsReal ? "llms.txt is live." : "llms.txt 404."}`;
  } else {
    agentsIntro = `All ${allowedCount} major AI crawlers are allowed via robots.txt. ${discoveryFound === 0 ? "Discovery stops there — llms.txt, skill files, and MCP cards all 404." : `${discoveryFound} discovery signal${discoveryFound === 1 ? "" : "s"} found beyond robots.txt.`}`;
  }

  return {
    agents,
    llmsTxtFound: ctx.llmsReal,
    agentsIntro,
    agentsIntroTechnical: [
      ctx.robotsReal ? "robots.txt allows crawlers" : "robots.txt missing",
      `${allowedCount}/${agents.length} agents allowed`,
      ctx.llmsReal ? "/llms.txt found" : "/llms.txt 404",
      ctx.skillsIndexReal ? "agent-skills index found" : "agent-skills 404",
    ].join(" · "),
    discoverySignals: [
      { id: "sig-mcp-link", label: '<link rel="mcp">', found: ctx.mcpLinkFound },
      {
        id: "sig-webmcp",
        label: "/.well-known/webmcp/tools.json",
        found: ctx.discoveryProbes.webmcp ?? false,
      },
      {
        id: "sig-mcp-json",
        label: "/.well-known/mcp.json",
        found: ctx.discoveryProbes.mcpJson ?? false,
      },
      {
        id: "sig-server-card",
        label: "/.well-known/mcp/server-card.json",
        found: ctx.discoveryProbes.serverCard ?? false,
      },
      {
        id: "sig-skills",
        label: "/.well-known/agent-skills/index.json",
        found: ctx.skillsIndexReal,
      },
      {
        id: "sig-llms",
        label: "/llms.txt",
        found: ctx.llmsReal,
      },
      {
        id: "sig-agents-md",
        label: "/agents.md",
        found: ctx.agentsMdReal,
      },
      {
        id: "sig-ucp",
        label: "/.well-known/ucp",
        found: ctx.ucpReal,
      },
    ],
  };
}

function computeOverallScore(ctx: FullScanContext, categories: ReadinessCategory[]) {
  const weights: Record<string, number> = {
    "cat-site-files": 12,
    "cat-seo": 12,
    "cat-freshness": 8,
    "cat-schema": 14,
    "cat-content": 12,
    "cat-linking": 10,
    "cat-images": 10,
    "cat-semantics": 12,
  };

  const statusScore: Record<ReadinessStatus, number> = {
    good: 1,
    "needs-improvement": 0.55,
    poor: 0.2,
  };

  let weighted = 0;
  let totalWeight = 0;
  for (const category of categories) {
    const weight = weights[category.id] ?? 10;
    weighted += weight * statusScore[category.status];
    totalWeight += weight;
  }

  const automation = buildAutomation(ctx);
  const autoScore =
    automation.p1Count >= 10 ? 0.15 : automation.p1Count > 0 ? 0.45 : 0.9;
  weighted += 10 * autoScore;
  totalWeight += 10;

  const allowedRatio =
    AI_AGENT_BOTS.filter(({ agent }) => isAgentAllowed(ctx, agent)).length /
    AI_AGENT_BOTS.length;
  weighted += 10 * allowedRatio;
  totalWeight += 10;

  return Math.min(100, Math.max(0, Math.round((weighted / totalWeight) * 100)));
}

function buildInsights(ctx: FullScanContext, categories: ReadinessCategory[]): ReadinessInsight[] {
  const insights: ReadinessInsight[] = [];
  const blocked = AI_AGENT_BOTS.filter(({ agent }) => !isAgentAllowed(ctx, agent));
  const scope = imageScope(ctx);
  const automation = buildAutomation(ctx);

  if (scope.total > 0 && (scope.missing > 0 || scope.generic > Math.max(2, scope.total * 0.25))) {
    insights.push({
      id: "insight-media",
      title: "Product story trapped in images",
      body: `${scope.total} ${scope.label} images vs ~${ctx.homepageWords || "few"} words — ${scope.missing} missing alt, ${scope.generic} generic. AI reads text, not pictures, so key offers stay invisible until alt and captions carry the same facts.`,
      bodyTechnical: `${scope.total} images · ${scope.missing} missing alt · ${scope.generic} generic/short alt · ~${usableAltCount(ctx)} usable.`,
    });
  }

  if (blocked.length > 0) {
    insights.push({
      id: "insight-crawl",
      title: "AI crawlers blocked in robots.txt",
      body: `${blocked.length} major agents (${blocked.slice(0, 3).map((b) => b.agent).join(", ")}${blocked.length > 3 ? "…" : ""}) appear blocked — models may skip ${ctx.company} until Allow rules are added.`,
      bodyTechnical: `Blocked: ${blocked.map((b) => b.agent).join(", ")}.`,
    });
  }

  const schema = categories.find((c) => c.id === "cat-schema");
  if (schema?.status === "poor" || ctx.jsonLdBlocks === 0) {
    insights.push({
      id: "insight-schema",
      title: "No machine-readable business layer",
      body: ctx.jsonLdBlocks === 0
        ? `Zero JSON-LD on ${ctx.pages.length} scanned pages — search and AI have no explicit markup for ${ctx.company} as a company or service.`
        : "JSON-LD parse errors or missing brand types — models cannot attach the entity to page content.",
      bodyTechnical: ctx.jsonLdValid
        ? `${ctx.jsonLdBlocks} blocks; types: ${[...ctx.jsonLdTypes].slice(0, 5).join(", ") || "none"}; brand: ${getBrandSchemaType(ctx.jsonLdTypes) ?? "none"}.`
        : `${ctx.jsonLdBlocks} blocks with parse errors.`,
    });
  }

  if (automation.p1Count > 0) {
    insights.push({
      id: "insight-forms",
      title: "Forms agents cannot complete",
      body: `${automation.p1Count} critical form issue${automation.p1Count === 1 ? "" : "s"}${ctx.captchaDetected ? " including CAPTCHA" : ""} — unlabeled inputs stop agents and assistive tech from finishing real flows.`,
      bodyTechnical: `${automation.totalIssues} total · ${automation.p1Count} P1 · ${automation.p2Count} P2 across ${ctx.pages.length} pages.`,
    });
  }

  const content = categories.find((c) => c.id === "cat-content");
  const h1 = ctx.homepageH1 > 0 ? ctx.homepageH1 : ctx.h1Count;
  if (content?.status === "poor" || h1 > 3) {
    insights.push({
      id: "insight-headings",
      title: "Heading hierarchy blocks extraction",
      body: `${h1} H1 tags and ${ctx.questionHeadings} question headings — agents cannot tell what the page is about or quote a clean answer.`,
      bodyTechnical: `H1 ${h1} / H2 ${ctx.h2Count} / H3 ${ctx.h3Count}; question headings ${ctx.questionHeadings}.`,
    });
  }

  if (!ctx.llmsReal && ctx.questionHeadings === 0) {
    insights.push({
      id: "insight-cite",
      title: "Nothing for answer engines to quote",
      body: `No llms.txt and almost no question-and-answer copy across ${ctx.pages.length} pages — AI can crawl the site and still have no self-contained paragraph to lift.`,
      bodyTechnical: "/llms.txt 404; question headings 0.",
    });
  }

  const semantics = categories.find((c) => c.id === "cat-semantics");
  if (semantics?.status === "poor") {
    insights.push({
      id: "insight-semantics",
      title: "HTML semantics are thin",
      body: `Semantic ratio ~${pct(semanticRatio(ctx))} — heavy div/span usage makes it hard for agents to map sections, navigation, and content.`,
      bodyTechnical: `Landmarks ${ctx.semanticLandmarks}; div ${ctx.semanticDivs}; span ${ctx.semanticSpans}.`,
    });
  }

  if (!ctx.robotsReal) {
    insights.push({
      id: "insight-robots",
      title: "Missing robots.txt",
      body: `No robots.txt at ${ctx.domain} — crawlers lack explicit rules and sitemap discovery is weaker.`,
    });
  }

  return insights.slice(0, 4);
}

function buildQuickWins(ctx: FullScanContext, categories: ReadinessCategory[]): ReadinessQuickWin[] {
  const wins: ReadinessQuickWin[] = [];
  const scope = imageScope(ctx);

  if (!ctx.robotsReal) {
    wins.push({
      id: "win-robots",
      title: "Publish robots.txt with AI bot rules",
      impact: "High",
      effort: "Low",
      body: "Add explicit Allow rules for GPTBot, ClaudeBot, and PerplexityBot plus a Sitemap line.",
    });
  }

  const schema = categories.find((c) => c.id === "cat-schema");
  if (schema?.status !== "good") {
    wins.push({
      id: "win-schema",
      title: "Ship Organization JSON-LD",
      impact: "High",
      effort: "Low",
      body: `Add valid Organization schema with name, URL, and logo so models can attach ${ctx.company} to page content.`,
      bodyTechnical: `Currently ${ctx.jsonLdBlocks} block${ctx.jsonLdBlocks === 1 ? "" : "s"}; brand type ${getBrandSchemaType(ctx.jsonLdTypes) ?? "missing"}.`,
    });
  }

  if (scope.missing > 0) {
    wins.push({
      id: "win-alt",
      title: "Fix missing image alt text",
      impact: "High",
      effort: "Medium",
      body: `Add descriptive alt to ${scope.missing} ${scope.label} images — ${scope.generic} more still use generic labels.`,
      bodyTechnical: `${scope.total} images · ${scope.missing} missing · ${scope.generic} generic.`,
    });
  }

  const h1 = ctx.homepageH1 > 0 ? ctx.homepageH1 : ctx.h1Count;
  if (h1 > 1) {
    wins.push({
      id: "win-headings",
      title: "Collapse to one descriptive H1",
      impact: "High",
      effort: "Low",
      body: `Demote ${h1 - 1} extra H1s to H2/H3 so agents can extract the primary topic.`,
    });
  }

  if (!ctx.llmsReal) {
    wins.push({
      id: "win-llms",
      title: "Publish llms.txt",
      impact: "Medium",
      effort: "Low",
      body: "Add a short /llms.txt naming services and key pages so coding agents are not sent to a 404.",
    });
  }

  const automation = buildAutomation(ctx);
  if (automation.p1Count > 0) {
    wins.push({
      id: "win-forms",
      title: "Label every visible form field",
      impact: "High",
      effort: "Low",
      body: `Associate labels with ${automation.p1Count} unlabeled input${automation.p1Count === 1 ? "" : "s"} and add autocomplete tokens.`,
    });
  }

  if (ctx.questionHeadings === 0) {
    wins.push({
      id: "win-faq",
      title: "Add FAQ copy engines can lift",
      impact: "High",
      effort: "Low",
      body: "Ship visible Q&A blocks with FAQPage schema so answer engines have quotable paragraphs.",
    });
  }

  const defaults: ReadinessQuickWin[] = [
    {
      id: "win-sitemap",
      title: "Add lastmod to sitemap entries",
      impact: "Medium",
      effort: "Low",
      body: `Expose last-updated dates on ${ctx.sitemapUrlCount || "sitemap"} URLs so freshness is machine-readable.`,
    },
    {
      id: "win-canonical",
      title: "Ensure canonical on key templates",
      impact: "Medium",
      effort: "Low",
      body: "Canonical tags on homepage and commercial pages prevent duplicate URL confusion for crawlers.",
    },
  ];

  for (const win of defaults) {
    if (wins.length >= 6) break;
    if (!wins.some((w) => w.id === win.id)) wins.push(win);
  }

  return wins.slice(0, 6);
}

function buildSynthesis(ctx: FullScanContext): Partial<ReadinessReport> {
  const categories = [
    buildSiteFilesCategory(ctx),
    buildSeoCategory(ctx),
    buildFreshnessCategory(ctx),
    buildSchemaCategory(ctx),
    buildContentCategory(ctx),
    buildLinkingCategory(ctx),
    buildImagesCategory(ctx),
    buildSemanticsCategory(ctx),
  ];

  const overallScore = computeOverallScore(ctx, categories);
  const band = bandForScore(overallScore);
  const automation = buildAutomation(ctx);
  const allowedAgents = AI_AGENT_BOTS.filter(({ agent }) =>
    isAgentAllowed(ctx, agent),
  ).length;
  const scope = imageScope(ctx);
  const brandType = getBrandSchemaType(ctx.jsonLdTypes);
  const citeType = getCiteSchemaType(ctx.jsonLdTypes);

  const parts: string[] = [
    `Across ${ctx.pages.length} page${ctx.pages.length === 1 ? "" : "s"}, ${ctx.company} scores ${overallScore}/100 — ${band.label.toLowerCase()}.`,
  ];

  if (scope.total > 0) {
    parts.push(
      `${scope.total} ${scope.label} images${scope.missing > 0 ? `, ${scope.missing} missing alt` : ""}${scope.generic > 0 ? `, ${scope.generic} generic alt` : ""}${ctx.homepageWords > 0 ? `, ~${ctx.homepageWords} visible words` : ""}.`,
    );
  }

  if (ctx.jsonLdBlocks === 0) {
    parts.push("Zero JSON-LD on scanned pages.");
  } else if (!ctx.jsonLdValid) {
    parts.push("JSON-LD parse errors invalidate structured data.");
  } else if (!brandType) {
    parts.push("Schema exists but no brand entity.");
  }

  if (!ctx.robotsReal) {
    parts.push("robots.txt is missing.");
  } else if (allowedAgents < AI_AGENT_BOTS.length) {
    parts.push(`${AI_AGENT_BOTS.length - allowedAgents} AI crawlers appear blocked.`);
  }

  if (automation.p1Count > 0) {
    parts.push(`${automation.p1Count} critical form blocker${automation.p1Count === 1 ? "" : "s"}.`);
  }

  if (citeType) {
    parts.push(`${citeType} schema gives citation-friendly signals.`);
  }

  parts.push("Category breakdown and quick wins below show where to start.");

  return {
    overallScore,
    scoreLabel: band.label,
    summary: parts.join(" "),
    summaryTechnical: [
      `${ctx.pages.length} pages scanned`,
      ctx.robotsReal ? "robots.txt OK" : "no robots.txt",
      `${allowedAgents}/${AI_AGENT_BOTS.length} agents allowed`,
      brandType ? `brand schema: ${brandType}` : "no brand schema",
      `${scope.total} images · ${scope.missing} missing alt`,
      `${automation.totalIssues} automation findings (${automation.p1Count} P1)`,
      `semantic ratio ${pct(semanticRatio(ctx))}`,
    ].join(" · "),
    stats: [
      { label: "Readiness score", value: `${overallScore}/100` },
      {
        label: scope.label === "homepage" ? "Homepage images" : "Images scanned",
        value: String(scope.total),
      },
      {
        label: "Missing alt",
        value: String(scope.missing),
      },
      {
        label: "JSON-LD blocks",
        value: String(ctx.jsonLdBlocks),
      },
    ],
    insights: buildInsights(ctx, categories),
    quickWins: buildQuickWins(ctx, categories),
    categories,
    automation,
  };
}

export function mapPhaseToPartial(
  phase: ScanPhaseId,
  ctx: FullScanContext,
): Partial<ReadinessReport> {
  const base = buildBaseReport(ctx);

  switch (phase) {
    case "crawl":
      return {
        ...base,
        stats: [{ label: "Pages scanned", value: String(ctx.pages.length) }],
      };
    case "site_files":
      return { categories: [buildSiteFilesCategory(ctx)] };
    case "seo_schema":
      return {
        categories: [
          buildSeoCategory(ctx),
          buildFreshnessCategory(ctx),
          buildSchemaCategory(ctx),
        ],
      };
    case "content_images":
      return {
        categories: [
          buildContentCategory(ctx),
          buildLinkingCategory(ctx),
          buildImagesCategory(ctx),
          buildSemanticsCategory(ctx),
        ],
      };
    case "automation":
      return { automation: buildAutomation(ctx) };
    case "agents":
      return buildAgentsPartial(ctx);
    case "synthesis":
      return buildSynthesis(ctx);
    default:
      return {};
  }
}

export { mergeReportPartials, CATEGORY_SECTIONS } from "@/lib/ai-readiness-report-types";

export function buildFinalReport(
  ctx: FullScanContext,
  partial: Partial<ReadinessReport>,
): ReadinessReport {
  const synthesis = buildSynthesis(ctx);
  const agents = buildAgentsPartial(ctx);

  return {
    ...buildBaseReport(ctx),
    ...mergePartials(partial, synthesis),
    ...agents,
    categories: synthesis.categories ?? [],
  };
}
