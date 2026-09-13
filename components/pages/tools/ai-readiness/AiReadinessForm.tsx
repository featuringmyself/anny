"use client";

import Form from "next/form";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import posthog from "posthog-js";

import { aiReadinessAccentButtonClass } from "@/components/pages/tools/ai-readiness/button-classes";
import { AI_READINESS_PATH } from "@/components/pages/tools/ai-readiness/seo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseDomainParam } from "@/lib/domain-input";
import { cn } from "@/lib/utils";

const EXAMPLE_DOMAINS = ["openai.com", "anthropic.com", "nytimes.com"] as const;

export function AiReadinessForm({
  defaultDomain,
}: {
  defaultDomain: string;
}) {
  return (
    <Form
      action={AI_READINESS_PATH}
      scroll={false}
      className="mt-8 w-full max-w-xl"
      onSubmit={(event) => {
        const raw = new FormData(event.currentTarget).get("domain");
        const domain = parseDomainParam(
          typeof raw === "string" ? raw : undefined,
        );
        if (!domain) return;
        posthog.capture("ai_readiness_check_submitted", { domain });
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
          className="h-12 flex-1 border-zinc-200 bg-white px-4 text-base shadow-none"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          required
        />
        <ScanButton />
      </div>
      <p className="mt-3 text-sm text-zinc-500">
        Free for any domain. No sign-up required.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-xs text-zinc-400">Try</span>
        {EXAMPLE_DOMAINS.map((domain) => (
          <Link
            key={domain}
            href={`${AI_READINESS_PATH}?domain=${encodeURIComponent(domain)}`}
            className="text-xs font-medium text-zinc-600 underline-offset-4 transition-colors hover:text-[#2462ff] hover:underline"
            onClick={() =>
              posthog.capture("ai_readiness_example_clicked", { domain })
            }
          >
            {domain}
          </Link>
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
      className={cn(
        "h-12 shrink-0 px-6 text-white",
        aiReadinessAccentButtonClass,
      )}
    >
      {pending ? "Scanning…" : "Check AI readiness"}
    </Button>
  );
}
