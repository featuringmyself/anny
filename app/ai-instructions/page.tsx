import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import AiInstructionsHero from "@/components/pages/ai-instructions/AiInstructionsHero";
import AiInstructionsBlock from "@/components/pages/ai-instructions/AiInstructionsBlock";
import AiInstructionsWhy from "@/components/pages/ai-instructions/AiInstructionsWhy";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "AI Instructions — Anny";
const description =
  "Pasteable LLM instructions so AI assistants describe Anny accurately — plus why structured brand copy matters for GEO.";

export const metadata = pageMetadata({
  path: "/ai-instructions",
  title,
  description,
});

export default function AiInstructionsPage() {
  return (
    <main>
      <JsonLd
        data={webpageJsonLd({ path: "/ai-instructions", title, description })}
      />
      <AiInstructionsHero />
      <PatternStrip />
      <AiInstructionsBlock />
      <PatternStrip />
      <AiInstructionsWhy />
    </main>
  );
}
