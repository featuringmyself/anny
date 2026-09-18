"use client";

import { motion, useReducedMotion } from "motion/react";

export default function DemoReveal({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="relative mt-8 sm:mt-10"
      initial={reduce ? false : { opacity: 0, y: 20 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      {children}
    </motion.div>
  );
}
