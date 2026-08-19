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
  "Check any website’s Ahrefs Domain Rating for free. Paste a domain, get a 0–100 score. No signup, no Ahrefs login.";

export const AHREFS_HOME_URL = "https://ahrefs.com/";

export const drCheckerFaqs = [
  {
    question: "What is Domain Rating?",
    answer:
      "Domain Rating (DR) is Ahrefs’ score for how strong a website’s backlinks are, compared with other sites in Ahrefs’ index. It runs from 0 to 100. Ahrefs looks at how many unique websites link to the domain, how strong those sites are, and how widely they link out. It does not include traffic, spam, or domain age.",
  },
  {
    question: "Is this the same number as in Ahrefs?",
    answer:
      "Yes. This page looks up Ahrefs’ public Domain Rating API. You get Ahrefs DR — not Moz Domain Authority, Semrush Authority Score, or a score Anny made up.",
  },
  {
    question: "What is a good Domain Rating?",
    answer:
      "Ahrefs says you should not treat 30, 50, or 70 as “good” on its own. DR is relative. A score is useful if it is higher than, or close to, similar sites in your space. Check a few competitors with this tool and compare.",
  },
  {
    question: "Is Domain Rating the same as Domain Authority?",
    answer:
      "No. Domain Authority (DA) is Moz’s metric. Domain Rating is Ahrefs’. Both use a 0–100 scale, but they use different indexes and formulas, so the numbers will not match. Pick one and stick with it when you compare sites.",
  },
  {
    question: "Does a higher Domain Rating mean better Google rankings?",
    answer:
      "Not directly. Google does not use Ahrefs DR as a ranking factor. Ahrefs has found that DR often lines up with rankings, but that is a correlation, not proof. Use DR to compare link strength — then look at content, relevance, and the page itself.",
  },
  {
    question: "Why did my Domain Rating drop if I didn’t lose links?",
    answer:
      "Ahrefs explains this as a relative scale: if other sites gain a lot of links, scores can shift even when yours stayed the same. There is no DR 101, so some sites get pushed down as the index changes.",
  },
  {
    question: "Does Domain Rating affect whether ChatGPT mentions a brand?",
    answer:
      "This tool only checks Ahrefs Domain Rating. ChatGPT, Gemini, and other models pick sources their own way. If you want to know whether they mention your brand, Anny tracks that separately.",
  },
  {
    question: "Is this checker free?",
    answer:
      "Yes. No account, no credit card, and no lookup limit on this page. Paste a domain and read the score.",
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
