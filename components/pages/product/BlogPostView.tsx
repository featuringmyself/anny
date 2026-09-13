import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, User } from "lucide-react";

import BlogFaqs from "@/components/blog/BlogFaqs";
import BlogOnThisPage from "@/components/blog/BlogOnThisPage";
import {
  BlogPortableText,
  headingsFromBody,
} from "@/components/blog/BlogPortableText";
import SanityImage from "@/components/blog/SanityImage";
import { TalkToSalesButton } from "@/components/talk-to-sales";
import type { BlogPostArticle } from "@/lib/blog/types";
import { formatBlogDate, readingTimeMinutes } from "@/lib/blog/types";

export default function BlogPostView({ post }: { post: BlogPostArticle }) {
  const { date, year, long } = formatBlogDate(post.publishedAt);
  const category = post.categories?.[0]?.title;
  const minutes = readingTimeMinutes(post.bodyText || post.excerpt);
  const faqs = (post.faqs || []).filter((faq) => faq.question && faq.answer);
  const related =
    (post.related && post.related.length > 0 ? post.related : post.morePosts) ||
    [];
  const headings = headingsFromBody(post.body);

  return (
    <article className="overflow-x-clip">
      <header className="border-b px-5 py-10 md:px-12 md:py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-[#2462ff]"
        >
          <ArrowLeft className="size-3.5" strokeWidth={2} aria-hidden />
          Blog
        </Link>
        {category ? (
          <p className="mt-5 text-sm font-medium tracking-wide text-[#2462ff] md:mt-6">
            {category}
          </p>
        ) : null}
        <h1 className="mt-3 max-w-3xl text-[1.75rem] leading-tight font-medium tracking-tight text-balance sm:text-3xl md:text-5xl">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-4 max-w-2xl text-base text-zinc-500 text-balance md:text-lg">
            {post.excerpt}
          </p>
        ) : null}
        <div className="mt-5 flex flex-col gap-1.5 text-sm text-zinc-400 sm:mt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-1">
          <time dateTime={post.publishedAt || undefined}>
            {long || `${date} ${year}`}
          </time>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" strokeWidth={1.75} aria-hidden />
            {minutes} min read
          </span>
          {post.author?.name ? (
            <span className="inline-flex items-center gap-1.5">
              <User className="size-3.5" strokeWidth={1.75} aria-hidden />
              {post.author.name}
              {post.author.role ? ` · ${post.author.role}` : ""}
            </span>
          ) : null}
        </div>
      </header>

      {post.coverImage?.asset ? (
        <div className="border-b px-5 py-6 md:px-12 md:py-8">
          <SanityImage
            value={post.coverImage}
            width={1600}
            className="aspect-video w-full md:aspect-16/8"
            sizes="100vw"
            priority
          />
        </div>
      ) : null}

      <div className="px-5 py-10 md:px-12 md:py-16">
        <div className="mx-auto grid max-w-5xl lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12">
          <BlogOnThisPage headings={headings} />

          <div className="mx-auto w-full min-w-0 max-w-2xl space-y-5 wrap-break-word lg:col-start-1 lg:row-start-1">
            <BlogPortableText value={post.body} />

            <BlogFaqs faqs={faqs} />

            {post.author?.bio ? (
              <aside className="mt-10 border border-zinc-200 bg-zinc-50/80 p-5 md:mt-14 md:p-6">
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

            <aside className="mt-12 border-t pt-8 md:mt-16 md:pt-10">
              <p className="text-lg font-medium tracking-tight">
                See what AI says about your brand
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                Anny tracks visibility, answer position, sentiment, and sources
                across ChatGPT, Gemini, AI Mode, and more, so you can close the
                gaps that cost you recommendations.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/register"
                  className="inline-flex h-11 w-full items-center justify-center rounded-md bg-[#2462ff] px-4 text-sm font-medium text-white hover:bg-[#1d4ed8] sm:h-10 sm:w-auto"
                >
                  Start free trial
                </Link>
                <TalkToSalesButton
                  source={`blog-${post.slug}`}
                  variant="outline"
                  className="h-11 w-full sm:h-10 sm:w-auto"
                >
                  Talk to sales
                </TalkToSalesButton>
              </div>
            </aside>
          </div>
        </div>

        {related.length > 0 ? (
          <section className="mx-auto mt-14 max-w-5xl border-t pt-10 md:mt-20 md:pt-12" aria-labelledby="related-heading">
            <h2
              id="related-heading"
              className="text-xl font-medium tracking-tight md:text-2xl"
            >
              Keep reading
            </h2>
            <ul className="mt-6 grid gap-8 sm:mt-8 md:grid-cols-3">
              {related.map((item) => {
                const itemDate = formatBlogDate(item.publishedAt);
                const itemCategory = item.categories?.[0]?.title;
                return (
                  <li key={item._id}>
                    <Link href={`/blog/${item.slug}`} className="group block">
                      {itemCategory ? (
                        <p className="text-xs font-medium tracking-wide text-zinc-400">
                          {itemCategory}
                        </p>
                      ) : null}
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
