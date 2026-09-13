import Link from "next/link";

import { AI_CRAWL_PATH } from "@/components/pages/tools/ai-crawlability/seo";

const notes = [
  {
    title: "What it measures",
    body: "Whether ChatGPT-class crawlers can fetch the site, and whether the homepage names the brand in title, H1, and Organization schema.",
  },
  {
    title: "What you leave with",
    body: "A 0–100 score and copy-paste snippets, robots.txt allow rules, JSON-LD, a meta description, or a sitemap pointer, not just a pass/fail list.",
  },
  {
    title: "What it doesn’t",
    body: "It is not a ChatGPT mention score, not Domain Rating, and not a promise that llms.txt will rank you in AI answers.",
  },
] as const;

export function AiReadinessExplain() {
  return (
    <section className="border-b border-zinc-200 bg-[#f6f7f4] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">Why this tool</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
          Built to give you something to ship
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
          Most “AI ready” checklists fail you for missing MCP cards. This one
          scores what actually gates retrieval, then hands you the file. For
          crawl access alone, start with the{" "}
          <Link
            href={AI_CRAWL_PATH}
            className="font-medium text-zinc-800 underline-offset-4 hover:text-[#2462ff] hover:underline"
          >
            AI crawlability checker
          </Link>
          .
        </p>
        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {notes.map((note) => (
            <li key={note.title}>
              <h3 className="text-lg font-medium text-zinc-900">{note.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {note.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
