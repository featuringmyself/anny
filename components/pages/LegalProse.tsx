type LegalSection = {
  heading: string;
  body: string;
};

type LegalProseProps = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export default function LegalProse({
  title,
  lastUpdated,
  intro,
  sections,
}: LegalProseProps) {
  return (
    <article className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="text-sm font-medium text-[#2462ff]">Legal</p>
        <h1 className="mt-3 text-4xl font-medium tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-zinc-400">
          Last updated {lastUpdated}
        </p>
        <p className="mt-8 text-[15px] leading-relaxed text-zinc-500">
          {intro}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-medium tracking-tight">
                {section.heading}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-zinc-500">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </div>
    </article>
  );
}
