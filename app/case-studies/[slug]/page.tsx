import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CaseStudyView from "@/components/pages/case-studies/CaseStudyView";
import {
  getCaseStudyBySlug,
  getCaseStudySlugs,
} from "@/components/pages/case-studies/data";
import { SITE_NAME } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: `Case study - ${SITE_NAME}`,
      robots: {
        index: false,
        follow: false,
        googleBot: { index: false, follow: false },
      },
    };
  }

  return {
    title: `${study.company} case study - ${SITE_NAME}`,
    description: study.dek,
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  return (
    <main>
      <CaseStudyView study={study} />
    </main>
  );
}
