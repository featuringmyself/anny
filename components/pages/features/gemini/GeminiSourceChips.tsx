"use client";

import { motion, useReducedMotion } from "motion/react";

const ACCENT = "#4B7BFF";

const sources = [
  { n: 1, domain: "techradar.com", type: "Editorial", used: true },
  { n: 2, domain: "g2.com", type: "Review", used: true },
  { n: 3, domain: "attio.com/blog", type: "Brand", used: true },
  { n: 4, domain: "reddit.com/r/SaaS", type: "UGC", used: false },
  { n: 5, domain: "forbes.com", type: "Editorial", used: false },
] as const;

export default function GeminiSourceChips() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="grid border-b md:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
      <div className="flex flex-col justify-center border-b px-6 py-10 md:border-r md:border-b-0 md:px-12 md:py-14">
        <h2 className="text-2xl font-medium tracking-tight">Source chips</h2>
        <p className="mt-3 max-w-sm text-sm text-zinc-500 text-balance">
          Every Gemini citation resolves to a domain chip. Spot which sources
          name you — and which high-authority pages Gemini trusts that still
          skip your brand.
        </p>
      </div>

      <div className="flex flex-wrap content-center gap-2 px-6 py-10 md:px-10 md:py-14">
        {sources.map((source, index) => (
          <motion.span
            key={source.domain}
            className="inline-flex items-center gap-2 border bg-white px-3 py-2 text-sm"
            style={
              source.used
                ? { borderColor: `${ACCENT}66`, color: "#18181b" }
                : { color: "#71717a" }
            }
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <span
              className="grid size-5 place-items-center rounded-full text-[10px] font-semibold text-white"
              style={{
                backgroundColor: source.used ? ACCENT : "#a1a1aa",
              }}
            >
              {source.n}
            </span>
            <span className="font-medium">{source.domain}</span>
            <span className="text-xs text-zinc-400">{source.type}</span>
            {source.used ? (
              <span className="text-xs font-medium" style={{ color: ACCENT }}>
                cites you
              </span>
            ) : (
              <span className="text-xs text-zinc-400">gap</span>
            )}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
