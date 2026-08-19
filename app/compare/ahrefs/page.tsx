import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import CompareHero from "@/components/pages/compare/CompareHero";
import VsMatrix from "@/components/pages/compare/VsMatrix";
import VsVerdict from "@/components/pages/compare/VsVerdict";
import { ahrefsMatrix, ahrefsVerdict } from "@/components/pages/compare/data/ahrefs";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Anny vs Ahrefs — AI visibility comparison";
const description =
  "Ahrefs is SEO-first. Anny is built for AI answer visibility, citations, and GEO across ChatGPT, Claude, Gemini, and more.";

export const metadata = pageMetadata({
  path: "/compare/ahrefs",
  title,
  description,
});

export default function CompareAhrefsPage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({ path: "/compare/ahrefs", title, description })}
      />
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
    </>
  );
}
