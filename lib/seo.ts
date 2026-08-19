import type { Metadata } from "next";

import { SITE_NAME, SITE_SCREENSHOT_URL, SITE_URL } from "@/lib/site";

export type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
  robots?: Metadata["robots"];
};

export type WebpageJsonLdInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
};

export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

export type BreadcrumbJsonLdItem = {
  name: string;
  path: string;
};

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${normalized}`;
}

export function pageMetadata({
  path,
  title,
  description,
  image,
  robots,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? SITE_SCREENSHOT_URL;
  const hasImage = Boolean(ogImage);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    ...(robots !== undefined ? { robots } : {}),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      ...(hasImage
        ? {
            images: [
              {
                url: ogImage,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      title,
      description,
      ...(hasImage ? { images: [ogImage] } : {}),
    },
  };
}

export function webpageJsonLd({
  path,
  title,
  description,
  image,
}: WebpageJsonLdInput) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    ...(image ? { image } : {}),
    isPartOf: `${SITE_URL}#website`,
    about: `${SITE_URL}#software`,
  };
}

export function faqJsonLd(faqs: readonly FaqJsonLdItem[]) {
  return {
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
}

export function breadcrumbJsonLd(items: readonly BreadcrumbJsonLdItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
