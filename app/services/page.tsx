import ServicesHero from "@/components/pages/services/ServicesHero";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, pageMetadata, webpageJsonLd } from "@/lib/seo";
import ServicesNewEra from "@/components/pages/services/ServicesNewEra";
import ServicesAheadOfCurve from "@/components/pages/services/ServicesAheadOfCurve";

const title = "Services: Managed AI Visibility & GEO | Anny";
const description =
  "Managed GEO & AEO. Be the brand AI recommends when buyers ask who to trust.";
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
      <ServicesHero />
      <ServicesNewEra />
      <ServicesAheadOfCurve />
    </main>
  );
}
