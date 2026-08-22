"use client";

import { useState } from "react";

import ReportCta from "./ReportCta";
import ReportPrivateBanner from "./ReportPrivateBanner";
import ReadinessAgents from "./ReadinessAgents";
import ReadinessAutomation from "./ReadinessAutomation";
import ReadinessCategories from "./ReadinessCategories";
import {
  ReadinessHeroBody,
  ReadinessHeroLead,
} from "./ReadinessHero";
import ReadinessInsights from "./ReadinessInsights";
import { ReadinessModeBar } from "./ReadinessModeToggle";
import ReadinessQuickWins from "./ReadinessQuickWins";
import ReadinessSprint from "./ReadinessSprint";
import type { ReadinessAudienceMode, ReadinessReport } from "./types";

type ReadinessReportViewProps = {
  report: ReadinessReport;
};

export default function ReadinessReportView({
  report,
}: ReadinessReportViewProps) {
  const [mode, setMode] = useState<ReadinessAudienceMode>("non-technical");

  return (
    <main className="overflow-anchor-none pb-16 md:pb-24">
      {report.private ? <ReportPrivateBanner /> : null}

      {/* Cover — company, score, snapshot. Not marketing landing. */}
      <header className="border-b bg-white">
        <ReadinessHeroLead report={report} />
      </header>

      <ReadinessModeBar
        company={report.company}
        mode={mode}
        onChange={setMode}
      />

      <section className="border-b bg-white" aria-label="Executive summary">
        <ReadinessHeroBody report={report} mode={mode} />
      </section>

      {/* Findings body — visually distinct from the cover so scroll reads as dossier, not landing. */}
      <div className="border-b bg-zinc-50">
        <div className="border-b border-zinc-200/80 px-6 py-5 md:px-12">
          <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
            Audit findings
          </p>
          <p className="mt-1 text-sm text-zinc-600 text-balance">
            On-site readiness detail for {report.company}
            {report.website ? (
              <>
                {" "}
                · <span className="font-medium text-zinc-800">{report.website}</span>
              </>
            ) : null}
            . Scroll for insights, categories, agents, and quick wins.
          </p>
        </div>

        <ReadinessInsights report={report} mode={mode} />
        <ReadinessCategories report={report} mode={mode} />
        <ReadinessAutomation report={report} mode={mode} />
        <ReadinessAgents report={report} mode={mode} />
        <ReadinessQuickWins report={report} mode={mode} />
      </div>

      <div className="border-b bg-white">
        <ReadinessSprint report={report} />
      </div>

      <ReportCta report={report} />
    </main>
  );
}
