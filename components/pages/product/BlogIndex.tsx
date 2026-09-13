import Link from "next/link";
import { ArrowRight } from "lucide-react";

import BlogRowMotion from "@/components/pages/product/BlogRowMotion";
import { formatBlogDate } from "@/lib/blog/types";
import { getBlogPosts } from "@/lib/blog/content";

export default async function BlogIndex() {
  const { posts } = await getBlogPosts();

  if (posts.length === 0) {
    return (
      <section className="px-5 py-12 md:px-12 md:py-16">
        <h2 className="text-2xl font-medium tracking-tight">Nothing published yet</h2>
        <p className="mt-3 max-w-md text-zinc-500">
          Publish a post in Sanity Studio and it will appear here with sitemap,
          RSS, and structured data automatically.
        </p>
      </section>
    );
  }

  return (
    <section>
      <ul>
        {posts.map((post) => {
          const { date, year } = formatBlogDate(post.publishedAt);
          const category = post.categories?.[0]?.title;

          return (
            <li key={post._id} className="border-b last:border-b-0">
              <BlogRowMotion>
                <article>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group grid grid-cols-[auto_1fr] gap-4 px-5 py-8 md:grid-cols-[7rem_1fr] md:gap-10 md:px-12 md:py-12"
                  >
                    <div className="pt-0.5 md:pt-1">
                      <p className="text-2xl font-medium tracking-tight whitespace-nowrap tabular-nums md:text-4xl">
                        {date}
                      </p>
                      <p className="mt-1 text-sm text-zinc-400 tabular-nums">
                        {year}
                      </p>
                    </div>
                    <div className="min-w-0 border-l border-zinc-200 pl-4 md:pl-10">
                      {category ? (
                        <p className="text-xs font-medium tracking-wide text-zinc-400">
                          {category}
                        </p>
                      ) : null}
                      <h2 className="mt-1 text-lg font-medium tracking-tight text-balance group-hover:text-[#2462ff] md:text-2xl">
                        {post.title}
                      </h2>
                      {post.excerpt ? (
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 md:text-base">
                          {post.excerpt}
                        </p>
                      ) : null}
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 group-hover:text-[#2462ff]">
                        Read note
                        <ArrowRight
                          className="size-3.5 transition-transform group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                </article>
              </BlogRowMotion>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
