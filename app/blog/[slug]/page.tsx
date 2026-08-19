import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import BlogPostView from "@/components/pages/product/BlogPostView";
import {
  getPostBySlug,
  getPostSlugs,
} from "@/components/pages/product/blog/posts";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: `Blog — ${SITE_NAME}` };
  }

  const metadata = pageMetadata({
    path: `/blog/${slug}`,
    title: `${post.title} — ${SITE_NAME}`,
    description: post.dek,
  });

  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.dek,
          datePublished: post.publishedAt,
          url: absoluteUrl(`/blog/${slug}`),
          publisher: { "@id": `${SITE_URL}#organization` },
        }}
      />
      <BlogPostView post={post} />
    </main>
  );
}
