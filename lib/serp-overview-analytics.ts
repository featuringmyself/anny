import "server-only";

import type { SerpOverview } from "@/lib/serp-overview";
import { positionsInGroup } from "@/lib/serp-overview";
import { getPostHogClient } from "@/lib/posthog-server";

type LookupResult = SerpOverview | { error: string };

export async function captureSerpOverviewLookup({
  distinctId,
  sessionId,
  keyword,
  country,
  result,
  source,
}: {
  distinctId?: string;
  sessionId?: string;
  keyword: string;
  country: string;
  result: LookupResult;
  source: "tool_page" | "api";
}) {
  if (!distinctId) return;

  const posthog = getPostHogClient();
  if (!posthog) return;

  const success = !("error" in result);

  posthog.capture({
    distinctId,
    event: success ? "serp_overview_checked" : "serp_overview_check_failed",
    properties: {
      keyword,
      country,
      source,
      ...(sessionId ? { $session_id: sessionId } : {}),
      ...(success
        ? {
            position_count: result.positions.length,
            organic_count: positionsInGroup(result.positions, "organic").length,
            paid_count: positionsInGroup(result.positions, "paid").length,
            feature_count: positionsInGroup(result.positions, "features").length,
          }
        : {
            error_type:
              result.error === "Enter a keyword." ||
              result.error === "Keep the keyword under 200 characters." ||
              result.error === "Pick a supported country." ||
              result.error === "Keyword is required"
                ? "invalid_keyword"
                : "lookup_failed",
          }),
    },
  });

  await posthog.flush();
}
