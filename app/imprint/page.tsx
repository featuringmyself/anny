import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import LegalProse from "@/components/pages/LegalProse";

export const metadata: Metadata = {
  title: "Imprint | Anny",
  description: "Legal imprint and company contact information for Anny.",
};

export default function ImprintPage() {
  return (
    <main>
      <PatternStrip />
      <LegalProse
        title="Imprint"
        lastUpdated="July 26, 2026"
        intro="Information about the operator of Anny, provided for transparency and statutory disclosure. Details below are placeholders until final company registration is confirmed."
        sections={[
          {
            heading: "Operator",
            body: "Anny — AI search analytics for marketing teams. Website: anny.dodoxhq.com. Email: hello@dodoxhq.com.",
          },
          {
            heading: "Registered address",
            body: "Company name, registration number, and registered office will appear here once finalized. Until then, contact hello@dodoxhq.com for formal correspondence.",
          },
          {
            heading: "Responsible for content",
            body: "Editorial responsibility for this website rests with the Anny team. Product and marketing inquiries: hello@dodoxhq.com. Legal: legal@dodoxhq.com. Privacy: privacy@dodoxhq.com.",
          },
          {
            heading: "Dispute resolution",
            body: "We prefer to resolve issues directly. Where applicable, consumers may use EU online dispute resolution platforms; we are not obliged to participate in consumer arbitration unless required by law.",
          },
        ]}
      />
    </main>
  );
}
