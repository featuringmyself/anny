/**
 * Smoke-test PDF generation for a visibility or readiness report slug.
 * Usage: bun run scripts/generate-audit-pdf.ts 2gethr-ai-readiness-report
 */
import { writeFileSync } from "fs";
import path from "path";
import { createElement, type ReactElement } from "react";
import { renderToBuffer, type DocumentProps } from "@react-pdf/renderer";

import { ReadinessReportPdf } from "../components/pages/audits/pdf/ReadinessReportPdf";
import { VisibilityReportPdf } from "../components/pages/audits/pdf/VisibilityReportPdf";
import { getReportEntryBySlug } from "../components/pages/audits/data";
import { registerReportPdfFonts } from "../lib/audits/pdf/register-fonts";

const slug = process.argv[2] ?? "2gethr-ai-visibility-report";
const entry = getReportEntryBySlug(slug);

if (!entry) {
  console.error(`No report for slug: ${slug}`);
  process.exit(1);
}

registerReportPdfFonts();

const document = (
  entry.kind === "readiness"
    ? createElement(ReadinessReportPdf, { report: entry.report })
    : createElement(VisibilityReportPdf, { report: entry.report })
) as unknown as ReactElement<DocumentProps>;

const buffer = await renderToBuffer(document);
const out = path.join(process.cwd(), "tmp", `${slug}.pdf`);
writeFileSync(out, buffer);
console.log(
  `Wrote ${out} (${buffer.byteLength} bytes, kind=${entry.kind})`,
);
