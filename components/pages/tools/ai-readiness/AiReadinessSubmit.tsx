"use client";

import { useFormStatus } from "react-dom";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { parseDomainParam } from "@/lib/domain-input";

export function AiReadinessSubmit() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size="lg"
      className="mt-5 px-5"
      disabled={pending}
      onClick={(event) => {
        const form = event.currentTarget.form;
        if (!form) return;
        const raw = new FormData(form).get("domain");
        const domain = parseDomainParam(
          typeof raw === "string" ? raw : undefined,
        );
        if (!domain) return;
        posthog.capture("ai_readiness_check_submitted", { domain });
      }}
    >
      {pending ? "Scanning…" : "Check AI readiness"}
    </Button>
  );
}
