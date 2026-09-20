import JsonLd from "@/components/JsonLd";
import PricingAgency from "@/components/pages/product/PricingAgency";
import PricingFeatures from "@/components/pages/product/PricingFeatures";
import PricingHero from "@/components/pages/product/PricingHero";
import PricingTiers from "@/components/pages/product/PricingTiers";
import { pricedOffers } from "@/lib/pricing";
import { absoluteUrl, pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Pricing · Anny";
const description =
  "AI agents from $150/mo: SEO & GEO Agent + Monitoring at $300 (includes Monitoring), AI Monitoring alone at $150. Managed services start at $250/mo.";

export const metadata = pageMetadata({
  path: "/pricing",
  title,
  description,
});

function pricingOffersJsonLd() {
  return pricedOffers().map((tier) => ({
    "@type": "Offer",
    name: tier.name,
    description: tier.description,
    url: absoluteUrl(tier.href),
    price: tier.price,
    priceCurrency: tier.priceCurrency,
  }));
}

export default function PricingPage() {
  return (
    <main className="flex flex-col gap-3 px-3 py-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <JsonLd
        data={{
          ...webpageJsonLd({ path: "/pricing", title, description }),
          offers: pricingOffersJsonLd(),
        }}
      />
      <PricingHero />
      <PricingTiers />
      <PricingAgency />
      <PricingFeatures />
    </main>
  );
}
