import posthog from "posthog-js";

// Keep localhost out of product analytics (PostHog best practice).
if (process.env.NODE_ENV !== "development") {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

  if (token) {
    posthog.init(token, {
      api_host: "/ingest",
      ui_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: "2026-01-30",
      capture_exceptions: true,
    });
  }
}
