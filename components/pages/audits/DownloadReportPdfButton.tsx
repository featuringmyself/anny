"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Download, LoaderCircle } from "lucide-react";
import posthog from "posthog-js";

import { cn } from "@/lib/utils";

type DownloadReportPdfButtonProps = {
  slug: string;
  company: string;
  /** Analytics only — API resolves report kind from slug. */
  kind?: "visibility" | "readiness";
  className?: string;
};

type Status = "idle" | "pending" | "done" | "error";

export default function DownloadReportPdfButton({
  slug,
  company,
  kind = "visibility",
  className,
}: DownloadReportPdfButtonProps) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");

  async function handleDownload() {
    if (status === "pending") return;
    setStatus("pending");

    try {
      posthog.capture("audit_pdf_download_clicked", {
        slug,
        company,
        kind,
      });

      const res = await fetch(
        `/api/audits/reports/${encodeURIComponent(slug)}/pdf`,
      );
      if (!res.ok) {
        throw new Error(`PDF request failed (${res.status})`);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${slug}.pdf`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(url);

      posthog.capture("audit_pdf_download_succeeded", { slug, company, kind });
      setStatus("done");
      window.setTimeout(() => setStatus("idle"), 1800);
    } catch (err) {
      console.error(err);
      posthog.capture("audit_pdf_download_failed", {
        slug,
        company,
        kind,
        message: err instanceof Error ? err.message : "unknown",
      });
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 2800);
    }
  }

  const label =
    status === "pending"
      ? "Preparing…"
      : status === "done"
        ? "Downloaded"
        : status === "error"
          ? "Try again"
          : "Download PDF";

  return (
    <div className={cn("relative inline-flex shrink-0", className)}>
      <motion.button
        type="button"
        onClick={handleDownload}
        disabled={status === "pending"}
        aria-busy={status === "pending"}
        aria-label={status === "idle" ? "Download PDF report" : label}
        whileHover={
          reduceMotion || status === "pending"
            ? undefined
            : { y: -1, scale: 1.02 }
        }
        whileTap={
          reduceMotion || status === "pending" ? undefined : { scale: 0.97 }
        }
        transition={{ type: "spring", stiffness: 520, damping: 28 }}
        className={cn(
          "relative inline-flex h-8 min-w-[8.5rem] items-center justify-center gap-1.5 overflow-hidden rounded-md px-3 text-xs font-medium text-white select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2462ff]/40 focus-visible:ring-offset-2",
          "disabled:cursor-wait",
          status === "error"
            ? "bg-red-600 hover:bg-red-600/90"
            : status === "done"
              ? "bg-emerald-600"
              : "bg-[#2462ff] hover:bg-[#2462ff]/90",
        )}
      >
        {status === "pending" && !reduceMotion ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{
              duration: 1.1,
              ease: "linear",
              repeat: Number.POSITIVE_INFINITY,
            }}
          />
        ) : null}

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            className="relative inline-flex items-center gap-1.5"
            initial={
              reduceMotion ? false : { opacity: 0, y: 6, filter: "blur(2px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -6, filter: "blur(2px)" }
            }
            transition={{ duration: 0.18 }}
          >
            {status === "pending" ? (
              <LoaderCircle className="size-3.5 animate-spin" aria-hidden />
            ) : status === "done" ? (
              <Check className="size-3.5" strokeWidth={2.5} aria-hidden />
            ) : (
              <motion.span
                aria-hidden
                className="inline-flex"
                whileHover={reduceMotion ? undefined : { y: 1 }}
              >
                <Download className="size-3.5" />
              </motion.span>
            )}
            {label}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {status === "error" ? (
          <motion.p
            role="alert"
            initial={reduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute top-full right-0 mt-1.5 text-[11px] whitespace-nowrap text-red-600"
          >
            Couldn’t generate. Try again.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
