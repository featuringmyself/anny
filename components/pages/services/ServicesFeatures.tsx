import Image from "next/image";

import { featureCards, servicesCopy } from "./data";
import {
  cardBase,
  sectionHeading,
  sectionLight,
  sectionPadding,
  sectionSubtext,
} from "./shared/section-styles";

export default function ServicesFeatures() {
  return (
    <section
      className={`${sectionLight} ${sectionPadding}`}
      aria-labelledby="services-features-heading"
    >
      <h2 id="services-features-heading" className={sectionHeading}>
        {servicesCopy.features.h2}
      </h2>
      <p className={sectionSubtext}>{servicesCopy.features.sub}</p>

      <div className="mx-auto mt-10 grid max-w-6xl gap-8 md:grid-cols-3 md:gap-8">
        {featureCards.map((card) => (
          <article key={card.title} className="group">
            <figure
              className={`${cardBase} relative aspect-[5/4] w-full overflow-hidden transition-shadow group-hover:shadow-md`}
            >
              <Image
                src={card.image}
                alt={`${card.title} — Anny product screenshot`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <figcaption className="sr-only">{card.title}</figcaption>
            </figure>
            <div className="mt-5 px-1">
              <h3 className="text-xl font-semibold tracking-tight text-balance md:text-2xl">
                {card.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 text-pretty md:text-base">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
