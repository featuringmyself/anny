import "server-only";

/**
 * Best-effort in-process rate limit for checkout session creation.
 * Per Fluid Compute instance — enough to blunt casual curl spam.
 */

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

type Bucket = {
  timestamps: number[];
};

const globalForLimit = globalThis as typeof globalThis & {
  _auditCheckoutRateLimit?: Map<string, Bucket>;
};

function store(): Map<string, Bucket> {
  if (!globalForLimit._auditCheckoutRateLimit) {
    globalForLimit._auditCheckoutRateLimit = new Map();
  }
  return globalForLimit._auditCheckoutRateLimit;
}

export function clientIpFromRequest(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

/**
 * Returns true if the request is allowed, false if rate-limited.
 */
export function allowAuditCheckoutRequest(ip: string): boolean {
  const now = Date.now();
  const key = ip || "unknown";
  const buckets = store();
  const bucket = buckets.get(key) ?? { timestamps: [] };
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < WINDOW_MS);

  if (bucket.timestamps.length >= MAX_REQUESTS) {
    buckets.set(key, bucket);
    return false;
  }

  bucket.timestamps.push(now);
  buckets.set(key, bucket);
  return true;
}
