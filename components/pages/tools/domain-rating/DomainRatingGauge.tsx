"use client";

import { useEffect, useId, useState } from "react";
import { useReducedMotion } from "motion/react";

import { formatDr } from "@/components/pages/tools/domain-rating/bands";

type DomainRatingGaugeProps = {
  value: number | null;
  label: string;
  pending?: boolean;
};

const CX = 140;
const CY = 138;
const INNER = 88;
const OUTER = 106;
const MAJOR_OUTER = 112;
const START_DEG = 135;
const SWEEP_DEG = 270;
const SEGMENTS = 48;
const FILL_MS = 900;

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: Number((CX + Math.cos(rad) * r).toFixed(3)),
    y: Number((CY + Math.sin(rad) * r).toFixed(3)),
  };
}

const ticks = Array.from({ length: SEGMENTS }, (_, i) => {
  const deg = START_DEG + (SWEEP_DEG * i) / (SEGMENTS - 1);
  const major = i % 12 === 0;
  const a = polar(INNER, deg);
  const b = polar(major ? MAJOR_OUTER : OUTER, deg);
  return { i, major, a, b };
});

export function DomainRatingGauge({
  value,
  label,
  pending = false,
}: DomainRatingGaugeProps) {
  const reduce = useReducedMotion();
  const gradientId = `dr-meter-${useId().replace(/:/g, "")}`;
  const clamped =
    value == null ? null : Math.min(100, Math.max(0, value));
  const litTarget =
    clamped == null ? -1 : Math.round((clamped / 100) * (SEGMENTS - 1));

  const [lit, setLit] = useState(reduce ? litTarget : -1);
  const [display, setDisplay] = useState(
    reduce || clamped == null ? label : "0",
  );

  useEffect(() => {
    // #region agent log
    fetch("http://127.0.0.1:7528/ingest/8ea49b12-3acb-4483-906d-aeed4e36bee6", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Debug-Session-Id": "c31750",
      },
      body: JSON.stringify({
        sessionId: "c31750",
        runId: "post-fix",
        hypothesisId: "A",
        location: "DomainRatingGauge.tsx:effect",
        message: "gauge ticks use native line, not motion.line",
        data: {
          path: window.location.pathname,
          pending,
          reduce: Boolean(reduce),
          tickCount: SEGMENTS,
          usesMotionLine: false,
        },
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
  }, [pending, reduce]);

  useEffect(() => {
    if (clamped == null) {
      setLit(-1);
      setDisplay(label);
      return;
    }

    if (reduce) {
      setLit(litTarget);
      setDisplay(label);
      return;
    }

    setLit(-1);
    setDisplay("0");
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / FILL_MS);
      const eased = 1 - (1 - t) ** 3;
      setLit(Math.round(eased * litTarget));
      setDisplay(
        Number.isInteger(clamped)
          ? String(Math.round(clamped * eased))
          : formatDr(clamped * eased),
      );
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setLit(litTarget);
        setDisplay(label);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [clamped, label, litTarget, reduce]);

  const railStart = polar(97, START_DEG);
  const railEnd = polar(97, START_DEG + SWEEP_DEG);
  const rail = `M ${railStart.x} ${railStart.y} A 97 97 0 1 1 ${railEnd.x} ${railEnd.y}`;
  const zero = polar(124, START_DEG);
  const fifty = polar(124, START_DEG + SWEEP_DEG / 2);
  const hundred = polar(124, START_DEG + SWEEP_DEG);
  const pulse = pending && !reduce;

  return (
    <svg
      viewBox="0 0 280 248"
      className="mx-auto w-full max-w-88 font-sans"
      role="img"
      aria-label={
        clamped == null
          ? "Domain rating meter, empty"
          : `Domain rating ${label} out of 100`
      }
    >
      <defs>
        <linearGradient id={gradientId} x1="0.15" y1="1" x2="0.85" y2="0">
          <stop offset="0%" stopColor="#1637a8" />
          <stop offset="40%" stopColor="#2462ff" />
          <stop offset="100%" stopColor="#b7ccff" />
        </linearGradient>
      </defs>
      {pulse ? (
        <style>
          {
            "@keyframes dr-tick-pulse{0%,100%{opacity:.28}50%{opacity:.85}}"
          }
        </style>
      ) : null}

      <path
        d={rail}
        fill="none"
        stroke="rgba(255,255,255,0.055)"
        strokeWidth="26"
        strokeLinecap="round"
      />

      <circle
        cx={CX}
        cy={CY}
        r="76"
        fill="#0c0c0e"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
      />

      {ticks.map(({ i, major, a, b }) => {
        const on = i <= lit;
        return (
          <line
            key={i}
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke={
              on
                ? `url(#${gradientId})`
                : major
                  ? "rgba(255,255,255,0.3)"
                  : "rgba(255,255,255,0.1)"
            }
            strokeWidth={major ? 2.5 : on ? 2 : 1.6}
            strokeLinecap="round"
            opacity={pulse ? undefined : pending ? 0.4 : 1}
            style={
              pulse
                ? {
                    animation: `dr-tick-pulse 1.2s ease-in-out ${i * 0.03}s infinite`,
                  }
                : undefined
            }
          />
        );
      })}

      <text
        x={CX}
        y={CY + 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={pending ? "rgba(255,255,255,0.28)" : "#f7f7f7"}
        fontSize="52"
        fontWeight="500"
        letterSpacing="-0.06em"
        style={{ fontVariantNumeric: "tabular-nums" }}
      >
        {display}
      </text>
      <text
        x={CX}
        y={CY + 34}
        textAnchor="middle"
        fill="rgba(255,255,255,0.34)"
        fontSize="10"
        fontWeight="500"
        letterSpacing="0.16em"
      >
        DR / 100
      </text>

      <text
        x={zero.x}
        y={zero.y + 4}
        textAnchor="middle"
        fill="rgba(255,255,255,0.34)"
        fontSize="10"
      >
        0
      </text>
      <text
        x={fifty.x}
        y={fifty.y + 4}
        textAnchor="middle"
        fill="rgba(255,255,255,0.34)"
        fontSize="10"
      >
        50
      </text>
      <text
        x={hundred.x}
        y={hundred.y + 4}
        textAnchor="middle"
        fill="rgba(255,255,255,0.34)"
        fontSize="10"
      >
        100
      </text>
    </svg>
  );
}
