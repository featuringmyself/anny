import type { Metadata } from "next";

import PatternStrip from "@/components/PatternStrip";
import LegalProse from "@/components/pages/LegalProse";

export const metadata: Metadata = {
  title: "Privacy Policy | Anny",
  description:
    "How Anny collects, uses, and protects personal data for AI search analytics.",
};

export default function PrivacyPage() {
  return (
    <div>
      <PatternStrip />
      <LegalProse
        title="Privacy Policy"
        lastUpdated="July 26, 2026"
        intro="Anny (“we”, “us”) provides AI search visibility analytics. This placeholder policy describes how we handle personal data when you use anny.ai or our product."
        sections={[
          {
            heading: "Data we collect",
            body: "Account details (name, email, company), billing information processed by our payment provider, product usage and device data, and content you submit such as tracked domains, prompts, and competitor lists.",
          },
          {
            heading: "How we use data",
            body: "We use data to operate Anny, improve AI visibility tracking, provide support, send product updates you opt into, and meet legal obligations. We do not sell personal data.",
          },
          {
            heading: "Sharing",
            body: "We share data with infrastructure and analytics providers under contract, and when required by law. Subprocessors only receive what they need to perform their service.",
          },
          {
            heading: "Retention & rights",
            body: "We keep data only as long as needed for the purposes above. Depending on where you live, you may request access, correction, deletion, or export by emailing privacy@anny.ai.",
          },
          {
            heading: "Contact",
            body: "Anny — privacy@anny.ai. For formal notices, use the address listed on our Imprint page.",
          },
        ]}
      />
    </div>
  );
}
