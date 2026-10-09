import Link from "next/link";

import { brand } from "@/components/Home/brand";
import { AUDIT_OFFER_NAME } from "@/components/pages/audits/offer/content";
import { Button } from "@/components/ui/button";
import {
  AUDIT_FIX_PROMPTS,
  AUDIT_FIX_TURNAROUND,
} from "@/lib/audit-fix-pricing";
import { verifyAuditPayment } from "@/lib/dodo/verify-audit-payment";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/audit/success",
  title: `Payment received · ${AUDIT_OFFER_NAME}`,
  description: `Thanks for ordering a ${AUDIT_OFFER_NAME}. We'll confirm payment and start within one business day.`,
  robots: { index: false, follow: false },
});

type SuccessSearchParams = {
  payment_id?: string | string[];
  status?: string | string[];
  email?: string | string[];
};

function first(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

/**
 * Return URL after Dodo hosted checkout.
 * Confirms payment via API when payment_id is present.
 * Fulfillment still comes from webhooks — this page is customer UX.
 */
export default async function AuditCheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<SuccessSearchParams>;
}) {
  const params = await searchParams;
  const paymentId = first(params.payment_id);
  const redirectStatus = (first(params.status) ?? "").toLowerCase();
  const redirectEmail = first(params.email);

  const verified = paymentId ? await verifyAuditPayment(paymentId) : null;

  const status = (verified?.status ?? redirectStatus).toLowerCase();
  const email = verified?.email ?? redirectEmail;
  const looksPaid =
    status === "succeeded" ||
    status === "success" ||
    status === "paid" ||
    status === "complete" ||
    status === "completed" ||
    (!status && Boolean(paymentId));

  return (
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      <section
        className="mx-auto w-full max-w-xl overflow-hidden rounded-2xl px-6 py-16 text-center sm:py-20"
        style={{ backgroundColor: brand.cream }}
        aria-labelledby="audit-success-heading"
      >
        <p
          className="text-sm font-semibold tracking-[0.08em] uppercase"
          style={{ color: brand.tertiary }}
        >
          {AUDIT_OFFER_NAME}
        </p>
        <h1
          id="audit-success-heading"
          className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
          style={{ color: brand.tertiary }}
        >
          {looksPaid ? "You're in. We'll start soon." : "Checking your payment"}
        </h1>
        <p
          className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed"
          style={{ color: brand.body }}
        >
          {looksPaid
            ? `We'll lock your ${AUDIT_FIX_PROMPTS}-prompt set and deliver the report in ${AUDIT_FIX_TURNAROUND}. A confirmation email follows from Dodo Payments.`
            : "If your bank is still authorizing, give it a minute — we'll email you once payment is confirmed."}
        </p>

        {(email || paymentId || verified?.invoiceUrl) && (
          <dl className="mx-auto mt-8 max-w-sm space-y-2 rounded-xl border border-zinc-900/10 bg-white/60 px-4 py-4 text-left text-sm">
            {email ? (
              <div className="flex justify-between gap-3">
                <dt className="font-medium text-zinc-500">Email</dt>
                <dd className="font-semibold text-zinc-900">{email}</dd>
              </div>
            ) : null}
            {verified?.market ? (
              <div className="flex justify-between gap-3">
                <dt className="font-medium text-zinc-500">Market</dt>
                <dd className="font-semibold capitalize text-zinc-900">
                  {verified.market}
                </dd>
              </div>
            ) : null}
            {paymentId ? (
              <div className="flex justify-between gap-3">
                <dt className="font-medium text-zinc-500">Payment</dt>
                <dd className="font-mono text-xs font-semibold text-zinc-900">
                  {paymentId}
                </dd>
              </div>
            ) : null}
            {verified?.invoiceUrl ? (
              <div className="pt-1">
                <a
                  href={verified.invoiceUrl}
                  className="text-sm font-semibold underline underline-offset-2"
                  style={{ color: brand.tertiary }}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download invoice
                </a>
              </div>
            ) : null}
          </dl>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-12 rounded-lg border border-zinc-900 bg-brand px-6 text-base font-semibold text-white hover:bg-emerald-50 hover:text-black"
            render={<Link href="/" />}
          >
            Back to home
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-zinc-900 px-6 text-base font-semibold"
            render={<Link href="/audit" />}
          >
            Back to Audit
          </Button>
        </div>

        <p className="mt-8 text-sm font-medium text-zinc-500">
          Questions?{" "}
          <a
            className="underline underline-offset-2 hover:text-zinc-800"
            href="mailto:hello@dodoxhq.com"
          >
            hello@dodoxhq.com
          </a>
        </p>
      </section>
    </main>
  );
}
