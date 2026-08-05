import ModelAnswerScroll from "./ModelAnswerScroll";
import type { VisibilityReport } from "./types";

type ReportQueriesProps = {
  report: VisibilityReport;
};

export default function ReportQueries({ report }: ReportQueriesProps) {
  const brandQueries = new Set(
    report.brandCrisis?.map((item) => item.query) ?? [],
  );
  const findings = report.queries.filter((q) => !brandQueries.has(q.query));
  const hasScreenshots = findings.some((f) => f.screenshot);

  return (
    <section className="border-b">
      <div className="border-b px-6 py-8 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">
          Prompt audit · {report.queries.length} queries
        </h2>
        <p className="mt-1 max-w-xl text-sm text-zinc-500">
          {hasScreenshots
            ? `Category and feature prompts owners type when shopping for PG, hostel, and rent tools. Real ChatGPT answers below. ${report.company} is missing from every shortlist in this set. Brand-trust prompts are covered in the section above.`
            : `Each prompt was run across multiple answer engines. Where the same query appears on more than one model, scroll horizontally to compare.`}
        </p>
      </div>

      <div>
        {findings.map((finding, index) => (
          <ModelAnswerScroll
            key={finding.id}
            finding={finding}
            brand={report.company}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
