const bands = [
  {
    range: "Paid",
    label: "Ads",
    copy: "Top, right, and bottom paid listings Ahrefs recorded — plus paid sitelinks when they appear.",
  },
  {
    range: "Features",
    label: "SERP features",
    copy: "Snippets, local packs, knowledge panels, People Also Ask, images, news, and the rest of the feature types Ahrefs returns.",
  },
  {
    range: "Organic",
    label: "Top 10 organic",
    copy: "The classic blue links. Sitelinks nest under a result. Each row includes Domain Rating and URL Rating.",
  },
  {
    range: "DR / UR",
    label: "Link metrics",
    copy: "DR is the ranking site’s backlink strength. UR is that page’s. Neither is Google’s ranking, and neither is an AI citation.",
  },
] as const;

export function SerpOverviewGuide() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          How to read the snapshot
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          This is Ahrefs’ SERP Overview — the composition of the results page,
          not a live Google request.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4">
        {bands.map((band) => (
          <article
            key={band.label}
            className="border-b px-6 py-8 last:border-b-0 sm:odd:border-r lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8"
          >
            <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
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
