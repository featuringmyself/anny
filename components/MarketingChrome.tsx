"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Hides public marketing chrome on private audit report routes. */
export function MarketingChrome({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  if (pathname.startsWith("/audits/")) {
    return null;
  }
  return children;
}
