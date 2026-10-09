"use client";

import Image from "next/image";
import { useState } from "react";

import { brand } from "@/components/Home/brand";
import { cn } from "@/lib/utils";
import {
  AUDIT_OFFER_NAME,
  auditFixEvidenceShots,
  auditFixReportChapters,
  auditFixReportExtras,
  auditFixReportHero,
} from "./content";

/**
 * What the Audit actually looks like. Media does the explaining.
 */
export default function AuditFixShow() {
  const [activeId, setActiveId] = useState(auditFixReportChapters[0].id);
  const active =
    auditFixReportChapters.find((c) => c.id === activeId) ??
    auditFixReportChapters[0];

  return (
    <section
      className="w-full overflow-hidden rounded-2xl bg-white py-10 sm:py-16 md:py-20"
      aria-labelledby="audit-offer-show-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p
          className="text-xs font-bold tracking-[0.12em] uppercase sm:text-sm"
          style={{ color: brand.tertiary }}
        >
          Inside the {AUDIT_OFFER_NAME}
        </p>
        <h2
          id="audit-offer-show-heading"
          className="mt-2 text-[1.5rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          What a finding looks like
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed sm:mt-4 sm:text-lg"
          style={{ color: brand.body }}
        >
          Evidence pages, not essays. Scores, who wins instead, and the ranked
          plan to close the gap.
        </p>
      </div>

      {/* Dominant report collage */}
      <div className="relative mx-auto mt-8 max-w-5xl px-4 sm:mt-12 sm:px-6">
        <figure
          className="relative overflow-hidden rounded-xl sm:rounded-2xl"
          style={{ backgroundColor: "#e8ebe6" }}
        >
          <div className="relative aspect-[5/4] sm:aspect-[16/11]">
            <Image
              src={auditFixReportHero.src}
              alt={auditFixReportHero.label}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 64rem"
            />
          </div>
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/20 to-transparent px-4 pb-4 pt-16 sm:px-6 sm:pb-5">
            <p className="text-center text-xs font-semibold text-white/95 sm:text-sm">
              {auditFixReportHero.caption}
            </p>
          </figcaption>
        </figure>
      </div>

      {/* Chapter gallery */}
      <div className="mx-auto mt-10 max-w-5xl px-4 sm:mt-14 sm:px-6">
        <div
          className="flex gap-1 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Report chapters"
        >
          {auditFixReportChapters.map((chapter) => {
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
                  "shrink-0 border-b-2 px-3 py-2.5 text-left text-sm font-semibold transition-colors sm:px-3.5",
                  selected
                    ? "border-[#025864] text-[#025864]"
                    : "border-transparent text-zinc-500 hover:text-zinc-800",
                )}
              >
                {chapter.title}
              </button>
            );
          })}
        </div>

        <div
          id="audit-chapter-panel"
          role="tabpanel"
          aria-labelledby={`audit-chapter-tab-${active.id}`}
          className="mt-5"
        >
          <figure
            className="relative overflow-hidden rounded-xl ring-1 ring-black/5 sm:rounded-2xl"
            style={{ backgroundColor: "#eef0eb" }}
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9]">
              <Image
                key={active.src}
                src={active.src}
                alt={active.label}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 64rem"
              />
            </div>
          </figure>
          <p
            className="mt-3 text-center text-sm font-medium sm:text-base"
            style={{ color: brand.bodyStrong }}
          >
            {active.tagline}
          </p>
        </div>
      </div>

      {/* Live answer evidence */}
      <div className="mx-auto mt-12 max-w-5xl px-4 sm:mt-16 sm:px-6">
        <p
          className="text-center text-xs font-bold tracking-[0.1em] uppercase"
          style={{ color: brand.tertiary }}
        >
          Live answer evidence
        </p>
        <ul className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-3 sm:gap-4">
          {auditFixEvidenceShots.map((shot) => (
            <li key={shot.src}>
              <figure
                className="overflow-hidden rounded-xl ring-1 ring-black/5"
                style={{ backgroundColor: "#0c242b" }}
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={shot.src}
                    alt={shot.label}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <figcaption className="border-t border-white/10 px-3 py-2.5 text-xs font-semibold text-white/80">
                  {shot.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      {/* Extra report pages */}
      <div className="mx-auto mt-10 max-w-5xl px-4 sm:mt-12 sm:px-6">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {auditFixReportExtras.map((extra) => (
            <li key={extra.src}>
              <figure
                className="overflow-hidden rounded-xl ring-1 ring-black/5"
                style={{ backgroundColor: "#eef0eb" }}
              >
                <div className="relative aspect-[5/4]">
                  <Image
                    src={extra.src}
                    alt={extra.label}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <figcaption
                  className="px-2.5 py-2 text-[11px] font-semibold sm:text-xs"
                  style={{ color: brand.bodyStrong }}
                >
                  {extra.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>

      <p
        className="mx-auto mt-10 max-w-xl px-6 text-center text-sm font-medium leading-relaxed sm:mt-12"
        style={{ color: brand.body }}
      >
        Standalone diagnostic. If you book us for implementation, the audit fee
        is credited toward that engagement.
      </p>
    </section>
  );
}
