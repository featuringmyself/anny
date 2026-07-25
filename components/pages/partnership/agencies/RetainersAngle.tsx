const angles = [
  {
    title: "Retainers that renew",
    body: "Monthly AI visibility reports give clients a reason to stay — measurable mentions, not vanity rankings.",
  },
  {
    title: "White-label ready",
    body: "Present Anny insights under your agency brand. Your clients see your team; you see the data.",
  },
  {
    title: "Margin without headcount",
    body: "One analyst can cover more brands when the dashboard already tracks models, sources, and competitors.",
  },
] as const;

export default function RetainersAngle() {
  return (
    <section className="grid grid-cols-1 border-b md:grid-cols-3">
      {angles.map((item, index) => (
        <div
          key={item.title}
          className={`border-b p-8 last:border-b-0 md:border-b-0 md:p-10 ${
            index < angles.length - 1 ? "md:border-r" : ""
          }`}
        >
          <h3 className="text-xl font-medium md:text-2xl">{item.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-zinc-500">
            {item.body}
          </p>
        </div>
      ))}
    </section>
  );
}
