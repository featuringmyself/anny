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

export function readinessStatusClass(status: ReadinessStatus): string {
  switch (status) {
    case "good":
      return "text-[#2462ff]";
    case "needs-improvement":
      return "text-amber-700";
    case "poor":
      return "text-zinc-900";
  }
}
