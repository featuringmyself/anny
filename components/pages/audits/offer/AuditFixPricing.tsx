"use client";

import { Check } from "lucide-react";

import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import { cn } from "@/lib/utils";
import {
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_TURNAROUND,
} from "@/lib/audit-fix-pricing";
import AuditCheckoutButton from "./AuditCheckoutButton";
import { AUDIT_OFFER_NAME } from "./content";
import { useAuditFixMarket } from "./AuditMarketContext";

const INCLUDED = [
  `${AUDIT_FIX_PROMPTS} buyer prompts across major AI engines`,
  "Visibility score + who wins instead",
  "Why competitor content gets cited",
  "Why yours doesn't, and what to publish next",
  "Sources and trust signals worth winning",
  "Ranked backlog for site, content, and authority",
  "Audit fee credited if you book implementation",
] as const;

export default function AuditFixPricing() {
  const { market, setMarket, pricing: active } = useAuditFixMarket();

  return (
    <section
      id="pricing"
      className="scroll-mt-24 w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="audit-offer-pricing-heading"
    >
      <div className="mx-auto max-w-xl px-4 pt-8 text-center sm:px-6 sm:pt-20">
        <h2
          id="audit-offer-pricing-heading"
          className="text-2xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {active.priceLabel} one-time
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[13px] font-medium leading-snug text-neutral-200/90 sm:mt-4 sm:text-base sm:leading-relaxed">
          {AUDIT_FIX_PROMPTS} prompts across {AI_MODELS_PHRASE}. Typical
          turnaround {AUDIT_FIX_TURNAROUND} once prompts are locked.
        </p>

        <div
          className="mx-auto mt-4 flex max-w-sm rounded-xl p-1 ring-1 ring-white/15 sm:mt-8"
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
                  "flex-1 cursor-pointer rounded-lg px-3 py-2 text-sm font-semibold transition-colors sm:py-2.5",
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

      <div className="mx-auto max-w-md px-4 pt-4 pb-8 sm:px-6 sm:pt-8 sm:pb-20">
        <article
          key={market}
          className="flex flex-col rounded-xl border p-4 text-left sm:rounded-2xl sm:p-7"
          style={{
            backgroundColor: brand.cream,
            borderColor: brand.ink,
            outline: `2px solid ${brand.lime}`,
          }}
        >
          <p
            className="text-xs font-bold tracking-wide uppercase sm:text-sm"
            style={{ color: brand.tertiary }}
          >
            {AUDIT_OFFER_NAME}
          </p>
          <p
            className="mt-0.5 text-xs font-medium sm:mt-1 sm:text-sm"
            style={{ color: brand.body }}
          >
            {active.localeHint}
          </p>

          <div className="mt-3 flex items-end gap-2 sm:mt-5">
            <span
              className="text-3xl font-bold tracking-tight tabular-nums sm:text-5xl"
              style={{ color: brand.tertiary }}
            >
              {active.priceLabel}
            </span>
            <span className="pb-1 text-xs font-semibold text-zinc-500 sm:pb-1.5 sm:text-sm">
              one-time
            </span>
          </div>
          <p
            className="mt-1.5 text-[13px] font-medium leading-snug sm:mt-2 sm:text-sm sm:leading-normal"
            style={{ color: brand.bodyStrong }}
          >
            AI visibility audit + prioritized change backlog. Fee adjusts into
            implementation if you book the sprint.
          </p>

          <ul className="mt-3.5 flex flex-col gap-1.5 border-t border-zinc-900/10 pt-3.5 sm:mt-5 sm:gap-2.5 sm:pt-5">
            {INCLUDED.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-[13px] font-medium leading-snug text-zinc-800 sm:gap-2.5 sm:text-sm sm:leading-normal"
              >
                <Check
                  className="mt-0.5 size-3.5 shrink-0 sm:size-4"
                  style={{ color: brand.tertiary }}
                  strokeWidth={2.5}
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>

          <AuditCheckoutButton
            size="lg"
            className="mt-4 h-10 w-full cursor-pointer rounded-lg border border-zinc-900 bg-brand text-sm font-semibold text-white hover:bg-emerald-50 hover:text-black sm:mt-7 sm:h-12 sm:text-base"
            market={market}
            source={`audit-offer-pricing-${market}`}
          >
            Get an Audit
          </AuditCheckoutButton>
        </article>
      </div>
    </section>
  );
}
