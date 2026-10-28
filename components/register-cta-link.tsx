"use client";

import Link from "next/link";
import posthog from "posthog-js";
import type { ComponentProps } from "react";

import { PRODUCT_REGISTER_URL } from "@/lib/site";

type RegisterCtaLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  /** Attribution for register_cta_clicked (e.g. navbar, home-hero) */
  source: string;
  /** Optional plan name when the CTA deep-links with ?plan= */
  plan?: string;
  /** Override destination; defaults to product app /register */
  href?: string;
};

function registerHref(plan?: string) {
  if (!plan) return PRODUCT_REGISTER_URL;
  return `${PRODUCT_REGISTER_URL}?plan=${encodeURIComponent(plan)}`;
}

/**
 * Link wrapper that captures register CTA clicks before navigation.
 * Use as Button `render` so the handler sits on the real anchor.
 */
export function RegisterCtaLink({
  source,
  plan,
  href,
  onClick,
  ...props
}: RegisterCtaLinkProps) {
  return (
    <Link
      {...props}
      href={href ?? registerHref(plan)}
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
