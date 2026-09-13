import "server-only";

import { MongoServerError, type Collection, type WithId } from "mongodb";

import { getDb } from "@/lib/mongodb";

/**
 * Sites looked up through the AI crawlability checker.
 * Collection: `ai_crawlability_lookups`. One document per domain.
 */
export type AiCrawlabilityLookupDocument = {
  domain: string;
  origin?: string;
  lookupCount: number;
  lastStatus: "success" | "failed";
  lastScore?: number;
  lastBand?: string;
  lastAllowedCount?: number;
  lastBlockedCount?: number;
  lastRobotsPresent?: boolean;
  lastSitemapPresent?: boolean;
  lastLlmsPresent?: boolean;
  lastActionCount?: number;
  lastError?: string;
  firstSeenAt: Date;
  lastSeenAt: Date;
};

export type AiCrawlabilityLookup = WithId<AiCrawlabilityLookupDocument>;

export type AiCrawlabilityLookupWrite =
  | {
      domain: string;
      origin: string;
      score: number;
      band: string;
      allowedCount: number;
      blockedCount: number;
      robotsPresent: boolean;
      sitemapPresent: boolean;
      llmsPresent: boolean;
      actionCount: number;
    }
  | { domain: string; origin: string; error: string };

const COLLECTION = "ai_crawlability_lookups";

let indexesRequested = false;

function ensureIndexes(collection: Collection<AiCrawlabilityLookupDocument>) {
  if (indexesRequested) return;
  indexesRequested = true;

  void collection
    .createIndexes([
      { key: { domain: 1 }, name: "domain_unique", unique: true },
    ])
    .catch((error) => {
      indexesRequested = false;
      console.error("[ai-crawlability-lookups] index creation failed", error);
    });
}

async function lookupsCollection({
  withIndexes = false,
}: { withIndexes?: boolean } = {}) {
  const db = await getDb();
  const collection = db.collection<AiCrawlabilityLookupDocument>(COLLECTION);
  if (withIndexes) ensureIndexes(collection);
  return collection;
}

export async function recordAiCrawlabilityLookup(
  write: AiCrawlabilityLookupWrite,
) {
  const collection = await lookupsCollection({ withIndexes: true });
  const now = new Date();
  const success = !("error" in write);

  const $set: Partial<AiCrawlabilityLookupDocument> = {
    origin: write.origin,
    lastSeenAt: now,
    lastStatus: success ? "success" : "failed",
  };

  if (success) {
    $set.lastScore = write.score;
    $set.lastBand = write.band;
    $set.lastAllowedCount = write.allowedCount;
    $set.lastBlockedCount = write.blockedCount;
    $set.lastRobotsPresent = write.robotsPresent;
    $set.lastSitemapPresent = write.sitemapPresent;
    $set.lastLlmsPresent = write.llmsPresent;
    $set.lastActionCount = write.actionCount;
  } else {
    $set.lastError = write.error;
  }

  try {
    await collection.updateOne(
      { domain: write.domain },
      {
        $set,
        $inc: { lookupCount: 1 },
        $setOnInsert: {
          domain: write.domain,
          firstSeenAt: now,
        },
        ...(success ? { $unset: { lastError: "" } } : {}),
      },
      { upsert: true },
    );
  } catch (error) {
    if (error instanceof MongoServerError && error.code === 11000) {
      await collection.updateOne(
        { domain: write.domain },
        { $set, $inc: { lookupCount: 1 } },
      );
      return;
    }

    throw error;
  }
}
