import { TalkToSalesButton } from "@/components/talk-to-sales";

const points = [
  {
    title: "Your logo, your domain",
    body: "Client-facing reports and dashboards carry your brand. Anny stays under the hood and off the invoice.",
  },
  {
    title: "No per-seat pricing",
    body: "Strategists, analysts, and account managers all get access. Growing the team never triggers an upgrade.",
  },
  {
    title: "Isolated client data",
    body: "Every account is its own project with separate prompts and competitors. Client A never leaks into Client B's report.",
  },
  {
    title: "Shared prompt libraries",
    body: "Clone industry prompt packs across accounts so every kickoff starts with coverage, not a blank form.",
  },
] as const;

export default function AgenciesWhiteLabel() {
  return (
    <section className="grid border-b md:grid-cols-2">
      <div className="flex flex-col justify-center border-b bg-zinc-950 px-6 py-12 text-white md:border-r md:border-b-0 md:px-12 md:py-16">
        <p className="text-sm font-medium tracking-wide text-[#7aa0ff]">White-label</p>
        <h2 className="mt-3 text-3xl font-medium tracking-tight text-balance md:text-4xl">
          Your clients should think you built this
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 text-balance">
          Deliver GEO as a productized service under your own name. Clients get a clean portal; you
          keep the relationship, the pricing power, and the margin.
        </p>
        <div className="mt-8">
          <TalkToSalesButton
            size="lg"
            className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            source="agencies-white-label"
          >
            Book an agency demo
          </TalkToSalesButton>
        </div>
      </div>

      <div className="flex flex-col">
        {points.map((point, index) => (
          <div
            key={point.title}
            className={`flex flex-1 flex-col justify-center px-6 py-8 md:px-10 ${
              index < points.length - 1 ? "border-b" : ""
            }`}
          >
            <h3 className="text-lg font-medium tracking-tight">{point.title}</h3>
            <p className="mt-2 max-w-md text-sm text-zinc-500">{point.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
