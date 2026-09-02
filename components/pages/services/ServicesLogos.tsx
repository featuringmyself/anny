import { clientLogos, servicesCopy } from "./data";
import {
  marqueeFadeMask,
  sectionMuted,
  sectionPaddingNarrow,
} from "./shared/section-styles";

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: readonly string[];
  reverse?: boolean;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${marqueeFadeMask}`}>
      <div
        className={
          reverse
            ? "flex w-max animate-[services-marquee-reverse_45s_linear_infinite] gap-12 px-4 md:gap-16"
            : "flex w-max animate-[services-marquee_40s_linear_infinite] gap-12 px-4 md:gap-16"
        }
        aria-hidden
      >
        {loop.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="shrink-0 text-lg font-semibold tracking-tight text-zinc-400 md:text-xl"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ServicesLogos() {
  const rowA = clientLogos.slice(0, 6);
  const rowB = clientLogos.slice(6);

  return (
    <section
      className={`${sectionMuted} ${sectionPaddingNarrow}`}
      aria-label="Trusted by"
    >
      <p className="text-center text-sm font-medium text-zinc-500">
        {servicesCopy.logos.label}
      </p>
      <div className="mt-8 space-y-6">
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </div>
      <ul className="sr-only">
        {clientLogos.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </section>
  );
}
