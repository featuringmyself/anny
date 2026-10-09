import "server-only";

import { getDodoClient } from "@/lib/dodo/client";
import { AUDIT_CHECKOUT_OFFER } from "@/lib/dodo/audit-catalog";

export type VerifiedAuditPayment = {
  paymentId: string;
  status: string;
  email?: string;
  customerName?: string;
  currency?: string;
  totalAmount?: number;
  market?: string;
  invoiceUrl?: string;
  isAuditOffer: boolean;
};

/**
 * Server-side payment lookup for the success page.
 * Uses payments:read — does not trust redirect query params alone.
 */
export async function verifyAuditPayment(
  paymentId: string,
): Promise<VerifiedAuditPayment | null> {
  try {
    const payment = await getDodoClient().payments.retrieve(paymentId);
    const metadata = (payment.metadata ?? {}) as Record<string, string>;
    return {
      paymentId: payment.payment_id,
      status: String(payment.status ?? "unknown"),
      email: payment.customer?.email,
      customerName: payment.customer?.name ?? undefined,
      currency: payment.currency,
      totalAmount: payment.total_amount,
      market: metadata.market,
      invoiceUrl: payment.invoice_url ?? undefined,
      isAuditOffer:
        !metadata.offer || metadata.offer === AUDIT_CHECKOUT_OFFER,
    };
  } catch (error) {
    console.error("[audit-verify] payment retrieve failed", {
      paymentId,
      error: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}
