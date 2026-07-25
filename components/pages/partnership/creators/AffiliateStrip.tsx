"use client";

import { motion, useReducedMotion } from "motion/react";

const steps = [
  {
    label: "01",
    title: "Share your link",
    body: "Unique affiliate URL for newsletters, community posts, and video descriptions.",
  },
  {
    label: "02",
    title: "Audience starts tracking",
    body: "When they connect a brand in Anny, attribution sticks through the trial window.",
  },
  {
    label: "03",
    title: "Earn on paid plans",
    body: "Recurring commission while their workspace stays active — transparent dashboard included.",
  },
] as const;

export default function AffiliateStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Affiliate flow
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Simple attribution. No coupon gymnastics. Built for creators who
          already talk SEO, AI, or growth.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {steps.map((step, index) => (
          <motion.div
            key={step.label}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: index * 0.08 }}
            className={`border-b p-8 last:border-b-0 md:border-b-0 md:p-10 ${
              index < steps.length - 1 ? "md:border-r" : ""
            }`}
          >
            <span className="font-mono text-sm text-[#2462ff]">{step.label}</span>
            <h3 className="mt-3 text-xl font-medium">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {step.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
