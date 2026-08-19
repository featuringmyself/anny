"use client";

import Link from "next/link";
import posthog from "posthog-js";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

export function AiReadinessCta() {
  return (
    <section className="border-b bg-zinc-950 px-6 py-14 text-white md:px-12 md:py-20">
      <p className="text-sm font-medium text-[#9dffd4]">This checker is free</p>
      <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        On-site is the floor. Mentions are the score.
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 text-balance">
        Ship the snippets, then use Anny to see whether ChatGPT, Gemini, and AI
        Mode actually talk about the brand — and which pages they cite.
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
    </section>
  );
}
