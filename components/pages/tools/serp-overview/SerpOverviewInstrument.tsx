import type { ReactNode } from "react";

import {
  countryLabel,
  getSerpOverview,
  type SerpCountryCode,
  type SerpPosition,
} from "@/lib/serp-overview";

type SerpOverviewInstrumentProps = {
  keyword?: string;
  country?: SerpCountryCode;
};

export function SerpOverviewInstrumentIdle() {
  return (
    <InstrumentShell>
      <ResultList positions={[]} pending={false} emptyHint="Enter a keyword to begin" />
      <InstrumentMeta keyword="—" country={null} checkedAt={null} />
    </InstrumentShell>
  );
}

export function SerpOverviewInstrumentPending({
  keyword,
  country,
}: {
  keyword: string;
  country: SerpCountryCode;
}) {
  return (
    <InstrumentShell>
      <ResultList positions={[]} pending emptyHint="Checking the SERP…" />
      <InstrumentMeta keyword={keyword} country={country} checkedAt={null} pending />
    </InstrumentShell>
  );
}

export async function SerpOverviewInstrument({
  keyword,
  country,
}: SerpOverviewInstrumentProps) {
  if (!keyword || !country) {
    return <SerpOverviewInstrumentIdle />;
  }

  const result = await getSerpOverview(keyword, country);

  if ("error" in result) {
    return (
      <InstrumentShell>
        <div className="flex flex-1 flex-col justify-center px-8 py-12">
          <p className="text-sm font-medium tracking-wide text-[#ff8b8b]">
            Couldn’t load that SERP
          </p>
          <p className="mt-3 max-w-sm text-2xl font-medium tracking-tight text-balance">
            {result.error}
          </p>
        </div>
        <InstrumentMeta keyword={keyword} country={country} checkedAt={null} />
      </InstrumentShell>
    );
  }

  return (
    <InstrumentShell>
      <ResultList
        positions={result.positions}
        pending={false}
        emptyHint="No organic results for this keyword"
      />
      <InstrumentMeta
        keyword={result.keyword}
        country={result.country}
        checkedAt={result.updateDate}
      />
    </InstrumentShell>
  );
}

function InstrumentShell({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="SERP overview readout"
      className="flex min-h-[28rem] flex-col bg-zinc-950 text-white md:min-h-full"
    >
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
          Ahrefs SERP Overview
        </p>
        <p className="text-xs font-medium tracking-wide text-[#7ea1ff] uppercase">
          Free
        </p>
      </header>
      {children}
    </aside>
  );
}

function ResultList({
  positions,
  pending,
  emptyHint,
}: {
  positions: SerpPosition[];
  pending: boolean;
  emptyHint: string;
}) {
  if (pending) {
    return (
      <ol className="flex-1 divide-y divide-white/10 overflow-y-auto">
        {Array.from({ length: 10 }, (_, index) => (
          <li key={index} className="flex gap-4 px-6 py-3.5 md:px-8">
            <span className="w-6 shrink-0 text-xs font-medium text-zinc-600 tabular-nums">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1 space-y-2">
              <div className="h-3.5 w-3/4 animate-pulse bg-white/10" />
              <div className="h-3 w-1/2 animate-pulse bg-white/5" />
            </div>
          </li>
        ))}
      </ol>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-8 py-12 text-center">
        <p className="text-sm text-zinc-500">{emptyHint}</p>
      </div>
    );
  }

  return (
    <ol className="flex-1 divide-y divide-white/10 overflow-y-auto">
      {positions.map((row) => (
        <li key={`${row.position}-${row.url ?? row.title ?? ""}`} className="flex gap-4 px-6 py-3.5 md:px-8">
          <span className="w-6 shrink-0 pt-0.5 text-xs font-medium text-[#7ea1ff] tabular-nums">
            {String(row.position).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">
              {row.title || hostnameFromUrl(row.url)}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-zinc-500">
              <span className="max-w-[14rem] truncate">{hostnameFromUrl(row.url)}</span>
              <span className="tabular-nums">
                DR {formatScore(row.domain_rating)}
              </span>
              <span className="tabular-nums">
                UR {formatScore(row.url_rating)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

function InstrumentMeta({
  keyword,
  country,
  checkedAt,
  pending = false,
}: {
  keyword: string;
  country: SerpCountryCode | null;
  checkedAt: string | null;
  pending?: boolean;
}) {
  return (
    <dl className="grid grid-cols-3 border-t border-white/10">
      <div className="border-r border-white/10 px-4 py-4 md:px-6">
        <dt className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
          Keyword
        </dt>
        <dd
          className={`mt-1 truncate text-sm font-medium ${
            pending ? "text-zinc-500" : ""
          }`}
        >
          {keyword}
        </dd>
      </div>
      <div className="border-r border-white/10 px-4 py-4 md:px-6">
        <dt className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
          Country
        </dt>
        <dd className="mt-1 truncate text-sm font-medium">
          {country ? countryLabel(country) : "—"}
        </dd>
      </div>
      <div className="px-4 py-4 md:px-6">
        <dt className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">
          Checked
        </dt>
        <dd className="mt-1 text-sm font-medium tabular-nums">
          {formatCheckedAt(checkedAt)}
        </dd>
      </div>
    </dl>
  );
}

function hostnameFromUrl(url: string | null): string {
  if (!url) return "—";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function formatScore(score: number | null): string {
  if (score == null) return "—";
  return Number.isInteger(score) ? String(score) : score.toFixed(1);
}

function formatCheckedAt(iso: string | null): string {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
