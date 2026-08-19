import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  webpageJsonLd,
} from "@/lib/seo";

export const DR_CHECKER_PATH = "/tools/domain-rating-checker";
export const DR_CHECKER_URL = absoluteUrl(DR_CHECKER_PATH);

export const DR_CHECKER_TITLE = "Free Domain Rating Checker — Ahrefs DR";
export const DR_CHECKER_DESCRIPTION =
  "Check any website’s Ahrefs Domain Rating for free. Paste a domain, get a 0–100 DR score. No signup. This is Ahrefs DR, not Moz Domain Authority.";

export const AHREFS_HOME_URL = "https://ahrefs.com/";

export const drCheckerFaqs = [
  {
    question: "What is Domain Rating?",
    answer:
      "Domain Rating (DR) is Ahrefs’ score for how strong a website’s backlinks are, compared with other sites in Ahrefs’ index. It runs from 0 to 100. Ahrefs looks at how many unique websites link to the domain, how strong those sites are, and how widely they link out. It does not include traffic, spam, or domain age.",
  },
  {
    question: "How do I check a website’s Domain Rating?",
    answer:
      "Paste the domain in the box at the top of this page and click Check Domain Rating. You do not need an Ahrefs login. We look up Ahrefs’ public Domain Rating API and show the 0–100 score, plus Ahrefs Rank when they return it.",
  },
  {
    question: "Is this a Domain Authority checker?",
    answer:
      "No. This is a Domain Rating lookup. Domain Authority (DA) is Moz’s metric. Semrush has Authority Score. People often type “DA checker” or “website authority” when they want a quick strength number — this page only returns Ahrefs DR.",
  },
  {
    question: "What is a good Domain Rating?",
    answer:
      "As a rough guide: under 30 is early, 30–49 is growing, 50–69 is a solid established site, 70–89 is strong, and 90+ is rare (big publishers and platforms). Always check a few competitors too — a 40 can be plenty in a small niche, and a 60 can be average in a crowded one.",
  },
  {
    question: "How is DR different from Moz DA and Semrush Authority Score?",
    answer:
      "Ahrefs DR is backlink strength only. Moz DA is a machine-learning guess at ranking likelihood from Moz’s link data. Semrush Authority Score mixes links, estimated organic traffic, and spam checks. The numbers will not match. Pick one metric and use it consistently.",
  },
  {
    question: "How do I increase Domain Rating?",
    answer:
      "Ahrefs says DR rises when more unique websites send followed links to your domain. Extra links from the same site do not help. They also say chasing the score should not be the main goal — earn links from real, relevant pages to the URLs you want to rank.",
  },
  {
    question: "Does Domain Rating affect Google rankings?",
    answer:
      "No. Google does not use Ahrefs DR, Moz DA, or Semrush Authority Score. Ahrefs has found DR often lines up with rankings, but that is correlation, not proof. Use the score to compare link strength, then look at content and relevance.",
  },
  {
    question: "Why did my Domain Rating drop if I didn’t lose links?",
    answer:
      "Ahrefs explains this as a relative scale: if other sites gain a lot of links, scores can shift even when yours stayed the same. There is no DR 101, so some sites get pushed down as the index changes.",
  },
  {
    question: "Is this checker free?",
    answer:
      "Yes. No account, no credit card, and no lookup limit on this page. Paste a domain and read the score.",
  },
  {
    question: "Does this tell me if ChatGPT mentions a brand?",
    answer:
      "No. This tool only checks Ahrefs Domain Rating. If you want to know whether ChatGPT, Gemini, or AI Mode mention your brand, Anny tracks that separately.",
  },
] as const;

export const drCheckerHowTo = {
  name: "How to check Domain Rating",
  description:
    "Look up any domain in a few seconds. You do not need an Ahrefs account.",
  steps: [
    {
      name: "Enter a domain",
      text: "Paste something like example.com. A full URL is fine — we use the domain.",
    },
    {
      name: "Check Domain Rating",
      text: "Submit the form. We ask Ahrefs for that site’s Domain Rating.",
    },
    {
      name: "Read the score",
      text: "You’ll see a 0–100 Domain Rating. If Ahrefs also returns Ahrefs Rank, we show that too — it is a finer ranking of the same idea.",
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
        alternateName: [
          "DR Checker",
          "Ahrefs Domain Rating Checker",
          "Free Ahrefs DR Checker",
        ],
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
