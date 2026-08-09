import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

const perks = [
  "Multi-client workspaces under one account",
  "Unlimited seats — no per-seat fees",
  "White-label reports and client-ready exports",
  "Pitch projects that sit outside client quota",
  "MCP-powered weekly client reporting",
] as const;

export default function PricingAgency() {
  return (
    <section className="border-b">
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center border-b bg-zinc-950 px-6 py-12 text-white md:border-r md:border-b-0 md:px-12 md:py-16">
          <p className="text-sm font-medium tracking-wide text-[#7aa0ff]">For agencies</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight text-balance md:text-4xl">
            Heavily discounted agency pricing
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-400 text-balance">
            Agency rates are built for multi-client retainers — not brand seats with an agency
            label. We don&apos;t publish numbers here; talk to sales for a quote sized to your
            roster.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TalkToSalesButton
              size="lg"
              className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
              source="pricing-agency"
            >
              Talk to sales
            </TalkToSalesButton>
            <Button
              size="lg"
              variant="outline"
              className="border-zinc-700 bg-transparent px-5 text-white hover:bg-zinc-900 hover:text-white"
              render={<Link href="/features/agencies" />}
            >
              See agency product
            </Button>
          </div>
        </div>

        <aside
          aria-label="What agencies get"
          className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16"
        >
          <p className="text-sm font-medium text-zinc-500">What agencies get</p>
          <ul className="mt-6 flex flex-col gap-4">
            {perks.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2462ff]"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-zinc-500">
            Volume, client projects, and SSO scale with your book of business — priced for agencies,
            quoted by sales.
          </p>
        </aside>
      </div>
    </section>
  );
}
