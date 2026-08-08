import { TalkToSalesButton } from "@/components/talk-to-sales";

export default function AgenciesPartnerHero() {
  return (
    <section
      className="mx-auto mt-20 max-w-5xl px-6 pb-16 md:px-0"
      aria-labelledby="agencies-partner-hero-heading"
    >
      <span className="mb-4 flex items-center justify-center gap-2 text-[#2462ff]">
        Partnership · Agencies
      </span>
      <h1
        id="agencies-partner-hero-heading"
        className="text-center text-4xl font-medium tracking-tight text-pretty md:text-5xl lg:text-6xl"
      >
        Turn AI search into billable GEO services for your clients
      </h1>
      <p className="mx-auto mt-4 max-w-3xl text-center text-base text-pretty text-zinc-500">
        Anny gives marketing agencies the tools to run AI visibility audits,
        deliver monthly GEO action plans, and prove ROI to clients — across
        every major AI engine.
      </p>
      <div className="mt-6 flex justify-center">
        <TalkToSalesButton
          className="p-4"
          size="lg"
          source="partnership-agencies-hero"
        >
          Talk agency partnerships
        </TalkToSalesButton>
      </div>
    </section>
  );
}
