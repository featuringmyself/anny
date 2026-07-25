import type { MatrixRow } from "@/components/pages/compare/VsMatrix";

/** Semrush = all-in-one suite; Anny is purpose-built for AI answers. */
export const semrushMatrix: readonly MatrixRow[] = [
  {
    capability: "Dedicated AI answer visibility dashboard",
    anny: "yes",
    competitor: "partial",
  },
  {
    capability: "Full SEO + PPC + social suite",
    anny: "no",
    competitor: "yes",
  },
  {
    capability: "Citation tracking across LLM responses",
    anny: "yes",
    competitor: "partial",
  },
  {
    capability: "Daily multi-model mention monitoring",
    anny: "yes",
    competitor: "partial",
  },
  {
    capability: "Position tracking & domain overview",
    anny: "no",
    competitor: "yes",
  },
  {
    capability: "Content / social scheduling tooling",
    anny: "no",
    competitor: "yes",
  },
  {
    capability: "GEO-focused competitor mention gaps",
    anny: "yes",
    competitor: "partial",
  },
] as const;

export const semrushVerdict = {
  pickAnnyWhen: [
    "AI search is a first-class channel, not one tile inside a mega-suite.",
    "You need crisp mention, source, and model coverage without suite bloat.",
    "Your team already has SEO tooling and wants a purpose-built GEO layer.",
  ],
  pickCompetitorWhen: [
    "One vendor for SEO, PPC, content, and social is a hard requirement.",
    "AI visibility is a secondary report next to classic rankings.",
    "Budget and training already center on the Semrush ecosystem.",
  ],
} as const;
