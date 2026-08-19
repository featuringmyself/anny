const steps = [
  {
    title: "Earn links from more unique sites",
    body: "Ahrefs says the only way to raise Domain Rating is more unique websites linking to you with followed links. Extra links from a site that already links to you do not move DR.",
  },
  {
    title: "Don’t make the score the goal",
    body: "Ahrefs also says raising “authority” should not be the main job. Aim for links from real pages on trusted sites in your topic, to the pages you actually want to rank.",
  },
  {
    title: "Skip shortcuts",
    body: "Bought links and link farms can inflate a score without helping search. Ahrefs treats DR as link popularity, not proof a site is high quality. Relevance and traffic still matter.",
  },
] as const;

export function DomainRatingGrow() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12 md:py-14">
        <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
          How Domain Rating goes up
        </h2>
        <p className="mt-3 max-w-xl text-lg text-zinc-500 text-balance">
          You cannot edit DR in a dashboard. It moves when Ahrefs sees more
          strong sites linking to yours.
        </p>
      </div>
      <ul className="grid md:grid-cols-3">
        {steps.map((step) => (
          <li
            key={step.title}
            className="border-b px-6 py-8 last:border-b-0 md:border-r md:border-b-0 md:last:border-r-0 md:px-10 md:py-12"
          >
            <h3 className="text-lg font-medium">{step.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              {step.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
