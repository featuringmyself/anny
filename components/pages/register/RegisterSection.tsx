import Image from "next/image";
import Link from "next/link";

import { brand } from "@/components/Home/brand";
import RegisterForm from "@/components/pages/register/RegisterForm";
import RegisterPreview from "@/components/pages/register/RegisterPreview";
import type { RegisterPlan } from "@/lib/plans";

import logoImg from "@/public/logo.png";
import chatgptLogo from "@/public/services/orbit/chatgpt.webp";
import geminiLogo from "@/public/services/orbit/gemini.webp";
import perplexityLogo from "@/public/services/orbit/perplexity.webp";
import copilotLogo from "@/public/services/orbit/copilot.webp";

const MODELS = [
  { name: "ChatGPT", src: chatgptLogo },
  { name: "Gemini", src: geminiLogo },
  { name: "Perplexity", src: perplexityLogo },
  { name: "Copilot", src: copilotLogo },
] as const;

/**
 * Premium B2B signup shell:
 * - Chrome stripped (logo + escape only)
 * - Form column quiet and focused
 * - Product proof on desktop; compact trust strip on mobile
 */
export default function RegisterSection({ plan }: { plan?: RegisterPlan }) {
  return (
    <section
      className="min-h-svh bg-white"
      aria-labelledby="register-heading"
    >
      <div className="mx-auto grid min-h-svh lg:grid-cols-2">
        <div className="relative flex min-h-svh flex-col border-zinc-200/80 lg:border-r">
          <header className="flex items-center px-6 pt-7 sm:px-10 lg:px-14 lg:pt-9">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-[17px] font-semibold tracking-tight outline-none transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-[#225864]/25 focus-visible:ring-offset-2"
              style={{ color: brand.heading }}
            >
              <Image
                src={logoImg}
                alt=""
                width={28}
                height={28}
                className="size-7"
                priority
              />
              <span>Dodox</span>
            </Link>
          </header>

          <div className="flex flex-1 flex-col justify-center px-6 py-12 sm:px-10 lg:px-14 lg:py-14">
            <div className="mx-auto w-full max-w-[372px]">
              <RegisterForm plan={plan} />
            </div>
          </div>

          {/* Mobile-only trust — desktop gets the full product panel */}
          <div className="border-t border-zinc-100 px-6 py-5 lg:hidden">
            <p className="text-center text-[11px] font-medium tracking-[0.14em] text-zinc-400 uppercase">
              Tracks answers across
            </p>
            <ul
              className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2"
              aria-label="Supported AI platforms"
            >
              {MODELS.map((model) => (
                <li
                  key={model.name}
                  className="flex items-center gap-1.5 text-[12px] font-medium text-zinc-500"
                >
                  <Image
                    src={model.src}
                    alt=""
                    width={16}
                    height={16}
                    className="size-4 object-contain"
                    sizes="16px"
                  />
                  {model.name}
                </li>
              ))}
            </ul>
          </div>

          <footer className="hidden px-6 pb-7 sm:px-10 lg:block lg:px-14 lg:pb-9">
            <p className="text-[11px] text-zinc-400">
              © {new Date().getFullYear()} Dodox
            </p>
          </footer>
        </div>

        <RegisterPreview />
      </div>
    </section>
  );
}
