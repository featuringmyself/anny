import type { Metadata } from "next";
import { Suspense } from "react";

import JsonLd from "@/components/JsonLd";
import { AiCrawlabilityCta } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityCta";
import { AiCrawlabilityFaq } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityFaq";
import { AiCrawlabilityHero } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHero";
import { AiCrawlabilityHowTo } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHowTo";
import {
  AiCrawlabilityResults,
  AiCrawlabilityResultsPending,
} from "@/components/pages/tools/ai-crawlability/AiCrawlabilityResults";
import {
  AI_CRAWL_DESCRIPTION,
  AI_CRAWL_PATH,
  AI_CRAWL_TITLE,
  aiCrawlJsonLd,
} from "@/components/pages/tools/ai-crawlability/seo";
import { parseDomainParam } from "@/lib/domain-input";
import { pageMetadata } from "@/lib/seo";

export const maxDuration = 30;

type SearchParams = Promise<{ domain?: string | string[] }>;

type AiCrawlabilityCheckerPageProps = {
  searchParams: SearchParams;
};

export async function generateMetadata({
  searchParams,
}: AiCrawlabilityCheckerPageProps): Promise<Metadata> {
  const domain = parseDomainParam((await searchParams).domain);

  return pageMetadata({
    path: AI_CRAWL_PATH,
    title: AI_CRAWL_TITLE,
    description: AI_CRAWL_DESCRIPTION,
    robots: domain
      ? { index: false, follow: true }
      : { index: true, follow: true },
  });
}

export default function AiCrawlabilityCheckerPage({
  searchParams,
}: AiCrawlabilityCheckerPageProps) {
  return (
    <main className="bg-[#f6f7f4]">
      <JsonLd data={aiCrawlJsonLd()} />

      <Suspense fallback={<AiCrawlabilityHero defaultDomain="" />}>
        <HeroFromSearchParams searchParams={searchParams} />
      </Suspense>

      <Suspense>
        <ResultsFromSearchParams searchParams={searchParams} />
      </Suspense>

      <Suspense>
        <BodyFromSearchParams searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function HeroFromSearchParams({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const domain = parseDomainParam((await searchParams).domain);
  return (
    <AiCrawlabilityHero defaultDomain={domain} compact={Boolean(domain)} />
  );
}

async function ResultsFromSearchParams({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const domain = parseDomainParam((await searchParams).domain);
  if (!domain) return null;

  return (
    <Suspense fallback={<AiCrawlabilityResultsPending domain={domain} />}>
      <AiCrawlabilityResults domain={domain} />
    </Suspense>
  );
}

async function BodyFromSearchParams({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const domain = parseDomainParam((await searchParams).domain);
  if (domain) {
    return <AiCrawlabilityCta />;
  }

  return (
    <>
      <AiCrawlabilityHowTo />
      <AiCrawlabilityFaq />
      <AiCrawlabilityCta />
    </>
  );
}
