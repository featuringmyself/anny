import PatternStrip from "@/components/PatternStrip";
import { SerpOverviewCta } from "@/components/pages/tools/serp-overview/SerpOverviewCta";
import { SerpOverviewExplain } from "@/components/pages/tools/serp-overview/SerpOverviewExplain";
import { SerpOverviewFaq } from "@/components/pages/tools/serp-overview/SerpOverviewFaq";
import { SerpOverviewForm } from "@/components/pages/tools/serp-overview/SerpOverviewForm";
import { SerpOverviewGuide } from "@/components/pages/tools/serp-overview/SerpOverviewGuide";
import { SerpOverviewHowTo } from "@/components/pages/tools/serp-overview/SerpOverviewHowTo";
import { SerpOverviewResultsPending } from "@/components/pages/tools/serp-overview/SerpOverviewResults";

export default function Loading() {
  return (
    <main>
      <section className="border-b px-6 py-14 md:px-12 md:py-20">
        <p className="text-sm font-medium tracking-wide text-[#2462ff]">
          Free tool
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-medium tracking-tight text-balance md:text-5xl">
          Free Ahrefs SERP Overview
        </h1>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 text-balance">
          Organic, paid, and SERP features for a keyword in one country — with
          Domain Rating and URL Rating on each result. No Ahrefs login.
        </p>
        <SerpOverviewForm defaultKeyword="" defaultCountry="us" />
      </section>
      <section className="border-b bg-white px-6 py-12 md:px-12 md:py-16">
        <SerpOverviewResultsPending />
      </section>
      <PatternStrip />
      <SerpOverviewHowTo />
      <PatternStrip />
      <SerpOverviewGuide />
      <PatternStrip />
      <SerpOverviewExplain />
      <PatternStrip />
      <SerpOverviewFaq />
      <PatternStrip />
      <SerpOverviewCta />
    </main>
  );
}
