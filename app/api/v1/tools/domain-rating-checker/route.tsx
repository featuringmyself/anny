import { NextRequest, NextResponse } from "next/server";

import { captureDomainRatingLookup } from "@/lib/domain-rating-analytics";
import { getDomainRating, parseDomainParam } from "@/lib/domain-rating";
import {
  readAnonymousDistinctIdFromHeaders,
  readPostHogSessionId,
} from "@/lib/posthog-identity";

export async function GET(request: NextRequest) {
  const domain = parseDomainParam(
    request.nextUrl.searchParams.get("domain") ?? undefined,
  );
  const distinctId = readAnonymousDistinctIdFromHeaders(request.headers);
  const sessionId = readPostHogSessionId(request.headers);

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const result = await getDomainRating(domain);

  try {
    await captureDomainRatingLookup({
      distinctId,
      sessionId,
      domain,
      result,
      source: "api",
    });
  } catch {
    // Never let PostHog errors fail the lookup
  }

  if ("error" in result) {
    const status =
      result.error === "Domain is required" ||
      result.error === "Enter a domain." ||
      result.error === "Enter a valid domain."
        ? 400
        : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ domain_rating: result });
}
