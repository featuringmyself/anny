import { CopySnippet } from "@/components/pages/tools/ai-readiness/CopySnippet";
import { AiReadinessSeeFullReport } from "@/components/pages/tools/ai-readiness/AiReadinessSeeFullReport";
import {
  bandForScore,
  CATEGORY_META,
} from "@/components/pages/tools/ai-readiness/bands";
import { getAiReadiness, type CheckStatus } from "@/lib/ai-readiness";

const STATUS: Record<
  CheckStatus,
  { label: string; text: string; pip: string; chip: string }
> = {
  pass: {
    label: "Pass",
    text: "text-emerald-700",
    pip: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700",
  },
  warn: {
    label: "Partial",
    text: "text-amber-700",
    pip: "bg-amber-400",
    chip: "bg-amber-50 text-amber-800",
  },
  fail: {
    label: "Fix",
    text: "text-red-600",
    pip: "bg-red-500",
    chip: "bg-red-50 text-red-700",
  },
  skip: {
    label: "Optional",
    text: "text-zinc-400",
    pip: "bg-zinc-300",
    chip: "bg-zinc-100 text-zinc-500",
  },
};

export async function AiReadinessFindings({ domain }: { domain: string }) {
  const result = await getAiReadiness(domain);
  if ("error" in result) return null;

  const band = bandForScore(result.score).label;

  return (
    <>
      <section
        className="border-b border-zinc-200 bg-white"
        aria-labelledby="ar-findings-heading"
      >
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-16">
          <p className="text-sm font-medium text-[#2462ff]">What to do next</p>
          <h2
            id="ar-findings-heading"
            className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl"
          >
            {result.actions.length
              ? `${result.actions.length} fix${result.actions.length === 1 ? "" : "es"} that add real value`
              : "On-site basics look solid"}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
            {result.summary}
          </p>

          {result.actions.length ? (
            <ol className="mt-10 grid gap-4 lg:grid-cols-3">
              {result.actions.map((action, index) => (
                <li
                  key={action.id}
                  className="flex flex-col border border-zinc-200 bg-[#f6f7f4]/60 p-5 md:p-6"
                >
                  <p className="text-[11px] font-medium tracking-wide text-[#2462ff] uppercase">
                    {action.impact} impact · {index + 1}
                  </p>
                  <h3 className="mt-2 text-lg font-medium text-zinc-900">
                    {action.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500">
                    {action.why}
                  </p>
                  {action.snippet ? (
                    <CopySnippet
                      filename={action.snippet.filename}
                      code={action.snippet.code}
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          ) : null}

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {result.categories.map((category) => {
              const items = result.checks.filter(
                (item) => item.category === category.id,
              );

              return (
                <article key={category.id} className="min-w-0">
                  <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-3">
                    <div>
                      <h3 className="text-lg font-medium text-zinc-900">
                        {category.label}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-500">
                        {CATEGORY_META[category.id].copy}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium tabular-nums text-[#2462ff]">
                      {category.score}
                      <span className="text-zinc-400">/{category.max}</span>
                    </p>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {items.map((item) => {
                      const tone = STATUS[item.status];
                      return (
                        <li
                          key={item.id}
                          className="flex gap-3 rounded-md px-1 py-1.5"
                        >
                          <span
                            className={`mt-1.5 size-1.5 shrink-0 rounded-full ${tone.pip}`}
                            aria-hidden
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-medium text-zinc-900">
                                {item.label}
                              </p>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase ${tone.chip}`}
                              >
                                {tone.label}
                              </span>
                            </div>
                            <p className="mt-0.5 text-sm leading-relaxed text-zinc-500">
                              {item.detail}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <AiReadinessSeeFullReport
        domain={result.domain}
        origin={result.origin}
        score={result.score}
        band={band}
      />
    </>
  );
}

export function AiReadinessFindingsPending() {
  return (
    <section
      className="border-b border-zinc-200 bg-white px-6 py-14 md:px-10"
      aria-hidden
    >
      <div className="mx-auto max-w-5xl">
        <div className="h-4 w-28 animate-pulse rounded bg-zinc-200" />
        <div className="mt-4 h-10 w-full max-w-md animate-pulse rounded bg-zinc-200" />
        <div className="mt-3 h-4 w-full max-w-xl animate-pulse rounded bg-zinc-100" />
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <div className="h-44 animate-pulse rounded bg-zinc-100" />
          <div className="h-44 animate-pulse rounded bg-zinc-100" />
          <div className="h-44 animate-pulse rounded bg-zinc-100" />
        </div>
      </div>
    </section>
  );
}
