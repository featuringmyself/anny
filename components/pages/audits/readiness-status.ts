import type { ReadinessStatus } from "./types";

export function readinessStatusLabel(status: ReadinessStatus): string {
  switch (status) {
    case "good":
      return "Good";
    case "needs-improvement":
      return "Needs improvement";
    case "poor":
      return "Poor";
  }
}

/**
 * Status color → reader mind:
 * good = relief/pass (green), needs-improvement = vigilance (amber),
 * poor = threat (red). Always pair with the text label.
 */
export function readinessStatusClass(status: ReadinessStatus): string {
  switch (status) {
    case "good":
      return "text-brand";
    case "needs-improvement":
      return "text-amber-700";
    case "poor":
      return "text-[#b42318]";
  }
}
