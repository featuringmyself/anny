import type { Metadata } from "next";
import { notFound } from "next/navigation";

import JsonLd from "@/components/JsonLd";
import BlogPostView from "@/components/pages/product/BlogPostView";
import { getBlogPost, getBlogPostSlugs } from "@/lib/blog/content";
import {
  formatIso,
  ogImageUrl,
  readingTimeMinutes,
} from "@/lib/blog/types";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  faqJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getBlogPost(slug, false);

  if (!post) {
    return { title: `Blog · ${SITE_NAME}` };
  }

  const title = post.seo?.title || `${post.title} · ${SITE_NAME}`;
  const description = post.seo?.description || post.excerpt || "";
  const image = ogImageUrl(post.seo?.image || post.coverImage, post.title);
  const canonicalPath = post.seo?.canonicalUrl || `/blog/${post.slug}`;
  const noIndex = Boolean(post.seo?.noIndex);

  const metadata = pageMetadata({
    path: canonicalPath.startsWith("http") ? `/blog/${post.slug}` : canonicalPath,
    title,
    description,
    image,
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true },
  });

  return {
    ...metadata,
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    alternates: {
      ...metadata.alternates,
      canonical: post.seo?.canonicalUrl || absoluteUrl(`/blog/${post.slug}`),
      types: {
        "application/rss+xml": absoluteUrl("/rss.xml"),
        "text/markdown": absoluteUrl(`/blog/${post.slug}.md`),
      },
    },
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: formatIso(post.publishedAt),
      modifiedTime: formatIso(post.updatedAt || post.publishedAt),
      authors: post.author?.name ? [post.author.name] : undefined,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const [{ post: seoPost }, { post }] = await Promise.all([
    getBlogPost(slug, false),
    getBlogPost(slug, true),
  ]);
  const article = post ?? seoPost;

  if (!article) {
    notFound();
  }

  const schemaPost = seoPost ?? article;
  const canonical = absoluteUrl(
    schemaPost.seo?.canonicalUrl || `/blog/${schemaPost.slug}`,
  );
  const image = ogImageUrl(
    schemaPost.seo?.image || schemaPost.coverImage,
    schemaPost.title,
  );
  const minutes = readingTimeMinutes(schemaPost.bodyText || schemaPost.excerpt);
  const faqs = (schemaPost.faqs || []).filter(
    (faq) => faq.question && faq.answer,
  );
  const wordCount = schemaPost.bodyText
    ? schemaPost.bodyText.trim().split(/\s+/).length
    : undefined;

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${canonical}#article`,
          headline: schemaPost.title,
          description: schemaPost.excerpt || schemaPost.seo?.description || undefined,
          datePublished: formatIso(schemaPost.publishedAt),
          dateModified: formatIso(schemaPost.updatedAt || schemaPost.publishedAt),
          mainEntityOfPage: canonical,
          url: canonical,
          image,
          inLanguage: "en-US",
          wordCount,
          timeRequired: `PT${minutes}M`,
          articleSection: schemaPost.categories?.[0]?.title || undefined,
          keywords: schemaPost.categories
            ?.map((category) => category?.title)
            .filter(Boolean)
            .join(", "),
          author: schemaPost.author?.name
            ? {
                "@type": "Person",
                name: schemaPost.author.name,
                description: schemaPost.author.bio || undefined,
                sameAs: schemaPost.author.sameAs || undefined,
              }
            : { "@id": `${SITE_URL}#organization` },
          publisher: { "@id": `${SITE_URL}#organization` },
          isPartOf: { "@id": `${SITE_URL}#website` },
          about: { "@id": `${SITE_URL}#software` },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: schemaPost.title, path: `/blog/${schemaPost.slug}` },
        ])}
      />
      {faqs.length > 0 ? <JsonLd data={faqJsonLd(faqs as { question: string; answer: string }[])} /> : null}
      <BlogPostView post={article} />
    </main>
  );
}
