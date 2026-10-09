import Image from "next/image";

import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import RotatingModelName from "@/components/Home/rotating-model-name";
import AuditFixHeroActions from "./AuditFixHeroActions";
import { auditFixProof } from "./content";

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

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pt-8 text-center sm:px-6 sm:pt-20 lg:pt-24">
        <h1
          id="audit-offer-hero-heading"
          className="w-full max-w-3xl text-[1.65rem] leading-[1.12] font-bold tracking-tight sm:text-5xl sm:leading-[1.08]"
          style={{ color: brand.tertiary }}
        >
          <span className="sr-only">{AUDIT_HERO_HEADLINE}</span>

          <span aria-hidden="true" className="block">
            <span className="block sm:inline">Why </span>
            <RotatingModelName />
            <span className="mt-1 block text-balance sm:mt-2">
              doesn&apos;t recommend you
            </span>
            <span className="mt-1.5 block text-[0.72em] text-zinc-500 sm:mt-2 sm:text-[0.55em]">
              The diagnosis that gets you onto the shortlist.
            </span>
          </span>
        </h1>

        <p
          className="mt-3 hidden max-w-xl text-sm font-medium leading-relaxed text-pretty sm:mt-5 sm:block sm:text-lg"
          style={{ color: brand.body }}
        >
          A complete read of how AI answers for your category, and the plan
          that gets you named.
        </p>

        <AuditFixHeroActions />

        <ul
          className="mt-5 hidden flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:mt-8 sm:flex"
          aria-label="Engines covered"
        >
          {ENGINES.map((engine) => (
            <li
              key={engine.name}
              className="flex items-center gap-2 text-sm font-semibold text-zinc-600"
            >
              <Image
                src={engine.src}
                alt=""
                width={28}
                height={28}
                className="size-6 object-contain"
              />
              {engine.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop product visual — skip on mobile (findings section carries proof) */}
      <div className="relative mx-auto mt-10 hidden max-w-5xl px-6 sm:mt-12 sm:block">
        <figure
          className="relative aspect-16/9 overflow-hidden rounded-t-2xl ring-1 ring-black/5"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
          style={{
            background:
              "linear-gradient(to top, #f6f7f4 0%, rgba(246,247,244,0) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative mt-6 grid grid-cols-4 border-t border-zinc-900/10 sm:mt-0">
        {auditFixProof.map((item, index) => (
          <div
            key={item.label}
            className={`px-1.5 py-3 text-center sm:px-5 sm:py-6 md:px-6 ${
              index < auditFixProof.length - 1
                ? "border-r border-zinc-900/10"
                : ""
            }`}
          >
            <p
              className="text-sm font-bold tracking-tight tabular-nums sm:text-lg"
              style={{ color: brand.tertiary }}
            >
              {item.value}
            </p>
            <p className="mt-0.5 text-[10px] leading-tight font-medium text-zinc-500 sm:mt-1 sm:text-xs">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
}
