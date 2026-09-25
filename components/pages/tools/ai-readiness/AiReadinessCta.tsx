"use client";

import Link from "next/link";
import posthog from "posthog-js";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

export function AiReadinessCta() {
  return (
    <section className="relative overflow-hidden px-6 py-16 md:px-10 md:py-24">
      <div aria-hidden className="absolute inset-0 bg-[#0c0c0e]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(36,98,255,0.22),transparent_50%),radial-gradient(ellipse_at_10%_90%,rgba(157,255,212,0.08),transparent_40%)]"
      />
      <div className="relative mx-auto max-w-5xl text-white">
        <p className="text-sm font-medium text-[#9dffd4]">
          Quick scan is free
        </p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Mentions are the real score
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          Use Dodox to see whether ChatGPT, Gemini, and AI Mode actually talk
          about the brand.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TalkToSalesButton
            size="lg"
            className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            source="ai-readiness-checker"
          />
          <Button
            size="lg"
            variant="outline"
            className="border-white/15 bg-transparent px-5 text-white hover:bg-white/5 hover:text-white"
            render={<Link href="/pricing" />}
            onClick={() =>
              posthog.capture("ai_readiness_pricing_clicked", {
                source: "ai-readiness-checker",
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
