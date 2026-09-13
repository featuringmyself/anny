import { AiCrawlabilityChecks } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityChecks";
import { AiCrawlabilityCta } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityCta";
import { AiCrawlabilityExplain } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityExplain";
import { AiCrawlabilityFaq } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityFaq";
import { AiCrawlabilityHero } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHero";
import { AiCrawlabilityHowTo } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityHowTo";
import { AiCrawlabilityScale } from "@/components/pages/tools/ai-crawlability/AiCrawlabilityScale";

export default function Loading() {
  return (
    <main className="bg-[#f6f7f4]">
      <AiCrawlabilityHero defaultDomain="" />
      <AiCrawlabilityHowTo />
      <AiCrawlabilityChecks />
      <AiCrawlabilityScale />
      <AiCrawlabilityExplain />
      <AiCrawlabilityFaq />
      <AiCrawlabilityCta />
    </main>
  );
}
