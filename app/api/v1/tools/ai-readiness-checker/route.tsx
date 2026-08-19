import { NextRequest, NextResponse } from "next/server";

import { captureAiReadinessLookup } from "@/lib/ai-readiness-analytics";
import { getAiReadiness, parseDomainParam } from "@/lib/ai-readiness";
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

  const result = await getAiReadiness(domain);

  try {
    await captureAiReadinessLookup({
      distinctId,
      sessionId,
      domain,
      result,
      source: "api",
    });
  } catch {
    // Never let PostHog errors fail the scan
  }

  if ("error" in result) {
    const status =
      result.error === "Domain is required" ||
      result.error === "Enter a domain." ||
      result.error === "Enter a valid domain." ||
      result.error === "Enter a public website."
        ? 400
        : 502;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ readiness: result });
}
