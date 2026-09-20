import type { ReactNode } from "react";

import { rt } from "./report-theme";

type ReportSectionHeaderProps = {
  /** Dossier index, e.g. "01". */
  index: string;
  /** Short section id, e.g. "Insights". */
  label: string;
  title: string;
  description?: ReactNode;
  /** Optional status chip beside the label. */
  status?: ReactNode;
};

/** Document-style section header, not marketing eyebrows / hero H2s. */
export default function ReportSectionHeader({
  index,
  label,
  title,
  description,
  status,
}: ReportSectionHeaderProps) {
  return (
    <header className={`border-b ${rt.hairline} px-6 py-6 md:px-10 md:py-7`}>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p
          className={`font-mono text-[11px] font-medium tracking-wide uppercase tabular-nums ${rt.label}`}
        >
          {index} · {label}
        </p>
        {status}
      </div>
      <h2
        className={`mt-2 max-w-2xl text-xl font-medium tracking-tight text-balance md:text-2xl ${rt.heading}`}
      >
        {title}
      </h2>
      {description ? (
        <div className={`mt-2 max-w-2xl text-sm leading-relaxed ${rt.body}`}>
          {description}
        </div>
      ) : null}
    </header>
  );
}
