import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import PricingHero from "@/components/pages/product/PricingHero";
import PricingTiers from "@/components/pages/product/PricingTiers";
import PricingFeatures from "@/components/pages/product/PricingFeatures";

export const metadata: Metadata = {
  title: "Pricing — Anny",
  description:
    "Anny plans for AI search visibility: Starter, Growth, and Agency. Track ChatGPT, Gemini, and AI Mode mentions with clear feature checklists.",
};

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <PatternStrip />
      <PricingTiers />
      <PatternStrip />
      <PricingFeatures />
    </main>
  );
}
