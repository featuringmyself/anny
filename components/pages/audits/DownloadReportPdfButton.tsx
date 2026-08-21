"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
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

function DownloadGlyph({
  active,
  reduceMotion,
}: {
  active: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <svg
      viewBox="0 0 16 16"
      className="size-3.5"
      fill="none"
      aria-hidden
    >
      <motion.path
        d="M3 11.5v1.25c0 .69.56 1.25 1.25 1.25h7.5c.69 0 1.25-.56 1.25-1.25V11.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <motion.g
        animate={
          reduceMotion || !active
            ? { y: 0 }
            : { y: [0, 2.5, 0] }
        }
        transition={
          reduceMotion || !active
            ? { duration: 0.2 }
            : { duration: 0.85, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }
      >
        <path
          d="M8 2.5v7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5.25 7.25 8 10l2.75-2.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.g>
    </svg>
  );
}

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

function CheckGlyph({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden>
      <motion.path
        d="M3.5 8.25 6.75 11.5 12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

export default function DownloadReportPdfButton({
  slug,
  company,
  kind = "visibility",
  className,
}: DownloadReportPdfButtonProps) {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<Status>("idle");
  const [hovered, setHovered] = useState(false);

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
      window.setTimeout(() => setStatus("idle"), 2200);
    } catch (err) {
      console.error(err);
      posthog.capture("audit_pdf_download_failed", {
        slug,
        company,
        kind,
        message: err instanceof Error ? err.message : "unknown",
      });
      setStatus("error");
      window.setTimeout(() => setStatus("idle"), 3000);
    }
  }

  const label =
    status === "pending"
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
        layout
        onClick={handleDownload}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        disabled={status === "pending"}
        aria-busy={status === "pending"}
        aria-label={status === "idle" ? "Download PDF report" : label}
        initial={false}
        animate={
          reduceMotion
            ? undefined
            : status === "done"
              ? { scale: [1, 1.06, 1] }
              : status === "error"
                ? { x: [0, -4, 4, -3, 3, 0] }
                : { scale: 1 }
        }
        whileHover={
          reduceMotion || status === "pending"
            ? undefined
            : { y: -2, scale: 1.03 }
        }
        whileTap={
          reduceMotion || status === "pending"
            ? undefined
            : { scale: 0.94, y: 0 }
        }
        transition={
          status === "error"
            ? { duration: 0.35 }
            : status === "done"
              ? { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              : { type: "spring", stiffness: 480, damping: 22, mass: 0.6 }
        }
        className={cn(
          "relative inline-flex h-8 items-center justify-center gap-2 overflow-hidden rounded-md px-3 text-xs font-medium text-white select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2462ff]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#F7F7F7]",
          "disabled:cursor-wait",
          status === "error"
            ? "bg-red-600"
            : status === "done"
              ? "bg-emerald-600"
              : "bg-[#2462ff]",
        )}
      >
        {/* Soft sweep on idle hover */}
        {status === "idle" && hovered && !reduceMotion ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: "-120%" }}
            animate={{ x: "120%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}

        {/* Progress rail while generating */}
        {status === "pending" ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-white/70"
            initial={{ scaleX: 0 }}
            animate={
              reduceMotion
                ? { scaleX: 0.6 }
                : { scaleX: [0.08, 0.72, 0.4, 0.92, 0.55] }
            }
            transition={
              reduceMotion
                ? { duration: 0.3 }
                : {
                    duration: 2.4,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                  }
            }
          />
        ) : null}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={status}
            layout
            className="relative inline-flex items-center gap-2"
            initial={
              reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(4px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? undefined
                : { opacity: 0, y: -8, filter: "blur(4px)" }
            }
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {status === "pending" ? (
              <SpinnerGlyph />
            ) : status === "done" ? (
              <CheckGlyph reduceMotion={reduceMotion} />
            ) : (
              <DownloadGlyph
                active={hovered && status === "idle"}
                reduceMotion={reduceMotion}
              />
            )}
            <motion.span layout className="tabular-nums">
              {label}
            </motion.span>
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {status === "error" ? (
          <motion.p
            role="alert"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute top-full right-0 mt-1.5 text-[11px] whitespace-nowrap text-red-600"
          >
            Couldn’t generate. Try again.
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
