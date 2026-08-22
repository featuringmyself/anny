import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  webpageJsonLd,
} from "@/lib/seo";

export const DR_CHECKER_PATH = "/tools/domain-rating-checker";
export const DR_CHECKER_URL = absoluteUrl(DR_CHECKER_PATH);

export const DR_CHECKER_TITLE = "Free Domain Rating Checker";
export const DR_CHECKER_DESCRIPTION =
  "Check any website’s Domain Rating for free. Paste a domain, get a 0–100 score. No signup.";

export const AHREFS_HOME_URL = "https://ahrefs.com/";

export const drCheckerFaqs = [
  {
    question: "What is Domain Rating?",
    answer:
      "Domain Rating (DR) is a 0–100 score for how strong a website’s backlinks are. It looks at how many other sites link to the domain and how strong those sites are — not traffic or Google rankings.",
  },
  {
    question: "Is this a real Domain Rating score?",
    answer:
      "Yes. The number comes from the public Domain Rating API — not Moz Domain Authority or a score Anny invented.",
  },
  {
    question: "What is a good Domain Rating?",
    answer:
      "As a rough guide: under 30 is early, 30–49 is growing, 50–69 is a solid established site, 70–89 is strong, and 90+ is rare. Still check a few competitors in the same space — a 40 can be plenty in a small niche.",
  },
  {
    question: "Is Domain Rating the same as Domain Authority?",
    answer:
      "No. Domain Authority (DA) is Moz’s metric. Domain Rating is a separate 0–100 backlink score. Don’t mix them in a report.",
  },
  {
    question: "Does Domain Rating decide whether ChatGPT cites a site?",
    answer:
      "No. DR is a backlink score. This tool only checks DR. Anny tracks whether ChatGPT, Gemini, and other models mention a brand.",
  },
  {
    question: "Is the Domain Rating checker free?",
    answer:
      "Yes. No account, no credit card. Paste a domain and read the score.",
  },
] as const;

export const drCheckerHowTo = {
  name: "How to check Domain Rating",
  description: "Look up any domain in a few seconds. No account needed.",
  steps: [
    {
      name: "Enter a domain",
      text: "Paste something like example.com. A full URL is fine — we use the domain.",
    },
    {
      name: "Check Domain Rating",
      text: "Submit the form. We’ll look up that site’s Domain Rating.",
    },
    {
      name: "Read the score",
      text: "The dial shows Domain Rating out of 100, plus rank when it’s available.",
    },
  ],
} as const;

function withoutContext<T extends { "@context": string }>(node: T) {
  const { "@context": _context, ...rest } = node;
  return rest;
}

export function drCheckerJsonLd() {
  const webpage = withoutContext(
    webpageJsonLd({
      path: DR_CHECKER_PATH,
      title: DR_CHECKER_TITLE,
      description: DR_CHECKER_DESCRIPTION,
    }),
  );
  const breadcrumb = withoutContext(
    breadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Domain Rating checker", path: DR_CHECKER_PATH },
    ]),
  );
  const faq = withoutContext(faqJsonLd(drCheckerFaqs));

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpage,
      {
        "@type": "WebApplication",
        "@id": `${DR_CHECKER_URL}#webapp`,
        name: "Free Domain Rating Checker",
        description: DR_CHECKER_DESCRIPTION,
        url: DR_CHECKER_URL,
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
        "@id": `${DR_CHECKER_URL}#howto`,
        name: drCheckerHowTo.name,
        description: drCheckerHowTo.description,
        url: DR_CHECKER_URL,
        step: drCheckerHowTo.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      },
    ],
  };
}
