import Faq from "@/components/faq";
import JsonLd from "@/components/JsonLd";
import PatternStrip from "@/components/PatternStrip";
import { faqs } from "@/lib/faqs";
import { faqJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "FAQ | Anny";
const description =
  "Answers to common questions about Anny, AI search visibility, GEO, and how response tracking works.";

export const metadata = pageMetadata({
  path: "/faq",
  title,
  description,
});

export default function FaqPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/faq", title, description })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <PatternStrip />
      <Faq headingLevel="h1" />
    </main>
  );
}
