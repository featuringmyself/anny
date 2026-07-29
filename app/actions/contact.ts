"use server";

import type { ContactFieldErrors } from "@/lib/contact";
import {
  createSalesLeadFromInput,
  validateContactInput,
} from "@/lib/contact";
import { getPostHogClient } from "@/lib/posthog-server";

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
    const lead = await createSalesLeadFromInput(validated.data);

    const posthog = getPostHogClient();
    if (posthog) {
      posthog.identify({
        distinctId: lead.id,
        properties: {
          email: validated.data.email,
          name: validated.data.name,
          company: validated.data.company,
        },
      });
      posthog.capture({
        distinctId: lead.id,
        event: "sales_demo_requested",
        properties: {
          source: validated.data.source,
          has_website: Boolean(validated.data.website),
          has_message: Boolean(validated.data.message),
        },
      });
      await posthog.flush();
    }

    return { status: "success", message: "Thanks — we'll be in touch." };
  } catch (error) {
    const cause = error instanceof Error ? error.message : String(error);
    console.error("[contact] failed to save sales lead:", cause, error);

    try {
      const posthog = getPostHogClient();
      if (posthog) {
        posthog.capture({
          event: "contact_submission_failed",
          properties: {
            source: validated.data.source,
            error_type: error instanceof Error ? error.name : "UnknownError",
          },
        });
        await posthog.flush();
      }
    } catch {
      // Never let PostHog errors surface to the user
    }

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
