import type { ReactNode } from "react";

import { brand } from "@/components/Home/brand";

/**
 * One job: make clear citation work is not limited to the website or agent.
 * Brand tiles share one size; marks are tuned to the same optical weight so
 * nothing reads as minified next to a full logo.
 */

function WebsiteMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M3.5 12h17M12 3.5c2.4 2.6 3.6 5.4 3.6 8.5s-1.2 5.9-3.6 8.5c-2.4-2.6-3.6-5.4-3.6-8.5s1.2-5.9 3.6-8.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
    </svg>
  );
}

function RedditMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M14.2 3.6c.1.7.5 1.3 1.1 1.6l2.5-.9.5 1.5-2.2.8c.3.6.4 1.3.4 2 .8.4 1.4 1.2 1.4 2.2 0 .8-.4 1.5-1 1.9.1.4.1.8.1 1.2 0 2.9-3.1 5.2-7 5.2s-7-2.3-7-5.2c0-.4 0-.8.1-1.2-.6-.4-1-1.1-1-1.9 0-1 .6-1.8 1.4-2.2 0-.7.1-1.4.4-2l-2.2-.8.5-1.5 2.5.9c.6-.3 1-.9 1.1-1.6h1.6c.1.7.5 1.3 1.1 1.6.5-.2 1-.3 1.6-.3s1.1.1 1.6.3c.6-.3 1-.9 1.1-1.6h1.6ZM8.6 12.2a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm6.8 0a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Zm-6 3.3c.8.7 2 1.1 3.4 1.1s2.6-.4 3.4-1.1c.2-.2.2-.4 0-.6-.2-.2-.4-.2-.6 0-.7.5-1.7.8-2.8.8s-2.1-.3-2.8-.8c-.2-.2-.4-.2-.6 0-.2.2-.2.4 0 .6Z"
      />
    </svg>
  );
}

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M6.4 9.2h2.8v8.3H6.4V9.2Zm1.4-4.4a1.6 1.6 0 1 1 0 3.2 1.6 1.6 0 0 1 0-3.2ZM11 9.2h2.7v1.1h.1c.4-.7 1.3-1.4 2.6-1.4 2.8 0 3.3 1.8 3.3 4.2v4.4h-2.8v-3.9c0-.9 0-2.1-1.3-2.1-1.3 0-1.5 1-1.5 2.1v3.9H11V9.2Z"
      />
    </svg>
  );
}

function YouTubeMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.7.5a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 1.9 12a28 28 0 0 0 .5 4.8 2.7 2.7 0 0 0 1.9 1.9c1.8.5 7.7.5 7.7.5s5.9 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .5-4.8 28 28 0 0 0-.5-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z"
      />
    </svg>
  );
}

function WikipediaMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M3.8 6.4h2.4l1.9 5.2L10.2 6.4h2.3L9.2 14.8H6.9L3.8 6.4Zm9.2 0h2.2l1.4 3.8 1.6-3.8H19l-3 6.8 1 2.6h-2.3l-.7-2-2.9-7.4Z"
      />
    </svg>
  );
}

function BeyondMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.8 13.3 8.6 19.2 9.9 13.3 11.2 12 17 10.7 11.2 4.8 9.9 10.7 8.6 12 2.8Zm6.4 9.2.7 3.1 3.1.7-3.1.7-.7 3.1-.7-3.1-3.1-.7 3.1-.7.7-3.1ZM5.2 14.4l.5 2.4 2.4.5-2.4.5-.5 2.4-.5-2.4-2.4-.5 2.4-.5.5-2.4Z"
      />
    </svg>
  );
}

const surfaces: ReadonlyArray<{
  name: string;
  detail: string;
  tile: string;
  Icon: () => ReactNode;
}> = [
  {
    name: "Your website",
    detail: "Owned pages, schema, and agent-ready content",
    tile: "#025864",
    Icon: WebsiteMark,
  },
  {
    name: "Reddit",
    detail: "Threads and communities models already trust",
    tile: "#FF4500",
    Icon: RedditMark,
  },
  {
    name: "LinkedIn",
    detail: "Thought leadership and company proof AI retrieves",
    tile: "#0A66C2",
    Icon: LinkedInMark,
  },
  {
    name: "YouTube",
    detail: "Video answers that shape Google AI surfaces",
    tile: "#FF0000",
    Icon: YouTubeMark,
  },
  {
    name: "Wikipedia & reviews",
    detail: "Reference pages, listicles, and third-party proof",
    tile: "#1B1B1B",
    Icon: WikipediaMark,
  },
  {
    name: "Whatever else it takes",
    detail: "PR, forums, niches — anywhere a citation can come from",
    tile: brand.tertiary,
    Icon: BeyondMark,
  },
];

export default function BeyondYourSite() {
  return (
    <section
      className="w-full overflow-hidden rounded-2xl"
      style={{ backgroundColor: brand.dark }}
      aria-labelledby="beyond-site-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 md:grid-cols-2 md:items-center md:gap-14 md:py-20 lg:py-24">
        <div>
          <h2
            id="beyond-site-heading"
            className="text-3xl leading-[1.12] font-bold tracking-tight text-white sm:text-4xl"
          >
            Not just your website.
            <span className="mt-1 block" style={{ color: brand.lime }}>
              Not just an agent.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base font-medium leading-relaxed text-neutral-200/90 sm:text-lg">
            Models cite Reddit threads, LinkedIn posts, YouTube, Wikipedia,
            reviews, and press — not only your domain. We work those surfaces
            too, and anything else needed to get you named in the answer.
          </p>
        </div>

        <ul
          className="overflow-hidden rounded-2xl ring-1 ring-white/10"
          style={{ backgroundColor: brand.cream }}
          aria-label="Surfaces we work to earn citations"
        >
          {surfaces.map(({ name, detail, tile, Icon }) => (
            <li
              key={name}
              className="flex items-start gap-3.5 border-b border-black/5 px-4 py-3.5 last:border-b-0 sm:gap-4 sm:px-5 sm:py-4"
            >
              <span
                className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-lg text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)]"
                style={{ backgroundColor: tile }}
                aria-hidden
              >
                <Icon />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[15px] font-bold tracking-tight text-zinc-900 sm:text-base">
                  {name}
                </p>
                <p
                  className="mt-0.5 text-sm font-medium leading-snug"
                  style={{ color: brand.body }}
                >
                  {detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
