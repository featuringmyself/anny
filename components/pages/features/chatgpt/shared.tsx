import { cn } from "@/lib/utils";

export function SectionBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-2.5 py-1 text-xs font-medium text-zinc-600",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionIntro({
  badge,
  title,
  titleId,
  description,
}: {
  badge: React.ReactNode;
  title: string;
  titleId: string;
  description: string;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-10">
      <div>
        {badge}
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

export function FeatureCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm md:p-7",
        className,
      )}
    >
      {children}
    </article>
  );
}
