import {
  AI_CRAWL_BOTS,
  CRAWL_CHECK_BUCKETS,
} from "@/components/pages/tools/ai-crawlability/bots";

export function AiCrawlabilityChecks() {
  return (
    <section
      className="border-b border-zinc-200 bg-[#f6f7f4] px-6 py-16 md:px-10 md:py-24"
      aria-labelledby="crawl-checks-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">Coverage</p>
        <h2
          id="crawl-checks-heading"
          className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl"
        >
          What we scan
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
          Four signals from the site root, plus allow/block status for{" "}
          {AI_CRAWL_BOTS.length} major AI crawler user agents.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {CRAWL_CHECK_BUCKETS.map((item, index) => (
            <article key={item.id}>
              <p className="text-[11px] font-medium tracking-wide text-[#2462ff] uppercase">
                0{index + 1}
              </p>
              <h3 className="mt-2 text-lg font-medium text-zinc-900">
                {item.label}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-500">
                {item.copy}
              </p>
            </article>
          ))}
        </div>

        <h3 className="mt-14 text-lg font-medium text-zinc-900">
          AI crawlers we check
        </h3>
        <ul className="mt-4 columns-1 gap-x-10 sm:columns-2 lg:columns-3">
          {AI_CRAWL_BOTS.map((bot) => (
            <li
              key={bot.agent}
              className="mb-2 break-inside-avoid text-sm text-zinc-600"
            >
              <span className="font-medium text-zinc-900">{bot.agent}</span>
              <span className="text-zinc-400"> · </span>
              {bot.vendor} · {bot.role}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
