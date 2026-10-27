import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

// Only initialize in production builds, never on localhost / `next dev`.
if (process.env.NODE_ENV === "production" && token) {
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
    // Cover www + dodox + apex; also include the live host for previews/custom domains.
    tracing_headers: [
      "www.dodoxhq.com",
      "dodox.dodoxhq.com",
      "dodoxhq.com",
      ...(typeof window !== "undefined" ? [window.location.hostname] : []),
    ],
    loaded: (ph) => {
      const host = window.location.hostname;
      if (host === "localhost" || host === "127.0.0.1") {
        ph.opt_out_capturing();
      }
    },
  });
} else if (process.env.NODE_ENV === "development" && !token) {
  console.error(
    "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
  );
}
