export type DocBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "callout"; title: string; text: string };

export type DocArticle = {
  id: string;
  title: string;
  dek: string;
  section: "Get started" | "Tracking" | "Workspace";
  updatedAt: string;
  body: DocBlock[];
};
