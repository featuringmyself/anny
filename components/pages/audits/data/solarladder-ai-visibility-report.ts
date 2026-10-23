import { AUDIT_OFFER_NAME } from "../offer/content";
import type { VisibilityReport } from "../types";
import {
  AUDIT_FIX_PRICING,
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_TURNAROUND,
} from "@/lib/audit-fix-pricing";

const SHOT = "/audits/solarladder";

/**
 * Private outreach baseline for Solar Ladder (solarladder.com).
 * ChatGPT snapshot, October 2026.
 * Sell: this 3/10 teaser is the door; the full AI Visibility Intelligence
 * Report (/aeo-audit) is the product. Not a services sprint CTA.
 * Brand-review and competitor head-to-heads are excluded from the score:
 * they do not prove category discovery.
 */
export const solarladderAiVisibilityReport: VisibilityReport = {
  slug: "solarladder-ai-visibility-report",
  company: "Solar Ladder",
  website: "solarladder.com",
  industry: "Solar EPC operating system · CRM, proposals, design, procurement",
  preparedFor: "Manan Mehta",
  role: "Co-founder & CEO",
  email: "sales@solarladder.com",
  dateLabel: "October 2026",
  overallScore: 30,
  scoreLabel: "Weak · discovery failing",
  private: true,
  tagline:
    "OpenSolar, RAYVO, SolarERP and peers own the India solar-software shortlists Solar Ladder should win",
  summary:
    "Cited on 3 of 10 buy-intent prompts. Visibility score: 30 (Weak). On the prompts that create software demand (best solar CRM/proposal for India EPCs, all-in-one for 50 projects/month, leads–quotes–projects in one place, local-pricing proposals, design+quote, sales+procurement+payments, 3D design software), Solar Ladder is absent 7 times. OpenSolar, RAYVO, SolarERP, ARKA 360, SuryaHub and peers take those buyers. The 3 citations are not proof discovery is fine: #1 on two India/Mumbai CRM phrasings, #3 behind OpenSolar and ARKA 360 on Mumbai design. Showing up when the prompt already maps to “local OS” does not fix category shelves AI still gives to free design tools and India CRM rivals. This ChatGPT snapshot only proves the bleed. The AI Visibility Intelligence Report maps every engine, explains why rivals win, and ranks the plan to take those shortlists back.",
  brandCrisisHeadline:
    "Solar Ladder is losing the prompts that create software demos",
  brandCrisisDek:
    "Category demand goes to OpenSolar and India CRM peers. A brand review that flags thin third-party ratings is not visibility. It is a trust tax.",
  queriesHeadline: "Prompt audit · 10 buyer queries",
  queriesIntro:
    "Scored on discovery and buy-intent prompts only. Brand review and OpenSolar-vs-ARKA head-to-heads are excluded from the score: they do not prove category discovery. Result: 7 absences, 3 citations. Rivals own the shelf.",
  modelScores: [
    { model: "chatgpt", visibility: 30, cited: 3, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "OpenSolar", visibility: 70 },
    { name: "RAYVO", visibility: 50 },
    { name: "SolarERP", visibility: 45 },
    { name: "SuryaHub", visibility: 40 },
    { name: "ARKA 360", visibility: 40 },
    { name: "Solar Ladder", visibility: 30 },
    { name: "Zoho", visibility: 30 },
  ],
  brandCrisis: [
    {
      id: "crisis-1",
      query: "Solar Ladder (solarladder.com) review",
      title: "Known by name: legitimacy with a trust tax",
      body: "ChatGPT calls Solar Ladder a legitimate India-focused solar business OS, then flags sparse independent reviews: AppRecs around 2.5/5 with negative ratings and no G2 presence. Evaluated, not endorsed. Buyers who already know the brand still get caution before a demo.",
      outcome: "Warned · reviewed, not recommended",
      screenshot: {
        src: `${SHOT}/crisis-solar-ladder-review.png`,
        alt: "ChatGPT Solar Ladder review with sparse/negative third-party ratings",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-2",
      query:
        "What are the best solar CRM and proposal tools for a small residential EPC in India?",
      title: "India CRM + proposal shelf: Solar Ladder erased",
      body: "The core India residential EPC software prompt names ARKA 360, SolarERP, iSolar, SuryaHub, SolarDraft and Zoho. Solar Ladder does not appear. This is the shelf Solar Ladder sells into, and AI is routing demos elsewhere.",
      outcome: "Absent · India CRM shortlist excludes Solar Ladder",
      screenshot: {
        src: `${SHOT}/crisis-best-solar-crm-proposal-india.png`,
        alt: "ChatGPT India solar CRM and proposal shortlist without Solar Ladder",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-3",
      query:
        "What are the best all-in-one solar business management platforms for EPC teams handling 50 projects a month?",
      title: "All-in-one OS demand: Solar Ladder erased",
      body: "High-volume EPC “operating system” demand goes to SolarERP, SolarBuddy, SolarMatrix, SunEngy, Scoop Solar and Odoo. Solar Ladder’s own all-in-one claim is not on the shortlist.",
      outcome: "Absent · all-in-one shelf owned by rivals",
      screenshot: {
        src: `${SHOT}/crisis-best-all-in-one-solar-epc.png`,
        alt: "ChatGPT all-in-one solar EPC platform shortlist without Solar Ladder",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query:
        "What are the best solar CRM and proposal tools for a small residential EPC in India?",
      intent:
        "Own claim theft: core India residential EPC CRM + proposal shelf Solar Ladder sells",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: [
        "ARKA 360",
        "SolarERP",
        "iSolar",
        "SuryaHub",
        "SolarDraft",
        "Zoho",
      ],
      rentokStatus: "missing",
      outcome: "Absent · India CRM/proposal shortlist excludes Solar Ladder",
      screenshot: {
        src: `${SHOT}/01-best-solar-crm-proposal-residential-epc-india.png`,
        alt: "ChatGPT best solar CRM and proposal tools India without Solar Ladder",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Shortlist leans India-local: ARKA 360, SolarERP, iSolar, SuryaHub, SolarDraft, Zoho. ChatGPT steers away from expensive US solar platforms. Solar Ladder (solarladder.com) is not named.",
        },
      ],
    },
    {
      id: "q2",
      query:
        "What are the best all-in-one solar business management platforms for EPC teams handling 50 projects a month?",
      intent:
        "Own claim theft: all-in-one solar OS for mid-volume EPC teams",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: [
        "SolarERP",
        "SolarBuddy",
        "SolarMatrix",
        "SunEngy",
        "Scoop Solar",
        "Odoo",
      ],
      rentokStatus: "missing",
      outcome: "Absent · all-in-one 50-projects shelf excludes Solar Ladder",
      screenshot: {
        src: `${SHOT}/02-best-all-in-one-solar-50-projects.png`,
        alt: "ChatGPT all-in-one solar platforms for 50 projects/month without Solar Ladder",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "India rooftop EPCs are pointed to demos of SolarERP, SolarBuddy and SunEngy; Odoo if deeper finance controls matter. Solar Ladder (solarladder.com) is not on the all-in-one shortlist.",
        },
      ],
    },
    {
      id: "q3",
      query:
        "What software do rooftop solar installers use to manage leads, quotations and installation projects in one place?",
      intent:
        "Own claim theft: leads → quotes → install in one system",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["RAYVO", "Raymitra", "SolarZent", "Solaris", "PVERP"],
      rentokStatus: "missing",
      outcome: "Absent · RAYVO-led one-place shortlist",
      screenshot: {
        src: `${SHOT}/03-leads-quotations-projects-one-place.png`,
        alt: "ChatGPT one-place solar installer software without Solar Ladder",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Recommendation leads with RAYVO and Raymitra for all-in-one workflow; SolarZent as a simpler solar CRM comparison. Solar Ladder (solarladder.com) is not named.",
        },
      ],
    },
    {
      id: "q4",
      query:
        "Which solar proposal tools are worth considering for Indian installers who need local pricing and branded quotations?",
      intent:
        "Own claim theft: India-local pricing and branded proposals",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: [
        "OpenSolar",
        "RAYVO",
        "SolarDraft",
        "SolvSolar",
        "Quickest Solar CRM",
      ],
      rentokStatus: "missing",
      outcome: "Absent · local-pricing proposal shelf excludes Solar Ladder",
      screenshot: {
        src: `${SHOT}/04-solar-proposal-tools-india-local-pricing.png`,
        alt: "ChatGPT India solar proposal tools with local pricing without Solar Ladder",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Small teams are steered to SolvSolar or Quickest Solar CRM; polished branded quotes to SolarDraft. OpenSolar and RAYVO appear in the set. Solar Ladder (solarladder.com) is not listed.",
        },
      ],
    },
    {
      id: "q5",
      query:
        "What are the best solar proposal and design tools for Indian installers who need to quote customers quickly?",
      intent:
        "Own claim theft: fast design + proposal quoting for India installers",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: [
        "OpenSolar",
        "Aurora Solar",
        "PitchSun",
        "SolarDraft",
        "SolvSolar",
      ],
      rentokStatus: "missing",
      outcome: "Absent · OpenSolar owns fast-quote design shelf",
      screenshot: {
        src: `${SHOT}/05-best-solar-proposal-design-india.png`,
        alt: "ChatGPT India solar proposal and design tools without Solar Ladder",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Fast-quoting shortlist for Indian residential rooftop: OpenSolar, PitchSun, SolarDraft, SolvSolar, with Aurora in the wider set. Solar Ladder (solarladder.com) is not named.",
        },
      ],
    },
    {
      id: "q6",
      query:
        "Which solar software platforms help Indian EPCs manage sales, procurement and project payments together?",
      intent:
        "Own claim theft: sales + procurement + payments — Solar Ladder’s stack claim",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["Solarify", "Solaris", "RAYVO", "SuryaHub", "AHAsolar"],
      rentokStatus: "missing",
      outcome: "Absent · procurement-linked OS shelf excludes Solar Ladder",
      screenshot: {
        src: `${SHOT}/06-sales-procurement-payments-india.png`,
        alt: "ChatGPT India sales procurement payments platforms without Solar Ladder",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Demos recommended for Solarify and SuryaHub; RAYVO as a third option when pricing transparency matters. Solar Ladder (solarladder.com) is not on the sales–procurement–payments shortlist.",
        },
      ],
    },
    {
      id: "q7",
      query:
        "Which solar design and proposal software should a Mumbai rooftop installer consider for faster residential quotations?",
      intent: "Home turf: Mumbai design + proposal — cited but third",
      severity: "high",
      tag: "Home Turf",
      citedBrands: ["OpenSolar", "ARKA 360", "Solar Ladder", "Aurora Solar"],
      rentokStatus: "cited",
      outcome: "Leaky · #3 on home turf; OpenSolar and ARKA lead",
      screenshot: {
        src: `${SHOT}/07-mumbai-design-proposal-software.png`,
        alt: "ChatGPT Mumbai design and proposal software: Solar Ladder third",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 3,
          excerpt:
            "Mumbai residential quoting shortlist: #1 OpenSolar, #2 ARKA 360, #3 Solar Ladder, #4 Aurora Solar. Mention without preference still loses the first trial.",
        },
      ],
    },
    {
      id: "q8",
      query:
        "Which solar installer CRM and proposal software providers serve small rooftop solar EPCs in Mumbai?",
      intent: "Home turf: Mumbai CRM + proposal providers",
      severity: "standard",
      tag: "Home Turf",
      citedBrands: [
        "Solar Ladder",
        "PitchSun",
        "SolarBuddy",
        "SolarERP",
        "SolarMatrix",
        "Solartrade",
      ],
      rentokStatus: "cited",
      outcome: "Cited · #1 on Mumbai CRM phrasing",
      screenshot: {
        src: `${SHOT}/08-mumbai-crm-proposal-providers.png`,
        alt: "ChatGPT Mumbai solar CRM providers with Solar Ladder first",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "Solar Ladder leads as a local integrated option, then PitchSun, SolarBuddy, SolarERP/Solar Matrix and Solartrade. One win on a Mumbai-provider phrasing does not fix national category absences.",
        },
      ],
    },
    {
      id: "q9",
      query:
        "What are the best solar CRM and project management tools for a small rooftop EPC in India?",
      intent:
        "Category shelf: India solar CRM + project management for small EPCs",
      severity: "standard",
      tag: "Category Shelf",
      citedBrands: [
        "Solar Ladder",
        "SuryaHub",
        "OpenSolar",
        "Zoho",
        "Odoo",
        "SunEngy",
      ],
      rentokStatus: "cited",
      outcome: "Cited · #1 on CRM + PM phrasing",
      screenshot: {
        src: `${SHOT}/09-best-solar-crm-pm-india.png`,
        alt: "ChatGPT best solar CRM and PM India with Solar Ladder first",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "Solar Ladder ranked first for rooftop sales-to-execution, then SuryaHub, OpenSolar, Zoho, Odoo and SunEngy. Thin win next to the seven category absences on this snapshot.",
        },
      ],
    },
    {
      id: "q10",
      query:
        "Which solar design software is best for a small installer that needs 3D layouts and quick quotations?",
      intent:
        "Competitor conquest: 3D design + quote shelf OpenSolar owns globally and in India",
      severity: "critical",
      tag: "Competitor Conquest",
      citedBrands: ["OpenSolar", "ARKA 360", "Aurora Solar", "PV*SOL"],
      rentokStatus: "missing",
      outcome: "Absent · OpenSolar owns 3D design + quote shelf",
      screenshot: {
        src: `${SHOT}/10-best-solar-design-3d-quotations.png`,
        alt: "ChatGPT best solar design software for 3D layouts without Solar Ladder",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Start with OpenSolar for low-overhead 3D layouts and quotes; evaluate ARKA 360 for India-local pricing. Aurora and PV*SOL appear in the wider set. Solar Ladder (solarladder.com) is not listed.",
        },
      ],
    },
  ],
  sprint: {
    name: AUDIT_OFFER_NAME,
    duration: AUDIT_FIX_TURNAROUND,
    nameLabel: "Product",
    durationLabel: "Turnaround",
    sectionEyebrow: "What this snapshot cannot do",
    headline:
      "3/10 on ChatGPT is the warning. The full report is how Solar Ladder takes the shortlists back.",
    body: `This page is a teaser: one engine, ten prompts, enough to prove OpenSolar, RAYVO, SolarERP and peers are taking Solar Ladder’s demos. It does not tell you why they win on every surface, what to publish, which sources models already trust, or the ranked backlog to displace them. That is the ${AUDIT_OFFER_NAME}: ${AUDIT_FIX_PROMPTS} buyer prompts across the major AI engines, competitive analysis, citation map, technical readiness, content and authority gaps, and a 30-60-90 plan. ${AUDIT_FIX_PRICING.india.priceLabel} India · ${AUDIT_FIX_PRICING.international.priceLabel} worldwide. Fee credited toward implementation.`,
    outcomes: [
      "Multi-engine truth: Solar Ladder’s real score on ChatGPT, Perplexity, Gemini, Claude and Google AI, not a one-engine teaser",
      "Why OpenSolar, RAYVO, SolarERP, ARKA 360 and SuryaHub win: pages, sources, proof and positioning Solar Ladder lacks on each prompt they own",
      "How to steal those shortlists: concrete moves on CRM, proposal, design, all-in-one and procurement demand",
      "Stop leaky citations: AppRecs/G2 trust gaps and third-place Mumbai design mentions that turn a name-drop into a deferred demo",
      "Citation graph: the third-party URLs models already trust, and the Solar Ladder assets that must enter that graph",
      "Technical readiness: crawl, schema, entity clarity so models can learn clean facts about solarladder.com",
      "Content that wins discovery: comparison, proof and product pages missing from the prompts that create software demos",
      "Authority AI needs: reviews, directories and reputation signals that move Solar Ladder from “verify support” to recommended",
      "Ranked 30-60-90 backlog: site, content and authority work sequenced by impact, not a vague SEO list",
      "Measurement: re-runnable prompt set so citation gains are tracked after the work ships",
    ],
  },
  ctaUrl: "/aeo-audit",
  ctaLabel: "Get the AI Visibility Intelligence Report",
  ctaEyebrow: AUDIT_OFFER_NAME,
  ctaHeadline:
    "You’re losing category demand to OpenSolar and India CRM peers. This is the report that reverses it.",
  ctaBody: `This snapshot only shows the bleed on ChatGPT. The ${AUDIT_OFFER_NAME} is the full diagnostic and plan: ${AUDIT_FIX_PROMPTS} prompts, every major AI engine, why rivals win and how to take their spots, brand perception, citation map, technical readiness, content gaps, authority, ranked backlog and measurement. ${AUDIT_FIX_TURNAROUND}. ${AUDIT_FIX_PRICING.india.priceLabel} India · ${AUDIT_FIX_PRICING.international.priceLabel} worldwide. Fee credited toward implementation.`,
  ctaChecklist: [
    "Where Solar Ladder is absent, and who takes the demo",
    "Why OpenSolar / RAYVO / SolarERP win those shortlists",
    "The ranked plan to take them back",
    "Fee credited toward implementation",
  ],
  ctaAsideTitle: "The full report",
  ctaAsideMeta: `${AUDIT_FIX_PROMPTS} prompts · ${AUDIT_FIX_TURNAROUND}`,
  ctaAsideChip: "Take the shortlists",
};
