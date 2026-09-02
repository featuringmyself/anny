import ReportSectionHeader from "./ReportSectionHeader";
import {
  readinessStatusClass,
  readinessStatusLabel,
} from "./readiness-status";
import { readinessCopy } from "./readiness-copy";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessCategoriesProps = {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
};

export default function ReadinessCategories({
  report,
  mode,
}: ReadinessCategoriesProps) {
  return (
    <section className="border-t border-zinc-200">
      <ReportSectionHeader
        index="02"
        label="Categories"
        title="Site signals, content, and structure"
      />
      <div>
        {report.categories.map((category) => (
          <article
            key={category.id}
            className="border-b border-zinc-200 px-6 py-7 last:border-b-0 md:px-10 md:py-8"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-base font-medium tracking-tight">
                {category.title}
              </h3>
              <p
                className={`text-[11px] font-medium tracking-wide uppercase ${readinessStatusClass(category.status)}`}
              >
                {readinessStatusLabel(category.status)}
              </p>
            </div>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600">
              {readinessCopy(mode, category.body, category.bodyTechnical)}
            </p>
            {category.metrics?.length ? (
              <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                {category.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-xs text-zinc-400">{metric.label}</dt>
                    <dd className="mt-0.5 font-medium">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
