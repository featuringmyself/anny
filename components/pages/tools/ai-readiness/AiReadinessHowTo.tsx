import { aiReadinessHowTo } from "@/components/pages/tools/ai-readiness/seo";

export function AiReadinessHowTo() {
  return (
    <section
      className="border-b border-zinc-200 bg-white px-6 py-16 md:px-10 md:py-24"
      aria-labelledby="ar-howto-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">How it works</p>
        <h2
          id="ar-howto-heading"
          className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl"
        >
          {aiReadinessHowTo.name}
        </h2>
        <p className="mt-3 max-w-xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
          {aiReadinessHowTo.description}
        </p>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {aiReadinessHowTo.steps.map((step, index) => (
            <li key={step.name}>
              <p className="text-sm font-medium tabular-nums text-zinc-400">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-medium text-zinc-900">
                {step.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
