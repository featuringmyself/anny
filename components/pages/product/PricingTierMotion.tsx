"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import posthog from "posthog-js";

import { Button } from "@/components/ui/button";

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

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: featured ? -2 : -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Button
        size="lg"
        variant={featured ? "default" : "outline"}
        className="w-full px-5"
        render={
          <Link
            href={
              href === "/register"
                ? `/register?plan=${encodeURIComponent(tier)}`
                : href
            }
          />
        }
        onClick={() =>
          posthog.capture("pricing_tier_cta_clicked", {
            tier,
            cta,
            featured: Boolean(featured),
          })
        }
      >
        {cta}
      </Button>
    </motion.div>
  );
}
