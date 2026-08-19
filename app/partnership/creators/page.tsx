import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import CreatorsPartnerHero from "@/components/pages/partnership/creators/CreatorsPartnerHero";
import AffiliateStrip from "@/components/pages/partnership/creators/AffiliateStrip";
import ContentKitStrip from "@/components/pages/partnership/creators/ContentKitStrip";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Creator Partnership — Anny";
const description =
  "Affiliate program and content kit for creators teaching GEO and AI search visibility.";

export const metadata = pageMetadata({
  path: "/partnership/creators",
  title,
  description,
});

export default function CreatorsPartnershipPage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({
          path: "/partnership/creators",
          title,
          description,
        })}
      />
      <CreatorsPartnerHero />
      <PatternStrip />
      <AffiliateStrip />
      <PatternStrip />
      <ContentKitStrip />
    </>
  );
}
