"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { ReadinessReport } from "@/components/pages/audits/types";
import { AiReadinessFullReportView } from "@/components/pages/tools/ai-readiness/AiReadinessFullReportView";
import { AiReadinessReportGate } from "@/components/pages/tools/ai-readiness/AiReadinessReportGate";
import { AiReadinessReportPlaceholder } from "@/components/pages/tools/ai-readiness/AiReadinessReportPlaceholder";
import { AiReadinessScanProgress } from "@/components/pages/tools/ai-readiness/AiReadinessScanProgress";
import { mergeReportPartials } from "@/lib/ai-readiness-report-types";
import {
  SCAN_PHASE_LABELS,
  SCAN_PHASE_ORDER,
  type ScanPhaseId,
} from "@/lib/ai-readiness-scan-phases";
import type {
  AiReadinessScanStatus,
  ScanProgress,
} from "@/lib/ai-readiness-report-types";

type StreamEvent =
  | { type: "step_start"; phase: ScanPhaseId; label: string }
  | { type: "step_detail"; phase: ScanPhaseId; detail: string }
  | { type: "section_ready"; phase: ScanPhaseId; partial: Partial<ReadinessReport> }
  | { type: "step_done"; phase: ScanPhaseId; detail: string }
  | { type: "complete"; scan: ReadinessReport }
  | { type: "error"; message: string; phase?: ScanPhaseId };

function bootstrapSteps(steps?: ScanProgress["steps"]) {
  const byId = new Map(steps?.map((step) => [step.id, step]));
  return SCAN_PHASE_ORDER.map((id) => {
    const existing = byId.get(id);
    return (
      existing ?? {
        id,
        label: SCAN_PHASE_LABELS[id],
        status: "pending" as const,
      }
    );
  });
}

function patchProgress(
  prev: ScanProgress | undefined,
  patch: (steps: NonNullable<ScanProgress["steps"]>) => NonNullable<ScanProgress["steps"]>,
  completedPhases?: ScanPhaseId[],
): ScanProgress {
  const steps = patch(bootstrapSteps(prev?.steps));
  return {
    steps,
    completedPhases: completedPhases ?? prev?.completedPhases ?? [],
    startedAt: prev?.startedAt,
  };
}

type AiReadinessReportExperienceProps = {
  reportId: string;
  domain: string;
  score?: number;
  band?: string;
  unlocked: boolean;
  scanStatus?: AiReadinessScanStatus;
  initialScan?: ReadinessReport;
  initialPartial?: Partial<ReadinessReport>;
  initialProgress?: ScanProgress;
};

function ReportContextBar({
  domain,
  score,
  band,
  sticky = false,
  hidden = false,
}: {
  domain: string;
  score?: number;
  band?: string;
  sticky?: boolean;
  hidden?: boolean;
}) {
  if (hidden) return null;

  const company = domain.replace(/^www\./, "");
  const scoreLabel =
    score != null && band ? `${score}/100 · ${band}` : score != null ? `${score}/100` : null;

  return (
    <div
      className={`border-b bg-white/95 backdrop-blur-sm supports-backdrop-filter:bg-white/85 ${
        sticky ? "sticky top-0 z-20" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-4 px-6 py-3 md:px-10">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-zinc-900">{company}</p>
          <p className="truncate text-xs text-zinc-500">{domain}</p>
        </div>
        {scoreLabel ? (
          <p className="shrink-0 text-sm font-medium tabular-nums text-zinc-700">
            {scoreLabel}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export function AiReadinessReportExperience({
  reportId,
  domain,
  score,
  band,
  unlocked: initialUnlocked,
  scanStatus: initialScanStatus = "idle",
  initialScan,
  initialPartial,
  initialProgress,
}: AiReadinessReportExperienceProps) {
  const [unlocking, setUnlocking] = useState(false);
  const [scanStatus, setScanStatus] = useState(initialScanStatus);
  const [scanPartial, setScanPartial] = useState<Partial<ReadinessReport>>(
    initialScan ?? initialPartial ?? {},
  );
  const [finalScan, setFinalScan] = useState<ReadinessReport | undefined>(
    initialScan,
  );
  const [progress, setProgress] = useState<ScanProgress | undefined>(
    initialProgress,
  );
  const [scanError, setScanError] = useState<string | null>(null);
  const [streamKey, setStreamKey] = useState(0);
  const eventSourceRef = useRef<EventSource | null>(null);

  const locked = !initialUnlocked && !unlocking;
  const showGate = !initialUnlocked && !unlocking;
  const showStreaming = initialUnlocked || unlocking;
  const complete = scanStatus === "ready" && Boolean(finalScan ?? initialScan);

  const completedPhases = useMemo(
    () => progress?.completedPhases ?? [],
    [progress?.completedPhases],
  );

  const connectStream = useCallback(
    (resume = false) => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }

      const query = resume ? "?resume=1" : "";
      const url = `/api/v1/tools/ai-readiness-checker/report/${encodeURIComponent(reportId)}/stream${query}`;
    const source = new EventSource(url);
    eventSourceRef.current = source;
    setScanStatus("running");
    setProgress((prev) =>
      prev?.steps?.length
        ? prev
        : {
            steps: bootstrapSteps(),
            completedPhases: [],
            startedAt: new Date().toISOString(),
          },
    );

    source.onmessage = (event) => {
      let payload: StreamEvent;
      try {
        payload = JSON.parse(event.data) as StreamEvent;
      } catch {
        return;
      }

      if (payload.type === "step_start") {
        setScanStatus("running");
        setProgress((prev) =>
          patchProgress(prev, (steps) =>
            steps.map((step) =>
              step.id === payload.phase
                ? { ...step, status: "running" as const, label: payload.label }
                : step,
            ),
          ),
        );
      }

      if (payload.type === "step_detail") {
        setProgress((prev) =>
          patchProgress(prev, (steps) =>
            steps.map((step) =>
              step.id === payload.phase ? { ...step, detail: payload.detail } : step,
            ),
          ),
        );
      }

      if (payload.type === "section_ready") {
        setScanPartial((prev) => mergeReportPartials(prev, payload.partial));
        setProgress((prev) => {
          const completed = new Set(prev?.completedPhases ?? []);
          completed.add(payload.phase);
          return patchProgress(
            prev,
            (steps) =>
              steps.map((step) =>
                step.id === payload.phase
                  ? {
                      ...step,
                      status: "done" as const,
                      detail: step.detail,
                    }
                  : step,
              ),
            [...completed],
          );
        });
      }

      if (payload.type === "step_done") {
        setProgress((prev) =>
          patchProgress(prev, (steps) =>
            steps.map((step) =>
              step.id === payload.phase
                ? {
                    ...step,
                    status: "done" as const,
                    detail: payload.detail,
                  }
                : step,
            ),
          ),
        );
      }

      if (payload.type === "complete") {
        setFinalScan(payload.scan);
        setScanPartial(payload.scan);
        setScanStatus("ready");
        setScanError(null);
        source.close();
        eventSourceRef.current = null;
      }

      if (payload.type === "error") {
        setScanError(payload.message);
        setScanStatus("failed");
        if (payload.phase) {
          setProgress((prev) =>
            patchProgress(prev, (steps) =>
              steps.map((step) =>
                step.id === payload.phase
                  ? { ...step, status: "failed" as const, detail: payload.message }
                  : step,
              ),
            ),
          );
        }
        source.close();
        eventSourceRef.current = null;
      }
    };

    source.onerror = () => {
      if (source.readyState === EventSource.CLOSED) return;
      setScanError("Connection lost — tap Retry to continue.");
      setScanStatus("failed");
      source.close();
      eventSourceRef.current = null;
    };
  },
    [reportId],
  );

  useEffect(() => {
    if (!showStreaming) return;
    if (complete || initialScanStatus === "ready") return;
    if (scanStatus === "failed" && streamKey === 0) return;

    connectStream(streamKey > 0);

    return () => {
      eventSourceRef.current?.close();
      eventSourceRef.current = null;
    };
  }, [showStreaming, complete, initialScanStatus, scanStatus, streamKey, connectStream]);

  const handleRetry = () => {
    setScanError(null);
    setScanStatus("running");
    setStreamKey((value) => value + 1);
  };

  return (
    <main
      className={
        locked
          ? "flex h-dvh max-h-dvh min-h-dvh flex-col overflow-hidden"
          : "min-h-dvh overflow-anchor-none pb-16 md:pb-24"
      }
    >
      <ReportContextBar
        domain={domain}
        score={score}
        band={band}
        sticky={locked}
        hidden={showStreaming && !locked}
      />

      <div className={`relative min-h-0 flex-1 ${locked ? "overflow-hidden" : ""}`}>
        {locked ? (
          <>
            <div
              className="pointer-events-none select-none blur-[7px] saturate-[0.85] opacity-90 transition-[filter,opacity] duration-500 ease-out"
              aria-hidden
            >
              <AiReadinessReportPlaceholder
                domain={domain}
                score={score}
                band={band}
              />
            </div>
            {showGate ? (
              <AiReadinessReportGate
                reportId={reportId}
                onUnlockStart={() => setUnlocking(true)}
              />
            ) : null}
          </>
        ) : (
          <>
            <AiReadinessScanProgress
              domain={domain}
              progress={progress}
              complete={complete}
              failed={scanStatus === "failed"}
              onRetry={handleRetry}
            />
            <AiReadinessFullReportView
              reportId={reportId}
              domain={domain}
              quickScore={score}
              quickBand={band}
              partial={scanPartial}
              complete={complete}
              completedPhases={completedPhases}
            />
            {scanError ? (
              <p className="px-6 py-4 text-sm text-red-600 md:px-10" role="alert">
                {scanError}
              </p>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}
