import Image from "next/image";
import Link from "next/link";

import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import RotatingModelName from "@/components/Home/rotating-model-name";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { AUDIT_OFFER_NAME, auditFixProof } from "./content";

import logoImg from "@/public/logo.png";
import heroVisual from "@/public/partnership/agencies/ws-audits.webp";

const AUDIT_HERO_HEADLINE = `Why ${AI_MODELS_PHRASE} don't recommend you. Diagnosed, with what to change.`;

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
          {AUDIT_OFFER_NAME}
        </p>

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
            <span className="mt-1.5 block whitespace-nowrap text-[0.8em] text-zinc-500 sm:mt-2 sm:text-[0.55em]">
              Diagnosed, with what to change.
            </span>
          </span>
        </h1>

        <p
          className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-pretty sm:mt-5 sm:text-lg"
          style={{ color: brand.body }}
        >
          We show you why AI skips your brand and what needs to change across
          your site, content, and authority footprint.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8">
          <TalkToSalesButton
            size="lg"
            className="h-11 cursor-pointer rounded-lg border border-zinc-900 bg-brand px-5 text-base font-semibold text-white shadow-sm hover:bg-emerald-50 hover:text-black sm:h-12 sm:px-6"
            source="audit-offer-hero"
          >
            Get an Audit
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
      </div>

      <div className="relative mx-auto mt-7 max-w-5xl px-4 sm:mt-12 sm:px-6">
        <figure
          className="relative aspect-[5/3] overflow-hidden rounded-t-2xl ring-1 ring-black/5 sm:aspect-16/9"
          style={{ backgroundColor: brand.cream }}
        >
          <Image
            src={heroVisual}
            alt={`AI visibility audit across ${AI_MODELS_PHRASE}`}
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
