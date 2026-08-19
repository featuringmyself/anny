import "server-only";

import { bandForScore } from "@/components/pages/tools/domain-rating/bands";
import type { DomainRating } from "@/lib/domain-rating";
import { getPostHogClient } from "@/lib/posthog-server";

type LookupResult = DomainRating | { error: string };

export async function captureDomainRatingLookup({
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
  if (!distinctId) return;

  const posthog = getPostHogClient();
  if (!posthog) return;

  const success = !("error" in result);

  posthog.capture({
    distinctId,
    event: success ? "domain_rating_checked" : "domain_rating_check_failed",
    properties: {
      domain,
      source,
      ...(sessionId ? { $session_id: sessionId } : {}),
      ...(success
        ? {
            domain_rating: result.domain_rating,
            has_ahrefs_rank: result.ahrefs_rank != null,
            band: bandForScore(result.domain_rating).label,
          }
        : {
            error_type:
              result.error === "Enter a domain." ||
              result.error === "Enter a valid domain." ||
              result.error === "Domain is required"
                ? "invalid_domain"
                : "lookup_failed",
          }),
    },
  });

  await posthog.flush();
}
