import { CRAWL_BANDS } from "@/components/pages/tools/ai-crawlability/bands";

export function AiCrawlabilityScale() {
  return (
    <section className="border-b border-zinc-200 bg-white px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">Score guide</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
          What the score means
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
          AI crawlability is 0 to 100. Higher means more AI crawlers can fetch
          the site and discovery files are in place. It is not a ChatGPT mention
          score.
        </p>

        <div className="mt-12 space-y-0 border-t border-zinc-200">
          {CRAWL_BANDS.map((band) => (
            <article
              key={band.label}
              className="grid gap-3 border-b border-zinc-200 py-6 sm:grid-cols-[7rem_10rem_1fr] sm:items-baseline sm:gap-8"
            >
              <p className="text-sm font-medium tabular-nums text-zinc-400">
                {band.from}-{band.to}
              </p>
              <h3 className="text-base font-medium text-zinc-900">
                {band.label}
              </h3>
              <div className="min-w-0">
                <div className="mb-3 h-1 overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-[#2462ff]"
                    style={{ width: `${band.to}%` }}
                  />
                </div>
                <p className="text-sm leading-relaxed text-zinc-500">
                  {band.copy}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
