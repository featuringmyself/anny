"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

/**
 * Hidden field that carries the browser PostHog distinct id into Server Actions
 * / form POSTs so the backend can merge identity with `$anon_distinct_id`.
 */
export function PostHogDistinctIdField() {
  const [distinctId, setDistinctId] = useState("");

  useEffect(() => {
    try {
      // Only present after production init; leave empty locally.
      if (typeof posthog.get_distinct_id !== "function") return;
      const id = posthog.get_distinct_id();
      if (id) setDistinctId(id);
    } catch {
      // SDK not ready / not initialized — leave empty.
    }
  }, []);

  return (
    <input type="hidden" name="ph_distinct_id" value={distinctId} readOnly />
  );
}
