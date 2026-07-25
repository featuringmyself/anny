"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function PricingTierMotion({
  children,
  featured,
}: {
  children: ReactNode;
  featured?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: featured ? -2 : -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.div>
  );
}
