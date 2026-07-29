"use server";

import type { RegisterFieldErrors } from "@/lib/register";
import {
  createSignupFromInput,
  validateRegisterInput,
} from "@/lib/register";
import { getPostHogClient } from "@/lib/posthog-server";

export type RegisterActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
  email?: string;
  fieldErrors?: RegisterFieldErrors;
};

/**
 * Persists a `/register` signup (email + company) to MongoDB.
 * Pair with `useActionState` in the client form.
 */
export async function submitRegister(
  _prev: RegisterActionState,
  formData: FormData,
): Promise<RegisterActionState> {
  const validated = validateRegisterInput(Object.fromEntries(formData));

  if (!validated.ok) {
    return {
      status: "error",
      message: validated.error,
      fieldErrors: validated.fieldErrors,
    };
  }

  try {
    const signup = await createSignupFromInput(validated.data);

    const posthog = getPostHogClient();
    if (posthog) {
      posthog.identify({
        distinctId: signup.id,
        properties: {
          email: validated.data.email,
          company: validated.data.company,
        },
      });
      posthog.capture({
        distinctId: signup.id,
        event: "register_submitted",
        properties: {
          plan: validated.data.plan ?? null,
        },
      });
      await posthog.flush();
    }

    return {
      status: "success",
      message: null,
      email: validated.data.email,
    };
  } catch (error) {
    const cause = error instanceof Error ? error.message : String(error);
    console.error("[register] failed to save signup:", cause, error);

    try {
      const posthog = getPostHogClient();
      if (posthog) {
        posthog.capture({
          event: "register_submission_failed",
          properties: {
            plan: validated.data.plan ?? null,
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
      message:
        process.env.NODE_ENV === "production"
          ? "We couldn't save that. Please try again."
          : `Couldn't save your details: ${cause}`,
    };
  }
}
