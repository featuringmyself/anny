"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ComponentProps } from "react";

type RegisterCtaLinkProps = ComponentProps<typeof Link> & {
  /** Attribution for register_cta_clicked (e.g. navbar, home-hero) */
  source: string;
  /** Optional plan name when the CTA deep-links with ?plan= */
  plan?: string;
};

/**
 * Link wrapper that captures register CTA clicks before navigation.
 * Use as Button `render` so the handler sits on the real anchor.
 */
export function RegisterCtaLink({
  source,
  plan,
  onClick,
  ...props
}: RegisterCtaLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        posthog.capture("register_cta_clicked", {
          source,
          ...(plan ? { plan } : {}),
        });
        onClick?.(event);
      }}
    />
  );
}
