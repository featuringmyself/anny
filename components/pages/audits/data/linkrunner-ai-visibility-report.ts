import type { VisibilityReport } from "../types";

const SHOT = "/audits/linkrunner";

/** Private outreach report for Linkrunner. ChatGPT snapshot, August 2026. */
export const linkrunnerAiVisibilityReport: VisibilityReport = {
  slug: "linkrunner-ai-visibility-report",
  company: "Linkrunner",
  website: "linkrunner.io",
  industry: "Mobile measurement partner (MMP) · attribution & deep links",
  preparedFor: "Shreyans Sancheti",
  role: "Co-founder & CEO",
  dateLabel: "August 2026",
  overallScore: 14,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "Turn installs into insights with an AI driven MMP — 250+ growth teams, 25k free attributed installs, published per-install pricing.",
  summary:
    "Paste linkrunner.io into ChatGPT and the answer is accurate: a mobile attribution and marketing analytics platform, channels named, positioning intact. The AEO work is real — llms.txt with markdown twins for 329 pages, robots.txt explicitly allowlisting nine AI crawlers, one H1, Organization and SoftwareApplication schema, FAQPage on pricing, lastmod on every sitemap URL. On-site readiness scores 82/100. It bought 2 of 14 shortlists. On the twelve prompts Linkrunner loses, the loss is on Linkrunner's own claims: “MMP with transparent per-install pricing” returns Tenjin, Singular, AppsFlyer and Airbridge — the one differentiator Linkrunner publishes and legacy MMPs hide. “MMP with fraud protection included, not as an add-on” returns AppsFlyer, Adjust and Singular, the exact three whose fraud is an upsell. “cheap MMP for startups” returns Singular and Tenjin, not the tool with 25,000 free installs. Ask for the best MMP for Indian apps and ChatGPT answers “For most Indian consumer apps: AppsFlyer.” Ask which MMP Playo uses — the flagship case study, 34% CPI cut, on the homepage — and it checks AppsFlyer, Adjust, Singular, Branch and Kochava, then says it cannot find one. Ask for a “Linkrunner review” and it reviews a NetAlly cable tester, 9/10. Even the friendly prompts hedge: asked whether Linkrunner is reliable, the model confirms the company, SOC 2 and ISO 27001, then brakes on thin independent proof — Gartner 5.0 from a single rating, one published G2 review. Understanding was never the gap. Being recommended is, and that is what the 90-day AI Visibility Sprint builds.",
  stats: [
    { label: "Growth teams", value: "250+" },
    { label: "Readiness score", value: "82/100" },
    { label: "Discovery cites", value: "2 / 14" },
    { label: "Free installs", value: "25,000" },
  ],
  brandCrisisHeadline:
    "The model reads the site perfectly. It still will not vouch for you.",
  brandCrisisDek:
    "Paste the domain and ChatGPT explains the product correctly — the markdown twins work. Ask for a review, a customer, or a switch verdict and it returns a cable tester, a shrug, and AppsFlyer.",
  queriesHeadline: "Prompt audit · 10 of 14 queries",
  queriesIntro:
    "Fourteen prompts were audited and two cite Linkrunner; the ten that decide deals are below. They cover the shortlists growth teams build when shopping for an MMP, plus the four positioning claims Linkrunner sells on: rupee pricing, published per-install rates, fraud included, and no annual lock-in. AppsFlyer appears in thirteen of the fourteen. The four omitted here — best MMP for startups, Adjust alternatives, SKAN 4.0, and React Native deep linking — repeat the same pattern: absent, with AppsFlyer, Adjust, Singular or Branch taking the shelf.",
  modelScores: [
    { model: "chatgpt", visibility: 14, cited: 2, total: 14, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "AppsFlyer", visibility: 93 },
    { name: "Adjust", visibility: 86 },
    { name: "Singular", visibility: 79 },
    { name: "Branch", visibility: 64 },
    { name: "Airbridge", visibility: 57 },
    { name: "Kochava", visibility: 29 },
    { name: "Tenjin", visibility: 29 },
    { name: "Linkrunner", visibility: 14 },
  ],
  brandCrisis: [
    {
      id: "crisis-review-netally",
      query: "Linkrunner review",
      title: "Brand collision · the review is for a network cable tester",
      body: "Asked for a “Linkrunner review,” ChatGPT reviews the NetAlly LinkRunner — a copper cable and PoE tester for IT technicians — and scores it 9/10 for network troubleshooting. A growth lead doing pre-demo diligence on the review keyword lands on hardware. The MMP is not mentioned.",
      outcome: "Identity miss · NetAlly hardware replaces the MMP",
      screenshot: {
        src: `${SHOT}/crisis-linkrunner-review-netally.jpg`,
        alt: "ChatGPT reviewing the NetAlly LinkRunner network tester instead of the MMP",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-playo",
      query: "what MMP does Playo use",
      title: "The flagship case study is invisible",
      body: "Playo is on the homepage: a named customer quote, a 34% CPI reduction, ₹20.30 to ₹13.39 on Google Ads. Asked which MMP Playo uses, ChatGPT says it checked for evidence of AppsFlyer, Adjust, Singular, Branch and Kochava and found nothing public tying Playo to any of them. Linkrunner is not among the five it even considered. The strongest proof asset on the site does not exist in the answer layer.",
      outcome: "Customer proof absent · five competitors considered, Linkrunner not one",
      screenshot: {
        src: `${SHOT}/crisis-what-mmp-does-playo-use.jpg`,
        alt: "ChatGPT unable to name Playo's MMP, checking AppsFlyer, Adjust, Singular, Branch and Kochava",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-switch-appsflyer",
      query: "should I switch from AppsFlyer to Linkrunner",
      title: "Branded switch prompt · the model defends AppsFlyer",
      body: "Named directly, ChatGPT opens with “I wouldn’t switch from AppsFlyer blindly” and builds a scorecard where AppsFlyer is green on maturity, attribution, deep linking, integrations, fraud and raw data, amber only on India focus, red only on price. Linkrunner's whole thesis — fraud and exports included on every plan, not tiered — is scored as an AppsFlyer strength. The concession is price alone. This is the prompt a warm lead runs last, and it argues them back to the incumbent.",
      outcome: "Switch verdict · AppsFlyer defended, price framed as the only difference",
      screenshot: {
        src: `${SHOT}/crisis-should-i-switch-from-appsflyer.jpg`,
        alt: "ChatGPT advising against switching from AppsFlyer to Linkrunner",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best MMP for Indian apps",
      intent: "Home turf — the India-first position Linkrunner is built on",
      severity: "critical",
      tag: "Home turf",
      citedBrands: ["AppsFlyer", "Adjust", "Singular", "Airbridge", "Branch"],
      rentokStatus: "missing",
      outcome: "India shelf · “For most Indian consumer apps: AppsFlyer”",
      screenshot: {
        src: `${SHOT}/01-best-mmp-for-indian-apps.jpg`,
        alt: "ChatGPT best MMP for Indian apps shortlist without Linkrunner",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT shortlists AppsFlyer (best for scale), Adjust (best for fraud prevention), Singular, Airbridge and Branch, then recommends AppsFlyer outright for most Indian consumer apps. Linkrunner — built in Bengaluru for exactly this buyer — is not named.",
        },
      ],
    },
    {
      id: "q3",
      query: "AppsFlyer alternatives",
      intent: "Primary conquest query — Linkrunner ships a dedicated comparison page",
      severity: "critical",
      tag: "Conquest",
      citedBrands: [
        "Adjust",
        "Singular",
        "Branch",
        "Kochava",
        "Airbridge",
        "Tenjin",
      ],
      rentokStatus: "missing",
      outcome: "Conquest shelf · six alternatives, none of them Linkrunner",
      screenshot: {
        src: `${SHOT}/03-appsflyer-alternatives.jpg`,
        alt: "ChatGPT AppsFlyer alternatives table without Linkrunner",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The 2026 alternatives table lists Adjust, Singular, Branch, Kochava, Airbridge and Tenjin. Linkrunner publishes /compare/appsflyer and an India-specific AppsFlyer alternative page, and appears in neither the table nor the sources.",
        },
      ],
    },
    {
      id: "q5",
      query: "OneLink alternatives",
      intent: "Deep-link conquest — Linkrunner ships /onelink-alternative",
      severity: "high",
      tag: "Conquest",
      citedBrands: [
        "Branch",
        "Adjust",
        "Airbridge",
        "Kochava",
        "Singular",
        "Ulinkly",
      ],
      rentokStatus: "missing",
      outcome: "OneLink shelf · Ulinkly cited for “lower-cost deep linking”",
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Branch, Adjust, Airbridge, Kochava, Singular and Ulinkly are starred as OneLink alternatives. Ulinkly takes the “lower-cost deep linking” slot Linkrunner built a page for. Linkrunner is missing.",
        },
      ],
    },
    {
      id: "q6",
      query: "Firebase Dynamic Links replacement",
      intent: "Migration demand — Linkrunner ships a dedicated FDL page",
      severity: "high",
      tag: "Migration",
      citedBrands: [
        "Android App Links",
        "iOS Universal Links",
        "Branch",
        "AppsFlyer",
        "Adjust",
        "Airbridge",
      ],
      rentokStatus: "missing",
      outcome: "FDL migration · Branch / AppsFlyer / Adjust / Airbridge take it",
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "For deferred deep linking after install, ChatGPT recommends Branch, AppsFlyer, Adjust and Airbridge. Linkrunner's /firebase-dynamic-links page targets this exact shutdown migration and is not cited.",
        },
      ],
    },
    {
      id: "q7",
      query: "cheap MMP for startups",
      intent: "Pricing wedge — 25,000 free installs, then ₹1.00 / $0.01",
      severity: "critical",
      tag: "Own claim",
      citedBrands: ["Singular", "AppsFlyer", "Adjust", "Tenjin"],
      rentokStatus: "missing",
      outcome: "Cheapest-MMP shelf · Singular's 15k free beats an absent 25k free",
      screenshot: {
        src: `${SHOT}/07-cheap-mmp-for-startups.jpg`,
        alt: "ChatGPT cheap MMP for startups shortlist without Linkrunner",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Singular is recommended first on a 15,000 free attributed conversion tier, then AppsFlyer's 12,000. Linkrunner's 25,000 free attributed installs is the largest free tier on the market and does not appear in the comparison.",
        },
      ],
    },
    {
      id: "q10",
      query: "best MMP for fintech apps in India",
      intent: "Published vertical play — Stratzy, Fold Money, Pocketful are customers",
      severity: "critical",
      tag: "Vertical miss",
      citedBrands: ["AppsFlyer", "Adjust", "Branch", "Singular", "Kochava"],
      rentokStatus: "missing",
      outcome: "Fintech India · AppsFlyer ranked #1 and set as default",
      screenshot: {
        src: `${SHOT}/10-best-mmp-fintech-apps-india.jpg`,
        alt: "ChatGPT best MMP for fintech apps in India ranking without Linkrunner",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "A medalled ranking puts AppsFlyer first, Adjust second, Branch third, then Singular and Kochava, and names AppsFlyer the default recommendation. Linkrunner publishes an article titled “Best MMP for Fintech Apps in India is Linkrunner” and counts Stratzy, Fold Money and Pocketful as customers. It is not on the list.",
        },
      ],
    },
    {
      id: "q11",
      query: "MMP with transparent per-install pricing",
      intent: "The single sharpest differentiator — published rate card vs quote-only",
      severity: "critical",
      tag: "Own claim",
      citedBrands: ["Tenjin", "Singular", "AppsFlyer", "Airbridge", "Kochava"],
      rentokStatus: "missing",
      outcome: "Transparency shelf · AppsFlyer credited for transparency, Linkrunner absent",
      screenshot: {
        src: `${SHOT}/11-mmp-transparent-per-install-pricing.jpg`,
        alt: "ChatGPT MMP with transparent per-install pricing table without Linkrunner",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Asked for publicly visible per-install pricing, ChatGPT returns Tenjin, Singular, AppsFlyer (“Yes, for Growth”) and Airbridge (“Partly”). Linkrunner publishes a full four-tier rate card in INR and USD on a public page and is the one MMP missing from a list about published pricing.",
        },
      ],
    },
    {
      id: "q12",
      query: "MMP with fraud protection included, not as an add-on",
      intent: "Direct contrast with Protect360 — fraud is on every Linkrunner plan",
      severity: "critical",
      tag: "Own claim",
      citedBrands: ["AppsFlyer", "Adjust", "Singular"],
      rentokStatus: "missing",
      outcome: "Fraud-included shelf · answered with the three that upsell it",
      screenshot: {
        src: `${SHOT}/12-mmp-fraud-protection-included.jpg`,
        alt: "ChatGPT MMP with fraud protection included answer naming AppsFlyer, Adjust and Singular",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The prompt asks for fraud protection in the core product rather than an add-on, and the answer is AppsFlyer, Adjust and Singular — with AppsFlyer described as integrated, despite Protect360 being a premium add-on. The model then offers to narrow to MMPs where fraud is “genuinely included.” Linkrunner, which includes it at every tier, is not in the running.",
        },
      ],
    },
    {
      id: "q13",
      query: "pay as you go MMP no annual contract",
      intent: "Postpaid / no-lock-in wedge against Adjust's annual quote",
      severity: "standard",
      tag: "Cited #1",
      citedBrands: ["Linkrunner", "Deeplinkly", "AppsFlyer", "Airbridge"],
      rentokStatus: "cited",
      outcome: "Ranked #1 · cited with the site as a source",
      screenshot: {
        src: `${SHOT}/13-pay-as-you-go-mmp-no-annual-contract.jpg`,
        alt: "ChatGPT ranking Linkrunner first for pay-as-you-go MMP with no annual contract",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "Linkrunner leads the table — free first 25K installs, then per attributed install, no annual lock-in — and the answer closes by quoting the postpaid, no-lock-in claim with linkrunner.io as the source. The one prompt phrased entirely in Linkrunner's own words.",
          sources: ["linkrunner.io"],
        },
      ],
    },
    {
      id: "q14",
      query: "MMP priced in rupees for Indian apps",
      intent: "Rupee pricing — the reason the India page exists",
      severity: "standard",
      tag: "Cited last",
      citedBrands: [
        "AppsFlyer",
        "Adjust",
        "Singular",
        "Branch",
        "Linkrunner",
      ],
      rentokStatus: "cited",
      outcome: "Cited · listed fifth, below every legacy MMP",
      screenshot: {
        src: `${SHOT}/14-mmp-priced-in-rupees-indian-apps.jpg`,
        alt: "ChatGPT INR MMP cost benchmark table with Linkrunner listed last",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 5,
          excerpt:
            "An INR benchmark table runs AppsFlyer, Adjust, Singular, Branch, then Linkrunner at roughly ₹3–5L/year at 50K installs and ₹8–12L at 100K. Linkrunner is the only one priced in rupees by design and is ordered last, after four dollar-denominated tools with custom quotes.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "Get Linkrunner named on the twelve MMP shortlists it already deserves",
    body: "This is the unusual audit where the site is not the problem. Linkrunner's on-site AI readiness scores 82/100 — llms.txt with markdown twins across 329 pages, nine AI crawlers explicitly allowlisted, clean schema and headings. That work is why ChatGPT explains the product correctly when you paste the domain. It is also why more schema will not move these answers. Models build MMP shortlists from third-party ground truth: comparison listicles, G2 and Gartner profiles, Reddit and community threads, and case studies published somewhere other than linkrunner.io. That is where AppsFlyer, Adjust, Singular and even Tenjin and Ulinkly are winning, and where Linkrunner currently has one G2 review and one Gartner rating. We start with the claims Linkrunner already owns and should not be losing — transparent per-install pricing, fraud included, cheapest startup tier, India-first — then fix the NetAlly collision and get Playo attributed. You get a dashboard that re-tests this prompt set weekly with screenshot proof.",
    outcomes: [
      "Cited on transparent-pricing, fraud-included, and cheap-startup-MMP prompts — the three claims Linkrunner publishes and currently loses to AppsFlyer, Singular and Tenjin",
      "Named on “best MMP for Indian apps” and “best MMP for fintech apps in India”, where ChatGPT today recommends AppsFlyer outright",
      "On the AppsFlyer, Adjust, OneLink and Firebase Dynamic Links alternative shelves those comparison pages were built to win",
      "“Linkrunner review” resolves to the MMP, not the NetAlly cable tester — and Playo, Matiks and CashBook attach to Linkrunner in answers, not just on the homepage",
      "Third-party proof depth built where models actually read it: review profiles, comparison listicles, and community threads — moving the switch verdict off “I wouldn't switch blindly”",
      "Weekly re-tests of this 14-prompt set with screenshot proof, plus a dashboard for model gaps, competitor share, and the next action each week",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "You built the AI-ready site. Let's get you the citations.",
  ctaBody:
    "Book a short call. We will walk this ChatGPT snapshot: 2 of 14 discovery cites, the four positioning claims Linkrunner publishes and still loses, the NetAlly review collision, and Playo missing from an answer that considered five competitors. Then the 90-day plan to change it — third-party authority, not more schema. You get weekly proof and a dashboard.",
};
