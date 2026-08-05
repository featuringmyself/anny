import type { VisibilityReport } from "../types";

const SHOT = "/audits/zippserv";

/** Private outreach report for ZIPPSERV. ChatGPT snapshot, August 2026. */
export const zippservAiVisibilityReport: VisibilityReport = {
  slug: "zippserv-ai-visibility-report",
  company: "ZIPPSERV",
  website: "zippserv.com",
  industry: "Real estate marketing and sales mandate",
  preparedFor: "Debashish Hota",
  role: "COO",
  email: "debashish.hota@zippserv.com",
  dateLabel: "August 2026",
  overallScore: 9,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "Project launches and sustenance for Bangalore developers: marketing, sales mandate, CRM, and collections end to end.",
  summary:
    "On the prompts developers use to pick a Bangalore launch or sales mandate partner, ZIPPSERV almost never shows up. Houzbay, Spacez, Kanopy, Realspace, and similar firms take those shortlists. Bren is on your site; ask AI who marketed Bren Imperia and ZIPPSERV is not named. One launch phrasing ranks you #2. That is a thin win next to the gaps. This ChatGPT snapshot is the baseline. A 90-day sprint gets ZIPPSERV cited on the mandate prompts that matter, connects Bren in AI answers, and expands across Perplexity, Google AI Overview, Gemini, and Claude.",
  brandCrisisHeadline:
    "When someone checks ZIPPSERV, the answer does not sell the mandate",
  brandCrisisDek:
    "Trust and “what do you do” lean verification and caution. Launch, sales, CRM, and collections barely appear.",
  queriesHeadline: "Prompt audit · 11 queries",
  queriesIntro:
    "Prompts developers type when shopping for a Bangalore launch or sales mandate partner. One cites ZIPPSERV at #2. The rest name someone else.",
  modelScores: [
    { model: "chatgpt", visibility: 9, cited: 1, total: 11, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Houzbay Consulting", visibility: 62 },
    { name: "Spacez", visibility: 58 },
    { name: "Kanopy Ventures", visibility: 52 },
    { name: "Realspace", visibility: 48 },
    { name: "Verve Zen", visibility: 44 },
    { name: "First Launch", visibility: 40 },
    { name: "AM Reality / Kaleido", visibility: 36 },
    { name: "ZIPPSERV", visibility: 9 },
  ],
  brandCrisis: [
    {
      id: "crisis-reliable",
      query: "is zippserv reliable?",
      title: "Trust check leads with verification and caution",
      body: "ChatGPT frames ZIPPSERV around due diligence and property verification, then surfaces MouthShut-style caution. Launch marketing, sales mandate, CRM, and collections do not carry the answer.",
      outcome: "Trust answer · verification first",
      screenshot: {
        src: `${SHOT}/02-is-zippserv-reliable.png`,
        alt: "ChatGPT answering “is zippserv reliable?” with verification framing",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-what-does",
      query: "what does zippserv do",
      title: "“What do you do” opens on risk checks",
      body: "The answer leads with risk assessment and document checks for buyers. Marketing and sales support for developers comes later. The mandate work that wins developer deals is not what AI leads with.",
      outcome: "Mandate buried · verification leads",
      screenshot: {
        src: `${SHOT}/03-what-does-zippserv-do.png`,
        alt: "ChatGPT answering “what does zippserv do” with risk checks first",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best real estate marketing agency Bangalore",
      intent: "First shortlist when developers look for a Bangalore marketing partner",
      severity: "high",
      citedBrands: [
        "Indian Realty",
        "Nettrix",
        "Beta",
        "Mathew",
        "Spacez",
        "Vaynix",
        "Soocialhaus",
        "Verve Zen",
      ],
      rentokStatus: "missing",
      outcome: "Agency shortlist · ZIPPSERV absent",
      screenshot: {
        src: `${SHOT}/01-best-real-estate-marketing-agency-bangalore.png`,
        alt: "ChatGPT Bangalore real estate marketing agencies without ZIPPSERV",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT lists Indian Realty, Nettrix, Beta, Mathew, Spacez, Vaynix, Soocialhaus, and Verve Zen. ZIPPSERV is not named.",
        },
      ],
    },
    {
      id: "q2",
      query: "full sales mandate companies for apartment launch in bangalore",
      intent: "Core ask: full sales mandate for a Bangalore apartment launch",
      severity: "high",
      citedBrands: [
        "ANAROCK",
        "Xanadu",
        "Justo",
        "Guardians",
        "AM Reality",
        "Houzbay",
        "Kaleido",
        "Realspace",
      ],
      rentokStatus: "missing",
      outcome: "Core mandate table · ZIPPSERV absent",
      screenshot: {
        src: `${SHOT}/04-full-sales-mandate-apartment-launch-bangalore.png`,
        alt: "ChatGPT full sales mandate companies for Bangalore apartment launch without ZIPPSERV",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Houzbay, Kaleido, Realspace, AM Reality, Xanadu, Justo, Guardians, and others fill the mandate table. ZIPPSERV is missing on this core prompt.",
          sources: ["Business Standard", "company sites"],
        },
      ],
    },
    {
      id: "q3",
      query: "real estate sales mandate partner Bangalore",
      intent: "Same mandate search, partner wording",
      severity: "high",
      citedBrands: [
        "Propel",
        "Bangalore RE Co.",
        "Coldwell Banker",
        "InvestoXpert",
        "Kanopy",
        "Realspace",
        "PropsourceIndia",
      ],
      rentokStatus: "missing",
      outcome: "Mandate partner list · Kanopy/Realspace named",
      screenshot: {
        src: `${SHOT}/05-sales-mandate-partner-bangalore.png`,
        alt: "ChatGPT sales mandate partners Bangalore without ZIPPSERV",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Propel, Bangalore Real Estate Co., Coldwell Banker, InvestoXpert, Kanopy Ventures, Realspace, and PropsourceIndia are listed. ZIPPSERV is not.",
        },
      ],
    },
    {
      id: "q4",
      query:
        "project launch marketing and sales company for developers Bangalore",
      intent: "Launch wording where ZIPPSERV gets one clear cite",
      severity: "standard",
      tag: "Fragile win",
      citedBrands: [
        "First Launch",
        "Zippserv",
        "Spacez",
        "Proptals",
        "Treehack",
        "Uni-Solutions",
      ],
      rentokStatus: "cited",
      outcome: "Fragile win · #2 once, missing next door",
      screenshot: {
        src: `${SHOT}/06-project-launch-marketing-sales-developers-bangalore.png`,
        alt: "ChatGPT citing Zippserv #2 for project launch marketing and sales Bangalore",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 2,
          excerpt:
            "First Launch is #1. Zippserv is #2 for end-to-end launch, marketing, channel, CRM, collections, and sales mandates. Spacez, Proptals, Treehack, and Uni-Solutions follow. Nearby mandate prompts still skip ZIPPSERV, so this win does not hold alone.",
        },
      ],
    },
    {
      id: "q5",
      query: "villa project launch marketing agency Bangalore",
      intent: "Villa launch search in Bangalore",
      severity: "high",
      citedBrands: [
        "Brix Media",
        "Spacez",
        "Rethink Reality",
        "BrandStory",
        "Digital DC",
      ],
      rentokStatus: "missing",
      outcome: "Villa launch bucket · ZIPPSERV absent",
      screenshot: {
        src: `${SHOT}/07-villa-project-launch-marketing-bangalore.png`,
        alt: "ChatGPT villa project launch marketing agencies Bangalore without ZIPPSERV",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Brix Media, Spacez, Rethink Reality, BrandStory, and Digital DC are named. ZIPPSERV is not.",
        },
      ],
    },
    {
      id: "q6",
      query: "Houzbay Consulting alternatives",
      intent: "Who shows up when someone asks for Houzbay alternatives",
      severity: "high",
      citedBrands: [
        "ANAROCK",
        "JLL",
        "CBRE",
        "Savills",
        "Knight Frank",
        "PropTiger",
        "Square Yards",
        "360 Realtors",
      ],
      rentokStatus: "missing",
      outcome: "Alternatives list · ZIPPSERV absent",
      screenshot: {
        src: `${SHOT}/08-houzbay-alternatives.png`,
        alt: "ChatGPT Houzbay Consulting alternatives without ZIPPSERV",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Asked for Houzbay alternatives, ChatGPT returns a long list. ZIPPSERV is not on it.",
        },
      ],
    },
    {
      id: "q7",
      query: "Verve Zen Marketing alternatives",
      intent: "Who shows up when someone asks for Verve Zen alternatives",
      severity: "standard",
      citedBrands: [
        "KlientBoost",
        "INFUSE",
        "SmartSites",
        "webdew",
        "WebFX",
      ],
      rentokStatus: "missing",
      outcome: "Alternatives list · ZIPPSERV absent",
      screenshot: {
        src: `${SHOT}/09-verve-zen-alternatives.png`,
        alt: "ChatGPT Verve Zen Marketing alternatives without ZIPPSERV",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT lists general digital agencies. No ZIPPSERV.",
        },
      ],
    },
    {
      id: "q8",
      query: "who marketed Bren Imperia",
      intent: "Bren Imperia is on ZIPPSERV’s site. Does AI connect them?",
      severity: "critical",
      tag: "Portfolio gap",
      citedBrands: ["Bren Corporation", "Housing.com"],
      rentokStatus: "missing",
      outcome: "On your site · invisible in AI",
      screenshot: {
        src: `${SHOT}/10-who-marketed-bren-imperia.png`,
        alt: "ChatGPT saying no third-party marketer for Bren Imperia",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT says no clear third-party agency marketed Bren Imperia. It points to Bren in-house and portals like Housing.com. ZIPPSERV is never named.",
          sources: ["Housing.com", "Bren"],
        },
      ],
    },
    {
      id: "q9",
      query: "Bren Corporation marketing partner",
      intent: "Direct ask: who is Bren’s marketing partner?",
      severity: "critical",
      tag: "Portfolio gap",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Homepage proof · AI says no partner",
      screenshot: {
        src: `${SHOT}/11-bren-corporation-marketing-partner.png`,
        alt: "ChatGPT finding no official Bren Corporation marketing partner",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The model finds no public marketing partner for Bren Corporation and sends people to Bren’s own channels. ZIPPSERV does not appear.",
        },
      ],
    },
    {
      id: "q10",
      query: "Zippserv Bren",
      intent: "Do ZIPPSERV and Bren show up together at all?",
      severity: "critical",
      tag: "Identity + portfolio",
      citedBrands: [],
      rentokStatus: "confused",
      outcome: "Bren not linked · brands stay separate",
      screenshot: {
        src: `${SHOT}/12-zippserv-bren.png`,
        alt: "ChatGPT not connecting Zippserv and Bren",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Asked “Zippserv Bren,” ChatGPT describes ZIPPSERV and asks what Bren means. The brands are not joined. No mandate or portfolio cite.",
          sources: ["cbinsights.com"],
        },
      ],
    },
    {
      id: "q11",
      query: "zippserv reviews",
      intent: "Trust check before a first call",
      severity: "critical",
      tag: "Trust mixed",
      citedBrands: ["Glassdoor", "AmbitionBox", "MouthShut", "Trustburn"],
      rentokStatus: "warned",
      outcome: "Mixed reviews · MouthShut caution",
      screenshot: {
        src: `${SHOT}/13-zippserv-reviews.png`,
        alt: "ChatGPT summarizing mixed Zippserv reviews with MouthShut caution",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Glassdoor and AmbitionBox look mixed-to-positive on a small sample. MouthShut shows about 1.7 with complaints the model treats as unverified. Not a clean trust pass before a mandate conversation.",
          sources: ["Glassdoor", "AmbitionBox", "MouthShut", "Trustburn"],
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "Get ZIPPSERV on the mandate shortlists developers already ask AI for",
    body: "When developers ask ChatGPT, Perplexity, Google AI Overview, and other models for a Bangalore launch or sales mandate partner, ZIPPSERV should be on the list. We start with the gaps in this audit: missing from most mandate and agency shortlists, Bren not connected in AI, one fragile #2 win that does not hold next door. Then we re-test weekly until the citations move. You also get a dashboard: which models cite you, where competitors win, your score, and what to do next each week.",
    outcomes: [
      "ZIPPSERV on Bangalore mandate, agency, and peer shortlists across ChatGPT, Perplexity, Google AI Overview, Gemini, and Claude",
      "AI names ZIPPSERV for Bren Imperia and Bren Corporation partner questions",
      "The one #2 launch cite becomes steady across nearby mandate prompts",
      "This prompt set re-tested weekly, with screenshots proving movement",
      "Live dashboard: model gaps, competitor share, score trend, and next actions each week",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get ZIPPSERV on those shortlists?",
  ctaBody:
    "Book a short call. We will map the 90-day plan from this audit: mandate and agency prompts, Bren citations, and weekly proof the answers are moving. You will also get a dashboard to track progress.",
};
