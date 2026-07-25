"use client";

import { motion, useReducedMotion } from "motion/react";

const panels = [
  {
    title: "AI Mode",
    logo: "/trackModel/ai_mode-logo.svg",
    query: "best CRM for growing B2B teams",
    summary:
      "AI Mode synthesizes a longer answer with follow-ups. Your brand needs consistent coverage across related prompts — not a single SERP snippet.",
    mentions: [
      { brand: "Attio", position: 1, present: true },
      { brand: "HubSpot", position: 2, present: true },
      { brand: "Salesforce", position: 3, present: true },
    ],
    note: "Mentioned in body · cited 2 sources",
  },
  {
    title: "AI Overview",
    logo: "/trackModel/ai_overview-logo.svg",
    query: "best CRM for growing B2B teams",
    summary:
      "Overviews compress the answer into a short block above classic results. Visibility here is binary — you are in the overview, or you are not.",
    mentions: [
      { brand: "HubSpot", position: 1, present: true },
      { brand: "Salesforce", position: 2, present: true },
      { brand: "Attio", position: 3, present: false },
    ],
    note: "Not in overview · gap vs AI Mode",
  },
] as const;

export default function AiModeDualPanel() {
  const reduceMotion = useReducedMotion();

  return (
    <section>
      <div className="border-b px-6 py-8 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">
          Dual-panel tracker
        </h2>
        <p className="mt-1 max-w-lg text-sm text-zinc-500">
          Same query, two Google surfaces. Compare presence, rank, and citation
          gaps without jumping between tools.
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        {panels.map((panel, index) => (
          <motion.div
            key={panel.title}
            className={`flex flex-col border-b ${index === 0 ? "md:border-r" : ""}`}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="flex items-center gap-2 border-b px-6 py-4 md:px-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={panel.logo}
                alt=""
                width={100}
                height={24}
                className="h-5 w-auto object-contain"
                draggable={false}
              />
              <span className="sr-only">{panel.title}</span>
            </div>

            <div className="flex flex-1 flex-col px-6 py-8 md:px-8">
              <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                Query
              </p>
              <p className="mt-1 text-base font-medium">{panel.query}</p>
              <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                {panel.summary}
              </p>

              <div className="mt-8 border-t">
                {panel.mentions.map((row) => (
                  <div
                    key={row.brand}
                    className="flex items-center justify-between border-b py-3 text-sm last:border-b-0"
                  >
                    <span className="font-medium">{row.brand}</span>
                    <span
                      className={`tabular-nums ${row.present ? "text-[#2462ff]" : "text-zinc-400"}`}
                    >
                      {row.present ? `#${row.position}` : "Missing"}
                    </span>
                  </div>
                ))}
              </div>

              <p
                className={`mt-6 text-xs font-medium ${
                  panel.mentions.some((m) => !m.present && m.brand === "Attio")
                    ? "text-zinc-500"
                    : "text-[#2462ff]"
                }`}
              >
                {panel.note}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
