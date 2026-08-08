import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import AgenciesPartnerHero from "@/components/pages/partnership/agencies/AgenciesPartnerHero";
import AgencyOsFeatures from "@/components/pages/partnership/agencies/AgencyOsFeatures";
import TrackAcrossEngines from "@/components/pages/partnership/agencies/TrackAcrossEngines";
import WinBrandMentions from "@/components/pages/partnership/agencies/WinBrandMentions";

export const metadata: Metadata = {
  title: "Agency Partnership — Anny",
  description:
    "Productize GEO for every client. Multi-brand AI visibility reporting built for agency retainers.",
};

export default function AgenciesPartnershipPage() {
  return (
    <div>
      <AgenciesPartnerHero />
      <PatternStrip />
      <TrackAcrossEngines />
      <AgencyOsFeatures />
      <PatternStrip />
      <WinBrandMentions />
      <PatternStrip />
    </div>
  );
}
