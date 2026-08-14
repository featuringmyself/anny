import type { VisibilityReport } from "../types";

const SHOT = "/audits/zipfresh";

/** Private outreach report for ZipFRESH. ChatGPT snapshot, August 2026. */
export const zipfreshAiVisibilityReport: VisibilityReport = {
  slug: "zipfresh-ai-visibility-report",
  company: "ZipFRESH",
  website: "zipfresh.in",
  industry: "Neighbourhood mill / freshly stone-ground staples · Mumbai",
  preparedFor: "Raaj Chakravarti",
  role: "Co-founder",
  dateLabel: "August 2026",
  overallScore: 10,
  scoreLabel: "Poor",
  private: true,
  tagline: "The neighbourhood mill, reinvented",
  summary:
    "When someone asks how zipfresh.in works, ChatGPT can read the site: hyperlocal mill, stone-ground, 4 km hub, hours-old flour, spices and batter as later phases. When they paste the same URL and ask if it is legit, whether to order atta, or whether ZipFresh delivers in Mumbai, the answer is still pouches, laundry, Zappfresh meat, or “couldn’t verify — here are other mills.” That is the hire. Missing “best chakki Mumbai” is expected for a new mill. The buyer who already has zipfresh.in still gets the wrong answer. About 70% of searches are moving from Google to chatbots; brands the model can name and trust convert about 4.4x. A 90-day sprint makes the mill the answer on those URL prompts, then makes spices and batter AI-ready so Phase 2 and 3 are not a second cold start.",
  stats: [
    { label: "Preservatives", value: "0" },
    { label: "Mill-to-door", value: "<4 hrs" },
    { label: "Hub radius", value: "4 km" },
    { label: "Free delivery", value: "₹499+" },
    { label: "City", value: "Mumbai" },
    { label: "Flours claimed", value: "11+" },
  ],
  brandCrisisHeadline:
    "Paste zipfresh.in and ChatGPT still may tell them not to order",
  brandCrisisDek:
    "The URL is in the prompt. The mill still loses to zipfresh.com pouches, a don’t-pay verdict, and a don’t-order atta answer that names Aashirvaad instead.",
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "URL and buy prompts first, then the one how-it-works cite. Mumbai atta, spices, batter, and Goregaon mill shelves after that. A new mill missing category shortlists is expected. A buyer who already typed zipfresh.in still getting pouches, laundry, or “don’t order” is not.",
  modelScores: [
    { model: "chatgpt", visibility: 10, cited: 1, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Satvik Annapurna", visibility: 40 },
    { name: "Vishakha Zipfresh (pouches)", visibility: 30 },
    { name: "Urban Chakki", visibility: 25 },
    { name: "Origgo / Pure Tree Foods", visibility: 20 },
    { name: "Local Goregaon chakkis", visibility: 20 },
    { name: "Aashirvaad", visibility: 15 },
    { name: "Zappfresh", visibility: 15 },
    { name: "ZipFRESH", visibility: 10 },
  ],
  brandCrisis: [
    {
      id: "crisis-legit",
      query: "is zipfresh.in legit",
      title: "Cautious, zipfresh.com is the established brand, COD only",
      body: "ChatGPT opens “I’d be cautious with zipfresh.in.” It cannot find enough independent evidence to call it a legitimate store, notes the .in domain was created in March 2026, and points to zipfresh.com (Vishakha Polyfab) as the established brand. Verdict: do not pay in advance. COD only. Do not enter card or UPI details until GSTIN and a physical address check out.",
      outcome: "URL in the prompt · don’t pay / COD only",
      screenshot: {
        src: `${SHOT}/01-is-zipfresh-in-legit.png`,
        alt: "ChatGPT answering “is zipfresh.in legit” with caution and a don’t-pay verdict",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-order",
      query: "should I order atta from zipfresh.in",
      title: "Don’t order. Pouches in search. Packaged atta has the proof.",
      body: "Asked whether to order atta from zipfresh.in, ChatGPT says be cautious about ordering right now. Search mostly hits an unrelated Zipfresh packaging company, not a mill. It sends the buyer to Aashirvaad, Pillsbury, Patanjali, and Shakti Bhog — brands with BIS/FSSAI testing coverage. The mill never appears.",
      outcome: "Don’t order · pouches + packaged atta",
      screenshot: {
        src: `${SHOT}/03-should-i-order-atta-from-zipfresh-in.png`,
        alt: "ChatGPT answering “should I order atta from zipfresh.in” with don’t-order caution",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "is zipfresh.in legit",
      intent:
        "Trust check after someone already has the URL — the mill should clear, not zipfresh.com pouches",
      severity: "critical",
      tag: "URL fail",
      citedBrands: ["zipfresh.com", "Vishakha Polyfab"],
      rentokStatus: "warned",
      outcome: "Cautious · zipfresh.com established · COD only",
      screenshot: {
        src: `${SHOT}/01-is-zipfresh-in-legit.png`,
        alt: "ChatGPT answering “is zipfresh.in legit” with caution and a don’t-pay verdict",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "I’d be cautious with zipfresh.in. Not enough independent evidence to call it a legitimate store. Domain created March 2026. zipfresh.com is the established brand. Do not pay in advance — COD only.",
          sources: ["Registry", "Zipfresh"],
        },
      ],
    },
    {
      id: "q2",
      query: "alternatives to zipfresh.in",
      intent:
        "What AI names instead of the mill when someone asks for zipfresh.in alternatives",
      severity: "critical",
      tag: "Wrong category",
      citedBrands: [
        "Pick My Laundry",
        "Spinbee",
        "Laundrywala",
        "iWash Hub",
        "UClean",
        "Spynzo",
        "FABO",
      ],
      rentokStatus: "confused",
      outcome: "Laundry / dry-cleaning · mill never appears",
      screenshot: {
        src: `${SHOT}/02-alternatives-to-zipfresh-in.png`,
        alt: "ChatGPT answering “alternatives to zipfresh.in” with laundry and dry-cleaning brands",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT treats zipfresh.in as a laundry / dry-cleaning pickup service and lists Pick My Laundry, Spinbee, Laundrywala, iWash Hub, UClean, Spynzo, and FABO. It then asks what ZipFresh actually sells.",
        },
      ],
    },
    {
      id: "q3",
      query: "should I order atta from zipfresh.in",
      intent: "Buy decision with the URL in the prompt — hours-old mill atta vs pouched brands",
      severity: "critical",
      tag: "Don’t order",
      citedBrands: ["Aashirvaad", "Pillsbury", "Patanjali", "Shakti Bhog"],
      rentokStatus: "warned",
      outcome: "Don’t order · pouches in search · packaged atta named",
      screenshot: {
        src: `${SHOT}/03-should-i-order-atta-from-zipfresh-in.png`,
        alt: "ChatGPT answering “should I order atta from zipfresh.in” with don’t-order caution",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "I’d be cautious about ordering atta from zipfresh.in right now. Search points to an unrelated Zipfresh packaging company. Aashirvaad, Pillsbury, Patanjali, and Shakti Bhog have the BIS/FSSAI proof.",
          sources: ["Zipfresh", "CERCENVIS"],
        },
      ],
    },
    {
      id: "q4",
      query: "does ZipFresh deliver in Mumbai",
      intent:
        "Mumbai delivery is the mill’s job. AI should not answer pouches or Zappfresh meat.",
      severity: "critical",
      tag: "Zappfresh collision",
      citedBrands: ["Zipfresh (pouches)", "Zappfresh"],
      rentokStatus: "confused",
      outcome: "Pouches, not a delivery service · Zappfresh meat yes Mumbai",
      screenshot: {
        src: `${SHOT}/04-does-zipfresh-deliver-in-mumbai.png`,
        alt: "ChatGPT answering “does ZipFresh deliver in Mumbai” with pouches and Zappfresh meat",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "If you mean Zipfresh the food-storage bag brand, it is not a delivery service. If you meant Zappfresh the meat service, yes — Mumbai is a delivery city. zipfresh.in is never checked.",
          sources: ["Zipfresh", "zappfresh.com"],
        },
      ],
    },
    {
      id: "q5",
      query: "zipfresh.in freshly milled atta Mumbai",
      intent:
        "URL + category + city in one prompt. The mill should verify, not hand the shelf to other mills.",
      severity: "high",
      tag: "Couldn’t verify",
      citedBrands: ["Satvik Annapurna", "Pure Tree Foods", "Origgo"],
      rentokStatus: "missing",
      outcome: "Couldn’t verify the site · other Mumbai mills named",
      screenshot: {
        src: `${SHOT}/05-zipfresh-in-freshly-milled-atta-mumbai.png`,
        alt: "ChatGPT answering “zipfresh.in freshly milled atta Mumbai” without verifying the mill",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Couldn’t verify the Zipfresh website from current search. Names Satvik Annapurna, Pure Tree Foods, and Origgo for freshly milled atta in Mumbai instead.",
          sources: ["Satvik Annapurna", "Puretree Foods", "Origgo"],
        },
      ],
    },
    {
      id: "q6",
      query: "how does zipfresh.in work",
      intent:
        "The one prompt where ChatGPT reads the mill correctly — thin win, same energy as a single launch cite",
      severity: "standard",
      tag: "Fragile win",
      citedBrands: ["ZipFRESH"],
      rentokStatus: "cited",
      outcome: "Correct mill · hyperlocal chakki, 4 km, spices/batter later",
      screenshot: {
        src: `${SHOT}/06-how-does-zipfresh-in-work.png`,
        alt: "ChatGPT answering “how does zipfresh.in work” with the correct hyperlocal mill",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "ChatGPT names zipfresh.in as a hyperlocal fresh-flour mill, distinct from the pouch brand. Neighbourhood hub, stone-ground in small batches, delivery within hours inside a 4 km radius. Wheat atta, multigrain, bajra, jowar, nachni, besan, sattu now; spices and batter as future phases. Neighbourhood chakki plus quick-commerce delivery. Nearby buy and legit prompts still miss, so this cite does not hold alone.",
          sources: ["ZipFRESH"],
        },
      ],
    },
    {
      id: "q7",
      query: "freshly milled atta delivery in Mumbai",
      intent:
        "Category shelf buyers already type. A new mill missing this list is expected, not a scare.",
      severity: "standard",
      tag: "Expected gap",
      citedBrands: [
        "Satvik Annapurna",
        "Urban Chakki",
        "ChakkiOnFresh",
        "ShuddhOra",
      ],
      rentokStatus: "missing",
      outcome: "Mumbai atta shelf · ZipFRESH absent, as expected",
      screenshot: {
        src: `${SHOT}/07-freshly-milled-atta-delivery-mumbai.png`,
        alt: "ChatGPT freshly milled atta delivery in Mumbai without ZipFRESH",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Satvik Annapurna, Urban Chakki, ChakkiOnFresh, and ShuddhOra fill the Mumbai freshly milled atta list. ZipFRESH is not named. Normal for a mill this new — the sprint still needs this shelf after the URL prompts clear.",
        },
      ],
    },
    {
      id: "q8",
      query: "freshly ground spices home delivery Mumbai",
      intent:
        "Phase 2 shelf: make spices AI-ready at launch so this is not a second cold start",
      severity: "high",
      tag: "Coming soon",
      citedBrands: [
        "GW Khamkar Spices",
        "Satvik Annapurna",
        "Shreeji Foods",
        "Grand Masala",
        "Lalbaug Masalawale",
      ],
      rentokStatus: "missing",
      outcome: "Spice shelf already named · ZipFRESH not live yet",
      screenshot: {
        src: `${SHOT}/08-freshly-ground-spices-mumbai.png`,
        alt: "ChatGPT freshly ground spices home delivery Mumbai without ZipFRESH",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "GW Khamkar, Satvik Annapurna, Shreeji Foods, Grand Masala, and Lalbaug Masalawale own freshly ground spices delivery in Mumbai. ZipFRESH spices are not live — the sprint makes Phase 2 cited at launch.",
        },
      ],
    },
    {
      id: "q9",
      query: "idli dosa batter freshly ground Mumbai",
      intent:
        "Phase 3 shelf: same as spices — AI-ready at launch, including Goregaon East already on this list",
      severity: "high",
      tag: "Coming soon",
      citedBrands: [
        "Idli by Kilo",
        "Simmply Foods",
        "Taste Now",
        "Annapurneshwari Enterprises",
      ],
      rentokStatus: "missing",
      outcome: "Batter shelf · Idli by Kilo already in Goregaon East",
      screenshot: {
        src: `${SHOT}/09-idli-dosa-batter-mumbai.png`,
        alt: "ChatGPT idli dosa batter freshly ground Mumbai without ZipFRESH",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Idli by Kilo (Goregaon East), Simmply Foods, Taste Now, and Annapurneshwari fill freshly ground idli/dosa batter in Mumbai. Same job as spices: Phase 3 should be cited at launch, not after a second cold start.",
          sources: ["Idli by Kilo", "Simmply Foods", "Taste Now", "ExportersIndia"],
        },
      ],
    },
    {
      id: "q10",
      query: "atta mill near Goregaon Mumbai",
      intent:
        "Home-turf walk-in shelf, including Bangur Nagar — shows the mill list AI already uses, not a brand fail",
      severity: "standard",
      tag: "Home turf shelf",
      citedBrands: [
        "Azad Flour Mill",
        "Online Chakkiwala",
        "Jani Flour Mill",
        "Suryaa Atta",
        "Jay Hanuman Flour Mill",
        "Mahesh flour mill",
      ],
      rentokStatus: "missing",
      outcome: "Walk-in mills · Jani Flour Mill, Bangur Nagar named",
      screenshot: {
        src: `${SHOT}/10-atta-mill-near-goregaon-mumbai.png`,
        alt: "ChatGPT atta mill near Goregaon Mumbai naming walk-in mills, not ZipFRESH",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Azad Flour Mill, Online Chakkiwala, Jani Flour Mill in Bangur Nagar, Suryaa Atta, Jay Hanuman Flour Mill, and Mahesh flour mill fill Goregaon. Jani is the same neighbourhood as the listed mill address. Expected walk-in shelf — not a scare.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "Make zipfresh.in resolve to the mill — then cite atta, spices, and batter at launch",
    body: "This is a 90-day citation sprint, not a SaaS login. About 70% of searches are moving from Google to chatbots. Brands the model can name and trust convert about 4.4x — outreach math for why these answers matter, not a ZipFRESH KPI from this snapshot. We start with the URL fails: legit, order, and deliver still answer pouches, laundry, or Zappfresh. Then we put the mill on Mumbai hours-old atta asks, and strap spices and batter so Phase 2 and 3 launch already cited. Weekly re-tests of this prompt set, with a dashboard for model gaps, competitor share, score, and the next action each week.",
    outcomes: [
      "zipfresh.in resolves to the mill on legit, should-I-order, and Mumbai-deliver prompts — not pouches, laundry, or Zappfresh",
      "Cited on Mumbai hours-old / freshly milled atta asks that today name Satvik Annapurna, Urban Chakki, and Origgo",
      "Spices and batter AI-ready at Phase 2 and 3 launch so those shelves are not a second cold start",
      "This prompt set re-tested weekly, with screenshots proving movement, plus a dashboard for model gaps, competitor share, score trend, and next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to make zipfresh.in resolve to the mill?",
  ctaBody:
    "Book a short call. We will map the 90-day sprint from this audit: URL prompts that still say don’t order, Mumbai atta cites, spices and batter ready at launch, and weekly proof the answers are moving. About 70% of search is shifting to chatbots; brands the model can trust convert about 4.4x.",
};
