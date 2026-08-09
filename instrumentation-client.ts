import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (!token) {
  if (process.env.NODE_ENV === "development") {
    console.error(
      "NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN variable required by PostHog is missing or un-configured, this causes events to be silently missed. This error stops appearing once NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN is configured",
    );
  }
} else {
  posthog.init(token, {
    api_host: "/ingest",
    // UI host is the app origin, not the ingest origin.
    ui_host: "https://us.posthog.com",
    defaults: "2026-05-30",
    capture_exceptions: true,
    // Next.js /ingest rewrites can exceed the default 3s flags timeout.
    request_timeout_ms: 10000,
    loaded: (ph) => {
      const host = window.location.hostname;
      const isLocal = host === "localhost" || host === "127.0.0.1";
      const captureLocalhost =
        process.env.NEXT_PUBLIC_POSTHOG_CAPTURE_LOCALHOST === "true";

      // Keep local noise out of production analytics unless explicitly enabled.
      if (isLocal && !captureLocalhost) {
        ph.opt_out_capturing();
      }
    },
  });
}
