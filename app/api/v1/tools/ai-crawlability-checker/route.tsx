import { after, type NextRequest, NextResponse } from "next/server";

import { captureAiCrawlabilityLookup } from "@/lib/ai-crawlability-analytics";
import { getAiCrawlability, parseDomainParam } from "@/lib/ai-crawlability";
import {
  readAnonymousDistinctIdFromHeaders,
  readPostHogSessionId,
} from "@/lib/posthog-identity";

export const maxDuration = 30;

export async function GET(request: NextRequest) {
  const domain = parseDomainParam(
    request.nextUrl.searchParams.get("domain") ?? undefined,
  );
  const distinctId = readAnonymousDistinctIdFromHeaders(request.headers);
  const sessionId = readPostHogSessionId(request.headers);

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const result = await getAiCrawlability(domain);

  after(async () => {
    try {
      await captureAiCrawlabilityLookup({
        distinctId,
        sessionId,
        domain,
        result,
        source: "api",
      });
    } catch {
      // Never let PostHog errors fail the lookup
    }
  });

  if ("error" in result) {
    const status =
      result.error === "Domain is required" ||
      result.error === "Enter a domain." ||
      result.error === "Enter a valid domain." ||
      result.error === "Enter a public website."
        ? 400
        : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ crawlability: result });
}
