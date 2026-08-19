"use client";

import { ChevronDown } from "lucide-react";
import Form from "next/form";
import { useFormStatus } from "react-dom";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  parseCountryParam,
  parseKeywordParam,
  SERP_CHECKER_PATH,
  SERP_COUNTRIES,
  type SerpCountryCode,
} from "@/lib/serp-input";

export function SerpOverviewForm({
  defaultKeyword,
  defaultCountry,
}: {
  defaultKeyword: string;
  defaultCountry: SerpCountryCode;
}) {
  return (
    <Form
      action={SERP_CHECKER_PATH}
      scroll={false}
      className="mt-10"
      onSubmit={(event) => {
        const data = new FormData(event.currentTarget);
        const keyword = parseKeywordParam(
          typeof data.get("keyword") === "string"
            ? (data.get("keyword") as string)
            : undefined,
        );
        const country = parseCountryParam(
          typeof data.get("country") === "string"
            ? (data.get("country") as string)
            : undefined,
        );
        if (!keyword) return;
        posthog.capture("serp_overview_check_submitted", { keyword, country });
      }}
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
        <div className="min-w-0 flex-1">
          <Label htmlFor="keyword" className="text-zinc-600">
            Keyword
          </Label>
          <Input
            key={defaultKeyword}
            id="keyword"
            type="text"
            name="keyword"
            placeholder="best project management software"
            defaultValue={defaultKeyword}
            className="mt-2 h-12 bg-white px-3 text-base"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
            required
          />
        </div>
        <div className="w-full lg:w-56">
          <Label htmlFor="country" className="text-zinc-600">
            Country
          </Label>
          <div className="relative mt-2">
            <select
              key={defaultCountry}
              id="country"
              name="country"
              defaultValue={defaultCountry}
              className="h-12 w-full appearance-none rounded-md border border-input bg-white px-3 pr-10 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {SERP_COUNTRIES.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.label}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden
              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-zinc-400"
            />
          </div>
        </div>
        <CheckSerpButton />
      </div>
    </Form>
  );
}

function CheckSerpButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="h-12 px-6 lg:mb-px"
      disabled={pending}
    >
      {pending ? "Checking…" : "Show SERP"}
    </Button>
  );
}
