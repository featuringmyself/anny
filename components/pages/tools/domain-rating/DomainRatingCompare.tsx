const metrics = [
  {
    provider: "Ahrefs",
    name: "Domain Rating (DR)",
    thisTool: true,
    scale: "0–100",
    measures:
      "How strong a site’s backlink profile is versus other sites in Ahrefs’ index. Ahrefs does not include traffic, spam, or domain age.",
  },
  {
    provider: "Moz",
    name: "Domain Authority (DA)",
    thisTool: false,
    scale: "1–100",
    measures:
      "Moz’s prediction of how likely a site is to rank, compared with others. It uses a machine-learning model on their link index. It is not a Google ranking factor.",
  },
  {
    provider: "Semrush",
    name: "Authority Score",
    thisTool: false,
    scale: "1–100",
    measures:
      "Semrush’s overall quality score. They combine link strength, estimated organic traffic, and checks for spammy link patterns.",
  },
] as const;

export function DomainRatingCompare() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Domain Rating is not Domain Authority
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          People search “DA checker,” “website authority,” and “DR checker”
          for the same job. The number you get depends on the company. This
          page only returns Ahrefs Domain Rating.
        </p>
      </div>
      <ul className="grid md:grid-cols-3">
        {metrics.map((metric) => (
          <li
            key={metric.name}
            className="border-b px-6 py-8 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 md:px-10 md:py-12"
          >
            <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              {metric.thisTool ? "This checker" : metric.provider}
            </p>
            <h3 className="mt-2 text-lg font-medium">{metric.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">Scale {metric.scale}</p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {metric.measures}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
