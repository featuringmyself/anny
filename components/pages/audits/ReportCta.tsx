import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import type { VisibilityReport } from "./types";

type ReportCtaProps = {
  report: VisibilityReport;
};

export default function ReportCta({ report }: ReportCtaProps) {
  const label = report.ctaLabel ?? "Start the AI visibility sprint";

  return (
    <section className="border-b bg-zinc-950 px-6 py-14 text-white md:px-12 md:py-20">
      <p className="mb-3 text-sm font-medium text-[#7a9fff]">Next step</p>
      <h2 className="max-w-2xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        Book the 90-day sprint for {report.company}
      </h2>
      <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400 text-balance">
        {report.brandCrisis?.length
          ? `We'll walk this audit with you, starting with brand collision and domain trust, then lock the prompt set that drives demos, and ship citation work across ChatGPT, Perplexity, and Google AI Overview.`
          : `We'll walk this audit with your team, lock the prompt set that matters for pipeline, and start the citation work that moves ChatGPT, Perplexity, and Google AI Overview.`}
      </p>
      <div className="mt-8">
        {report.ctaUrl ? (
          <Button
            size="lg"
            className="bg-[#2462ff] px-5 text-white hover:bg-[#2462ff]/90"
            render={
              <Link href={report.ctaUrl} target="_blank" rel="noopener noreferrer" />
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
