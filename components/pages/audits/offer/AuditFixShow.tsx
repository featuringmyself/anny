import Image from "next/image";

import { brand } from "@/components/Home/brand";
import { auditFixShow } from "./content";

function Media({ item }: { item: (typeof auditFixShow)[number] }) {
  return (
    <figure
      className="relative aspect-16/10 overflow-hidden rounded-xl sm:rounded-2xl"
      style={{ backgroundColor: "#eef0eb" }}
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
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      )}
    </figure>
  );
}

/**
 * What the Audit actually looks like. Media does the explaining.
 */
export default function AuditFixShow() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-10 sm:py-16 md:py-20"
      aria-labelledby="audit-offer-show-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="audit-offer-show-heading"
          className="text-[1.5rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.25rem]"
          style={{ color: brand.tertiary }}
        >
          What you open in the report
        </h2>
        <p
          className="mx-auto mt-3 max-w-lg text-sm font-medium leading-relaxed sm:mt-4 sm:text-lg"
          style={{ color: brand.body }}
        >
          Scores, who wins instead, why their pages get cited, why yours
          don&apos;t, and what to publish next.
        </p>
      </div>

      {/* Mobile accordion */}
      <div className="mx-auto mt-8 max-w-3xl px-6 md:hidden">
        {auditFixShow.map((item, index) => (
          <details
            key={item.title}
            name="audit-show"
            className="group border-b border-zinc-900/10 first:border-t"
            open={index === 0}
          >
            <summary className="cursor-pointer list-none py-4 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span
                  className="text-left text-[15px] font-bold tracking-tight"
                  style={{ color: brand.tertiary }}
                >
                  {item.title}
                </span>
                <span
                  className="mt-0.5 shrink-0 text-lg leading-none text-zinc-400 transition-transform duration-300 ease-out group-open:rotate-45"
                  aria-hidden
                >
                  +
                </span>
              </span>
            </summary>
            <div className="grid gap-4 pb-5">
              <p
                className="text-sm font-medium leading-relaxed"
                style={{ color: brand.bodyStrong }}
              >
                {item.body}
              </p>
              <Media item={item} />
            </div>
          </details>
        ))}
      </div>

      {/* Desktop narrative */}
      <ul className="mx-auto mt-14 hidden max-w-5xl flex-col gap-16 px-6 md:flex lg:gap-20">
        {auditFixShow.map((item) => (
          <li
            key={item.title}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
          >
            <div
              className={
                item.mediaFirst ? "order-2 md:order-1" : "order-2 md:order-2"
              }
            >
              <Media item={item} />
            </div>
            <div
              className={
                item.mediaFirst ? "order-1 md:order-2" : "order-1 md:order-1"
              }
            >
              <h3
                className="text-2xl font-bold tracking-tight sm:text-[1.75rem]"
                style={{ color: brand.tertiary }}
              >
                {item.title}
              </h3>
              <p
                className="mt-3 max-w-md text-[15px] font-medium leading-relaxed sm:text-base"
                style={{ color: brand.bodyStrong }}
              >
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
