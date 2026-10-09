import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "AI Visibility Intelligence Report by Dodox: why AI doesn't recommend you";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Keep this route self-contained. OG image bundles cannot import the audit
 * content module (or most of the app graph).
 */
async function loadLogo() {
  const bytes = await readFile(join(process.cwd(), "public/logo.png"));
  return `data:image/png;base64,${bytes.toString("base64")}`;
}

export default async function OpenGraphImage() {
  const logoSrc = await loadLogo();

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
          background: "#f6f7f4",
          color: "#025864",
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
            fontWeight: 700,
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

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              color: "#5c6b73",
            }}
          >
            AI Visibility Intelligence Report
          </div>
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              maxWidth: 980,
            }}
          >
            Why AI doesn&apos;t recommend you
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#5c6b73",
              lineHeight: 1.35,
              maxWidth: 920,
            }}
          >
            Who gets named, why competitor pages get cited, and the ranked plan
            that gets you onto the shortlist.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 22,
            color: "#7a8a91",
          }}
        >
          <span>49 prompts · 5 days · ₹5,000 / $100</span>
          <span style={{ color: "#025864", fontWeight: 600 }}>
            dodoxhq.com/audit
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
