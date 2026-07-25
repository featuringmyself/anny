import Link from "next/link";

const navSections = [
  {
    title: "Get started",
    links: [
      { label: "Quickstart", href: "#quickstart" },
      { label: "Connect a brand", href: "#connect-brand" },
      { label: "First prompt set", href: "#first-prompts" },
    ],
  },
  {
    title: "Tracking",
    links: [
      { label: "Models & engines", href: "#models" },
      { label: "Mentions & sentiment", href: "#mentions" },
      { label: "Sources & citations", href: "#sources" },
    ],
  },
  {
    title: "Workspace",
    links: [
      { label: "Teams & seats", href: "#teams" },
      { label: "Alerts", href: "#alerts" },
      { label: "Exports", href: "#exports" },
    ],
  },
] as const;

const startHere = [
  {
    id: "quickstart",
    title: "Quickstart",
    dek: "Create a workspace, add one brand, and see your first AI mentions in under ten minutes.",
  },
  {
    id: "connect-brand",
    title: "Connect a brand",
    dek: "Domains, aliases, and competitor seeds Anny uses when scoring visibility.",
  },
  {
    id: "first-prompts",
    title: "First prompt set",
    dek: "How to pick buying-intent questions your customers already ask ChatGPT and Gemini.",
  },
  {
    id: "models",
    title: "Models & engines",
    dek: "Coverage across ChatGPT, Gemini, Claude, Perplexity, and Google AI Mode.",
  },
  {
    id: "mentions",
    title: "Mentions & sentiment",
    dek: "Read every answer where your brand appears — and how the model frames you.",
  },
  {
    id: "sources",
    title: "Sources & citations",
    dek: "Map the URLs AI leans on, and spot pages that cite competitors instead of you.",
  },
] as const;

export default function DocsIndex() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr]">
      <aside className="border-b md:border-b-0 md:border-r">
        <nav className="sticky top-0 px-8 py-10 md:px-6 lg:px-8" aria-label="Docs outline">
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">Outline</p>
          <div className="mt-6 flex flex-col gap-8">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-medium text-zinc-900">{section.title}</p>
                <ul className="mt-3 flex flex-col gap-2 border-l border-zinc-200">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block border-l-2 border-transparent py-0.5 pl-3 text-sm text-zinc-500 hover:border-[#2462ff] hover:text-zinc-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      <div className="px-8 py-10 md:px-10 lg:px-12">
        <h2 className="text-2xl font-medium tracking-tight">Start here</h2>
        <p className="mt-2 max-w-md text-sm text-zinc-500">
          Core paths for marketing teams shipping GEO with Anny.
        </p>
        <ul className="mt-10">
          {startHere.map((item) => (
            <li key={item.id} id={item.id} className="scroll-mt-8 border-t first:border-t-0">
              <Link
                href={`#${item.id}`}
                className="group block py-6 hover:bg-white/60"
              >
                <h3 className="text-lg font-medium tracking-tight group-hover:text-[#2462ff]">
                  {item.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-zinc-500">{item.dek}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
