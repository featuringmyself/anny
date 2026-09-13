import type { Metadata } from "next";
import { Suspense } from "react";

import JsonLd from "@/components/JsonLd";
import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { PageBreadcrumbs } from "@/components/pages/shared/PageBreadcrumbs";
import { AiReadinessChecks } from "@/components/pages/tools/ai-readiness/AiReadinessChecks";
import { AiReadinessCta } from "@/components/pages/tools/ai-readiness/AiReadinessCta";
import { AiReadinessExplain } from "@/components/pages/tools/ai-readiness/AiReadinessExplain";
import { AiReadinessFaq } from "@/components/pages/tools/ai-readiness/AiReadinessFaq";
import {
  AiReadinessFindings,
  AiReadinessFindingsPending,
} from "@/components/pages/tools/ai-readiness/AiReadinessFindings";
import { AiReadinessForm } from "@/components/pages/tools/ai-readiness/AiReadinessForm";
import { AiReadinessHowTo } from "@/components/pages/tools/ai-readiness/AiReadinessHowTo";
import {
  AiReadinessInstrument,
  AiReadinessInstrumentPending,
} from "@/components/pages/tools/ai-readiness/AiReadinessInstrument";
import { AiReadinessScale } from "@/components/pages/tools/ai-readiness/AiReadinessScale";
import {
  AI_READINESS_BREADCRUMBS,
  AI_READINESS_DESCRIPTION,
  AI_READINESS_OG_ALT,
  AI_READINESS_OG_HEIGHT,
  AI_READINESS_OG_IMAGE_URL,
  AI_READINESS_OG_WIDTH,
  AI_READINESS_PATH,
  AI_READINESS_TITLE,
  aiReadinessJsonLd,
} from "@/components/pages/tools/ai-readiness/seo";
import { parseDomainParam } from "@/lib/domain-input";
import { pageMetadata } from "@/lib/seo";

export const maxDuration = 30;

type SearchParams = Promise<{ domain?: string | string[] }>;

type AiReadinessCheckerPageProps = {
  searchParams: SearchParams;
};

export async function generateMetadata({
  searchParams,
}: AiReadinessCheckerPageProps): Promise<Metadata> {
  const domain = parseDomainParam((await searchParams).domain);

  return pageMetadata({
    path: AI_READINESS_PATH,
    title: AI_READINESS_TITLE,
    description: AI_READINESS_DESCRIPTION,
    image: AI_READINESS_OG_IMAGE_URL,
    imageAlt: AI_READINESS_OG_ALT,
    imageWidth: AI_READINESS_OG_WIDTH,
    imageHeight: AI_READINESS_OG_HEIGHT,
    robots: domain
      ? { index: false, follow: true }
      : { index: true, follow: true },
  });
}

export default async function AiReadinessCheckerPage({
  searchParams,
}: AiReadinessCheckerPageProps) {
  const domain = parseDomainParam((await searchParams).domain);

  return (
    <main className="bg-[#f6f7f4]">
      <JsonLd data={aiReadinessJsonLd({ domainPresent: Boolean(domain) })} />

      <section className="relative isolate overflow-hidden border-b border-zinc-200/80">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-[-18%] left-[-8%] h-90 w-110 rounded-full bg-[#b6e4f6]/20 blur-[140px]" />
          <div className="absolute right-[-6%] bottom-[-22%] h-100 w-120 rounded-full bg-[#c5f247]/14 blur-[150px]" />
        </div>

        <div className="relative grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 md:border-r md:border-zinc-200/80 md:px-12 md:py-20 lg:px-16">
            <PageBreadcrumbs
              className="mb-6"
              items={AI_READINESS_BREADCRUMBS.map((item, index, all) =>
                index === all.length - 1
                  ? { name: item.name }
                  : { name: item.name, href: item.path },
              )}
            />
            <Eyebrow className="text-sm font-medium">
              Free tool for marketing and SEO teams
            </Eyebrow>
            <h1 className="mt-3 max-w-lg text-4xl font-medium tracking-tight text-balance text-zinc-900 md:text-5xl">
              Free AI readiness checker
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
              See if ChatGPT can crawl and name this site. You get a score plus
              copy-paste robots.txt, JSON-LD, and sitemap fixes. No signup.
            </p>

            <AiReadinessForm defaultDomain={domain} />
          </div>

          {domain ? (
            <Suspense
              fallback={<AiReadinessInstrumentPending domain={domain} />}
            >
              <AiReadinessInstrument domain={domain} />
            </Suspense>
          ) : (
            <AiReadinessInstrument />
          )}
        </div>
      </section>

      {domain ? (
        <Suspense fallback={<AiReadinessFindingsPending />}>
          <AiReadinessFindings domain={domain} />
        </Suspense>
      ) : null}

      {domain ? null : (
        <>
          <AiReadinessHowTo />
          <AiReadinessChecks />
          <AiReadinessScale />
          <AiReadinessExplain />
          <AiReadinessFaq />
          <AiReadinessCta />
        </>
      )}
    </main>
  );
}
