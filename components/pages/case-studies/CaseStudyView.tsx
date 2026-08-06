import Image from "next/image";

import PatternStrip from "@/components/PatternStrip";
import { TalkToSalesButton } from "@/components/talk-to-sales";

import type { CaseStudy, CaseStudyFigure } from "./types";

type CaseStudyViewProps = {
  study: CaseStudy;
};

function Figure({ figure }: { figure: CaseStudyFigure }) {
  return (
    <figure className="mt-8 overflow-hidden border border-zinc-200 bg-white">
      <Image
        src={figure.src}
        alt={figure.alt}
        width={figure.width}
        height={figure.height}
        className="h-auto w-full"
        sizes="(max-width: 768px) 100vw, 720px"
      />
      {figure.caption ? (
        <figcaption className="border-t border-zinc-100 px-4 py-3 text-sm leading-relaxed text-zinc-500">
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Prose({ children }: { children: string }) {
  return (
    <p className="text-[15px] leading-[1.75] text-zinc-600 md:text-base">
      {children}
    </p>
  );
}

export default function CaseStudyView({ study }: CaseStudyViewProps) {
  return (
    <article className="pb-0">
      <header className="relative overflow-hidden border-b">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(36,98,255,0.08),transparent_55%),linear-gradient(180deg,#fafafa_0%,#f7f7f7_100%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(315deg,rgba(0,0,0,0.03)_0,rgba(0,0,0,0.03)_1px,transparent_0,transparent_50%)] bg-size-[12px_12px] opacity-60"
        />
        <div className="relative px-6 py-16 md:px-12 md:py-24">
          <p className="text-sm font-medium tracking-wide text-[#2462ff]">
            Case study · {study.category}
          </p>
          <p className="mt-6 text-sm font-medium tracking-tight text-zinc-500 uppercase">
            {study.company}
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-5xl lg:text-6xl">
            {study.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-500 text-balance md:text-xl">
            {study.dek}
          </p>
          <p className="mt-8 text-sm tabular-nums text-zinc-400">
            Last updated {study.lastUpdated}
          </p>
        </div>

        <div
          className={`relative grid grid-cols-2 border-t ${
            study.results.metrics.length === 3
              ? "md:grid-cols-3"
              : "md:grid-cols-4"
          }`}
        >
          {study.results.metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`bg-white/70 px-5 py-6 backdrop-blur-sm md:px-8 ${
                index % 2 === 0 ? "border-r" : ""
              } ${index < 2 ? "border-b md:border-b-0" : ""} ${
                index < study.results.metrics.length - 1 ? "md:border-r" : ""
              }`}
            >
              <p className="text-2xl font-medium tracking-tight text-zinc-900 tabular-nums md:text-3xl">
                {metric.value}
              </p>
              <p className="mt-1.5 text-xs leading-snug text-zinc-500 md:text-sm">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </header>

      <PatternStrip />

      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-[#2462ff]">The challenge</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-zinc-900 text-balance md:text-3xl">
            {study.challenge.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {study.challenge.body.map((paragraph) => (
              <Prose key={paragraph.slice(0, 48)}>{paragraph}</Prose>
            ))}
          </div>
          {study.challenge.bullets?.length ? (
            <ul className="mt-8 space-y-3 border-l-2 border-[#2462ff]/30 pl-5">
              {study.challenge.bullets.map((item) => (
                <li
                  key={item}
                  className="text-[15px] leading-relaxed text-zinc-600 md:text-base"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </section>

      <section className="border-b bg-white px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-[#2462ff]">The approach</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-zinc-900 text-balance md:text-3xl">
            {study.approach.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {study.approach.intro.map((paragraph) => (
              <Prose key={paragraph.slice(0, 48)}>{paragraph}</Prose>
            ))}
          </div>

          <ol className="mt-12 space-y-0">
            {study.approach.steps.map((step, index) => (
              <li
                key={step.title}
                className="border-t border-zinc-200 py-8 first:border-t-0 first:pt-0 last:pb-0"
              >
                <div className="flex gap-4 md:gap-6">
                  <span
                    aria-hidden
                    className="mt-0.5 shrink-0 text-sm font-medium tabular-nums text-[#2462ff]"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-medium tracking-tight text-zinc-900 md:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-[1.75] text-zinc-600 md:text-base">
                      {step.body}
                    </p>
                    {step.bullets?.length ? (
                      <ul className="mt-4 space-y-2">
                        {step.bullets.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-[15px] leading-relaxed text-zinc-600"
                          >
                            <span
                              aria-hidden
                              className="mt-2 size-1 shrink-0 rounded-full bg-[#2462ff]"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    {step.figure ? <Figure figure={step.figure} /> : null}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <PatternStrip />

      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-[#2462ff]">The results</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-zinc-900 text-balance md:text-3xl">
            {study.results.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {study.results.intro.map((paragraph) => (
              <Prose key={paragraph.slice(0, 48)}>{paragraph}</Prose>
            ))}
          </div>

          <div className="mt-12 space-y-14">
            {study.results.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <p className="text-4xl font-medium tracking-tight text-[#2462ff] tabular-nums md:text-5xl">
                    {metric.value}
                  </p>
                  <p className="text-lg font-medium tracking-tight text-zinc-900">
                    {metric.label}
                  </p>
                </div>
                {metric.detail ? (
                  <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-zinc-600 md:text-base">
                    {metric.detail}
                  </p>
                ) : null}
                {metric.figure ? <Figure figure={metric.figure} /> : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-[#2462ff]">Why it matters</p>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-zinc-900 text-balance md:text-3xl">
            {study.closing.heading}
          </h2>
          <div className="mt-6 space-y-4">
            {study.closing.body.map((paragraph) => (
              <Prose key={paragraph.slice(0, 48)}>{paragraph}</Prose>
            ))}
          </div>
        </div>
      </section>

      <aside className="bg-zinc-950 px-6 py-14 text-white md:px-12 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm font-medium text-[#7a9fff]">Next step</p>
          <p className="mt-3 text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Ready to move your AI visibility?
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-400 md:text-base">
            Anny tracks visibility, answer position, sentiment, and sources
            across ChatGPT, Gemini, AI Mode, and more - so you can close the
            gaps that cost you recommendations.
          </p>
          <div className="mt-8">
            <TalkToSalesButton
              source={`case-study-${study.slug}`}
              size="lg"
              className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            >
              Talk to sales
            </TalkToSalesButton>
          </div>
        </div>
      </aside>
      <PatternStrip />
    </article>
  );
}
