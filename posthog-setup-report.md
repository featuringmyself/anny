# PostHog setup report

PostHog analytics is initialized for the Next.js App Router app across browser and server. Traffic is split across `www.dodoxhq.com` and `anny.dodoxhq.com`; tracing headers cover both (plus apex and the live `window` host).

## What was set up

- **Installed:** `posthog-js` and `posthog-node` (see `package.json` / `bun.lock`).
- **Browser initialization:** `instrumentation-client.ts` initializes the shared `posthog-js` client with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`. Client events post via `/ingest`. `tracing_headers` includes `www.dodoxhq.com`, `anny.dodoxhq.com`, `dodoxhq.com`, and `window.location.hostname`.
- **Server initialization:** `lib/posthog-server.ts` uses env-backed config, returns `null` when absent, and flushes before returning from handlers.
- **Privacy:** Product analytics may run on visit under legitimate interest. There is no CMP / consent-banner gate and no `opt_in_capturing` gate in code (see `/privacy` section 1).
- **Environment:** Documented in `.env.example` (`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST`, plus `DB_URI` / optional `DB_NAME`, `AHREF_API_KEY`).

## Events instrumented

| Event | What it measures | File |
|---|---|---|
| `sales_dialog_opened` | Visitor opens the sales-demo contact dialog from a tracked CTA. | `components/talk-to-sales.tsx` |
| `sales_demo_requested` | Validated sales lead is persisted through the primary server action. | `app/actions/contact.ts` |
| `contact_submission_failed` | Primary sales-lead submission fails after validation succeeds. | `app/actions/contact.ts` |
| `contact_api_submitted` | Validated sales lead is persisted through the programmatic contact API. | `app/api/v1/contact/route.tsx` |
| `pricing_tier_cta_clicked` | Visitor selects a pricing-tier call to action. | `components/pages/product/PricingTierMotion.tsx` |
| `register_cta_clicked` | Visitor clicks Register / Get started (Navbar, home hero/CTA, home plans). | `components/register-cta-link.tsx` (+ Navbar/Home) |
| `register_submitted` / `register_submission_failed` | `/register` signup persisted or failed. | `app/actions/register.ts` |
| `faq_item_expanded` | Visitor expands an FAQ answer while evaluating the product. | `components/faq.tsx` |
| `press_email_clicked` | Media visitor starts an email quote request. | `components/pages/partnership/media/QuoteRequest.tsx` |
| `ai_instructions_copied` | Visitor copies the AI-assistant brand instruction template. | `components/pages/ai-instructions/AiInstructionsBlock.tsx` |
| `audit_checkout_started` / `audit_checkout_paid` / `audit_checkout_*` | Audit checkout funnel (client start + webhook fulfill). | `AuditCheckoutButton.tsx`, `fulfill-audit-payment.ts` |
| Tool lookups (`ai_readiness_*`, `ai_crawlability_*`, `domain_rating_*`) | Tool page/API checks; personless UUID capture when tracing header missing. | `lib/*-analytics.ts` |

Removed / not instrumented: `agency_partner_email_clicked` (dead event from an earlier wizard pass).

## Identification and attribution

- Contact / register server actions merge the browser anonymous id via `$anon_distinct_id` when `ph_distinct_id` is present (`PostHogDistinctIdField` polls until ready).
- Audit checkout passes `ph_distinct_id` through Dodo session metadata so `payment.succeeded` identify can merge the browser journey.
- Tool API routes capture even when `X-POSTHOG-DISTINCT-ID` is missing (generated UUID + `personlessProperties`).
- **Deferred:** do not unify `lead.id` / `signup.id` / `paymentId` distinct IDs across funnels in this pass.

## Error tracking

- `app/global-error.tsx` captures boundary errors with `captureException`.
- `instrumentation-client.ts` enables client exception capture.
- `lib/posthog-server.ts` enables `posthog-node` exception autocapture.

## Dashboard

[Analytics basics (wizard)](https://us.posthog.com/project/528755/dashboard/1924326)

## Hosts / ops notes

- Expect pageviews on both `www` and `anny` hosts; same-origin fetch tracing must list both.
- Zero-volume for some events is often traffic (e.g. Domain Rating / press pages), not a missing token. Register arrivals without `?plan=` usually come from Navbar/home CTAs — those now emit `register_cta_clicked`.
- After deploy: one prod click each for pricing tier CTA, Talk-to-sales submit, DR check; compare Mongo leads/signups/audit orders to PostHog if server events still look missing.
