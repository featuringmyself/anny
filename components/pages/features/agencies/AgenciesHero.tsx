import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

const proof = [
  { label: "Client workspaces", value: "Unlimited" },
  { label: "Seats per agency", value: "No per-seat fees" },
  { label: "Models on every client", value: "All included" },
  { label: "Agency rate", value: "Heavily discounted" },
] as const;

export default function AgenciesHero() {
  return (
    <section className="border-b">
      <div className="px-6 py-16 md:px-12 md:py-20">
        <p className="mb-4 text-sm font-medium text-[#2462ff]">Anny for agencies</p>
        <h1 className="max-w-3xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
          Sell AI visibility as a retainer. Keep the margin.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-zinc-500 text-balance">
          Every client in one workspace, reported under your brand, on agency pricing that stays
          flat while your book of business grows. Clients ask why they never show up in ChatGPT —
          you answer with data and an invoice.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <TalkToSalesButton
            size="lg"
            className="bg-[#2462ff] px-5 hover:bg-[#2462ff]/90"
            source="agencies-hero"
          >
            Get agency pricing
          </TalkToSalesButton>
          <Button size="lg" variant="outline" className="px-5" render={<Link href="/pricing" />}>
            See brand plans
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 border-t md:grid-cols-4">
        {proof.map((item, index) => (
          <div
            key={item.label}
            className={`px-6 py-6 md:px-8 ${index % 2 === 0 ? "border-r" : ""} ${
              index < 2 ? "border-b md:border-b-0" : ""
            } ${index < proof.length - 1 ? "md:border-r" : ""}`}
          >
            <p className="text-lg font-medium tracking-tight text-balance">{item.value}</p>
            <p className="mt-1 text-xs text-zinc-400">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
