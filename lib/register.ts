import "server-only";

import * as z from "zod";

import { isRegisterPlan } from "@/lib/plans";
import { upsertSignup } from "@/lib/signups";

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
      value && isRegisterPlan(value) ? value : undefined,
    ),
  /**
   * Honeypot — real users leave this empty. Bots that fill it get a fake
   * success without a DB write.
   */
  website: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export type RegisterFieldErrors = Partial<
  Record<"email" | "company" | "plan", string[]>
>;

export type RegisterValidation =
  | { ok: true; data: RegisterInput; isBot: boolean }
  | {
      ok: false;
      error: string;
      fieldErrors: RegisterFieldErrors;
      values: { email: string; company: string };
    };

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
  const strings = asStringFields(fields);
  const result = registerSchema.safeParse(strings);

  if (!result.success) {
    const { fieldErrors, formErrors } = z.flattenError(result.error);
    const { website: _honeypot, ...safeFieldErrors } = fieldErrors as Record<
      string,
      string[] | undefined
    > & { website?: string[] };

    return {
      ok: false,
      error:
        Object.values(safeFieldErrors).flat().filter(Boolean)[0] ??
        formErrors[0] ??
        "Please check the form and try again.",
      fieldErrors: safeFieldErrors as RegisterFieldErrors,
      values: {
        email: strings.email?.trim() ?? "",
        company: strings.company?.trim() ?? "",
      },
    };
  }

  return {
    ok: true,
    data: result.data,
    isBot: Boolean(result.data.website?.trim()),
  };
}

export async function createSignupFromInput(
  data: Pick<RegisterInput, "email" | "company" | "plan">,
) {
  const id = await upsertSignup({
    email: data.email,
    company: data.company,
    plan: data.plan,
  });
  return { id };
}
