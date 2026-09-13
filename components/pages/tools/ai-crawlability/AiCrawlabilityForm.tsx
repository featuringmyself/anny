"use client";

import Form from "next/form";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import posthog from "posthog-js";

import { EXAMPLE_DOMAINS } from "@/components/pages/tools/ai-crawlability/bots";
import { AI_CRAWL_PATH } from "@/components/pages/tools/ai-crawlability/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseDomainParam } from "@/lib/domain-input";

export function AiCrawlabilityForm({
  defaultDomain,
}: {
  defaultDomain: string;
}) {
  return (
    <Form
      action=""
      scroll={false}
      className="w-full max-w-xl"
      onSubmit={(event) => {
        const raw = new FormData(event.currentTarget).get("domain");
        const domain = parseDomainParam(
          typeof raw === "string" ? raw : undefined,
        );
        if (!domain) return;
        posthog.capture("ai_crawlability_check_submitted", { domain });
      }}
    >
      <Label htmlFor="domain" className="text-sm text-zinc-600">
        Website
      </Label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-stretch">
        <Input
          key={defaultDomain}
          id="domain"
          type="text"
          name="domain"
          placeholder="example.com"
          defaultValue={defaultDomain}
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          required
          className="h-12 flex-1 border-zinc-200 bg-white px-4 text-base shadow-none"
        />
        <ScanButton />
      </div>
      <p className="mt-3 text-sm text-zinc-500">
        Free for any public domain. No account required.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-1 gap-y-2 text-sm text-zinc-500">
        <span>Examples:</span>
        {EXAMPLE_DOMAINS.map((domain, index) => (
          <span key={domain} className="inline-flex items-center">
            {index > 0 ? <span className="mx-1 text-zinc-300">·</span> : null}
            <Link
              href={`${AI_CRAWL_PATH}?domain=${encodeURIComponent(domain)}`}
              className="text-zinc-700 underline-offset-4 hover:text-[#2462ff] hover:underline"
              onClick={() =>
                posthog.capture("ai_crawlability_example_clicked", { domain })
              }
            >
              {domain}
            </Link>
          </span>
        ))}
      </div>
    </Form>
  );
}

function ScanButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      disabled={pending}
      className="h-12 shrink-0 bg-[#2462ff] px-6 text-white hover:bg-[#2462ff]/90"
    >
      {pending ? "Checking…" : "Check crawlability"}
    </Button>
  );
}
