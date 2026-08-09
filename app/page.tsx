import Hero from "@/components/Home/hero";
import Demo from "@/components/Home/demo";
import Metric from "@/components/Home/metric";
import TrackModelsThatMatter from "@/components/Home/trackModelsThatMatter";
import SearchIsShifting from "@/components/Home/searchisShifting";
import Faq from "@/components/faq";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import {
  SITE_DATE_MODIFIED,
  SITE_DATE_PUBLISHED,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: `${SITE_NAME} - AI Search Visibility Monitoring`,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  datePublished: SITE_DATE_PUBLISHED,
  dateModified: SITE_DATE_MODIFIED,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  datePublished: SITE_DATE_PUBLISHED,
  dateModified: SITE_DATE_MODIFIED,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
  url: SITE_URL,
};

export default function Home() {
  return (
    <main>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <Hero />
      <Demo />
      <Metric />
      <TrackModelsThatMatter />
      <SearchIsShifting />
      <Faq />
    </main>
  );
}
