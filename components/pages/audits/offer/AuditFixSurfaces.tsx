import Image from "next/image";

import { brand } from "@/components/Home/brand";
import { auditFixSurfaces } from "./content";

export default function AuditFixSurfaces() {
  return (
    <section
      className="hidden w-full overflow-hidden rounded-2xl sm:block"
      style={{ backgroundColor: brand.cream }}
      aria-labelledby="audit-offer-surfaces-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-10 text-center sm:pt-16 md:pt-20">
        <h2
          id="audit-offer-surfaces-heading"
          className="text-[1.5rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          Three places you win or lose
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed sm:mt-4 sm:text-lg"
          style={{ color: brand.body }}
        >
          Site, content, and authority. We dig into all three, then rank what
          closes the gap.
        </p>
      </div>

      <ol className="mx-auto mt-8 grid max-w-5xl gap-4 px-6 pb-10 sm:mt-12 sm:grid-cols-3 sm:pb-16 md:pb-20">
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
                sizes="(max-width: 640px) 100vw, 33vw"
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
