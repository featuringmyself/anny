import type { Metadata } from "next";
import AiModeHero from "@/components/pages/features/ai-mode/AiModeHero";
import AiModeDualPanel from "@/components/pages/features/ai-mode/AiModeDualPanel";

export const metadata: Metadata = {
  title: "Google AI Mode & Overview Tracking — Anny",
  description:
    "Compare brand visibility across Google AI Mode and AI Overviews for the same queries — presence, rank, and citation gaps.",
};

export default function AiModeFeaturePage() {
  return (
    <>
      <AiModeHero />
      <AiModeDualPanel />
    </>
  );
}
