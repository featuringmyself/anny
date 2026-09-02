import { createElement, type ReactElement } from "react";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  renderToBuffer,
  type DocumentProps,
} from "@react-pdf/renderer";

import { ReadinessReportPdf } from "@/components/pages/audits/pdf/ReadinessReportPdf";
import {
  AR_REPORT_COOKIE,
  getAiReadinessReportById,
  isReportAccessGranted,
  parseReportAccessCookie,
} from "@/lib/ai-readiness-reports";
import { registerReportPdfFonts } from "@/lib/audits/pdf/register-fonts";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const report = await getAiReadinessReportById(id);

  if (!report) {
    return NextResponse.json({ error: "Report not found" }, { status: 404 });
  }

  const cookieStore = await cookies();
  const access = parseReportAccessCookie(cookieStore.get(AR_REPORT_COOKIE)?.value);
  if (!isReportAccessGranted(report, access)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (report.scanStatus !== "ready" || !report.scan) {
    return NextResponse.json(
      { error: "Report scan not complete" },
      { status: 409 },
    );
  }

  try {
    registerReportPdfFonts();

    const document = createElement(ReadinessReportPdf, {
      report: report.scan,
    }) as unknown as ReactElement<DocumentProps>;

    const buffer = await renderToBuffer(document);
    const filename = `${report.scan.slug}.pdf`;
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
    console.error("[ai-readiness-pdf]", id, error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 },
    );
  }
}
