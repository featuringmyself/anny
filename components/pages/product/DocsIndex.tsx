import Link from "next/link";

import {
  docArticles,
  navSections,
} from "@/components/pages/product/docs/articles";
import type { DocBlock } from "@/components/pages/product/docs/types";

function Block({ block }: { block: DocBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-[15px] leading-relaxed text-zinc-500">{block.text}</p>
      );
    case "h2":
      return (
        <h3 className="mt-10 text-lg font-medium tracking-tight text-zinc-900">
          {block.text}
        </h3>
      );
    case "h3":
      return (
        <h4 className="mt-8 text-base font-medium tracking-tight text-zinc-900">
          {block.text}
        </h4>
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
    case "callout":
      return (
        <aside className="border border-zinc-200 bg-zinc-50/80 px-4 py-3">
          <p className="text-xs font-medium tracking-wide text-[#2462ff] uppercase">
            {block.title}
          </p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-600">
            {block.text}
          </p>
        </aside>
      );
    default:
      return null;
  }
}

export default function DocsIndex() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-[14rem_1fr] lg:grid-cols-[16rem_1fr]">
      <aside className="border-b md:border-b-0 md:border-r">
        <nav className="sticky top-0 px-8 py-10 md:px-6 lg:px-8" aria-label="Docs outline">
          <p className="text-xs font-medium tracking-wide text-zinc-400 uppercase">
            Outline
          </p>
          <div className="mt-6 flex flex-col gap-8">
            {navSections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-medium text-zinc-900">{section.title}</p>
                <ul className="mt-3 flex flex-col gap-2 border-l border-zinc-200">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block border-l-2 border-transparent py-0.5 pl-3 text-sm text-zinc-500 hover:border-[#2462ff] hover:text-zinc-900"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      </aside>

      <div className="px-8 py-10 md:px-10 lg:px-12">
        <header className="max-w-2xl">
          <h2 className="text-2xl font-medium tracking-tight">Guides</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Core paths for marketing teams shipping GEO with Anny. Updated for the
            Aug 2026 product surface.
          </p>
        </header>

        <div className="mt-12 max-w-2xl">
          {docArticles.map((article) => (
            <article
              key={article.id}
              id={article.id}
              className="scroll-mt-8 border-t py-12 first:border-t-0 first:pt-0"
            >
              <p className="text-xs font-medium tracking-wide text-[#2462ff] uppercase">
                {article.section}
              </p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight text-zinc-900">
                {article.title}
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                {article.dek}
              </p>
              <p className="mt-3 text-xs tabular-nums text-zinc-400">
                Updated {article.updatedAt}
              </p>
              <div className="mt-8 space-y-5">
                {article.body.map((block, index) => (
                  <Block key={`${article.id}-${index}`} block={block} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
