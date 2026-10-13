import { toYouTubeEmbedSrc } from "@/lib/audits/youtube";

import type { VisibilityReport } from "./types";

type ReportPitchVideoProps = {
  report: VisibilityReport;
};

export default function ReportPitchVideo({ report }: ReportPitchVideoProps) {
  const pitch = report.pitchVideo;
  if (!pitch?.url) return null;

  const embedSrc = toYouTubeEmbedSrc(pitch.url);
  if (!embedSrc) return null;

  const title =
    pitch.title ?? `Watch: why this ${report.company} snapshot matters`;
  const dek =
    pitch.dek ??
    "Two minutes on the discovery gap, then scroll the exhibits and get the full report.";

  return (
    <section className="border-b" aria-label="Pitch video">
      <div className="grid gap-8 px-6 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-12 md:px-12 md:py-12">
        <div className="min-w-0">
          <p className="mb-2 text-sm font-medium text-[#2462ff]">
            Watch before you scroll
          </p>
          <h2 className="max-w-md text-2xl font-medium tracking-tight text-balance md:text-3xl">
            {title}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
            {dek}
          </p>
        </div>
        <div className="min-w-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-950 shadow-sm">
          <div className="relative aspect-video w-full">
            <iframe
              src={embedSrc}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
