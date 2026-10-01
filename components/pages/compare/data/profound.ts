import type { MatrixRow } from "@/components/pages/compare/VsMatrix";

/** Profound = AI visibility peer; differentiation on breadth & GEO action. */
export const profoundMatrix: readonly MatrixRow[] = [
  {
    capability: "Brand mention tracking in AI answers",
    dodox: "yes",
    competitor: "yes",
  },
  {
    capability: "Competitor visibility side-by-side",
    dodox: "yes",
    competitor: "yes",
  },
  {
    capability: "Source / citation board with brand presence",
    dodox: "yes",
    competitor: "partial",
  },
  {
    capability: "Model breadth (incl. AI Mode / Overview)",
    dodox: "yes",
    competitor: "partial",
  },
  {
    capability: "Agency multi-client workspace",
    dodox: "yes",
    competitor: "partial",
  },
  {
    capability: "Actionable GEO gaps → content next steps",
    dodox: "yes",
    competitor: "partial",
  },
  {
    capability: "Enterprise custom research programs",
    dodox: "partial",
    competitor: "yes",
  },
] as const;

export const profoundVerdict = {
  pickDodoxWhen: [
    "You want marketing-team UX: clarity over research-lab complexity.",
    "Model coverage including Google AI Mode / Overview matters day one.",
    "Agencies need a clean multi-brand portfolio view for retainers.",
  ],
  pickCompetitorWhen: [
    "You already standardized on Profound for enterprise AI audits.",
    "You need deep custom research engagements more than a daily dashboard.",
    "Procurement already locked a peer GEO vendor this year.",
  ],
} as const;
