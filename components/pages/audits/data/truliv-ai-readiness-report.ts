import type { ReadinessReport } from "../types";

/** Private outreach report for Truliv. On-site AI readiness, August 2026. */
export const trulivAiReadinessReport: ReadinessReport = {
  kind: "readiness",
  slug: "truliv-ai-readiness-report",
  company: "Truliv",
  website: "truliv.in",
  industry: "Coliving & holiday homes",
  preparedFor: "Prem Anand",
  role: "CMO",
  email: "prem.a@truliv.in",
  dateLabel: "August 2026",
  overallScore: 39,
  scoreLabel: "Poor",
  private: true,
  tagline:
    "How ready truliv.in is for AI agents — and what to fix inside the 90-day AI Visibility Sprint.",
  summary:
    "Truliv already lets major AI crawlers in and ships robots.txt, llms.txt, and several MCP discovery files — but the site is not ready for agents to understand it. Zero meaningful HTML structure, no structured data at all, missing image alt text, a CAPTCHA that blocks agent flows, and a stale events section that hurts trust. Score sits at 39/100. SEO title and meta are in good shape. The shortest path up is alt text, JSON-LD, and semantic HTML — on-site work included in the same 90-day AI Visibility Sprint as citation work, not a separate engagement.",
  summaryTechnical:
    "Truliv allows major AI crawlers and ships robots.txt, llms.txt, skill.md, and most /.well-known MCP cards — but the site is not agent-ready. Semantic ratio is 0% (~325 div / 33 span, almost no header/article/section/footer). No JSON-LD or Microdata. Four benefit SVGs lack alt. One P1 CAPTCHA blocks agent interaction. An “Upcoming/Recent Events” Book Discussion dated March 2nd is past relative to the August 2026 audit. SEO fundamentals are good; fixing alt, schema, and landmarks is the shortest path — included in the 90-day AI Visibility Sprint.",
  stats: [
    { label: "Automation issues", value: "1" },
    { label: "P1 blockers", value: "1" },
    { label: "Semantic ratio", value: "0%" },
    { label: "Images missing alt", value: "4" },
  ],
  insights: [
    {
      id: "insight-semantics",
      title: "Critical AI readability & structure issues",
      body: "The page has essentially no meaningful HTML structure — almost everything is generic wrappers — so AI agents struggle to tell sections and content apart. A critical CAPTCHA on the page also blocks agents from completing real flows.",
      bodyTechnical:
        "Semantic ratio is 0%: heavy reliance on generic div (≈325) and span (≈33) with header, article, section, and footer largely absent. That, plus a P1 CAPTCHA on the page body, severely impedes agent parsing and interaction.",
    },
    {
      id: "insight-schema-images",
      title: "Missing structured data & image accessibility",
      body: "There is no machine-readable business or page markup for search or AI — so rich results and clear entity understanding are off the table. Several images also lack alt text, which hurts accessibility and how models interpret visuals.",
      bodyTechnical:
        "No JSON-LD and no Microdata were detected. Missing alt on /benefits/deposit-1.svg, deposit-2.svg, lock-in-1.svg, and lock-in-3.svg hurts both a11y and machine readability.",
    },
    {
      id: "insight-freshness",
      title: "Outdated content & trust signals",
      body: "An events section still lists a past book discussion as upcoming. Even if the core coliving story is evergreen, that stale date makes the site feel neglected and weakens trust in community and freshness signals.",
      bodyTechnical:
        "Evergreen/reference intent, but no publication or dateModified found. “Upcoming/Recent Events” still shows Book Discussion: ‘The Alchemist’ — March 2nd | 7 PM, which is past relative to the 2026-08-09 audit date — a clear temporal mismatch.",
    },
  ],
  quickWins: [
    {
      id: "win-alt",
      title: "Add alt text to images",
      impact: "High",
      effort: "Low",
      body: "Write clear alt text for every image so screen readers, image search, and AI agents get real context — especially the benefit icons that currently ship empty.",
      bodyTechnical:
        "Add descriptive alt on /benefits/deposit-1.svg, deposit-2.svg, lock-in-1.svg, and lock-in-3.svg (and any other images missing alt).",
    },
    {
      id: "win-schema",
      title: "Implement JSON-LD structured data",
      impact: "High",
      effort: "Medium",
      body: "Add explicit machine-readable markup for the business, properties, and FAQs so search and AI can qualify Truliv for richer results and clearer entity understanding.",
      bodyTechnical:
        "Ship JSON-LD for Organization (and LocalBusiness / LodgingBusiness / FAQPage as relevant) — none found today, Microdata also absent.",
    },
    {
      id: "win-semantics",
      title: "Improve HTML5 semantic markup",
      impact: "High",
      effort: "Medium",
      body: "Replace generic wrappers with real landmarks — header, main, section, article, footer — so agents and assistive tech can map the page structure.",
      bodyTechnical:
        "Replace div/span trees with header, nav, main, article, section, and footer; lift semantic ratio off 0%.",
    },
  ],
  categories: [
    {
      id: "cat-site-files",
      title: "Site files",
      status: "needs-improvement",
      body: "Crawl files are in place and no major AI agents are blocked. skill.md exists, and several MCP discovery files are live — but the agent-skills index is still missing, so capability discovery is incomplete.",
      bodyTechnical:
        "robots.txt and llms.txt present; agents allowed. skill.md found. /.well-known/webmcp/tools.json, mcp.json, and mcp/server-card.json found. Missing: <link rel=\"mcp\"> and /.well-known/agent-skills/index.json.",
      metrics: [
        { label: "robots.txt", value: "Present · agents allowed" },
        { label: "llms.txt", value: "Found" },
        { label: "skill.md", value: "Found" },
        { label: "Agent skills index", value: "Not found" },
      ],
    },
    {
      id: "cat-seo",
      title: "SEO fundamentals",
      status: "good",
      body: "Title and meta description are clear, keyword-relevant, and include a call to action — solid foundations for search and click-through.",
      bodyTechnical:
        "Title tag and meta description are well-crafted, descriptive, and include relevant keywords plus a CTA.",
    },
    {
      id: "cat-freshness",
      title: "Content freshness",
      status: "needs-improvement",
      body: "Core coliving content reads evergreen, but an events block still advertises a past date as upcoming. No clear publish or update dates. That mismatch undercuts freshness and community trust.",
      bodyTechnical:
        "Category: Evergreen/Reference. Publication and last-updated not found; no copyright year detected. Temporal mismatch: Upcoming/Recent Events still lists Book Discussion ‘The Alchemist’ March 2nd | 7 PM (past as of 2026-08-09).",
      metrics: [
        { label: "Category", value: "Evergreen / reference" },
        { label: "Publication date", value: "Not found" },
        { label: "Last updated", value: "Not found" },
      ],
    },
    {
      id: "cat-schema",
      title: "Structured data (schema)",
      status: "poor",
      body: "No structured data at all — search and AI get no explicit machine-readable signal about Truliv as a business or about the page content. Rich results stay out of reach until JSON-LD lands.",
      bodyTechnical:
        "No JSON-LD and no Microdata detected. Schema found: No.",
      metrics: [
        { label: "Schema found", value: "No" },
        { label: "JSON-LD", value: "None" },
        { label: "Microdata", value: "None" },
      ],
    },
    {
      id: "cat-content",
      title: "Content structure",
      status: "needs-improvement",
      body: "Sections are clearly headed and readable for humans, but there are no question-style headings that help AI pull direct answers.",
      bodyTechnical:
        "Well-chunked headings aid scannability; complete absence of Q&A-style headings limits direct-answer extraction for agents.",
    },
    {
      id: "cat-linking",
      title: "Internal linking",
      status: "needs-improvement",
      body: "About half of links stay on-site — a usable base — but there is clear room to deepen internal links for navigation and equity.",
      bodyTechnical:
        "≈50% of links are internal. Foundation is fine; density and topical internal linking can still improve crawl paths and equity distribution.",
    },
    {
      id: "cat-images",
      title: "Image accessibility",
      status: "needs-improvement",
      body: "Several images ship without alt text, so screen readers and AI get no description — weaker accessibility and weaker image understanding for search.",
      bodyTechnical:
        "Missing alt on /benefits/deposit-1.svg, /benefits/deposit-2.svg, /benefits/lock-in-1.svg, /benefits/lock-in-3.svg.",
      metrics: [{ label: "Missing alt (sampled)", value: "4" }],
    },
    {
      id: "cat-semantics",
      title: "HTML semantics",
      status: "poor",
      body: "Semantic structure is effectively zero. The page is built from generic boxes, so agents cannot reliably map landmarks or meaning.",
      bodyTechnical:
        "Semantic ratio 0%. ≈325 div and 33 span; key structural elements (header, article, section, footer) largely absent.",
      metrics: [{ label: "Semantic ratio", value: "0%" }],
    },
  ],
  automation: {
    status: "poor",
    body: "One critical blocker: a CAPTCHA on the page will stop AI agents from completing forms or multi-step flows. Clearer bot controls or an authenticated API path keep humans safe without walling off legitimate agents.",
    bodyTechnical:
      "Found 1 automation issue: 1 critical P1 (CAPTCHA on page body). No P2 findings in this snapshot.",
    totalIssues: 1,
    p1Count: 1,
    p2Count: 0,
    groups: [
      {
        id: "auto-captcha",
        severity: "P1",
        title: "CAPTCHA detected",
        count: 1,
        summary:
          "A CAPTCHA on the page body will stop agents from completing forms or multi-step flows. Prefer bot controls that still allow authenticated or API access for legitimate automation.",
        summaryTechnical:
          "CAPTCHA detected on page body — designed to block bots; will prevent AI agents from interacting with forms. Consider alternative bot-detection or an API for authenticated agent access.",
        examples: ["Page body · CAPTCHA present"],
      },
    ],
  },
  agentsIntro:
    "Major AI crawlers are allowed, and llms.txt plus skill.md are present. Several MCP discovery files are already live — the gap is the agent-skills index and an MCP link in the page head.",
  agentsIntroTechnical:
    "Major AI crawlers allowed in robots.txt. llms.txt and skill.md found. /.well-known/webmcp/tools.json, mcp.json, and mcp/server-card.json found. Missing: <link rel=\"mcp\"> and /.well-known/agent-skills/index.json.",
  llmsTxtFound: true,
  discoverySignals: [
    { id: "sig-mcp-link", label: '<link rel="mcp">', found: false },
    {
      id: "sig-webmcp",
      label: "/.well-known/webmcp/tools.json",
      found: true,
    },
    { id: "sig-mcp-json", label: "/.well-known/mcp.json", found: true },
    {
      id: "sig-server-card",
      label: "/.well-known/mcp/server-card.json",
      found: true,
    },
    {
      id: "sig-skills",
      label: "/.well-known/agent-skills/index.json",
      found: false,
    },
  ],
  agents: [
    { agent: "GPTBot", vendor: "OpenAI", allowed: true },
    { agent: "OAI-SearchBot", vendor: "OpenAI", allowed: true },
    { agent: "ChatGPT-User", vendor: "OpenAI", allowed: true },
    { agent: "anthropic-ai", vendor: "Anthropic", allowed: true },
    { agent: "ClaudeBot", vendor: "Anthropic", allowed: true },
    { agent: "claude-web", vendor: "Anthropic", allowed: true },
    { agent: "Google-Extended", vendor: "Google", allowed: true },
    { agent: "PerplexityBot", vendor: "Perplexity", allowed: true },
    { agent: "cohere-ai", vendor: "Cohere", allowed: true },
    { agent: "Amazonbot", vendor: "Amazon", allowed: true },
    { agent: "Applebot", vendor: "Apple", allowed: true },
    { agent: "Applebot-Extended", vendor: "Apple", allowed: true },
    { agent: "BingBot", vendor: "Microsoft", allowed: true },
    { agent: "FacebookBot", vendor: "Meta", allowed: true },
    { agent: "LinkedInBot", vendor: "LinkedIn", allowed: true },
    { agent: "Bytespider", vendor: "ByteDance", allowed: true },
    { agent: "DuckAssistBot", vendor: "DuckDuckGo", allowed: true },
    { agent: "AI2Bot", vendor: "Allen Institute", allowed: true },
    { agent: "CCBot", vendor: "Common Crawl", allowed: true },
    { agent: "Diffbot", vendor: "Diffbot", allowed: true },
    { agent: "omgili", vendor: "Omgili", allowed: true },
    { agent: "YouBot", vendor: "You.com", allowed: true },
    { agent: "MistralAI-User", vendor: "Mistral", allowed: true },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "Stop the leakage where AI already decides the shortlist",
    body: "When renters ask ChatGPT, Perplexity, Google AI Overview, and other models about Truliv or flexible coliving, truliv.in should clear the trust gate and own the shortlist — not lose 9 of 12 prompts to competitors and hotels. We start with the leaks in the visibility audit: deposit USP unanswered, Chennai fragile outside two thin #1s, Bengaluru and holiday homes empty. On-site readiness from this audit — alt text, JSON-LD, semantic HTML, CAPTCHA path for agents, fresher events — is included in that same 90-day sprint so citation gains land on a site agents can parse. Not a separate product. You get a dashboard that re-tests the prompt set and surfaces what to do next.",
    outcomes: [
      "Deposit and reliability answers that clear the trust gate, matching the promise on truliv.in",
      "Chennai defended and Bengaluru / holiday-home shelves opened where AI already routes demand",
      "On-site readiness included: JSON-LD, image alt text, HTML landmarks, agent-skills index, and a clearer path around CAPTCHA for legitimate agents",
      "Stale events cleaned so freshness and community signals match an August 2026 snapshot",
      "Daily re-tests of the prompt set with a tracking dashboard for model gaps, competitor share, and next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline:
    "Stop leaking Chennai demand and open Bengaluru where AI already decides",
  ctaBody:
    "Book a short call. We will map the 90-day plan from this audit: clear the deposit trust gate against truliv.in first, defend Chennai, open Bengaluru and holiday homes — with on-site readiness (schema, alt text, semantics) included in the same engagement. You get a dashboard that re-tests this prompt set and suggests what to do next as the answers move.",
};
