export const servicesAccent = "#2462ff" as const;

export const sectionLight =
  "relative overflow-hidden border-b border-border bg-white";

export const sectionMuted =
  "relative overflow-hidden border-b border-border bg-[#fafafa]";

export const sectionPadding = "px-6 py-14 md:px-12 md:py-20";

export const heroPadding = "px-6 py-16 md:px-12 md:py-24 lg:py-28";

export const heroAmbient =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_15%_-5%,rgba(36,98,255,0.09),transparent_52%),radial-gradient(ellipse_55%_45%_at_92%_8%,rgba(36,98,255,0.06),transparent_48%)]";

export const heroGridTexture =
  "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.022)_1px,transparent_1px)] bg-size-[72px_72px] [mask-image:radial-gradient(ellipse_85%_70%_at_50%_0%,black_10%,transparent_72%)]";

export const heroDemoGlow =
  "pointer-events-none absolute -inset-10 rounded-[2rem] bg-[radial-gradient(ellipse_at_60%_40%,rgba(36,98,255,0.16),transparent_68%)] blur-3xl";

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
