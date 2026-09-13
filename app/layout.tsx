import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import { MarketingChrome } from "@/components/MarketingChrome";
import JsonLd from "@/components/JsonLd";
import { pricedOffers } from "@/lib/pricing";
import { absoluteUrl } from "@/lib/seo";
import { SanityLive } from "@/lib/sanity/live";
import {
  SITE_DATE_MODIFIED,
  SITE_DATE_PUBLISHED,
  SITE_DESCRIPTION,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_SAME_AS,
  SITE_SCREENSHOT_ALT,
  SITE_SCREENSHOT_HEIGHT,
  SITE_SCREENSHOT_URL,
  SITE_SCREENSHOT_WIDTH,
  SITE_URL,
  SITE_X_HANDLE,
} from "@/lib/site";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Anny - AI Search Visibility Monitoring",
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Anny - AI Search Visibility Monitoring",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: SITE_SCREENSHOT_URL,
        width: SITE_SCREENSHOT_WIDTH,
        height: SITE_SCREENSHOT_HEIGHT,
        alt: SITE_SCREENSHOT_ALT,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE_X_HANDLE,
    title: "Anny - AI Search Visibility Monitoring",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: SITE_SCREENSHOT_URL,
        alt: SITE_SCREENSHOT_ALT,
      },
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: "hello@dodoxhq.com",
  logo: {
    "@type": "ImageObject",
    url: SITE_LOGO_URL,
  },
  sameAs: [...SITE_SAME_AS],
};

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": ["SoftwareApplication", "WebApplication"],
  "@id": `${SITE_URL}#software`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  datePublished: SITE_DATE_PUBLISHED,
  dateModified: SITE_DATE_MODIFIED,
  // aggregateRating / review omitted: no verifiable public review count on-site.
  // Google software rich results also require a rating or review; do not invent one.
  screenshot: {
    "@type": "ImageObject",
    contentUrl: SITE_SCREENSHOT_URL,
    width: SITE_SCREENSHOT_WIDTH,
    height: SITE_SCREENSHOT_HEIGHT,
    description: SITE_SCREENSHOT_ALT,
  },
  offers: pricedOffers().map((offer) => ({
    "@type": "Offer",
    name: offer.name,
    description: offer.description,
    url: absoluteUrl(offer.href),
    price: offer.price,
    priceCurrency: offer.priceCurrency,
    availability: "https://schema.org/InStock",
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "en",
  datePublished: SITE_DATE_PUBLISHED,
  dateModified: SITE_DATE_MODIFIED,
  publisher: {
    "@id": `${SITE_URL}#organization`,
  },
  // potentialAction / SearchAction omitted: no on-site search URL or /search route.
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full  font-sans">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        <JsonLd data={softwareJsonLd} />
        <div className="flex flex-col max-w-7xl mx-auto border-l border-r">
          <MarketingChrome>
            <Navbar />
          </MarketingChrome>
          {children}
        </div>
        <MarketingChrome>
          <Footer />
        </MarketingChrome>
        <SanityLive />
        {isDraftMode ? <VisualEditing /> : null}
      </body>
    </html>
  );
}
