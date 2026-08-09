import "server-only";

/** Distinct IDs PostHog silently rejects for person merges. */
const BLOCKED_DISTINCT_IDS = new Set([
  "",
  "null",
  "undefined",
  "none",
  "0",
  "anonymous",
  "guest",
  "distinct_id",
  "id",
  "email",
  "true",
  "false",
  "[object object]",
  "nan",
]);

/**
 * Read the browser anonymous distinct id from a form or JSON body.
 * Used to merge client journeys onto server-identified people via `$anon_distinct_id`.
 */
export function readAnonymousDistinctId(
  source: FormData | Record<string, unknown> | null | undefined,
): string | undefined {
  if (!source) return undefined;

  const raw =
    source instanceof FormData
      ? source.get("ph_distinct_id")
      : source.ph_distinct_id;

  if (typeof raw !== "string") return undefined;

  const value = raw.trim();
  if (!value || value.length > 200) return undefined;
  if (BLOCKED_DISTINCT_IDS.has(value.toLowerCase())) return undefined;

  return value;
}

/** Person properties for identify(), optionally linking the browser anonymous id. */
export function identifyProperties(
  properties: Record<string, string | number | boolean | null | undefined>,
  anonymousDistinctId?: string,
): Record<string, string | number | boolean | null | undefined> {
  if (!anonymousDistinctId) return properties;
  return { ...properties, $anon_distinct_id: anonymousDistinctId };
}

/** Properties for personless / anonymous server events (cheaper, no person profile). */
export function personlessProperties(
  properties: Record<string, string | number | boolean | null | undefined> = {},
): Record<string, string | number | boolean | null | undefined> {
  return {
    ...properties,
    $process_person_profile: false,
  };
}
