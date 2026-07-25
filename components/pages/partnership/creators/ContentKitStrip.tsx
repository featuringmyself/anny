const kitItems = [
  {
    title: "Demo walkthrough script",
    body: "5-minute path from brand URL to first visibility score — timestamps included.",
  },
  {
    title: "B-roll & UI stills",
    body: "Dashboard frames, mention feeds, and competitor charts cleared for creator use.",
  },
  {
    title: "Talking points",
    body: "GEO vs SEO one-liners, model coverage facts, and FAQ replies your comments will need.",
  },
  {
    title: "Launch checklist",
    body: "Post templates for LinkedIn, X, and YouTube descriptions with UTM-ready links.",
  },
] as const;

export default function ContentKitStrip() {
  return (
    <section className="border-b">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="border-b bg-[#1a1a1a] p-8 text-white md:border-r md:border-b-0 md:p-12">
          <h2 className="text-3xl font-medium tracking-tight md:text-4xl">
            Content kit
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-zinc-400 text-balance">
            Everything you need to ship a clear Anny segment without reinventing
            the demo every week.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {kitItems.map((item, index) => (
            <div
              key={item.title}
              className={`border-b p-6 sm:p-8 ${
                index % 2 === 0 ? "sm:border-r" : ""
              } ${index >= kitItems.length - 2 ? "sm:border-b-0" : ""} ${
                index === kitItems.length - 1 ? "border-b-0" : ""
              }`}
            >
              <h3 className="font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
