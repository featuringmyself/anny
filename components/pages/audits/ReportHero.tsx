import DownloadReportPdfButton from "@/components/pages/audits/DownloadReportPdfButton";
import type { VisibilityReport } from "./types";

type ReportHeroProps = {
  report: VisibilityReport;
};

export default function ReportHero({ report }: ReportHeroProps) {
  return (
    <section className="border-b">
      <div className="px-6 pt-14 md:px-12 md:pt-20">
        <div className="mb-4 flex items-center justify-between gap-4">
          <p className="text-sm font-medium text-[#2462ff]">
            Anny · AI visibility audit
          </p>
          <DownloadReportPdfButton
            slug={report.slug}
            company={report.company}
            className="shrink-0"
          />
        </div>
      </div>

      <div className="flex flex-col gap-10 px-6 pb-14 md:flex-row md:items-end md:justify-between md:px-12 md:pb-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
            {report.company}
          </h1>
          <p className="mt-3 text-lg text-zinc-500 text-balance md:text-xl">
            {report.tagline ??
              `How often AI answers cite ${report.company} when buyers ask for recommendations, and where competitors win instead.`}
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-zinc-400">Prepared for</dt>
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
              <dt className="text-zinc-400">Company</dt>
              <dd className="mt-1 font-medium">{report.website}</dd>
            </div>
            <div>
              <dt className="text-zinc-400">Industry</dt>
              <dd className="mt-1 font-medium">{report.industry}</dd>
            </div>
            <div>
              <dt className="text-zinc-400">Snapshot</dt>
              <dd className="mt-1 font-medium">{report.dateLabel}</dd>
            </div>
          </dl>
        </div>

        <aside
          aria-label="Visibility score"
          className="shrink-0 border border-zinc-200 bg-white px-8 py-7 md:min-w-[220px]"
        >
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            Visibility score
          </p>
          <p className="mt-2 text-5xl font-medium tracking-tight tabular-nums">
            {report.overallScore}
            <span className="text-2xl text-zinc-400">%</span>
          </p>
          <p className="mt-2 text-sm font-medium text-[#2462ff]">
            {report.scoreLabel}
          </p>
          <p className="mt-3 max-w-[14rem] text-xs leading-relaxed text-zinc-500">
            Share of audited prompts where {report.company} is cited
            {report.modelScores.some((s) => s.audited === false)
              ? " in this ChatGPT snapshot"
              : " across models"}
            .
          </p>
        </aside>
      </div>

      {report.stats?.length ? (
        <div className="grid grid-cols-2 border-t md:grid-cols-4">
          {report.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-6 md:px-8 ${
                index % 2 === 0 ? "border-r" : ""
              } ${index < 2 ? "border-b md:border-b-0" : ""} ${
                index < report.stats!.length - 1 ? "md:border-r" : ""
              }`}
            >
              <p className="text-lg font-medium tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>
      ) : null}

      <div className="border-t px-6 py-8 md:px-12">
        <p className="max-w-3xl text-base leading-relaxed text-zinc-600 text-balance">
          {report.summary}
        </p>
      </div>
    </section>
  );
}
