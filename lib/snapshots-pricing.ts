/** Canonical Snapshot pricing. Keep UI and schema in lockstep. */

export type SnapshotMarket = "india" | "international";

export const SNAPSHOT_PRICING = {
  india: {
    market: "india" as const,
    currency: "INR",
    currencySymbol: "₹",
    amount: 500,
    /** Display: ₹500 */
    priceLabel: "₹500",
    periodLabel: "per snapshot",
    /** Schema.org */
    priceCurrency: "INR",
    extraPromptAmount: 20,
    extraPromptLabel: "₹20",
    localeHint: "India",
    addOnLine: "+ ₹20 per extra prompt",
  },
  international: {
    market: "international" as const,
    currency: "USD",
    currencySymbol: "$",
    amount: 10,
    /** Display: $10 */
    priceLabel: "$10",
    periodLabel: "per snapshot",
    priceCurrency: "USD",
    extraPromptAmount: 0.4,
    extraPromptLabel: "$0.40",
    localeHint: "US & worldwide",
    addOnLine: "+ $0.40 per extra prompt",
  },
} as const;

export const SNAPSHOT_INCLUDED_PROMPTS = 25;

export const SNAPSHOT_ENGINES = [
  "ChatGPT",
  "Perplexity",
  "Google AI Overviews",
] as const;

/**
 * Soft default only. Never bill from this alone.
 * Asia/Kolkata (and legacy Asia/Calcutta) → India pricing suggested.
 */
export function suggestSnapshotMarket(
  timeZone: string | undefined | null,
): SnapshotMarket {
  if (!timeZone) return "international";
  const tz = timeZone.toLowerCase();
  if (tz === "asia/kolkata" || tz === "asia/calcutta") return "india";
  return "international";
}

/**
 * Server-side market from request geo / language.
 * Prefer IP country (Vercel / Cloudflare), then Accept-Language.
 */
export function detectSnapshotMarketFromHeaders(input: {
  country?: string | null;
  acceptLanguage?: string | null;
}): SnapshotMarket {
  const country = (input.country ?? "").trim().toUpperCase();
  if (country === "IN") return "india";

  const lang = (input.acceptLanguage ?? "").toLowerCase();
  if (
    lang.includes("en-in") ||
    lang.includes("hi-in") ||
    lang.includes("hi,") ||
    lang.startsWith("hi")
  ) {
    return "india";
  }

  return "international";
}
