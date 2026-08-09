"use client";

import { motion, useReducedMotion } from "motion/react";

const ACCENT = "#4B7BFF";

const turns = [
  {
    role: "user" as const,
    text: "I need a CRM that works well with a product-led sales motion.",
  },
  {
    role: "gemini" as const,
    text: "For product-led teams, look for flexible objects and light admin. Attio and HubSpot both show up often in recent reviews for that use case.",
    citations: [1, 2],
  },
  {
    role: "user" as const,
    text: "Which one do teams recommend more for startups under 50 people?",
  },
  {
    role: "gemini" as const,
    text: "Attio is cited more often for sub-50 teams that want a modern data model without enterprise overhead. HubSpot remains strong when marketing automation is the priority.",
    citations: [2, 3],
  },
] as const;

export default function GeminiCitationBoard() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b">
      <div className="border-b px-6 py-8 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">
          Multi-turn citation board
        </h2>
        <p className="mt-1 max-w-lg text-sm text-zinc-500">
          Gemini often revises recommendations across turns. Anny keeps the
          full thread and inline citation markers so you see where you appear.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-6 py-10 md:px-12 md:py-12">
        <div className="flex flex-col gap-4 border bg-white p-5 md:p-6">
          <div className="flex items-center gap-2 border-b pb-4 text-sm font-medium text-zinc-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/ai-logo/geminiLogo.svg"
              alt="Gemini logo"
              width={14}
              height={14}
              className="size-3.5 object-contain"
              draggable={false}
            />
            Gemini · tracked thread
          </div>

          {turns.map((turn, index) => (
            <motion.div
              key={`${turn.role}-${index}`}
              className={
                turn.role === "user"
                  ? "ml-auto max-w-[85%] rounded-2xl px-4 py-3 text-sm text-white"
                  : "mr-auto max-w-[95%] border px-4 py-3 text-sm leading-relaxed text-zinc-700"
              }
              style={
                turn.role === "user" ? { backgroundColor: ACCENT } : undefined
              }
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: index * 0.07 }}
            >
              {turn.text}
              {turn.role === "gemini" && turn.citations ? (
                <span className="mt-2 flex flex-wrap gap-1.5">
                  {turn.citations.map((n) => (
                    <sup
                      key={n}
                      className="inline-flex size-5 items-center justify-center rounded-full text-[10px] font-semibold text-white"
                      style={{ backgroundColor: ACCENT }}
                    >
                      {n}
                    </sup>
                  ))}
                </span>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
