import ReportSectionHeader from "./ReportSectionHeader";
import {
  readinessStatusClass,
  readinessStatusLabel,
} from "./readiness-status";
import { readinessCopy } from "./readiness-copy";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessAutomationProps = {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
};

export default function ReadinessAutomation({
  report,
  mode,
}: ReadinessAutomationProps) {
  const { automation } = report;
  const isTechnical = mode === "technical";

  return (
    <section className="border-t border-zinc-200">
      <ReportSectionHeader
        index="03"
        label="Automation"
        title="Form and action blockers"
        status={
          <p
            className={`text-[11px] font-medium tracking-wide uppercase ${readinessStatusClass(automation.status)}`}
          >
            {readinessStatusLabel(automation.status)}
          </p>
        }
        description={readinessCopy(
          mode,
          automation.body,
          automation.bodyTechnical,
        )}
      />

      <dl className="grid grid-cols-3 border-b border-zinc-200 text-sm">
        <div className="border-r border-zinc-200 px-6 py-5 md:px-10">
          <dt className="text-xs text-zinc-400">Total issues</dt>
          <dd className="mt-1 text-xl font-medium tabular-nums">
            {automation.totalIssues}
          </dd>
        </div>
        <div className="border-r border-zinc-200 px-6 py-5 md:px-10">
          <dt className="text-xs text-zinc-400">P1 blockers</dt>
          <dd className="mt-1 text-xl font-medium tabular-nums">
            {automation.p1Count}
          </dd>
        </div>
        <div className="px-6 py-5 md:px-10">
          <dt className="text-xs text-zinc-400">P2 reliability</dt>
          <dd className="mt-1 text-xl font-medium tabular-nums">
            {automation.p2Count}
          </dd>
        </div>
      </dl>

      <ul>
        {automation.groups.map((group) => (
          <li
            key={group.id}
            className="border-b border-zinc-200 px-6 py-7 last:border-b-0 md:px-10 md:py-8"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
                {group.severity} · {group.count}
              </span>
              <h3 className="text-base font-medium tracking-tight">
                {group.title}
              </h3>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600">
              {readinessCopy(mode, group.summary, group.summaryTechnical)}
            </p>
            {isTechnical && group.examples.length ? (
              <ul className="mt-4 space-y-2">
                {group.examples.map((example) => (
                  <li
                    key={example}
                    className="max-w-3xl overflow-x-auto border border-zinc-200 bg-white px-3 py-2 font-mono text-xs leading-relaxed text-zinc-700"
                  >
                    {example}
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
