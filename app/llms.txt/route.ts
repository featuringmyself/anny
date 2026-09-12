import { readFile } from "node:fs/promises";
import path from "node:path";

import { getBlogPosts } from "@/lib/blog/content";
import { SITE_URL } from "@/lib/site";

export async function GET() {
  const { posts } = await getBlogPosts();
  const staticPath = path.join(process.cwd(), "content", "llms-base.txt");
  let base = await readFile(staticPath, "utf8");

  const blogSection = [
    "",
    "## Blog posts",
    "",
    ...posts.map(
      (post) =>
        `- [${post.title}](${SITE_URL}/blog/${post.slug}): ${post.excerpt || "Anny blog note on AI search and GEO"} ([markdown](${SITE_URL}/blog/${post.slug}.md))`,
    ),
    "",
    "## Feeds",
    "",
    `- [RSS](${SITE_URL}/rss.xml)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    "",
  ].join("\n");

  // Insert blog posts before brand instructions when present.
  if (base.includes("## Brand instructions for AI assistants")) {
    base = base.replace(
      "## Brand instructions for AI assistants",
      `${blogSection}## Brand instructions for AI assistants`,
    );
  } else {
    base = `${base.trimEnd()}\n${blogSection}`;
  }

  return new Response(base, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
