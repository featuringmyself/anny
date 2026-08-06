export type CareerRole = {
  slug: string;
  role: string;
  location: string;
  type: string;
  team: string;
  summary: string;
  about: string;
  responsibilities: string[];
  niceToHaves: string[];
  /** When false, hidden from the open-roles board (e.g. general applications). */
  listed?: boolean;
};

export const roles: CareerRole[] = [
  {
    slug: "founding-engineer",
    role: "Founding Engineer",
    location: "Remote",
    type: "Full-time",
    team: "Engineering",
    summary:
      "Own the product end to end — from prompt evaluation pipelines to the dashboard marketing teams live in.",
    about:
      "You'll ship features that make AI search measurable: tracking mentions across ChatGPT, Gemini, and AI Mode, surfacing sources, and turning noisy model output into clear competitor ladders. Small team, high ownership, production code from week one.",
    responsibilities: [
      "Design and ship full-stack features in Next.js and TypeScript",
      "Build reliable evaluation and ingestion pipelines for AI answers",
      "Improve data quality, latency, and observability for visibility metrics",
      "Partner with design and GTM on what marketing teams actually need",
    ],
    niceToHaves: [
      "Experience with LLM APIs, scraping, or analytics products",
      "Comfort with MongoDB or similar document stores",
      "Taste for simple UX over feature bloat",
    ],
  },
  {
    slug: "product-designer",
    role: "Product Designer",
    location: "Remote / NYC",
    type: "Full-time",
    team: "Design",
    summary:
      "Shape how marketers see AI visibility — dashboards, reports, and workflows that feel inevitable.",
    about:
      "Anny turns opaque model behavior into decisions. You'll design the surfaces that make mention share, answer position, and citation gaps obvious — without looking like a BI tool from 2014.",
    responsibilities: [
      "Own product design from exploration through polished UI",
      "Prototype report and dashboard patterns for multi-engine data",
      "Build a coherent visual system that matches Anny's marketing site",
      "Collaborate tightly with engineering on motion and interaction details",
    ],
    niceToHaves: [
      "B2B SaaS or analytics product experience",
      "Motion or prototyping fluency (Figma, code, or both)",
      "Comfort writing crisp UI copy",
    ],
  },
  {
    slug: "growth-marketing",
    role: "Growth Marketing",
    location: "Remote",
    type: "Full-time",
    team: "Go-to-market",
    summary:
      "Help brands discover Anny the same way buyers discover brands in AI search — with evidence, not slogans.",
    about:
      "You'll run experiments across content, partnerships, and paid that turn GEO curiosity into trials. You understand SEO and modern AI search well enough to speak the customer's language.",
    responsibilities: [
      "Own acquisition loops: content, comparison pages, and partner channels",
      "Instrument funnels and report what actually converts",
      "Ship campaigns that showcase Anny reports and brand audits",
      "Collaborate with product on messaging for marketers and agencies",
    ],
    niceToHaves: [
      "Hands-on SEO / GEO or B2B SaaS growth experience",
      "Comfort writing for technical marketing audiences",
      "Agency or multi-brand GTM background",
    ],
  },
  {
    slug: "customer-success-lead",
    role: "Customer Success Lead",
    location: "Remote",
    type: "Full-time",
    team: "Customer",
    summary:
      "Make sure every customer turns visibility data into a weekly action backlog — not another ignored dashboard.",
    about:
      "You'll be the bridge between Anny's product and marketing teams who need to win mentions. Onboarding, QBRs, and playbooks that turn reports into outreach, content, and competitive moves.",
    responsibilities: [
      "Own onboarding and ongoing success for brand and agency accounts",
      "Translate visibility gaps into prioritized action plans",
      "Feed product with patterns from real customer workflows",
      "Build light playbooks for common GEO motions",
    ],
    niceToHaves: [
      "SaaS CS or solutions experience with marketing tools",
      "Familiarity with SEO, PR, or content ops",
      "Comfort presenting to non-technical stakeholders",
    ],
  },
  {
    slug: "open-application",
    role: "Open application",
    location: "Remote",
    type: "Full-time / Contract",
    team: "General",
    summary:
      "Don't see a listed role? Tell us what you'd build at Anny — we hire for judgment and taste.",
    about:
      "We're a small team. If you have a sharp take on AI search, analytics, design, or GTM and want to work on Anny, send an open application. We'll route it to the right person.",
    responsibilities: [
      "Describe the problem you'd own in your first 90 days",
      "Share work that shows how you think, not only where you've worked",
      "Be specific about why Anny — and AI search — interests you",
    ],
    niceToHaves: [
      "A link to something you shipped",
      "A short note on a brand that should win more AI mentions",
    ],
    listed: false,
  },
];

export function getListedRoles(): CareerRole[] {
  return roles.filter((role) => role.listed !== false);
}

export function getRoleBySlug(slug: string): CareerRole | undefined {
  return roles.find((role) => role.slug === slug);
}

export function getRoleSlugs(): string[] {
  return roles.map((role) => role.slug);
}
