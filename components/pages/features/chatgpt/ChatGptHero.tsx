import { TalkToSalesButton } from "@/components/talk-to-sales";

const ACCENT = "#10A37F";

export default function ChatGptHero() {
  return (
    <section className="border-b px-6 py-16 md:px-12 md:py-20">
      <p
        className="mb-4 flex items-center gap-2 text-sm font-medium"
        style={{ color: ACCENT }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ai-logo/chatgptLogo.svg"
          alt=""
          width={16}
          height={16}
          className="size-4 object-contain"
          draggable={false}
        />
        ChatGPT visibility
      </p>
      <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
        See every time ChatGPT mentions your brand
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-500 text-balance">
        Track mention frequency, read full answers, and watch your visibility
        score move day by day across ChatGPT responses.
      </p>
      <div className="mt-8">
        <TalkToSalesButton
          size="lg"
          className="px-4"
          style={{ backgroundColor: ACCENT }}
          source="chatgpt-hero"
        />
      </div>
    </section>
  );
}
