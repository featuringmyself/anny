import Link from "next/link";

import type { BlogBlock, BlogPost } from "@/components/pages/product/blog/types";
import { TalkToSalesButton } from "@/components/talk-to-sales";

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-relaxed text-zinc-500">{block.text}</p>
      );
    case "h2":
      return (
        <h2 className="mt-12 text-xl font-medium tracking-tight text-zinc-900 md:text-2xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 className="mt-8 text-lg font-medium tracking-tight text-zinc-900">
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
            <cite className="mt-2 block text-sm not-italic text-zinc-400">
              — {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    default:
      return null;
  }
}

export default function BlogPostView({ post }: { post: BlogPost }) {
  return (
    <article>
      <header className="border-b px-8 py-14 md:px-12 md:py-16">
        <Link
          href="/blog"
          className="text-sm font-medium text-zinc-400 hover:text-[#2462ff]"
        >
          ← Blog
        </Link>
        <p className="mt-6 text-sm font-medium tracking-wide text-[#2462ff]">
          {post.category}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-medium tracking-tight text-balance md:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-500 text-balance">
          {post.dek}
        </p>
        <p className="mt-6 text-sm tabular-nums text-zinc-400">
          {post.date} {post.year}
        </p>
      </header>

      <div className="px-8 py-12 md:px-12 md:py-16">
        <div className="mx-auto max-w-2xl space-y-5">
          {post.body.map((block, index) => (
            <Block key={`${post.slug}-${index}`} block={block} />
          ))}

          <aside className="mt-16 border-t pt-10">
            <p className="text-lg font-medium tracking-tight">
              See what AI says about your brand
            </p>
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
              Anny tracks visibility, answer position, sentiment, and sources
              across ChatGPT, Gemini, AI Mode, and more — so you can close the
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
      </div>
    </article>
  );
}
