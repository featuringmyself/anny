import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { resultCards, servicesCopy } from "./data";
import {
  cardBase,
  sectionHeading,
  sectionLight,
  sectionPadding,
  sectionSubtext,
} from "./shared/section-styles";

export default function ServicesResults() {
  return (
    <section
      className={`${sectionLight} ${sectionPadding}`}
      aria-labelledby="services-results-heading"
    >
      <h2 id="services-results-heading" className={sectionHeading}>
        {servicesCopy.results.h2}
      </h2>
      <p className={sectionSubtext}>{servicesCopy.results.sub}</p>

      <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
        {resultCards.map((card) => (
          <Link
            key={`${card.slug}-${card.metric}`}
            href={`/case-studies/${card.slug}`}
            className={`group ${cardBase} overflow-hidden transition-shadow hover:shadow-lg`}
          >
            <div className="p-6 md:p-7">
              <span className="inline-block rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600">
                {card.category}
              </span>
              <p className="mt-5 text-balance leading-none">
                <span className="text-4xl font-semibold tracking-tight text-[#2462ff] tabular-nums md:text-5xl">
                  {card.metric}
                </span>
              </p>
              <p className="mt-2 text-sm font-medium text-zinc-600">
                {card.metricLabel}
              </p>
              <blockquote className="mt-5 text-sm leading-relaxed text-zinc-600 text-pretty line-clamp-4">
                {card.quote}
              </blockquote>
              <footer className="mt-5 border-t border-border pt-4">
                <p className="font-semibold text-zinc-900">{card.company}</p>
                <p className="text-sm text-zinc-500">{card.name}</p>
              </footer>
            </div>
            {card.image ? (
              <figure className="relative aspect-[16/10] w-full overflow-hidden border-t border-border bg-[#fafafa]">
                <Image
                  src={card.image}
                  alt={card.alt ?? ""}
                  fill
                  className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <figcaption className="sr-only">
                  {card.company}: {card.metric} {card.metricLabel}
                </figcaption>
              </figure>
            ) : (
              <figure
                aria-hidden
                className="relative aspect-[16/10] w-full overflow-hidden border-t border-border bg-[#f4f6fb]"
              >
                <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                  <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                    {card.category}
                  </p>
                  <p className="mt-3 text-5xl font-semibold tracking-tight text-[#2462ff] tabular-nums md:text-6xl">
                    {card.metric}
                  </p>
                  <p className="mt-2 max-w-[16rem] text-sm font-medium text-zinc-600 text-pretty">
                    {card.metricLabel}
                  </p>
                </div>
                <figcaption className="sr-only">
                  {card.company}: {card.metric} {card.metricLabel}
                </figcaption>
              </figure>
            )}
            <p className="border-t border-border px-6 py-3.5 text-sm font-medium text-[#2462ff] md:px-7">
              <span className="inline-flex items-center gap-1.5">
                Read the full story
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
