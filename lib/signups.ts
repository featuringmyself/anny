import type { Collection, WithId } from "mongodb";

import { getDb } from "@/lib/mongodb";

/**
 * Self-serve signup from `/register`.
 * Collection: `signups` — one document per email (upserted on resubmit).
 */
export type SignupDocument = {
  /** Work email, stored lowercase for stable lookup */
  email: string;
  company: string;
  /** Optional pricing tier from `?plan=` */
  plan?: string;
  status: "new" | "contacted" | "closed";
  createdAt: Date;
  updatedAt: Date;
};

export type Signup = WithId<SignupDocument>;
export type NewSignup = Omit<SignupDocument, "updatedAt"> & {
  updatedAt?: Date;
};

const COLLECTION = "signups";

let indexesRequested = false;

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

/**
 * Insert or refresh a signup by email. Returns the document id as a hex string.
 */
export async function upsertSignup(signup: {
  email: string;
  company: string;
  plan?: string;
}) {
  const collection = await signupsCollection();
  const now = new Date();

  const $set: Partial<SignupDocument> = {
    company: signup.company,
    updatedAt: now,
  };
  if (signup.plan) $set.plan = signup.plan;

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
}
