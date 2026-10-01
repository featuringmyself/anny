import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";

type VsVerdictProps = {
  competitor: string;
  pickDodoxWhen: readonly string[];
  pickCompetitorWhen: readonly string[];
};

export default function VsVerdict({
  competitor,
  pickDodoxWhen,
  pickCompetitorWhen,
}: VsVerdictProps) {
  return (
    <section
      className="w-full rounded-2xl bg-white"
      aria-labelledby="compare-verdict-heading"
    >
      <div className="mx-auto max-w-3xl px-6 pt-16 text-center sm:pt-20">
        <h2
          id="compare-verdict-heading"
          className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl"
          style={{ color: brand.tertiary }}
        >
          When to pick Dodox
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed sm:text-lg"
          style={{ color: brand.body }}
        >
          Use the right tool for the job.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-4 px-6 pt-10 pb-16 sm:gap-5 sm:pb-20 md:grid-cols-2">
        <article
          className="rounded-2xl border p-7 text-left sm:p-8"
          style={{
            backgroundColor: brand.cream,
            borderColor: brand.ink,
            outline: `2px solid ${brand.lime}`,
          }}
        >
          <h3
            className="text-[11px] font-bold tracking-[0.08em] uppercase"
            style={{ color: brand.tertiary }}
          >
            Choose Dodox when
          </h3>
          <ul className="mt-6 space-y-4">
            {pickDodoxWhen.map((item) => (
              <li
                key={item}
                className="border-b pb-4 text-base leading-snug font-medium last:border-b-0 last:pb-0"
                style={{ borderColor: `${brand.ink}18`, color: brand.bodyStrong }}
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <TalkToSalesButton
              className="h-12 cursor-pointer rounded-lg border border-zinc-900 bg-brand px-6 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black"
              size="lg"
              source="compare-verdict"
            />
          </div>
        </article>

        <aside
          aria-label={`When to stick with ${competitor}`}
          className="rounded-2xl p-7 text-left sm:p-8"
          style={{ backgroundColor: brand.dark }}
        >
          <h3 className="text-[11px] font-bold tracking-[0.08em] text-white/45 uppercase">
            Stick with {competitor} when
          </h3>
          <ul className="mt-6 space-y-4">
            {pickCompetitorWhen.map((item) => (
              <li
                key={item}
                className="border-b border-white/10 pb-4 text-base leading-snug font-medium text-neutral-200/90 last:border-b-0 last:pb-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
