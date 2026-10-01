import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import {
  AUDIT_FIX_PRICING,
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_SURFACES,
  AUDIT_FIX_TURNAROUND,
  type AuditFixMarket,
} from "@/lib/audit-fix-pricing";

export const AUDIT_OFFER_NAME = "Dodox Audit";

export const auditFixProof = [
  { value: String(AUDIT_FIX_PROMPTS), label: "Buyer prompts audited" },
  { value: "3", label: "Surfaces covered" },
  { value: "1", label: "Report + backlog" },
  { value: "7-10d", label: "Typical turnaround" },
] as const;

export const auditFixIncluded = [
  {
    group: "The diagnosis",
    dek: `A dated standing across ${AI_MODELS_PHRASE} so you see exactly where models route demand away from you.`,
    items: [
      {
        title: "Why models skip you",
        body: `We run ${AUDIT_FIX_PROMPTS} category-aware buyer prompts across major AI engines and map where you are missing, misnamed, or outranked on the shortlist.`,
      },
      {
        title: "Who wins instead",
        body: "Share of voice vs named competitors, with answer excerpts you can verify yourself in each engine.",
      },
      {
        title: "Citation & source map",
        body: "The domains and pages models trust when they build an answer in your category.",
      },
      {
        title: "Website readiness pass",
        body: "Crawlability, robots, schema, and discovery gaps that block models from learning you correctly.",
      },
    ],
  },
  {
    group: "What needs to change",
    dek: "Not a 40-page wishlist. A prioritized backlog ranked by impact on the prompts that lose you right now.",
    items: [
      {
        title: "Prioritized change list",
        body: "Impact × effort across site, content, and authority so eng, marketing, and founders know the order of work.",
      },
      {
        title: "Answer-shaped content gaps",
        body: "The comparison, FAQ, and entity pages AI already expects in your category and you are missing.",
      },
      {
        title: "Entity & schema clarity",
        body: "Organization, Offer, FAQ, and entity signals so models can retrieve facts instead of guessing.",
      },
      {
        title: "Authority footprint gaps",
        body: "Third-party sources that currently shape answers, and the placements your category already relies on.",
      },
    ],
  },
  {
    group: "How you use it",
    dek: "A deliverable your team can act on: evidence, priorities, and clear next moves across the surfaces that move AI recommendations.",
    items: [
      {
        title: "Site priorities",
        body: "Robots and AI-bot access, llms.txt / discovery files, structured data, and on-page entity clarity where retrieval is blocked.",
      },
      {
        title: "Content priorities",
        body: "Answer-shaped pages and rewrites for the losing prompts: comparisons, FAQs, category explainers models can cite.",
      },
      {
        title: "Authority priorities",
        body: "Where to show up in the third-party sources already feeding AI answers in your niche.",
      },
      {
        title: "Executive summary",
        body: "A short outcome view for founders and CMOs, with the prompt tables underneath for the people doing the work.",
      },
    ],
  },
] as const;

export const auditFixSurfaces = [
  {
    title: "Site",
    body: "Make your domain crawlable and readable: bots, discovery files, schema, and entity pages that give models clean facts.",
  },
  {
    title: "Content",
    body: "Publish and rewrite the answer-shaped pages AI already expects when buyers ask who to trust in your category.",
  },
  {
    title: "Authority footprint",
    body: "Show up in the third-party sources models already cite, so recommendations are not built only from your competitors' pages.",
  },
] as const;

export const auditFixSteps = [
  {
    step: "01",
    title: "Brief + prompt lock",
    body: "You send site, competitors, and market. We propose the prompt set; you approve before anything runs.",
  },
  {
    step: "02",
    title: "Audit the standing",
    body: `Live queries across ${AI_MODELS_PHRASE} on ${AUDIT_FIX_PROMPTS} prompts, plus readiness and citation mapping. This is the "why you are missing" baseline.`,
  },
  {
    step: "03",
    title: "Prioritize the backlog",
    body: `We rank what needs to change across ${AUDIT_FIX_SURFACES.join(", ").toLowerCase()} by impact on the prompts you lose today.`,
  },
  {
    step: "04",
    title: "Hand off the report",
    body: "Dated standing, prioritized change list, and a clear next path if you want ongoing GEO after the Audit.",
  },
] as const;

export const auditFixPromise = [
  {
    title: "Why you are missing",
    body: `A dated audit across ${AI_MODELS_PHRASE} with prompts, competitors, citations, and readiness: the evidence, not a vibe check.`,
  },
  {
    title: "What needs to change",
    body: "A ranked backlog across site, content, and authority footprint tied to the prompts that lose you today.",
  },
  {
    title: "What to do next",
    body: "Clear priorities your team can act on, with the prompt evidence attached so the work stays grounded.",
  },
] as const;

/** Visible FAQ copy for one market only. Never mixes INR and USD. */
export function getAuditFixFaqs(market: AuditFixMarket) {
  const price = AUDIT_FIX_PRICING[market];

  return [
    {
      question: "What do I get?",
      answer: `A ${AUDIT_OFFER_NAME} is a dated AI visibility audit across ${AI_MODELS_PHRASE}, plus a prioritized change backlog across site, content, and authority footprint. You get the diagnosis and the ordered next moves. Price is ${price.priceLabel} one-time for ${price.localeHint}.`,
    },
    {
      question: `How is ${AUDIT_OFFER_NAME} priced?`,
      answer: `One Audit is ${price.priceLabel} (${price.periodLabel}) for ${price.localeHint}. Same scope everywhere: ${AUDIT_FIX_PROMPTS} prompts across major AI engines, diagnosis, and a prioritized backlog. Switch markets with the toggle in the pricing section if you bill from a different region.`,
    },
    {
      question: "What kinds of changes does the backlog cover?",
      answer:
        "Whatever the audit shows is blocking AI recommendations for your prompts: AI-bot / robots access, discovery files (e.g. llms.txt), structured data and entity clarity, and the answer-shaped pages or rewrites tied to losing queries. Items are ranked by impact × effort so your team knows the order of work.",
    },
    {
      question: "Do you guarantee AI will recommend us?",
      answer: `No honest GEO product can. Models shift daily. We guarantee a dated baseline across ${AI_MODELS_PHRASE}, a prioritized backlog across the three surfaces, and prompt-level evidence you can verify. Treat the Audit as a standing baseline and action plan, not a permanent ranking promise.`,
    },
    {
      question: "How long does it take?",
      answer: `Typical turnaround is ${AUDIT_FIX_TURNAROUND} once the brief and prompts are locked. Larger prompt sets or multi-market briefs may take longer; we flag that before you pay.`,
    },
    {
      question: "What do you need from us?",
      answer:
        "Site URL, competitors, market, and a shortlist of buyer prompts if you already have them. We can also propose the prompt set for your approval before the run.",
    },
    {
      question: "How is this different from a Snapshot or managed services?",
      answer: `Snapshots are white-label standing reports for agencies. Managed GEO is the ongoing retainer. ${AUDIT_OFFER_NAME} is the brand-facing audit: diagnosis plus a prioritized backlog so your team knows exactly what to change next.`,
    },
    {
      question: "Which engines are included?",
      answer: `${AI_MODELS_PHRASE}. Same prompt set across engines so gaps are comparable, not hand-wavy. Continuous multi-engine monitoring and retainers live on the platform and managed services.`,
    },
    {
      question: "Who is this for?",
      answer:
        "Founders and marketing leads who already suspect AI answers are routing buyers to competitors and want a dated diagnosis plus a clear change list in one invoice. Agencies that need white-label-only reports should use Snapshots instead.",
    },
  ] as const;
}

/** Schema FAQ: both markets named once for crawlers; UI uses getAuditFixFaqs. */
export const auditFixFaqsForSchema = [
  ...getAuditFixFaqs("india").filter(
    (faq) => faq.question !== `How is ${AUDIT_OFFER_NAME} priced?`,
  ),
  {
    question: `How is ${AUDIT_OFFER_NAME} priced?`,
    answer: `India: ₹4,999 one-time. US and worldwide: $99 one-time. Same product: AI visibility audit across ${AI_MODELS_PHRASE} and a prioritized backlog across site, content, and authority footprint. Choose your market in the pricing section.`,
  },
] as const;
