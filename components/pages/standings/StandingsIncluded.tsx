import { brand } from "@/components/Home/brand";
import { snapshotIncluded } from "./content";

export default function StandingsIncluded() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-10 sm:py-16 md:py-20"
      aria-labelledby="standings-included-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="standings-included-heading"
          className="text-[1.5rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          Everything in one Snapshot
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed sm:mt-4 sm:text-lg"
          style={{ color: brand.body }}
        >
          The depth of a full AI visibility audit, packaged as a white-label
          deliverable agencies can sell once and reuse as a playbook.
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-col gap-8 px-6 sm:mt-12 sm:gap-12 lg:mt-14">
        {snapshotIncluded.map((group) => (
          <div key={group.group}>
            <div className="max-w-2xl">
              <p
                className="text-xs font-bold tracking-[0.08em] uppercase"
                style={{ color: brand.tertiary }}
              >
                {group.group}
              </p>
              <p
                className="mt-1.5 hidden text-sm font-medium leading-relaxed sm:mt-2 sm:block sm:text-base"
                style={{ color: brand.body }}
              >
                {group.dek}
              </p>
            </div>
            {/* Mobile: compact title list */}
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:hidden">
              {group.items.map((item) => (
                <li
                  key={item.title}
                  className="rounded-xl border px-3.5 py-2.5 text-left text-sm font-semibold text-zinc-900"
                  style={{
                    backgroundColor: brand.cream,
                    borderColor: `${brand.ink}14`,
                  }}
                >
                  {item.title}
                </li>
              ))}
            </ul>
            {/* Desktop+: full cards */}
            <ul className="mt-5 hidden gap-3 sm:grid sm:grid-cols-2">
              {group.items.map((item) => (
                <li
                  key={item.title}
                  className="rounded-2xl border p-5 text-left"
                  style={{
                    backgroundColor: brand.cream,
                    borderColor: `${brand.ink}14`,
                  }}
                >
                  <h3 className="text-base font-bold tracking-tight text-zinc-900">
                    {item.title}
                  </h3>
                  <p
                    className="mt-2 text-sm font-medium leading-relaxed"
                    style={{ color: brand.body }}
                  >
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
