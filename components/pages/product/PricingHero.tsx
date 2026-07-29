import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

export default function PricingHero() {
  return (
    <section className="border-b px-6 py-14 md:px-12 md:py-20">
      <p className="text-sm font-medium tracking-wide text-[#2462ff]">Pricing</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
        Pricing for brands
      </h1>
      <p className="mt-4 max-w-lg text-lg text-zinc-500 text-balance">
        Track how ChatGPT, Gemini, and AI Mode mention your brand. Agencies get heavily discounted
        multi-client pricing — talk to sales for a quote.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" className="px-5" render={<Link href="#plans" />}>
          See brand plans
        </Button>
        <TalkToSalesButton size="lg" variant="outline" className="px-5" source="pricing-hero">
          Agency? Talk to sales
        </TalkToSalesButton>
      </div>
    </section>
  );
}
