import { servicesCopy } from "./data";
import {
  sectionHeading,
  sectionMuted,
  sectionPaddingNarrow,
} from "./shared/section-styles";

export default function ServicesExperts() {
  return (
    <section
      className={`${sectionMuted} ${sectionPaddingNarrow}`}
      aria-labelledby="services-experts-heading"
    >
      <h2 id="services-experts-heading" className={`${sectionHeading} text-2xl md:text-3xl`}>
        {servicesCopy.experts.h2}
      </h2>
      <ul className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-14">
        {servicesCopy.experts.orgs.map((org) => (
          <li
            key={org}
            className="text-xl font-bold tracking-tight text-zinc-400 md:text-2xl"
          >
            {org}
          </li>
        ))}
      </ul>
    </section>
  );
}
