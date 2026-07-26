"use client";

import Link from "next/link";
import posthog from "posthog-js";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import PricingTierMotion from "@/components/pages/product/PricingTierMotion";

const tiers = [
  {
    name: "Starter",
    price: "$149",
    period: "/mo",
    description: "For brands beginning AI search monitoring.",
    cta: "Start free trial",
    href: "/docs",
    featured: false,
    highlights: ["3 brands", "500 prompts / mo", "ChatGPT + Gemini", "Weekly digests"],
  },
  {
    name: "Growth",
    price: "$449",
    period: "/mo",
    description: "For marketing teams running GEO across markets.",
    cta: "Start Growth",
    href: "/docs",
    featured: true,
    highlights: [
      "10 brands",
      "2,500 prompts / mo",
      "All models + AI Mode",
      "Competitor scorecards",
      "Slack alerts",
    ],
  },
  {
    name: "Agency",
    price: "Custom",
    period: "",
    description: "Multi-client workspaces with white-label exports.",
    cta: "Talk to sales",
    // No href — this tier opens the sales dialog instead of navigating.
    href: null,
    featured: false,
    highlights: [
      "Unlimited clients",
      "Custom prompt volume",
      "White-label PDFs",
      "SSO + audit logs",
      "Dedicated CSM",
    ],
  },
] as const;

export default function PricingTiers() {
  return (
    <section className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <PricingTierColumn
            key={tier.name}
            tier={tier}
            borderRight={index < tiers.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function PricingTierColumn({
  tier,
  borderRight,
}: {
  tier: (typeof tiers)[number];
  borderRight: boolean;
}) {
  return (
    <div
      className={`flex flex-col border-b md:border-b-0 ${borderRight ? "md:border-r" : ""} ${
        tier.featured ? "bg-white" : ""
      }`}
    >
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-medium tracking-tight">{tier.name}</h2>
          {tier.featured ? (
            <span className="text-xs font-medium tracking-wide text-[#2462ff]">Most chosen</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-zinc-500">{tier.description}</p>
        <div className="mt-8 flex items-end gap-1">
          <span className="text-4xl font-medium tracking-tight tabular-nums">{tier.price}</span>
          {tier.period ? (
            <span className="pb-1 text-sm text-zinc-500">{tier.period}</span>
          ) : null}
        </div>
        <ul className="mt-8 flex flex-col gap-3 border-t pt-6">
          {tier.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2462ff]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <PricingTierMotion featured={tier.featured}>
            {tier.href ? (
              <Button
                size="lg"
                variant={tier.featured ? "default" : "outline"}
                className="w-full px-5"
                render={<Link href={tier.href} />}
                onClick={() =>
                  posthog.capture("pricing_tier_cta_clicked", {
                    tier: tier.name,
                    cta: tier.cta,
                    featured: tier.featured,
                  })
                }
              >
                {tier.cta}
              </Button>
            ) : (
              <TalkToSalesButton
                size="lg"
                variant={tier.featured ? "default" : "outline"}
                className="w-full px-5"
                source="pricing-tier-agency"
              >
                {tier.cta}
              </TalkToSalesButton>
            )}
          </PricingTierMotion>
        </div>
      </div>
    </div>
  );
}
