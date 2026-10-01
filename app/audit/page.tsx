import { headers } from "next/headers";

import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import JsonLd from "@/components/JsonLd";
import AuditFixCta from "@/components/pages/audits/offer/AuditFixCta";
import AuditFixFaq from "@/components/pages/audits/offer/AuditFixFaq";
import AuditFixHero from "@/components/pages/audits/offer/AuditFixHero";
import AuditFixHow from "@/components/pages/audits/offer/AuditFixHow";
import AuditFixIncluded from "@/components/pages/audits/offer/AuditFixIncluded";
import AuditFixPricing from "@/components/pages/audits/offer/AuditFixPricing";
import AuditFixProblem from "@/components/pages/audits/offer/AuditFixProblem";
import AuditFixSurfaces from "@/components/pages/audits/offer/AuditFixSurfaces";
import { AuditFixMarketProvider } from "@/components/pages/audits/offer/AuditMarketContext";
import {
  AUDIT_OFFER_NAME,
  auditFixFaqsForSchema,
} from "@/components/pages/audits/offer/content";
import {
  AUDIT_FIX_PRICING,
  AUDIT_FIX_PROMPTS,
  detectAuditFixMarketFromHeaders,
} from "@/lib/audit-fix-pricing";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webpageJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PATH = "/audit";
/** Public launch of the Audit offer page. */
const DATE_PUBLISHED = "2026-10-01";
const DATE_MODIFIED = "2026-10-01";

const title = `${AUDIT_OFFER_NAME}: Why AI Doesn't Recommend You, and What to Change`;
const description = `AI visibility audit across ${AI_MODELS_PHRASE}. See why models skip you and what needs to change across site, content, and authority footprint. ₹4,999 India, $99 worldwide.`;

export const metadata = pageMetadata({
  path: PATH,
  title,
  description,
});

function auditOfferJsonLd() {
  const webpage = webpageJsonLd({
    path: PATH,
    title,
    description,
    datePublished: DATE_PUBLISHED,
    dateModified: DATE_MODIFIED,
  });
  const { "@context": _c1, ...webpageRest } = webpage;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: AUDIT_OFFER_NAME, path: PATH },
  ]);
  const { "@context": _c2, ...breadcrumbRest } = breadcrumb;

  const india = AUDIT_FIX_PRICING.india;
  const intl = AUDIT_FIX_PRICING.international;

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpageRest,
      breadcrumbRest,
      {
        "@type": ["Product", "Service"],
        "@id": `${absoluteUrl(PATH)}#product`,
        name: AUDIT_OFFER_NAME,
        description,
        brand: { "@type": "Brand", name: "Dodox" },
        provider: { "@id": `${SITE_URL}#organization` },
        url: absoluteUrl(PATH),
        category: "Generative Engine Optimization",
        offers: [
          {
            "@type": "Offer",
            name: `${AUDIT_OFFER_NAME}: India`,
            price: india.amount,
            priceCurrency: india.priceCurrency,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(PATH),
            description: `AI visibility audit across ${AI_MODELS_PHRASE} with a prioritized backlog across site, content, and authority. ${AUDIT_FIX_PROMPTS} prompts. India.`,
            eligibleRegion: { "@type": "Country", name: "IN" },
          },
          {
            "@type": "Offer",
            name: `${AUDIT_OFFER_NAME}: International`,
            price: intl.amount,
            priceCurrency: intl.priceCurrency,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(PATH),
            description: `AI visibility audit across ${AI_MODELS_PHRASE} with a prioritized backlog across site, content, and authority. ${AUDIT_FIX_PROMPTS} prompts. Worldwide.`,
            areaServed: { "@type": "Place", name: "Worldwide" },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
      },
    ],
  };
}

async function resolveMarket() {
  const h = await headers();
  return detectAuditFixMarketFromHeaders({
    country:
      h.get("x-vercel-ip-country") ??
      h.get("cf-ipcountry") ??
      h.get("x-country-code"),
    acceptLanguage: h.get("accept-language"),
  });
}

/**
 * Narrative:
 * 1. Hero + proof
 * 2. Problem / three answers
 * 3. What's included
 * 4. Three surfaces we change
 * 5. How it works
 * 6. Pricing
 * 7. Convert + FAQ
 */
export default async function AuditOfferPage() {
  const initialMarket = await resolveMarket();

  return (
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <JsonLd data={auditOfferJsonLd()} />
      <JsonLd data={faqJsonLd(auditFixFaqsForSchema)} />
      <AuditFixMarketProvider initialMarket={initialMarket}>
        <AuditFixHero />
        <AuditFixProblem />
        <AuditFixIncluded />
        <AuditFixSurfaces />
        <AuditFixHow />
        <AuditFixPricing />
        <AuditFixCta />
        <AuditFixFaq />
      </AuditFixMarketProvider>
    </main>
  );
}
