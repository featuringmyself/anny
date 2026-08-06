export type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type BlogPost = {
  slug: string;
  title: string;
  dek: string;
  date: string;
  year: string;
  /** ISO date for sorting / sitemap */
  publishedAt: string;
  category: string;
  body: BlogBlock[];
};
