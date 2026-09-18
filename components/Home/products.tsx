import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

import { brand } from "@/components/Home/brand";
import { Button } from "@/components/ui/button";
import { agentPlans } from "@/lib/pricing";

const ART: Record<string, string> = {
  "seo-geo-agent": "/pricing/agent-seo.svg",
  "ai-monitoring": "/pricing/agent-monitor.svg",
};

/**
 * One job: choose a plan.
 * Cards are justified here (interactive decision containers).
 * Featured plan is visually primary (Fitts + hierarchy).
 */
export default function Products() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      id="plans"
      aria-labelledby="home-products-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-20 lg:pt-24">
        <h2
          id="home-products-heading"
          className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl"
        >
          Two plans. Clear jobs.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed text-neutral-200/90 sm:text-lg">
          Monitoring alone, or the SEO &amp; GEO Agent with Monitoring included.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 px-6 pt-10 pb-16 sm:gap-5 sm:pb-20 md:grid-cols-2 lg:pt-12 lg:pb-24">
        {agentPlans.map((plan) => (
          <article
            key={plan.id}
            className="relative flex flex-col rounded-2xl border p-7 text-left sm:p-8"
            style={{
              backgroundColor: plan.featured ? brand.cream : brand.peach,
              borderColor: brand.ink,
              outline: plan.featured ? `2px solid ${brand.lime}` : undefined,
              outlineOffset: plan.featured ? 0 : undefined,
            }}
          >
            {plan.badge ? (
              <span
                className="absolute top-5 right-5 inline-flex items-center rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase"
                style={{ backgroundColor: brand.tertiary, color: brand.lime }}
              >
                {plan.badge}
              </span>
            ) : null}

            <div className="flex items-center gap-3">
              <Image
                src={ART[plan.id] ?? "/pricing/agent-monitor.svg"}
                alt=""
                width={48}
                height={48}
                className="size-11 rounded-xl bg-white p-1"
              />
              <h3 className="pr-24 text-xl font-bold tracking-tight text-zinc-900 sm:text-2xl">
                {plan.name}
              </h3>
            </div>

            <p
              className="mt-4 text-[15px] font-medium leading-relaxed"
              style={{ color: brand.bodyStrong }}
            >
              {plan.description}
            </p>

            <div className="mt-6 flex items-end gap-1.5">
              <span
                className="text-4xl font-bold tracking-tight tabular-nums sm:text-5xl"
                style={{ color: brand.tertiary }}
              >
                {plan.price}
              </span>
              <span className="pb-1.5 text-sm font-semibold text-zinc-500">
                {plan.period}
              </span>
            </div>

            <div className="mt-6 border-t border-zinc-900/10 pt-5">
              {plan.highlightsIntro ? (
                <p
                  className="mb-3 text-sm font-semibold"
                  style={{ color: brand.tertiary }}
                >
                  {plan.highlightsIntro}
                </p>
              ) : null}
              <ul className="flex flex-col gap-2.5">
                {(plan.highlightsIntro
                  ? plan.highlights.slice(0, 4)
                  : plan.highlights.slice(0, 5)
                ).map((item) => (
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
            </div>

            <div className="mt-auto pt-8">
              <Button
                size="lg"
                className={
                  plan.featured
                    ? "h-12 w-full cursor-pointer rounded-lg border border-zinc-900 bg-brand px-5 text-base font-semibold text-white hover:bg-emerald-50 hover:text-black"
                    : "h-12 w-full cursor-pointer rounded-lg border-zinc-900 px-5 text-base font-semibold hover:bg-zinc-900 hover:text-white"
                }
                variant={plan.featured ? "default" : "outline"}
                render={
                  <Link
                    href={`/register?plan=${encodeURIComponent(plan.name)}`}
                  />
                }
              >
                {plan.cta}
              </Button>
            </div>
          </article>
        ))}
      </div>

      <p className="pb-10 text-center text-sm font-medium text-white/50">
        Want a deeper breakdown?{" "}
        <Link href="/pricing" className="text-white underline underline-offset-2">
          See full pricing
        </Link>
      </p>
    </section>
  );
}
