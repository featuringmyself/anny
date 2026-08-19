import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import BlogHero from "@/components/pages/product/BlogHero";
import BlogIndex from "@/components/pages/product/BlogIndex";
import { pageMetadata, webpageJsonLd } from "@/lib/seo";

const title = "Blog — Anny";
const description =
  "Anny field notes on AI search, GEO, ChatGPT mentions, Gemini sources, citations, and agency visibility retainers.";

export const metadata = pageMetadata({
  path: "/blog",
  title,
  description,
});

export default function BlogPage() {
  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/blog", title, description })} />
      <BlogHero />
      <PatternStrip />
      <BlogIndex />
    </main>
  );
}
