"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type TocHeading = {
  id: string;
  text: string;
  style: "h2" | "h3";
};

const LINK_HEIGHT_REM = 1.75;
const SVG_UNITS_PER_REM = 16;
const JOG = 6;
const X_H2 = 0.5;
const X_H3 = 10.5;

function railX(heading: TocHeading, index: number) {
  return heading.style === "h3" || index % 3 === 1 ? X_H3 : X_H2;
}

function circuitMaskStyle(headings: TocHeading[]) {
  const step = LINK_HEIGHT_REM * SVG_UNITS_PER_REM;
  const svgHeight = headings.length * step;
  let path = "";
  let currentX = X_H2;
  let y = 0;

  headings.forEach((heading, index) => {
    const targetX = railX(heading, index);
    const next = headings[index + 1];
    const nextY = y + step;
    const nextChanges = next ? railX(next, index + 1) !== targetX : false;

    if (index === 0) {
      path += `M ${targetX} ${y}`;
      currentX = targetX;
    }

    if (targetX !== currentX) {
      path += ` L ${targetX} ${y + JOG}`;
      currentX = targetX;
    }

    path += ` L ${currentX} ${nextY - (nextChanges ? JOG : 0)}`;
    y = nextY;
  });

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 ${svgHeight}'><path d='${path}' fill='none' stroke='black' stroke-width='1.25'/></svg>`;
  const maskImage = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  return {
    width: "0.75rem",
    height: `${headings.length * LINK_HEIGHT_REM}rem`,
    maskImage,
    WebkitMaskImage: maskImage,
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
  } satisfies CSSProperties;
}

function useTocState(ids: string[]) {
  const reduceMotion = useReducedMotion();
  const raw = useMotionValue(0);
  const sprung = useSpring(raw, { stiffness: 140, damping: 32, restDelta: 0.001 });
  const [activeId, setActiveId] = useState(ids[0] ?? "");

  useEffect(() => {
    if (ids.length === 0) return;

    let lastId = ids[0] ?? "";

    const update = () => {
      const marker = Math.min(128, window.innerHeight * 0.22);
      const tops = ids.map((id) => document.getElementById(id)?.getBoundingClientRect().top);

      let index = 0;
      for (let i = 0; i < tops.length; i++) {
        const top = tops[i];
        if (top != null && top <= marker) index = i;
      }

      const hashId = window.location.hash.slice(1);
      const hashIndex = hashId ? ids.indexOf(hashId) : -1;
      if (hashIndex >= 0 && (tops[hashIndex] ?? Number.POSITIVE_INFINITY) <= marker + 48) {
        index = Math.max(index, hashIndex);
      }

      const nextId = ids[index] ?? "";
      if (nextId !== lastId) {
        lastId = nextId;
        setActiveId(nextId);
      }

      const current = tops[index];
      const next = tops[index + 1];
      let local = 0.55;

      if (current != null && next != null) {
        local = (marker - current) / Math.max(next - current, 1);
        local = Math.min(Math.max(local, 0.55), 1);
      } else if (current != null && current <= marker) {
        local = 1;
      }

      raw.set(Math.min(Math.max((index + local) / ids.length, 0), 1));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("hashchange", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("hashchange", update);
    };
  }, [ids, raw]);

  return {
    progress: reduceMotion ? raw : sprung,
    activeId,
  };
}

function TocList({
  headings,
  activeId,
  progress,
  maskStyle,
  onNavigate,
}: {
  headings: TocHeading[];
  activeId: string;
  progress: ReturnType<typeof useSpring>;
  maskStyle: CSSProperties;
  onNavigate?: () => void;
}) {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 hidden bg-zinc-200 lg:block"
        style={maskStyle}
      >
        <motion.div
          className="absolute inset-0 origin-top bg-[#2462ff]"
          style={{ scaleY: progress }}
        />
      </div>
      <ol>
        {headings.map((heading) => {
          const active = heading.id === activeId;
          return (
            <li key={heading.id} className="py-1.5 lg:h-7 lg:py-0">
              <a
                href={`#${heading.id}`}
                aria-current={active ? "location" : undefined}
                onClick={onNavigate}
                className={cn(
                  "flex h-full items-center text-sm leading-snug transition-colors",
                  heading.style === "h3" ? "pl-4 lg:pl-8" : "pl-0 lg:pl-6",
                  active
                    ? "font-medium text-[#2462ff]"
                    : "text-zinc-400 hover:text-zinc-700",
                )}
              >
                <span className="text-pretty lg:truncate">{heading.text}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default function BlogOnThisPage({ headings }: { headings: TocHeading[] }) {
  const ids = useMemo(() => headings.map((heading) => heading.id), [headings]);
  const maskStyle = useMemo(() => circuitMaskStyle(headings), [headings]);
  const { progress, activeId } = useTocState(ids);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-16 z-20 -mx-5 mb-8 border-y bg-background/95 px-5 backdrop-blur-sm lg:static lg:top-24 lg:z-auto lg:col-start-2 lg:row-start-1 lg:mx-0 lg:mb-0 lg:self-start lg:border-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none"
    >
      <div className="lg:hidden">
        <Accordion
          value={mobileOpen ? ["toc"] : []}
          onValueChange={(value) =>
            setMobileOpen(Array.isArray(value) ? value.includes("toc") : value === "toc")
          }
        >
          <AccordionItem value="toc" className="border-0">
            <AccordionTrigger className="py-3.5 text-xs font-medium tracking-wide text-zinc-400 uppercase hover:no-underline hover:text-zinc-700">
              On this page
            </AccordionTrigger>
            <AccordionContent className="[&_a]:no-underline">
              <div className="max-h-[min(22rem,55vh)] overflow-y-auto overscroll-contain">
                <TocList
                  headings={headings}
                  activeId={activeId}
                  progress={progress}
                  maskStyle={maskStyle}
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="hidden lg:block">
        <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
          On this page
        </p>
        <div className="mt-4">
          <TocList
            headings={headings}
            activeId={activeId}
            progress={progress}
            maskStyle={maskStyle}
          />
        </div>
      </div>
    </nav>
  );
}
