import "server-only";

import { MongoServerError, type Collection, type WithId } from "mongodb";

import { bandForScore } from "@/components/pages/tools/ai-readiness/bands";
import { getDb } from "@/lib/mongodb";

/**
 * Minimal write shape for the AI readiness Data Access Layer.
 * Do not pass the full scan (snippets, HTML-derived checks) into Mongo.
 */
export type AiReadinessLookupWrite =
  | {
      domain: string;
      origin: string;
      status: "success";
      score: number;
      summary: string;
      actionIds: string[];
      failedCheckIds: string[];
      passed: number;
      warned: number;
      failed: number;
    }
  | {
      domain: string;
      origin: string;
      status: "failed";
      error: string;
    };

/**
 * Domains scanned through the AI readiness checker.
 * Collection: `ai_readiness_lookups` — one document per domain.
 *
 * Access pattern: upsert on each check; look up by `domain`;
 * list recent activity by `lastSeenAt`.
 */
export type AiReadinessLookupDocument = {
  domain: string;
  origin: string;
  lookupCount: number;
  lastStatus: "success" | "failed";
  lastScore?: number;
  lastBand?: string;
  lastSummary?: string;
  lastActionCount?: number;
  lastActionIds?: string[];
  lastFailedChecks?: string[];
  lastPassed?: number;
  lastWarned?: number;
  lastFailed?: number;
  lastError?: string;
  lastFetchedAt?: Date;
  firstSeenAt: Date;
  lastSeenAt: Date;
};

export type AiReadinessLookup = WithId<AiReadinessLookupDocument>;

const COLLECTION = "ai_readiness_lookups";

let indexesRequested = false;

function ensureIndexes(collection: Collection<AiReadinessLookupDocument>) {
  if (indexesRequested) return;
  indexesRequested = true;

  void collection
    .createIndexes([
      { key: { domain: 1 }, name: "domain_unique", unique: true },
      { key: { lastSeenAt: -1 }, name: "lastSeenAt_desc" },
    ])
    .catch((error) => {
      indexesRequested = false;
      console.error("[ai-readiness-lookups] index creation failed", error);
    });
}

async function lookupsCollection({
  withIndexes = false,
}: { withIndexes?: boolean } = {}) {
  const db = await getDb();
  const collection = db.collection<AiReadinessLookupDocument>(COLLECTION);
  if (withIndexes) ensureIndexes(collection);
  return collection;
}

export async function recordAiReadinessLookup(write: AiReadinessLookupWrite) {
  const collection = await lookupsCollection({ withIndexes: true });
  const now = new Date();
  const success = write.status === "success";

  const $set: Partial<AiReadinessLookupDocument> = {
    origin: write.origin,
    lastSeenAt: now,
    lastStatus: write.status,
  };

  if (success) {
    $set.lastScore = write.score;
    $set.lastBand = bandForScore(write.score).label;
    $set.lastSummary = write.summary;
    $set.lastActionCount = write.actionIds.length;
    $set.lastActionIds = write.actionIds;
    $set.lastFailedChecks = write.failedCheckIds;
    $set.lastPassed = write.passed;
    $set.lastWarned = write.warned;
    $set.lastFailed = write.failed;
    $set.lastFetchedAt = now;
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
