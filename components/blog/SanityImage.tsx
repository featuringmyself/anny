import { Image } from "next-sanity/image";

import type { SanityImageValue } from "@/lib/blog/types";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";

export default function SanityImage({
  value,
  alt,
  width = 1200,
  height,
  className,
  sizes,
  priority = false,
}: {
  value?: SanityImageValue | null;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (!value?.asset) return null;

  const aspectRatio = value.asset.metadata?.dimensions?.aspectRatio || 1.5;
  const resolvedHeight = height ?? Math.round(width / aspectRatio);
  const src = urlFor(value)
    .width(width)
    .height(resolvedHeight)
    .fit("crop")
    .url();

  return (
    <Image
      src={src}
      alt={alt || value.alt || ""}
      width={width}
      height={resolvedHeight}
      sizes={sizes}
      priority={priority}
      className={cn("bg-zinc-100 object-cover", className)}
      placeholder={value.asset.metadata?.lqip ? "blur" : "empty"}
      blurDataURL={value.asset.metadata?.lqip || undefined}
    />
  );
}
