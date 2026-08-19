import type { ReactNode } from "react";
import Link from "next/link";

import { SerpOverviewLookupCapture } from "@/components/pages/tools/serp-overview/SerpOverviewLookupCapture";
import {
  displayUrl,
  formatCheckedAt,
  formatCount,
  formatPageType,
  formatScore,
  hostnameFromUrl,
  medianScore,
  strongestHost,
} from "@/components/pages/tools/serp-overview/format";
import {
  formatSerpType,
  isSitelink,
  SERP_GROUPS,
} from "@/lib/serp-features";
import {
  countryLabel,
  getSerpOverview,
  positionsInGroup,
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
      <GhostList />
    </ResultsFrame>
  );
}

export function SerpOverviewResultsPending() {
  return (
    <ResultsFrame>
      <div className="border-b pb-8">
        <div className="h-3 w-28 animate-pulse bg-zinc-200" />
        <div className="mt-3 h-9 w-2/3 max-w-md animate-pulse bg-zinc-200" />
      </div>
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
        <SerpOverviewLookupCapture
          keyword={keyword}
          country={country}
          success={false}
          errorType="invalid_keyword"
        />
        <QueryHeader keyword={keyword} country={country} checkedAt={null} />
        <div className="py-12 md:py-16">
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

  const paid = positionsInGroup(result.positions, "paid");
  const features = positionsInGroup(result.positions, "features");
  const organic = positionsInGroup(result.positions, "organic");

  return (
    <ResultsFrame>
      <SerpOverviewLookupCapture
        keyword={result.keyword}
        country={result.country}
        success
        positionCount={result.positions.length}
        organicCount={organic.length}
        paidCount={paid.length}
        featureCount={features.length}
      />
      <QueryHeader
        keyword={result.keyword}
        country={result.country}
        checkedAt={result.updateDate}
        paidCount={paid.length}
        featureCount={features.length}
        organicCount={organic.length}
        medianDr={medianScore(organic.map((row) => row.domain_rating))}
        strongest={strongestHost(organic)}
      />
      <DrProfile positions={organic} />
      {result.positions.length === 0 ? (
        <p className="py-16 text-sm text-zinc-500">
          Ahrefs has no SERP snapshot for this keyword in this country.
        </p>
      ) : (
        <div>
          {SERP_GROUPS.map((group) => {
            const rows =
              group.id === "paid"
                ? paid
                : group.id === "features"
                  ? features
                  : organic;
            if (rows.length === 0) return null;
            return (
              <section key={group.id} className="border-b last:border-b-0">
                <h3 className="pt-8 pb-2 text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
                  {group.label}
                  <span className="ml-2 tabular-nums text-zinc-300">
                    {rows.length}
                  </span>
                </h3>
                <ol>
                  {rows.map((row, index) => (
                    <ResultRow
                      key={`${group.id}-${row.position}-${row.url ?? index}`}
                      row={row}
                    />
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      )}
    </ResultsFrame>
  );
}

function ResultsFrame({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-5xl" aria-label="SERP overview">
      {children}
    </div>
  );
}

function IdleHeader() {
  return (
    <div className="border-b pb-8">
      <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
        Ahrefs SERP Overview
      </p>
      <h2 className="mt-2 max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
        The SERP is empty until you search
      </h2>
      <p className="mt-3 max-w-lg text-sm leading-relaxed text-zinc-500">
        Organic results, paid ads, and SERP features — with Domain Rating, URL
        Rating, and page type from Ahrefs.
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
  paidCount = 0,
  featureCount = 0,
  organicCount = 0,
  medianDr,
  strongest,
}: {
  keyword: string;
  country: SerpCountryCode;
  checkedAt: string | null;
  paidCount?: number;
  featureCount?: number;
  organicCount?: number;
  medianDr?: number | null;
  strongest?: string | null;
}) {
  return (
    <div className="flex flex-col gap-6 border-b pb-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
          Ahrefs SERP Overview
        </p>
        <h2 className="mt-2 text-3xl font-medium tracking-tight text-balance md:text-4xl">
          “{keyword}”
        </h2>
        <p className="mt-3 text-sm text-zinc-500">
          {organicCount} organic
          <span className="text-zinc-300"> · </span>
          {paidCount} paid
          <span className="text-zinc-300"> · </span>
          {featureCount} features
          {strongest ? (
            <>
              <span className="text-zinc-300"> · </span>
              strongest {strongest}
            </>
          ) : null}
        </p>
      </div>
      <dl className="grid grid-cols-3 gap-x-8 text-sm">
        <MetaItem label="Country" value={countryLabel(country)} />
        <MetaItem label="Checked" value={formatCheckedAt(checkedAt)} />
        <MetaItem label="Median DR" value={formatScore(medianDr ?? null)} />
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
  const organic = positions.filter((row) => row.type.includes("organic"));
  const byRank = Array.from({ length: 10 }, (_, index) => {
    const rank = index + 1;
    return organic.find((row) => row.position === rank) ?? null;
  });

  return (
    <div className="border-b py-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-medium tracking-wide text-zinc-400 uppercase">
          Organic Domain Rating
        </p>
        <p className="text-[11px] text-zinc-400">Positions 1–10</p>
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
                  dr == null
                    ? `Position ${index + 1}`
                    : `#${index + 1} · DR ${formatScore(dr)}`
                }
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 grid grid-cols-10 gap-1.5 text-center text-[10px] text-zinc-400 tabular-nums sm:gap-2">
        {byRank.map((_, index) => (
          <span key={index}>{index + 1}</span>
        ))}
      </div>
    </div>
  );
}

function ResultRow({ row }: { row: SerpPosition }) {
  const sitelink = isSitelink(row.type);
  const host = hostnameFromUrl(row.url);
  const title = row.title || host;
  const href = row.url;
  const pageType = formatPageType(row.page_type);
  const types = row.type.filter((type) => type !== "organic");

  return (
    <li
      className={`flex gap-4 border-b py-6 last:border-b-0 md:gap-6 ${
        sitelink ? "pl-8 md:pl-12" : ""
      }`}
    >
      <span
        className={`w-10 shrink-0 pt-0.5 text-xl font-medium tabular-nums tracking-tight md:w-12 md:text-2xl ${
          row.position === 1 && !sitelink ? "text-[#2462ff]" : "text-zinc-300"
        }`}
      >
        {String(row.position).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        {types.length > 0 ? (
          <p className="mb-1.5 flex flex-wrap gap-1.5">
            {types.map((type) => (
              <span
                key={type}
                className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-600"
              >
                {formatSerpType(type)}
              </span>
            ))}
          </p>
        ) : null}
        <p
          className={`font-medium tracking-tight text-balance ${
            sitelink ? "text-sm md:text-base" : "text-base md:text-lg"
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
        <p className="mt-1 truncate text-sm text-zinc-500">
          {row.url ? displayUrl(row.url) : "No URL in this snapshot"}
        </p>
        <dl className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-zinc-500">
          {pageType ? (
            <div>
              <dt className="sr-only">Page type</dt>
              <dd>{pageType}</dd>
            </div>
          ) : null}
          {row.top_keyword ? (
            <div>
              <dt className="sr-only">Top keyword</dt>
              <dd>Top kw {row.top_keyword}</dd>
            </div>
          ) : null}
          <div>
            <dt className="sr-only">Backlinks</dt>
            <dd className="tabular-nums">
              {formatCount(row.backlinks)} backlinks
            </dd>
          </div>
          <div>
            <dt className="sr-only">Keywords</dt>
            <dd className="tabular-nums">
              {formatCount(row.keywords)} keywords
            </dd>
          </div>
        </dl>
        <div className="mt-4 flex max-w-xs gap-8 sm:hidden">
          <ScoreMeter label="DR" value={row.domain_rating} />
          <ScoreMeter label="UR" value={row.url_rating} />
        </div>
      </div>
      <div className="hidden w-44 shrink-0 flex-col justify-center gap-3 sm:flex">
        <ScoreMeter label="DR" value={row.domain_rating} />
        <ScoreMeter label="UR" value={row.url_rating} />
      </div>
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
        <li
          key={index}
          className="flex gap-4 border-b py-6 last:border-b-0 md:gap-6"
        >
          <span className="w-10 shrink-0 text-xl font-medium text-zinc-300 tabular-nums md:w-12 md:text-2xl">
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
        <li
          key={index}
          className="flex gap-4 border-b py-6 last:border-b-0 md:gap-6"
        >
          <span className="w-10 shrink-0 text-xl font-medium text-zinc-200 tabular-nums md:w-12 md:text-2xl">
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
