import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import AiInstructionsHero from "@/components/pages/ai-instructions/AiInstructionsHero";
import AiInstructionsBlock from "@/components/pages/ai-instructions/AiInstructionsBlock";
import AiInstructionsWhy from "@/components/pages/ai-instructions/AiInstructionsWhy";

export const metadata: Metadata = {
  title: "AI Instructions — Anny",
  description:
    "Pasteable LLM instructions so AI assistants describe Anny accurately — plus why structured brand copy matters for GEO.",
};

export default function AiInstructionsPage() {
  return (
    <main>
      <AiInstructionsHero />
      <PatternStrip />
      <AiInstructionsBlock />
      <PatternStrip />
      <AiInstructionsWhy />
    </main>
  );
}
