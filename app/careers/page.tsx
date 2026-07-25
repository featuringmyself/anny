import type { Metadata } from "next";
import PatternStrip from "@/components/PatternStrip";
import CareersHero from "@/components/pages/careers/CareersHero";
import CareersBoard from "@/components/pages/careers/CareersBoard";
import CareersCulture from "@/components/pages/careers/CareersCulture";

export const metadata: Metadata = {
  title: "Careers — Anny",
  description:
    "Join Anny and help marketing teams measure AI search visibility across ChatGPT, Claude, Gemini, and more.",
};

export default function CareersPage() {
  return (
    <div>
      <CareersHero />
      <PatternStrip />
      <CareersBoard />
      <PatternStrip />
      <CareersCulture />
    </div>
  );
}
