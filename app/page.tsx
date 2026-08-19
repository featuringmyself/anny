import Hero from "@/components/Home/hero";
import Demo from "@/components/Home/demo";
import Metric from "@/components/Home/metric";
import TrackModelsThatMatter from "@/components/Home/trackModelsThatMatter";
import SearchIsShifting from "@/components/Home/searchisShifting";
import Faq from "@/components/faq";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { faqJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";
import { SITE_DESCRIPTION } from "@/lib/site";

const title = "Anny - AI Search Visibility Monitoring";

export const metadata = pageMetadata({
  path: "/",
  title,
  description: SITE_DESCRIPTION,
});

export default function Home() {
  return (
    <main>
      <JsonLd
        data={webpageJsonLd({
          path: "/",
          title,
          description: SITE_DESCRIPTION,
        })}
      />
      <JsonLd data={faqJsonLd(faqs)} />
      <Hero />
      <Demo />
      <Metric />
      <TrackModelsThatMatter />
      <SearchIsShifting />
      <Faq />
    </main>
  );
}
