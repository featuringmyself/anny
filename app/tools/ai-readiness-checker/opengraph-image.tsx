import { ImageResponse } from "next/og";

import {
  AI_READINESS_OG_ALT,
  AI_READINESS_OG_HEIGHT,
  AI_READINESS_OG_WIDTH,
} from "@/components/pages/tools/ai-readiness/seo";

export const alt = AI_READINESS_OG_ALT;
export const size = {
  width: AI_READINESS_OG_WIDTH,
  height: AI_READINESS_OG_HEIGHT,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "#0c0c0e",
          color: "#f7f7f7",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              background: "#45ab8d",
              display: "flex",
            }}
          />
          Anny
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "#7ea1ff",
            }}
          >
            Free tool
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Free AI readiness checker
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a1a1aa",
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            Score whether ChatGPT can crawl and name a site. Copy-paste
            robots.txt, JSON-LD, and sitemap fixes.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#71717a",
          }}
        >
          <span>0–100 on-site score · No signup</span>
          <span style={{ color: "#9dffd4" }}>anny.dodoxhq.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
