import Image from "next/image";

import { brand } from "@/components/Home/brand";
import { snapshotSteps } from "./content";

import promptTracking from "@/public/partnership/agencies/ws-prompt-tracking.webp";
import audits from "@/public/partnership/agencies/ws-audits.webp";
import comparison from "@/public/metrics/allAIGraph.webp";
import actionPlans from "@/public/partnership/agencies/feature-action-plans.webp";

const stepMedia = [promptTracking, audits, comparison, actionPlans] as const;

export default function StandingsHow() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-10 sm:py-16 md:py-20"
      aria-labelledby="standings-how-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="standings-how-heading"
          className="text-[1.5rem] font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          From brief to branded PDF
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed sm:mt-4 sm:text-lg"
          style={{ color: brand.body }}
        >
          Four steps. Same day for most orders once prompts are approved.
        </p>
      </div>

      {/* Mobile: numbered list, no stacked images */}
      <ol className="mx-auto mt-8 flex max-w-5xl flex-col gap-0 px-6 sm:hidden">
        {snapshotSteps.map((item) => (
          <li
            key={item.step}
            className="flex gap-3 border-t border-zinc-900/10 py-4 first:border-t-0 first:pt-0"
          >
            <span
              className="mt-0.5 shrink-0 text-xs font-bold tabular-nums"
              style={{ color: brand.tertiary }}
            >
              {item.step}
            </span>
            <div>
              <h3 className="text-[15px] font-bold tracking-tight text-zinc-900">
                {item.title}
              </h3>
              <p
                className="mt-1 text-sm font-medium leading-snug"
                style={{ color: brand.body }}
              >
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop+: media cards */}
      <ol className="mx-auto mt-12 hidden max-w-5xl gap-4 px-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
        {snapshotSteps.map((item, i) => (
          <li
            key={item.step}
            className="overflow-hidden rounded-2xl border text-left"
            style={{
              backgroundColor: brand.cream,
              borderColor: `${brand.ink}14`,
            }}
          >
            <div className="relative aspect-16/10">
              <Image
                src={stepMedia[i]}
                alt=""
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 25vw"
              />
            </div>
            <div className="p-5">
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: brand.tertiary }}
              >
                {item.step}
              </span>
              <h3 className="mt-1.5 text-base font-bold tracking-tight text-zinc-900">
                {item.title}
              </h3>
              <p
                className="mt-2 text-sm font-medium leading-relaxed"
                style={{ color: brand.body }}
              >
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
