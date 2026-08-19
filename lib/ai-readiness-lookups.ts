import "server-only";

import { MongoServerError, type Collection, type WithId } from "mongodb";

import { bandForScore } from "@/components/pages/tools/ai-readiness/bands";
import type { AiReadinessReport } from "@/lib/ai-readiness";
import { getDb } from "@/lib/mongodb";

type LookupResult = AiReadinessReport | { error: string };

/**
 * Domains scanned through the AI readiness checker.
 * Collection: `ai_readiness_lookups` — one document per domain.
 *
 * Access pattern: upsert on each check; look up by `domain`.
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
    .createIndexes([{ key: { domain: 1 }, name: "domain_unique", unique: true }])
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

export async function recordAiReadinessLookup(
  domain: string,
  origin: string,
  result: LookupResult,
) {
  const collection = await lookupsCollection({ withIndexes: true });
  const now = new Date();
  const success = !("error" in result);

  const $set: Partial<AiReadinessLookupDocument> = {
    origin,
    lastSeenAt: now,
    lastStatus: success ? "success" : "failed",
  };

  if (success) {
    $set.lastScore = result.score;
    $set.lastBand = bandForScore(result.score).label;
    $set.lastSummary = result.summary;
    $set.lastActionCount = result.actions.length;
    $set.lastActionIds = result.actions.map((action) => action.id);
    $set.lastFailedChecks = result.checks
      .filter((check) => check.status === "fail")
      .map((check) => check.id);
    $set.lastPassed = result.passed;
    $set.lastWarned = result.warned;
    $set.lastFailed = result.failed;
    $set.lastFetchedAt = now;
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
      await collection.updateOne(
        { domain },
        { $set, $inc: { lookupCount: 1 } },
      );
      return;
    }

    throw error;
  }
}
