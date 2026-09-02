"use client";

import { useMemo } from "react";

import {
  SCAN_PHASE_LABELS,
  SCAN_PHASE_ORDER,
  type ScanPhaseId,
} from "@/lib/ai-readiness-scan-phases";
import type {
  ScanProgress,
  ScanProgressStep,
} from "@/lib/ai-readiness-report-types";
import { cn } from "@/lib/utils";

type AiReadinessScanProgressProps = {
  domain: string;
  progress?: ScanProgress;
  complete: boolean;
  failed?: boolean;
  onRetry?: () => void;
};

function ensureSteps(progress?: ScanProgress): ScanProgressStep[] {
  const byId = new Map(progress?.steps.map((step) => [step.id, step]));
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

export function AiReadinessScanProgress({
  domain,
  progress,
  complete,
  failed,
  onRetry,
}: AiReadinessScanProgressProps) {
  const company = domain.replace(/^www\./, "");

  const steps = useMemo(() => ensureSteps(progress), [progress?.steps]);

  const doneCount = steps.filter((step) => step.status === "done").length;
  const runningStep =
    steps.find((step) => step.status === "running") ??
    steps.find((step) => step.status === "pending");
  const progressPct = Math.round((doneCount / steps.length) * 100);

  if (complete) {
    return (
      <div className="border-b bg-white/95 px-6 py-2.5 backdrop-blur-sm md:px-10">
        <p className="text-sm text-zinc-600">
          Report ready ·{" "}
          <span className="font-medium text-zinc-900">{company}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-30 border-b bg-white/95 backdrop-blur-sm supports-backdrop-filter:bg-white/85">
      <div className="px-6 py-3 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-zinc-900">
              {failed
                ? "Scan interrupted"
                : runningStep?.label ?? "Starting deep scan"}
            </p>
            {runningStep?.detail && !failed ? (
              <p className="mt-0.5 truncate font-mono text-xs text-zinc-500">
                {runningStep.detail}
              </p>
            ) : (
              <p className="mt-0.5 truncate text-xs text-zinc-500">{domain}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-xs tabular-nums text-zinc-400">
              {doneCount}/{steps.length}
            </span>
            {failed && onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="text-xs font-medium text-[#2462ff] hover:underline"
              >
                Retry
              </button>
            ) : null}
          </div>
        </div>

        <div
          className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-zinc-100"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Scan progress"
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              failed ? "bg-red-400" : "bg-[#2462ff]",
            )}
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <ul className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1">
          {steps.map((step) => (
            <li
              key={step.id}
              className={cn(
                "font-mono text-[10px] tracking-wide uppercase",
                step.status === "done" && "text-emerald-600",
                step.status === "running" && "text-zinc-900",
                step.status === "failed" && "text-red-600",
                step.status === "pending" && "text-zinc-300",
              )}
            >
              {step.status === "done" ? "✓ " : step.status === "running" ? "→ " : ""}
              {step.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
