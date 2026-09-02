import type { StaticImageData } from "next/image";

import allAiGraph from "@/public/metrics/allAIGraph.webp";
import aiSources from "@/public/metrics/aiSources.webp";
import aiVisibility from "@/public/metrics/aiVisibility.webp";
import brandMonitor from "@/public/metrics/brandMonitor.webp";
import searchQueries from "@/public/metrics/searchQueries.webp";
import chatgptVisibility from "@/public/case-studies/winn-dixie/chatgpt-visibility.jpg";
import lifeProBsrRank from "@/public/case-studies/life-pro-fitness/bsr-rank.webp";

export const servicesCopy = {
  hero: {
    eyebrow: "Managed GEO & AEO",
    h1Lead: "Be the brand",
    h1Accent: "AI recommends.",
    sub: "Your buyers ask AI who to trust. We run GEO until you're the answer.",
  },
  logos: {
    label: "Trusted by marketing teams at",
  },
  outcomes: {
    h2: "Win AI search without adding headcount",
    sub: "A managed program for every stakeholder. We execute weekly, you get the outcomes.",
  },
  platforms: {
    h2: "Every engine shaping purchase decisions",
    sub: "We track and optimize how AI talks about you across every platform buyers use.",
  },
  quote: {
    stat: "50% of traditional search traffic will be replaced with generative AI by 2027.",
    prompt: "Will buyers find you?",
    source: "Source: Gartner",
  },
  features: {
    h2: "What we ship every week",
    sub: "Citation outreach, answer-ready content, and visibility reporting, executed by your dedicated team, not another dashboard.",
  },
  results: {
    h2: "Results you can put in a board deck",
    sub: "Real lift from brands that handed us the program and stopped guessing.",
  },
  cta: {
    h2: "Your category will have three names AI recommends.",
    sub: "We'll benchmark where you stand today, map a 90-day program, and show you exactly where competitors are winning.",
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
    title: "Your full GEO program: we run it",
    description:
      "Prompt mapping, citation building, weekly iteration across every engine. We own the work so your team doesn't babysit another tool.",
    bullets: [
      "Execute end-to-end GEO workflows on your behalf",
      "Track visibility across ChatGPT, Gemini, Perplexity, and 5+ engines",
      "Ship content and citations from weekly gap analysis",
      "Report what moved and what we're doing next",
    ],
    before: "Scattered tools. Nobody owns execution.",
    after: "One team runs GEO. Weekly reports on what moved.",
    metric: "50%",
    metricLabel: "less time your team spends tracking AI visibility",
    image: allAiGraph,
  },
  {
    id: "leadership",
    label: "Leadership",
    title: "Board-ready AI visibility without the lift",
    description:
      "Proof that AI search is a growth channel worth funding. We translate visibility into ROI metrics you can defend in every budget conversation.",
    bullets: [
      "Quantify ROI from visibility lift and citation growth",
      "Deliver executive briefs with share-of-voice benchmarks",
      "Flag competitive shifts on priority buyer prompts",
      "Turn data into clear investment decisions",
    ],
    before: "AI channel is a black box.",
    after: "Clear ROI on every dollar spent.",
    metric: "5×",
    metricLabel: "average visibility lift within 90 days",
    image: aiVisibility,
  },
  {
    id: "seo",
    label: "SEO",
    title: "Close the gap between Google rank and AI answers",
    description:
      "Ranking on Google doesn't mean models cite you. We optimize for how LLMs retrieve and recommend, and align SEO and GEO in one cadence.",
    bullets: [
      "Track brand mentions across every major LLM in your category",
      "Find the questions AI can't answer about you",
      "Monitor competitor citation share every week",
      "Run SEO and GEO as one managed program",
    ],
    before: "Rank on Google. Invisible to AI.",
    after: "Named in AI-generated answers.",
    metric: "2.5×",
    metricLabel: "increase in AI-referred organic traffic",
    image: searchQueries,
  },
  {
    id: "content",
    label: "Content",
    title: "Answer-ready content: written and published",
    description:
      "We map buyer prompts, write pages models retrieve and cite, and earn placements on the sources AI already trusts.",
    bullets: [
      "Audit content gaps against high-intent AI queries",
      "Write and publish answer-ready pages for you",
      "Run citation outreach to sources models trust",
      "Iterate as models update and new prompts emerge",
    ],
    before: "Great pages AI never cites.",
    after: "Primary source models recommend.",
    metric: "3×",
    metricLabel: "increase in AI content citation rate",
    image: aiSources,
  },
  {
    id: "brand",
    label: "Brand Marketing",
    title: "Own the narrative in AI answers",
    description:
      "When buyers ask AI about your category, competitors shouldn't be the default. We monitor mentions, sentiment, and share of voice, then act before the narrative shifts.",
    bullets: [
      "Monitor brand mentions and competitor citations daily",
      "Track share of voice on category-defining prompts",
      "Flag sentiment shifts before they spread",
      "Execute proactive reputation work in AI answers",
    ],
    before: "Competitors cited. You're invisible.",
    after: "Category leader in AI mentions.",
    metric: "32%",
    metricLabel: "share-of-voice gain in AI answers within 90 days",
    image: brandMonitor,
  },
];

export const featureCards = [
  {
    title: "Earn the citations ChatGPT already trusts",
    description:
      "We audit which sources models cite in your category, then run outreach and content work to earn those placements. You get named, not outranked by competitors.",
    image: aiSources,
    icon: "target" as const,
  },
  {
    title: "Close content gaps before competitors do",
    description:
      "We find the questions AI can't answer about you, write answer-ready pages, and publish them. No backlog in a spreadsheet. Shipped every week.",
    image: searchQueries,
    icon: "gap" as const,
  },
  {
    title: "Track every engine. Report what moved.",
    description:
      "Mentions, citations, and competitor shifts across ChatGPT, Gemini, Perplexity, and AI Overviews. A weekly brief: what changed, what we're executing next.",
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
      "We handed GEO to the team and stopped guessing. Visibility climbed 5× with month-over-month growth across every engine that influences grocery discovery, fully managed, no dashboards to babysit.",
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
      "They rebuilt our PDPs for Rufus interpretability and ran the program end to end. Best Seller Rank went from #7 to #2 in three weeks as Amazon surfaced us in more intent-driven recommendations.",
    name: "E-commerce leadership",
    title: "LifePro Fitness",
    image: lifeProBsrRank,
    alt: "Chart showing LifePro Fitness Best Sellers Rank improving from #7 to #2 over three weeks",
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
      "We run your entire AI search program: benchmarking how models talk about your brand, building citations, shipping answer-ready content, and reporting weekly. You get a dedicated team doing the work, not a dashboard to log into. Anny powers the data; our strategists run the playbook.",
  },
  {
    question: "How is this different from buying Anny and running it ourselves?",
    answer:
      "Anny is the intelligence layer. Managed service is the team that acts on it. Self-serve gives you visibility data; we map buyer prompts, publish content, run citation outreach, and iterate every week. Most teams don't have GEO headcount. This is that function, fully staffed and accountable to outcomes.",
  },
  {
    question: "How is this different from traditional SEO?",
    answer:
      "SEO fights for blue links. GEO fights for AI answers: whether models mention you, cite your sources, and recommend you over competitors. The signals overlap, but AI visibility needs prompt mapping, citation building, and answer-ready content that SEO audits miss. We run both in one program.",
  },
  {
    question: "What does the first 90 days look like?",
    answer:
      "Weeks 1–2: benchmark your visibility, competitors, and citation gaps across priority prompts. Weeks 3–8: ship content and earned-media work against the highest-impact gaps. Weeks 9–12: measure lift, expand to new personas and engines, and lock in a repeatable cadence.",
  },
  {
    question: "Which AI engines do you cover?",
    answer:
      "ChatGPT, Claude, Gemini, Perplexity, Grok, DeepSeek, Google AI Overviews, and AI Mode, tracked continuously and acted on by our team. As new models gain share in your category, we extend coverage. You don't manage the list; we do.",
  },
  {
    question: "How is pricing structured?",
    answer:
      "Scoped on a call based on category complexity, number of brands or markets, and content volume. We quote a monthly retainer with clear deliverables, with no published tiers and no surprise add-ons. Platform access is included.",
  },
  {
    question: "What results should we expect?",
    answer:
      "Most brands see measurable lift within 60–90 days: more mentions, more citations, better share of voice on priority prompts. Winn-Dixie hit 5× visibility growth; LifePro moved from #7 to #2 on Amazon in three weeks. Results compound when we run the program consistently, not as a one-off.",
  },
  {
    question: "Do we need a separate Anny subscription?",
    answer:
      "No. Platform access, dashboards, and exports are included. Anny powers the intelligence behind every deliverable; our team runs execution. One engagement, one team, one weekly report.",
  },
] as const;

export const SERVICES_OG_IMAGE = "/services/og.webp";
