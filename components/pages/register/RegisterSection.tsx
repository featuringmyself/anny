import RegisterForm from "@/components/pages/register/RegisterForm";
import type { RegisterPlan } from "@/lib/plans";

const perks = [
  "Track ChatGPT, Gemini, and AI Mode in one place",
  "Daily prompts, competitor scorecards, and source citations",
  "Competitor gaps and citation sources in one dashboard",
] as const;

export default function RegisterSection({ plan }: { plan?: RegisterPlan }) {
  return (
    <section className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="flex flex-col justify-center border-b bg-zinc-950 p-8 text-white md:border-r md:border-b-0 md:p-12">
          <p className="text-sm font-medium tracking-wide text-[#7ea1ff]">
            Get started
          </p>
          <h1 className="mt-3 max-w-md text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Create your Anny account
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400 text-balance">
            See how often AI answers mention your brand — and which sources
            they cite — before you commit to a plan.
          </p>
          <ul className="mt-10 space-y-4">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex items-start gap-3 border-b border-white/10 pb-4 text-sm text-zinc-300 last:border-b-0 last:pb-0"
              >
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2462ff]"
                  aria-hidden
                />
                {perk}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative bg-white">
          <RegisterForm plan={plan} />
        </div>
      </div>
    </section>
  );
}
