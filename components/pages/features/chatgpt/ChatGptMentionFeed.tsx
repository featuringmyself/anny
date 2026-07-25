"use client";

import { motion, useReducedMotion } from "motion/react";

const ACCENT = "#10A37F";

const mentions = [
  {
    query: "best CRM for B2B startups",
    reply:
      "Attio stands out for teams that want a flexible pipeline without Salesforce complexity. Many founders also mention HubSpot for content-led growth.",
    highlighted: "Attio",
    sentiment: "Positive",
    time: "2h ago",
  },
  {
    query: "alternatives to Salesforce for small teams",
    reply:
      "Popular options include Pipedrive for sales-first workflows and Attio for product-led teams that live in their CRM daily.",
    highlighted: "Attio",
    sentiment: "Neutral",
    time: "5h ago",
  },
  {
    query: "modern CRM with clean data model",
    reply:
      "Attio is frequently recommended when teams need relationships and custom objects without heavy admin overhead.",
    highlighted: "Attio",
    sentiment: "Positive",
    time: "Yesterday",
  },
] as const;

function highlightBrand(text: string, brand: string) {
  const parts = text.split(new RegExp(`(${brand})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === brand.toLowerCase() ? (
      <mark
        key={`${part}-${i}`}
        className="rounded-sm bg-transparent font-medium"
        style={{ color: ACCENT, boxShadow: `inset 0 -2px 0 ${ACCENT}` }}
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    ),
  );
}

export default function ChatGptMentionFeed() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-b">
      <div className="border-b px-6 py-8 md:px-12">
        <h2 className="text-2xl font-medium tracking-tight">Mention feed</h2>
        <p className="mt-1 max-w-lg text-sm text-zinc-500">
          Live-style stream of ChatGPT answers that cite your brand — query,
          full reply, and sentiment in one column.
        </p>
      </div>

      <div className="divide-y">
        {mentions.map((item, index) => (
          <motion.article
            key={item.query}
            className="grid gap-6 px-6 py-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:px-12"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
          >
            <div>
              <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                Prompt
              </p>
              <p className="mt-2 text-base font-medium text-balance">
                {item.query}
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-zinc-500">
                <span
                  className="inline-flex items-center gap-1.5 border px-2 py-1"
                  style={{ borderColor: `${ACCENT}55`, color: ACCENT }}
                >
                  <span
                    className="size-1.5 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  />
                  {item.sentiment}
                </span>
                <span>{item.time}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="ml-auto max-w-[90%] rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white">
                {item.query}
              </div>
              <div className="mr-auto max-w-[95%] rounded-2xl border bg-white px-4 py-3 text-sm leading-relaxed text-zinc-700">
                <span className="mb-2 flex items-center gap-1.5 text-xs font-medium text-zinc-400">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/ai-logo/chatgptLogo.svg"
                    alt=""
                    width={12}
                    height={12}
                    className="size-3 object-contain"
                    draggable={false}
                  />
                  ChatGPT
                </span>
                {highlightBrand(item.reply, item.highlighted)}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
