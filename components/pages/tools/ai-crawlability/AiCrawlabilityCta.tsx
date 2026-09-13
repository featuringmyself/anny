"use client";

import Link from "next/link";
import posthog from "posthog-js";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

export function AiCrawlabilityCta() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
      <div aria-hidden className="absolute inset-0 bg-[#0c0c0e]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(36,98,255,0.2),transparent_50%)]"
      />
      <div className="relative mx-auto max-w-5xl text-white">
        <p className="text-sm font-medium text-[#7ea1ff]">
          From crawl access to AI visibility
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Know when ChatGPT and other models mention your brand
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          Anny helps marketing teams monitor AI search mentions, sources, and
          competitors — so crawl fixes turn into measurable visibility.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TalkToSalesButton
            size="lg"
            className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            source="ai-crawlability-checker"
          />
          <Button
            size="lg"
            variant="outline"
            className="border-white/15 bg-transparent px-5 text-white hover:bg-white/5 hover:text-white"
            render={<Link href="/pricing" />}
            onClick={() =>
              posthog.capture("ai_crawlability_pricing_clicked", {
                source: "ai-crawlability-checker",
              })
            }
          >
            See pricing
          </Button>
        </div>
      </div>
    </section>
  );
}
