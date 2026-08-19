import { NextRequest, NextResponse } from "next/server";

import {
  getSerpOverview,
  parseCountryParam,
  parseKeywordParam,
} from "@/lib/serp-overview";

export async function GET(request: NextRequest) {
  const keyword = parseKeywordParam(
    request.nextUrl.searchParams.get("keyword") ?? undefined,
  );
  const country = parseCountryParam(
    request.nextUrl.searchParams.get("country") ?? undefined,
  );

  if (!keyword) {
    return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
  }

  const result = await getSerpOverview(keyword, country);

  if ("error" in result) {
    const status = result.error.startsWith("Failed") ? 500 : 400;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json(result);
}
