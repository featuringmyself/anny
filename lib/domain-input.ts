import * as z from "zod";

const HOSTNAME =
  /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;

export function normalizeDomainInput(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  try {
    const url = new URL(
      /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
        ? trimmed
        : `https://${trimmed}`,
    );
    return url.hostname.replace(/\.$/, "").toLowerCase();
  } catch {
    return trimmed
      .replace(/^[a-z][a-z0-9+.-]*:\/\//i, "")
      .split(/[/?#]/)[0]
      .split(":")[0]
      .replace(/\.$/, "")
      .toLowerCase();
  }
}

export const domainInputSchema = z
  .string({ error: "Enter a domain." })
  .trim()
  .min(1, "Enter a domain.")
  .transform(normalizeDomainInput)
  .pipe(z.string().regex(HOSTNAME, "Enter a valid domain."));

export function parseDomainParam(
  value: string | string[] | undefined,
): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw?.trim()) return "";

  const parsed = domainInputSchema.safeParse(raw);
  return parsed.success ? parsed.data : normalizeDomainInput(raw);
}
