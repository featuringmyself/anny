# Agency-light home retarget — revert guide

Copy-only home retarget toward agencies & brand studios (no layout/CTA changes).

## Fastest revert

**If these changes are still uncommitted** (current state as of this doc):

```bash
git restore \
  app/layout.tsx \
  components/Footer.tsx \
  components/Home/hero.tsx \
  components/Home/metric.tsx \
  components/Home/searchisShifting.tsx \
  components/Home/trackModelsThatMatter.tsx \
  components/faq.tsx
```

**If already committed** as a dedicated commit:

```bash
git revert <commit-sha>
# or reset that commit if it has not been pushed
```

**If mixed with other commits**, restore pre-retarget strings using the table below.

Optional: delete this file after reverting.

---

## Files touched

| File | What changed |
|---|---|
| `components/Home/hero.tsx` | Eyebrow, H1 muted line, subhead |
| `components/Home/metric.tsx` | Descriptions for tiles 1, 5, 6 only |
| `components/Home/searchisShifting.tsx` | Dark-panel closer paragraph |
| `components/Home/trackModelsThatMatter.tsx` | Typo `Ammy` → `Anny` |
| `components/faq.tsx` | First answer wording + new “Is Anny for agencies?” FAQ |
| `components/Footer.tsx` | Brand tagline |
| `app/layout.tsx` | `metadata.description` |

---

## Before → after (exact copy)

### Hero (`components/Home/hero.tsx`)

| Element | Before (revert to) | After |
|---|---|---|
| Eyebrow | `Your customers are asking AI instead of Google` | `Your clients' customers are asking AI instead of Google` |
| H1 muted | `for marketing teams` | `for agencies & brand studios` |
| Subhead | `…mentions your brand, which sources it cites, and what to do to get mentioned more.` | `…mentions a brand you work on, which sources it cites, and what to do to get mentioned more.` |

### Metrics (`components/Home/metric.tsx`) — 3 descriptions only

| Tile | Before (revert to) | After |
|---|---|---|
| 1 Track visibility | `…mention your brand. Tracked daily…` | `…mention each brand you monitor. Tracked daily…` |
| 5 Competitors | `See which competitors AI mentions for your target queries.…` | `See which of your clients' competitors AI mentions for your target queries.…` |
| 6 Mentions | `Most businesses have no idea what AI says about them.…` | `Most agencies and brands have no idea what AI says about them.…` |

Tiles 2–4 and all titles: unchanged.

### Search / GEO (`components/Home/searchisShifting.tsx`)

| Element | Before (revert to) | After |
|---|---|---|
| Closer | `Either you get mentioned in AI answers or lose the sale to your competitors.` | `Either your clients get mentioned in AI answers or they lose the sale to competitors.` |

### Models (`components/Home/trackModelsThatMatter.tsx`)

| Element | Before | After |
|---|---|---|
| Subcopy | `Ammy tracks ChatGPT…` | `Anny tracks ChatGPT…` |

Keep the `Anny` typo fix even if you revert the agency wording elsewhere.

### FAQ (`components/faq.tsx`)

| Change | Before (revert to) | After |
|---|---|---|
| First answer | `…if your company gets mentioned…` | `…if your brand or your clients get mentioned…` |
| New FAQ | *(delete entire item)* | Question: `Is Anny for agencies?` — answer points to `/features/agencies` |

### Footer (`components/Footer.tsx`)

| Before (revert to) | After |
|---|---|
| `AI search analytics for marketing teams` | `AI search analytics for agencies & brand studios` |

### Metadata (`app/layout.tsx`)

| Before (revert to) | After |
|---|---|
| `Track how often ChatGPT, Claude, Gemini, and Perplexity mention your brand. Monitor AI answers, sources, and competitor visibility in one dashboard.` | `Built for agencies and brand studios. Track how often ChatGPT, Claude, Gemini, and Perplexity mention the brands you work on. Monitor AI answers, sources, and competitor visibility in one dashboard.` |

---

## Out of scope (do not touch when reverting)

- Demo mock (Attio)
- Navbar / “Talk to sales” CTA
- `/features/agencies`, `/partnership/agencies`
- Layout, PatternStrip, motion
