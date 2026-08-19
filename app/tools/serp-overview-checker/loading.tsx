import PatternStrip from "@/components/PatternStrip";
import { SerpOverviewCta } from "@/components/pages/tools/serp-overview/SerpOverviewCta";
import { SerpOverviewExplain } from "@/components/pages/tools/serp-overview/SerpOverviewExplain";
import { SerpOverviewGuide } from "@/components/pages/tools/serp-overview/SerpOverviewGuide";
import { SerpOverviewResultsPending } from "@/components/pages/tools/serp-overview/SerpOverviewResults";

export default function Loading() {
  return (
    <main>
      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <div className="h-4 w-20 animate-pulse bg-zinc-200" />
        <div className="mt-4 h-12 w-full max-w-lg animate-pulse bg-zinc-200" />
        <div className="mt-4 h-12 w-full max-w-md animate-pulse bg-zinc-100" />
        <div className="mt-10 h-12 w-full max-w-3xl animate-pulse bg-zinc-200" />
      </section>
      <section className="border-b bg-white px-6 py-12 md:px-12 md:py-16">
        <SerpOverviewResultsPending keyword="—" country="us" />
      </section>
      <PatternStrip />
      <SerpOverviewGuide />
      <PatternStrip />
      <SerpOverviewExplain />
      <PatternStrip />
      <SerpOverviewCta />
    </main>
  );
}
