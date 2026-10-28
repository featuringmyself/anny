"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";
import { PRODUCT_REGISTER_URL } from "@/lib/site";

export default function PricingTierMotion({
  featured,
  href,
  cta,
  tier,
}: {
  featured?: boolean;
  href: string;
  cta: string;
  tier: string;
}) {
  const reduce = useReducedMotion();
  const destination =
    href === PRODUCT_REGISTER_URL || href === "/register"
      ? `${PRODUCT_REGISTER_URL}?plan=${encodeURIComponent(tier)}`
      : href;

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: featured ? -2 : -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Button
        size="lg"
        variant={featured ? "default" : "outline"}
        className={
          featured
            ? "h-12 w-full rounded-lg border border-zinc-900 bg-brand px-5 text-base font-semibold text-white hover:bg-emerald-50 hover:text-black"
            : "h-12 w-full rounded-lg border-zinc-900 px-5 text-base font-semibold hover:bg-zinc-900 hover:text-white"
        }
        render={
          <Link
            href={destination}
            onClick={() =>
              posthog.capture("pricing_tier_cta_clicked", {
                tier,
                cta,
                featured: Boolean(featured),
              })
            }
          />
        }
      >
        {cta}
      </Button>
    </motion.div>
  );
}
