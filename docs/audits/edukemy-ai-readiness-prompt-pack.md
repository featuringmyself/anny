# Edukemy — AI Readiness Report: prompt pack

Everything needed to produce `edukemy-ai-readiness-report.ts` in the same shape as the
Linkrunner, Gethr, Rentok, Sprentzo and Truliv readiness reports.

Run the prompts in order. Stage A is the part that needs a human in front of a browser
taking screenshots. Stage B is a crawl an agent can run unattended — a first pass is
already done and the numbers are in the appendix, so most of Stage B is verification
rather than discovery. Stage C turns the gathered material into the TypeScript file.

**Target artefact**

| Thing | Value |
| --- | --- |
| Data file | `components/pages/audits/data/edukemy-ai-readiness-report.ts` |
| Export | `edukemyAiReadinessReport: ReadinessReport` |
| Slug | `edukemy-ai-readiness-report` |
| Registered in | `components/pages/audits/data/index.ts` as `{ kind: "readiness", report: … }` |
| Renders at | `/audits/reports/edukemy-ai-readiness-report` |
| Type | `ReadinessReport` in `components/pages/audits/types.ts` |
| Screenshots | `public/audits/edukemy/NN-slugified-prompt.png` |

One thing worth deciding up front: a `ReadinessReport` has no `queries` field, so it
**does not render screenshots**. The Stage A captures are still worth taking — they are
what makes the summary, the insights and the sprint pitch concrete, and they are the
source of the "cited in N of 14" stat — but if the goal is to show the screenshots on the
page, that is a `VisibilityReport` and it ships as a second file
(`edukemy-ai-visibility-report.ts`), exactly like Linkrunner and Gethr each have both.

---

## Stage A — discovery prompts (run and screenshot)

Fourteen prompts, run fresh in a logged-out or temporary chat so personalisation does not
leak in. Run all fourteen in **ChatGPT** first — that is the citation rate quoted in the
report. Then run the starred ones in **Perplexity, Gemini, Claude, Google AI Mode and
Grok** for the `agents`-adjacent narrative and any model-specific gaps.

For each one record: was Edukemy named, at what rank, which brands were named instead,
and what sources the answer cited.

### Category discovery — is Edukemy on the shortlist at all

**A1 ★**

```
Which are the best UPSC civil services coaching institutes in India right now? Give me a shortlist with why each one is on it.
```

*Intent: the top-of-funnel shortlist. Expect Vision IAS, Drishti IAS, Vajiram & Ravi, Rau's IAS, ForumIAS, Next IAS, Shankar IAS, Insights IAS, Unacademy, StudyIQ. Whether Edukemy appears here is the headline number.*

**A2 ★**

```
Best online UPSC coaching for a working professional who can only study evenings and weekends. Name specific institutes and programmes.
```

*Intent: online-first segment, which is how Edukemy positions itself in its own title tag.*

**A3**

```
Which UPSC coaching institute should a complete beginner join for the 2027 attempt? I have no background in the syllabus.
```

*Intent: beginner intent, the largest paying cohort.*

**A4 ★**

```
Best IAS coaching in Delhi — compare the main options for a full-time aspirant.
```

*Intent: Edukemy has a page built for exactly this query (`/best-ias-coaching-in-delhi`). If a purpose-built landing page still does not surface, that is an authority finding, not a content finding.*

### The differentiator — Geography optional

**A5 ★**

```
Who are the best teachers for Geography optional for UPSC? Name the teacher and where they teach.
```

*Intent: Shabbir Sir is the sharpest entity Edukemy owns. The site has a whole page for him (`/best-upsc-general-studies-and-geography-teacher-shabbir-sir`). Test whether the person entity resolves to the institute.*

**A6**

```
I want to take Geography as my UPSC optional. Which coaching offers a Geography optional foundation course with a test series, online?
```

*Intent: product-level match against `/upsc/geography-optional-by-shabbir-sir-foundation-course` and `/upsc/geography-optional-enrichment-with-test-series`.*

**A7**

```
Compare the top Geography optional courses for UPSC on price, duration and test series coverage.
```

*Intent: whether the rate card is retrievable. Course pages carry visible prices and zero `Course`/`Offer` markup, so the expectation is that Edukemy is absent from any priced comparison.*

### Product and proof

**A8 ★**

```
Which UPSC coaching has the best GS mains answer-writing and mentorship programme?
```

*Intent: matches `/upsc/gs-integrated-mentorship-program` and `/upsc/gs-mains-mentorship-program-led-by-shabbir-sir`.*

**A9**

```
Best essay writing course or programme for UPSC mains. Name institutes.
```

*Intent: matches `/upsc/upsc-essay`.*

**A10**

```
Where can I get free daily current affairs for UPSC preparation? Which sites do you recommend?
```

*Intent: the most important one on this list. Edukemy has ~23,000 daily current affairs URLs and ~3,000 monthly CA URLs in its sitemaps — by volume its single biggest asset. If it is not cited here, nothing else on the site will get cited either.*

**A11**

```
Which UPSC coaching institutes have produced the most toppers in the last three years? Give names and results.
```

*Intent: `/upsc-toppers` exists with 47 H3s of topper content and no `Person`, `Review` or `Course` markup. Tests whether results are retrievable as facts.*

**A12**

```
Recommend an affordable UPSC coaching programme under ₹1 lakh that still includes personal mentorship.
```

*Intent: price-qualified shortlist.*

### Brand and comparison

**A13 ★**

```
Is Edukemy a good UPSC coaching institute? What do reviews and past students say?
```

*Intent: the brand-direct query. Watch for hedging ("limited information available", "relatively less known"), for confusion with other edtech names, and for which third-party sources the model reaches for — Careers360, Shiksha, Quora, Reddit r/UPSC, YouTube. Those sources are the off-site work list.*

**A14 ★**

```
Edukemy vs Vision IAS vs Drishti IAS — which should I pick for GS foundation? Compare on faculty, fees and results.
```

*Intent: head-to-head. Note whether the model can state Edukemy's fees at all, given no priced markup exists anywhere on the site.*

### Entity comprehension — readiness, not visibility

These three are the ones that speak directly to a *readiness* report. They test whether a
model that is explicitly pointed at the site can read it correctly. Run each in ChatGPT
and Claude with browsing on.

**A15**

```
Go to https://edukemy.com/ and tell me: what does this company do, who is it for, what does it cost, and where is it based?
```

*Intent: the homepage has no `<h1>`, no `Organization` or `EducationalOrganization` markup, and a single `FAQPage` block. Whatever the model gets wrong or hedges on here is a direct, quotable readiness failure.*

**A16**

```
From https://edukemy.com/upsc/guided-courses, list every course with its price and duration in a table.
```

*Intent: prices are rendered text with zero structured data. Errors, omissions and refusals here are the evidence for the "make the rate card machine-readable" quick win.*

**A17**

```
Using only https://edukemy.com/, tell me which SSC, banking and state PSC exams Edukemy prepares students for.
```

*Intent: `robots.txt` disallows ~33 path patterns including `*/ssc/*`, `*/banking/*`, `*/cuet/*`, `*/bpsc/*`, `*/mppsc/*`, `*/ibps-po/*` and more. This prompt makes the self-inflicted blocking visible — the model should be unable to answer about entire product lines.*

### Capture convention

Save to `public/audits/edukemy/` as `NN-slugified-prompt.png` — matching
`public/audits/linkrunner/` and the rest. Full answer visible, sources panel expanded
where the model has one.

```
01-best-upsc-coaching-institutes-india.png
02-best-online-upsc-coaching-working-professionals.png
03-upsc-coaching-for-complete-beginner-2027.png
04-best-ias-coaching-in-delhi.png
05-best-geography-optional-teachers-upsc.png
06-geography-optional-foundation-course-with-test-series.png
07-compare-geography-optional-courses-price.png
08-best-gs-mains-mentorship-programme.png
09-best-essay-course-upsc-mains.png
10-free-daily-current-affairs-upsc.png
11-upsc-coaching-with-most-toppers.png
12-affordable-upsc-coaching-under-1-lakh.png
13-is-edukemy-good-reviews.png
14-edukemy-vs-vision-ias-vs-drishti-ias.png
15-what-is-edukemy-from-homepage.png
16-guided-courses-price-table.png
17-ssc-banking-state-psc-coverage.png
```

---

## Stage B — technical audit prompts

A first crawl pass is done and the results are in the appendix. Run these to confirm and
to fill the gaps flagged as **open**. Each block maps onto a specific field in
`ReadinessReport`, so keep the outputs separated the same way.

Give the agent this preamble once:

```
You are auditing https://edukemy.com/ for AI readiness. Fetch live URLs — do not rely on memory or cached knowledge. For every claim, give the exact HTTP status, content-type and byte count, or the exact count of elements found. Never report a 200 as a success without checking the content-type: this site returns its homepage HTML shell for unknown top-level paths, so a 200 with text/html on a path that should return text/plain or application/json is a soft 404, not a hit. Audit these pages: /, /upsc/guided-courses, /upsc/gs-integrated-mentorship-program, /about-us, /upsc-toppers, /best-ias-coaching-in-delhi, /pages/faq-s, /blog.
```

**B1 — site files** → `categories[id=cat-site-files]`, `agents`, `agentsIntro`, `llmsTxtFound`, `discoverySignals`

```
Fetch /robots.txt and report it in full. List every User-agent group and every Allow/Disallow rule. Answer specifically: (a) is there any AI-crawler-specific group — GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, GoogleOther, CCBot, Bytespider, Applebot-Extended, Amazonbot, MistralAI-User, DuckAssistBot, YouBot — or does everything fall through to the wildcard group? (b) count the Disallow patterns and list which product lines they block. (c) for each of those blocked patterns, fetch one live URL underneath it and report whether real content exists there. (d) then fetch /sitemap.xml, follow every child sitemap, and report per child: URL count, lastmod count, oldest and newest lastmod value.
```

**B2 — agent discovery** → `categories[id=cat-agent-discovery]`, `discoverySignals`

```
Probe each of these and report status, content-type, byte count and the first 200 bytes of the body: /llms.txt, /llms-full.txt, /agents.md, /skill.md, /index.md, /.well-known/mcp.json, /.well-known/webmcp/tools.json, /.well-known/mcp/server-card.json, /.well-known/agent-skills/index.json, /.well-known/ucp. Classify each as REAL, SOFT-404 (200 but HTML shell) or 404. Also check the homepage response headers and <head> for link rel="alternate" type="text/markdown" and <link rel="mcp">.
```

**B3 — structured data** → `categories[id=cat-schema]`, `insights`, `quickWins`

```
For each audited page, extract every application/ld+json block. Report per page: block count, every @type present, whether each block parses as valid JSON, and whether an @id is used. Then answer: (a) does any page outside /blog carry Organization or EducationalOrganization? (b) does any course page carry Course, Offer or PriceSpecification, given prices are visible on the page? (c) does /upsc-toppers carry Person, Review or AggregateRating? (d) which pages have a visible FAQ with no FAQPage markup? (e) is BreadcrumbList present anywhere outside /blog? Also check for Microdata and RDFa.
```

**B4 — content structure and semantics** → `categories[id=cat-content]`, `[id=cat-semantics]`

```
For each audited page report: count of h1, h2, h3, h4; the text of every h1; counts of header, main, nav, footer, section, article, aside, figure, figcaption; counts of div and span; and total word count in visible text. Flag pages with zero h1, more than one h1, or heading-level skips. Compute the semantic-landmark ratio per page.
```

**B5 — images** → `categories[id=cat-images]`, `automation.groups`

```
For each audited page count total <img>, images missing an alt attribute, images with alt="", and images whose alt is generic or a filename — for example an alt ending .jpg/.png/.webp, or text like "image", "icon", "banner", "hero". Quote up to 10 offending alt values verbatim with their src. Separate genuinely decorative images from meaningful ones that need description. Count <figcaption> across all images.
```

**B6 — forms and agent automation** → `automation` (all fields)

```
Find every form on the audited pages. For each control report: name, type, required, whether it has an associated <label>, whether it has an autocomplete attribute, and whether it is aria-hidden or tabindex="-1". Flag any required control an automated agent could not fill. Check whether the homepage lead form is a same-origin form or an embedded third-party form (look for forms.office.com) and, if embedded, whether an agent can reach the fields at all. Check for CAPTCHA. Classify each finding P1 (blocks an agent from completing the action) or P2 (degrades comprehension), and give the offending markup as a one-line example string.
```

**B7 — SEO fundamentals and freshness** → `categories[id=cat-seo]`, `[id=cat-freshness]`

```
For each audited page report title text and character count, meta description text and character count, canonical URL, presence of Open Graph and Twitter card tags, and any robots meta. Flag titles outside 30–60 chars and descriptions outside 50–160 chars. Then for freshness: find any visible published or updated dates, the footer copyright year, and the newest lastmod in the sitemaps. Note any stale or contradictory dates against today's date.
```

**B8 — internal linking and entity authority** → `categories[id=cat-linking]`, `[id=cat-entity-proof]`

```
From the homepage list every unique internal link and group them into hubs. Then list every external link and its hostname. Answer: which social and third-party profiles does the site link to, and are they declared in any sameAs array? Search for Edukemy on Careers360, Shiksha, Collegedunia, Justdial, Google Business Profile, Crunchbase, LinkedIn, Wikidata, Reddit r/UPSC and Quora — report which exist, how well populated they are, and which are not linked from the site. These are the off-site targets for the sprint.
```

**B9 — rendering** → sanity check on everything above

```
Fetch / and /upsc/guided-courses with JavaScript disabled and compare the static HTML against the rendered DOM. Report whether the main content, prices, course listings and FAQ answers are present in the server-rendered HTML. Anything that only exists after hydration should be treated as invisible to crawlers that do not execute JavaScript.
```

---

## Stage C — assembly prompt

Run this once Stage A and Stage B outputs are in hand. Paste both sets of raw findings
underneath it.

```
Write components/pages/audits/data/edukemy-ai-readiness-report.ts.

It exports `edukemyAiReadinessReport` typed as `ReadinessReport` from ../types. Read
components/pages/audits/types.ts for the exact shape, and read
components/pages/audits/data/linkrunner-ai-readiness-report.ts and
truliv-ai-readiness-report.ts first — match their voice, density and level of detail
exactly. Then register the report in components/pages/audits/data/index.ts as
{ kind: "readiness", report: edukemyAiReadinessReport } and run tsc and eslint.

Field values:
- slug "edukemy-ai-readiness-report", company "Edukemy", website "edukemy.com"
- industry: UPSC / civil services exam preparation — online and offline coaching
- preparedFor, role, email: <fill in>
- dateLabel: <Month Year>
- private: true
- ctaUrl "https://cal.com/dodox/quick-chat", ctaLabel "Book a quick chat"

Rules for the writing:

1. Every claim carries a number, a status code, a count or a quoted string from the
   findings below. If a sentence would survive being pasted into another company's
   report, it is too generic — cut it or make it specific.
2. Two registers. `body` is for a non-technical reader: plain sentences, no selectors,
   no status codes, no jargon. `bodyTechnical` is for an engineer: exact counts, exact
   paths, HTTP statuses, content-types, schema @types, selector strings. Same finding,
   different altitude. Same rule for `summary` / `summaryTechnical`,
   `agentsIntro` / `agentsIntroTechnical`, and the automation group summaries.
3. No hedging and no filler. Do not write "it is important to note", "in today's
   AI-driven landscape", or anything that reads like a template. Lead each insight with
   the finding, not the context.
4. Where the site does something well, say so plainly and briefly. A readiness report
   that is only bad news is not credible.
5. Do not invent findings. If a Stage B item came back inconclusive, leave it out
   rather than guessing.

Structure:

- `overallScore` out of 100, `scoreLabel` a one-word human label consistent with the
  score — prior reports use "Strong" at 82 and "Poor" at 39. Justify the score against
  the categories rather than picking a round number.
- `tagline`: one sentence, the single sharpest finding.
- `summary`: 120–200 words, the whole argument in one paragraph.
- `stats`: exactly 4, the four numbers that carry the argument.
- `insights`: 3–5, each a distinct structural finding. Title is a claim, not a topic.
- `quickWins`: 4–6, each with honest Impact and Effort. Order by impact.
- `categories`: use these ids so the report matches its siblings — cat-site-files,
  cat-entity-proof, cat-schema, cat-agent-discovery, cat-seo, cat-freshness,
  cat-content, cat-semantics, cat-images, cat-linking. Each gets a status of
  "good" | "needs-improvement" | "poor" and 2–4 `metrics` rows with short values.
- `automation`: overall status and body, totalIssues, p1Count, p2Count, and groups
  with real markup strings in `examples`.
- `agents`: one row per bot in AI_AGENT_BOTS (see lib/ai-readiness-full.ts) with the
  allowed value derived from the actual robots.txt rules, not assumed.
- `discoverySignals`: one row per Stage B2 probe. Anything returning 200 with an HTML
  body must be `found: false` with a note saying it is an HTML shell, not a real file.
- `sprint`: 90-day AI Visibility Sprint. Headline and body must argue from this site's
  specific findings, and `outcomes` must name the actual fixes — not generic
  deliverables.
- `ctaHeadline`: reference the two real numbers, readiness score and citation rate.

Findings follow.

## Stage A — discovery results
<paste: per prompt, model, cited yes/no, rank, brands named instead, sources cited>

## Stage B — crawl results
<paste raw output from B1–B9>
```

---

## Appendix — first crawl pass, already done

Live fetches against `edukemy.com`, 2 September 2026. These are real numbers, not
estimates. Verify before publishing, but they are enough to see the shape of the report.

### Headline signals

| Signal | Finding |
| --- | --- |
| Homepage `<h1>` | **0** — no H1 anywhere on `/` |
| Homepage headings | 0 h1, 0 h2, 12 h3, 25 h4 — the hierarchy starts at level 3 |
| Homepage JSON-LD | **1 block, `FAQPage` only** — no `Organization`, no `EducationalOrganization` |
| `Organization` markup | Present on `/blog` only. Absent from every commercial page |
| Course pages | `/upsc/guided-courses` and `/upsc/gs-integrated-mentorship-program` carry **0 JSON-LD** with prices visible on page |
| Landmarks on `/` | 0 `header`, 0 `article`, 2 `section`, 1 `footer`, 1 `nav` against **474 `div`** |
| `robots.txt` | No AI-crawler group at all. Single `User-agent: *` with **33 Disallow patterns** |
| Blocked product lines | `*/ssc/*`, `*/banking/*`, `*/cuet/*`, `*/bpsc/*`, `*/mppsc/*`, `*/uppsc/*`, `*/ibps-po/*`, `*/sbi-po/*`, `*/rrb-ntpc/*`, `*/news/*` and 23 more |
| `/llms.txt` | 200 but **321 KB of `text/html`** — the homepage shell. Soft 404 |
| Sitemap total | ~**30,285 URLs** across 7 child sitemaps |
| Sitemap index lastmod | 6 of 7 children stamped **2024-01-03**; only `blog-sitemap.xml` is newer (2025-04-04) |
| `general.xml` | 23 URLs, **0 lastmod** |
| Meta description | **245 chars** on `/` — well past the ~160 truncation point |
| Homepage form | Embedded **`forms.office.com`** iframe. 16 inputs, 4 labels, 0 `autocomplete` |

### The one-line version

The blog is better marked up than the business. `/blog` ships `Organization`, `WebSite`,
`Article`, `BreadcrumbList`, `Person` and `SearchAction` across 5 JSON-LD blocks with real
landmarks. The homepage and every course page — the pages that take money — ship a lone
`FAQPage`, no H1 and no entity markup at all.

### Per-page crawl

| Page | Title | Desc | H1 | H2 | JSON-LD types | Landmarks | Images |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `/` | 67 ch | 245 ch | 0 | 0 | FAQPage | main 2, section 2, footer 1 | 61, 5 filename alts |
| `/upsc/guided-courses` | 60 ch | 124 ch | 2 | 22 | — | main 1, section 1 | 38 |
| `/upsc/gs-integrated-mentorship-program` | 66 ch | 148 ch | 2 | 29 | — | section 1 | 31 |
| `/about-us` | 47 ch | 79 ch | 2 | 0 | — | section 1 | 64, **20 empty alt** |
| `/upsc-toppers` | 22 ch | 180 ch | 1 | 2 | — | none | 57, **3 missing alt** |
| `/pages/faq-s` | 24 ch | 260 ch | 1 | 0 | FAQPage | section 3 | 6 |
| `/best-ias-coaching-in-delhi` | 63 ch | 192 ch | 1 | 3 | — | section 2 | 12 |
| `/blog` | 14 ch | 325 ch | 1 | 13 | Organization, WebSite, WebPage, Article, Person, BreadcrumbList, ImageObject, SearchAction | header 1, article 13, section 6, footer 1 | 3 |

Two H1s on three pages, zero on the homepage, and title lengths from 14 to 67 characters.

### Discovery probes

| Path | Status | Content-type | Verdict |
| --- | --- | --- | --- |
| `/llms.txt` | 200 | `text/html` 321 KB | Soft 404 — HTML shell |
| `/llms-full.txt` | 200 | `text/html` 321 KB | Soft 404 |
| `/agents.md` | 200 | `text/html` 321 KB | Soft 404 |
| `/skill.md` | 200 | `text/html` 321 KB | Soft 404 |
| `/index.md` | 200 | `text/html` | Soft 404 — no markdown twins |
| `/.well-known/mcp.json` | 200 | `text/html` 0 B | Soft 404, empty body |
| `/.well-known/ucp` | 200 | `text/html` 0 B | Soft 404, empty body |
| `/.well-known/webmcp/tools.json` | 404 | — | Real 404 |
| `/.well-known/mcp/server-card.json` | 404 | — | Real 404 |
| `/.well-known/agent-skills/index.json` | 404 | — | Real 404 |
| `<link rel="mcp">` | — | — | Not present |

Worth calling out in the report: because unknown top-level paths return the homepage, any
automated readiness checker will score `/llms.txt`, `/agents.md` and `/skill.md` as
**present**. They are not. The catch-all route is manufacturing false positives, and the
same catch-all means agents probing for those files get 321 KB of marketing HTML instead
of a 404 they can act on.

### Sitemaps

| Child | URLs | With lastmod | Index lastmod |
| --- | --- | --- | --- |
| `general.xml` | 23 | **0** | 2024-01-03 |
| `courses.xml` | 23 | 23 | 2024-01-03 |
| `dailyca.xml` | **23,036** | 23,036 | 2024-01-03 |
| `geoca.xml` | 2,428 | 2,428 | 2024-01-03 |
| `monthlyca.xml` | 3,050 | 3,050 | 2024-01-03 |
| `resources.xml` | 1,712 | 1,712 | 2024-01-03 |
| `blog-sitemap.xml` | 13 | 13 | 2025-04-04 |

Roughly 30,000 current-affairs and resource URLs is a serious content asset — this is the
strongest thing Edukemy has for AI retrieval, and prompt A10 tests whether any of it is
actually being cited.

### Other

- Homepage sends `Cache-Control: no-store, private` — every AI fetch is a full origin hit.
- 1 Open Graph tag, 0 Twitter card tags.
- Canonical present on all pages checked.
- External links: YouTube, Facebook, Instagram, LinkedIn. No `sameAs` array declares them
  outside `/blog`, so the entity graph does not connect the brand to its own profiles.
- `GPTBot` user-agent fetches `/` successfully (200) — access is not the problem.
- Static HTML contains ~1,717 words on `/`, so content is server-rendered. **Open:** B9
  still needs to confirm the same for course prices and listings.

### Still open

1. B1(c) — do the 33 blocked paths have live content behind them? Determines whether the
   `robots.txt` finding is "self-inflicted wound" or "correct pruning of thin pages".
2. B6 — can an agent reach the `forms.office.com` fields at all, and is there a
   same-origin enquiry form anywhere?
3. B8 — the third-party profile audit. Drives `cat-entity-proof` and the sprint's off-site
   work list.
4. B9 — server-rendered vs hydrated content on the course pages.
5. All of Stage A.
