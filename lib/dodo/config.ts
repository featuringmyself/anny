import "server-only";

/**
 * Server-only Dodo Payments configuration.
 * One Audit product with localized pricing — never trust product IDs from the client.
 */
export type DodoEnvironment = "test_mode" | "live_mode";

export function getDodoEnvironment(): DodoEnvironment {
  const raw = (process.env.DODO_PAYMENTS_ENVIRONMENT ?? "live_mode").trim();
  if (raw === "test_mode" || raw === "live_mode") return raw;
  throw new Error(
    `Invalid DODO_PAYMENTS_ENVIRONMENT "${raw}". Use test_mode or live_mode.`,
  );
}

export function getDodoApiKey(): string {
  const key = process.env.DODO_PAYMENTS_API_KEY?.trim();
  if (!key) {
    throw new Error("Missing DODO_PAYMENTS_API_KEY environment variable.");
  }
  return key;
}

export function getDodoWebhookKey(): string {
  const key = process.env.DODO_PAYMENTS_WEBHOOK_KEY?.trim();
  if (!key) {
    throw new Error("Missing DODO_PAYMENTS_WEBHOOK_KEY environment variable.");
  }
  return key;
}

/**
 * Single one-time Audit product (INR base + localized USD by country).
 * Prefer DODO_PAYMENTS_PRODUCT_ID_AUDIT; falls back to the older India env name.
 */
export function getAuditProductId(): string {
  const id =
    process.env.DODO_PAYMENTS_PRODUCT_ID_AUDIT?.trim() ||
    process.env.DODO_PAYMENTS_PRODUCT_ID_AUDIT_INDIA?.trim();

  if (!id) {
    throw new Error(
      "Missing DODO_PAYMENTS_PRODUCT_ID_AUDIT (single product with localized pricing).",
    );
  }
  return id;
}

export function isAuditCheckoutConfigured(): boolean {
  return Boolean(
    process.env.DODO_PAYMENTS_API_KEY?.trim() &&
      (process.env.DODO_PAYMENTS_PRODUCT_ID_AUDIT?.trim() ||
        process.env.DODO_PAYMENTS_PRODUCT_ID_AUDIT_INDIA?.trim()),
  );
}

/** Known product ID for this deployment — used by webhook guards. */
export function isKnownAuditProductId(productId: string | undefined): boolean {
  if (!productId) return false;
  try {
    return productId === getAuditProductId();
  } catch {
    return false;
  }
}
