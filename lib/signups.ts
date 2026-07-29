import "server-only";

import { MongoServerError, type Collection, type WithId } from "mongodb";

import { getDb } from "@/lib/mongodb";
import type { RegisterPlan } from "@/lib/plans";

/**
 * Self-serve signup from `/register`.
 * Collection: `signups` — one document per email (upserted on resubmit).
 *
 * Access pattern: upsert on submit; list/filter by `createdAt` and `status`
 * for a sales queue; look up by `email` when following up.
 */
export type SignupDocument = {
  /** Work email, stored lowercase for stable lookup */
  email: string;
  company: string;
  /** Optional pricing tier from `?plan=` */
  plan?: RegisterPlan;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
};

export type Signup = WithId<SignupDocument>;

const COLLECTION = "signups";

let indexesRequested = false;

/**
 * Best-effort index creation. Deliberately not awaited by writes: losing a
 * signup because an index couldn't be built would be worse than a slow query.
 *
 * Indexes match the expected access patterns (email lookup, status queue).
 */
function ensureIndexes(collection: Collection<SignupDocument>) {
  if (indexesRequested) return;
  indexesRequested = true;

  void collection
    .createIndexes([
      { key: { email: 1 }, name: "email_unique", unique: true },
      { key: { createdAt: -1 }, name: "createdAt_desc" },
      { key: { status: 1, createdAt: -1 }, name: "status_createdAt" },
    ])
    .catch((error) => {
      indexesRequested = false;
      console.error("[signups] index creation failed", error);
    });
}

export async function signupsCollection() {
  const db = await getDb();
  const collection = db.collection<SignupDocument>(COLLECTION);
  ensureIndexes(collection);
  return collection;
}

type UpsertSignupInput = {
  email: string;
  company: string;
  plan?: RegisterPlan;
};

/**
 * Insert or refresh a signup by email. Returns the document id as a hex string.
 * Handles concurrent upsert races against the unique email index (MongoDB 11000).
 */
export async function upsertSignup(signup: UpsertSignupInput) {
  const collection = await signupsCollection();
  const now = new Date();

  const $set: Pick<SignupDocument, "company" | "updatedAt"> &
    Partial<Pick<SignupDocument, "plan">> = {
    company: signup.company,
    updatedAt: now,
  };
  if (signup.plan) $set.plan = signup.plan;

  try {
    const result = await collection.findOneAndUpdate(
      { email: signup.email },
      {
        $set,
        $setOnInsert: {
          email: signup.email,
          status: "new" as const,
          createdAt: now,
        },
      },
      { upsert: true, returnDocument: "after" },
    );

    if (!result?._id) {
      throw new Error("Failed to upsert signup.");
    }

    return result._id.toHexString();
  } catch (error) {
    // Two concurrent first-time inserts can race the unique index.
    if (error instanceof MongoServerError && error.code === 11000) {
      const result = await collection.findOneAndUpdate(
        { email: signup.email },
        { $set },
        { returnDocument: "after" },
      );

      if (!result?._id) {
        throw new Error("Failed to resolve signup after duplicate-key race.");
      }

      return result._id.toHexString();
    }

    throw error;
  }
}
