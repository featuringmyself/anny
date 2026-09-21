import type { VisibilityReport } from "../types";

const SHOT = "/audits/ringg";

/**
 * Private outreach report for Ringg AI. ChatGPT snapshot, September 2026.
 * Sell: 0/10 baseline on peer-relevant India shelves — branded review names
 * Ringg when asked directly, but cart recovery, insurance, Practo/PharmEasy,
 * India calling, KYC, pricing, mid-market support and Skit/Vapi alternatives
 * route to Edesy, Bolna, Sarvam, Tokki, Aarvox, Tapza and peers.
 */
export const ringgAiVisibilityReport: VisibilityReport = {
  slug: "ringg-ai-visibility-report",
  company: "Ringg AI",
  website: "ringg.ai",
  industry: "Enterprise conversational AI / voice agents",
  preparedFor: "",
  dateLabel: "September 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline: "Voice · Chat & WhatsApp · Browser · STT · Evals",
  summary:
    "10 buy-intent prompts tied to Ringg’s real shelves: India calling, Shopify cart recovery, mid-market support, insurance, Practo-style booking, PharmEasy-style pharmacy calling, lead qualification, Hindi STT, pricing and fintech KYC. Cited on 0 of 10. Who appears instead: Edesy, Sarvam AI, Bolna, Tokki, Callsy, Aarvox, Tapza.ai, Kallix, Gnani, Exotel, Vapi and Retell AI — India-native and mid-market peers. One asymmetric win: Ringg AI is named and reviewed on the direct “Ringg AI review” prompt. This is the baseline.",
  brandCrisisHeadline:
    "India buyers shortlist peers — and still miss Ringg",
  brandCrisisDek:
    "When buyers ask for a Vapi/Retell alternative in India, or an insurance voice agent next to PolicyBazaar, the shelf fills with Edesy, Bolna, Sarvam, VoiceBrew and Kallix. Ringg’s branded review is a separate discovery gate.",
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "Buy-intent prompts mapped to ringg.ai use cases and logos — India calling, cart recovery, mid-market support, KYC, pricing, Practo-style appointments, PharmEasy-style pharmacy, Skit alternatives, Hindi STT (Parrot), and lead qualification. Ringg AI is cited on 0 of 10; shortlists are India peers, not Cognigy / Salesforce / Uniphore stacks.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Edesy", visibility: 50 },
    { name: "Sarvam AI", visibility: 40 },
    { name: "Vapi", visibility: 30 },
    { name: "Retell AI", visibility: 30 },
    { name: "Bolna", visibility: 20 },
    { name: "Exotel", visibility: 20 },
    { name: "Gnani", visibility: 20 },
    { name: "Kallix", visibility: 20 },
    { name: "Tokki", visibility: 10 },
    { name: "Aarvox", visibility: 10 },
    { name: "Ringg AI", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-1",
      query: "Ringg AI (ringg.ai) review",
      title: "Ringg AI review",
      body: "Ringg AI is described as an AI voice-agent platform with WhatsApp, chat and web agents, Indian-language support, workflow automation, pricing, customer examples and G2 reviews; the answer recommends testing it against 2–3 competitors.",
      outcome: "Present · named and reviewed",
      screenshot: {
        src: `${SHOT}/crisis-ringg-ai-review.png`,
        alt: "ChatGPT Ringg AI review naming the platform with pricing and product capabilities",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-2",
      query: "Vapi alternative India / Retell AI alternative India",
      title: "India Vapi / Retell alternative shelf",
      body: "The India alternative shortlist names Edesy, Bolna, Sarvam Samvaad, Vistara AI and Vio/Trikon — developer-friendly India-focused voice platforms. Ringg AI is not on the list.",
      outcome: "Absent · Edesy, Bolna and Sarvam named",
      screenshot: {
        src: `${SHOT}/crisis-vapi-retell-alternative-india.png`,
        alt: "ChatGPT India Vapi/Retell alternative shortlist without Ringg AI",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-3",
      query: "best AI voice agent for insurance India or PolicyBazaar AI calling",
      title: "Insurance voice-agent shortlist",
      body: "For outbound insurance calling the shortlist names VoiceBrew, Decibel Labs, Aitel, Edesy and Kallix; PolicyBazaar AI is framed as customer guidance, not outbound calling. No Ringg AI — despite PolicyBazaar being a Ringg case study.",
      outcome: "Absent · VoiceBrew, Edesy and Kallix named",
      screenshot: {
        src: `${SHOT}/crisis-best-ai-voice-agent-insurance-india.png`,
        alt: "ChatGPT India insurance voice-agent shortlist without Ringg AI",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query:
        "AI voice agent for abandoned cart recovery / Shopify cart recovery AI calling",
      intent:
        "Own claim theft: homepage ecommerce cart-recovery use case with Shopify",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["Callsy", "Tokki", "Telenow"],
      rentokStatus: "missing",
      outcome: "Absent · Callsy, Tokki and Telenow named",
      screenshot: {
        src: `${SHOT}/01-ai-voice-agent-abandoned-cart-shopify.png`,
        alt: "ChatGPT Shopify cart-recovery voice-agent shortlist without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Existing options name Callsy (Shopify abandoned-checkout calls), Tokki (Indian D2C Shopify, Hindi/multilingual), and Telenow’s open-source Shopify connector; Shopify native automation stays email-based. No Ringg AI.",
        },
      ],
    },
    {
      id: "q2",
      query: "best AI calling platform India",
      intent: "Home turf: India AI-calling demand on Ringg’s core market",
      severity: "critical",
      tag: "Home Turf",
      citedBrands: [
        "Sarvam AI",
        "Bolna",
        "Exotel",
        "Vapi",
        "Retell AI",
        "Gnani",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Sarvam AI, Bolna and Exotel named",
      screenshot: {
        src: `${SHOT}/02-best-ai-calling-platform-india.png`,
        alt: "ChatGPT India AI-calling shortlist without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The India comparison names Sarvam AI, Bolna, Exotel, Vapi, Retell AI and Gnani for calling and Indic languages; no Ringg AI.",
        },
      ],
    },
    {
      id: "q3",
      query: "best AI voice agent for customer support India mid-market",
      intent:
        "Competitor conquest: mid-market India support shelf (Ringg Support tab)",
      severity: "critical",
      tag: "Competitor Conquest",
      citedBrands: ["Sarvam AI", "Exotel", "Gnani.ai"],
      rentokStatus: "missing",
      outcome: "Absent · Sarvam AI, Exotel and Gnani named",
      screenshot: {
        src: `${SHOT}/03-ai-voice-agent-customer-support-india-midmarket.png`,
        alt: "ChatGPT India mid-market support voice-agent shortlist without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The mid-market India shortlist leads with Sarvam AI for Indic-language support, Exotel for telephony + escalation, and Gnani.ai for support automation; no Ringg AI.",
        },
      ],
    },
    {
      id: "q4",
      query: "best AI agent for fintech KYC calls",
      intent:
        "Customer proof erasure: BFSI KYC / onboarding — a homepage Activate use case",
      severity: "critical",
      tag: "Customer Proof Erasure",
      citedBrands: ["Exotel", "Sarvam AI", "Edesy", "Vapi", "Retell AI"],
      rentokStatus: "missing",
      outcome: "Absent · Exotel, Sarvam AI and Edesy named",
      screenshot: {
        src: `${SHOT}/10-best-ai-agent-fintech-kyc-calls.png`,
        alt: "ChatGPT fintech KYC voice-agent shortlist without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The India fintech KYC shortlist names Exotel, Sarvam AI, Edesy, Vapi and Retell AI; no Ringg AI.",
        },
      ],
    },
    {
      id: "q5",
      query: "AI voice agent pricing per minute",
      intent:
        "Commercial RFP: per-minute pricing against the platforms buyers compare",
      severity: "critical",
      tag: "Commercial RFP",
      citedBrands: ["Vapi", "Retell", "Bland", "Synthflow"],
      rentokStatus: "missing",
      outcome: "Absent · Vapi, Retell, Bland and Synthflow named",
      screenshot: {
        src: `${SHOT}/09-ai-voice-agent-pricing-per-minute.png`,
        alt: "ChatGPT voice-agent pricing comparison without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The pricing comparison gives figures for Vapi, Retell, Bland and Synthflow and cites India-focused providers around ₹5/min; no Ringg AI (ringg.ai lists ₹6/connected minute).",
        },
      ],
    },
    {
      id: "q6",
      query:
        "companies offering AI voice agent for Practo-style appointment booking",
      intent:
        "Customer proof erasure: Practo-adjacent healthcare booking — a homepage use case",
      severity: "critical",
      tag: "Customer Proof Erasure",
      citedBrands: [
        "Aarvox",
        "Vistara AI",
        "Voxerra",
        "Voxyno / Siya",
        "CellAssist",
        "Zyphra Labs",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Aarvox, Vistara AI and Voxerra named",
      screenshot: {
        src: `${SHOT}/06-ai-voice-agent-practo-appointment-booking.png`,
        alt: "ChatGPT Practo-style appointment booking shortlist without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "India-focused options name Aarvox, Vistara AI (claims Practo connectivity), Voxerra, Voxyno/Siya, CellAssist and Zyphra Labs for clinic/hospital voice booking; no Ringg AI.",
        },
      ],
    },
    {
      id: "q7",
      query: "companies offering AI calling for PharmEasy like business",
      intent:
        "Customer proof erasure: PharmEasy-adjacent pharmacy calling — a Ringg case-study shelf",
      severity: "critical",
      tag: "Customer Proof Erasure",
      citedBrands: [
        "Tapza.ai",
        "Kallix",
        "Nuvox",
        "Edesy",
        "Aarvox",
        "Pragati India Health",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Tapza.ai, Kallix and Edesy named",
      screenshot: {
        src: `${SHOT}/08-ai-calling-pharmeasy-like-business.png`,
        alt: "ChatGPT PharmEasy-like pharmacy calling shortlist without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "India-focused options name Tapza.ai, Kallix, Nuvox and Edesy for pharmacy/refill reminders and patient outreach; no Ringg AI — despite PharmEasy being a Ringg case study.",
        },
      ],
    },
    {
      id: "q8",
      query: "Skit.ai alternative voice agent",
      intent:
        "Competitor conquest: buyers already evaluating an India voice-automation peer",
      severity: "high",
      tag: "Competitor Conquest",
      citedBrands: [
        "Retell AI",
        "Vapi",
        "Bland AI",
        "Synthflow",
        "SquadStack",
        "Edesy",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Retell, Vapi, SquadStack and Edesy named",
      screenshot: {
        src: `${SHOT}/crisis-skit-ai-alternative-voice-agent.png`,
        alt: "ChatGPT Skit.ai alternative shortlist without Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Alternatives name Retell AI, Vapi, Bland AI, Synthflow, SquadStack (India sales/outbound) and Edesy (Indian-language calling, INR billing); no Ringg AI.",
        },
      ],
    },
    {
      id: "q9",
      query: "best AI speech to text API for Hindi",
      intent:
        "Own claim theft: Parrot STT / Hindi transcription shelf vs India peers",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: ["Sarvam AI"],
      rentokStatus: "missing",
      outcome: "Absent · Sarvam AI named",
      screenshot: {
        src: `${SHOT}/08-best-ai-speech-to-text-hindi.png`,
        alt: "ChatGPT Hindi STT API shortlist naming Sarvam not Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The Hindi STT shortlist leads with Sarvam AI (Saaras) as the place to start testing for Hindi/Hinglish; Ringg’s Parrot STT is not named.",
        },
      ],
    },
    {
      id: "q10",
      query: "AI calling for lead qualification",
      intent:
        "Own claim theft: homepage discovery / lead-qualification use case (ed-tech)",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Absent · no platform shortlist",
      screenshot: {
        src: `${SHOT}/04-ai-calling-lead-qualification.png`,
        alt: "ChatGPT lead-qualification calling workflow with no Ringg AI",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The answer describes an AI lead-qualification calling workflow and CRM routing without naming a voice-agent platform; no Ringg AI.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "From this 0/10 baseline to cited on the enrolment prompts named below",
    body: "We work the peer-relevant buy-intent set in this audit — Vapi/Retell and Skit alternatives, insurance and PolicyBazaar, Practo/PharmEasy shelves, Shopify cart recovery, India calling, mid-market support, KYC, pricing, and Parrot STT — while protecting the branded review citation already won. Weekly re-tests on ChatGPT first, then Perplexity, Google AI Overview, Gemini, and Claude. You get screenshot proof and a dashboard.",
    outcomes: [
      "Get named on Vapi/Retell/Skit-alternative and India calling prompts that today list Edesy, Bolna, Sarvam AI, SquadStack, Exotel and Gnani",
      "Get named on insurance, Practo and PharmEasy prompts that today list VoiceBrew, Kallix, Aarvox, Vistara AI, Tapza.ai and Edesy",
      "Get named on cart-recovery, mid-market support and Hindi STT prompts that today list Callsy, Tokki, Sarvam AI, Exotel and Gnani",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get Ringg AI on those shortlists?",
  ctaBody:
    "Book a short call. We map the 90-day plan from this audit: India alternatives, insurance, Practo/PharmEasy, cart recovery, support, KYC and Parrot STT — against peers like Edesy, Bolna, Tokki, Aarvox and Sarvam — plus the branded review already won, with weekly screenshot proof and a dashboard.",
};
