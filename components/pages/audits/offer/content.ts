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

/**
 * Report chapters shown as media, not copy.
 * `hero` is the dominant collage; `chapters` power the interactive gallery.
 */
export const auditFixReportHero = {
  src: "/audits/offer/report-platform-citation-pages.jpg",
  label:
    "Sample report pages: platform performance, prompt-by-prompt results, and who got cited instead",
  caption: "Platform scores · Prompt matrix · Who wins the citation",
} as const;

export const auditFixReportChapters = [
  {
    id: "visibility",
    title: "AI Visibility",
    tagline: "Mention rate, position, and share of voice by engine.",
    src: "/audits/offer/mwa-platform-snapshot.webp",
    label: "Platform snapshot with citation rates across ChatGPT, Claude, Perplexity, and Gemini",
  },
  {
    id: "competitive",
    title: "Competitive intel",
    tagline: "Who owns the shortlist, and by how much.",
    src: "/audits/offer/citations-competitive-dashboard.jpg",
    label: "Competitive citation breakdown with domain share and source types",
  },
  {
    id: "perception",
    title: "Brand perception",
    tagline: "How AI describes you when it does name you.",
    src: "/audits/offer/mwa-executive-summary.webp",
    label: "Executive summary scorecard with citation gap versus market leader",
  },
  {
    id: "citations",
    title: "Citations & sources",
    tagline: "Which URLs get pulled into answers, and why.",
    src: "/audits/offer/mwa-citation-testing.webp",
    label: "Prompt-by-prompt citation matrix across four AI platforms",
  },
  {
    id: "technical",
    title: "Technical audit",
    tagline: "Crawl, schema, entity clarity, discovery files.",
    src: "/audits/offer/mwa-technical-scorecard.webp",
    label: "Technical visibility scorecard for schema, crawlers, and E-E-A-T",
  },
  {
    id: "content",
    title: "Content gaps",
    tagline: "Missing topics, weak pages, comparison angles.",
    src: "/audits/offer/mwa-content-analysis.webp",
    label: "Page-level content analysis for AI citation readiness",
  },
  {
    id: "authority",
    title: "Authority",
    tagline: "Reviews, directories, and third-party trust signals.",
    src: "/audits/offer/mwa-eeat-signals.webp",
    label: "E-E-A-T and reputation signals that influence AI recommendations",
  },
  {
    id: "action",
    title: "Action plan",
    tagline: "Impact × effort, ranked. 30–60–90 day roadmap.",
    src: "/audits/offer/priority-impact-effort-matrix.png",
    label: "Priority impact and effort matrix for ranked fixes",
  },
  {
    id: "measure",
    title: "Measurement",
    tagline: "Baseline metrics and a repeatable tracking method.",
    src: "/audits/offer/profound-aei-dashboard-1.png",
    label: "Visibility score trend chart used for ongoing measurement",
  },
] as const;

/** Live answer evidence from real audits — proof, not mockups. */
export const auditFixEvidenceShots = [
  {
    src: "/audits/sprentzo/01-best-pickleball-paddle-india.png",
    label: "ChatGPT names competitors on a discovery prompt",
    caption: "Discovery prompt",
  },
  {
    src: "/audits/redacto/crisis-best-dpdpa-compliance-platform-india.png",
    label: "Shortlist without the audited brand",
    caption: "Missed shortlist",
  },
  {
    src: "/audits/linkrunner/crisis-linkrunner-review-netally.jpg",
    label: "Brand query returning the wrong entity",
    caption: "Wrong entity",
  },
] as const;

/** Secondary media strip under the chapter gallery. */
export const auditFixReportExtras = [
  {
    src: "/audits/offer/profound-aei-dashboard-3.png",
    label: "Competitor visibility matrix across platforms",
    caption: "Share of voice",
  },
  {
    src: "/audits/offer/mwa-performance-crawl.webp",
    label: "Page speed and AI crawler access findings",
    caption: "Crawl & speed",
  },
  {
    src: "/audits/offer/mwa-investment-next-steps.webp",
    label: "Investment case and projected ROI from closing the citation gap",
    caption: "Business case",
  },
  {
    src: "/features/chatgpt/recommended-actions.webp",
    label: "Ranked recommended actions with impact scores",
    caption: "Ranked fixes",
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
      answer: `A ${AUDIT_OFFER_NAME} is a dated standing across ${AI_MODELS_PHRASE} on ${AUDIT_FIX_PROMPTS} buyer prompts: who gets named, who wins instead, and the evidence behind each answer. You also get the full content and citation read, why your pages miss and theirs win, trust signals still open to you, the next pieces to publish, and a ranked backlog across site, content, and authority. Price is ${price.priceLabel} one-time for ${price.localeHint}. If you book implementation with us, the audit fee is credited toward that engagement.`,
    },
    {
      question: `How is ${AUDIT_OFFER_NAME} priced?`,
      answer: `One Audit is ${price.priceLabel} (${price.periodLabel}) for ${price.localeHint}. Same scope everywhere: ${AUDIT_FIX_PROMPTS} prompts, content and citation analysis, publish priorities, and a ranked backlog. Switch markets with the toggle in the pricing section if you bill from a different region. Book the implementation sprint and the audit fee adjusts into that engagement.`,
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
    answer: `India: ${AUDIT_FIX_PRICING.india.priceLabel} one-time. US and worldwide: ${AUDIT_FIX_PRICING.international.priceLabel} one-time. Same product across ${AI_MODELS_PHRASE}: standing, content and citation analysis, publish priorities, and a ranked backlog. Choose your market in the pricing section. Audit fee credits toward implementation if you book the sprint with us.`,
  },
] as const;
