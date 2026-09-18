import Image from "next/image";
import { Check } from "lucide-react";

import PricingTierMotion from "@/components/pages/product/PricingTierMotion";
import { agentPlans, type PricingPlan } from "@/lib/pricing";
import { cn } from "@/lib/utils";

const TERTIARY = "#025864";
const PRIMARY = "#93E85F";
const CREAM = "#f7f3ec";
const DARK = "#212529";
const BODY = "#2a3f44";

const ART: Record<string, string> = {
  "seo-geo-agent": "/pricing/agent-seo.svg",
  "ai-monitoring": "/pricing/agent-monitor.svg",
};

export default function PricingTiers() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: "#11333c" }}
      id="agents"
      aria-labelledby="agents-heading"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-16 pb-10 text-center sm:pt-20 sm:pb-12 lg:pt-24">
        <span className="inline-flex items-center rounded-full border border-white/70 px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white uppercase sm:text-xs">
          AI Agents
        </span>

        <h2
          id="agents-heading"
          className="mt-7 max-w-3xl text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl md:text-[2.75rem] md:leading-[1.12]"
        >
          <span className="block">The product that earns mentions.</span>
          <span
            className="mt-2 inline-block -rotate-1 rounded-md px-3.5 py-0.5 sm:mt-1"
            style={{ backgroundColor: "#fdf6ec", color: PRIMARY }}
          >
            Then keeps them.
          </span>
        </h2>

        <p className="mt-7 max-w-xl text-base font-medium leading-snug text-neutral-200/90 sm:text-lg">
          SEO &amp; GEO Agent + Monitoring at $300/mo. Monitoring alone at
          $150/mo. The Agent plan includes everything in Monitoring.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 px-6 pb-16 sm:gap-5 sm:pb-20 md:grid-cols-2 lg:pb-24">
        {agentPlans.map((plan) => (
          <AgentCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}

function AgentCard({ plan }: { plan: PricingPlan }) {
  const art = ART[plan.id];

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-2xl border p-7 text-left sm:p-8",
        plan.featured ? "ring-2 ring-[#93E85F]" : "",
      )}
      style={{
        backgroundColor: plan.featured ? CREAM : "#fcf0e7",
        borderColor: DARK,
      }}
    >
      {plan.badge ? (
        <span
          className="absolute top-5 right-5 inline-flex -rotate-2 items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase"
          style={{ backgroundColor: TERTIARY, color: PRIMARY }}
        >
          {plan.badge}
        </span>
      ) : null}

      <div className="flex items-center gap-3">
        {art ? (
          <Image
            src={art}
            alt=""
            width={52}
            height={52}
            className="size-12 rounded-xl bg-white p-1"
          />
        ) : null}
        <h3 className="pr-16 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
          {plan.name}
        </h3>
      </div>

      <p className="mt-4 text-[15px] font-medium leading-relaxed" style={{ color: BODY }}>
        {plan.description}
      </p>

      <div className="mt-8 flex items-end gap-1.5">
        <span
          className="text-5xl font-bold tracking-tight tabular-nums"
          style={{ color: TERTIARY }}
        >
          {plan.price}
        </span>
        <span className="pb-2 text-sm font-semibold text-zinc-500">
          {plan.period}
        </span>
      </div>
      <p className="mt-1 text-sm font-medium text-zinc-500">
        Billed monthly · cancel anytime
      </p>

      <div className="mt-7 border-t border-zinc-900/10 pt-6">
        {plan.highlightsIntro ? (
          <p className="mb-3 text-sm font-semibold" style={{ color: TERTIARY }}>
            {plan.highlightsIntro}
          </p>
        ) : null}
        <ul className="flex flex-col gap-3">
          {plan.highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 text-[15px] font-medium text-zinc-800"
            >
              <Check
                className="mt-0.5 size-4 shrink-0"
                style={{ color: TERTIARY }}
                strokeWidth={2.5}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-8">
        <PricingTierMotion
          featured={plan.featured}
          href={plan.href === "sales" ? "/pricing" : plan.href}
          cta={plan.cta}
          tier={plan.name}
        />
      </div>
    </article>
  );
}
