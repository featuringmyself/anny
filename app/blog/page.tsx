import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import BlogHero from "@/components/pages/product/BlogHero";
import BlogIndex from "@/components/pages/product/BlogIndex";

export const metadata: Metadata = {
  title: "Blog — Anny",
  description:
    "Anny field notes on AI search, GEO, ChatGPT mentions, Gemini sources, and agency visibility retainers.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogHero />
      <PatternStrip />
      <BlogIndex />
    </main>
  );
}
