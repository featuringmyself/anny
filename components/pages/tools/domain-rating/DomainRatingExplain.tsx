const notes = [
  {
    title: "Compare with competitors",
    body: "Check a few sites that already rank for the same topics. If their Domain Rating is higher, they have stronger link popularity in Ahrefs’ index.",
  },
  {
    title: "Vet a link or guest post",
    body: "Ahrefs uses DR as a quick proxy when you size up a site to earn a link from. Still look at relevance, traffic, and whether the site is likely to last.",
  },
  {
    title: "Don’t stop at one number",
    body: "Ahrefs says Domain Rating is not a good standalone sign of quality. Pair it with the page, the topic, and — if you care about AI answers — whether models actually mention the brand.",
  },
] as const;

export function DomainRatingExplain() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          What this number is for
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Use it as a fast check — a competitor, a guest-post offer, or your
          own site — not as a full SEO audit.
        </p>
      </div>
      <ul className="grid md:grid-cols-3">
        {notes.map((note) => (
          <li
            key={note.title}
            className="border-b px-6 py-8 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 md:px-10 md:py-12"
          >
            <h3 className="text-lg font-medium">{note.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {note.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
