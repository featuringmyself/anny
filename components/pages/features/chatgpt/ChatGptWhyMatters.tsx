import {
  FileText,
  Globe2,
  Handshake,
  Link2,
  Search,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { FeatureCard, SectionBadge } from "./shared";

const stats = [
  {
    icon: FileText,
    title: "ChatGPT Rarely Names Just One Brand",
    metric: "3",
    description: "Brands Mentioned Per Response, On Average",
  },
  {
    icon: Link2,
    title: "ChatGPT Cites More Sources Per Answer",
    metric: "~60%",
    description: "More Domain Citations vs. Other Major AI Engines",
  },
  {
    icon: TrendingUp,
    title: "ChatGPT Already Shows Ads",
    metric: "1 in 4",
    description: "ChatGPT Responses Contain an Ad Element",
  },
  {
    icon: Handshake,
    title: "ChatGPT's Response Behavior Never Sits Still",
    metric: "8",
    description: "Structural Shifts in 18 Months",
  },
  {
    icon: Globe2,
    title: "ChatGPT Global Traffic Rank",
    metric: "#5",
    description: "Most-Visited Website Worldwide",
  },
  {
    icon: Search,
    title: "ChatGPT's Search Habits Change Without Warning",
    metric: "~40x",
    description: 'Spike in a Specific Search Term (e.g. "Reddit," May 2026)',
  },
] as const satisfies ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  metric: string;
  description: string;
}>;

export default function ChatGptWhyMatters() {
  return (
    <section
      className="border-b border-border bg-zinc-50/80 px-6 py-14 md:px-12 md:py-20"
      aria-labelledby="chatgpt-why-heading"
    >
      <SectionBadge>
        <Users className="size-3.5" strokeWidth={1.75} aria-hidden />
        What We Track
      </SectionBadge>
      <h2
        id="chatgpt-why-heading"
        className="max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl"
      >
        Why ChatGPT visibility matters for your brand
      </h2>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <FeatureCard key={stat.title} className="flex flex-col">
              <h3 className="inline-flex items-start gap-2 text-sm font-medium text-zinc-900">
                <Icon
                  className="mt-0.5 size-4 shrink-0 text-zinc-500"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="text-balance">{stat.title}</span>
              </h3>
              <p className="mt-8 text-4xl font-medium tracking-tight tabular-nums md:text-5xl">
                {stat.metric}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-pretty text-zinc-500">
                {stat.description}
              </p>
            </FeatureCard>
          );
        })}
      </div>
    </section>
  );
}
