import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import AgenciesPartnerHero from "@/components/pages/partnership/agencies/AgenciesPartnerHero";
import AgencyOsFeatures from "@/components/pages/partnership/agencies/AgencyOsFeatures";
import TrackAcrossEngines from "@/components/pages/partnership/agencies/TrackAcrossEngines";
import WinBrandMentions from "@/components/pages/partnership/agencies/WinBrandMentions";
import { absoluteUrl, pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Agency Partnership — GEO & AI Visibility for Marketing Agencies | Anny";
const description =
  "Productize GEO for every client. Multi-brand AI visibility reporting, audits, and action plans built for agency retainers across ChatGPT, Gemini, Perplexity, and more.";
const ogImage = absoluteUrl("/partnership/agencies/feature-action-plans.webp");

export const metadata = pageMetadata({
  path: "/partnership/agencies",
  title,
  description,
  image: ogImage,
});

export default function AgenciesPartnershipPage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({
          path: "/partnership/agencies",
          title,
          description,
          image: ogImage,
        })}
      />
      <AgenciesPartnerHero />
      <PatternStrip />
      <TrackAcrossEngines />
      <AgencyOsFeatures />
      <PatternStrip />
      <WinBrandMentions />
      <PatternStrip />
    </>
  );
}
