import type { Metadata } from "next";

import JsonLd from "@/components/JsonLd";
import ChatGptDataToAction from "@/components/pages/features/chatgpt/ChatGptDataToAction";
import ChatGptFaq, {
  faqs,
} from "@/components/pages/features/chatgpt/ChatGptFaq";
import ChatGptHero from "@/components/pages/features/chatgpt/ChatGptHero";
import ChatGptTracks from "@/components/pages/features/chatgpt/ChatGptTracks";
import ChatGptWhyMatters from "@/components/pages/features/chatgpt/ChatGptWhyMatters";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const title = "ChatGPT Visibility Tracker — Anny";
const description =
  "Anny lets you measure your brand's performance on ChatGPT — visibility, sentiment, citations, and tips on how to improve.";
const url = `${SITE_URL}/features/chatgpt`;
const ogImage = `${SITE_URL}/features/chatgpt/hero-dashboard.png`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: ogImage,
        width: 2048,
        height: 1121,
        alt: "Anny ChatGPT visibility dashboard overview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [
      {
        url: ogImage,
        alt: "Anny ChatGPT visibility dashboard overview",
      },
    ],
  },
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url,
  isPartOf: {
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    contentUrl: ogImage,
    description: "Anny ChatGPT visibility dashboard overview",
  },
  about: {
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
  },
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
};

export default function ChatGptFeaturePage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />
      <JsonLd data={faqJsonLd} />
      <ChatGptHero />
      <ChatGptTracks />
      <ChatGptDataToAction />
      <ChatGptWhyMatters />
      <ChatGptFaq />
    </>
  );
}
