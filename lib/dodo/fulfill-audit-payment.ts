import "server-only";

import {
  upsertPaidAuditOrder,
  markAuditOrderRefunded,
} from "@/lib/audit-orders";
import type { AuditFixMarket } from "@/lib/audit-fix-pricing";
import {
  AUDIT_CHECKOUT_OFFER,
  isAuditPaymentAmountPlausible,
} from "@/lib/dodo/audit-catalog";
import { isKnownAuditProductId } from "@/lib/dodo/config";
import { insertSalesLead } from "@/lib/sales-leads";
import {
  identifyProperties,
  personlessProperties,
} from "@/lib/posthog-identity";
import { getPostHogClient } from "@/lib/posthog-server";

type CustomFieldResponse = { key: string; value: string };

type PaymentLike = {
  payment_id: string;
  checkout_session_id?: string | null;
  customer?: {
    customer_id?: string;
    email?: string;
    name?: string | null;
  } | null;
  metadata?: Record<string, string> | null;
  custom_field_responses?: CustomFieldResponse[] | null;
  currency?: string | null;
  total_amount?: number | null;
  invoice_url?: string | null;
  product_cart?: Array<{ product_id: string }> | null;
};

function fieldMap(
  responses: CustomFieldResponse[] | null | undefined,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const row of responses ?? []) {
    if (row?.key && typeof row.value === "string") {
      out[row.key] = row.value.trim();
    }
  }
  return out;
}

function resolveMarket(
  metadata: Record<string, string> | null | undefined,
): AuditFixMarket | null {
  const market = metadata?.market;
  if (market === "india" || market === "international") return market;
  return null;
}

/**
 * Persist a paid Audit order from a verified `payment.succeeded` webhook.
 * Idempotent on payment_id. Returns whether this delivery first recorded it.
 */
export async function fulfillAuditPaymentSucceeded(
  payment: PaymentLike,
): Promise<{ handled: boolean; inserted: boolean }> {
  const metadata = payment.metadata ?? {};

  // Ignore non-Audit payments on a shared webhook endpoint.
  if (metadata.offer && metadata.offer !== AUDIT_CHECKOUT_OFFER) {
    return { handled: false, inserted: false };
  }

  const email = payment.customer?.email?.trim();
  if (!email || !payment.payment_id) {
    console.error("[audit-fulfill] missing email or payment_id", {
      paymentId: payment.payment_id,
    });
    return { handled: true, inserted: false };
  }

  const market = resolveMarket(metadata);
  if (!market) {
    // Only fulfill when we know this is our Audit offer.
    if (metadata.offer === AUDIT_CHECKOUT_OFFER) {
      console.error("[audit-fulfill] audit payment missing market metadata", {
        paymentId: payment.payment_id,
      });
    }
    return { handled: Boolean(metadata.offer), inserted: false };
  }

  const productId =
    metadata.product_id || payment.product_cart?.[0]?.product_id;

  if (!productId || !isKnownAuditProductId(productId)) {
    console.error("[audit-fulfill] missing or unexpected product_id", {
      paymentId: payment.payment_id,
      productId,
    });
    return { handled: true, inserted: false };
  }

  const currency = (payment.currency ?? "").toUpperCase();
  const totalAmount = payment.total_amount ?? 0;
  if (
    !isAuditPaymentAmountPlausible({
      market,
      currency,
      totalAmountMinor: totalAmount,
    })
  ) {
    console.error("[audit-fulfill] amount/currency mismatch", {
      paymentId: payment.payment_id,
      market,
      currency,
      totalAmount,
    });
    // Still record — ops should investigate; do not silently drop paid money.
  }

  const fields = fieldMap(payment.custom_field_responses);

  const { inserted, order } = await upsertPaidAuditOrder({
    paymentId: payment.payment_id,
    checkoutSessionId: payment.checkout_session_id ?? undefined,
    customerId: payment.customer?.customer_id,
    email,
    customerName: payment.customer?.name ?? undefined,
    company: fields.company_name || undefined,
    website: fields.website || undefined,
    notes: fields.brief_notes || undefined,
    market,
    source: metadata.source,
    productId,
    currency: currency || "USD",
    totalAmount,
    invoiceUrl: payment.invoice_url ?? undefined,
    rawCustomFields: Object.keys(fields).length ? fields : undefined,
  });

  if (inserted) {
    console.info("[audit-fulfill] order recorded", {
      paymentId: order.paymentId,
      market: order.market,
      email: order.email,
      totalAmount: order.totalAmount,
      currency: order.currency,
    });

    // Surface in the existing sales queue so ops sees paid Audits immediately.
    try {
      await insertSalesLead({
        name: order.customerName?.trim() || order.email,
        email: order.email,
        company: order.company?.trim() || "—",
        website: order.website,
        message: [
          `PAID Audit (${order.market})`,
          `payment_id=${order.paymentId}`,
          order.notes ? `notes=${order.notes}` : null,
          order.invoiceUrl ? `invoice=${order.invoiceUrl}` : null,
        ]
          .filter(Boolean)
          .join("\n"),
        source: `audit-paid:${order.source || order.market}`,
        status: "new",
        createdAt: new Date(),
      });
    } catch (error) {
      console.error("[audit-fulfill] sales lead insert failed", error);
    }

    const posthog = getPostHogClient();
    if (posthog) {
      posthog.identify({
        distinctId: order.paymentId,
        properties: identifyProperties({
          email: order.email,
          name: order.customerName,
          company: order.company,
        }),
      });
      posthog.capture({
        distinctId: order.paymentId,
        event: "audit_checkout_paid",
        properties: {
          market: order.market,
          source: order.source,
          currency: order.currency,
          total_amount: order.totalAmount,
          has_website: Boolean(order.website),
          has_company: Boolean(order.company),
        },
      });
      await posthog.flush();
    }
  }

  return { handled: true, inserted };
}

export async function handleAuditPaymentFailed(payment: PaymentLike) {
  const metadata = payment.metadata ?? {};
  if (metadata.offer && metadata.offer !== AUDIT_CHECKOUT_OFFER) return;

  const posthog = getPostHogClient();
  if (posthog && payment.payment_id) {
    posthog.capture({
      distinctId: payment.payment_id,
      event: "audit_checkout_failed",
      properties: personlessProperties({
        market: metadata.market,
        source: metadata.source,
        currency: payment.currency,
      }),
    });
    await posthog.flush();
  }
}

export async function handleAuditRefundSucceeded(paymentId: string) {
  await markAuditOrderRefunded(paymentId);
}
