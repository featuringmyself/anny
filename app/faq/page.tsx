import type { Metadata } from "next";

import Faq from "@/components/faq";
import JsonLd from "@/components/JsonLd";
import PatternStrip from "@/components/PatternStrip";
import { faqs } from "@/lib/faqs";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ | Anny",
  description:
    "Answers to common questions about Anny, AI search visibility, GEO, and how response tracking works.",
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
  url: `${SITE_URL}/faq`,
};

export default function FaqPage() {
  return (
    <main>
      <JsonLd data={faqJsonLd} />
      <PatternStrip />
      <Faq />
    </main>
  );
}
