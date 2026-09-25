"use client";

import { Check } from "lucide-react";

import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { cn } from "@/lib/utils";
import { SNAPSHOT_INCLUDED_PROMPTS } from "@/lib/snapshots-pricing";
import { useSnapshotMarket } from "./SnapshotMarketContext";

const INCLUDED = [
  `${SNAPSHOT_INCLUDED_PROMPTS} buyer prompts (you approve the set)`,
  "ChatGPT · Perplexity · Google AI Overviews",
  "Share of voice, citations, sentiment",
  "Website AI-readiness pass",
  "White-label PDF + read-only share link",
] as const;

/** Exactly one market’s price. Toggle updates pricing, CTA, and FAQ together. */
export default function StandingsPricing() {
  const { market, setMarket, pricing: active } = useSnapshotMarket();

  return (
    <section
      id="pricing"
      className="scroll-mt-24 w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="standings-pricing-heading"
    >
      <div className="mx-auto max-w-xl px-6 pt-16 text-center sm:pt-20">
        <h2
          id="standings-pricing-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {active.priceLabel} per Snapshot
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-neutral-200/90">
          One client brand. {SNAPSHOT_INCLUDED_PROMPTS} prompts. White-label PDF.
          Extra prompts {active.extraPromptLabel} each, confirmed before you pay.
        </p>

        <div
          className="mx-auto mt-8 flex max-w-sm rounded-xl p-1 ring-1 ring-white/15"
          style={{ backgroundColor: "#0c242b" }}
          role="group"
          aria-label="Pricing market"
        >
          {(
            [
              { id: "india" as const, label: "India" },
              { id: "international" as const, label: "US & worldwide" },
            ] as const
          ).map((option) => {
            const selected = market === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setMarket(option.id)}
                aria-pressed={selected}
                className={cn(
                  "flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
                  selected
                    ? "text-[#11333c]"
                    : "text-white/55 hover:text-white",
                )}
                style={selected ? { backgroundColor: brand.lime } : undefined}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-md px-6 pt-8 pb-16 sm:pb-20">
        <article
          key={market}
          className="flex flex-col rounded-2xl border p-7 text-left"
          style={{
            backgroundColor: brand.cream,
            borderColor: brand.ink,
            outline: `2px solid ${brand.lime}`,
          }}
        >
          <p
            className="text-sm font-bold tracking-wide uppercase"
            style={{ color: brand.tertiary }}
          >
            Dodox Snapshot
          </p>
          <p className="mt-1 text-sm font-medium" style={{ color: brand.body }}>
            {active.localeHint}
          </p>

          <div className="mt-5 flex items-end gap-2">
            <span
              className="text-5xl font-bold tracking-tight tabular-nums"
              style={{ color: brand.tertiary }}
            >
              {active.priceLabel}
            </span>
            <span className="pb-1.5 text-sm font-semibold text-zinc-500">
              per snapshot
            </span>
          </div>
          <p
            className="mt-2 text-sm font-medium"
            style={{ color: brand.bodyStrong }}
          >
            {SNAPSHOT_INCLUDED_PROMPTS} prompts included. {active.addOnLine}.
          </p>

          <ul className="mt-5 flex flex-col gap-2.5 border-t border-zinc-900/10 pt-5">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 text-sm font-medium text-zinc-800"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0"
                  style={{ color: brand.tertiary }}
                  strokeWidth={2.5}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          <TalkToSalesButton
            size="lg"
            className="mt-7 h-12 w-full cursor-pointer rounded-lg border border-zinc-900 bg-brand text-base font-semibold text-white hover:bg-emerald-50 hover:text-black"
            source={`standings-pricing-${market}`}
          >
            Order · {active.priceLabel}
          </TalkToSalesButton>
        </article>
      </div>
    </section>
  );
}
