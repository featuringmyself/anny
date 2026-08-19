import { NextRequest, NextResponse } from "next/server";

import { getDomainRating } from "@/lib/domain-rating";

export async function GET(request: NextRequest) {
  const domain = request.nextUrl.searchParams.get("domain");

  if (!domain) {
    return NextResponse.json({ error: "Domain is required" }, { status: 400 });
  }

  const result = await getDomainRating(domain);

  if ("error" in result) {
    const status = result.error === "Domain is required" ? 400 : 500;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ domain_rating: result });
}
