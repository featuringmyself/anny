import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import AgenciesPartnerHero from "@/components/pages/partnership/agencies/AgenciesPartnerHero";
import AgencyOsFeatures from "@/components/pages/partnership/agencies/AgencyOsFeatures";
import ClientPortfolioGrid from "@/components/pages/partnership/agencies/ClientPortfolioGrid";
import RetainersAngle from "@/components/pages/partnership/agencies/RetainersAngle";
import TrackAcrossEngines from "@/components/pages/partnership/agencies/TrackAcrossEngines";

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
      <ClientPortfolioGrid />
      <PatternStrip />
      <RetainersAngle />
    </div>
  );
}
