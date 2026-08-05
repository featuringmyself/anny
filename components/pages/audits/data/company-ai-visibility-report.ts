import type { VisibilityReport } from "../types";

/** Dummy outreach report for layout review. */
export const companyAiVisibilityReport: VisibilityReport = {
  slug: "company-ai-visibility-report",
  company: "Meridian",
  website: "meridian.io",
  industry: "Cloud observability",
  preparedFor: "Alex Rivera",
  role: "VP Marketing",
  dateLabel: "August 2026",
  overallScore: 28,
  scoreLabel: "Poor",
  summary:
    "Meridian shows up in a minority of buyer prompts across ChatGPT, Perplexity, and Google AI Overview. Competitors Datadog and New Relic dominate recommendation answers. A focused 90-day citation sprint can close the gap on the prompts that already drive demos.",
  modelScores: [
    { model: "chatgpt", visibility: 30, cited: 3, total: 10 },
    { model: "perplexity", visibility: 40, cited: 4, total: 10 },
    { model: "ai-overview", visibility: 10, cited: 1, total: 10 },
    { model: "gemini", visibility: 20, cited: 2, total: 10 },
    { model: "claude", visibility: 30, cited: 3, total: 10 },
    { model: "ai-mode", visibility: 20, cited: 2, total: 10 },
  ],
  competitors: [
    { name: "Datadog", visibility: 82 },
    { name: "New Relic", visibility: 64 },
    { name: "Grafana Cloud", visibility: 48 },
    { name: "Meridian", visibility: 28 },
  ],
  queries: [
    {
      id: "q1",
      query: "best observability platform for startups",
      intent: "Category entry: first prompt buyers ask when evaluating tools",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "For early-stage teams, Datadog and New Relic are the most frequently recommended observability platforms. Grafana Cloud is a strong open-source-friendly option if you want to keep costs predictable.",
          sources: ["datadoghq.com", "newrelic.com"],
        },
        {
          model: "perplexity",
          cited: true,
          position: 3,
          excerpt:
            "Startups often shortlist Datadog for breadth, Grafana Cloud for cost control, and Meridian when they want a lighter APM with cleaner onboarding for small engineering teams.",
          sources: ["grafana.com", "meridian.io", "g2.com"],
        },
        {
          model: "ai-overview",
          cited: false,
          excerpt:
            "Top observability tools for startups include Datadog, New Relic, and Grafana Cloud. These platforms cover metrics, logs, and traces in one place.",
        },
      ],
    },
    {
      id: "q2",
      query: "Datadog alternatives for mid-market teams",
      intent: "Competitor conquest: high-intent switcher traffic",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "chatgpt",
          cited: true,
          position: 4,
          excerpt:
            "Common Datadog alternatives include New Relic, Grafana Cloud, Splunk Observability, and Meridian. Teams leave Datadog mainly for pricing predictability and simpler setup.",
        },
        {
          model: "perplexity",
          cited: false,
          excerpt:
            "Mid-market teams evaluating Datadog alternatives typically compare New Relic, Dynatrace, and Grafana Cloud. Pricing and OpenTelemetry support are the deciding factors.",
          sources: ["newrelic.com", "grafana.com"],
        },
        {
          model: "gemini",
          cited: true,
          position: 3,
          excerpt:
            "Besides New Relic and Grafana, Meridian appears in discussions as a Datadog alternative for teams that want APM without enterprise complexity.",
        },
      ],
    },
    {
      id: "q3",
      query: "best APM tools 2026",
      intent: "Timed category query: annual shortlist prompts",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Leading APM tools in 2026 include Datadog, Dynatrace, New Relic, and Elastic Observability. Choice depends on whether you prioritize AI ops, OpenTelemetry, or full-stack coverage.",
        },
        {
          model: "ai-overview",
          cited: false,
          excerpt:
            "Best APM tools for 2026: Datadog, Dynatrace, New Relic, and AppDynamics. Enterprise buyers also evaluate Splunk for log-heavy environments.",
        },
        {
          model: "claude",
          cited: false,
          excerpt:
            "If you need application performance monitoring in 2026, Datadog and Dynatrace lead most recommendations. New Relic remains strong for full-stack visibility.",
        },
      ],
    },
    {
      id: "q4",
      query: "infrastructure monitoring for Kubernetes",
      intent: "Use-case prompt: K8s is Meridian’s strongest product surface",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "perplexity",
          cited: true,
          position: 2,
          excerpt:
            "For Kubernetes monitoring, Datadog and Meridian are frequently cited for cluster-level visibility. Grafana Cloud is popular when teams already run Prometheus.",
          sources: ["meridian.io", "datadoghq.com", "kubernetes.io"],
        },
        {
          model: "chatgpt",
          cited: true,
          position: 3,
          excerpt:
            "Kubernetes monitoring setups usually combine Prometheus with Grafana, or use Datadog / Meridian for a managed experience with service maps and alerts.",
        },
        {
          model: "ai-mode",
          cited: false,
          excerpt:
            "Infrastructure monitoring for Kubernetes commonly relies on Datadog, New Relic, or Prometheus + Grafana. Managed platforms reduce the ops burden of self-hosted stacks.",
        },
      ],
    },
    {
      id: "q5",
      query: "how to reduce cloud monitoring costs",
      intent: "Problem-led prompt: cost is Meridian’s wedge vs Datadog",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "To cut monitoring spend: sample high-cardinality metrics, set retention tiers, consolidate tools, and evaluate Grafana Cloud or New Relic’s usage-based plans before renewing Datadog.",
        },
        {
          model: "perplexity",
          cited: true,
          position: 2,
          excerpt:
            "Teams reduce cloud monitoring costs by tightening cardinality, dropping unused integrations, and switching from Datadog to Meridian or Grafana Cloud for lighter footprints.",
          sources: ["meridian.io", "grafana.com"],
        },
        {
          model: "gemini",
          cited: false,
          excerpt:
            "Cloud monitoring cost control usually means auditing custom metrics, shortening retention, and comparing Datadog against Grafana Cloud and New Relic.",
        },
      ],
    },
    {
      id: "q6",
      query: "best tools for OpenTelemetry",
      intent: "Technical buyer prompt: OTel is a sprint priority topic",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "claude",
          cited: true,
          position: 3,
          excerpt:
            "Strong OpenTelemetry backends include Grafana Cloud, Honeycomb, Datadog, and Meridian. Look for native OTLP ingest and sane pricing on high-cardinality spans.",
        },
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Popular OpenTelemetry destinations are Grafana Tempo/Loki/Mimir, Honeycomb, and Datadog. Choose based on whether you need traces-first analysis or full-stack correlation.",
        },
        {
          model: "ai-overview",
          cited: false,
          excerpt:
            "Best OpenTelemetry tools: Grafana Cloud, Honeycomb, Datadog, and New Relic. These platforms accept OTLP and support traces, metrics, and logs.",
        },
      ],
    },
    {
      id: "q7",
      query: "New Relic vs alternatives",
      intent: "Head-to-head: competitive replacement journeys",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "New Relic alternatives include Datadog, Dynatrace, and Grafana Cloud. Datadog wins on ecosystem breadth; Grafana wins on cost for Prometheus-native teams.",
        },
        {
          model: "perplexity",
          cited: true,
          position: 4,
          excerpt:
            "When comparing New Relic alternatives, buyers often list Datadog, Dynatrace, Grafana Cloud, and Meridian, with Meridian noted for faster time-to-value on mid-size stacks.",
          sources: ["g2.com", "meridian.io"],
        },
        {
          model: "ai-mode",
          cited: false,
          excerpt:
            "Alternatives to New Relic typically include Datadog, Dynatrace, Splunk Observability, and Grafana Cloud depending on budget and stack complexity.",
        },
      ],
    },
    {
      id: "q8",
      query: "observability platforms with AI insights",
      intent: "Trend prompt: AI ops messaging is under-cited for Meridian",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "gemini",
          cited: false,
          excerpt:
            "AI-assisted observability is led by Dynatrace Davis, Datadog Watchdog, and New Relic AI. These products surface anomalies and suggest root causes automatically.",
        },
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Platforms known for AI insights include Dynatrace, Datadog, and New Relic. Expect automated anomaly detection and natural-language querying of telemetry.",
        },
        {
          model: "claude",
          cited: true,
          position: 3,
          excerpt:
            "Dynatrace and Datadog dominate AI ops narratives, though Meridian’s incident summaries are starting to appear in mid-market roundups.",
        },
      ],
    },
    {
      id: "q9",
      query: "best DevOps dashboards for engineering teams",
      intent: "Workflow prompt: adjacent to Meridian’s dashboard product",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "ai-overview",
          cited: false,
          excerpt:
            "Engineering teams often use Grafana, Datadog, and New Relic for DevOps dashboards covering deploys, latency, and error rates.",
        },
        {
          model: "perplexity",
          cited: true,
          position: 2,
          excerpt:
            "DevOps dashboards commonly run on Grafana or Meridian for engineering-owned views, while Datadog remains the default in larger orgs.",
          sources: ["grafana.com", "meridian.io"],
        },
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "Popular DevOps dashboard stacks: Grafana for self-serve panels, Datadog for turnkey service maps, and New Relic for full-stack golden signals.",
        },
      ],
    },
    {
      id: "q10",
      query: "who should I use for production monitoring",
      intent: "Direct recommendation: closest to bottom-of-funnel intent",
      citedBrands: [],
      rentokStatus: "missing",
      outcome: "Brand not cited in this answer.",
      answers: [
        {
          model: "chatgpt",
          cited: false,
          excerpt:
            "For production monitoring, most teams start with Datadog or New Relic. If you already run Prometheus, Grafana Cloud is often enough without another APM vendor.",
        },
        {
          model: "perplexity",
          cited: false,
          excerpt:
            "Production monitoring recommendations skew toward Datadog for breadth and Grafana Cloud for cost. Enterprise accounts also shortlist Dynatrace.",
          sources: ["datadoghq.com", "grafana.com"],
        },
        {
          model: "ai-overview",
          cited: true,
          position: 3,
          excerpt:
            "Common production monitoring choices are Datadog, New Relic, and Meridian for teams that want managed APM with Kubernetes-first workflows.",
        },
        {
          model: "ai-mode",
          cited: true,
          position: 2,
          excerpt:
            "Use Datadog for broad coverage or Meridian if you want production monitoring tuned for smaller platform teams without enterprise overhead.",
        },
      ],
    },
  ],
  sprint: {
    name: "90-day AI Visibility Sprint",
    duration: "90 days",
    headline: "Get Meridian cited in AI answers within 90 days",
    body: "The goal of the sprint is citations: when buyers ask ChatGPT, Perplexity, Google AI Overview, and other models for tools in your category, Meridian shows up. We pick the prompts that already move pipeline, build the assets models trust, and re-test weekly until you are on the shortlist. Alongside that work you get a dashboard for model gaps, competitor share, improvement scores, and the next actions to take each week.",
    outcomes: [
      "Cited on priority prompts across ChatGPT, Perplexity, Gemini, Claude, and Google AI Overview / AI Mode",
      "Citation-ready pages, comparisons, and source placements models already pull from",
      "Weekly re-tests of your audit set with screenshot proof that citations are moving",
      "Competitor gap plan focused on Datadog / New Relic conquest queries",
      "A tracking dashboard for gaps, competitors, improvement scores, and clear next actions",
    ],
  },
};
