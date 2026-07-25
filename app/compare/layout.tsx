import type { ReactNode } from "react";

export default function CompareLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div>{children}</div>;
}
