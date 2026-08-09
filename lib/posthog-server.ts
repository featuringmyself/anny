import { PostHog } from "posthog-node";

let client: PostHog | null = null;

export function getPostHogClient(): PostHog | null {
  // Keep localhost out of product analytics (PostHog best practice).
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

  if (!token) {
    return null;
  }

  if (!client) {
    client = new PostHog(token, {
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      enableExceptionAutocapture: true,
      flushAt: 1,
      flushInterval: 0,
    });
  }

  return client;
}
