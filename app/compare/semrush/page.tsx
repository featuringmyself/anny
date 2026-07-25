import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import CompareHero from "@/components/pages/compare/CompareHero";
import VsMatrix from "@/components/pages/compare/VsMatrix";
import VsVerdict from "@/components/pages/compare/VsVerdict";
import {
  semrushMatrix,
  semrushVerdict,
} from "@/components/pages/compare/data/semrush";

export const metadata: Metadata = {
  title: "Anny vs Semrush — AI visibility comparison",
  description:
    "Semrush is an all-in-one marketing suite. Anny is purpose-built for AI answer visibility and GEO.",
};

export default function CompareSemrushPage() {
  return (
    <div>
      <CompareHero
        competitor="Semrush"
        framing="Suite vs purpose-built GEO"
        headline={
          <>
            Suites sprawl.{" "}
            <span className="text-zinc-500">
              Anny stays on AI answers.
            </span>
          </>
        }
        description="Keep Semrush for SEO and PPC. Add Anny when AI mentions need their own workflow."
      />
      <PatternStrip />
      <VsMatrix competitor="Semrush" rows={semrushMatrix} />
      <PatternStrip />
      <VsVerdict
        competitor="Semrush"
        pickAnnyWhen={semrushVerdict.pickAnnyWhen}
        pickCompetitorWhen={semrushVerdict.pickCompetitorWhen}
      />
    </div>
  );
}
