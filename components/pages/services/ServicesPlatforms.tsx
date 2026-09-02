import Image from "next/image";

import { platformLogos, servicesCopy } from "./data";
import {
  responsiveImageStyle,
  sectionHeading,
  sectionLight,
  sectionPadding,
  sectionSubtext,
} from "./shared/section-styles";

export default function ServicesPlatforms() {
  return (
    <section
      aria-labelledby="services-platforms-heading"
      className={`${sectionLight} ${sectionPadding}`}
    >
      <h2 id="services-platforms-heading" className={sectionHeading}>
        {servicesCopy.platforms.h2}
      </h2>
      <p className={sectionSubtext}>{servicesCopy.platforms.sub}</p>

      <ul className="mx-auto mt-12 grid max-w-4xl list-none grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
        {platformLogos.map((item) => (
          <li
            key={item.name}
            className="flex h-20 items-center justify-center bg-white px-4 transition-colors hover:bg-zinc-50/80 md:h-24"
          >
            <Image
              src={item.src}
              alt={`${item.name} logo`}
              width={100}
              height={32}
              className="h-7 w-auto max-w-[5.5rem] object-contain md:h-8 md:max-w-[6.5rem]"
              style={responsiveImageStyle}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
