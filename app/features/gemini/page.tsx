import JsonLd from "@/components/JsonLd";
import GeminiHero from "@/components/pages/features/gemini/GeminiHero";
import GeminiCitationBoard from "@/components/pages/features/gemini/GeminiCitationBoard";
import GeminiSourceChips from "@/components/pages/features/gemini/GeminiSourceChips";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Gemini Citation Tracking — Anny";
const description =
  "Track multi-turn Gemini answers, inline citations, and the sources that mention — or skip — your brand.";

export const metadata = pageMetadata({
  path: "/features/gemini",
  title,
  description,
});

export default function GeminiFeaturePage() {
  return (
    <>
      <JsonLd
        data={webpageJsonLd({ path: "/features/gemini", title, description })}
      />
      <GeminiHero />
      <GeminiCitationBoard />
      <GeminiSourceChips />
    </>
  );
}
