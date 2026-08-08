import Image from "next/image";
import chatgptLogo from "@/public/trackModel/engines/chatgpt.svg";
import geminiLogo from "@/public/trackModel/engines/gemini.svg";
import googleLogo from "@/public/trackModel/engines/google.svg";
import perplexityLogo from "@/public/trackModel/engines/perplexity.svg";
import claudeLogo from "@/public/trackModel/engines/claude.svg";
import grokLogo from "@/public/trackModel/engines/grok.svg";
import { PatternStrip } from "../../shared";

const engines = [
  { name: "ChatGPT", logo: chatgptLogo, width: 150 },
  { name: "Gemini", logo: geminiLogo, width: 122 },
  { name: "Google AI Overviews", logo: googleLogo, width: 279 },
  { name: "Perplexity", logo: perplexityLogo, width: 165 },
  { name: "Claude", logo: claudeLogo, width: 131 },
  { name: "Grok", logo: grokLogo, width: 105 },
] as const;

export default function TrackAcrossEngines() {
  return (
    <section className="flex flex-col items-center px-6 pt-16 pb-10 md:px-12 md:pt-20 md:pb-10 border-b border-black/5">
      <h2 className="text-center text-sm font-medium tracking-tight text-zinc-800 md:text-base">
        Track and Optimize AI Visibility in All Answer Engines
      </h2>
      <div className="mt-8 flex w-full  flex-wrap items-center justify-center gap-x-10 gap-y-6 md:mt-10 md:gap-x-8">
        {engines.map((engine) => (
          <Image
            key={engine.name}
            src={engine.logo}
            alt={engine.name}
            width={engine.width}
            height={36}
            className="h-5 w-auto md:h-8"
          />
        ))}
      </div>
    </section>
  );
}
