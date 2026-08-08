import type { VisibilityReport } from "./types";

type ReportSprintProps = {
  report: VisibilityReport;
};

export default function ReportSprint({ report }: ReportSprintProps) {
  const { sprint } = report;

  return (
    <section className="border-b">
      <div className="grid md:grid-cols-2">
        <div className="border-b px-6 py-12 md:border-r md:border-b-0 md:px-12 md:py-16">
          <p className="mb-3 text-sm font-medium text-[#2462ff]">
            What now?
          </p>
          <h2 className="max-w-md text-3xl font-medium tracking-tight text-balance md:text-4xl">
            {sprint.headline}
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            {sprint.body}
          </p>
          <dl className="mt-8 flex gap-8 text-sm">
            <div>
              <dt className="text-zinc-400">Engagement</dt>
              <dd className="mt-1 font-medium">{sprint.name}</dd>
            </div>
            <div>
              <dt className="text-zinc-400">Length</dt>
              <dd className="mt-1 font-medium">{sprint.duration}</dd>
            </div>
          </dl>
        </div>

        <div className="px-6 py-12 md:px-12 md:py-16">
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            Deliverables
          </p>
          <ol className="mt-6 space-y-5">
            {sprint.outcomes.map((outcome, i) => (
              <li key={outcome} className="flex gap-4 text-sm leading-relaxed">
                <span className="w-6 shrink-0 font-medium tabular-nums text-[#2462ff]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-zinc-700">{outcome}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
