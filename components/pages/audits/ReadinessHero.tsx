import DownloadReportPdfButton from "@/components/pages/audits/DownloadReportPdfButton";
import { readinessCopy } from "./readiness-copy";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessHeroProps = {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
};

export function ReadinessHeroLead({ report }: { report: ReadinessReport }) {
  return (
    <div className="px-6 pt-10 md:px-10 md:pt-12">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
            Private report · AI readiness
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Prepared {report.dateLabel} · not a public Anny page
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
          <h1 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
            {report.company}
          </h1>
          <p className="mt-2 text-base text-zinc-500 text-balance">
            On-site readiness for AI agents — schema, crawl access, automation,
            and HTML semantics.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-xs text-zinc-400">Prepared for</dt>
              <dd className="mt-1 font-medium">
                {report.preparedFor}
                {report.role ? (
                  <span className="block font-normal text-zinc-500">
                    {report.role}
                  </span>
                ) : null}
                {report.email ? (
                  <span className="block font-normal text-zinc-500">
                    {report.email}
                  </span>
                ) : null}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-400">Website</dt>
              <dd className="mt-1 font-medium">{report.website}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-400">Industry</dt>
              <dd className="mt-1 font-medium">{report.industry}</dd>
            </div>
            <div>
              <dt className="text-xs text-zinc-400">Snapshot</dt>
              <dd className="mt-1 font-medium">{report.dateLabel}</dd>
            </div>
          </dl>
        </div>

        <aside
          aria-label="Readiness score"
          className="shrink-0 border border-zinc-300 bg-white px-6 py-5 md:min-w-[200px]"
        >
          <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
            Score
          </p>
          <p className="mt-1 text-4xl font-medium tracking-tight tabular-nums">
            {report.overallScore}
            <span className="text-xl text-zinc-400">/100</span>
          </p>
          <p className="mt-1 text-sm font-medium text-zinc-800">
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
        <div className="grid grid-cols-2 border-t border-zinc-200 md:grid-cols-4">
          {report.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-5 md:px-8 ${
                index % 2 === 0 ? "border-r border-zinc-200" : ""
              } ${index < 2 ? "border-b border-zinc-200 md:border-b-0" : ""} ${
                index < report.stats!.length - 1 ? "md:border-r md:border-zinc-200" : ""
              }`}
            >
              <p className="text-base font-medium tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="border-t border-zinc-200 px-6 py-7 md:px-10">
        <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
          Executive summary
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
          {summary}
        </p>
      </div>
    </>
  );
}

/** Full hero for callers that do not need a mid-section sticky slot. */
export default function ReadinessHero({ report, mode }: ReadinessHeroProps) {
  return (
    <section className="border-b">
      <ReadinessHeroLead report={report} />
      <ReadinessHeroBody report={report} mode={mode} />
    </section>
  );
}
