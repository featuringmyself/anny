import { BarChart3, FileText, Link2, Users, type LucideIcon } from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import dataEarned from "@/public/features/chatgpt/data-earned.png";
import dataImpact from "@/public/features/chatgpt/data-impact.png";
import dataOwned from "@/public/features/chatgpt/data-owned.png";
import { cn } from "@/lib/utils";

import { SectionBadge, SectionIntro } from "./shared";

const tabs = [
  {
    id: "earned",
    icon: Link2,
    title: "Earned",
    summary:
      "Find opportunities to get featured in the sources shaping ChatGPT mentions.",
    description:
      "Brand visibility in ChatGPT is heavily driven by external sources — review sites, Reddit conversations, Wikipedia pages, and more. Anny's Earned Media module tracks these opportunities, showing you which sources are already shaping ChatGPT's answers so you can get mentioned where it matters most.",
    image: dataEarned,
    alt: "Earned media source cards for Reference, UGC, and Editorial with recommended outreach actions",
    // Full class names required so Tailwind can detect them at build time.
    panelClassName: "hidden group-has-[#dta-earned:checked]/dta:block",
  },
  {
    id: "owned",
    icon: FileText,
    title: "Owned",
    summary: "Improve your content to appear more in ChatGPT answers.",
    description:
      "Your own pages still matter. Anny surfaces the owned content types ChatGPT already grounds on — listicles, product pages, how-to guides, and more — so you can close gaps competitors already fill on your domain.",
    image: dataOwned,
    alt: "Owned content type list and recommended action for product pages cited by LLMs",
    panelClassName: "hidden group-has-[#dta-owned:checked]/dta:block",
  },
  {
    id: "impact",
    icon: BarChart3,
    title: "Impact",
    summary: "Turn your ChatGPT visibility data into clear, prioritized actions.",
    description:
      "Every recommendation is ranked by expected impact, action type, and category so your team knows what to ship first — from earned outreach to owned content refreshes.",
    image: dataImpact,
    alt: "Recommended actions table with action type, domain type, category, and status controls",
    panelClassName: "hidden group-has-[#dta-impact:checked]/dta:block",
  },
] as const satisfies ReadonlyArray<{
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  description: string;
  image: StaticImageData;
  alt: string;
  panelClassName: string;
}>;

export default function ChatGptDataToAction() {
  return (
    <section
      className="border-b border-border px-6 py-14 md:px-12 md:py-20"
      aria-labelledby="chatgpt-data-heading"
    >
      <SectionIntro
        badge={
          <SectionBadge>
            <Users className="size-3.5" strokeWidth={1.75} aria-hidden />
            Data to Action
          </SectionBadge>
        }
        title="More than just a monitoring tool"
        titleId="chatgpt-data-heading"
        description="Anny is the complete platform for tracking how your brand shows up in ChatGPT. Monitor visibility, mentions, and competitor performance, with actionable insights to help you improve."
      />

      <div className="group/dta mt-10 grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-8">
        <div
          role="radiogroup"
          aria-label="Data to action modules"
          className="flex flex-col gap-3"
        >
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const inputId = `dta-${tab.id}`;

            return (
              <label
                key={tab.id}
                htmlFor={inputId}
                className={cn(
                  "cursor-pointer rounded-2xl border px-5 py-4 transition-colors",
                  "border-transparent bg-zinc-50/80 opacity-70",
                  "has-checked:border-zinc-200 has-checked:bg-white has-checked:opacity-100 has-checked:shadow-sm",
                  "has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
                )}
              >
                <input
                  id={inputId}
                  type="radio"
                  name="chatgpt-data-to-action"
                  value={tab.id}
                  defaultChecked={index === 0}
                  className="sr-only"
                />
                <span className="flex items-center gap-2 text-base font-medium text-zinc-900">
                  <Icon
                    className="size-4 text-zinc-500"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                  {tab.title}
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-zinc-500">
                  {tab.summary}
                </span>
              </label>
            );
          })}
        </div>

        <div className="min-w-0">
          {tabs.map((tab) => (
            <div key={tab.id} className={tab.panelClassName}>
              <figure className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50">
                <Image
                  src={tab.image}
                  alt={tab.alt}
                  width={tab.image.width}
                  height={tab.image.height}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  placeholder="blur"
                />
              </figure>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-pretty text-zinc-500">
                {tab.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
