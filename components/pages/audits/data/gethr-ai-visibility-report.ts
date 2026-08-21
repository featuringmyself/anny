import type { VisibilityReport } from "../types";

const SHOT = "/audits/2gethr";

/** Private outreach report for 2gethr. ChatGPT snapshot, August 2026. */
export const gethrAiVisibilityReport: VisibilityReport = {
  slug: "2gethr-ai-visibility-report",
  company: "2gethr",
  website: "2gethr.com",
  industry: "Managed offices & GCC workspaces · Bangalore & Hyderabad",
  preparedFor: "Amit Prakash",
  role: "Cofounder",
  email: "sales@2gethr.co.in",
  dateLabel: "August 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline:
    "Premium managed workspaces for enterprises and GCCs — design, build, and operate end to end.",
  summary:
    "ChatGPT already answers for managed offices, GCC workspaces, and enterprise fit-outs in Bangalore. Demand is being routed now. On 12 of 12 discovery prompts in this snapshot — category shelves, HSR and Richmond Road home turf, 200-seat RFPs, WeWork/Awfis conquest, turnkey GCC, even “Scapia-like startups” — 2gethr is never shortlisted. Table Space, WeWork India, Smartworks, IndiQube, Awfis, GoodWorks, BHIVE, and Clayworks take those answers. Ask “together workspaces Bangalore” and the model does not find you. Ask by the correct brand and it will describe the 75-day / zero-CapEx pitch — then still leave you off every competitive shelf above. This ChatGPT snapshot is the baseline. A 90-day sprint gets 2gethr cited on the GCC and managed-office prompts that already create tours, then expands across Perplexity, Google AI Overview, Gemini, and Claude.",
  stats: [
    { label: "Sq ft designed", value: "8M+" },
    { label: "Members", value: "11.5K" },
    { label: "Cities", value: "BLR · HYD" },
    { label: "Centers", value: "CBD · ORR · HSR" },
  ],
  brandCrisisHeadline:
    "Wrong name finds nothing. Right name describes you — then never shortlists you.",
  brandCrisisDek:
    "Phonetic “together workspaces” fails identity. Branded diligence repeats your USP. Neither puts 2gethr on the shelves buyers actually ask for.",
  queriesHeadline: "Prompt audit · 12 queries",
  queriesIntro:
    "Buyer prompts already routing managed-office and GCC demand in Bangalore (and Hyderabad). Zero of twelve cite 2gethr. Table Space, WeWork, Smartworks, IndiQube, and peers take the shortlists — including on HSR and Richmond Road, where 2gethr@HSR and 2gethr@CBD should compete.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 12, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "Table Space", visibility: 78 },
    { name: "WeWork India", visibility: 72 },
    { name: "Smartworks", visibility: 68 },
    { name: "IndiQube", visibility: 64 },
    { name: "Awfis", visibility: 58 },
    { name: "GoodWorks", visibility: 52 },
    { name: "BHIVE", visibility: 44 },
    { name: "Clayworks", visibility: 40 },
    { name: "2gethr", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-identity",
      query: "together workspaces Bangalore",
      title: "Phonetic brand ask · ChatGPT cannot find 2gethr",
      body: "Asked “together workspaces Bangalore,” ChatGPT says it cannot find a clearly identifiable Bangalore coworking operator by that name and asks for an area instead. The phonetic path buyers type when they heard the brand out loud never lands on 2gethr.com.",
      outcome: "Identity miss · no operator found",
      screenshot: {
        src: `${SHOT}/crisis-together-workspaces-bangalore.png`,
        alt: "ChatGPT failing to identify 2gethr from “together workspaces Bangalore”",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-branded",
      query: "should my company take a managed office with 2gethr",
      title: "Known on brand · still absent from every shortlist above",
      body: "Asked by name, ChatGPT repeats the 75 working-day / zero-CapEx managed-office story and gives a careful yes-if / caution-if frame, citing third-party seat pricing around ₹12k–₹18k+. That is diligence after the shortlist — and on every discovery prompt in this audit, 2gethr never made the shortlist.",
      outcome: "Branded cite · discovery shelves empty",
      screenshot: {
        src: `${SHOT}/crisis-should-my-company-take-managed-office-2gethr.png`,
        alt: "ChatGPT answering whether to take a managed office with 2gethr",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best managed office providers Bangalore",
      intent: "Category shelf — first shortlist enterprise buyers build",
      severity: "critical",
      tag: "Category miss",
      citedBrands: [
        "IndiQube",
        "Smartworks",
        "WeWork India",
        "Awfis",
        "GoodWorks",
        "Enzyme",
        "Novel Office",
        "Regus",
        "Table Space",
      ],
      rentokStatus: "missing",
      outcome: "Category shelf · 2gethr absent",
      screenshot: {
        src: `${SHOT}/01-best-managed-office-providers-bangalore.png`,
        alt: "ChatGPT Bangalore managed office providers without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT shortlists IndiQube, Smartworks, WeWork India, Awfis, GoodWorks, Enzyme, Novel Office, Regus, and Table Space for fully managed offices in Bengaluru. 2gethr is not named.",
        },
      ],
    },
    {
      id: "q2",
      query: "best office space providers for GCCs in Bangalore",
      intent: "Core wedge — GCC workspace shortlist in Bengaluru",
      severity: "critical",
      tag: "GCC miss",
      citedBrands: [
        "Table Space",
        "Smartworks",
        "WeWork India",
        "IndiQube",
        "Awfis",
        "GoodWorks",
      ],
      rentokStatus: "missing",
      outcome: "GCC Bangalore shelf · 2gethr absent",
      screenshot: {
        src: `${SHOT}/04-best-office-space-providers-gccs-bangalore.png`,
        alt: "ChatGPT GCC office providers Bangalore without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "For GCCs, ChatGPT ranks Table Space, Smartworks, WeWork India, IndiQube, Awfis, and GoodWorks on capacity, IT/security, and scale. 2gethr does not appear.",
        },
      ],
    },
    {
      id: "q3",
      query: "premium managed workspace Bangalore for enterprises",
      intent: "Premium enterprise positioning 2gethr sells on-site",
      severity: "critical",
      tag: "Premium miss",
      citedBrands: [
        "Table Space",
        "Clayworks",
        "WeWork India",
        "Aurbis",
        "BuzzWorks",
        "GoodWorks",
      ],
      rentokStatus: "missing",
      outcome: "Premium enterprise shelf · 2gethr absent",
      screenshot: {
        src: `${SHOT}/03-premium-managed-workspace-bangalore-enterprises.png`,
        alt: "ChatGPT premium managed workspace Bangalore without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Premium enterprise shortlist: Table Space, Clayworks, WeWork India, Aurbis, BuzzWorks, GoodWorks. No 2gethr.",
        },
      ],
    },
    {
      id: "q4",
      query: "turnkey office for Global Capability Center Bangalore",
      intent: "Turnkey / GCC-as-a-service buyer job",
      severity: "critical",
      tag: "Turnkey GCC",
      citedBrands: [
        "GoodWorks GCC Nexus",
        "Sansovi",
        "Clayworks",
        "WeWork India",
        "VMG",
      ],
      rentokStatus: "missing",
      outcome: "Turnkey GCC · GoodWorks / Clayworks / WeWork win",
      screenshot: {
        src: `${SHOT}/09-turnkey-office-gcc-bangalore.png`,
        alt: "ChatGPT turnkey GCC Bangalore options without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Strong options named: GoodWorks GCC Nexus, Sansovi, Clayworks Enterprise & GCC, WeWork India GCC, VMG. 2gethr is missing.",
        },
      ],
    },
    {
      id: "q5",
      query: "managed office for 200 employees Bangalore",
      intent: "High-intent seat-count RFP — mid-enterprise deal size",
      severity: "critical",
      tag: "200 seats",
      citedBrands: [
        "Table Space",
        "GoodWorks",
        "WeWork India",
        "EBC Space",
      ],
      rentokStatus: "missing",
      outcome: "200-seat RFP · Table Space / GoodWorks / WeWork",
      screenshot: {
        src: `${SHOT}/10-managed-office-200-employees-bangalore.png`,
        alt: "ChatGPT 200-employee managed office Bangalore without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Shortlist centers on Table Space (Embassy Onyx, Senate, Bren Optimus), GoodWorks Whitefield, WeWork Manyata, and EBC HSR. 2gethr never appears.",
        },
      ],
    },
    {
      id: "q6",
      query: "managed offices HSR Layout Bangalore",
      intent: "Home turf — 2gethr@HSR should compete here",
      severity: "critical",
      tag: "Home turf",
      citedBrands: [
        "BHIVE",
        "Urban Vault",
        "Cocktail",
        "EBC Space",
        "Enzyme",
        "Honeykomb",
      ],
      rentokStatus: "missing",
      outcome: "HSR home turf · BHIVE / Urban Vault / EBC — not 2gethr@HSR",
      screenshot: {
        src: `${SHOT}/06-managed-offices-hsr-layout-bangalore.png`,
        alt: "ChatGPT managed offices HSR Layout without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "HSR options named: BHIVE Premium, Urban Vault, Cocktail, EBC, Enzyme, Honeykomb. 2gethr@HSR is not on the list.",
        },
      ],
    },
    {
      id: "q7",
      query: "premium office space Richmond Road Bangalore",
      intent: "Home turf — 2gethr@CBD / Richmond Road",
      severity: "critical",
      tag: "Home turf",
      citedBrands: ["IndiQube Penta", "Awfis", "Aurbis Concord", "Clayworks"],
      rentokStatus: "missing",
      outcome: "Richmond Road · IndiQube / Awfis / Aurbis — not 2gethr@CBD",
      screenshot: {
        src: `${SHOT}/07-premium-office-space-richmond-road-bangalore.png`,
        alt: "ChatGPT premium office Richmond Road without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT shortlists IndiQube Penta, Awfis Skav 909, Aurbis Concord, and Clayworks on Richmond Road. 2gethr@CBD is absent.",
        },
      ],
    },
    {
      id: "q8",
      query: "better than WeWork for GCC Bangalore",
      intent: "Conquest — GCC buyers comparing off WeWork",
      severity: "high",
      tag: "Conquest",
      citedBrands: [
        "Table Space",
        "GoodWorks",
        "Smartworks",
        "IndiQube",
        "BHIVE",
      ],
      rentokStatus: "missing",
      outcome: "WeWork GCC conquest · 2gethr absent",
      screenshot: {
        src: `${SHOT}/14-better-than-wework-for-gcc-bangalore.png`,
        alt: "ChatGPT better than WeWork for GCC Bangalore without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Alternatives named: Table Space, GoodWorks GCC Nexus, Smartworks, IndiQube, BHIVE. 2gethr is not offered as a WeWork alternative.",
        },
      ],
    },
    {
      id: "q9",
      query: "alternatives to WeWork Bangalore for enterprises",
      intent: "Enterprise WeWork switcher shelf",
      severity: "high",
      tag: "Conquest",
      citedBrands: [
        "Smartworks",
        "IndiQube",
        "Awfis",
        "Table Space",
        "BHIVE",
        "91springboard",
        "CorporatEdge",
      ],
      rentokStatus: "missing",
      outcome: "WeWork enterprise alternatives · 2gethr absent",
      screenshot: {
        src: `${SHOT}/13-alternatives-to-wework-bangalore-enterprises.png`,
        alt: "ChatGPT WeWork alternatives Bangalore enterprises without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Enterprise WeWork alternatives: Smartworks, IndiQube, Awfis, Table Space, BHIVE, 91springboard, CorporatEdge. No 2gethr.",
        },
      ],
    },
    {
      id: "q10",
      query: "fit out and managed workplace for enterprise Bangalore",
      intent: "Design-build-operate job 2gethr markets as end-to-end",
      severity: "high",
      tag: "Fit-out",
      citedBrands: ["Table Space", "GoodWorks", "Clayworks"],
      rentokStatus: "missing",
      outcome: "Fit-out + managed · Table Space / GoodWorks / Clayworks",
      screenshot: {
        src: `${SHOT}/11-fit-out-managed-workplace-enterprise-bangalore.png`,
        alt: "ChatGPT enterprise fit-out managed workplace without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Enterprise fit-out + managed shortlist is dominated by Table Space campuses and GoodWorks / Clayworks. 2gethr’s design-build-operate story is not cited.",
        },
      ],
    },
    {
      id: "q11",
      query: "best office operator for Scapia-like startups Bangalore",
      intent: "Client-adjacent irony — Scapia is on 2gethr’s client wall",
      severity: "critical",
      tag: "Portfolio irony",
      citedBrands: [
        "IndiQube",
        "WeWork India",
        "Smartworks",
        "Awfis",
        "BHIVE",
        "Table Space",
      ],
      rentokStatus: "missing",
      outcome: "Scapia-like startups · BHIVE map + IndiQube — not 2gethr",
      screenshot: {
        src: `${SHOT}/15-best-office-operator-scapia-like-startups-bangalore.png`,
        alt: "ChatGPT Scapia-like startup office operators without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "For VC-backed ~30–150 person startups, ChatGPT maps BHIVE HSR and shortlists IndiQube, WeWork, Smartworks, Awfis, BHIVE, Table Space. 2gethr — which lists Scapia among clients — is never named.",
        },
      ],
    },
    {
      id: "q12",
      query: "office space for MNC capability center Hyderabad",
      intent: "Hyderabad expansion — second city on 2gethr.com",
      severity: "high",
      tag: "Hyderabad",
      citedBrands: ["Cushman & Wakefield"],
      rentokStatus: "missing",
      outcome: "Hyderabad GCC · corridors only · no 2gethr operator cite",
      screenshot: {
        src: `${SHOT}/12-office-space-mnc-capability-center-hyderabad.png`,
        alt: "ChatGPT Hyderabad MNC GCC office areas without 2gethr",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ChatGPT answers with Gachibowli, Financial District, HITEC City, and Raidurg — citing Cushman & Wakefield — and names no managed-office operator. 2gethr’s Hyderabad story is invisible.",
          sources: ["Cushman & Wakefield", "Times of India"],
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline:
      "Get 2gethr on the managed-office and GCC shortlists ChatGPT already builds",
    body: "This is a done-with-you services engagement — not another SaaS seat. We pick the prompts already routing tours (GCC Bangalore, 200-seat RFPs, HSR/Richmond home turf, WeWork conquest), fix the “together → 2gethr” identity leak, build citation assets models trust, and re-test weekly until 2gethr appears next to Table Space, WeWork, and IndiQube — then expand to Perplexity, Google AI Overview, Gemini, and Claude.",
    outcomes: [
      "2gethr cited on Bangalore managed-office, GCC, and premium enterprise shortlists across ChatGPT first, then Perplexity / AI Overview / Gemini / Claude",
      "Home-turf wins: HSR and Richmond Road / CBD prompts name 2gethr@HSR and 2gethr@CBD",
      "Phonetic and brand strings resolve to 2gethr — not “no operator found”",
      "WeWork / Awfis / IndiQube conquest prompts include 2gethr as a serious alternative",
      "Weekly re-runs of this audit set with screenshot proof, plus a dashboard for gaps and next actions",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get 2gethr on those shortlists?",
  ctaBody:
    "Book a short call. We will walk this ChatGPT snapshot: zero of twelve discovery cites, identity leak on “together,” home-turf misses on HSR and Richmond Road, and the 90-day plan to change the answers. You get weekly proof and a dashboard.",
};
