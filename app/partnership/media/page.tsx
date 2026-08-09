import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import MediaPartnerHero from "@/components/pages/partnership/media/MediaPartnerHero";
import PressKit from "@/components/pages/partnership/media/PressKit";
import QuoteRequest from "@/components/pages/partnership/media/QuoteRequest";

export const metadata: Metadata = {
  title: "Media Partnership — Anny",
  description:
    "Press kit, logos, and quote requests for journalists covering AI search and GEO.",
};

export default function MediaPartnershipPage() {
  return (
    <>
      <MediaPartnerHero />
      <PatternStrip />
      <PressKit />
      <PatternStrip />
      <QuoteRequest />
    </>
  );
}
