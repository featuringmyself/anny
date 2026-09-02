import Image, { type StaticImageData } from "next/image";

type DashboardScreenshotProps = {
  src: StaticImageData;
  alt: string;
  sizes: string;
  priority?: boolean;
  caption?: string;
};

export function DashboardScreenshot({
  src,
  alt,
  sizes,
  priority = false,
  caption,
}: DashboardScreenshotProps) {
  return (
    <figure className="relative aspect-16/10 w-full overflow-hidden bg-[#fafafa]">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-top"
        sizes={sizes}
        priority={priority}
        placeholder="blur"
      />
      {caption ? <figcaption className="sr-only">{caption}</figcaption> : null}
    </figure>
  );
}
