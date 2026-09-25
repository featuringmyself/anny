import { headers } from "next/headers";

import JsonLd from "@/components/JsonLd";
import TrackModelsThatMatter from "@/components/Home/trackModelsThatMatter";
import StandingsCapabilities from "@/components/pages/standings/StandingsCapabilities";
import StandingsCta from "@/components/pages/standings/StandingsCta";
import StandingsFaq from "@/components/pages/standings/StandingsFaq";
import StandingsHero from "@/components/pages/standings/StandingsHero";
import StandingsHow from "@/components/pages/standings/StandingsHow";
import StandingsIncluded from "@/components/pages/standings/StandingsIncluded";
import StandingsPricing from "@/components/pages/standings/StandingsPricing";
import StandingsProblem from "@/components/pages/standings/StandingsProblem";
import StandingsPrompts from "@/components/pages/standings/StandingsPrompts";
import StandingsWhiteLabel from "@/components/pages/standings/StandingsWhiteLabel";
import { SnapshotMarketProvider } from "@/components/pages/standings/SnapshotMarketContext";
import { snapshotFaqsForSchema } from "@/components/pages/standings/content";
import {
  detectSnapshotMarketFromHeaders,
  SNAPSHOT_INCLUDED_PROMPTS,
  SNAPSHOT_PRICING,
} from "@/lib/snapshots-pricing";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webpageJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const PATH = "/standings";
const title = "Dodox Snapshots: White-Label AI Visibility Reports for Agencies";
const description =
  "White-label AI standing snapshots for agencies. Branded client reports across ChatGPT, Perplexity, and Google AI Overviews with visibility, share of voice, citations, and website readiness. ₹500 India, $10 worldwide.";

export const metadata = pageMetadata({
  path: PATH,
  title,
  description,
});

function standingsJsonLd() {
  const webpage = webpageJsonLd({
    path: PATH,
    title,
    description,
  });
  const { "@context": _c1, ...webpageRest } = webpage;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Snapshots", path: PATH },
  ]);
  const { "@context": _c2, ...breadcrumbRest } = breadcrumb;

  const india = SNAPSHOT_PRICING.india;
  const intl = SNAPSHOT_PRICING.international;

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpageRest,
      breadcrumbRest,
      {
        "@type": "Product",
        "@id": `${absoluteUrl(PATH)}#product`,
        name: "Dodox Snapshot",
        description,
        brand: { "@type": "Brand", name: "Dodox" },
        url: absoluteUrl(PATH),
        offers: [
          {
            "@type": "Offer",
            name: "Dodox Snapshot: India",
            price: india.amount,
            priceCurrency: india.priceCurrency,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(PATH),
            description: `White-label AI standing with ${SNAPSHOT_INCLUDED_PROMPTS} prompts. India.`,
            eligibleRegion: { "@type": "Country", name: "IN" },
          },
          {
            "@type": "Offer",
            name: "Dodox Snapshot: International",
            price: intl.amount,
            priceCurrency: intl.priceCurrency,
            availability: "https://schema.org/InStock",
            url: absoluteUrl(PATH),
            description: `White-label AI standing with ${SNAPSHOT_INCLUDED_PROMPTS} prompts. Worldwide.`,
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
  return detectSnapshotMarketFromHeaders({
    country:
      h.get("x-vercel-ip-country") ??
      h.get("cf-ipcountry") ??
      h.get("x-country-code"),
    acceptLanguage: h.get("accept-language"),
  });
}

/**
 * Narrative (homepage-grade progressive disclosure):
 * 1. Hero + proof
 * 2. Why agencies need it
 * 3. What’s included
 * 4. What it looks like (media)
 * 5. White-label
 * 6. How + prompts / use cases
 * 7. Pricing
 * 8. Coverage strip
 * 9. Convert + FAQ
 */
export default async function StandingsPage() {
  const initialMarket = await resolveMarket();

  return (
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <JsonLd data={standingsJsonLd()} />
      <JsonLd data={faqJsonLd(snapshotFaqsForSchema)} />
      <SnapshotMarketProvider initialMarket={initialMarket}>
        <StandingsHero />
        <StandingsProblem />
        <StandingsIncluded />
        <StandingsCapabilities />
        <StandingsWhiteLabel />
        <StandingsHow />
        <StandingsPrompts />
        <StandingsPricing />
        <TrackModelsThatMatter />
        <StandingsCta />
        <StandingsFaq />
      </SnapshotMarketProvider>
    </main>
  );
}
