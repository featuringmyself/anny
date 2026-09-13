import type { CSSProperties } from "react";
import Link from "next/link";

import { CopySnippet } from "@/components/pages/tools/ai-readiness/CopySnippet";
import styles from "@/components/pages/tools/ai-crawlability/crawl.module.css";
import { AiCrawlabilityLookupCapture } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityLookupCapture";
import { bandForScore } from "@/components/pages/tools/ai-crawlability/bands";
import { AI_READINESS_PATH } from "@/components/pages/tools/ai-readiness/seo";
import { getAiCrawlability } from "@/lib/ai-crawlability";

export function AiCrawlabilityResultsPending({ domain }: { domain: string }) {
  return (
    <section className="border-b border-zinc-200 bg-white px-6 py-16 md:px-10">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm font-medium text-[#2462ff]">Analyzing {domain}</p>
        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-zinc-100">
          <div className="h-full w-2/5 rounded-full bg-[#2462ff] motion-safe:animate-pulse" />
        </div>
        <p className="mt-4 text-sm text-zinc-500">
          Checking robots.txt, crawler rules, sitemap, and llms.txt…
        </p>
      </div>
    </section>
  );
}

export async function AiCrawlabilityResults({ domain }: { domain: string }) {
  const result = await getAiCrawlability(domain);

  if ("error" in result) {
    return (
      <section className="border-b border-zinc-200 bg-white px-6 py-16 md:px-10">
        <AiCrawlabilityLookupCapture
          domain={domain}
          success={false}
          errorType={
            result.error === "Enter a domain." ||
            result.error === "Enter a valid domain." ||
            result.error === "Enter a public website."
              ? "invalid_domain"
              : "lookup_failed"
          }
        />
        <div className="mx-auto max-w-5xl">
          <p className="text-sm font-medium text-red-600">Couldn’t complete check</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight text-zinc-900">
            {result.error}
          </h2>
          <p className="mt-3 max-w-md text-zinc-500">
            Confirm the domain is public and try again in a moment.
          </p>
        </div>
      </section>
    );
  }

  const band = bandForScore(result.score);
  const open = result.bots.filter((b) => b.allowed);
  const blocked = result.bots.filter((b) => !b.allowed);

  return (
    <section className="border-b border-zinc-200 bg-white">
      <AiCrawlabilityLookupCapture
        domain={domain}
        success
        score={result.score}
        allowedCount={result.allowedCount}
        blockedCount={result.blockedCount}
        robotsPresent={result.robotsPresent}
        sitemapPresent={result.sitemapPresent}
        llmsPresent={result.llmsPresent}
        actionCount={result.actions.length}
        band={band.label}
      />

      <div className="mx-auto max-w-5xl px-6 py-14 md:px-10 md:py-16">
        <div className="flex flex-col gap-8 border-b border-zinc-200 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-[#2462ff]">
              Crawlability report · {result.domain}
            </p>
            <div className="mt-4 flex items-end gap-4">
              <p className="text-6xl font-medium tracking-tight tabular-nums text-zinc-900 md:text-7xl">
                {result.score}
              </p>
              <div className="mb-2">
                <p className="text-sm text-zinc-400">out of 100</p>
                <p className="text-lg font-medium text-zinc-900">{band.label}</p>
              </div>
            </div>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-zinc-500 md:text-right">
            {result.summary}
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {result.signals.map((signal, index) => (
            <div
              key={signal.id}
              className={`border border-zinc-200 bg-[#f6f7f4]/70 px-4 py-4 ${styles.fadeUp}`}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                  {signal.label}
                </p>
                <StatusDot status={signal.status} />
              </div>
              <p className="mt-2 text-sm font-medium text-zinc-900">
                {signal.status === "pass"
                  ? "Present"
                  : signal.status === "fail"
                    ? "Missing"
                    : "Needs attention"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {signal.detail}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <AccessColumn
            title="Allowed"
            count={open.length}
            empty="No major AI crawlers are currently allowed."
            tone="ok"
            bots={open.map((bot) => ({
              name: bot.agent,
              meta: `${bot.vendor} · ${bot.role}`,
            }))}
          />
          <AccessColumn
            title="Blocked"
            count={blocked.length}
            empty="No blockers found. AI crawlers can access the site root."
            tone="bad"
            bots={blocked.map((bot) => ({
              name: bot.agent,
              meta: `${bot.vendor} · ${bot.role}`,
            }))}
          />
        </div>

        {result.actions.length > 0 ? (
          <div className="mt-14 border-t border-zinc-200 pt-12">
            <p className="text-sm font-medium text-[#2462ff]">Recommended fixes</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-medium tracking-tight text-zinc-900 md:text-3xl">
              Changes that improve AI crawl access
            </h2>
            <ol className="mt-8 grid gap-6 lg:grid-cols-3">
              {result.actions.map((action, index) => (
                <li
                  key={action.id}
                  className="border border-zinc-200 bg-[#f6f7f4]/50 p-5"
                >
                  <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                    {action.impact} priority · Step {index + 1}
                  </p>
                  <h3 className="mt-2 text-base font-medium text-zinc-900">
                    {action.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                    {action.why}
                  </p>
                  {action.snippet ? (
                    <CopySnippet
                      filename={action.snippet.filename}
                      code={action.snippet.code}
                    />
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        ) : null}

        <div className="mt-14 flex flex-col gap-4 border border-zinc-200 bg-[#f6f7f4] px-6 py-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-zinc-900">
              Next: brand identity and citation readiness
            </p>
            <p className="mt-1 text-sm text-zinc-500">
              Crawl access is step one. Check whether models can also name and
              cite your brand.
            </p>
          </div>
          <Link
            href={`${AI_READINESS_PATH}?domain=${encodeURIComponent(result.domain)}`}
            className="inline-flex h-11 shrink-0 items-center justify-center bg-[#2462ff] px-5 text-sm font-medium text-white transition-colors hover:bg-[#2462ff]/90"
          >
            Run AI readiness check
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatusDot({ status }: { status: "pass" | "warn" | "fail" }) {
  return (
    <span
      className={`size-2 rounded-full ${
        status === "pass"
          ? "bg-emerald-500"
          : status === "fail"
            ? "bg-red-500"
            : "bg-amber-400"
      }`}
      aria-hidden
    />
  );
}

function AccessColumn({
  title,
  count,
  empty,
  tone,
  bots,
}: {
  title: string;
  count: number;
  empty: string;
  tone: "ok" | "bad";
  bots: { name: string; meta: string }[];
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-xl font-medium tracking-tight text-zinc-900">
          {title}
        </h2>
        <p
          className={`text-sm font-medium tabular-nums ${
            tone === "ok" ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {count}
        </p>
      </div>
      <ul className="mt-4 divide-y divide-zinc-100 border border-zinc-200">
        {bots.length === 0 ? (
          <li className="px-4 py-5 text-sm text-zinc-500">{empty}</li>
        ) : (
          bots.map((bot, index) => (
            <li
              key={bot.name}
              className={`flex items-center justify-between gap-3 px-4 py-3.5 ${styles.fadeUp}`}
              style={{ "--i": index } as CSSProperties}
            >
              <div className="min-w-0">
                <p className="truncate font-mono text-sm text-zinc-900">
                  {bot.name}
                </p>
                <p className="truncate text-xs text-zinc-500">{bot.meta}</p>
              </div>
              <span
                className={`shrink-0 text-xs font-medium ${
                  tone === "ok" ? "text-emerald-700" : "text-red-600"
                }`}
              >
                {tone === "ok" ? "Allowed" : "Blocked"}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
