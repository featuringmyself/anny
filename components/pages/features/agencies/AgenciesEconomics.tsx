const benchmarks = [
  {
    value: "$1.5k–$6k",
    unit: "per client / mo",
    label: "What agencies bill for GEO",
    body: "Tracking-and-reporting retainers sit at the lower end; full content and earned-media programs at the top.",
  },
  {
    value: "+20–30%",
    unit: "on existing SEO fees",
    label: "The easiest upsell",
    body: "AI visibility bolts onto retainers you already have. No new logo needed to grow the account.",
  },
  {
    value: "50–70%",
    unit: "gross margin",
    label: "Once you pass ~10 clients",
    body: "Your Anny cost is flat and discounted; client revenue scales per account. The spread is yours.",
  },
] as const;

export default function AgenciesEconomics() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">The business case</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-medium tracking-tight text-balance md:text-3xl">
          GEO is the highest-margin line item you can add this quarter
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
          You are already having the conversation with clients. Anny is the tooling layer that makes
          it billable — priced so one client covers the platform and the rest is margin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3">
        {benchmarks.map((item, index) => (
          <div
            key={item.label}
            className={`border-b p-8 last:border-b-0 md:border-b-0 md:p-10 ${
              index < benchmarks.length - 1 ? "md:border-r" : ""
            }`}
          >
            <div className="flex items-end gap-2">
              <span className="text-3xl font-medium tracking-tight tabular-nums md:text-4xl">
                {item.value}
              </span>
              <span className="pb-1 text-xs text-zinc-400">{item.unit}</span>
            </div>
            <h3 className="mt-4 text-lg font-medium tracking-tight">{item.label}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">{item.body}</p>
          </div>
        ))}
      </div>

      <div className="border-t px-6 py-5 md:px-12">
        <p className="max-w-2xl text-xs text-zinc-400">
          Ranges reflect published 2026 agency benchmarks for GEO and AI-visibility retainers. What
          you charge is yours to set — Anny never appears on the client invoice.
        </p>
      </div>
    </section>
  );
}
