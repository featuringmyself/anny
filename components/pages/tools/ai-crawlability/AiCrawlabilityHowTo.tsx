const steps = [
  {
    title: "Enter your domain",
    body: "We fetch your homepage, robots.txt, sitemap, and llms.txt.",
  },
  {
    title: "Review crawler access",
    body: "See which AI bots from OpenAI, Anthropic, Perplexity, Google, and others are allowed or blocked.",
  },
  {
    title: "Apply the fixes",
    body: "Copy the recommended robots.txt updates, publish them, and re-check.",
  },
] as const;

export function AiCrawlabilityHowTo() {
  return (
    <section className="border-b border-zinc-200 bg-white px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">How it works</p>
        <h2 className="mt-2 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl">
          A crawl check your team can act on
        </h2>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <li key={step.title}>
              <p className="text-sm font-medium text-zinc-400">
                Step {index + 1}
              </p>
              <h3 className="mt-2 text-lg font-medium text-zinc-900">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
