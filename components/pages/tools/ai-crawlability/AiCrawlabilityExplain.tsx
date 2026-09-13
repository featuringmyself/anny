import Link from "next/link";

import { AI_READINESS_PATH } from "@/components/pages/tools/ai-readiness/seo";
import { DR_CHECKER_PATH } from "@/components/pages/tools/domain-rating/seo";

const notes = [
  {
    title: "What it measures",
    body: "Whether major AI crawlers can fetch the site root via robots.txt, and whether homepage, sitemap.xml, and llms.txt respond.",
  },
  {
    title: "What you leave with",
    body: "A 0–100 crawlability score, allow/block status per bot, and copy-paste robots.txt or llms.txt fixes when something is blocked.",
  },
  {
    title: "What it doesn’t",
    body: "It is not a ChatGPT mention score, not Domain Rating, and not a promise that allowing a bot will make models cite your brand.",
  },
] as const;

export function AiCrawlabilityExplain() {
  return (
    <section className="border-b border-zinc-200 bg-[#f6f7f4] px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">Why this tool</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
          Crawl access first, then readiness
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
          If GPTBot or ClaudeBot cannot fetch the site, citation tools will not
          help. Fix crawl access here, then check brand identity with the{" "}
          <Link
            href={AI_READINESS_PATH}
            className="font-medium text-zinc-800 underline-offset-4 hover:text-[#2462ff] hover:underline"
          >
            AI readiness checker
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
        <p className="mt-10 text-sm text-zinc-500">
          Related:{" "}
          <Link
            href={AI_READINESS_PATH}
            className="font-medium text-zinc-800 underline-offset-4 hover:text-[#2462ff] hover:underline"
          >
            AI readiness checker
          </Link>
          <span className="text-zinc-300"> · </span>
          <Link
            href={DR_CHECKER_PATH}
            className="font-medium text-zinc-800 underline-offset-4 hover:text-[#2462ff] hover:underline"
          >
            Domain Rating checker
          </Link>
        </p>
      </div>
    </section>
  );
}
