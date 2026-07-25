"use server";

import {
  createSalesLeadFromInput,
  validateContactInput,
} from "@/lib/contact";

export type ContactActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
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
    return { status: "error", message: validated.error };
  }

  try {
    await createSalesLeadFromInput(validated.data);
    return {
      status: "success",
      message: "Thanks — we'll be in touch.",
    };
  } catch (error) {
    console.error("[contact] failed to save sales lead", error);
    return {
      status: "error",
      message: "We couldn't send that. Please try again.",
    };
  }
}
