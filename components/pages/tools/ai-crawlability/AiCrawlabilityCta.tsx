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
          Crawl access is only the first step
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Get a managed plan to show up in ChatGPT, Perplexity, and AI Overviews
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          Dodox&apos;s GEO team builds the strategy, runs the work, and keeps
          auditing performance, so your brand doesn&apos;t just get crawled, it
          gets cited.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            render={<Link href="/services" />}
            onClick={() =>
              posthog.capture("ai_crawlability_services_clicked", {
                source: "ai-crawlability-checker",
              })
            }
          >
            Explore services
          </Button>
          <TalkToSalesButton
            size="lg"
            variant="outline"
            className="border-white/15 bg-transparent px-5 text-white hover:bg-white/5 hover:text-white"
            source="ai-crawlability-checker"
          />
        </div>
      </div>
    </section>
  );
}
