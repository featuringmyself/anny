import type { CSSProperties } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

import AiFlip from "@/components/Home/ai-flip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import copilotLogo from "@/public/services/orbit/copilot.webp";
import deepseekLogo from "@/public/services/orbit/deepseek.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import grokLogo from "@/public/services/orbit/grok.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";

const CAL_BOOKING_URL = "https://cal.com/dodox/quick-chat";
const AI_READINESS_HREF = "/tools/ai-readiness-checker";

const RING_SIZES = [
  "size-[min(45rem,88vw)]",
  "size-[min(60rem,115vw)]",
  "size-[min(77.5rem,145vw)]",
] as const;

/** Polar placement on the dashed rings (0° = top, clockwise). */
const ORBIT_LOGOS: {
  name: string;
  src: StaticImageData;
  radius: number;
  angle: number;
}[] = [
  { name: "Grok", src: grokLogo, radius: 520, angle: -150 },
  { name: "ChatGPT", src: chatgptLogo, radius: 360, angle: -48 },
  { name: "Copilot", src: copilotLogo, radius: 480, angle: -100 },
  { name: "Perplexity", src: perplexityLogo, radius: 500, angle: 95 },
  { name: "DeepSeek", src: deepseekLogo, radius: 480, angle: 145 },
  { name: "Gemini", src: geminiLogo, radius: 500, angle: 38 },
];

function HeroMist() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-[#f6f7f4]"
      aria-hidden
    >
      <div className="absolute top-[-18%] right-[-14%] h-95 w-115 rounded-full bg-[#c5f247]/20 blur-[130px] sm:h-120 sm:w-140 sm:blur-[160px]" />
      <div className="absolute bottom-[-22%] left-[-16%] h-85 w-105 rounded-full bg-[#b6ef3a]/15 blur-[130px] sm:h-110 sm:w-130 sm:blur-[160px]" />
      <div className="absolute top-[-22%] left-[-18%] h-80 w-100 rounded-full bg-[#b6e4f6]/25 blur-[140px] sm:h-105 sm:w-125 sm:blur-[170px]" />
      <div className="absolute right-[-16%] bottom-[-24%] h-75 w-95 rounded-full bg-[#c5ebf8]/20 blur-[140px] sm:h-100 sm:w-120 sm:blur-[170px]" />
    </div>
  );
}

function OrbitField() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden lg:block"
      aria-hidden
    >
      {RING_SIZES.map((size) => (
        <div
          key={size}
          className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-zinc-300/80",
            size,
          )}
        />
      ))}

      {ORBIT_LOGOS.map((logo) => (
        <div
          key={logo.name}
          className="absolute top-1/2 left-1/2 size-14"
          style={
            {
              "--orbit-angle": `${logo.angle}deg`,
              "--orbit-radius": `${logo.radius}px`,
              transform:
                "translate(-50%, -50%) rotate(var(--orbit-angle)) translateY(calc(var(--orbit-radius) * -1)) rotate(calc(var(--orbit-angle) * -1))",
            } as CSSProperties
          }
        >
          <Image
            src={logo.src}
            alt=""
            width={56}
            height={56}
            className="size-14 object-contain"
            sizes="56px"
          />
        </div>
      ))}
    </div>
  );
}

export default function ServicesHero() {
  return (
    <section
      className="relative isolate flex min-h-175 w-full items-center justify-center overflow-hidden py-24 lg:min-h-[90svh] lg:py-28 rounded-2xl"
      aria-labelledby="services-hero-heading"
    >
      <HeroMist />
      <OrbitField />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <h1
          id="services-hero-heading"
          className="md:text-6xl text-4xl font-bold text-balance text-[#225864]"
        >
          Monitor &amp; Boost Your Brand&apos;s Visibility on <AiFlip />
        </h1>

        <p className="max-w-4xl md:text-lg text-base leading-tight font-semibold text-balance text-zinc-800">
          Anny is an award-winning AEO agency and the creator of the #1
          open-source AI search optimization tool — a powerful alternative to
          Profound, Semrush AI Toolkit, and Otterly AI.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-12 rounded-lg border border-zinc-900 bg-brand px-6 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black"
            render={<Link href={AI_READINESS_HREF} />}
          >
            Free AI Visibility Audit
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-zinc-900 px-6 text-base font-semibold hover:bg-zinc-900 hover:text-white"
            render={
              <Link
                href={CAL_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Book a call
          </Button>
        </div>
      </div>
    </section>
  );
}
