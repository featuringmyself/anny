import "server-only";

import { MongoServerError, type Collection, type WithId } from "mongodb";

import { bandForScore } from "@/components/pages/tools/domain-rating/bands";
import { getDb } from "@/lib/mongodb";

type LookupResult =
  | { domain_rating: number; ahrefs_rank?: number }
  | { error: string };

export const DOMAIN_RATING_CACHE_MS = 24 * 60 * 60 * 1000;

/**
 * Sites looked up through the Domain Rating checker.
 * Collection: `domain_rating_lookups` — one document per domain.
 *
 * Access pattern: upsert on each check; list by `lastSeenAt` for recent
 * activity; look up by `domain`.
 */
export type DomainRatingLookupDocument = {
  domain: string;
  lookupCount: number;
  lastStatus: "success" | "failed";
  lastDomainRating?: number;
  lastAhrefsRank?: number;
  lastBand?: string;
  lastError?: string;
  /** Last time Ahrefs was queried successfully */
  lastFetchedAt?: Date;
  firstSeenAt: Date;
  lastSeenAt: Date;
};

export type DomainRatingLookup = WithId<DomainRatingLookupDocument>;

const COLLECTION = "domain_rating_lookups";

let indexesRequested = false;

function ensureIndexes(collection: Collection<DomainRatingLookupDocument>) {
  if (indexesRequested) return;
  indexesRequested = true;

  void collection
    .createIndexes([
      { key: { domain: 1 }, name: "domain_unique", unique: true },
    ])
    .catch((error) => {
      indexesRequested = false;
      console.error("[domain-rating-lookups] index creation failed", error);
    });
}

async function lookupsCollection({
  withIndexes = false,
}: { withIndexes?: boolean } = {}) {
  const db = await getDb();
  const collection = db.collection<DomainRatingLookupDocument>(COLLECTION);
  if (withIndexes) ensureIndexes(collection);
  return collection;
}

export async function findFreshDomainRating(domain: string) {
  try {
    const collection = await lookupsCollection();
    const doc = await collection.findOne(
      { domain },
      {
        projection: {
          _id: 0,
          lastDomainRating: 1,
          lastAhrefsRank: 1,
          lastFetchedAt: 1,
          lastSeenAt: 1,
        },
      },
    );

    if (doc?.lastDomainRating == null) return null;

    const fetchedAt = doc.lastFetchedAt ?? doc.lastSeenAt;
    if (!fetchedAt || Date.now() - fetchedAt.getTime() >= DOMAIN_RATING_CACHE_MS) {
      return null;
    }

    return {
      domain_rating: doc.lastDomainRating,
      ...(doc.lastAhrefsRank != null
        ? { ahrefs_rank: doc.lastAhrefsRank }
        : {}),
    };
  } catch (error) {
    console.error("[domain-rating-lookups] cache read failed", error);
    return null;
  }
}

export async function touchDomainRatingLookup(domain: string) {
  const collection = await lookupsCollection();
  await collection.updateOne({ domain }, { $inc: { lookupCount: 1 } });
}

export async function recordDomainRatingLookup(
  domain: string,
  result: LookupResult,
) {
  const collection = await lookupsCollection({ withIndexes: true });
  const now = new Date();
  const success = !("error" in result);

  const $set: Partial<DomainRatingLookupDocument> = {
    lastSeenAt: now,
    lastStatus: success ? "success" : "failed",
  };

  if (success) {
    $set.lastDomainRating = result.domain_rating;
    $set.lastBand = bandForScore(result.domain_rating).label;
    $set.lastFetchedAt = now;
    if (result.ahrefs_rank != null) {
      $set.lastAhrefsRank = result.ahrefs_rank;
    }
  } else {
    $set.lastError = result.error;
  }

  try {
    await collection.updateOne(
      { domain },
      {
        $set,
        $inc: { lookupCount: 1 },
        $setOnInsert: {
          domain,
          firstSeenAt: now,
        },
        ...(success ? { $unset: { lastError: "" } } : {}),
      },
      { upsert: true },
    );
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      await collection.updateOne({ domain }, { $set, $inc: { lookupCount: 1 } });
      return;
    }

    throw error;
  }
}
