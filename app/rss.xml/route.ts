import { sanityFetch } from "@/lib/sanity/live";
import { RSS_POSTS_QUERY } from "@/lib/sanity/queries";
import { SITE_NAME, SITE_URL } from "@/lib/site";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  let posts: {
    title: string;
    slug: string;
    description?: string | null;
    excerpt?: string | null;
    publishedAt?: string | null;
    author?: { name?: string | null } | null;
  }[] = [];

  try {
    const { data } = await sanityFetch({
      query: RSS_POSTS_QUERY,
      stega: false,
    });
    const rows = (data ?? []) as
      | {
          title?: string | null;
          slug?: string | null;
          description?: string | null;
          excerpt?: string | null;
          publishedAt?: string | null;
          author?: { name?: string | null } | null;
        }[]
      | null;
    posts = (rows ?? [])
      .filter(
        (post): post is { title: string; slug: string } & typeof post =>
          Boolean(post.title && post.slug),
      )
      .map((post) => ({
        title: post.title,
        slug: post.slug,
        description: post.description,
        excerpt: post.excerpt,
        publishedAt: post.publishedAt,
        author: post.author,
      }));
  } catch {
    posts = [];
  }

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      ${post.publishedAt ? `<pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>` : ""}
      <description>${escapeXml(post.description || post.excerpt || "")}</description>
      ${post.author?.name ? `<author>${escapeXml(post.author.name)}</author>` : ""}
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Field notes from Dodox on AI search, GEO, citations, and brand visibility in ChatGPT, Gemini, and AI Mode.</description>
    <language>en-us</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
