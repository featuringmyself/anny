import { Button } from "@/components/ui/button";

const points = [
  {
    title: "Your logo, your domain",
    body: "Client-facing reports and dashboards carry your brand. Anny stays under the hood.",
  },
  {
    title: "Seat-friendly pricing",
    body: "Add client workspaces without exploding seat counts. Built for retainers, not single-brand seats.",
  },
  {
    title: "Shared prompt libraries",
    body: "Clone industry prompt packs across accounts so every kickoff starts with coverage, not blank forms.",
  },
] as const;

export default function AgenciesWhiteLabel() {
  return (
    <section className="grid md:grid-cols-2">
      <div className="flex flex-col justify-center border-b bg-zinc-950 px-6 py-12 text-white md:border-r md:border-b-0 md:px-12 md:py-16">
        <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
          White-label AI visibility for your agency
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 text-balance">
          Deliver GEO as a productized service. Clients get a clean portal;
          you keep the relationship and the margin.
        </p>
        <div className="mt-8">
          <Button
            size="lg"
            className="bg-[#2462ff] px-4 text-white hover:bg-[#2462ff]/90"
          >
            Book an agency demo
          </Button>
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
