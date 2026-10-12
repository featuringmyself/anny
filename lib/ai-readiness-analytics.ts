import "server-only";

import { randomUUID } from "crypto";

import { bandForScore } from "@/components/pages/tools/ai-readiness/bands";
import type { AiReadinessReport } from "@/lib/ai-readiness";
import { personlessProperties } from "@/lib/posthog-identity";
import { getPostHogClient } from "@/lib/posthog-server";

type LookupResult = AiReadinessReport | { error: string };

export async function captureAiReadinessLookup({
  distinctId,
  sessionId,
  domain,
  result,
  source,
}: {
  distinctId?: string;
  sessionId?: string;
  domain: string;
  result: LookupResult;
  source: "tool_page" | "api";
}) {
  const posthog = getPostHogClient();
  if (!posthog) return;

  const success = !("error" in result);
  const hasBrowserId = Boolean(distinctId);
  const id = distinctId ?? randomUUID();

  const eventProperties = {
    domain,
    source,
    ...(sessionId ? { $session_id: sessionId } : {}),
    ...(success
      ? {
          readiness_score: result.score,
          passed: result.passed,
          warned: result.warned,
          failed: result.failed,
          action_count: result.actions.length,
          band: bandForScore(result.score).label,
        }
      : {
          error_type:
            result.error === "Enter a domain." ||
            result.error === "Enter a valid domain." ||
            result.error === "Enter a public website."
              ? "invalid_domain"
              : "lookup_failed",
        }),
  };

  posthog.capture({
    distinctId: id,
    event: success ? "ai_readiness_checked" : "ai_readiness_check_failed",
    properties: hasBrowserId
      ? eventProperties
      : personlessProperties(eventProperties),
  });

  await posthog.flush();
}
