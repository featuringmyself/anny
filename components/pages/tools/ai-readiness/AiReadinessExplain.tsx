const notes = [
  {
    title: "What it measures",
    body: "Whether ChatGPT-class crawlers can fetch the site, and whether the homepage names the brand in title, H1, and Organization schema.",
  },
  {
    title: "What you leave with",
    body: "A 0–100 score and copy-paste snippets — robots.txt allow rules, JSON-LD, a meta description, or a sitemap pointer — not just a pass/fail list.",
  },
  {
    title: "What it doesn’t",
    body: "It is not a ChatGPT mention score, not Domain Rating, and not a promise that llms.txt will rank you in AI answers.",
  },
] as const;

export function AiReadinessExplain() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Built to give you something to ship
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Most “AI ready” checklists fail you for missing MCP cards. This one
          scores what actually gates retrieval — then hands you the file.
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
