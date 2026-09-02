import type { StaticImageData } from "next/image";

import allAiGraph from "@/public/metrics/allAIGraph.webp";
import aiSources from "@/public/metrics/aiSources.webp";
import aiVisibility from "@/public/metrics/aiVisibility.webp";
import brandMonitor from "@/public/metrics/brandMonitor.webp";
import searchQueries from "@/public/metrics/searchQueries.webp";
import chatgptVisibility from "@/public/case-studies/winn-dixie/chatgpt-visibility.jpg";

export const servicesCopy = {
  hero: {
    eyebrow: "Managed GEO & AEO",
    h1Lead: "Be the brand",
    h1Accent: "AI recommends.",
    sub: "We run GEO end to end. You're in the answer when buyers ask AI who to trust.",
  },
  logos: {
    label: "Trusted by marketing teams at",
  },
  outcomes: {
    h2: "How teams win on AI search with Anny",
    sub: "Every stakeholder gets a managed program built for their role — we execute the work, you get the outcomes.",
  },
  platforms: {
    h2: "Every engine that influences purchase decisions",
    sub: "Control how AI perceives your brand across the platforms buyers use today.",
  },
  quote: {
    stat: "50% of traditional search traffic will be replaced with generative AI by 2028.",
    prompt: "Is your brand ready?",
    source: "Source: Gartner",
  },
  features: {
    h2: "What we deliver for you",
    sub: "Find the sources AI trusts, close the content gaps costing you citations, and get weekly proof it's working — all run by your dedicated team.",
  },
  results: {
    h2: "Proven across industries, trusted by leaders",
    sub: "Metric-forward outcomes from brands that handed us the program and watched AI visibility compound.",
  },
  cta: {
    h2: "Ready to lead on AI search?",
    sub: "We'll benchmark your AI visibility, map a 90-day managed program, and show you exactly where you're losing to competitors.",
    footer: "A Dodox Studio company",
  },
} as const;

export const clientLogos = [
  "Northwind Analytics",
  "Brightpath Health",
  "Meridian Commerce",
  "Vantage Operations",
  "Kestrel Supply Co.",
  "Harborline Finance",
  "Alloy Works",
  "Summit Ridge Labs",
  "Lattice Dynamics",
  "Clearview Partners",
  "Ironwood Industrial",
  "NovaStack Systems",
] as const;

export type OutcomeTab = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: readonly string[];
  before: string;
  after: string;
  metric: string;
  metricLabel: string;
  image: StaticImageData;
};

export const outcomeTabs: OutcomeTab[] = [
  {
    id: "geo",
    label: "GEO / AEO",
    title: "Your GEO & AEO command center — fully managed",
    description:
      "The complete program for teams that need AI search wins, not another dashboard to babysit. We own and execute your entire AI search strategy — prompt mapping, citation building, and weekly iteration across every engine.",
    bullets: [
      "Run end-to-end GEO workflows on your behalf",
      "Track AI visibility across ChatGPT, Gemini, Perplexity, and 5+ engines",
      "Ship content and citation work from weekly gap analysis",
      "Deliver reporting with clear next actions every week",
    ],
    before: "Scattered tools, manual tracking, no one owning the work",
    after: "One managed program with weekly proof of progress",
    metric: "50%",
    metricLabel: "reduction in time your team spends on AI visibility tracking",
    image: allAiGraph,
  },
  {
    id: "leadership",
    label: "Leadership",
    title: "Executive visibility reporting — without the overhead",
    description:
      "Strategic proof that AI search is a growth channel worth funding. We deliver executive-level insights so you can defend budget, track ROI, and steer investment with confidence.",
    bullets: [
      "Quantify ROI from AI visibility lift and citation growth",
      "Deliver board-ready briefs with share-of-voice benchmarks",
      "Summarize competitive shifts across priority buyer prompts",
      "Translate visibility data into investment decisions",
    ],
    before: "No line of sight into the AI channel",
    after: "Clear ROI metrics for AI search investment",
    metric: "5×",
    metricLabel: "average visibility lift within 90 days",
    image: aiVisibility,
  },
  {
    id: "seo",
    label: "SEO",
    title: "AI search optimization — we close the SEO gap",
    description:
      "Ranking on Google doesn't guarantee AI answer share. We optimize for how models retrieve and cite — mapping prompts, fixing gaps, and aligning your search program with generative discovery.",
    bullets: [
      "Track brand mentions across every major LLM in your category",
      "Identify the questions AI can't answer about your business",
      "Monitor competitor AI visibility and citation share weekly",
      "Align SEO and GEO in one managed operating cadence",
    ],
    before: "Invisible when buyers ask AI for recommendations",
    after: "Top positions in AI-generated answers",
    metric: "2.5×",
    metricLabel: "increase in AI-referred organic traffic",
    image: searchQueries,
  },
  {
    id: "content",
    label: "Content",
    title: "Citation and content program — published for you",
    description:
      "Content that models retrieve, cite, and recommend. We map buyer prompts, write answer-ready pages, and earn the sources AI trusts — so you're the brand named in the answer.",
    bullets: [
      "Analyze content gaps against high-intent AI queries",
      "Write and publish answer-ready pages on your behalf",
      "Run citation outreach to the sources models already trust",
      "Iterate as models update and new prompts emerge",
    ],
    before: "Great content that AI never cites",
    after: "Primary source models pull from and recommend",
    metric: "3×",
    metricLabel: "increase in AI content citation rate",
    image: aiSources,
  },
  {
    id: "brand",
    label: "Brand Marketing",
    title: "Brand presence in AI answers — we protect the narrative",
    description:
      "When buyers ask AI about your category, competitors shouldn't be the default. We monitor mentions, sentiment, and share of voice across every engine — and act before the narrative shifts against you.",
    bullets: [
      "Monitor brand mentions and competitor citations in real time",
      "Track share of voice on category-defining buyer prompts",
      "Flag sentiment shifts and narrative risks before they spread",
      "Execute proactive reputation work in AI-generated answers",
    ],
    before: "Competitors cited while you're unknown to AI",
    after: "Category leader in AI mentions and recommendations",
    metric: "32%",
    metricLabel: "share-of-voice gain in AI answers within 90 days",
    image: brandMonitor,
  },
];

export const featureCards = [
  {
    title: "Pinpoint the sites ChatGPT cites in your category",
    description:
      "We audit which sources models trust when buyers ask about you — then run outreach and content work to earn those placements. You're in the answer, not watching competitors get cited instead.",
    image: aiSources,
    icon: "target" as const,
  },
  {
    title: "Identify content gaps and take action",
    description:
      "We find the questions AI can't answer about your business, then write and ship answer-ready pages until you're the brand models name. No backlog sitting in a spreadsheet — we publish.",
    image: searchQueries,
    icon: "gap" as const,
  },
  {
    title: "Monitor every engine and report what moved",
    description:
      "We track mentions, citations, and competitor shifts across ChatGPT, Gemini, Perplexity, and AI Overviews. You get a weekly brief with what changed and what we're executing next.",
    image: brandMonitor,
    icon: "monitor" as const,
  },
] as const;

export type ResultCard = {
  slug: string;
  company: string;
  category: string;
  metric: string;
  metricLabel: string;
  quote: string;
  name: string;
  title: string;
  image?: StaticImageData;
  alt?: string;
};

export const resultCards: ResultCard[] = [
  {
    slug: "winn-dixie",
    company: "Winn-Dixie",
    category: "Retail · Grocery",
    metric: "5×",
    metricLabel: "AI visibility lift",
    quote:
      "We handed GEO to Anny's team and stopped guessing. ChatGPT visibility climbed 5× with consistent month-over-month growth across every engine that influences grocery discovery — managed end to end.",
    name: "Marketing leadership",
    title: "Winn-Dixie",
    image: chatgptVisibility,
    alt: "Line chart of Winn-Dixie ChatGPT and Perplexity visibility scores rising from April to August",
  },
  {
    slug: "life-pro-fitness",
    company: "LifePro Fitness",
    category: "Retail · Home fitness",
    metric: "#7 → #2",
    metricLabel: "Best Sellers Rank on Amazon",
    quote:
      "Anny rebuilt our PDPs for Rufus interpretability and ran the optimization program. Best Seller Rank moved from #7 to #2 in three weeks as Amazon surfaced us in more intent-driven recommendations.",
    name: "E-commerce leadership",
    title: "LifePro Fitness",
  },
];

export const platformLogos = [
  { name: "ChatGPT", src: "/trackModel/openai-logo.svg" },
  { name: "Claude", src: "/trackModel/claude-logo.svg" },
  { name: "Gemini", src: "/trackModel/gemini-logo.svg" },
  { name: "DeepSeek", src: "/trackModel/deepseek-logo.svg" },
  { name: "Grok", src: "/trackModel/grok-logo.svg" },
  { name: "Perplexity", src: "/trackModel/perplexity-logo.svg" },
  { name: "AI Overviews", src: "/trackModel/ai_overview-logo.svg" },
  { name: "AI Mode", src: "/trackModel/ai_mode-logo.svg" },
] as const;

export const servicesFaqs = [
  {
    question: "What is a managed GEO / AEO program?",
    answer:
      "We run your generative engine optimization program end to end — benchmarking how AI models talk about your brand, building citations and answer-ready content, and reporting weekly. You get a dedicated team executing the work, not another dashboard to babysit. Anny powers the intelligence; our strategists run the playbook.",
  },
  {
    question: "How is this different from buying Anny and running it ourselves?",
    answer:
      "Anny is the platform; managed service is the team. Self-serve gives you data and workflows — we bring strategists who map buyer prompts, ship content, run citation outreach, and iterate every week. Most marketing teams don't have GEO headcount. This is that function, fully staffed and accountable to outcomes.",
  },
  {
    question: "How is this different from traditional SEO?",
    answer:
      "SEO fights for blue links. GEO fights for AI answers — whether models mention you, cite your sources, and recommend you over competitors. The signals overlap, but AI visibility requires prompt mapping, citation building, and answer-ready content that classic SEO audits don't cover. We handle both in one managed program.",
  },
  {
    question: "What does the first 90 days look like?",
    answer:
      "Weeks 1–2: we benchmark your visibility, competitors, and citation gaps across priority prompts. Weeks 3–8: we ship content and earned-media work against the highest-impact gaps. Weeks 9–12: we measure lift, expand to new personas and engines, and lock in a repeatable operating cadence you can scale.",
  },
  {
    question: "Which AI engines do you cover?",
    answer:
      "ChatGPT, Claude, Gemini, Perplexity, Grok, DeepSeek, Google AI Overviews, and AI Mode — tracked continuously in Anny and acted on by our team. As new models gain share in your category, we extend coverage. You don't manage the list; we do.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Every program is scoped on a call based on your category complexity, number of brands or markets, and how much content and outreach you need. We quote a monthly retainer with clear deliverables — no published tiers, no surprise add-ons. Platform access is included.",
  },
  {
    question: "What results should we expect?",
    answer:
      "Most brands see measurable visibility lift within 60–90 days — more mentions, more citations, better share of voice on priority prompts. Winn-Dixie hit a 5× visibility increase; LifePro moved from #7 to #2 on Amazon after PDP optimization. Results compound when we run the program consistently, not as a one-off project.",
  },
  {
    question: "Do we need a separate Anny subscription?",
    answer:
      "No. Platform access, dashboards, and exports are included in your managed program. Anny powers the intelligence behind every deliverable; our team runs the execution. One engagement, one team, one weekly report.",
  },
] as const;

export const SERVICES_OG_IMAGE = "/services/og.webp";
