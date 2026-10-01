import { brand } from "@/components/Home/brand";
import JsonLd from "@/components/JsonLd";
import CompareHero from "@/components/pages/compare/CompareHero";
import VsMatrix from "@/components/pages/compare/VsMatrix";
import VsVerdict from "@/components/pages/compare/VsVerdict";
import {
  profoundMatrix,
  profoundVerdict,
} from "@/components/pages/compare/data/profound";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Dodox vs Profound, AI visibility comparison";
const description =
  "Compare Dodox and Profound as AI visibility peers, model coverage, citation boards, and GEO workflows for marketing teams.";

export const metadata = pageMetadata({
  path: "/compare/profound",
  title,
  description,
});

export default function CompareProfoundPage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({ path: "/compare/profound", title, description })}
      />
      <CompareHero
        competitor="Profound"
        framing="AI visibility peers"
        headline={
          <>
            Same category.{" "}
            <span style={{ color: brand.body }}>
              Different fit for marketing teams.
            </span>
          </>
        }
        description="Both track AI mentions. Dodox prioritizes daily multi-model coverage and agency-ready GEO action."
      />
      <VsMatrix competitor="Profound" rows={profoundMatrix} />
      <VsVerdict
        competitor="Profound"
        pickDodoxWhen={profoundVerdict.pickDodoxWhen}
        pickCompetitorWhen={profoundVerdict.pickCompetitorWhen}
      />
    </>
  );
}
