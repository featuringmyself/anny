import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  webpageJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const AI_CRAWL_PATH = "/tools/ai-crawlability-checker";
export const AI_CRAWL_URL = absoluteUrl(AI_CRAWL_PATH);

export const AI_CRAWL_TITLE = "Free AI Crawlability Checker";
export const AI_CRAWL_DESCRIPTION =
  "Check whether ChatGPT, Claude, Perplexity, and other AI crawlers can access your website. Free for marketing and SEO teams. No signup.";

/** Short definition for above-the-fold AEO extractability. */
export const AI_CRAWL_DEFINITION =
  "AI crawlability means whether AI systems can fetch your pages. That starts with robots.txt rules for bots like GPTBot, ClaudeBot, and PerplexityBot, plus discovery files like sitemap.xml and llms.txt.";

export const aiCrawlFaqs = [
  {
    question: "What is AI crawlability?",
    answer: AI_CRAWL_DEFINITION,
  },
  {
    question: "Which AI bots does this checker look at?",
    answer:
      "We check major crawlers from OpenAI, Anthropic, Perplexity, Google, Apple, Amazon, Meta, Common Crawl, Cohere, and ByteDance, including training, search, and live-answer user agents such as GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.",
  },
  {
    question: "Is this the same as the AI readiness checker?",
    answer:
      "No. This tool only answers whether AI bots can crawl the site. The free AI readiness checker at https://dodoxhq.com/tools/ai-readiness-checker also looks at brand identity, schema, and citation signals.",
  },
  {
    question: "If a bot is allowed, will ChatGPT cite my brand?",
    answer:
      "Not automatically. Crawl access is the first requirement. Citation still depends on whether models trust and retrieve your content. Dodox tracks whether ChatGPT and other models actually mention you.",
  },
  {
    question: "What if I have no robots.txt?",
    answer:
      "Most bots treat a missing robots.txt as allow-all. We still flag that as a gap, because crawlers lack an explicit map and you cannot signal AI-specific Allow rules.",
  },
  {
    question: "Is the AI crawlability checker free?",
    answer:
      "Yes. No account, no credit card. Paste a domain and see which AI crawlers are allowed or blocked.",
  },
] as const;

export const aiCrawlHowTo = {
  name: "How to check AI crawlability",
  description:
    "See which AI crawlers can access a site in a few seconds. Built for marketing and SEO teams.",
  steps: [
    {
      name: "Enter your domain",
      text: "Paste a domain like example.com. A full URL works too.",
    },
    {
      name: "Review crawler access",
      text: "We check robots.txt, sitemap.xml, llms.txt, and major AI bot rules.",
    },
    {
      name: "Apply the fixes",
      text: "Copy the recommended robots.txt updates for any blocked crawlers.",
    },
  ],
} as const;

function withoutContext<T extends { "@context": string }>(node: T) {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function aiCrawlJsonLd({
  includeEducational = true,
}: {
  includeEducational?: boolean;
} = {}) {
  const webpage = withoutContext(
    webpageJsonLd({
      path: AI_CRAWL_PATH,
      title: AI_CRAWL_TITLE,
      description: AI_CRAWL_DESCRIPTION,
    }),
  );
  const breadcrumb = withoutContext(
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Tools", path: "/tools" },
      { name: "AI crawlability checker", path: AI_CRAWL_PATH },
    ]),
  );

  const webapp = {
    "@type": "WebApplication",
    "@id": `${AI_CRAWL_URL}#webapp`,
    name: "Free AI Crawlability Checker",
    description: AI_CRAWL_DESCRIPTION,
    url: AI_CRAWL_URL,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    provider: { "@id": `${SITE_URL}#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const graph: Record<string, unknown>[] = [
    {
      ...webpage,
      mainEntity: { "@id": `${AI_CRAWL_URL}#webapp` },
    },
    webapp,
    breadcrumb,
  ];

  if (includeEducational) {
    graph.push(withoutContext(faqJsonLd(aiCrawlFaqs)));
    graph.push({
      "@type": "HowTo",
      "@id": `${AI_CRAWL_URL}#howto`,
      name: aiCrawlHowTo.name,
      description: aiCrawlHowTo.description,
      url: AI_CRAWL_URL,
      step: aiCrawlHowTo.steps.map((step, index) => ({
        "@type": "HowToStep",
        position: index + 1,
        name: step.name,
        text: step.text,
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
