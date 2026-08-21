import path from "path";

import { Font } from "@react-pdf/renderer";

let registered = false;

/** Register Space Grotesk once per server process for PDF generation. */
export function registerReportPdfFonts() {
  if (registered) return;

  const dir = path.join(process.cwd(), "public/fonts/space-grotesk");

  Font.register({
    family: "SpaceGrotesk",
    fonts: [
      { src: path.join(dir, "SpaceGrotesk-400.ttf"), fontWeight: 400 },
      { src: path.join(dir, "SpaceGrotesk-500.ttf"), fontWeight: 500 },
      { src: path.join(dir, "SpaceGrotesk-600.ttf"), fontWeight: 600 },
    ],
  });

  // Avoid mid-word hyphenation that looks broken in audit copy.
  Font.registerHyphenationCallback((word) => [word]);

  registered = true;
}
