import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

type BeforeAfterCardProps = {
  before: string;
  after: string;
  className?: string;
};

export function BeforeAfterCard({
  before,
  after,
  className,
}: BeforeAfterCardProps) {
  return (
    <div
      className={cn("grid gap-3 sm:grid-cols-[1fr_auto_1fr]", className)}
      aria-label="Before and after program comparison"
    >
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
        <div className="flex items-center gap-2">
          <XCircle
            className="size-4 shrink-0 text-zinc-400"
            strokeWidth={2}
            aria-hidden
          />
          <p className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Before
          </p>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 text-pretty">
          {before}
        </p>
      </div>

      <div className="hidden items-center justify-center sm:flex" aria-hidden>
        <ArrowRight className="size-4 text-zinc-300" strokeWidth={2} />
      </div>

      <div className="rounded-xl border border-[#2462ff]/25 bg-[#2462ff]/[0.06] p-4 shadow-sm shadow-[#2462ff]/5">
        <div className="flex items-center gap-2">
          <CheckCircle2
            className="size-4 shrink-0 text-[#2462ff]"
            strokeWidth={2}
            aria-hidden
          />
          <p className="text-xs font-semibold tracking-wide text-[#2462ff] uppercase">
            After
          </p>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed font-medium text-zinc-800 text-pretty">
          {after}
        </p>
      </div>
    </div>
  );
}
