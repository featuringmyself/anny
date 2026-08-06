import PricingTierMotion from "@/components/pages/product/PricingTierMotion";

const tiers = [
  {
    name: "Starter",
    price: "$99",
    period: "/mo",
    description: "For SEO and content managers getting started with AI search visibility.",
    cta: "Get started",
    href: "/register",
    featured: false,
    highlights: [
      "ChatGPT, AI Mode, Overviews, Copilot, Perplexity & Gemini",
      "AI Shopping included at launch",
      "1 project · 1 country · 3 models",
      "Daily tracking",
      "Chat support",
    ],
  },
  {
    name: "Pro",
    price: "$249",
    period: "/mo",
    description: "For SEO teams that need sophisticated AI search tracking and insights.",
    cta: "Get started",
    href: "/register",
    featured: true,
    highlights: [
      "Everything in Starter",
      "2 projects",
      "3 countries per project",
      "3 models included",
      "Chat + email support",
    ],
  },
  {
    name: "Advanced",
    price: "$499",
    period: "/mo",
    description: "For marketing teams managing multiple projects with deeper reporting.",
    cta: "Get started",
    href: "/register",
    featured: false,
    highlights: [
      "Everything in Pro",
      "5 projects",
      "3 countries per project",
      "Looker integration",
      "Chat + email support",
    ],
  },
] as const;

export default function PricingTiers() {
  return (
    <section className="border-b">
      <div className="border-b px-6 py-8 md:px-12">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">For brands</p>
        <h2 className="mt-2 text-2xl font-medium tracking-tight">Pick a plan that fits your team</h2>
        <p className="mt-2 max-w-lg text-sm text-zinc-500">
          Annual billing available. Agencies get a separate, heavily discounted rate — talk to sales
          below.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3">
        {tiers.map((tier, index) => (
          <PricingTierColumn
            key={tier.name}
            tier={tier}
            borderRight={index < tiers.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function PricingTierColumn({
  tier,
  borderRight,
}: {
  tier: (typeof tiers)[number];
  borderRight: boolean;
}) {
  return (
    <div
      className={`flex flex-col border-b md:border-b-0 ${borderRight ? "md:border-r" : ""} ${
        tier.featured ? "bg-white" : ""
      }`}
    >
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-xl font-medium tracking-tight">{tier.name}</h3>
          {tier.featured ? (
            <span className="text-xs font-medium tracking-wide text-[#2462ff]">Most chosen</span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-zinc-500">{tier.description}</p>
        <div className="mt-8 flex items-end gap-1">
          <span className="text-4xl font-medium tracking-tight tabular-nums">{tier.price}</span>
          <span className="pb-1 text-sm text-zinc-500">{tier.period}</span>
        </div>
        <p className="mt-1 text-sm text-zinc-500">Billed monthly · save on annual</p>
        <ul className="mt-8 flex flex-col gap-3 border-t pt-6">
          {tier.highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-zinc-700">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[#2462ff]" aria-hidden />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <PricingTierMotion
            featured={tier.featured}
            href={tier.href}
            cta={tier.cta}
            tier={tier.name}
          />
        </div>
      </div>
    </div>
  );
}
