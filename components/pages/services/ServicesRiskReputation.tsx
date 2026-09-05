import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import copilotLogo from "@/public/services/orbit/copilot.webp";
import deepseekLogo from "@/public/services/orbit/deepseek.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import grokLogo from "@/public/services/orbit/grok.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";

const TERTIARY = "#025864";
const PRIMARY = "#93E85F";
const BODY = "#2a3f44";
const TERTIARY_100 = "#ccdee0";
const TRUSTPILOT = "#00b67a";
const CAL_BOOKING_URL = "https://cal.com/dodox/quick-chat";

const RING_SIZES = [
  "size-[min(46.875rem,90vw)]",
  "size-[min(62.5rem,120vw)]",
  "size-[min(80rem,155vw)]",
] as const;

/** Percentage placement matching getcito.com CTA orbits (lg+). */
const ORBIT_LOGOS: {
  name: string;
  src: StaticImageData;
  style: CSSProperties;
}[] = [
  { name: "Gemini", src: geminiLogo, style: { top: "-19%", left: "28.5%" } },
  { name: "ChatGPT", src: chatgptLogo, style: { top: "38%", right: "25%" } },
  { name: "Perplexity", src: perplexityLogo, style: { top: "20%", left: "-1%" } },
  { name: "Copilot", src: copilotLogo, style: { top: "45%", right: "-2%" } },
  { name: "DeepSeek", src: deepseekLogo, style: { top: "65%", right: "20%" } },
  { name: "Grok", src: grokLogo, style: { top: "75%", left: "10.5%" } },
];

function OrbitField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      aria-hidden
    >
      {RING_SIZES.map((size) => (
        <div
          key={size}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-300/70",
            size,
          )}
        />
      ))}

      {ORBIT_LOGOS.map((logo, i) => (
        <div
          key={logo.name}
          className="absolute flex size-14 items-center justify-center"
          style={{
            ...logo.style,
            animation: `services-cta-float ${3.2 + (i % 3) * 0.4}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.15}s`,
          }}
        >
          <Image
            src={logo.src}
            alt=""
            width={36}
            height={36}
            className="size-9 object-contain"
            sizes="36px"
          />
        </div>
      ))}
    </div>
  );
}

function TrustStars() {
  return (
    <div className="flex items-center gap-0.5" aria-label="4.5 out of 5 stars">
      {Array.from({ length: 4 }, (_, i) => (
        <span
          key={i}
          className="inline-flex size-4 items-center justify-center rounded-xs sm:size-4.5"
          style={{ backgroundColor: TRUSTPILOT }}
        >
          <StarIcon className="size-2.5 text-white sm:size-3" filled />
        </span>
      ))}
      <span
        className="inline-flex size-4 items-center justify-center rounded-xs sm:size-4.5"
        style={{ backgroundColor: TRUSTPILOT }}
      >
        <StarIcon className="size-2.5 text-white sm:size-3" filled={false} />
      </span>
    </div>
  );
}

function StarIcon({
  className,
  filled,
}: {
  className?: string;
  filled: boolean;
}) {
  if (filled) {
    return (
      <svg viewBox="0 0 12 12" className={className} aria-hidden fill="currentColor">
        <path d="M6 0.8l1.5 3.1 3.4.5-2.45 2.4.6 3.35L6 8.55 2.95 10.15l.6-3.35L1.1 4.4l3.4-.5L6 .8z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <defs>
        <linearGradient id="half-star">
          <stop offset="50%" stopColor="currentColor" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M6 0.8l1.5 3.1 3.4.5-2.45 2.4.6 3.35L6 8.55 2.95 10.15l.6-3.35L1.1 4.4l3.4-.5L6 .8z"
        fill="url(#half-star)"
      />
    </svg>
  );
}

export default function ServicesRiskReputation() {
  return (
    <section
      className="relative isolate flex w-full items-center justify-center overflow-hidden rounded-2xl bg-white py-20 sm:py-24 lg:min-h-[70svh] lg:py-28"
      aria-labelledby="services-risk-heading"
    >
      <style>{`
        @keyframes services-cta-float {
          from { transform: translateY(0); }
          to { transform: translateY(10px); }
        }
      `}</style>

      <OrbitField />

      <div className="relative z-10 mx-auto flex w-full max-w-180 flex-col items-center px-6 text-center lg:px-0">
        <span
          className="inline-flex items-center rounded-full border px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-xs"
          style={{ color: TERTIARY, borderColor: TERTIARY_100 }}
        >
          Get Started Today!
        </span>

        <h2
          id="services-risk-heading"
          className="mt-6 max-w-3xl text-[2rem] leading-[1.1] font-bold tracking-[-0.07rem] sm:mt-7 sm:text-[2.75rem] sm:tracking-[-0.09rem] xl:text-[4rem] xl:leading-none xl:tracking-[-0.12rem]"
          style={{ color: TERTIARY }}
        >
          Why Risk Your Brand&apos;s
          <br />
          <span
            className="mt-1.5 inline-flex -rotate-1 rounded-lg px-3.5 py-1.5 lg:mt-2 lg:-rotate-2 lg:rounded-xl lg:px-4 lg:py-2"
            style={{ backgroundColor: TERTIARY, color: PRIMARY }}
          >
            Reputation?
          </span>
        </h2>

        <p
          className="mt-6 max-w-xl text-base leading-[1.6] font-medium tracking-tight sm:mt-8 sm:text-lg sm:leading-[1.55] lg:text-xl lg:leading-normal"
          style={{ color: BODY }}
        >
          Don&apos;t wait for a crisis. Proactively manage your brand&apos;s
          reputation in the age of AI. Join GetCito, the #1 rated GEO experts,
          and see what AI is saying about you.
        </p>

        <div className="mt-8 flex w-full flex-col items-center gap-4 sm:mt-10 xl:mt-12">
          <Button
            size="lg"
            className="h-12 rounded-lg border border-[#93E85F] bg-[#93E85F] px-8 text-base font-semibold text-[#025864] shadow-[0_0.5rem_1rem_-0.1rem_rgba(0,0,0,0.12)] hover:bg-[#a3eb77] hover:text-[#025864] xl:h-14 xl:px-10 xl:text-lg"
            render={
              <Link
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Book a Meeting
          </Button>

        </div>
      </div>
    </section>
  );
}
