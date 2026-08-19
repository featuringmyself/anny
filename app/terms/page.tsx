import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import LegalProse from "@/components/pages/LegalProse";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Terms of Service | Anny";
const description =
  "Terms governing use of the Anny website and AI search analytics product.";

export const metadata = pageMetadata({
  path: "/terms",
  title,
  description,
});

export default function TermsPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/terms", title, description })} />
      <PatternStrip />
      <LegalProse
        title="Terms of Service"
        lastUpdated="July 26, 2026"
        intro="These placeholder terms govern access to Anny’s website and product. By using Anny, you agree to them. They are not a substitute for a reviewed commercial agreement."
        sections={[
          {
            heading: "The service",
            body: "Anny monitors how AI assistants mention brands across models and surfaces. Features, limits, and pricing may change; we will communicate material changes to paid customers.",
          },
          {
            heading: "Accounts",
            body: "You must provide accurate account information and keep credentials secure. You are responsible for activity under your account and for complying with applicable laws when tracking brands or competitors.",
          },
          {
            heading: "Acceptable use",
            body: "Do not misuse Anny, attempt to disrupt the service, scrape beyond permitted APIs, or use outputs to harass or deceive. We may suspend accounts that violate these terms.",
          },
          {
            heading: "Subscriptions & billing",
            body: "Paid plans renew according to the checkout terms. Fees are non-refundable except where required by law or stated otherwise in writing.",
          },
          {
            heading: "Disclaimer",
            body: "Anny is provided “as is.” AI answers change frequently; visibility scores and mentions are estimates based on our sampling methods, not guarantees of ranking or citation.",
          },
          {
            heading: "Contact",
            body: "Questions about these terms? Email legal@dodoxhq.com.",
          },
        ]}
      />
    </main>
  );
}
