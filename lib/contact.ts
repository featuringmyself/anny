import * as z from "zod";

import type { NewSalesLead } from "@/lib/sales-leads";
import { insertSalesLead } from "@/lib/sales-leads";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .transform((value) => value || undefined)
    .optional();

export const contactSchema = z.object({
  name: z
    .string({ error: "Enter your full name." })
    .trim()
    .min(1, "Enter your full name.")
    .max(120),
  email: z
    .string({ error: "Enter a valid work email." })
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid work email."))
    .check(z.maxLength(200)),
  company: z
    .string({ error: "Enter your company." })
    .trim()
    .min(1, "Enter your company.")
    .max(120),
  website: optionalText(300),
  message: optionalText(2000),
  source: z
    .string()
    .trim()
    .max(60)
    .transform((value) => value || "unknown")
    .optional()
    .default("unknown"),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Per-field messages keyed by form field name, for inline display. */
export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string[]>
>;

export type ContactValidation =
  | { ok: true; data: ContactInput }
  | { ok: false; error: string; fieldErrors: ContactFieldErrors };

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

  if (result.success) {
    return { ok: true, data: result.data };
  }

  const { fieldErrors, formErrors } = z.flattenError(result.error);

  return {
    ok: false,
    error:
      Object.values(fieldErrors).flat()[0] ??
      formErrors[0] ??
      "Please check the form and try again.",
    fieldErrors: fieldErrors as ContactFieldErrors,
  };
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

  const id = await insertSalesLead(document);
  return { id: id.toHexString() };
}
