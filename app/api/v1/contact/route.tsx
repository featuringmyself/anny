import { NextResponse } from "next/server";

import {
  createSalesLeadFromInput,
  validateContactInput,
} from "@/lib/contact";

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
    return NextResponse.json({ message: "Thanks — we'll be in touch." });
  } catch (error) {
    console.error("[contact] failed to save sales lead", error);
    return NextResponse.json(
      { error: "We couldn't send that. Please try again." },
      { status: 500 },
    );
  }
}
