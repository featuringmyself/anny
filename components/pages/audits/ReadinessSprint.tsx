import { rt } from "./report-theme";
import type { ReadinessReport } from "./types";

type ReadinessSprintProps = {
  report: ReadinessReport;
};

export default function ReadinessSprint({ report }: ReadinessSprintProps) {
  const { sprint } = report;

  return (
    <section>
      <div className="grid md:grid-cols-2">
        <div
          className={`border-b ${rt.hairline} px-6 py-10 md:border-r md:border-b-0 md:px-10 md:py-12`}
        >
          <p
            className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
          >
            Engagement option
          </p>
          <h2
            className={`mt-2 max-w-md text-2xl font-medium tracking-tight text-balance ${rt.heading}`}
          >
            {sprint.headline}
          </h2>
          <p className={`mt-3 max-w-md text-sm leading-relaxed ${rt.body}`}>
            {sprint.body}
          </p>
          <dl className="mt-6 flex gap-8 text-sm">
            <div>
              <dt className={`text-xs ${rt.label}`}>Engagement</dt>
              <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                {sprint.name}
              </dd>
            </div>
            <div>
              <dt className={`text-xs ${rt.label}`}>Length</dt>
              <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                {sprint.duration}
              </dd>
            </div>
          </dl>
        </div>

        <aside
          aria-label="Sprint deliverables"
          className="px-6 py-10 md:px-10 md:py-12"
        >
          <p
            className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
          >
            Deliverables
          </p>
          <ol className="mt-5 space-y-4">
            {sprint.outcomes.map((outcome, i) => (
              <li key={outcome} className="flex gap-4 text-sm leading-relaxed">
                <span
                  className={`w-6 shrink-0 font-mono text-xs font-medium tabular-nums ${rt.label}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={rt.bodyStrong}>{outcome}</span>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
