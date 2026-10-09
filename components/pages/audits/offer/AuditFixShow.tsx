"use client";

import Image from "next/image";
import { useState } from "react";

import { brand } from "@/components/Home/brand";
import { cn } from "@/lib/utils";
import { auditFixReportChapters } from "./content";

type Chapter = (typeof auditFixReportChapters)[number];
type ChapterId = Chapter["id"];

const mobileChapters = auditFixReportChapters.filter((c) => c.mobileHighlight);

function FindingMedia({
  chapter,
  priority = false,
  sizes,
}: {
  chapter: Chapter;
  priority?: boolean;
  sizes: string;
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
      sizes={sizes}
    />
  );
}

/**
 * Desktop: chapter rail + finding stage.
 * Mobile: same pages as a snap row — full info, far less vertical bulk.
 */
export default function AuditFixShow() {
  const [activeId, setActiveId] = useState<ChapterId>(
    auditFixReportChapters[0].id,
  );
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
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-8 sm:pt-16 md:pt-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="audit-offer-show-heading"
            className="text-[1.25rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
            style={{ color: brand.tertiary }}
          >
            What a finding looks like
          </h2>
          <p
            className="mx-auto mt-1.5 max-w-md text-[13px] font-medium leading-snug sm:mt-4 sm:text-base sm:leading-relaxed"
            style={{ color: brand.body }}
          >
            <span className="md:hidden">Swipe the report pages.</span>
            <span className="hidden md:inline">Open a chapter. See the page.</span>
          </p>
        </div>

        {/* Mobile: horizontal snap — same highlights, one card tall */}
        <ol className="mt-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-5 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden">
          {mobileChapters.map((chapter, i) => (
            <li
              key={chapter.id}
              className="w-[82%] shrink-0 snap-center"
            >
              <figure className="overflow-hidden rounded-xl bg-[#0c242b] ring-1 ring-black/5">
                <div className="relative aspect-[16/10]">
                  <FindingMedia
                    chapter={chapter}
                    priority={i === 0}
                    sizes="85vw"
                  />
                </div>
                <figcaption className="border-t border-white/10 px-3 py-2.5">
                  <p className="text-[10px] font-bold tracking-[0.08em] uppercase text-white/45">
                    {String(i + 1).padStart(2, "0")} · {chapter.title}
                  </p>
                  <p className="mt-0.5 text-[13px] font-medium leading-snug text-white">
                    {chapter.tagline}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>

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
                  <FindingMedia
                    key={active.id}
                    chapter={active}
                    sizes="70vw"
                  />
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

      <div className="hidden h-16 md:block md:h-20" aria-hidden />
    </section>
  );
}
