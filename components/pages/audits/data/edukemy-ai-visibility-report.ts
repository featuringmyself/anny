import type { VisibilityReport } from "../types";

const SHOT = "/audits/edukemy";

/**
 * Private outreach report for Edukemy. ChatGPT snapshot, September 2026.
 * Catalog: GS Foundation / Integrated / Mains mentorship, Geography Optional,
 * Essay, test series, ORN + online — see edukemy.com/upsc/guided-courses.
 */
export const edukemyAiVisibilityReport: VisibilityReport = {
  slug: "edukemy-ai-visibility-report",
  company: "Edukemy",
  website: "edukemy.com",
  industry: "UPSC CSE coaching · GS, Geography Optional, Essay · ORN + online",
  preparedFor: "Shabbir A. Bashir",
  role: "Co-founder & CEO",
  dateLabel: "September 2026",
  overallScore: 0,
  scoreLabel: "Critical",
  private: true,
  tagline: "GS Foundation · Integrated Mentorship · Geography · Essay · ORN",
  summary:
    "ChatGPT snapshot across 10 buy-intent prompts tied to Edukemy’s course list (GS Foundation, Integrated Mentorship, GS Mains, Essay, Geography Optional, test series, ORN). Edukemy is cited on 0 of 10. Who appears instead: NEXT IAS, Vision IAS, ForumIAS, Vajiram, and others by prompt. Separately, Shabbir Sir ranks #1 when asked for best Geography Optional teachers. This report is the baseline — not a brief on what to prioritise.",
  
  brandCrisisHeadline: "How ChatGPT currently describes Edukemy",
  brandCrisisDek:
    "Three answers from this snapshot: a branded review, a GS Foundation shortlist, and an ORN shortlist.",
  queriesHeadline: "Prompt audit · 10 queries",
  queriesIntro:
    "Buy-intent prompts for courses on edukemy.com. Edukemy was not named on these ten.",
  modelScores: [
    { model: "chatgpt", visibility: 0, cited: 0, total: 10, audited: true },
    { model: "perplexity", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-overview", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "gemini", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "claude", visibility: 0, cited: 0, total: 0, audited: false },
    { model: "ai-mode", visibility: 0, cited: 0, total: 0, audited: false },
  ],
  competitors: [
    { name: "NEXT IAS", visibility: 90 },
    { name: "Vision IAS", visibility: 80 },
    { name: "ForumIAS", visibility: 70 },
    { name: "Vajiram & Ravi", visibility: 70 },
    { name: "Guidance IAS / Himanshu Sharma", visibility: 50 },
    { name: "InsightsIAS", visibility: 40 },
    { name: "Drishti IAS", visibility: 30 },
    { name: "Edukemy", visibility: 0 },
  ],
  brandCrisis: [
    {
      id: "crisis-gs-review",
      query: "Edukemy review",
      title: "Branded review · Geography / Essay strong, GS more cautious",
      body: "Scores Geography 8.5 and Essay 8; GS Foundation 6.5–7; Mentorship 6. Suggests comparing faculty before buying a full package.",
      outcome: "Nuanced · not an all-in recommend",
      screenshot: {
        src: `${SHOT}/01-edukemy-review.png`,
        alt: "ChatGPT Edukemy review with mixed category scores",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-gs-foundation",
      query: "best online GS Foundation course for UPSC 2027",
      title: "GS Foundation 2027 · Edukemy not on the shortlist",
      body: "Shortlist: NEXT IAS, ForumIAS, Vision, Vajiram, Drishti, PW OnlyIAS. Edukemy not named.",
      outcome: "Absent · NEXT / Vision / Forum named",
      screenshot: {
        src: `${SHOT}/04-online-gs-foundation-2027.png`,
        alt: "ChatGPT GS Foundation 2027 shortlist without Edukemy",
        model: "chatgpt",
      },
    },
    {
      id: "crisis-orn",
      query: "best IAS coaching in Old Rajinder Nagar",
      title: "ORN shortlist · Edukemy not named",
      body: "Vajiram, NEXT, Insights, KSG, Sunya. Edukemy’s ORN centre not mentioned.",
      outcome: "Absent · Vajiram / NEXT named",
      screenshot: {
        src: `${SHOT}/08-ias-coaching-old-rajinder-nagar.png`,
        alt: "ChatGPT Old Rajinder Nagar IAS coaching without Edukemy",
        model: "chatgpt",
      },
    },
  ],
  queries: [
    {
      id: "q1",
      query: "best online GS Foundation course for UPSC 2027",
      intent: "GS Foundation course",
      severity: "critical",
      tag: "GS Foundation",
      citedBrands: [
        "NEXT IAS",
        "ForumIAS",
        "Vision IAS",
        "Vajiram & Ravi",
        "Drishti IAS",
        "PW OnlyIAS",
      ],
      rentokStatus: "missing",
      outcome: "Absent · NEXT named best overall",
      screenshot: {
        src: `${SHOT}/04-online-gs-foundation-2027.png`,
        alt: "ChatGPT GS Foundation 2027 without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "NEXT IAS, ForumIAS, Vision, Vajiram, Drishti, PW OnlyIAS. Edukemy absent.",
        },
      ],
    },
    {
      id: "q2",
      query: "best UPSC integrated mentorship program for Prelims and Mains",
      intent: "Integrated mentorship programme",
      severity: "critical",
      tag: "Integrated mentorship",
      citedBrands: [
        "VisionIAS",
        "InsightsIAS",
        "ForumIAS",
        "NEXT IAS",
        "Vajiram & Ravi",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Vision Lakshya named",
      screenshot: {
        src: `${SHOT}/05-integrated-mentorship-prelims-mains.png`,
        alt: "ChatGPT integrated mentorship without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "VisionIAS Lakshya, InsightsIAS MARG, ForumIAS, NEXT AIM, Vajiram. No Edukemy.",
        },
      ],
    },
    {
      id: "q3",
      query: "best IAS coaching in Old Rajinder Nagar",
      intent: "IAS coaching in Old Rajinder Nagar",
      severity: "critical",
      tag: "ORN",
      citedBrands: [
        "Vajiram & Ravi",
        "NEXT IAS",
        "Insights IAS",
        "KSG India",
        "Sunya",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Vajiram / NEXT named",
      screenshot: {
        src: `${SHOT}/08-ias-coaching-old-rajinder-nagar.png`,
        alt: "ChatGPT ORN IAS coaching without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt: "Vajiram, NEXT, Insights, KSG, Sunya. Edukemy not named.",
        },
      ],
    },
    {
      id: "q4",
      query:
        "Which are the best UPSC civil services coaching institutes in India right now?",
      intent: "National institute shelf",
      severity: "critical",
      tag: "National",
      citedBrands: [
        "Vision IAS",
        "Vajiram & Ravi",
        "NEXT IAS",
        "ForumIAS",
        "Drishti IAS",
        "Rau’s IAS",
        "Shankar IAS Academy",
      ],
      rentokStatus: "missing",
      outcome: "Absent · seven institutes named",
      screenshot: {
        src: `${SHOT}/14-best-upsc-coaching-institutes-india.png`,
        alt: "ChatGPT best UPSC institutes without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Vision, Vajiram, NEXT, ForumIAS, Drishti, Rau’s, Shankar. No Edukemy.",
        },
      ],
    },
    {
      id: "q5",
      query: "best UPSC coaching for working professionals in India",
      intent: "UPSC coaching for working professionals",
      severity: "high",
      tag: "Working pro",
      citedBrands: [
        "NEXT IAS",
        "Vision IAS",
        "Vajiram & Ravi",
        "ForumIAS",
        "Drishti IAS",
        "PW OnlyIAS",
      ],
      rentokStatus: "missing",
      outcome: "Absent · NEXT / Vision named",
      screenshot: {
        src: `${SHOT}/03-upsc-coaching-working-professionals.png`,
        alt: "ChatGPT working-pro UPSC coaching without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "NEXT IAS, Vision, Vajiram, ForumIAS, Drishti, PW OnlyIAS. Edukemy absent.",
        },
      ],
    },
    {
      id: "q6",
      query:
        "Which UPSC coaching has the best GS mains answer-writing and mentorship programme?",
      intent: "GS Mains answer-writing and mentorship",
      severity: "high",
      tag: "GS Mains / AWFG",
      citedBrands: [
        "ForumIAS",
        "Vision IAS",
        "InsightsIAS",
        "NEXT IAS",
        "Vajiram & Ravi",
      ],
      rentokStatus: "missing",
      outcome: "Absent · ForumIAS MGP named",
      screenshot: {
        src: `${SHOT}/17-gs-mains-answer-writing-mentorship.png`,
        alt: "ChatGPT GS Mains answer-writing without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ForumIAS MGP / AWFG, Vision, Insights, NEXT, Vajiram. Edukemy absent.",
        },
      ],
    },
    {
      id: "q7",
      query: "Best essay writing course or programme for UPSC mains. Name institutes.",
      intent: "Essay writing programme",
      severity: "high",
      tag: "Essay",
      citedBrands: [
        "ForumIAS",
        "Vision IAS",
        "NEXT IAS",
        "Legacy IAS Academy",
        "Insights IAS",
      ],
      rentokStatus: "missing",
      outcome: "Absent · ForumIAS EGP named",
      screenshot: {
        src: `${SHOT}/18-essay-writing-course-upsc-mains.png`,
        alt: "ChatGPT essay programmes without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "ForumIAS EGP, Vision, NEXT, Legacy, Insights. Edukemy essay not named.",
        },
      ],
    },
    {
      id: "q8",
      query: "best online Geography Optional course India",
      intent: "Online Geography Optional course",
      severity: "critical",
      tag: "Geography Optional",
      citedBrands: [
        "Guidance IAS",
        "NEXT IAS",
        "Rau’s IAS",
        "UnderStand UPSC",
        "Vajiram & Ravi",
      ],
      rentokStatus: "missing",
      outcome: "Absent · Guidance IAS / NEXT named",
      screenshots: [
        {
          src: `${SHOT}/16-best-teachers-geography-optional.png`,
          alt: "ChatGPT ranking Shabbir Sir at Edukemy as #1",
          model: "chatgpt",
          label: "Teacher prompt",
          prompt: "best teachers for Geography optional for UPSC",
        },
        {
          src: `${SHOT}/09-online-geography-optional-course.png`,
          alt: "ChatGPT online Geography Optional course without Edukemy",
          model: "chatgpt",
          label: "Course prompt",
          prompt: "best online Geography Optional course India",
        },
      ],
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Guidance IAS, NEXT IAS, Rau’s, UnderStand UPSC, Vajiram. Edukemy not listed. (Shabbir Sir ranks #1 on the teacher prompt.)",
        },
      ],
    },
    {
      id: "q9",
      query: "Unacademy alternatives for UPSC Geography Optional",
      intent: "Unacademy alternatives for Geography Optional",
      severity: "high",
      tag: "Geo switch",
      citedBrands: [
        "Guidance IAS",
        "NEXT IAS",
        "Rau’s IAS",
        "Vajiram & Ravi",
        "Prince Mishra Geography",
        "Synopsis IAS",
        "Understand UPSC",
      ],
      rentokStatus: "missing",
      outcome: "Absent · seven alternatives named",
      screenshot: {
        src: `${SHOT}/12-unacademy-alternatives-geography.png`,
        alt: "ChatGPT Unacademy Geography alternatives without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Guidance IAS, NEXT, Rau’s, Vajiram, Prince Mishra, Synopsis, Understand UPSC. No Edukemy.",
        },
      ],
    },
    {
      id: "q10",
      query: "best Geography Optional test series with answer copy evaluation",
      intent: "Geography Optional test series with evaluation",
      severity: "high",
      tag: "Geo test series",
      citedBrands: ["ForumIAS", "NEXT IAS", "VisionIAS"],
      rentokStatus: "missing",
      outcome: "Absent · ForumIAS / NEXT / Vision named",
      screenshot: {
        src: `${SHOT}/02-geography-optional-test-series-evaluation.png`,
        alt: "ChatGPT Geography test series without Edukemy",
        model: "chatgpt",
      },
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt: "ForumIAS O-AWFG / ATS, NEXT IAS, VisionIAS. Edukemy absent.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "From this 0/10 baseline to cited on the prompts that drive enrolments",
    body: "We work the buy-intent set in this audit — GS Foundation, integrated mentorship, ORN, Essay, GS Mains answer writing, Geography Optional, test series — plus the branded review. Weekly re-tests on ChatGPT first, then Perplexity, Google AI Overview, Gemini, and Claude. You get screenshot proof and a dashboard. Which lines we weight first is decided with you.",
    outcomes: [
      "Edukemy named on priority GS Foundation, integrated mentorship, and ORN prompts that today list NEXT, Vision, ForumIAS, and Vajiram",
      "Essay and GS Mains answer-writing / mentorship prompts cite Edukemy programmes, not only ForumIAS / Vision / Insights",
      "Geography Optional course and test-series prompts name Edukemy (today: Guidance IAS, NEXT, ForumIAS)",
      "Branded “Edukemy review” answers cover the full course mix with fewer “skip full GS” takeaways",
      "Citation-ready pages and third-party placements models already pull from (comparisons, directories, programme pages)",
      "This prompt set re-tested weekly with screenshot proof",
      "Live dashboard: model gaps, competitor share vs NEXT / Vision / Forum / Vajiram, score trend, next actions each week",
    ],
  },
  ctaUrl: "https://cal.com/dodox/quick-chat",
  ctaLabel: "Book a quick chat",
  ctaEyebrow: "90-day sprint",
  ctaHeadline: "Ready to get Edukemy on those shortlists?",
  ctaBody:
    "Book a short call. We map the 90-day plan from this audit: GS Foundation and mentorship, ORN, Essay and answer writing, Geography Optional — the 0 of 10 buy-intent set — plus the branded review. Weekly screenshot proof and a dashboard included.",
};
