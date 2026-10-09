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

      <div className="relative mx-auto flex max-w-3xl flex-col items-center px-5 pt-9 text-center sm:px-6 sm:pt-20 lg:pt-24">
        <h1
          id="audit-offer-hero-heading"
          className="w-full max-w-3xl text-[1.65rem] leading-[1.2] font-bold tracking-tight sm:text-5xl sm:leading-[1.08]"
          style={{ color: brand.tertiary }}
        >
          <span className="sr-only">{AUDIT_HERO_HEADLINE}</span>

          <span aria-hidden="true" className="block text-balance">
            Why <RotatingModelName /> doesn&apos;t recommend you
            <span className="mt-2 hidden text-[0.55em] text-zinc-500 sm:block">
              The diagnosis that gets you onto the shortlist.
            </span>
          </span>
        </h1>

        <p
          className="mt-3.5 max-w-md text-[15px] font-medium leading-snug text-pretty sm:mt-5 sm:max-w-xl sm:text-lg sm:leading-relaxed"
          style={{ color: brand.body }}
        >
          <span className="sm:hidden">
            How AI answers for your category, and the plan that gets you named.
          </span>
          <span className="hidden sm:inline">
            A complete read of how AI answers for your category, and the plan
            that gets you named.
          </span>
        </p>

        <AuditFixHeroActions />

        <ul
          className="mt-5 flex items-center justify-center gap-4 sm:mt-8 sm:gap-5"
          aria-label="Engines covered"
        >
          {ENGINES.map((engine) => (
            <li key={engine.name} className="flex items-center gap-2">
              <Image
                src={engine.src}
                alt=""
                width={28}
                height={28}
                className="size-5 object-contain opacity-70 sm:size-6 sm:opacity-100"
              />
              <span className="sr-only sm:not-sr-only sm:text-sm sm:font-semibold sm:text-zinc-600">
                {engine.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mx-auto mt-7 max-w-5xl sm:mt-12 sm:px-6">
        <figure
          className="relative aspect-[5/4] overflow-hidden sm:aspect-16/9 sm:rounded-t-2xl"
          style={{ backgroundColor: brand.cream }}
        >
          <video
            className="h-full w-full object-cover object-[center_18%] sm:object-top"
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
          className="pointer-events-none absolute inset-x-0 bottom-0 h-14 sm:h-28"
          style={{
            background:
              "linear-gradient(to top, #f6f7f4 0%, rgba(246,247,244,0) 100%)",
          }}
          aria-hidden
        />
      </div>

      <div className="relative grid grid-cols-2 divide-x divide-y divide-zinc-900/10 border-t border-zinc-900/10 sm:grid-cols-4 sm:divide-y-0">
        {auditFixProof.map((item) => (
          <div
            key={item.label}
            className="px-3 py-3.5 text-center sm:px-5 sm:py-6 md:px-6"
          >
            <p
              className="text-base font-bold tracking-tight tabular-nums sm:text-lg"
              style={{ color: brand.tertiary }}
            >
              {item.value}
            </p>
            <p className="mt-0.5 text-[11px] leading-tight font-medium text-zinc-500 sm:text-xs sm:leading-normal">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </header>
  );
}
