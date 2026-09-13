/**
 * Canonical brand pricing tiers. Used by the pricing page UI and by
 * SoftwareApplication / Offer JSON-LD so visible prices and schema stay aligned.
 */
export type PricingTier = {
  name: string;
  /** Display string, e.g. "$99" or "Custom". */
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

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    price: "$99",
    period: "/mo",
    description:
      "For SEO and content managers getting started with AI Search visibility.",
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
    description:
      "For SEO teams that need sophisticated AI Search tracking and insights.",
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
    description:
      "For marketing teams and global brands who need custom coverage, integrations, and dedicated support.",
    cta: "Talk to Sales",
    href: "sales",
    featured: false,
    highlightsIntro: "Everything in Pro, plus:",
    highlights: customHighlights,
  },
];

/** Numeric USD amounts for Schema.org Offer.price (Custom / sales omitted). */
export function pricedOffers(): {
  name: string;
  price: string;
  priceCurrency: "USD";
  description: string;
  href: "/register" | "/pricing";
}[] {
  return pricingTiers.flatMap((tier) => {
    const numeric = tier.price.replace(/[^0-9.]/g, "");
    if (!numeric) return [];
    return [
      {
        name: tier.name,
        price: numeric,
        priceCurrency: "USD" as const,
        description: tier.description,
        href: tier.href === "sales" ? ("/pricing" as const) : tier.href,
      },
    ];
  });
}
