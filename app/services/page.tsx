import JsonLd from "@/components/JsonLd";
import { servicesFaqs } from "@/components/pages/services/data";
import ServicesCta from "@/components/pages/services/ServicesCta";
import ServicesFaq from "@/components/pages/services/ServicesFaq";
import ServicesFeatures from "@/components/pages/services/ServicesFeatures";
import ServicesHero from "@/components/pages/services/ServicesHero";
import ServicesLogos from "@/components/pages/services/ServicesLogos";
import ServicesOutcomes from "@/components/pages/services/ServicesOutcomes";
import ServicesPlatforms from "@/components/pages/services/ServicesPlatforms";
import ServicesQuote from "@/components/pages/services/ServicesQuote";
import ServicesResults from "@/components/pages/services/ServicesResults";
import { absoluteUrl, faqJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Services — Managed AI Visibility & GEO | Anny";
const description =
  "Managed GEO & AEO end to end. You're in the answer when buyers ask AI who to trust.";
const ogImage = absoluteUrl("/services/og.webp");

export const metadata = pageMetadata({
  path: "/services",
  title,
  description,
  image: ogImage,
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={webpageJsonLd({
          path: "/services",
          title,
          description,
          image: ogImage,
        })}
      />
      <JsonLd data={faqJsonLd(servicesFaqs)} />
      <ServicesHero />
      <ServicesLogos />
      <ServicesOutcomes />
      <ServicesPlatforms />
      <ServicesQuote />
      <ServicesFeatures />
      <ServicesResults />
      <ServicesFaq />
      <ServicesCta />
    </main>
  );
}
