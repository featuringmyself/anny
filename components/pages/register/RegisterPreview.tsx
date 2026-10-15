import Image from "next/image";

import Demo from "@/components/Home/demo";
import { brand } from "@/components/Home/brand";

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
 * Right-rail product proof: copy, then the real dashboard sized to its content.
 * No fixed heights, no scale hacks, no bottom-pinning.
 */
export default function RegisterPreview() {
  return (
    <aside
      className="relative hidden overflow-hidden lg:block"
      style={{
        background:
          "linear-gradient(180deg, #f4f7f5 0%, #eef3f0 55%, #e8efeb 100%)",
      }}
      aria-label="Dodox product preview"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(17,51,60,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(17,51,60,0.035) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col px-10 pt-14 xl:px-14 xl:pt-16">
        <div className="shrink-0">
          <p
            className="text-[11px] font-semibold tracking-[0.18em] uppercase"
            style={{ color: "#2f8f74" }}
          >
            AI visibility
          </p>
          <h2
            className="mt-3 max-w-[16ch] text-[1.75rem] leading-[1.12] font-semibold tracking-[-0.02em] text-balance xl:text-[2rem]"
            style={{ color: brand.heading }}
          >
            From model mentions to citation sources.
          </h2>
          <p
            className="mt-3.5 max-w-[34ch] text-[14px] leading-[1.55]"
            style={{ color: brand.body }}
          >
            One dashboard for how AI answers talk about your brand — across
            ChatGPT, Gemini, Perplexity, and Copilot.
          </p>

          <ul
            className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2"
            aria-label="Supported AI platforms"
          >
            {MODELS.map((model) => (
              <li
                key={model.name}
                className="flex items-center gap-2 text-[12px] font-medium text-zinc-500"
              >
                <Image
                  src={model.src}
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] object-contain opacity-90"
                  sizes="18px"
                />
                {model.name}
              </li>
            ))}
          </ul>
        </div>

        <div
          className="pointer-events-none mt-10 w-full select-none overflow-hidden rounded-t-[18px] border border-b-0 border-zinc-200/90 bg-white"
          style={{
            boxShadow:
              "0 1px 0 rgba(17,51,60,0.04), 0 28px 64px -28px rgba(17,51,60,0.28), 0 12px 24px -16px rgba(17,51,60,0.12)",
            maskImage:
              "linear-gradient(to bottom, #000 0%, #000 85%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, #000 85%, transparent 100%)",
          }}
        >
          <Demo variant="embed" />
        </div>
      </div>
    </aside>
  );
}
