import { randomUUID } from "crypto";

import { cookies } from "next/headers";

import type { ReadinessReport } from "@/components/pages/audits/types";
import {
  SCAN_PHASE_LABELS,
  SCAN_PHASE_ORDER,
  createScanContext,
  runReadinessScanPhase,
} from "@/lib/ai-readiness-full";
import type { ScanPhaseId } from "@/lib/ai-readiness-scan-phases";
import {
  AR_REPORT_COOKIE,
  claimScanRunner,
  completeScan,
  getAiReadinessReportById,
  isReportAccessGranted,
  markScanPhaseFailed,
  mergeScanPartial,
  parseReportAccessCookie,
  releaseScanRunner,
  resumeFailedScan,
  updateScanStep,
} from "@/lib/ai-readiness-reports";
import { buildFinalReport } from "@/lib/ai-readiness-to-report";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

type RouteContext = {
  params: Promise<{ id: string }>;
};

type StreamEvent =
  | { type: "step_start"; phase: ScanPhaseId; label: string }
  | { type: "step_detail"; phase: ScanPhaseId; detail: string }
  | { type: "section_ready"; phase: ScanPhaseId; partial: Partial<ReadinessReport> }
  | { type: "step_done"; phase: ScanPhaseId; detail: string }
  | { type: "complete"; scan: ReadinessReport }
  | { type: "error"; message: string; phase?: ScanPhaseId };

function encodeEvent(event: StreamEvent) {
  return `data: ${JSON.stringify(event)}\n\n`;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function GET(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const resume = new URL(request.url).searchParams.get("resume") === "1";
  const report = await getAiReadinessReportById(id);

  if (!report) {
    return new Response("Not found", { status: 404 });
  }

  const cookieStore = await cookies();
  const access = parseReportAccessCookie(cookieStore.get(AR_REPORT_COOKIE)?.value);
  if (!isReportAccessGranted(report, access)) {
    return new Response("Unauthorized", { status: 401 });
  }

  if (resume) {
    await resumeFailedScan(id);
  }

  let activeReport = (await getAiReadinessReportById(id)) ?? report;
  const runnerId = randomUUID();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: StreamEvent) => {
        controller.enqueue(new TextEncoder().encode(encodeEvent(event)));
      };

      try {
        if (activeReport.scanStatus === "ready" && activeReport.scan) {
          for (const phase of SCAN_PHASE_ORDER) {
            send({
              type: "step_done",
              phase,
              detail: SCAN_PHASE_LABELS[phase],
            });
          }
          send({ type: "complete", scan: activeReport.scan });
          controller.close();
          return;
        }

        const claim = await claimScanRunner(id, runnerId);

        if (claim === "ready") {
          const fresh = await getAiReadinessReportById(id);
          if (fresh?.scan) {
            send({ type: "complete", scan: fresh.scan });
          }
          controller.close();
          return;
        }

        if (claim === "watch") {
          let lastCompleted = 0;
          for (let i = 0; i < 120; i += 1) {
            const fresh = await getAiReadinessReportById(id);
            if (!fresh) break;

            if (fresh.scanStatus === "ready" && fresh.scan) {
              send({ type: "complete", scan: fresh.scan });
              controller.close();
              return;
            }

            const completed = fresh.scanProgress?.completedPhases.length ?? 0;
            if (completed > lastCompleted && fresh.scanPartial) {
              const phase =
                fresh.scanProgress?.completedPhases[completed - 1];
              if (phase) {
                send({
                  type: "section_ready",
                  phase,
                  partial: fresh.scanPartial,
                });
              }
              lastCompleted = completed;
            }

            if (fresh.scanStatus === "failed") {
              send({
                type: "error",
                message: fresh.scanError ?? "Scan failed",
              });
              controller.close();
              return;
            }

            await sleep(1000);
          }

          controller.close();
          return;
        }

        const ctx = createScanContext({
          domain: activeReport.domain,
          origin: activeReport.origin,
          reportId: activeReport.id,
          quickScore: activeReport.quickScore,
          email: activeReport.email,
        });

        const completed = new Set(activeReport.scanProgress?.completedPhases ?? []);

        for (const phase of SCAN_PHASE_ORDER) {
          const alreadyDone = completed.has(phase);

          if (alreadyDone) {
            const fresh = await getAiReadinessReportById(id);
            if (fresh?.scanPartial) {
              send({
                type: "section_ready",
                phase,
                partial: fresh.scanPartial,
              });
            }
          } else {
            send({
              type: "step_start",
              phase,
              label: SCAN_PHASE_LABELS[phase],
            });
            await updateScanStep(id, phase, { status: "running" });
          }

          try {
            const result = await runReadinessScanPhase(phase, ctx, (detail) => {
              if (!alreadyDone) {
                send({ type: "step_detail", phase, detail });
              }
            });

            if (alreadyDone) {
              send({
                type: "step_done",
                phase,
                detail:
                  (await getAiReadinessReportById(id))?.scanProgress?.steps.find(
                    (s) => s.id === phase,
                  )?.detail ?? SCAN_PHASE_LABELS[phase],
              });
              continue;
            }

            const merged = await mergeScanPartial(id, result.partial, {
              phase,
              detail: result.detail,
              pagesScanned: ctx.pages.length,
            });

            send({
              type: "section_ready",
              phase,
              partial: merged ?? result.partial,
            });
            send({ type: "step_done", phase, detail: result.detail });
          } catch (error) {
            if (alreadyDone) continue;
            const message =
              error instanceof Error ? error.message : "Phase failed";
            await markScanPhaseFailed(id, phase, message);
            send({ type: "error", message, phase });
            controller.close();
            return;
          }
        }

        const finalReport = buildFinalReport(ctx, (await getAiReadinessReportById(id))?.scanPartial ?? {});
        await completeScan(id, finalReport, ctx.pages.length);
        send({ type: "complete", scan: finalReport });
        controller.close();
      } catch (error) {
        const message = error instanceof Error ? error.message : "Stream failed";
        controller.enqueue(
          new TextEncoder().encode(
            encodeEvent({ type: "error", message }),
          ),
        );
        controller.close();
      } finally {
        await releaseScanRunner(id, runnerId);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
