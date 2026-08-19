import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import LegalProse from "@/components/pages/LegalProse";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Cookie Settings | Anny";
const description =
  "How Anny uses cookies and similar technologies on anny.dodoxhq.com.";

export const metadata = pageMetadata({
  path: "/cookies",
  title,
  description,
});

export default function CookiesPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/cookies", title, description })} />
      <PatternStrip />
      <LegalProse
        title="Cookie Settings"
        lastUpdated="July 26, 2026"
        intro="This page explains how Anny uses cookies and similar technologies when you visit our website and product. It is a concise placeholder policy and not legal advice."
        sections={[
          {
            heading: "What we use",
            body: "Anny may use essential cookies to keep the site secure and working, analytics cookies to understand product usage, and preference cookies to remember choices like language or dismissed notices.",
          },
          {
            heading: "Essential cookies",
            body: "These are required for authentication, security, load balancing, and core navigation. You cannot opt out of essential cookies while using Anny.",
          },
          {
            heading: "Analytics & preferences",
            body: "Where required by law, we only set non-essential cookies after you consent. You can change your mind later by clearing cookies in your browser or contacting us.",
          },
          {
            heading: "Contact",
            body: "Questions about cookies? Email privacy@dodoxhq.com and we will help.",
          },
        ]}
      />
    </main>
  );
}
