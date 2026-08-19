import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import DocsHero from "@/components/pages/product/DocsHero";
import DocsIndex from "@/components/pages/product/DocsIndex";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Docs — Anny";
const description =
  "Anny documentation: quickstart, brand setup, prompt sets, model coverage, mentions, sources, and workspace guides.";

export const metadata = pageMetadata({
  path: "/docs",
  title,
  description,
});

export default function DocsPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/docs", title, description })} />
      <DocsHero />
      <PatternStrip />
      <DocsIndex />
    </main>
  );
}
