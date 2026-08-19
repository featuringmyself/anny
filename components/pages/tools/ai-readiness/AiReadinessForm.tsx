"use client";

import Form from "next/form";
import { useFormStatus } from "react-dom";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { parseDomainParam } from "@/lib/domain-input";

export function AiReadinessForm({
  defaultDomain,
}: {
  defaultDomain: string;
}) {
  return (
    <Form
      action=""
      scroll={false}
      className="mt-10 max-w-md"
      onSubmit={(event) => {
        const raw = new FormData(event.currentTarget).get("domain");
        const domain = parseDomainParam(
          typeof raw === "string" ? raw : undefined,
        );
        if (!domain) return;
        posthog.capture("ai_readiness_check_submitted", { domain });
      }}
    >
      <Label htmlFor="domain" className="text-zinc-600">
        Domain
      </Label>
      <Input
        key={defaultDomain}
        id="domain"
        type="text"
        name="domain"
        placeholder="example.com"
        defaultValue={defaultDomain}
        className="mt-2 h-11 bg-white px-3"
        autoComplete="off"
        autoCapitalize="off"
        spellCheck="false"
        required
      />
      <CheckButton />
    </Form>
  );
}

function CheckButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="mt-5 px-5" disabled={pending}>
      {pending ? "Scanning…" : "Check AI readiness"}
    </Button>
  );
}
