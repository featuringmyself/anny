import type { VisibilityReport } from "../types";

const SHOT = "/audits/truliv";

/** Private outreach report for Truliv. ChatGPT snapshot, August 2026. */
export const trulivAiVisibilityReport: VisibilityReport = {
  slug: "truliv-ai-visibility-report",
  company: "Truliv",
  website: "truliv.in",
  industry: "Coliving & holiday homes",
  preparedFor: "Prem Anand",
  role: "CMO",
  email: "prem.a@truliv.in",
  dateLabel: "August 2026",
  overallScore: 25,
  scoreLabel: "Poor",
  private: true,
  tagline:
    "Flexible living — short lock-in, tailored services, deposit refund without ghosting",
  summary:
    "ChatGPT already answers for coliving and flexible stays — demand is being routed now. Truliv runs 30+ properties across 3+ cities with 25K+ tenants and a 4.5 Google rating, yet on 9 of 12 buyer prompts in this snapshot someone else (or a hotel) gets the shortlist. Score 25 is not a soft landing: the deposit USP on truliv.in fails the trust gate before a tour; “is Truliv reliable” and “does truliv refund the deposit timely?” never get a clean yes. Two thin #1s (Hestia on abstract flexible Chennai; Adonia near Bascon via a MagicBricks-style cite) do not hold next door — Kodambakkam PG and 30-day stays skip Truliv, city coliving buries you at #6 under Stanza/Zolo/Colive/StayBro, Bengaluru expansion shelves are empty, and Puducherry holiday homes never appear. This ChatGPT snapshot is the baseline. A 90-day sprint stops the leakage: make deposit answers hold, defend Chennai home turf, open Bengaluru where AI already decides, cite holiday homes — then expand across Perplexity, Google AI Overview, Gemini, and Claude.",
  stats: [
    { label: "Properties", value: "30+" },
    { label: "Cities", value: "03+" },
    { label: "Tenants", value: "25K+" },
    { label: "Google", value: "4.5" },
  ],
  brandCrisisHeadline:
    "truliv.in sells a 7-day deposit refund. ChatGPT will not vouch for it",
  brandCrisisDek:
    "Homepage promise: instant confirmation and a fast UPI refund. Ask if Truliv is reliable or if deposits come back on time — the trust gate fails before a tour.",
  queriesHeadline: "Prompt audit · 12 queries",
  queriesIntro:
    "Buyer prompts already routing demand: Chennai USP and home turf, Bengaluru expansion, property depth, holiday homes. Two thin #1s do not hold next door. Nine of twelve send the shortlist elsewhere.",
  modelScores: [
    { model: "chatgpt", visibility: 25, cited: 3, total: 12, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Stanza Living", visibility: 68 },
    { name: "Zolo", visibility: 62 },
    { name: "Colive", visibility: 55 },
    { name: "StayBro", visibility: 48 },
    { name: "Housr", visibility: 42 },
    { name: "Staylogy", visibility: 38 },
    { name: "Truliv", visibility: 25 },
  ],
  brandCrisis: [
    {
      id: "crisis-reliable",
      query: "is Truliv reliable",
      title: "Trust gate fails · deposit caution leads",
      body: "ChatGPT treats Truliv as a real coliving operator — then puts security-deposit delays and disputes near the top of what to watch. App Store coverage around 2.8/5 and mixed resident notes fold into the same caution. A prospect checking trust before booking never gets a clean pass on the promise truliv.in sells.",
      outcome: "Trust gate fails · deposit caution leads",
      screenshot: {
        src: `${SHOT}/crisis-is-truliv-reliable.png`,
        alt: "ChatGPT answering “is Truliv reliable” with deposit refund caution",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-refund",
      query: "does truliv refund the deposit timely?",
      title: "Direct deposit ask · no confident yes",
      body: "Asked whether Truliv refunds deposits on time, the model says there is not enough independent public data to confirm consistent timely refunds. It repeats the official 7–10 working-day policy from truliv.in and cites thin App Store coverage. The homepage’s sharpest claim — refund without ghosting — stays unanswered. That is booking friction before a tour.",
      outcome: "USP irony · policy cited, proof missing",
      screenshot: {
        src: `${SHOT}/crisis-does-truliv-refund-deposit-timely.png`,
        alt: "ChatGPT answering deposit refund timing with thin independent proof",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "flexible coliving Chennai 1 month",
      intent: "Exact USP ask: short lock-in coliving in Chennai",
      severity: "standard",
      tag: "Thin win",
      citedBrands: [
        "Truliv Hestia",
        "Stanza Living",
        "Colive",
        "Wowlife",
        "Awwstel",
      ],
      rentokStatus: "cited",
      outcome: "Thin win · Hestia #1 that does not hold next door",
      screenshot: {
        src: `${SHOT}/01-flexible-coliving-chennai-1-month.png`,
        alt: "ChatGPT ranking Truliv Hestia #1 for flexible coliving Chennai 1 month",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "Truliv Hestia (T. Nagar) leads for stays from 30 days onward. Stanza, Colive, Wowlife, and Awwstel follow. Same flexible job on Kodambakkam home turf routes to hotels and serviced apartments — this #1 does not travel.",
        },
      ],
    },
    {
      id: "q2",
      query: "best coliving in chennai",
      intent: "City-level shortlist for Chennai coliving",
      severity: "high",
      tag: "Buried",
      citedBrands: [
        "StayBro",
        "Stanza Living",
        "Zolo",
        "Colive",
        "Staylogy",
        "Truliv",
      ],
      rentokStatus: "cited",
      outcome: "Buried #6 · Stanza/Zolo/Colive/StayBro own the city",
      screenshot: {
        src: `${SHOT}/02-best-coliving-in-chennai.png`,
        alt: "ChatGPT Chennai coliving shortlist with Truliv listed sixth",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 6,
          excerpt:
            "StayBro, Stanza Living, Zolo, Colive, and Staylogy fill the top of the list. Truliv appears last as premium co-living around Porur, Perungudi, and T. Nagar. Present on paper; buried in the shortlist buyers actually scan.",
        },
      ],
    },
    {
      id: "q3",
      query: "best coliving near Bascon Futura SV IT Park",
      intent: "Micro-market ask next to a Chennai IT park",
      severity: "standard",
      tag: "Thin win",
      citedBrands: [
        "Truliv Adonia",
        "Liveasy Gaia",
        "Arun PG",
        "Rahul Anil Nayak",
        "Royal pg",
      ],
      rentokStatus: "cited",
      outcome: "Thin win · Adonia #1 on a MagicBricks-style cite",
      screenshot: {
        src: `${SHOT}/03-best-coliving-near-bascon-futura.png`,
        alt: "ChatGPT ranking Truliv Adonia #1 near Bascon Futura SV IT Park",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "Truliv Adonia (Kodambakkam) is #1 for premium managed coliving near Bascon Futura, citing MagicBricks. Local PGs fill the rest. Plain “best pg in Kodambakkam” skips Adonia and Althea entirely — home turf does not follow this cite.",
          sources: ["MagicBricks"],
        },
      ],
    },
    {
      id: "q4",
      query: "best pg in Kodambakkam",
      intent: "Home-turf PG ask where Adonia and Althea sit",
      severity: "high",
      tag: "Home turf miss",
      citedBrands: [
        "Amman Men's PG",
        "Station Amman",
        "Andavar",
        "Zolo Moorfield",
        "Thaai Women's Hostel",
        "Krivalaya",
        "Elegance Stay",
      ],
      rentokStatus: "missing",
      outcome: "Home turf miss · Zolo + local PGs, Truliv absent",
      screenshot: {
        src: `${SHOT}/04-best-pg-in-kodambakkam.png`,
        alt: "ChatGPT best PG in Kodambakkam list without Truliv",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Local hostels and Zolo Moorfield fill men’s and women’s shortlists. Truliv Adonia and Althea never appear despite sitting in the same micro-market. Bascon #1 does not defend the neighborhood ask.",
        },
      ],
    },
    {
      id: "q5",
      query: "where should I stay for work in Kodambakkam for 30 days",
      intent: "Same 30-day flexibility job on Chennai home turf",
      severity: "critical",
      tag: "USP leak",
      citedBrands: [
        "Atiti Service Apartments",
        "Shade Point",
        "New Metro Serviced Apartment",
        "GREEN HOME",
        "OYO Super Townhouse",
        "Bhimaas",
        "Hotel Aadithya",
      ],
      rentokStatus: "missing",
      outcome: "USP leak · same 30-day job routes to hotels",
      screenshot: {
        src: `${SHOT}/05-kodambakkam-30-days.png`,
        alt: "ChatGPT recommending hotels and serviced apartments for 30 days in Kodambakkam",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Serviced apartments and hotel-style stays take the 30-day work stay. Truliv’s flexible coliving promise never enters the answer — the same job Hestia won as an abstract USP ask, lost on home turf.",
        },
      ],
    },
    {
      id: "q6",
      query: "best coliving in Bengaluru",
      intent: "City expansion shelf Truliv is funding into",
      severity: "high",
      tag: "Expansion shelf empty",
      citedBrands: [
        "Pro4 Living",
        "Livoza",
        "Skep",
        "AA Premium",
        "OLIVE",
        "Mio Colive",
      ],
      rentokStatus: "missing",
      outcome: "Expansion shelf empty · Bengaluru city shortlist skips Truliv",
      screenshot: {
        src: `${SHOT}/06-best-coliving-in-bengaluru.png`,
        alt: "ChatGPT best coliving in Bengaluru without Truliv",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Area table names Pro4 Living, Livoza, Skep, AA Premium, OLIVE, and Mio Colive across Marathahalli, Koramangala, Indiranagar, Whitefield, Sarjapur, and BTM. Expansion spend without an AI shelf — paying for beds AI will not recommend.",
        },
      ],
    },
    {
      id: "q7",
      query: "good coliving in bangalore",
      intent: "Alternate Bengaluru phrasing buyers still type",
      severity: "high",
      tag: "Expansion shelf empty",
      citedBrands: [
        "Housr",
        "At Home Co-Living",
        "Livoza",
        "Zolo",
        "Stanza Living",
        "Colive",
      ],
      rentokStatus: "missing",
      outcome: "Demand already routed · Housr/Zolo/Stanza own Bangalore",
      screenshot: {
        src: `${SHOT}/07-good-coliving-in-bangalore.png`,
        alt: "ChatGPT good coliving in Bangalore naming Housr Zolo Stanza without Truliv",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Premium and branded buckets fill with Housr, At Home, Livoza, Zolo, Stanza Living, and Colive. Truliv does not appear on either tier — competitors already own the phrasing buyers type.",
          sources: ["LBB", "Zolostays", "Economic Times"],
        },
      ],
    },
    {
      id: "q8",
      query: "best coliving in whitefield",
      intent: "Whitefield micro-market inside Bengaluru expansion",
      severity: "high",
      tag: "Expansion shelf empty",
      citedBrands: [
        "Pro4 Living",
        "URU Co-Living",
        "AA Premium",
        "S2 colive",
        "Shree Jaya",
        "SVL Grand",
      ],
      rentokStatus: "missing",
      outcome: "Whitefield shelf empty · local PGs only",
      screenshot: {
        src: `${SHOT}/08-best-coliving-in-whitefield.png`,
        alt: "ChatGPT best coliving in Whitefield without Truliv",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Pro4 Living, URU, AA Premium, S2, Shree Jaya, and SVL Grand fill Whitefield. MagicBricks-led answers skip Truliv entirely — a micro-market inside the expansion plan with zero AI shelf.",
          sources: ["MagicBricks"],
        },
      ],
    },
    {
      id: "q9",
      query: "single occupancy coliving in whitefield, bangalore under 25k",
      intent: "Budget + single occupancy filter in Whitefield",
      severity: "high",
      tag: "Expansion shelf empty",
      citedBrands: [
        "SVL Grand",
        "AA Premium",
        "KOINN",
        "Yello Living",
        "S2 colive",
        "The Park Coliving",
      ],
      rentokStatus: "missing",
      outcome: "Under-25k Whitefield · demand routed to locals",
      screenshot: {
        src: `${SHOT}/09-single-occupancy-whitefield-under-25k.png`,
        alt: "ChatGPT single occupancy Whitefield under 25k without Truliv",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "SVL Grand, AA Premium, KOINN, Yello Living, S2, and The Park fill the under-₹25k single-occupancy table. Truliv is not shortlisted — budget buyers in Whitefield never hear the brand.",
        },
      ],
    },
    {
      id: "q10",
      query: "how's the wifi in truliv adonia",
      intent:
        "Named-property depth: can AI recommend with confidence? Same style ask for a peer property shows the gap.",
      severity: "standard",
      tag: "Depth gap",
      citedBrands: ["Settl Douglas"],
      rentokStatus: "warned",
      outcome:
        "Truliv Adonia · generic WiFi advice, no resident proof · same style ask for Settl Douglas gets a Reddit-backed answer",
      screenshots: [
        {
          src: `${SHOT}/10-wifi-truliv-adonia.png`,
          alt: "ChatGPT unable to confirm WiFi quality at Truliv Adonia",
          model: "chatgpt",
          label: "Truliv Adonia",
          prompt: "how's the wifi in truliv adonia",
        },
        {
          src: `${SHOT}/10b-wifi-settl-douglas.png`,
          alt: "ChatGPT giving a detailed Reddit-sourced WiFi answer for Settl Douglas",
          model: "chatgpt",
          label: "Settl Douglas",
          prompt: "how's the wifi in settl douglas",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Truliv Adonia is named in Kodambakkam, but almost no resident detail on Wi-Fi speed or reliability — generic peak-hour advice only. Ask the same style question for Settl Douglas and ChatGPT returns use-case breakdowns sourced from Reddit.",
          sources: ["App Store", "Reddit"],
        },
      ],
    },
    {
      id: "q11",
      query: "how's truliv luna",
      intent: "Property-level trust before a booking",
      severity: "high",
      tag: "Mixed / caution",
      citedBrands: ["Truliv Luna"],
      rentokStatus: "warned",
      outcome: "Mixed / caution · deposit warnings at property level",
      screenshot: {
        src: `${SHOT}/11-hows-truliv-luna.png`,
        alt: "ChatGPT mixed review of Truliv Luna with deposit caution",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Thin Luna-specific coverage; the model generalizes from other Truliv properties as mixed. Deposit policies, hidden charges, and room conditions are flagged to verify before committing — not enough independent proof for a clean pass.",
          sources: ["Wanderlog", "Reddit"],
        },
      ],
    },
    {
      id: "q12",
      query: "holiday homes in puducherry",
      intent: "New vertical: holiday homes outside core coliving",
      severity: "high",
      tag: "Vertical shelf empty",
      citedBrands: [
        "Waters Edge Resort",
        "The Balified Villa",
        "Varnam",
        "La Meadow",
        "Villa Mariannie",
        "Divine Beach Resorts",
      ],
      rentokStatus: "missing",
      outcome: "Holiday homes shelf empty · Airbnb villas win",
      screenshot: {
        src: `${SHOT}/12-holiday-homes-puducherry.png`,
        alt: "ChatGPT holiday homes in Puducherry without Truliv",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Private villas and beach stays from Airbnb-style listings fill every bucket. Truliv’s holiday-homes vertical never appears — including adjacent under-25k Puducherry phrasing. New vertical, zero AI shelf.",
          sources: ["Airbnb"],
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "Stop the leakage where AI already decides the shortlist",
    body: "When renters ask ChatGPT, Perplexity, Google AI Overview, and other models about Truliv or flexible coliving, truliv.in should clear the trust gate and own the shortlist — not lose 9 of 12 prompts to competitors and hotels. We start with the leaks in this audit: deposit USP unanswered, Chennai fragile outside two thin #1s, Bengaluru and holiday homes empty, property depth thin. You get a dashboard where this prompt set is re-tested daily — model gaps, competitor share, score trend — and daily suggestions on what to do next until the citations move.",
    outcomes: [
      "Deposit and reliability answers that clear the trust gate — matching the promise on truliv.in",
      "Chennai defended — Kodambakkam PG and 30-day stays cite Truliv, not only hotels and Zolo; city shortlist no longer buries you at #6",
      "Bengaluru city, Whitefield, and under-25k shelves opened so expansion spend is not beds AI will not recommend",
      "Holiday homes in Puducherry cited for the new vertical",
      "This prompt set re-tested daily on the dashboard with screenshot proof, plus daily suggestions on what to do next",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Stop leaking Chennai demand — and open Bengaluru where AI already decides",
  ctaBody:
    "Book a short call. We will map the 90-day plan from this audit: clear the deposit trust gate against truliv.in first, defend Chennai home turf, open Bengaluru and holiday homes where demand is already routed. You get a dashboard that re-tests this prompt set daily and suggests daily what to do next as the answers move.",
};
