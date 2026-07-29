"use client";

import * as React from "react";
import { useId, useState, useTransition } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FieldErrors = {
  email?: string;
  company?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function RegisterForm({ plan }: { plan?: string }) {
  const fieldId = useId();
  const reduce = useReducedMotion();
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [email, setEmail] = useState("");

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextEmail = String(form.get("email") ?? "").trim();
    const company = String(form.get("company") ?? "").trim();
    const nextErrors: FieldErrors = {};

    if (!nextEmail) {
      nextErrors.email = "Work email is required.";
    } else if (!isValidEmail(nextEmail)) {
      nextErrors.email = "Enter a valid work email.";
    }

    if (!company) {
      nextErrors.company = "Company is required.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    startTransition(() => {
      posthog.capture("register_submitted", {
        plan: plan ?? null,
        company,
      });
      setEmail(nextEmail);
      setStatus("success");
    });
  }

  if (status === "success") {
    return (
      <motion.div
        className="flex h-full flex-col justify-center p-8 md:p-12"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Check your inbox
        </p>
        <h2 className="mt-3 text-2xl font-medium tracking-tight md:text-3xl">
          You&apos;re almost in
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
          We sent a confirmation link to{" "}
          <span className="font-medium text-zinc-800">{email}</span>. Open it
          to finish setting up your workspace
          {plan ? (
            <>
              {" "}
              on the{" "}
              <span className="font-medium text-zinc-800">{plan}</span> plan
            </>
          ) : null}
          .
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="px-5"
            render={<Link href="/pricing" />}
          >
            Back to pricing
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-5"
            onClick={() => {
              setStatus("idle");
              setEmail("");
            }}
          >
            Use a different email
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-center p-8 md:p-12">
      <div>
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Create account
        </p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
          Start tracking AI mentions
        </h2>
        <p className="mt-2 max-w-sm text-sm text-zinc-500">
          Work email and company — we&apos;ll send a link to finish setup.
          {plan ? (
            <>
              {" "}
              Selected plan:{" "}
              <span className="font-medium text-zinc-800">{plan}</span>.
            </>
          ) : null}
        </p>
      </div>

      <form onSubmit={onSubmit} className="mt-8 grid gap-4" noValidate>
        {plan ? <input type="hidden" name="plan" value={plan} /> : null}

        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-email`}>Work email</Label>
          <Input
            id={`${fieldId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="ada@acme.com"
            required
            aria-invalid={Boolean(errors.email)}
            aria-describedby={
              errors.email ? `${fieldId}-email-error` : undefined
            }
          />
          {errors.email ? (
            <p
              id={`${fieldId}-email-error`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-company`}>Company</Label>
          <Input
            id={`${fieldId}-company`}
            name="company"
            autoComplete="organization"
            placeholder="Acme"
            required
            aria-invalid={Boolean(errors.company)}
            aria-describedby={
              errors.company ? `${fieldId}-company-error` : undefined
            }
          />
          {errors.company ? (
            <p
              id={`${fieldId}-company-error`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.company}
            </p>
          ) : null}
        </div>

        <Button type="submit" size="lg" className="mt-2 w-full px-5" disabled={pending}>
          {pending ? "Creating account…" : "Create account"}
        </Button>

        <p className="text-xs leading-relaxed text-zinc-400">
          By continuing you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-2 hover:text-zinc-600">
            Terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-600">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </div>
  );
}
