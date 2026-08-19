import JsonLd from "@/components/JsonLd";
import AiModeHero from "@/components/pages/features/ai-mode/AiModeHero";
import AiModeDualPanel from "@/components/pages/features/ai-mode/AiModeDualPanel";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Google AI Mode & Overview Tracking — Anny";
const description =
  "Compare brand visibility across Google AI Mode and AI Overviews for the same queries — presence, rank, and citation gaps.";

export const metadata = pageMetadata({
  path: "/features/ai-mode",
  title,
  description,
});

export default function AiModeFeaturePage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({ path: "/features/ai-mode", title, description })}
      />
      <AiModeHero />
      <AiModeDualPanel />
    </>
  );
}
