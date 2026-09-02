import { servicesCopy } from "./data";
import { sectionMuted, sectionPadding } from "./shared/section-styles";

export default function ServicesQuote() {
  return (
    <section
      className={`${sectionMuted} ${sectionPadding} md:py-24 lg:py-28`}
      aria-labelledby="services-quote-heading"
    >
      <blockquote className="mx-auto max-w-4xl text-center">
        <p
          aria-hidden
          className="select-none text-7xl leading-none font-serif text-[#2462ff]/20 md:text-8xl"
        >
          &ldquo;
        </p>
        <p
          id="services-quote-heading"
          className="-mt-6 text-2xl leading-snug font-semibold tracking-tight text-balance text-zinc-800 md:-mt-8 md:text-3xl lg:text-[2.5rem] lg:leading-snug"
        >
          {servicesCopy.quote.stat}
        </p>
        <p className="mt-6 text-xl font-medium text-zinc-700 md:text-2xl">
          {servicesCopy.quote.prompt}
        </p>
        <footer className="mt-8 text-sm font-medium tracking-wide text-zinc-400 uppercase">
          {servicesCopy.quote.source}
        </footer>
      </blockquote>
    </section>
  );
}
