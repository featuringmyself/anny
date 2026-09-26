"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { rt } from "./report-theme";
import type { ReadinessAudienceMode } from "./types";

type ReadinessModeToggleProps = {
  mode: ReadinessAudienceMode;
  onChange: (mode: ReadinessAudienceMode) => void;
};

export default function ReadinessModeToggle({
  mode,
  onChange,
}: ReadinessModeToggleProps) {
  const id = useId();
  const isTechnical = mode === "technical";

  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor={id}
        className={`cursor-pointer select-none text-xs font-medium tracking-wide uppercase ${rt.label}`}
      >
        Technical
      </label>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isTechnical}
        aria-label="Toggle technical view"
        onClick={() => onChange(isTechnical ? "non-technical" : "technical")}
        className={cn(
          "relative inline-flex h-5.5 w-10 shrink-0 items-center border transition-colors duration-150",
          rt.focusRing,
          isTechnical
            ? "border-[#11333c] bg-[#11333c]"
            : "border-[#225864]/25 bg-[#225864]/10",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "pointer-events-none block h-3.5 w-3.5 bg-white transition-transform duration-150",
            isTechnical ? "translate-x-5.25" : "translate-x-0.75",
          )}
        />
      </button>
    </div>
  );
}

type ReadinessModeBarProps = {
  company: string;
  mode: ReadinessAudienceMode;
  onChange: (mode: ReadinessAudienceMode) => void;
};

export function ReadinessModeBar({
  company,
  mode,
  onChange,
}: ReadinessModeBarProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px w-full" aria-hidden />
      <div
        className={cn(
          // Under the site nav (z-50); fills the top edge once nav hides on scroll.
          // Flat chrome (no radius): reads as a toolbar, not another card.
          "sticky top-0 z-40 -my-1.5 border border-[#225864]/12 bg-white/95 backdrop-blur-sm sm:-my-2",
          "transition-shadow duration-200",
          stuck && "shadow-[0_1px_3px_rgba(17,51,60,0.08)]",
        )}
      >
        <div className="flex items-center justify-between gap-4 px-6 py-2 md:px-12">
          <p
            className={`min-w-0 truncate text-xs font-medium tracking-wide ${rt.body}`}
          >
            <span className={rt.heading}>{company}</span>
            <span className="text-[#225864]/25"> · </span>
            <span>AI readiness report</span>
          </p>
          <ReadinessModeToggle mode={mode} onChange={onChange} />
        </div>
      </div>
    </>
  );
}
