import type { ReadinessReport } from "../types";

/** Private outreach report for Linkrunner. On-site AI readiness, August 2026. */
export const linkrunnerAiReadinessReport: ReadinessReport = {
  kind: "readiness",
  slug: "linkrunner-ai-readiness-report",
  company: "Linkrunner",
  website: "linkrunner.io",
  industry: "Mobile measurement partner (MMP) · attribution & deep links",
  preparedFor: "Shreyans Sancheti",
  role: "Co-founder & CEO",
  dateLabel: "August 2026",
  overallScore: 82,
  scoreLabel: "Strong",
  private: true,
  tagline:
    "linkrunner.io is one of the most AI-ready sites we have audited — and it is winning 2 of 14 MMP shortlists. Here is why more schema will not fix that.",
  summary:
    "This is the rare audit where we are not here to tell you the site is broken. linkrunner.io scores 82/100. robots.txt names nine AI crawlers and allows them explicitly. /llms.txt is real and thorough, and every HTML route advertises a markdown twin. The sitemap carries 329 URLs with a last-modified date on all 329. The homepage has one H1, eight H2s, sixteen H3s, real header / main / nav / footer landmarks, and clean Organization, WebSite and SoftwareApplication JSON-LD. The pricing page ships FAQPage, Review and AggregateRating. That work is why ChatGPT describes the product correctly the moment you paste the domain. The remaining gaps are narrow but they are the expensive ones, and all three are about proof rather than markup: customer results live only as page text, so no machine-readable link ties Playo's 34% CPI cut to Linkrunner; the published per-install rate card — the differentiator legacy MMPs cannot match — exists in no structured data; and the Organization entity has no alternate name, no disambiguating description, and links only to four social profiles, so nothing separates Linkrunner from the NetAlly LinkRunner cable tester or answers the “only one G2 review” hedge. Readiness is not the constraint any more. Off-site authority is.",
  summaryTechnical:
    "82/100 across 5 pages (/, /pricing, /contact, /about, /customer-stories/playo). robots.txt: explicit User-agent groups for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, GoogleOther, CCBot — Allow: /, Disallow: /api/, plus Host and Sitemap. /llms.txt 200 text/plain (~78 KB, 346 lines) indexing markdown twins; homepage returns link: <https://linkrunner.io/index.md>; rel=\"alternate\"; type=\"text/markdown\". sitemap.xml: 329 loc / 329 lastmod. Homepage: 1 H1 / 8 H2 / 16 H3; header=1 main=1 nav=1 footer=1 section=9 article=10; 91 <img>, 0 missing alt (38 alt=\"\" are duplicate marquee logos and engine icons, 53 described); title 50 chars, meta description 127 chars, canonical present. JSON-LD: Organization (@id, PostalAddress, foundingDate 2024-12-25, areaServed, 4 sameAs) + WebSite + SoftwareApplication (offers price 0 USD). Gaps: no FAQPage on / despite a visible 3-question FAQ (present on /pricing with 7 Question/Answer + 6 Review + AggregateRating); no aggregateRating or PriceSpecification on SoftwareApplication, so the ₹1.00→₹0.70 / $0.010→$0.007 rate card is not machine-readable; /customer-stories/playo… ships Article + BreadcrumbList + Organization + Person but no Review, no quantified result, and no about/mentions edge to Playo; Organization has no alternateName or disambiguatingDescription and sameAs omits G2, Gartner, Crunchbase and Wikidata; /skill.md, /agents.md, /.well-known/agent-skills/index.json, mcp.json, webmcp/tools.json, mcp/server-card.json all 404 while the site markets Link AI over MCP, CLI, Agent and Skills. Contact form is well built (labels + autocomplete) but 2 required controls are aria-hidden native fallbacks behind custom comboboxes.",
  stats: [
    { label: "Readiness score", value: "82/100" },
    { label: "Discovery cites", value: "2 / 14" },
    { label: "Sitemap lastmod", value: "329 / 329" },
    { label: "Authority sameAs", value: "0" },
  ],
  insights: [
    {
      id: "insight-ceiling",
      title: "Readiness is done. Visibility is the gap.",
      body: "Eighty-two on readiness, fourteen percent on citations. Those two numbers together are the whole finding. Linkrunner has already built what most teams are still arguing about — crawler access, llms.txt, markdown twins, clean schema, honest heading structure — and it produced a site AI reads accurately and almost never recommends. Another round of on-site work will not close that. Models assemble MMP shortlists from third-party ground truth, and that is where Linkrunner is thin.",
      bodyTechnical:
        "Readiness 82/100 vs 14% ChatGPT citation rate across 14 audited discovery prompts (2 cited). Crawl, parse, and entity-comprehension checks pass; the failures are all retrieval-side — comparison listicles, review platforms, and community threads that models cite when building MMP shortlists. Marginal return on further on-page markup is close to zero.",
    },
    {
      id: "insight-proof",
      title: "Customer results are text, not data",
      body: "Playo's 34% CPI reduction and the ₹20.30 to ₹13.39 drop sit on the homepage as design. Matiks at 46%, CashBook at 46%, Jumbo at $1M tracked — same. The customer story pages are marked up as articles, with no structured review, no quantified outcome, and nothing that names the customer as an entity connected to Linkrunner. Asked which MMP Playo uses, ChatGPT considered AppsFlyer, Adjust, Singular, Branch and Kochava and said it could not tell. The best proof Linkrunner owns is invisible in exactly the moment it would win the deal.",
      bodyTechnical:
        "/customer-stories/how-playo-cut-their-google-ads-cpi-by-34-…: Article + BreadcrumbList + Organization + Person, 1 H1. No Review, no AggregateRating, no about/mentions edge to a Playo Organization node, and the 34% / ₹20.30→₹13.39 figures appear only in body copy. /pricing already carries 6 Review + AggregateRating, so the pattern exists in the codebase — it is simply not applied to the case studies or surfaced on /.",
    },
    {
      id: "insight-disambiguation",
      title: "Nothing separates you from a cable tester",
      body: "Ask for a “Linkrunner review” and the answer is the NetAlly LinkRunner, a copper cable and PoE tester, scored 9/10. The Organization markup is clean but it carries no alternate name, no disambiguating description, and links out to four social profiles only. There is no machine-readable statement that Linkrunner is the Bengaluru MMP and not network hardware, and no link to the review or company profiles models lean on when they judge whether a vendor is proven.",
      bodyTechnical:
        "Organization @id https://linkrunner.io/#organization has name, url, logo, foundingDate 2024-12-25, email, PostalAddress (HSR Layout, Bengaluru), areaServed, and sameAs → x.com, linkedin.com, youtube.com, instagram.com. Missing: alternateName, disambiguatingDescription, and sameAs entries for G2, Gartner Peer Insights, Crunchbase, and Wikidata. foundingDate is the field models quote back as the youth caution (“incorporated December 2024”, “relatively young”) with no counterweight in the graph.",
    },
    {
      id: "insight-pricing-schema",
      title: "The sharpest differentiator is not machine-readable",
      body: "Published per-install pricing is the one thing Linkrunner has that AppsFlyer and Adjust structurally cannot copy. It is a rendered table. The SoftwareApplication markup declares a single price of zero, and the four-tier rate card in rupees and dollars appears in no structured data. Asked for MMPs with transparent per-install pricing, ChatGPT returned Tenjin, Singular, AppsFlyer and Airbridge, and left out the only vendor on that list who actually publishes a full rate card.",
      bodyTechnical:
        "SoftwareApplication offers = { price: \"0\", priceCurrency: \"USD\" } only. No Offer / PriceSpecification / UnitPriceSpecification nodes for ₹1.00–₹0.70 and $0.010–$0.007 across the 50K / 100K / 500K / 500K+ tiers, no eligibleQuantity, and no aggregateRating. /pricing renders the tiers and the comparison table in HTML and markdown but exposes no priced Offers, so the claim is not retrievable as a fact.",
    },
  ],
  quickWins: [
    {
      id: "win-review-schema",
      title: "Make the customer wins machine-readable",
      impact: "High",
      effort: "Medium",
      body: "Add structured review markup with the actual numbers to each customer story — Playo 34%, Matiks 46%, CashBook 46% — and name the customer as an organisation connected to Linkrunner. Then surface a rollup on the homepage so the proof travels with the brand.",
      bodyTechnical:
        "On each /customer-stories/* page add Review (author = customer Organization, itemReviewed = Linkrunner SoftwareApplication) plus a quantified reviewBody, and an about/mentions edge to the customer Organization node with its own sameAs. Add AggregateRating to the SoftwareApplication on / from the same set. Keep Article for the narrative.",
    },
    {
      id: "win-disambiguation",
      title: "Claim the name against NetAlly",
      impact: "High",
      effort: "Low",
      body: "State in markup that Linkrunner is the mobile measurement partner based in Bengaluru, add the alternate names people type, and link out to the company and review profiles that establish you are a real, reviewed vendor rather than a cable tester.",
      bodyTechnical:
        "Add alternateName (\"Linkrunner.io\", \"Linkrunner Private Limited\") and disambiguatingDescription to the Organization node. Extend sameAs to G2, Gartner Peer Insights, Crunchbase, and a Wikidata item once created. Consider a knowledge-panel-eligible entity page that is explicit about the category.",
    },
    {
      id: "win-offer-schema",
      title: "Publish the rate card as structured Offers",
      impact: "High",
      effort: "Low",
      body: "Turn the four pricing tiers into machine-readable offers in both currencies so an answer engine can retrieve “₹1.00 per install, ₹0.70 above 500K, 25,000 free” as a fact instead of reading it off a table it may never parse.",
      bodyTechnical:
        "On /pricing emit Offer / UnitPriceSpecification per tier (₹1.00 / $0.010 ≤50K, ₹0.90 / $0.009 ≤100K, ₹0.80 / $0.008 ≤500K, ₹0.70 / $0.007 >500K) with eligibleQuantity, priceCurrency in INR and USD, and a free-tier Offer for the 25,000 attributed installs. Reference them from the SoftwareApplication node.",
    },
    {
      id: "win-faq-homepage",
      title: "Extend FAQPage past the pricing page",
      impact: "Medium",
      effort: "Low",
      body: "The pricing page already does this properly. The homepage has a visible three-question FAQ with no markup, and the comparison pages answer the questions buyers actually ask before switching. Mark them all up so those answers are quotable.",
      bodyTechnical:
        "Add FAQPage to / (the three “Mobile measurement answers” Q&As), /compare/appsflyer, /compare/adjust, /compare/branch, /compare/singular, and the India alternative pages. /pricing's 7 Question/Answer implementation is the template.",
    },
    {
      id: "win-mcp",
      title: "Ship the agent files Link AI already promises",
      impact: "Medium",
      effort: "Low",
      body: "The site markets Link AI as exposing attribution data through MCP, CLI, Agent and Skills. Every one of those discovery paths currently returns a 404. For a company selling agent access to its data, that is the cheapest credibility fix on the list.",
      bodyTechnical:
        "/skill.md, /agents.md, /.well-known/agent-skills/index.json, /.well-known/mcp.json, /.well-known/webmcp/tools.json, and /.well-known/mcp/server-card.json all return 404 (HTML shell). llms.txt and the markdown twins are already excellent — add a skills index and an MCP server card, and a <link rel=\"mcp\"> hint.",
    },
    {
      id: "win-form-agents",
      title: "Let an agent finish the contact form",
      impact: "Low",
      effort: "Low",
      body: "The form is labelled and autocompleted properly — better than most. Two of its controls, including a required one, only exist as hidden fallbacks behind custom dropdowns, so an agent reading the page cannot complete a demo request.",
      bodyTechnical:
        "has_app (required) and found_us render as <select aria-hidden=\"true\" tabindex=\"-1\"> clipped fallbacks behind Radix comboboxes; the consent checkbox follows the same pattern. Expose accessible names and roles on the visible controls, or keep the native selects reachable, so headless agents can submit /contact.",
    },
  ],
  categories: [
    {
      id: "cat-site-files",
      title: "Site files",
      status: "good",
      body: "As good as this gets. robots.txt names nine AI crawlers individually and allows them, keeping only /api/ out. llms.txt is real, substantial, and indexes a markdown version of every page. The sitemap lists 329 URLs and every single one carries a last-modified date.",
      bodyTechnical:
        "robots.txt: dedicated User-agent group for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, GoogleOther, CCBot → Allow: /, Disallow: /api/; wildcard group identical; Host and Sitemap directives present. /llms.txt 200 text/plain, ~78 KB / 346 lines. sitemap.xml 200 application/xml, 329 loc, 329 lastmod.",
      metrics: [
        { label: "robots.txt", value: "9 AI agents named · allowed" },
        { label: "llms.txt", value: "Found · 78 KB" },
        { label: "sitemap.xml", value: "329 URLs · 329 lastmod" },
        { label: "Markdown twins", value: "Link header on every route" },
      ],
    },
    {
      id: "cat-entity-proof",
      title: "Entity & proof signals",
      status: "poor",
      body: "The weakest area, and the one costing citations. Linkrunner is a clean entity with no supporting evidence attached: four social links, no review or company profiles, no alternate name, and nothing to distinguish the MMP from the NetAlly cable tester of the same name. Customer outcomes are page copy, not data. Founded-in-December-2024 is declared in markup with no counterweight, and models repeat it back as a reason to be cautious.",
      bodyTechnical:
        "Organization sameAs = x.com, linkedin.com, youtube.com, instagram.com. No G2 / Gartner / Crunchbase / Wikidata. No alternateName, no disambiguatingDescription. No AggregateRating on SoftwareApplication. Case studies carry no Review and no about/mentions edge to customer entities. foundingDate 2024-12-25 is surfaced without offsetting proof nodes (certifications, customer count, volume).",
      metrics: [
        { label: "Authority sameAs", value: "0 of 4 profiles" },
        { label: "Review schema on stories", value: "None" },
        { label: "AggregateRating", value: "Pricing page only" },
        { label: "Brand disambiguation", value: "Absent" },
      ],
    },
    {
      id: "cat-schema",
      title: "Structured data (schema)",
      status: "needs-improvement",
      body: "Genuinely good foundations: Organization with a stable identifier and a real Bengaluru address, WebSite, SoftwareApplication, and a properly built FAQ with reviews and a rating on the pricing page. Two things are missing and both are commercial. The homepage FAQ has no markup, and the published per-install rate card — the hardest thing for a legacy MMP to copy — is not in structured data anywhere.",
      bodyTechnical:
        "Homepage: 4 JSON-LD blocks — Organization (@id, ImageObject logo, PostalAddress, foundingDate, areaServed, sameAs), WebSite (publisher ref), SoftwareApplication (BusinessApplication, offers price 0 USD). /pricing adds FAQPage + 7 Question/Answer + 6 Review + AggregateRating + 2 Offer. Missing: FAQPage on / and on comparison pages; Offer / UnitPriceSpecification for the 4 published tiers in INR and USD; aggregateRating on the SoftwareApplication node.",
      metrics: [
        { label: "JSON-LD blocks (/)", value: "4" },
        { label: "Types", value: "Organization · WebSite · SoftwareApplication" },
        { label: "FAQPage", value: "Pricing only" },
        { label: "Priced Offers", value: "None" },
      ],
    },
    {
      id: "cat-agent-discovery",
      title: "Agent discovery",
      status: "needs-improvement",
      body: "The llms.txt and markdown-twin work is better than almost anything we audit — direct .md URLs for every page, advertised in the response headers. The gap is narrower and more pointed: the site sells Link AI as exposing attribution data over MCP, CLI, Agent and Skills, and every one of those discovery paths returns a 404.",
      bodyTechnical:
        "Found: /llms.txt (text/plain), markdown twins for all primary routes with link rel=\"alternate\" type=\"text/markdown\" and AEO spec 1.0 declared. 404: /skill.md, /agents.md, /.well-known/agent-skills/index.json, /.well-known/mcp.json, /.well-known/webmcp/tools.json, /.well-known/mcp/server-card.json, /.well-known/ucp. No <link rel=\"mcp\">.",
      metrics: [
        { label: "llms.txt", value: "Found" },
        { label: "Markdown twins", value: "All routes" },
        { label: "Agent skills index", value: "404" },
        { label: "MCP discovery", value: "404" },
      ],
    },
    {
      id: "cat-seo",
      title: "SEO fundamentals",
      status: "good",
      body: "Clean. The title is fifty characters and says what the product is, the description lands inside the ideal range with the positioning intact, and canonical, language and viewport are all in place.",
      bodyTechnical:
        "Title 50 chars: “Linkrunner, mobile attribution that actually works”. Meta description 127 chars (target 50–160). Canonical present. H1 “Turn installs into insights with an AI driven MMP”. OG and Twitter cards present. No noindex on marketing routes.",
      metrics: [
        { label: "Title", value: "50 chars" },
        { label: "Meta description", value: "127 chars" },
        { label: "Canonical", value: "Present" },
      ],
    },
    {
      id: "cat-freshness",
      title: "Content freshness",
      status: "good",
      body: "Every URL in the sitemap carries a last-modified date — all 329 of them, which is rare. The blog and benchmark content is dated 2026 and the first-party benchmark posts give models a reason to come back.",
      bodyTechnical:
        "sitemap.xml: 329 loc / 329 lastmod (100% coverage). Blog and benchmark routes carry current 2026 dates; first-party benchmark posts (install volume, SKAN postback intensity, click-to-install timing) are recent and citable.",
      metrics: [
        { label: "Sitemap lastmod", value: "329 / 329" },
        { label: "Content window", value: "2026 · current" },
      ],
    },
    {
      id: "cat-content",
      title: "Content structure",
      status: "good",
      body: "One H1 that names the product, eight H2s, sixteen H3s. Sections are properly sized and the FAQ copy is written as real questions with self-contained answers — the shape answer engines lift from. It only needs the markup to match.",
      bodyTechnical:
        "Homepage: 1 H1 / 8 H2 / 16 H3, no duplicate SSR heading copies. Visible FAQ block (“Mobile measurement answers”) with 3 question/answer pairs written as standalone answers. Section sizing is consistent; no heading-level skips observed.",
      metrics: [
        { label: "H1 / H2 / H3", value: "1 / 8 / 16" },
        { label: "FAQ copy", value: "Present · unmarked" },
      ],
    },
    {
      id: "cat-semantics",
      title: "HTML semantics",
      status: "good",
      body: "Real landmarks, not a box tree. One header, one main, one nav, one footer, nine sections and ten articles — agents can map the page. Product screenshots carry no captions, which is the only thing left to add here.",
      bodyTechnical:
        "Homepage: header=1, main=1, nav=1, footer=1, section=9, article=10 against 478 div / 357 span. figure=0 and figcaption=0 across 91 images. No video elements on /.",
      metrics: [
        { label: "Landmarks", value: "header · main · nav · footer" },
        { label: "section / article", value: "9 / 10" },
        { label: "figcaption", value: "0" },
      ],
    },
    {
      id: "cat-images",
      title: "Image accessibility",
      status: "good",
      body: "No image is missing an alt attribute. Fifty-three are described, and the thirty-eight blanks are almost all duplicate copies of the customer-logo marquee plus decorative engine icons, which is correct practice. Two blog thumbnails carry meaning and should be described.",
      bodyTechnical:
        "91 <img>, 0 missing alt. 53 with descriptive alt (customer logos named individually, e.g. “Playo logo”). 38 alt=\"\": 31 duplicate marquee logo copies, 5 engine icons (chatgpt/perplexity/gemini/claude/grok .svg), 2 blog card thumbnails (no-mmp-tax…jpg, cfo-view-mmp…jpg) that carry meaning, 1 tracking pixel.",
      metrics: [
        { label: "Missing alt", value: "0" },
        { label: "Described", value: "53" },
        { label: "Decorative (correct)", value: "36" },
      ],
    },
    {
      id: "cat-linking",
      title: "Internal linking",
      status: "good",
      body: "Strong. Solutions, comparisons, tools, glossary, customer stories and the blog all interlink, and the free tools and benchmark posts give models genuine reasons to crawl deeper. The structure is there for authority to flow once it arrives.",
      bodyTechnical:
        "Dense internal graph across /solutions, /compare/*, /tools/*, /glossary, /customer-stories/*, /blog/*, with a solutions index and glossary acting as hubs. llms.txt mirrors the same structure, giving agents a parallel map.",
      metrics: [
        { label: "Hub pages", value: "Solutions · Tools · Glossary" },
        { label: "Sitemap URLs", value: "329" },
      ],
    },
  ],
  automation: {
    status: "good",
    body: "The contact form is better built than most we audit — every visible field has a real label and an autocomplete hint, and the spam trap is implemented correctly. Six issues remain, and two of them matter: a required qualifying dropdown and the consent checkbox exist only as hidden fallbacks behind custom controls, so an AI agent reading the page cannot complete a demo request.",
    bodyTechnical:
      "6 issues on /contact and /. 2 P1: has_app (required) and the consent checkbox render as aria-hidden, tabindex=\"-1\", clipped native fallbacks behind custom Radix controls — a headless agent cannot set a required field. 4 P2: found_us select (same pattern, optional), 2 meaningful blog thumbnails with alt=\"\", and 0 figcaption across 91 images. Labels (9) and autocomplete (name, email, organization, tel) are correct; honeypot uses tabindex=\"-1\" + autocomplete=\"off\" rather than a misleading token.",
    totalIssues: 6,
    p1Count: 2,
    p2Count: 4,
    groups: [
      {
        id: "auto-hidden-controls",
        severity: "P1",
        title: "Required controls hidden from agents",
        count: 2,
        summary:
          "“Do you have an app?” is required, and the consent checkbox must be ticked. Both exist in the page only as hidden fallbacks behind custom dropdowns, so an agent filling in the demo request cannot complete it.",
        summaryTechnical:
          "has_app (required) and the consent checkbox are aria-hidden=\"true\" tabindex=\"-1\" clipped native elements paired with custom Radix controls that carry no accessible name or role in static HTML. Form submission is unreachable headlessly.",
        examples: [
          '<select aria-hidden="true" required tabindex="-1" name="has_app" style="…clip:rect(0,0,0,0)">',
          '<input type="checkbox" aria-hidden="true" required tabindex="-1" style="opacity:0">',
        ],
      },
      {
        id: "auto-optional-control",
        severity: "P2",
        title: "Attribution dropdown unreachable",
        count: 1,
        summary:
          "“How did you find us?” follows the same pattern. It is optional, so it does not block the form, but it is also the field that would tell you a lead came from an AI answer.",
        summaryTechnical:
          'found_us renders as <select aria-hidden="true" tabindex="-1"> behind a custom combobox. Worth fixing for its own sake: it is the channel-attribution field for AI-sourced leads.',
        examples: [
          '<select aria-hidden="true" tabindex="-1" name="found_us" style="…clip:rect(0,0,0,0)">',
        ],
      },
      {
        id: "auto-media-text",
        severity: "P2",
        title: "Meaningful images without text",
        count: 3,
        summary:
          "Two blog thumbnails that carry meaning ship with empty alt, and no image on the page has a caption. Small, but product screenshots and benchmark charts are exactly what a caption would make quotable.",
        summaryTechnical:
          'alt="" on no-mmp-tax-wasted-spend-by-customer-profile.jpg and cfo-view-mmp-marketing-pnl-impact.jpg (blog cards, meaningful). figcaption=0 across 91 images — add captions to product screenshots and benchmark charts.',
        examples: [
          '<img src="…/no-mmp-tax-wasted-spend-by-customer-profile.jpg" alt="">',
          '<img src="…/cfo-view-mmp-marketing-pnl-impact.jpg" alt="">',
          "0 <figcaption> across 91 <img>",
        ],
      },
    ],
  },
  agentsIntro:
    "Best-in-class here. robots.txt does not just allow AI crawlers by default — it names nine of them in a dedicated group and allows them explicitly, keeping only /api/ private. llms.txt and a markdown twin for every page are already live. Only the MCP and skills paths are missing, which matters because Link AI is marketed on exactly those.",
  agentsIntroTechnical:
    "robots.txt declares an explicit group for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, GoogleOther and CCBot with Allow: / and Disallow: /api/; the wildcard group matches, so unnamed agents are allowed too. Host and Sitemap present. Real 404s: /skill.md, /agents.md, /.well-known/agent-skills/index.json, mcp.json, webmcp/tools.json, mcp/server-card.json, /.well-known/ucp.",
  llmsTxtFound: true,
  discoverySignals: [
    {
      id: "sig-llms",
      label: "/llms.txt",
      found: true,
      note: "HTTP 200 · text/plain · ~78 KB · indexes markdown twins",
    },
    {
      id: "sig-md-twin",
      label: 'link rel="alternate" type="text/markdown"',
      found: true,
      note: "Advertised on every HTML route · AEO spec 1.0",
    },
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
      note: "HTTP 404 · Link AI is marketed on Skills",
    },
    { id: "sig-skill-md", label: "/skill.md", found: false, note: "HTTP 404" },
    { id: "sig-agents-md", label: "/agents.md", found: false, note: "HTTP 404" },
  ],
  agents: [
    { agent: "GPTBot", vendor: "OpenAI", allowed: true },
    { agent: "OAI-SearchBot", vendor: "OpenAI", allowed: true },
    { agent: "ChatGPT-User", vendor: "OpenAI", allowed: true },
    { agent: "anthropic-ai", vendor: "Anthropic", allowed: true },
    { agent: "ClaudeBot", vendor: "Anthropic", allowed: true },
    { agent: "claude-web", vendor: "Anthropic", allowed: true },
    { agent: "Google-Extended", vendor: "Google", allowed: true },
    { agent: "GoogleOther", vendor: "Google", allowed: true },
    { agent: "PerplexityBot", vendor: "Perplexity", allowed: true },
    { agent: "CCBot", vendor: "Common Crawl", allowed: true },
    { agent: "Amazonbot", vendor: "Amazon", allowed: true },
    { agent: "Applebot", vendor: "Apple", allowed: true },
    { agent: "Applebot-Extended", vendor: "Apple", allowed: true },
    { agent: "BingBot", vendor: "Microsoft", allowed: true },
    { agent: "FacebookBot", vendor: "Meta", allowed: true },
    { agent: "LinkedInBot", vendor: "LinkedIn", allowed: true },
    { agent: "Bytespider", vendor: "ByteDance", allowed: true },
    { agent: "DuckAssistBot", vendor: "DuckDuckGo", allowed: true },
    { agent: "MistralAI-User", vendor: "Mistral", allowed: true },
    { agent: "YouBot", vendor: "You.com", allowed: true },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "Linkrunner already passed the readiness test. The sprint is about being recommended.",
    body: "Most audits end with a list of on-site fixes. This one cannot, because Linkrunner has already done that work — 82/100, nine AI crawlers explicitly welcomed, llms.txt and markdown twins live, clean schema and headings. The on-site items left are narrow and mostly commercial: review markup on the case studies so Playo's 34% attaches to Linkrunner, priced Offers so the published rate card is retrievable as a fact, disambiguation so “Linkrunner review” stops returning a cable tester, and the MCP and skills files Link AI is already marketed on. Those are included here, not sold separately. The rest of the ninety days goes where the citations actually come from: comparison listicles, review and analyst profiles, and community threads on the four claims Linkrunner owns and currently loses — transparent per-install pricing, fraud included, cheapest startup tier, India-first. You get a dashboard that re-tests the 14-prompt set weekly with screenshot proof.",
    outcomes: [
      "Playo, Matiks and CashBook results in structured review markup, so “what MMP does Playo use” resolves to Linkrunner instead of a shrug",
      "The four published pricing tiers as machine-readable Offers in INR and USD — the claim Linkrunner loses to Tenjin and Singular today",
      "Brand disambiguation and authority profiles in the entity graph, moving “Linkrunner review” off the NetAlly cable tester and answering the one-G2-review hedge",
      "FAQPage on the homepage and every comparison page, plus the MCP and agent-skills files Link AI already promises",
      "Off-site citation work on the twelve missed prompts: comparison listicles, review platforms, and community threads models read when building MMP shortlists",
      "Weekly re-tests of the prompt set with a tracking dashboard for model gaps, competitor share, and the next action each week",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "82 on readiness. 14% on citations. Let's fix the second number.",
  ctaBody:
    "Book a short call. We will walk what the crawl found — the four narrow on-site gaps that are costing citations, and why the other twelve misses are authority problems no amount of schema will solve. Then the 90-day plan, with on-site work included in the same engagement. You get weekly proof and a dashboard.",
};
