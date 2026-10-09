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
      <div className="mx-auto max-w-xl px-5 pt-10 text-center sm:px-6 sm:pt-20">
        <h2
          id="audit-offer-pricing-heading"
          className="text-2xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {active.priceLabel} one-time
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm font-medium leading-relaxed text-neutral-200/90 sm:mt-4 sm:text-base">
          <span className="sm:hidden">
            {AUDIT_FIX_PROMPTS} prompts · {AUDIT_FIX_TURNAROUND}
          </span>
          <span className="hidden sm:inline">
            {AUDIT_FIX_PROMPTS} prompts across {AI_MODELS_PHRASE}. Typical
            turnaround {AUDIT_FIX_TURNAROUND} once prompts are locked.
          </span>
        </p>

        <div
          className="mx-auto mt-5 flex max-w-sm rounded-xl p-1 ring-1 ring-white/15 sm:mt-8"
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
                  "flex-1 cursor-pointer rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors",
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

      <div className="mx-auto max-w-md px-5 pt-5 pb-10 sm:px-6 sm:pt-8 sm:pb-20">
        <article
          key={market}
          className="flex flex-col rounded-2xl border p-5 text-left sm:p-7"
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
          <p className="mt-1 text-sm font-medium" style={{ color: brand.body }}>
            {active.localeHint}
          </p>

          <div className="mt-4 flex items-end gap-2 sm:mt-5">
            <span
              className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
              style={{ color: brand.tertiary }}
            >
              {active.priceLabel}
            </span>
            <span className="pb-1 text-sm font-semibold text-zinc-500 sm:pb-1.5">
              one-time
            </span>
          </div>
          <p
            className="mt-2 text-sm font-medium"
            style={{ color: brand.bodyStrong }}
          >
            Fee credits toward implementation if you book the sprint.
          </p>

          <ul className="mt-4 flex flex-col gap-2 border-t border-zinc-900/10 pt-4 sm:mt-5 sm:gap-2.5 sm:pt-5">
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

          <AuditCheckoutButton
            size="lg"
            className="mt-5 h-12 w-full cursor-pointer rounded-lg border border-zinc-900 bg-brand text-base font-semibold text-white hover:bg-emerald-50 hover:text-black sm:mt-7"
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
