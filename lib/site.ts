export const SITE_URL = "https://www.dodoxhq.com";
export const SITE_NAME = "Dodox";

export const SITE_DESCRIPTION =
  "Dodox is an SEO & GEO Agent with AI Monitoring included. Track how ChatGPT, Claude, Gemini, and Perplexity mention your brand, then ship the work that earns more citations.";

/** Brand mark served from /public/logo.png */
export const SITE_LOGO_URL = `${SITE_URL}/logo.png`;

/**
 * Product UI crop for schema / pages that still need a static image URL.
 * Social cards use app/opengraph-image.tsx (same source crop).
 */
export const SITE_SCREENSHOT_URL = `${SITE_URL}/og/product-dashboard.jpg`;
export const SITE_SCREENSHOT_WIDTH = 1200;
export const SITE_SCREENSHOT_HEIGHT = 630;
export const SITE_SCREENSHOT_ALT =
  "Dodox AI visibility dashboard across ChatGPT and other engines";

/** Official social profiles for Organization.sameAs / footer links */
export const SITE_X_URL = "https://x.com/dodoxhq";
export const SITE_X_HANDLE = "@dodoxhq";
export const SITE_LINKEDIN_URL =
  "https://www.linkedin.com/company/117384162";
export const SITE_SAME_AS = [SITE_X_URL, SITE_LINKEDIN_URL] as const;

/** ISO dates for WebPage / SoftwareApplication freshness signals */
export const SITE_DATE_PUBLISHED = "2026-07-24";
/** Bump only when substantive public content or entity facts change. */
export const SITE_DATE_MODIFIED = "2026-10-09";
