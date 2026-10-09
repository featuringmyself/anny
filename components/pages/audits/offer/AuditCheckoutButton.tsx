"use client";

import { useState, type ComponentProps } from "react";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import type { AuditFixMarket } from "@/lib/audit-fix-pricing";
import { cn } from "@/lib/utils";

type AuditCheckoutButtonProps = Omit<ComponentProps<typeof Button>, "onClick"> & {
  market: AuditFixMarket;
  /** CTA attribution for analytics + order metadata */
  source: string;
};

/**
 * Starts a Dodo hosted checkout for the Audit offer.
 * Market → product ID mapping stays on the server.
 */
export default function AuditCheckoutButton({
  market,
  source,
  children,
  className,
  disabled,
  ...props
}: AuditCheckoutButtonProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    if (pending) return;
    setPending(true);
    setError(null);

    posthog.capture("audit_checkout_started", { market, source });

    try {
      const res = await fetch("/api/checkout/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ market, source }),
      });

      const data = (await res.json().catch(() => null)) as {
        checkout_url?: string;
        error?: string;
      } | null;

      if (!res.ok || !data?.checkout_url) {
        const message =
          data?.error ?? "Could not start checkout. Please try again.";
        setError(message);
        posthog.capture("audit_checkout_start_failed", {
          market,
          source,
          status: res.status,
        });
        return;
      }

      window.location.assign(data.checkout_url);
    } catch {
      setError("Network error. Check your connection and try again.");
      posthog.capture("audit_checkout_start_failed", {
        market,
        source,
        status: "network",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        type="button"
        disabled={disabled || pending}
        aria-busy={pending}
        className={cn(className)}
        onClick={() => void startCheckout()}
        {...props}
      >
        {pending ? "Redirecting to checkout…" : children}
      </Button>
      {error ? (
        <p className="text-sm font-medium text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
