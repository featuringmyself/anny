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
    <section className="border-b">
      <div className="px-6 pt-12 md:px-12 md:pt-16">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-sm font-medium text-[#2462ff]">Quick wins</p>
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            Status · Good
          </p>
        </div>
        <h2 className="mt-2 max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Three fixes that move readiness fast
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">
          High-impact, mostly low-to-medium effort work that unblocks agents and
          search engines before deeper HTML or form refactors — included in the
          90-day AI Visibility Sprint.
        </p>
      </div>
      <ol className="mt-10 border-t">
        {report.quickWins.map((win, index) => (
          <li
            key={win.id}
            className="grid gap-6 border-b px-6 py-10 last:border-b-0 md:grid-cols-[auto_1fr_auto] md:items-start md:gap-10 md:px-12 md:py-12"
          >
            <span className="w-8 shrink-0 font-medium tabular-nums text-[#2462ff]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-lg font-medium tracking-tight text-balance">
                {win.title}
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
                {readinessCopy(mode, win.body, win.bodyTechnical)}
              </p>
            </div>
            <dl className="flex gap-6 text-sm md:flex-col md:gap-3 md:text-right">
              <div>
                <dt className="text-zinc-400">Impact</dt>
                <dd className="mt-0.5 font-medium">{win.impact}</dd>
              </div>
              <div>
                <dt className="text-zinc-400">Effort</dt>
                <dd className="mt-0.5 font-medium">{win.effort}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </section>
  );
}
