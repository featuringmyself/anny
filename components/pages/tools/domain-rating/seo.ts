import { SITE_NAME, SITE_URL } from "@/lib/site";

export const DR_CHECKER_PATH = "/tools/domain-rating-checker";
export const DR_CHECKER_URL = `${SITE_URL}${DR_CHECKER_PATH}`;

export const DR_CHECKER_TITLE = "Free Ahrefs Domain Rating Checker — Anny";
export const DR_CHECKER_DESCRIPTION =
  "Check any website’s Ahrefs Domain Rating (DR) for free. Paste a domain, get a 0–100 score. No signup, no Ahrefs login.";

export const drCheckerFaqs = [
  {
    question: "What is Domain Rating?",
    answer:
      "Domain Rating (DR) is an Ahrefs metric from 0 to 100 that estimates how strong a website’s backlink profile is. It is based on the quantity and quality of referring domains, not on traffic or Google rankings.",
  },
  {
    question: "Is this the same as Ahrefs Domain Rating?",
    answer:
      "Yes. This checker uses Ahrefs’ public Domain Rating API. The number you see is Ahrefs DR, not Moz Domain Authority, Semrush Authority Score, or a score Anny invented.",
  },
  {
    question: "What is a good Domain Rating?",
    answer:
      "There is no universal “good” DR. New sites often sit under 30. Established brands commonly land between 50 and 70. Scores above 70 usually take years of links. Compare against competitors in the same niche rather than chasing 90+.",
  },
  {
    question: "Is Domain Rating the same as Domain Authority?",
    answer:
      "No. Domain Authority (DA) is Moz’s metric. Domain Rating is Ahrefs’. They both try to describe link strength on a 0–100 scale, but they are calculated differently and should not be mixed in a report.",
  },
  {
    question: "Does Domain Rating decide whether ChatGPT cites a site?",
    answer:
      "No. DR is a backlink estimate. ChatGPT, Gemini, and other models choose sources from their own retrieval. High-DR sites appear often in citations, but a DR score is not an AI ranking factor. Anny tracks whether models mention a brand; this tool only checks DR.",
  },
  {
    question: "Is the Domain Rating checker free?",
    answer:
      "Yes. No account, no credit card, no lookup quota on this page. Paste a domain and read the score.",
  },
] as const;

export const drCheckerHowTo = {
  name: "How to check a website’s Domain Rating",
  description:
    "Look up Ahrefs Domain Rating for any domain in a few seconds, without an Ahrefs account.",
  steps: [
    {
      name: "Enter a domain",
      text: "Paste a hostname such as example.com. URLs with https:// or a path are fine — the checker normalizes them.",
    },
    {
      name: "Check the rating",
      text: "Submit the form. The page looks up Ahrefs Domain Rating for that host.",
    },
    {
      name: "Read the 0–100 score",
      text: "The dial shows Domain Rating out of 100, plus Ahrefs Rank when Ahrefs returns it.",
    },
  ],
} as const;

export function drCheckerWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: DR_CHECKER_TITLE,
    description: DR_CHECKER_DESCRIPTION,
    url: DR_CHECKER_URL,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "WebApplication",
      name: "Free Domain Rating Checker",
      url: DR_CHECKER_URL,
    },
  };
}

export function drCheckerAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Domain Rating Checker",
    description: DR_CHECKER_DESCRIPTION,
    url: DR_CHECKER_URL,
    applicationCategory: "BrowserApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    isPartOf: {
      "@type": "SoftwareApplication",
      name: SITE_NAME,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
    },
  };
}

export function drCheckerBreadcrumbJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Domain Rating checker",
        item: DR_CHECKER_URL,
      },
    ],
  };
}

export function drCheckerFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: drCheckerFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function drCheckerHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: drCheckerHowTo.name,
    description: drCheckerHowTo.description,
    url: DR_CHECKER_URL,
    step: drCheckerHowTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
