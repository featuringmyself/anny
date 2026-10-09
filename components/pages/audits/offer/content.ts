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
 * Report chapters for the finding viewer.
 * Desktop: full rail. Mobile: curated stack via `mobileHighlight`.
 */
export const auditFixReportChapters = [
  {
    id: "overview",
    title: "Overview",
    tagline: "Platform scores, prompt matrix, who wins.",
    kind: "image" as const,
    src: "/audits/offer/report-platform-citation-pages.jpg",
    label:
      "Sample report pages: platform performance, prompt-by-prompt results, and who got cited instead",
    mobileHighlight: true,
  },
  {
    id: "visibility",
    title: "Visibility",
    tagline: "Mention rate and share of voice by engine.",
    kind: "video" as const,
    src: "/services/videos/brand-visibility.webm",
    poster: "/audits/offer/mwa-platform-snapshot.webp",
    label: "Brand visibility standing across AI engines",
    mobileHighlight: true,
  },
  {
    id: "competitive",
    title: "Competitive",
    tagline: "Who owns the shortlist, and by how much.",
    kind: "video" as const,
    src: "/services/videos/comparison.webm",
    poster: "/audits/offer/citations-competitive-dashboard.jpg",
    label: "Competitive comparison across AI platforms",
    mobileHighlight: true,
  },
  {
    id: "perception",
    title: "Perception",
    tagline: "How AI describes you when it names you.",
    kind: "image" as const,
    src: "/audits/offer/mwa-executive-summary.webp",
    label: "Executive summary scorecard with citation gap versus market leader",
    mobileHighlight: false,
  },
  {
    id: "citations",
    title: "Citations",
    tagline: "Which URLs get pulled into answers.",
    kind: "image" as const,
    src: "/audits/offer/mwa-citation-testing.webp",
    label: "Prompt-by-prompt citation matrix across four AI platforms",
    mobileHighlight: true,
  },
  {
    id: "technical",
    title: "Technical",
    tagline: "Crawl, schema, entity clarity, discovery.",
    kind: "image" as const,
    src: "/audits/offer/mwa-technical-scorecard.webp",
    label: "Technical visibility scorecard for schema, crawlers, and E-E-A-T",
    mobileHighlight: false,
  },
  {
    id: "content",
    title: "Content",
    tagline: "Missing topics and comparison angles.",
    kind: "image" as const,
    src: "/audits/offer/mwa-content-analysis.webp",
    label: "Page-level content analysis for AI citation readiness",
    mobileHighlight: false,
  },
  {
    id: "authority",
    title: "Authority",
    tagline: "Reviews, directories, third-party trust.",
    kind: "image" as const,
    src: "/audits/offer/mwa-eeat-signals.webp",
    label: "E-E-A-T and reputation signals that influence AI recommendations",
    mobileHighlight: false,
  },
  {
    id: "action",
    title: "Action plan",
    tagline: "Impact × effort. 30–60–90 day roadmap.",
    kind: "image" as const,
    src: "/audits/offer/priority-impact-effort-matrix.png",
    label: "Priority impact and effort matrix for ranked fixes",
    mobileHighlight: true,
  },
  {
    id: "measure",
    title: "Measurement",
    tagline: "Baseline metrics you can track again.",
    kind: "video" as const,
    src: "/services/videos/benchmark.webm",
    poster: "/audits/offer/profound-aei-dashboard-1.png",
    label: "Benchmark and measurement dashboard for tracking progress",
    mobileHighlight: false,
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
      question: "What is in the report?",
      answer: `A full ${AUDIT_OFFER_NAME}: AI visibility across ${AI_MODELS_PHRASE}, competitive intelligence, brand perception, citation and source analysis, technical website audit, content gap analysis, authority and reputation audit, a prioritised action plan with a 30–60–90 day roadmap, and a measurement framework to track progress. Built from ${AUDIT_FIX_PROMPTS} buyer prompts with evidence for each finding.`,
    },
    {
      question: "What do I walk away with?",
      answer:
        "A clear picture of where your brand stands in AI answers, why competitors get recommended instead, what to fix, and how to prioritise the work. Scores, prompt-level proof, who wins each citation, and a ranked backlog, not a generic SEO checklist.",
    },
    {
      question: "How much does it cost?",
      answer: `${price.priceLabel} one-time for ${price.localeHint}. Same scope in every market: ${AUDIT_FIX_PROMPTS} prompts, full report chapters, and a prioritised backlog. Switch markets with the toggle in pricing if you bill from a different region.`,
    },
    {
      question: "Does the fee count toward implementation?",
      answer:
        "Yes. This is a standalone diagnostic. If you book us to implement the backlog, the audit fee is credited toward that engagement. Ongoing monitoring and retainers are separate.",
    },
    {
      question: "Which AI engines are tested?",
      answer: `${AI_MODELS_PHRASE}. Same prompt set on every engine so gaps are comparable. Continuous multi-engine monitoring lives on the platform and managed services, not in this report.`,
    },
    {
      question: "How long does it take?",
      answer: `${AUDIT_FIX_TURNAROUND} once the brief and prompt set are locked.`,
    },
    {
      question: "What do you need from us?",
      answer:
        "Site URL, main competitors, market, and buyer prompts if you already have them. We can propose the prompt set for your approval before we run.",
    },
    {
      question: "Who is this for?",
      answer:
        "Founders and marketing leads who need evidence for why AI skips them, and a concrete plan to get named. Agencies that need white-label-only snapshots should use Snapshots instead.",
    },
  ] as const;
}

/** Schema FAQ: both markets named once for crawlers; UI uses getAuditFixFaqs. */
export const auditFixFaqsForSchema = [
  ...getAuditFixFaqs("india").filter(
    (faq) => faq.question !== "How much does it cost?",
  ),
  {
    question: "How much does it cost?",
    answer: `India: ${AUDIT_FIX_PRICING.india.priceLabel} one-time. US and worldwide: ${AUDIT_FIX_PRICING.international.priceLabel} one-time. Same ${AUDIT_OFFER_NAME} across ${AI_MODELS_PHRASE}: visibility, competitive intel, perception, citations, technical audit, content gaps, authority, action plan, and measurement. Choose your market in the pricing section. Audit fee credits toward implementation if you book the sprint with us.`,
  },
] as const;
