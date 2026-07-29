"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import {
  type RegisterActionState,
  submitRegister,
} from "@/app/actions/register";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: RegisterActionState = {
  status: "idle",
  message: null,
};

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

export default function RegisterForm({ plan }: { plan?: string }) {
  const fieldId = useId();
  const reduce = useReducedMotion();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const [state, formAction, pending] = useActionState(
    submitRegister,
    initialState,
  );
  const fieldErrors = state.fieldErrors ?? {};
  const showSummary =
    state.status === "error" &&
    Boolean(state.message) &&
    Object.keys(fieldErrors).length === 0;

  useEffect(() => {
    if (state.status === "success") {
      successHeadingRef.current?.focus();
      return;
    }

    if (state.status === "error") {
      if (fieldErrors.email) {
        emailRef.current?.focus();
      } else if (fieldErrors.company) {
        companyRef.current?.focus();
      }
    }
  }, [state.status, fieldErrors.email, fieldErrors.company]);

  if (state.status === "success") {
    return (
      <motion.div
        className="flex min-h-72 flex-col justify-center p-8 md:min-h-96 md:p-12"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
      >
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Noted
        </p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-3 text-2xl font-medium tracking-tight outline-none md:text-3xl"
        >
          We&apos;ve got your details
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
          Noted on{" "}
          <span className="font-medium text-zinc-800">{state.email}</span>.
          We&apos;re accepting limited signups due to high demand — our sales
          team will reach out soon.
        </p>
        <div className="mt-8">
          <Button size="lg" className="px-5" render={<Link href="/" />}>
            Back to home
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex min-h-72 flex-col justify-center p-8 md:min-h-96 md:p-12">
      <div>
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Create account
        </p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
          Start tracking AI mentions
        </h2>
        <p className="mt-2 max-w-sm text-sm text-zinc-500">
          Enter your work email and company to get started
          {plan ? (
            <>
              {" "}
              on{" "}
              <span className="font-medium text-zinc-800">{plan}</span>
            </>
          ) : null}
          .
        </p>
      </div>

      <form
        action={formAction}
        className="mt-8 grid gap-4"
        noValidate
        aria-busy={pending}
      >
        {plan ? <input type="hidden" name="plan" value={plan} /> : null}

        {/* Honeypot — hidden from users, filled by many bots */}
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

        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-email`}>Work email</Label>
          <Input
            ref={emailRef}
            id={`${fieldId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="ada@acme.com"
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

        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-company`}>Company</Label>
          <Input
            ref={companyRef}
            id={`${fieldId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme"
            required
            defaultValue={state.values?.company}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={
              fieldErrors.company ? `${fieldId}-company-error` : undefined
            }
          />
          <FieldError
            id={`${fieldId}-company-error`}
            messages={fieldErrors.company}
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
          className="mt-2 w-full px-5"
          disabled={pending}
        >
          {pending ? "Submitting…" : "Create account"}
        </Button>

        <p className="text-xs leading-relaxed text-zinc-400">
          By continuing you agree to our{" "}
          <Link
            href="/terms"
            className="underline underline-offset-2 hover:text-zinc-600"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="underline underline-offset-2 hover:text-zinc-600"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
