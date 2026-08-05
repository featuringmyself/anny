import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import type { VisibilityReport } from "./types";

type ReportCtaProps = {
  report: VisibilityReport;
};

export default function ReportCta({ report }: ReportCtaProps) {
  const eyebrow = report.ctaEyebrow ?? "Next step";
  const headline =
    report.ctaHeadline ?? `Get ${report.company} cited in 90 days`;
  const body =
    report.ctaBody ??
    `Book a call to start the AI Visibility Sprint: citation work across ChatGPT, Perplexity, and Google AI Overview, plus a dashboard to track gaps, competitors, and the next actions each week.`;
  const label = report.ctaLabel ?? "Book a call";

  return (
    <section className="border-b bg-zinc-950 px-6 py-14 text-white md:px-12 md:py-20">
      <p className="mb-3 text-sm font-medium text-[#7a9fff]">{eyebrow}</p>
      <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        {headline}
      </h2>
      <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400 text-balance">
        {body}
      </p>
      <div className="mt-8">
        {report.ctaUrl ? (
          <Button
            size="lg"
            className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            render={
              <Link
                href={report.ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            {label}
          </Button>
        ) : (
          <TalkToSalesButton
            size="lg"
            className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            source={`audit-report-${report.slug}`}
          >
            {label}
          </TalkToSalesButton>
        )}
      </div>
    </section>
  );
}
