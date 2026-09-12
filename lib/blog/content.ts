import "server-only";

import type { BlogPost } from "@/components/pages/product/blog/types";
import {
  getAllPosts as getLegacyPosts,
  getPostBySlug as getLegacyPostBySlug,
  getPostSlugs as getLegacyPostSlugs,
} from "@/components/pages/product/blog/posts";
import type {
  BlogPostArticle,
  BlogPostCard,
  SanityImageValue,
} from "@/lib/blog/types";
import { sanityFetch } from "@/lib/sanity/live";
import {
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  SITEMAP_QUERY,
} from "@/lib/sanity/queries";

type SanityPostCard = {
  _id: string;
  title?: string | null;
  slug?: string | null;
  excerpt?: string | null;
  publishedAt?: string | null;
  coverImage?: SanityImageValue;
  author?: BlogPostCard["author"];
  categories?: BlogPostCard["categories"];
  noIndex?: boolean | null;
};

type SanityPostArticle = SanityPostCard & {
  updatedAt?: string | null;
  bodyText?: string | null;
  body?: unknown;
  faqs?: BlogPostArticle["faqs"];
  related?: SanityPostCard[] | null;
  morePosts?: SanityPostCard[] | null;
  seo?: BlogPostArticle["seo"];
};

function asCard(post: SanityPostCard): BlogPostCard {
  return {
    _id: post._id,
    title: post.title || "Untitled",
    slug: post.slug || "",
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
    author: post.author,
    categories: post.categories,
    noIndex: post.noIndex ?? false,
  };
}

function legacyToCard(post: BlogPost): BlogPostCard {
  return {
    _id: `legacy-${post.slug}`,
    title: post.title,
    slug: post.slug,
    excerpt: post.dek,
    publishedAt: post.publishedAt,
    categories: [{ title: post.category, slug: post.category }],
    noIndex: false,
  };
}

function legacyToArticle(post: BlogPost): BlogPostArticle {
  const bodyText = post.body
    .map((block) => {
      if (block.type === "ul" || block.type === "ol") {
        return block.items.join(" ");
      }
      return block.text;
    })
    .join(" ");

  return {
    ...legacyToCard(post),
    updatedAt: post.publishedAt,
    bodyText,
    body: { __legacy: true, blocks: post.body },
    faqs: [],
    morePosts: getLegacyPosts()
      .filter((item) => item.slug !== post.slug)
      .slice(0, 3)
      .map(legacyToCard),
    seo: {
      title: `${post.title} — Anny`,
      description: post.dek,
      noIndex: false,
    },
  };
}

export async function getBlogPosts(): Promise<{
  posts: BlogPostCard[];
  source: "sanity" | "legacy";
}> {
  try {
    const { data } = await sanityFetch({
      query: POSTS_QUERY,
      stega: false,
    });
    const posts = (data ?? []) as SanityPostCard[];
    if (posts.length > 0) {
      return {
        posts: posts
          .filter((post) => post.title && post.slug)
          .map((post) => asCard(post)),
        source: "sanity",
      };
    }
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity", error);
  }

  return {
    posts: getLegacyPosts().map(legacyToCard),
    source: "legacy",
  };
}

export async function getBlogPost(slug: string): Promise<{
  post: BlogPostArticle | null;
  source: "sanity" | "legacy" | "missing";
}> {
  try {
    const { data } = await sanityFetch({
      query: POST_QUERY,
      params: { slug },
      stega: false,
    });
    const post = data as SanityPostArticle | null;

    if (post?.title && post.slug) {
      return {
        source: "sanity",
        post: {
          _id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
          bodyText: post.bodyText,
          coverImage: post.coverImage,
          author: post.author,
          categories: post.categories,
          body: post.body,
          faqs: post.faqs,
          related: post.related
            ?.filter(Boolean)
            .map((item) => asCard(item)),
          morePosts: post.morePosts?.map((item) => asCard(item)),
          seo: post.seo,
        },
      };
    }
  } catch (error) {
    console.error("Failed to fetch blog post from Sanity", error);
  }

  const legacy = getLegacyPostBySlug(slug);
  if (legacy) {
    return { post: legacyToArticle(legacy), source: "legacy" };
  }

  return { post: null, source: "missing" };
}

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const { data } = await sanityFetch({
      query: POST_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    const slugs = (data ?? []) as { slug?: string | null }[];
    if (slugs.length > 0) {
      return slugs
        .map((item) => item.slug)
        .filter((slug): slug is string => Boolean(slug));
    }
  } catch (error) {
    console.error("Failed to fetch blog slugs from Sanity", error);
  }

  return getLegacyPostSlugs();
}

export async function getBlogSitemapEntries(): Promise<
  { href: string; _updatedAt?: string; publishedAt?: string }[]
> {
  try {
    const { data } = await sanityFetch({
      query: SITEMAP_QUERY,
      stega: false,
    });
    const entries = (data ?? []) as {
      href?: string | null;
      _updatedAt?: string;
      publishedAt?: string;
    }[];
    if (entries.length > 0) {
      return entries.filter(
        (entry): entry is { href: string; _updatedAt?: string; publishedAt?: string } =>
          Boolean(entry.href),
      );
    }
  } catch (error) {
    console.error("Failed to fetch blog sitemap entries from Sanity", error);
  }

  return getLegacyPosts().map((post) => ({
    href: `/blog/${post.slug}`,
    publishedAt: post.publishedAt,
    _updatedAt: post.publishedAt,
  }));
}
