"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import Demo from "@/components/Home/demo";
import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { clientLogos, servicesCopy } from "./data";
import {
  heroAmbient,
  heroDemoGlow,
  heroGridTexture,
  heroPadding,
  sectionLight,
} from "./shared/section-styles";

const proofLogos = clientLogos.slice(0, 5);

function monogramFor(name: string) {
  return name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ProofMark({ name }: { name: string }) {
  return (
    <li className="flex min-w-0 items-center gap-2.5 rounded-xl border border-zinc-200/70 bg-white/70 px-3 py-2 shadow-sm backdrop-blur-sm">
      <span
        aria-hidden
        className="grid size-7 shrink-0 place-items-center rounded-lg bg-linear-to-br from-zinc-100 to-zinc-50 text-[10px] font-bold tracking-tight text-zinc-500 ring-1 ring-zinc-200/80"
      >
        {monogramFor(name)}
      </span>
      <span className="truncate text-sm font-medium tracking-tight text-zinc-600">
        {name}
      </span>
    </li>
  );
}

export default function ServicesHero() {
  const reducedMotion = useReducedMotion();

  const fadeUp = (delay = 0) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 14 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      className={cn(sectionLight, heroPadding, "pb-10 md:pb-14 lg:pb-16")}
      aria-labelledby="services-hero-heading"
    >
      <div aria-hidden className={heroAmbient} />
      <div aria-hidden className={heroGridTexture} />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <div className="max-w-xl lg:max-w-none">
            <motion.div {...fadeUp(0)}>
              <Eyebrow className="mb-5 inline-flex items-center rounded-full border border-[#2462ff]/15 bg-[#2462ff]/6 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#2462ff]">
                {servicesCopy.hero.eyebrow}
              </Eyebrow>
            </motion.div>

            <motion.h1
              id="services-hero-heading"
              className="text-[2.65rem] font-semibold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.65rem] lg:leading-[1.04]"
              {...fadeUp(0.05)}
            >
              {servicesCopy.hero.h1Lead}{" "}
              <span className="bg-linear-to-r from-[#2462ff] to-[#4d7dff] bg-clip-text text-transparent">
                {servicesCopy.hero.h1Accent}
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-pretty text-zinc-600 md:text-lg md:leading-8"
              {...fadeUp(0.1)}
            >
              {servicesCopy.hero.sub}
            </motion.p>

            <motion.div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              {...fadeUp(0.15)}
            >
              <TalkToSalesButton
                size="lg"
                className="h-12 bg-[#2462ff] px-6 shadow-[0_8px_24px_-8px_rgba(36,98,255,0.55)] hover:bg-[#2462ff]/90"
                source="services-hero"
              />
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-zinc-200 bg-white/80 px-6 backdrop-blur-sm hover:bg-zinc-50"
                render={<Link href="/tools/ai-readiness-checker" />}
              >
                AI Readiness Checker
                <ArrowRight className="size-4 opacity-60" aria-hidden />
              </Button>
            </motion.div>

            <motion.div className="mt-12" {...fadeUp(0.22)}>
              <p className="text-[11px] font-semibold tracking-[0.14em] text-zinc-400 uppercase">
                {servicesCopy.logos.label}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {proofLogos.map((name) => (
                  <ProofMark key={name} name={name} />
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.div
            className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none lg:translate-x-2 xl:translate-x-4"
            {...fadeUp(0.12)}
          >
            <div aria-hidden className={heroDemoGlow} />

            <div className="relative overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-[0_28px_80px_-24px_rgba(36,98,255,0.22),0_12px_32px_-16px_rgba(15,23,42,0.12)] ring-1 ring-black/3">
              <div
                aria-hidden
                className="flex h-9 items-center gap-1.5 border-b border-zinc-100 bg-zinc-50/90 px-4"
              >
                <span className="size-2 rounded-full bg-zinc-300/90" />
                <span className="size-2 rounded-full bg-zinc-300/70" />
                <span className="size-2 rounded-full bg-zinc-300/50" />
                <span className="ml-3 text-[10px] font-medium tracking-wide text-zinc-400">
                  Anny · Visibility dashboard
                </span>
              </div>

              <div className="relative overflow-hidden">
                <div className="relative origin-top lg:scale-[1.02] [&>section]:mx-0 [&>section]:mt-0 [&>section]:max-w-none [&>section]:px-0 [&>section]:pb-0">
                  <Demo />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white via-white/80 to-transparent"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-white via-white/70 to-transparent"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
