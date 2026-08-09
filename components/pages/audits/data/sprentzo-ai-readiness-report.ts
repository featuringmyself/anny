import type { ReadinessReport } from "../types";

/** Private outreach report for Sprentzo. On-site AI readiness, August 2026. */
export const sprentzoAiReadinessReport: ReadinessReport = {
  kind: "readiness",
  slug: "sprentzo-ai-readiness-report",
  company: "Sprentzo",
  website: "sprentzo.com",
  industry: "Sports gear + Bengaluru sports community (pickleball-led)",
  preparedFor: "Piyush Jain",
  role: "Cofounder",
  email: "piyush.jain@sprentzo.com",
  dateLabel: "August 2026",
  overallScore: 47,
  scoreLabel: "Poor",
  private: true,
  tagline:
    "How ready sprentzo.com is for AI agents: structured data, crawl access, automation, and semantic HTML.",
  summary:
    "Sprentzo already allows major AI crawlers and ships robots.txt plus llms.txt, but the site is not agent-ready. Invalid Organization JSON-LD (broken contactPoint array) and escaped HTML entities in WebPage schema wipe structured-data value. Fifty automation findings — 28 of them P1 — include CAPTCHA, unlabeled login/OTP fields, and Shopify hidden inputs that agents cannot operate. HTML semantics sit at a 1% ratio (heavy div/span), and there are no agent skill or MCP discovery files. SEO fundamentals, alt text, and internal linking are in good shape; fixing schema syntax, skill files, and form accessibility is the shortest path to a higher readiness score.",
  stats: [
    { label: "Automation issues", value: "50" },
    { label: "P1 blockers", value: "28" },
    { label: "Semantic ratio", value: "1%" },
    { label: "Images with alt", value: "56/56" },
  ],
  insights: [
    {
      id: "insight-schema",
      title: "Critical structured data errors & automation blockers",
      body: "A missing closing bracket in the Organization schema’s contactPoint array invalidates the entire JSON-LD block. WebPage name and description still carry escaped HTML entities (&amp;, &#39;). Together with 28 P1 automation issues, agents and search engines cannot reliably parse or act on the page.",
    },
    {
      id: "insight-semantics",
      title: "Fundamental HTML semantic deficiencies",
      body: "Semantic ratio is about 1%. The DOM leans on generic div and span wrappers, so agents struggle to map sections, landmarks, and meaning — classic divitis that hurts comprehension and indexing.",
    },
    {
      id: "insight-skills",
      title: "Limited advanced AI interaction capabilities",
      body: "No skill.md and no /.well-known/agent-skills/index.json means the site does not advertise capabilities to tool-using agents. Client-side Angular rendering can also limit bots that do not execute JavaScript.",
    },
  ],
  quickWins: [
    {
      id: "win-schema",
      title: "Fix structured data syntax and entities",
      impact: "High",
      effort: "Low",
      body: "Close the contactPoint array in Organization schema and unescape WebPage name/description so JSON-LD validates and entities resolve cleanly for AI and search.",
    },
    {
      id: "win-automation",
      title: "Resolve critical automation blocking issues",
      impact: "High",
      effort: "Medium",
      body: "Address the 28 P1 issues that block agents — CAPTCHA on agent paths, unlabeled visible inputs, and forms that agents need to complete without hidden-field traps treated as interactive failures.",
    },
    {
      id: "win-skills",
      title: "Implement AI skill files",
      impact: "High",
      effort: "Medium",
      body: "Add skill.md and /.well-known/agent-skills/index.json so advanced agents can discover what Sprentzo offers and how to interact with it.",
    },
  ],
  categories: [
    {
      id: "cat-site-files",
      title: "Site files",
      status: "needs-improvement",
      body: "robots.txt and llms.txt are in place, and no key AI agents are blocked. Missing skill.md and /.well-known/agent-skills/index.json still leave capability discovery incomplete for advanced agents.",
      metrics: [
        { label: "robots.txt", value: "Present · agents allowed" },
        { label: "llms.txt", value: "Found" },
        { label: "Agent skills", value: "Not found" },
      ],
    },
    {
      id: "cat-seo",
      title: "SEO fundamentals",
      status: "good",
      body: "Title and meta description are descriptive, keyword-relevant, and carry a clear value proposition — solid foundations for search and AI summarization.",
    },
    {
      id: "cat-freshness",
      title: "Content freshness",
      status: "good",
      body: "Primary intent reads as evergreen/reference for a sports brand, products, and philosophy. Blog posts from late May 2026 and a current © 2026 footer show recent activity with no temporal mismatches for an August 2026 audit.",
      metrics: [
        { label: "Category", value: "Evergreen / reference" },
        { label: "Latest publication", value: "2026-05-29" },
        { label: "dateModified", value: "Not found" },
      ],
    },
    {
      id: "cat-schema",
      title: "Structured data (schema)",
      status: "needs-improvement",
      body: "Organization, WebSite, and WebPage JSON-LD are present with @id linking and a SearchAction on WebSite — good shape on paper. A missing ] on Organization contactPoint invalidates the whole block; WebPage name/description still contain HTML entities. Address could be richer; foundingDate or review would strengthen the entity.",
      metrics: [
        { label: "Schema found", value: "Yes" },
        { label: "Types seen", value: "Organization, WebSite, WebPage" },
        { label: "Validity", value: "Broken · contactPoint array" },
      ],
    },
    {
      id: "cat-content",
      title: "Content structure",
      status: "needs-improvement",
      body: "Headings organize the page for scanning, but there are no Q&A-style headings for direct answers. Average section length is short — easy to skim, thin for deep agent comprehension.",
    },
    {
      id: "cat-linking",
      title: "Internal linking",
      status: "good",
      body: "A high share of links stay on-site, guiding users through related pages and distributing equity — strong for SEO and crawl paths.",
    },
    {
      id: "cat-images",
      title: "Image accessibility",
      status: "good",
      body: "All 56 images have alt text, which helps screen readers and gives models usable image context for indexing and answers.",
      metrics: [{ label: "Missing alt", value: "None" }],
    },
    {
      id: "cat-semantics",
      title: "HTML semantics",
      status: "poor",
      body: "Semantic ratio around 1% — minimal HTML5 landmarks and content tags. Heavy div/span usage makes structure and meaning hard for agents to infer.",
      metrics: [{ label: "Semantic ratio", value: "1%" }],
    },
  ],
  automation: {
    status: "poor",
    body: "Fifty issues affect automation: 28 critical P1 blockers and 22 high-priority P2 reliability gaps. Grouped below by pattern — not every selector.",
    totalIssues: 50,
    p1Count: 28,
    p2Count: 22,
    groups: [
      {
        id: "auto-captcha",
        severity: "P1",
        title: "CAPTCHA detected",
        count: 1,
        summary:
          "A CAPTCHA on the page body will stop agents from completing forms or multi-step flows. Prefer bot controls that still allow authenticated or API access for legitimate automation.",
        examples: ["Page body · CAPTCHA present"],
      },
      {
        id: "auto-hidden",
        severity: "P1",
        title: "Hidden / non-interactive inputs treated as blockers",
        count: 10,
        summary:
          "Shopify and OTP flows use type=hidden fields (form_type, utf8, tags, return_url, otp). The audit flags these as non-interactive; agents need clear visible fields for real user data, with hidden chrome left out of the interactive contract.",
        examples: [
          '<input type="hidden" name="form_type" value="customer">',
          '<input type="hidden" name="contact[tags]" value="newsletter">',
          '<input type="hidden" name="otp" class="otp-input-main" maxlength="6">',
        ],
      },
      {
        id: "auto-labels",
        severity: "P1",
        title: "Missing programmatic labels on real inputs",
        count: 17,
        summary:
          "Visible email, password, phone, WhatsApp, name, and OTP boxes lack associated <label> elements. Without for/id links, agents and assistive tech cannot reliably name the field purpose.",
        examples: [
          '<input type="email" id="otp-original-email" name="customer[email]">',
          '<input class="olInput" placeholder="Phone number" name="phone">',
          '<input id="first-name" placeholder="Enter your first name" name="name">',
        ],
      },
      {
        id: "auto-autocomplete-real",
        severity: "P2",
        title: "Missing autocomplete on real form fields",
        count: 10,
        summary:
          "Newsletter, login, recovery, phone, and name fields lack standard autocomplete tokens (email, current-password, tel, given-name, etc.), which weakens reliable agent form-filling.",
        examples: [
          '<input type="email" name="contact[email]" class="newsletter-form__email-input">',
          '<input type="password" id="otp-original-password" name="customer[password]">',
          '<input id="last-name" placeholder="Enter your last name" name="name">',
        ],
      },
      {
        id: "auto-autocomplete-noise",
        severity: "P2",
        title: "Autocomplete noise on chrome / hidden controls",
        count: 12,
        summary:
          "Navigation checkboxes, submenu toggles, search with autocomplete=off, and hidden Shopify fields are also flagged. Lower priority than real form fields; clean up when touching those templates.",
        examples: [
          '<input class="navigation__control-input" type="checkbox" id="navigation-control">',
          '<input type="search" name="q" autocomplete="off">',
          '<input type="hidden" name="utf8" value="✓">',
        ],
      },
    ],
  },
  agentsIntro:
    "Major AI crawlers are allowed in robots.txt and llms.txt is present. Capability discovery is still thin: no MCP link, no well-known MCP cards, and no agent-skills index.",
  llmsTxtFound: true,
  discoverySignals: [
    { id: "sig-mcp-link", label: '<link rel="mcp">', found: false },
    {
      id: "sig-webmcp",
      label: "/.well-known/webmcp/tools.json",
      found: false,
    },
    { id: "sig-mcp-json", label: "/.well-known/mcp.json", found: false },
    {
      id: "sig-server-card",
      label: "/.well-known/mcp/server-card.json",
      found: false,
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
    name: "AI Readiness Fix Pack",
    duration: "One-time",
    headline:
      "Make sprentzo.com parseable and operable for AI agents — then keep it that way",
    body: "This is the on-site twin of the visibility sprint: fix broken JSON-LD, ship agent skill files, label real forms, and raise semantic HTML so crawlers and agents can understand and act. Citation work elsewhere still needs a site that validates and exposes capabilities.",
    outcomes: [
      "Valid Organization / WebSite / WebPage JSON-LD with unescaped text and a complete contactPoint array",
      "Agent skill files at /.well-known/agent-skills/ plus an index agents can fetch",
      "P1 automation cleanup: labels and autocomplete on visible login, newsletter, and OTP fields; clearer agent path around CAPTCHA",
      "Semantic HTML landmarks on key templates so structure is not buried in div/span trees",
      "Re-test checklist for robots, llms.txt, discovery signals, and schema validators with a scored before/after",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "Readiness fix pack",
  ctaHeadline: "Ready to make Sprentzo agent-readable?",
  ctaBody:
    "Book a short call and we’ll walk the 47/100 readiness snapshot: broken schema, missing skill files, and the P1 form blockers — then map the one-time fix pack alongside your visibility work.",
};
