import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import MediaPartnerHero from "@/components/pages/partnership/media/MediaPartnerHero";
import PressKit from "@/components/pages/partnership/media/PressKit";
import QuoteRequest from "@/components/pages/partnership/media/QuoteRequest";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Media Partnership — Anny";
const description =
  "Press kit, logos, and quote requests for journalists covering AI search and GEO.";

export const metadata = pageMetadata({
  path: "/partnership/media",
  title,
  description,
});

export default function MediaPartnershipPage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({ path: "/partnership/media", title, description })}
      />
      <MediaPartnerHero />
      <PatternStrip />
      <PressKit />
      <PatternStrip />
      <QuoteRequest />
    </>
  );
}
