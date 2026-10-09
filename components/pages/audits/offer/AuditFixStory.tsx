import Image from "next/image";

import { brand } from "@/components/Home/brand";
import { auditFixStory } from "./content";

function StoryMedia({
  item,
}: {
  item: (typeof auditFixStory)[number];
}) {
  return (
    <figure
      className="relative aspect-16/10 overflow-hidden rounded-2xl"
      style={{ backgroundColor: "#0c242b" }}
    >
      {item.kind === "video" ? (
        <video
          className="h-full w-full object-cover object-top"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={item.label}
        >
          <source src={item.src} type="video/webm" />
        </video>
      ) : (
        <Image
          src={item.src}
          alt={item.label}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
    </figure>
  );
}

/**
 * Desktop: three visual frames.
 * Mobile: compact text beats only — media lives in the findings section.
 */
export default function AuditFixStory() {
  return (
    <section
      id="story"
      className="scroll-mt-24 w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="audit-offer-story-heading"
    >
      <div className="mx-auto max-w-3xl px-5 pt-8 text-center sm:px-6 sm:pt-16 md:pt-20">
        <h2
          id="audit-offer-story-heading"
          className="text-[1.35rem] leading-[1.15] font-bold tracking-tight text-white sm:text-4xl"
        >
          The idea in three frames
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm font-medium leading-relaxed text-neutral-200/90 sm:mt-4 sm:text-lg">
          AI already answers. The Audit shows who gets named, why, and what
          moves you onto the list.
        </p>
      </div>

      {/* Mobile: text-only beats */}
      <ol className="mx-auto mt-6 flex max-w-lg flex-col gap-0 px-5 pb-8 sm:hidden">
        {auditFixStory.map((item) => (
          <li
            key={item.step}
            className="flex gap-3 border-t border-white/10 py-3.5 first:border-t-0 first:pt-0"
          >
            <span
              className="mt-0.5 shrink-0 text-xs font-bold tabular-nums"
              style={{ color: brand.lime }}
            >
              {item.step}
            </span>
            <div className="text-left">
              <h3 className="text-[15px] font-bold tracking-tight text-white">
                {item.title}
              </h3>
              <p className="mt-1 text-sm font-medium leading-snug text-white/55">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Desktop: visual frames */}
      <ol className="mx-auto mt-12 hidden max-w-6xl gap-4 px-6 pb-16 sm:grid sm:grid-cols-3 md:pb-20">
        {auditFixStory.map((item) => (
          <li key={item.step} className="flex flex-col text-left">
            <StoryMedia item={item} />
            <p
              className="mt-4 text-xs font-bold tracking-[0.08em] uppercase"
              style={{ color: brand.lime }}
            >
              {item.step}
            </p>
            <h3 className="mt-1.5 text-xl font-bold tracking-tight text-white">
              {item.title}
            </h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-white/60">
              {item.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
