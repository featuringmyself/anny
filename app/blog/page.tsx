import PatternStrip from "@/components/PatternStrip";
import JsonLd from "@/components/JsonLd";
import BlogHero from "@/components/pages/product/BlogHero";
import BlogIndex from "@/components/pages/product/BlogIndex";
import { getBlogPosts } from "@/lib/blog/content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  pageMetadata,
  webpageJsonLd,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const title = "Blog · Dodox";
const description =
  "Dodox field notes on AI search, GEO, ChatGPT mentions, Gemini sources, citations, and agency visibility retainers.";

const baseMetadata = pageMetadata({
  path: "/blog",
  title,
  description,
});

export const metadata = {
  ...baseMetadata,
  alternates: {
    ...baseMetadata.alternates,
    types: {
      "application/rss+xml": absoluteUrl("/rss.xml"),
    },
  },
};

export default async function BlogPage() {
  const { posts } = await getBlogPosts();

  return (
    <main>
      <JsonLd data={webpageJsonLd({ path: "/blog", title, description })} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${absoluteUrl("/blog")}#collection`,
          name: title,
          description,
          url: absoluteUrl("/blog"),
          isPartOf: { "@id": `${SITE_URL}#website` },
          about: { "@id": `${SITE_URL}#software` },
          publisher: { "@id": `${SITE_URL}#organization` },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: posts.length,
            itemListElement: posts.slice(0, 50).map((post, index) => ({
              "@type": "ListItem",
              position: index + 1,
              url: absoluteUrl(`/blog/${post.slug}`),
              name: post.title,
            })),
          },
        }}
      />
      <BlogHero />
      <PatternStrip />
      <BlogIndex posts={posts} />
    </main>
  );
}
