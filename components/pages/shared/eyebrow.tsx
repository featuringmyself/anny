import { cn } from "@/lib/utils";

// Accent topic line that sits above a page or section heading.
export function Eyebrow({
  icon,
  className,
  children,
}: {
  icon?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={cn(
        "flex flex-wrap items-center gap-2 text-[#2462ff]",
        className
      )}
    >
      {icon ? (
        <span
          className="grid size-5 shrink-0 place-items-center [&_svg]:size-full"
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      {children}
    </p>
  );
}
