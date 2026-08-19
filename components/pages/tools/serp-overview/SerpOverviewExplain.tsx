const notes = [
  {
    title: "What it shows",
    body: "Who currently ranks organically for a keyword in one country, plus each result’s Domain Rating and URL Rating from Ahrefs.",
  },
  {
    title: "What it doesn’t",
    body: "It is not live Google, not paid ads, and not whether ChatGPT would cite those pages. It is the last Ahrefs snapshot of page one.",
  },
  {
    title: "When to use it",
    body: "Before you write the page, pitch the guest post, or pick a competitor to watch — so you know whose links and titles you are up against.",
  },
] as const;

export function SerpOverviewExplain() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          A snapshot, not a rank tracker
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Domain Rating is one number for one site. A SERP is ten pages fighting
          over the same query. This tool is for that fight.
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
