import { CATEGORY_META } from "@/components/pages/tools/ai-readiness/bands";
import { getAiReadiness, type CheckStatus } from "@/lib/ai-readiness";

const STATUS: Record<
  CheckStatus,
  { label: string; className: string; pip: string }
> = {
  pass: {
    label: "Pass",
    className: "text-[#147a4a]",
    pip: "bg-[#1ec97a]",
  },
  warn: {
    label: "Warn",
    className: "text-amber-700",
    pip: "bg-amber-400",
  },
  fail: {
    label: "Fail",
    className: "text-zinc-500",
    pip: "bg-zinc-300",
  },
};

export async function AiReadinessFindings({ domain }: { domain: string }) {
  const result = await getAiReadiness(domain);
  if ("error" in result) return null;

  return (
    <section className="border-b" aria-labelledby="ar-findings-heading">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Scan results
        </p>
        <h2
          id="ar-findings-heading"
          className="mt-2 text-3xl font-medium tracking-tight md:text-4xl"
        >
          {result.passed} passed · {result.failed} failed
          {result.warned ? ` · ${result.warned} warn` : ""}
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Homepage and well-known agent files for {result.domain}. This is a
          public scan, not a full audit.
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        {result.categories.map((category, index) => {
          const items = result.checks.filter(
            (check) => check.category === category.id,
          );
          const lastCol = index % 2 === 1;
          const lastRow = index >= result.categories.length - 2;

          return (
            <article
              key={category.id}
              className={`border-b px-6 py-8 md:px-10 md:py-10 ${
                lastCol ? "" : "md:border-r"
              } ${lastRow ? "last:border-b-0 md:border-b-0" : ""}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-medium">{category.label}</h3>
                <p className="text-sm font-medium tabular-nums text-[#2462ff]">
                  {category.score}
                  <span className="text-zinc-400">/{category.max}</span>
                </p>
              </div>
              <p className="mt-1 text-sm text-zinc-500">
                {CATEGORY_META[category.id].copy}
              </p>
              <ul className="mt-6 space-y-3">
                {items.map((item) => {
                  const tone = STATUS[item.status];
                  return (
                    <li key={item.id} className="flex gap-3">
                      <span
                        className={`mt-1.5 size-1.5 shrink-0 rounded-full ${tone.pip}`}
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">
                          {item.label}{" "}
                          <span className={`text-xs font-medium ${tone.className}`}>
                            {tone.label}
                          </span>
                        </p>
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
    </section>
  );
}

export function AiReadinessFindingsPending() {
  return (
    <section className="border-b px-6 py-14 md:px-12" aria-hidden>
      <div className="h-4 w-24 animate-pulse bg-zinc-200" />
      <div className="mt-4 h-10 w-full max-w-md animate-pulse bg-zinc-200" />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="h-40 animate-pulse bg-zinc-100" />
        <div className="h-40 animate-pulse bg-zinc-100" />
      </div>
    </section>
  );
}
