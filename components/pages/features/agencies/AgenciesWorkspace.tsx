"use client";

import { motion, useReducedMotion } from "motion/react";

const clients = [
  {
    name: "Northwind Labs",
    industry: "B2B SaaS",
    score: 64,
    delta: "+4",
    models: ["ChatGPT", "Gemini", "AI Mode"],
  },
  {
    name: "Harbor Retail",
    industry: "E-commerce",
    score: 41,
    delta: "−2",
    models: ["ChatGPT", "Perplexity"],
  },
  {
    name: "Cascade Health",
    industry: "Healthcare",
    score: 58,
    delta: "+7",
    models: ["Gemini", "Claude", "Overview"],
  },
  {
    name: "Volt Finance",
    industry: "Fintech",
    score: 72,
    delta: "+1",
    models: ["ChatGPT", "Grok", "AI Mode"],
  },
] as const;

export default function AgenciesWorkspace() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b">
      <div className="border-b px-6 py-8 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">
          Multi-client workspace
        </h2>
        <p className="mt-1 max-w-lg text-sm text-zinc-500">
          Switch brands without losing context. Scores, model coverage, and
          week-over-week movement sit in one bordered strip.
        </p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max border-b md:min-w-0 md:grid md:grid-cols-4">
          {clients.map((client, index) => (
            <motion.div
              key={client.name}
              className={`w-64 shrink-0 border-r px-5 py-6 last:border-r-0 md:w-auto ${
                index === clients.length - 1 ? "border-r-0" : ""
              }`}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <p className="text-xs text-zinc-400">{client.industry}</p>
              <p className="mt-1 text-lg font-medium tracking-tight">
                {client.name}
              </p>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-medium tabular-nums">
                  {client.score}
                </span>
                <span
                  className={`text-sm tabular-nums ${
                    client.delta.startsWith("+")
                      ? "text-[#2462ff]"
                      : "text-zinc-500"
                  }`}
                >
                  {client.delta}
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {client.models.map((model) => (
                  <span
                    key={model}
                    className="border px-2 py-0.5 text-[11px] text-zinc-500"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
