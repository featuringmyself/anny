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

const MOBILE_LOGOS = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Gemini", src: geminiLogo },
  { name: "Perplexity", src: perplexityLogo },
  { name: "Grok", src: grokLogo },
  { name: "Copilot", src: copilotLogo },
  { name: "DeepSeek", src: deepseekLogo },
] as const;

function HeroMist() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* Mobile mist — exact mesh sampled from the reference screenshot */}
      <div className="absolute inset-0 lg:hidden">
        <Image
          src="/services/hero-mobile-mist.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute top-1/2 left-1/2 size-[min(42rem,145vw)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#c5cbc8]/80" />
      </div>

      {/* Desktop mist — unchanged */}
      <div className="absolute inset-0 hidden bg-[#f6f7f4] lg:block">
        <div className="absolute top-[-18%] right-[-14%] h-120 w-140 rounded-full bg-[#c5f247]/20 blur-[160px]" />
        <div className="absolute bottom-[-22%] left-[-16%] h-110 w-130 rounded-full bg-[#b6ef3a]/15 blur-[160px]" />
        <div className="absolute top-[-22%] left-[-18%] h-105 w-125 rounded-full bg-[#b6e4f6]/25 blur-[170px]" />
        <div className="absolute right-[-16%] bottom-[-24%] h-100 w-120 rounded-full bg-[#c5ebf8]/20 blur-[170px]" />
      </div>
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

function MobileLogoRow() {
  return (
    <ul
      className="grid w-full max-w-xs grid-cols-3 items-center justify-items-center gap-x-8 gap-y-5 pt-1 sm:max-w-sm sm:gap-x-10 lg:hidden"
      aria-label="AI platforms we optimize for"
    >
      {MOBILE_LOGOS.map((logo) => (
        <li key={logo.name} className="flex size-11 items-center justify-center">
          <Image
            src={logo.src}
            alt={logo.name}
            width={44}
            height={44}
            className="size-10 object-contain"
            sizes="40px"
          />
        </li>
      ))}
    </ul>
  );
}

export default function ServicesHero() {
  return (
    <section
      className="relative isolate flex min-h-175 w-full items-center justify-center overflow-hidden rounded-2xl py-24 lg:min-h-[90svh] lg:py-28"
      aria-labelledby="services-hero-heading"
    >
      <HeroMist />
      <OrbitField />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
        <h1
          id="services-hero-heading"
          className="text-4xl font-bold text-balance text-[#225864] md:text-6xl"
        >
          Monitor &amp; Boost Your Brand&apos;s Visibility on <AiFlip />
        </h1>

        <p className="max-w-4xl text-base leading-tight font-semibold text-balance text-zinc-800 md:text-lg">
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

        <MobileLogoRow />
      </div>
    </section>
  );
}
