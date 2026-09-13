import { AiCrawlabilityCta } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityCta";
import { AiCrawlabilityFaq } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityFaq";
import { AiCrawlabilityHero } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHero";
import { AiCrawlabilityHowTo } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHowTo";

export default function Loading() {
  return (
    <main className="bg-[#f6f7f4]">
      <AiCrawlabilityHero defaultDomain="" />
      <AiCrawlabilityHowTo />
      <AiCrawlabilityFaq />
      <AiCrawlabilityCta />
    </main>
  );
}
