"use client";

import { useFormStatus } from "react-dom";
import posthog from "posthog-js";

import { createReport } from "@/app/actions/ai-readiness-report";
import { aiReadinessAccentButtonClass } from "@/components/pages/tools/ai-readiness/button-classes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AiReadinessSeeFullReportProps = {
  domain: string;
  origin: string;
  score: number;
  band: string;
};

const VALUE_CHIPS = ["Insights", "Categories", "Fixes"] as const;

function SeeFullReportSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className={cn("w-full px-5 sm:w-auto", aiReadinessAccentButtonClass)}
      disabled={pending}
    >
      {pending ? "Opening report…" : "See full report"}
    </Button>
  );
}

export function AiReadinessSeeFullReport({
  domain,
  origin,
  score,
  band,
}: AiReadinessSeeFullReportProps) {
  return (
    <section className="border-b" aria-labelledby="ar-full-report-heading">
      <div className="grid md:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden border-b bg-zinc-950 px-6 py-12 text-white md:border-r md:border-b-0 md:px-10 md:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(36,98,255,0.22),transparent_55%),radial-gradient(ellipse_at_20%_90%,rgba(157,255,212,0.1),transparent_45%)]"
          />
          <div className="relative">
            <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
              Full dossier
            </p>
            <h2
              id="ar-full-report-heading"
              className="mt-3 max-w-md text-3xl font-medium tracking-tight text-balance md:text-4xl"
            >
              See the full report
            </h2>
            <p className="mt-4 max-w-sm text-sm text-zinc-400">
              Full audit for{" "}
              <span className="font-medium text-zinc-200">{domain}</span>.
            </p>
            <p className="mt-6 font-mono text-xs font-medium tracking-wide text-[#9dffd4] uppercase tabular-nums">
              {score}/100 · {band}
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center bg-white px-6 py-10 md:px-10 md:py-14">
          <ul className="flex flex-wrap gap-2" aria-label="Report includes">
            {VALUE_CHIPS.map((chip) => (
              <li
                key={chip}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-[11px] font-medium tracking-wide text-zinc-600 uppercase"
              >
                {chip}
              </li>
            ))}
          </ul>

          <form
            action={createReport}
            className="mt-6"
            onSubmit={() => {
              posthog.capture("ai_readiness_full_report_started", {
                domain,
                quick_score: score,
                quick_band: band,
                source: "checker_findings",
              });
            }}
          >
            <input type="hidden" name="domain" value={domain} />
            <input type="hidden" name="origin" value={origin} />
            <input type="hidden" name="score" value={String(score)} />
            <input type="hidden" name="band" value={band} />
            <SeeFullReportSubmitButton />
          </form>
        </div>
      </div>
    </section>
  );
}
