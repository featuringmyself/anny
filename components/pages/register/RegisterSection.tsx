import Image from "next/image";
import { Check } from "lucide-react";

import { brand } from "@/components/Home/brand";
import RegisterForm from "@/components/pages/register/RegisterForm";
import type { RegisterPlan } from "@/lib/plans";

import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import copilotLogo from "@/public/services/orbit/copilot.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";

const LOGOS = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Gemini", src: geminiLogo },
  { name: "Perplexity", src: perplexityLogo },
  { name: "Copilot", src: copilotLogo },
] as const;

const perks = [
  "Track ChatGPT, Gemini, Perplexity, and Copilot in one place",
  "Daily prompts, competitor scorecards, and cited sources",
  "See mention gaps before you pick a plan",
] as const;

function PerkCheck() {
  return (
    <span
      className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-zinc-900/80"
      style={{ backgroundColor: brand.sticker }}
      aria-hidden
    >
      <Check className="size-3 text-zinc-900" strokeWidth={1.8} />
    </span>
  );
}

export default function RegisterSection({ plan }: { plan?: RegisterPlan }) {
  return (
    <section
      className="relative w-full overflow-hidden rounded-2xl bg-[#f6f7f4]"
      aria-labelledby="register-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        aria-hidden
      >
        <div className="absolute top-[-20%] right-[-8%] h-96 w-112 rounded-full bg-[#c5f247]/18 blur-[140px]" />
        <div className="absolute bottom-[-28%] left-[-10%] h-90 w-110 rounded-full bg-[#45ab8d]/14 blur-[140px]" />
      </div>

      <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,26rem)] lg:items-stretch">
        <aside
          aria-label="What you get with Dodox"
          className="order-2 flex flex-col justify-center px-6 py-12 sm:px-10 sm:py-14 lg:order-1 lg:py-16 lg:pr-4 xl:px-14"
        >
          <span
            className="inline-flex w-fit items-center rounded-full border px-5 py-1.5 text-[11px] font-semibold tracking-[0.08em] uppercase sm:text-xs"
            style={{ color: brand.heading, borderColor: `${brand.heading}80` }}
          >
            Get started
          </span>

          <h1
            id="register-heading"
            className="mt-6 max-w-lg text-[2rem] leading-[1.12] font-bold tracking-tight text-balance sm:text-4xl"
            style={{ color: brand.heading }}
          >
            Create your Dodox account
          </h1>

          <p
            className="mt-5 max-w-md text-base font-medium leading-relaxed text-balance sm:text-lg"
            style={{ color: brand.body }}
          >
            Share your work email and company. We&apos;ll show you how often AI
            answers mention your brand, and which sources they cite.
          </p>

          <ul className="mt-8 space-y-4 sm:mt-10">
            {perks.map((perk) => (
              <li
                key={perk}
                className="flex gap-3 text-[15px] leading-snug"
                style={{ color: brand.bodyStrong }}
              >
                <PerkCheck />
                <span>{perk}</span>
              </li>
            ))}
          </ul>

          <ul
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 sm:mt-12"
            aria-label="Works across AI platforms"
          >
            {LOGOS.map((logo) => (
              <li
                key={logo.name}
                className="flex size-10 items-center justify-center opacity-85"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={40}
                  height={40}
                  className="size-9 object-contain"
                  sizes="36px"
                />
              </li>
            ))}
          </ul>
        </aside>

        <div className="order-1 flex flex-col justify-center p-4 sm:p-6 lg:order-2 lg:p-8 lg:pl-2">
          <div className="rounded-2xl border border-zinc-900/10 bg-white shadow-sm">
            <RegisterForm plan={plan} />
          </div>
        </div>
      </div>
    </section>
  );
}
