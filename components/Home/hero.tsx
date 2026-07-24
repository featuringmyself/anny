import AiFlip from "@/components/Home/ai-flip";

export default function HomeHero() {
  return (
    <div className="mx-auto mt-20 max-w-3xl">
      <h1 className="text-center text-6xl font-medium tracking-tight">
        AI search analytics <br />
        <span className="text-zinc-500">for marketing teams</span>
      </h1>
      <div className="mt-6 text-center text-lg text-balance text-zinc-500">
        See how often <AiFlip /> mentions your brand, which sources it cites,
        and what to do to get mentioned more.
      </div>
    </div>
  );
}
