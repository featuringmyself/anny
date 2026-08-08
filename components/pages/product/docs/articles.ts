import type { DocArticle } from "@/components/pages/product/docs/types";

export const docArticles: DocArticle[] = [
  {
    id: "quickstart",
    title: "Quickstart",
    dek: "Create a workspace, add one brand, and see your first AI mentions in under ten minutes.",
    section: "Get started",
    updatedAt: "Aug 4, 2026",
    body: [
      {
        type: "p",
        text: "This guide walks you from an empty Anny account to your first visibility snapshot. You need a work email, one brand domain, and roughly ten minutes. No engineering setup required.",
      },
      { type: "h2", text: "1. Create your workspace" },
      {
        type: "p",
        text: "Sign up at anny.dodoxhq.com/register with your company email. Anny creates a workspace named after your domain (for example, northwind.com becomes Northwind). You can rename it later under Settings → Workspace.",
      },
      {
        type: "ul",
        items: [
          "Starter plans include 1 project and 50 tracked prompts.",
          "Pro plans include 2 projects and 150 tracked prompts.",
          "Invite teammates from day one — seats are unlimited on every paid plan.",
        ],
      },
      { type: "h2", text: "2. Add your first brand" },
      {
        type: "p",
        text: "From the dashboard, click Add brand. Enter the primary domain (acme.com), display name (Acme), and up to five aliases such as Acme Inc, Acme Software, or former product names. Aliases help Anny catch mentions that don't use your exact legal name.",
      },
      {
        type: "callout",
        title: "Tip",
        text: "Start with one brand and three competitors. You can expand the competitor set after you've validated your prompt library.",
      },
      { type: "h2", text: "3. Seed a starter prompt set" },
      {
        type: "p",
        text: "Anny suggests 12–20 buying-intent prompts based on your category. Accept the defaults for your first run, then refine. A typical B2B SaaS starter set looks like:",
      },
      {
        type: "ul",
        items: [
          "best project management software for remote teams",
          "Asana vs Monday vs Acme for marketing agencies",
          "is Acme worth it for mid-market teams",
          "project management tools with time tracking and reporting",
        ],
      },
      { type: "h2", text: "4. Pick models and run" },
      {
        type: "p",
        text: "On Starter and Pro, choose up to three engines. We recommend ChatGPT, Gemini, and Google AI Mode for most marketing teams. Click Run tracking — daily jobs begin within a few minutes, and your first full snapshot usually lands inside an hour.",
      },
      {
        type: "ol",
        items: [
          "Open Mentions to see every answer where your brand appears.",
          "Check Visibility % on the Overview for share of voice across the prompt set.",
          "Open Sources to see which URLs shaped the answers.",
        ],
      },
      {
        type: "quote",
        text: "Most teams see a usable baseline by the end of day one. Week-over-week trends become meaningful after 7–10 daily runs.",
        cite: "Anny onboarding playbook",
      },
    ],
  },
  {
    id: "connect-brand",
    title: "Connect a brand",
    dek: "Domains, aliases, and competitor seeds Anny uses when scoring visibility.",
    section: "Get started",
    updatedAt: "Jul 28, 2026",
    body: [
      {
        type: "p",
        text: "A brand in Anny is more than a logo. It is the entity we look for in model answers, the domain we attribute owned citations to, and the center of your competitor ladder.",
      },
      { type: "h2", text: "Primary domain" },
      {
        type: "p",
        text: "Use the marketing site root (example.com), not an app subdomain (app.example.com) unless that is how buyers know you. Anny normalizes www and trailing paths. If you operate regional sites (example.de, example.co.uk), add them as related domains so owned citations are not marked as third-party.",
      },
      { type: "h2", text: "Aliases and spelling variants" },
      {
        type: "p",
        text: "Models often paraphrase brand names. Add every form you see in the wild:",
      },
      {
        type: "ul",
        items: [
          "Legal and product names — Acme Corporation, Acme Cloud",
          "Common misspellings — Acmе with a Cyrillic е, Ackme",
          "Former names after rebrands — BrightPath (acquired 2024)",
          "Ticker or shorthand if analysts use it — ACME",
        ],
      },
      {
        type: "callout",
        title: "False positives",
        text: "Avoid ultra-generic aliases like \"Pulse\" or \"Spark\" without a qualifier. Prefer \"Pulse CRM\" so Anny does not credit unrelated apps.",
      },
      { type: "h2", text: "Competitor seeds" },
      {
        type: "p",
        text: "Add 3–8 peers you expect to appear in the same answers. Anny builds a visibility ladder per prompt group. Example for a customer-support SaaS brand:",
      },
      {
        type: "ul",
        items: [
          "Intercom — score 42.4% across shared prompts",
          "Zendesk — score 31.1%",
          "Freshdesk — score 18.6%",
          "Your brand — score 14.2% (baseline after week one)",
        ],
      },
      {
        type: "p",
        text: "Scores update daily. Use them in weekly GEO standups, not as a one-time audit.",
      },
      { type: "h2", text: "Markets and languages" },
      {
        type: "p",
        text: "Each brand can track multiple locales (for example United States · English, Germany · German, Canada · English). Prompt libraries and visibility scores stay separate per market so a strong US presence does not hide a gap in DACH.",
      },
    ],
  },
  {
    id: "first-prompts",
    title: "First prompt set",
    dek: "How to pick buying-intent questions your customers already ask ChatGPT and Gemini.",
    section: "Get started",
    updatedAt: "Aug 1, 2026",
    body: [
      {
        type: "p",
        text: "Prompt sets are the unit of measurement in Anny. A strong set mirrors the real questions buyers type into AI — not the keywords you optimize for classic search.",
      },
      { type: "h2", text: "Cover the full journey" },
      {
        type: "p",
        text: "Don't only track \"best X\" listicles. Build clusters across four stages:",
      },
      {
        type: "ol",
        items: [
          "Awareness — category fears and objections (\"why do CRM projects fail\")",
          "Consideration — best-of and segment variants (\"best CRM for agencies under 50 people\")",
          "Evaluation — brand vs brand and \"is X worth it\"",
          "Purchase — pricing, onboarding, and migration questions if you sell direct",
        ],
      },
      { type: "h2", text: "Write prompts the way people talk" },
      {
        type: "p",
        text: "Conversational phrasing outperforms two-word keywords. Prefer full questions with context:",
      },
      {
        type: "ul",
        items: [
          "Good: \"What's the best email marketing platform for Shopify stores doing under $1M?\"",
          "Weak: \"email marketing software\"",
          "Good: \"Klaviyo vs Mailchimp for ecommerce abandoned cart flows\"",
          "Weak: \"Klaviyo competitor\"",
        ],
      },
      { type: "h2", text: "Starter library sizes" },
      {
        type: "p",
        text: "On Starter (50 prompts), allocate roughly 20 consideration, 15 evaluation, 10 awareness, and 5 purchase. On Pro (150 prompts), duplicate the set across two markets or add persona variants (enterprise vs SMB, technical vs marketing buyer).",
      },
      {
        type: "callout",
        title: "Example tagged groups",
        text: "Tag prompts as \"US · Consideration\", \"US · Evaluation\", and \"DACH · Consideration\" so Overview charts filter cleanly in weekly reviews.",
      },
      { type: "h2", text: "Refresh cadence" },
      {
        type: "p",
        text: "Review the library monthly. Retire prompts that never trigger brand or competitor mentions, and add new ones from sales call transcripts, \"how did you hear about us\" answers that mention ChatGPT, and competitor launches.",
      },
    ],
  },
  {
    id: "models",
    title: "Models & engines",
    dek: "Coverage across ChatGPT, Gemini, Claude, Perplexity, and Google AI Mode.",
    section: "Tracking",
    updatedAt: "Jul 18, 2026",
    body: [
      {
        type: "p",
        text: "Visibility is not portable. A brand that leads in ChatGPT can disappear in AI Mode. Anny tracks each engine as a separate surface so you see the gaps that classic SEO tools miss.",
      },
      { type: "h2", text: "Supported engines" },
      {
        type: "ul",
        items: [
          "ChatGPT — Bing + Google grounding with independent ranking; strong on product and profile pages",
          "Gemini — source chips and multi-turn citation behavior",
          "Google AI Mode — dual-panel with AI Overviews where available",
          "Claude — more conservative citations; useful for B2B evaluation prompts",
          "Perplexity — citation-heavy answers; strong for research-style queries",
        ],
      },
      {
        type: "p",
        text: "Starter and Pro include three engines of your choice. Advanced plans unlock up to 11 models with custom schedules.",
      },
      { type: "h2", text: "How often Anny runs prompts" },
      {
        type: "p",
        text: "Daily tracking is the default on paid plans. Each prompt is sent to each selected engine once per day in your brand's primary timezone. Weekly mode is available on Advanced for very large libraries.",
      },
      {
        type: "callout",
        title: "Fanouts",
        text: "For ChatGPT, Anny also records internal query expansions (fanouts). Use them to see the sub-topics the model searched — then fold those phrases into your content.",
      },
      { type: "h2", text: "Comparing engines" },
      {
        type: "p",
        text: "On the Overview, switch the model filter to compare Visibility %, average answer position, and sentiment side by side. Example from a mid-market CRM workspace after 14 days:",
      },
      {
        type: "ul",
        items: [
          "ChatGPT — 28% visibility, avg position 2.4, sentiment mildly positive",
          "Gemini — 41% visibility, avg position 1.8, sentiment neutral",
          "AI Mode — 19% visibility, avg position 3.1, sentiment mixed",
        ],
      },
      {
        type: "p",
        text: "Treat those as three different problems — not one \"AI SEO\" score.",
      },
    ],
  },
  {
    id: "mentions",
    title: "Mentions & sentiment",
    dek: "Read every answer where your brand appears — and how the model frames you.",
    section: "Tracking",
    updatedAt: "Jul 22, 2026",
    body: [
      {
        type: "p",
        text: "A mention is any model answer that names your brand (or an alias). Mentions are the raw feed behind Visibility %. Sentiment describes how the answer frames you relative to peers.",
      },
      { type: "h2", text: "Reading the Mentions feed" },
      {
        type: "p",
        text: "Each row shows the prompt, engine, date, answer excerpt, whether you were recommended, and detected sentiment. Click a row to open the full answer, cited sources, and competitor co-mentions.",
      },
      {
        type: "ul",
        items: [
          "Recommended — you appear in the shortlist or as a primary suggestion",
          "Mentioned — named without a clear recommendation",
          "Absent — tracked for the prompt but your brand was not named",
        ],
      },
      { type: "h2", text: "Sentiment labels" },
      {
        type: "p",
        text: "Anny classifies framing as positive, neutral, mixed, or negative. In B2B software samples, ChatGPT often frames brands less favorably than Gemini on evaluation prompts — so a high mention rate with negative sentiment still loses deals.",
      },
      {
        type: "quote",
        text: "Visibility without favorable sentiment is a hollow win. Fix the underlying review or comparison page before chasing more mentions.",
        cite: "ChatGPT mentions playbook",
      },
      { type: "h2", text: "Answer position" },
      {
        type: "p",
        text: "When multiple brands appear, Anny records your ordinal position in the recommendation list (1 = first named). Track average position on evaluation prompts weekly. Moving from 3.2 to 1.9 usually correlates with stronger source coverage on comparison articles.",
      },
      { type: "h3", text: "Example week" },
      {
        type: "p",
        text: "Acme Cloud · US · Evaluation cluster (24 prompts, ChatGPT): 16 mentions, 9 recommended, avg position 2.1, sentiment 62% positive / 25% neutral / 13% mixed.",
      },
    ],
  },
  {
    id: "sources",
    title: "Sources & citations",
    dek: "Map the URLs AI leans on, and spot pages that cite competitors instead of you.",
    section: "Tracking",
    updatedAt: "Jul 30, 2026",
    body: [
      {
        type: "p",
        text: "Most brand mentions are earned through third-party pages the model retrieves — listicles, reviews, Reddit threads, Wikipedia — not your homepage. The Sources view shows which URLs shaped answers across your prompt set.",
      },
      { type: "h2", text: "Source types Anny tags" },
      {
        type: "ul",
        items: [
          "Editorial / listicles — \"best of\" roundups and comparison posts",
          "Reviews — G2, Capterra, TrustRadius, and similar",
          "Community — Reddit, forums, niche Slack/Discord archives when cited",
          "Documentation — official docs and help centers",
          "Owned — your domain and related domains",
          "Video — YouTube and similar, especially influential on Google AI surfaces",
        ],
      },
      { type: "h2", text: "Finding citation gaps" },
      {
        type: "p",
        text: "Filter to prompts where a competitor is mentioned and you are absent. Sort sources by how often they appear across engines. Prioritize domains that show up in ChatGPT and Gemini — closing those gaps usually moves multiple surfaces at once.",
      },
      {
        type: "callout",
        title: "Earned media module",
        text: "Recommended actions ranked by expected impact appear under Actions. Typical items: pitch a listicle that already cites two peers, refresh an outdated comparison, or reply to a high-traffic Reddit thread with factual corrections.",
      },
      { type: "h2", text: "Owned content still matters" },
      {
        type: "p",
        text: "Anny also surfaces owned page types engines already ground on — product pages, how-tos, pricing, and comparison pages on your domain. If competitors' product pages appear and yours never do, crawlability and factual structure are usually the issue, not just authority.",
      },
      {
        type: "ol",
        items: [
          "Open Sources → Competitors cited, you missing.",
          "Export the top 20 URLs for outreach or content refresh.",
          "Mark each action Todo / Skip / Done so the backlog stays honest.",
        ],
      },
    ],
  },
  {
    id: "teams",
    title: "Teams & seats",
    dek: "Invite marketing, SEO, and agency partners without burning seat licenses.",
    section: "Workspace",
    updatedAt: "Jun 20, 2026",
    body: [
      {
        type: "p",
        text: "Every paid Anny plan includes unlimited seats. Roles control what people can change — not whether they can log in.",
      },
      { type: "h2", text: "Roles" },
      {
        type: "ul",
        items: [
          "Owner — billing, delete workspace, transfer ownership",
          "Admin — manage brands, prompts, members, and integrations",
          "Editor — edit prompt libraries and mark actions done",
          "Viewer — read dashboards and exports; no edits",
        ],
      },
      { type: "h2", text: "Inviting people" },
      {
        type: "p",
        text: "Settings → Members → Invite. Enter emails and a default role. Invites expire after 14 days. Agency partners should receive Viewer or Editor on client workspaces; keep Admin on your internal agency hub only.",
      },
      {
        type: "callout",
        title: "Agency workspaces",
        text: "Agency plans isolate each client as a project. Switch brands from the project switcher without mixing prompt budgets. White-label dashboards hide Anny branding for client logins.",
      },
      { type: "h2", text: "SSO" },
      {
        type: "p",
        text: "SAML SSO is available on Advanced and agency enterprise contracts. Map IdP groups to Anny roles so SEO and brand teams land in the right permission set automatically.",
      },
    ],
  },
  {
    id: "alerts",
    title: "Alerts",
    dek: "Get Slack or email when visibility drops, competitors surge, or sentiment turns.",
    section: "Workspace",
    updatedAt: "May 28, 2026",
    body: [
      {
        type: "p",
        text: "Alerts turn daily tracking into an operating system. Configure them under Settings → Alerts per brand or per prompt group.",
      },
      { type: "h2", text: "Alert types" },
      {
        type: "ul",
        items: [
          "Visibility drop — your Visibility % falls more than X points week over week on a tagged group",
          "Competitor surge — a seeded competitor gains Y mentions on shared prompts",
          "New citation — a high-traffic domain cites a competitor and not you",
          "Sentiment shift — share of negative/mixed answers rises above a threshold",
          "Model gap — you appear on one engine but stay absent on another for 3+ days",
        ],
      },
      { type: "h2", text: "Channels" },
      {
        type: "p",
        text: "Deliver to email, Slack, or both. Slack alerts post into a channel you choose (for example #geo-ops). Each alert includes the prompt group, engine, delta, and a deep link into Mentions or Sources.",
      },
      {
        type: "quote",
        text: "Push critical visibility drops and new competitor citations into the channel your team already lives in.",
        cite: "Changelog · Slack mention alerts · v0.8.1",
      },
      { type: "h2", text: "Suggested defaults" },
      {
        type: "ol",
        items: [
          "Visibility drop ≥ 8 points WoW on Evaluation prompts → Slack + email to Admin",
          "Competitor surge ≥ 5 new recommended mentions → Slack only",
          "Sentiment negative share ≥ 25% on Evaluation → email Owner + Admin",
        ],
      },
      {
        type: "p",
        text: "Mute alerts during known experiments (site migrations, major PR campaigns) so noise does not train the team to ignore them.",
      },
    ],
  },
  {
    id: "exports",
    title: "Exports",
    dek: "CSV, PDF scorecards, and API pulls for weekly GEO reviews and client decks.",
    section: "Workspace",
    updatedAt: "Jun 14, 2026",
    body: [
      {
        type: "p",
        text: "Anny is built for weekly operating rhythms. Exports let you leave the product without leaving the data behind.",
      },
      { type: "h2", text: "In-product exports" },
      {
        type: "ul",
        items: [
          "Mentions CSV — prompt, engine, date, excerpt, sentiment, position, competitors",
          "Sources CSV — URL, domain, type, engines citing, competitor vs owned",
          "Visibility scorecard PDF — weekly ladder vs competitors for one brand",
          "White-label PDF — agency branding, client logo, no Anny chrome",
        ],
      },
      { type: "h2", text: "API and MCP" },
      {
        type: "p",
        text: "Advanced and agency plans include API keys under Settings → Developer. Pull visibility time series, mention rows, and fanout data into Looker, Sheets, or Slack bots. MCP access exposes the same objects to coding agents and internal tools.",
      },
      {
        type: "callout",
        title: "Example weekly pack",
        text: "Export the scorecard PDF Monday morning, drop three action cards into the deck, and paste the Sources CSV into the outreach tracker. Most agency retainers run this loop in under 30 minutes per client.",
      },
      { type: "h2", text: "Retention" },
      {
        type: "p",
        text: "Raw answer text is retained for 90 days on Starter, 180 days on Pro, and custom windows on Advanced. Aggregated visibility metrics remain for the life of the workspace so long-range charts stay intact after answer text rolls off.",
      },
    ],
  },
] satisfies DocArticle[];

export const navSections = [
  {
    title: "Get started",
    links: [
      { label: "Quickstart", href: "#quickstart" },
      { label: "Connect a brand", href: "#connect-brand" },
      { label: "First prompt set", href: "#first-prompts" },
    ],
  },
  {
    title: "Tracking",
    links: [
      { label: "Models & engines", href: "#models" },
      { label: "Mentions & sentiment", href: "#mentions" },
      { label: "Sources & citations", href: "#sources" },
    ],
  },
  {
    title: "Workspace",
    links: [
      { label: "Teams & seats", href: "#teams" },
      { label: "Alerts", href: "#alerts" },
      { label: "Exports", href: "#exports" },
    ],
  },
] as const;

export function getDocArticle(id: string) {
  return docArticles.find((article) => article.id === id);
}
