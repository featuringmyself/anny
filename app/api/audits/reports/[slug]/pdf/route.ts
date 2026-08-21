import { createElement, type ReactElement } from "react";
import { NextResponse } from "next/server";
import {
  renderToBuffer,
  type DocumentProps,
} from "@react-pdf/renderer";

import { ReadinessReportPdf } from "@/components/pages/audits/pdf/ReadinessReportPdf";
import { VisibilityReportPdf } from "@/components/pages/audits/pdf/VisibilityReportPdf";
import { getReportEntryBySlug } from "@/components/pages/audits/data";
import { registerReportPdfFonts } from "@/lib/audits/pdf/register-fonts";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const entry = getReportEntryBySlug(slug);

  if (!entry) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  try {
    registerReportPdfFonts();

    const document = (
      entry.kind === "readiness"
        ? createElement(ReadinessReportPdf, { report: entry.report })
        : createElement(VisibilityReportPdf, { report: entry.report })
    ) as unknown as ReactElement<DocumentProps>;

    const buffer = await renderToBuffer(document);

    const filename = `${entry.report.slug}.pdf`;
    const bytes = new Uint8Array(buffer);

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "private, no-store",
        "Content-Length": String(bytes.byteLength),
      },
    });
  } catch (error) {
    console.error("[audit-pdf]", slug, error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
