import Hero from "@/components/Home/hero";
import Demo from "@/components/Home/demo";
import Metric from "@/components/Home/metric";
import TrackModelsThatMatter from "@/components/Home/trackModelsThatMatter";
import SearchIsShifting from "@/components/Home/searchisShifting";
import Faq from "@/components/faq";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { SITE_URL } from "@/lib/site";

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
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
    <div>
      <JsonLd data={faqJsonLd} />
      <Hero />
      <Demo />
      <Metric />
      <TrackModelsThatMatter />
      <SearchIsShifting />
      <Faq />
    </div>
  );
}
