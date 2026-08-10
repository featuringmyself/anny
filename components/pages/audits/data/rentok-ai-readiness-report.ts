import type { ReadinessReport } from "../types";

/** Private outreach report for RentOk. On-site AI readiness, August 2026. */
export const rentokAiReadinessReport: ReadinessReport = {
  kind: "readiness",
  slug: "rentok-ai-readiness-report",
  company: "RentOk",
  website: "rentok.com",
  industry: "PG / hostel / co-living management",
  preparedFor: "Srijan Raj",
  email: "srijan@rentok.com",
  dateLabel: "August 2026",
  overallScore: 44,
  scoreLabel: "Poor",
  private: true,
  tagline:
    "How ready rentok.com is for AI agents — and what to fix inside the 90-day AI Visibility Sprint.",
  summary:
    "RentOk already has solid SEO basics, current evergreen copy, and clean Corporation structured data — but the site is not ready for agents to understand or act. No robots.txt, zero semantic HTML, missing image alt text, thin internal linking, and thirty-two automation findings (sixteen critical) leave the readiness score at 44/100. llms.txt and skill.md exist; the agent-skills index and MCP discovery files do not. The shortest path up is robots.txt, alt text, labels on real form fields, and denser internal links — on-site work included in the same 90-day AI Visibility Sprint as citation work, not a separate engagement.",
  summaryTechnical:
    "RentOk ships good title/meta, evergreen body copy aligned to 2026, and valid Corporation JSON-LD (contactPoint nested correctly; minor sameAs / availableLanguage polish still available). Gaps: no robots.txt; semantic ratio 0%; 9 owner-landing images without alt; 5/18 links internal; 32 automation issues (16 P1 missing labels on radios + mobile tel, 16 P2 missing autocomplete on the same set). llms.txt and skill.md found; no /.well-known/agent-skills/index.json and no MCP discovery signals. Fix robots, alt, form labels, and internal links inside the 90-day AI Visibility Sprint.",
  stats: [
    { label: "Automation issues", value: "32" },
    { label: "P1 blockers", value: "16" },
    { label: "Semantic ratio", value: "0%" },
    { label: "Images missing alt", value: "9" },
  ],
  insights: [
    {
      id: "insight-automation-semantics",
      title: "Critical AI readiness & semantic structure",
      body: "Sixteen critical automation blockers and essentially no meaningful HTML structure make it hard for AI agents to understand the page or complete real flows — especially forms and option pickers.",
      bodyTechnical:
        "16 P1 issues (mostly unlabeled radios and a tel input) plus a 0% semantic HTML ratio severely hinder agent parsing and form automation.",
    },
    {
      id: "insight-tech-gaps",
      title: "Fundamental technical gaps",
      body: "There is no robots.txt to guide crawlers, and several images ship without alt text — weaker crawl control, accessibility, and machine understanding of visuals.",
      bodyTechnical:
        "robots.txt is absent (inefficient crawl risk / no explicit allow-deny map). Missing alt on nine owner-landing / Equaro assets under the Azure CDN.",
    },
    {
      id: "insight-linking",
      title: "Underutilized internal linking",
      body: "Only a small share of links stay on-site. That limits navigation, authority flow, and how clearly AI can map relationships between RentOk pages.",
      bodyTechnical:
        "5 of 18 links are internal — significant underutilization for crawl paths, equity, and content-relationship signals.",
    },
  ],
  quickWins: [
    {
      id: "win-robots",
      title: "Create a robots.txt file",
      impact: "High",
      effort: "Low",
      body: "Add a robots.txt so crawlers get clear allow/deny rules — fewer wasted crawl cycles and better control over what should stay private.",
      bodyTechnical:
        "Implement robots.txt to guide search and AI crawlers; prevent inefficient crawling and accidental indexing of private paths.",
    },
    {
      id: "win-alt",
      title: "Add alt text to images",
      impact: "High",
      effort: "Medium",
      body: "Write descriptive alt for owner-feature and brand images so screen readers and AI get real context — not empty visuals.",
      bodyTechnical:
        "Add alt on owner-feature-1…8.webp, owner-feature-new-7.webp, and equaro-brand-logo.jpeg (Azure CDN owner-landing paths).",
    },
    {
      id: "win-linking",
      title: "Increase internal linking",
      impact: "High",
      effort: "Medium",
      body: "Add more on-site links between product, trust, and category pages so users and agents can follow the story — and authority spreads beyond a handful of URLs.",
      bodyTechnical:
        "Raise internal link share above 5/18; deepen topical links so agents and crawlers map content relationships.",
    },
  ],
  categories: [
    {
      id: "cat-site-files",
      title: "Site files",
      status: "poor",
      body: "llms.txt and skill.md are present, but there is no robots.txt and no agent-skills index. MCP discovery files are also missing — crawlers lack explicit instructions and advanced agents lack a capability map.",
      bodyTechnical:
        "No robots.txt. llms.txt found; skill.md found. Missing /.well-known/agent-skills/index.json and all MCP discovery signals (<link rel=\"mcp\">, webmcp/tools.json, mcp.json, server-card.json).",
      metrics: [
        { label: "robots.txt", value: "Not found" },
        { label: "llms.txt", value: "Found" },
        { label: "skill.md", value: "Found" },
        { label: "Agent skills index", value: "Not found" },
      ],
    },
    {
      id: "cat-seo",
      title: "SEO fundamentals",
      status: "good",
      body: "Title and meta description clearly describe RentOk’s purpose and features — a strong first impression for search and click-through.",
      bodyTechnical:
        "Title tag and meta description are well-optimized for purpose and key features.",
    },
    {
      id: "cat-freshness",
      title: "Content freshness",
      status: "good",
      body: "Core service copy reads evergreen and current (including an in-body 2026 reference). Older news cites in a press section are expected history, not a staleness problem for the product story.",
      bodyTechnical:
        "Evergreen/Reference. No datePublished/dateModified on the page; footer © 2026. Body reference “when you are in 2026?” aligns with audit date 2026-08-10. News cites from 2019–2023 are historical, not core-service staleness.",
      metrics: [
        { label: "Category", value: "Evergreen / reference" },
        { label: "Publication date", value: "Not found" },
        { label: "Last updated", value: "Not found" },
      ],
    },
    {
      id: "cat-schema",
      title: "Structured data (schema)",
      status: "good",
      body: "Corporation JSON-LD is in solid shape — name, logo, contact, and social profiles are present with no critical errors. A few polish items would make it even clearer for machines.",
      bodyTechnical:
        "Corporation JSON-LD well-structured (name, alternateName, url, logo, contactPoint, sameAs). No critical errors. Opportunities: ISO 639-1 for availableLanguage; drop redundant website URL from sameAs. Microdata absent (JSON-LD preferred).",
      metrics: [
        { label: "Schema found", value: "Yes" },
        { label: "Type", value: "Corporation" },
        { label: "Critical errors", value: "None" },
      ],
    },
    {
      id: "cat-content",
      title: "Content structure",
      status: "good",
      body: "Headings are plentiful and sections are well-sized. Q&A-style headings help both scanners and agents pull direct answers.",
      bodyTechnical:
        "≈40 H1–H3 headings; ~23 sections averaging ~48 words; Q&A-style headings present — strong for scan and answer extraction.",
    },
    {
      id: "cat-linking",
      title: "Internal linking",
      status: "needs-improvement",
      body: "Only five of eighteen links stay on-site. That underuses navigation, authority distribution, and how AI maps related RentOk content.",
      bodyTechnical:
        "5/18 links internal — significant underutilization for navigation, equity, and agent content-relationship signals.",
      metrics: [{ label: "Internal links", value: "5 / 18" }],
    },
    {
      id: "cat-images",
      title: "Image accessibility",
      status: "needs-improvement",
      body: "Multiple owner-feature and brand images lack alt text — weaker accessibility and weaker image understanding for search and AI.",
      bodyTechnical:
        "Missing alt on nine CDN assets: owner-feature-1…6, owner-feature-new-7, owner-feature-8.webp, equaro-brand-logo.jpeg.",
      metrics: [{ label: "Missing alt (sampled)", value: "9" }],
    },
    {
      id: "cat-semantics",
      title: "HTML semantics",
      status: "poor",
      body: "Semantic structure is effectively zero. Generic wrappers dominate, so agents struggle to map landmarks and hierarchy.",
      bodyTechnical:
        "Semantic ratio 0% — almost no HTML5 semantic tags; content hierarchy hard for agents to infer.",
      metrics: [{ label: "Semantic ratio", value: "0%" }],
    },
  ],
  automation: {
    status: "poor",
    body: "Thirty-two automation issues: sixteen critical (mostly unlabeled form controls, including the mobile field) and sixteen reliability gaps (missing autocomplete). Agents cannot reliably name or fill those inputs until labels and autocomplete land on real fields.",
    bodyTechnical:
      "32 issues: 16 P1 (programmatic label association on radios + tel), 16 P2 (missing autocomplete on the same control set). Grouped below — not every selector.",
    totalIssues: 32,
    p1Count: 16,
    p2Count: 16,
    groups: [
      {
        id: "auto-labels-real",
        severity: "P1",
        title: "Missing label on real inputs",
        count: 1,
        summary:
          "The mobile phone field has no associated label — agents and assistive tech cannot reliably know what to enter.",
        summaryTechnical:
          "tel input with placeholder “Enter mobile” (chakra-input) lacks a programmatic <label for>/id association.",
        examples: [
          '<input type="tel" placeholder="Enter mobile" class="chakra-input css-1j6uryn">',
        ],
      },
      {
        id: "auto-labels-radios",
        severity: "P1",
        title: "Missing labels on radio / option controls",
        count: 15,
        summary:
          "Product and feature radio options (including visually hidden ones) lack programmatic labels, so agents cannot map choice purpose.",
        summaryTechnical:
          "15 radios without associated labels — clipped/hidden Chakra radios and feature radios (smart-living, community, online-rent-payment, digital-kyc, etc.).",
        examples: [
          '<input id="radio-:Rqj99m4n9f6:" type="radio" name="radio-:R79f6H1:">',
          '<input id="radio-:r1:" type="radio" name="radio-:r0:" hidden value="smart-living">',
          '<input id="radio-:r3:" type="radio" name="radio-:r0:" hidden value="online-rent-payment">',
        ],
      },
      {
        id: "auto-autocomplete-real",
        severity: "P2",
        title: "Missing autocomplete on real form fields",
        count: 1,
        summary:
          "The mobile field also lacks a standard autocomplete token (e.g. tel), which weakens reliable agent form-filling.",
        summaryTechnical:
          "tel input missing autocomplete=\"tel\" (or equivalent standard token).",
        examples: [
          '<input type="tel" placeholder="Enter mobile" class="chakra-input css-1j6uryn">',
        ],
      },
      {
        id: "auto-autocomplete-radios",
        severity: "P2",
        title: "Autocomplete noise on radio chrome",
        count: 15,
        summary:
          "The same radio set is flagged for missing autocomplete. Lower priority than labeling the real tel field; clean up when touching those components.",
        summaryTechnical:
          "15 radios flagged for missing autocomplete — mostly UI chrome / hidden feature radios, not primary text entry.",
        examples: [
          '<input id="radio-:R1aj99m4n9f6:" type="radio" name="radio-:R79f6H1:">',
          '<input id="radio-:r4:" type="radio" name="radio-:r0:" hidden value="digital-kyc">',
        ],
      },
    ],
  },
  agentsIntro:
    "Without a robots.txt there is no explicit crawl map, though default agent access appears open. llms.txt and skill.md are present; the agent-skills index and MCP discovery files are not.",
  agentsIntroTechnical:
    "No robots.txt file. Agent table shows all listed bots as allowed (no explicit blocks). llms.txt and skill.md found. Missing: <link rel=\"mcp\">, /.well-known/webmcp/tools.json, mcp.json, mcp/server-card.json, and /.well-known/agent-skills/index.json.",
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
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "Get RentOk cited in AI answers within 90 days",
    body: "When landlords and property managers ask ChatGPT, Perplexity, Google AI Overview, and other models for tools like yours, RentOk should show up — not smaller PG tools or WhatsApp-rent apps. We start with the trust failures that kill the demo: Rentokil brand collision and the rentok.com reliability warning. Then citation work on the category and feature prompts in the visibility audit. On-site readiness from this audit — robots.txt, image alt, form labels, denser internal links, clearer HTML — is included in that same 90-day sprint so citation gains land on a site agents can parse. Not a separate product. You also get a dashboard for model gaps, competitor share, and next actions each week.",
    outcomes: [
      "Brand and domain trust fixed so “is rentok reliable” stops returning pest control or a caution flag",
      "Cited on priority India PG / hostel / rent prompts across ChatGPT, Perplexity, Google AI Overview, Gemini, and Claude",
      "On-site readiness included: robots.txt, alt text, labeled mobile/option fields, stronger internal linking, and clearer HTML structure",
      "Agent-skills index (and tighter discovery) so advanced agents can find what RentOk offers",
      "Weekly re-tests with screenshot proof, plus a tracking dashboard for model gaps, competitor share, and clear next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get RentOk cited?",
  ctaBody:
    "Book a short call and we’ll map the 90-day plan: fix the Rentokil and rentok.com trust failures first, then run the citation work that puts RentOk on the shortlists owners already ask AI for — with on-site readiness (robots, alt, forms, linking) included in the same engagement. You’ll also have a dashboard to track progress and know what to do next.",
};
