import type { Metadata } from "next";

import Faq from "@/components/faq";
import PatternStrip from "@/components/PatternStrip";

export const metadata: Metadata = {
  title: "FAQ | Anny",
  description:
    "Answers to common questions about Anny, AI search visibility, GEO, and how response tracking works.",
};

export default function FaqPage() {
  return (
    <div>
      <PatternStrip />
      <Faq />
    </div>
  );
}
