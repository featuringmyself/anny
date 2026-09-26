import { brand } from "@/components/Home/brand";

/**
 * Report color psychology (reader mind, not decoration):
 *
 * - Cool teal (#225864): calm competence, trust, “this is analysis”
 * - Brand green: relief / pass, only when something is actually good, or a deliberate CTA
 * - Amber: vigilance without panic: soft risk, “needs work”
 * - Red: threat / fail: real gaps; use sparingly or the whole report feels hostile
 * - Deep teal (#11333c): authority / closing weight: chrome, not a status for “poor”
 * - Light paper: space to think; findings body stays documentary
 */
export const reportBrand = {
  heading: brand.heading,
  body: brand.body,
  bodyStrong: brand.bodyStrong,
  dark: brand.dark,
  ink: brand.ink,
  info: brand.heading,
  success: "#45ab8d",
  warning: "#b45309",
  caution: "#a16207",
  critical: "#b42318",
  paper: "#F7F7F7",
  white: "#ffffff",
} as const;

/** Hex for score so web + PDF share the same emotional mapping. */
export function reportScoreHex(score: number): string {
  if (score < 30) return reportBrand.critical; // threat: blocked
  if (score < 50) return reportBrand.warning; // vigilance: weak
  if (score < 70) return reportBrand.caution; // mild concern: crawlable
  if (score < 85) return reportBrand.info; // calm competence: identifiable
  return reportBrand.success; // relief: citation-ready
}

/** Tailwind text class for overall score / band label. */
export function reportScoreClass(score: number): string {
  if (score < 30) return "text-[#b42318]";
  if (score < 50) return "text-amber-700";
  if (score < 70) return "text-[#a16207]";
  if (score < 85) return "text-[#225864]";
  return "text-brand";
}

/** High-impact fixes should raise attention; medium stays neutral. */
export function reportImpactClass(impact: string): string {
  const key = impact.trim().toLowerCase();
  if (key === "high") return "text-amber-700";
  if (key === "low") return "text-[#225864]/55";
  return "text-[#2a3f44]";
}

/** Count tones: zero = quiet; non-zero risk = alert. */
export function reportCountClass(
  count: number,
  severity: "critical" | "warning" | "info" = "info",
): string {
  if (count <= 0) return "text-[#5c6b73]";
  if (severity === "critical") return "text-[#b42318]";
  if (severity === "warning") return "text-amber-700";
  return "text-[#225864]";
}

/** Tailwind class fragments for report chrome */
export const rt = {
  heading: "text-[#225864]",
  body: "text-[#5c6b73]",
  bodyStrong: "text-[#2a3f44]",
  ink: "text-[#11333c]",
  label: "text-[#225864]/55",
  hairline: "border-[#225864]/12",
  hairlineStrong: "border-[#225864]/22",
  surface: "bg-white",
  surfaceMuted: "bg-[#F7F7F7]",
  dark: "bg-[#11333c]",
  info: "text-[#225864]",
  infoBg: "bg-[#225864]",
  success: "text-brand",
  warning: "text-amber-700",
  critical: "text-[#b42318]",
  /** Closing CTA: permission/growth after diagnosis, not a finding color. */
  btnPrimary:
    "border border-zinc-900 bg-brand text-white shadow-sm hover:bg-emerald-50 hover:text-black",
  /** Secondary actions stay cool/info so they don’t feel like “all clear”. */
  btnSecondary:
    "border border-[#225864]/30 bg-white text-[#225864] hover:bg-[#225864]/5",
  focusRing:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#225864]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F7F7]",
  /** Stacked report section: breaks the continuous slab. */
  panel: "overflow-hidden rounded-2xl border border-[#225864]/12 bg-white",
  stack: "flex flex-col gap-3 sm:gap-4",
} as const;
