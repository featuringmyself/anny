import type { VisibilityReport } from "../types";

const SHOT = "/audits/sprentzo";

/** Private outreach report for Sprentzo. ChatGPT snapshot, August 2026. */
export const sprentzoAiVisibilityReport: VisibilityReport = {
  slug: "sprentzo-ai-visibility-report",
  company: "Sprentzo",
  website: "sprentzo.com",
  industry: "Sports gear + Bengaluru sports community (pickleball-led)",
  preparedFor: "Piyush Jain",
  role: "Cofounder",
  email: "piyush.jain@sprentzo.com",
  dateLabel: "August 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "Community-shaped sports gear + Bengaluru’s sports community — paddles, apparel, and the app that books the court.",
  summary:
    "Sprentzo sells community-tested gear and runs a Bengaluru sports community app with 5,000+ players. On the buyer prompts people type into ChatGPT, AI awards neither lane. Gear shortlists go to JOOLA, Decathlon, Arrowmax, FYNX, FirstEdge, and Amazon. Bengaluru community and “find players” prompts go to Playo, Hudle, and clubs like BPC. Worse: “is Sprentzo reliable” cannot identify the brand, and “are sprentzo products reliable” treats Sprentzo as skincare and cites ScamAdviser. Brand-name asks know the Indian paddle label but lean on self-cites and budget framing versus Selkirk — not shortlist wins. This ChatGPT snapshot is the baseline. A 90-day sprint fixes trust and identity, then cites Sprentzo on India paddle, apparel, and Bengaluru app prompts, expanding across Perplexity, Google AI Overview, Gemini, and Claude.",
  stats: [
    { label: "Products", value: "13" },
    { label: "Players", value: "5,000+" },
    { label: "Free ship", value: "₹999+" },
    { label: "Same-day", value: "Bengaluru" },
  ],
  brandCrisisHeadline:
    "Buyers checking if Sprentzo is real get skincare advice and a scam checklist",
  brandCrisisDek:
    "“Is Sprentzo reliable” cannot name the sports brand. “Are sprentzo products reliable” answers as skincare and cites ScamAdviser. Trust fails before a paddle or an app install.",
  queriesHeadline: "Prompt audit · 11 queries",
  queriesIntro:
    "Gear shortlists, Bengaluru community, and app prompts buyers already type. Sprentzo is missing from every recommendation shortlist in this set. Brand-name rows at the end are not wins — self-cited review and budget framing vs Selkirk. Trust prompts are covered above.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 11, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "JOOLA", visibility: 72 },
    { name: "Decathlon", visibility: 64 },
    { name: "Playo", visibility: 70 },
    { name: "Hudle", visibility: 58 },
    { name: "FYNX / Arrowmax", visibility: 55 },
    { name: "FirstEdge", visibility: 48 },
    { name: "BPC / Meetup", visibility: 42 },
    { name: "Cosco / Franklin", visibility: 40 },
    { name: "Selkirk", visibility: 36 },
    { name: "Sprentzo", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-which-sprentzo",
      query: "is Sprentzo reliable",
      title: "AI asks which Sprentzo — and cannot find the brand",
      body: "ChatGPT asks the buyer to clarify which Sprentzo they mean. It cannot find a well-established consumer brand, cites a single Glassdoor review for Sprentzo Sports Pvt Ltd, and asks for a URL or what they sell. A prospect checking trust before gear or the app never sees community-tested paddles or the Bengaluru sports app.",
      outcome: "Identity failure · brand not recognized",
      screenshot: {
        src: `${SHOT}/crisis-is-sprentzo-reliable.png`,
        alt: "ChatGPT answering “is Sprentzo reliable” without identifying the sports brand",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-skincare",
      query: "are sprentzo products reliable",
      title: "Products ask returns skincare advice and ScamAdviser",
      body: "Asked whether Sprentzo products are reliable, the model treats Sprentzo as a skincare brand, notes thin independent reviews, and cites ScamAdviser. It offers to evaluate serums or sunscreens. Same energy as a brand collision: the sports company never appears.",
      outcome: "Wrong category · skincare + ScamAdviser",
      screenshot: {
        src: `${SHOT}/crisis-are-sprentzo-products-reliable.png`,
        alt: "ChatGPT answering “are sprentzo products reliable” as a skincare brand with ScamAdviser",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best pickleball paddle India",
      intent: "Core category: first shortlist buyers build when shopping for paddles in India",
      severity: "high",
      citedBrands: ["Arrowmax", "FYNX", "JOOLA", "HEAD"],
      rentokStatus: "missing",
      outcome: "Sprentzo missing · Arrowmax / FYNX / JOOLA / HEAD fill the shortlist",
      screenshot: {
        src: `${SHOT}/01-best-pickleball-paddle-india.png`,
        alt: "ChatGPT best pickleball paddle India shortlist without Sprentzo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Best overall under ₹5,000 goes to an Arrowmax carbon paddle. FYNX Neo I, JOOLA, and HEAD Boom Tour EX fill the rest. Sprentzo does not appear.",
          sources: ["Product Hunter", "SportsGear24x7"],
        },
      ],
    },
    {
      id: "q2",
      query: "best beginner pickleball paddle India",
      intent: "Beginner / entry price lane Sprentzo sells into",
      severity: "high",
      citedBrands: ["Decathlon", "Cosco", "Grytskill", "Kobo"],
      rentokStatus: "missing",
      outcome: "Beginner shelf · Decathlon / Cosco / Amazon sets, Sprentzo absent",
      screenshots: [
        {
          src: `${SHOT}/02-best-beginner-pickleball-paddle-india.png`,
          alt: "ChatGPT beginner pickleball paddle India recommendations without Sprentzo",
          model: "chatgpt",
          label: "Best beginner",
          prompt: "best beginner pickleball paddle India",
        },
        {
          src: `${SHOT}/02b-pickleball-paddle-for-beginners-india.png`,
          alt: "ChatGPT pickleball paddle for beginners India without Sprentzo",
          model: "chatgpt",
          label: "For beginners",
          prompt: "pickleball paddle for beginners India",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Decathlon leads; Cosco Tango, Grytskill Blaze, and Kobo sets follow via Amazon and retail. Same beginner intent on a second phrasing still skips Sprentzo.",
          sources: ["Decathlon", "Amazon.in"],
        },
      ],
    },
    {
      id: "q3",
      query: "carbon fiber pickleball paddle India",
      intent: "Spec / performance ask where community-tested carbon paddles should compete",
      severity: "high",
      citedBrands: ["FirstEdge", "Vector X", "Handle Sports", "Specton"],
      rentokStatus: "missing",
      outcome: "Carbon / T700 lane · FirstEdge and peers, Sprentzo not named",
      screenshots: [
        {
          src: `${SHOT}/03-carbon-fiber-pickleball-paddle-india.png`,
          alt: "ChatGPT carbon fiber pickleball paddle India without Sprentzo",
          model: "chatgpt",
          label: "Carbon fiber",
          prompt: "carbon fiber pickleball paddle India",
        },
        {
          src: `${SHOT}/03b-carbon-fiber-paddle-under-10k.png`,
          alt: "ChatGPT carbon fiber paddle under 10k India without Sprentzo",
          model: "chatgpt",
          label: "Under ₹10k",
          prompt: "carbon fiber pickleball paddle under 10000 India",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "FirstEdge VeloFlex T700 leads value; Vector X, Handle Sports, and Specton fill other budgets. Under-₹10k phrasing still routes to Amazon-listed rivals. Sprentzo is absent.",
          sources: ["Amazon.in"],
        },
      ],
    },
    {
      id: "q4",
      query: "lightweight pickleball paddle India",
      intent: "Weight / feel shortlist for recreational and club buyers",
      severity: "high",
      citedBrands: ["Franklin", "JOOLA", "Decathlon"],
      rentokStatus: "missing",
      outcome: "Lightweight shortlist · Franklin / JOOLA / Decathlon",
      screenshot: {
        src: `${SHOT}/04-lightweight-pickleball-paddle-india.png`,
        alt: "ChatGPT lightweight pickleball paddle India without Sprentzo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Franklin Pilot and C45, JOOLA Astral, and Decathlon map beginner through advanced. Sprentzo is not on the lightweight shortlist.",
        },
      ],
    },
    {
      id: "q5",
      query: "best pickleball apparel under 2k",
      intent: "Apparel under ₹2k — court kits buyers actually budget for",
      severity: "high",
      citedBrands: ["H&M", "Armisto", "Artengo"],
      rentokStatus: "missing",
      outcome: "Apparel under ₹2k · H&M / Armisto / Artengo",
      screenshot: {
        src: `${SHOT}/05-best-pickleball-apparel-under-2k.png`,
        alt: "ChatGPT pickleball apparel under 2k without Sprentzo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "H&M Move mesh tee, Armisto pickleball dri-fit, and Artengo tennis shorts own the under-₹2k kits. Sprentzo apparel is not cited.",
          sources: ["Reddit"],
        },
      ],
    },
    {
      id: "q6",
      query: "best pickleball jersey India",
      intent: "Jersey / match-wear lane for clubs and recreational players",
      severity: "high",
      citedBrands: ["IndianUltras", "Teemates", "JOOLA", "HRX"],
      rentokStatus: "missing",
      outcome: "Jersey shortlist · IndianUltras / Teemates / JOOLA / HRX",
      screenshot: {
        src: `${SHOT}/06-best-pickleball-jersey-india.png`,
        alt: "ChatGPT best pickleball jersey India without Sprentzo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "IndianUltras for pickleball-specific, Teemates for teams, JOOLA Court Short Sleeve premium, HRX budget casual. Sprentzo jersey and cap lane never appears.",
        },
      ],
    },
    {
      id: "q7",
      query: "where to buy pickleball paddle in India",
      intent: "Buy-path: where AI sends purchase intent before a DTC site",
      severity: "high",
      tag: "Channel theft",
      citedBrands: [
        "Pickle Paddle India",
        "Flipkart",
        "Amazon",
        "JOOLA",
      ],
      rentokStatus: "missing",
      outcome: "Buy path · marketplaces + JOOLA; Sprentzo DTC invisible",
      screenshots: [
        {
          src: `${SHOT}/07-where-to-buy-pickleball-paddle-india.png`,
          alt: "ChatGPT where to buy pickleball paddle in India without Sprentzo",
          model: "chatgpt",
          label: "Where to buy",
          prompt: "where to buy pickleball paddle in India",
        },
        {
          src: `${SHOT}/07b-buy-pickleball-paddle-online-india.png`,
          alt: "ChatGPT buy pickleball paddle online India without Sprentzo",
          model: "chatgpt",
          label: "Buy online",
          prompt: "buy pickleball paddle online India",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Pickle Paddle India (JOOLA, Selkirk, Franklin), Flipkart, and Amazon take the buy path. JOOLA paddles fill the premium carousel. Online phrasing still skips sprentzo.com.",
        },
      ],
    },
    {
      id: "q8",
      query: "community focussed pickleball brands in bangalore",
      intent: "Home-turf community claim: Bengaluru pickleball brands and operators",
      severity: "critical",
      tag: "Home turf miss",
      citedBrands: [
        "Bangalore Pickleball Community",
        "PickleMania",
        "PicklePoint",
        "Wally Sports",
      ],
      rentokStatus: "missing",
      outcome: "Bengaluru community irony · BPC / clubs win, Sprentzo invisible",
      screenshot: {
        src: `${SHOT}/08-community-focussed-pickleball-brands-bangalore.png`,
        alt: "ChatGPT community-focused pickleball brands in Bangalore without Sprentzo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "BPC, PickleMania, PicklePoint, and Wally Sports fill the community-first table. Sprentzo’s community-tested / community-first Bengaluru claim never appears.",
        },
      ],
    },
    {
      id: "q9",
      query: "sports community app India",
      intent: "National app category: find players, book venues, join games",
      severity: "high",
      citedBrands: [
        "Playo",
        "Hudle",
        "Conqore",
        "Playwhere",
        "Ofside",
        "PlayAll",
      ],
      rentokStatus: "missing",
      outcome: "App category · Playo / Hudle own India; Sprentzo app absent",
      screenshot: {
        src: `${SHOT}/09-sports-community-app-india.png`,
        alt: "ChatGPT sports community app India table without Sprentzo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Playo and Hudle lead; Conqore, Playwhere, Ofside, and PlayAll fill the table. Sprentzo’s Play Store app is not listed despite 5,000+ players.",
          sources: ["App Store"],
        },
      ],
    },
    {
      id: "q10",
      query: "best app to find people to play sports in bangalore",
      intent: "Bengaluru find-players / book-court job the Sprentzo app is built for",
      severity: "critical",
      tag: "App lane miss",
      citedBrands: ["Playo", "Hudle", "Meetup"],
      rentokStatus: "missing",
      outcome: "Bengaluru find-players · Playo #1, Hudle #2; Sprentzo missing",
      screenshots: [
        {
          src: `${SHOT}/10-best-app-find-people-play-sports-bangalore.png`,
          alt: "ChatGPT best app to find sports players in Bangalore without Sprentzo",
          model: "chatgpt",
          label: "Find players",
          prompt: "best app to find people to play sports in bangalore",
        },
        {
          src: `${SHOT}/10b-find-padel-players-bangalore.png`,
          alt: "ChatGPT find padel players Bangalore without Sprentzo",
          model: "chatgpt",
          label: "Padel variant",
          prompt: "best app to find padel players in bangalore",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Playo is best overall for Bangalore; Hudle second; Meetup and chat groups third. Padel / sport variants still open on Playo and Hudle. Sprentzo app never named.",
          sources: ["Playo", "Reddit", "App Store"],
        },
      ],
    },
    {
      id: "q11",
      query: "Sprentzo pickleball paddle review",
      intent:
        "Brand-name ask: AI knows the Indian brand but will not recommend it on category prompts",
      severity: "standard",
      tag: "Thin brand · not a win",
      citedBrands: ["Sprentzo", "Selkirk"],
      rentokStatus: "warned",
      outcome:
        "Knows the name · self-cite review + budget framing vs Selkirk — not a shortlist win",
      screenshots: [
        {
          src: `${SHOT}/11-sprentzo-pickleball-paddle-review.png`,
          alt: "ChatGPT Sprentzo pickleball paddle review leaning on brand self-cites",
          model: "chatgpt",
          label: "Paddle review",
          prompt: "Sprentzo pickleball paddle review",
        },
        {
          src: `${SHOT}/12-sprentzo-vs-selkirk.png`,
          alt: "ChatGPT Sprentzo vs Selkirk comparison framing Sprentzo as newer and budget",
          model: "chatgpt",
          label: "Vs Selkirk",
          prompt: "Sprentzo vs Selkirk",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Review names Sprentzo as an Indian community-tested paddle brand, then admits almost no independent reviews and leans on Sprentzo’s own pages. Vs Selkirk frames Sprentzo as newer, cheaper, and limited for tournament play. Recognition without recommendation.",
          sources: ["Sprentzo", "Selkirk"],
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "Get Sprentzo cited on gear and Bengaluru app prompts within 90 days",
    body: "When buyers ask ChatGPT, Perplexity, Google AI Overview, and other models for pickleball gear in India or a sports community app in Bengaluru, Sprentzo should show up — not JOOLA on Amazon, not Playo alone. We start with the trust failures that kill the sale before a paddle or an install: “which Sprentzo?” and skincare + ScamAdviser. Then we run citation work on both lanes in one engagement — India paddle and apparel shortlists, and Bengaluru find-players / community prompts. Alongside the execution work you get a dashboard so you can see which models cite you, where competitors win, your improvement score, and the next actions to take each week.",
    outcomes: [
      "Trust and identity fixed so “is Sprentzo reliable” stops returning “which Sprentzo?” or skincare / ScamAdviser",
      "Cited on priority India paddle and apparel prompts that today route to JOOLA, Decathlon, Arrowmax, and Amazon",
      "Sprentzo app cited on Bengaluru “find players / sports community” prompts Playo and Hudle own today",
      "Community-tested / community-first Bengaluru claim visible where BPC and clubs currently win",
      "Weekly re-tests of this prompt set with screenshot proof, plus a tracking dashboard for model gaps, competitor share, and clear next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get Sprentzo cited on gear and the app?",
  ctaBody:
    "Book a short call and we’ll map the 90-day plan: clear the reliability and skincare collision first, then run citation work on India paddle / apparel shortlists and Bengaluru find-players prompts in one engagement. You’ll also have a dashboard to track progress and know what to do next.",
};
