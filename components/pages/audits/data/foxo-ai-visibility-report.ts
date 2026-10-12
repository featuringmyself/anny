import { AUDIT_OFFER_NAME } from "../offer/content";
import type { VisibilityReport } from "../types";
import {
  AUDIT_FIX_PRICING,
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_TURNAROUND,
} from "@/lib/audit-fix-pricing";

const SHOT = "/audits/foxo";

/**
 * Private outreach baseline for Foxo (foxo.club). ChatGPT snapshot, October 2026.
 * Sell: this 0/10 snapshot is the door; the full AI Visibility Intelligence
 * Report (/audit) is the product. Not a services sprint CTA.
 */
export const foxoAiVisibilityReport: VisibilityReport = {
  slug: "foxo-ai-visibility-report",
  company: "Foxo",
  website: "foxo.club",
  industry: "Premium preventive health and longevity optimization",
  preparedFor: "Subhendu Panigrahi",
  role: "CEO, FOXO",
  email: "subhendu@foxo.club",
  dateLabel: "October 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "Personalized longevity membership · biomarker assessment · lifestyle & recovery optimization",
  summary:
    "Cited on 0 of 10 buy-intent prompts. Visibility score: 0 (Critical). TLC, Prajeeva, Apollo, Biopeak and peers own the shortlists. Foxo is reviewed when asked by name, with trust caveats and no buy recommendation. This is the baseline.",
  brandCrisisHeadline:
    "Premium longevity demand faces two gates: trust and discoverability",
  brandCrisisDek:
    "Foxo is reviewed by name, but missing when buyers ask who to enrol with. TLC, Prajeeva, Apollo and peers take the shortlist.",
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "Longevity programs, Bengaluru clinics, biomarker testing, memberships and pricing. Foxo: 0/10. Shortlists go to TLC, Prajeeva, Apollo, Biopeak and peers.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "The Longevity Centre (TLC)", visibility: 50 },
    { name: "Prajeeva", visibility: 30 },
    { name: "Apollo ProHealth / Apollo Zen", visibility: 20 },
    { name: "24byMe", visibility: 10 },
    { name: "AiWO Health", visibility: 10 },
    { name: "ALIGN Health & Longevity Centre", visibility: 10 },
    { name: "Foxo", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-1",
      query: "Foxo (foxo.club) review",
      title: "Brand review with due-diligence caveats",
      body: "Recognized as an India longevity company, but flagged for thin independent reviews, unverified clinical claims, privacy questions and unproven membership value. Evaluated, not endorsed.",
      outcome: "Nuanced · brand evaluated but not endorsed",
      screenshot: {
        src: `${SHOT}/crisis-foxo-review.png`,
        alt: "ChatGPT Foxo (foxo.club) review with evidence and trust caveats",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-2",
      query: "best personalized longevity program in India",
      title: "India longevity program shortlist",
      body: "Shortlist: Reliance Foundation Hospital, TLC, Apollo ProHealth / Apollo Zen, Biopeak. Foxo is not listed.",
      outcome: "Absent · competitor-led shortlist",
      screenshot: {
        src: `${SHOT}/crisis-best-personalized-longevity-program-india.png`,
        alt: "ChatGPT India personalized longevity program shortlist without Foxo",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-3",
      query: "best longevity clinic in Bangalore",
      title: "Bangalore longevity clinic shortlist",
      body: "Shortlist: TLC, Biopeak, ALIGN. Prajeeva flagged as one to watch. Foxo is not listed.",
      outcome: "Absent · Bangalore clinic recommendations exclude Foxo",
      screenshot: {
        src: `${SHOT}/crisis-best-longevity-clinic-bangalore.png`,
        alt: "ChatGPT Bangalore longevity clinic shortlist without Foxo",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best personalized longevity program in India",
      intent:
        "Own claim theft: core personalized longevity membership shelf in India",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: [
        "The Longevity Centre (TLC)",
        "Prajeeva",
        "Centre for Well-being and Longevity",
        "Apollo ProHealth / Apollo Zen",
      ],
      rentokStatus: "missing",
      outcome: "Absent · personalized program shortlist excludes Foxo",
      screenshot: {
        src: `${SHOT}/01-best-personalized-longevity-program-india.png`,
        alt: "ChatGPT personalized longevity program shortlist without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Top shortlist in India: The Longevity Centre (TLC) for a structured 12-month longevity plan; Prajeeva for advanced precision health and performance; Centre for Well-being and Longevity for hospital-based clinical oversight; Apollo ProHealth / Apollo Zen for mainstream preventive medicine. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q2",
      query: "best longevity clinic in Bangalore",
      intent: "Home turf: Bengaluru clinic demand on Foxo’s local market",
      severity: "critical",
      tag: "Home Turf",
      citedBrands: [
        "Prajeeva",
        "The Longevity Centre (TLC)",
        "Biopeak",
        "ALIGN Health & Longevity Centre",
      ],
      rentokStatus: "missing",
      outcome: "Absent · four competing clinics occupy the shortlist",
      screenshot: {
        src: `${SHOT}/02-best-longevity-clinic-bangalore.png`,
        alt: "ChatGPT Bangalore longevity clinic shortlist without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Top longevity clinic shortlist: Prajeeva for comprehensive longevity; The Longevity Centre (TLC) for structured preventive assessments; Biopeak for longevity and health optimisation; ALIGN Health & Longevity Centre for an integrative approach. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q3",
      query: "best biological age testing in India",
      intent:
        "Own claim theft: biomarker / biological-age testing as a top-of-funnel entry",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: [
        "MyDiagnostics",
        "AIWO Health",
        "MapmyGenome",
        "The Longevity Centre (TLC)",
        "DNA Labs India",
      ],
      rentokStatus: "missing",
      outcome: "Absent · testing shortlist excludes Foxo",
      screenshot: {
        src: `${SHOT}/03-best-biological-age-testing-india.png`,
        alt: "ChatGPT biological-age testing shortlist without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Top biological-age testing picks: MyDiagnostics at ₹45,000; AIWO Health at ₹60,000; MapmyGenome at ₹85,000; The Longevity Centre for doctor-guided interpretation; DNA Labs India at an advertised promotional price. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q4",
      query: "best full body biomarker testing with coaching",
      intent:
        "Own claim theft: diagnostics-plus-coaching bundle matching Foxo’s offer",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: ["Planck Health", "Cent Health", "HisVitals", "24byMe"],
      rentokStatus: "missing",
      outcome: "Absent · biomarker-and-coaching shortlist excludes Foxo",
      screenshot: {
        src: `${SHOT}/04-best-full-body-biomarker-testing-with-coaching.png`,
        alt: "ChatGPT biomarker testing with coaching shortlist without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Best options to compare in India: Planck Health for biomarkers and habit coaching; Cent Health for extensive diagnostics and medical interpretation; HisVitals for a lower-cost panel and coaching; 24byMe for clinician-guided precision health. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q5",
      query: "best personalized health optimization program India",
      intent:
        "Competitor conquest: premium health-optimization shelf owned by TLC and hospitals",
      severity: "critical",
      tag: "Competitor Conquest",
      citedBrands: [
        "The Longevity Centre (TLC)",
        "Apollo ProHealth / Apollo Zen",
        "Mitogenez Longevity Clinic",
        "Fortis Genomic 360 Wellness",
        "Reliance Foundation Hospital",
      ],
      rentokStatus: "missing",
      outcome: "Absent · premium health optimization shortlist excludes Foxo",
      screenshot: {
        src: `${SHOT}/05-best-personalized-health-optimization-program-india.png`,
        alt: "ChatGPT personalized health optimization shortlist without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Health optimization shortlist: TLC for comprehensive ongoing longevity care; Apollo ProHealth / Apollo Zen for hospital-led prevention; Mitogenez for executive health assessment; Fortis Genomic 360 Wellness for genomics-informed prevention; Reliance Foundation Hospital for integrated specialist care. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q6",
      query: "best longevity membership for busy professionals",
      intent:
        "Customer proof erasure: membership framing for Foxo’s primary buyer persona",
      severity: "high",
      tag: "Customer Proof Erasure",
      citedBrands: [
        "Mitogenez Longevity",
        "Apollo ProHealth",
        "Prajeeva Healthcare",
        "Fountain Life",
      ],
      rentokStatus: "missing",
      outcome: "Absent · membership shortlist excludes Foxo",
      screenshot: {
        src: `${SHOT}/06-best-longevity-membership-busy-professionals.png`,
        alt: "ChatGPT longevity membership for professionals shortlist without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Longevity membership shortlist for busy professionals: Mitogenez Longevity for doctor-led assessment; Apollo ProHealth for mainstream preventive healthcare; Prajeeva Healthcare for premium annual care; Fountain Life for premium international diagnostics and physician support. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q7",
      query: "best preventive health program for entrepreneurs",
      intent:
        "Competitor conquest: entrepreneur / executive preventive-health shelf",
      severity: "high",
      tag: "Competitor Conquest",
      citedBrands: [
        "Apollo ProHealth Executive Health Program",
        "Artemis Executive Health Services",
        "NHS Hospital",
      ],
      rentokStatus: "missing",
      outcome: "Absent · entrepreneur-focused shortlist excludes Foxo",
      screenshot: {
        src: `${SHOT}/07-best-preventive-health-program-entrepreneurs.png`,
        alt: "ChatGPT preventive health programs for entrepreneurs without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Preventive health programs for entrepreneurs: Apollo ProHealth Executive Health Program; Artemis Executive Health Services for coordinated executive care; NHS Hospital for age-based screening options. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q8",
      query: "best longevity program for energy and recovery",
      intent:
        "Own claim theft: energy, sleep and recovery angle with no provider shortlist",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Absent · advice-led answer without provider referrals",
      screenshot: {
        src: `${SHOT}/08-best-longevity-program-energy-recovery.png`,
        alt: "ChatGPT energy and recovery advice with no longevity provider named",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "The answer recommends a 12-week routine with strength, aerobic exercise, sleep, nutrition and targeted medical testing. It discusses supplements and clinical evaluation but names no longevity membership or clinic. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q9",
      query: "biological age test with expert consultation India",
      intent:
        "Customer proof erasure: testing-plus-expert consultation as conversion path",
      severity: "high",
      tag: "Customer Proof Erasure",
      citedBrands: [
        "Genoryx",
        "AiWO",
        "The Longevity Centre (TLC)",
        "Resolute Diagnostics",
      ],
      rentokStatus: "missing",
      outcome: "Absent · expert-consultation shortlist excludes Foxo",
      screenshot: {
        src: `${SHOT}/09-biological-age-test-expert-consultation-india.png`,
        alt: "ChatGPT biological-age testing with expert consultation without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Recommended biological-age testing options with expert guidance: Genoryx; AiWO; The Longevity Centre for physician-guided epigenetic testing; Resolute Diagnostics for TruAge, biomarkers, consultations and a personalized plan. Foxo (foxo.club) is not listed.",
        },
      ],
    },
    {
      id: "q10",
      query: "premium longevity program India price",
      intent:
        "Commercial RFP: buyers comparing premium program prices before enrolment",
      severity: "standard",
      tag: "Commercial RFP",
      citedBrands: ["Prajeeva", "Humanedge Essentials"],
      rentokStatus: "missing",
      outcome: "Absent · premium pricing comparison excludes Foxo",
      screenshot: {
        src: `${SHOT}/10-premium-longevity-program-india-price.png`,
        alt: "ChatGPT premium longevity program pricing without Foxo",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Published longevity program prices in India: Prajeeva ESSENTIALS, COMPLETE and 365 packages with listed fees; Humanedge Essentials mentioned without a verified price. Foxo (foxo.club) is not listed.",
        },
      ],
    },
  ],
  sprint: {
    name: AUDIT_OFFER_NAME,
    duration: AUDIT_FIX_TURNAROUND,
    nameLabel: "Product",
    durationLabel: "Turnaround",
    sectionEyebrow: "The report that gets you cited",
    headline:
      "One report. Everything you need to get Foxo onto AI shortlists.",
    body: `This snapshot only proves the problem: 0/10 on ChatGPT. The ${AUDIT_OFFER_NAME} is the complete answer: ${AUDIT_FIX_PROMPTS} buyer prompts across the major AI engines, full competitive analysis of who wins and why, and the exact plan to take those shortlist spots. ${AUDIT_FIX_PRICING.india.priceLabel} India · ${AUDIT_FIX_PRICING.international.priceLabel} worldwide. Fee credited toward implementation.`,
    outcomes: [
      "See Foxo’s true standing: visibility scores and share of voice vs TLC, Prajeeva, Apollo, Biopeak and peers on every engine that matters",
      "Competitive analysis that explains the shortlist: why each competitor comes up, what they are doing differently (pages, sources, proof, positioning), and why Foxo is absent",
      "Steal the ranking: the concrete moves that displace TLC, Prajeeva, Apollo and peers on the prompts they own today",
      "Fix brand perception: how AI talks about Foxo today, including the trust and privacy gaps that stop a buy recommendation",
      "Map the citation graph: the URLs and third-party sources models already trust, and the Foxo assets that must enter that graph",
      "Clear every technical blocker: crawl, schema, entity clarity and discovery so models can learn clean facts about foxo.club",
      "Fill the content that wins shortlists: the comparison, proof and programme pages missing from longevity, clinic, biomarker and membership demand",
      "Build the authority AI needs: reviews, directories and reputation signals that move a health brand from “due diligence” to recommended",
      "Leave with the only backlog that matters: ranked site, content and authority work, sequenced into a 30-60-90 day plan",
      "Prove it worked: a measurement framework and re-runnable prompt set so citation gains are tracked, not guessed",
    ],
  },
  ctaUrl: "/audit",
  ctaLabel: "Get the AI Visibility Intelligence Report",
  ctaEyebrow: AUDIT_OFFER_NAME,
  ctaHeadline:
    "If Foxo is going to get cited, this is the report that makes it happen.",
  ctaBody: `The ${AUDIT_OFFER_NAME} is the definitive diagnostic for AI citations: ${AUDIT_FIX_PROMPTS} prompts, multi-engine visibility, competitive analysis of why rivals win and how to take their spots, brand perception, citation map, technical readiness, content gaps, authority, ranked plan and measurement. ${AUDIT_FIX_TURNAROUND}. ${AUDIT_FIX_PRICING.india.priceLabel} India · ${AUDIT_FIX_PRICING.international.priceLabel} worldwide. Fee credited toward implementation.`,
  ctaChecklist: [
    "Why competitors come up (and Foxo does not)",
    "What they do differently, and how to beat it",
    "The ranked plan to steal those shortlists",
    "Fee credited toward implementation",
  ],
  ctaAsideTitle: "The report",
  ctaAsideMeta: `${AUDIT_FIX_PROMPTS} prompts · ${AUDIT_FIX_TURNAROUND}`,
  ctaAsideChip: "Get cited",
};
