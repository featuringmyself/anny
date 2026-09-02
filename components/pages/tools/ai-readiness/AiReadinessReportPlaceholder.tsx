import Link from "next/link";

import ReportSectionHeader from "@/components/pages/audits/ReportSectionHeader";
import {
  readinessStatusClass,
  readinessStatusLabel,
} from "@/components/pages/audits/readiness-status";
import {
  aiReadinessAccentButtonClass,
  aiReadinessOutlineButtonClass,
} from "@/components/pages/tools/ai-readiness/button-classes";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  bandForScore,
  CATEGORY_META,
} from "@/components/pages/tools/ai-readiness/bands";
import {
  deriveAgentTeaser,
  deriveCategoryScores,
  deriveStats,
  executiveSummary,
} from "@/components/pages/tools/ai-readiness/placeholder-data";

type AiReadinessReportPlaceholderProps = {
  domain: string;
  score?: number;
  band?: string;
};

const INSIGHTS = [
  {
    title: "Crawl access is inconsistent across AI bots",
    body: "Some training and search crawlers may be blocked or redirected differently than others. A unified robots.txt policy reduces the chance models skip key pages.",
  },
  {
    title: "Brand identity signals are thin on the homepage",
    body: "Title, meta description, and structured data do not consistently tell models who owns the site. Stronger Organization markup helps attach a name to citations.",
  },
  {
    title: "Citation paths need clearer discovery signals",
    body: "Sitemap coverage and canonical tags affect whether models can find stable URLs to reference. Gaps here make mentions harder even when crawl access exists.",
  },
  {
    title: "Semantic HTML could better support agent parsing",
    body: "Heading hierarchy, landmarks, and labeled forms improve how automated agents interpret page structure — especially for product and contact flows.",
  },
] as const;

const QUICK_WINS = [
  {
    title: "Allow AI search bots in robots.txt",
    body: "Add explicit Allow rules for GPTBot, ClaudeBot, and PerplexityBot alongside your existing crawl policy.",
    impact: "High",
    effort: "Low",
  },
  {
    title: "Add Organization JSON-LD on the homepage",
    body: "Publish name, URL, and logo in structured data so models can attach the brand to page content.",
    impact: "High",
    effort: "Low",
  },
  {
    title: "Point robots.txt at sitemap.xml",
    body: "Expose a sitemap reference so crawlers can discover stable URLs beyond the homepage.",
    impact: "Medium",
    effort: "Low",
  },
] as const;

function formatDateLabel(date = new Date()) {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

export function AiReadinessReportPlaceholder({
  domain,
  score,
  band,
}: AiReadinessReportPlaceholderProps) {
  const displayScore = score ?? 50;
  const displayBand = band ?? bandForScore(displayScore).label;
  const company = domain.replace(/^www\./, "");
  const dateLabel = formatDateLabel();
  const stats = deriveStats(displayScore, domain);
  const categories = deriveCategoryScores(displayScore, domain);
  const agents = deriveAgentTeaser(domain);
  const summary = executiveSummary(company, displayScore, displayBand);

  return (
    <article>
      <header className="border-b bg-white">
        <div className="px-6 pt-10 md:px-10 md:pt-12">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
                Full report · AI readiness
              </p>
              <p className="mt-1 text-sm text-zinc-500">
                Prepared {dateLabel} · quick scan dossier
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 pb-10 md:flex-row md:items-end md:justify-between md:pb-12">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-medium tracking-tight text-balance md:text-4xl">
                {company}
              </h1>
              <p className="mt-2 text-base text-zinc-500 text-balance">
                On-site readiness for AI agents — schema, crawl access, automation,
                and HTML semantics.
              </p>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
                <div>
                  <dt className="text-xs text-zinc-400">Website</dt>
                  <dd className="mt-1 font-medium">{domain}</dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-400">Scan type</dt>
                  <dd className="mt-1 font-medium">Homepage + public files</dd>
                </div>
                <div>
                  <dt className="text-xs text-zinc-400">Snapshot</dt>
                  <dd className="mt-1 font-medium">{dateLabel}</dd>
                </div>
              </dl>
            </div>

            <aside
              aria-label="Readiness score"
              className="shrink-0 border border-zinc-300 bg-white px-6 py-5 md:min-w-[200px]"
            >
              <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
                Score
              </p>
              <p className="mt-1 text-4xl font-medium tracking-tight tabular-nums">
                {displayScore}
                <span className="text-xl text-zinc-400">/100</span>
              </p>
              <p className="mt-1 text-sm font-medium text-zinc-800">
                {displayBand}
              </p>
            </aside>
          </div>
        </div>
      </header>

      <section className="border-b bg-white" aria-label="Executive summary">
        <div className="grid grid-cols-2 border-t border-zinc-200 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`px-6 py-5 md:px-8 ${
                index % 2 === 0 ? "border-r border-zinc-200" : ""
              } ${index < 2 ? "border-b border-zinc-200 md:border-b-0" : ""} ${
                index < stats.length - 1 ? "md:border-r md:border-zinc-200" : ""
              }`}
            >
              <p className="text-base font-medium tracking-tight tabular-nums">
                {stat.value}
              </p>
              <p className="mt-1 text-xs text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-zinc-200 px-6 py-7 md:px-10">
          <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
            Executive summary
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600">
            {summary}
          </p>
        </div>
      </section>

      <div className="border-b bg-zinc-50">
        <div className="border-b border-zinc-200/80 px-6 py-5 md:px-12">
          <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
            Audit findings
          </p>
          <p className="mt-1 text-sm text-zinc-600 text-balance">
            On-site readiness detail for {company}
            {" · "}
            <span className="font-medium text-zinc-800">{domain}</span>. Scroll
            for insights, categories, agents, and quick wins.
          </p>
        </div>

        <section>
          <ReportSectionHeader
            index="01"
            label="Insights"
            title={`Where ${company} loses AI readability`}
          />
          <ol>
            {INSIGHTS.map((insight, index) => (
              <li
                key={insight.title}
                className="grid gap-3 border-b border-zinc-200 px-6 py-7 last:border-b-0 md:grid-cols-[3.5rem_1fr] md:gap-8 md:px-10 md:py-8"
              >
                <span className="font-mono text-xs font-medium text-zinc-400 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 max-w-3xl">
                  <h3 className="text-base font-medium tracking-tight text-balance">
                    {insight.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {insight.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="border-t border-zinc-200">
          <ReportSectionHeader
            index="02"
            label="Categories"
            title="Site signals, content, and structure"
          />
          <div>
            {categories.map((category) => (
              <article
                key={category.id}
                className="border-b border-zinc-200 px-6 py-7 last:border-b-0 md:px-10 md:py-8"
              >
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="text-base font-medium tracking-tight">
                    {category.title}
                  </h3>
                  <p
                    className={`text-[11px] font-medium tracking-wide uppercase ${readinessStatusClass(category.status)}`}
                  >
                    {readinessStatusLabel(category.status)}
                  </p>
                </div>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-600">
                  {category.body}
                </p>
                <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm">
                  <div>
                    <dt className="text-xs text-zinc-400">Score</dt>
                    <dd className="mt-0.5 font-medium tabular-nums">
                      {category.score}/{category.max}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-zinc-400">Signal group</dt>
                    <dd className="mt-0.5 font-medium">
                      {CATEGORY_META[category.id].label}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-zinc-200">
          <ReportSectionHeader
            index="03"
            label="Crawl & discovery"
            title={
              agents.llmsFound
                ? "Crawlers allowed; discovery incomplete"
                : "Crawlers allowed; capability files missing"
            }
            description={`Public robots.txt and site files for ${domain}. Major AI crawlers are evaluated alongside llms.txt and agent-skill discovery paths.`}
          />

          <dl className="grid grid-cols-2 border-b border-zinc-200 text-sm">
            <div className="border-r border-zinc-200 px-6 py-5 md:px-10">
              <dt className="text-xs text-zinc-400">AI agents in robots.txt</dt>
              <dd className="mt-1 font-medium">
                {agents.allowed}/{agents.total} allowed
                {agents.blocked > 0 ? ` · ${agents.blocked} blocked` : ""}
              </dd>
            </div>
            <div className="px-6 py-5 md:px-10">
              <dt className="text-xs text-zinc-400">llms.txt</dt>
              <dd className="mt-1 font-medium">
                {agents.llmsFound ? "Found" : "Not found"}
              </dd>
            </div>
          </dl>

          <div className="px-6 py-7 md:px-10 md:py-8">
            <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
              Agent discovery signals
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600">
              {agents.missingDiscovery === agents.totalDiscovery
                ? `MCP / agent-skill discovery files are missing — advanced agents have no advertised way to learn what ${company} can do.`
                : `${agents.missingDiscovery} of ${agents.totalDiscovery} MCP / agent-skill discovery signals are missing.`}
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-200">
          <ReportSectionHeader
            index="04"
            label="Recommended fixes"
            title="Highest-leverage changes from this audit"
            description="Prioritized by impact versus effort. These are findings from the scan — not a product pitch."
          />
          <ol>
            {QUICK_WINS.map((win, index) => (
              <li
                key={win.title}
                className="grid gap-4 border-b border-zinc-200 px-6 py-7 last:border-b-0 md:grid-cols-[3.5rem_1fr_auto] md:items-start md:gap-8 md:px-10 md:py-8"
              >
                <span className="font-mono text-xs font-medium text-zinc-400 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 max-w-2xl">
                  <h3 className="text-base font-medium tracking-tight text-balance">
                    {win.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {win.body}
                  </p>
                </div>
                <dl className="flex gap-6 text-sm md:flex-col md:gap-2 md:text-right">
                  <div>
                    <dt className="text-xs text-zinc-400">Impact</dt>
                    <dd className="mt-0.5 font-medium">{win.impact}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-zinc-400">Effort</dt>
                    <dd className="mt-0.5 font-medium">{win.effort}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <section className="border-b bg-white px-6 py-12 md:px-10 md:py-14">
        <p className="font-mono text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
          Next step
        </p>
        <h2 className="mt-2 max-w-xl text-2xl font-medium tracking-tight text-balance md:text-3xl">
          On-site is the floor. Mentions are the score.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
          Ship the fixes above, then use Anny to see whether ChatGPT, Gemini, and
          AI Mode actually mention {company}.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <TalkToSalesButton
            size="lg"
            className={cn("px-5", aiReadinessAccentButtonClass)}
            source="ai-readiness-full-report"
          />
          <Button
            size="lg"
            variant="outline"
            className={cn("px-5", aiReadinessOutlineButtonClass)}
            render={
              <Link
                href={`/tools/ai-readiness-checker?domain=${encodeURIComponent(domain)}`}
              />
            }
          >
            Re-run quick scan
          </Button>
        </div>
      </section>
    </article>
  );
}
