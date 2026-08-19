const bands = [
  {
    range: "01–03",
    label: "Above the fold",
    copy: "The three results most people see without scrolling. This is where click share concentrates.",
  },
  {
    range: "04–10",
    label: "Rest of page one",
    copy: "Still indexed as page one. Harder to win a click unless the title or brand already means something.",
  },
  {
    range: "DR",
    label: "Domain Rating",
    copy: "Strength of the ranking site’s backlink profile on Ahrefs’ 0–100 scale — how heavy the competitor is.",
  },
  {
    range: "UR",
    label: "URL Rating",
    copy: "Strength of that specific page’s links. A strong URL on a quieter domain can still sit in the top three.",
  },
] as const;

export function SerpOverviewGuide() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          How to read page one
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          This is a snapshot of organic Google results — not ads, maps, or AI
          overviews. Use it to see who already owns the query.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {bands.map((band) => (
          <article
            key={band.label}
            className="border-b px-6 py-8 last:border-b-0 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8"
          >
            <p className="font-medium tracking-tight text-zinc-300 tabular-nums">
              {band.range}
            </p>
            <h3 className="mt-3 text-lg font-medium">{band.label}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {band.copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
