import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import CompareHero from "@/components/pages/compare/CompareHero";
import VsMatrix from "@/components/pages/compare/VsMatrix";
import VsVerdict from "@/components/pages/compare/VsVerdict";
import {
  semrushMatrix,
  semrushVerdict,
} from "@/components/pages/compare/data/semrush";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Anny vs Semrush — AI visibility comparison";
const description =
  "Semrush is an all-in-one marketing suite. Anny is purpose-built for AI answer visibility and GEO.";

export const metadata = pageMetadata({
  path: "/compare/semrush",
  title,
  description,
});

export default function CompareSemrushPage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({ path: "/compare/semrush", title, description })}
      />
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
    </>
  );
}
