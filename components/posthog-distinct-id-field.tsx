"use client";

import { useEffect, useState } from "react";
import posthog from "posthog-js";

const POLL_MS = 200;
const MAX_WAIT_MS = 3000;

/**
 * Hidden field that carries the browser PostHog distinct id into Server Actions
 * / form POSTs so the backend can merge identity with `$anon_distinct_id`.
 * Polls until the SDK has a distinct id (or the wait budget expires).
 */
export function PostHogDistinctIdField() {
  const [distinctId, setDistinctId] = useState("");

  useEffect(() => {
    let cancelled = false;
    let attempts = 0;
    const maxAttempts = Math.ceil(MAX_WAIT_MS / POLL_MS);

    function readId(): string | undefined {
      try {
        if (typeof posthog.get_distinct_id !== "function") return undefined;
        const id = posthog.get_distinct_id();
        return id || undefined;
      } catch {
        return undefined;
      }
    }

    function tick() {
      if (cancelled) return;
      const id = readId();
      if (id) {
        setDistinctId(id);
        return;
      }
      attempts += 1;
      if (attempts < maxAttempts) {
        window.setTimeout(tick, POLL_MS);
      }
    }

    tick();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <input type="hidden" name="ph_distinct_id" value={distinctId} readOnly />
  );
}
