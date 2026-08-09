import {
  readinessStatusClass,
  readinessStatusLabel,
} from "./readiness-status";
import type { ReadinessReport } from "./types";

type ReadinessAutomationProps = {
  report: ReadinessReport;
};

export default function ReadinessAutomation({
  report,
}: ReadinessAutomationProps) {
  const { automation } = report;

  return (
    <section className="border-b">
      <div className="px-6 pt-12 md:px-12 md:pt-16">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="text-sm font-medium text-[#2462ff]">
            Automation readiness
          </p>
          <p
            className={`text-xs font-medium tracking-wide uppercase ${readinessStatusClass(automation.status)}`}
          >
            {readinessStatusLabel(automation.status)}
          </p>
        </div>
        <h2 className="mt-2 max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Agents hit walls before they can act
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-500">
          {automation.body}
        </p>
        <dl className="mt-8 flex flex-wrap gap-8 text-sm">
          <div>
            <dt className="text-zinc-400">Total issues</dt>
            <dd className="mt-1 text-2xl font-medium tabular-nums">
              {automation.totalIssues}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-400">P1 blockers</dt>
            <dd className="mt-1 text-2xl font-medium tabular-nums">
              {automation.p1Count}
            </dd>
          </div>
          <div>
            <dt className="text-zinc-400">P2 reliability</dt>
            <dd className="mt-1 text-2xl font-medium tabular-nums">
              {automation.p2Count}
            </dd>
          </div>
        </dl>
      </div>

      <ul className="mt-10 border-t">
        {automation.groups.map((group) => (
          <li
            key={group.id}
            className="border-b px-6 py-10 last:border-b-0 md:px-12 md:py-12"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                {group.severity} · {group.count}
              </span>
              <h3 className="text-lg font-medium tracking-tight">
                {group.title}
              </h3>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
              {group.summary}
            </p>
            {group.examples.length ? (
              <ul className="mt-5 space-y-2">
                {group.examples.map((example) => (
                  <li
                    key={example}
                    className="max-w-3xl overflow-x-auto border border-zinc-200 bg-zinc-50 px-3 py-2 font-mono text-xs leading-relaxed text-zinc-700"
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
