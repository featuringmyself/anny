import type { Collection, WithId } from "mongodb";

import { getDb } from "@/lib/mongodb";

/**
 * Sales lead from a "Talk to sales" CTA.
 * Collection: `sales_leads` — one document per submission.
 *
 * Access pattern: insert on submit; list/filter by `createdAt` and `status`
 * for a sales queue; look up by `email` when following up.
 */
export type SalesLeadDocument = {
  /** Full name */
  name: string;
  /** Work email, stored lowercase for stable lookup */
  email: string;
  company: string;
  /** Optional company site / domain */
  website?: string;
  /** Optional free-text context from the lead */
  message?: string;
  /** CTA attribution, e.g. `home-hero`, `navbar-desktop` */
  source: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
};

export type SalesLead = WithId<SalesLeadDocument>;
export type NewSalesLead = SalesLeadDocument;

const COLLECTION = "sales_leads";

let indexesReady: Promise<void> | null = null;

async function ensureIndexes(collection: Collection<SalesLeadDocument>) {
  if (!indexesReady) {
    indexesReady = collection
      .createIndexes([
        { key: { createdAt: -1 }, name: "createdAt_desc" },
        { key: { email: 1 }, name: "email_asc" },
        { key: { status: 1, createdAt: -1 }, name: "status_createdAt" },
      ])
      .then(() => undefined)
      .catch((error) => {
        // Allow retries on the next request if index creation fails once.
        indexesReady = null;
        throw error;
      });
  }
  await indexesReady;
}

export async function salesLeadsCollection() {
  const db = await getDb();
  const collection = db.collection<SalesLeadDocument>(COLLECTION);
  await ensureIndexes(collection);
  return collection;
}

export async function insertSalesLead(lead: NewSalesLead) {
  const collection = await salesLeadsCollection();
  const result = await collection.insertOne(lead);
  return result.insertedId;
}
