import type { VisibilityReport } from "../types";

const SHOT = "/audits/gullak";

/**
 * Private outreach report for Gullak. ChatGPT snapshot, September 2026.
 * Sell: models already cite Gold+ on yield prompts — and still route every
 * install-intent shelf (category, Jar alternatives, UPI round-up, doorstep)
 * to PhonePe / Jar / MMTC / OroPocket.
 */
export const gullakAiVisibilityReport: VisibilityReport = {
  slug: "gullak-ai-visibility-report",
  company: "Gullak",
  website: "gullak.money",
  industry: "Digital gold · daily savings · India",
  preparedFor: "Manthan Shah",
  role: "Co-founder",
  dateLabel: "September 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline: "Daily gold SIP · save on spends · Gold+ · doorstep coins",
  summary:
    "Ask ChatGPT for apps that pay extra gold on top of price — Gullak Gold+ is the answer. Ask what to download for digital gold savings, a Jar alternative, UPI spend-to-gold, or doorstep coin delivery — PhonePe, Jar, MMTC-PAMP, OroPocket, and Augmont take the shortlist. Gullak is cited on 0 of 7 install-intent prompts in this snapshot. Models can find you. They just don’t when someone is choosing an app.",
  brandCrisisHeadline: "How ChatGPT talks when a saver is about to download",
  brandCrisisDek:
    "Branded review is cautious. Your homepage “save when you spend” line sells Jar. The 2026 category shelf never names Gullak.",
  queriesHeadline: "Prompt audit · 7 install-intent queries",
  queriesIntro:
    "Download and switch prompts savers already type. Gullak was not named on these seven. Gold+ only appears when the prompt is yield — shown as contrast on the category shelf.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 7, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Jar", visibility: 90 },
    { name: "PhonePe Gold", visibility: 80 },
    { name: "MMTC-PAMP", visibility: 70 },
    { name: "Google Pay Gold", visibility: 50 },
    { name: "Paytm Gold", visibility: 50 },
    { name: "OroPocket", visibility: 45 },
    { name: "Augmont", visibility: 40 },
    { name: "Spenny", visibility: 30 },
    { name: "Gullak", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-review",
      query: "Gullak app review",
      title: "Branded review · 6.5/10 and “be cautious”",
      body: "ChatGPT calls Gullak a good savings app, then frames it as not a serious investment platform — SEBI digital-gold advisory, spreads/GST, support complaints, and extra caution on Gold+ leasing.",
      outcome: "Soft recommend · trust dampener",
      screenshot: {
        src: `${SHOT}/01-gullak-app-review.png`,
        alt: "ChatGPT Gullak app review scored 6.5 with caution framing",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-upi-usp",
      query: "app that invests in gold every time I spend on UPI India",
      title: "Homepage USP · save-on-spend sells Jar",
      body: "This is the line gullak.money leads with. ChatGPT shortlists Jar, Spenny, and GoldPlus — and picks Jar. Gullak is not named.",
      outcome: "Absent · Jar named my pick",
      screenshot: {
        src: `${SHOT}/02-upi-spend-auto-gold.png`,
        alt: "ChatGPT UPI spend-to-gold apps naming Jar not Gullak",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-category",
      query: "best digital gold savings app in India 2026",
      title: "Category shelf 2026 · wallets and Jar, not Gullak",
      body: "MMTC-PAMP best overall, PhonePe and Google Pay for convenience, Paytm, Jar for micro-savings. Gullak does not appear.",
      outcome: "Absent · MMTC / PhonePe / Jar named",
      screenshot: {
        src: `${SHOT}/03-best-digital-gold-savings-2026.png`,
        alt: "ChatGPT best digital gold savings app 2026 without Gullak",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best digital gold savings app in India 2026",
      intent: "Primary category shelf — what to download",
      severity: "critical",
      tag: "Category",
      citedBrands: [
        "MMTC-PAMP",
        "PhonePe Gold",
        "Google Pay Gold",
        "Paytm Gold",
        "Jar",
      ],
      rentokStatus: "missing",
      outcome: "Absent · wallets + Jar own the shelf",
      screenshots: [
        {
          src: `${SHOT}/09-extra-gold-returns.png`,
          alt: "ChatGPT naming Gullak Gold+ for extra gold returns",
          model: "chatgpt",
          label: "Yield prompt",
          prompt: "apps that give extra gold returns on top of gold price India",
        },
        {
          src: `${SHOT}/03-best-digital-gold-savings-2026.png`,
          alt: "ChatGPT best digital gold savings 2026 without Gullak",
          model: "chatgpt",
          label: "Download prompt",
          prompt: "best digital gold savings app in India 2026",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "MMTC-PAMP, PhonePe, GPay, Paytm, Jar. Gullak absent — even though the same model names Gullak Gold+ when asked for extra gold returns.",
        },
      ],
    },
    {
      id: "q2",
      query: "app that invests in gold every time I spend on UPI India",
      intent: "Save-on-spend / round-up — homepage claim",
      severity: "critical",
      tag: "UPI USP",
      citedBrands: ["Jar", "Spenny", "GoldPlus"],
      rentokStatus: "missing",
      outcome: "Absent · Jar is my pick",
      screenshot: {
        src: `${SHOT}/02-upi-spend-auto-gold.png`,
        alt: "ChatGPT UPI spend gold apps without Gullak",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt: "Jar, Spenny, GoldPlus. Gullak not named on its own USP.",
        },
      ],
    },
    {
      id: "q3",
      query: "Jar alternatives for digital gold savings India",
      intent: "Switchers leaving Jar",
      severity: "critical",
      tag: "Jar switch",
      citedBrands: [
        "PhonePe Gold",
        "Paytm Gold",
        "Google Pay Gold",
        "OroPocket",
        "Groww",
        "Pyllar Money",
      ],
      rentokStatus: "missing",
      outcome: "Absent · PhonePe / OroPocket named",
      screenshot: {
        src: `${SHOT}/04-jar-alternatives.png`,
        alt: "ChatGPT Jar alternatives without Gullak",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "PhonePe, Paytm, GPay, OroPocket, Groww, Pyllar. Closest Jar-like picks skip Gullak.",
        },
      ],
    },
    {
      id: "q4",
      query: "I want an app like Jar but not Jar — what should I download",
      intent: "Direct download ask after rejecting Jar",
      severity: "critical",
      tag: "Not Jar",
      citedBrands: ["OroPocket", "Fiydaa", "PhonePe", "Groww", "Pyllar"],
      rentokStatus: "missing",
      outcome: "Absent · OroPocket closest to Jar",
      screenshot: {
        src: `${SHOT}/05-app-like-jar-not-jar.png`,
        alt: "ChatGPT apps like Jar without Gullak",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "OroPocket closest, then Fiydaa, PhonePe, Groww, Pyllar. Gullak not on the download list.",
        },
      ],
    },
    {
      id: "q5",
      query:
        "digital gold app with physical gold coin delivery to doorstep India",
      intent: "Doorstep coin — product claim on gullak.money",
      severity: "critical",
      tag: "Doorstep",
      citedBrands: ["MMTC-PAMP", "Paytm Gold", "Augmont", "SafeGold"],
      rentokStatus: "missing",
      outcome: "Absent · refiners / Paytm named",
      screenshot: {
        src: `${SHOT}/06-physical-gold-coin-delivery.png`,
        alt: "ChatGPT physical gold coin delivery without Gullak",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "MMTC-PAMP, Paytm, Augmont, SafeGold. Gullak’s doorstep coin pitch is not on the shortlist.",
        },
      ],
    },
    {
      id: "q6",
      query: "best app for daily digital gold SIP India not PhonePe or Google Pay",
      intent: "Dedicated app shelf with wallets excluded",
      severity: "high",
      tag: "Daily SIP",
      citedBrands: ["Augmont", "Jar", "MMTC-PAMP", "SafeGold", "Groww"],
      rentokStatus: "missing",
      outcome: "Absent · Augmont / Jar named",
      screenshot: {
        src: `${SHOT}/07-daily-gold-sip-not-wallets.png`,
        alt: "ChatGPT daily gold SIP apps without Gullak",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Even with PhonePe and GPay ruled out: Augmont, Jar, MMTC-PAMP, SafeGold, Groww. No Gullak.",
        },
      ],
    },
    {
      id: "q7",
      query: "micro savings app for salaried beginners to buy digital gold India",
      intent: "ICP: salaried beginner micro-savings",
      severity: "high",
      tag: "Beginner ICP",
      citedBrands: ["PhonePe", "Paytm", "MMTC-PAMP", "Fiydaa", "Jar"],
      rentokStatus: "missing",
      outcome: "Absent · PhonePe / Jar / Fiydaa named",
      screenshot: {
        src: `${SHOT}/08-micro-savings-salaried.png`,
        alt: "ChatGPT micro savings digital gold without Gullak",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "PhonePe, Paytm, MMTC-PAMP, Fiydaa, Jar for the salaried ₹10–₹100/day lane. Gullak absent.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "From Gold+-only citations to named on the prompts that drive downloads",
    body: "When savers ask ChatGPT what to download for digital gold, a Jar alternative, UPI spend-to-gold, or doorstep coins, gullak.money should be on the shortlist — not only when someone already typed Gullak or asked about extra yield. We work the install-intent set in this audit, fix the cautious branded review, and re-test weekly with screenshot proof and a dashboard.",
    outcomes: [
      "Gullak named on category and Jar-alternative prompts that today list PhonePe, Jar, OroPocket, and MMTC-PAMP",
      "Save-on-spend / UPI auto-gold prompts cite Gullak beside Jar and Spenny — matching the homepage claim",
      "Doorstep coin and daily SIP (non-wallet) prompts name Gullak as an app option, not only refiners",
      "“Gullak app review” softens the 6.5 / “not a serious platform” framing with stronger trust citations",
      "Gold+ yield authority transfers into download shortlists, not only branded or yield-only prompts",
      "This prompt set re-tested weekly with screenshot proof",
      "Live dashboard: model gaps, competitor share vs Jar / PhonePe / MMTC / OroPocket, score trend, next actions each week",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "AI already knows Gold+. Let’s make it recommend the app.",
  ctaBody:
    "Book a short call. We map the 90-day plan from this audit: category and Jar-switch shelves, the UPI save-on-spend miss, doorstep coins, and the cautious review — with weekly proof and a dashboard.",
};
