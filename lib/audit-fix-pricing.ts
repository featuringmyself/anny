/** Canonical Dodox Audit pricing. Keep UI and schema in lockstep. */

export type AuditFixMarket = "india" | "international";

/**
 * Display amounts must match the Dodo product:
 * base INR + by_country localized USD (US).
 */
export const AUDIT_FIX_PRICING = {
  india: {
    market: "india" as const,
    currency: "INR",
    currencySymbol: "₹",
    amount: 5000,
    /** Display: ₹5,000 — Dodo base price */
    priceLabel: "₹5,000",
    periodLabel: "one-time",
    priceCurrency: "INR",
    localeHint: "India",
  },
  international: {
    market: "international" as const,
    currency: "USD",
    currencySymbol: "$",
    amount: 100,
    /** Display: $100 — Dodo by_country US localized price */
    priceLabel: "$100",
    periodLabel: "one-time",
    priceCurrency: "USD",
    localeHint: "US & worldwide",
  },
} as const;

export const AUDIT_FIX_PROMPTS = 49;
export const AUDIT_FIX_TURNAROUND = "5 days";

export const AUDIT_FIX_SURFACES = [
  "Site",
  "Content",
  "Authority footprint",
] as const;

/**
 * Soft default only. Never bill from this alone.
 * Asia/Kolkata (and legacy Asia/Calcutta) → India pricing suggested.
 */
export function suggestAuditFixMarket(
  timeZone: string | undefined | null,
): AuditFixMarket {
  if (!timeZone) return "international";
  const tz = timeZone.toLowerCase();
  if (tz === "asia/kolkata" || tz === "asia/calcutta") return "india";
  return "international";
}

/**
 * Server-side market from request geo / language.
 * Prefer IP country (Vercel / Cloudflare), then Accept-Language.
 */
export function detectAuditFixMarketFromHeaders(input: {
  country?: string | null;
  acceptLanguage?: string | null;
}): AuditFixMarket {
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
