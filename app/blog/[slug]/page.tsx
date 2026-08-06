import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogPostView from "@/components/pages/product/BlogPostView";
import {
  getPostBySlug,
  getPostSlugs,
} from "@/components/pages/product/blog/posts";
import { SITE_NAME } from "@/lib/site";

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

  return {
    title: `${post.title} — ${SITE_NAME}`,
    description: post.dek,
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
      <BlogPostView post={post} />
    </main>
  );
}
