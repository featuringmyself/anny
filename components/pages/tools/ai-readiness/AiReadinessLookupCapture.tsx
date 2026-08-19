"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type AiReadinessLookupCaptureProps = {
  domain: string;
  success: boolean;
  score?: number;
  passed?: number;
  warned?: number;
  failed?: number;
  band?: string;
  errorType?: "invalid_domain" | "lookup_failed";
};

export function AiReadinessLookupCapture({
  domain,
  success,
  score,
  passed,
  warned,
  failed,
  band,
  errorType,
}: AiReadinessLookupCaptureProps) {
  useEffect(() => {
    const key = `ph:ar:${domain}:${success}:${score ?? errorType ?? ""}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode — still capture.
    }

    posthog.capture(
      success ? "ai_readiness_checked" : "ai_readiness_check_failed",
      {
        domain,
        source: "tool_page",
        ...(success
          ? {
              readiness_score: score,
              passed,
              warned,
              failed,
              band,
            }
          : { error_type: errorType }),
      },
    );
  }, [band, domain, errorType, failed, passed, score, success, warned]);

  return null;
}
