import type { Metadata } from "next";
import { Suspense } from "react";

import JsonLd from "@/components/JsonLd";
import PatternStrip from "@/components/PatternStrip";
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
  AI_READINESS_DESCRIPTION,
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
    robots: domain
      ? { index: false, follow: true }
      : { index: true, follow: true },
  });
}

export default function AiReadinessCheckerPage({
  searchParams,
}: AiReadinessCheckerPageProps) {
  return (
    <main>
      <JsonLd data={aiReadinessJsonLd()} />

      <section>
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center border-b px-6 py-14 md:border-r md:border-b-0 md:px-12 md:py-20">
            <p className="text-sm font-medium tracking-wide text-[#2462ff]">
              Free tool
            </p>
            <h1 className="mt-3 max-w-lg text-4xl font-medium tracking-tight text-balance md:text-5xl">
              Free AI readiness checker
            </h1>
            <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500 text-balance">
              Paste a domain to see how ready the site is for ChatGPT, Claude,
              and other agents — crawl access, llms.txt, schema, and HTML. No
              signup.
            </p>

            <Suspense fallback={<AiReadinessForm defaultDomain="" />}>
              <FormFromSearchParams searchParams={searchParams} />
            </Suspense>
          </div>

          <Suspense fallback={<AiReadinessInstrumentPending domain="—" />}>
            <InstrumentFromSearchParams searchParams={searchParams} />
          </Suspense>
        </div>
      </section>

      <Suspense>
        <FindingsFromSearchParams searchParams={searchParams} />
      </Suspense>

      <PatternStrip />
      <AiReadinessHowTo />
      <PatternStrip />
      <AiReadinessChecks />
      <PatternStrip />
      <AiReadinessScale />
      <PatternStrip />
      <AiReadinessExplain />
      <PatternStrip />
      <AiReadinessFaq />
      <PatternStrip />
      <AiReadinessCta />
    </main>
  );
}

async function FormFromSearchParams({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const domain = parseDomainParam((await searchParams).domain);
  return <AiReadinessForm defaultDomain={domain} />;
}

async function InstrumentFromSearchParams({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const domain = parseDomainParam((await searchParams).domain);

  if (!domain) {
    return <AiReadinessInstrument />;
  }

  return (
    <Suspense fallback={<AiReadinessInstrumentPending domain={domain} />}>
      <AiReadinessInstrument domain={domain} />
    </Suspense>
  );
}

async function FindingsFromSearchParams({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const domain = parseDomainParam((await searchParams).domain);
  if (!domain) return null;

  return (
    <>
      <PatternStrip />
      <Suspense fallback={<AiReadinessFindingsPending />}>
        <AiReadinessFindings domain={domain} />
      </Suspense>
    </>
  );
}
