"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";

export default function SerpOverviewError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    posthog.captureException(error);
  }, [error]);

  return (
    <main>
      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <p className="text-sm font-medium tracking-wide text-red-500">
          Something went wrong
        </p>
        <h1 className="mt-3 max-w-xl text-4xl font-medium tracking-tight text-balance">
          Couldn’t load that SERP
        </h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500">
          The lookup failed. Try again in a moment, or search a different
          keyword.
        </p>
        <Button type="button" size="lg" className="mt-8 px-5" onClick={retry}>
          Try again
        </Button>
      </section>
    </main>
  );
}
