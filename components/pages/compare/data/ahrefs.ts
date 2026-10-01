import type { MatrixRow } from "@/components/pages/compare/VsMatrix";

/** Ahrefs = SEO-first toolkit; Dodox wins on AI answer visibility. */
export const ahrefsMatrix: readonly MatrixRow[] = [
  {
    capability: "AI mention / visibility score",
    dodox: "yes",
    competitor: "no",
  },
  {
    capability: "Citation & source tracking in AI answers",
    dodox: "yes",
    competitor: "no",
  },
  {
    capability: "Multi-model coverage (ChatGPT, Claude, Gemini, and more)",
    dodox: "yes",
    competitor: "no",
  },
  {
    capability: "Backlink & referring domain analysis",
    dodox: "no",
    competitor: "yes",
  },
  {
    capability: "Classic keyword research & SERP tracking",
    dodox: "partial",
    competitor: "yes",
  },
  {
    capability: "Site audit / technical SEO crawler",
    dodox: "no",
    competitor: "yes",
  },
  {
    capability: "GEO playbooks from AI answer gaps",
    dodox: "yes",
    competitor: "no",
  },
] as const;

export const ahrefsVerdict = {
  pickDodoxWhen: [
    "Your buyers ask ChatGPT or Gemini before they Google.",
    "You need to know which articles AI cites, and whether you appear.",
    "Marketing owns AI visibility as a channel, not a side metric in SEO.",
  ],
  pickCompetitorWhen: [
    "Backlinks, content gaps, and technical SEO are still the primary KPI.",
    "You need best-in-class crawl depth and historical SERP datasets.",
    "AI answer tracking is a nice-to-have, not the core workflow.",
  ],
} as const;
