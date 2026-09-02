import Link from "next/link";

import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import heroDashboard from "@/public/metrics/allAIGraph.webp";

import { clientLogos, servicesCopy } from "./data";
import { BrowserFrame } from "./shared/BrowserFrame";
import { DashboardScreenshot } from "./shared/DashboardScreenshot";
import { sectionLight, sectionPadding } from "./shared/section-styles";

export default function ServicesHero() {
  const proofLogos = clientLogos.slice(0, 5);

  return (
    <section
      className={`${sectionLight} ${sectionPadding}`}
      aria-labelledby="services-hero-heading"
    >
      <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-16 xl:gap-20">
        <div>
          <Eyebrow className="mb-4 text-sm font-medium text-[#2462ff]">
            {servicesCopy.hero.eyebrow}
          </Eyebrow>
          <h1
            id="services-hero-heading"
            className="max-w-xl text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-[3.5rem] lg:leading-[1.08]"
          >
            <span className="block">{servicesCopy.hero.h1Lead}</span>
            <span className="mt-1 block text-[#2462ff]">
              {servicesCopy.hero.h1Accent}
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-pretty text-zinc-600 md:text-lg">
            {servicesCopy.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TalkToSalesButton
              size="lg"
              className="bg-[#2462ff] px-5 hover:bg-[#2462ff]/90"
              source="services-hero"
            />
            <Button
              size="lg"
              variant="outline"
              className="px-5"
              render={<Link href="/tools/ai-readiness-checker" />}
            >
              AI Readiness Checker
            </Button>
          </div>

          <div className="mt-10 border-t border-border pt-8">
            <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
              Trusted by marketing teams at
            </p>
            <ul className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
              {proofLogos.map((name) => (
                <li
                  key={name}
                  className="text-sm font-semibold tracking-tight text-zinc-400"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none lg:-mr-4 xl:-mr-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-6 rounded-3xl bg-gradient-to-br from-[#2462ff]/8 via-[#2462ff]/3 to-transparent blur-2xl"
          />
          <BrowserFrame
            title="anny.dodoxhq.com/dashboard"
            size="large"
            className="relative"
          >
            <DashboardScreenshot
              src={heroDashboard}
              alt="Anny dashboard showing AI visibility trends across engines"
              sizes="(max-width: 1024px) 100vw, 58vw"
              priority
              caption="Anny AI visibility dashboard used in managed GEO programs"
            />
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}
