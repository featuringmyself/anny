import Link from "next/link";

import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  name: string;
  /** Omit href on the current page crumb. */
  href?: string;
};

export function PageBreadcrumbs({
  items,
  className,
}: {
  items: readonly BreadcrumbItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn(className)}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-zinc-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`} className="flex items-center gap-2">
              {index > 0 ? (
                <span aria-hidden className="text-zinc-300">
                  /
                </span>
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-zinc-900"
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-zinc-700" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
