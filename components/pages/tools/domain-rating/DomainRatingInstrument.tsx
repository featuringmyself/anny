import type { ReactNode } from "react";

import { DomainRatingGauge } from "@/components/pages/tools/domain-rating/DomainRatingGauge";
import { DomainRatingLookupCapture } from "@/components/pages/tools/domain-rating/DomainRatingLookupCapture";
import {
  bandForScore,
  formatDr,
} from "@/components/pages/tools/domain-rating/bands";
import { AHREFS_HOME_URL } from "@/components/pages/tools/domain-rating/seo";
import { getDomainRating } from "@/lib/domain-rating";

type DomainRatingInstrumentProps = {
  domain?: string;
};

export function DomainRatingInstrumentIdle() {
  return (
    <InstrumentShell>
      <GaugeBlock value={null} label="—" caption="Enter a domain to begin" />
      <InstrumentMeta domain="—" rank={null} />
    </InstrumentShell>
  );
}

export function DomainRatingInstrumentPending({
  domain,
}: {
  domain: string;
}) {
  return (
    <InstrumentShell>
      <GaugeBlock
        value={null}
        pending
        label="—"
        caption="Checking the score…"
      />
      <InstrumentMeta domain={domain} rank={null} pending />
    </InstrumentShell>
  );
}

export async function DomainRatingInstrument({
  domain,
}: DomainRatingInstrumentProps) {
  if (!domain) {
    return <DomainRatingInstrumentIdle />;
  }

  const result = await getDomainRating(domain);

  if ("error" in result) {
    return (
      <InstrumentShell>
        <DomainRatingLookupCapture
          domain={domain}
          success={false}
          errorType={
            result.error === "Enter a domain." ||
            result.error === "Enter a valid domain."
              ? "invalid_domain"
              : "lookup_failed"
          }
        />
        <div className="flex flex-1 flex-col justify-center px-8 py-12">
          <p className="text-sm font-medium tracking-wide text-[#ff8b8b]">
            Couldn’t read that domain
          </p>
          <p className="mt-3 max-w-sm text-2xl font-medium tracking-tight text-balance">
            {result.error}
          </p>
        </div>
        <InstrumentMeta domain={domain} rank={null} />
      </InstrumentShell>
    );
  }

  const band = bandForScore(result.domain_rating);

  return (
    <InstrumentShell>
      <DomainRatingLookupCapture
        domain={domain}
        success
        domainRating={result.domain_rating}
        hasAhrefsRank={result.ahrefs_rank != null}
        band={band.label}
      />
      <GaugeBlock
        value={result.domain_rating}
        label={formatDr(result.domain_rating)}
        caption={band.label}
        hint={band.copy}
      />
      <InstrumentMeta domain={domain} rank={result.ahrefs_rank} />
    </InstrumentShell>
  );
}

function InstrumentShell({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Domain rating readout"
      className="flex min-h-[28rem] flex-col bg-zinc-950 text-white md:min-h-full"
    >
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4 md:px-8">
        <p className="text-xs font-medium tracking-wide text-zinc-500 uppercase">
          <a
            href={AHREFS_HOME_URL}
            className="text-zinc-400 underline-offset-2 hover:text-white hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Domain Rating by Ahrefs
          </a>
        </p>
        <p className="text-xs font-medium tracking-wide text-[#7ea1ff] uppercase">
          Free
        </p>
      </header>
      {children}
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
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-8">
      <DomainRatingGauge value={value} label={label} pending={pending} />
      <p className="-mt-2 text-sm font-medium text-[#7ea1ff]">{caption}</p>
      {hint ? (
        <p className="mx-auto mt-2 max-w-[16rem] text-center text-xs leading-relaxed text-zinc-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

function InstrumentMeta({
  domain,
  rank,
  pending = false,
}: {
  domain: string;
  rank: number | null | undefined;
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
          Rank
        </dt>
        <dd className="mt-1 text-sm font-medium tabular-nums">
          {rank == null ? (
            <span className="text-zinc-600">—</span>
          ) : (
            `#${rank.toLocaleString()}`
          )}
        </dd>
      </div>
    </dl>
  );
}
