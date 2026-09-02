import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Demo from "@/components/Home/demo";
import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { clientLogos, servicesCopy } from "./data";
import { heroPadding, sectionLight } from "./shared/section-styles";

const proofLogos = clientLogos.slice(0, 5);

const demoEmbedOverrides = cn(
  "[&>section]:mx-0 [&>section]:mt-0 [&>section]:max-w-none [&>section]:px-0 [&>section]:pb-0",
  "[&_figure]:overflow-hidden [&_figure]:rounded-none [&_figure]:border-0",
);

export default function ServicesHero() {
  return (
    <section
      className={cn(
        sectionLight,
        heroPadding,
        "py-12 sm:py-16 md:py-24 lg:py-28",
        "pb-8 sm:pb-10 md:pb-14 lg:pb-16",
      )}
      aria-labelledby="services-hero-heading"
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          <div className="max-w-xl lg:max-w-none">
            <Eyebrow className="mb-4 text-sm font-medium sm:mb-5">
              {servicesCopy.hero.eyebrow}
            </Eyebrow>

            <h1
              id="services-hero-heading"
              className="text-[1.875rem] leading-[1.12] font-semibold tracking-tight text-balance sm:text-4xl sm:leading-tight md:text-5xl lg:text-[3.5rem] lg:leading-[1.06]"
            >
              {servicesCopy.hero.h1Lead}{" "}
              <span className="text-[#2462ff]">{servicesCopy.hero.h1Accent}</span>
            </h1>

            <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-pretty text-zinc-600 sm:mt-6 sm:text-base md:text-lg md:leading-8">
              {servicesCopy.hero.sub}
            </p>

            <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <TalkToSalesButton
                size="lg"
                className="w-full bg-[#2462ff] px-5 hover:bg-[#2462ff]/90 sm:w-auto"
                source="services-hero"
              />
              <Button
                size="lg"
                variant="outline"
                className="w-full px-5 sm:w-auto"
                render={<Link href="/tools/ai-readiness-checker" />}
              >
                AI Readiness Checker
                <ArrowRight className="size-4 opacity-60" aria-hidden />
              </Button>
            </div>

            <div className="mt-8 border-t border-border pt-6 sm:mt-10 sm:pt-8">
              <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase sm:text-xs">
                {servicesCopy.logos.label}
              </p>
              <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:mt-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3 md:gap-x-8">
                {proofLogos.map((name) => (
                  <li
                    key={name}
                    className="text-xs font-semibold tracking-tight text-zinc-400 sm:text-sm"
                  >
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm sm:rounded-2xl">
              <div className="relative h-50 overflow-hidden sm:h-70 md:h-auto md:overflow-visible">
                <div
                  className={cn(
                    "absolute left-1/2 top-0 w-160 -translate-x-1/2 origin-top scale-[0.52] sm:scale-[0.78] md:static md:w-full md:translate-x-0 md:scale-100",
                    demoEmbedOverrides,
                  )}
                >
                  <Demo />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
