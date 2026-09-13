import "server-only";

import { bandForScore } from "@/components/pages/tools/ai-crawlability/bands";
import type { AiCrawlabilityReport } from "@/lib/ai-crawlability";
import { getPostHogClient } from "@/lib/posthog-server";

type LookupResult = AiCrawlabilityReport | { error: string };

export async function captureAiCrawlabilityLookup({
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
    event: success
      ? "ai_crawlability_checked"
      : "ai_crawlability_check_failed",
    properties: {
      domain,
      source,
      ...(sessionId ? { $session_id: sessionId } : {}),
      ...(success
        ? {
            crawlability_score: result.score,
            allowed_count: result.allowedCount,
            blocked_count: result.blockedCount,
            robots_present: result.robotsPresent,
            sitemap_present: result.sitemapPresent,
            llms_present: result.llmsPresent,
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
    },
  });

  await posthog.flush();
}
