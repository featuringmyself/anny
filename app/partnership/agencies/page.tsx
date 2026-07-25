import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import AgenciesPartnerHero from "@/components/pages/partnership/agencies/AgenciesPartnerHero";
import ClientPortfolioGrid from "@/components/pages/partnership/agencies/ClientPortfolioGrid";
import RetainersAngle from "@/components/pages/partnership/agencies/RetainersAngle";

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
      <ClientPortfolioGrid />
      <PatternStrip />
      <RetainersAngle />
    </div>
  );
}
