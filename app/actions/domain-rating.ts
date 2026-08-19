"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { captureDomainRatingLookup } from "@/lib/domain-rating-analytics";
import { getDomainRating, parseDomainParam } from "@/lib/domain-rating";
import {
  readAnonymousDistinctId,
  readAnonymousDistinctIdFromHeaders,
  readPostHogSessionId,
} from "@/lib/posthog-identity";

export async function checkDomainRating(formData: FormData) {
  const domain = parseDomainParam(
    typeof formData.get("domain") === "string"
      ? formData.get("domain")
      : undefined,
  );

  if (!domain) {
    redirect("/tools/domain-rating-checker");
  }

  const result = await getDomainRating(domain);
  const requestHeaders = await headers();
  const distinctId =
    readAnonymousDistinctId(formData) ??
    readAnonymousDistinctIdFromHeaders(requestHeaders);
  const sessionId = readPostHogSessionId(requestHeaders);

  after(async () => {
    try {
      await captureDomainRatingLookup({
        distinctId,
        sessionId,
        domain,
        result,
        source: "tool_page",
      });
    } catch {
      // Never let PostHog errors surface to the user
    }
  });

  redirect(
    `/tools/domain-rating-checker?domain=${encodeURIComponent(domain)}`,
  );
}
