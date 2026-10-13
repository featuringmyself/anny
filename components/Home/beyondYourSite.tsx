import Image from "next/image";

import { brand } from "@/components/Home/brand";

/**
 * One job: make clear citation work is not limited to the website or agent.
 * Logos are official brand marks (local copies under public/brand-logos/surfaces).
 */
const surfaces = [
  {
    name: "Your website",
    detail: "Owned pages, schema, and agent-ready content",
    logo: "/brand-logos/surfaces/globe.png",
  },
  {
    name: "Reddit",
    detail: "Threads and communities models already trust",
    logo: "/brand-logos/surfaces/reddit.png",
  },
  {
    name: "LinkedIn",
    detail: "Thought leadership and company proof AI retrieves",
    logo: "/brand-logos/surfaces/linkedin.png",
  },
  {
    name: "YouTube",
    detail: "Video answers that shape Google AI surfaces",
    logo: "/brand-logos/surfaces/youtube.svg",
  },
  {
    name: "Wikipedia & reviews",
    detail: "Reference pages, listicles, and third-party proof",
    logo: "/brand-logos/surfaces/wikipedia.png",
  },
  {
    name: "Whatever else it takes",
    detail: "PR, forums, niches — anywhere a citation can come from",
    logo: "/brand-logos/surfaces/sparkles.png",
  },
] as const;

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
          {surfaces.map((surface) => (
            <li
              key={surface.name}
              className="flex items-start gap-3.5 border-b border-black/5 px-4 py-3.5 last:border-b-0 sm:gap-4 sm:px-5 sm:py-4"
            >
              <span
                className="mt-0.5 grid size-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-white ring-1 ring-black/5"
                aria-hidden
              >
                <Image
                  src={surface.logo}
                  alt=""
                  width={28}
                  height={28}
                  className="size-7 object-contain"
                />
              </span>
              <div className="min-w-0 pt-0.5">
                <p className="text-[15px] font-bold tracking-tight text-zinc-900 sm:text-base">
                  {surface.name}
                </p>
                <p
                  className="mt-0.5 text-sm font-medium leading-snug"
                  style={{ color: brand.body }}
                >
                  {surface.detail}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
