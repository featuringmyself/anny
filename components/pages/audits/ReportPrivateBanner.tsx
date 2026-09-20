import { rt } from "./report-theme";

export default function ReportPrivateBanner() {
  return (
    <aside
      className={`rounded-2xl border ${rt.hairline} ${rt.dark} px-6 py-2.5 text-center md:px-10`}
    >
      <p className="font-mono text-[11px] leading-relaxed tracking-wide text-white/50 uppercase">
        Private · outreach only · noindex
      </p>
    </aside>
  );
}
