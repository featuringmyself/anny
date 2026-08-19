import type { Metadata } from "next";
import { Suspense } from "react";

import JsonLd from "@/components/JsonLd";
import PatternStrip from "@/components/PatternStrip";
import { SerpOverviewCta } from "@/components/pages/tools/serp-overview/SerpOverviewCta";
import { SerpOverviewExplain } from "@/components/pages/tools/serp-overview/SerpOverviewExplain";
import { SerpOverviewFaq } from "@/components/pages/tools/serp-overview/SerpOverviewFaq";
import { SerpOverviewForm } from "@/components/pages/tools/serp-overview/SerpOverviewForm";
import { SerpOverviewGuide } from "@/components/pages/tools/serp-overview/SerpOverviewGuide";
import { SerpOverviewHowTo } from "@/components/pages/tools/serp-overview/SerpOverviewHowTo";
import { SerpOverviewResultsPending } from "@/components/pages/tools/serp-overview/SerpOverviewResults";
import {
  SerpOverviewSearchForm,
  SerpOverviewSearchResults,
} from "@/components/pages/tools/serp-overview/SerpOverviewSearch";
import {
  SERP_CHECKER_DESCRIPTION,
  SERP_CHECKER_TITLE,
  SERP_CHECKER_URL,
  serpCheckerAppJsonLd,
  serpCheckerBreadcrumbJsonLd,
  serpCheckerFaqJsonLd,
  serpCheckerHowToJsonLd,
  serpCheckerWebPageJsonLd,
} from "@/components/pages/tools/serp-overview/seo";
import { parseKeywordParam } from "@/lib/serp-input";
import { SITE_NAME } from "@/lib/site";

export async function generateMetadata({
  searchParams,
}: PageProps<"/tools/serp-overview-checker">): Promise<Metadata> {
  const keyword = parseKeywordParam((await searchParams).keyword);

  return {
    title: SERP_CHECKER_TITLE,
    description: SERP_CHECKER_DESCRIPTION,
    alternates: { canonical: SERP_CHECKER_URL },
    robots: keyword
      ? { index: false, follow: true }
      : { index: true, follow: true },
    openGraph: {
      title: SERP_CHECKER_TITLE,
      description: SERP_CHECKER_DESCRIPTION,
      url: SERP_CHECKER_URL,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: SERP_CHECKER_TITLE,
      description: SERP_CHECKER_DESCRIPTION,
    },
  };
}

export default function SerpOverviewCheckerPage({
  searchParams,
}: PageProps<"/tools/serp-overview-checker">) {
  return (
    <main>
      <JsonLd data={serpCheckerWebPageJsonLd()} />
      <JsonLd data={serpCheckerAppJsonLd()} />
      <JsonLd data={serpCheckerBreadcrumbJsonLd()} />
      <JsonLd data={serpCheckerFaqJsonLd()} />
      <JsonLd data={serpCheckerHowToJsonLd()} />

      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Free tool
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
          Free Ahrefs SERP Overview
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 text-balance">
          Organic, paid, and SERP features for a keyword in one country — with
          Domain Rating and URL Rating on each result. No Ahrefs login.
        </p>
        <Suspense
          fallback={
            <SerpOverviewForm defaultKeyword="" defaultCountry="us" />
          }
        >
          <SerpOverviewSearchForm searchParams={searchParams} />
        </Suspense>
      </section>

      <section className="border-b bg-white px-6 py-12 md:px-12 md:py-16">
        <Suspense fallback={<SerpOverviewResultsPending />}>
          <SerpOverviewSearchResults searchParams={searchParams} />
        </Suspense>
      </section>

      <PatternStrip />
      <SerpOverviewHowTo />
      <PatternStrip />
      <SerpOverviewGuide />
      <PatternStrip />
      <SerpOverviewExplain />
      <PatternStrip />
      <SerpOverviewFaq />
      <PatternStrip />
      <SerpOverviewCta />
    </main>
  );
}
