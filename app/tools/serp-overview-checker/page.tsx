import type { Metadata } from "next";
import { Suspense } from "react";

import PatternStrip from "@/components/PatternStrip";
import { SerpOverviewCta } from "@/components/pages/tools/serp-overview/SerpOverviewCta";
import { SerpOverviewExplain } from "@/components/pages/tools/serp-overview/SerpOverviewExplain";
import { SerpOverviewForm } from "@/components/pages/tools/serp-overview/SerpOverviewForm";
import { SerpOverviewGuide } from "@/components/pages/tools/serp-overview/SerpOverviewGuide";
import {
  SerpOverviewResults,
  SerpOverviewResultsPending,
} from "@/components/pages/tools/serp-overview/SerpOverviewResults";
import { parseCountryParam, parseKeywordParam } from "@/lib/serp-input";

export const metadata: Metadata = {
  title: "Free SERP Overview Checker — Anny",
  description:
    "See who ranks in the top 10 organic Google results for any keyword, with Ahrefs Domain Rating and URL Rating. No signup, no login.",
};

type SerpOverviewCheckerPageProps = {
  searchParams: Promise<{
    keyword?: string | string[];
    country?: string | string[];
  }>;
};

export default async function SerpOverviewCheckerPage({
  searchParams,
}: SerpOverviewCheckerPageProps) {
  const params = await searchParams;
  const keyword = parseKeywordParam(params.keyword);
  const country = parseCountryParam(params.country);

  return (
    <main>
      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Free tool
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
          Who ranks for this keyword?
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 text-balance">
          Top 10 organic Google results, with each page’s Ahrefs Domain Rating
          and URL Rating. One search. No account.
        </p>
        <SerpOverviewForm defaultKeyword={keyword} defaultCountry={country} />
      </section>

      <section className="border-b bg-white px-6 py-12 md:px-12 md:py-16">
        {keyword ? (
          <Suspense
            fallback={
              <SerpOverviewResultsPending keyword={keyword} country={country} />
            }
          >
            <SerpOverviewResults keyword={keyword} country={country} />
          </Suspense>
        ) : (
          <SerpOverviewResults />
        )}
      </section>

      <PatternStrip />
      <SerpOverviewGuide />
      <PatternStrip />
      <SerpOverviewExplain />
      <PatternStrip />
      <SerpOverviewCta />
    </main>
  );
}
