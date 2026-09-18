import Image from "next/image";
import Link from "next/link";

import AiFlip from "@/components/Home/ai-flip";
import { brand } from "@/components/Home/brand";
import Demo from "@/components/Home/demo";
import DemoReveal from "@/components/Home/demoReveal";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import logoImg from "@/public/logo.png";
import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";
import copilotLogo from "@/public/services/orbit/copilot.webp";

const LOGOS = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Gemini", src: geminiLogo },
  { name: "Perplexity", src: perplexityLogo },
  { name: "Copilot", src: copilotLogo },
] as const;

/**
 * First viewport = one composition:
 * brand, one headline, one sentence, one CTA group, one dominant product visual.
 */
export default function Hero() {
  return (
    <header
      className="relative w-full overflow-hidden rounded-2xl bg-white"
      aria-labelledby="home-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
      >
        <div className="absolute top-[-18%] right-[-10%] h-100 w-120 rounded-full bg-[#c5f247]/16 blur-[140px]" />
        <div className="absolute bottom-[-24%] left-[-12%] h-90 w-110 rounded-full bg-[#45ab8d]/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pt-16 text-center sm:pt-20 lg:pt-24">
        <Image
          src={logoImg}
          alt="Anny"
          width={120}
          height={40}
          priority
          className="h-9 w-auto object-contain sm:h-10"
        />

        <h1
          id="home-hero-heading"
          className="mt-8 max-w-3xl text-[2rem] leading-[1.08] font-bold tracking-tight sm:text-4xl md:text-[3.1rem] md:leading-[1.08]"
          style={{ color: brand.heading }}
        >
          Get cited in <AiFlip />
          <span className="mt-1.5 block font-bold text-zinc-500">
            then keep the mention.
          </span>
        </h1>

        <p
          className="mt-5 max-w-xl text-base leading-relaxed font-medium sm:mt-6 sm:text-lg"
          style={{ color: brand.body }}
        >
          Anny is an SEO &amp; GEO Agent with AI Monitoring built in. Track what
          models say, then ship the work that changes it.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-12 cursor-pointer rounded-lg border border-zinc-900 bg-brand px-6 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black"
            render={<Link href="/register" />}
          >
            Get started
          </Button>
          <TalkToSalesButton
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-zinc-900 px-6 text-base font-semibold hover:bg-zinc-900 hover:text-white"
            source="home-hero"
          >
            Talk to sales
          </TalkToSalesButton>
        </div>

        <ul
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          aria-label="Works across AI platforms"
        >
          {LOGOS.map((logo) => (
            <li
              key={logo.name}
              className="flex size-9 items-center justify-center opacity-80"
            >
              <Image
                src={logo.src}
                alt={logo.name}
                width={36}
                height={36}
                className="size-8 object-contain"
                sizes="32px"
              />
            </li>
          ))}
        </ul>
      </div>

      <DemoReveal>
        <Demo />
      </DemoReveal>
    </header>
  );
}
