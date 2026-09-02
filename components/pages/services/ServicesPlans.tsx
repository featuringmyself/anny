"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { planCards, servicesCopy } from "./data";
import {
  accentButton,
  cardBase,
  sectionHeading,
  sectionLight,
  sectionPadding,
  sectionSubtext,
  servicesAccent,
} from "./shared/section-styles";

export default function ServicesPlans() {
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  return (
    <section
      className={`${sectionLight} ${sectionPadding}`}
      aria-labelledby="services-plans-heading"
    >
      <h2 id="services-plans-heading" className={sectionHeading}>
        {servicesCopy.plans.h2}
      </h2>
      <p className={sectionSubtext}>{servicesCopy.plans.sub}</p>

      <div className="mx-auto mt-8 flex justify-center">
        <div
          className="inline-flex rounded-full border border-zinc-200 bg-zinc-50 p-1"
          role="group"
          aria-label="Billing period"
        >
          {(
            [
              { id: "monthly", label: "Monthly" },
              { id: "annual", label: "Annual (17% off)" },
            ] as const
          ).map((option) => {
            const selected = billing === option.id;
            return (
              <button
                key={option.id}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  selected
                    ? "bg-white text-[#080808] shadow-sm"
                    : "text-zinc-500 hover:text-zinc-700",
                )}
                aria-pressed={selected}
                onClick={() => setBilling(option.id)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 lg:grid-cols-3">
        {planCards.map((plan) => {
          const price =
            billing === "annual" ? plan.priceAnnual : plan.priceMonthly;
          const isManaged = plan.name === "Managed";
          const isEssential = plan.name === "Essential";

          return (
            <article
              key={plan.name}
              className={cn(
                cardBase,
                "flex flex-col p-6 md:p-7",
                plan.highlighted &&
                  "border-[#4F39F6]/45 shadow-md shadow-[#4F39F6]/10 ring-1 ring-[#4F39F6]/20",
              )}
            >
              <p
                className={cn(
                  "mb-3 min-h-4 text-xs font-semibold tracking-wide uppercase",
                  plan.badge ? "" : "invisible",
                )}
                style={plan.badge ? { color: servicesAccent } : undefined}
                aria-hidden={!plan.badge}
              >
                {plan.badge ?? "Most popular"}
              </p>
              <h3 className="text-xl font-bold tracking-tight text-[#080808]">
                {plan.name}
              </h3>
              <p className="mt-3 flex flex-wrap items-baseline gap-2">
                <span className="text-3xl font-bold tracking-tight text-[#080808] md:text-4xl">
                  {price}
                </span>
                {plan.priceNote ? (
                  <span className="text-sm text-zinc-500">{plan.priceNote}</span>
                ) : null}
              </p>
              <p className="mt-2 text-sm text-zinc-500">{plan.creditNote}</p>

              {plan.platforms.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {plan.platforms.map((platform) => (
                    <li
                      key={platform}
                      className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-medium text-zinc-600"
                    >
                      {platform}
                    </li>
                  ))}
                </ul>
              ) : null}

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-zinc-700"
                  >
                    <span
                      className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full"
                      style={{
                        backgroundColor: `${servicesAccent}1A`,
                        color: servicesAccent,
                      }}
                    >
                      <Check className="size-3" strokeWidth={2.5} aria-hidden />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {isEssential ? (
                <Button
                  size="lg"
                  variant="outline"
                  className="mt-8 w-full"
                  render={<Link href="/tools/ai-readiness-checker" />}
                >
                  {plan.cta}
                </Button>
              ) : (
                <TalkToSalesButton
                  size="lg"
                  className={cn(
                    "mt-8 w-full",
                    isManaged ? accentButton : "bg-[#080808] hover:bg-zinc-800",
                  )}
                  source={`services-plan-${plan.name.toLowerCase()}`}
                >
                  {plan.cta}
                </TalkToSalesButton>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
