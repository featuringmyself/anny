"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function BlogRowMotion({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { backgroundColor: "rgba(255,255,255,0.7)" }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
