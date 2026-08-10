import type { Difficulty } from "@/lib/types";

export function difficultyColor(d: Difficulty): string {
  switch (d) {
    case "Easy":
      return "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400";
    case "Medium":
      return "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400";
    case "Hard":
      return "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400";
  }
}

export function difficultyTextColor(d: Difficulty): string {
  switch (d) {
    case "Easy":
      return "text-green-600 dark:text-green-400";
    case "Medium":
      return "text-amber-500";
    case "Hard":
      return "text-red-500";
  }
}

export function formatValue(v: unknown): string {
  if (v === undefined) return "undefined";
  if (v === null) return "null";
  if (typeof v === "string") return v;
  return JSON.stringify(v);
}

export function formatRuntime(ms: number): string {
  if (ms >= 1000) return `${(ms / 1000).toFixed(2)} s`;
  return `${Math.max(1, Math.round(ms))} ms`;
}
