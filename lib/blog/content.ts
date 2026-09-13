import "server-only";

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

type RenderablePost = SanityPostCard & { title: string; slug: string };

function isRenderablePost(post: SanityPostCard): post is RenderablePost {
  return Boolean(post.title && post.slug);
}

function asCard(post: RenderablePost): BlogPostCard {
  return {
    _id: post._id,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
    author: post.author,
    categories: post.categories,
    noIndex: post.noIndex ?? false,
  };
}

export async function getBlogPosts(): Promise<{ posts: BlogPostCard[] }> {
  try {
    const { data } = await sanityFetch({
      query: POSTS_QUERY,
      stega: false,
    });
    const posts = (data ?? []) as SanityPostCard[];
    return { posts: posts.filter(isRenderablePost).map(asCard) };
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity", error);
    return { posts: [] };
  }
}

export async function getBlogPost(slug: string): Promise<{
  post: BlogPostArticle | null;
}> {
  try {
    const { data } = await sanityFetch({
      query: POST_QUERY,
      params: { slug },
      stega: false,
    });
    const post = data as SanityPostArticle | null;

    if (!post || !isRenderablePost(post)) {
      return { post: null };
    }

    return {
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
          ?.filter((item): item is RenderablePost =>
            Boolean(item && isRenderablePost(item)),
          )
          .map(asCard),
        morePosts: post.morePosts
          ?.filter((item): item is RenderablePost =>
            Boolean(item && isRenderablePost(item)),
          )
          .map(asCard),
        seo: post.seo,
      },
    };
  } catch (error) {
    console.error("Failed to fetch blog post from Sanity", error);
    return { post: null };
  }
}

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const { data } = await sanityFetch({
      query: POST_SLUGS_QUERY,
      perspective: "published",
      stega: false,
    });
    const slugs = (data ?? []) as { slug?: string | null }[];
    return slugs
      .map((item) => item.slug)
      .filter((slug): slug is string => Boolean(slug));
  } catch (error) {
    console.error("Failed to fetch blog slugs from Sanity", error);
    return [];
  }
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
    return entries.filter(
      (entry): entry is { href: string; _updatedAt?: string; publishedAt?: string } =>
        Boolean(entry.href),
    );
  } catch (error) {
    console.error("Failed to fetch blog sitemap entries from Sanity", error);
    return [];
  }
}
