import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { brand } from "@/components/Home/brand";

/**
 * One job: further exploration without splitting attention across
 * two near-identical list sections.
 */
const links = [
  {
    href: "/services",
    name: "Managed GEO services",
    framing: "Done-for-you strategy, execution, audits, and training",
    group: "Services",
  },
  {
    href: "/tools/ai-readiness-checker",
    name: "AI readiness checker",
    framing: "Free. Can models crawl and name your site?",
    group: "Tools",
  },
  {
    href: "/tools/ai-crawlability-checker",
    name: "AI crawlability checker",
    framing: "Free. Which bots are allowed or blocked?",
    group: "Tools",
  },
  {
    href: "/compare/profound",
    name: "Dodox vs Profound",
    framing: "How we differ from peer AI visibility tools",
    group: "Compare",
  },
  {
    href: "/compare/ahrefs",
    name: "Dodox vs Ahrefs",
    framing: "SEO rankings vs AI answer mentions",
    group: "Compare",
  },
] as const;

export default function ExploreStrip() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-16 sm:py-20"
      aria-labelledby="explore-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="explore-heading"
          className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl"
          style={{ color: brand.tertiary }}
        >
          Explore on your own
        </h2>
        <p
          className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-pretty"
          style={{ color: brand.body }}
        >
          Free checks and honest comparisons. No signup required.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 px-6 sm:grid-cols-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border p-5 text-left transition-transform hover:-translate-y-0.5"
              style={{
                backgroundColor: brand.cream,
                borderColor: `${brand.ink}22`,
              }}
            >
              <span
                className="text-[11px] font-semibold tracking-[0.08em] uppercase"
                style={{ color: brand.tertiary }}
              >
                {item.group}
              </span>
              <span className="mt-2 flex items-start justify-between gap-2">
                <span className="text-base font-bold tracking-tight text-zinc-900">
                  {item.name}
                </span>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-zinc-400 transition-colors group-hover:text-[#025864]"
                  aria-hidden
                />
              </span>
              <span
                className="mt-1.5 text-sm font-medium leading-snug"
                style={{ color: brand.body }}
              >
                {item.framing}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-sm font-semibold">
        <Link
          href="/tools"
          className="underline-offset-2 hover:underline"
          style={{ color: brand.tertiary }}
        >
          All free tools
        </Link>
        <span className="mx-2 text-zinc-300">·</span>
        <Link
          href="/pricing"
          className="underline-offset-2 hover:underline"
          style={{ color: brand.tertiary }}
        >
          Pricing
        </Link>
      </p>
    </section>
  );
}
