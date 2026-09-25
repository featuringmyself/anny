import {
  SNAPSHOT_ENGINES,
  SNAPSHOT_INCLUDED_PROMPTS,
  SNAPSHOT_PRICING,
  type SnapshotMarket,
} from "@/lib/snapshots-pricing";

export const snapshotProof = [
  { value: "25", label: "Prompts per Snapshot" },
  { value: "3", label: "AI engines covered" },
  { value: "100%", label: "White-label delivery" },
  { value: "Minutes", label: "Typical turnaround" },
] as const;

export const snapshotIncluded = [
  {
    group: "AI standing",
    dek: "Where the brand shows up, and who beats it, across the engines clients ask about.",
    items: [
      {
        title: "Visibility by engine",
        body: `Comparable scores on ${SNAPSHOT_ENGINES.join(", ")} from the same prompt set, so you can say “ChatGPT yes, Overviews no” with numbers.`,
      },
      {
        title: "Share of voice",
        body: "Competitor rankings and the prompts where rivals get named instead of your client.",
      },
      {
        title: "Citations & sources",
        body: "Mention vs citation rate, average position when named, and the domains AI actually trusts.",
      },
      {
        title: "Sentiment & crises",
        body: "How the brand is described, with quoted phrases, plus wrong facts and brand-collision flags.",
      },
      {
        title: "Prompt evidence",
        body: `${SNAPSHOT_INCLUDED_PROMPTS} buyer prompts with answer excerpts and screenshots clients can verify in the room.`,
      },
    ],
  },
  {
    group: "Website readiness",
    dek: "The on-site pass so GEO recommendations aren’t blocked by crawl and schema basics.",
    items: [
      {
        title: "AI crawlability",
        body: "Allow/block status for GPTBot, ClaudeBot, PerplexityBot and peers, with copy-paste robots fixes.",
      },
      {
        title: "Discovery signals",
        body: "llms.txt, sitemaps, markdown twins, and structured data models can retrieve as facts.",
      },
      {
        title: "Schema & entity gaps",
        body: "Organization, FAQ, Offer, and entity clarity issues that keep answers inaccurate or empty.",
      },
      {
        title: "Quick wins backlog",
        body: "Impact × effort list your SEO or eng pod can ship without reinventing the audit.",
      },
    ],
  },
  {
    group: "Agency delivery",
    dek: "Packaged so account managers can send it the same day, under your brand.",
    items: [
      {
        title: "Full white-label",
        body: "Your logo, colors, and agency name on the PDF and share link. Nothing else on the glass or the client invoice.",
      },
      {
        title: "Executive summary",
        body: "One-page outcome for the kickoff or QBR; deep prompt tables underneath for strategists.",
      },
      {
        title: "Action outline",
        body: "Prioritized next moves so the Snapshot naturally upsells into retainer or sprint work.",
      },
      {
        title: "PDF + read-only link",
        body: "Print-ready PDF and a tokenized URL. Clients never need a login or workspace access.",
      },
    ],
  },
] as const;

export const snapshotCapabilities = [
  {
    title: "Standing score clients understand in one glance",
    body: "Lead the meeting with visibility by engine on an approved prompt set. Same methodology across ChatGPT, Perplexity, and AI Overviews, so gaps are comparable, not hand-wavy.",
    kind: "video" as const,
    src: "/services/videos/brand-visibility.webm",
    label: "Brand visibility across AI engines",
    mediaFirst: false,
  },
  {
    title: "Share of voice when a competitor owns the answer",
    body: "Show who AI recommends instead, prompt by prompt. The competitive chart is usually what converts a pitch or unlocks a GEO upsell on an existing SEO retainer.",
    kind: "video" as const,
    src: "/services/videos/comparison.webm",
    label: "Competitor comparison across AI platforms",
    mediaFirst: true,
  },
  {
    title: "Sources and citations, not just a mention rate",
    body: "Models often cite a page without naming the brand. Snapshots separate mention from citation and map the domains shaping answers, the brief your content and PR teams can actually work.",
    kind: "image" as const,
    src: "/metrics/aiSources.webp",
    mediaFirst: false,
  },
  {
    title: "Website readiness in the same deliverable",
    body: "Crawlability, schema, and discovery gaps live next to the AI standing. Agencies stop splitting “technical SEO audit” and “ChatGPT audit” into two PDFs and two invoices.",
    kind: "video" as const,
    src: "/services/videos/sentiment.webm",
    label: "Readiness and narrative signals",
    mediaFirst: true,
  },
] as const;

export const snapshotSteps = [
  {
    step: "01",
    title: "Send the brief",
    body: "Client site, competitors, market, and your agency branding. We reuse logo and colors across every Snapshot you order.",
  },
  {
    step: "02",
    title: "Lock the prompt set",
    body: `We propose a category-aware set of ${SNAPSHOT_INCLUDED_PROMPTS}, or you send yours. You approve before anything runs. Extra prompts are quoted as add-ons.`,
  },
  {
    step: "03",
    title: "We run the standing",
    body: "Live queries across ChatGPT, Perplexity, and Google AI Overviews, plus the website readiness pass, timestamped so the evidence stays frozen.",
  },
  {
    step: "04",
    title: "You deliver under your brand",
    body: "White-label PDF and read-only share link. Ready for the pitch deck, kickoff, or QBR without another brand on the page.",
  },
] as const;

export const snapshotPromptPaths = [
  {
    title: "We propose the set",
    body: `Category prompts from the client’s market and named competitors. You edit and approve the full ${SNAPSHOT_INCLUDED_PROMPTS} before the run, with no surprise queries on the invoice.`,
  },
  {
    title: "You supply the set",
    body: "Drop in the prompts your SEO, PR, or strategy team already tracks. We run exactly that list so the Snapshot matches the language you already sold the client.",
  },
] as const;

export const snapshotUseCases = [
  {
    title: "Pitch / new business",
    body: "Walk in with their gap chart under your logo. Prospects see the problem in their market, not a generic GEO slide.",
  },
  {
    title: "Kickoff baseline",
    body: "Freeze a dated standing at the start of a retainer so every monthly report has a before to compare against.",
  },
  {
    title: "QBR / upsell",
    body: "Bolt a Snapshot onto an existing SEO or PR retainer when the client asks “what about ChatGPT?”, without building a new service from scratch.",
  },
] as const;

/** Visible FAQ copy for one market only. Never mixes INR and USD. */
export function getSnapshotFaqs(market: SnapshotMarket) {
  const price = SNAPSHOT_PRICING[market];

  return [
    {
      question: "Will my clients see Dodox’s brand?",
      answer:
        "No. Snapshots are fully white-label. Your logo, colors, and agency name appear on the PDF and share link. Clients never see another product name on the report, and Dodox never appears on the invoice you send them.",
    },
    {
      question: "How is Snapshot priced?",
      answer: `One Snapshot is ${price.priceLabel} for ${price.localeHint} agencies. Same product, same engines, ${SNAPSHOT_INCLUDED_PROMPTS} prompts included. Extra prompts are ${price.extraPromptLabel} each and confirmed before you pay. Switch markets with the toggle in the pricing section if you bill from a different region.`,
    },
    {
      question: "What exactly is included in one Snapshot?",
      answer: `One branded standing for one client brand: visibility across ${SNAPSHOT_ENGINES.join(", ")}, share of voice vs competitors, ${SNAPSHOT_INCLUDED_PROMPTS} buyer prompts with answer evidence, citation and source map, sentiment and crisis flags, website AI-readiness (crawlability, robots, schema, discovery), executive summary, and an action outline. Delivered as a white-label PDF plus a read-only share link.`,
    },
    {
      question: "Who chooses the 25 prompts?",
      answer: `Either path works. We can propose a best-fit set from the client’s category and competitors, or you send the exact prompts your team already uses. You approve the list before the run. Extra prompts beyond 25 are billed at ${price.extraPromptLabel} each and confirmed before you pay.`,
    },
    {
      question: "How fast do we get the report?",
      answer:
        "Most Snapshots are ready the same day once branding and prompts are confirmed, often within minutes of the run finishing. Large add-on prompt sets or multi-market briefs may take longer; we flag that before you pay.",
    },
    {
      question: "Is this a live dashboard or a frozen snapshot?",
      answer:
        "A frozen, dated standing: the evidence clients can keep after the meeting. It does not silently rewrite itself later. For ongoing monitoring and weekly scorecards, step up to the agency platform; Snapshot is the one-shot baseline and pitch tool.",
    },
    {
      question: "Can we use Snapshots before the client has signed?",
      answer:
        "Yes. Agencies use them as pitch ammunition: show the prospect their gap under your brand, then convert into a retainer. Prospects do not need an account, and pitch work does not require opening your internal workspace to them.",
    },
    {
      question: "How should we think about accuracy?",
      answer:
        "We query the live engines on your approved prompt set and record mention, position, citations, and sentiment for that run. AI answers can shift day to day, which is why every Snapshot is timestamped. Treat it as a standing baseline and conversation starter, not a permanent ranking guarantee.",
    },
    {
      question: "Do clients need a login?",
      answer:
        "No. Share a read-only link or send the branded PDF. The link does not grant access to your agency workspace.",
    },
    {
      question: "What do agencies typically charge clients for this?",
      answer: `Kickoff standings commonly bill $1,500 to $4,000 (or local equivalent) as a one-time line item, then convert into a monthly visibility retainer. Your rate card is yours. Snapshot cost stays at ${price.priceLabel} so the margin stays with the agency.`,
    },
  ] as const;
}

/** Schema FAQ: both markets named once for crawlers; UI uses getSnapshotFaqs instead. */
export const snapshotFaqsForSchema = [
  ...getSnapshotFaqs("india").filter(
    (faq) => faq.question !== "How is Snapshot priced?",
  ),
  {
    question: "How is Snapshot priced?",
    answer:
      "India agencies: ₹500 per Snapshot. US and worldwide: $10 per Snapshot. Same product and 25 prompts. Extra prompts: ₹20 (India) or $0.40 (worldwide), confirmed before pay. Choose your market in the pricing section.",
  },
] as const;
