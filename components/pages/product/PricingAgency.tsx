import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { servicesOffer } from "@/lib/pricing";

const TERTIARY = "#025864";
const PRIMARY = "#93E85F";
const CREAM = "#f7f3ec";
const DARK = "#212529";
const BODY = "#5c6b73";

export default function PricingAgency() {
  return (
    <section
      className="w-full rounded-2xl bg-white px-4 py-4 sm:px-6 sm:py-5"
      id="services"
      aria-labelledby="services-pricing-heading"
    >
      <div
        className="mx-auto flex max-w-5xl flex-col gap-3 rounded-xl border px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-5 sm:py-4"
        style={{ backgroundColor: CREAM, borderColor: `${DARK}22` }}
      >
        <div className="min-w-0 text-left">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-zinc-500 uppercase">
            Also available
          </p>
          <h2
            id="services-pricing-heading"
            className="mt-0.5 text-base font-bold tracking-tight sm:text-lg"
            style={{ color: TERTIARY }}
          >
            Managed services from{" "}
            <span
              className="inline-block rounded px-1.5 py-0.5 align-baseline text-sm"
              style={{ backgroundColor: TERTIARY, color: PRIMARY }}
            >
              {servicesOffer.price}/mo
            </span>
          </h2>
          <p className="mt-1 text-sm font-medium" style={{ color: BODY }}>
            Hands-on GEO retainers if you want us to run it for you.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button
            size="sm"
            className="h-9 rounded-lg border border-zinc-900 bg-brand px-3.5 text-sm font-semibold text-white hover:bg-emerald-50 hover:text-black"
            render={<Link href={servicesOffer.href} />}
          >
            Services
            <ArrowUpRight className="size-3.5" aria-hidden />
          </Button>
          <TalkToSalesButton
            size="sm"
            variant="outline"
            className="h-9 rounded-lg border-zinc-900 px-3.5 text-sm font-semibold hover:bg-zinc-900 hover:text-white"
            source="pricing-services"
          >
            Quote
          </TalkToSalesButton>
        </div>
      </div>
    </section>
  );
}
