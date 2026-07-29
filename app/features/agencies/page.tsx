import type { Metadata } from "next";
import AgenciesHero from "@/components/pages/features/agencies/AgenciesHero";
import AgenciesEconomics from "@/components/pages/features/agencies/AgenciesEconomics";
import AgenciesWorkspace from "@/components/pages/features/agencies/AgenciesWorkspace";
import AgenciesPitch from "@/components/pages/features/agencies/AgenciesPitch";
import AgenciesWhiteLabel from "@/components/pages/features/agencies/AgenciesWhiteLabel";
import AgenciesReporting from "@/components/pages/features/agencies/AgenciesReporting";
import AgenciesProgram from "@/components/pages/features/agencies/AgenciesProgram";
import AgenciesFaq from "@/components/pages/features/agencies/AgenciesFaq";
import AgenciesCta from "@/components/pages/features/agencies/AgenciesCta";

export const metadata: Metadata = {
  title: "Anny for Agencies — Resell AI Visibility on Agency Pricing",
  description:
    "Run AI search visibility for every client in one workspace. White-label reports, unlimited seats, pitch workspaces, and heavily discounted agency pricing — quoted by sales.",
};

export default function AgenciesFeaturePage() {
  return (
    <>
      <AgenciesHero />
      <AgenciesEconomics />
      <AgenciesWorkspace />
      <AgenciesPitch />
      <AgenciesWhiteLabel />
      <AgenciesReporting />
      <AgenciesProgram />
      <AgenciesFaq />
      <AgenciesCta />
    </>
  );
}
