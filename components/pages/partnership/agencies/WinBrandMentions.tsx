import Image from "next/image";

import auditsImage from "@/public/partnership/agencies/ws-audits.webp";
import clientManagementImage from "@/public/partnership/agencies/ws-client-management.webp";
import multiGeoImage from "@/public/partnership/agencies/ws-multi-geo.webp";
import promptTrackingImage from "@/public/partnership/agencies/ws-prompt-tracking.webp";

const features = [
  {
    title: "Stop guessing which prompts to track",
    description:
      "Anny surfaces the questions real users ask AI assistants about your clients’ categories and products. Start with smart prompt suggestions instead of building lists from scratch.",
    image: promptTrackingImage,
    alt: "Tracked prompts table with visibility scores by location",
    imageClassName: "mt-8 w-full",
  },
  {
    title: "Multi-geo and multi-language coverage",
    description:
      "Serving clients in multiple geos? Track AI search performance by country and language so you can coordinate content, PR, and localisation by market — not guesswork.",
    image: multiGeoImage,
    alt: "Grid of country flags representing multi-geo coverage",
    imageClassName: "mt-10 w-full max-w-md",
  },
  {
    title: "End manual AI SEO audits",
    description:
      "No more copy-pasting prompts into ChatGPT, Perplexity, and Google AI one by one. Anny runs checks across all major engines daily and compiles results into client-ready dashboards.",
    image: auditsImage,
    alt: "AI SEO audit results table across Gemini, Perplexity, and ChatGPT",
    imageClassName: "mt-8 w-full",
  },
  {
    title: "Manage all your clients from one place",
    description:
      "Manage multiple clients and projects under one subscription, distribute prompts across any project, invite your team, and export white-label reports that plug straight into your retainers.",
    image: clientManagementImage,
    alt: "Client workspace list with prompts, executions, and LLM coverage",
    imageClassName: "mt-8 w-full",
  },
] as const;

export default function WinBrandMentions() {
  return (
    <section className="bg-[#f7f7f7]">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <h2 className="mx-auto max-w-3xl text-center text-3xl font-medium tracking-tight text-pretty text-zinc-900 md:text-4xl lg:text-[2.75rem] lg:leading-tighter">
          Win brand mentions and website citations in LLM SEO
        </h2>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 md:gap-6">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:p-8 md:p-9"
            >
              <h3 className="text-lg font-semibold tracking-tight text-zinc-900 md:text-xl">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-zinc-500 md:text-[15px] md:leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-auto flex flex-1 items-end">
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  className={`h-auto ${feature.imageClassName}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
