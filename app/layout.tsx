import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import {
  SITE_DATE_MODIFIED,
  SITE_DATE_PUBLISHED,
  SITE_DESCRIPTION,
  SITE_LOGO_URL,
  SITE_NAME,
  SITE_SAME_AS,
  SITE_SCREENSHOT_URL,
  SITE_URL,
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Anny - AI Search Visibility Monitoring",
    description: SITE_DESCRIPTION,
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
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
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  datePublished: SITE_DATE_PUBLISHED,
  dateModified: SITE_DATE_MODIFIED,
  // aggregateRating omitted: no verifiable review count / ratingValue in the repo.
  screenshot: {
    "@type": "ImageObject",
    contentUrl: SITE_SCREENSHOT_URL,
    description: "Anny ChatGPT visibility dashboard overview",
  },
  offers: {
    "@type": "Offer",
    url: `${SITE_URL}/pricing`,
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  datePublished: SITE_DATE_PUBLISHED,
  dateModified: SITE_DATE_MODIFIED,
  publisher: {
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: SITE_LOGO_URL,
    },
  },
  // potentialAction / SearchAction omitted: no on-site search URL or /search route.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
