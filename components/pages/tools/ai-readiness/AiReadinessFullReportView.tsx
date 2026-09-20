"use client";

import { useState } from "react";

import ReportCta from "@/components/pages/audits/ReportCta";
import ReadinessAgents from "@/components/pages/audits/ReadinessAgents";
import ReadinessAutomation from "@/components/pages/audits/ReadinessAutomation";
import ReadinessCategories from "@/components/pages/audits/ReadinessCategories";
import {
  readinessStatusClass,
  readinessStatusLabel,
} from "@/components/pages/audits/readiness-status";
import { readinessCopy } from "@/components/pages/audits/readiness-copy";
import { ReadinessHeroBody } from "@/components/pages/audits/ReadinessHero";
import ReadinessInsights from "@/components/pages/audits/ReadinessInsights";
import { ReadinessModeBar } from "@/components/pages/audits/ReadinessModeToggle";
import ReadinessQuickWins from "@/components/pages/audits/ReadinessQuickWins";
import ReadinessSprint from "@/components/pages/audits/ReadinessSprint";
import ReportSectionHeader from "@/components/pages/audits/ReportSectionHeader";
import { reportScoreClass, rt } from "@/components/pages/audits/report-theme";
import type {
  ReadinessAudienceMode,
  ReadinessReport,
} from "@/components/pages/audits/types";
import { DownloadAiReadinessPdfButton } from "@/components/pages/tools/ai-readiness/DownloadAiReadinessPdfButton";
import { bandForScore } from "@/components/pages/tools/ai-readiness/bands";
import { CATEGORY_SECTIONS } from "@/lib/ai-readiness-report-types";
import type { ScanPhaseId } from "@/lib/ai-readiness-scan-phases";

type AiReadinessFullReportViewProps = {
  reportId: string;
  domain: string;
  quickScore?: number;
  quickBand?: string;
  partial: Partial<ReadinessReport>;
  complete: boolean;
  completedPhases: ScanPhaseId[];
};

function SectionSkeleton({
  title,
  lines = 3,
}: {
  title: string;
  lines?: number;
}) {
  return (
    <div
      className={`animate-pulse border-b ${rt.hairline} px-6 py-7 md:px-10 md:py-8`}
    >
      <p
        className={`font-mono text-[11px] tracking-wide uppercase ${rt.label}`}
      >
        {title}
      </p>
      <div className="mt-4 space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-3 rounded bg-[#225864]/10"
            style={{ width: `${88 - index * 12}%` }}
          />
        ))}
      </div>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <div
      className={`grid grid-cols-2 border-t ${rt.hairline} md:grid-cols-4`}
    >
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse border-b border-r ${rt.hairline} px-6 py-5 md:border-b-0 md:px-8`}
        >
          <div className="h-5 w-12 rounded bg-[#225864]/10" />
          <div className="mt-2 h-3 w-20 rounded bg-[#225864]/6" />
        </div>
      ))}
    </div>
  );
}

function buildViewReport(
  partial: Partial<ReadinessReport>,
  domain: string,
  reportId: string,
  quickScore?: number,
  quickBand?: string,
): ReadinessReport {
  const company = domain.replace(/^www\./, "");
  const score = partial.overallScore ?? quickScore ?? 50;
  const band = partial.scoreLabel ?? quickBand ?? bandForScore(score).label;

  return {
    kind: "readiness",
    slug: partial.slug ?? `ai-readiness-${reportId}`,
    company: partial.company ?? company,
    website: partial.website ?? domain,
    industry: partial.industry ?? "-",
    preparedFor: partial.preparedFor ?? "-",
    email: partial.email,
    dateLabel:
      partial.dateLabel ??
      new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
    overallScore: score,
    scoreLabel: band,
    summary: partial.summary ?? `${company} AI readiness scan in progress.`,
    summaryTechnical: partial.summaryTechnical,
    tagline: partial.tagline,
    stats: partial.stats ?? [],
    insights: partial.insights ?? [],
    quickWins: partial.quickWins ?? [],
    categories: partial.categories ?? [],
    automation: partial.automation ?? {
      status: "needs-improvement",
      body: "Scanning forms…",
      totalIssues: 0,
      p1Count: 0,
      p2Count: 0,
      groups: [],
    },
    agents: partial.agents ?? [],
    agentsIntro: partial.agentsIntro ?? `Scanning ${domain}.`,
    agentsIntroTechnical: partial.agentsIntroTechnical,
    llmsTxtFound: partial.llmsTxtFound ?? false,
    discoverySignals: partial.discoverySignals ?? [],
    sprint: partial.sprint ?? {
      name: "90-day AI Visibility Sprint",
      duration: "90 days",
      headline: `Improve ${company}'s AI visibility`,
      body: "On-site readiness and citation work in one engagement.",
      outcomes: ["Fix blockers from this audit", "Run citation tests weekly"],
    },
    ctaLabel: partial.ctaLabel,
    ctaEyebrow: partial.ctaEyebrow,
    ctaHeadline: partial.ctaHeadline,
    ctaBody: partial.ctaBody,
  };
}

function phaseDone(completedPhases: ScanPhaseId[], phase: ScanPhaseId) {
  return completedPhases.includes(phase);
}

function StreamingCategories({
  report,
  mode,
  completedPhases,
}: {
  report: ReadinessReport;
  mode: ReadinessAudienceMode;
  completedPhases: ScanPhaseId[];
}) {
  const categoriesById = new Map(report.categories.map((c) => [c.id, c]));
  const allReady = CATEGORY_SECTIONS.every(
    (section) =>
      categoriesById.has(section.id) || phaseDone(completedPhases, section.phase),
  );

  if (allReady && report.categories.length >= CATEGORY_SECTIONS.length) {
    return <ReadinessCategories report={report} mode={mode} />;
  }

  return (
    <section>
      <ReportSectionHeader
        index="02"
        label="Categories"
        title="Site signals, content, and structure"
      />
      <div>
        {CATEGORY_SECTIONS.map((section) => {
          const category = categoriesById.get(section.id);
          if (category) {
            return (
              <article
                key={section.id}
                className={`border-b ${rt.hairline} px-6 py-7 last:border-b-0 md:px-10 md:py-8`}
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3
                    className={`text-base font-medium tracking-tight ${rt.heading}`}
                  >
                    {category.title}
                  </h3>
                  <p
                    className={`text-[11px] font-medium tracking-wide uppercase ${readinessStatusClass(category.status)}`}
                  >
                    {readinessStatusLabel(category.status)}
                  </p>
                </div>
                <p className={`mt-2 max-w-3xl text-sm leading-relaxed ${rt.body}`}>
                  {readinessCopy(mode, category.body, category.bodyTechnical)}
                </p>
                {category.metrics?.length ? (
                  <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                    {category.metrics.map((metric) => (
                      <div key={metric.label}>
                        <dt className={`text-xs ${rt.label}`}>{metric.label}</dt>
                        <dd className={`mt-0.5 font-medium ${rt.bodyStrong}`}>
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </article>
            );
          }
          if (!phaseDone(completedPhases, section.phase)) {
            return (
              <SectionSkeleton key={section.id} title={section.title} />
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

export function AiReadinessFullReportView({
  reportId,
  domain,
  quickScore,
  quickBand,
  partial,
  complete,
  completedPhases,
}: AiReadinessFullReportViewProps) {
  const [mode, setMode] = useState<ReadinessAudienceMode>("non-technical");
  const report = buildViewReport(
    partial,
    domain,
    reportId,
    quickScore,
    quickBand,
  );

  const synthesisReady = complete || phaseDone(completedPhases, "synthesis");
  const automationReady = complete || phaseDone(completedPhases, "automation");
  const agentsReady = complete || phaseDone(completedPhases, "agents");
  const insightsReady = synthesisReady && report.insights.length > 0;
  const pagesScanned = partial.stats?.find(
    (s) => s.label === "Pages scanned",
  )?.value;

  return (
    <article className={rt.stack}>
      <header className={rt.panel}>
        <div className="px-6 pt-10 md:px-10 md:pt-12">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p
                className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
              >
                Full report · AI readiness
              </p>
              <p className={`mt-1 text-sm ${rt.body}`}>
                Prepared {report.dateLabel}
                {complete
                  ? " · deep scan complete"
                  : pagesScanned
                    ? ` · ${pagesScanned} pages scanned`
                    : " · scanning"}
              </p>
            </div>
            <DownloadAiReadinessPdfButton
              reportId={reportId}
              company={report.company}
              ready={complete}
            />
          </div>

          <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between md:pb-12">
            <div className="max-w-2xl">
              <h1
                className={`text-3xl font-medium tracking-tight text-balance md:text-4xl ${rt.heading}`}
              >
                {report.company}
              </h1>
              <p className={`mt-2 text-base text-balance ${rt.body}`}>
                On-site readiness for AI agents, schema, crawl access,
                automation, and HTML semantics.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-4">
                <div>
                  <dt className={`text-xs ${rt.label}`}>Prepared for</dt>
                  <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                    {report.preparedFor}
                    {report.email && report.preparedFor === "-" ? (
                      <span className={`block font-normal ${rt.body}`}>
                        {report.email}
                      </span>
                    ) : null}
                  </dd>
                </div>
                <div>
                  <dt className={`text-xs ${rt.label}`}>Website</dt>
                  <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                    {report.website}
                  </dd>
                </div>
                <div>
                  <dt className={`text-xs ${rt.label}`}>Scan depth</dt>
                  <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                    {complete || pagesScanned
                      ? `${pagesScanned ?? partial.stats?.[0]?.value ?? "Multi"}-page scan`
                      : "Deep scan running"}
                  </dd>
                </div>
                <div>
                  <dt className={`text-xs ${rt.label}`}>Snapshot</dt>
                  <dd className={`mt-1 font-medium ${rt.bodyStrong}`}>
                    {report.dateLabel}
                  </dd>
                </div>
              </dl>
            </div>

            {synthesisReady ? (
              <aside
                aria-label="Readiness score"
                className={`shrink-0 border ${rt.hairlineStrong} ${rt.surface} px-6 py-5 md:min-w-[200px]`}
              >
                <p
                  className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
                >
                  Score
                </p>
                <p
                  className={`mt-1 text-4xl font-medium tracking-tight tabular-nums ${reportScoreClass(report.overallScore)}`}
                >
                  {report.overallScore}
                  <span className={`text-xl ${rt.label}`}>/100</span>
                </p>
                <p
                  className={`mt-1 text-sm font-medium ${reportScoreClass(report.overallScore)}`}
                >
                  {report.scoreLabel}
                </p>
              </aside>
            ) : (
              <aside
                aria-label="Readiness score"
                className={`shrink-0 border ${rt.hairline} ${rt.surfaceMuted} px-6 py-5 md:min-w-[200px]`}
              >
                <p
                  className={`font-mono text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
                >
                  Score
                </p>
                <div className="mt-3 h-10 w-16 animate-pulse rounded bg-[#225864]/10" />
                {quickScore != null ? (
                  <p className={`mt-2 text-xs ${rt.body}`}>
                    Quick scan: {quickScore}/100
                  </p>
                ) : null}
              </aside>
            )}
          </div>
        </div>
      </header>

      <ReadinessModeBar
        company={report.company}
        mode={mode}
        onChange={setMode}
      />

      <section className={rt.panel} aria-label="Executive summary">
        {synthesisReady ? (
          <ReadinessHeroBody report={report} mode={mode} />
        ) : (
          <>
            <StatsSkeleton />
            <div className={`border-t ${rt.hairline} px-6 py-7 md:px-10`}>
              <SectionSkeleton title="Executive summary" lines={4} />
            </div>
          </>
        )}
      </section>

      <div className={`${rt.panel} px-6 py-5 md:px-12`}>
        <p
          className={`text-[11px] font-medium tracking-wide uppercase ${rt.label}`}
        >
          Audit findings
        </p>
        <p className={`mt-1 text-sm text-balance ${rt.body}`}>
          On-site readiness detail for {report.company}
          {" · "}
          <span className={`font-medium ${rt.bodyStrong}`}>
            {report.website}
          </span>
          {complete
            ? ". Scroll for insights, categories, agents, and quick wins."
            : "."}
        </p>
      </div>

      <div className={rt.panel}>
        {insightsReady ? (
          <ReadinessInsights report={report} mode={mode} />
        ) : (
          <SectionSkeleton title="Key insights" lines={5} />
        )}
      </div>

      <div className={rt.panel}>
        {complete ? (
          <ReadinessCategories report={report} mode={mode} />
        ) : (
          <StreamingCategories
            report={report}
            mode={mode}
            completedPhases={completedPhases}
          />
        )}
      </div>

      <div className={rt.panel}>
        {automationReady ? (
          <ReadinessAutomation report={report} mode={mode} />
        ) : (
          <SectionSkeleton title="Form automation" lines={4} />
        )}
      </div>

      <div className={rt.panel}>
        {agentsReady && report.agents.length > 0 ? (
          <ReadinessAgents report={report} mode={mode} />
        ) : (
          <SectionSkeleton title="AI agent access" lines={4} />
        )}
      </div>

      <div className={rt.panel}>
        {synthesisReady && report.quickWins.length > 0 ? (
          <ReadinessQuickWins report={report} mode={mode} />
        ) : (
          <SectionSkeleton title="Recommended fixes" lines={4} />
        )}
      </div>

      {complete ? (
        <>
          <div className={rt.panel}>
            <ReadinessSprint report={report} />
          </div>
          <div className={rt.panel}>
            <ReportCta report={report} />
          </div>
        </>
      ) : null}
    </article>
  );
}
