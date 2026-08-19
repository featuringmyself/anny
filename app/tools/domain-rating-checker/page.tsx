import type { Metadata } from "next";
import { Suspense } from "react";

import JsonLd from "@/components/JsonLd";
import PatternStrip from "@/components/PatternStrip";
import { DomainRatingCta } from "@/components/pages/tools/domain-rating/DomainRatingCta";
import { DomainRatingExplain } from "@/components/pages/tools/domain-rating/DomainRatingExplain";
import { DomainRatingFaq } from "@/components/pages/tools/domain-rating/DomainRatingFaq";
import { DomainRatingForm } from "@/components/pages/tools/domain-rating/DomainRatingForm";
import { DomainRatingHowTo } from "@/components/pages/tools/domain-rating/DomainRatingHowTo";
import {
  DomainRatingInstrument,
  DomainRatingInstrumentPending,
} from "@/components/pages/tools/domain-rating/DomainRatingInstrument";
import { DomainRatingScale } from "@/components/pages/tools/domain-rating/DomainRatingScale";
import {
  DR_CHECKER_DESCRIPTION,
  DR_CHECKER_PATH,
  DR_CHECKER_TITLE,
  drCheckerJsonLd,
} from "@/components/pages/tools/domain-rating/seo";
import { parseDomainParam } from "@/lib/domain-input";
import { pageMetadata } from "@/lib/seo";

type DomainRatingCheckerPageProps = {
  searchParams: Promise<{ domain?: string | string[] }>;
};

export async function generateMetadata({
  searchParams,
}: DomainRatingCheckerPageProps): Promise<Metadata> {
  const domain = parseDomainParam((await searchParams).domain);

  return pageMetadata({
    path: DR_CHECKER_PATH,
    title: DR_CHECKER_TITLE,
    description: DR_CHECKER_DESCRIPTION,
    robots: domain
      ? { index: false, follow: true }
      : { index: true, follow: true },
  });
}

export default async function DomainRatingCheckerPage({
  searchParams,
}: DomainRatingCheckerPageProps) {
  const domain = parseDomainParam((await searchParams).domain);

  return (
    <main>
      <JsonLd data={drCheckerJsonLd()} />

      <section>
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center border-b px-6 py-14 md:border-r md:border-b-0 md:px-12 md:py-20">
            <p className="text-sm font-medium tracking-wide text-[#2462ff]">
              Free tool
            </p>
            <h1 className="mt-3 max-w-lg text-4xl font-medium tracking-tight text-balance md:text-5xl">
              Check any site’s Domain Rating
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500 text-balance">
              Paste a domain to see Ahrefs’ 0–100 score for how strong its
              backlinks are, compared with other sites. No signup.
            </p>

            <DomainRatingForm defaultDomain={domain} />
          </div>

          {domain ? (
            <Suspense
              fallback={<DomainRatingInstrumentPending domain={domain} />}
            >
              <DomainRatingInstrument domain={domain} />
            </Suspense>
          ) : (
            <DomainRatingInstrument />
          )}
        </div>
      </section>

      <PatternStrip />
      <DomainRatingHowTo />
      <PatternStrip />
      <DomainRatingScale />
      <PatternStrip />
      <DomainRatingExplain />
      <PatternStrip />
      <DomainRatingFaq />
      <PatternStrip />
      <DomainRatingCta />
    </main>
  );
}
