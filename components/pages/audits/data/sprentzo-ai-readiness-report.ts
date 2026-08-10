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
    "How ready sprentzo.com is for AI agents — and what to fix inside the 90-day AI Visibility Sprint.",
  summary:
    "Sprentzo already lets major AI crawlers in and ships real agent docs (llms.txt, agents.md, UCP discovery) — but the site is not ready for agents to trust the markup or operate forms cleanly. Broken Organization JSON-LD, HTML entities in WebPage schema, fifty automation findings (twenty-eight critical), and thin HTML semantics hold the readiness score at 47/100. SEO fundamentals, image alt text, and internal linking are in good shape. The shortest path up is fixing schema syntax, cleaning form accessibility, and filling the agent-skills gap — all included in the same 90-day AI Visibility Sprint as citation work, not a separate engagement.",
  summaryTechnical:
    "Sprentzo allows major AI crawlers and ships robots.txt, a real /llms.txt, /agents.md, and /.well-known/ucp (Shopify/UCP). Organization JSON-LD is invalid: contactPoint array is closed but a comma is missing before sameAs. WebPage name/description still contain HTML entities (&amp;, &#39;). WebSite JSON-LD is valid. Fifty automation findings — 28 P1 — include CAPTCHA-related fields, unlabeled login/OTP inputs, and Shopify hidden inputs. HTML semantics ≈1–2% (heavy div/span). /.well-known/agent-skills/index.json and /skill.md 404. SEO fundamentals, alt text, and internal linking are strong; fix Org JSON syntax, entities, forms, and skills index inside the 90-day AI Visibility Sprint.",
  stats: [
    { label: "Automation issues", value: "50" },
    { label: "P1 blockers", value: "28" },
    { label: "Semantic ratio", value: "~1–2%" },
    { label: "Images with alt", value: "56/56" },
  ],
  insights: [
    {
      id: "insight-schema",
      title: "Critical structured data errors & automation blockers",
      body: "The site’s business and page markup is broken in a way search engines and AI cannot trust. Combined with twenty-eight critical automation blockers — CAPTCHA, unlabeled login fields, forms agents cannot complete — machines cannot reliably parse or act on the page.",
      bodyTechnical:
        "A missing comma after the Organization schema’s contactPoint array (before sameAs) invalidates the Organization JSON-LD block. WebPage name and description still carry escaped HTML entities (&amp;, &#39;). Together with 28 P1 automation issues, agents and search engines cannot reliably parse or act on the page.",
    },
    {
      id: "insight-semantics",
      title: "Fundamental HTML semantic deficiencies",
      body: "Almost none of the page uses meaningful HTML structure. Everything sits in generic wrappers, so AI struggles to tell sections, navigation, and content apart — which hurts comprehension and how the brand shows up in answers.",
      bodyTechnical:
        "Semantic ratio ≈1–2%. Some landmarks exist, but the DOM still leans on generic div/span, so agents struggle to map sections and meaning.",
    },
    {
      id: "insight-skills",
      title: "Partial agent discovery — skills index still missing",
      body: "Sprentzo already publishes useful agent instructions and commerce discovery, but it still lacks a standard agent-skills index. Advanced tools that look for that path get a dead end.",
      bodyTechnical:
        "/llms.txt and /agents.md are real; /.well-known/ucp is live. /skill.md and /.well-known/agent-skills/index.json return 404. Standard MCP link / well-known MCP JSON cards are also absent.",
    },
  ],
  quickWins: [
    {
      id: "win-schema",
      title: "Fix structured data syntax and entities",
      impact: "High",
      effort: "Low",
      body: "Repair the broken business markup so AI and search can trust Organization and page details again. Small syntax fixes; outsized impact on how machines read the brand.",
      bodyTechnical:
        "Add the missing comma after the Organization contactPoint array (before sameAs) and unescape WebPage name/description so JSON-LD validates and entities resolve cleanly.",
    },
    {
      id: "win-automation",
      title: "Resolve critical automation blocking issues",
      impact: "High",
      effort: "Medium",
      body: "Clear the twenty-eight critical blockers that stop agents from completing real flows — CAPTCHA on agent paths, unlabeled visible inputs, and forms that need a clear interactive path.",
      bodyTechnical:
        "Address the 28 P1 issues that block agents — CAPTCHA on agent paths, unlabeled visible inputs, and forms that agents need to complete without hidden-field traps treated as interactive failures.",
    },
    {
      id: "win-skills",
      title: "Add agent-skills index",
      impact: "High",
      effort: "Medium",
      body: "You already have agent instructions and UCP discovery. Add the standard agent-skills index so tools that look for that path can find Sprentzo — included in the same 90-day sprint as citation work.",
      bodyTechnical:
        "Add /.well-known/agent-skills/index.json (and optional skill.md) pointing at existing /agents.md / llms.txt / UCP capabilities.",
    },
  ],
  categories: [
    {
      id: "cat-site-files",
      title: "Site files",
      status: "needs-improvement",
      body: "Crawl permission is fine, and Sprentzo already ships real llms.txt, agents.md, and UCP discovery. The gap is the standard agent-skills index — tools that only look there still see nothing.",
      bodyTechnical:
        "robots.txt present; agents allowed. Real: /llms.txt, /agents.md, /.well-known/ucp. Missing (404): /skill.md, /.well-known/agent-skills/index.json. No <link rel=\"mcp\"> or well-known MCP JSON cards.",
      metrics: [
        { label: "robots.txt", value: "Present · agents allowed" },
        { label: "llms.txt / agents.md", value: "Found · real" },
        { label: "UCP", value: "/.well-known/ucp · found" },
        { label: "Agent skills index", value: "404" },
      ],
    },
    {
      id: "cat-seo",
      title: "SEO fundamentals",
      status: "good",
      body: "Title and meta description are clear, relevant, and carry a real value proposition — solid foundations for search and AI summarization.",
      bodyTechnical:
        "Title and meta description are descriptive, keyword-relevant, and carry a clear value proposition — solid foundations for search and AI summarization.",
    },
    {
      id: "cat-freshness",
      title: "Content freshness",
      status: "good",
      body: "Core pages read as evergreen for a sports brand. Recent blog activity and a current footer year show the site is maintained — no red flags for an August 2026 audit.",
      bodyTechnical:
        "Primary intent reads as evergreen/reference for a sports brand, products, and philosophy. Blog posts from late May 2026 and a current © 2026 footer show recent activity with no temporal mismatches for an August 2026 audit.",
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
      body: "Business and page markup exist on paper, but a syntax error invalidates the block and some text still carries escaped characters. Fixing validity unlocks the value that is already almost there.",
      bodyTechnical:
        "Organization, WebSite, and WebPage JSON-LD are present with @id linking and a SearchAction on WebSite — good shape on paper. Organization JSON fails parse: missing comma after contactPoint ] before sameAs. WebSite is valid; WebPage parses but contains HTML entities. Enrich with Product/Article/FAQPage where relevant.",
      metrics: [
        { label: "Schema found", value: "Yes" },
        { label: "Types seen", value: "Organization, WebSite, WebPage" },
        { label: "Validity", value: "Broken · missing comma" },
      ],
    },
    {
      id: "cat-content",
      title: "Content structure",
      status: "needs-improvement",
      body: "Headings help humans scan, but there are few direct Q&A-style answers. Sections are short — easy to skim, thin for deep AI comprehension.",
      bodyTechnical:
        "Headings organize the page for scanning, but there are no Q&A-style headings for direct answers. Average section length is short — easy to skim, thin for deep agent comprehension.",
    },
    {
      id: "cat-linking",
      title: "Internal linking",
      status: "good",
      body: "Most links stay on-site, guiding visitors through related pages — strong for SEO and for how crawlers move around the brand.",
      bodyTechnical:
        "A high share of links stay on-site, guiding users through related pages and distributing equity — strong for SEO and crawl paths.",
    },
    {
      id: "cat-images",
      title: "Image accessibility",
      status: "good",
      body: "Every image has alt text — good for accessibility and for giving AI usable image context.",
      bodyTechnical:
        "All 56 images have alt text, which helps screen readers and gives models usable image context for indexing and answers.",
      metrics: [{ label: "Missing alt", value: "None" }],
    },
    {
      id: "cat-semantics",
      title: "HTML semantics",
      status: "poor",
      body: "Meaningful HTML structure is almost absent. Heavy generic wrappers make it hard for agents to infer what each region of the page is for.",
      bodyTechnical:
        "Semantic ratio ≈1–2% of (landmarks + div + span). Some header/nav/main/section/footer exist, but div/span still dominate.",
      metrics: [{ label: "Semantic ratio", value: "~1–2%" }],
    },
  ],
  automation: {
    status: "poor",
    body: "Fifty issues affect whether AI can complete real flows: twenty-eight critical blockers and twenty-two reliability gaps. Grouped below by pattern — impact first, not every technical detail.",
    bodyTechnical:
      "Fifty issues affect automation: 28 critical P1 blockers and 22 high-priority P2 reliability gaps. Grouped below by pattern — not every selector.",
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
          "A CAPTCHA on the page will stop agents from finishing forms or multi-step flows. Prefer bot controls that still allow legitimate automation or API paths.",
        summaryTechnical:
          "A CAPTCHA on the page body will stop agents from completing forms or multi-step flows. Prefer bot controls that still allow authenticated or API access for legitimate automation.",
        examples: ["Page body · CAPTCHA present"],
      },
      {
        id: "auto-hidden",
        severity: "P1",
        title: "Hidden / non-interactive inputs treated as blockers",
        count: 10,
        summary:
          "Checkout and OTP flows use hidden fields that the audit flags as non-interactive. Agents need clear visible fields for real user data; background chrome should stay out of the interactive contract.",
        summaryTechnical:
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
          "Visible email, password, phone, WhatsApp, name, and OTP boxes lack proper labels. Without them, agents and assistive tech cannot reliably tell what each field is for.",
        summaryTechnical:
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
          "Newsletter, login, recovery, phone, and name fields lack standard autocomplete hints, which weakens reliable agent form-filling.",
        summaryTechnical:
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
          "Nav toggles, search, and background fields are also flagged. Lower priority than real form fields; clean up when those templates are touched.",
        summaryTechnical:
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
    "Major AI crawlers are allowed. Real llms.txt, agents.md, and UCP discovery are already live. The remaining gap is the standard agent-skills index (and MCP link cards).",
  agentsIntroTechnical:
    "robots.txt allows major AI agents. Real: /llms.txt, /agents.md, /.well-known/ucp. Missing: <link rel=\"mcp\">, well-known MCP JSON cards, /skill.md, /.well-known/agent-skills/index.json (404).",
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
      note: "HTTP 404",
    },
    {
      id: "sig-agents-md",
      label: "/agents.md",
      found: true,
      note: "Real markdown agent instructions",
    },
    {
      id: "sig-ucp",
      label: "/.well-known/ucp",
      found: true,
      note: "Shopify UCP merchant profile",
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
    headline:
      "Get Sprentzo cited on gear and Bengaluru app prompts within 90 days",
    body: "When buyers ask ChatGPT, Perplexity, Google AI Overview, and other models for pickleball gear in India or a sports community app in Bengaluru, Sprentzo should show up — not JOOLA on Amazon, not Playo alone. We start with the trust failures that kill the sale before a paddle or an install: “which Sprentzo?” and skincare + ScamAdviser. Then we run citation work on both lanes in one engagement. On-site readiness from this audit — valid schema, skill files, labeled forms, clearer HTML — is included in that same 90-day sprint so citation gains land on a site agents can parse. Not a separate product. You also get a dashboard for model gaps, competitor share, improvement score, and next actions each week.",
    outcomes: [
      "Trust and identity fixed so “is Sprentzo reliable” stops returning “which Sprentzo?” or skincare / ScamAdviser",
      "Cited on priority India paddle and apparel prompts that today route to JOOLA, Decathlon, Arrowmax, and Amazon",
      "Sprentzo app cited on Bengaluru “find players / sports community” prompts Playo and Hudle own today",
      "On-site readiness included: valid Organization JSON (comma + unescaped WebPage), agent-skills index on top of existing agents.md/UCP, P1 form cleanup, and clearer HTML structure",
      "Weekly re-tests of this prompt set with screenshot proof, plus a tracking dashboard for model gaps, competitor share, and clear next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get Sprentzo cited on gear and the app?",
  ctaBody:
    "Book a short call and we’ll map the 90-day plan: clear the reliability and skincare collision first, then run citation work on India paddle / apparel shortlists and Bengaluru find-players prompts — with on-site readiness (schema fix, agent-skills index, forms) included in the same engagement. You’ll also have a dashboard to track progress and know what to do next.",
};
