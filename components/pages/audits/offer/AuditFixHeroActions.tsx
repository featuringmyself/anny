"use client";

import Link from "next/link";
import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import AuditCheckoutButton from "./AuditCheckoutButton";
import { useAuditFixMarket } from "./AuditMarketContext";
import { AUDIT_SAMPLE_PDF } from "./sample";

export default function AuditFixHeroActions() {
  const { market } = useAuditFixMarket();

  return (
    <div className="mt-5 flex w-full max-w-xs flex-col items-center gap-3 sm:mt-8 sm:max-w-none">
      <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:justify-center">
        <AuditCheckoutButton
          size="lg"
          className="h-11 w-full cursor-pointer rounded-lg border border-zinc-900 bg-brand px-6 text-sm font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black sm:h-12 sm:w-auto sm:text-base"
          market={market}
          source="audit-offer-hero"
        >
          Get an Audit
        </AuditCheckoutButton>
        <Button
          size="lg"
          variant="outline"
          className="h-11 w-full rounded-lg border-zinc-900 px-6 text-sm font-semibold hover:bg-zinc-900 hover:text-white sm:h-12 sm:w-auto sm:text-base"
          render={
            <a
              href={AUDIT_SAMPLE_PDF}
              download="dodox-audit-sample-ai-visibility-report.pdf"
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <Download data-icon="inline-start" aria-hidden />
          Download a sample
        </Button>
      </div>
      <Link
        href="#story"
        className="text-sm font-semibold text-zinc-600 underline-offset-4 hover:text-zinc-900 hover:underline"
      >
        See how it works
      </Link>
    </div>
  );
}
