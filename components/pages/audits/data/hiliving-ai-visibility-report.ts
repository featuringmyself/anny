import type { VisibilityReport } from "../types";

const SHOT = "/audits/hiliving";

/** Private outreach report for HiLiving. ChatGPT snapshot, August 2026. */
export const hilivingAiVisibilityReport: VisibilityReport = {
  slug: "hiliving-ai-visibility-report",
  company: "HiLiving",
  website: "hiliving.in",
  industry: "Luxury residential · Chennai",
  preparedFor: "Naman Bagmar",
  role: "Managing Director",
  dateLabel: "August 2026",
  overallScore: 12,
  scoreLabel: "Poor",
  private: true,
  tagline:
    "Crafting premium living spaces that blend modern design, exceptional quality, and timeless elegance across Chennai.",
  summary:
    "HiLiving is known when the buyer already typed the brand. It is missing when the buyer is switching off VGN or G Square, or shopping Avadi plot and Madhavaram apartment shelves. On the eight discovery prompts in this audit, HiLiving appears once: a thin Serenity cite with no badge. Casagrand, Urbanrise, DAC, Radiance, and G Square take those shortlists. Branded diligence is the irony: ask about Nexora and AI cites you, then flags a 154 vs 1,200 vs 1,090 plot conflict and says do not book until phase matches RERA. Ambiguous “Hiliving estates” routes to Bangalore farmland. This ChatGPT snapshot shows how AI currently perceives and recommends HiLiving, and where peer shelves win instead. What follows explains why those gaps exist and turns them into a concrete action plan across ChatGPT, then Perplexity, Google AI Overview, Gemini, and Claude.",
  stats: [
    { label: "Projects", value: "7+" },
    { label: "Sq ft delivered", value: "700,000+" },
    { label: "Families", value: "1,000+" },
    { label: "Years", value: "7+ YOE" },
    { label: "Township", value: "51-acre" },
    { label: "Plots", value: "500+" },
    { label: "Approvals", value: "RERA-approved" },
  ],
  brandCrisisHeadline:
    "Cited on Nexora, then told not to book. Named wrong on Estates.",
  brandCrisisDek:
    "Flagship diligence surfaces a plot-count conflict. Ambiguous brand asks leak to Bangalore farmland, not Chennai HiLiving.",
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "Direct buyer and home-turf asks first (Avadi plots, Madhavaram apartments, RERA and West Chennai shelves), then a thin Serenity cite. Peer alternatives sprinkled mid-list, not stacked at the top. Branded diligence at the end: known on brand, missing on the shortlist that creates the lead.",
  modelScores: [
    { model: "chatgpt", visibility: 12, cited: 1, total: 8, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "G Square", visibility: 62 },
    { name: "Casagrand", visibility: 58 },
    { name: "VGN", visibility: 52 },
    { name: "DAC", visibility: 48 },
    { name: "Urbanrise", visibility: 44 },
    { name: "Radiance", visibility: 40 },
    { name: "DRA", visibility: 36 },
    { name: "HiLiving", visibility: 12 },
  ],
  brandCrisis: [
    {
      id: "crisis-nexora",
      query: "should i invest in hiliving nexora",
      title: "Cited, then told not to book until plot counts match RERA",
      body: "ChatGPT knows Nexora in Avadi/Morai, cites RERA TN/2/Layout/1502/2025, and then flags the conflict: HiLiving’s page says 51 acres and 154 plots, marketing mirrors say 1,200, JLL says 1,090, while the RERA record matches 154. Verdict: do not pay a booking amount until a salesperson proves which RERA-approved phase is for sale. Diligence failure on the flagship.",
      outcome: "Cited + crisis · plot-count conflict",
      screenshot: {
        src: `${SHOT}/09-should-i-invest-hiliving-nexora.png`,
        alt: "ChatGPT flagging Nexora plot-count conflict and advising not to book yet",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-identity",
      query: "Hiliving estates",
      title: "Ambiguous name routes to Bangalore farmland, not Chennai",
      body: "Asked “Hiliving estates,” the model locks onto HiLiving Estates, a Bengaluru-based managed-farmland and estate company in Karnataka (Sakleshpur, Ramanagara, Chikkamagaluru). Chennai residential HiLiving never appears. A buyer checking the name gets the wrong company.",
      outcome: "Identity leak · Bangalore Estates wins",
      screenshot: {
        src: `${SHOT}/11-hiliving-estates-identity.png`,
        alt: "ChatGPT answering “Hiliving estates” as Bangalore farmland company",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "gated community plots Chennai under 50 lakh in avadi",
      intent: "Home turf: Avadi gated/budget plot shelf where Nexora should compete",
      severity: "critical",
      tag: "Home turf",
      citedBrands: [
        "Zenith Serasa Golden Gateway",
        "HVF Estate",
        "V Square Shreyas",
        "Madras City Rainbow Garden",
      ],
      rentokStatus: "missing",
      outcome: "Missing · Zenith, HVF, V Square (Nexora absent on Avadi shelf)",
      screenshot: {
        src: `${SHOT}/06-gated-community-plots-avadi-under-50-lakh.png`,
        alt: "ChatGPT gated community plots Avadi under 50 lakh without HiLiving Nexora",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Zenith, HVF Estate, and V Square Shreyas fill the Avadi under-₹50L gated list. Nexora and HiLiving do not appear.",
          sources: ["Housing"],
        },
      ],
    },
    {
      id: "q2",
      query: "best apartments in Madhavaram for investment",
      intent: "Home turf: Madhavaram apartment investment where Evita should show",
      severity: "critical",
      tag: "Home turf",
      citedBrands: [
        "Radiance Solitaire",
        "Casagrand Aquagrove",
        "Radiance Suprema",
        "Casagrand Northern Star",
      ],
      rentokStatus: "missing",
      outcome: "Missing · Radiance + Casagrand (Evita invisible)",
      screenshot: {
        src: `${SHOT}/07-best-apartments-madhavaram-investment.png`,
        alt: "ChatGPT best apartments Madhavaram for investment without HiLiving Evita",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Radiance Solitaire is #1. Casagrand Aquagrove and other Radiance/Casagrand projects fill the table. Evita is invisible.",
          sources: ["Housing"],
        },
      ],
    },
    {
      id: "q3",
      query: "best RERA approved plot developers Chennai",
      intent: "Category shelf for RERA plotted developers: peer-tier shortlist",
      severity: "high",
      citedBrands: [
        "G Square Housing",
        "DRA Homes",
        "DAC Developers",
        "Sobha",
        "Jones Foundations",
        "Crystal Homes",
      ],
      rentokStatus: "missing",
      outcome: "Missing · G Square leads; DRA, DAC, Crystal fill the list",
      screenshot: {
        src: `${SHOT}/04-best-rera-approved-plot-developers-chennai.png`,
        alt: "ChatGPT best RERA approved plot developers Chennai without HiLiving",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "G Square is framed as the strongest branded plotted option. DRA, DAC, and Crystal follow. HiLiving is not on the RERA plot shelf.",
        },
      ],
    },
    {
      id: "q4",
      query: "VGN alternatives for residential plots Chennai",
      intent: "Peer conquest: buyer already considering VGN for Chennai plots",
      severity: "critical",
      tag: "Peer conquest",
      citedBrands: [
        "Casagrand",
        "Urbanrise",
        "DAC Developers",
        "Sameera Land Developers",
        "Sathiyam Housing",
      ],
      rentokStatus: "missing",
      outcome: "Missing · Casagrand, Urbanrise, DAC own the switcher list",
      screenshot: {
        src: `${SHOT}/01-vgn-alternatives-residential-plots-chennai.png`,
        alt: "ChatGPT VGN alternatives for residential plots Chennai without HiLiving",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Casagrand, Urbanrise, DAC, Sameera, and Sathiyam fill the VGN alternatives table. HiLiving is not named.",
        },
      ],
    },
    {
      id: "q5",
      query: "best plot developers West Chennai",
      intent: "West Chennai plot developer shelf without a brand name",
      severity: "high",
      citedBrands: [
        "DAC Developers",
        "OmShakthy Homes",
        "Sathiyam Housing",
        "Wishaka Developers",
        "T.V. Ganesh Properties",
      ],
      rentokStatus: "missing",
      outcome: "Missing · DAC, OmShakthy, Sathiyam, Wishaka, T.V. Ganesh",
      screenshot: {
        src: `${SHOT}/05-best-plot-developers-west-chennai.png`,
        alt: "ChatGPT best plot developers West Chennai without HiLiving",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "DAC, OmShakthy, Sathiyam, Wishaka, and T.V. Ganesh take West Chennai. HiLiving is missing.",
        },
      ],
    },
    {
      id: "q6",
      query: "2 BHK in Madhavaram under 1 crore for investment",
      intent: "Budget Madhavaram ask: thin HiLiving cite buried without a badge",
      severity: "high",
      tag: "Thin cite",
      citedBrands: [
        "Silversky The Edge",
        "The Peak",
        "Sidharth Crown",
        "Raunaq Liverpool",
        "Radiance Solitaire",
        "Hi Living Serenity",
      ],
      rentokStatus: "cited",
      outcome: "Thin cite · Hi Living Serenity #6, no badge vs Best value",
      screenshot: {
        src: `${SHOT}/08-2bhk-madhavaram-under-1-crore.png`,
        alt: "ChatGPT 2 BHK Madhavaram under 1 crore with Hi Living Serenity at #6",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 6,
          excerpt:
            "Silversky The Edge gets “Best value.” Hi Living Serenity lands at #6 with four stars and no badge. Evita is still absent. One thin cite on eight discovery prompts.",
          sources: ["Housing"],
        },
      ],
    },
    {
      id: "q7",
      query: "G Square Housing alternatives Chennai",
      intent: "Peer conquest: buyer shopping alternatives to G Square Housing",
      severity: "critical",
      tag: "Peer conquest",
      citedBrands: [
        "Casagrand",
        "Thanigai Estates",
        "Wisdom Properties",
        "Myresaleplots.com",
        "Chennai Land Promoters",
      ],
      rentokStatus: "missing",
      outcome: "Missing · Casagrand and locals take the G Square shelf",
      screenshot: {
        src: `${SHOT}/02-g-square-housing-alternatives-chennai.png`,
        alt: "ChatGPT G Square Housing alternatives Chennai without HiLiving",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Casagrand leads as the closest branded alternative. Thanigai, Wisdom, and local promoters follow. HiLiving is absent.",
        },
      ],
    },
    {
      id: "q8",
      query:
        "what are the best alternatives to VGN plotted developments in West Chennai?",
      intent: "West Chennai switcher shortlist: fair peer belt for plotted",
      severity: "critical",
      tag: "Peer conquest",
      citedBrands: [
        "Casagrand Westend",
        "G Square Harmony",
        "G Square Unicorn",
        "Casagrand Uptown",
        "TVS Emerald",
      ],
      rentokStatus: "missing",
      outcome: "Missing · Casagrand + G Square own the West Chennai table",
      screenshot: {
        src: `${SHOT}/03-best-alternatives-vgn-plotted-west-chennai.png`,
        alt: "ChatGPT best alternatives to VGN plotted developments West Chennai without HiLiving",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Casagrand Westend and Uptown plus G Square Harmony and Unicorn dominate the shortlist. HiLiving does not appear.",
        },
      ],
    },
    {
      id: "q9",
      query: "should i invest in hiliving nexora",
      intent: "Branded diligence: known on brand, but citation facts break the close",
      severity: "critical",
      tag: "Diligence irony",
      citedBrands: ["HiLiving Nexora"],
      rentokStatus: "warned",
      outcome: "Cited + crisis · plot-count conflict, do not book",
      screenshot: {
        src: `${SHOT}/09-should-i-invest-hiliving-nexora.png`,
        alt: "ChatGPT Nexora investment answer with plot-count conflict warning",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "AI cites HiLiving and RERA, then flags 154 vs 1,200 vs 1,090 plot conflict and tells the buyer not to book until phase matches RERA.",
          sources: ["HiLiving", "Verified.RealEstate", "Housing"],
        },
      ],
    },
    {
      id: "q10",
      query: "should i invest in hiliving pristine",
      intent: "Branded diligence soft: cited with caution, price scatter, newer-developer frame",
      severity: "standard",
      tag: "Cited soft",
      citedBrands: ["HiLiving Pristine"],
      rentokStatus: "warned",
      outcome: "Cited soft · 6.5/10, price inconsistency",
      screenshot: {
        src: `${SHOT}/10-should-i-invest-hiliving-pristine.png`,
        alt: "ChatGPT Pristine investment take at 6.5/10 with price inconsistency",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "Initial take 6.5/10. RERA and Ambattur location land, but advertised pricing is inconsistent and the builder is framed as relatively new with thin resale history.",
          sources: ["Housing", "Magicbricks", "Reuters"],
        },
      ],
    },
  ],
  sprint: {
    name: "AI Visibility Audit",
    duration: "One-time",
    headline:
      "How AI perceives HiLiving today, where peers win the shelf, why, and what to do about it",
    body: "A analysis of how ChatGPT and other platforms currently perceive and recommend HiLiving. We identify where Casagrand, Urbanrise, DAC, Radiance, and G Square win those shortlists instead, explain why (thin presence, peer-shelf gaps, Nexora plot-count conflict, Estates identity leak), and give you a concrete action plan to improve it.",
    outcomes: [
      "Clear read on how AI perceives and recommends HiLiving today vs peers on the audited prompts",
      "Map of where you lose the VGN/G Square switcher and Avadi/Madhavaram shelves, and why those answers look that way",
      "Root-cause explanation of the Nexora “don’t book” diligence failure and the Estates identity leak",
      "Concrete action plan: peer-shelf presence, geo defense for Nexora and Evita, one canonical Nexora RERA story, and Chennai brand disambiguation",
      "Prioritized next steps across ChatGPT, then Perplexity, Google AI Overview, Gemini, and Claude, with screenshot proof from this audit pack",
    ],
  },
  ctaLabel: "Book the analysis",
  ctaEyebrow: "One-time service",
  ctaHeadline:
    "Ready to see how AI recommends HiLiving: where peers win, why, and what to do about it?",
  ctaBody:
    "Book a one-time AI visibility analysis. We walk how models perceive and recommend you today, where VGN/G Square switchers and Avadi/Madhavaram shelves go to competitors and why, and leave you with a concrete action plan to improve it.",
};
