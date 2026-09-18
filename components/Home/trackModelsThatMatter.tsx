import Image from "next/image";

import { brand } from "@/components/Home/brand";
import chatgptLogo from "@/public/trackModel/openai-logo.svg";
import claudeLogo from "@/public/trackModel/claude-logo.svg";
import geminiLogo from "@/public/trackModel/gemini-logo.svg";
import deepseekLogo from "@/public/trackModel/deepseek-logo.svg";
import grokLogo from "@/public/trackModel/grok-logo.svg";
import perplexityLogo from "@/public/trackModel/perplexity-logo.svg";
import googleLogo from "@/public/trackModel/ai_mode-logo.svg";
import aiOverviewLogo from "@/public/trackModel/ai_overview-logo.svg";

/** Thin trust strip. One job: coverage proof. No competing headline stack. */
const modelData = [
  { name: "ChatGPT", logo: chatgptLogo },
  { name: "Claude", logo: claudeLogo },
  { name: "Gemini", logo: geminiLogo },
  { name: "Deepseek", logo: deepseekLogo },
  { name: "Grok", logo: grokLogo },
  { name: "Perplexity", logo: perplexityLogo },
  { name: "Google AI Overview", logo: googleLogo },
  { name: "AI Mode", logo: aiOverviewLogo },
] as const;

export default function TrackModelsThatMatter() {
  return (
    <section
      className="w-full rounded-2xl px-6 py-10 sm:py-12"
      style={{ backgroundColor: brand.cream }}
      aria-labelledby="track-models-heading"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h2
          id="track-models-heading"
          className="text-sm font-semibold tracking-[0.06em] uppercase"
          style={{ color: brand.tertiary }}
        >
          Tracks the models buyers use
        </h2>
        <ul className="mt-6 grid grid-cols-4 gap-y-5 sm:grid-cols-8 sm:gap-y-0">
          {modelData.map((item) => (
            <li
              key={item.name}
              className="flex h-10 items-center justify-center px-1"
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={88}
                height={28}
                className="h-6 w-auto max-w-full object-contain opacity-90"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
