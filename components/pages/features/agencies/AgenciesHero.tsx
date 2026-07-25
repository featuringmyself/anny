import { TalkToSalesButton } from "@/components/talk-to-sales";

export default function AgenciesHero() {
  return (
    <section className="border-b px-6 py-16 md:px-12 md:py-20">
      <p className="mb-4 text-sm font-medium text-[#2462ff]">
        Anny for agencies
      </p>
      <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
        Run AI visibility for every client from one workspace
      </h1>
      <p className="mt-4 max-w-xl text-lg text-zinc-500 text-balance">
        Multi-brand monitoring, shared prompts, and white-label reporting so your
        clients see Anny as part of your stack — not another login.
      </p>
      <div className="mt-8">
        <TalkToSalesButton
          size="lg"
          className="bg-[#2462ff] px-4 hover:bg-[#2462ff]/90"
          source="agencies-hero"
        />
      </div>
    </section>
  );
}
