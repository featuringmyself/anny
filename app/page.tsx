import ExploreStrip from "@/components/Home/exploreStrip";
import Hero from "@/components/Home/hero";
import HomeCta from "@/components/Home/homeCta";
import Metric from "@/components/Home/metric";
import Products from "@/components/Home/products";
import SearchIsShifting from "@/components/Home/searchisShifting";
import TrackModelsThatMatter from "@/components/Home/trackModelsThatMatter";
import Faq from "@/components/faq";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { faqJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";

const title = "Anny - SEO & GEO Agent + AI Monitoring";

export const metadata = pageMetadata({
  path: "/",
  title,
  description: SITE_DESCRIPTION,
});

/**
 * Narrative flow (progressive disclosure):
 * 1. Hero composition (brand + promise + product visual)
 * 2. Problem (why AI search matters)
 * 3. Capabilities (what you see)
 * 4. Coverage (trust)
 * 5. Offer (plans)
 * 6. Explore (optional depth)
 * 7. Convert
 * 8. FAQ
 */
export default function Home() {
  return (
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <JsonLd
        data={webpageJsonLd({
          path: "/",
          title,
          description: SITE_DESCRIPTION,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <SearchIsShifting />
      <Metric />
      <TrackModelsThatMatter />
      <Products />
      <ExploreStrip />
      <HomeCta />
      <Faq />
    </main>
  );
}
