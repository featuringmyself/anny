import Link from "next/link";

import { clientLogos, servicesCopy } from "@/components/pages/services/data";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import { marqueeFadeMask, sectionPadding } from "./shared/section-styles";

export default function ServicesCta() {
  const ctaLogos = clientLogos.slice(0, 6);

  return (
    <section
      className={`border-b border-border bg-gradient-to-b from-white via-[#f8faff] to-[#f0f4fc] ${sectionPadding} md:py-24`}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl lg:text-5xl">
          {servicesCopy.cta.h2}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-zinc-600 text-balance md:text-lg">
          {servicesCopy.cta.sub}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TalkToSalesButton
            size="lg"
            className="bg-[#2462ff] px-6 hover:bg-[#2462ff]/90"
            source="services-cta"
          >
            Talk to our team
          </TalkToSalesButton>
          <Button
            size="lg"
            variant="outline"
            className="px-6"
            render={
              <Link href="/tools/ai-readiness-checker">
                Free AI readiness check
              </Link>
            }
          />
        </div>

        <div className={`mx-auto mt-12 max-w-xl overflow-hidden ${marqueeFadeMask}`}>
          <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {ctaLogos.map((name) => (
              <li
                key={name}
                className="text-sm font-semibold tracking-tight text-zinc-400"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-xs text-zinc-400">
          A{" "}
          <Link
            href="https://dodox.in"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-600 hover:underline"
          >
            Dodox Studio
          </Link>{" "}
          company
        </p>
      </div>
    </section>
  );
}
