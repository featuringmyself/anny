import { TalkToSalesButton } from "@/components/talk-to-sales";

export default function AiModeHero() {
  return (
    <section className="border-b px-6 py-16 md:px-12 md:py-20">
      <p className="mb-4 flex items-center gap-2 text-sm font-medium text-[#2462ff]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/trackModel/ai_mode-logo.svg"
          alt=""
          width={16}
          height={16}
          className="size-4 object-contain"
          draggable={false}
        />
        Google AI Mode & Overview
      </p>
      <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
        Track AI Mode and AI Overview side by side
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-500 text-balance">
        Google is splitting search answers across AI Mode and AI Overviews. Anny
        shows both panels so you know where you appear — and where you disappear.
      </p>
      <div className="mt-8">
        <TalkToSalesButton
          size="lg"
          className="bg-[#2462ff] px-4 hover:bg-[#2462ff]/90"
          source="ai-mode-hero"
        />
      </div>
    </section>
  );
}
