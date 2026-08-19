"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export default function ChangelogEntryMotion({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  // #region agent log
  if (typeof window !== "undefined") {
    fetch("http://127.0.0.1:7528/ingest/8ea49b12-3acb-4483-906d-aeed4e36bee6", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "c31750",
      },
      body: JSON.stringify({
        sessionId: "c31750",
        runId: "pre-fix",
        hypothesisId: "B",
        location: "ChangelogEntryMotion.tsx:render",
        message: "changelog motion initial vs whileInView",
        data: {
          path: window.location.pathname,
          reduce: Boolean(reduce),
          initialIsFalse: Boolean(reduce),
          whileInViewHasOpacity: !reduce,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
  }
  // #endregion

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
