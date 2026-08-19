import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  webpageJsonLd,
} from "@/lib/seo";

export const AI_READINESS_PATH = "/tools/ai-readiness-checker";
export const AI_READINESS_URL = absoluteUrl(AI_READINESS_PATH);

export const AI_READINESS_TITLE = "Free AI Readiness Checker";
export const AI_READINESS_DESCRIPTION =
  "See if ChatGPT can crawl and name a website. Get a 0–100 score plus copy-paste robots.txt, JSON-LD, and sitemap fixes. Free, no signup.";

export const aiReadinessFaqs = [
  {
    question: "What is AI readiness?",
    answer:
      "Whether AI crawlers can fetch the site and attach a brand to it. That means robots.txt for training, search, and live-answer bots; a clear title and description; and Organization structured data. It is not whether ChatGPT already mentions you.",
  },
  {
    question: "Is this the same as Anny’s AI visibility score?",
    answer:
      "No. This checker is on-site: can models reach and identify the domain. Anny tracks whether ChatGPT, Gemini, and other models actually mention the brand in answers. You can be technically ready and still invisible.",
  },
  {
    question: "Does missing llms.txt tank the score?",
    answer:
      "No. llms.txt and skill files are optional extras. They help coding agents. They are not a proven lever for ChatGPT or Perplexity rankings — we do not treat them as failures.",
  },
  {
    question: "What should I do with the snippets?",
    answer:
      "Copy them onto the live site: append the robots rules, paste JSON-LD in the homepage head, and point robots.txt at sitemap.xml. Then re-run the scan. After that, use Anny to see if models cite you.",
  },
  {
    question: "Does this replace a full audit?",
    answer:
      "No. This is a homepage-level scan with files you can paste today. A full Anny engagement also covers citation gaps, competitor prompts, and content that actually gets mentioned.",
  },
  {
    question: "Is the AI readiness checker free?",
    answer: "Yes. No account, no credit card. Paste a domain and copy the fixes.",
  },
] as const;

export const aiReadinessHowTo = {
  name: "How to check AI readiness",
  description:
    "Scan a public site, then copy the missing files. You do not need an Anny account.",
  steps: [
    {
      name: "Enter a domain",
      text: "Paste something like example.com. A full URL is fine — we use the host.",
    },
    {
      name: "Read the three questions",
      text: "Can AI fetch it, name it, and cite it? Optional agent files are scored separately.",
    },
    {
      name: "Copy the fixes",
      text: "Each gap includes a snippet — robots.txt rules, Organization JSON-LD, or a sitemap pointer.",
    },
  ],
} as const;

function withoutContext<T extends { "@context": string }>(node: T) {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function aiReadinessJsonLd() {
  const webpage = withoutContext(
    webpageJsonLd({
      path: AI_READINESS_PATH,
      title: AI_READINESS_TITLE,
      description: AI_READINESS_DESCRIPTION,
    }),
  );
  const breadcrumb = withoutContext(
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "AI readiness checker", path: AI_READINESS_PATH },
    ]),
  );
  const faq = withoutContext(faqJsonLd(aiReadinessFaqs));

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpage,
      {
        "@type": "WebApplication",
        "@id": `${AI_READINESS_URL}#webapp`,
        name: "Free AI Readiness Checker",
        description: AI_READINESS_DESCRIPTION,
        url: AI_READINESS_URL,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web",
        isAccessibleForFree: true,
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      },
      breadcrumb,
      faq,
      {
        "@type": "HowTo",
        "@id": `${AI_READINESS_URL}#howto`,
        name: aiReadinessHowTo.name,
        description: aiReadinessHowTo.description,
        url: AI_READINESS_URL,
        step: aiReadinessHowTo.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
    ],
  };
}
