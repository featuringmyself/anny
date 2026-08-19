import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import CompareHero from "@/components/pages/compare/CompareHero";
import VsMatrix from "@/components/pages/compare/VsMatrix";
import VsVerdict from "@/components/pages/compare/VsVerdict";
import {
  profoundMatrix,
  profoundVerdict,
} from "@/components/pages/compare/data/profound";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Anny vs Profound — AI visibility comparison";
const description =
  "Compare Anny and Profound as AI visibility peers — model coverage, citation boards, and GEO workflows for marketing teams.";

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
            <span className="text-zinc-500">
              Different fit for marketing teams.
            </span>
          </>
        }
        description="Both track AI mentions. Anny prioritizes daily multi-model coverage and agency-ready GEO action."
      />
      <PatternStrip />
      <VsMatrix competitor="Profound" rows={profoundMatrix} />
      <PatternStrip />
      <VsVerdict
        competitor="Profound"
        pickAnnyWhen={profoundVerdict.pickAnnyWhen}
        pickCompetitorWhen={profoundVerdict.pickCompetitorWhen}
      />
    </>
  );
}
