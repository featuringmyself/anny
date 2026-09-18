import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TERTIARY = "#025864";
const PRIMARY = "#93E85F";
const CREAM = "#f7f3ec";
const PEACH = "#fcf0e7";
const DARK = "#212529";
const BODY = "#5c6b73";

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
    <section
      className="w-full rounded-2xl bg-white py-16 sm:py-20"
      aria-labelledby="compare-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <span
          className="inline-flex items-center rounded-full border px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-xs"
          style={{ color: TERTIARY, borderColor: `${TERTIARY}55` }}
        >
          Compare
        </span>

        <h2
          id="compare-heading"
          className="mt-7 text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl"
          style={{ color: TERTIARY }}
        >
          How Anny{" "}
          <span
            className="inline-block -rotate-1 rounded-lg px-3 py-0.5 align-baseline"
            style={{ backgroundColor: TERTIARY, color: PRIMARY }}
          >
            compares
          </span>
        </h2>

        <p
          className="mt-5 max-w-md text-base font-medium leading-relaxed"
          style={{ color: BODY }}
        >
          Classic SEO tools track rankings and backlinks. Anny tracks whether AI
          answers mention your brand, then helps you change that.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 px-6">
        {compares.map((item, index) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: index % 2 === 0 ? CREAM : PEACH,
                borderColor: DARK,
              }}
            >
              <div className="text-left">
                <p className="text-base font-bold tracking-tight text-zinc-900">
                  Anny vs {item.name}
                </p>
                <p className="mt-0.5 text-sm font-medium" style={{ color: BODY }}>
                  {item.framing}
                </p>
              </div>
              <ArrowUpRight
                className="size-5 shrink-0 text-zinc-400 transition-colors group-hover:text-[#025864]"
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
