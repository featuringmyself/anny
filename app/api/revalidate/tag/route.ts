import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { tags?: string[] };

/**
 * GROQ-powered Sanity webhook.
 * URL: https://www.dodoxhq.com/api/revalidate/tag
 * Filter: _type in ["post", "author", "category"]
 * Projection: { "tags": [_type, _type + ":" + slug.current] }
 * Secret: SANITY_REVALIDATE_SECRET, sent as the webhook secret.
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_REVALIDATE_SECRET;
    if (!secret) {
      return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      secret,
      true,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    if (!Array.isArray(body?.tags) || body.tags.length === 0) {
      return new Response("Missing tags", { status: 400 });
    }

    const tags = body.tags.filter(
      (tag): tag is string =>
        typeof tag === "string" && tag.length > 0 && tag.length <= 256,
    );
    if (tags.length !== body.tags.length) {
      return new Response("Invalid tags", { status: 400 });
    }

    for (const tag of tags) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({ revalidated: tags });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Revalidation failed";
    return new Response(message, { status: 500 });
  }
}
