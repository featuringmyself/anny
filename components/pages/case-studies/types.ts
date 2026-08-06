export type CaseStudyFigure = {
  src: string;
  alt: string;
  caption?: string;
  width: number;
  height: number;
};

export type CaseStudyMetric = {
  value: string;
  label: string;
  detail?: string;
  figure?: CaseStudyFigure;
};

export type CaseStudyStep = {
  title: string;
  body: string;
  bullets?: string[];
  figure?: CaseStudyFigure;
};

export type CaseStudy = {
  slug: string;
  company: string;
  title: string;
  dek: string;
  category: string;
  lastUpdated: string;
  challenge: {
    heading: string;
    body: string[];
    bullets?: string[];
  };
  approach: {
    heading: string;
    intro: string[];
    steps: CaseStudyStep[];
  };
  results: {
    heading: string;
    intro: string[];
    metrics: CaseStudyMetric[];
  };
  closing: {
    heading: string;
    body: string[];
  };
};
