import "server-only";

/** Strip accidental quotes from .env values like TOKEN='sk…' */
function readToken() {
  const raw = process.env.SANITY_API_READ_TOKEN;
  if (!raw) return undefined;
  const trimmed = raw.trim().replace(/^['"]|['"]$/g, "");
  return trimmed || undefined;
}

export const token = readToken();
