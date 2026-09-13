import Link from "next/link";

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
    framing: "Free 0–100 Ahrefs Domain Rating lookup",
  },
] as const;

export default function FreeToolsStrip() {
  return (
    <section
      aria-labelledby="free-tools-heading"
      className="border-b px-6 py-16 md:px-12 md:py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2
          id="free-tools-heading"
          className="text-3xl font-medium tracking-tight md:text-4xl"
        >
          Free tools
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-snug text-balance text-zinc-500 md:text-lg">
          Check on-site AI access and Domain Rating without an Anny account.
        </p>
      </div>

      <ul className="mx-auto mt-12 max-w-2xl divide-y border-y">
        {tools.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex flex-col gap-1 py-5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
            >
              <span className="text-base font-medium tracking-tight group-hover:text-[#2462ff] md:text-lg">
                {item.name}
              </span>
              <span className="text-sm text-zinc-500 sm:text-right">
                {item.framing}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-zinc-500">
        <Link href="/tools" className="font-medium text-[#2462ff] hover:underline">
          Browse all free tools
        </Link>
      </p>
    </section>
  );
}
