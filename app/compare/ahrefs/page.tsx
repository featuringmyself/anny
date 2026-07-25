import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import CompareHero from "@/components/pages/compare/CompareHero";
import VsMatrix from "@/components/pages/compare/VsMatrix";
import VsVerdict from "@/components/pages/compare/VsVerdict";
import { ahrefsMatrix, ahrefsVerdict } from "@/components/pages/compare/data/ahrefs";

export const metadata: Metadata = {
  title: "Anny vs Ahrefs — AI visibility comparison",
  description:
    "Ahrefs is SEO-first. Anny is built for AI answer visibility, citations, and GEO across ChatGPT, Claude, Gemini, and more.",
};

export default function CompareAhrefsPage() {
  return (
    <div>
      <CompareHero
        competitor="Ahrefs"
        framing="SEO-first vs AI answers"
        headline={
          <>
            Ahrefs owns classic SEO.{" "}
            <span className="text-zinc-500">Anny owns AI mentions.</span>
          </>
        }
        description="Backlinks and SERPs still matter — but when buyers ask ChatGPT, you need a different dashboard."
      />
      <PatternStrip />
      <VsMatrix competitor="Ahrefs" rows={ahrefsMatrix} />
      <PatternStrip />
      <VsVerdict
        competitor="Ahrefs"
        pickAnnyWhen={ahrefsVerdict.pickAnnyWhen}
        pickCompetitorWhen={ahrefsVerdict.pickCompetitorWhen}
      />
    </div>
  );
}
