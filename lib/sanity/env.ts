export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "07zs46ej";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-09-12";
/** Hosted Studio from anny-cms (`studioHost: "anny"`). Required when stega is enabled. */
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "https://anny.sanity.studio";

if (!projectId) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
}

if (!dataset) {
  throw new Error("Missing NEXT_PUBLIC_SANITY_DATASET");
}
