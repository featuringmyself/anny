import { brand } from "@/components/Home/brand";

export default function StandingsProblem() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="standings-problem-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-6 px-6 py-10 md:grid-cols-2 md:items-center md:gap-12 md:py-20">
        <div>
          <h2
            id="standings-problem-heading"
            className="text-[1.5rem] leading-[1.15] font-bold tracking-tight text-white sm:text-4xl"
          >
            Clients already ask where they show up in AI.
          </h2>
          <p className="mt-3 max-w-md text-sm font-medium leading-relaxed text-neutral-200/90 sm:mt-5 sm:text-lg">
            Screenshots in a deck don’t survive a skeptical CMO. A Snapshot is a
            dated, branded standing with visibility, competitors, citations, and
            website readiness you can put on a rate card and defend in the room.
          </p>
        </div>

        <aside
          className="rounded-2xl p-4 ring-1 ring-white/10 sm:p-7"
          style={{ backgroundColor: "#0c242b" }}
        >
          <p className="text-[11px] font-semibold tracking-[0.08em] text-white/40 uppercase">
            What agencies use it for
          </p>
          <ul className="mt-3 space-y-3 sm:mt-5 sm:space-y-4">
            {[
              {
                title: "Pitch",
                body: "Show the prospect their gap before they ask for a strategy slide.",
              },
              {
                title: "Kickoff",
                body: "Freeze a baseline so every retainer report has a before.",
              },
              {
                title: "Upsell",
                body: "Answer “what about ChatGPT?” on an SEO or PR account without inventing a new service.",
              },
            ].map((item) => (
              <li key={item.title}>
                <p
                  className="text-sm font-bold"
                  style={{ color: brand.lime }}
                >
                  {item.title}
                </p>
                <p className="mt-0.5 text-sm font-medium leading-snug text-white/55 sm:mt-1 sm:leading-relaxed">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
