"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

type DomainRatingLookupCaptureProps = {
  domain: string;
  success: boolean;
  domainRating?: number;
  hasAhrefsRank?: boolean;
  band?: string;
  errorType?: "invalid_domain" | "lookup_failed";
};

export function DomainRatingLookupCapture({
  domain,
  success,
  domainRating,
  hasAhrefsRank,
  band,
  errorType,
}: DomainRatingLookupCaptureProps) {
  useEffect(() => {
    const key = `ph:dr:${domain}:${success}:${domainRating ?? errorType ?? ""}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, "1");
    } catch {
      // Private mode — still capture.
    }

    posthog.capture(
      success ? "domain_rating_checked" : "domain_rating_check_failed",
      {
        domain,
        source: "tool_page",
        ...(success
          ? {
              domain_rating: domainRating,
              has_ahrefs_rank: hasAhrefsRank,
              band,
            }
          : { error_type: errorType }),
      },
    );
  }, [band, domain, domainRating, errorType, hasAhrefsRank, success]);

  return null;
}
