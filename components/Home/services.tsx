import Image from "next/image";
import Link from "next/link";

import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

/**
 * One job: choose the managed path / go deeper on /services.
 * Cards are justified here (interactive destinations to /services).
 */
const offerings = [
  {
    title: "Custom Strategy",
    body: "A tailored plan for presence, sentiment, and ranking across major AI search engines.",
    icon: "/services/icons/custom-strategy.svg",
  },
  {
    title: "Fully Managed Execution",
    body: "We run content optimization, PR outreach, and day-to-day GEO work on your behalf.",
    icon: "/services/icons/managed-execution.svg",
  },
  {
    title: "Ongoing Performance Audits",
    body: "We adapt your strategy as models and features change so you stay ahead.",
    icon: "/services/icons/performance-audits.svg",
  },
  {
    title: "Team Training & Workshops",
    body: "Custom GEO training so your team can use Dodox and ship improvements in-house.",
    icon: "/services/icons/team-training.svg",
  },
] as const;

export default function Services() {
  return (
    <section
      className="w-full rounded-2xl bg-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="home-services-heading"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          id="home-services-heading"
          className="text-[1.75rem] leading-tight font-bold tracking-tight sm:text-3xl md:text-[2.4rem]"
          style={{ color: brand.tertiary }}
        >
          Prefer a team that runs the work?
        </h2>
        <p
          className="mx-auto mt-4 max-w-lg text-base font-medium leading-relaxed sm:text-lg"
          style={{ color: brand.body }}
        >
          Done-for-you GEO: strategy, execution, audits, and training—without
          building a new team.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-5xl gap-3 px-6 sm:grid-cols-2 sm:gap-4 lg:mt-12">
        {offerings.map((offering) => (
          <li key={offering.title}>
            <Link
              href="/services"
              className="group flex h-full items-start gap-4 rounded-2xl border p-6 text-left transition-transform hover:-translate-y-0.5 sm:gap-5 sm:p-7"
              style={{
                backgroundColor: brand.peach,
                borderColor: `${brand.ink}22`,
              }}
            >
              <Image
                src={offering.icon}
                alt=""
                width={40}
                height={40}
                className="size-8 shrink-0 sm:size-10"
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <h3 className="m-0 text-lg leading-snug font-bold tracking-tight text-zinc-900 sm:text-xl">
                  {offering.title}
                </h3>
                <p
                  className="mt-2 m-0 text-[15px] font-medium leading-relaxed sm:text-base"
                  style={{ color: brand.bodyStrong }}
                >
                  {offering.body}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3 px-6 sm:mt-12">
        <Button
          size="lg"
          className="h-12 cursor-pointer rounded-lg border border-transparent px-6 text-base font-semibold text-white hover:opacity-90"
          style={{ backgroundColor: brand.tertiary }}
          render={<Link href="/services" />}
        >
          Explore services
        </Button>
        <TalkToSalesButton
          size="lg"
          variant="outline"
          className="h-12 rounded-lg border-zinc-900 bg-transparent px-6 text-base font-semibold hover:bg-zinc-900 hover:text-white"
          source="home-services"
        >
          Talk to sales
        </TalkToSalesButton>
      </div>
    </section>
  );
}
