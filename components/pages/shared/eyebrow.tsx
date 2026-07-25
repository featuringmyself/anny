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
    <p className={cn("text-[#2462ff]", className)}>
      {icon ? (
        <span
          className="mr-2 inline-grid size-5 place-items-center align-middle [&_svg]:size-full"
          aria-hidden
        >
          {icon}
        </span>
      ) : null}
      {children}
    </p>
  );
}
