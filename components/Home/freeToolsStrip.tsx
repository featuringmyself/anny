import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const TERTIARY = "#025864";
const PRIMARY = "#93E85F";
const CREAM = "#f7f3ec";
const PEACH = "#fcf0e7";
const DARK = "#212529";
const BODY = "#5c6b73";

const tools = [
  {
    href: "/tools/ai-readiness-checker",
    name: "AI readiness checker",
    framing: "Can ChatGPT crawl and name the site?",
  },
  {
    href: "/tools/ai-crawlability-checker",
    name: "AI crawlability checker",
    framing: "Which AI bots are allowed or blocked?",
  },
  {
    href: "/tools/domain-rating-checker",
    name: "Domain Rating checker",
    framing: "Free 0-100 Ahrefs Domain Rating lookup",
  },
] as const;

export default function FreeToolsStrip() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-16 sm:py-20"
      aria-labelledby="free-tools-heading"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">
        <span
          className="inline-flex items-center rounded-full border px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-xs"
          style={{ color: TERTIARY, borderColor: `${TERTIARY}55` }}
        >
          Free tools
        </span>

        <h2
          id="free-tools-heading"
          className="mt-7 text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl"
          style={{ color: TERTIARY }}
        >
          Start without an{" "}
          <span
            className="inline-block -rotate-1 rounded-lg px-3 py-0.5 align-baseline"
            style={{ backgroundColor: TERTIARY, color: PRIMARY }}
          >
            account
          </span>
        </h2>

        <p
          className="mt-5 max-w-md text-base font-medium leading-relaxed"
          style={{ color: BODY }}
        >
          Check on-site AI access and Domain Rating in a few seconds.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-3xl gap-3 px-6">
        {tools.map((item, index) => (
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
                  {item.name}
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

      <p className="mx-auto mt-8 max-w-3xl px-6 text-center text-sm font-semibold">
        <Link
          href="/tools"
          className="underline-offset-2 hover:underline"
          style={{ color: TERTIARY }}
        >
          Browse all free tools
        </Link>
      </p>
    </section>
  );
}
