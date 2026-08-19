import { NextRequest } from "next/server";

import { captureSerpOverviewLookup } from "@/lib/serp-overview-analytics";
import { getSerpOverview } from "@/lib/serp-overview";
import { parseCountryParam, parseKeywordParam } from "@/lib/serp-input";
import {
  readAnonymousDistinctIdFromHeaders,
  readPostHogSessionId,
} from "@/lib/posthog-identity";

export async function GET(request: NextRequest) {
  const keyword = parseKeywordParam(
    request.nextUrl.searchParams.get("keyword") ?? undefined,
  );
  const country = parseCountryParam(
    request.nextUrl.searchParams.get("country") ?? undefined,
  );
  const distinctId = readAnonymousDistinctIdFromHeaders(request.headers);
  const sessionId = readPostHogSessionId(request.headers);

  if (!keyword) {
    return Response.json({ error: "Keyword is required" }, { status: 400 });
  }

  try {
    const result = await getSerpOverview(keyword, country);

    try {
      await captureSerpOverviewLookup({
        distinctId,
        sessionId,
        keyword,
        country,
        result,
        source: "api",
      });
    } catch {
      // Never let PostHog errors fail the lookup
    }

    if ("error" in result) {
      return Response.json({ error: result.error }, { status: 400 });
    }

    return Response.json(result);
  } catch {
    return Response.json(
      { error: "Failed to load SERP overview" },
      { status: 500 },
    );
  }
}
