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

const REPORT_PILLARS = [
  {
    eyebrow: "Crawlers",
    title: "AI bot directives",
    description:
      "Allow rules and fetch policy for GPTBot, ClaudeBot, PerplexityBot, and Google-Extended.",
  },
  {
    eyebrow: "Entity",
    title: "Brand schema & JSON-LD",
    description:
      "Organization structured data and entity signals so models attach citations to the brand.",
  },
  {
    eyebrow: "Sprint",
    title: "Prioritized fix roadmap",
    description:
      "Severity-ranked P1 through P3 action items paired with copy-paste snippets and code fixes.",
  },
  {
    eyebrow: "Export",
    title: "PDF & audience modes",
    description:
      "Toggle between executive summaries and developer code diffs, plus single-click PDF export.",
  },
] as const;

function SeeFullReportSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className={cn(
        "h-11 px-6 text-sm font-medium",
        aiReadinessAccentButtonClass,
      )}
      disabled={pending}
    >
      {pending ? "Opening report…" : "See full report →"}
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
    <section
      className="border-b bg-zinc-950 text-white"
      aria-labelledby="ar-full-report-heading"
    >
      <div className="px-6 py-10 md:px-12 md:py-14">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              Full dossier · {domain}
            </p>
            <h2
              id="ar-full-report-heading"
              className="mt-2 text-3xl font-medium tracking-tight text-white md:text-4xl"
            >
              See the full report
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-400 text-balance">
              The quick scan checks homepage basics. The full dossier runs live
              crawler tests, audits agent automation friction, and builds a
              custom 90-day execution sprint.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center md:flex-col md:items-end">
            <div className="flex items-baseline gap-2 font-mono text-sm text-zinc-400">
              <span>Preliminary score:</span>
              <span className="text-xl font-semibold text-[#9dffd4] tabular-nums">
                {score}
              </span>
              <span className="text-zinc-500">/100</span>
              {band ? <span className="text-zinc-500">· {band}</span> : null}
            </div>

            <form
              action={createReport}
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
      </div>

      <div className="grid border-t border-zinc-800 sm:grid-cols-2 lg:grid-cols-4">
        {REPORT_PILLARS.map((pillar, index) => (
          <div
            key={pillar.title}
            className={`border-b border-zinc-800 px-6 py-8 last:border-b-0 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8 ${
              index >= 2 ? "sm:border-b-0" : ""
            }`}
          >
            <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
              0{index + 1} · {pillar.eyebrow}
            </p>
            <h3 className="mt-2 text-base font-medium text-white">
              {pillar.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
