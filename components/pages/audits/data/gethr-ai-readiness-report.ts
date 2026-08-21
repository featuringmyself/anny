import type { ReadinessReport } from "../types";

/** Private outreach report for 2gethr. On-site AI readiness, August 2026. */
export const gethrAiReadinessReport: ReadinessReport = {
  kind: "readiness",
  slug: "2gethr-ai-readiness-report",
  company: "2gethr",
  website: "2gethr.com",
  industry: "Managed offices & GCC workspaces",
  preparedFor: "Amit Prakash",
  role: "Cofounder",
  email: "sales@2gethr.co.in",
  dateLabel: "August 2026",
  overallScore: 38,
  scoreLabel: "Poor",
  private: true,
  tagline:
    "How ready 2gethr.com is for AI search — and what to fix inside the 90-day AI Visibility Sprint.",
  summary:
    "Across five pages, 2gethr.com scores 38/100 — below the PropTech median. Crawlers are allowed in, but most of what 2gethr sells is trapped in pictures and silent video: 209 homepage images against roughly 600 words, 39 images with no alt, 151 with generic alt, two videos with no transcript, and zero JSON-LD. Heading hierarchy, schema completeness, and content freshness are where the industry’s top quartile pulls away. On-page 46, technical 47, authority 37, AI readiness 27. The shortest path up is text equivalents for media, one H1, Organization schema, and an FAQ agents can quote — included in the same 90-day AI Visibility Sprint as citation work, not a separate engagement.",
  summaryTechnical:
    "5-page AEO re-read (/, and commercial templates). Homepage: ~209 <img>, ~593 visible words, 0 <figcaption>, 2 <video> (Framer mp4s) with 0 <track>. 39 images missing alt; 151 generic/short/filename-style alts. FAQ: no FAQPage, 1 question heading (“Why 2gethr?”), 0 question sentences in body. 0 JSON-LD / Microdata on /, /gcc, /about-us, /managed-offices, /schedule-a-visit. 29 <h1> / 4 <h2> / 0 <h3> on /. robots.txt allows *; sitemap 64 URLs, 0 lastmod. Enquiry form: 7 real fields × 4 Framer copies unlabeled. /llms.txt and MCP/skills 404. Cohort: below median vs 36 PropTech sites; top quartile leads on freshness, heading hierarchy, and schema completeness. Pillars — on-page 46, technical 47, authority 37, AI readiness 27.",
  stats: [
    { label: "AI readiness", value: "27/100" },
    { label: "Homepage images", value: "209" },
    { label: "Usable alt", value: "19" },
    { label: "JSON-LD blocks", value: "0" },
  ],
  insights: [
    {
      id: "insight-media",
      title: "The offer is trapped in images and video",
      body: "AI search reads text, not pictures of space. The homepage is a gallery — two hundred images, about six hundred words, no captions — so GCC floors, managed-office layouts, and client proof stay invisible to answer engines. Two hero videos have no transcript. Until alt, captions, and copy carry the same facts as the photography, 2gethr cannot be cited for what the rooms actually are.",
      bodyTechnical:
        "Homepage: 209 images vs ~593 words. 39 missing alt; 151 alt values generic, filename-like, or too short (gallery, GCC 1, CBD, client-mark one-liners). 0 <figure>/<figcaption>. 2 videos (framerusercontent …/6zPLJOPIcnPiAFug4YIM7dMjYM.mp4 and …/9vCVVJjhFc9QOMIYAOlwfZFonM.mp4), preload=none, 0 <track kind=\"captions|descriptions\">. Same pattern on /gcc (2 silent videos) and image-heavy /managed-offices and /coworking.",
    },
    {
      id: "insight-schema-headings",
      title: "No machine-readable business layer",
      body: "Search and AI have no explicit markup for 2gethr as a company, a workspace operator, or a local office. Combined with twenty-nine competing H1s, agents cannot tell what the page is about or quote a clean answer about managed offices and GCCs. That schema and heading gap is exactly where the PropTech top quartile leads.",
      bodyTechnical:
        "0 JSON-LD and 0 Microdata on the homepage, /gcc, /about-us, /managed-offices, /schedule-a-visit, and sampled posts. 29 <h1> include metric chips (8M+, 11.5 K, 82%, 97%) and Framer breakpoint duplicates (e.g. “2gethr Works For You” ×3, “Client Testimonials” ×4). No Organization @id, LocalBusiness, Service, or FAQPage.",
    },
    {
      id: "insight-forms",
      title: "Enquiry form agents cannot complete",
      body: "The tour / Let’s Connect form is the commercial path — and every real field is unlabeled. Placeholders like “John” and “xyz@xyz.com” are not names agents or assistive tech can trust, so the capture path leaks.",
      bodyTechnical:
        "Homepage ships 4 copies of the same form (Framer SSR variants): First_Name, Last_Name, Company, Job_Title, Email, Phone_Number, Number_Of_Employees — 0 <label>, 0 aria-label, 0 autocomplete. 11 honeypot inputs per copy use autocomplete=\"one-time-code\". /schedule-a-visit adds unlabeled Source and Membership_Type <select>s. No CAPTCHA in static HTML.",
    },
    {
      id: "insight-cite",
      title: "Nothing for answer engines to quote",
      body: "There is no FAQ, no llms.txt, and almost no question-and-answer copy. We found one question heading — “Why 2gethr?” — and zero questions in the body. AI can crawl the site and still have no self-contained paragraph to lift.",
      bodyTechnical:
        "FAQ structure: none. Question headings: 1 (“Why 2gethr?”). Questions detected in content: 0. /llms.txt 404. Meta description 204 chars (over 50–160). Title 74 chars. No tel:/mailto: on /. Phones and sales@2gethr.co.in appear on /schedule-a-visit as plain text. Testimonials are images (e.g. Anil Goteti Scapia) without Review/AggregateRating schema.",
    },
  ],
  quickWins: [
    {
      id: "win-media-text",
      title: "Put the rooms into text AI can read",
      impact: "High",
      effort: "Medium",
      body: "Write real alt and a one-line caption for space and testimonial images, add transcripts under the two homepage videos, and put the 8M+ / occupancy stats in HTML — not only in the picture.",
      bodyTechnical:
        "Homepage: describe 39 missing alts; rewrite 151 generic/short alts (gallery, GCC 1, CBD). Add <figcaption> takeaways on gallery and testimonial frames (201 images currently have none). Provide <track kind=\"captions\"> (or a visible transcript) for the two Framer mp4 heroes. Repeat on /gcc videos. Keep named client-logo alts.",
    },
    {
      id: "win-schema",
      title: "Ship Organization + LocalBusiness JSON-LD",
      impact: "High",
      effort: "Medium",
      body: "Add machine-readable markup for the company, Bangalore / Hyderabad locations, and core services so search and AI can name 2gethr correctly and attach it to the map graph.",
      bodyTechnical:
        "Homepage: Organization with a stable @id and sameAs (LinkedIn, X, YouTube, Instagram). Location pages: LocalBusiness / CoworkingSpace with NAP, geo, openingHours. Service JSON-LD for GCC, managed offices, and coworking. FAQPage on /gcc and /managed-offices. Article/BlogPosting on posts (Independence Day already has <time datetime=\"2026-08-17\">).",
    },
    {
      id: "win-headings",
      title: "Collapse to one descriptive H1",
      impact: "High",
      effort: "Low",
      body: "Keep a single H1 that names the offer — managed offices and GCC workspaces in Bangalore and Hyderabad — and turn stats and section titles into H2/H3 so agents can extract the page topic.",
      bodyTechnical:
        "One H1 (the current <title> intent is fine). Demote metric chips and duplicated section titles. Use H2/H3 for Solutions, Why 2gethr, locations, and testimonials. Stop emitting breakpoint copies of the same heading in the SSR HTML.",
    },
    {
      id: "win-faq",
      title: "Add FAQ copy engines can lift",
      impact: "High",
      effort: "Low",
      body: "Turn “Why 2gethr?” into a real Q&A block — GCC vs managed office vs coworking, Bangalore locations, tour SLA — with FAQPage schema so answer engines have something to cite.",
      bodyTechnical:
        "Add visible question/answer pairs (not only an H1). Ship FAQPage JSON-LD on /, /gcc, and /managed-offices. /locations-cbd already has “Got Questions?” as an H1 with no answers underneath — fill it.",
    },
    {
      id: "win-form-labels",
      title: "Label every enquiry field",
      impact: "High",
      effort: "Low",
      body: "Give First name, Email, Phone, and the rest real labels and autocomplete so people, screen readers, and agents can finish a tour request without guessing.",
      bodyTechnical:
        "Associate <label for> (or wrap) each visible input; add autocomplete=given-name, family-name, organization, email, tel, organization-title. Keep honeypots out of the interactive contract (do not use autocomplete=\"one-time-code\" on dummy fields). Mirror the same on /schedule-a-visit selects.",
    },
    {
      id: "win-llms",
      title: "Publish llms.txt",
      impact: "Medium",
      effort: "Low",
      body: "Add a short /llms.txt that names services, locations, and key pages so AI systems that look for that file are not sent to a 404.",
      bodyTechnical:
        "Add /llms.txt (and optionally /agents.md) summarising GCC, managed offices, coworking, CBD / ORR / HSR, and /schedule-a-visit.",
    },
  ],
  categories: [
    {
      id: "cat-site-files",
      title: "Site files",
      status: "needs-improvement",
      body: "robots.txt is real and does not block AI crawlers. The sitemap lists sixty-four pages, but none carry a last-updated date. There is no llms.txt or agent-skills file — tools that look for those paths get a 404.",
      bodyTechnical:
        "robots.txt: User-agent: * Allow: / plus Sitemap. sitemap.xml: 64 loc, 0 lastmod (50 blog URLs). /llms.txt, /skill.md, /agents.md, /.well-known/agent-skills/index.json, mcp.json, webmcp/tools.json, mcp/server-card.json, and /.well-known/ucp all 404. No <link rel=\"mcp\">.",
      metrics: [
        { label: "robots.txt", value: "Present · agents allowed" },
        { label: "sitemap.xml", value: "64 URLs · no lastmod" },
        { label: "llms.txt", value: "404" },
        { label: "MCP / skills paths", value: "404" },
      ],
    },
    {
      id: "cat-seo",
      title: "SEO fundamentals",
      status: "needs-improvement",
      body: "Title and description say what 2gethr sells, and canonical, language, and viewport are in place. Both tags run long, so the line AI and Google would quote gets cut.",
      bodyTechnical:
        "Title 74 chars (target 30–65): “Managed Offices & GCC Workspaces in Bangalore & Hyderabad | 2gethr”. Meta description 204 chars (target 50–160). Canonical https://www.2gethr.com/. html lang=en, charset=utf-8, viewport set, robots=max-image-preview:large (not noindex). OG + Twitter cards present.",
    },
    {
      id: "cat-freshness",
      title: "Content freshness",
      status: "needs-improvement",
      body: "The marketing site itself is current — published this month, with a new Independence Day post. Against 36 PropTech sites, freshness is still a gap: the sitemap hides dates, and 2022-titled guides sit next to that new work. The industry top quartile leads here.",
      bodyTechnical:
        "Framer published Aug 19, 2026. Blog post /blog/independence-day-at-2gethr-… has <time datetime=\"2026-08-17\">. Sitemap has no lastmod. Live 2022-titled URLs remain (e.g. co-working-space-vs-managed-office-…-ultimate-guide-2022). No dateModified in schema. Cohort: below median vs 36 PropTech audits; top quartile leads on content freshness.",
      metrics: [
        { label: "Site published", value: "19 Aug 2026" },
        { label: "Latest post", value: "17 Aug 2026" },
        { label: "Sitemap lastmod", value: "Absent" },
      ],
    },
    {
      id: "cat-schema",
      title: "Structured data (schema)",
      status: "poor",
      body: "No structured data on the pages we checked — not the homepage, not locations, not the tour form, not the blog. Rich results and a clear entity for AI stay out of reach until JSON-LD lands in the HTML.",
      bodyTechnical:
        "0 application/ld+json blocks; no itemscope. Missing Organization, WebSite, LocalBusiness, Service, FAQPage, BreadcrumbList, Review/AggregateRating, and Article/BlogPosting. Location pages (e.g. /locations-cbd) have no NAP schema despite being local intent.",
      metrics: [
        { label: "Schema found", value: "No" },
        { label: "JSON-LD", value: "None" },
        { label: "Microdata", value: "None" },
      ],
    },
    {
      id: "cat-content",
      title: "Content structure",
      status: "poor",
      body: "The homepage does not have one topic heading. Stats, testimonials, and sections all shout at the same level. There is no FAQ structure — one question heading, zero questions in the copy — so engines have nothing to lift as a direct answer.",
      bodyTechnical:
        "29 H1 / 4 H2 / 0 H3 on /. Duplicate SSR headings from Framer breakpoints. Question coverage: 1 heading (“Why 2gethr?”), 0 questions in body, no FAQPage. Visible copy ~593 words vs 209 images. Heading hierarchy is a top-quartile gap vs the PropTech cohort.",
    },
    {
      id: "cat-linking",
      title: "Internal linking",
      status: "good",
      body: "Nav, locations, solutions, blog, and the tour CTA stay on-site, with a few real social profiles outbound. That is a usable map for crawlers — denser in-content links on location and GCC pages would still help.",
      bodyTechnical:
        "Homepage anchors are relative (./about-us, ./gcc, ./managed-offices, ./locations-cbd|orr|hsr, ./blog, ./schedule-a-visit). Outbound: LinkedIn / X / YouTube / Instagram company profiles. No tel: or mailto: on /.",
    },
    {
      id: "cat-images",
      title: "Image accessibility",
      status: "poor",
      body: "AI cannot read the product. Of 209 homepage images, 39 have no alt, 151 have generic or tiny labels, and 201 have no caption. Two videos ship without a transcript. Client-logo names help; the rooms, galleries, and proof do not.",
      bodyTechnical:
        "Homepage: 209 <img>, ~593 words. 39 missing alt; 151 generic/short/filename-style (gallery ×60, GCC 1–4, CBD/ORR/HSR, one-word marks). ~19 alts are actually descriptive. 0 figcaption. 2 muted looping mp4s, 0 <track>. /gcc repeats 2 silent videos; /managed-offices and /coworking stay image-heavy with the same missing-alt pattern.",
      metrics: [
        { label: "Missing alt", value: "39" },
        { label: "Generic / short alt", value: "151" },
        { label: "No caption", value: "201" },
        { label: "Videos without transcript", value: "2" },
      ],
    },
    {
      id: "cat-semantics",
      title: "HTML semantics",
      status: "poor",
      body: "Meaningful structure is almost absent. The page is a Framer box tree, so agents cannot reliably find header, footer, or article regions.",
      bodyTechnical:
        "Semantic ratio ≈1%. ~661 div / 38 span; nav×3, main×1, section×2; no header, footer, article, or figure. Heavy inline style= attributes (600+). Typical Framer SSR duplication across breakpoints.",
      metrics: [
        { label: "Semantic ratio", value: "~1%" },
        { label: "div / span", value: "661 / 38" },
      ],
    },
  ],
  automation: {
    status: "poor",
    body: "Sixty-seven issues sit on the commercial form: twenty-eight critical unlabeled fields, twenty-eight missing autocomplete hints, and eleven honeypot fields that look interactive. Framer repeats the same form four times, so the leak is on every breakpoint copy. Grouped below by pattern.",
    bodyTechnical:
      "67 issues on the homepage enquiry form: 28 P1 unlabeled visible fields (7 unique × 4 Framer copies), 28 P2 missing autocomplete on those same fields, and 11 unique honeypot names using autocomplete=\"one-time-code\". /schedule-a-visit repeats the pattern (2 copies) plus unlabeled Source and Membership_Type selects. No CAPTCHA in static HTML.",
    totalIssues: 67,
    p1Count: 28,
    p2Count: 39,
    groups: [
      {
        id: "auto-labels",
        severity: "P1",
        title: "Missing labels on tour / Let’s Connect fields",
        count: 28,
        summary:
          "First name, last name, company, job title, email, phone, and headcount have placeholders only. Agents and screen readers cannot name the field purpose, so tour requests fail the automation test.",
        summaryTechnical:
          "7 unique visible inputs × 4 Framer SSR copies, all without <label>, for/id, or aria-label. Placeholders: John, Doe, XYZ Corp., Founder, xyz@xyz.com, 1234557890, 250.",
        examples: [
          '<input type="text" name="First_Name" placeholder="John">',
          '<input type="email" name="Email" placeholder="xyz@xyz.com">',
          '<input type="tel" name="Phone_Number" placeholder="1234557890">',
        ],
      },
      {
        id: "auto-autocomplete",
        severity: "P2",
        title: "Missing autocomplete on real enquiry fields",
        count: 28,
        summary:
          "The same seven fields lack standard autocomplete tokens, so browsers and agents cannot fill a tour request reliably.",
        summaryTechnical:
          "No autocomplete on First_Name, Last_Name, Company, Job_Title, Email, Phone_Number, Number_Of_Employees (×4 copies). Expected tokens: given-name, family-name, organization, organization-title, email, tel.",
        examples: [
          '<input type="text" name="Company" placeholder="XYZ Corp.">',
          '<input type="text" name="Job_Title" placeholder="Founder">',
          '<input type="number" name="Number_Of_Employees" placeholder="250">',
        ],
      },
      {
        id: "auto-honeypot",
        severity: "P2",
        title: "Honeypot fields with misleading autocomplete",
        count: 11,
        summary:
          "Dummy fields (website, message, comments, …) sit in the DOM with autocomplete set to a one-time-code token. Keep spam traps out of the interactive contract so agents do not treat them as real questions.",
        summaryTechnical:
          "11 unique dummy names per form copy (website, company, message, subject, title, description, feedback, notes, details, remarks, comments) with autocomplete=\"one-time-code\". 44 DOM instances on the homepage. Prefer hidden + tab-index/-1, not a 2FA autocomplete token.",
        examples: [
          '<input type="text" name="website" autocomplete="one-time-code">',
          '<input type="text" name="message" autocomplete="one-time-code">',
          '<input type="text" name="comments" autocomplete="one-time-code">',
        ],
      },
    ],
  },
  agentsIntro:
    "Major AI crawlers are allowed via robots.txt. Discovery still stops there: llms.txt, skill files, and MCP cards all 404, so advanced agents have no instruction document to read.",
  agentsIntroTechnical:
    "robots.txt allows User-agent: *. Real 404 (not HTML shells): /llms.txt, /skill.md, /agents.md, /.well-known/agent-skills/index.json, mcp.json, webmcp/tools.json, mcp/server-card.json, /.well-known/ucp. No <link rel=\"mcp\">.",
  llmsTxtFound: false,
  discoverySignals: [
    { id: "sig-mcp-link", label: '<link rel="mcp">', found: false },
    {
      id: "sig-webmcp",
      label: "/.well-known/webmcp/tools.json",
      found: false,
      note: "HTTP 404",
    },
    {
      id: "sig-mcp-json",
      label: "/.well-known/mcp.json",
      found: false,
      note: "HTTP 404",
    },
    {
      id: "sig-server-card",
      label: "/.well-known/mcp/server-card.json",
      found: false,
      note: "HTTP 404",
    },
    {
      id: "sig-skills",
      label: "/.well-known/agent-skills/index.json",
      found: false,
      note: "HTTP 404",
    },
    {
      id: "sig-llms",
      label: "/llms.txt",
      found: false,
      note: "HTTP 404",
    },
    {
      id: "sig-skill-md",
      label: "/skill.md",
      found: false,
      note: "HTTP 404",
    },
    {
      id: "sig-agents-md",
      label: "/agents.md",
      found: false,
      note: "HTTP 404",
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
      "Get 2gethr cited when enterprises ask AI for GCC and managed offices in Bangalore",
    body: "When workplace leads ask ChatGPT, Perplexity, Google AI Overview, and other models for managed offices, GCC buildouts, or coworking in Bangalore and Hyderabad, 2gethr.com should clear the trust gate and own the shortlist — not only WeWork, Smartworks, or Awfis. We start by making the site parseable: text equivalents for the gallery and videos, Organization and location schema, one H1, FAQ answers, labeled tour fields, llms.txt. That closes the gap vs the PropTech top quartile on freshness, headings, and schema. On-site work from this audit is included in the same 90-day sprint so citation gains land on a site agents can quote. Not a separate product. You get a dashboard that re-tests the prompt set and surfaces what to do next.",
    outcomes: [
      "Cited on priority Bangalore / Hyderabad GCC and managed-office prompts that today route to larger flex brands",
      "On-site readiness included: Organization + LocalBusiness + Service JSON-LD, one H1, FAQPage copy, labeled enquiry fields, descriptive alt + captions, video transcripts, and a real /llms.txt",
      "Location pages (CBD, ORR, HSR) with NAP schema so map and answer engines can attach 2gethr to a place",
      "Tour capture path agents can complete — labels, autocomplete, honeypots kept out of the interactive contract",
      "Weekly re-tests of the prompt set with a tracking dashboard for model gaps, competitor share, and next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline:
    "Ready to get 2gethr cited on GCC and managed-office prompts?",
  ctaBody:
    "Book a short call. We will map the 90-day plan from this audit: put the rooms into text AI can read, install schema and FAQ, fix headings and the tour form, then run citation work on the Bangalore / Hyderabad workspace prompts enterprises already ask AI — with on-site readiness included in the same engagement. You get a dashboard that re-tests this prompt set and suggests what to do next.",
};
