"use server";

import { after } from "next/server";

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
  values?: { email: string; company: string };
};

/**
 * Persists a `/register` signup (email + company) to MongoDB.
 * Pair with `useActionState` in the client form.
 *
 * Analytics run in `after()` so the user response is not blocked on PostHog.
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
      values: validated.values,
    };
  }

  // Honeypot filled — pretend success without writing.
  if (validated.isBot) {
    return {
      status: "success",
      message: null,
      email: validated.data.email,
    };
  }

  try {
    const signup = await createSignupFromInput(validated.data);
    const { email, company, plan } = validated.data;

    after(() => {
      try {
        const posthog = getPostHogClient();
        if (!posthog) return;

        posthog.identify({
          distinctId: signup.id,
          properties: { email, company },
        });
        posthog.capture({
          distinctId: signup.id,
          event: "register_submitted",
          properties: { plan: plan ?? null },
        });
        void posthog.flush();
      } catch (error) {
        console.error("[register] posthog failed", error);
      }
    });

    return {
      status: "success",
      message: null,
      email,
    };
  } catch (error) {
    const cause = error instanceof Error ? error.message : String(error);
    console.error("[register] failed to save signup:", cause, error);

    after(() => {
      try {
        const posthog = getPostHogClient();
        if (!posthog) return;

        posthog.capture({
          event: "register_submission_failed",
          properties: {
            plan: validated.data.plan ?? null,
            error_type: error instanceof Error ? error.name : "UnknownError",
          },
        });
        void posthog.flush();
      } catch {
        // Never let PostHog errors surface to the user
      }
    });

    return {
      status: "error",
      message:
        process.env.NODE_ENV === "production"
          ? "We couldn't save that. Please try again."
          : `Couldn't save your details: ${cause}`,
      values: {
        email: validated.data.email,
        company: validated.data.company,
      },
    };
  }
}
