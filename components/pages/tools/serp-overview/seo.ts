import { SITE_NAME, SITE_URL } from "@/lib/site";
import { SERP_CHECKER_PATH } from "@/lib/serp-input";

export const SERP_CHECKER_URL = `${SITE_URL}${SERP_CHECKER_PATH}`;

export const SERP_CHECKER_TITLE = "Free Ahrefs SERP Overview Checker — Anny";
export const SERP_CHECKER_DESCRIPTION =
  "See Ahrefs’ SERP Overview for any keyword: organic results, paid ads, and SERP features, plus Domain Rating and URL Rating. No signup.";

export const serpCheckerFaqs = [
  {
    question: "What is Ahrefs SERP Overview?",
    answer:
      "SERP Overview is Ahrefs’ snapshot of a Google results page for a keyword in one country. It lists organic rankings, paid ads, and SERP features such as featured snippets, local packs, and knowledge panels — not a live Google query.",
  },
  {
    question: "Is this live Google?",
    answer:
      "No. Ahrefs recrawls SERPs on its own schedule. The date on each result is when Ahrefs last checked that keyword. Rankings can move between checks.",
  },
  {
    question: "What do Domain Rating and URL Rating mean here?",
    answer:
      "Domain Rating (DR) estimates the strength of the ranking site’s backlink profile on a 0–100 scale. URL Rating (UR) does the same for that specific page. Neither is a Google ranking factor by itself.",
  },
  {
    question: "Which SERP features are included?",
    answer:
      "Whatever Ahrefs recorded for that keyword: paid top and bottom, sitelinks, snippets, images, news, local pack, knowledge panel, People Also Ask, and other feature types the API returns. Organic is limited to the top 10.",
  },
  {
    question: "Does this show whether ChatGPT would cite a page?",
    answer:
      "No. This is classic Google SERP composition from Ahrefs. Anny tracks whether AI models mention a brand. High-DR pages often get cited, but a SERP rank is not an AI citation.",
  },
  {
    question: "Is the SERP Overview checker free?",
    answer:
      "Yes. No account and no Ahrefs login on this page. Paste a keyword, pick a country, and read the snapshot.",
  },
] as const;

export const serpCheckerHowTo = {
  name: "How to check a keyword’s SERP Overview",
  description:
    "Look up Ahrefs’ latest Google SERP snapshot for a keyword, including ads and SERP features.",
  steps: [
    {
      name: "Enter a keyword",
      text: "Type the query people search — a phrase, not a URL. Example: best crm.",
    },
    {
      name: "Pick a country",
      text: "Google results differ by market. Choose the country whose SERP you care about.",
    },
    {
      name: "Read the snapshot",
      text: "Paid, features, and organic are grouped. Each row shows title, URL, type, DR, UR, and when Ahrefs last checked.",
    },
  ],
} as const;

export function serpCheckerWebPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: SERP_CHECKER_TITLE,
    description: SERP_CHECKER_DESCRIPTION,
    url: SERP_CHECKER_URL,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "WebApplication",
      name: "Free SERP Overview Checker",
      url: SERP_CHECKER_URL,
    },
  };
}

export function serpCheckerAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free SERP Overview Checker",
    description: SERP_CHECKER_DESCRIPTION,
    url: SERP_CHECKER_URL,
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

export function serpCheckerBreadcrumbJsonLd() {
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
        name: "SERP Overview checker",
        item: SERP_CHECKER_URL,
      },
    ],
  };
}

export function serpCheckerFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: serpCheckerFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function serpCheckerHowToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: serpCheckerHowTo.name,
    description: serpCheckerHowTo.description,
    url: SERP_CHECKER_URL,
    step: serpCheckerHowTo.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}
