import { Earth } from "lucide-react";

import AiFlip from "@/components/Home/ai-flip";
import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { TalkToSalesButton } from "@/components/talk-to-sales";

export default function Hero() {
  return (
    <header className="mx-auto mt-14 max-w-3xl px-6 md:mt-20">
      <Eyebrow
        icon={<Earth className="size-5" aria-hidden />}
        className="mb-4 text-center text-sm text-balance sm:text-base"
      >
        Your customers are asking AI instead of Google
      </Eyebrow>
      <h1 className="text-center text-4xl font-medium tracking-tight text-balance sm:text-5xl md:text-6xl">
        AI search analytics{" "}
        <span className="text-zinc-500">for marketing teams</span>
      </h1>
      <p className="mt-4 text-center text-base text-balance text-zinc-500 sm:text-lg">
        Anny monitors how often <AiFlip /> mentions your brand, which sources it
        cites, and what to change so you get recommended more often.
      </p>
      <div className="mt-6 flex justify-center">
        <TalkToSalesButton className="p-4" size="lg" source="home-hero" />
      </div>
    </header>
  );
}
