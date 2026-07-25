"use client";

import { motion, useReducedMotion } from "motion/react";

export type MatrixCell = "yes" | "partial" | "no" | string;

export type MatrixRow = {
  capability: string;
  anny: MatrixCell;
  competitor: MatrixCell;
};

type VsMatrixProps = {
  competitor: string;
  rows: readonly MatrixRow[];
};

function Cell({ value }: { value: MatrixCell }) {
  if (value === "yes") {
    return <span className="font-medium text-[#2462ff]">Yes</span>;
  }
  if (value === "partial") {
    return <span className="text-zinc-500">Partial</span>;
  }
  if (value === "no") {
    return <span className="text-zinc-400">No</span>;
  }
  return <span className="text-sm text-zinc-600">{value}</span>;
}

export default function VsMatrix({ competitor, rows }: VsMatrixProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Capability matrix
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Side-by-side on GEO, citations, and model coverage — not a feature
          dump.
        </p>
      </div>
      <div className="overflow-x-auto overscroll-x-contain">
        <div className="min-w-[36rem] md:min-w-xl">
          <div className="grid grid-cols-[1.4fr_1fr_1fr] border-b px-4 py-4 text-xs font-medium tracking-wide text-zinc-400 uppercase md:px-10">
            <span className="sticky left-0 bg-background pr-4">Capability</span>
            <span className="text-center">Anny</span>
            <span className="text-center">{competitor}</span>
          </div>
          <ul>
            {rows.map((row, index) => (
              <motion.li
                key={row.capability}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="grid grid-cols-[1.4fr_1fr_1fr] items-center border-b px-4 py-5 last:border-b-0 md:px-10"
              >
                <span className="sticky left-0 bg-background pr-4 font-medium">
                  {row.capability}
                </span>
                <span className="text-center">
                  <Cell value={row.anny} />
                </span>
                <span className="text-center">
                  <Cell value={row.competitor} />
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
