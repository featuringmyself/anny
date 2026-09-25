import { brand } from "@/components/Home/brand";
import { SNAPSHOT_INCLUDED_PROMPTS } from "@/lib/snapshots-pricing";
import { snapshotPromptPaths, snapshotUseCases } from "./content";

export default function StandingsPrompts() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="standings-prompts-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-20">
        <h2
          id="standings-prompts-heading"
          className="text-3xl font-bold tracking-tight text-white sm:text-4xl"
        >
          {SNAPSHOT_INCLUDED_PROMPTS} prompts: your call how they’re chosen
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed text-neutral-200/90">
          Approve every query before we run. Need more than{" "}
          {SNAPSHOT_INCLUDED_PROMPTS}? Extra prompts are billed as add-ons and
          confirmed up front.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 px-6 pt-10 sm:grid-cols-2">
        {snapshotPromptPaths.map((path) => (
          <article
            key={path.title}
            className="rounded-2xl p-6 text-left ring-1 ring-white/10"
            style={{ backgroundColor: "#0c242b" }}
          >
            <h3 className="text-lg font-bold text-white">{path.title}</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/55">
              {path.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-10 pb-16 sm:pb-20">
        <p className="text-center text-xs font-bold tracking-[0.08em] text-white/40 uppercase">
          Common agency use cases
        </p>
        <ul className="mt-5 grid gap-4 sm:grid-cols-3">
          {snapshotUseCases.map((item) => (
            <li key={item.title} className="text-center sm:text-left">
              <p className="text-sm font-bold" style={{ color: brand.lime }}>
                {item.title}
              </p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-white/55">
                {item.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
