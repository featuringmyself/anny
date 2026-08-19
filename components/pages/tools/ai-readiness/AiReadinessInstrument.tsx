import type { ReactNode } from "react";

import { AiReadinessGauge } from "@/components/pages/tools/ai-readiness/AiReadinessGauge";
import { AiReadinessLookupCapture } from "@/components/pages/tools/ai-readiness/AiReadinessLookupCapture";
import { bandForScore } from "@/components/pages/tools/ai-readiness/bands";
import {
  getAiReadiness,
  type ReadinessCategoryScore,
} from "@/lib/ai-readiness";

type AiReadinessInstrumentProps = {
  domain?: string;
};

export function AiReadinessInstrumentIdle() {
  return (
    <InstrumentShell>
      <GaugeBlock value={null} label="—" caption="Enter a domain to scan" />
      <CategoryBars categories={idleCategories()} />
      <InstrumentMeta domain="—" passed={null} />
    </InstrumentShell>
  );
}

export function AiReadinessInstrumentPending({ domain }: { domain: string }) {
  return (
    <InstrumentShell>
      <GaugeBlock
        value={null}
        pending
        label="—"
        caption="Reading the site…"
      />
      <CategoryBars categories={idleCategories()} pending />
      <InstrumentMeta domain={domain} passed={null} pending />
    </InstrumentShell>
  );
}

export async function AiReadinessInstrument({
  domain,
}: AiReadinessInstrumentProps) {
  if (!domain) {
    return <AiReadinessInstrumentIdle />;
  }

  const result = await getAiReadiness(domain);

  if ("error" in result) {
    return (
      <InstrumentShell>
        <AiReadinessLookupCapture
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
        <div className="flex flex-1 flex-col justify-center px-8 py-12">
          <p className="text-sm font-medium tracking-wide text-[#ff8b8b]">
            Couldn’t scan that domain
          </p>
          <p className="mt-3 max-w-sm text-2xl font-medium tracking-tight text-balance">
            {result.error}
          </p>
        </div>
        <InstrumentMeta domain={domain} passed={null} />
      </InstrumentShell>
    );
  }

  const band = bandForScore(result.score);

  return (
    <InstrumentShell>
      <AiReadinessLookupCapture
        domain={domain}
        success
        score={result.score}
        passed={result.passed}
        warned={result.warned}
        failed={result.failed}
        band={band.label}
      />
      <GaugeBlock
        value={result.score}
        label={String(result.score)}
        caption={band.label}
        hint={band.copy}
      />
      <CategoryBars categories={result.categories} />
      <InstrumentMeta
        domain={result.domain}
        passed={`${result.passed}/${result.checks.length}`}
      />
    </InstrumentShell>
  );
}

function idleCategories(): ReadinessCategoryScore[] {
  return [
    { id: "crawl", label: "Crawl access", score: 0, max: 24 },
    { id: "discovery", label: "Agent discovery", score: 0, max: 32 },
    { id: "schema", label: "Structured data", score: 0, max: 22 },
    { id: "semantics", label: "HTML semantics", score: 0, max: 22 },
  ];
}

function InstrumentShell({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="AI readiness readout"
      className="relative flex min-h-[32rem] flex-col overflow-hidden bg-zinc-950 text-white md:min-h-full"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(36,98,255,0.18),transparent_55%),radial-gradient(ellipse_at_20%_90%,rgba(157,255,212,0.08),transparent_45%)]"
      />
      <header className="relative flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
          On-site agent scan
        </p>
        <p className="text-xs font-medium tracking-wide text-[#9dffd4] uppercase">
          Free
        </p>
      </header>
      <div className="relative flex flex-1 flex-col">{children}</div>
    </aside>
  );
}

function GaugeBlock({
  value,
  label,
  caption,
  hint,
  pending = false,
}: {
  value: number | null;
  label: string;
  caption: string;
  hint?: string;
  pending?: boolean;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-6">
      <AiReadinessGauge value={value} label={label} pending={pending} />
      <p className="-mt-2 text-sm font-medium text-[#9dffd4]">{caption}</p>
      {hint ? (
        <p className="mx-auto mt-2 max-w-[18rem] text-center text-xs leading-relaxed text-zinc-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function CategoryBars({
  categories,
  pending = false,
}: {
  categories: ReadinessCategoryScore[];
  pending?: boolean;
}) {
  return (
    <ul className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10">
      {categories.map((category) => {
        const pct =
          category.max === 0
            ? 0
            : Math.round((category.score / category.max) * 100);
        return (
          <li
            key={category.id}
            className="bg-zinc-950 px-5 py-4 md:px-6"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
                {category.label}
              </p>
              <p
                className={`text-xs font-medium tabular-nums ${
                  pending ? "text-zinc-600" : "text-zinc-300"
                }`}
              >
                {pending ? "—" : `${category.score}/${category.max}`}
              </p>
            </div>
            <div className="mt-2 h-1 overflow-hidden bg-white/10">
              <div
                className="h-full bg-linear-to-r from-[#2462ff] to-[#9dffd4] transition-[width] duration-500"
                style={{ width: pending ? "18%" : `${pct}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

function InstrumentMeta({
  domain,
  passed,
  pending = false,
}: {
  domain: string;
  passed: string | null;
  pending?: boolean;
}) {
  return (
    <dl className="grid grid-cols-2 border-t border-white/10">
      <div className="border-r border-white/10 px-6 py-5 md:px-8">
        <dt className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
          Domain
        </dt>
        <dd
          className={`mt-1 truncate text-sm font-medium ${
            pending ? "text-zinc-500" : ""
          }`}
        >
          {domain}
        </dd>
      </div>
      <div className="px-6 py-5 md:px-8">
        <dt className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
          Checks passed
        </dt>
        <dd className="mt-1 text-sm font-medium tabular-nums">
          {passed == null ? (
            <span className="text-zinc-600">—</span>
          ) : (
            passed
          )}
        </dd>
      </div>
    </dl>
  );
}
