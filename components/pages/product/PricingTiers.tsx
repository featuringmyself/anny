import { TalkToSalesButton } from "@/components/talk-to-sales";
import PricingTierMotion from "@/components/pages/product/PricingTierMotion";

const CheckIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="mt-0.5 size-4 shrink-0 text-zinc-400"
    fill="none"
    aria-hidden
  >
    <path
      d="M3.5 8.5 6.5 11.5 12.5 4.5"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

type Tier = {
  name: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  featured: boolean;
  highlights: readonly string[];
  highlightsIntro?: string;
  href: "/register" | "sales";
};

const customHighlights = [
  "Fully customisable prompt tracking",
  "Choose from all models",
  "Daily or weekly tracking frequency",
  "Unlimited projects",
  "Custom prompt setup",
  "API access",
  "Single Sign-on (SSO)",
  "Up to 11 LLM models tracked",
] as const;

const tiers: Tier[] = [
  {
    name: "Starter",
    price: "$99",
    period: "/mo",
    description: "For SEO and content managers getting started with AI Search visibility.",
    cta: "Get started",
    href: "/register",
    featured: false,
    highlights: [
      "50 prompts",
      "Choose 3 models",
      "Unlimited users",
      "Daily tracking frequency",
      "1 project",
    ],
  },
  {
    name: "Pro",
    price: "$249",
    period: "/mo",
    description: "For SEO teams that need sophisticated AI Search tracking and insights.",
    cta: "Get started",
    href: "/register",
    featured: true,
    highlights: [
      "150 prompts",
      "Choose 3 models",
      "Unlimited users",
      "Daily tracking frequency",
      "2 projects",
    ],
  },
  {
    name: "Advanced",
    price: "Custom",
    period: "",
    description: "For marketing teams and global brands who need custom coverage, integrations, and dedicated support.",
    cta: "Talk to Sales",
    href: "sales",
    featured: false,
    highlightsIntro: "Everything in Pro, plus:",
    highlights: customHighlights,
  },
];

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
          <PricingTierColumn key={tier.name} tier={tier} index={index} />
        ))}
      </div>
    </section>
  );
}

function PricingTierColumn({ tier, index }: { tier: Tier; index: number }) {
  return (
    <div
      className={[
        "flex flex-col border-b md:border-b-0",
        index < tiers.length - 1 ? "md:border-r" : "",
        tier.featured ? "bg-white" : "",
      ].join(" ")}
    >
      <div className="flex flex-1 flex-col p-8 md:p-10">
        <h3 className="text-xl font-medium tracking-tight">{tier.name}</h3>
        <p className="mt-2 text-sm text-zinc-500">{tier.description}</p>
        <div className="mt-8 flex items-end gap-1">
          <span className="text-4xl font-medium tracking-tight tabular-nums">{tier.price}</span>
          {tier.period ? (
            <span className="pb-1 text-sm text-zinc-500">{tier.period}</span>
          ) : null}
        </div>
        {tier.period ? (
          <p className="mt-1 text-sm text-zinc-500">Billed monthly · save on annual</p>
        ) : (
          <p className="mt-1 text-sm text-zinc-500">Talk to us for a custom quote</p>
        )}
        <div className="mt-8 border-t pt-6">
          {tier.highlightsIntro ? (
            <p className="mb-3 text-sm text-zinc-500">{tier.highlightsIntro}</p>
          ) : null}
          <ul className="flex flex-col gap-3">
            {tier.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-700">
                <CheckIcon />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-auto pt-10">
          {tier.href === "sales" ? (
            <TalkToSalesButton
              size="lg"
              variant="outline"
              className="w-full px-5"
              source={`pricing-tier-${tier.name.toLowerCase()}`}
            >
              {tier.cta}
            </TalkToSalesButton>
          ) : (
            <PricingTierMotion
              featured={tier.featured}
              href={tier.href}
              cta={tier.cta}
              tier={tier.name}
            />
          )}
        </div>
      </div>
    </div>
  );
}
