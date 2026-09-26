import Image from "next/image";
import Link from "next/link";

import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { snapshotProof } from "./content";

import logoImg from "@/public/logo.png";
import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import heroVisual from "@/public/features/chatgpt/hero-dashboard.webp";

const ENGINES = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Perplexity", src: perplexityLogo },
  { name: "Google AI Overviews", src: geminiLogo },
] as const;

export default function StandingsHero() {
  return (
    <header
      className="relative w-full overflow-hidden rounded-2xl bg-[#f6f7f4]"
      aria-labelledby="standings-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
      >
        <div className="absolute top-[-18%] right-[-10%] h-100 w-120 rounded-full bg-[#c5f247]/16 blur-[140px]" />
        <div className="absolute bottom-[-24%] left-[-12%] h-90 w-110 rounded-full bg-[#45ab8d]/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-10 text-center sm:pt-20 lg:pt-24">
        <Image
          src={logoImg}
          alt="Dodox"
          width={logoImg.width}
          height={logoImg.height}
          priority
          className="h-7 w-auto object-contain sm:h-9"
          style={{ width: "auto" }}
        />

        <p
          className="mt-4 text-sm font-semibold tracking-[0.08em] uppercase sm:mt-6"
          style={{ color: brand.tertiary }}
        >
          Dodox Snapshots
        </p>

        <h1
          id="standings-hero-heading"
          className="mt-2 text-[1.75rem] leading-[1.1] font-bold tracking-tight text-balance sm:mt-3 sm:text-5xl"
          style={{ color: brand.tertiary }}
        >
          White-label AI visibility reports for agencies
        </h1>

        <p
          className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-pretty sm:mt-5 sm:text-lg"
          style={{ color: brand.body }}
        >
          Branded client standings across ChatGPT, Perplexity, and Google AI
          Overviews: visibility, share of voice, citations, and website
          readiness in one PDF your clients open under your logo.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
          <TalkToSalesButton
            size="lg"
            className="h-11 cursor-pointer rounded-lg border border-zinc-900 bg-brand px-5 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black sm:h-12 sm:px-6"
            source="standings-hero"
          >
            Order a Snapshot
          </TalkToSalesButton>
          <Button
            size="lg"
            variant="outline"
            className="h-11 rounded-lg border-zinc-900 px-5 text-base font-semibold hover:bg-zinc-900 hover:text-white sm:h-12 sm:px-6"
            render={<Link href="#pricing" />}
          >
            See pricing
          </Button>
        </div>

        <ul
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-10 sm:gap-x-6 sm:gap-y-3"
          aria-label="Engines in every Snapshot"
        >
          {ENGINES.map((e) => (
            <li
              key={e.name}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-600 sm:text-sm"
            >
              <Image
                src={e.src}
                alt=""
                width={28}
                height={28}
                className="size-5 object-contain sm:size-7"
              />
              {e.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-7 max-w-5xl px-4 sm:mt-12 sm:px-6">
        <figure
          className="relative aspect-[5/3] overflow-hidden rounded-t-2xl ring-1 ring-black/5 sm:aspect-16/9"
          style={{ backgroundColor: brand.cream }}
        >
          <Image
            src={heroVisual}
            alt="AI visibility standing dashboard"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 64rem"
          />
        </figure>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 sm:h-28"
          style={{
            background:
              "linear-gradient(to top, #f6f7f4 0%, rgba(246,247,244,0) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative grid grid-cols-2 border-t border-zinc-900/10 md:grid-cols-4">
        {snapshotProof.map((item, index) => (
          <div
            key={item.label}
            className={`px-3 py-3.5 text-center sm:px-5 sm:py-6 md:px-6 ${
              index % 2 === 0 ? "border-r border-zinc-900/10" : ""
            } ${index < 2 ? "border-b border-zinc-900/10 md:border-b-0" : ""} ${
              index < snapshotProof.length - 1 ? "md:border-r md:border-zinc-900/10" : ""
            }`}
          >
            <p
              className="text-base font-bold tracking-tight tabular-nums sm:text-lg"
              style={{ color: brand.tertiary }}
            >
              {item.value}
            </p>
            <p className="mt-0.5 text-[11px] font-medium text-zinc-500 sm:mt-1 sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
}
