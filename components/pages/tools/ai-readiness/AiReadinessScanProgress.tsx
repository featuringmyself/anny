"use client";

import { useMemo } from "react";

import {
  SCAN_PHASE_LABELS,
  SCAN_PHASE_ORDER,
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
      <div className="rounded-2xl border border-[#225864]/12 bg-white/95 px-6 py-2.5 backdrop-blur-sm md:px-10">
        <p className="text-sm text-[#5c6b73]">
          Report ready ·{" "}
          <span className="font-medium text-[#225864]">{company}</span>
        </p>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-30 rounded-2xl border border-[#225864]/12 bg-white/95 backdrop-blur-sm supports-backdrop-filter:bg-white/85">
      <div className="px-6 py-3 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-[#225864]">
              {failed
                ? "Scan interrupted"
                : runningStep?.label ?? "Starting deep scan"}
            </p>
            {runningStep?.detail && !failed ? (
              <p className="mt-0.5 truncate font-mono text-xs text-[#5c6b73]">
                {runningStep.detail}
              </p>
            ) : (
              <p className="mt-0.5 truncate text-xs text-[#5c6b73]">{domain}</p>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="font-mono text-xs tabular-nums text-[#225864]/55">
              {doneCount}/{steps.length}
            </span>
            {failed && onRetry ? (
              <button
                type="button"
                onClick={onRetry}
                className="text-xs font-medium text-[#225864] hover:underline"
              >
                Retry
              </button>
            ) : null}
          </div>
        </div>

        <div
          className="mt-2.5 h-0.5 overflow-hidden rounded-full bg-[#225864]/10"
          role="progressbar"
          aria-valuenow={progressPct}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Scan progress"
        >
          <div
            className={cn(
              "h-full rounded-full transition-all duration-500 ease-out",
              failed ? "bg-red-500" : "bg-[#225864]",
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
                step.status === "done" && "text-[#225864]",
                step.status === "running" && "text-[#11333c]",
                step.status === "failed" && "text-[#b42318]",
                step.status === "pending" && "text-[#225864]/30",
              )}
            >
              {step.status === "done"
                ? "✓ "
                : step.status === "running"
                  ? "→ "
                  : ""}
              {step.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
