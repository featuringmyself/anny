import Link from "next/link";

import { TalkToSalesButton } from "@/components/talk-to-sales";
import { Button } from "@/components/ui/button";

import { rt } from "./report-theme";
import type { ReportCtaFields } from "./types";

type ReportCtaProps = {
  report: ReportCtaFields;
};

const MODEL_ROWS = [
  { name: "ChatGPT", width: "72%" },
  { name: "Perplexity", width: "48%" },
  { name: "AI Overview", width: "36%" },
] as const;

const CHECKLIST = [
  "Cited on buy-intent shelves",
  "Weekly screenshot proof",
  "Competitor gap dashboard",
] as const;

export default function ReportCta({ report }: ReportCtaProps) {
  const eyebrow = report.ctaEyebrow ?? "Talk to Dodox";
  const headline =
    report.ctaHeadline ?? `Get ${report.company} cited in 90 days`;
  const body =
    report.ctaBody ??
    `Book a call to start the AI Visibility Sprint: citation work across ChatGPT, Perplexity, and Google AI Overview, plus a dashboard to track gaps, competitors, and the next actions each week.`;
  const label = report.ctaLabel ?? "Book a call";

  return (
    <section className={`${rt.dark} overflow-hidden text-white`}>
      <div className="grid items-center gap-10 px-6 py-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-12 md:px-10 md:py-14">
        <div className="min-w-0">
          <p className="mb-2 font-mono text-[11px] font-medium tracking-wide text-white/45 uppercase">
            {eyebrow}
          </p>
          <h2 className="max-w-xl text-3xl font-medium tracking-tight text-balance md:text-4xl">
            {headline}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/60 text-balance">
            {body}
          </p>
          <div className="mt-8">
            {report.ctaUrl ? (
              <Button
                size="lg"
                className={`h-11 rounded-lg px-5 text-sm font-semibold ${rt.btnPrimary}`}
                render={
                  <Link
                    href={report.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {label}
              </Button>
            ) : (
              <TalkToSalesButton
                size="lg"
                className={`h-11 rounded-lg px-5 text-sm font-semibold ${rt.btnPrimary}`}
                source={`audit-report-${report.slug}`}
              >
                {label}
              </TalkToSalesButton>
            )}
          </div>
        </div>

        <aside
          aria-hidden="true"
          className="relative mx-auto w-full max-w-md md:mx-0 md:justify-self-end"
        >
          {/* Soft glow + grid behind the board */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-3xl opacity-70"
            style={{
              background:
                "radial-gradient(ellipse at 70% 30%, rgba(147,232,95,0.18), transparent 55%), radial-gradient(ellipse at 20% 80%, rgba(34,88,100,0.45), transparent 50%)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-[0.12]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
              maskImage:
                "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            }}
          />

          <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-[#0c252c]/80 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.55)] backdrop-blur-sm">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-brand" />
                <span className="text-[11px] font-medium tracking-wide text-white/70 uppercase">
                  Citation board
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/40">
                Day 90 preview
              </span>
            </div>

            <div className="space-y-4 px-4 py-4">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[11px] text-white/45">Visibility</p>
                  <p className="mt-0.5 text-2xl font-medium tracking-tight tabular-nums">
                    <span className="text-white/35">0%</span>
                    <span className="mx-1.5 text-white/25">→</span>
                    <span className="text-brand">cited</span>
                  </p>
                </div>
                  <p className="max-w-36 text-right text-[11px] leading-snug text-white/40">
                    {report.company} on the shelves that matter
                  </p>
                </div>

              <div className="space-y-2.5">
                {MODEL_ROWS.map((row) => (
                  <div key={row.name} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 truncate text-[11px] text-white/55">
                      {row.name}
                    </span>
                    <div className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-brand/90"
                        style={{ width: row.width }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-white/10 bg-white/4 px-3 py-3">
                <p className="mb-2 text-[10px] font-medium tracking-wide text-white/40 uppercase">
                  Sprint proof
                </p>
                <ul className="space-y-2">
                  {CHECKLIST.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[12px] leading-snug text-white/75"
                    >
                      <span
                        className="mt-0.5 grid size-3.5 shrink-0 place-items-center rounded-sm bg-brand/20 text-[9px] font-bold text-brand"
                        aria-hidden
                      >
                        ✓
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Floating chip */}
            <div className="absolute -right-2 top-14 rotate-3 rounded-lg border border-brand/40 bg-[#11333c] px-2.5 py-1.5 shadow-lg md:right-3">
              <p className="font-mono text-[10px] font-medium text-brand">
                + shortlist win
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
