import ChangelogEntryMotion from "@/components/pages/product/ChangelogEntryMotion";

const entries = [
  {
    version: "v0.9.2",
    date: "Jul 18, 2026",
    title: "AI Mode dual-panel tracker",
    body: "Side-by-side Google AI Mode and AI Overview mention capture, with citation chips and daily score deltas.",
    tags: ["Feature", "AI Mode"],
  },
  {
    version: "v0.9.0",
    date: "Jul 2, 2026",
    title: "Competitor visibility ladders",
    body: "Rank your brand against peers on shared prompts. Export scorecards for weekly GEO reviews.",
    tags: ["Feature"],
  },
  {
    version: "v0.8.4",
    date: "Jun 14, 2026",
    title: "Gemini multi-turn citation board",
    body: "Follow how Gemini revises answers across turns and which sources stick in the final reply.",
    tags: ["Gemini", "Improvement"],
  },
  {
    version: "v0.8.1",
    date: "May 28, 2026",
    title: "Slack mention alerts",
    body: "Push critical visibility drops and new competitor citations into the channel your team already lives in.",
    tags: ["Integrations"],
  },
  {
    version: "v0.7.0",
    date: "May 5, 2026",
    title: "Agency workspaces",
    body: "Multi-client switching, per-brand prompt budgets, and white-label PDF exports for retainers.",
    tags: ["Agencies", "Feature"],
  },
] as const;

export default function ChangelogTimeline() {
  return (
    <section className="px-8 py-12 md:px-12 md:py-16">
      <ol className="relative mx-auto max-w-3xl border-l border-zinc-200">
        {entries.map((entry, index) => (
          <li key={entry.version} className="relative pb-12 last:pb-0 pl-8 md:pl-10">
            <span
              className="absolute top-1.5 -left-[5px] size-2.5 rounded-full border-2 border-[#2462ff] bg-[#F7F7F7]"
              aria-hidden
            />
            <ChangelogEntryMotion delay={index * 0.04}>
              <article>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <time className="text-sm text-zinc-500 tabular-nums">{entry.date}</time>
                  <span className="border border-zinc-200 px-2 py-0.5 font-mono text-xs text-zinc-700">
                    {entry.version}
                  </span>
                  {entry.tags.map((tag) => (
                    <span key={tag} className="text-xs font-medium tracking-wide text-[#2462ff]">
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-3 text-xl font-medium tracking-tight md:text-2xl">{entry.title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 md:text-base">
                  {entry.body}
                </p>
              </article>
            </ChangelogEntryMotion>
          </li>
        ))}
      </ol>
    </section>
  );
}
