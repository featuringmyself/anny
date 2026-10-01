# Dodox SEO audit — decisions log

Cold-start memory for future sessions. Entries are judgment calls from the
proactive SEO/AEO audit of https://dodoxhq.com (2026-10-01). Not a changelog of
code edits — this audit was read-only for site content.

---

## 2026-10-01 — Growth stage: treat as early/growth (confirmed)

**Decision:** Weight all SEO recommendations toward crawl readiness and coverage,
not CTR polish or mature-site optimization.

**Chose over:** Treating the site as mature/plateaued based only on page count or
schema sophistication.

**Why:** Owner confirmed near-zero traffic. `SITE_DATE_PUBLISHED` is 2026-07-24.
Live sitemap has 43 URLs. Proactive audit with nothing reported broken. Per
`seo-growth-stage-strategy`, that combination is early/growth.

**Revisit when:** Sustained organic traffic appears in GSC, or coverage of the
core GEO/AEO topic space looks reasonably complete.

---

## 2026-10-01 — Preferred host: resolve www vs apex before other SEO work

**Decision:** Treat apex↔www host mismatch as P0 ahead of on-page polish.

**Chose over:** Leaving dual-host signals alone “because redirects work for
users.”

**Why:** Live serving host is `www.dodoxhq.com` (apex 308 → www). Canonicals,
sitemap `<loc>`, robots `Host`, and `llms.txt` links all declare
`https://dodoxhq.com`. Sitemap URLs therefore redirect before content. At
near-zero traffic this is the highest-leverage crawl/index fix.

**Revisit when:** One host is consistently declared in `SITE_URL`, canonicals,
sitemap, robots, and AEO files, and GSC shows clean coverage for that host.

---

## 2026-10-01 — FAQPage schema: keep for AEO if visible; do not chase Google rich results

**Decision:** Do not recommend building or optimizing for Google FAQ rich
results. Keep FAQ JSON-LD only where visible Q&A exists (citeability / AEO).

**Chose over:** Prioritizing FAQ schema expansion as an SEO win, or stripping
all FAQPage markup solely because rich results ended.

**Why:** Google Search Central updates document FAQ rich results no longer
appearing in Search as of 2026-05-07 (docs removed afterward). Dodox is not in
the historical gov/health eligibility set anyway. Visible FAQ content can still
help answer engines; inventing FAQ blocks for SERP chrome will not.

**Revisit when:** Google reinstates FAQ rich results for general sites (unlikely
— verify against current Search Central docs before changing this).

---

## 2026-10-01 — Do not audit uncommitted /audit offer as live

**Decision:** Separate working-tree WIP (`app/audit`, footer `/audit`,
exploreStrip, local sitemap/robots/llms) from what Google sees. Live `/audit`
is 404.

**Chose over:** Scoring the WIP offer page as an indexed coverage asset.

**Why:** Shipping footer/explore links to a 404 would create crawl/soft-404
noise. When the offer ships, release page + sitemap + llms + internal links
together.

**Revisit when:** `/audit` returns 200 on production and appears in the live
sitemap.

---

## 2026-10-01 — No invented volumes or backlink counts

**Decision:** Content opportunities are structural only. Backlink section is
“not quantified.”

**Chose over:** Estimating keyword volumes or referring-domain counts from
training data.

**Why:** Ahrefs MCP not authenticated; no GSC. Skill pack forbids fabricating
figures. Directional gap list still useful without volumes.

**Revisit when:** GSC and/or Ahrefs (or equivalent) are connected.

---

## 2026-10-01 — Plan sample `/fix` is not a product URL

**Decision:** Do not invent or prioritize a `/fix` page. Treat the plan’s live-sample `/fix` as a miss (404; no `app/fix` route). Closest live surfaces are `/faq` and (WIP) `/audit`.

**Chose over:** Building `/fix` just because the sample list named it.

**Why:** Code and live crawl both confirm no route. [Code SEO template analysis](1f4f02ed-4e2b-4ee0-bd98-4fa18d3ddf74) and [Live crawl sample pages](a7386668-06ed-4d89-b296-c6b29a4487b0) agree.

**Revisit when:** Product intentionally ships a “fix” SKU under that path.

---

## 2026-10-01 — GSC verification treated as complete (user-confirmed)

**Decision:** Treat Google Search Console setup for dodoxhq.com as done. Do not
keep GSC verification as a blocking P0 open item.

**Chose over:** Keeping GSC as a blocking P0 open flag until independently
re-verified in-session.

**Why:** Owner confirmed Search Console is set up (www/domain property + sitemap
assumed submitted).

**Revisit when:** After www host alignment deploys, re-check Coverage for
redirect/canonical noise.

---

## 2026-10-01 — Preferred host locked to www

**Decision:** Lock preferred host to `https://www.dodoxhq.com`. Updated
`SITE_URL` in `lib/site.ts` and bumped `SITE_DATE_MODIFIED` to 2026-10-01 so
canonicals, sitemap, robots, and AEO surfaces follow www.

**Chose over:** Flipping Vercel / DNS to serve apex as primary while leaving
code on apex declarations.

**Why:** Live production already 308 apex → www. Aligning code to the live
redirect avoids fighting the edge config and closes the P0 dual-host signal
gap from the earlier preferred-host decision.

**Revisit when:** Post-deploy GSC Coverage is clean for www; confirm no
remaining apex canonicals in CMS or generated markup. See open flag on
per-post `seo.canonicalUrl`.

---

## 2026-10-01 — AEO pricing synced; /audit links withheld

**Decision:** Sync `llms-base` / `llms-full` (and related AEO surfaces) to
current pricing ($150 / $300 / managed $250+). Strip `/audit` links from those
surfaces until the offer is live.

**Chose over:** Shipping WIP `/audit` nav/links alongside the pricing sync, or
leaving stale dollar amounts until the offer ships.

**Why:** Stale pricing misleads answer engines now; shipping `/audit` before
the page is 200 creates crawl/soft-404 noise (same rationale as “Do not audit
uncommitted /audit offer as live”).

**Revisit when:** `/audit` returns 200 on production — then restore offer links
in llms + nav + sitemap together.

---

## 2026-10-01 — YouTube citations post: INDEX (orphan was ISR/CDN skew)

**Decision:** Keep `youtube-citations-google-ai-overviews` indexable. No CMS or
GROQ change.

**Chose over:** Forcing a Sanity republish or query tweak on the assumption the
post was unpublished / `noIndex`.

**Why:** Sanity already has `publishedAt` set and `seo.noIndex` false;
`POSTS` / sitemap / RSS filters agree. Earlier “orphan” (in RSS/llms but missing
from blog index + sitemap) was ISR/CDN skew. Live www surfaces now all include
the post.

**Revisit when:** After deploy, spot-check blog index + sitemap still list it;
clear the apex `seo.canonicalUrl` open flag below.

---

## Open flags

| Flag | Why uncertain | Next check |
|------|----------------|------------|
| Full Google index inventory | GSC connected (owner-confirmed — see GSC verification entry); inventory review still pending after www deploy. SERP may still show stale “Product Hub / Anny / Signal” homepage snippet | After www host alignment deploy — review Coverage for redirect/canonical noise |
| YouTube post orphan (blog index + sitemap) | **Resolved** — INDEX; ISR/CDN skew, not CMS/GROQ. Live www includes post. | Spot-check post-deploy; then drop this row |
| Sanity `seo.canonicalUrl` on YouTube post still apex | Post canonical still `https://dodoxhq.com/blog/...` while `SITE_URL` is www | After deploy / CMS cleanup — set per-post canonicals to www |
| Creator affiliate disclosure wording | Affiliate language present; explicit “ad disclosure” phrasing not confirmed as sufficient | Legal pass when creator program is marketed widely |
| Case studies stay noindex | Intentional for private proof; trades away public E-E-A-T | Decide if sanitized public versions should be indexable |
| Soft-claim accuracy (Reddit / award-winning / #1 open-source) | Wording confirmed in templates; primary sources not verified this session | `verify-primary-source` pass before next services/footer edit |
| llms-full dollar amounts | **Resolved** — synced to $150 / $300 / managed $250+; `/audit` links stripped until live | Drop after next AEO deploy confirms live files |
