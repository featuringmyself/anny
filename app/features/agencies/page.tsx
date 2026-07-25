import type { Metadata } from "next";
import AgenciesHero from "@/components/pages/features/agencies/AgenciesHero";
import AgenciesWorkspace from "@/components/pages/features/agencies/AgenciesWorkspace";
import AgenciesWhiteLabel from "@/components/pages/features/agencies/AgenciesWhiteLabel";

export const metadata: Metadata = {
  title: "Anny for Agencies — Multi-client AI Visibility",
  description:
    "Run AI search visibility for every client in one workspace. White-label reports, shared prompts, and seat-friendly agency pricing.",
};

export default function AgenciesFeaturePage() {
  return (
    <>
      <AgenciesHero />
      <AgenciesWorkspace />
      <AgenciesWhiteLabel />
    </>
  );
}
