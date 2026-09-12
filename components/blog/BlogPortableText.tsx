import { PortableText, type PortableTextComponents } from "next-sanity";

import SanityImage from "@/components/blog/SanityImage";
import { slugify } from "@/lib/blog/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => {
      const text = childrenToText(children);
      return (
        <h2
          id={slugify(text)}
          className="mt-12 scroll-mt-24 text-xl font-medium tracking-tight text-zinc-900 md:text-2xl"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      const text = childrenToText(children);
      return (
        <h3
          id={slugify(text)}
          className="mt-8 scroll-mt-24 text-lg font-medium tracking-tight text-zinc-900"
        >
          {children}
        </h3>
      );
    },
    blockquote: ({ children }) => (
      <blockquote className="border-l-2 border-[#2462ff] pl-5 text-[15px] leading-relaxed text-zinc-600 italic">
        {children}
      </blockquote>
    ),
    normal: ({ children }) => (
      <p className="text-[15px] leading-relaxed text-zinc-500">{children}</p>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-10">
        <SanityImage
          value={value}
          width={1400}
          className="w-full"
          sizes="(min-width: 768px) 672px, 100vw"
        />
        {value?.caption ? (
          <figcaption className="mt-3 text-center text-sm text-zinc-400">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-zinc-700">{children}</strong>
    ),
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href = value?.href || "";
      const external = href.startsWith("http");
      return (
        <a
          href={href}
          className="font-medium text-[#2462ff] underline-offset-4 hover:underline"
          rel={external ? "noreferrer noopener" : undefined}
          target={external ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-500">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-5 text-[15px] leading-relaxed text-zinc-500">
        {children}
      </ol>
    ),
  },
};

function childrenToText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return childrenToText(
      (children as { props?: { children?: unknown } }).props?.children,
    );
  }
  return "";
}

export function BlogPortableText({ value }: { value: unknown }) {
  if (!Array.isArray(value) || value.length === 0) return null;
  return (
    <div className="space-y-5">
      <PortableText value={value} components={components} />
    </div>
  );
}

export function headingsFromBody(body: unknown) {
  if (!Array.isArray(body)) return [];
  return body.flatMap((block) => {
    if (
      !block ||
      typeof block !== "object" ||
      !("style" in block) ||
      (block.style !== "h2" && block.style !== "h3")
    ) {
      return [];
    }
    const text = Array.isArray(
      (block as { children?: { text?: string }[] }).children,
    )
      ? (block as { children: { text?: string }[] }).children
          .map((child) => child.text || "")
          .join("")
      : "";
    if (!text) return [];
    return [{ id: slugify(text), text, style: block.style as "h2" | "h3" }];
  });
}
