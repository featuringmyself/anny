"use client";

import * as React from "react";
import { useId, useState } from "react";

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

const GENERIC_ERROR = "We couldn't send that. Please try again.";

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
    <Dialog>
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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

// Rendered inside the popup so it unmounts on close, resetting the form.
function SalesForm({ source }: TalkToSalesProps) {
  const fieldId = useId();
  const [status, setStatus] = useState<
    "idle" | "submitting" | "error" | "success"
  >("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const fields = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("submitting");
    setError(null);

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, source }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? GENERIC_ERROR);
      }

      setStatus("success");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : GENERIC_ERROR);
      setStatus("error");
    }
  }

  if (status === "success") {
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

      <form onSubmit={handleSubmit} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor={`${fieldId}-name`}>Full name</Label>
            <Input
              id={`${fieldId}-name`}
              name="name"
              autoComplete="name"
              placeholder="Ada Lovelace"
              required
            />
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

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <DialogFooter className="mt-1">
          <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
          <Button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "Sending…" : "Request a demo"}
          </Button>
        </DialogFooter>
      </form>
    </>
  );
}
