import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk-family",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anny - AI Search Visibility Monitoring",
  description:
    "Built for agencies and brand studios. Track how often ChatGPT, Claude, Gemini, and Perplexity mention the brands you work on. Monitor AI answers, sources, and competitor visibility in one dashboard.",
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
        <div className="flex flex-col max-w-7xl mx-auto border-l border-r">
          <Navbar />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
