import ReportSectionHeader from "./ReportSectionHeader";
import { readinessCopy } from "./readiness-copy";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessQuickWinsProps = {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
};

export default function ReadinessQuickWins({
  report,
  mode,
}: ReadinessQuickWinsProps) {
  return (
    <section className="border-t border-zinc-200">
      <ReportSectionHeader
        index="05"
        label="Recommended fixes"
        title="Highest-leverage changes from this audit"
        description="Prioritized by impact versus effort. These are findings from the scan — not a product pitch."
      />
      <ol>
        {report.quickWins.map((win, index) => (
          <li
            key={win.id}
            className="grid gap-4 border-b border-zinc-200 px-6 py-7 last:border-b-0 md:grid-cols-[3.5rem_1fr_auto] md:items-start md:gap-8 md:px-10 md:py-8"
          >
            <span className="font-mono text-xs font-medium text-zinc-400 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 max-w-2xl">
              <h3 className="text-base font-medium tracking-tight text-balance">
                {win.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {readinessCopy(mode, win.body, win.bodyTechnical)}
              </p>
            </div>
            <dl className="flex gap-6 text-sm md:flex-col md:gap-2 md:text-right">
              <div>
                <dt className="text-xs text-zinc-400">Impact</dt>
                <dd className="mt-0.5 font-medium">{win.impact}</dd>
              </div>
              <div>
                <dt className="text-xs text-zinc-400">Effort</dt>
                <dd className="mt-0.5 font-medium">{win.effort}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
