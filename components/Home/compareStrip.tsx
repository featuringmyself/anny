import Link from "next/link";

import { PatternStrip } from "@/components/pages/shared/pattern-strip";

const compares = [
  {
    href: "/compare/ahrefs",
    name: "Ahrefs",
    framing: "SEO-first vs AI answer visibility",
  },
  {
    href: "/compare/semrush",
    name: "Semrush",
    framing: "Marketing suite vs purpose-built GEO",
  },
  {
    href: "/compare/profound",
    name: "Profound",
    framing: "Peer AI visibility tools compared",
  },
] as const;

export default function CompareStrip() {
  return (
    <>
      <PatternStrip />
      <section
        aria-labelledby="compare-heading"
        className="border-b px-6 py-16 md:px-12 md:py-20"
      >
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="compare-heading"
            className="text-3xl font-medium tracking-tight md:text-4xl"
          >
            How Anny compares
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-snug text-balance text-zinc-500 md:text-lg">
            Classic SEO tools track rankings and backlinks. Anny tracks whether
            AI answers mention your brand.
          </p>
        </div>

        <ul className="mx-auto mt-12 max-w-2xl divide-y border-y">
          {compares.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-base font-medium tracking-tight group-hover:text-[#2462ff] md:text-lg">
                  Anny vs {item.name}
                </span>
                <span className="text-sm text-zinc-500 sm:text-right">
                  {item.framing}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
