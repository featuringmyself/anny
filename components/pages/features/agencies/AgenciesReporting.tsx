const outputs = [
  {
    title: "Monday deck, built overnight",
    body: "One slide per client — visibility, share of voice, sentiment, week-over-week movement — waiting before your internal standup.",
  },
  {
    title: "Slack summaries per client channel",
    body: "Plain-language recaps posted where the account team already talks. No one logs in to find out a client dropped.",
  },
  {
    title: "Live dashboards clients open without a login",
    body: "Looker Studio templates you clone per account, plus CSV and API for clients with their own BI stack.",
  },
  {
    title: "Attribution the CFO accepts",
    body: "Join AI-referred sessions to signups and revenue, so renewal conversations run on pipeline instead of a score.",
  },
] as const;

export default function AgenciesReporting() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-10 md:px-12">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">Deliver without headcount</p>
        <h2 className="mt-2 max-w-2xl text-2xl font-medium tracking-tight text-balance md:text-3xl">
          Reporting that runs itself across the whole roster
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
          Schedule it once through the API or MCP and every client gets reported every week — the
          part of the retainer that usually burns analyst hours.
        </p>
      </div>

      <div className="grid md:grid-cols-2">
        {outputs.map((item, index) => (
          <div
            key={item.title}
            className={`px-6 py-8 md:px-10 md:py-10 ${
              index < outputs.length - 1 ? "border-b" : ""
            } ${index === outputs.length - 2 ? "md:border-b-0" : ""} ${
              index % 2 === 0 ? "md:border-r" : ""
            }`}
          >
            <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
