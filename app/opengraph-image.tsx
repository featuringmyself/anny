import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "Dodox SEO & GEO Agent + AI Monitoring dashboard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadAsset(relativePath: string, mime: string) {
  const bytes = await readFile(join(process.cwd(), relativePath));
  return `data:${mime};base64,${bytes.toString("base64")}`;
}

/**
 * Site-wide OG. Real logo + real product dashboard crop only.
 * No app-module imports — OG routes must stay self-contained.
 */
export default async function OpenGraphImage() {
  const [logoSrc, dashSrc] = await Promise.all([
    loadAsset("public/logo.png", "image/png"),
    loadAsset("public/og/product-dashboard.jpg", "image/jpeg"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f6f7f4",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif',
        }}
      >
        <div
          style={{
            width: "40%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "56px 36px 52px 56px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 28,
              fontWeight: 700,
              color: "#025864",
              letterSpacing: "-0.02em",
            }}
          >
            <img
              src={logoSrc}
              width={40}
              height={40}
              alt=""
              style={{ objectFit: "contain" }}
            />
            Dodox
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                fontSize: 46,
                fontWeight: 700,
                color: "#025864",
                letterSpacing: "-0.035em",
                lineHeight: 1.08,
              }}
            >
              SEO &amp; GEO Agent + AI Monitoring
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: "#5c6b73",
                lineHeight: 1.35,
              }}
            >
              Track ChatGPT, Claude, Gemini, Grok, and Perplexity — then ship
              the work that earns citations.
            </div>
          </div>

          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#025864",
            }}
          >
            dodoxhq.com
          </div>
        </div>

        <div
          style={{
            width: "60%",
            height: "100%",
            display: "flex",
            alignItems: "stretch",
            padding: "28px 28px 28px 0",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid rgba(2, 88, 100, 0.1)",
              boxShadow: "0 18px 40px rgba(2, 88, 100, 0.14)",
              background: "#e8ebe6",
            }}
          >
            <img
              src={dashSrc}
              width={680}
              height={574}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "left top",
              }}
            />
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
