import {
  readinessStatusClass,
  readinessStatusLabel,
} from "./readiness-status";
import type { ReadinessReport } from "./types";

type ReadinessCategoriesProps = {
  report: ReadinessReport;
};

export default function ReadinessCategories({
  report,
}: ReadinessCategoriesProps) {
  return (
    <section className="border-b">
      <div className="px-6 pt-12 md:px-12 md:pt-16">
        <p className="mb-3 text-sm font-medium text-[#2462ff]">
          Category breakdown
        </p>
        <h2 className="max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Site signals, content, and structure
        </h2>
      </div>
      <div className="mt-10 border-t">
        {report.categories.map((category) => (
          <article
            key={category.id}
            className="border-b px-6 py-10 last:border-b-0 md:px-12 md:py-12"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-xl font-medium tracking-tight">
                {category.title}
              </h3>
              <p
                className={`text-xs font-medium tracking-wide uppercase ${readinessStatusClass(category.status)}`}
              >
                {readinessStatusLabel(category.status)}
              </p>
            </div>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
              {category.body}
            </p>
            {category.metrics?.length ? (
              <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-sm">
                {category.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-zinc-400">{metric.label}</dt>
                    <dd className="mt-1 font-medium">{metric.value}</dd>
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
