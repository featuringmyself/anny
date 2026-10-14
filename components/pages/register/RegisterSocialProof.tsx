import Image from "next/image";
import Link from "next/link";

import { AI_MODELS_PHRASE } from "@/components/Home/ai-models";
import { brand } from "@/components/Home/brand";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import logoImg from "@/public/logo.png";

const onboardingSteps = [
  {
    title: "Request access",
    body: "Share work email and company. No credit card on this step.",
  },
  {
    title: "Onboarding with our team",
    body: "We confirm your plan, models, and competitors to track.",
  },
  {
    title: "See AI citations daily",
    body: "Your dashboard updates with mentions, sources, and gaps.",
  },
] as const;

export default function RegisterSocialProof() {
  return (
    <aside
      aria-label="How Dodox onboarding works"
      className="relative flex flex-col justify-between overflow-hidden px-6 py-12 sm:px-10 sm:py-14 lg:py-16 xl:px-14"
      style={{ backgroundColor: brand.dark }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-90"
        aria-hidden
      >
        <div className="absolute top-[-15%] right-[-20%] h-80 w-80 rounded-full bg-[#45ab8d]/25 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-15%] h-72 w-72 rounded-full bg-[#c5f247]/12 blur-[120px]" />
      </div>

      <div className="relative">
        <Image
          src={logoImg}
          alt=""
          width={logoImg.width}
          height={logoImg.height}
          className="h-8 w-auto brightness-0 invert opacity-90"
          style={{ width: "auto" }}
          aria-hidden
        />

        <p className="mt-8 text-sm font-semibold tracking-[0.06em] text-neutral-300 uppercase">
          How onboarding works
        </p>
        <h2 className="mt-3 max-w-md text-2xl leading-[1.15] font-bold tracking-tight text-white text-balance sm:text-3xl">
          From request to{" "}
          <span style={{ color: brand.lime }}>{AI_MODELS_PHRASE}</span>{" "}
          visibility
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-300/95 sm:text-[15px]">
          Track how often AI answers mention your brand, which sources get
          cited, and where competitors show up instead — updated daily.
        </p>

        <ol className="mt-10 space-y-6">
          {onboardingSteps.map((item, index) => (
            <li key={item.title} className="flex gap-4">
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/25 text-sm font-bold text-white"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                aria-hidden
              >
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-white">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-neutral-300/90">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="relative mt-12 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
        <p className="text-base leading-relaxed font-medium text-white text-pretty">
          Prefer to explore first? Run a free AI readiness check on your site,
          or talk to sales for a walkthrough of Monitoring and the GEO Agent.
        </p>
      </div>

      <div className="relative mt-8 flex flex-wrap items-center gap-3">
        <TalkToSalesButton
          size="lg"
          variant="outline"
          className="h-11 rounded-lg border-white/70 bg-transparent px-5 text-sm font-semibold text-white hover:bg-white hover:text-[#11333c]"
          source="register-social-proof"
        >
          Schedule a demo
        </TalkToSalesButton>
        <Button
          size="lg"
          variant="ghost"
          className="h-11 rounded-lg px-5 text-sm font-semibold text-neutral-200 hover:bg-white/10 hover:text-white"
          render={<Link href="/tools/ai-readiness-checker" />}
        >
          Free AI readiness check
        </Button>
      </div>
    </aside>
  );
}
