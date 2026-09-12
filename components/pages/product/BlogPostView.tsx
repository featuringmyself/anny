import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";

import BlogFaqs from "@/components/blog/BlogFaqs";
import BlogOnThisPage, {
  type TocHeading,
} from "@/components/blog/BlogOnThisPage";
import {
  BlogPortableText,
  headingsFromBody,
} from "@/components/blog/BlogPortableText";
import SanityImage from "@/components/blog/SanityImage";
import type { BlogBlock } from "@/components/pages/product/blog/types";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import type { BlogPostArticle } from "@/lib/blog/types";
import { formatBlogDate, readingTimeMinutes, slugify } from "@/lib/blog/types";

function LegacyBlock({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-relaxed text-zinc-500">{block.text}</p>
      );
    case "h2":
      return (
        <h2
          id={slugify(block.text)}
          className="mt-12 scroll-mt-24 text-xl font-medium tracking-tight text-zinc-900 md:text-2xl"
        >
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3
          id={slugify(block.text)}
          className="mt-8 scroll-mt-24 text-lg font-medium tracking-tight text-zinc-900"
        >
          {block.text}
        </h3>
      );
    case "ul":
      return (
        <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-500">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-500">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-[#2462ff] pl-5 text-[15px] leading-relaxed text-zinc-600 italic">
          <p>{block.text}</p>
          {block.cite ? (
            <cite className="mt-2 block text-sm not-italic text-zinc-400">- {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    default:
      return null;
  }
}

function isLegacyBody(
  body: unknown,
): body is { __legacy: true; blocks: BlogBlock[] } {
  return Boolean(
    body &&
      typeof body === "object" &&
      "__legacy" in body &&
      Array.isArray((body as { blocks?: unknown }).blocks),
  );
}

function headingsFromLegacy(blocks: BlogBlock[]): TocHeading[] {
  return blocks.flatMap((block) => {
    if (block.type !== "h2" && block.type !== "h3") return [];
    return [{ id: slugify(block.text), text: block.text, style: block.type }];
  });
}

export default function BlogPostView({ post }: { post: BlogPostArticle }) {
  const { date, year, long } = formatBlogDate(post.publishedAt);
  const category = post.categories?.[0]?.title || "GEO";
  const minutes = readingTimeMinutes(post.bodyText || post.excerpt);
  const faqs = (post.faqs || []).filter((faq) => faq.question && faq.answer);
  const related =
    (post.related && post.related.length > 0 ? post.related : post.morePosts) ||
    [];
  const headings = isLegacyBody(post.body)
    ? headingsFromLegacy(post.body.blocks)
    : headingsFromBody(post.body);

  return (
    <article>
      <header className="border-b px-8 py-14 md:px-12 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-[#2462ff]"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2} aria-hidden />
          Blog
        </Link>
        <p className="mt-6 text-sm font-medium tracking-wide text-[#2462ff]">
          {category}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight text-balance md:text-5xl">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-4 max-w-2xl text-lg text-zinc-500 text-balance">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
          <time dateTime={post.publishedAt || undefined}>
            {long || `${date} ${year}`}
          </time>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" strokeWidth={1.75} aria-hidden />
            {minutes} min read
          </span>
          {post.author?.name ? (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <User className="size-3.5" strokeWidth={1.75} aria-hidden />
                {post.author.name}
                {post.author.role ? ` · ${post.author.role}` : ""}
              </span>
            </>
          ) : null}
        </div>
      </header>

      {post.coverImage?.asset ? (
        <div className="border-b px-8 py-8 md:px-12">
          <SanityImage
            value={post.coverImage}
            width={1600}
            className="aspect-[16/8] w-full"
            sizes="(min-width: 1280px) 1280px, 100vw"
            priority
          />
        </div>
      ) : null}

      <div className="px-8 py-12 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="mx-auto w-full max-w-2xl space-y-5">
            {isLegacyBody(post.body) ? (
              post.body.blocks.map((block, index) => (
                <LegacyBlock key={`${post.slug}-${index}`} block={block} />
              ))
            ) : (
              <BlogPortableText value={post.body} />
            )}

            <BlogFaqs faqs={faqs} />

            {post.author?.bio ? (
              <aside className="mt-14 border border-zinc-200 bg-zinc-50/80 p-6">
                <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
                  Author
                </p>
                <p className="mt-2 text-lg font-medium tracking-tight">
                  {post.author.name}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                  {post.author.bio}
                </p>
              </aside>
            ) : null}

            <aside className="mt-16 border-t pt-10">
              <p className="text-lg font-medium tracking-tight">
                See what AI says about your brand
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                Anny tracks visibility, answer position, sentiment, and sources
                across ChatGPT, Gemini, AI Mode, and more, so you can close the
                gaps that cost you recommendations.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href="/register"
                  className="inline-flex h-10 items-center rounded-md bg-[#2462ff] px-4 text-sm font-medium text-white hover:bg-[#1d4ed8]"
                >
                  Start free trial
                </Link>
                <TalkToSalesButton
                  source={`blog-${post.slug}`}
                  variant="outline"
                  className="h-10"
                >
                  Talk to sales
                </TalkToSalesButton>
              </div>
            </aside>
          </div>

          <BlogOnThisPage headings={headings} />
        </div>

        {related.length > 0 ? (
          <section className="mx-auto mt-20 max-w-5xl border-t pt-12" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="text-xl font-medium tracking-tight md:text-2xl"
            >
              Keep reading
            </h2>
            <ul className="mt-8 grid gap-8 md:grid-cols-3">
              {related.map((item) => {
                const itemDate = formatBlogDate(item.publishedAt);
                return (
                  <li key={item._id}>
                    <Link href={`/blog/${item.slug}`} className="group block">
                      <p className="text-xs font-medium tracking-wide text-zinc-400">
                        {item.categories?.[0]?.title || "GEO"}
                      </p>
                      <h3 className="mt-2 text-lg font-medium tracking-tight group-hover:text-[#2462ff]">
                        {item.title}
                      </h3>
                      {item.excerpt ? (
                        <p className="mt-2 text-sm leading-relaxed text-zinc-500">
                          {item.excerpt}
                        </p>
                      ) : null}
                      <p className="mt-3 text-xs tabular-nums text-zinc-400">
                        {itemDate.date} {itemDate.year}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-zinc-400 group-hover:text-[#2462ff]">
                        Read
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}
      </div>
    </article>
  );
}
