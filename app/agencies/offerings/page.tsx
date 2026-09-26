import JsonLd from "@/components/JsonLd";
import TrackModelsThatMatter from "@/components/Home/trackModelsThatMatter";
import OfferingsAudience from "@/components/pages/agencies/offerings/OfferingsAudience";
import OfferingsCta from "@/components/pages/agencies/offerings/OfferingsCta";
import OfferingsDemos from "@/components/pages/agencies/offerings/OfferingsDemos";
import OfferingsFaq from "@/components/pages/agencies/offerings/OfferingsFaq";
import { faqs as offeringsFaqs } from "@/components/pages/agencies/offerings/faqs";
import OfferingsHero from "@/components/pages/agencies/offerings/OfferingsHero";
import OfferingsPackages, {
  packages,
} from "@/components/pages/agencies/offerings/OfferingsPackages";
import OfferingsProblem from "@/components/pages/agencies/offerings/OfferingsProblem";
import OfferingsWhiteLabel from "@/components/pages/agencies/offerings/OfferingsWhiteLabel";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
  webpageJsonLd,
} from "@/lib/seo";

const PATH = "/agencies/offerings";
const title = "Agency Offerings: GEO Packages for Marketing Agencies | Dodox";
const description =
  "White-label GEO packages for SEO, PR, and digital agencies: standing snapshots, competitive audits, pitch workspaces, and monthly visibility retainers under your brand.";

export const metadata = pageMetadata({
  path: PATH,
  title,
  description,
});

function offeringsJsonLd() {
  const webpage = webpageJsonLd({
    path: PATH,
    title,
    description,
  });
  const { "@context": _c1, ...webpageRest } = webpage;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Agencies", path: "/features/agencies" },
    { name: "Offerings", path: PATH },
  ]);
  const { "@context": _c2, ...breadcrumbRest } = breadcrumb;

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpageRest,
      breadcrumbRest,
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl(PATH)}#offering-list`,
        name: "Agency GEO offerings",
        itemListElement: packages.map((pkg, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: pkg.name,
          url: `${absoluteUrl(PATH)}#${pkg.id}`,
          description: pkg.blurb,
        })),
      },
    ],
  };
}

export default function AgencyOfferingsPage() {
  return (
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <JsonLd data={offeringsJsonLd()} />
      <JsonLd data={faqJsonLd(offeringsFaqs)} />
      <OfferingsHero />
      <OfferingsWhiteLabel />
      <OfferingsAudience />
      <OfferingsProblem />
      <OfferingsPackages />
      <OfferingsDemos />
      <TrackModelsThatMatter />
      <OfferingsCta />
      <OfferingsFaq />
    </main>
  );
}
