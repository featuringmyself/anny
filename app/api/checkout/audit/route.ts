import { NextResponse } from "next/server";
import { z } from "zod";

import { createAuditCheckoutSession } from "@/lib/dodo/audit-checkout";
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

function isAllowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) {
    // Same-origin navigations / some browsers omit Origin on POST from same site.
    const referer = request.headers.get("referer");
    if (!referer) return true;
    try {
      return new URL(referer).origin === new URL(SITE_URL).origin;
    } catch {
      return false;
    }
  }

  try {
    const allowed = new Set([
      new URL(SITE_URL).origin,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ]);
    if (process.env.VERCEL_URL) {
      allowed.add(`https://${process.env.VERCEL_URL}`);
    }
    return allowed.has(new URL(origin).origin);
  } catch {
    return false;
  }
}

function dodoPermissionHint(message: string): string | null {
  if (message.includes("checkout_sessions:write")) {
    return "Dodo API key is missing checkout_sessions:write. Create an Editor key in Developer → API Keys.";
  }
  if (message.includes("products:write")) {
    return "Dodo API key is missing products:write.";
  }
  if (message.includes("403")) {
    return "Dodo API key was rejected (403). Check scopes and environment (test_mode vs live_mode).";
  }
  return null;
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

  if (!isAuditCheckoutConfigured()) {
    return NextResponse.json(
      {
        error:
          "Checkout is not configured. Set DODO_PAYMENTS_API_KEY and both Audit product IDs (run scripts/setup-dodo-audit-products.mjs).",
      },
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
    return NextResponse.json(
      { error: "Invalid request.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const session = await createAuditCheckoutSession(parsed.data);

    if (!session.checkout_url) {
      console.error("[checkout/audit] session missing checkout_url", {
        sessionId: session.session_id,
      });
      return NextResponse.json(
        { error: "Checkout session did not return a URL." },
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

    const hint = dodoPermissionHint(message);
    return NextResponse.json(
      {
        error: hint ?? "Could not start checkout. Try again in a moment.",
      },
      { status: hint ? 503 : 502 },
    );
  }
}
