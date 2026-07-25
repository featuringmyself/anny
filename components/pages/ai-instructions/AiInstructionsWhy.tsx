const reasons = [
  {
    title: "Fewer hallucinations about your product",
    body: "Models lean on structured brand copy. Clear instructions reduce wrong category or competitor mix-ups.",
  },
  {
    title: "Consistent citations across engines",
    body: "The same block helps ChatGPT, Claude, Gemini, and others describe Anny the way you intend.",
  },
  {
    title: "Pair with visibility tracking",
    body: "Publish instructions, then use Anny to measure whether mentions and source quality actually improve.",
  },
] as const;

export default function AiInstructionsWhy() {
  return (
    <section className="border-b">
      <div className="px-6 py-12 md:px-12 md:py-16">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          Why this matters
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          AI answers are compiled from the open web. Giving models a clean
          source of truth is table stakes for GEO.
        </p>
      </div>
      <div className="grid grid-cols-1 border-t md:grid-cols-3">
        {reasons.map((item, index) => (
          <div
            key={item.title}
            className={`border-b p-8 last:border-b-0 md:border-b-0 md:p-10 ${
              index < reasons.length - 1 ? "md:border-r" : ""
            }`}
          >
            <h3 className="text-xl font-medium">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
