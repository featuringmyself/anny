export type AiModelId =
  | "chatgpt"
  | "perplexity"
  | "ai-overview"
  | "gemini"
  | "claude"
  | "ai-mode";

export type ModelAnswer = {
  model: AiModelId;
  /** Whether the audited brand is mentioned or cited. */
  cited: boolean;
  /** Rank among brands named in the answer, when cited. */
  position?: number;
  excerpt: string;
  sources?: string[];
};

export type QuerySeverity = "critical" | "high" | "standard";

export type RentokStatus = "missing" | "confused" | "warned" | "cited";

export type QueryScreenshot = {
  src: string;
  alt: string;
  model: AiModelId;
  /** Card label when scrolling multiple shots (e.g. property contrast). */
  label?: string;
  /** Override prompt shown under the label (e.g. competitor phrasing). */
  prompt?: string;
};

export type QueryFinding = {
  id: string;
  query: string;
  /** Intent / why this prompt matters for the sprint. */
  intent: string;
  severity?: QuerySeverity;
  /** Short label for critical findings (e.g. Brand collision). */
  tag?: string;
  /** Brands / products the model recommended instead. */
  citedBrands: string[];
  rentokStatus: RentokStatus;
  /** One-line outcome for the hybrid summary strip. */
  outcome: string;
  /** Single captured answer (most prompts). */
  screenshot?: QueryScreenshot;
  /** Multiple shots in one row — e.g. brand vs competitor contrast. */
  screenshots?: QueryScreenshot[];
  answers: ModelAnswer[];
};

export type ModelScore = {
  model: AiModelId;
  /** Share of audited prompts where the brand appeared (0–100). */
  visibility: number;
  cited: number;
  total: number;
  /** When true, score is from this snapshot; otherwise sprint coverage. */
  audited?: boolean;
};

export type CompetitorScore = {
  name: string;
  visibility: number;
};

export type BrandCrisisFinding = {
  id: string;
  query: string;
  title: string;
  body: string;
  outcome: string;
  screenshot: QueryScreenshot;
};

export type SprintOffer = {
  name: string;
  duration: string;
  headline: string;
  body: string;
  outcomes: string[];
};

/** On-site structured data / schema.org audit note (optional). */
export type SchemaFinding = {
  id: string;
  /** e.g. Schemas detected */
  title: string;
  /** e.g. 3 types found */
  status: string;
  /** Schema.org types present when known */
  types?: string[];
  body: string;
  /** Opportunity-level finding: base schemas exist, enrichment still needed. */
  severity?: "opportunity" | "standard" | "high";
  suggestedImprovements: string[];
};

export type ReportStat = {
  label: string;
  value: string;
};

export type VisibilityReport = {
  slug: string;
  company: string;
  website: string;
  industry: string;
  preparedFor: string;
  role?: string;
  email?: string;
  dateLabel: string;
  overallScore: number;
  scoreLabel: string;
  summary: string;
  tagline?: string;
  /** Site metrics allowed to show on the report. */
  stats?: ReportStat[];
  modelScores: ModelScore[];
  competitors: CompetitorScore[];
  /** Featured brand-damage exhibits (shown above the full prompt list). */
  brandCrisis?: BrandCrisisFinding[];
  /** Override default brand-crisis section heading. */
  brandCrisisHeadline?: string;
  brandCrisisDek?: string;
  /** Override default prompt-audit section heading / intro. */
  queriesHeadline?: string;
  queriesIntro?: string;
  queries: QueryFinding[];
  /** Optional on-site schema.org / structured-data finding. */
  schemaFindings?: SchemaFinding;
  sprint: SprintOffer;
  /** External booking URL; falls back to Talk to sales dialog. */
  ctaUrl?: string;
  ctaLabel?: string;
  ctaEyebrow?: string;
  ctaHeadline?: string;
  ctaBody?: string;
  private?: boolean;
};
