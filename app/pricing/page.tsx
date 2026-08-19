import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import PricingAgency from "@/components/pages/product/PricingAgency";
import PricingFeatures from "@/components/pages/product/PricingFeatures";
import PricingHero from "@/components/pages/product/PricingHero";
import PricingTiers, {
  pricingTiers,
} from "@/components/pages/product/PricingTiers";
import { absoluteUrl, pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Pricing — Anny";
const description =
  "Anny plans for brands: Starter, Pro, and Advanced (custom). Agencies get heavily discounted multi-client pricing — talk to sales for a quote.";

export const metadata = pageMetadata({
  path: "/pricing",
  title,
  description,
});

function pricingOffers() {
  return pricingTiers.map((tier) => {
    const numericPrice = tier.price.replace(/[^0-9.]/g, "");
    return {
      "@type": "Offer",
      name: tier.name,
      description: tier.description,
      url: absoluteUrl(tier.href === "sales" ? "/pricing" : tier.href),
      ...(numericPrice
        ? { price: numericPrice, priceCurrency: "USD" }
        : {}),
    };
  });
}

export default function PricingPage() {
  return (
    <main>
      <JsonLd
        data={{
          ...webpageJsonLd({ path: "/pricing", title, description }),
          offers: pricingOffers(),
        }}
      />
      <PricingHero />
      <PatternStrip />
      <section id="plans" aria-label="Plans">
        <PricingTiers />
      </section>
      <PatternStrip />
      <PricingAgency />
      <PatternStrip />
      <PricingFeatures />
      <PatternStrip />
    </main>
  );
}
