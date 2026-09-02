"use server";

import { cookies } from "next/headers";
import { after } from "next/server";
import { redirect } from "next/navigation";
import * as z from "zod";

import {
  AR_REPORT_COOKIE,
  AR_REPORT_COOKIE_MAX_AGE,
  createAiReadinessReport,
  formatReportAccessCookie,
  getAiReadinessReportById,
  unlockAiReadinessReport,
} from "@/lib/ai-readiness-reports";
import { domainInputSchema } from "@/lib/domain-input";
import {
  identifyProperties,
  personlessProperties,
  readAnonymousDistinctId,
} from "@/lib/posthog-identity";
import { getPostHogClient } from "@/lib/posthog-server";
import { upsertSignup } from "@/lib/signups";

const unlockSchema = z.object({
  reportId: z.string().trim().min(1),
  email: z
    .string({ error: "Enter a valid email." })
    .trim()
    .toLowerCase()
    .pipe(z.email("Enter a valid email."))
    .check(z.maxLength(200)),
  website: z.string().optional(),
});

export type UnlockReportFieldErrors = Partial<Record<"email", string[]>>;

export type UnlockReportActionState = {
  status: "idle" | "success" | "error";
  message: string | null;
  fieldErrors?: UnlockReportFieldErrors;
  values?: { email: string };
};

function asStringFields(fields: Record<string, unknown>) {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === "string") out[key] = value;
  }
  return out;
}

function captureReportEvent(
  event: string,
  properties: Record<string, string | number | boolean | null | undefined>,
  distinctId?: string,
  anonymousDistinctId?: string,
) {
  after(async () => {
    try {
      const posthog = getPostHogClient();
      if (!posthog) return;

      posthog.capture({
        distinctId: distinctId ?? anonymousDistinctId ?? "anonymous",
        event,
        properties:
          distinctId || !anonymousDistinctId
            ? properties
            : personlessProperties(properties),
      });
      await posthog.flush();
    } catch (error) {
      console.error(`[ai-readiness-report] posthog ${event} failed`, error);
    }
  });
}

export async function createReport(formData: FormData) {
  const strings = asStringFields(Object.fromEntries(formData));
  const domainResult = domainInputSchema.safeParse(strings.domain ?? "");
  const scoreRaw = strings.score?.trim();
  const quickScore =
    scoreRaw && !Number.isNaN(Number(scoreRaw)) ? Number(scoreRaw) : undefined;
  const quickBand = strings.band?.trim() || undefined;
  const origin = strings.origin?.trim() || `https://${domainResult.success ? domainResult.data : ""}`;

  if (!domainResult.success) {
    redirect("/tools/ai-readiness-checker");
  }

  const report = await createAiReadinessReport({
    domain: domainResult.data,
    origin,
    quickScore,
    quickBand,
  });

  captureReportEvent("ai_readiness_full_report_started", {
    report_id: report.id,
    domain: report.domain,
    quick_score: quickScore ?? null,
    quick_band: quickBand ?? null,
  });

  redirect(`/tools/ai-readiness-checker/report/${report.id}`);
}

export async function unlockReport(
  _prev: UnlockReportActionState,
  formData: FormData,
): Promise<UnlockReportActionState> {
  const strings = asStringFields(Object.fromEntries(formData));
  const anonymousDistinctId = readAnonymousDistinctId(formData);
  const result = unlockSchema.safeParse(strings);

  if (!result.success) {
    const { fieldErrors, formErrors } = z.flattenError(result.error);
    const emailErrors = fieldErrors.email;

    captureReportEvent(
      "ai_readiness_full_report_unlock_failed",
      personlessProperties({
        report_id: strings.reportId ?? null,
        error_type: "validation",
      }),
      undefined,
      anonymousDistinctId,
    );

    return {
      status: "error",
      message:
        emailErrors?.[0] ??
        formErrors[0] ??
        "Please check the form and try again.",
      fieldErrors: emailErrors ? { email: emailErrors } : undefined,
      values: { email: strings.email?.trim() ?? "" },
    };
  }

  if (result.data.website?.trim()) {
    return {
      status: "success",
      message: null,
      values: { email: result.data.email },
    };
  }

  const { reportId, email } = result.data;
  const existing = await getAiReadinessReportById(reportId);

  if (!existing) {
    captureReportEvent(
      "ai_readiness_full_report_unlock_failed",
      personlessProperties({
        report_id: reportId,
        error_type: "not_found",
      }),
      undefined,
      anonymousDistinctId,
    );

    return {
      status: "error",
      message: "This report could not be found.",
      values: { email },
    };
  }

  try {
    const unlocked = await unlockAiReadinessReport(reportId, email);

    if (!unlocked.ok) {
      captureReportEvent(
        "ai_readiness_full_report_unlock_failed",
        personlessProperties({
          report_id: reportId,
          domain: existing.domain,
          error_type: unlocked.reason,
        }),
        undefined,
        anonymousDistinctId,
      );

      return {
        status: "error",
        message: "This report could not be unlocked. Please try again.",
        values: { email },
      };
    }

    const cookieStore = await cookies();
    cookieStore.set(
      AR_REPORT_COOKIE,
      formatReportAccessCookie(reportId, unlocked.accessToken),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: AR_REPORT_COOKIE_MAX_AGE,
        path: "/",
      },
    );

    let signupId: string | undefined;
    try {
      signupId = await upsertSignup({ email, company: existing.domain });
    } catch (error) {
      console.error("[ai-readiness-report] signup upsert failed", error);
    }

    after(async () => {
      try {
        const posthog = getPostHogClient();
        if (!posthog) return;

        if (signupId) {
          posthog.identify({
            distinctId: signupId,
            properties: identifyProperties(
              { email, company: existing.domain },
              anonymousDistinctId,
            ),
          });
        }

        posthog.capture({
          distinctId: signupId ?? anonymousDistinctId ?? "anonymous",
          event: "ai_readiness_full_report_unlocked",
          properties: {
            report_id: reportId,
            domain: existing.domain,
            quick_score: existing.quickScore ?? null,
            quick_band: existing.quickBand ?? null,
          },
        });
        await posthog.flush();
      } catch (error) {
        console.error("[ai-readiness-report] posthog unlock failed", error);
      }
    });

    return {
      status: "success",
      message: null,
      values: { email },
    };
  } catch (error) {
    const cause = error instanceof Error ? error.message : String(error);
    console.error("[ai-readiness-report] unlock failed:", cause, error);

    captureReportEvent(
      "ai_readiness_full_report_unlock_failed",
      personlessProperties({
        report_id: reportId,
        domain: existing.domain,
        error_type: error instanceof Error ? error.name : "UnknownError",
      }),
      undefined,
      anonymousDistinctId,
    );

    return {
      status: "error",
      message:
        process.env.NODE_ENV === "production"
          ? "We couldn't unlock that report. Please try again."
          : `Couldn't unlock report: ${cause}`,
      values: { email },
    };
  }
}
