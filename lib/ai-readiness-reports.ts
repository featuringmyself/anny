import "server-only";

import { randomBytes } from "crypto";

import type { ReadinessReport } from "@/components/pages/audits/types";
import { type Collection, type WithId } from "mongodb";

import {
  SCAN_PHASE_LABELS,
  SCAN_PHASE_ORDER,
  type ScanPhaseId,
} from "@/lib/ai-readiness-scan-phases";
import { mergeReportPartials } from "@/lib/ai-readiness-report-types";
import type {
  AiReadinessScanStatus,
  ScanProgress,
  ScanProgressStep,
  ScanStepStatus,
} from "@/lib/ai-readiness-report-types";
import { getDb } from "@/lib/mongodb";

export type AiReadinessReportStatus = "locked" | "unlocked";
export type {
  AiReadinessScanStatus,
  ScanProgress,
  ScanProgressStep,
  ScanStepStatus,
} from "@/lib/ai-readiness-report-types";
export { mergeReportPartials, CATEGORY_SECTIONS } from "@/lib/ai-readiness-report-types";

export type AiReadinessReportDocument = {
  /** URL-safe id (crypto.randomUUID) */
  id: string;
  domain: string;
  origin: string;
  email?: string;
  unlockedAt?: Date;
  accessToken?: string;
  quickScore?: number;
  quickBand?: string;
  status: AiReadinessReportStatus;
  createdAt: Date;
  scanStatus?: AiReadinessScanStatus;
  scanProgress?: ScanProgress;
  scanPartial?: Partial<ReadinessReport>;
  scan?: ReadinessReport;
  scannedAt?: Date;
  scanError?: string;
  pagesScanned?: number;
  scanRunnerId?: string | null;
  scanRunnerStartedAt?: Date;
};

export type AiReadinessReport = WithId<AiReadinessReportDocument>;

export const AR_REPORT_COOKIE = "ar_report";
export const AR_REPORT_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;

const COLLECTION = "ai_readiness_reports";
const SCAN_RUNNER_STALE_MS = 90_000;

let indexesRequested = false;

function ensureIndexes(collection: Collection<AiReadinessReportDocument>) {
  if (indexesRequested) return;
  indexesRequested = true;

  void collection
    .createIndexes([
      { key: { id: 1 }, name: "id_unique", unique: true },
      { key: { domain: 1, createdAt: -1 }, name: "domain_createdAt" },
      { key: { createdAt: -1 }, name: "createdAt_desc" },
    ])
    .catch((error) => {
      indexesRequested = false;
      console.error("[ai-readiness-reports] index creation failed", error);
    });
}

async function reportsCollection({ withIndexes = false } = {}) {
  const db = await getDb();
  const collection = db.collection<AiReadinessReportDocument>(COLLECTION);
  if (withIndexes) ensureIndexes(collection);
  return collection;
}

function generateAccessToken() {
  return randomBytes(32).toString("base64url");
}

export function createInitialScanProgress(): ScanProgress {
  return {
    steps: SCAN_PHASE_ORDER.map((id) => ({
      id,
      label: SCAN_PHASE_LABELS[id],
      status: "pending" as const,
    })),
    completedPhases: [],
    startedAt: new Date(),
  };
}

export type CreateAiReadinessReportInput = {
  domain: string;
  origin: string;
  quickScore?: number;
  quickBand?: string;
};

export async function createAiReadinessReport(input: CreateAiReadinessReportInput) {
  const collection = await reportsCollection({ withIndexes: true });
  const now = new Date();
  const id = crypto.randomUUID();

  const doc: AiReadinessReportDocument = {
    id,
    domain: input.domain,
    origin: input.origin,
    quickScore: input.quickScore,
    quickBand: input.quickBand,
    status: "locked",
    scanStatus: "idle",
    createdAt: now,
  };

  await collection.insertOne(doc);
  return doc;
}

export async function getAiReadinessReportById(id: string) {
  const collection = await reportsCollection();
  return collection.findOne({ id });
}

export type UnlockAiReadinessReportResult =
  | { ok: true; accessToken: string }
  | { ok: false; reason: "not_found" | "already_unlocked" };

export async function unlockAiReadinessReport(id: string, email: string) {
  const collection = await reportsCollection({ withIndexes: true });
  const report = await collection.findOne({ id });

  if (!report) {
    return { ok: false as const, reason: "not_found" as const };
  }

  if (report.status === "unlocked" && report.accessToken) {
    if (report.scanStatus !== "ready" && report.scanStatus !== "running") {
      await collection.updateOne(
        { id },
        {
          $set: {
            scanStatus: "running" as const,
            scanProgress: report.scanProgress ?? createInitialScanProgress(),
          },
        },
      );
    }
    return { ok: true as const, accessToken: report.accessToken };
  }

  const now = new Date();
  const accessToken = generateAccessToken();

  await collection.updateOne(
    { id },
    {
      $set: {
        email,
        unlockedAt: now,
        accessToken,
        status: "unlocked" as const,
        scanStatus: "running" as const,
        scanProgress: createInitialScanProgress(),
        scanPartial: {},
      },
      $unset: {
        scan: "",
        scannedAt: "",
        scanRunnerId: "",
        scanRunnerStartedAt: "",
        scanError: "",
      },
    },
  );

  return { ok: true as const, accessToken };
}

export function formatReportAccessCookie(id: string, token: string) {
  return `${id}:${token}`;
}

export function parseReportAccessCookie(value: string | undefined) {
  if (!value) return null;

  const separator = value.indexOf(":");
  if (separator <= 0) return null;

  const id = value.slice(0, separator);
  const token = value.slice(separator + 1);
  if (!id || !token) return null;

  return { id, token };
}

export function isReportAccessGranted(
  report: Pick<AiReadinessReportDocument, "id" | "status" | "accessToken">,
  cookie: { id: string; token: string } | null,
) {
  if (report.status !== "unlocked" || !report.accessToken || !cookie) {
    return false;
  }

  return cookie.id === report.id && cookie.token === report.accessToken;
}

export type ScanRunnerClaim = "run" | "watch" | "ready";

export async function claimScanRunner(
  reportId: string,
  runnerId: string,
): Promise<ScanRunnerClaim> {
  const collection = await reportsCollection();
  const report = await collection.findOne({ id: reportId });
  if (!report) return "watch";
  if (report.scanStatus === "ready") return "ready";

  const staleBefore = new Date(Date.now() - SCAN_RUNNER_STALE_MS);

  const claimed = await collection.findOneAndUpdate(
    {
      id: reportId,
      scanStatus: { $ne: "ready" },
      $or: [
        { scanRunnerId: { $exists: false } },
        { scanRunnerId: null },
        { scanRunnerId: runnerId },
        { scanRunnerStartedAt: { $lt: staleBefore } },
      ],
    },
    {
      $set: {
        scanRunnerId: runnerId,
        scanRunnerStartedAt: new Date(),
        scanStatus: "running",
      },
    },
    { returnDocument: "after" },
  );

  if (claimed && claimed.scanRunnerId === runnerId) {
    return "run";
  }

  return "watch";
}

export async function releaseScanRunner(reportId: string, runnerId: string) {
  const collection = await reportsCollection();
  await collection.updateOne(
    { id: reportId, scanRunnerId: runnerId },
    { $unset: { scanRunnerId: "", scanRunnerStartedAt: "" } },
  );
}

export async function updateScanStep(
  reportId: string,
  phase: ScanPhaseId,
  update: Partial<Pick<ScanProgressStep, "status" | "detail">>,
) {
  const collection = await reportsCollection();
  const report = await collection.findOne({ id: reportId });
  if (!report?.scanProgress) return;

  const steps = report.scanProgress.steps.map((step) =>
    step.id === phase ? { ...step, ...update } : step,
  );

  await collection.updateOne(
    { id: reportId },
    { $set: { "scanProgress.steps": steps } },
  );
}

export async function mergeScanPartial(
  reportId: string,
  partial: Partial<ReadinessReport>,
  options?: { pagesScanned?: number; phase?: ScanPhaseId; detail?: string },
) {
  const collection = await reportsCollection();
  const report = await collection.findOne({ id: reportId });
  if (!report) return null;

  const merged = mergeReportPartials(report.scanPartial ?? {}, partial);
  const completedPhases = new Set(report.scanProgress?.completedPhases ?? []);
  if (options?.phase) completedPhases.add(options.phase);

  const steps = (report.scanProgress?.steps ?? createInitialScanProgress().steps).map(
    (step) => {
      if (step.id === options?.phase && options.detail) {
        return { ...step, detail: options.detail };
      }
      if (options?.phase && step.id === options.phase && step.status === "running") {
        return { ...step, status: "done" as const, detail: options.detail ?? step.detail };
      }
      return step;
    },
  );

  await collection.updateOne(
    { id: reportId },
    {
      $set: {
        scanPartial: merged,
        pagesScanned: options?.pagesScanned ?? report.pagesScanned,
        scanProgress: {
          ...report.scanProgress,
          steps,
          completedPhases: [...completedPhases],
          startedAt: report.scanProgress?.startedAt ?? new Date(),
        },
      },
    },
  );

  return merged;
}

export async function markScanPhaseFailed(
  reportId: string,
  phase: ScanPhaseId,
  message: string,
) {
  const collection = await reportsCollection();
  const report = await collection.findOne({ id: reportId });
  if (!report?.scanProgress) return;

  const steps = report.scanProgress.steps.map((step) =>
    step.id === phase
      ? { ...step, status: "failed" as const, detail: message }
      : step,
  );

  await collection.updateOne(
    { id: reportId },
    {
      $set: {
        scanStatus: "failed" as const,
        scanError: message,
        scanProgress: { ...report.scanProgress, steps },
      },
    },
  );
}

export async function completeScan(
  reportId: string,
  scan: ReadinessReport,
  pagesScanned: number,
) {
  const collection = await reportsCollection();
  const report = await collection.findOne({ id: reportId });
  const steps = (report?.scanProgress?.steps ?? createInitialScanProgress().steps).map(
    (step) => ({
      ...step,
      status: "done" as const,
      detail: step.detail ?? SCAN_PHASE_LABELS[step.id],
    }),
  );

  await collection.updateOne(
    { id: reportId },
    {
      $set: {
        scanStatus: "ready" as const,
        scan,
        scanPartial: scan,
        scannedAt: new Date(),
        pagesScanned,
        scanProgress: {
          steps,
          completedPhases: [...SCAN_PHASE_ORDER],
          startedAt: report?.scanProgress?.startedAt ?? new Date(),
        },
      },
      $unset: {
        scanRunnerId: "",
        scanRunnerStartedAt: "",
        scanError: "",
      },
    },
  );
}

export async function resumeFailedScan(reportId: string) {
  const collection = await reportsCollection();
  const report = await collection.findOne({ id: reportId });
  if (!report || report.scanStatus !== "failed") return;

  const steps = (report.scanProgress?.steps ?? createInitialScanProgress().steps).map(
    (step) =>
      step.status === "failed"
        ? { ...step, status: "pending" as const, detail: undefined }
        : step,
  );

  await collection.updateOne(
    { id: reportId },
    {
      $set: {
        scanStatus: "running" as const,
        scanProgress: {
          ...report.scanProgress,
          steps,
          completedPhases: report.scanProgress?.completedPhases ?? [],
        },
      },
      $unset: {
        scanRunnerId: "",
        scanRunnerStartedAt: "",
        scanError: "",
      },
    },
  );
}

export async function resetScanForRetry(reportId: string) {
  const collection = await reportsCollection();
  await collection.updateOne(
    { id: reportId, scanStatus: { $ne: "ready" } },
    {
      $set: {
        scanStatus: "running" as const,
        scanProgress: createInitialScanProgress(),
      },
      $unset: {
        scanRunnerId: "",
        scanRunnerStartedAt: "",
        scanError: "",
      },
    },
  );
}
