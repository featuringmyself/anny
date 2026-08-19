const facts = [
  {
    title: "It’s a comparison",
    body: "Ahrefs scores a site against other sites in its index. They say a rating is “good” if it is higher than, or close to, similar sites — not because it hits a magic number.",
  },
  {
    title: "The scale gets steeper",
    body: "DR is plotted from 0 to 100 on a logarithmic scale. Moving from 20 to 30 is a smaller jump than moving from 70 to 80. Extra points at the top take far more strong links.",
  },
  {
    title: "Unique sites matter more than extra links",
    body: "Ahrefs counts unique websites that send at least one followed link. More links from the same site, or nofollowed links, do not raise Domain Rating.",
  },
  {
    title: "Who links — and how widely they link",
    body: "A stronger linking site can help more. But a high-DR site that links to huge numbers of other domains passes less of that strength to each one.",
  },
  {
    title: "It is not traffic or rankings",
    body: "Ahrefs does not fold in spam, traffic, or domain age. Google does not use this score. Treat it as a quick read on link popularity, then check the rest.",
  },
] as const;

export function DomainRatingScale() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          How to read the score
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Domain Rating is Ahrefs’ 0–100 measure of backlink strength. Here is
          what they say it actually means.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5">
        {facts.map((fact) => (
          <article
            key={fact.title}
            className="border-b px-6 py-8 last:border-b-0 sm:odd:border-r sm:nth-last-[-n+1]:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8"
          >
            <h3 className="text-lg font-medium">{fact.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {fact.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
