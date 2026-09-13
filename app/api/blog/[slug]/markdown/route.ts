import { getBlogPost } from "@/lib/blog/content";
import { SITE_URL } from "@/lib/site";

type RouteProps = {
  params: Promise<{ slug: string }>;
};

function portableTextToMarkdown(body: unknown): string {
  if (!Array.isArray(body)) return "";

  return body
    .map((block) => {
      if (!block || typeof block !== "object") return "";
      const typed = block as {
        _type?: string;
        style?: string;
        listItem?: string;
        children?: { text?: string }[];
        caption?: string;
        alt?: string;
      };

      if (typed._type === "image") {
        return `![${typed.alt || typed.caption || "Image"}](${SITE_URL})`;
      }

      const text = Array.isArray(typed.children)
        ? typed.children.map((child) => child.text || "").join("")
        : "";

      if (typed.listItem === "bullet") return `- ${text}`;
      if (typed.listItem === "number") return `1. ${text}`;
      if (typed.style === "h2") return `## ${text}`;
      if (typed.style === "h3") return `### ${text}`;
      if (typed.style === "blockquote") return `> ${text}`;
      return text;
    })
    .filter(Boolean)
    .join("\n\n");
}

export async function GET(_request: Request, { params }: RouteProps) {
  const { slug } = await params;
  const { post } = await getBlogPost(slug, false);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  const lines = [
    `# ${post.title}`,
    "",
    `> ${post.excerpt || ""}`,
    "",
    `- Canonical: ${SITE_URL}/blog/${post.slug}`,
    `- Published: ${post.publishedAt || ""}`,
    `- Updated: ${post.updatedAt || post.publishedAt || ""}`,
    post.author?.name ? `- Author: ${post.author.name}` : null,
    post.categories?.[0]?.title
      ? `- Category: ${post.categories[0].title}`
      : null,
    "",
    portableTextToMarkdown(post.body),
    "",
    "---",
    "",
    "Published on Anny, AI search visibility monitoring for marketing teams.",
    `Site: ${SITE_URL}`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  return new Response(lines, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
