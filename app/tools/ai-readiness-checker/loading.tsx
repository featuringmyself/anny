import PatternStrip from "@/components/PatternStrip";
import { AiReadinessChecks } from "@/components/pages/tools/ai-readiness/AiReadinessChecks";
import { AiReadinessCta } from "@/components/pages/tools/ai-readiness/AiReadinessCta";
import { AiReadinessExplain } from "@/components/pages/tools/ai-readiness/AiReadinessExplain";
import { AiReadinessFaq } from "@/components/pages/tools/ai-readiness/AiReadinessFaq";
import { AiReadinessHowTo } from "@/components/pages/tools/ai-readiness/AiReadinessHowTo";
import { AiReadinessInstrumentPending } from "@/components/pages/tools/ai-readiness/AiReadinessInstrument";
import { AiReadinessScale } from "@/components/pages/tools/ai-readiness/AiReadinessScale";

export default function Loading() {
  return (
    <main>
      <section className="border-b">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center border-b px-6 py-14 md:border-r md:border-b-0 md:px-12 md:py-20">
            <div className="h-4 w-20 animate-pulse bg-zinc-200" />
            <div className="mt-4 h-12 w-full max-w-md animate-pulse bg-zinc-200" />
            <div className="mt-3 h-16 w-full max-w-sm animate-pulse bg-zinc-200" />
            <div className="mt-10 h-11 w-full max-w-md animate-pulse bg-zinc-200" />
            <div className="mt-5 h-10 w-40 animate-pulse bg-zinc-200" />
          </div>
          <AiReadinessInstrumentPending domain="—" />
        </div>
      </section>
      <PatternStrip />
      <AiReadinessHowTo />
      <PatternStrip />
      <AiReadinessChecks />
      <PatternStrip />
      <AiReadinessScale />
      <PatternStrip />
      <AiReadinessExplain />
      <PatternStrip />
      <AiReadinessFaq />
      <PatternStrip />
      <AiReadinessCta />
    </main>
  );
}
