import { cn } from "@/lib/utils";

// Diagonal hairline band used to separate full-bleed sections.
// Hidden below md, where sections already read as separate blocks.
export function PatternStrip({
  className,
  bordered = true,
  ...props
}: React.ComponentProps<"div"> & { bordered?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "hidden h-20 w-full border-x-(--pattern-fg) bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed [--pattern-fg:var(--color-black)]/5 md:block",
        bordered && "border-y",
        className
      )}
      {...props}
    />
  );
}

export default PatternStrip;
