import * as z from "zod";

export const SERP_CHECKER_PATH = "/tools/serp-overview-checker";

export const SERP_COUNTRIES = [
  { code: "us", label: "United States" },
  { code: "gb", label: "United Kingdom" },
  { code: "ca", label: "Canada" },
  { code: "au", label: "Australia" },
  { code: "in", label: "India" },
  { code: "de", label: "Germany" },
  { code: "fr", label: "France" },
  { code: "es", label: "Spain" },
  { code: "it", label: "Italy" },
  { code: "nl", label: "Netherlands" },
  { code: "br", label: "Brazil" },
  { code: "mx", label: "Mexico" },
  { code: "jp", label: "Japan" },
  { code: "sg", label: "Singapore" },
  { code: "ae", label: "United Arab Emirates" },
  { code: "za", label: "South Africa" },
  { code: "ie", label: "Ireland" },
  { code: "nz", label: "New Zealand" },
  { code: "se", label: "Sweden" },
  { code: "pl", label: "Poland" },
] as const;

export type SerpCountryCode = (typeof SERP_COUNTRIES)[number]["code"];

const COUNTRY_CODES = new Set<string>(
  SERP_COUNTRIES.map((country) => country.code),
);

export const DEFAULT_SERP_COUNTRY: SerpCountryCode = "us";

export function normalizeKeyword(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}

export const keywordInputSchema = z
  .string({ error: "Enter a keyword." })
  .transform(normalizeKeyword)
  .pipe(
    z
      .string()
      .min(1, "Enter a keyword.")
      .max(200, "Keep the keyword under 200 characters."),
  );

export const countryInputSchema = z
  .string()
  .trim()
  .toLowerCase()
  .pipe(
    z
      .string()
      .refine((value): value is SerpCountryCode => COUNTRY_CODES.has(value), {
        error: "Pick a supported country.",
      }),
  );

export function parseKeywordParam(
  value: string | string[] | undefined,
): string {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw?.trim()) return "";

  const parsed = keywordInputSchema.safeParse(raw);
  return parsed.success ? parsed.data : normalizeKeyword(raw);
}

export function parseCountryParam(
  value: string | string[] | undefined,
): SerpCountryCode {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = countryInputSchema.safeParse(raw ?? DEFAULT_SERP_COUNTRY);
  return parsed.success ? parsed.data : DEFAULT_SERP_COUNTRY;
}

export function countryLabel(code: SerpCountryCode): string {
  return (
    SERP_COUNTRIES.find((country) => country.code === code)?.label ??
    code.toUpperCase()
  );
}
