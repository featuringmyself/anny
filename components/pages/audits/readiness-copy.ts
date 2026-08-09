import type { ReadinessAudienceMode } from "./types";

/** Pick plain vs technical copy; fall back to the shared field when no technical variant. */
export function readinessCopy(
  mode: ReadinessAudienceMode,
  plain: string,
  technical?: string,
): string {
  if (mode === "technical" && technical) return technical;
  return plain;
}
