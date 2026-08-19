import { READINESS_BANDS } from "@/components/pages/tools/ai-readiness/bands";

export function AiReadinessScale() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          What the score means
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          AI readiness is 0 to 100. Higher means agents can fetch, name, and
          parse the site. It is not a ChatGPT mention score.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5">
        {READINESS_BANDS.map((band) => (
          <article
            key={band.label}
            className="border-b px-6 py-8 last:border-b-0 sm:odd:border-r sm:nth-last-[-n+1]:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0 md:px-8"
          >
            <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              {band.from}–{band.to}
            </p>
            <h3 className="mt-2 text-lg font-medium">{band.label}</h3>
            <div className="mt-4 h-px bg-zinc-200">
              <div
                className="h-px bg-[#2462ff]"
                style={{ width: `${band.to}%` }}
              />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500">
              {band.copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
