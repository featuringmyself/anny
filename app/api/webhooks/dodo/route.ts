import { Webhooks } from "@dodopayments/nextjs";

import {
  fulfillAuditPaymentSucceeded,
  handleAuditPaymentFailed,
  handleAuditRefundSucceeded,
} from "@/lib/dodo/fulfill-audit-payment";

/**
 * Dodo Payments webhooks.
 * Dashboard endpoint: https://www.dodoxhq.com/api/webhooks/dodo
 * Fulfillment is webhook-driven — never trust the browser redirect alone.
 *
 * Env: DODO_PAYMENTS_WEBHOOK_KEY (signing secret from Developer → Webhooks)
 */
export const POST = Webhooks({
  webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY ?? "",
  onPaymentSucceeded: async (payload) => {
    const payment = payload.data;
    await fulfillAuditPaymentSucceeded({
      payment_id: payment.payment_id,
      checkout_session_id: payment.checkout_session_id,
      customer: payment.customer,
      metadata: payment.metadata as Record<string, string> | null | undefined,
      custom_field_responses: payment.custom_field_responses,
      currency: payment.currency,
      total_amount: payment.total_amount,
      invoice_url: payment.invoice_url,
      product_cart: payment.product_cart,
    });
  },
  onPaymentFailed: async (payload) => {
    await handleAuditPaymentFailed({
      payment_id: payload.data.payment_id,
      customer: payload.data.customer,
      metadata: payload.data.metadata as
        | Record<string, string>
        | null
        | undefined,
      currency: payload.data.currency,
    });
  },
  onRefundSucceeded: async (payload) => {
    const paymentId = payload.data.payment_id;
    if (paymentId) {
      await handleAuditRefundSucceeded(paymentId);
    }
  },
});
