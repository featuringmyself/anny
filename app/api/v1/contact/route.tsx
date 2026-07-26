import { NextResponse } from "next/server";

import {
  createSalesLeadFromInput,
  validateContactInput,
} from "@/lib/contact";
import { getPostHogClient } from "@/lib/posthog-server";

/**
 * JSON endpoint for the contact / sales form.
 * Prefer the `submitContact` Server Action from the UI; this route exists for
 * same-origin programmatic clients and keeps validation + persistence shared.
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json(
      { error: "Expected a JSON body." },
      { status: 400 },
    );
  }

  const validated = validateContactInput(body as Record<string, unknown>);

  if (!validated.ok) {
    return NextResponse.json({ error: validated.error }, { status: 400 });
  }

  try {
    await createSalesLeadFromInput(validated.data);

    const posthog = getPostHogClient();
    posthog.capture({
      distinctId: validated.data.email,
      event: "contact_api_submitted",
      properties: {
        source: validated.data.source,
        company: validated.data.company,
        has_website: Boolean(validated.data.website),
        has_message: Boolean(validated.data.message),
      },
    });
    posthog.identify({
      distinctId: validated.data.email,
      properties: {
        email: validated.data.email,
        name: validated.data.name,
        company: validated.data.company,
      },
    });
    await posthog.flush();

    return NextResponse.json({ message: "Thanks — we'll be in touch." });
  } catch (error) {
    console.error("[contact] failed to save sales lead", error);
    return NextResponse.json(
      { error: "We couldn't send that. Please try again." },
      { status: 500 },
    );
  }
}
