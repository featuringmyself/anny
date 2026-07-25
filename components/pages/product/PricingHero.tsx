import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function PricingHero() {
  return (
    <section className="border-b px-8 py-16 md:px-12 md:py-20">
      <p className="text-sm font-medium tracking-wide text-[#2462ff]">Pricing</p>
      <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
        Plans that scale with your AI visibility work
      </h1>
      <p className="mt-4 max-w-lg text-lg text-zinc-500 text-balance">
        Start tracking how ChatGPT, Gemini, and AI Mode mention your brand. Upgrade when you need
        more prompts, seats, or white-label reporting.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" className="px-5" render={<Link href="/docs" />}>
          Talk to sales
        </Button>
        <Button size="lg" variant="outline" className="px-5" render={<Link href="/docs" />}>
          Read the docs
        </Button>
      </div>
    </section>
  );
}
