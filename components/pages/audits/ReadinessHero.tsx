import DownloadReportPdfButton from "@/components/pages/audits/DownloadReportPdfButton";
import { readinessCopy } from "./readiness-copy";
import { reportScoreClass, rt } from "./report-theme";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessHeroProps = {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
};

export function ReadinessHeroLead({ report }: { report: ReadinessReport }) {
  const scoreTone = reportScoreClass(report.overallScore);

  return (
    <div className="px-6 pt-10 md:px-10 md:pt-12">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p
            className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
          >
            Private report · AI readiness
          </p>
          <p className={`mt-1 text-sm ${rt.body}`}>
            Prepared {report.dateLabel} 
          </p>
        </div>
        <DownloadReportPdfButton
          slug={report.slug}
          company={report.company}
          kind="readiness"
          className="shrink-0"
        />
      </div>

      <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between md:pb-12">
        <div className="max-w-2xl">
          <h1
            className={`text-3xl font-medium tracking-tight text-balance md:text-4xl ${rt.heading}`}
          >
            {report.company}
          </h1>
          <p className={`mt-2 text-base text-balance ${rt.body}`}>
            On-site readiness for AI agents, schema, crawl access, automation,
            and HTML semantics.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
            <div>
              <dt className={`text-xs ${rt.label}`}>Prepared for</dt>
              <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                {report.preparedFor}
                {report.role ? (
                  <span className={`block font-normal ${rt.body}`}>
                    {report.role}
                  </span>
                ) : null}
                {report.email ? (
                  <span className={`block font-normal ${rt.body}`}>
                    {report.email}
                  </span>
                ) : null}
              </dd>
            </div>
            <div>
              <dt className={`text-xs ${rt.label}`}>Website</dt>
              <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                {report.website}
              </dd>
            </div>
            <div>
              <dt className={`text-xs ${rt.label}`}>Industry</dt>
              <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                {report.industry}
              </dd>
            </div>
            <div>
              <dt className={`text-xs ${rt.label}`}>Snapshot</dt>
              <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                {report.dateLabel}
              </dd>
            </div>
          </dl>
        </div>

        <aside
          aria-label="Readiness score"
          className={`shrink-0 border ${rt.hairlineStrong} ${rt.surface} px-6 py-5 md:min-w-[200px]`}
        >
          <p
            className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
          >
            Score
          </p>
          <p
            className={`mt-1 text-4xl font-medium tracking-tight tabular-nums ${scoreTone}`}
          >
            {report.overallScore}
            <span className={`text-xl ${rt.label}`}>/100</span>
          </p>
          <p className={`mt-1 text-sm font-medium ${scoreTone}`}>
            {report.scoreLabel}
          </p>
        </aside>
      </div>
    </div>
  );
}

export function ReadinessHeroBody({
  report,
  mode,
}: ReadinessHeroProps) {
  const summary = readinessCopy(
    mode,
    report.summary,
    report.summaryTechnical,
  );

  return (
    <>
      {report.stats?.length ? (
        <div
          className={`grid grid-cols-2 border-t ${rt.hairline} md:grid-cols-4`}
        >
          {report.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-5 md:px-8 ${
                index % 2 === 0 ? `border-r ${rt.hairline}` : ""
              } ${index < 2 ? `border-b ${rt.hairline} md:border-b-0` : ""} ${
                index < report.stats!.length - 1
                  ? `md:border-r ${rt.hairline}`
                  : ""
              }`}
            >
              <p
                className={`text-base font-medium tracking-tight tabular-nums ${rt.heading}`}
              >
                {stat.value}
              </p>
              <p className={`mt-1 text-xs ${rt.label}`}>{stat.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className={`border-t ${rt.hairline} px-6 py-7 md:px-10`}>
        <p
          className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
        >
          Executive summary
        </p>
        <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${rt.body}`}>
          {summary}
        </p>
      </div>
    </>
  );
}

/** Full hero for callers that do not need a mid-section sticky slot. */
export default function ReadinessHero({ report, mode }: ReadinessHeroProps) {
  return (
    <section className={`border-b ${rt.hairline}`}>
      <ReadinessHeroLead report={report} />
      <ReadinessHeroBody report={report} mode={mode} />
    </section>
  );
}
