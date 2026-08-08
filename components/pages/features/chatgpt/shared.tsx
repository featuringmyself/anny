import { cn } from "@/lib/utils";

const ACCENT = "#10A37F";

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 flex items-center gap-2 text-sm font-medium",
        className,
      )}
      style={{ color: ACCENT }}
    >
      {children}
    </p>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  titleId,
  description,
}: {
  eyebrow: React.ReactNode;
  title: string;
  titleId: string;
  description: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-10">
      <div>
        {eyebrow}
        <h2
          id={titleId}
          className="max-w-lg text-3xl font-medium tracking-tight text-balance md:text-4xl"
        >
          {title}
        </h2>
      </div>
      <p className="max-w-md border-l border-border pl-6 text-[15px] leading-relaxed text-pretty text-zinc-500 md:justify-self-end">
        {description}
      </p>
    </div>
  );
}

/** Border-grid cell for non-interactive feature/stat blocks. */
export function FeatureCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("border border-border bg-white p-6 md:p-7", className)}>
      {children}
    </article>
  );
}
