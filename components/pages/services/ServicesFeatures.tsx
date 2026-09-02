import Image from "next/image";

import { featureCards, servicesCopy } from "./data";
import {
  cardBase,
  sectionMuted,
  sectionPadding,
  servicesAccent,
} from "./shared/section-styles";

export default function ServicesFeatures() {
  return (
    <section
      className={`${sectionMuted} ${sectionPadding}`}
      aria-labelledby="services-features-heading"
    >
      <p
        id="services-features-heading"
        className="text-center text-sm font-semibold tracking-[0.12em] uppercase"
        style={{ color: servicesAccent }}
      >
        {servicesCopy.features.eyebrow}
      </p>

      <div className="mx-auto mt-10 grid max-w-6xl gap-12 md:grid-cols-2 md:gap-14 lg:gap-16">
        {featureCards.map((card) => (
          <article key={card.titleLead} className="group">
            <figure
              className={`${cardBase} relative aspect-[5/4] w-full overflow-hidden transition-shadow group-hover:shadow-md`}
            >
              <Image
                src={card.image}
                alt={`${card.titleLead} ${card.titleRest}`}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </figure>
            <div className="mt-6 px-1">
              <h3 className="text-left text-2xl font-bold tracking-tight text-balance text-[#080808] md:text-3xl lg:text-[2rem]">
                <span style={{ color: servicesAccent }}>{card.titleLead}</span>{" "}
                {card.titleRest}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-pretty text-zinc-600">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
