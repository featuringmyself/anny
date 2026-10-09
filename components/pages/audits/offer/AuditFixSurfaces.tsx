import Image from "next/image";

import { brand } from "@/components/Home/brand";
import { auditFixSurfaces } from "./content";

export default function AuditFixSurfaces() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.cream }}
      aria-labelledby="audit-offer-surfaces-heading"
    >
      <div className="mx-auto max-w-3xl px-4 pt-6 text-center sm:px-6 sm:pt-16 md:pt-20">
        <h2
          id="audit-offer-surfaces-heading"
          className="text-[1.25rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          Three places you win or lose
        </h2>
        <p
          className="mx-auto mt-1.5 max-w-lg text-[13px] font-medium leading-snug sm:mt-4 sm:text-lg sm:leading-relaxed"
          style={{ color: brand.body }}
        >
          Site, content, and authority. We dig into all three, then rank what
          closes the gap.
        </p>
      </div>

      {/* Mobile: compact rows with thumb */}
      <ol className="mx-auto mt-4 flex max-w-5xl flex-col gap-1.5 px-3.5 pb-5 sm:hidden">
        {auditFixSurfaces.map((surface, i) => (
          <li
            key={surface.title}
            className="flex gap-2.5 overflow-hidden rounded-lg border bg-white text-left"
            style={{ borderColor: `${brand.ink}14` }}
          >
            <div className="relative w-[4.5rem] shrink-0 self-stretch min-h-16">
              <Image
                src={surface.src}
                alt=""
                fill
                className="object-cover object-top"
                sizes="72px"
              />
            </div>
            <div className="min-w-0 py-2 pr-2.5">
              <p
                className="text-[10px] font-bold tabular-nums"
                style={{ color: brand.tertiary }}
              >
                {String(i + 1).padStart(2, "0")} · {surface.title}
              </p>
              <p
                className="mt-0.5 text-[12px] font-medium leading-snug"
                style={{ color: brand.body }}
              >
                {surface.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop cards */}
      <ol className="mx-auto mt-12 hidden max-w-5xl gap-4 px-6 pb-16 sm:grid sm:grid-cols-3 md:pb-20">
        {auditFixSurfaces.map((surface, i) => (
          <li
            key={surface.title}
            className="overflow-hidden rounded-2xl border bg-white text-left"
            style={{ borderColor: `${brand.ink}14` }}
          >
            <div className="relative aspect-16/10">
              <Image
                src={surface.src}
                alt={surface.label}
                fill
                className="object-cover object-top"
                sizes="33vw"
              />
            </div>
            <div className="p-5">
              <span
                className="text-xs font-bold tabular-nums"
                style={{ color: brand.tertiary }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-1.5 text-lg font-bold tracking-tight text-zinc-900">
                {surface.title}
              </h3>
              <p
                className="mt-2 text-sm font-medium leading-relaxed"
                style={{ color: brand.body }}
              >
                {surface.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
