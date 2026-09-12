import type { VisibilityReport } from "../types";

const SHOT = "/audits/redacto";

/**
 * Private outreach report for Redacto. ChatGPT snapshot, September 2026.
 * Sell: 3/10 baseline with one DPIA shortlist win, Consent, DSAR, bank/fintech,
 * and India-first DPDPA shelves still route to Privy, OneTrust, Securiti.
 */
export const redactoAiVisibilityReport: VisibilityReport = {
  slug: "redacto-ai-visibility-report",
  company: "Redacto",
  website: "redacto.ai",
  industry: "Enterprise privacy & DPDPA compliance",
  preparedFor: "",
  dateLabel: "September 2026",
  overallScore: 30,
  scoreLabel: "Weak",
  private: true,
  tagline: "Consent · DSAR · DPIA/PIA · Vendor risk · Data governance · Audit",
  summary:
    "10 buy-intent prompts tied to Consent management · DSAR automation · DPIA/PIA · Vendor risk · Data governance · Audit & reporting. Cited on 3 of 10. Who appears instead: OneTrust, Securiti, Privy by IDfy, BigID, Consentin by Leegality, Neostra, Scrut and others. One asymmetric win: DPIA automation, where Redacto is ranked fourth for India and included in the practical shortlist. This is the baseline.",
  brandCrisisHeadline:
    "AI trust gates and privacy-software shelves can route enterprise buyers elsewhere",
  brandCrisisDek:
    "Privacy and compliance buyers are likely to encounter established global platforms first on generic evaluation queries, while brand-specific trust queries create a separate credibility gate.",
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "Buy-intent prompts for Consent, DSAR, DPIA, vendor risk, bank/fintech privacy, India-first DPDPA, healthcare, audits, and pricing. Redacto is cited on 3 of 10, strongest on DPIA and healthcare; absent on most Consent, DSAR, bank, fintech, and India-first shelves.",
  modelScores: [
    { model: "chatgpt", visibility: 30, cited: 3, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "OneTrust", visibility: 80 },
    { name: "Securiti", visibility: 70 },
    { name: "Privy by IDfy", visibility: 60 },
    { name: "BigID", visibility: 30 },
    { name: "Redacto", visibility: 30 },
    { name: "Consentin by Leegality", visibility: 20 },
    { name: "Consiva.ai", visibility: 20 },
  ],
  brandCrisis: [
    {
      id: "crisis-1",
      query: "redacto review",
      title: "Brand identity ambiguity",
      body: "Redacto.ai is described as an AI-powered privacy/compliance platform, while another Redacto is identified as a Mac document-redaction app; ChatGPT asks which Redacto the user means before giving a review.",
      outcome: "Nuanced · named with product confusion",
      screenshot: {
        src: `${SHOT}/crisis-redacto-review.png`,
        alt: "ChatGPT answering “redacto review” with Redacto.ai vs Mac redaction-app confusion",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-2",
      query: "best DPDPA compliance platform in India",
      title: "DPDPA platform shortlist",
      body: "The 2026 India shortlist names Privy by IDfy, OneTrust, Securiti AI, Seqrite Data Privacy, Scrut, Consentin by Leegality and CookieYes; recommendations go to Privy by IDfy, OneTrust, Securiti AI and Scrut.",
      outcome: "Absent · Privy by IDfy named",
      screenshot: {
        src: `${SHOT}/crisis-best-dpdpa-compliance-platform-india.png`,
        alt: "ChatGPT DPDPA compliance platform India shortlist without Redacto",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-3",
      query: "best privacy management platform for Indian enterprises",
      title: "Enterprise privacy shortlist",
      body: "The shortlist includes Redacto / ComplyIQ as worth including in an Indian RFP, but the recommended starting set is OneTrust, Securiti and an India-first platform such as Seqrite Data Privacy or Privy.",
      outcome: "Nuanced · mentioned but outside top recommendation",
      screenshot: {
        src: `${SHOT}/crisis-best-privacy-management-indian-enterprises.png`,
        alt: "ChatGPT Indian enterprise privacy shortlist mentioning Redacto outside the top set",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best consent management platform for DPDPA",
      intent:
        "Category shelf: first CMP shortlist buyers build for DPDPA consent management",
      severity: "critical",
      tag: "Competitor Conquest",
      citedBrands: [
        "OneTrust",
        "Securiti",
        "Privy by IDfy",
        "Consentin by Leegality",
        "GoTrust",
        "CookieYes",
        "Transcend",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Privy by IDfy named",
      screenshot: {
        src: `${SHOT}/01-best-consent-management-platform-dpdpa.png`,
        alt: "ChatGPT DPDPA consent-management shortlist without Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The 2026 CMP shortlist names OneTrust, Securiti, Privy by IDfy, Consentin by Leegality, GoTrust, CookieYes and Transcend; large Indian enterprises are directed to evaluate Privy by IDfy or Consentin alongside OneTrust.",
        },
      ],
    },
    {
      id: "q2",
      query: "best DSAR automation software India",
      intent:
        "DSAR automation shelf, who gets the top-three evaluation for Indian buyers",
      severity: "critical",
      tag: "Competitor Conquest",
      citedBrands: [
        "Neostra",
        "Privy by IDfy",
        "Consentin by Leegality",
        "Jerisaliant",
        "Scrut Automation",
        "OneTrust",
        "Securiti",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Neostra named",
      screenshot: {
        src: `${SHOT}/02-best-dsar-automation-software-india.png`,
        alt: "ChatGPT DSAR automation India shortlist without Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The DSAR shortlist names Neostra, Privy by IDfy, Consentin by Leegality, Jerisaliant, Scrut Automation, OneTrust and Securiti; the top three are Neostra, Privy by IDfy and Consentin by Leegality.",
        },
      ],
    },
    {
      id: "q3",
      query: "best DPIA automation software",
      intent:
        "Own-claim defense: DPIA automation where Redacto already ranks for India/DPDP",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: [
        "OneTrust",
        "TrustArc",
        "Securiti",
        "BigID",
        "MineOS",
        "Privado AI",
        "Redacto",
      ],
      rentokStatus: "cited",
      outcome: "Present · named in shortlist",
      screenshot: {
        src: `${SHOT}/03-best-dpia-automation-software.png`,
        alt: "ChatGPT DPIA automation shortlist ranking Redacto fourth for India",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 4,
          excerpt:
            "The DPIA shortlist ranks OneTrust first overall, TrustArc second, Securiti third, Redacto fourth for India, BigID fifth, with MineOS and Privado AI also listed; the practical shortlist includes Redacto for India/DPDP.",
        },
      ],
    },
    {
      id: "q4",
      query: "best vendor risk management software India",
      intent:
        "Vendor governance shelf, India-focused privacy workflows vs global GRC shortlists",
      severity: "high",
      tag: "Competitor Conquest",
      citedBrands: [
        "OneTrust",
        "MetricStream",
        "ServiceNow",
        "UpGuard",
        "Vanta",
        "LogicGate",
        "SecurityScorecard",
      ],
      rentokStatus: "cited",
      outcome: "Nuanced · named as India-focused option",
      screenshot: {
        src: `${SHOT}/04-best-vendor-risk-management-software-india.png`,
        alt: "ChatGPT vendor risk India naming Redacto as India-focused option outside main RFP five",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          excerpt:
            "Redacto / Indian-focused platforms, DPDPA-focused vendor governance, ★★★★★; worth evaluating if India-specific privacy workflows are central. The RFP shortlist instead names OneTrust, MetricStream, ServiceNow, UpGuard and Vanta.",
        },
      ],
    },
    {
      id: "q5",
      query: "best data privacy software for banks in India",
      intent:
        "Home-turf ICP: Indian bank privacy stack and procurement shortlist",
      severity: "critical",
      tag: "Home Turf",
      citedBrands: [
        "Securiti",
        "OneTrust",
        "IBM Guardium",
        "Microsoft Purview",
        "BigID",
        "Privy by IDfy",
        "Perfios DPDP Suite",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Securiti, OneTrust and Privy named",
      screenshot: {
        src: `${SHOT}/05-best-data-privacy-software-banks-india.png`,
        alt: "ChatGPT Indian bank privacy software shortlist without Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The shortlist names Securiti, OneTrust, IBM Guardium, Microsoft Purview, BigID and Privy by IDfy; the architecture uses Securiti / OneTrust / Privy for privacy management. No redacto.",
        },
      ],
    },
    {
      id: "q6",
      query: "best DPDPA software for fintechs",
      intent: "Home-turf ICP: Indian fintech DPDPA POC shortlist",
      severity: "critical",
      tag: "Home Turf",
      citedBrands: [
        "Privy by IDfy",
        "Securiti",
        "OneTrust",
        "Consentica / OpenBlockAI",
        "Scrut / Sprinto",
        "CATAAM",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Privy by IDfy named",
      screenshot: {
        src: `${SHOT}/06-best-dpdpa-software-fintechs.png`,
        alt: "ChatGPT fintech DPDPA software shortlist without Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Privy by IDfy is the recommended starting point for a typical Indian fintech; the POC is Privy + Securiti + OneTrust. No redacto.",
        },
      ],
    },
    {
      id: "q7",
      query: "India-first DPDPA compliance software",
      intent:
        "Own-claim defense: India-first DPDP positioning vs emerging local platforms",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: [
        "Privy by IDfy",
        "Consiva.ai",
        "KavachOne Privacy Suite",
        "Consentin",
        "Patronus",
        "DPDP.ai",
        "EasyDP",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Privy by IDfy and other India-first platforms named",
      screenshot: {
        src: `${SHOT}/07-india-first-dpdpa-compliance-software.png`,
        alt: "ChatGPT India-first DPDPA compliance software without Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Strong India-first options include Privy by IDfy, Consiva.ai, KavachOne Privacy Suite, Consentin, Patronus, DPDP.ai and EasyDP. The proposed positioning is India's operating system for DPDP compliance. No redacto.",
        },
      ],
    },
    {
      id: "q8",
      query: "privacy compliance software for Indian healthcare",
      intent:
        "Customer-proof lane: healthcare privacy automation where Redacto is already named",
      severity: "high",
      tag: "Customer Proof Erasure",
      citedBrands: [
        "DPDP Guard",
        "Sammati",
        "DPDP.ai",
        "dcomply",
        "OneTrust",
        "Securiti",
        "BigID",
      ],
      rentokStatus: "cited",
      outcome: "Present · named in healthcare shortlist",
      screenshot: {
        src: `${SHOT}/08-privacy-compliance-software-indian-healthcare.png`,
        alt: "ChatGPT Indian healthcare privacy shortlist including Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          excerpt:
            "Redacto, healthcare companies wanting broader privacy automation; consent, DPIA, vendor risk and data discovery; specifically positioned for Indian healthcare. Mid-sized hospital / health-tech: Sammati or Redacto.",
        },
      ],
    },
    {
      id: "q9",
      query: "best privacy platform for DPDPA audits",
      intent:
        "Audit-readiness shelf, three-vendor shortlist for Indian DPDPA preparation",
      severity: "high",
      tag: "Competitor Conquest",
      citedBrands: ["OneTrust", "Privy by IDfy", "Securiti"],
      rentokStatus: "missing",
      outcome: "Absent · Privy by IDfy, OneTrust and Securiti named",
      screenshot: {
        src: `${SHOT}/09-best-privacy-platform-dpdpa-audits.png`,
        alt: "ChatGPT DPDPA audit platform shortlist without Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The three-vendor shortlist is OneTrust, Privy by IDfy and Securiti. Privy by IDfy is the recommended starting point for an Indian company preparing for DPDPA audits. No redacto.",
        },
      ],
    },
    {
      id: "q10",
      query: "DPDPA privacy platform pricing India",
      intent:
        "Commercial RFP: pricing and vendor-evaluation shortlist for DPDPA platforms",
      severity: "high",
      tag: "Commercial RFP",
      citedBrands: [
        "ComplyZero",
        "Consently",
        "Consiva.ai",
        "dcomply",
        "ConsentOS",
        "Data Adhikaar",
        "ComplyDP",
        "Ketch",
      ],
      rentokStatus: "missing",
      outcome: "Absent · ComplyZero and Consently named",
      screenshot: {
        src: `${SHOT}/10-dpdpa-privacy-platform-pricing-india.png`,
        alt: "ChatGPT DPDPA privacy platform pricing India without Redacto",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Listed DPDPA/DPDP pricing includes ComplyZero at ₹499–₹3,999/month, Consently at ₹25k–₹1.2L/year, dcomply at ₹9,999–₹14,999/month, Data Adhikaar at ₹15k–₹5L+/month, and Ketch at $150–$499/month; redacto is not listed.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "From this 3/10 baseline to cited on the enrolment prompts named below",
    body: "We work the buy-intent set in this audit, DPDPA consent, DSAR automation, bank and fintech privacy, India-first DPDPA, audit readiness, and pricing, while protecting the DPIA and healthcare citations already won. Weekly re-tests on ChatGPT first, then Perplexity, Google AI Overview, Gemini, and Claude. You get screenshot proof and a dashboard.",
    outcomes: [
      "Get named on DPDPA consent-management prompts that today list OneTrust, Securiti, Privy by IDfy and Consentin by Leegality",
      "Get named on DSAR automation prompts that today list Neostra, Privy by IDfy and Consentin by Leegality",
      "Get named on Indian bank and fintech privacy prompts that today list Securiti, OneTrust and Privy by IDfy",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get Redacto on those shortlists?",
  ctaBody:
    "Book a short call. We map the 90-day plan from this audit: Consent, DSAR, bank/fintech, and India-first DPDPA shelves, plus the brand-identity confusion on “redacto review”, with weekly screenshot proof and a dashboard.",
};
