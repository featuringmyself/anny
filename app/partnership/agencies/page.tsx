import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import AgenciesPartnerHero from "@/components/pages/partnership/agencies/AgenciesPartnerHero";
import AgencyOsFeatures from "@/components/pages/partnership/agencies/AgencyOsFeatures";
import TrackAcrossEngines from "@/components/pages/partnership/agencies/TrackAcrossEngines";
import WinBrandMentions from "@/components/pages/partnership/agencies/WinBrandMentions";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "Agency Partnership — GEO & AI Visibility for Marketing Agencies | Anny";
const description =
  "Productize GEO for every client. Multi-brand AI visibility reporting, audits, and action plans built for agency retainers across ChatGPT, Gemini, Perplexity, and more.";
const url = `${SITE_URL}/partnership/agencies`;
const ogImage = `${SITE_URL}/partnership/agencies/feature-action-plans.webp`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: ogImage,
        width: 900,
        height: 924,
        alt: "Anny client-ready GEO action plan with objectives, deliverables, and impact for agency retainers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: ogImage,
        alt: "Anny client-ready GEO action plan with objectives, deliverables, and impact for agency retainers",
      },
    ],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: ogImage,
    description:
      "Anny client-ready GEO action plan with objectives, deliverables, and impact for agency retainers",
  },
  about: {
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
  },
};

export default function AgenciesPartnershipPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
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
