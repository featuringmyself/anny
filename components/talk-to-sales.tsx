"use client";

import * as React from "react";
import { useActionState, useId } from "react";
import posthog from "posthog-js";

import {
  type ContactActionState,
  submitContact,
} from "@/app/actions/contact";
import { PostHogDistinctIdField } from "@/components/posthog-distinct-id-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialContactState: ContactActionState = {
  status: "idle",
  message: null,
};

type TalkToSalesProps = {
  /** Identifies which CTA opened the dialog so leads can be attributed. */
  source: string;
};

/**
 * A "Talk to sales" button that opens the lead form. Safe to render from a
 * Server Component.
 */
export function TalkToSalesButton({
  children = "Talk to sales",
  source,
  ...props
}: React.ComponentProps<typeof Button> & TalkToSalesProps) {
  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) {
          posthog.capture("sales_dialog_opened", { source });
        }
      }}
    >
      <DialogTrigger render={<Button {...props} />}>{children}</DialogTrigger>
      <SalesDialogContent source={source} />
    </Dialog>
  );
}

/**
 * The lead form dialog without a trigger, for callers that open it from their
 * own state.
 */
export function TalkToSalesDialog({
  open,
  onOpenChange,
  source,
}: TalkToSalesProps & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          posthog.capture("sales_dialog_opened", { source });
        }
        onOpenChange(nextOpen);
      }}
    >
      <SalesDialogContent source={source} />
    </Dialog>
  );
}

function SalesDialogContent({ source }: TalkToSalesProps) {
  return (
    <DialogContent className="sm:max-w-lg">
      <SalesForm source={source} />
    </DialogContent>
  );
}

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

// Rendered inside the popup so it unmounts on close, resetting the form.
function SalesForm({ source }: TalkToSalesProps) {
  const fieldId = useId();
  const [state, formAction, pending] = useActionState(
    submitContact,
    initialContactState,
  );
  const fieldErrors = state.fieldErrors ?? {};
  // Only the summary is worth showing when the failure isn't field-specific.
  const showSummary =
    state.status === "error" &&
    Boolean(state.message) &&
    Object.keys(fieldErrors).length === 0;

  if (state.status === "success") {
    return (
      <>
        <DialogHeader>
          <DialogTitle className="text-lg">Thanks — we&apos;ve got it</DialogTitle>
          <DialogDescription>
            Someone from our team will reach out within one business day.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>Close</DialogClose>
        </DialogFooter>
      </>
    );
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg">Talk to sales</DialogTitle>
        <DialogDescription>
          Tell us about your brand and we&apos;ll show you how Anny tracks it
          across ChatGPT, Gemini, and AI Mode.
        </DialogDescription>
      </DialogHeader>

      <form action={formAction} className="grid gap-4">
        <input type="hidden" name="source" value={source} />
        <PostHogDistinctIdField />

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor={`${fieldId}-name`}>Full name</Label>
            <Input
              id={`${fieldId}-name`}
              name="name"
              autoComplete="name"
              placeholder="Ada Lovelace"
              required
              aria-invalid={Boolean(fieldErrors.name)}
              aria-describedby={
                fieldErrors.name ? `${fieldId}-name-error` : undefined
              }
            />
            <FieldError id={`${fieldId}-name-error`} messages={fieldErrors.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`${fieldId}-email`}>Work email</Label>
            <Input
              id={`${fieldId}-email`}
              name="email"
              type="email"
              autoComplete="email"
              placeholder="ada@acme.com"
              required
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
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor={`${fieldId}-company`}>Company</Label>
            <Input
              id={`${fieldId}-company`}
              name="company"
              autoComplete="organization"
              placeholder="Acme"
              required
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
          <div className="grid gap-2">
            <Label htmlFor={`${fieldId}-website`}>
              Website{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </Label>
            <Input
              id={`${fieldId}-website`}
              name="website"
              autoComplete="url"
              placeholder="acme.com"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${fieldId}-message`}>
            What would you like to track?{" "}
            <span className="font-normal text-muted-foreground">
              (optional)
            </span>
          </Label>
          <Textarea
            id={`${fieldId}-message`}
            name="message"
            rows={3}
            placeholder="Brands, competitors, or markets you care about."
          />
        </div>

        {showSummary ? (
          <p role="alert" aria-live="polite" className="text-sm text-destructive">
            {state.message}
          </p>
        ) : null}

        <DialogFooter className="mt-1">
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" disabled={pending}>
            {pending ? "Sending…" : "Request a demo"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
