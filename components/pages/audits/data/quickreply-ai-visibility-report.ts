import type { VisibilityReport } from "../types";

const SHOT = "/audits/quickreply";

/**
 * Private outreach report for QuickReply.ai. ChatGPT snapshot, September 2026.
 * Sell: 0/10 baseline — branded review is an 8.5/10 win when named, but every
 * buy-intent shelf (ecommerce, cart recovery, D2C, Shopify, GenAI, agency)
 * routes to Interakt, AiSensy, WATI and peers.
 */
export const quickreplyAiVisibilityReport: VisibilityReport = {
  slug: "quickreply-ai-visibility-report",
  company: "QuickReply.ai",
  website: "quickreply.ai",
  industry: "WhatsApp automation & conversational commerce",
  preparedFor: "",
  dateLabel: "September 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "WhatsApp automation · GenAI chatbots · ecommerce recovery · campaigns · CRM/inbox · omnichannel · agency white-label",
  summary:
    "10 buy-intent prompts tied to WhatsApp automation · GenAI chatbots · ecommerce recovery · campaigns · CRM/inbox · omnichannel messaging · agency white-label. Cited on 0 of 10. Who appears instead: Interakt and AiSensy lead the shortlist, with WATI, Zoko, Gupshup, Gallabox, BIK, Respond.io, RichAutomate, NextAiBot, Convo360 and 360dialog also appearing. One asymmetric win: QuickReply.ai is named in the “QuickReply.ai review” prompt as a strong 8.5/10 option for WhatsApp commerce, Shopify, chatbots, support and D2C/ecommerce. This is the baseline.",
  brandCrisisHeadline:
    "AI buyers are shortlisting rival WhatsApp platforms before QuickReply.ai",
  brandCrisisDek:
    "Buyers evaluating WhatsApp automation are being routed toward better-known platforms, while QuickReply.ai appears mainly when explicitly named.",
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "Buy-intent prompts for ecommerce chatbots, cart recovery, D2C marketing, small-business CRM, GenAI agents, Shopify, lead generation, India D2C automation, agency resellers, and Shopify API. QuickReply.ai is cited on 0 of 10; Interakt, AiSensy and WATI dominate the shelves.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "AiSensy", visibility: 100 },
    { name: "Interakt", visibility: 90 },
    { name: "WATI", visibility: 90 },
    { name: "Gallabox", visibility: 40 },
    { name: "Gupshup", visibility: 40 },
    { name: "Zoko", visibility: 40 },
    { name: "BIK", visibility: 20 },
    { name: "QuickReply.ai", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-1",
      query: "QuickReply.ai review",
      title: "WhatsApp commerce review",
      body: "QuickReply.ai is rated 8.5/10 for WhatsApp commerce; described as strong for WhatsApp automation, Shopify, chatbots, support, and D2C/e-commerce, with pricing and setup caveats.",
      outcome: "Present · named in review",
      screenshot: {
        src: `${SHOT}/crisis-quickreply-review.png`,
        alt: "ChatGPT QuickReply.ai review scored 8.5/10 for WhatsApp commerce",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-2",
      query: "best WhatsApp API provider for ecommerce",
      title: "Ecommerce API shortlist",
      body: "Interakt is the pick for e-commerce; WATI for no-code automation and team inboxes; Gupshup for larger operations; AiSensy for campaigns; Twilio for API flexibility. No QuickReply.ai.",
      outcome: "Absent · Interakt named",
      screenshot: {
        src: `${SHOT}/crisis-best-whatsapp-api-provider-ecommerce.png`,
        alt: "ChatGPT ecommerce WhatsApp API shortlist without QuickReply.ai",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-3",
      query: "best WhatsApp automation platform in India",
      title: "India automation shortlist",
      body: "AiSensy is the pick for typical Indian WhatsApp lead generation and automation; Interakt for Shopify/D2C; WATI for sales/support teams. No QuickReply.ai.",
      outcome: "Absent · AiSensy named",
      screenshot: {
        src: `${SHOT}/crisis-best-whatsapp-automation-platform-india.png`,
        alt: "ChatGPT India WhatsApp automation shortlist without QuickReply.ai",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best WhatsApp chatbot for ecommerce",
      intent:
        "Category shelf: first ecommerce WhatsApp chatbot shortlist buyers build",
      severity: "critical",
      tag: "Category",
      citedBrands: ["Interakt", "WATI", "AiSensy", "Gallabox", "WatEase"],
      rentokStatus: "missing",
      outcome: "Absent · Interakt named",
      screenshot: {
        src: `${SHOT}/01-best-whatsapp-chatbot-ecommerce.png`,
        alt: "ChatGPT ecommerce WhatsApp chatbot shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Interakt is best overall for Indian e-commerce; WATI for larger support/sales teams; AiSensy for broadcasts; Gallabox for budget automation; WatEase for UPI and GST workflows. No QuickReply.ai.",
        },
      ],
    },
    {
      id: "q2",
      query: "best WhatsApp cart recovery tool",
      intent:
        "Own claim theft: cart-recovery buying intent that should map to QuickReply ecommerce recovery",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["Zoko", "Interakt", "WATI", "AiSensy", "CK"],
      rentokStatus: "missing",
      outcome: "Absent · Zoko named",
      screenshot: {
        src: `${SHOT}/02-best-whatsapp-cart-recovery.png`,
        alt: "ChatGPT WhatsApp cart recovery shortlist naming Zoko not QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Zoko is best overall for Shopify cart recovery; Interakt is the India-focused option; WATI is strong and general-purpose; AiSensy suits broadcasts; CK is best for only cart recovery.",
        },
      ],
    },
    {
      id: "q3",
      query: "best WhatsApp marketing platform for D2C",
      intent:
        "Customer proof erasure: D2C marketing shelf where QuickReply should appear for commerce brands",
      severity: "high",
      tag: "Customer Proof Erasure",
      citedBrands: ["Interakt", "WATI", "AiSensy", "Gallabox", "Zoko"],
      rentokStatus: "missing",
      outcome: "Absent · Interakt named",
      screenshot: {
        src: `${SHOT}/03-best-whatsapp-marketing-d2c.png`,
        alt: "ChatGPT D2C WhatsApp marketing shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Interakt is best overall for D2C; WATI for larger teams and support automation; AiSensy for broadcast-heavy brands; Gallabox for SMB automation; Zoko for WhatsApp-first Shopify commerce.",
        },
      ],
    },
    {
      id: "q4",
      query: "best WhatsApp CRM for small business",
      intent:
        "Competitor conquest: small-business CRM/inbox shelf owned by AiSensy today",
      severity: "high",
      tag: "Competitor Conquest",
      citedBrands: ["AiSensy", "Interakt", "WATI"],
      rentokStatus: "missing",
      outcome: "Absent · AiSensy named",
      screenshot: {
        src: `${SHOT}/04-best-whatsapp-crm-small-business.png`,
        alt: "ChatGPT small-business WhatsApp CRM shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "AiSensy is recommended for most small businesses; WATI for sophisticated sales/support automation; Interakt for Shopify/D2C/e-commerce. No QuickReply.ai.",
        },
      ],
    },
    {
      id: "q5",
      query: "best GenAI chatbot for WhatsApp",
      intent:
        "Own claim theft: GenAI chatbot shelf that should surface QuickReply GenAI agents",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: ["Respond.io", "WATI", "Interakt", "AiSensy", "Gupshup"],
      rentokStatus: "missing",
      outcome: "Absent · Respond.io named",
      screenshot: {
        src: `${SHOT}/05-best-genai-chatbot-whatsapp.png`,
        alt: "ChatGPT GenAI WhatsApp chatbot shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Respond.io is the GenAI agent pick; WATI suits WhatsApp sales/support teams; Interakt suits Indian D2C/e-commerce; AiSensy suits campaigns; Gupshup suits custom AI/API builds.",
        },
      ],
    },
    {
      id: "q6",
      query: "best WhatsApp platform for Shopify",
      intent:
        "Competitor conquest: Shopify platform shelf dominated by Interakt and BIK",
      severity: "critical",
      tag: "Competitor Conquest",
      citedBrands: ["Interakt", "BIK", "AiSensy", "WATI", "Gallabox"],
      rentokStatus: "missing",
      outcome: "Absent · Interakt named",
      screenshot: {
        src: `${SHOT}/06-best-whatsapp-platform-shopify.png`,
        alt: "ChatGPT Shopify WhatsApp platform shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Interakt is best overall for Shopify; BIK is best for scaling and advanced Shopify marketing; AiSensy for broadcasts; WATI for support; Gallabox as a budget option.",
        },
      ],
    },
    {
      id: "q7",
      query: "best WhatsApp chatbot for lead generation",
      intent:
        "Customer proof erasure: lead-gen shelf where campaigns and chatbots should cite QuickReply",
      severity: "high",
      tag: "Customer Proof Erasure",
      citedBrands: ["AiSensy", "WATI", "Interakt", "RichAutomate", "Gupshup"],
      rentokStatus: "missing",
      outcome: "Absent · AiSensy named",
      screenshot: {
        src: `${SHOT}/07-best-whatsapp-chatbot-lead-generation.png`,
        alt: "ChatGPT WhatsApp lead-generation shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "AiSensy is the lead-generation pick; WATI for scaling sales teams; Interakt for e-commerce leads; RichAutomate for low-cost automation; Gupshup for enterprise/custom development.",
        },
      ],
    },
    {
      id: "q8",
      query: "WhatsApp automation for D2C brands India",
      intent:
        "Home turf: Indian D2C WhatsApp automation demand on QuickReply’s core market",
      severity: "critical",
      tag: "Home Turf",
      citedBrands: [
        "Interakt",
        "WATI",
        "AiSensy",
        "Zoko",
        "Gallabox",
        "Gupshup",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Interakt named",
      screenshot: {
        src: `${SHOT}/08-whatsapp-automation-d2c-brands-india.png`,
        alt: "ChatGPT Indian D2C WhatsApp automation shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Interakt is shortlisted for Shopify-first D2C; WATI for sophisticated automation and support; AiSensy for broadcasts; Zoko for Shopify commerce; Gallabox for smaller teams; Gupshup for technical teams.",
        },
      ],
    },
    {
      id: "q9",
      query: "best WhatsApp reseller platform for agencies",
      intent:
        "Commercial RFP: agency white-label / reseller shortlist",
      severity: "high",
      tag: "Commercial RFP",
      citedBrands: [
        "RichAutomate",
        "AiSensy",
        "NextAiBot",
        "Convo360",
        "Gupshup",
        "360dialog",
      ],
      rentokStatus: "missing",
      outcome: "Absent · RichAutomate named",
      screenshot: {
        src: `${SHOT}/09-best-whatsapp-reseller-agencies.png`,
        alt: "ChatGPT agency WhatsApp reseller shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "RichAutomate is the agency pick; NextAiBot suits polished white-label SaaS; Convo360 suits AI automation; Gupshup and 360dialog suit API-heavy agency models.",
        },
      ],
    },
    {
      id: "q10",
      query: "best WhatsApp API for Shopify stores",
      intent:
        "Commercial RFP: Shopify WhatsApp API vendor evaluation shortlist",
      severity: "high",
      tag: "Commercial RFP",
      citedBrands: ["Interakt", "Zoko", "WATI", "AiSensy", "BIK"],
      rentokStatus: "missing",
      outcome: "Absent · Interakt named",
      screenshot: {
        src: `${SHOT}/10-best-whatsapp-api-shopify.png`,
        alt: "ChatGPT Shopify WhatsApp API shortlist without QuickReply.ai",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Interakt is the Shopify API pick; Zoko is for WhatsApp-first commerce; WATI for support and larger teams; AiSensy for broadcasts; BIK for sophisticated D2C marketing.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "From this 0/10 baseline to cited on the enrolment prompts named below",
    body: "We work the buy-intent set in this audit — ecommerce chatbots and APIs, cart recovery, D2C and Shopify shelves, GenAI agents, lead generation, and agency white-label — while protecting the branded review citation already won. Weekly re-tests on ChatGPT first, then Perplexity, Google AI Overview, Gemini, and Claude. You get screenshot proof and a dashboard.",
    outcomes: [
      "Get named on ecommerce chatbot and API prompts that today list Interakt, WATI, AiSensy, Gallabox, WatEase, Zoko, CK, BIK and Twilio",
      "Get named on D2C, Shopify and lead-generation prompts that today list Interakt, AiSensy, WATI, Zoko, Gallabox, BIK, RichAutomate and Gupshup",
      "Get named on GenAI chatbot and agency reseller prompts that today list Respond.io, WATI, Interakt, AiSensy, Gupshup, RichAutomate, NextAiBot, Convo360 and 360dialog",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get QuickReply.ai on those shortlists?",
  ctaBody:
    "Book a short call. We map the 90-day plan from this audit: ecommerce chatbot and API, cart recovery, D2C/Shopify, GenAI, lead generation, and agency reseller shelves, plus the branded review already won, with weekly screenshot proof and a dashboard.",
};
