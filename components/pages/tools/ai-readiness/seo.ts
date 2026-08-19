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
  "See how ready a website is for ChatGPT, Claude, and other AI agents. We check robots.txt, llms.txt, JSON-LD, and HTML semantics. Free, no signup.";

export const aiReadinessFaqs = [
  {
    question: "What is AI readiness?",
    answer:
      "How easy it is for AI crawlers and agents to fetch, name, and understand a site. That means crawl access, discovery files like llms.txt, structured data, and real HTML landmarks — not whether ChatGPT already mentions the brand.",
  },
  {
    question: "Is this the same as Anny’s AI visibility score?",
    answer:
      "No. This checker looks at on-site signals. Anny’s product tracks whether ChatGPT, Gemini, and other models mention a brand in answers. You can be technically ready and still invisible in AI search.",
  },
  {
    question: "What does a good score look like?",
    answer:
      "Under 30 is not ready, 30–49 is early, 50–69 is a workable baseline, 70–84 is ready, and 85+ is agent-native. Compare with sites in the same category — a brochure site and a SaaS app have different bars.",
  },
  {
    question: "Why does llms.txt returning HTML fail the check?",
    answer:
      "Many SPAs serve the app shell at every path. Agents need a real markdown or text file, not a 200 with <html>. Same for JSON skill indexes that come back as HTML.",
  },
  {
    question: "Does this replace a full AI readiness audit?",
    answer:
      "No. This is a fast public scan of the homepage and a handful of well-known files. A full Anny audit also covers automation, forms, alt text, internal linking, and citation work.",
  },
  {
    question: "Is the AI readiness checker free?",
    answer: "Yes. No account, no credit card. Paste a domain and read the score.",
  },
] as const;

export const aiReadinessHowTo = {
  name: "How to check AI readiness",
  description:
    "Scan any public website in a few seconds. You do not need an Anny account.",
  steps: [
    {
      name: "Enter a domain",
      text: "Paste something like example.com. A full URL is fine — we use the host.",
    },
    {
      name: "Run the scan",
      text: "We fetch the homepage, robots.txt, llms.txt, skill files, and schema.",
    },
    {
      name: "Read the score",
      text: "You get a 0–100 score, four category bars, and a pass/fail on each check.",
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
