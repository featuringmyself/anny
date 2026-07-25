"use server";

import type { ContactFieldErrors } from "@/lib/contact";
import {
  createSalesLeadFromInput,
  validateContactInput,
} from "@/lib/contact";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
  fieldErrors?: ContactFieldErrors;
};

/**
 * Persists a sales lead from the Talk to sales form.
 * Pair with `useActionState` in the client form.
 */
export async function submitContact(
  _prev: ContactActionState,
  formData: FormData,
): Promise<ContactActionState> {
  const validated = validateContactInput(Object.fromEntries(formData));

  if (!validated.ok) {
    return {
      status: "error",
      message: validated.error,
      fieldErrors: validated.fieldErrors,
    };
  }

  try {
    await createSalesLeadFromInput(validated.data);
    return { status: "success", message: "Thanks — we'll be in touch." };
  } catch (error) {
    const cause = error instanceof Error ? error.message : String(error);
    console.error("[contact] failed to save sales lead:", cause, error);

    return {
      status: "error",
      // Surface the real cause while developing; stay vague in production.
      message:
        process.env.NODE_ENV === "production"
          ? "We couldn't send that. Please try again."
          : `Couldn't save your details: ${cause}`,
    };
  }
}
