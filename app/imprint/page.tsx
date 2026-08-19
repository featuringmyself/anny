import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import LegalProse from "@/components/pages/LegalProse";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Imprint | Anny";
const description = "Legal imprint and company contact information for Anny (India).";

export const metadata = pageMetadata({
  path: "/imprint",
  title,
  description,
});

export default function ImprintPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/imprint", title, description })} />
      <PatternStrip />
      <LegalProse
        title="Imprint"
        lastUpdated="August 9, 2026"
        intro="Information about the operator of Anny, provided for transparency and statutory disclosure under Indian law."
        sections={[
          {
            heading: "Operator",
            body: "Anny — AI search analytics for marketing teams, operated from India. Website: anny.dodoxhq.com. Email: hello@dodoxhq.com.",
          },
          {
            heading: "Registered address",
            body: "Assotech Business Cresterra, Sector 135, Noida 201304, Uttar Pradesh, India. For formal correspondence, write to this address or email hello@dodoxhq.com.",
          },
          {
            heading: "Responsible for content",
            body: "Editorial responsibility for this website rests with the Anny team. Product and marketing inquiries: hello@dodoxhq.com. Legal: legal@dodoxhq.com. Privacy: privacy@dodoxhq.com.",
          },
          {
            heading: "Jurisdiction & dispute resolution",
            body: "We prefer to resolve issues directly. These disclosures are governed by the laws of India. Subject to applicable consumer protection rights, courts in Noida / Gautam Buddh Nagar, Uttar Pradesh shall have jurisdiction. You may also seek remedies under the Consumer Protection Act, 2019, including through the National Consumer Helpline or the appropriate consumer commission.",
          },
        ]}
      />
    </main>
  );
}
