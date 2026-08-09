import {
  ArrowUpRight,
  Link2,
  Smile,
  TrendingUp,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image, { type StaticImageData } from "next/image";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import mentionFrequency from "@/public/features/chatgpt/mention-frequency.webp";
import recommendedActions from "@/public/features/chatgpt/recommended-actions.webp";

import { FeatureCell, SectionEyebrow, SectionIntro } from "./shared";

const visualFeatures = [
  {
    icon: ArrowUpRight,
    title: "Brand mention frequency",
    description:
      "Track how often ChatGPT mentions your brand across AI search responses.",
    image: mentionFrequency,
    alt: "Visibility bar chart and rankings table for brand mention frequency in ChatGPT",
    imageClassName: "h-auto w-full origin-top scale-[1.02]",
    wrapClassName: "mt-6 -mb-2 overflow-hidden",
  },
  {
    icon: TrendingUp,
    title: "Recommended actions",
    description:
      "Anny ranks each recommendation by expected impact, letting you know exactly what content to create or optimize.",
    image: recommendedActions,
    alt: "Recommended action card with impact score and Todo, Skip, Done controls",
    imageClassName: "mx-auto h-auto w-[92%] max-w-md",
    wrapClassName: "mt-6 overflow-hidden",
  },
] as const satisfies ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  description: string;
  image: StaticImageData;
  alt: string;
  imageClassName: string;
  wrapClassName: string;
}>;

const textFeatures = [
  {
    icon: Zap,
    title: "Citation intelligence",
    description:
      "ChatGPT pulls from specific websites when forming answers. Anny tracks sources that shape AI search results, letting you target domains for citations.",
  },
  {
    icon: Smile,
    title: "Sentiment Analysis",
    description:
      "Our observations show that in the B2B software space, ChatGPT tends to mention brands less favorably than other AI models. Use Anny to see how ChatGPT portrays you.",
  },
  {
    icon: Link2,
    title: "Competitive benchmarking",
    description:
      "ChatGPT mentions and cites a different competitor set than Gemini, Perplexity, or Claude. That’s why measuring ChatGPT is crucial to get comprehensive AI visibility data.",
  },
] as const satisfies ReadonlyArray<{
  icon: LucideIcon;
  title: string;
  description: string;
}>;

function FeatureTitle({
  icon: Icon,
  children,
}: {
  icon: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <h3 className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-900">
      <Icon className="size-4 text-zinc-500" strokeWidth={1.75} aria-hidden />
      {children}
    </h3>
  );
}

export default function ChatGptTracks() {
  return (
    <section
      className="border-b border-border bg-zinc-50/80 px-6 py-14 md:px-12 md:py-20"
      aria-labelledby="chatgpt-tracks-heading"
    >
      <SectionIntro
        eyebrow={<SectionEyebrow>Overview</SectionEyebrow>}
        title="What Anny tracks in ChatGPT"
        titleId="chatgpt-tracks-heading"
        description="Query fanouts, opportunity scoring, smart filters, tailored recommendations, and transparent data. All in one place."
      />

      <div className="mt-10 grid gap-px overflow-hidden border border-border bg-border md:grid-cols-2">
        {visualFeatures.map((feature) => (
          <FeatureCell key={feature.title} className="overflow-hidden border-0">
            <FeatureTitle icon={feature.icon}>{feature.title}</FeatureTitle>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-pretty text-zinc-500">
              {feature.description}
            </p>
            <figure className={feature.wrapClassName}>
              <Image
                src={feature.image}
                alt={feature.alt}
                width={feature.image.width}
                height={feature.image.height}
                className={feature.imageClassName}
                sizes="(max-width: 768px) 100vw, 45vw"
                placeholder="blur"
              />
              <figcaption className="sr-only">{feature.alt}</figcaption>
            </figure>
          </FeatureCell>
        ))}
      </div>

      <div className="mt-px grid gap-px overflow-hidden border border-border border-t-0 bg-border md:grid-cols-3">
        {textFeatures.map((feature) => (
          <FeatureCell key={feature.title} className="border-0">
            <FeatureTitle icon={feature.icon}>{feature.title}</FeatureTitle>
            <p className="mt-3 text-[15px] leading-relaxed text-pretty text-zinc-500">
              {feature.description}
            </p>
          </FeatureCell>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <TalkToSalesButton
          size="lg"
          className="bg-[#10A37F] px-5 hover:bg-[#10A37F]/90"
          source="chatgpt-tracks"
        >
          Get started
        </TalkToSalesButton>
      </div>
    </section>
  );
}
