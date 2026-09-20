import ReportSectionHeader from "./ReportSectionHeader";
import { readinessCopy } from "./readiness-copy";
import { rt } from "./report-theme";
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
    <section>
      <ReportSectionHeader
        index="01"
        label="Insights"
        title={`Where ${report.company} loses AI readability`}
      />
      <ol>
        {report.insights.map((insight, index) => (
          <li
            key={insight.id}
            className={`grid gap-3 border-b ${rt.hairline} px-6 py-7 last:border-b-0 md:grid-cols-[3.5rem_1fr] md:gap-8 md:px-10 md:py-8`}
          >
            <span
              className={`font-mono text-xs font-medium tabular-nums ${rt.label}`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 max-w-3xl">
              <h3
                className={`text-base font-medium tracking-tight text-balance ${rt.heading}`}
              >
                {insight.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${rt.body}`}>
                {readinessCopy(mode, insight.body, insight.bodyTechnical)}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
