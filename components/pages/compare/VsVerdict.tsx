import { Button } from "@/components/ui/button";

type VsVerdictProps = {
  competitor: string;
  pickAnnyWhen: readonly string[];
  pickCompetitorWhen: readonly string[];
};

export default function VsVerdict({
  competitor,
  pickAnnyWhen,
  pickCompetitorWhen,
}: VsVerdictProps) {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          When to pick Anny
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          Honest framing — use the right tool for the job.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b p-8 md:border-r md:border-b-0 md:p-12">
          <h3 className="text-sm font-medium tracking-wide text-[#2462ff] uppercase">
            Choose Anny when
          </h3>
          <ul className="mt-6 space-y-4">
            {pickAnnyWhen.map((item) => (
              <li
                key={item}
                className="border-b border-border pb-4 text-base leading-snug last:border-b-0 last:pb-0"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button className="p-4" size="lg">
              Talk to sales
            </Button>
          </div>
        </div>
        <div className="bg-[#1a1a1a] p-8 text-white md:p-12">
          <h3 className="text-sm font-medium tracking-wide text-zinc-400 uppercase">
            Stick with {competitor} when
          </h3>
          <ul className="mt-6 space-y-4">
            {pickCompetitorWhen.map((item) => (
              <li
                key={item}
                className="border-b border-white/10 pb-4 text-base leading-snug text-zinc-300 last:border-b-0 last:pb-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
