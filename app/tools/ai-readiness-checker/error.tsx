"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

export default function AiReadinessError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="border-b px-6 py-20 md:px-12">
      <p className="text-sm font-medium tracking-wide text-[#2462ff]">
        Free tool
      </p>
      <h1 className="mt-3 max-w-lg text-3xl font-medium tracking-tight md:text-4xl">
        Couldn’t finish that scan
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-zinc-500">
        Something went wrong while checking the site. Try again in a moment.
      </p>
      <Button type="button" size="lg" className="mt-8 px-5" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  );
}
