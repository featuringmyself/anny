import Image from "next/image";

import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import RotatingModelName from "@/components/Home/rotating-model-name";
import AuditFixHeroActions from "./AuditFixHeroActions";
import { AUDIT_OFFER_NAME, auditFixProof } from "./content";

import logoImg from "@/public/logo.png";

const ENGINES = [
  { name: "ChatGPT", src: "/ai-logo/chatgptLogo.svg" },
  { name: "Claude", src: "/ai-logo/claudeLogo.svg" },
  { name: "Gemini", src: "/ai-logo/geminiLogo.svg" },
  { name: "Grok", src: "/ai-logo/grokLogo.svg" },
  { name: "Perplexity", src: "/ai-logo/perplexityLogo.svg" },
] as const;

const AUDIT_HERO_HEADLINE = `Why ${AI_MODELS_PHRASE} don't recommend you. The diagnosis that gets you onto the shortlist.`;

export default function AuditFixHero() {
  return (
    <header
      className="relative w-full overflow-hidden rounded-2xl bg-[#f6f7f4]"
      aria-labelledby="audit-offer-hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
      >
        <div className="absolute top-[-18%] right-[-10%] h-100 w-120 rounded-full bg-[#c5f247]/16 blur-[140px]" />
        <div className="absolute bottom-[-24%] left-[-12%] h-90 w-110 rounded-full bg-[#45ab8d]/12 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pt-10 text-center sm:pt-20 lg:pt-24">
        {/* <Image
          src={logoImg}
          alt="Dodox"
          width={logoImg.width}
          height={logoImg.height}
          priority
          className="h-7 w-auto object-contain sm:h-9"
          style={{ width: "auto" }}
        /> */}


        <h1
          id="audit-offer-hero-heading"
          className="mt-2 w-full max-w-3xl text-[1.75rem] leading-[1.12] font-bold tracking-tight sm:mt-3 sm:text-5xl sm:leading-[1.08]"
          style={{ color: brand.tertiary }}
        >
          <span className="sr-only">{AUDIT_HERO_HEADLINE}</span>

          <span aria-hidden="true" className="block">
            <span className="block sm:inline">Why </span>
            <RotatingModelName />
            <span className="mt-1.5 block text-balance sm:mt-2">
              doesn&apos;t recommend you
            </span>
            <span className="mt-1.5 block text-[0.8em] text-zinc-500 sm:mt-2 sm:text-[0.55em]">
              The diagnosis that gets you onto the shortlist.
            </span>
          </span>
        </h1>

        <p
          className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-pretty sm:mt-5 sm:text-lg"
          style={{ color: brand.body }}
        >
          A complete read of how AI answers for your category, and the plan
          that gets you named.
        </p>

        <AuditFixHeroActions />

        <ul
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-8"
          aria-label="Engines covered"
        >
          {ENGINES.map((engine) => (
            <li
              key={engine.name}
              className="flex items-center gap-2 text-xs font-semibold text-zinc-600 sm:text-sm"
            >
              <Image
                src={engine.src}
                alt=""
                width={28}
                height={28}
                className="size-5 object-contain sm:size-6"
              />
              {engine.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Product visual: standing dashboard, not a random workspace shot */}
      <div className="relative mx-auto mt-8 max-w-5xl px-4 sm:mt-12 sm:px-6">
        <figure
          className="relative aspect-[5/3] overflow-hidden rounded-t-2xl ring-1 ring-black/5 sm:aspect-16/9"
          style={{ backgroundColor: brand.cream }}
        >
          <video
            className="h-full w-full object-cover object-top"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`AI visibility standing across ${AI_MODELS_PHRASE}`}
          >
            <source
              src="/services/videos/brand-visibility.webm"
              type="video/webm"
            />
          </video>
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
        {auditFixProof.map((item, index) => (
          <div
            key={item.label}
            className={`px-3 py-3.5 text-center sm:px-5 sm:py-6 md:px-6 ${
              index % 2 === 0 ? "border-r border-zinc-900/10" : ""
            } ${index < 2 ? "border-b border-zinc-900/10 md:border-b-0" : ""} ${
              index < auditFixProof.length - 1
                ? "md:border-r md:border-zinc-900/10"
                : ""
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
