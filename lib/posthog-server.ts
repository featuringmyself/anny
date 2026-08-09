import "server-only";

import { PostHog } from "posthog-node";

let client: PostHog | null = null;

/**
 * Shared posthog-node client for Server Actions / Route Handlers.
 * Production only — never returns a client in development.
 */
export function getPostHogClient(): PostHog | null {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) {
    return null;
  }

  if (!client) {
    client = new PostHog(token, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
      enableExceptionAutocapture: true,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return client;
}
