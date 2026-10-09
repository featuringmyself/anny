import Image from "next/image";

import { brand } from "@/components/Home/brand";
import { auditFixStory } from "./content";

function StoryMedia({
  item,
  compact = false,
}: {
  item: (typeof auditFixStory)[number];
  compact?: boolean;
}) {
  return (
    <figure
      className={
        compact
          ? "relative aspect-16/10 overflow-hidden rounded-xl"
          : "relative aspect-16/10 overflow-hidden rounded-2xl"
      }
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
          sizes={compact ? "85vw" : "(max-width: 768px) 100vw, 33vw"}
        />
      )}
    </figure>
  );
}

/**
 * Same three beats everywhere. Mobile: snap row. Desktop: 3-col grid.
 */
export default function AuditFixStory() {
  return (
    <section
      id="story"
      className="scroll-mt-24 w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="audit-offer-story-heading"
    >
      <div className="mx-auto max-w-3xl px-4 pt-6 text-center sm:px-6 sm:pt-16 md:pt-20">
        <h2
          id="audit-offer-story-heading"
          className="text-[1.25rem] leading-tight font-bold tracking-tight text-white sm:text-4xl sm:leading-[1.15]"
        >
          The idea in three frames
        </h2>
        <p className="mx-auto mt-1.5 max-w-lg text-[13px] font-medium leading-snug text-neutral-200/90 sm:mt-4 sm:text-lg sm:leading-relaxed">
          AI already answers. The Audit shows who gets named, why, and what
          moves you onto the list.
        </p>
      </div>

      {/* Mobile: horizontal snap — same 3 frames, less vertical bulk */}
      <ol className="mt-4 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-4 pb-5 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden">
        {auditFixStory.map((item) => (
          <li
            key={item.step}
            className="w-[72%] shrink-0 snap-center text-left"
          >
            <StoryMedia item={item} compact />
            <p
              className="mt-2 text-[10px] font-bold tracking-[0.08em] uppercase"
              style={{ color: brand.lime }}
            >
              {item.step}
            </p>
            <h3 className="mt-0.5 text-[15px] font-bold tracking-tight text-white">
              {item.title}
            </h3>
            <p className="mt-0.5 text-[12px] font-medium leading-snug text-white/60">
              {item.body}
            </p>
          </li>
        ))}
      </ol>

      {/* Desktop grid */}
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
