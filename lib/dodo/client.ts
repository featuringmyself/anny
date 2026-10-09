import "server-only";

import DodoPayments from "dodopayments";

import { getDodoApiKey, getDodoEnvironment } from "@/lib/dodo/config";

const globalForDodo = globalThis as typeof globalThis & {
  _dodoPaymentsClient?: DodoPayments;
};

/**
 * Shared Dodo Payments SDK client for Route Handlers / Server Actions.
 * Reuses one instance per process (Next.js / Fluid Compute).
 */
export function getDodoClient(): DodoPayments {
  if (!globalForDodo._dodoPaymentsClient) {
    globalForDodo._dodoPaymentsClient = new DodoPayments({
      bearerToken: getDodoApiKey(),
      environment: getDodoEnvironment(),
    });
  }
  return globalForDodo._dodoPaymentsClient;
}
