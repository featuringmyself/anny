import { MODEL_META } from "./models";
import type { VisibilityReport } from "./types";

type ReportScoreStripProps = {
  report: VisibilityReport;
};

export default function ReportScoreStrip({ report }: ReportScoreStripProps) {
  const hasUnaudited = report.modelScores.some((s) => s.audited === false);

  return (
    <section className="border-b">
      <div className="border-b px-6 py-8 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">By model</h2>
        <p className="mt-1 max-w-lg text-sm text-zinc-500">
          {hasUnaudited
            ? `This snapshot audited ChatGPT across ${report.queries.length} buyer prompts. Perplexity, Google AI Overview, Gemini, Claude, and AI Mode are in scope with the same prompt set.`
            : `Same prompt set across answer surfaces. Scores are citation rate across the ${report.queries.length} queries in this audit.`}
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3">
        {report.modelScores.map((score) => {
          const meta = MODEL_META[score.model];
          const unaudited = score.audited === false;
          return (
            <article
              key={score.model}
              className="flex flex-col gap-4 border-b px-6 py-7 sm:odd:border-r lg:border-r lg:[&:nth-child(3n)]:border-r-0 md:px-8 nth-last-[-n+1]:border-b-0 sm:nth-last-[-n+2]:border-b-0 lg:nth-last-[-n+3]:border-b-0"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={meta.logo}
                    alt={`${meta.name} logo`}
                    width={18}
                    height={18}
                    className="size-[18px] object-contain"
                    draggable={false}
                  />
                  <span className="text-sm font-medium">{meta.name}</span>
                </div>
                {unaudited ? (
                  <span className="text-[10px] font-medium tracking-wide text-zinc-400 uppercase">
                    Sprint
                  </span>
                ) : score.audited ? (
                  <span className="text-[10px] font-medium tracking-wide text-[#2462ff] uppercase">
                    Audited
                  </span>
                ) : null}
              </div>
              <div className="flex items-end justify-between gap-4">
                <p className="text-3xl font-medium tracking-tight tabular-nums">
                  {unaudited ? "N/A" : score.visibility}
                  {!unaudited ? (
                    <span className="text-lg text-zinc-400">%</span>
                  ) : null}
                </p>
                <p className="pb-1 text-xs text-zinc-400 tabular-nums">
                  {unaudited
                    ? "Not in this snapshot"
                    : `${score.cited}/${score.total} prompts`}
                </p>
              </div>
              <div className="h-1 w-full bg-zinc-200">
                <div
                  className="h-full"
                  style={{
                    width: unaudited ? "0%" : `${score.visibility}%`,
                    backgroundColor: meta.accent,
                  }}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
