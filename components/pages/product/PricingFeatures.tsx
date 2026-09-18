import { Check, Minus } from "lucide-react";
import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import PricingTierMotion from "@/components/pages/product/PricingTierMotion";

const TERTIARY = "#025864";
const PRIMARY = "#93E85F";
const CREAM = "#f7f3ec";
const DARK = "#212529";
const BODY = "#5c6b73";

type Row = {
  name: string;
  seoGeo: boolean | string;
  monitoring: boolean | string;
};

const rows: Row[] = [
  { name: "AI brand mention tracking", seoGeo: true, monitoring: true },
  { name: "Citation & source monitoring", seoGeo: true, monitoring: true },
  { name: "Visibility shift alerts", seoGeo: true, monitoring: true },
  { name: "Competitor share-of-voice", seoGeo: true, monitoring: "Lite" },
  { name: "SEO & GEO content agent", seoGeo: true, monitoring: false },
  { name: "Prompt & answer optimization", seoGeo: true, monitoring: false },
  { name: "Weekly action plans", seoGeo: true, monitoring: "Digest" },
  { name: "Priority support", seoGeo: true, monitoring: false },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return (
      <span className="text-sm font-bold" style={{ color: TERTIARY }}>
        {value}
      </span>
    );
  }
  if (value) {
    return (
      <Check
        className="size-5"
        style={{ color: TERTIARY }}
        strokeWidth={2.5}
        aria-label="Included"
      />
    );
  }
  return (
    <Minus className="size-5 text-zinc-300" strokeWidth={2} aria-label="Not included" />
  );
}

export default function PricingFeatures() {
  return (
    <>
      <section
        className="w-full rounded-2xl bg-white py-16 sm:py-20 lg:py-24"
        aria-labelledby="compare-heading"
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <span
            className="inline-flex items-center rounded-full border px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-xs"
            style={{ color: TERTIARY, borderColor: `${TERTIARY}55` }}
          >
            Compare Agents
          </span>

          <h2
            id="compare-heading"
            className="mt-7 text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.5rem]"
            style={{ color: TERTIARY }}
          >
            Monitoring informs.{" "}
            <span
              className="inline-block -rotate-1 rounded-lg px-3 py-0.5 align-baseline"
              style={{ backgroundColor: TERTIARY, color: PRIMARY }}
            >
              The agent ships.
            </span>
          </h2>

          <p
            className="mt-6 max-w-xl text-base font-medium leading-relaxed sm:text-lg"
            style={{ color: BODY }}
          >
            Everything in AI Monitoring is included with the Agent. You also get
            the SEO &amp; GEO work that moves the needle.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl px-6">
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: DARK, backgroundColor: CREAM }}
          >
            <div
              className="grid grid-cols-[1.5fr_1fr_1fr] border-b px-4 py-4 sm:px-6"
              style={{ borderColor: `${DARK}22` }}
            >
              <p className="text-left text-sm font-bold text-zinc-500">Capability</p>
              <p className="text-center text-sm font-bold" style={{ color: TERTIARY }}>
                Agent + Monitoring
                <span className="mt-0.5 block text-xs font-semibold text-zinc-500">
                  $300/mo
                </span>
              </p>
              <p className="text-center text-sm font-bold" style={{ color: TERTIARY }}>
                Monitoring
                <span className="mt-0.5 block text-xs font-semibold text-zinc-500">
                  $150/mo
                </span>
              </p>
            </div>

            {rows.map((row) => (
              <div
                key={row.name}
                className="grid grid-cols-[1.5fr_1fr_1fr] items-center border-b px-4 py-3.5 last:border-b-0 sm:px-6"
                style={{ borderColor: `${DARK}14` }}
              >
                <p className="text-left text-sm font-semibold text-zinc-800 sm:text-[15px]">
                  {row.name}
                </p>
                <div className="flex justify-center">
                  <Cell value={row.seoGeo} />
                </div>
                <div className="flex justify-center">
                  <Cell value={row.monitoring} />
                </div>
              </div>
            ))}

            <div
              className="grid grid-cols-1 gap-3 border-t p-4 sm:grid-cols-2 sm:p-5"
              style={{ borderColor: DARK, backgroundColor: "#fcf0e7" }}
            >
              <PricingTierMotion
                featured
                href="/register"
                cta="Get Agent + Monitoring · $300"
                tier="SEO & GEO Agent + Monitoring"
              />
              <PricingTierMotion
                href="/register"
                cta="Get Monitoring · $150"
                tier="AI Monitoring"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="w-full overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#11333c" }}
        aria-labelledby="pricing-cta-heading"
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center px-6 py-20 text-center sm:py-24">
          <span className="inline-flex items-center rounded-full border border-white/70 px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] text-white uppercase sm:text-xs">
            Next step
          </span>

          <h2
            id="pricing-cta-heading"
            className="mt-7 text-3xl leading-[1.15] font-bold tracking-tight text-white sm:text-4xl"
          >
            Not sure which plan fits?
            <span
              className="mt-3 block -rotate-1 rounded-md px-3.5 py-1"
              style={{ backgroundColor: "#fdf6ec", color: PRIMARY }}
            >
              We&apos;ll tell you in 15 minutes.
            </span>
          </h2>

          <p className="mt-8 max-w-lg text-base font-medium leading-snug text-neutral-200/90 sm:text-lg">
            Free AI readiness check, or a quick call to size monitoring, agents,
            or a managed retainer.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button
              size="lg"
              className="h-12 rounded-lg border border-transparent bg-[#93E85F] px-6 text-base font-semibold text-[#11333c] hover:bg-white"
              render={<Link href="/tools/ai-readiness-checker" />}
            >
              Free readiness check
            </Button>
            <TalkToSalesButton
              size="lg"
              variant="outline"
              className="h-12 rounded-lg border-white/80 bg-transparent px-6 text-base font-semibold text-white hover:bg-white hover:text-[#11333c]"
              source="pricing-footer"
            >
              Talk to sales
            </TalkToSalesButton>
          </div>
        </div>
      </section>
    </>
  );
}
