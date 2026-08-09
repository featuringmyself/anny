import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import CreatorsPartnerHero from "@/components/pages/partnership/creators/CreatorsPartnerHero";
import AffiliateStrip from "@/components/pages/partnership/creators/AffiliateStrip";
import ContentKitStrip from "@/components/pages/partnership/creators/ContentKitStrip";

export const metadata: Metadata = {
  title: "Creator Partnership — Anny",
  description:
    "Affiliate program and content kit for creators teaching GEO and AI search visibility.",
};

export default function CreatorsPartnershipPage() {
  return (
    <>
      <CreatorsPartnerHero />
      <PatternStrip />
      <AffiliateStrip />
      <PatternStrip />
      <ContentKitStrip />
    </>
  );
}
