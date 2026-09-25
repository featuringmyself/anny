"use client";

import { useEffect, useRef, type ReactNode } from "react";
import posthog from "posthog-js";

/**
 * Wraps a <details> and fires once when opened. Does not own FAQ copy.
 */
export default function StandingsFaqAnalytics({
  question,
  questionIndex,
  children,
}: {
  question: string;
  questionIndex: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const details = root.querySelector("details");
    if (!details) return;

    const onToggle = () => {
      if (!details.open) return;
      posthog.capture("faq_item_expanded", {
        question,
        question_index: questionIndex,
        source: "standings",
      });
    };

    details.addEventListener("toggle", onToggle);
    return () => details.removeEventListener("toggle", onToggle);
  }, [question, questionIndex]);

  return <div ref={ref}>{children}</div>;
}
