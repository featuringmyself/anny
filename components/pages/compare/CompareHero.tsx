import type { ReactNode } from "react";

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
    <section className="mx-auto mt-20 max-w-3xl px-6 pb-16 md:px-0">
      <span className="mb-4 flex items-center justify-center gap-2 text-[#2462ff]">
        Anny vs {competitor} · {framing}
      </span>
      <h1 className="text-center text-5xl font-medium tracking-tight text-balance md:text-6xl">
        {headline}
      </h1>
      <p className="mt-4 text-center text-lg text-balance text-zinc-500">
        {description}
      </p>
    </section>
  );
}
