import type { Metadata } from "next";
import { Suspense } from "react";

import JsonLd from "@/components/JsonLd";
import { AiCrawlabilityChecks } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityChecks";
import { AiCrawlabilityCta } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityCta";
import { AiCrawlabilityExplain } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityExplain";
import { AiCrawlabilityFaq } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityFaq";
import { AiCrawlabilityHero } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHero";
import { AiCrawlabilityHowTo } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHowTo";
import {
  AiCrawlabilityResults,
  AiCrawlabilityResultsPending,
} from "@/components/pages/tools/ai-crawlability/AiCrawlabilityResults";
import { AiCrawlabilityScale } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityScale";
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

export default async function AiCrawlabilityCheckerPage({
  searchParams,
}: AiCrawlabilityCheckerPageProps) {
  const domain = parseDomainParam((await searchParams).domain);

  return (
    <main className="bg-[#f6f7f4]">
      <JsonLd
        data={aiCrawlJsonLd({ includeEducational: !domain })}
      />

      <AiCrawlabilityHero
        defaultDomain={domain ?? ""}
        compact={Boolean(domain)}
      />

      {domain ? (
        <Suspense fallback={<AiCrawlabilityResultsPending domain={domain} />}>
          <AiCrawlabilityResults domain={domain} />
        </Suspense>
      ) : null}

      {domain ? (
        <AiCrawlabilityCta />
      ) : (
        <>
          <AiCrawlabilityHowTo />
          <AiCrawlabilityChecks />
          <AiCrawlabilityScale />
          <AiCrawlabilityExplain />
          <AiCrawlabilityFaq />
          <AiCrawlabilityCta />
        </>
      )}
    </main>
  );
}
