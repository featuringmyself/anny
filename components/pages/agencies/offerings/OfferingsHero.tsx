import Image from "next/image";
import Link from "next/link";

import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import logoImg from "@/public/logo.png";
import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";
import copilotLogo from "@/public/services/orbit/copilot.webp";
import heroVisual from "@/public/partnership/agencies/ws-client-management.webp";

const LOGOS = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Gemini", src: geminiLogo },
  { name: "Perplexity", src: perplexityLogo },
  { name: "Copilot", src: copilotLogo },
] as const;

export default function OfferingsHero() {
  return (
    <header
      className="relative w-full overflow-hidden rounded-2xl bg-[#f6f7f4]"
      aria-labelledby="offerings-hero-heading"
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
          alt="Dodox"
          width={logoImg.width}
          height={logoImg.height}
          priority
          className="h-9 w-auto object-contain sm:h-10"
          style={{ width: "auto" }}
        />

        <p
          className="mt-6 text-sm font-semibold tracking-[0.08em] uppercase"
          style={{ color: brand.tertiary }}
        >
          For agencies
        </p>

        <h1
          id="offerings-hero-heading"
          className="mt-3 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-5xl lg:text-[3.25rem]"
          style={{ color: brand.tertiary }}
        >
          GEO packages your clients will buy
        </h1>

        <p
          className="mt-5 max-w-xl text-base leading-relaxed font-medium sm:mt-6 sm:text-lg"
          style={{ color: brand.body }}
        >
          One-time standing snapshots and monthly visibility retainers, sold
          under your brand, ready for SEO, PR, and digital agencies to put on a
          rate card.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <TalkToSalesButton
            size="lg"
            className="h-12 cursor-pointer rounded-lg border border-zinc-900 bg-brand px-6 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black"
            source="agency-offerings-hero"
          >
            Get agency packaging
          </TalkToSalesButton>
          <Button
            size="lg"
            variant="outline"
            className="h-12 rounded-lg border-zinc-900 px-6 text-base font-semibold hover:bg-zinc-900 hover:text-white"
            render={<Link href="#packages" />}
          >
            See packages
          </Button>
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

      <div className="relative mx-auto mt-10 max-w-5xl px-4 pb-0 sm:mt-12 sm:px-6">
        <figure
          className="relative aspect-16/9 overflow-hidden rounded-t-2xl ring-1 ring-black/5"
          style={{ backgroundColor: brand.cream }}
        >
          <Image
            src={heroVisual}
            alt="Multi-client agency workspace"
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1024px) 100vw, 64rem"
          />
        </figure>
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 sm:h-32"
          style={{
            background:
              "linear-gradient(to top, #f6f7f4 0%, rgba(246,247,244,0.7) 45%, rgba(246,247,244,0) 100%)",
          }}
          aria-hidden
        />
      </div>
    </header>
  );
}
