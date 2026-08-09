import { TalkToSalesButton } from "@/components/talk-to-sales";

const ACCENT = "#4B7BFF";

export default function GeminiHero() {
  return (
    <section className="border-b px-6 py-16 md:px-12 md:py-20">
      <p
        className="mb-4 flex items-center gap-2 text-sm font-medium"
        style={{ color: ACCENT }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ai-logo/geminiLogo.svg"
          alt="Gemini logo"
          width={16}
          height={16}
          className="size-4 object-contain"
          draggable={false}
        />
        Gemini citations
      </p>
      <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
        Follow multi-turn Gemini answers and every source they cite
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-500 text-balance">
        See how Gemini builds recommendations across turns — and which domains
        get the credit when your brand is named.
      </p>
      <div className="mt-8">
        <TalkToSalesButton
          size="lg"
          className="px-4"
          style={{ backgroundColor: ACCENT }}
          source="gemini-hero"
        />
      </div>
    </section>
  );
}
