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
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-7 text-center sm:px-6 sm:py-24">
        <h2
          id="audit-offer-cta-heading"
          className="text-[1.25rem] leading-tight font-bold tracking-tight text-white sm:text-4xl sm:leading-[1.12]"
        >
          See what AI says about you
        </h2>
        <p className="mt-2 max-w-md text-[13px] font-medium leading-snug text-neutral-200/90 sm:mt-5 sm:text-lg sm:leading-relaxed">
          {pricing.priceLabel} one-time. {AUDIT_FIX_PROMPTS} prompts, full
          audit, {AUDIT_FIX_TURNAROUND} turnaround.
        </p>
        <div className="mt-4 flex w-full max-w-md flex-row items-stretch gap-2 sm:mt-9 sm:max-w-none sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
          <AuditCheckoutButton
            size="lg"
            className="h-10 flex-1 cursor-pointer rounded-lg border border-transparent px-3 text-sm font-semibold text-[#11333c] hover:bg-white sm:h-12 sm:flex-none sm:px-6 sm:text-base"
            style={{ backgroundColor: brand.lime }}
            market={pricing.market}
            source="audit-offer-footer-cta"
          >
            Get an Audit
          </AuditCheckoutButton>
          <Button
            size="lg"
            variant="outline"
            className="h-10 flex-1 rounded-lg border-white/80 bg-transparent px-3 text-sm font-semibold text-white hover:bg-white hover:text-[#11333c] sm:h-12 sm:flex-none sm:px-6 sm:text-base"
            render={<Link href="/services" />}
          >
            Managed GEO instead
          </Button>
        </div>
      </div>
    </section>
  );
}
