import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import DocsHero from "@/components/pages/product/DocsHero";
import DocsIndex from "@/components/pages/product/DocsIndex";

export const metadata: Metadata = {
  title: "Docs — Anny",
  description:
    "Anny documentation: quickstart, brand setup, prompt sets, model coverage, mentions, sources, and workspace guides.",
};

export default function DocsPage() {
  return (
    <main>
      <DocsHero />
      <PatternStrip />
      <DocsIndex />
    </main>
  );
}
