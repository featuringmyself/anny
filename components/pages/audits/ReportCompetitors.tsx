import type { VisibilityReport } from "./types";

type ReportCompetitorsProps = {
  report: VisibilityReport;
};

export default function ReportCompetitors({ report }: ReportCompetitorsProps) {
  const max = Math.max(...report.competitors.map((c) => c.visibility), 1);

  return (
    <section className="border-b">
      <div className="grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="border-b px-6 py-10 md:border-r md:border-b-0 md:px-12 md:py-14">
          <h2 className="text-2xl font-medium tracking-tight">
            Competitive share of voice
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">
            How often each brand shows up in the audited ChatGPT shortlists.
            Relative to this snapshot, not a global market share number.
          </p>
        </div>

        <div className="divide-y">
          {report.competitors.map((competitor) => {
            const isBrand =
              competitor.name.toLowerCase() === report.company.toLowerCase();
            return (
              <div
                key={competitor.name}
                className="flex items-center gap-4 px-6 py-5 md:px-10"
              >
                <div className="w-36 shrink-0 sm:w-44">
                  <p
                    className={`text-sm font-medium ${
                      isBrand ? "text-[#2462ff]" : ""
                    }`}
                  >
                    {competitor.name}
                    {isBrand ? (
                      <span className="ml-1.5 text-xs font-normal text-zinc-400">
                        you
                      </span>
                    ) : null}
                  </p>
                </div>
                <div className="h-1.5 min-w-0 flex-1 bg-zinc-200">
                  <div
                    className={`h-full ${isBrand ? "bg-[#2462ff]" : "bg-zinc-800"}`}
                    style={{
                      width: `${(competitor.visibility / max) * 100}%`,
                    }}
                  />
                </div>
                <p className="w-12 shrink-0 text-right text-sm tabular-nums text-zinc-500">
                  {competitor.visibility}%
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
