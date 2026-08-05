import type { VisibilityReport } from "../types";

const SHOT = "/audits/rentok";

/** Private outreach report for RentOk. ChatGPT snapshot, August 2026. */
export const rentokAiVisibilityReport: VisibilityReport = {
  slug: "rentok-ai-visibility-report",
  company: "RentOk",
  website: "rentok.com",
  industry: "PG / hostel / co-living management",
  preparedFor: "Srijan Raj",
  email: "srijan@rentok.com",
  dateLabel: "August 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "Multi-tenant renting as easy as single-tenant: automate every workflow from finding tenants to collecting monthly rent so owners earn higher yield without more work.",
  summary:
    "RentOk runs 15,000+ rooms and ₹100Cr+ monthly collection, yet on the buyer prompts owners actually type into ChatGPT, RentOk is not cited once. Smaller PG tools and WhatsApp-rent apps take the shortlists. Worse: “is rentok reliable” returns a pest-control company, and “is rentok.com reliable” warns buyers not to trust the domain. This ChatGPT snapshot is the baseline. A 90-day sprint gets RentOk cited on the prompts that matter, starting with brand and domain trust, then expanding across Perplexity, Google AI Overview, Gemini, and Claude.",
  stats: [
    { label: "Properties", value: "15,000+" },
    { label: "Rooms", value: "3 Lacs+" },
    { label: "Tenants", value: "2.3 Lacs+" },
    { label: "Monthly collection", value: "₹100 Cr+" },
  ],
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 11, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "TrackMyPG", visibility: 72 },
    { name: "ManagR", visibility: 64 },
    { name: "RentLekha", visibility: 58 },
    { name: "MY PG / My PG Manager", visibility: 55 },
    { name: "StayManager", visibility: 48 },
    { name: "RentOk", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-rentokil",
      query: "is rentok reliable",
      title: "Buyers asking if RentOk is reliable get pest control",
      body: "ChatGPT treats “rentok” as Rentokil, a global pest-control brand, and even localizes to Rentokil PCI in India. A prospect checking trust before a demo never sees India’s Renting SuperApp. They see termites and cockroaches.",
      outcome: "Brand collision · RentOkil replaces RentOk",
      screenshot: {
        src: `${SHOT}/04-is-rentok-reliable.png`,
        alt: "ChatGPT answering “is rentok reliable” about Rentokil pest control",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-domain",
      query: "is rentok.com reliable",
      title: "Even rentok.com is framed as unverified",
      body: "When the domain is spelled out, the model still does not recognize RentOk as a known PG platform. It cites thin coverage and ScamAdviser-style caution, telling buyers not to assume the site is reliable before they pay or share data.",
      outcome: "Trust failure · domain flagged, not endorsed",
      screenshot: {
        src: `${SHOT}/05-is-rentok-com-reliable.png`,
        alt: "AI answering “is rentok.com reliable” with a caution warning",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best PG management software India",
      intent: "Core category: first shortlist owners build when shopping for PG software",
      severity: "high",
      citedBrands: [
        "MY PG",
        "PG Manager",
        "TrackMyPG",
        "PG Master",
        "PGCRM",
        "HostelNPG",
      ],
      rentokStatus: "missing",
      outcome: "RentOk missing · six smaller PG tools fill the table",
      screenshot: {
        src: `${SHOT}/01-best-pg-management-software-india.png`,
        alt: "ChatGPT table for best PG management software India without RentOk",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT ranked MY PG, PG Manager, TrackMyPG, PG Master, PGCRM, and HostelNPG, with pricing and feature rows. RentOk does not appear.",
          sources: ["SourceForge", "product sites"],
        },
      ],
    },
    {
      id: "q2",
      query: "best hostel management app",
      intent: "Hostel / student-housing language that maps to RentOk’s ICP",
      severity: "high",
      citedBrands: ["SpaceBasic", "TrackMyPG", "Teachmint Hostel Management"],
      rentokStatus: "missing",
      outcome: "India PG/hostel bucket exists. RentOk still absent",
      screenshot: {
        src: `${SHOT}/02-best-hostel-management-app.png`,
        alt: "ChatGPT hostel management app recommendations without RentOk",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "For student hostels and PGs in India, ChatGPT recommends SpaceBasic, TrackMyPG, and Teachmint. Travel hostel tools (Cloudbeds, Mews) fill a second table. RentOk is not named.",
          sources: ["Techjockey", "SourceForge", "SoftwareSuggest"],
        },
      ],
    },
    {
      id: "q3",
      query: "which company gets automatic rent collection WhatsApp",
      intent: "Feature prompt for RentOk’s autopay + WhatsApp stack",
      severity: "high",
      citedBrands: [
        "RentKollect",
        "Domvio",
        "ManagR",
        "LandlordX",
        "ProperPe",
        "HostelMitra",
      ],
      rentokStatus: "missing",
      outcome: "Feature RentOk sells. Six rivals named, RentOk not",
      screenshot: {
        src: `${SHOT}/03-automatic-rent-collection-whatsapp.png`,
        alt: "AI table of WhatsApp rent collection companies without RentOk",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The answer lists RentKollect, Domvio, ManagR, LandlordX, ProperPe, and HostelMitra for automatic rent collection with WhatsApp. RentOk is absent despite Autopay + WhatsApp on rentok.com.",
        },
      ],
    },
    {
      id: "q4",
      query: "is rentok reliable",
      intent: "Brand-trust check before a demo or install",
      severity: "critical",
      tag: "Brand collision",
      citedBrands: ["Rentokil", "Rentokil PCI"],
      rentokStatus: "confused",
      outcome: "Wrong company · Rentokil pest control",
      screenshot: {
        src: `${SHOT}/04-is-rentok-reliable.png`,
        alt: "ChatGPT confusing RentOk with Rentokil pest control",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Yes. Rentokil is described as a legitimate pest-control company, with India called out as Rentokil PCI. The model asks which pest the user is dealing with. RentOk the PG platform never appears.",
          sources: ["This Old House", "Trustpilot"],
        },
      ],
    },
    {
      id: "q5",
      query: "is rentok.com reliable",
      intent: "Domain-level trust: what happens when someone pastes the URL",
      severity: "critical",
      tag: "Trust failure",
      citedBrands: ["ScamAdviser"],
      rentokStatus: "warned",
      outcome: "Caution issued · not recognized as a known platform",
      screenshot: {
        src: `${SHOT}/05-is-rentok-com-reliable.png`,
        alt: "AI warning that rentok.com may not be reliable",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The model says it would not assume rentok.com is reliable without more verification, citing thin independent coverage and advising checks before payment or personal data.",
          sources: ["ScamAdviser"],
        },
      ],
    },
    {
      id: "q6",
      query: "company doing tenant verification for PG",
      intent: "Side feature RentOk markets. AI still routes to specialists",
      severity: "standard",
      citedBrands: [
        "IDGate",
        "Surepass",
        "Housing.com",
        "Veriffy",
        "VerifyKaro",
        "AuthBridge",
        "OnGrid",
      ],
      rentokStatus: "missing",
      outcome: "Verification specialists win · RentOk KYC invisible",
      screenshot: {
        src: `${SHOT}/06-tenant-verification-for-pg.png`,
        alt: "ChatGPT tenant verification for PG companies without RentOk",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Recommendations skew to IDGate, Surepass, Housing.com Tenant Verification, and other KYC vendors. RentOk’s tenant verification is not listed.",
        },
      ],
    },
    {
      id: "q7",
      query: "rent collection app bangalore",
      intent: "Tier-1 geo prompt: Bangalore is a RentOk market",
      severity: "high",
      citedBrands: ["RentLekha", "ManagR", "RentalSync", "RentGain", "Rennt"],
      rentokStatus: "missing",
      outcome: "Local Bangalore shortlist · RentOk absent",
      screenshot: {
        src: `${SHOT}/07-rent-collection-app-bangalore.png`,
        alt: "ChatGPT rent collection app Bangalore list without RentOk",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "RentLekha is called out as a Bengaluru startup; ManagR is tagged for PGs and hostels. RentOk, with a South India office in HSR, is not on the list.",
          sources: ["App Store", "Google Play"],
        },
      ],
    },
    {
      id: "q8",
      query: "Rental property management app India",
      intent: "Broad India category covering landlords, NRIs, and managers",
      severity: "high",
      citedBrands: [
        "RealAssist",
        "RentEase",
        "Rentory",
        "Rent Manage India",
        "RentLekha",
      ],
      rentokStatus: "missing",
      outcome: "India category table · RentOk not shortlisted",
      screenshot: {
        src: `${SHOT}/08-rental-property-management-app-india.png`,
        alt: "ChatGPT rental property management app India without RentOk",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "RealAssist, RentEase, Rentory (PGs & hostels), Rent Manage India, and RentLekha fill the table. RentOk is missing from the India shortlist.",
          sources: ["Google Play", "App Store"],
        },
      ],
    },
    {
      id: "q9",
      query: "Rent collection app",
      intent: "High-intent generic collection prompt",
      severity: "high",
      citedBrands: ["Rennt", "Haviva", "Rent Collect", "StayManager"],
      rentokStatus: "missing",
      outcome: "StayManager labeled “Best for PGs and hostels” · RentOk missing",
      screenshot: {
        src: `${SHOT}/09-rent-collection-app.png`,
        alt: "ChatGPT rent collection app list naming StayManager for PGs",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Rennt, Haviva, Rent Collect, and StayManager are recommended. StayManager is explicitly “Best for PGs and hostels.” RentOk’s lane, without RentOk.",
          sources: ["Google Play", "StayManager"],
        },
      ],
    },
    {
      id: "q10",
      query: "app to Track PG rent payments",
      intent: "Exact ICP phrasing: PG owners tracking dues",
      severity: "high",
      citedBrands: [
        "My PG Manager",
        "Coliv Rent & Tenant Manager",
        "Nivasa",
        "GharDesk",
      ],
      rentokStatus: "missing",
      outcome: "PG rent-tracking apps named · RentOk not",
      screenshot: {
        src: `${SHOT}/10-track-pg-rent-payments.png`,
        alt: "ChatGPT apps to track PG rent payments without RentOk",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "My PG Manager, Coliv Rent & Tenant Manager, Nivasa, and GharDesk are listed for PG rent tracking. RentOk Manager (100K+ Play Store downloads) is not.",
          sources: ["Google Play"],
        },
      ],
    },
    {
      id: "q11",
      query: "Tenant KYC app",
      intent: "Onboarding / KYC feature discovery",
      severity: "standard",
      citedBrands: ["Tenanting", "Crib Tenant", "RentEasify", "Good Tenant"],
      rentokStatus: "missing",
      outcome: "KYC apps cited · RentOk digital KYC invisible",
      screenshot: {
        src: `${SHOT}/11-tenant-kyc-app.png`,
        alt: "Perplexity-style Tenant KYC app list without RentOk",
        model: "perplexity",
      },
      answers: [
        {
          model: "perplexity",
          cited: false,
          excerpt:
            "Tenanting, Crib Tenant, RentEasify, and Good Tenant are recommended for landlord KYC in India. RentOk’s digital KYC / govt ID flow is not mentioned.",
          sources: ["Google Play", "App Store"],
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "Get RentOk cited in AI answers within 90 days",
    body: "The goal of the sprint is simple: when landlords and property managers ask ChatGPT, Perplexity, Google AI Overview, and other models for tools like yours, RentOk shows up. For RentOk we start with the two failures that kill trust before a demo, brand collision with Rentokil and the rentok.com reliability warning, then push citation work on the category and feature prompts in this audit. Alongside the execution work you get a dashboard so you can see which models cite you, where competitors win, your improvement score, and the next actions to take each week.",
    outcomes: [
      "Cited on priority India PG / hostel / rent prompts across ChatGPT, Perplexity, Google AI Overview, Gemini, and Claude",
      "Brand and domain trust fixed first so “is rentok reliable” stops returning pest control or a caution flag",
      "Citation assets and source placements models already pull from (pages, comparisons, directories)",
      "Weekly re-tests of this prompt set with screenshot proof that citations are moving",
      "A tracking dashboard for model gaps, competitor share, improvement scores, and clear next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get RentOk cited?",
  ctaBody:
    "Book a short call and we’ll map the 90-day plan: fix the Rentokil and rentok.com trust failures first, then run the citation work that puts RentOk on the shortlists owners already ask AI for. You’ll also have a dashboard to track progress and know what to do next.",
};
