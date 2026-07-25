"use client";

import { motion, useReducedMotion } from "motion/react";

const assets = [
  {
    title: "Logo pack",
    meta: "SVG · PNG",
    body: "Primary wordmark, mark-only, and monochrome variants on light and dark.",
  },
  {
    title: "Founder headshots",
    meta: "JPG · high-res",
    body: "Approved portraits with credit line for print and digital features.",
  },
  {
    title: "Product screens",
    meta: "PNG · 2x",
    body: "Visibility dashboard, mention feed, and competitor comparison frames.",
  },
  {
    title: "Boilerplate",
    meta: "Plain text",
    body: "50- and 100-word company descriptions plus approved GEO definitions.",
  },
] as const;

export default function PressKit() {
  const reduceMotion = useReducedMotion();

  return (
    <section id="press-kit" className="border-y">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Press kit
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Download-ready assets for articles, newsletters, and conference decks.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {assets.map((asset, index) => (
          <motion.div
            key={asset.title}
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className={`border-b p-8 md:p-10 ${
              index % 2 === 0 ? "md:border-r" : ""
            } ${index >= assets.length - 2 ? "md:border-b-0" : ""} ${
              index === assets.length - 1 ? "border-b-0" : ""
            }`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-medium">{asset.title}</h3>
              <span className="shrink-0 font-mono text-xs text-zinc-400">
                {asset.meta}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {asset.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
