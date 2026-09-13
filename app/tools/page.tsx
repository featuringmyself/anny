import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import { Eyebrow } from "@/components/pages/shared/eyebrow";
import { PageBreadcrumbs } from "@/components/pages/shared/PageBreadcrumbs";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, webpageJsonLd } from "@/lib/seo";

export const TOOLS_PATH = "/tools";
export const TOOLS_TITLE = "Free SEO and AI tools";
export const TOOLS_DESCRIPTION =
  "Free public tools from Anny: AI readiness checker, AI crawlability checker, and Domain Rating lookup. No signup.";

const TOOLS_DATE_PUBLISHED = "2026-08-20";
const TOOLS_DATE_MODIFIED = "2026-09-13";

const tools = [
  {
    href: "/tools/ai-readiness-checker",
    name: "AI readiness checker",
    body: "See if ChatGPT can crawl and name a site. Get a 0–100 score plus copy-paste robots.txt, JSON-LD, and sitemap fixes.",
  },
  {
    href: "/tools/ai-crawlability-checker",
    name: "AI crawlability checker",
    body: "Check which AI crawlers (GPTBot, ClaudeBot, PerplexityBot, and more) can fetch a site, with robots.txt fixes.",
  },
  {
    href: "/tools/domain-rating-checker",
    name: "Domain Rating checker",
    body: "Look up any domain’s Ahrefs Domain Rating (0–100). No account required.",
  },
] as const;

export const metadata: Metadata = pageMetadata({
  path: TOOLS_PATH,
  title: TOOLS_TITLE,
  description: TOOLS_DESCRIPTION,
});

function toolsJsonLd() {
  const webpage = webpageJsonLd({
    path: TOOLS_PATH,
    title: TOOLS_TITLE,
    description: TOOLS_DESCRIPTION,
    datePublished: TOOLS_DATE_PUBLISHED,
    dateModified: TOOLS_DATE_MODIFIED,
  });
  const { "@context": _c1, ...webpageRest } = webpage;
  const breadcrumb = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Tools", path: TOOLS_PATH },
  ]);
  const { "@context": _c2, ...breadcrumbRest } = breadcrumb;

  return {
    "@context": "https://schema.org",
    "@graph": [
      webpageRest,
      breadcrumbRest,
      {
        "@type": "ItemList",
        "@id": `${absoluteUrl(TOOLS_PATH)}#tool-list`,
        name: TOOLS_TITLE,
        itemListElement: tools.map((tool, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: tool.name,
          url: absoluteUrl(tool.href),
        })),
      },
    ],
  };
}

export default function ToolsIndexPage() {
  return (
    <main className="bg-[#f6f7f4]">
      <JsonLd data={toolsJsonLd()} />
      <section className="border-b border-zinc-200 bg-white px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <PageBreadcrumbs
            className="mb-6"
            items={[
              { name: "Home", href: "/" },
              { name: "Tools" },
            ]}
          />
          <Eyebrow className="text-sm font-medium">Free tools</Eyebrow>
          <h1 className="mt-3 text-4xl font-medium tracking-tight text-zinc-900 md:text-5xl">
            {TOOLS_TITLE}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500 text-balance sm:text-lg">
            {TOOLS_DESCRIPTION}
          </p>

          <ul className="mt-12 divide-y divide-zinc-200 border-y border-zinc-200">
            {tools.map((tool) => (
              <li key={tool.href}>
                <Link
                  href={tool.href}
                  className="group block py-7 transition-colors"
                >
                  <h2 className="text-xl font-medium tracking-tight text-zinc-900 group-hover:text-[#2462ff]">
                    {tool.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500">
                    {tool.body}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
