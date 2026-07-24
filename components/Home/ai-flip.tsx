"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const AI_ITEMS = [
  { name: "Claude", logo: "/ai-logo/claudeLogo.svg" },
  { name: "ChatGPT", logo: "/ai-logo/chatgptLogo.svg" },
  { name: "Gemini", logo: "/ai-logo/geminiLogo.svg" },
  { name: "Grok", logo: "/ai-logo/grokLogo.svg" },
  { name: "Perplexity", logo: "/ai-logo/perplexityLogo.svg" },
] as const;

const INTERVAL_MS = 2200;

// Inline text layout (no flex): the baseline of this span is a real text
// baseline, and `align-middle` centres the logo on the font's x-height.
function AiLabel({ name, logo }: { name: string; logo: string }) {
  return (
    <>
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
    </>
  );
}

export default function AiFlip() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % AI_ITEMS.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const item = AI_ITEMS[index];

  return (
    // Overflow must stay visible here: an inline-block that clips takes its
    // bottom margin edge as its baseline, which lifts it off the text baseline.
    <span className="relative inline-block align-baseline whitespace-nowrap text-zinc-800">
      <span className="invisible" aria-hidden>
        <AiLabel name={item.name} logo={item.logo} />
      </span>

      {/* Clipping happens on this layer, which exactly covers the box above, so
          the animated copy shares its top edge and therefore its baseline. */}
      <span className="absolute inset-0 overflow-hidden" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.span
            key={item.name}
            className="absolute inset-0"
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
            <AiLabel name={item.name} logo={item.logo} />
          </motion.span>
        </AnimatePresence>
      </span>

      <span className="sr-only">{item.name}</span>
    </span>
  );
}
