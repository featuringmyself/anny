import { brand } from "@/components/Home/brand";
import JsonLd from "@/components/JsonLd";
import CompareHero from "@/components/pages/compare/CompareHero";
import VsMatrix from "@/components/pages/compare/VsMatrix";
import VsVerdict from "@/components/pages/compare/VsVerdict";
import {
  semrushMatrix,
  semrushVerdict,
} from "@/components/pages/compare/data/semrush";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Dodox vs Semrush, AI visibility comparison";
const description =
  "Semrush is an all-in-one marketing suite. Dodox is purpose-built for AI answer visibility and GEO.";

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
            <span style={{ color: brand.body }}>Dodox stays on AI answers.</span>
          </>
        }
        description="Keep Semrush for SEO and PPC. Add Dodox when AI mentions need their own workflow."
      />
      <VsMatrix competitor="Semrush" rows={semrushMatrix} />
      <VsVerdict
        competitor="Semrush"
        pickDodoxWhen={semrushVerdict.pickDodoxWhen}
        pickCompetitorWhen={semrushVerdict.pickCompetitorWhen}
      />
    </>
  );
}
