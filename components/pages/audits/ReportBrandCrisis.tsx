import Image from "next/image";

import { MODEL_META } from "./models";
import type { VisibilityReport } from "./types";

type ReportBrandCrisisProps = {
  report: VisibilityReport;
};

export default function ReportBrandCrisis({ report }: ReportBrandCrisisProps) {
  if (!report.brandCrisis?.length) return null;

  return (
    <section className="border-b">
      <div className="border-b px-6 py-8 md:px-12">
        <p className="mb-2 text-sm font-medium text-[#2462ff]">
          Critical · brand & trust
        </p>
        <h2 className="max-w-2xl text-2xl font-medium tracking-tight text-balance md:text-3xl">
          {report.brandCrisisHeadline ??
            `When someone checks if ${report.company} is real, AI answers the wrong company, or warns them away`}
        </h2>
        <p className="mt-2 max-w-xl text-sm text-zinc-500">
          {report.brandCrisisDek ??
            "These two prompts matter more than any “best of” list."}
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        {report.brandCrisis.map((item, index) => {
          const meta = MODEL_META[item.screenshot.model];
          return (
            <article
              key={item.id}
              className={`flex flex-col border-b lg:border-b-0 ${
                index === 0 ? "lg:border-r" : ""
              }`}
            >
              <div className="flex flex-1 flex-col px-6 py-8 md:px-10">
                <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                  Prompt
                </p>
                <h3 className="mt-2 text-xl font-medium tracking-tight text-balance">
                  {item.query}
                </h3>
                <p className="mt-1 text-sm font-medium text-[#2462ff]">
                  {item.outcome}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600">
                  <span className="font-medium text-zinc-900">{item.title}. </span>
                  {item.body}
                </p>
              </div>

              <div className="border-t bg-zinc-100/80 p-4 md:p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-zinc-500">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={meta.logo}
                    alt=""
                    width={14}
                    height={14}
                    className="size-3.5 object-contain"
                    draggable={false}
                  />
                  {meta.name} · live answer
                </div>
                <div className="overflow-hidden border border-zinc-200 bg-zinc-950 shadow-sm">
                  <Image
                    src={item.screenshot.src}
                    alt={item.screenshot.alt}
                    width={1200}
                    height={900}
                    className="h-auto w-full"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
