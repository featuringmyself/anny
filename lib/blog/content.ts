import "server-only";

import { cache } from "react";
import { stegaClean } from "next-sanity";

import type {
  BlogPostArticle,
  BlogPostCard,
  SanityImageValue,
} from "@/lib/blog/types";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import {
  POST_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  RSS_POSTS_QUERY,
  SITEMAP_QUERY,
} from "@/lib/sanity/queries";

/**
 * `sanityFetch` caches with `revalidate: false`. That cache only expires when
 * a browser is connected to SanityLive at publish time, and the default action
 * does not refresh the prerendered /blog HTML. Published reads use a 60s TTL
 * so new posts show up without a redeploy. Draft mode still uses `sanityFetch`.
 */
async function fetchPublished<T>(
  query: string,
  params: Record<string, string> = {},
): Promise<T> {
  return client
    .withConfig({ useCdn: false, perspective: "published" })
    .fetch<T>(query, params, {
      stega: false,
      next: { revalidate: 60, tags: ["blog"] },
    });
}

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

type RenderablePost<T extends SanityPostCard = SanityPostCard> = T & {
  title: string;
  slug: string;
};

function isRenderablePost<T extends SanityPostCard>(
  post: T,
): post is RenderablePost<T> {
  return Boolean(post.title && post.slug);
}

function asSlug(value: string) {
  return stegaClean(value);
}

function asCard(post: RenderablePost): BlogPostCard {
  return {
    _id: post._id,
    title: post.title,
    slug: asSlug(post.slug),
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    coverImage: post.coverImage,
    author: post.author,
    categories: post.categories,
    noIndex: post.noIndex ?? false,
  };
}

export const getBlogPosts = cache(async function getBlogPosts(
  draft = false,
): Promise<{
  posts: BlogPostCard[];
}> {
  try {
    const data = draft
      ? ((
          await sanityFetch({
            query: POSTS_QUERY,
            stega: false,
          })
        ).data as SanityPostCard[] | null)
      : await fetchPublished<SanityPostCard[]>(POSTS_QUERY);
    const posts = data ?? [];
    return { posts: posts.filter(isRenderablePost).map(asCard) };
  } catch (error) {
    console.error("Failed to fetch blog posts from Sanity", error);
    return { posts: [] };
  }
});

export const getBlogPost = cache(async function getBlogPost(
  slug: string,
  stega: boolean,
): Promise<{ post: BlogPostArticle | null }> {
  try {
    const post = stega
      ? ((
          await sanityFetch({
            query: POST_QUERY,
            params: { slug },
            stega: true,
          })
        ).data as SanityPostArticle | null)
      : await fetchPublished<SanityPostArticle | null>(POST_QUERY, { slug });

    if (!post || !isRenderablePost(post)) {
      return { post: null };
    }

    return {
      post: {
        _id: post._id,
        title: post.title,
        slug: asSlug(post.slug),
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
        seo: post.seo
          ? {
              ...post.seo,
              canonicalUrl: post.seo.canonicalUrl
                ? stegaClean(post.seo.canonicalUrl)
                : post.seo.canonicalUrl,
            }
          : post.seo,
      },
    };
  } catch (error) {
    console.error("Failed to fetch blog post from Sanity", error);
    return { post: null };
  }
});

export async function getBlogPostSlugs(): Promise<string[]> {
  try {
    const data = await fetchPublished<{ slug?: string | null }[]>(
      POST_SLUGS_QUERY,
    );
    const slugs = data ?? [];
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
    const data = await fetchPublished<
      {
        href?: string | null;
        _updatedAt?: string;
        publishedAt?: string;
      }[]
    >(SITEMAP_QUERY);
    const entries = data ?? [];
    return entries.filter(
      (entry): entry is { href: string; _updatedAt?: string; publishedAt?: string } =>
        Boolean(entry.href),
    );
  } catch (error) {
    console.error("Failed to fetch blog sitemap entries from Sanity", error);
    return [];
  }
}

export async function getBlogRssPosts(): Promise<
  {
    title?: string | null;
    slug?: string | null;
    description?: string | null;
    excerpt?: string | null;
    publishedAt?: string | null;
    author?: { name?: string | null } | null;
  }[]
> {
  const data = await fetchPublished<
    {
      title?: string | null;
      slug?: string | null;
      description?: string | null;
      excerpt?: string | null;
      publishedAt?: string | null;
      author?: { name?: string | null } | null;
    }[]
  >(RSS_POSTS_QUERY);
  return data ?? [];
}
