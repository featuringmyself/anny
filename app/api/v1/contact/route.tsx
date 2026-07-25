import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_LIMITS = {
  name: 120,
  email: 200,
  company: 120,
  website: 300,
  message: 2000,
  source: 60,
} as const;

function readField(
  body: Record<string, unknown>,
  field: keyof typeof FIELD_LIMITS,
) {
  const value = body[field];
  return typeof value === "string"
    ? value.trim().slice(0, FIELD_LIMITS[field])
    : "";
}

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

  const fields = body as Record<string, unknown>;
  const lead = {
    name: readField(fields, "name"),
    email: readField(fields, "email"),
    company: readField(fields, "company"),
    website: readField(fields, "website"),
    message: readField(fields, "message"),
    source: readField(fields, "source"),
  };

  if (!lead.name || !lead.company) {
    return NextResponse.json(
      { error: "Name and company are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(lead.email)) {
    return NextResponse.json(
      { error: "Enter a valid work email." },
      { status: 400 },
    );
  }

  // TODO: forward to the CRM / notify sales instead of only logging.
  console.log("[contact] sales lead", lead);

  return NextResponse.json({ message: "Thanks — we'll be in touch." });
}
