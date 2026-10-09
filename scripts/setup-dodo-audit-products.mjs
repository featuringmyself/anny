#!/usr/bin/env node
/**
 * Ensures the single Audit product has localized pricing:
 *   base: INR (India)
 *   by_country US: USD
 *
 * Requires products:write. Prints the env line to paste.
 *
 *   bun run dodo:setup-audit
 */
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import DodoPayments from "dodopayments";

function loadEnv(path) {
  if (!existsSync(path)) return {};
  const out = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    out[t.slice(0, i)] = t.slice(i + 1);
  }
  return out;
}

const env = loadEnv(resolve(process.cwd(), ".env"));
const key = (
  env.DODO_PAYMENTS_API_KEY ||
  process.env.DODO_PAYMENTS_API_KEY ||
  ""
).trim();
const mode = (
  env.DODO_PAYMENTS_ENVIRONMENT ||
  process.env.DODO_PAYMENTS_ENVIRONMENT ||
  "test_mode"
).trim();

const existingId = (
  env.DODO_PAYMENTS_PRODUCT_ID_AUDIT ||
  env.DODO_PAYMENTS_PRODUCT_ID_AUDIT_INDIA ||
  ""
).trim();

/** Match live Dodo product amounts */
const BASE_INR_MINOR = 500_000; // ₹5,000
const US_USD_MINOR = 10_000; // $100

if (!key) {
  console.error("Missing DODO_PAYMENTS_API_KEY in .env");
  process.exit(1);
}

const client = new DodoPayments({ bearerToken: key, environment: mode });

const description =
  "AI visibility audit across ChatGPT, Claude, Gemini, Grok, and Perplexity: standing, why content gets or misses citations, what to publish next, and a ranked backlog. 49 prompts. 5-day turnaround.";

async function ensureProduct() {
  if (existingId) {
    const product = await client.products.retrieve(existingId);
    console.log(`Using existing product: ${product.product_id} (${product.name})`);
    console.log(
      `  pricing_mode=${product.pricing_mode} base=${product.price?.price} ${product.price?.currency}`,
    );
    return product;
  }

  const product = await client.products.create({
    name: "Dodox Audit",
    description,
    tax_category: "saas",
    pricing_mode: "by_country",
    price: {
      type: "one_time_price",
      currency: "INR",
      price: BASE_INR_MINOR,
      discount: 0,
      purchasing_power_parity: false,
    },
    metadata: {
      offer: "audit",
      sku: "audit",
    },
    digital_product_delivery: {
      instructions:
        "We'll confirm your payment, lock the 49-prompt set for your brand, and deliver the Audit report within 5 days. Questions: hello@dodoxhq.com",
    },
  });
  console.log(`Created product: ${product.product_id}`);
  return product;
}

async function ensureUsLocalizedPrice(productId) {
  const listed = await client.products.localizedPrices.list(productId);
  const usRule = (listed.items || []).find(
    (r) => r.mode === "by_country" && r.country_code === "US" && r.currency === "USD",
  );

  if (usRule) {
    if (usRule.amount !== US_USD_MINOR) {
      await client.products.localizedPrices.update(usRule.id, {
        product_id: productId,
        amount: US_USD_MINOR,
      });
      console.log(`Updated US localized price → ${US_USD_MINOR} USD cents`);
    } else {
      console.log(`US localized price OK: ${usRule.id} (${usRule.amount} cents)`);
    }
    return usRule.id;
  }

  const created = await client.products.localizedPrices.create(productId, {
    amount: US_USD_MINOR,
    currency: "USD",
    country_code: "US",
  });
  console.log(`Created US localized price: ${created.id}`);
  return created.id;
}

try {
  const product = await ensureProduct();

  if (product.pricing_mode !== "by_country") {
    console.warn(
      `Warning: pricing_mode is "${product.pricing_mode}". Set it to by_country in the Dodo dashboard for localized USD.`,
    );
  }

  await ensureUsLocalizedPrice(product.product_id);

  // Smoke-test both markets (needs checkout_sessions:write)
  for (const market of [
    { label: "india", country: "IN", currency: "INR" },
    { label: "international", country: "US", currency: "USD" },
  ]) {
    try {
      const session = await client.checkoutSessions.create({
        product_cart: [{ product_id: product.product_id, quantity: 1 }],
        billing_currency: market.currency,
        billing_address: { country: market.country },
        return_url: "https://www.dodoxhq.com/audit/success",
        cancel_url: "https://www.dodoxhq.com/audit#pricing",
        metadata: { offer: "audit", market: market.label, source: "setup-script" },
        feature_flags: { allow_currency_selection: false },
      });
      console.log(
        `Checkout ${market.label} OK (${session.session_id}) url=${Boolean(session.checkout_url)}`,
      );
    } catch (error) {
      console.error(
        `Checkout ${market.label} failed:`,
        error?.message || error,
      );
      if (String(error?.message || "").includes("checkout_sessions:write")) {
        console.error(
          "\nGrant checkout_sessions:write on the API key (Editor), then re-test /audit.\n",
        );
      }
    }
  }

  console.log(`\n# Paste into .env and Vercel (${mode})\n`);
  console.log(`DODO_PAYMENTS_ENVIRONMENT=${mode}`);
  console.log(`DODO_PAYMENTS_PRODUCT_ID_AUDIT=${product.product_id}`);
  console.log("");
} catch (error) {
  console.error(error?.message || error);
  if (String(error?.message || "").includes("products:write")) {
    console.error(
      "\nYour API key is read-only. Create an Editor key with products:write + checkout_sessions:write.\n",
    );
  }
  process.exit(1);
}
