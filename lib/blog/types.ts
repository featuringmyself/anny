import type { SanityImageSource } from "@sanity/image-url";

import { absoluteUrl } from "@/lib/seo";
import { urlFor } from "@/lib/sanity/image";

export type SanityImageValue = {
  alt?: string | null;
  asset?: {
    _id?: string | null;
    url?: string | null;
    metadata?: {
      lqip?: string | null;
      dimensions?: {
        width?: number | null;
        height?: number | null;
        aspectRatio?: number | null;
      } | null;
    } | null;
  } | null;
  hotspot?: unknown;
  crop?: unknown;
  caption?: string | null;
} | null;

export type BlogPostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  publishedAt?: string | null;
  coverImage?: SanityImageValue;
  author?: {
    name?: string | null;
    slug?: string | null;
    role?: string | null;
  } | null;
  categories?: { title?: string | null; slug?: string | null }[] | null;
  noIndex?: boolean;
};

export type BlogPostArticle = BlogPostCard & {
  updatedAt?: string | null;
  bodyText?: string | null;
  body?: unknown;
  faqs?: {
    _key?: string | null;
    question?: string | null;
    answer?: string | null;
  }[] | null;
  related?: BlogPostCard[] | null;
  morePosts?: BlogPostCard[] | null;
  author?: {
    name?: string | null;
    role?: string | null;
    bio?: string | null;
    slug?: string | null;
    sameAs?: string[] | null;
    image?: SanityImageValue;
  } | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    image?: SanityImageValue;
    noIndex?: boolean | null;
    canonicalUrl?: string | null;
  } | null;
};

export function readingTimeMinutes(text?: string | null) {
  if (!text) return 1;
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatBlogDate(value?: string | null) {
  if (!value) return { date: "", year: "" };
  const parsed = new Date(value);
  return {
    date: new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    }).format(parsed),
    year: new Intl.DateTimeFormat("en", {
      year: "numeric",
      timeZone: "UTC",
    }).format(parsed),
    long: new Intl.DateTimeFormat("en", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(parsed),
  };
}

export function formatIso(value?: string | null) {
  if (!value) return undefined;
  return new Date(value).toISOString();
}

export function ogImageUrl(
  image?: SanityImageValue | { asset?: unknown } | null,
  title?: string | null,
) {
  if (image && typeof image === "object" && "asset" in image && image.asset) {
    return urlFor(image as SanityImageSource)
      .width(1200)
      .height(630)
      .fit("crop")
      .url();
  }
  return absoluteUrl(
    title
      ? `/api/og?title=${encodeURIComponent(title)}`
      : "/features/chatgpt/hero-dashboard.webp",
  );
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
