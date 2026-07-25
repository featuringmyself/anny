import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import ChangelogHero from "@/components/pages/product/ChangelogHero";
import ChangelogTimeline from "@/components/pages/product/ChangelogTimeline";

export const metadata: Metadata = {
  title: "Changelog — Anny",
  description:
    "Product updates from Anny: AI Mode tracking, competitor ladders, Gemini citations, Slack alerts, and agency workspaces.",
};

export default function ChangelogPage() {
  return (
    <main>
      <ChangelogHero />
      <PatternStrip />
      <ChangelogTimeline />
    </main>
  );
}
