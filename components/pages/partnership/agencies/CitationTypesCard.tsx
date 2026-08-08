const citationTypes = [
  { label: "article", count: 198, color: "#3B82F6" },
  { label: "product page", count: 111, color: "#14B8A6" },
  { label: "listicle", count: 98, color: "#22C55E" },
  { label: "guide", count: 53, color: "#EAB308" },
  { label: "post", count: 47, color: "#F97316" },
  { label: "landing page", count: 43, color: "#818CF8" },
  { label: "thread", count: 29, color: "#A855F7" },
  { label: "documentation", count: 23, color: "#38BDF8" },
  { label: "product review", count: 15, color: "#EC4899" },
  { label: "video", count: 11, color: "#EF4444" },
  { label: "comparison", count: 8, color: "#FB923C" },
  { label: "directory", count: 5, color: "#71717A" },
  { label: "homepage", count: 4, color: "#D946EF" },
  { label: "wiki page", count: 2, color: "#84CC16" },
] as const;

const TOTAL = citationTypes.reduce((sum, item) => sum + item.count, 0);
const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function DonutChart() {
  let offset = 0;

  return (
    <div className="relative size-[148px] shrink-0 md:size-[160px]">
      <svg viewBox="0 0 140 140" className="size-full -rotate-90" aria-hidden>
        {citationTypes.map((item) => {
          const length = (item.count / TOTAL) * CIRCUMFERENCE;
          const segment = (
            <circle
              key={item.label}
              cx="70"
              cy="70"
              r={RADIUS}
              fill="none"
              stroke={item.color}
              strokeWidth="16"
              strokeDasharray={`${length} ${CIRCUMFERENCE - length}`}
              strokeDashoffset={-offset}
              strokeLinecap="butt"
            />
          );
          offset += length;
          return segment;
        })}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tracking-tight text-zinc-900 tabular-nums">
          {TOTAL}
        </span>
        <span className="text-[10px] font-medium tracking-wider text-zinc-400 uppercase">
          URLs
        </span>
      </div>
    </div>
  );
}

export default function CitationTypesCard() {
  return (
    <div
      role="img"
      aria-label="Citation types breakdown for the last 7 days showing 647 URLs across articles, product pages, listicles, guides, and other source types"
      className="w-full rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)] md:p-6"
    >
      <div>
        <h3 className="text-base font-semibold text-zinc-900">Citation Types</h3>
        <p className="mt-0.5 text-sm text-zinc-400">
          Showing data for the last 7 days
        </p>
      </div>

      <div className="mt-6 flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:gap-6 lg:gap-8">
        <DonutChart />
        <ul className="grid w-full grid-cols-1 gap-y-1.5 text-[13px] text-zinc-600 sm:flex-1">
          {citationTypes.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
                aria-hidden
              />
              <span>
                {item.label}{" "}
                <span className="text-zinc-400">({item.count})</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
