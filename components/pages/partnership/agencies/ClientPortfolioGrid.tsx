"use client";

import { motion, useReducedMotion } from "motion/react";

const clients = [
  { name: "Northwind Commerce", vertical: "DTC", score: "72%" },
  { name: "Helix Analytics", vertical: "B2B SaaS", score: "64%" },
  { name: "Harbor Health", vertical: "Healthcare", score: "58%" },
  { name: "Orbit Fintech", vertical: "Fintech", score: "81%" },
  { name: "Lumen Media", vertical: "Publishing", score: "49%" },
  { name: "Cascade Travel", vertical: "Travel", score: "67%" },
] as const;

export default function ClientPortfolioGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Client portfolio, one glance
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Track visibility scores across accounts without switching tools —
          built for multi-brand agency workspaces.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {clients.map((client, index) => (
          <motion.div
            key={client.name}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="flex flex-col justify-between border-b border-r p-8 [&:nth-child(2n)]:sm:border-r-0 [&:nth-child(3n)]:lg:border-r-0 [&:nth-last-child(-n+1)]:border-b-0 sm:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-last-child(-n+3)]:border-b-0 lg:[&:nth-child(2n)]:border-r"
          >
            <div>
              <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                {client.vertical}
              </p>
              <h3 className="mt-2 text-xl font-medium">{client.name}</h3>
            </div>
            <div className="mt-8 flex items-end justify-between">
              <span className="text-sm text-zinc-500">AI visibility</span>
              <span className="text-3xl font-medium tabular-nums text-[#2462ff]">
                {client.score}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
