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
      className="relative aspect-[4/3] overflow-hidden rounded-xl sm:aspect-16/10 sm:rounded-2xl"
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
 * The whole offer in three beats. Visitors should get it without reading a wall.
 */
export default function AuditFixStory() {
  return (
    <section
      id="story"
      className="scroll-mt-24 w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="audit-offer-story-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-10 text-center sm:pt-16 md:pt-20">
        <h2
          id="audit-offer-story-heading"
          className="text-[1.5rem] leading-[1.15] font-bold tracking-tight text-white sm:text-4xl"
        >
          The idea in three frames
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed text-neutral-200/90 sm:mt-4 sm:text-lg">
          AI already answers. The Audit shows who gets named, why, and what
          moves you onto the list.
        </p>
      </div>

      <ol className="mx-auto mt-8 grid max-w-6xl gap-4 px-6 pb-10 sm:mt-12 sm:grid-cols-3 sm:pb-16 md:pb-20">
        {auditFixStory.map((item) => (
          <li key={item.step} className="flex flex-col text-left">
            <StoryMedia item={item} />
            <p
              className="mt-4 text-xs font-bold tracking-[0.08em] uppercase"
              style={{ color: brand.lime }}
            >
              {item.step}
            </p>
            <h3 className="mt-1.5 text-lg font-bold tracking-tight text-white sm:text-xl">
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
