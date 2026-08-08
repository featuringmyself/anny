import { TalkToSalesButton } from "@/components/talk-to-sales";

export default function ChatGptCta() {
  return (
    <section className="border-b bg-zinc-950 px-6 py-14 text-white md:px-12 md:py-20">
      <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        See how your brand shows up in ChatGPT
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 text-balance">
        Track visibility, sentiment, and citations — then act on ranked
        recommendations that improve how ChatGPT talks about you.
      </p>
      <div className="mt-8">
        <TalkToSalesButton
          size="lg"
          className="bg-[#10A37F] px-5 text-white hover:bg-[#10A37F]/90"
          source="chatgpt-footer-cta"
        />
      </div>
    </section>
  );
}
