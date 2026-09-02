"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import {
  type UnlockReportActionState,
  unlockReport,
} from "@/app/actions/ai-readiness-report";
import { PostHogDistinctIdField } from "@/components/posthog-distinct-id-field";
import { aiReadinessAccentButtonClass } from "@/components/pages/tools/ai-readiness/button-classes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const initialState: UnlockReportActionState = {
  status: "idle",
  message: null,
};

const VALUE_CHIPS = ["Insights", "Categories", "Fixes"] as const;

function FieldError({
  id,
  messages,
}: {
  id: string;
  messages?: string[];
}) {
  if (!messages?.length) return null;

  return (
    <p id={id} role="alert" className="text-sm text-destructive">
      {messages[0]}
    </p>
  );
}

type AiReadinessReportGateProps = {
  reportId: string;
  onUnlockStart?: () => void;
};

export function AiReadinessReportGate({
  reportId,
  onUnlockStart,
}: AiReadinessReportGateProps) {
  const fieldId = useId();
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const [dismissed, setDismissed] = useState(false);
  const [state, formAction, pending] = useActionState(
    unlockReport,
    initialState,
  );
  const fieldErrors = state.fieldErrors ?? {};
  const showSummary =
    state.status === "error" &&
    Boolean(state.message) &&
    Object.keys(fieldErrors).length === 0;

  useEffect(() => {
    if (state.status !== "success") return;

    onUnlockStart?.();
    setDismissed(true);

    const timer = window.setTimeout(() => {
      router.refresh();
    }, 480);

    return () => window.clearTimeout(timer);
  }, [state.status, onUnlockStart, router]);

  useEffect(() => {
    if (state.status === "error" && fieldErrors.email) {
      emailRef.current?.focus();
    }
  }, [state.status, fieldErrors.email]);

  return (
    <div
      className={`absolute inset-0 z-10 flex items-center justify-center px-4 py-6 transition-opacity duration-500 ease-out sm:px-6 ${
        dismissed ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      aria-labelledby={`${fieldId}-gate-heading`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(255,255,255,0.35)_42%,rgba(255,255,255,0.88)_78%,rgba(250,250,250,0.97)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/20 via-transparent to-zinc-50/90"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 shadow-[inset_0_0_120px_rgba(24,24,27,0.06)]"
      />

      <div className="pointer-events-auto relative z-10 w-full max-w-sm border border-zinc-200/90 bg-white/95 p-6 shadow-2xl shadow-zinc-900/10 ring-1 ring-zinc-950/5 backdrop-blur-md sm:max-w-md sm:p-7">
        <h2
          id={`${fieldId}-gate-heading`}
          className="text-xl font-medium tracking-tight text-balance sm:text-2xl"
        >
          Unlock full report
        </h2>

        <ul
          className="mt-3 flex flex-wrap gap-1.5"
          aria-label="Report includes"
        >
          {VALUE_CHIPS.map((chip) => (
            <li
              key={chip}
              className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-zinc-600 uppercase"
            >
              {chip}
            </li>
          ))}
        </ul>

        <form
          action={formAction}
          className="mt-5 grid gap-3"
          noValidate
          aria-busy={pending}
        >
          <input type="hidden" name="reportId" value={reportId} />
          <PostHogDistinctIdField />

          <div
            className="absolute left-[-9999px] h-0 w-0 overflow-hidden"
            aria-hidden="true"
          >
            <label htmlFor={`${fieldId}-website`}>Website</label>
            <input
              id={`${fieldId}-website`}
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-1.5">
            <label htmlFor={`${fieldId}-email`} className="sr-only">
              Email
            </label>
            <Input
              ref={emailRef}
              id={`${fieldId}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="you@company.com"
              required
              defaultValue={state.values?.email}
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={
                fieldErrors.email ? `${fieldId}-email-error` : undefined
              }
            />
            <FieldError
              id={`${fieldId}-email-error`}
              messages={fieldErrors.email}
            />
          </div>

          {showSummary ? (
            <p
              role="alert"
              aria-live="polite"
              className="text-sm text-destructive"
            >
              {state.message}
            </p>
          ) : null}

          <Button
            type="submit"
            size="lg"
            className={cn("w-full px-5", aiReadinessAccentButtonClass)}
            disabled={pending || dismissed}
          >
            {pending ? "Unlocking…" : "Unlock report"}
          </Button>
        </form>
      </div>
    </div>
  );
}
