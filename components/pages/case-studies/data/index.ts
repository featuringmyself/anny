import type { CaseStudy } from "../types";
import { lifeProFitnessCaseStudy } from "./life-pro-fitness";
import { winnDixieCaseStudy } from "./winn-dixie";

const caseStudies: CaseStudy[] = [lifeProFitnessCaseStudy, winnDixieCaseStudy];

export function getAllCaseStudies(): CaseStudy[] {
  return caseStudies;
}

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudySlugs(): string[] {
  return caseStudies.map((study) => study.slug);
}
