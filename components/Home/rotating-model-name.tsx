"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { AI_MODELS, type AiModel } from "@/components/Home/ai-models";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 2400;
const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 0.55;

/**
 * Same inline metrics as the surrounding H1 text:
 * - inherits size / weight / tracking / leading
 * - logo sized to cap-height (`1cap`), not a random em fraction
 * - inline-flex + items-center so icon and name share one em-box,
 *   and that box’s baseline matches adjacent words in the headline
 */
function ModelLabel({ model }: { model: AiModel }) {
  return (
    <span
      className="inline-flex items-center gap-[0.28em] whitespace-nowrap"
      style={{ color: model.color }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={model.logo}
        alt=""
        width={24}
        height={24}
        className="block size-[1cap] shrink-0"
        draggable={false}
      />
      <span>{model.name}</span>
    </span>
  );
}

type Props = {
  className?: string;
};

/**
 * Decorative rotating model name for headlines.
 * Must stay in the parent’s inline formatting context so type matches the stem.
 */
export default function RotatingModelName({ className }: Props) {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [width, setWidth] = useState<number | null>(null);
  const probeRef = useRef<HTMLSpanElement>(null);

  const model = AI_MODELS[index];

  useLayoutEffect(() => {
    const probe = probeRef.current;
    if (!probe) return;

    const measure = () => {
      setWidth(Math.ceil(probe.getBoundingClientRect().width));
    };

    measure();
    void document.fonts?.ready.then(measure);

    const observer = new ResizeObserver(measure);
    observer.observe(probe);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [index, reduceMotion]);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % AI_MODELS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion, paused]);

  if (reduceMotion) {
    return (
      <span className={cn("text-zinc-800", className)}>AI answers</span>
    );
  }

  return (
    <span
      className={cn("relative inline-block align-baseline", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Measures at the inherited headline font. Not shown. */}
      <span
        ref={probeRef}
        aria-hidden
        className="pointer-events-none invisible absolute top-0 left-0"
      >
        <ModelLabel model={model} />
      </span>

      {/*
        Width is animated; height + baseline come from the in-flow invisible
        label (same structure as the visible one). Overflow stays visible on
        this box so the baseline is a real text baseline, not the margin edge.
      */}
      <motion.span
        aria-hidden
        className="relative inline-block min-w-0 align-baseline"
        initial={false}
        animate={width != null ? { width } : undefined}
        transition={{ duration: DURATION, ease: EASE }}
      >
        <span className="invisible">
          <ModelLabel model={model} />
        </span>

        <span className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.span
              key={model.name}
              className="absolute top-0 left-0"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: DURATION, ease: EASE }}
            >
              <ModelLabel model={model} />
            </motion.span>
          </AnimatePresence>
        </span>
      </motion.span>
    </span>
  );
}
