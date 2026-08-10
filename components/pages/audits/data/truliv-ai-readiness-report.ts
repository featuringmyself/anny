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
    "Truliv lets major AI crawlers in via robots.txt, but the site is not ready for agents to understand it. Zero meaningful HTML structure, no on-page structured data, empty and generic image alt text, and a stale events section that hurts trust. URLs that look like llms.txt / MCP / skill files mostly return the app’s HTML shell — not real agent documents. Score sits at 39/100. SEO title and meta are in good shape. The shortest path up is real alt text, JSON-LD, semantic HTML, and honest discovery files — on-site work included in the same 90-day AI Visibility Sprint as citation work, not a separate engagement.",
  summaryTechnical:
    "robots.txt allows major AI crawlers. Homepage ships no JSON-LD and no Microdata. Semantic ratio ≈0% (~325 div / 33 span; no header/section/footer). Four benefit SVGs use empty alt=\"\"; multiple heroes use generic alts (e.g. \"hero 1 image\"). Footer shows @2025 while Upcoming/Recent Events still lists Book Discussion ‘The Alchemist’ March 2nd | 7 PM (stale vs Aug 2026). /llms.txt, /skill.md, and /.well-known/mcp* and agent-skills URLs return text/html SPA shells (HTTP 200 false positives) — not markdown/JSON. Static HTML recheck did not confirm a CAPTCHA marker. Fix alt, schema, landmarks, and real discovery files inside the 90-day AI Visibility Sprint.",
  stats: [
    { label: "JSON-LD blocks", value: "0" },
    { label: "Empty alts", value: "4" },
    { label: "Generic alts", value: "14+" },
    { label: "Semantic ratio", value: "0%" },
  ],
  insights: [
    {
      id: "insight-semantics",
      title: "Critical AI readability & structure issues",
      body: "The homepage has essentially no meaningful HTML structure — almost everything is generic wrappers — so AI agents struggle to tell sections and content apart. There is also no real <footer> landmark for agents to anchor on.",
      bodyTechnical:
        "Semantic ratio ≈0%: ~325 div and 33 span; header, article, section, and footer tags largely absent (nav/main only). Agents cannot map landmarks or meaning from the DOM.",
    },
    {
      id: "insight-schema-images",
      title: "Missing structured data & image accessibility",
      body: "There is no machine-readable business or page markup for search or AI — so rich results and clear entity understanding are off the table. Benefit icons ship with empty alt text, and several heroes use useless labels like “hero 1 image.”",
      bodyTechnical:
        "No JSON-LD and no Microdata on the homepage. Empty alt=\"\" on /benefits/deposit-1.svg, deposit-2.svg, lock-in-1.svg, and lock-in-3.svg. Generic alts include \"hero 1 image\", \"hero 2 image\", \"hero 3 image\", and \"icon\".",
    },
    {
      id: "insight-freshness",
      title: "Outdated content & trust signals",
      body: "An events section still lists a past book discussion as upcoming, and the footer year is @2025 while this audit is August 2026. Even if the core coliving story is evergreen, those dates make the site feel neglected.",
      bodyTechnical:
        "Evergreen/reference intent; no publication or dateModified. Footer @2025. Upcoming/Recent Events still shows Book Discussion: ‘The Alchemist’ — March 2nd | 7 PM (past relative to 2026-08-09).",
    },
  ],
  quickWins: [
    {
      id: "win-alt",
      title: "Fix empty and generic image alt text",
      impact: "High",
      effort: "Low",
      body: "Write clear alt text for benefit icons and replace placeholders like “hero 1 image” so screen readers, image search, and AI agents get real context.",
      bodyTechnical:
        "Replace alt=\"\" on deposit/lock-in SVGs and rewrite generic alts (\"hero 1 image\", \"icon\", etc.) — or mark purely decorative images correctly.",
    },
    {
      id: "win-schema",
      title: "Implement JSON-LD structured data",
      impact: "High",
      effort: "Medium",
      body: "Add explicit machine-readable markup for the business, properties, and FAQs so search and AI can qualify Truliv for richer results and clearer entity understanding.",
      bodyTechnical:
        "Ship on-page JSON-LD for Organization / LocalBusiness / LodgingBusiness, WebPage, BreadcrumbList, and FAQPage; Article on city guides. Do not rely on SPA routes that only look like schema docs.",
    },
    {
      id: "win-semantics",
      title: "Improve HTML5 semantic markup",
      impact: "High",
      effort: "Medium",
      body: "Replace generic wrappers with real landmarks — header, main, section, article, footer — so agents and assistive tech can map the page structure.",
      bodyTechnical:
        "Replace div/span trees with header, nav, main, article, section, and footer; lift semantic ratio off ~0%.",
    },
  ],
  categories: [
    {
      id: "cat-site-files",
      title: "Site files",
      status: "needs-improvement",
      body: "robots.txt is real and major AI agents are allowed. Paths that look like llms.txt, skill.md, and MCP discovery files mostly return the website HTML — not agent-readable documents. Ship real files, or agents will keep walking into a dead end.",
      bodyTechnical:
        "robots.txt present (agents allowed). /llms.txt, /skill.md, /.well-known/webmcp/tools.json, mcp.json, mcp/server-card.json, and agent-skills/index.json respond 200 with Content-Type text/html (SPA shell) — false positives. <link rel=\"mcp\"> not found.",
      metrics: [
        { label: "robots.txt", value: "Present · agents allowed" },
        { label: "llms.txt", value: "SPA HTML · not real" },
        { label: "MCP / skills paths", value: "SPA HTML · not real" },
        { label: "Agent discovery", value: "Not usable" },
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
      body: "Core coliving content reads evergreen, but an events block still advertises a past date as upcoming, and the footer still shows @2025. That mismatch undercuts freshness and community trust.",
      bodyTechnical:
        "Category: Evergreen/Reference. Publication and last-updated not found. Footer @2025. Temporal mismatch: Upcoming/Recent Events still lists Book Discussion ‘The Alchemist’ March 2nd | 7 PM (past as of 2026-08-09).",
      metrics: [
        { label: "Category", value: "Evergreen / reference" },
        { label: "Footer year", value: "@2025" },
        { label: "Stale event", value: "March 2 · Alchemist" },
      ],
    },
    {
      id: "cat-schema",
      title: "Structured data (schema)",
      status: "poor",
      body: "No structured data on the page — search and AI get no explicit machine-readable signal about Truliv as a business or about the page content. Rich results stay out of reach until JSON-LD lands on the HTML itself.",
      bodyTechnical:
        "Homepage: 0 application/ld+json blocks; no Microdata (itemscope). Schema found: No. SPA routes that mention schema in marketing copy do not count as on-page JSON-LD.",
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
      body: "Benefit icons ship with empty alt text, and several heroes use generic labels that give screen readers and AI nothing useful.",
      bodyTechnical:
        "Empty alt=\"\" on /benefits/deposit-1.svg, deposit-2.svg, lock-in-1.svg, lock-in-3.svg. Generic alts include \"hero 1 image\", \"hero 2 image\", \"hero 3 image\", \"icon\", and \"image\".",
      metrics: [
        { label: "Empty alt", value: "4" },
        { label: "Generic alt (sampled)", value: "14+" },
      ],
    },
    {
      id: "cat-semantics",
      title: "HTML semantics",
      status: "poor",
      body: "Semantic structure is effectively zero. The page is built from generic boxes, so agents cannot reliably map landmarks or meaning.",
      bodyTechnical:
        "Semantic ratio ≈0%. ~325 div and 33 span; no header/section/footer; nav and main only.",
      metrics: [
        { label: "Semantic ratio", value: "~0%" },
        { label: "div / span", value: "325 / 33" },
      ],
    },
  ],
  automation: {
    status: "needs-improvement",
    body: "An earlier scanner flagged a CAPTCHA on the page body. A static HTML recheck in August 2026 did not find captcha, recaptcha, or turnstile markers in the homepage source — so that P1 is not treated as confirmed here. Still worth verifying on live forms before agents depend on them.",
    bodyTechnical:
      "Prior audit: 1× P1 CAPTCHA on page body. Recheck (static homepage HTML): no captcha|recaptcha|hcaptcha|turnstile matches. Confirmed P1 count for this report: 0. Re-test authenticated/booking flows separately if CAPTCHA loads client-side.",
    totalIssues: 0,
    p1Count: 0,
    p2Count: 0,
    groups: [
      {
        id: "auto-captcha-unconfirmed",
        severity: "P1",
        title: "CAPTCHA — not confirmed on static recheck",
        count: 0,
        summary:
          "A previous pass reported CAPTCHA. It does not appear in the current homepage HTML. Confirm on booking and inquiry forms before treating it as a blocker.",
        summaryTechnical:
          "No captcha/recaptcha/hcaptcha/cf-turnstile strings in static homepage HTML (Aug 2026 recheck). If a widget injects after JS, document that path separately.",
        examples: [
          "Prior: Page body · CAPTCHA present",
          "Recheck: no CAPTCHA markers in static HTML",
        ],
      },
    ],
  },
  agentsIntro:
    "Major AI crawlers are allowed in robots.txt. What looks like llms.txt, skill.md, and MCP discovery is mostly the same website HTML served at those paths — not real agent files. Ship actual markdown/JSON, or advanced agents still have nothing to use.",
  agentsIntroTechnical:
    "robots.txt allows major AI agents. /llms.txt, /skill.md, and /.well-known MCP / agent-skills URLs return Content-Type text/html (SPA). Treat as not found for agent discovery. No <link rel=\"mcp\">.",
  llmsTxtFound: false,
  discoverySignals: [
    {
      id: "sig-mcp-link",
      label: '<link rel="mcp">',
      found: false,
    },
    {
      id: "sig-webmcp",
      label: "/.well-known/webmcp/tools.json",
      found: false,
      note: "HTTP 200 but text/html SPA shell — not JSON",
    },
    {
      id: "sig-mcp-json",
      label: "/.well-known/mcp.json",
      found: false,
      note: "HTTP 200 but text/html SPA shell — not JSON",
    },
    {
      id: "sig-server-card",
      label: "/.well-known/mcp/server-card.json",
      found: false,
      note: "HTTP 200 but text/html SPA shell — not JSON",
    },
    {
      id: "sig-skills",
      label: "/.well-known/agent-skills/index.json",
      found: false,
      note: "HTTP 200 but text/html SPA shell — not JSON",
    },
    {
      id: "sig-llms",
      label: "/llms.txt",
      found: false,
      note: "HTTP 200 but text/html SPA shell — not markdown",
    },
    {
      id: "sig-skill-md",
      label: "/skill.md",
      found: false,
      note: "HTTP 200 but text/html SPA shell — not markdown",
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
    body: "When renters ask ChatGPT, Perplexity, Google AI Overview, and other models about Truliv or flexible coliving, truliv.in should clear the trust gate and own the shortlist — not lose 9 of 12 prompts to competitors and hotels. We start with the leaks in the visibility audit: deposit USP unanswered, Chennai fragile outside two thin #1s, Bengaluru and holiday homes empty. On-site readiness from this audit — real alt text, on-page JSON-LD, semantic HTML, real agent discovery files (not SPA shells), fresher events — is included in that same 90-day sprint so citation gains land on a site agents can parse. Not a separate product. You get a dashboard that re-tests the prompt set and surfaces what to do next.",
    outcomes: [
      "Deposit and reliability answers that clear the trust gate, matching the promise on truliv.in",
      "Chennai defended and Bengaluru / holiday-home shelves opened where AI already routes demand",
      "On-site readiness included: on-page JSON-LD, empty/generic alt cleanup, HTML landmarks, and real llms.txt / agent-skills / MCP files (not HTML fallbacks)",
      "Stale events and footer year cleaned so freshness signals match an August 2026 snapshot",
      "Daily re-tests of the prompt set with a tracking dashboard for model gaps, competitor share, and next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline:
    "Stop leaking Chennai demand and open Bengaluru where AI already decides",
  ctaBody:
    "Book a short call. We will map the 90-day plan from this audit: clear the deposit trust gate against truliv.in first, defend Chennai, open Bengaluru and holiday homes — with on-site readiness (schema, alt text, semantics, real discovery files) included in the same engagement. You get a dashboard that re-tests this prompt set and suggests what to do next as the answers move.",
};
