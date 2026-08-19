const notes = [
  {
    title: "What it measures",
    body: "On-site signals agents use: robots.txt, llms.txt, skill files, JSON-LD, and HTML landmarks on the homepage.",
  },
  {
    title: "What it doesn’t",
    body: "It is not whether ChatGPT already cites the brand. It is not traffic, Domain Rating, or a full accessibility audit.",
  },
  {
    title: "Why it’s free",
    body: "You shouldn’t need a login to see if a site ships the basics. Paste a domain and read the scan.",
  },
] as const;

export function AiReadinessExplain() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          A quick scan, not a full audit
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Use this when you want a snapshot of agent-readiness — yours, a
          competitor’s, or a site someone just sent you.
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
