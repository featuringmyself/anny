"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import AuditCheckoutButton from "./AuditCheckoutButton";
import { useAuditFixMarket } from "./AuditMarketContext";

export default function AuditFixHeroActions() {
  const { market } = useAuditFixMarket();

  return (
    <div className="mt-5 flex w-full max-w-md flex-col items-stretch gap-2.5 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3">
      <AuditCheckoutButton
        size="lg"
        className="h-11 cursor-pointer rounded-lg border border-zinc-900 bg-brand px-5 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black sm:h-12 sm:px-6"
        market={market}
        source="audit-offer-hero"
      >
        Get an Audit
      </AuditCheckoutButton>
      <Button
        size="lg"
        variant="outline"
        className="hidden h-12 rounded-lg border-zinc-900 px-6 text-base font-semibold hover:bg-zinc-900 hover:text-white sm:inline-flex"
        render={<Link href="#story" />}
      >
        See how it works
      </Button>
    </div>
  );
}
