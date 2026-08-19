"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type SerpOverviewLookupCaptureProps = {
  keyword: string;
  country: string;
  success: boolean;
  positionCount?: number;
  organicCount?: number;
  paidCount?: number;
  featureCount?: number;
  errorType?: "invalid_keyword" | "lookup_failed";
};

export function SerpOverviewLookupCapture({
  keyword,
  country,
  success,
  positionCount,
  organicCount,
  paidCount,
  featureCount,
  errorType,
}: SerpOverviewLookupCaptureProps) {
  useEffect(() => {
    const key = `ph:serp:${keyword}:${country}:${success}:${positionCount ?? errorType ?? ""}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode — still capture.
    }

    posthog.capture(
      success ? "serp_overview_checked" : "serp_overview_check_failed",
      {
        keyword,
        country,
        source: "tool_page",
        ...(success
          ? {
              position_count: positionCount,
              organic_count: organicCount,
              paid_count: paidCount,
              feature_count: featureCount,
            }
          : { error_type: errorType }),
      },
    );
  }, [
    country,
    errorType,
    featureCount,
    keyword,
    organicCount,
    paidCount,
    positionCount,
    success,
  ]);

  return null;
}
