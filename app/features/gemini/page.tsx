import type { Metadata } from "next";
import GeminiHero from "@/components/pages/features/gemini/GeminiHero";
import GeminiCitationBoard from "@/components/pages/features/gemini/GeminiCitationBoard";
import GeminiSourceChips from "@/components/pages/features/gemini/GeminiSourceChips";

export const metadata: Metadata = {
  title: "Gemini Citation Tracking — Anny",
  description:
    "Track multi-turn Gemini answers, inline citations, and the sources that mention — or skip — your brand.",
};

export default function GeminiFeaturePage() {
  return (
    <>
      <GeminiHero />
      <GeminiCitationBoard />
      <GeminiSourceChips />
    </>
  );
}
