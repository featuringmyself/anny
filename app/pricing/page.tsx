import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import PricingAgency from "@/components/pages/product/PricingAgency";
import PricingFeatures from "@/components/pages/product/PricingFeatures";
import PricingHero from "@/components/pages/product/PricingHero";
import PricingTiers from "@/components/pages/product/PricingTiers";

export const metadata: Metadata = {
  title: "Pricing — Anny",
  description:
    "Anny plans for brands: Starter, Pro, and Advanced (custom). Agencies get heavily discounted multi-client pricing — talk to sales for a quote.",
};

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <PatternStrip />
      <div id="plans">
        <PricingTiers />
      </div>
      <PatternStrip />
      <PricingAgency />
      <PatternStrip />
      <PricingFeatures />
      <PatternStrip />
    </main>
  );
}
