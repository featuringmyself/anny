import type { VisibilityReport } from "./types";

type ReportSprintProps = {
  report: VisibilityReport;
};

export default function ReportSprint({ report }: ReportSprintProps) {
  const { sprint, schemaFindings } = report;

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

        <aside
          aria-label="Sprint deliverables"
          className="px-6 py-12 md:px-12 md:py-16"
        >
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
        </aside>
      </div>

      {schemaFindings ? (
        <section className="border-t px-6 py-12 md:px-12 md:py-16">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <p className="text-sm font-medium text-[#2462ff]">
              {schemaFindings.severity === "opportunity"
                ? "Opportunity · structured data"
                : "Structured data"}
            </p>
            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
              {schemaFindings.status}
            </p>
          </div>
          <h3 className="mt-2 max-w-xl text-2xl font-medium tracking-tight text-balance">
            {schemaFindings.title}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
            {schemaFindings.body}
          </p>
          {schemaFindings.types?.length ? (
            <ul className="mt-5 flex flex-wrap gap-2">
              {schemaFindings.types.map((type) => (
                <li
                  key={type}
                  className="border border-zinc-200 px-2.5 py-1 font-mono text-xs text-zinc-700"
                >
                  {type}
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-8">
            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
              Suggested improvements
            </p>
            <ol className="mt-4 space-y-3">
              {schemaFindings.suggestedImprovements.map((item, i) => (
                <li
                  key={item}
                  className="flex gap-4 text-sm leading-relaxed text-zinc-700"
                >
                  <span className="w-6 shrink-0 font-medium tabular-nums text-[#2462ff]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}
    </section>
  );
}
