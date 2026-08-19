"use client";

import { useId, type CSSProperties } from "react";

import styles from "@/components/pages/tools/domain-rating/DomainRatingGauge.module.css";

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

function polar(r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return {
    x: (CX + Math.cos(rad) * r).toFixed(3),
    y: (CY + Math.sin(rad) * r).toFixed(3),
  };
}

const ticks = Array.from({ length: SEGMENTS }, (_, i) => {
  const deg = START_DEG + (SWEEP_DEG * i) / (SEGMENTS - 1);
  const major = i % 12 === 0;
  const a = polar(INNER, deg);
  const b = polar(major ? MAJOR_OUTER : OUTER, deg);
  return { i, major, a, b };
});

const railStart = polar(97, START_DEG);
const railEnd = polar(97, START_DEG + SWEEP_DEG);
const rail = `M ${railStart.x} ${railStart.y} A 97 97 0 1 1 ${railEnd.x} ${railEnd.y}`;
const zero = polar(124, START_DEG);
const fifty = polar(124, START_DEG + SWEEP_DEG / 2);
const hundred = polar(124, START_DEG + SWEEP_DEG);

export function DomainRatingGauge({
  value,
  label,
  pending = false,
}: DomainRatingGaugeProps) {
  const gradientId = `dr-meter-${useId().replace(/:/g, "")}`;
  const clamped =
    value == null ? null : Math.min(100, Math.max(0, value));
  const litThrough =
    clamped == null ? -1 : Math.round((clamped / 100) * (SEGMENTS - 1));

  const tickGroupClass = pending
    ? styles.pending
    : clamped != null
      ? styles.scored
      : undefined;

  return (
    <svg
      viewBox="0 0 280 248"
      className="mx-auto w-full max-w-88 font-sans"
      role="img"
      aria-label={
        pending
          ? "Domain rating meter, checking"
          : clamped == null
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

      <g className={tickGroupClass}>
        {ticks.map(({ i, major, a, b }) => {
          const on = i <= litThrough;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              data-on={on ? "true" : undefined}
              style={{ "--tick": i } as CSSProperties}
              stroke={
                on
                  ? `url(#${gradientId})`
                  : major
                    ? "rgba(255,255,255,0.3)"
                    : "rgba(255,255,255,0.1)"
              }
              strokeWidth={major ? 2.5 : on ? 2 : 1.6}
              strokeLinecap="round"
            />
          );
        })}
      </g>

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
        {label}
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
