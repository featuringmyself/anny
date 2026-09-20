"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export const AI_FLIP_ITEMS = [
  { name: "ChatGPT", logo: "/ai-logo/chatgptLogo.svg", color: "#000000" },
  { name: "Claude", logo: "/ai-logo/claudeLogo.svg", color: "#D97757" },
  { name: "Gemini", logo: "/ai-logo/geminiLogo.svg", color: "#3186FF" },
  { name: "Grok", logo: "/ai-logo/grokLogo.svg", color: "#000000" },
  { name: "Perplexity", logo: "/ai-logo/perplexityLogo.svg", color: "#22B8CD" },
] as const;

/** Complete phrase for screen readers, crawlers, and answer engines. */
export const AI_FLIP_ACCESSIBLE =
  "ChatGPT, Claude, Gemini, Grok, and Perplexity";

const INTERVAL_MS = 2200;

const LONGEST = AI_FLIP_ITEMS.reduce((longest, item) =>
  item.name.length > longest.name.length ? item : longest,
);

// Inline text layout (no flex): the baseline of this span is a real text
// baseline, and `align-middle` centres the logo on the font's x-height.
function AiLabel({
  name,
  logo,
  color,
}: {
  name: string;
  logo: string;
  color: string;
}) {
  return (
    <span className="font-semibold" style={{ color }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo}
        alt=""
        width={16}
        height={16}
        className="mr-1 inline-block size-[1em] align-middle"
        draggable={false}
      />
      {name}
    </span>
  );
}

/**
 * Rotating AI model name for headlines.
 * Meaning lives in the static `sr-only` phrase (SEO / AEO / AT).
 * The flip is visual-only: fixed to the longest label so mobile wrap
 * stays stable instead of jumping between Grok and Perplexity.
 */
export default function AiFlip() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (reduceMotion || paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % AI_FLIP_ITEMS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [reduceMotion, paused]);

  if (reduceMotion) {
    return (
      <>
        <span className="sr-only">{AI_FLIP_ACCESSIBLE}</span>
        <span aria-hidden="true" className="font-semibold text-zinc-800">
          AI answers
        </span>
      </>
    );
  }

  const item = AI_FLIP_ITEMS[index];

  return (
    <>
      {/* Stable, complete meaning for AT + bots. Do not aria-live the rotation. */}
      <span className="sr-only">{AI_FLIP_ACCESSIBLE}</span>

      {/* Overflow must stay visible here: an inline-block that clips takes its
          bottom margin edge as its baseline, which lifts it off the text baseline.
          Width is always Perplexity-sized so short names never un-wrap the line. */}
      <span
        className="relative inline-block align-baseline whitespace-nowrap"
        aria-hidden="true"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span className="invisible">
          <AiLabel
            name={LONGEST.name}
            logo={LONGEST.logo}
            color={LONGEST.color}
          />
        </span>

        {/* Clipping layer matches the sizer box; shorter names stay centered
            inside the reserved width so the slot does not look left-heavy. */}
        <span className="absolute inset-0 overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.span
              key={item.name}
              className="absolute inset-0 text-center"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
                mass: 0.7,
              }}
            >
              <AiLabel name={item.name} logo={item.logo} color={item.color} />
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </>
  );
}
