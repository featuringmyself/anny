# PostHog setup report

PostHog analytics was initialized for the Next.js App Router app, nine events were instrumented or documented, lead identification and error tracking were added, and a starter dashboard was created.

## What was set up

- **Installed:** `posthog-js` (`^1.407.2`, resolved as 1.407.7) and `posthog-node` (`^5.46.1`, resolved as 5.46.1) were already declared in `package.json` and present in `bun.lock`; no dependency changes were needed.
- **Browser initialization:** `instrumentation-client.ts` initializes the shared `posthog-js` client with `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`. Default capture behavior was preserved, and no provider or duplicate initialization was added.
- **Server initialization:** `lib/posthog-server.ts` uses the environment-backed server configuration, safely returns `null` when configuration is absent, and enables server exception autocapture. Server handlers flush before returning.
- **Proxy:** Existing `next.config.ts` rewrites for `/ingest`, `/ingest/static`, and `/ingest/array` were retained.
- **Environment:** `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` were added to `.env.example` and configured in `.env`. Deployment environments still need these values configured.

## Events instrumented

The event plan records these nine core events. The run verified their source locations and capture contracts through source review; it did **not** observe events arriving in PostHog.

| Event | What it measures | File |
|---|---|---|
| `sales_dialog_opened` | Visitor opens the sales-demo contact dialog from a tracked CTA. | `components/talk-to-sales.tsx` |
| `sales_demo_requested` | Validated sales lead is persisted through the primary server action. | `app/actions/contact.ts` |
| `contact_submission_failed` | Primary sales-lead submission fails after validation succeeds. | `app/actions/contact.ts` |
| `contact_api_submitted` | Validated sales lead is persisted through the programmatic contact API. | `app/api/v1/contact/route.tsx` |
| `pricing_tier_cta_clicked` | Visitor selects a pricing-tier call to action. | `components/pages/product/PricingTierMotion.tsx` |
| `faq_item_expanded` | Visitor expands an FAQ answer while evaluating the product. | `components/faq.tsx` |
| `press_email_clicked` | Media visitor starts an email quote request. | `components/pages/partnership/media/QuoteRequest.tsx` |
| `agency_partner_email_clicked` | Agency visitor starts a partnership email conversation. | `components/pages/partnership/agencies/AgenciesPartnerHero.tsx` |
| `ai_instructions_copied` | Visitor copies the AI-assistant brand instruction template. | `components/pages/ai-instructions/AiInstructionsBlock.tsx` |

## Identification and attribution

Identification was wired for successful server-side contact submissions after the lead is persisted. The MongoDB-generated lead ObjectId is used as the stable distinct ID; email, name, and company are person properties rather than event properties. Failed submissions use a per-failure anonymous identity and bounded error information.

Browser-side identification was skipped because this marketing app has no implemented login, registration, session, or logout flow. Browser CTA events therefore remain anonymous. Production event delivery and attribution were not browser-exercised, so the run cannot confirm that events flow or that server-side lead events arrive with the expected identity.

## Error tracking

- `app/global-error.tsx` was added as the App Router global error boundary and captures the boundary error once with `captureException`, while preserving the reset action.
- `instrumentation-client.ts` already enables client exception capture.
- `lib/posthog-server.ts` enables `posthog-node` exception autocapture.

The run verified these code paths by source review and a successful build, but did not trigger a production browser or server exception to confirm delivery.

## Dashboard

[Analytics basics (wizard)](https://us.posthog.com/project/528755/dashboard/1924326)

The dashboard contains five saved insights covering sales conversion, lead events over time, pricing CTA activity, content engagement, and partnership interest. The dashboard and insights are live, but are expected to remain empty until matching events arrive; the run did not observe populated event data.

## Verification and conflicts

- `bun install` completed successfully with 613 installs checked and no lockfile changes.
- `bun run build` passed, including TypeScript checks and static page generation.
- `bun run lint` completed with zero errors and one existing warning in untouched `components/Footer.tsx`: `socials` is assigned but never used.
- No event delivery, app startup, test suite, or production browser exercise was performed. A passing build proves compilation, not event capture.

## Before you merge

- [ ] Run a full production build and fix any lint or type errors introduced by the integration; the run passed `bun run build`, while lint retained the pre-existing warning in `components/Footer.tsx` (`socials` is assigned but never used).
- [ ] Run the test suite and update any mocks or fixtures affected by the instrumented call sites.
- [ ] Confirm `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST` are present in `.env.example` and configured in every deployment environment, not only local `.env`.
- [ ] Exercise the instrumented CTA, contact success/failure, FAQ, partnership, and AI-instructions paths in a deployed environment and confirm the expected events arrive in PostHog.
- [ ] Trigger a representative browser and server error in a safe environment and confirm exception events arrive in PostHog.
- [ ] Review `instrumentation-client.ts`, `app/actions/contact.ts`, and `app/api/v1/contact/route.tsx` to confirm the deployed configuration and stable lead ID attribution match the intended production setup.
