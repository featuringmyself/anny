const notes = [
  {
    title: "What it measures",
    body: "How strong a website’s backlink profile is. More quality links usually means a higher score.",
  },
  {
    title: "What it doesn’t",
    body: "It is not Google’s ranking. It is not traffic, revenue, or whether ChatGPT mentions the brand.",
  },
  {
    title: "Why it’s free",
    body: "You shouldn’t need an account to check one domain. Paste it here and read the dial.",
  },
] as const;

export function DomainRatingExplain() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          A quick check, not a full audit
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Use this when someone sends you a site, a guest-post offer, or a
          competitor — and you want the number in a few seconds.
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
