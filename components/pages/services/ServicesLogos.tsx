import { clientLogos, servicesCopy } from "./data";
import { sectionMuted, sectionPaddingNarrow } from "./shared/section-styles";

export default function ServicesLogos() {
  const items = [...clientLogos, ...clientLogos];

  return (
    <section
      className={`${sectionMuted} ${sectionPaddingNarrow}`}
      aria-label="Trusted by"
    >
      <p className="text-center text-sm font-medium text-zinc-500">
        {servicesCopy.logos.label}
      </p>
      <div className="relative mt-6 overflow-hidden">
        <div
          className="flex w-max animate-[services-marquee_40s_linear_infinite] gap-12 px-4"
          aria-hidden
        >
          {items.map((name, index) => (
            <span
              key={`${name}-${index}`}
              className="shrink-0 text-lg font-semibold tracking-tight text-zinc-400"
            >
              {name}
            </span>
          ))}
        </div>
        <ul className="sr-only">
          {clientLogos.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
