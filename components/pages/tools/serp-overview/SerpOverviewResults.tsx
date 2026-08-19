import type { ReactNode } from "react";
import Link from "next/link";

import {
  displayUrl,
  formatCheckedAt,
  formatScore,
  hostnameFromUrl,
  medianScore,
  strongestHost,
} from "@/components/pages/tools/serp-overview/format";
import {
  countryLabel,
  getSerpOverview,
  type SerpCountryCode,
  type SerpPosition,
} from "@/lib/serp-overview";

const EXAMPLES = [
  { keyword: "best crm", country: "us" as const },
  { keyword: "project management software", country: "gb" as const },
  { keyword: "ai search analytics", country: "us" as const },
] as const;

type SerpOverviewResultsProps = {
  keyword?: string;
  country?: SerpCountryCode;
};

export function SerpOverviewResultsIdle() {
  return (
    <ResultsFrame>
      <IdleHeader />
      <DrProfile positions={[]} />
      <GhostList />
    </ResultsFrame>
  );
}

export function SerpOverviewResultsPending({
  keyword,
  country,
}: {
  keyword: string;
  country: SerpCountryCode;
}) {
  return (
    <ResultsFrame>
      <QueryHeader
        keyword={keyword}
        country={country}
        checkedAt={null}
        pending
      />
      <DrProfile positions={[]} pending />
      <PendingList />
    </ResultsFrame>
  );
}

export async function SerpOverviewResults({
  keyword,
  country,
}: SerpOverviewResultsProps) {
  if (!keyword || !country) {
    return <SerpOverviewResultsIdle />;
  }

  const result = await getSerpOverview(keyword, country);

  if ("error" in result) {
    return (
      <ResultsFrame>
        <QueryHeader
          keyword={keyword}
          country={country}
          checkedAt={null}
        />
        <div className="border-b px-0 py-12 md:py-16">
          <p className="text-sm font-medium tracking-wide text-red-500">
            Couldn’t load that SERP
          </p>
          <p className="mt-3 max-w-lg text-2xl font-medium tracking-tight text-balance">
            {result.error}
          </p>
        </div>
      </ResultsFrame>
    );
  }

  return (
    <ResultsFrame>
      <QueryHeader
        keyword={result.keyword}
        country={result.country}
        checkedAt={result.updateDate}
        positionCount={result.positions.length}
        medianDr={medianScore(result.positions.map((row) => row.domain_rating))}
        strongest={strongestHost(result.positions)}
      />
      <DrProfile positions={result.positions} />
      {result.positions.length === 0 ? (
        <p className="py-16 text-sm text-zinc-500">
          No organic results for this keyword in this country.
        </p>
      ) : (
        <ol>
          {result.positions.map((row, index) => (
            <ResultRow key={`${row.position}-${row.url ?? index}`} row={row} />
          ))}
        </ol>
      )}
    </ResultsFrame>
  );
}

function ResultsFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl" aria-label="Organic SERP">
      {children}
    </div>
  );
}

function IdleHeader() {
  return (
    <div className="border-b pb-8">
      <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
        Organic · top 10
      </p>
      <h2 className="mt-2 max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        Page one is empty until you search
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
        Rank, title, URL, Domain Rating, and URL Rating — the competitive
        picture for one keyword in one country.
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {EXAMPLES.map((example) => (
          <li key={example.keyword}>
            <Link
              href={`?keyword=${encodeURIComponent(example.keyword)}&country=${example.country}`}
              className="inline-flex h-8 items-center rounded-full border bg-white px-3 text-sm text-zinc-600 transition-colors hover:border-zinc-300 hover:text-zinc-900"
            >
              {example.keyword}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function QueryHeader({
  keyword,
  country,
  checkedAt,
  pending = false,
  positionCount,
  medianDr,
  strongest,
}: {
  keyword: string;
  country: SerpCountryCode;
  checkedAt: string | null;
  pending?: boolean;
  positionCount?: number;
  medianDr?: number | null;
  strongest?: string | null;
}) {
  return (
    <div className="flex flex-col gap-6 border-b pb-8 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
          Organic · top 10
        </p>
        <h2
          className={`mt-2 text-3xl font-medium tracking-tight text-balance md:text-4xl ${
            pending ? "text-zinc-400" : ""
          }`}
        >
          “{keyword}”
        </h2>
        {strongest ? (
          <p className="mt-3 text-sm text-zinc-500">
            Strongest domain{" "}
            <span className="font-medium text-zinc-800">{strongest}</span>
          </p>
        ) : null}
      </div>
      <dl className="grid grid-cols-3 gap-x-8 text-sm">
        <MetaItem label="Country" value={countryLabel(country)} />
        <MetaItem
          label="Checked"
          value={pending ? "…" : formatCheckedAt(checkedAt)}
        />
        <MetaItem
          label="Median DR"
          value={
            pending
              ? "…"
              : positionCount
                ? formatScore(medianDr ?? null)
                : "—"
          }
        />
      </dl>
    </div>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <dt className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
        {label}
      </dt>
      <dd className="mt-0.5 truncate font-medium">{value}</dd>
    </div>
  );
}

function DrProfile({
  positions,
  pending = false,
}: {
  positions: SerpPosition[];
  pending?: boolean;
}) {
  const byRank = Array.from({ length: 10 }, (_, index) => {
    const rank = index + 1;
    return positions.find((row) => row.position === rank) ?? null;
  });

  return (
    <div className="border-b py-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
          Domain Rating on page one
        </p>
        <p className="text-[11px] text-zinc-400">Taller bar = stronger site</p>
      </div>
      <div className="mt-5 grid h-28 grid-cols-10 items-end gap-1.5 sm:gap-2">
        {byRank.map((row, index) => {
          const dr = row?.domain_rating;
          const height = pending ? 28 : dr == null ? 8 : Math.max(8, dr);
          return (
            <div key={index} className="flex h-full flex-col justify-end">
              <div
                className={`w-full rounded-sm ${
                  pending
                    ? "animate-pulse bg-zinc-200"
                    : dr == null
                      ? "bg-zinc-200"
                      : "bg-[#2462ff]"
                }`}
                style={{ height: `${height}%` }}
                title={
                  dr == null ? `Position ${index + 1}` : `#${index + 1} · DR ${formatScore(dr)}`
                }
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1.5 text-center text-[10px] tabular-nums text-zinc-400 sm:gap-2">
        {byRank.map((_, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
    </div>
  );
}

function ResultRow({ row }: { row: SerpPosition }) {
  const featured = row.position === 1;
  const host = hostnameFromUrl(row.url);
  const title = row.title || host;
  const href = row.url;

  const inner = (
    <>
      <span
        className={`w-10 shrink-0 pt-0.5 text-2xl font-medium tabular-nums tracking-tight md:w-14 md:text-3xl ${
          featured ? "text-[#2462ff]" : "text-zinc-300"
        }`}
      >
        {String(row.position).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p
          className={`font-medium tracking-tight text-balance ${
            featured ? "text-xl md:text-2xl" : "text-base md:text-lg"
          }`}
        >
          {href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#2462ff]"
            >
              {title}
            </a>
          ) : (
            title
          )}
        </p>
        <p className="mt-1 truncate text-sm text-zinc-500">{displayUrl(row.url)}</p>
        <div className="mt-4 flex max-w-xs gap-8 sm:hidden">
          <ScoreMeter label="DR" value={row.domain_rating} />
          <ScoreMeter label="UR" value={row.url_rating} />
        </div>
      </div>
      <div className="hidden w-44 shrink-0 flex-col justify-center gap-3 sm:flex">
        <ScoreMeter label="DR" value={row.domain_rating} />
        <ScoreMeter label="UR" value={row.url_rating} />
      </div>
    </>
  );

  return (
    <li
      className={`flex gap-4 border-b py-7 last:border-b-0 md:gap-6 ${
        featured ? "pt-8" : ""
      }`}
    >
      {inner}
    </li>
  );
}

function ScoreMeter({
  label,
  value,
}: {
  label: string;
  value: number | null;
}) {
  const pct = value == null ? 0 : Math.min(100, Math.max(0, value));
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3 text-[11px]">
        <span className="font-medium tracking-wide text-zinc-400 uppercase">
          {label}
        </span>
        <span className="font-medium tabular-nums">{formatScore(value)}</span>
      </div>
      <div className="mt-1.5 h-px bg-zinc-200">
        <div className="h-px bg-[#2462ff]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function GhostList() {
  return (
    <ol className="opacity-40">
      {Array.from({ length: 6 }, (_, index) => (
        <li key={index} className="flex gap-4 border-b py-7 last:border-b-0 md:gap-6">
          <span className="w-10 shrink-0 text-2xl font-medium text-zinc-300 tabular-nums md:w-14 md:text-3xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1 space-y-2 pt-1.5">
            <div className="h-4 w-2/3 bg-zinc-200" />
            <div className="h-3 w-1/3 bg-zinc-100" />
          </div>
        </li>
      ))}
    </ol>
  );
}

function PendingList() {
  return (
    <ol>
      {Array.from({ length: 8 }, (_, index) => (
        <li key={index} className="flex gap-4 border-b py-7 last:border-b-0 md:gap-6">
          <span className="w-10 shrink-0 text-2xl font-medium text-zinc-200 tabular-nums md:w-14 md:text-3xl">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="min-w-0 flex-1 space-y-2 pt-1.5">
            <div className="h-4 w-3/4 animate-pulse bg-zinc-200" />
            <div className="h-3 w-2/5 animate-pulse bg-zinc-100" />
          </div>
        </li>
      ))}
    </ol>
  );
}
