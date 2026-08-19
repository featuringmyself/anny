import { aiReadinessHowTo } from "@/components/pages/tools/ai-readiness/seo";

export function AiReadinessHowTo() {
  return (
    <section className="border-b" aria-labelledby="ar-howto-heading">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2
          id="ar-howto-heading"
          className="text-3xl font-medium tracking-tight md:text-4xl"
        >
          {aiReadinessHowTo.name}
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          {aiReadinessHowTo.description}
        </p>
      </div>
      <ol className="grid md:grid-cols-3">
        {aiReadinessHowTo.steps.map((step, index) => (
          <li
            key={step.name}
            className="border-b px-6 py-8 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 md:px-10 md:py-12"
          >
            <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              Step {index + 1}
            </p>
            <h3 className="mt-2 text-lg font-medium">{step.name}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {step.text}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
