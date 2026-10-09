"use client";

import Link from "next/link";

import { brand } from "@/components/Home/brand";
import { Button } from "@/components/ui/button";
import {
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_TURNAROUND,
} from "@/lib/audit-fix-pricing";
import AuditCheckoutButton from "./AuditCheckoutButton";
import { useAuditFixMarket } from "./AuditMarketContext";

export default function AuditFixCta() {
  const { pricing } = useAuditFixMarket();

  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="audit-offer-cta-heading"
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center px-6 py-20 text-center sm:py-24">
        <h2
          id="audit-offer-cta-heading"
          className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl"
        >
          See what AI says about you
        </h2>
        <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-neutral-200/90 sm:text-lg">
          {pricing.priceLabel} one-time. {AUDIT_FIX_PROMPTS} prompts, full
          audit, {AUDIT_FIX_TURNAROUND} turnaround.
        </p>
        <div className="mt-9 flex w-full max-w-md flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <AuditCheckoutButton
            size="lg"
            className="h-12 cursor-pointer rounded-lg border border-transparent px-6 text-base font-semibold text-[#11333c] hover:bg-white"
            style={{ backgroundColor: brand.lime }}
            market={pricing.market}
            source="audit-offer-footer-cta"
          >
            Get an Audit
          </AuditCheckoutButton>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-white/80 bg-transparent px-6 text-base font-semibold text-white hover:bg-white hover:text-[#11333c]"
            render={<Link href="/services" />}
          >
            Managed GEO instead
          </Button>
        </div>
      </div>
    </section>
  );
}
