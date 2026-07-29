import * as z from "zod";

import { upsertSignup } from "@/lib/signups";

const PLANS = ["Starter", "Pro", "Advanced"] as const;

export const registerSchema = z.object({
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
  plan: z
    .string()
    .trim()
    .optional()
    .transform((value) =>
      value && (PLANS as readonly string[]).includes(value) ? value : undefined,
    ),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export type RegisterFieldErrors = Partial<
  Record<keyof RegisterInput, string[]>
>;

export type RegisterValidation =
  | { ok: true; data: RegisterInput }
  | { ok: false; error: string; fieldErrors: RegisterFieldErrors };

function asStringFields(fields: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

/**
 * Shared server-side validation for `/register` submissions.
 * Call from Server Actions — never trust the client alone.
 */
export function validateRegisterInput(
  fields: Record<string, FormDataEntryValue | unknown>,
): RegisterValidation {
  const result = registerSchema.safeParse(asStringFields(fields));

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
    fieldErrors: fieldErrors as RegisterFieldErrors,
  };
}

export async function createSignupFromInput(data: RegisterInput) {
  const id = await upsertSignup({
    email: data.email,
    company: data.company,
    plan: data.plan,
  });
  return { id };
}
