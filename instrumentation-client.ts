import posthog from "posthog-js";

import { SITE_URL } from "@/lib/site";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

const host = window.location.hostname;
const isLocalhost = host === "localhost" || host === "127.0.0.1";

// Only initialize in production builds — never on localhost / `next dev`.
// The hostname check must run before init, because posthog.init() attaches the
// exception handlers immediately. A later opt-out ships the first errors first.
if (process.env.NODE_ENV === "production" && token && !isLocalhost) {
  let siteHostname = "anny.dodoxhq.com";
  try {
    siteHostname = new URL(SITE_URL).hostname;
  } catch {
    // keep fallback
  }

  posthog.init(token, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    person_profiles: "identified_only",
    capture_exceptions: {
      capture_unhandled_errors: true,
      capture_unhandled_rejections: true,
      capture_console_errors: false,
    },
    feature_flag_request_timeout_ms: 10000,
    tracing_headers: [siteHostname],
  });
} else if (process.env.NODE_ENV === "development" && !token) {
  console.error(
    "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
  );
}
