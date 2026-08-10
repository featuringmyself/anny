"use client";

import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

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
        className="cursor-pointer select-none text-xs font-medium tracking-wide text-zinc-400 uppercase"
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
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2",
          isTechnical
            ? "border-zinc-900 bg-zinc-900"
            : "border-zinc-300 bg-zinc-200",
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
  mode: ReadinessAudienceMode;
  onChange: (mode: ReadinessAudienceMode) => void;
};

export function ReadinessModeBar({ mode, onChange }: ReadinessModeBarProps) {
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
          // Under the site nav (z-50); fills the top edge once nav hides on scroll
          "sticky top-0 z-40 border-b border-zinc-200 bg-white/95 backdrop-blur-sm",
          "transition-shadow duration-200",
          stuck && "shadow-[0_1px_3px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="flex items-center justify-end px-6 py-3 md:px-12">
          <ReadinessModeToggle mode={mode} onChange={onChange} />
        </div>
      </div>
    </>
  );
}
