import { NextResponse } from "next/server";
import { z } from "zod";

import { createAuditCheckoutSession } from "@/lib/dodo/audit-checkout";
import {
  allowAuditCheckoutRequest,
  clientIpFromRequest,
} from "@/lib/dodo/checkout-rate-limit";
import { isAuditCheckoutConfigured } from "@/lib/dodo/config";
import { SITE_URL } from "@/lib/site";

const bodySchema = z.object({
  market: z.enum(["india", "international"]),
  source: z
    .string()
    .trim()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9][a-z0-9._-]{0,119}$/i, "Invalid source"),
});

function allowedOrigins(): Set<string> {
  const allowed = new Set([
    new URL(SITE_URL).origin,
    "http://localhost:3000",
    "http://127.0.0.1:3000",
  ]);
  if (process.env.VERCEL_URL) {
    allowed.add(`https://${process.env.VERCEL_URL}`);
  }
  return allowed;
}

function originFromHeader(value: string | null): string | null {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
}

/**
 * Require Origin or Referer and match an allowlist.
 * Rejects anonymous POSTs (no Origin and no Referer) used for session spam.
 */
function isAllowedOrigin(request: Request): boolean {
  const allowed = allowedOrigins();
  const origin = originFromHeader(request.headers.get("origin"));
  if (origin) return allowed.has(origin);

  const refererOrigin = originFromHeader(request.headers.get("referer"));
  if (refererOrigin) return allowed.has(refererOrigin);

  return false;
}

/**
 * POST /api/checkout/audit
 * Creates a Dodo checkout session for the selected Audit market.
 * Product IDs stay server-side — the client only sends market + source.
 */
export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const ip = clientIpFromRequest(request);
  if (!allowAuditCheckoutRequest(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a moment." },
      { status: 429 },
    );
  }

  if (!isAuditCheckoutConfigured()) {
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable." },
      { status: 503 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    const session = await createAuditCheckoutSession(parsed.data);

    if (!session.checkout_url) {
      console.error("[checkout/audit] session missing checkout_url", {
        sessionId: session.session_id,
      });
      return NextResponse.json(
        { error: "Could not start checkout. Try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({
      checkout_url: session.checkout_url,
      session_id: session.session_id,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("[checkout/audit] failed to create session:", message, error);
    return NextResponse.json(
      { error: "Could not start checkout. Try again in a moment." },
      { status: 502 },
    );
  }
}
