export const REGISTER_PLANS = ["Starter", "Pro", "Advanced"] as const;

export type RegisterPlan = (typeof REGISTER_PLANS)[number];

export function isRegisterPlan(value: string): value is RegisterPlan {
  return (REGISTER_PLANS as readonly string[]).includes(value);
}

/** Normalize `?plan=` from App Router `searchParams` (string | string[]). */
export function parseRegisterPlan(
  raw: string | string[] | undefined,
): RegisterPlan | undefined {
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return undefined;
  return isRegisterPlan(value) ? value : undefined;
}
