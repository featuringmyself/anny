import {
  AiReadinessInstrumentIdle,
} from "@/components/pages/tools/ai-readiness/AiReadinessInstrument";

export default function Loading() {
  return (
    <main className="bg-[#f6f7f4]">
      <section className="relative isolate overflow-hidden border-b border-zinc-200/80">
        <div className="relative grid md:grid-cols-2">
          <div className="flex flex-col justify-center px-6 py-14 md:border-r md:border-zinc-200/80 md:px-12 md:py-20 lg:px-16">
            <div className="h-4 w-48 animate-pulse rounded bg-zinc-200/80" />
            <div className="mt-4 h-12 w-full max-w-md animate-pulse rounded bg-zinc-200/80" />
            <div className="mt-3 h-16 w-full max-w-sm animate-pulse rounded bg-zinc-200/70" />
            <div className="mt-8 h-12 w-full max-w-xl animate-pulse rounded bg-zinc-200/80" />
            <div className="mt-3 h-4 w-56 animate-pulse rounded bg-zinc-200/60" />
          </div>
          <AiReadinessInstrumentIdle />
        </div>
      </section>
    </main>
  );
}
