import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import CitationTypesCard from "@/components/pages/partnership/agencies/CitationTypesCard";
import VisibilityScoreCard from "@/components/pages/partnership/agencies/VisibilityScoreCard";
import actionPlansImage from "@/public/partnership/agencies/feature-action-plans.webp";

type FeatureItem = {
  lead: string;
  rest: string;
};

function CheckIcon() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-900"
      aria-hidden
    >
      <svg viewBox="0 0 12 12" className="size-3" fill="none">
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function FeatureCopy({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: readonly FeatureItem[];
}) {
  return (
    <div className="flex max-w-xl flex-col justify-center">
      <h3 className="text-2xl font-medium tracking-tight text-pretty text-zinc-900 md:text-3xl">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-tight text-pretty text-zinc-500">
        {description}
      </p>
      <ul className="mt-6 space-y-4">
        {items.map((item) => (
          <li key={item.lead} className="flex gap-3 text-[15px] leading-snug text-zinc-700">
            <CheckIcon />
            <span>
              <strong className="font-semibold text-zinc-900">{item.lead}</strong>{" "}
              {item.rest}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href="/register"
        className="mt-8 inline-flex w-fit items-center gap-1 text-sm font-medium text-zinc-900 underline underline-offset-4 transition-opacity hover:opacity-70"
      >
        Try for free
        <ChevronRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}

function FeatureRow({
  visual,
  copy,
  reverse = false,
}: {
  visual: ReactNode;
  copy: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "[&>*:first-child]:lg:order-2" : ""
      }`}
    >
      <div className="min-w-0">{visual}</div>
      {copy}
    </div>
  );
}

const visibilityItems = [
  {
    lead: "Discover core prompts",
    rest: "customers use to find your product or services",
  },
  {
    lead: "Benchmark brand and competitor visibility",
    rest: "with share-of-voice and position metrics.",
  },
  {
    lead: "Slice performance by country",
    rest: "and language for multi-geo brands.",
  },
] as const;

const citationItems = [
  {
    lead: "View and filter",
    rest: "the full set of URLs AI engines cite for your key topics.",
  },
  {
    lead: "Spot gaps",
    rest: "where competitors are cited but your brand is missing.",
  },
  {
    lead: "Identify which geos and languages",
    rest: "are underperforming or mispositioned.",
  },
] as const;

const actionItems = [
  {
    lead: "Receive concrete actions",
    rest: "like 'get listed on these sources' or 'optimize this FAQ to appear in ChatGPT answers'.",
  },
  {
    lead: "Generate AI Search Visibility Audits",
    rest: "and optimization plans you can ship to clients in days, not months.",
  },
  {
    lead: "Focus your content, link-building, PR and GEO efforts",
    rest: "on the opportunities that move the needle.",
  },
] as const;

export default function AgencyOsFeatures() {
  return (
    <section aria-labelledby="agency-os-heading">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="agency-os-heading"
            className="text-3xl font-medium tracking-tight text-zinc-900 md:text-4xl lg:text-[2.75rem] lg:leading-tighter"
          >
            The AI Search Optimization OS for Marketing Agencies
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-tight text-zinc-700">
            We help SEO and marketing agencies win new clients, grow existing
            accounts, and retain revenue — by making AI search a service you can
            sell, deliver, and prove.
          </p>
        </div>

        <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
          <FeatureRow
            visual={<VisibilityScoreCard />}
            copy={
              <FeatureCopy
                title="Show every client where they stand in AI search"
                description="Track AI visibility across all your client brands from one dashboard. See who’s cited, who’s missing, and what to fix — by client, by market, by engine."
                items={visibilityItems}
              />
            }
          />

          <FeatureRow
            reverse
            visual={<CitationTypesCard />}
            copy={
              <FeatureCopy
                title="Show clients why competitors get cited and they don’t"
                description="Run a citation gap analysis for any client brand. See which sources AI engines trust, which competitors dominate, and build the case for content, PR, and link work."
                items={citationItems}
              />
            }
          />

          <FeatureRow
            visual={
              <figure>
                <Image
                  src={actionPlansImage}
                  alt="Anny GEO action plan table with high-impact objectives, deliverables, and impact ratings for agency clients"
                  width={900}
                  height={924}
                  className="h-auto w-full rounded-2xl border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder="blur"
                />
              </figure>
            }
            copy={
              <FeatureCopy
                title="Generate client-ready action plans in minutes"
                description="Turn every audit into a prioritized action plan your team can execute and your clients can approve. Ship recommendations that justify retainers and expand scope."
                items={actionItems}
              />
            }
          />
        </div>
      </div>
    </section>
  );
}
