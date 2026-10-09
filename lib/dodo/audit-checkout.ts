import "server-only";

import type { AuditFixMarket } from "@/lib/audit-fix-pricing";
import {
  AUDIT_CATALOG,
  AUDIT_CHECKOUT_OFFER,
} from "@/lib/dodo/audit-catalog";
import { getDodoClient } from "@/lib/dodo/client";
import { getAuditProductId } from "@/lib/dodo/config";
import { absoluteUrl } from "@/lib/seo";

export { AUDIT_CHECKOUT_OFFER } from "@/lib/dodo/audit-catalog";

export type CreateAuditCheckoutInput = {
  market: AuditFixMarket;
  /** CTA attribution, e.g. audit-offer-pricing-india */
  source: string;
};

export type AuditCheckoutSession = Awaited<
  ReturnType<ReturnType<typeof getDodoClient>["checkoutSessions"]["create"]>
>;

/**
 * Creates a single-use hosted checkout for the Audit offer.
 * One product; market selects billing country/currency so Dodo localized
 * pricing (by_country) resolves India INR vs US/worldwide USD.
 */
export async function createAuditCheckoutSession(
  input: CreateAuditCheckoutInput,
): Promise<AuditCheckoutSession> {
  const productId = getAuditProductId();
  const catalog = AUDIT_CATALOG[input.market];
  const client = getDodoClient();

  return client.checkoutSessions.create({
    product_cart: [{ product_id: productId, quantity: 1 }],
    return_url: absoluteUrl("/audit/success"),
    cancel_url: absoluteUrl("/audit#pricing"),
    billing_currency: catalog.currency,
    billing_address: {
      country: catalog.billingCountry,
    },
    metadata: {
      offer: AUDIT_CHECKOUT_OFFER,
      market: input.market,
      source: input.source,
      product_id: productId,
      sku: catalog.sku,
      billing_country: catalog.billingCountry,
    },
    custom_fields: [
      {
        key: "company_name",
        label: "Company name",
        field_type: "text",
        required: true,
        placeholder: "Acme Inc",
      },
      {
        key: "website",
        label: "Website",
        field_type: "url",
        required: true,
        placeholder: "https://example.com",
      },
      {
        key: "brief_notes",
        label: "Competitors or buyer prompts (optional)",
        field_type: "text",
        required: false,
        placeholder: "Who you compete with, markets, prompts you care about",
      },
    ],
    feature_flags: {
      allow_discount_code: true,
      allow_phone_number_collection: true,
      /** Keep the market toggle in control of currency */
      allow_currency_selection: false,
      allow_tax_id: input.market === "india",
      redirect_immediately: true,
    },
    customization: {
      theme: "light",
      show_order_details: true,
      force_language: "en",
    },
  });
}
