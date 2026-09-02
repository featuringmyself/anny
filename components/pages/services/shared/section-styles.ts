export const servicesAccent = "#2462ff" as const;

export const sectionLight =
  "relative overflow-hidden border-b border-border bg-white";

export const sectionMuted =
  "relative overflow-hidden border-b border-border bg-[#fafafa]";

export const sectionPadding = "px-6 py-14 md:px-12 md:py-20";

export const sectionPaddingNarrow = "px-6 py-10 md:px-12 md:py-14";

export const sectionHeading =
  "text-center text-3xl font-semibold tracking-tight text-balance md:text-4xl";

export const sectionSubtext =
  "mx-auto mt-3 max-w-2xl text-center text-base leading-relaxed text-balance text-zinc-500";

export const cardBase =
  "rounded-2xl border border-border bg-white shadow-sm";

export const marqueeFadeMask =
  "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]";

/** Keeps Next.js Image aspect ratio when sizing via Tailwind h-* / w-auto. */
export const responsiveImageStyle = {
  width: "auto",
  height: "auto",
} as const;
