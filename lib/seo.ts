import type { Metadata } from "next";

import {
  SITE_DATE_MODIFIED,
  SITE_DATE_PUBLISHED,
  SITE_NAME,
  SITE_SCREENSHOT_ALT,
  SITE_SCREENSHOT_HEIGHT,
  SITE_SCREENSHOT_URL,
  SITE_SCREENSHOT_WIDTH,
  SITE_URL,
  SITE_X_HANDLE,
} from "@/lib/site";

export type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
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
  imageAlt,
  robots,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = image ?? SITE_SCREENSHOT_URL;
  const ogAlt = imageAlt ?? SITE_SCREENSHOT_ALT;
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
      locale: "en_US",
      ...(hasImage
        ? {
            images: [
              {
                url: ogImage,
                width: SITE_SCREENSHOT_WIDTH,
                height: SITE_SCREENSHOT_HEIGHT,
                alt: ogAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: hasImage ? "summary_large_image" : "summary",
      site: SITE_X_HANDLE,
      title,
      description,
      ...(hasImage
        ? {
            images: [
              {
                url: ogImage,
                alt: ogAlt,
              },
            ],
          }
        : {}),
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
  const primaryImage = image ?? SITE_SCREENSHOT_URL;

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: "en",
    datePublished: SITE_DATE_PUBLISHED,
    dateModified: SITE_DATE_MODIFIED,
    isPartOf: { "@id": `${SITE_URL}#website` },
    about: { "@id": `${SITE_URL}#software` },
    publisher: { "@id": `${SITE_URL}#organization` },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: primaryImage,
      width: SITE_SCREENSHOT_WIDTH,
      height: SITE_SCREENSHOT_HEIGHT,
      description: SITE_SCREENSHOT_ALT,
    },
    ...(image ? { image } : { image: primaryImage }),
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
