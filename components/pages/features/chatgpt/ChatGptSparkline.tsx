"use client";

import { motion, useReducedMotion } from "motion/react";

const ACCENT = "#10A37F";

/** Last 14 days of visibility score (0–100). */
const points = [42, 45, 44, 48, 51, 49, 53, 56, 55, 58, 61, 59, 63, 67];

const WIDTH = 560;
const HEIGHT = 160;
const PAD_X = 8;
const PAD_Y = 12;

function buildPath(values: number[]) {
  const min = Math.min(...values) - 4;
  const max = Math.max(...values) + 4;
  const span = max - min || 1;

  return values
    .map((v, i) => {
      const x =
        PAD_X + (i / (values.length - 1)) * (WIDTH - PAD_X * 2);
      const y =
        HEIGHT - PAD_Y - ((v - min) / span) * (HEIGHT - PAD_Y * 2);
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

export default function ChatGptSparkline() {
  const reduceMotion = useReducedMotion();
  const path = buildPath(points);
  const latest = points[points.length - 1];
  const delta = latest - points[0];

  return (
    <section className="grid border-b md:grid-cols-2">
      <div className="flex flex-col justify-center border-b px-6 py-10 md:border-r md:border-b-0 md:px-12 md:py-14">
        <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
          Visibility score
        </p>
        <div className="mt-3 flex items-baseline gap-3">
          <span className="text-5xl font-medium tracking-tight tabular-nums">
            {latest}%
          </span>
          <span
            className="text-sm font-medium tabular-nums"
            style={{ color: ACCENT }}
          >
            {delta >= 0 ? "+" : ""}
            {delta} pts · 14d
          </span>
        </div>
        <p className="mt-4 max-w-sm text-sm text-zinc-500 text-balance">
          Anny samples your target prompts in ChatGPT daily and charts how often
          you appear — so you catch drops before they become the new normal.
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-10 md:px-10 md:py-14">
        <motion.svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="h-auto w-full"
          role="img"
          aria-label="ChatGPT visibility sparkline over 14 days"
          initial={reduceMotion ? false : { opacity: 0 }}
          whileInView={reduceMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.path
            d={path}
            fill="none"
            stroke={ACCENT}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={reduceMotion ? false : { pathLength: 0 }}
            whileInView={reduceMotion ? undefined : { pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
          />
          {points.map((v, i) => {
            const min = Math.min(...points) - 4;
            const max = Math.max(...points) + 4;
            const span = max - min || 1;
            const x =
              PAD_X + (i / (points.length - 1)) * (WIDTH - PAD_X * 2);
            const y =
              HEIGHT - PAD_Y - ((v - min) / span) * (HEIGHT - PAD_Y * 2);
            if (i !== points.length - 1) return null;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r={4}
                fill={ACCENT}
              />
            );
          })}
        </motion.svg>
        <div className="mt-3 flex justify-between text-xs text-zinc-400 tabular-nums">
          <span>14 days ago</span>
          <span>Today</span>
        </div>
      </div>
    </section>
  );
}
