import "server-only";

import type { Collection, WithId } from "mongodb";

import type { AuditFixMarket } from "@/lib/audit-fix-pricing";
import { getDb } from "@/lib/mongodb";

/**
 * Paid Audit order, fulfilled from Dodo `payment.succeeded` webhooks.
 * Collection: `audit_orders` — one document per `paymentId` (idempotent).
 */
export type AuditOrderStatus =
  | "paid"
  | "in_progress"
  | "delivered"
  | "refunded"
  | "failed";

export type AuditOrderDocument = {
  /** Dodo payment_id — unique */
  paymentId: string;
  checkoutSessionId?: string;
  customerId?: string;
  email: string;
  customerName?: string;
  company?: string;
  website?: string;
  notes?: string;
  market: AuditFixMarket;
  source?: string;
  productId?: string;
  currency: string;
  /** Amount in minor units (paise / cents), as returned by Dodo */
  totalAmount: number;
  status: AuditOrderStatus;
  invoiceUrl?: string;
  rawCustomFields?: Record<string, string>;
  createdAt: Date;
  updatedAt: Date;
  paidAt: Date;
};

export type AuditOrder = WithId<AuditOrderDocument>;

export type UpsertPaidAuditOrderInput = Omit<
  AuditOrderDocument,
  "status" | "createdAt" | "updatedAt" | "paidAt"
> & {
  paidAt?: Date;
};

const COLLECTION = "audit_orders";

let indexesRequested = false;

function ensureIndexes(collection: Collection<AuditOrderDocument>) {
  if (indexesRequested) return;
  indexesRequested = true;

  void collection
    .createIndexes([
      { key: { paymentId: 1 }, name: "paymentId_unique", unique: true },
      { key: { email: 1 }, name: "email_asc" },
      { key: { status: 1, createdAt: -1 }, name: "status_createdAt" },
      { key: { createdAt: -1 }, name: "createdAt_desc" },
    ])
    .catch((error) => {
      indexesRequested = false;
      console.error("[audit-orders] index creation failed", error);
    });
}

export async function auditOrdersCollection() {
  const db = await getDb();
  const collection = db.collection<AuditOrderDocument>(COLLECTION);
  ensureIndexes(collection);
  return collection;
}

/**
 * Idempotent upsert on paymentId. Safe under Dodo webhook retries.
 * Returns whether this call first recorded the paid order.
 */
export async function upsertPaidAuditOrder(
  input: UpsertPaidAuditOrderInput,
): Promise<{ inserted: boolean; order: AuditOrder }> {
  const collection = await auditOrdersCollection();
  const now = new Date();
  const paidAt = input.paidAt ?? now;

  const existing = await collection.findOne({ paymentId: input.paymentId });
  if (existing) {
    return { inserted: false, order: existing };
  }

  const doc: AuditOrderDocument = {
    ...input,
    email: input.email.trim().toLowerCase(),
    status: "paid",
    createdAt: now,
    updatedAt: now,
    paidAt,
  };

  try {
    const result = await collection.insertOne(doc);
    return {
      inserted: true,
      order: { ...doc, _id: result.insertedId },
    };
  } catch (error) {
    // Race: another webhook delivery inserted first.
    const raced = await collection.findOne({ paymentId: input.paymentId });
    if (raced) {
      return { inserted: false, order: raced };
    }
    throw error;
  }
}

export async function markAuditOrderRefunded(paymentId: string) {
  const collection = await auditOrdersCollection();
  const now = new Date();
  await collection.updateOne(
    { paymentId },
    { $set: { status: "refunded", updatedAt: now } },
  );
}
