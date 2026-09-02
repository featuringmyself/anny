"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { outcomeTabs, servicesCopy } from "./data";
import { BeforeAfterCard } from "./shared/BeforeAfterCard";
import { BrowserFrame } from "./shared/BrowserFrame";
import { DashboardScreenshot } from "./shared/DashboardScreenshot";
import {
  sectionHeading,
  sectionLight,
  sectionPadding,
  sectionSubtext,
} from "./shared/section-styles";

export default function ServicesOutcomes() {
  const [activeId, setActiveId] = useState(outcomeTabs[0].id);
  const reducedMotion = useReducedMotion();
  const active =
    outcomeTabs.find((tab) => tab.id === activeId) ?? outcomeTabs[0];

  return (
    <section
      className={`${sectionLight} ${sectionPadding}`}
      aria-labelledby="services-outcomes-heading"
    >
      <h2 id="services-outcomes-heading" className={sectionHeading}>
        {servicesCopy.outcomes.h2}
      </h2>
      <p className={sectionSubtext}>{servicesCopy.outcomes.sub}</p>

      <div
        className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2"
        role="tablist"
        aria-label="Outcomes by role"
      >
        {outcomeTabs.map((tab) => {
          const selected = tab.id === activeId;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                selected
                  ? "border-[#2462ff] bg-[#2462ff] text-white"
                  : "border-border bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50",
              )}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-7xl" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={reducedMotion ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="grid items-start gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center lg:gap-12 xl:gap-16"
          >
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-balance md:text-3xl lg:text-[2rem] lg:leading-tight">
                {active.title}
              </h3>
              <p className="mt-3 max-w-md text-base leading-relaxed text-zinc-600 text-pretty">
                {active.description}
              </p>

              <ul className="mt-6 space-y-3">
                {active.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-3 text-sm leading-relaxed text-zinc-700"
                  >
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#2462ff]/10 text-[#2462ff]">
                      <Check className="size-3" strokeWidth={2.5} aria-hidden />
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              <BeforeAfterCard
                before={active.before}
                after={active.after}
                className="mt-8"
              />

              <p className="mt-8 text-balance leading-snug">
                <span className="text-5xl font-semibold tracking-tight text-[#2462ff] tabular-nums md:text-6xl">
                  {active.metric}
                </span>{" "}
                <span className="text-base text-zinc-600 md:text-lg">
                  {active.metricLabel}
                </span>
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-2xl lg:pt-2">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-2xl bg-gradient-to-br from-zinc-100/80 to-transparent"
              />
              <BrowserFrame
                title="anny.dodoxhq.com/dashboard"
                size="large"
                className="relative"
              >
                <DashboardScreenshot
                  src={active.image}
                  alt={`${active.title} dashboard screenshot`}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  caption={`${active.title} — product screenshot`}
                />
              </BrowserFrame>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
