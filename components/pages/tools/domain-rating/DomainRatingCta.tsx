"use client";

import Link from "next/link";
import posthog from "posthog-js";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

export function DomainRatingCta() {
  return (
    <section className="border-b bg-zinc-950 px-6 py-14 text-white md:px-12 md:py-20">
      <p className="text-sm font-medium text-[#7ea1ff]">This checker stays free</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        Want to know if AI mentions your brand?
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 text-balance">
        Domain Rating tells you about backlinks. Anny tells you whether
        ChatGPT, Gemini, and AI Mode talk about you — and which sites they
        cite.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <TalkToSalesButton
          size="lg"
          className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
          source="domain-rating-checker"
        />
        <Button
          size="lg"
          variant="outline"
          className="border-white/15 bg-transparent px-5 text-white hover:bg-white/5 hover:text-white"
          render={<Link href="/pricing" />}
          onClick={() =>
            posthog.capture("domain_rating_pricing_clicked", {
              source: "domain-rating-checker",
            })
          }
        >
          See pricing
        </Button>
      </div>
    </section>
  );
}
