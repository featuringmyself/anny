import { AUDIT_OFFER_NAME } from "../offer/content";
import type { VisibilityReport } from "../types";
import {
  AUDIT_FIX_PRICING,
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_TURNAROUND,
} from "@/lib/audit-fix-pricing";

const SHOT = "/audits/portl";

/**
 * Private outreach baseline for Portl (portl.co). ChatGPT snapshot, October 2026.
 * Sell: this 3/10 discovery failure is the door; the full AI Visibility Intelligence
 * Report (/audit) is the product. Not a services sprint CTA.
 * Brand-vs and ultra-narrow product prompts are excluded from the score: they
 * inflate visibility without proving category discovery.
 */
export const portlAiVisibilityReport: VisibilityReport = {
  slug: "portl-ai-visibility-report",
  company: "Portl",
  website: "portl.co",
  industry: "Premium connected home fitness, digital resistance and AI coaching",
  preparedFor: "Armaan Singh Kandhari",
  role: "Co Founder & COO, Portl",
  email: "armaan@portl.co",
  dateLabel: "October 2026",
  overallScore: 30,
  scoreLabel: "Weak · discovery failing",
  private: true,
  pitchVideo: {
    url: "https://youtu.be/TyFqcacTbTs",
    title: "Armaan: why 3/10 is still a discovery failure",
    dek: "Ninety seconds on the India shortlist Portl is missing, why the three citations don’t convert, and what the full AI Visibility Intelligence Report covers.",
    thumbnailSrc: "/audits/portl/pitch-video-thumb.jpg",
  },
  tagline:
    "Aroleap, Speediance and Vitruvian own the India smart-gym shortlists Portl should win",
  summary:
    "Cited on 3 of 10 buy-intent prompts. Visibility score: 30 (Weak). On the prompts that create demand (best smart home gym in India, Tonal alternative, all-in-one, digital resistance, apartments, form correction, trainer replacement, real-time feedback), Portl is absent 7 times. Aroleap, Speediance, Vitruvian, Tempo and Tonal take those buyers. The 3 citations are not proof Portl is fine: Studio ranks first then marked sold out; UltraGym is the weaker high-resistance option behind Vitruvian; in Hyderabad Portl is second to Aroleap with delivery caveats. Showing up when already named, or on an ultra-narrow product phrase, does not fix category discovery. This ChatGPT snapshot only proves the bleed. The AI Visibility Intelligence Report is what maps every engine, explains why rivals win, and gives the ranked plan to take those shortlists back.",
  brandCrisisHeadline:
    "Portl is losing the prompts that create purchases",
  brandCrisisDek:
    "Category demand goes to Aroleap and Speediance. Brand mentions that cannot convert (sold out, second place, delivery risk) are not visibility. They are leakage.",
  queriesHeadline: "Prompt audit · 10 buyer queries",
  queriesIntro:
    "Scored on discovery and buy-intent prompts only. Brand-vs matchups are excluded from the score: they only fire when someone already knows Portl. Result: 7 absences, 3 leaky citations. Rivals own the shelf.",
  modelScores: [
    { model: "chatgpt", visibility: 30, cited: 3, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Speediance", visibility: 70 },
    { name: "Aroleap", visibility: 60 },
    { name: "Vitruvian", visibility: 50 },
    { name: "Tonal", visibility: 40 },
    { name: "Portl", visibility: 30 },
    { name: "Tempo", visibility: 20 },
  ],
  brandCrisis: [
    {
      id: "crisis-1",
      query: "best smart home gym in India",
      title: "India category demand: Portl erased",
      body: "The core India smart-gym prompt names Aroleap first, then Speediance and Vitruvian. Portl does not appear. This is the shelf Portl sells into, and AI is routing it elsewhere.",
      outcome: "Absent · Aroleap owns the India shortlist",
      screenshot: {
        src: `${SHOT}/crisis-best-smart-home-gym-india.png`,
        alt: "ChatGPT India smart home gym shortlist without Portl",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-2",
      query: "Portl (portl.co) review",
      title: "Known by name: still not a buy",
      body: "When buyers ask about Portl directly, the answer lists prices and a review, then blocks purchase: check delivery, warranty, service and reliability. Studio is sold out. Evaluated, not endorsed. Trust and availability kill the close.",
      outcome: "Nuanced · reviewed, not recommended",
      screenshot: {
        src: `${SHOT}/crisis-portl-review.png`,
        alt: "ChatGPT Portl (portl.co) review with purchase caveats",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-3",
      query: "Portl UltraGym vs Aroleap",
      title: "Comparisons only happen after discovery, and discovery is broken",
      body: "Head-to-head vs Aroleap only appears when the buyer already typed Portl. UltraGym is framed as portable/budget; Aroleap as the higher-end dedicated gym. Most buyers never get here. They ask for the best smart gym in India and get Aroleap instead.",
      outcome: "Named matchup · not a discovery win",
      screenshot: {
        src: `${SHOT}/crisis-ultragym-vs-aroleap.png`,
        alt: "ChatGPT Portl UltraGym vs Aroleap: only when Portl is already named",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best Tonal alternative in India",
      intent:
        "Competitor conquest: buyers searching for a Tonal substitute Portl should own in India",
      severity: "critical",
      tag: "Competitor Conquest",
      citedBrands: ["Aroleap", "Speediance", "Vitruvian"],
      rentokStatus: "missing",
      outcome: "Absent · Aroleap named best Tonal alternative",
      screenshot: {
        src: `${SHOT}/03-best-tonal-alternative-india.png`,
        alt: "ChatGPT Tonal alternative in India shortlist without Portl",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Aroleap X is named the best Tonal alternative in India for wall-mounted digital resistance with local installation and support. Speediance Gym Monster 2 is the freestanding option; Vitruvian Trainer+ for maximum digital resistance in a compact setup. Portl (portl.co) is not listed. High-intent substitute demand goes to rivals.",
        },
      ],
    },
    {
      id: "q2",
      query: "best all-in-one smart home gym India",
      intent:
        "Own claim theft: all-in-one smart-gym shelf UltraGym competes on in India",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["Aroleap", "Speediance", "Vitruvian", "Gym24"],
      rentokStatus: "missing",
      outcome: "Absent · Aroleap and Speediance own the shortlist",
      screenshot: {
        src: `${SHOT}/06-best-all-in-one-smart-home-gym-india.png`,
        alt: "ChatGPT all-in-one smart home gym India shortlist without Portl",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Aroleap X is the practical India-focused smart-gym pick; Speediance Gym Monster 2 is the freestanding all-in-one concept; Vitruvian Trainer+ for max strength in minimal space. Portl (portl.co) is not listed on the core all-in-one shelf.",
        },
      ],
    },
    {
      id: "q3",
      query: "best digital resistance home gym in India",
      intent:
        "Own claim theft: core UltraGym digital-resistance shelf in India",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["Aroleap", "Speediance", "Vitruvian", "Tonal"],
      rentokStatus: "missing",
      outcome: "Absent · Aroleap leads digital-resistance shortlist",
      screenshot: {
        src: `${SHOT}/01-best-digital-resistance-home-gym-india.png`,
        alt: "ChatGPT digital-resistance home gym shortlist without Portl",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Aroleap X is best overall for India with 2–75 kg resistance and 150+ exercises. Speediance and Vitruvian follow. Portl (portl.co) is not listed on UltraGym’s own category prompt.",
        },
      ],
    },
    {
      id: "q4",
      query: "best compact smart gym for apartments",
      intent:
        "Own claim theft: compact apartment smart-gym shelf matching UltraGym",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["Speediance", "Vitruvian", "Aroleap"],
      rentokStatus: "missing",
      outcome: "Absent · apartment shortlist excludes Portl",
      screenshot: {
        src: `${SHOT}/04-best-compact-smart-gym-apartments.png`,
        alt: "ChatGPT apartment smart-gym shortlist without Portl",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Speediance, Vitruvian and Aroleap take the apartment shortlist; Aroleap gets the India recommendation. Portl UltraGym (built for compact homes) is not named.",
        },
      ],
    },
    {
      id: "q5",
      query: "best home gym with AI form correction",
      intent:
        "Own claim theft: AI form-correction claim Portl advertises on Studio and UltraGym",
      severity: "high",
      tag: "Own Claim Theft",
      citedBrands: ["Tempo", "Tonal"],
      rentokStatus: "missing",
      outcome: "Absent · Tempo and Tonal own form correction",
      screenshot: {
        src: `${SHOT}/05-best-home-gym-ai-form-correction.png`,
        alt: "ChatGPT AI form-correction home gym shortlist without Portl",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Tempo Studio leads for AI technique feedback; Tonal 2 for coaching cues. Portl’s advertised form feedback does not put it on the shortlist.",
        },
      ],
    },
    {
      id: "q6",
      query: "best home gym replacement for personal training",
      intent:
        "Customer proof erasure: trainer-replacement positioning Portl markets",
      severity: "high",
      tag: "Customer Proof Erasure",
      citedBrands: ["Aroleap", "PowerMax", "Domyos"],
      rentokStatus: "missing",
      outcome: "Absent · Aroleap recommended for trainer-style guidance",
      screenshot: {
        src: `${SHOT}/07-best-home-gym-personal-training-replacement.png`,
        alt: "ChatGPT personal-training replacement shortlist without Portl",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Aroleap X is first choice for personal-training-style home workouts. Portl receives no recommendation.",
        },
      ],
    },
    {
      id: "q7",
      query: "best smart gym with real-time workout feedback",
      intent:
        "Customer proof erasure: real-time feedback claim Portl advertises across products",
      severity: "high",
      tag: "Customer Proof Erasure",
      citedBrands: ["Tonal", "Speediance", "Tempo", "Peloton"],
      rentokStatus: "missing",
      outcome: "Absent · Tonal and Tempo named for feedback",
      screenshot: {
        src: `${SHOT}/10-best-smart-gym-realtime-feedback.png`,
        alt: "ChatGPT real-time workout feedback shortlist without Portl",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Tonal, Speediance, Tempo and Peloton take real-time feedback demand. Portl is omitted despite advertised AI-assisted movement feedback.",
        },
      ],
    },
    {
      id: "q8",
      query: "best AI fitness mirror in India",
      intent: "Own claim theft: Studio AI fitness mirror: cited but blocked from purchase",
      severity: "critical",
      tag: "Own Claim Theft",
      citedBrands: ["Portl", "AEKE", "Echelon"],
      rentokStatus: "cited",
      outcome: "Leaky · #1 then sold out: demand diverted",
      screenshot: {
        src: `${SHOT}/02-best-ai-fitness-mirror-india.png`,
        alt: "ChatGPT AI fitness mirror: Portl Studio first but sold out",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 1,
          excerpt:
            "Portl Studio is ranked first for India, then marked sold out, with advice to confirm delivery before payment. AEKE and Echelon sit as ready alternatives. A #1 that cannot ship is lost revenue, not a visibility win.",
        },
      ],
    },
    {
      id: "q9",
      query: "best smart home gym with high resistance",
      intent:
        "Competitor conquest: high-resistance buyers: Portl named as the weaker option",
      severity: "high",
      tag: "Competitor Conquest",
      citedBrands: ["Vitruvian", "Speediance", "Tonal", "Portl"],
      rentokStatus: "cited",
      outcome: "Leaky · named as secondary; Vitruvian wins intent",
      screenshot: {
        src: `${SHOT}/08-best-smart-home-gym-high-resistance.png`,
        alt: "ChatGPT high-resistance smart gym: Vitruvian leads, Portl secondary",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          excerpt:
            "Vitruvian leads max resistance; Speediance and Tonal follow. Portl UltraGym appears as an India-market option at ~70 kg, shortlisted as the weaker fit. Mention without preference still loses the buyer.",
        },
      ],
    },
    {
      id: "q10",
      query: "best smart home gym available in Hyderabad",
      intent: "Home turf: Hyderabad: second place with delivery risk",
      severity: "critical",
      tag: "Home Turf",
      citedBrands: [
        "Aroleap",
        "Portl",
        "Speediance",
        "Stayfit Health & Fitness World",
        "Duro Fitness Store",
      ],
      rentokStatus: "cited",
      outcome: "Leaky · #2 on home turf; Aroleap wins; delivery unsure",
      screenshot: {
        src: `${SHOT}/09-best-smart-home-gym-hyderabad.png`,
        alt: "ChatGPT Hyderabad smart gym: Aroleap first, Portl second with delivery caveats",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 2,
          excerpt:
            "Aroleap X is ranked best overall. Portl UltraGym is second as a lower-budget compact option, then buyers must confirm batch dispatch and Hyderabad delivery. On home turf, runner-up with an open risk that diverts purchase.",
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
      "3/10 on ChatGPT is the warning. The full report is how Portl takes the shortlists back.",
    body: `This page is a teaser: one engine, ten prompts, enough to prove Aroleap and Speediance are taking Portl’s buyers. It does not tell you why they win on every surface, what to publish, which sources models already trust, or the ranked backlog to displace them. That is the ${AUDIT_OFFER_NAME}: ${AUDIT_FIX_PROMPTS} buyer prompts across the major AI engines, competitive analysis, citation map, technical readiness, content and authority gaps, and a 30-60-90 plan. ${AUDIT_FIX_PRICING.india.priceLabel} India · ${AUDIT_FIX_PRICING.international.priceLabel} worldwide. Fee credited toward implementation.`,
    outcomes: [
      "Multi-engine truth: Portl’s real score on ChatGPT, Perplexity, Gemini, Claude and Google AI, not a one-engine teaser",
      "Why Aroleap, Speediance and Vitruvian win: pages, sources, proof and positioning Portl lacks on each prompt they own",
      "How to steal those shortlists: concrete moves on Tonal-alternative, all-in-one, digital-resistance and apartment demand",
      "Stop leaky citations: sold-out, delivery and trust signals that turn a Portl mention into a deferred or diverted buy",
      "Citation graph: the third-party URLs models already trust, and the Portl assets that must enter that graph",
      "Technical readiness: crawl, schema, entity clarity so models can learn clean facts about portl.co",
      "Content that wins discovery: comparison, proof and product pages missing from the prompts that create purchases",
      "Authority AI needs: reviews, directories and reputation signals that move Portl from “check delivery” to recommended",
      "Ranked 30-60-90 backlog: site, content and authority work sequenced by impact, not a vague SEO list",
      "Measurement: re-runnable prompt set so citation gains are tracked after the work ships",
    ],
  },
  ctaUrl: "/audit",
  ctaLabel: "Get the AI Visibility Intelligence Report",
  ctaEyebrow: AUDIT_OFFER_NAME,
  ctaHeadline:
    "You’re losing category demand to Aroleap and Speediance. This is the report that reverses it.",
  ctaBody: `This snapshot only shows the bleed on ChatGPT. The ${AUDIT_OFFER_NAME} is the full diagnostic and plan: ${AUDIT_FIX_PROMPTS} prompts, every major AI engine, why rivals win and how to take their spots, brand perception, citation map, technical readiness, content gaps, authority, ranked backlog and measurement. ${AUDIT_FIX_TURNAROUND}. ${AUDIT_FIX_PRICING.india.priceLabel} India · ${AUDIT_FIX_PRICING.international.priceLabel} worldwide. Fee credited toward implementation.`,
  ctaChecklist: [
    "Where Portl is absent, and who takes the deal",
    "Why Aroleap / Speediance win those shortlists",
    "The ranked plan to take them back",
    "Fee credited toward implementation",
  ],
  ctaAsideTitle: "The full report",
  ctaAsideMeta: `${AUDIT_FIX_PROMPTS} prompts · ${AUDIT_FIX_TURNAROUND}`,
  ctaAsideChip: "Take the shortlists",
};
