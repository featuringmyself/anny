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

/** Three-beat story: the whole offer at a glance. */
export const auditFixStory = [
  {
    step: "01",
    title: "Buyers ask AI",
    body: "Someone asks who to trust in your category. The model answers with a shortlist.",
    kind: "image" as const,
    src: "/audits/sprentzo/01-best-pickleball-paddle-india.png",
    label: "Example ChatGPT shortlist naming competitors",
  },
  {
    step: "02",
    title: "You are missing",
    body: "Competitors take the recommendation. Your brand never makes the answer.",
    kind: "video" as const,
    src: "/services/videos/comparison.webm",
    label: "Competitor share of voice across AI engines",
  },
  {
    step: "03",
    title: "The Audit maps the fix list",
    body: "Dated evidence across engines, then a ranked backlog across site, content, and authority.",
    kind: "image" as const,
    src: "/features/chatgpt/recommended-actions.webp",
    label: "Prioritized change backlog from the Audit",
  },
] as const;

/** What is inside the report, shown with product media. */
export const auditFixShow = [
  {
    title: "Where you show up, engine by engine",
    body: `Comparable standing across ${AI_MODELS_PHRASE} on the same ${AUDIT_FIX_PROMPTS} prompts.`,
    kind: "video" as const,
    src: "/services/videos/brand-visibility.webm",
    label: "Brand visibility across AI engines",
    mediaFirst: false,
  },
  {
    title: "Who wins the shortlist instead",
    body: "Share of voice and the exact prompts where rivals get named and you do not.",
    kind: "video" as const,
    src: "/services/videos/comparison.webm",
    label: "Competitor comparison across AI platforms",
    mediaFirst: true,
  },
  {
    title: "The pages AI trusts",
    body: "Citation and source map: the domains shaping answers in your category.",
    kind: "image" as const,
    src: "/metrics/aiSources.webp",
    label: "AI citation sources",
    mediaFirst: false,
  },
  {
    title: "What needs to change next",
    body: "A prioritized backlog across site, content, and authority, tied to the prompts you lose today.",
    kind: "image" as const,
    src: "/features/chatgpt/recommended-actions.webp",
    label: "Recommended actions backlog",
    mediaFirst: true,
  },
] as const;

export const auditFixSurfaces = [
  {
    title: "Site",
    body: "Crawlability, robots, schema, and entity clarity so models can learn clean facts.",
    src: "/metrics/aiCrawl.webp",
    label: "AI crawl and readiness signals",
  },
  {
    title: "Content",
    body: "Answer-shaped pages AI already expects: comparisons, FAQs, category explainers.",
    src: "/features/chatgpt/mention-frequency.webp",
    label: "Mention and content gap view",
  },
  {
    title: "Authority",
    body: "Third-party sources models already cite, and where your footprint is thin.",
    src: "/metrics/aiSources.webp",
    label: "Authority and citation footprint",
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
