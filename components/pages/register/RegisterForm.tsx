"use client";

import { useActionState, useEffect, useId, useRef } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import {
  type RegisterActionState,
  submitRegister,
} from "@/app/actions/register";
import { brand } from "@/components/Home/brand";
import { PostHogDistinctIdField } from "@/components/posthog-distinct-id-field";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

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
    <p id={id} role="alert" className="mt-1.5 text-[13px] text-destructive">
      {messages[0]}
    </p>
  );
}

/** Quiet, premium inputs — white fill, hairline border, soft focus ring */
const inputClass = cn(
  "h-11 rounded-[10px] border-zinc-200/90 bg-white px-3.5 text-[15px] text-zinc-900 shadow-[inset_0_1px_2px_rgba(17,51,60,0.04)]",
  "placeholder:text-zinc-400",
  "focus-visible:border-[#225864]/40 focus-visible:bg-white focus-visible:ring-[3px] focus-visible:ring-[#225864]/10",
);

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
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
      >
        <p
          className="text-[12px] font-medium tracking-[0.14em] uppercase"
          style={{ color: brand.tertiary }}
        >
          Email recorded
        </p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          id="register-heading"
          className="mt-3 text-[1.75rem] leading-[1.15] font-semibold tracking-[-0.02em] outline-none"
          style={{ color: brand.heading }}
        >
          We&apos;re coming up
        </h2>
        <p
          className="mt-3 text-[14px] leading-[1.55]"
          style={{ color: brand.body }}
        >
          We&apos;ve recorded{" "}
          <span className="font-medium" style={{ color: brand.bodyStrong }}>
            {state.email}
          </span>
          . We&apos;re accepting limited signups due to high demand — our sales
          team will reach out soon.
        </p>

        <div className="mt-9 flex flex-col gap-2">
          <Button
            size="lg"
            className="h-11 w-full rounded-[10px] text-[15px] font-semibold text-white shadow-none hover:opacity-[0.92]"
            style={{ backgroundColor: brand.dark }}
            render={<Link href="/" />}
          >
            Back to home
          </Button>
          <TalkToSalesButton
            variant="ghost"
            className="h-10 w-full text-[13px] font-medium text-zinc-500 hover:bg-transparent hover:text-zinc-800"
            source="register-success"
          >
            Prefer a call? Talk to sales
          </TalkToSalesButton>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <p className="text-[13px] font-medium text-zinc-400">Welcome to Dodox</p>
      <h1
        id="register-heading"
        className="mt-2 text-[1.85rem] leading-[1.12] font-semibold tracking-[-0.025em]"
        style={{ color: brand.heading }}
      >
        Create your account
      </h1>
      <p
        className="mt-2.5 text-[14px] leading-[1.55]"
        style={{ color: brand.body }}
      >
        Enter your work email and company to get started
        {plan ? (
          <>
            {" "}
            on the{" "}
            <span className="font-medium" style={{ color: brand.bodyStrong }}>
              {plan}
            </span>{" "}
            plan
          </>
        ) : null}
        .
      </p>

      <form
        action={formAction}
        className="mt-9 grid gap-[18px]"
        noValidate
        aria-busy={pending}
      >
        {plan ? <input type="hidden" name="plan" value={plan} /> : null}
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

        <div>
          <Label
            htmlFor={`${fieldId}-email`}
            className="text-[13px] font-medium text-zinc-600"
          >
            Work email
          </Label>
          <Input
            ref={emailRef}
            id={`${fieldId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="name@company.com"
            required
            defaultValue={state.values?.email}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? `${fieldId}-email-error` : undefined
            }
            className={cn(inputClass, "mt-1.5")}
          />
          <FieldError
            id={`${fieldId}-email-error`}
            messages={fieldErrors.email}
          />
        </div>

        <div>
          <Label
            htmlFor={`${fieldId}-company`}
            className="text-[13px] font-medium text-zinc-600"
          >
            Company
          </Label>
          <Input
            ref={companyRef}
            id={`${fieldId}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Company name"
            required
            defaultValue={state.values?.company}
            aria-invalid={Boolean(fieldErrors.company)}
            aria-describedby={
              fieldErrors.company ? `${fieldId}-company-error` : undefined
            }
            className={cn(inputClass, "mt-1.5")}
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
            className="text-[13px] text-destructive"
          >
            {state.message}
          </p>
        ) : null}

        <div className="mt-1">
          <Button
            type="submit"
            size="lg"
            className="h-11 w-full rounded-[10px] text-[15px] font-semibold text-white shadow-none transition-opacity hover:opacity-[0.92] disabled:opacity-45"
            style={{ backgroundColor: brand.dark }}
            disabled={pending}
          >
            {pending ? "Creating account…" : "Create account"}
          </Button>
          <p className="mt-2.5 text-center text-[12px] text-zinc-400">
            No credit card required
          </p>
        </div>

        <p className="text-center text-[12px] leading-relaxed text-zinc-400">
          By continuing you agree to our{" "}
          <Link
            href="/terms"
            className="text-zinc-600 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-zinc-900"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/privacy"
            className="text-zinc-600 underline decoration-zinc-300 underline-offset-2 transition-colors hover:text-zinc-900"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </form>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-1.5 text-[13px] text-zinc-400">
        <span>Looking for a demo?</span>
        <TalkToSalesButton
          variant="ghost"
          className="h-auto px-0.5 py-0 text-[13px] font-medium text-[#225864] hover:bg-transparent hover:text-[#11333c] hover:underline"
          source="register-form"
        >
          Talk to sales
        </TalkToSalesButton>
      </div>
    </div>
  );
}
