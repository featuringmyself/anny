import { readinessCopy } from "./readiness-copy";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessInsightsProps = {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
};

export default function ReadinessInsights({
  report,
  mode,
}: ReadinessInsightsProps) {
  return (
    <section className="border-b">
      <div className="px-6 pt-12 md:px-12 md:pt-16">
        <p className="mb-3 text-sm font-medium text-[#2462ff]">Key insights</p>
        <h2 className="max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
          What blocks AI from reading {report.company} cleanly
        </h2>
      </div>
      <div className="mt-10 grid border-t md:grid-cols-3">
        {report.insights.map((insight, index) => (
          <article
            key={insight.id}
            className={`border-b px-6 py-10 last:border-b-0 md:border-b-0 md:px-8 md:py-12 ${
              index < report.insights.length - 1 ? "md:border-r" : ""
            }`}
          >
            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-lg font-medium tracking-tight text-balance">
              {insight.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {readinessCopy(mode, insight.body, insight.bodyTechnical)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
