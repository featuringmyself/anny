"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type AiCrawlabilityLookupCaptureProps = {
  domain: string;
  success: boolean;
  score?: number;
  allowedCount?: number;
  blockedCount?: number;
  robotsPresent?: boolean;
  sitemapPresent?: boolean;
  llmsPresent?: boolean;
  actionCount?: number;
  band?: string;
  errorType?: "invalid_domain" | "lookup_failed";
};

export function AiCrawlabilityLookupCapture({
  domain,
  success,
  score,
  allowedCount,
  blockedCount,
  robotsPresent,
  sitemapPresent,
  llmsPresent,
  actionCount,
  band,
  errorType,
}: AiCrawlabilityLookupCaptureProps) {
  useEffect(() => {
    const key = `ph:crawl:${domain}:${success}:${score ?? errorType ?? ""}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode, still capture.
    }

    posthog.capture(
      success ? "ai_crawlability_checked" : "ai_crawlability_check_failed",
      {
        domain,
        source: "tool_page",
        ...(success
          ? {
              crawlability_score: score,
              allowed_count: allowedCount,
              blocked_count: blockedCount,
              robots_present: robotsPresent,
              sitemap_present: sitemapPresent,
              llms_present: llmsPresent,
              action_count: actionCount,
              band,
            }
          : { error_type: errorType }),
      },
    );
  }, [
    actionCount,
    allowedCount,
    band,
    blockedCount,
    domain,
    errorType,
    llmsPresent,
    robotsPresent,
    score,
    sitemapPresent,
    success,
  ]);

  return null;
}
