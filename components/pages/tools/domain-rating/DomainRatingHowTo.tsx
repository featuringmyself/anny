import { drCheckerHowTo } from "@/components/pages/tools/domain-rating/seo";

export function DomainRatingHowTo() {
  return (
    <section
      className="border-b"
      aria-labelledby="dr-howto-heading"
    >
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2
          id="dr-howto-heading"
          className="text-3xl font-medium tracking-tight md:text-4xl"
        >
          {drCheckerHowTo.name}
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          {drCheckerHowTo.description}
        </p>
      </div>
      <ol className="grid md:grid-cols-3">
        {drCheckerHowTo.steps.map((step, index) => (
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
