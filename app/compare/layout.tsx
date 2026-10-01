import type { ReactNode } from "react";

export default function CompareLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className="flex flex-col gap-3 px-3 pb-3 sm:gap-4 sm:px-4 sm:pb-4">
      {children}
    </main>
  );
}
