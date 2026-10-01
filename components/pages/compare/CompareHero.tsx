import Image from "next/image";
import type { ReactNode } from "react";

import { brand } from "@/components/Home/brand";

import logoImg from "@/public/logo.png";

type CompareHeroProps = {
  competitor: string;
  framing: string;
  headline: ReactNode;
  description: string;
};

export default function CompareHero({
  competitor,
  framing,
  headline,
  description,
}: CompareHeroProps) {
  return (
    <header
      className="relative w-full overflow-hidden rounded-2xl bg-[#f6f7f4]"
      aria-labelledby="compare-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
      >
        <div className="absolute top-[-18%] right-[-10%] h-100 w-120 rounded-full bg-[#c5f247]/16 blur-[140px]" />
        <div className="absolute bottom-[-24%] left-[-12%] h-90 w-110 rounded-full bg-[#45ab8d]/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 pb-16 text-center sm:pt-20 sm:pb-20 lg:pt-24 lg:pb-24">
        <Image
          src={logoImg}
          alt="Dodox"
          width={logoImg.width}
          height={logoImg.height}
          priority
          className="h-9 w-auto object-contain sm:h-10"
          style={{ width: "auto" }}
        />

        <p
          className="mt-6 text-sm font-semibold tracking-[0.08em] uppercase"
          style={{ color: brand.tertiary }}
        >
          Dodox vs {competitor}
        </p>

        <h1
          id="compare-hero-heading"
          className="mt-3 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-5xl lg:text-[3.25rem]"
          style={{ color: brand.tertiary }}
        >
          {headline}
        </h1>

        <p
          className="mt-5 max-w-xl text-base leading-relaxed font-medium sm:mt-6 sm:text-lg"
          style={{ color: brand.body }}
        >
          {description}
        </p>

        <p
          className="mt-4 text-sm font-semibold"
          style={{ color: brand.bodyStrong }}
        >
          {framing}
        </p>
      </div>
    </header>
  );
}
