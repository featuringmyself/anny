import type { AuditFixMarket } from "@/lib/audit-fix-pricing";
import { AUDIT_FIX_PRICING } from "@/lib/audit-fix-pricing";

export const AUDIT_CHECKOUT_OFFER = "audit" as const;

/**
 * Single Dodo product + localized pricing (pricing_mode: by_country).
 * Market on /audit selects billing country/currency so the right rule applies.
 *
 * Live product (test): base INR India, US localized USD.
 */
export const AUDIT_CATALOG = {
  india: {
    market: "india" as const,
    sku: "audit",
    /** Forces India localized/base price */
    billingCountry: "IN" as const,
    currency: AUDIT_FIX_PRICING.india.currency,
    /** Minor units — must match Dodo base / localized amount */
    amountMinor: AUDIT_FIX_PRICING.india.amount * 100,
  },
  international: {
    market: "international" as const,
    sku: "audit",
    /**
     * Product uses by_country with a US rule for the worldwide USD price.
     * Pin billing country to US so checkout resolves that localized amount.
     */
    billingCountry: "US" as const,
    currency: AUDIT_FIX_PRICING.international.currency,
    amountMinor: AUDIT_FIX_PRICING.international.amount * 100,
  },
} as const;

export function expectedAuditAmountMinor(market: AuditFixMarket): number {
  return AUDIT_CATALOG[market].amountMinor;
}

export function expectedAuditCurrency(market: AuditFixMarket): string {
  return AUDIT_CATALOG[market].currency;
}

/**
 * Soft amount check: paid total should be at least the list price.
 * Tax can push total above; reject suspiciously low totals.
 */
export function isAuditPaymentAmountPlausible(input: {
  market: AuditFixMarket;
  currency: string;
  totalAmountMinor: number;
}): boolean {
  const expected = expectedAuditAmountMinor(input.market);
  const currency = input.currency.toUpperCase();
  if (currency !== expectedAuditCurrency(input.market)) return false;
  return input.totalAmountMinor >= Math.floor(expected * 0.95);
}
