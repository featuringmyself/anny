"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FieldErrors = {
  name?: string;
  email?: string;
  note?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function CareersApplyForm({
  roleTitle,
  roleSlug,
}: {
  roleTitle: string;
  roleSlug: string;
}) {
  const fieldId = useId();
  const reduce = useReducedMotion();
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const [pending, setPending] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (submittedEmail) {
      successHeadingRef.current?.focus();
    }
  }, [submittedEmail]);

  if (submittedEmail) {
    return (
      <motion.div
        className="flex flex-col justify-center"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        aria-live="polite"
      >
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Application received
        </p>
        <h2
          ref={successHeadingRef}
          tabIndex={-1}
          className="mt-3 text-2xl font-medium tracking-tight outline-none md:text-3xl"
        >
          Thanks — we&apos;ll be in touch
        </h2>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-zinc-500">
          Dummy confirmation for{" "}
          <span className="font-medium text-zinc-800">{roleTitle}</span>. We
          noted{" "}
          <span className="font-medium text-zinc-800">{submittedEmail}</span>.
          Nothing was sent to a hiring inbox yet.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" className="px-5" render={<Link href="/careers" />}>
            Back to careers
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-5"
            render={<Link href={`/careers/${roleSlug}`} />}
          >
            View role again
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <p className="text-sm font-medium tracking-wide text-[#2462ff]">Apply</p>
      <h2 className="mt-2 text-2xl font-medium tracking-tight md:text-3xl">
        Apply for {roleTitle}
      </h2>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">
        This is a demo form — submissions stay in the browser and show a
        success state so you can walk the full flow.
      </p>

      <form
        className="mt-8 grid gap-4"
        noValidate
        aria-busy={pending}
        onSubmit={(event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const data = new FormData(form);
          const name = String(data.get("name") ?? "").trim();
          const email = String(data.get("email") ?? "").trim();
          const note = String(data.get("note") ?? "").trim();
          const nextErrors: FieldErrors = {};

          if (!name) nextErrors.name = "Add your name.";
          if (!email) nextErrors.email = "Add your email.";
          else if (!isValidEmail(email))
            nextErrors.email = "Enter a valid email.";
          if (!note) nextErrors.note = "Tell us briefly why you're interested.";

          setErrors(nextErrors);
          if (Object.keys(nextErrors).length > 0) return;

          setPending(true);
          window.setTimeout(() => {
            setSubmittedEmail(email);
            setPending(false);
          }, 450);
        }}
      >
        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-name`}>Name</Label>
          <Input
            id={`${fieldId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            required
            aria-invalid={Boolean(errors.name)}
            aria-describedby={
              errors.name ? `${fieldId}-name-error` : undefined
            }
          />
          {errors.name ? (
            <p
              id={`${fieldId}-name-error`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.name}
            </p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-email`}>Email</Label>
          <Input
            id={`${fieldId}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="ada@example.com"
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
          <Label htmlFor={`${fieldId}-link`}>Portfolio or LinkedIn</Label>
          <Input
            id={`${fieldId}-link`}
            name="link"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-note`}>Why Anny?</Label>
          <Textarea
            id={`${fieldId}-note`}
            name="note"
            rows={4}
            placeholder="A few sentences on what you'd ship in your first 90 days."
            required
            aria-invalid={Boolean(errors.note)}
            aria-describedby={
              errors.note ? `${fieldId}-note-error` : undefined
            }
          />
          {errors.note ? (
            <p
              id={`${fieldId}-note-error`}
              role="alert"
              className="text-sm text-destructive"
            >
              {errors.note}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          className="mt-2 w-full px-5"
          disabled={pending}
        >
          {pending ? "Submitting…" : "Submit application"}
        </Button>
      </form>
    </div>
  );
}
