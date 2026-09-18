/**
 * Canonical pricing. Used by the pricing page UI and by
 * SoftwareApplication / Offer JSON-LD so visible prices and schema stay aligned.
 */

export type PricingCtaHref = "/register" | "/services" | "sales";

export type PricingPlan = {
  id: string;
  name: string;
  /** Display string, e.g. "$300". */
  price: string;
  /** Numeric USD for Schema.org Offer.price */
  priceAmount: number;
  period: string;
  description: string;
  cta: string;
  featured: boolean;
  badge?: string;
  highlights: readonly string[];
  highlightsIntro?: string;
  href: PricingCtaHref;
};

/** Main product: AI agents */
export const agentPlans: PricingPlan[] = [
  {
    id: "seo-geo-agent",
    name: "SEO & GEO Agent + Monitoring",
    price: "$300",
    priceAmount: 300,
    period: "/mo",
    description:
      "SEO & GEO agent that ships the work, and full AI Monitoring included.",
    cta: "Get started",
    href: "/register",
    featured: true,
    badge: "Includes Monitoring",
    highlightsIntro: "Everything in AI Monitoring, plus:",
    highlights: [
      "SEO & GEO content agent",
      "Prompt and citation optimization",
      "Competitor share-of-voice",
      "Weekly action plans",
      "Priority support",
    ],
  },
  {
    id: "ai-monitoring",
    name: "AI Monitoring",
    price: "$150",
    priceAmount: 150,
    period: "/mo",
    description:
      "Track how ChatGPT, Gemini, Perplexity, and AI Mode mention your brand, and get alerts when it changes.",
    cta: "Get started",
    href: "/register",
    featured: false,
    highlights: [
      "Brand mention tracking",
      "Citation & source monitoring",
      "Sentiment signals",
      "Visibility shift alerts",
      "Shared team dashboard",
      "Weekly digests",
    ],
  },
];

/** Managed services: compact callout, not the main grid */
export const servicesOffer = {
  name: "Managed Services",
  price: "$250",
  priceAmount: 250,
  period: "/mo",
  startingLabel: "Starting at",
  description:
    "Hands-on GEO, AEO, and AI visibility retainers. Strategy, audits, and execution sized to your brand.",
  cta: "Explore services",
  href: "/services" as const,
  highlights: [
    "Custom GEO & AEO strategy",
    "Performance audits",
    "Managed execution",
    "Team training",
  ],
} as const;

/** @deprecated Prefer agentPlans; kept for any leftover imports during migration. */
export const pricingTiers = agentPlans;

/** Numeric USD amounts for Schema.org Offer.price */
export function pricedOffers(): {
  name: string;
  price: string;
  priceCurrency: "USD";
  description: string;
  href: "/register" | "/services" | "/pricing";
}[] {
  const agents = agentPlans.map((plan) => ({
    name: plan.name,
    price: String(plan.priceAmount),
    priceCurrency: "USD" as const,
    description: plan.description,
    href:
      plan.href === "sales"
        ? ("/pricing" as const)
        : plan.href === "/services"
          ? ("/services" as const)
          : ("/register" as const),
  }));

  return [
    ...agents,
    {
      name: servicesOffer.name,
      price: String(servicesOffer.priceAmount),
      priceCurrency: "USD" as const,
      description: servicesOffer.description,
      href: "/services" as const,
    },
  ];
}
