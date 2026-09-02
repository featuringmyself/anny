import { cn } from "@/lib/utils";

export function BrowserFrame({
  children,
  className,
  title = "anny.dodoxhq.com",
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  size?: "default" | "large";
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-zinc-200/80 bg-white",
        size === "large"
          ? "shadow-2xl shadow-zinc-900/12 ring-1 ring-zinc-900/5"
          : "shadow-lg shadow-zinc-900/8",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-2 border-b border-border bg-zinc-50/90",
          size === "large" ? "px-4 py-2.5" : "px-3 py-2",
        )}
      >
        <span className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span
          className={cn(
            "mx-auto truncate text-zinc-500 tabular-nums",
            size === "large" ? "text-xs" : "text-[10px]",
          )}
        >
          {title}
        </span>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}
