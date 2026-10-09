"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import AuditCheckoutButton from "./AuditCheckoutButton";
import { useAuditFixMarket } from "./AuditMarketContext";

export default function AuditFixHeroActions() {
  const { market, pricing } = useAuditFixMarket();

  return (
    <div className="mt-6 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
      <AuditCheckoutButton
        size="lg"
        className="h-11 cursor-pointer rounded-lg border border-zinc-900 bg-brand px-5 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black sm:h-12 sm:px-6"
        market={market}
        source="audit-offer-hero"
      >
        Get an Audit · {pricing.priceLabel}
      </AuditCheckoutButton>
      <Button
        size="lg"
        variant="outline"
        className="h-11 rounded-lg border-zinc-900 px-5 text-base font-semibold hover:bg-zinc-900 hover:text-white sm:h-12 sm:px-6"
        render={<Link href="#story" />}
      >
        See how it works
      </Button>
    </div>
  );
}
