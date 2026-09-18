import Image from "next/image";
import Link from "next/link";

import AiFlip from "@/components/Home/ai-flip";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import copilotLogo from "@/public/services/orbit/copilot.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";

const HEADING = "#225864";
const BODY = "#5c6b73";

const LOGOS = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Gemini", src: geminiLogo },
  { name: "Perplexity", src: perplexityLogo },
  { name: "Copilot", src: copilotLogo },
] as const;

export default function PricingHero() {
  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl bg-white"
      aria-labelledby="pricing-hero-heading"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center sm:py-24 lg:py-28">
        <span
          className="inline-flex items-center rounded-full border px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-xs"
          style={{ color: HEADING, borderColor: `${HEADING}80` }}
        >
          Simple Pricing
        </span>

        <h1
          id="pricing-hero-heading"
          className="mt-8 max-w-4xl text-[2rem] leading-[1.1] font-bold tracking-tight sm:text-4xl md:text-[3rem] md:leading-[1.12]"
          style={{ color: HEADING }}
        >
          AI agents that get you cited in <br /><AiFlip />
        </h1>

        <p
          className="mt-8 max-w-2xl text-base leading-normal font-medium tracking-tight sm:mt-10 sm:text-lg"
          style={{ color: BODY }}
        >
          SEO &amp; GEO Agent + Monitoring at $300/mo. AI Monitoring alone at
          $150/mo. Managed services from $250 if you want hands-on help.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button
            size="lg"
            className="h-12 rounded-lg border border-zinc-900 bg-brand px-6 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black"
            render={<Link href="#agents" />}
          >
            See AI agents
          </Button>
          <TalkToSalesButton
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-zinc-900 px-6 text-base font-semibold hover:bg-zinc-900 hover:text-white"
            source="pricing-hero"
          >
            Talk to sales
          </TalkToSalesButton>
        </div>

        <ul
          className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-5"
          aria-label="Works across AI platforms"
        >
          {LOGOS.map((logo) => (
            <li key={logo.name} className="flex size-12 items-center justify-center">
              <Image
                src={logo.src}
                alt={logo.name}
                width={48}
                height={48}
                className="size-11 object-contain"
                sizes="44px"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
