import * as z from "zod";

import type { NewSalesLead } from "@/lib/sales-leads";
import { insertSalesLead } from "@/lib/sales-leads";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value || undefined);

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name and company are required.")
    .max(120),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid work email."))
    .check(z.maxLength(200)),
  company: z
    .string()
    .trim()
    .min(1, "Name and company are required.")
    .max(120),
  website: optionalText(300).optional(),
  message: optionalText(2000).optional(),
  source: z
    .string()
    .trim()
    .max(60)
    .transform((value) => value || "unknown")
    .optional()
    .default("unknown"),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; error: string };

function asStringFields(fields: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

/**
 * Shared server-side validation for contact / sales-lead submissions.
 * Call from Server Actions and Route Handlers — never trust the client alone.
 */
export function validateContactInput(
  fields: Record<string, FormDataEntryValue | unknown>,
): ContactValidation {
  const result = contactSchema.safeParse(asStringFields(fields));

  if (!result.success) {
    return {
      ok: false,
      error: result.error.issues[0]?.message ?? "Invalid submission.",
    };
  }

  return { ok: true, data: result.data };
}

export async function createSalesLeadFromInput(data: ContactInput) {
  const document: NewSalesLead = {
    name: data.name,
    email: data.email,
    company: data.company,
    source: data.source,
    status: "new",
    createdAt: new Date(),
  };

  if (data.website) document.website = data.website;
  if (data.message) document.message = data.message;

  return insertSalesLead(document);
}
