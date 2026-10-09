import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import {
  AUDIT_FIX_PRICING,
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_SURFACES,
  AUDIT_FIX_TURNAROUND,
  type AuditFixMarket,
} from "@/lib/audit-fix-pricing";

export const AUDIT_OFFER_NAME = "AI Visibility Intelligence Report";

/** Lead-form copy when CTAs open TalkToSales from /audit. */
export const AUDIT_TALK_TO_SALES_COPY = {
  title: `Get a ${AUDIT_OFFER_NAME}`,
  description: `Share your site, competitors, and market. We'll lock the ${AUDIT_FIX_PROMPTS}-prompt set and deliver the report in ${AUDIT_FIX_TURNAROUND}.`,
  messageLabel: "Brief notes",
  messagePlaceholder:
    "Competitors, market, or buyer prompts you already care about.",
  submitLabel: "Request an Audit",
  successTitle: "Thanks, we've got it",
  successDescription:
    "Someone from our team will confirm scope and start within one business day.",
} as const;

export const auditFixProof = [
  { value: String(AUDIT_FIX_PROMPTS), label: "Buyer prompts" },
  { value: "5", label: "AI engines" },
  { value: "1", label: "Full audit report" },
  { value: "5d", label: "Turnaround" },
] as const;

/** Three-beat story: the whole offer at a glance. */
export const auditFixStory = [
  {
    step: "01",
    title: "Buyers ask AI",
    body: "They ask who to buy from. The model answers with a shortlist.",
    kind: "image" as const,
    src: "/audits/sprentzo/01-best-pickleball-paddle-india.png",
    label: "Example ChatGPT shortlist naming competitors",
  },
  {
    step: "02",
    title: "Someone else gets named",
    body: "Competitors own the recommendation. You don't show up.",
    kind: "video" as const,
    src: "/services/videos/comparison.webm",
    label: "Competitor share of voice across AI engines",
  },
  {
    step: "03",
    title: "You get the playbook",
    body: "Why they win, why you don't, and the next pages and sources that move you onto the list.",
    kind: "image" as const,
    src: "/partnership/agencies/feature-action-plans.webp",
    label: "Prioritized change backlog from the Audit",
  },
] as const;

/** What is inside the report, shown with product media. */
export const auditFixShow = [
  {
    title: "Your score across engines",
    body: `Same ${AUDIT_FIX_PROMPTS} prompts across the major engines. Mention rate and position, side by side.`,
    kind: "video" as const,
    src: "/services/videos/brand-visibility.webm",
    label: "Brand visibility across AI engines",
    mediaFirst: false,
  },
  {
    title: "Who AI recommends instead",
    body: "The rivals that take your slot, and the prompts they win.",
    kind: "video" as const,
    src: "/services/videos/comparison.webm",
    label: "Competitor comparison across AI platforms",
    mediaFirst: true,
  },
  {
    title: "Why their pages get cited",
    body: "The content angles and strategy models reward in your category.",
    kind: "image" as const,
    src: "/features/chatgpt/mention-frequency.webp",
    label: "Mention and content gap view",
    mediaFirst: false,
  },
  {
    title: "Why yours don't",
    body: "Alignment gaps, missing answer shapes, and trust signals models skip when they read you.",
    kind: "image" as const,
    src: "/metrics/aiSources.webp",
    label: "AI citation sources",
    mediaFirst: true,
  },
  {
    title: "What to publish to close the gap",
    body: "The next pieces to ship, sources worth winning, and a ranked backlog across site, content, and authority.",
    kind: "image" as const,
    src: "/features/chatgpt/data-owned.webp",
    label: "Owned content types and publish recommendations",
    mediaFirst: false,
  },
] as const;

export const auditFixSurfaces = [
  {
    title: "Site",
    body: "Crawl, schema, entity clarity so models can learn clean facts about you.",
    src: "/metrics/aiCrawl.webp",
    label: "AI crawl and readiness signals",
  },
  {
    title: "Content",
    body: "Why current pages miss citations, which competitor angles win, and the next pieces that fill the gap.",
    src: "/features/chatgpt/mention-frequency.webp",
    label: "Mention and content gap view",
  },
  {
    title: "Authority",
    body: "Third-party sources models already cite, and which trust signals to capture next.",
    src: "/metrics/aiSources.webp",
    label: "Authority and citation footprint",
  },
] as const;

export const auditFixSteps = [
  {
    step: "01",
    title: "Share the brief",
    body: `Site, competitors, market. We lock the ${AUDIT_FIX_PROMPTS}-prompt set with you.`,
  },
  {
    step: "02",
    title: "Run the audit",
    body: `Live answers across ${AI_MODELS_PHRASE}, plus content and citation review.`,
  },
  {
    step: "03",
    title: "Build the plan",
    body: `Ranked fixes across ${AUDIT_FIX_SURFACES.join(", ").toLowerCase()}: pages to change, pieces to publish, sources to pursue.`,
  },
  {
    step: "04",
    title: "Deliver the report",
    body: `Evidence, scores, and the ordered backlog in ${AUDIT_FIX_TURNAROUND}.`,
  },
] as const;

/** Visible FAQ copy for one market only. Never mixes INR and USD. */
export function getAuditFixFaqs(market: AuditFixMarket) {
  const price = AUDIT_FIX_PRICING[market];

  return [
    {
      question: "What do I get?",
      answer: `A ${AUDIT_OFFER_NAME} is a dated standing across ${AI_MODELS_PHRASE} on ${AUDIT_FIX_PROMPTS} buyer prompts: who gets named, who wins instead, and the evidence behind each answer. You also get the full content and citation read, why your pages miss and theirs win, trust signals still open to you, the next pieces to publish, and a ranked backlog across site, content, and authority. Price is ${price.priceLabel} one-time for ${price.localeHint}.`,
    },
    {
      question: `How is ${AUDIT_OFFER_NAME} priced?`,
      answer: `One Audit is ${price.priceLabel} (${price.periodLabel}) for ${price.localeHint}. Same scope everywhere: ${AUDIT_FIX_PROMPTS} prompts, content and citation analysis, publish priorities, and a ranked backlog. Switch markets with the toggle in the pricing section if you bill from a different region.`,
    },
    {
      question: "How deep does the content audit go?",
      answer:
        "We review your live pages and the content strategy behind them. We explain why those pages fail to earn citations today, and why rival pages win the same prompts. We flag alignment issues between how buyers ask and how you answer, name the trust signals worth capturing next, and list the few content pieces that close the gap with competitors right now. This is a publish plan tied to evidence, not a vague theme list.",
    },
    {
      question: "What kinds of changes does the backlog cover?",
      answer:
        "Site work that blocks models from learning clean facts about you: crawl access, robots, discovery files like llms.txt, schema, and entity clarity. Content work: rewrites on pages that already exist, plus new answer-shaped pages for the prompts you lose. Authority work: the third-party sources models already cite in your category, and which ones are still open for you. Every item is ranked by impact so your team knows what to do first.",
    },
    {
      question: "How long does it take?",
      answer: `${AUDIT_FIX_TURNAROUND} once the brief and prompt set are locked. Scope is fixed at ${AUDIT_FIX_PROMPTS} prompts and the full content, citation, and authority analysis.`,
    },
    {
      question: "What do you need from us?",
      answer:
        "Site URL, competitors, market, and a shortlist of buyer prompts if you already have them. We can also propose the prompt set for your approval before the run.",
    },
    {
      question: "Which engines are included?",
      answer: `${AI_MODELS_PHRASE}. Same prompt set across engines so gaps are comparable, not hand-wavy. Continuous multi-engine monitoring and retainers live on the platform and managed services.`,
    },
    {
      question: "Who is this for?",
      answer:
        "Founders and marketing leads who want more than a score: why AI routes buyers to competitors, and the concrete content and authority moves that close the gap. Agencies that need white-label-only reports should use Snapshots instead.",
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
    answer: `India: ${AUDIT_FIX_PRICING.india.priceLabel} one-time. US and worldwide: ${AUDIT_FIX_PRICING.international.priceLabel} one-time. Same product across ${AI_MODELS_PHRASE}: standing, content and citation analysis, publish priorities, and a ranked backlog. Choose your market in the pricing section.`,
  },
] as const;
