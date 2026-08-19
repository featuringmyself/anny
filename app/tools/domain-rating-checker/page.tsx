import type { Metadata } from "next";
import Form from "next/form";
import { Suspense } from "react";

import PatternStrip from "@/components/PatternStrip";
import { PostHogDistinctIdField } from "@/components/posthog-distinct-id-field";
import { DomainRatingCta } from "@/components/pages/tools/domain-rating/DomainRatingCta";
import { DomainRatingExplain } from "@/components/pages/tools/domain-rating/DomainRatingExplain";
import {
  DomainRatingInstrument,
  DomainRatingInstrumentPending,
} from "@/components/pages/tools/domain-rating/DomainRatingInstrument";
import { DomainRatingScale } from "@/components/pages/tools/domain-rating/DomainRatingScale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { checkDomainRating } from "@/app/actions/domain-rating";
import { parseDomainParam } from "@/lib/domain-rating";

export const metadata: Metadata = {
  title: "Free Domain Rating Checker — Anny",
  description:
    "Check any website’s Ahrefs Domain Rating for free. No signup, no login — paste a domain and see the 0–100 score.",
};

type DomainRatingCheckerPageProps = {
  searchParams: Promise<{ domain?: string | string[] }>;
};

export default async function DomainRatingCheckerPage({
  searchParams,
}: DomainRatingCheckerPageProps) {
  const domain = parseDomainParam((await searchParams).domain);

  return (
    <main>
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
              Paste a domain and see its Ahrefs score from 0 to 100. No
              account. No paywall. Completely free.
            </p>

            <Form action={checkDomainRating} className="mt-10 max-w-md">
              <PostHogDistinctIdField />
              <Label htmlFor="domain" className="text-zinc-600">
                Domain
              </Label>
              <Input
                id="domain"
                type="text"
                name="domain"
                placeholder="example.com"
                defaultValue={domain}
                className="mt-2 h-11 bg-white px-3"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <Button type="submit" size="lg" className="mt-5 px-5">
                Check rating
              </Button>
            </Form>
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
      <DomainRatingScale />
      <PatternStrip />
      <DomainRatingExplain />
      <PatternStrip />
      <DomainRatingCta />
    </main>
  );
}
