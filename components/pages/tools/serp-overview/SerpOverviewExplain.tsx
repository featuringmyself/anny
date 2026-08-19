const notes = [
  {
    title: "What it shows",
    body: "Ahrefs’ last snapshot of the Google SERP for a keyword in one country: organic rankings, paid ads, and SERP features, with DR, UR, backlinks, and page type when Ahrefs has them.",
  },
  {
    title: "What it doesn’t",
    body: "It is not live Google. It is not whether ChatGPT would cite those pages. Traffic and dollar-value columns are omitted so a lookup stays cheap.",
  },
  {
    title: "When to use it",
    body: "Before you write the page or pick a competitor — so you see ads, featured snippets, and local packs sitting above the blue links you hoped to win.",
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
          SERP Overview is the layout of the results page. Use it to see who
          already occupies the query — and with which features.
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
