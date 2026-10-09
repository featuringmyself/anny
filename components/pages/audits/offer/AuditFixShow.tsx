"use client";

import Image from "next/image";
import { useState } from "react";

import { brand } from "@/components/Home/brand";
import { cn } from "@/lib/utils";
import { auditFixReportChapters } from "./content";

type Chapter = (typeof auditFixReportChapters)[number];

const overview =
  auditFixReportChapters.find((c) => c.id === "overview") ??
  auditFixReportChapters[0];

function FindingMedia({
  chapter,
  priority = false,
}: {
  chapter: Chapter;
  priority?: boolean;
}) {
  if (chapter.kind === "video") {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover object-top"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={"poster" in chapter ? chapter.poster : undefined}
        aria-label={chapter.label}
      >
        <source src={chapter.src} type="video/webm" />
      </video>
    );
  }

  return (
    <Image
      src={chapter.src}
      alt={chapter.label}
      fill
      priority={priority}
      className="object-cover object-top"
      sizes="(max-width: 768px) 100vw, 70vw"
    />
  );
}

/**
 * Desktop: chapter rail + finding stage.
 * Mobile: one proof image — no stacked cards.
 */
export default function AuditFixShow() {
  const [activeId, setActiveId] = useState(auditFixReportChapters[0].id);
  const activeIndex = auditFixReportChapters.findIndex((c) => c.id === activeId);
  const active =
    auditFixReportChapters[activeIndex >= 0 ? activeIndex : 0] ??
    auditFixReportChapters[0];
  const indexLabel = String(activeIndex + 1).padStart(2, "0");
  const totalLabel = String(auditFixReportChapters.length).padStart(2, "0");

  return (
    <section
      className="w-full overflow-hidden rounded-2xl bg-[#f6f7f4]"
      aria-labelledby="audit-offer-show-heading"
    >
      <div className="mx-auto max-w-6xl px-5 pt-8 sm:px-8 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="audit-offer-show-heading"
            className="text-[1.35rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
            style={{ color: brand.tertiary }}
          >
            What a finding looks like
          </h2>
          <p
            className="mx-auto mt-2 max-w-md text-sm font-medium leading-relaxed sm:mt-4 sm:text-base"
            style={{ color: brand.body }}
          >
            <span className="md:hidden">A page from a real report.</span>
            <span className="hidden md:inline">Open a chapter. See the page.</span>
          </p>
        </div>

        {/* Mobile: single proof shot */}
        <figure className="mt-6 overflow-hidden rounded-2xl bg-[#0c242b] ring-1 ring-black/5 md:hidden">
          <div className="relative aspect-[5/4]">
            <FindingMedia chapter={overview} priority />
          </div>
          <figcaption className="border-t border-white/10 px-4 py-3">
            <p className="text-sm font-medium leading-snug text-white">
              {overview.tagline}
            </p>
          </figcaption>
        </figure>

        {/* Desktop: rail + stage */}
        <div className="mt-12 hidden md:mt-14 md:block">
          <div className="grid items-stretch gap-5 md:grid-cols-[13.5rem_minmax(0,1fr)] lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-6">
            <nav
              className="flex flex-col justify-between"
              aria-label="Report chapters"
            >
              <div
                className="flex flex-col gap-0.5"
                role="tablist"
                aria-orientation="vertical"
              >
                {auditFixReportChapters.map((chapter, i) => {
                  const selected = chapter.id === active.id;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      id={`audit-chapter-tab-${chapter.id}`}
                      aria-controls="audit-chapter-panel"
                      onClick={() => setActiveId(chapter.id)}
                      className={cn(
                        "group flex cursor-pointer items-baseline gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        selected
                          ? "bg-white shadow-sm ring-1 ring-zinc-900/8"
                          : "hover:bg-white/80",
                      )}
                    >
                      <span
                        className={cn(
                          "shrink-0 text-[11px] font-bold tabular-nums tracking-wide",
                          selected ? "text-[#025864]" : "text-zinc-400",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={cn(
                          "text-sm font-semibold leading-snug",
                          selected
                            ? "text-[#025864]"
                            : "text-zinc-600 group-hover:text-zinc-900",
                        )}
                      >
                        {chapter.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <p
                className="mt-6 px-3 text-[11px] font-semibold tracking-[0.08em] uppercase tabular-nums"
                style={{ color: brand.body }}
                aria-hidden
              >
                {indexLabel} / {totalLabel}
              </p>
            </nav>

            <div
              id="audit-chapter-panel"
              role="tabpanel"
              aria-labelledby={`audit-chapter-tab-${active.id}`}
              className="min-w-0"
            >
              <figure className="relative overflow-hidden rounded-2xl bg-[#0c242b] ring-1 ring-black/5">
                <div className="relative aspect-[16/10] lg:aspect-[16/11]">
                  <FindingMedia key={active.id} chapter={active} />
                  <div
                    className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-7 pb-6 pt-20"
                    aria-hidden
                  >
                    <p className="text-xs font-bold tracking-[0.1em] uppercase text-white/55">
                      {indexLabel} · {active.title}
                    </p>
                    <p className="mt-1.5 max-w-lg text-base font-medium leading-snug text-white">
                      {active.tagline}
                    </p>
                  </div>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <div className="h-8 sm:h-16 md:h-20" aria-hidden />
    </section>
  );
}
