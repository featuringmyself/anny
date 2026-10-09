import Image from "next/image";

import { brand } from "@/components/Home/brand";
import { AUDIT_FIX_TURNAROUND } from "@/lib/audit-fix-pricing";
import { auditFixSteps } from "./content";

const stepMedia = [
  {
    kind: "image" as const,
    src: "/partnership/agencies/ws-prompt-tracking.webp",
  },
  {
    kind: "video" as const,
    src: "/services/videos/brand-visibility.webm",
  },
  {
    kind: "image" as const,
    src: "/partnership/agencies/feature-action-plans.webp",
  },
  {
    kind: "image" as const,
    src: "/metrics/searchQueries.webp",
  },
] as const;

export default function AuditFixHow() {
  return (
    <section
      className="hidden w-full rounded-2xl bg-white py-10 sm:block sm:py-16 md:py-20"
      aria-labelledby="audit-offer-how-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="audit-offer-how-heading"
          className="text-[1.5rem] font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          From brief to report
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed sm:mt-4 sm:text-lg"
          style={{ color: brand.body }}
        >
          Four steps. {AUDIT_FIX_TURNAROUND} once prompts are locked.
        </p>
      </div>

      <ol className="mx-auto mt-12 grid max-w-5xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {auditFixSteps.map((item, i) => {
          const media = stepMedia[i];
          return (
            <li
              key={item.step}
              className="overflow-hidden rounded-2xl border text-left"
              style={{
                backgroundColor: brand.cream,
                borderColor: `${brand.ink}14`,
              }}
            >
              <div className="relative aspect-16/10">
                {media.kind === "video" ? (
                  <video
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-hidden
                  >
                    <source src={media.src} type="video/webm" />
                  </video>
                ) : (
                  <Image
                    src={media.src}
                    alt=""
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 640px) 100vw, 25vw"
                  />
                )}
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
          );
        })}
      </ol>
    </section>
  );
}
