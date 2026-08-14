import type { VisibilityReport } from "../types";

const SHOT = "/audits/praata";

/** Private outreach report for Praata. ChatGPT snapshot, August 2026. */
export const praataAiVisibilityReport: VisibilityReport = {
  slug: "praata-ai-visibility-report",
  company: "Praata",
  website: "praata.com",
  industry: "Mutual fund distribution · Gurugram",
  preparedFor: "Divya Sethi",
  role: "Co-founder",
  dateLabel: "August 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "LinkedIn — boutique personal investments and multi-family office",
  summary:
    "Ask ChatGPT for alternatives to praata.com in Gurgaon and it returns Zolo, Housr, and Commune — coliving, not a mutual fund distributor. Ask for an AMFI distributor near DLF and it names Clear Ocean in Two Horizon Centre, Praata’s own building, not Praata. On the eight Gurgaon distributor, SIP, and FinEdge-alternative prompts families already type, Praata is cited 0 of 8. This ChatGPT snapshot is the baseline. A 90-day sprint gets Praata on those shortlists, kills the coliving identity, and fixes the reviews caution.",
  brandCrisisHeadline:
    "When someone checks Praata, AI either thinks coliving or says proceed with caution",
  brandCrisisDek:
    "Identity leaks to Housr and Zolo. Reviews treat a new AMFI MFD as unverified, with name collisions on patra, prata, and praetas.",
  queriesHeadline: "Prompt audit · 8 queries",
  queriesIntro:
    "Prompts Gurugram families type when they look for a mutual fund distributor, SIP help, or a FinEdge alternative. Praata is missing on every one.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 8, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "FinEdge", visibility: 38 },
    { name: "Swadhyaay IMF", visibility: 38 },
    { name: "MoneyTree Partners", visibility: 38 },
    { name: "Stealth Wealth", visibility: 38 },
    { name: "Nishkaera", visibility: 38 },
    { name: "Bellwether Associates", visibility: 25 },
    { name: "Hawk-I", visibility: 25 },
    { name: "Amit Kukreja Advisory", visibility: 25 },
    { name: "Lets Invest Wisely", visibility: 25 },
    { name: "Praata", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-alternatives",
      query: "alternatives to praata.com in gurgaon",
      title: "AI treats Praata as coliving",
      body: "ChatGPT assumes praata.com is a managed-rental / co-living model — furnished rooms, housekeeping, flexible stays — then lists Housr, Commune, Zolo, Flock, Rentdoor, and FnF. Boutique personal investments never appear.",
      outcome: "Identity leak · coliving shortlist",
      screenshot: {
        src: `${SHOT}/01-alternatives-to-praata-gurgaon.png`,
        alt: "ChatGPT answering “alternatives to praata.com in gurgaon” with coliving brands",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-reviews",
      query: "praata.com reviews",
      title: "New MFD, proceed with caution",
      body: "ChatGPT finds Praata as a Gurugram AMFI-registered MFD founded in 2025, then says there is almost no independent review history. The takeaway is “proceed with caution,” plus a warning not to confuse praata.com with patra.com, prata.com, or praetas.com.",
      outcome: "Trust caution · name collision",
      screenshot: {
        src: `${SHOT}/02-praata-com-reviews.png`,
        alt: "ChatGPT answering “praata.com reviews” with proceed-with-caution framing",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "mutual fund distributor in Gurgaon",
      intent: "Core category shelf: first shortlist when someone looks for an MFD in Gurgaon",
      severity: "high",
      citedBrands: [
        "Capital Financial Distributors",
        "Swadhyaay IMF",
        "Conflux IMF",
        "MoneyTree Partners",
        "Hawk-I Insurance & Mutual Funds",
        "Future Grow Investment",
        "Fiducia Wealth",
      ],
      rentokStatus: "missing",
      outcome: "Distributor shortlist · Praata absent",
      screenshot: {
        src: `${SHOT}/03-mutual-fund-distributor-gurgaon.png`,
        alt: "ChatGPT Gurgaon mutual fund distributors without Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT lists Capital Financial Distributors, Swadhyaay IMF, Conflux IMF, MoneyTree Partners, Hawk-I Insurance & Mutual Funds, Future Grow Investment, and Fiducia Wealth. Praata is not named.",
        },
      ],
    },
    {
      id: "q2",
      query: "mutual fund advisor in Gurugram for families",
      intent: "Family ICP: who AI shortlists for Gurugram households",
      severity: "high",
      citedBrands: [
        "Amit Kukreja Advisory",
        "Indresh Malik",
        "Moneyvesta",
        "Goalvest",
        "FinEdge",
        "Nishkaera",
        "21G Investment Advisers",
        "Stealth Wealth",
        "Conflux IMF",
      ],
      rentokStatus: "missing",
      outcome: "Family advisor list · Praata absent",
      screenshot: {
        src: `${SHOT}/04-mutual-fund-advisor-gurugram-families.png`,
        alt: "ChatGPT Gurugram family mutual fund advisors without Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The shortlist opens with Amit Kukreja Advisory, Indresh Malik, Moneyvesta, and Goalvest, then FinEdge, Nishkaera, 21G Investment Advisers, Stealth Wealth, and Conflux IMF. Praata is not on either list.",
        },
      ],
    },
    {
      id: "q3",
      query: "AMFI registered mutual fund distributor near DLF Gurgaon",
      intent: "Geo + AMFI: distributors near DLF — including Praata’s own building",
      severity: "critical",
      tag: "Same building",
      citedBrands: [
        "Prism Wealth",
        "AS Anand Capital",
        "Tanmay Financials",
        "MyownCFO / AADEVI BROKR",
        "Clear Ocean LLP",
      ],
      rentokStatus: "missing",
      outcome: "DLF shortlist · Clear Ocean in Two Horizon Centre",
      screenshot: {
        src: `${SHOT}/05-amfi-distributor-near-dlf.png`,
        alt: "ChatGPT AMFI distributors near DLF Gurgaon naming Clear Ocean, not Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Prism Wealth, AS Anand Capital, Tanmay Financials, and MyownCFO fill the DLF list. Clear Ocean LLP is named at Two Horizon Centre, Golf Course Road — Praata’s building. Praata is not cited.",
          sources: [
            "Prism Wealth",
            "AS Anand Capital",
            "Tanmay Financials",
            "MyownCFO",
            "Clear Ocean",
          ],
        },
      ],
    },
    {
      id: "q4",
      query: "financial planner in Gurgaon for salaried professionals",
      intent: "Salaried ICP in Gurgaon — AI prefers fee-only RIAs over MFDs",
      severity: "high",
      tag: "RIA preference",
      citedBrands: [
        "Moneyvesta",
        "Amit Kukreja Advisory",
        "FinEdge",
        "Lets Invest Wisely",
        "Swadhyaay IMF",
      ],
      rentokStatus: "missing",
      outcome: "Salaried planner list · RIA-first, Praata absent",
      screenshot: {
        src: `${SHOT}/06-financial-planner-salaried-gurgaon.png`,
        alt: "ChatGPT Gurgaon financial planners for salaried professionals without Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT opens by preferring a SEBI fee-only RIA over a commission-based distributor, then lists Moneyvesta, Amit Kukreja Advisory, FinEdge, Lets Invest Wisely, and Swadhyaay IMF. Praata is not named.",
        },
      ],
    },
    {
      id: "q5",
      query: "help me start a SIP with a mutual fund advisor in Gurgaon",
      intent: "Core action prompt: start a SIP with a Gurgaon advisor",
      severity: "high",
      citedBrands: [
        "Bellwether Associates",
        "MoneyTree Partners",
        "GrowthVine",
        "Mango Wealth",
        "Aadi Wealth",
      ],
      rentokStatus: "missing",
      outcome: "SIP advisor shortlist · Praata absent",
      screenshot: {
        src: `${SHOT}/07-start-sip-advisor-gurgaon.png`,
        alt: "ChatGPT SIP advisors in Gurgaon without Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Bellwether Associates, MoneyTree Partners, GrowthVine, Mango Wealth, and Aadi Wealth are the SIP shortlist. Praata is not named.",
        },
      ],
    },
    {
      id: "q6",
      query: "SIP SWP advisor for retirement planning India",
      intent: "Retirement SIP/SWP — AI routes this to fee-only RIAs, not MFDs",
      severity: "high",
      tag: "RIA gate",
      citedBrands: [
        "WealthCrafts",
        "Asset Nivesh",
        "Prasidhi Financial Solutions",
        "Amit Kukreja",
        "iVentures Wealth",
      ],
      rentokStatus: "missing",
      outcome: "SIP/SWP routed to RIAs · Praata absent",
      screenshot: {
        src: `${SHOT}/08-sip-swp-retirement-india.png`,
        alt: "ChatGPT SIP SWP retirement advisors in India without Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT strongly prefers a SEBI-registered RIA over a mutual-fund distributor for SIP + SWP retirement planning. It names WealthCrafts, Asset Nivesh, Prasidhi Financial Solutions, Amit Kukreja, and iVentures Wealth. Praata is not on the list.",
        },
      ],
    },
    {
      id: "q7",
      query: "mutual fund and health insurance advisor in Gurgaon",
      intent: "Combined MF + health insurance shelf in Gurgaon",
      severity: "high",
      citedBrands: [
        "Hawk-I Insurance & Mutual Funds",
        "JBROS Capital",
        "Nishkaera",
        "Stealth Wealth",
        "FinEdge",
      ],
      rentokStatus: "missing",
      outcome: "MF + insurance shortlist · Praata absent",
      screenshot: {
        src: `${SHOT}/09-mf-health-insurance-gurgaon.png`,
        alt: "ChatGPT mutual fund and health insurance advisors in Gurgaon without Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Hawk-I, JBROS Capital, Nishkaera, Stealth Wealth, and FinEdge fill the combined mutual-fund and health-insurance list. Hawk-I is called out first because the category covers both. Praata is not named.",
        },
      ],
    },
    {
      id: "q8",
      query: "alternatives to FinEdge in Gurgaon",
      intent: "Switching prompt: who AI names instead of FinEdge in Gurgaon",
      severity: "high",
      citedBrands: [
        "Swadhyaay IMF",
        "MoneyTree Partners",
        "Stealth Wealth",
        "Bellwether Associates",
        "iVentures Capital",
        "WealthVisor",
        "Nishkaera",
        "Lets Invest Wisely",
      ],
      rentokStatus: "missing",
      outcome: "FinEdge alternatives · Praata absent",
      screenshot: {
        src: `${SHOT}/10-alternatives-to-finedge-gurgaon.png`,
        alt: "ChatGPT alternatives to FinEdge in Gurgaon without Praata",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Asked for FinEdge alternatives, ChatGPT lists Swadhyaay IMF, MoneyTree Partners, Stealth Wealth, Bellwether Associates, iVentures Capital, WealthVisor, Nishkaera, and Lets Invest Wisely. Praata is not on the table.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "Get Praata on the distributor, SIP, and FinEdge-alternative shortlists families already ask AI for",
    body: "When Gurugram families ask ChatGPT, Perplexity, Google AI Overview, and other models for a mutual fund distributor, SIP help, or a FinEdge alternative, Praata should be on the list. We start with the gaps in this audit: missing on all eight discovery prompts, a coliving identity leak, a reviews caution with name collisions, and a peer named in Praata’s own building. Then we re-test weekly until the citations move. You also get a dashboard: which models cite you, where competitors win, your score, and what to do next each week.",
    outcomes: [
      "Praata cited on Gurgaon distributor, SIP, and FinEdge-alternative shortlists across ChatGPT, Perplexity, Google AI Overview, Gemini, and Claude",
      "“Alternatives to praata.com” stops returning Housr, Zolo, and Commune",
      "Reviews answer names a verified AMFI MFD without “proceed with caution” as the takeaway",
      "AMFI-near-DLF prompts cite Praata at Two Horizon Centre, not only Clear Ocean",
      "This prompt set re-tested weekly, with screenshots proving movement",
      "Live dashboard: model gaps, competitor share, score trend, and next actions each week",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get Praata on those shortlists?",
  ctaBody:
    "Book a short call. We will map the 90-day plan from this audit: distributor and SIP prompts, the coliving identity leak, the reviews caution, and weekly proof the answers are moving. You will also get a dashboard to track progress.",
};
