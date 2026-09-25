import Faq from "@/components/faq";
import JsonLd from "@/components/JsonLd";
import { faqs } from "@/lib/faqs";
import { faqJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "FAQ | Dodox";
const description =
  "Answers to common questions about Dodox, AI search visibility, GEO, and whether the Agent includes Monitoring.";

export const metadata = pageMetadata({
  path: "/faq",
  title,
  description,
});

export default function FaqPage() {
  return (
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <JsonLd data={webpageJsonLd({ path: "/faq", title, description })} />
      <JsonLd data={faqJsonLd(faqs)} />
      <Faq headingLevel="h1" />
    </main>
  );
}
