import type { VisibilityReport } from "../types";

/** Private outreach report for 2gethr. Multi-model favorability snapshot, August 2026. */
export const gethrAiVisibilityReport: VisibilityReport = {
  slug: "2gethr-ai-visibility-report",
  company: "2gethr",
  website: "2gethr.com",
  industry: "Managed offices & GCC workspaces",
  preparedFor: "Amit Prakash",
  role: "Cofounder",
  email: "sales@2gethr.co.in",
  dateLabel: "August 2026",
  overallScore: 39,
  scoreLabel: "Lukewarm",
  private: true,
  tagline:
    "How positively AI describes 2gethr when it mentions you — separate from how often.",
  summary:
    "When AI engines mention 2gethr they are lukewarm: favorability 39/100, average rank #5, recommended on only 24% of runs. Mention depth is deep when it happens — Grok, Gemini, and Claude will praise pricing transparency and short lock-ins — but they almost always write “2gether,” not 2gethr. ChatGPT buries you at #8.8 with a generic India coworking note. Perplexity says public data is too thin to rank. Google AI Mode cites BookMyCoworking and Flexo (including a Mumbai URL) instead of 2gethr.com. AI Overviews skips you and benchmarks WeWork India and IndiQube. Strengths cluster on transparent, flexible, startup-friendly terms. Gaps cluster on enterprise ownership, customisation, and GCC-grade governance. On-site readiness is the other half of this: if the owned site has no schema, no FAQ, and no prices, models will keep quoting directories and the wrong spelling. Same 90-day sprint as the readiness audit.",
  stats: [
    { label: "Favorability", value: "39/100" },
    { label: "Recommended", value: "24%" },
    { label: "Avg rank", value: "#5" },
    { label: "Mention depth", value: "Deep" },
  ],
  queriesHeadline: "What AI says · 5 themes",
  queriesIntro:
    "48-run favorability snapshot across Grok, Gemini, Claude, ChatGPT, Perplexity, Google AI Mode, and AI Overviews. This is how positively they describe 2gethr when they mention you — not a raw mention count. Strengths 50%. Recommended 24%. Average rank #5.",
  modelScores: [
    { model: "grok", visibility: 80, cited: 4, total: 5, audited: true },
    { model: "gemini", visibility: 60, cited: 3, total: 5, audited: true },
    { model: "claude", visibility: 60, cited: 3, total: 5, audited: true },
    { model: "ai-mode", visibility: 60, cited: 3, total: 5, audited: true },
    { model: "chatgpt", visibility: 40, cited: 2, total: 5, audited: true },
    { model: "perplexity", visibility: 40, cited: 2, total: 5, audited: true },
    { model: "ai-overview", visibility: 0, cited: 0, total: 5, audited: true },
  ],
  competitors: [
    { name: "WeWork India", visibility: 72 },
    { name: "IndiQube", visibility: 64 },
    { name: "2gethr", visibility: 24 },
  ],
  schemaFindings: {
    id: "schema-gethr",
    title: "Owned site is not the source models quote",
    status: "0 types on 2gethr.com",
    types: [],
    severity: "high",
    body: "The favorability snapshot cites BookMyCoworking and Flexo for 2gethr pricing, not 2gethr.com. The on-site readiness audit found zero JSON-LD, so there is no Organization @id to stop engines writing “2gether,” and no Product/Offer/Service markup for per-seat rates. Grok claims all-inclusive pricing is on the website; Perplexity and ChatGPT say public data is thin. Until schema and visible prices live on the owned domain, directories and the misspelling will keep winning.",
    suggestedImprovements: [
      "Organization JSON-LD with legal name 2gethr, alternateName, and a stable @id",
      "Service / Offer markup for GCC, managed office, and coworking with public per-seat bands",
      "LocalBusiness on CBD / ORR / HSR so Flexo and BookMyCoworking are not the only NAP",
      "FAQPage answering lock-in, all-inclusive inclusions, and GCC vs coworking",
    ],
  },
  queries: [
    {
      id: "q-spelling",
      query: "2gethr vs 2gether",
      intent:
        "Brand identity: do engines use the legal/domain spelling, or a phonetic stand-in?",
      severity: "critical",
      tag: "Wrong spelling",
      citedBrands: ["2gether"],
      rentokStatus: "confused",
      outcome:
        "Wrong brand string · Grok, Gemini, Claude, ChatGPT, Perplexity write “2gether”",
      answers: [
        {
          model: "grok",
          cited: true,
          position: 2,
          excerpt:
            "Grok’s most favorable read still names the operator “2gether” — very high pricing transparency, all-inclusive per-seat rates, 3/6/12-month contracts. The domain is 2gethr.com. The model is describing you under the wrong string.",
        },
        {
          model: "gemini",
          cited: true,
          excerpt:
            "Gemini: “2gether: Transparency Rating: High (Value-Driven)” and an all-inclusive per-desk model. Same misspelling. Recommended, but not as 2gethr.",
        },
        {
          model: "claude",
          cited: true,
          position: 5,
          excerpt:
            "Claude: “2gether - Most transparent pricing structure” and “Month-to-month contracts standard.” Rank #4.6, recommended — under 2gether.",
        },
        {
          model: "chatgpt",
          cited: true,
          position: 9,
          excerpt:
            "ChatGPT: “2gether (India)” plus a generic note that Indian coworking players mix hot desk, dedicated desk, and private offices, with public price lists often sales-led. Buried at #8.8, and still the wrong spelling.",
        },
        {
          model: "perplexity",
          cited: true,
          position: 5,
          excerpt:
            "Perplexity: “2gether = insufficient public data in the search results to rank confidently.” Mentions the misspelling, then declines to stand behind you.",
        },
        {
          model: "ai-mode",
          cited: true,
          position: 7,
          excerpt:
            "AI Mode is the one surface that writes “2gethr Workspaces,” then immediately cites BookMyCoworking and Flexo Outer Ring Road — not 2gethr.com. Identity is closer; the source of truth is still a directory.",
          sources: [
            "bookmycoworking.com",
            "flexospaces.com",
          ],
        },
        {
          model: "ai-overview",
          cited: false,
          excerpt:
            "No direct excerpt about 2gethr or 2gether. The response benchmarks WeWork India and IndiQube. The spelling collision does not even get that far: you are not in the answer.",
        },
      ],
    },
    {
      id: "q-pricing",
      query: "most transparent coworking pricing India",
      intent:
        "Buyer ask this snapshot is built on: who publishes a clean all-inclusive per-seat rate.",
      severity: "high",
      tag: "Top strength",
      citedBrands: ["WeWork India", "IndiQube"],
      rentokStatus: "cited",
      outcome:
        "Grok #1.6 and Claude treat 2gether as the transparency pick · ChatGPT #8.8 · Perplexity will not rank",
      answers: [
        {
          model: "grok",
          cited: true,
          position: 2,
          excerpt:
            "Very high pricing transparency. They publish clear per-seat pricing on their website and WhatsApp. No hidden service charges in most cases. Clean all-inclusive rate (power, AC, high-speed internet, pantry, meeting rooms as per plan). Easy to get instant quotes.",
        },
        {
          model: "gemini",
          cited: true,
          excerpt:
            "Transparency rating: High (Value-Driven). All-inclusive cost model with minimal hidden fees. Utility bills, basic internet, cleaning, and tea/coffee bundled into the per-desk rate.",
        },
        {
          model: "claude",
          cited: true,
          position: 5,
          excerpt:
            "Most transparent pricing structure. Recommended. Rank #4.6 among the set.",
        },
        {
          model: "ai-mode",
          cited: true,
          position: 7,
          excerpt:
            "Transparency: High (regional/boutique clarity). Private office and dedicated desk starting benchmarks relatively open via flex-space partners, broadly ₹12,000 to ₹18,000+ per seat depending on city and tier. Hidden/extra costs: low. Parking may incur extra monthly charges. Sources are BookMyCoworking and Flexo — including a Mumbai coworking URL that is not 2gethr’s market.",
          sources: [
            "bookmycoworking.com/spaces/2gethr-outer-ring-road",
            "flexospaces.com/coworking-space/2gethr-outer-ring-road-908",
            "flexospaces.com/in/coworking/mumbai",
          ],
        },
        {
          model: "chatgpt",
          cited: true,
          position: 9,
          excerpt:
            "Many Indian coworking players offer a mix of hot desk, dedicated desk, and private offices. Public price lists are sometimes limited (sales-led quotes) vs visible on the site. Look for: — then it trails off. Rank #8.8. Not a transparency win.",
        },
        {
          model: "perplexity",
          cited: true,
          position: 5,
          excerpt:
            "Insufficient public data in the search results to rank confidently. The model will not put a number on 2gether pricing. That is the opposite of Grok’s “very high transparency” claim — and it matches the on-site audit: no Offer schema, no FAQ, thin owned copy.",
        },
        {
          model: "ai-overview",
          cited: false,
          excerpt:
            "No direct excerpt. AI Overviews uses WeWork India and IndiQube as the pricing/benchmark names. 2gethr is not in the answer that Google shows on the results page.",
        },
      ],
    },
    {
      id: "q-flex",
      query: "flexible coworking contracts India startups",
      intent:
        "Lock-in and exit: the second strength cluster (and a contradiction in the improve list).",
      severity: "standard",
      tag: "Contract flexibility",
      citedBrands: [],
      rentokStatus: "cited",
      outcome:
        "Grok and Claude sell 3–12 month and month-to-month · improve-list also flags lighter flexibility",
      answers: [
        {
          model: "grok",
          cited: true,
          position: 2,
          excerpt:
            "Most flexible. Offers 3-month, 6-month, and 12-month contracts with minimal or no lock-in for many centres. Easy exit clauses and month-to-month options in select buildings. Very startup and mid-size team friendly.",
        },
        {
          model: "claude",
          cited: true,
          position: 5,
          excerpt:
            "Month-to-month contracts standard. Recommended. Combined with the transparency line, Claude’s 2gether is a boutique flex operator — not a GCC buildout firm.",
        },
        {
          model: "gemini",
          cited: true,
          excerpt:
            "Associations: flexible, faster onboarding, straightforward terms, smaller teams, lighter customisation. Gemini’s 2gether is easy to move into, not an enterprise workplace platform.",
        },
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT does not land a lock-in or exit story. It stays on product mix (hot desk / dedicated / private office) and sales-led quotes.",
        },
        {
          model: "perplexity",
          cited: false,
          excerpt:
            "No contract terms. Insufficient public data — the flexibility claim is not sourced well enough for Perplexity to repeat it.",
        },
      ],
    },
    {
      id: "q-category",
      query: "best managed office or GCC workspace India",
      intent:
        "Category shortlist: who Google and the big flex names put on the enterprise/GCC shelf.",
      severity: "high",
      tag: "Category miss",
      citedBrands: ["WeWork India", "IndiQube"],
      rentokStatus: "missing",
      outcome:
        "AI Overviews: WeWork India + IndiQube · 2gethr not in the excerpt",
      answers: [
        {
          model: "ai-overview",
          cited: false,
          excerpt:
            "No direct excerpt about 2gether is present; the response focuses on WeWork India and IndiQube as benchmarks. That is the shelf GCC buyers see first.",
        },
        {
          model: "ai-mode",
          cited: true,
          position: 7,
          excerpt:
            "2gethr Workspaces appears as regional/boutique clarity at #7.3 — not as a GCC or managed-office category lead. Pricing is framed through flex-space partners, not an owned GCC page.",
          sources: ["bookmycoworking.com", "flexospaces.com"],
        },
        {
          model: "grok",
          cited: true,
          position: 2,
          excerpt:
            "Grok’s #1.6 win is on transparency and startup-friendly lock-in, not on enterprise GCC governance. The improve list flags less enterprise ownership and lighter customisation — the opposite of the GCC story 2gethr.com sells.",
        },
        {
          model: "chatgpt",
          cited: true,
          position: 9,
          excerpt:
            "Filed under generic Indian coworking. No GCC, no Bangalore/Hyderabad managed office, no named centres. Rank #8.8.",
        },
      ],
    },
    {
      id: "q-sources",
      query: "2gethr outer ring road pricing",
      intent:
        "Where the numbers come from: owned site vs directories.",
      severity: "high",
      tag: "Directory cite",
      citedBrands: ["Flexo", "BookMyCoworking"],
      rentokStatus: "cited",
      outcome:
        "AI Mode quotes Flexo and BookMyCoworking · even a Mumbai Flexo URL · not 2gethr.com",
      answers: [
        {
          model: "ai-mode",
          cited: true,
          position: 7,
          excerpt:
            "Private office and dedicated desk starting benchmarks open via transparent flex-space partners (₹12,000–₹18,000+ per seat). Links: 2gethr Outer Ring Road on BookMyCoworking and Flexo. A follow-on cite is Flexo coworking in Mumbai — the wrong city for a Bangalore/Hyderabad operator. Hidden costs called low; parking extra.",
          sources: [
            "bookmycoworking.com",
            "flexospaces.com",
          ],
        },
        {
          model: "grok",
          cited: true,
          excerpt:
            "Grok says per-seat pricing is on the website and WhatsApp, all-inclusive, instant quotes. The on-site audit did not find Offer schema or a public price table. If Grok is right, that page is not machine-readable. If Grok is rounding up, Perplexity’s “insufficient public data” is the safer read.",
        },
        {
          model: "perplexity",
          cited: true,
          excerpt:
            "Insufficient public data in the search results to rank confidently. Directory pages are not enough for Perplexity to stand behind a 2gether price.",
        },
        {
          model: "chatgpt",
          cited: true,
          excerpt:
            "Public price lists are sometimes limited (sales-led quotes) vs visible on the site. ChatGPT will not treat 2gether as a published-rate operator.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "Make 2gethr the spelling, the source, and the GCC shortlist — not a lukewarm “2gether”",
    body: "Favorability is 39 because engines like the boutique story (transparent, flexible, small-team) and then will not recommend you for the enterprise/GCC job 2gethr.com actually sells. Recommended only 24% of the time; average rank #5. We start with identity: Organization schema and consistent 2gethr spelling so Grok/Claude/Gemini stop writing 2gether. Then we move prices, lock-in, and inclusions onto 2gethr.com so AI Mode stops quoting Flexo and BookMyCoworking — including Mumbai. Then citation work so AI Overviews names 2gethr next to WeWork India and IndiQube on Bangalore/Hyderabad managed-office and GCC prompts, not only as a startup coworking footnote. On-site readiness from the companion audit (schema, one H1, FAQ, alt/transcripts, tour form) is included in the same 90 days. You get a dashboard that re-tests this prompt set.",
    outcomes: [
      "Engines write 2gethr, not 2gether, with a stable Organization entity and sameAs",
      "Owned per-seat bands and lock-in FAQ on 2gethr.com so Flexo / BookMyCoworking are not the price source",
      "Favorability up from lukewarm 39: keep transparency, add GCC / managed-office / enterprise governance language models can quote",
      "AI Overviews and ChatGPT shortlists include 2gethr next to WeWork India and IndiQube on Bangalore / Hyderabad prompts — not rank #8.8 generic coworking",
      "Weekly re-tests of this 48-run set plus the readiness fixes, with a dashboard for model gaps and next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline:
    "Ready to stop showing up as a lukewarm “2gether”?",
  ctaBody:
    "Book a short call. We will map the 90-day plan from this favorability snapshot and the on-site readiness audit: lock the 2gethr spelling, put prices and GCC proof on the owned domain, then run citation work so AI Overviews and ChatGPT stop handing the category to WeWork and IndiQube. You get a dashboard that re-tests this set.",
};
