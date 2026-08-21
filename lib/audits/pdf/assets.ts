import path from "path";

/** Resolve a public/ path (e.g. /audits/2gethr/01.png) to an absolute file path. */
export function publicAssetPath(src: string): string {
  const cleaned = src.replace(/^\//, "");
  return path.join(process.cwd(), "public", cleaned);
}
