const steps = [
  {
    step: "01",
    title: "Spin up a pitch workspace",
    body: "Enter the prospect's brand and the three competitors they lose sleep over. No client slot consumed.",
  },
  {
    step: "02",
    title: "Walk in with their gap",
    body: "Show the prompts where competitors get named and they don't — across ChatGPT, Gemini, and AI Mode.",
  },
  {
    step: "03",
    title: "Convert on signature",
    body: "Promote the pitch workspace to a live client project and keep the baseline history you already gathered.",
  },
] as const;

export default function AgenciesPitch() {
  return (
    <section className="border-b">
      <div className="grid md:grid-cols-5">
        <div className="flex flex-col justify-center border-b px-6 py-10 md:col-span-2 md:border-r md:border-b-0 md:px-12 md:py-16">
          <p className="text-sm font-medium tracking-wide text-[#2462ff]">Win the pitch</p>
          <h2 className="mt-2 text-2xl font-medium tracking-tight text-balance md:text-3xl">
            New-business ammunition, not another slide about strategy
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500">
            Prospecting workspaces sit outside your client quota, so building a pitch never eats
            paid capacity. Most agencies close on the gap chart before they get to scope.
          </p>
        </div>

        <div className="md:col-span-3">
          {steps.map((item, index) => (
            <div
              key={item.step}
              className={`flex gap-6 px-6 py-8 md:px-10 ${
                index < steps.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="text-sm text-zinc-300 tabular-nums">{item.step}</span>
              <div>
                <h3 className="text-lg font-medium tracking-tight">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-zinc-500">{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
