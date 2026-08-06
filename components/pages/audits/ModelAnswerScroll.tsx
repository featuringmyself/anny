"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { MODEL_META } from "./models";
import type {
  ModelAnswer,
  QueryFinding,
  QueryScreenshot,
  RentokStatus,
} from "./types";

function highlightBrand(text: string, brand: string) {
  const parts = text.split(new RegExp(`(${brand})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === brand.toLowerCase() ? (
      <mark
        key={`${part}-${i}`}
        className="rounded-sm bg-[#2462ff]/10 font-medium text-[#2462ff]"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${i}`}>{part}</span>
    ),
  );
}

function statusLabel(status: RentokStatus) {
  switch (status) {
    case "confused":
      return "Wrong brand";
    case "warned":
      return "Trust warning";
    case "cited":
      return "Cited";
    default:
      return "Not cited";
  }
}

function AnswerCard({
  answer,
  brand,
  query,
}: {
  answer: ModelAnswer;
  brand: string;
  query: string;
}) {
  const meta = MODEL_META[answer.model];

  return (
    <article className="flex w-[min(100%,340px)] shrink-0 snap-center flex-col border bg-white sm:w-[380px]">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={meta.logo}
            alt=""
            width={16}
            height={16}
            className="size-4 object-contain"
            draggable={false}
          />
          <span className="text-sm font-medium">{meta.shortName}</span>
        </div>
        <span
          className={`text-xs font-medium ${
            answer.cited ? "text-[#2462ff]" : "text-zinc-400"
          }`}
        >
          {answer.cited
            ? answer.position
              ? `Cited · #${answer.position}`
              : "Cited"
            : "Not cited"}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="ml-auto max-w-[92%] rounded-2xl bg-zinc-900 px-3.5 py-2.5 text-xs leading-relaxed text-white">
          {query}
        </div>
        <div className="mr-auto flex max-w-[95%] flex-col gap-2 rounded-2xl border px-3.5 py-3 text-sm leading-relaxed text-zinc-700">
          <span
            className="text-[11px] font-medium tracking-wide uppercase"
            style={{ color: meta.accent }}
          >
            {meta.name}
          </span>
          <p>{highlightBrand(answer.excerpt, brand)}</p>
          {answer.sources?.length ? (
            <ul className="mt-1 flex flex-wrap gap-1.5 border-t pt-2">
              {answer.sources.map((source) => (
                <li
                  key={source}
                  className="border border-zinc-200 px-1.5 py-0.5 text-[10px] text-zinc-500"
                >
                  {source}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ScreenshotCard({ shot }: { shot: QueryScreenshot }) {
  const meta = MODEL_META[shot.model];

  return (
    <article className="flex w-[min(100%,420px)] shrink-0 snap-center flex-col sm:w-[480px]">
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-400">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={meta.logo}
          alt=""
          width={12}
          height={12}
          className="size-3 object-contain"
          draggable={false}
        />
        <span>
          {shot.label ? (
            <>
              <span className="font-medium text-zinc-700">{shot.label}</span>
              {" · "}
            </>
          ) : null}
          {meta.name}
        </span>
        {shot.prompt ? (
          <span className="w-full font-mono text-[11px] text-zinc-500">
            “{shot.prompt}”
          </span>
        ) : null}
      </div>
      <div className="overflow-hidden border border-zinc-200 bg-zinc-950">
        <Image
          src={shot.src}
          alt={shot.alt}
          width={1200}
          height={900}
          className="h-auto w-full"
          sizes="(max-width: 768px) 100vw, 480px"
        />
      </div>
    </article>
  );
}

type ModelAnswerScrollProps = {
  finding: QueryFinding;
  brand: string;
  index: number;
};

export default function ModelAnswerScroll({
  finding,
  brand,
  index,
}: ModelAnswerScrollProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  // Multi-shot scroll chrome only when explicitly provided as 2+ screenshots
  // (e.g. Truliv q10). Single `screenshot` keeps the pre-existing full-width UI.
  const multiShots =
    finding.screenshots && finding.screenshots.length > 1
      ? finding.screenshots
      : null;
  const singleShot =
    finding.screenshot ??
    (finding.screenshots?.length === 1 ? finding.screenshots[0] : undefined);
  const singleShotMeta = singleShot ? MODEL_META[singleShot.model] : null;
  const multiAnswers =
    finding.answers.length > 1 && !multiShots && !singleShot;
  const isCritical = finding.severity === "critical";

  function scrollByCard(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = Math.min(400, el.clientWidth * 0.85) * direction;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <motion.article
      className="border-b"
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.2) }}
    >
      <div className="grid gap-6 px-6 py-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] md:gap-10 md:px-12 md:py-12">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
              Prompt {String(index + 1).padStart(2, "0")}
            </p>
            {finding.tag ? (
              <span className="border border-[#2462ff]/30 px-2 py-0.5 text-[11px] font-medium text-[#2462ff]">
                {finding.tag}
              </span>
            ) : null}
            {isCritical ? (
              <span className="border border-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-900">
                Critical
              </span>
            ) : null}
          </div>
          <h3 className="mt-2 text-xl font-medium tracking-tight text-balance md:text-2xl">
            {finding.query}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            {finding.intent}
          </p>

          <div className="mt-5 border border-zinc-200 bg-white px-3 py-3">
            <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              {brand} in this answer
            </p>
            <p
              className={`mt-1 text-sm font-medium ${
                finding.rentokStatus === "cited"
                  ? "text-[#2462ff]"
                  : "text-zinc-900"
              }`}
            >
              {statusLabel(finding.rentokStatus)}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              {finding.outcome}
            </p>
          </div>

          {finding.citedBrands.length > 0 ? (
            <div className="mt-4">
              <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
                Who got cited instead
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {finding.citedBrands.map((name) => (
                  <li
                    key={name}
                    className="border border-zinc-200 px-2 py-1 text-xs text-zinc-600"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="min-w-0">
          {multiShots ? (
            <>
              <div className="mb-3 flex items-center justify-between gap-3">
                <p className="text-xs text-zinc-400">
                  Scroll to compare the same style ask
                </p>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => scrollByCard(-1)}
                    className="grid size-8 place-items-center border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollByCard(1)}
                    className="grid size-8 place-items-center border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              <div
                ref={scrollerRef}
                className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {multiShots.map((shot) => (
                  <ScreenshotCard
                    key={`${shot.src}-${shot.label ?? shot.alt}`}
                    shot={shot}
                  />
                ))}
              </div>
            </>
          ) : singleShot && singleShotMeta ? (
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs text-zinc-400">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={singleShotMeta.logo}
                  alt=""
                  width={12}
                  height={12}
                  className="size-3 object-contain"
                  draggable={false}
                />
                {singleShotMeta.name} · captured answer
              </div>
              <div className="overflow-hidden border border-zinc-200 bg-zinc-950">
                <Image
                  src={singleShot.src}
                  alt={singleShot.alt}
                  width={1200}
                  height={900}
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 55vw"
                />
              </div>
            </div>
          ) : (
            <>
              {multiAnswers ? (
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs text-zinc-400">
                    Scroll to compare the same prompt across models
                  </p>
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => scrollByCard(-1)}
                      className="grid size-8 place-items-center border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100"
                      aria-label="Previous model answer"
                    >
                      <ChevronLeft className="size-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollByCard(1)}
                      className="grid size-8 place-items-center border border-zinc-200 text-zinc-600 transition-colors hover:bg-zinc-100"
                      aria-label="Next model answer"
                    >
                      <ChevronRight className="size-4" />
                    </button>
                  </div>
                </div>
              ) : null}

              <div
                ref={scrollerRef}
                className={`flex gap-4 overflow-x-auto pb-2 ${
                  multiAnswers
                    ? "snap-x snap-mandatory scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    : ""
                }`}
              >
                {finding.answers.map((answer) => (
                  <AnswerCard
                    key={answer.model}
                    answer={answer}
                    brand={brand}
                    query={finding.query}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </motion.article>
  );
}
