import Link from "next/link";

import BlogRowMotion from "@/components/pages/product/BlogRowMotion";

const posts = [
  {
    slug: "ai-mode-changed-the-serp",
    date: "Jul 21",
    year: "2026",
    title: "AI Mode changed the SERP — here's what to measure now",
    dek: "Why classic rank trackers miss the answers that actually drive clicks and trust.",
  },
  {
    slug: "chatgpt-mentions-playbook",
    date: "Jul 8",
    year: "2026",
    title: "A playbook for earning ChatGPT brand mentions",
    dek: "Prompt clusters, source gaps, and the content shapes models cite most often.",
  },
  {
    slug: "geo-vs-seo",
    date: "Jun 24",
    year: "2026",
    title: "GEO is not SEO with a new acronym",
    dek: "Citation share, answer position, and sentiment — the metrics marketing teams need.",
  },
  {
    slug: "agency-visibility-retainers",
    date: "Jun 9",
    year: "2026",
    title: "How agencies package AI visibility retainers",
    dek: "Reporting cadences and white-label scorecards that clients actually open.",
  },
  {
    slug: "gemini-source-chips",
    date: "May 27",
    year: "2026",
    title: "Reading Gemini’s source chips like a marketer",
    dek: "Which domains stick across turns, and how to get yours into the shortlist.",
  },
] as const;

export default function BlogIndex() {
  return (
    <section>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className="border-b last:border-b-0">
            <BlogRowMotion>
              <Link
                href={`/blog#${post.slug}`}
                id={post.slug}
                className="group grid grid-cols-[5.5rem_1fr] gap-6 px-8 py-10 md:grid-cols-[7rem_1fr] md:gap-10 md:px-12 md:py-12"
              >
                <div className="pt-1">
                  <p className="text-3xl font-medium tracking-tight tabular-nums md:text-4xl">
                    {post.date}
                  </p>
                  <p className="mt-1 text-sm text-zinc-400 tabular-nums">{post.year}</p>
                </div>
                <div className="min-w-0 border-l border-zinc-200 pl-6 md:pl-10">
                  <h2 className="text-xl font-medium tracking-tight text-balance group-hover:text-[#2462ff] md:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-500 md:text-base">
                    {post.dek}
                  </p>
                  <span className="mt-4 inline-block text-sm font-medium text-zinc-400 group-hover:text-[#2462ff]">
                    Read note →
                  </span>
                </div>
              </Link>
            </BlogRowMotion>
          </li>
        ))}
      </ul>
    </section>
  );
}
