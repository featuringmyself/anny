import Image, { type StaticImageData } from "next/image";

import auditsImage from "@/public/partnership/agencies/ws-audits.webp";
import clientManagementImage from "@/public/partnership/agencies/ws-client-management.webp";
import multiGeoImage from "@/public/partnership/agencies/ws-multi-geo.webp";
import promptTrackingImage from "@/public/partnership/agencies/ws-prompt-tracking.webp";

type Feature = {
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  caption: string;
  imageClassName: string;
};

const features: Feature[] = [
  {
    title: "Stop guessing which prompts to track",
    description:
      "Anny surfaces the questions real users ask AI assistants about your clients’ categories and products. Start with smart prompt suggestions instead of building lists from scratch.",
    image: promptTrackingImage,
    alt: "Tracked Prompts table in Anny showing three prompts with visibility scores of 76%, 84%, and 67% for the United States, Canada, and Germany",
    caption: "Example tracked prompts with visibility and location",
    imageClassName: "mt-8 w-full",
  },
  {
    title: "Multi-geo and multi-language coverage",
    description:
      "Serving clients in multiple geos? Track AI search performance by country and language so you can coordinate content, PR, and localisation by market — not guesswork.",
    image: multiGeoImage,
    alt: "Grid of eight country flags for multi-geo coverage: United States, India, Spain, United Kingdom, Canada, Germany, France, and Brazil",
    caption: "Supported markets across major geos",
    imageClassName: "mt-10 w-full max-w-md",
  },
  {
    title: "End manual AI SEO audits",
    description:
      "No more copy-pasting prompts into ChatGPT, Perplexity, and Google AI one by one. Anny runs checks across all major engines daily and compiles results into client-ready dashboards.",
    image: auditsImage,
    alt: "Anny AI SEO audit results table with date, platform, mention status, position, and competing brand mentions across Gemini, Perplexity, and ChatGPT",
    caption: "Daily audit results across major AI engines",
    imageClassName: "mt-8 w-full",
  },
  {
    title: "Manage all your clients from one place",
    description:
      "Manage multiple clients and projects under one subscription, distribute prompts across any project, invite your team, and export white-label reports that plug straight into your retainers.",
    image: clientManagementImage,
    alt: "Anny agency client workspace listing Amadora, Albato, and Ordemio with prompt counts, execution totals, and LLM coverage for ChatGPT, Claude, and Gemini",
    caption: "Multi-client workspace with prompts, executions, and LLMs",
    imageClassName: "mt-8 w-full",
  },
];

export default function WinBrandMentions() {
  return (
    <section
      className="bg-[#f7f7f7]"
      aria-labelledby="win-brand-mentions-heading"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <h2
          id="win-brand-mentions-heading"
          className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight text-pretty text-zinc-900 md:text-4xl lg:text-[2.75rem] lg:leading-tighter"
        >
          Win brand mentions and website citations in LLM SEO
        </h2>

        <ul className="mt-12 grid list-none gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {features.map((feature) => {
            const headingId = `feature-${feature.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`;

            return (
              <li key={feature.title}>
                <article
                  aria-labelledby={headingId}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-8 md:p-9"
                >
                  <h3
                    id={headingId}
                    className="text-lg font-semibold tracking-tight text-zinc-900 md:text-xl"
                  >
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pretty text-zinc-500 md:text-[15px] md:leading-relaxed">
                    {feature.description}
                  </p>
                  <figure className="mt-auto flex flex-1 flex-col justify-end">
                    <Image
                      src={feature.image}
                      alt={feature.alt}
                      title={feature.caption}
                      width={feature.image.width}
                      height={feature.image.height}
                      className={`h-auto ${feature.imageClassName}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      placeholder="blur"
                    />
                    <figcaption className="sr-only">{feature.caption}</figcaption>
                  </figure>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
