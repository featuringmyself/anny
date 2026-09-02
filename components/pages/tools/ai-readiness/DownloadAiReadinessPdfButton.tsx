"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

type DownloadAiReadinessPdfButtonProps = {
  reportId: string;
  company: string;
  ready: boolean;
  className?: string;
};

type Status = "idle" | "pending" | "done" | "error";

function SpinnerGlyph() {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" aria-hidden>
      <motion.g
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.7,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        }}
        style={{ transformOrigin: "8px 8px" }}
      >
        <circle
          cx="8"
          cy="8"
          r="5.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.25"
          strokeWidth="1.5"
        />
        <circle
          cx="8"
          cy="8"
          r="5.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="10 24"
        />
      </motion.g>
    </svg>
  );
}

export function DownloadAiReadinessPdfButton({
  reportId,
  company,
  ready,
  className,
}: DownloadAiReadinessPdfButtonProps) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");

  async function handleDownload() {
    if (!ready || status === "pending") return;
    setStatus("pending");

    try {
      const res = await fetch(
        `/api/v1/tools/ai-readiness-checker/report/${encodeURIComponent(reportId)}/pdf`,
      );
      if (!res.ok) throw new Error(`PDF request failed (${res.status})`);

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `ai-readiness-${reportId}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch (error) {
      console.error(error);
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const label = !ready
    ? "Building…"
    : status === "pending"
      ? "Preparing PDF"
      : status === "done"
        ? "Saved"
        : status === "error"
          ? "Try again"
          : "Download PDF";

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <motion.button
        type="button"
        onClick={handleDownload}
        disabled={!ready || status === "pending"}
        title={!ready ? "Report still building" : undefined}
        aria-busy={status === "pending"}
        aria-label={ready ? "Download PDF report" : "PDF available when scan completes"}
        className={cn(
          "relative inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs font-medium select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2462ff]/35 focus-visible:ring-offset-2",
          !ready || status === "pending"
            ? "cursor-not-allowed bg-zinc-200 text-zinc-500"
            : status === "error"
              ? "bg-red-600 text-white"
              : status === "done"
                ? "bg-emerald-600 text-white"
                : "bg-[#2462ff] text-white",
        )}
      >
        {status === "pending" ? <SpinnerGlyph /> : null}
        <span className="tabular-nums">{label}</span>
      </motion.button>
      {!ready ? (
        <span className="sr-only">Report still building</span>
      ) : null}
    </div>
  );
}
