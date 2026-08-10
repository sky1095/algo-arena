import type { CompareMode } from "@/lib/types";

const EPS = 1e-6;

function isNumber(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function deepEqual(a: unknown, b: unknown, compare: CompareMode): boolean {
  if (a === b) return true;
  if (a === null || b === null) return a === b;
  if (isNumber(a) && isNumber(b)) return Math.abs(a - b) <= EPS;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    if (compare === "anyOrder") {
      // Order is free at every nesting level (e.g. anagram groups, subsets,
      // permutations), so recurse with the same mode instead of "exact".
      const used = new Array(b.length).fill(false);
      for (const item of a) {
        let found = false;
        for (let j = 0; j < b.length; j++) {
          if (!used[j] && deepEqual(item, b[j], "anyOrder")) {
            used[j] = true;
            found = true;
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    }
    if (compare === "sorted") {
      const sortable = (arr: unknown[]) =>
        arr.every((x) => typeof x === "number" || typeof x === "string");
      if (sortable(a) && sortable(b)) {
        const sa = [...a].sort((x: any, y: any) => (x < y ? -1 : x > y ? 1 : 0));
        const sb = [...b].sort((x: any, y: any) => (x < y ? -1 : x > y ? 1 : 0));
        return sa.every((x, i) => deepEqual(x, sb[i], "exact"));
      }
    }
    return a.every((x, i) => deepEqual(x, b[i], "exact"));
  }
  if (typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a as object).sort();
    const kb = Object.keys(b as object).sort();
    if (ka.length !== kb.length) return false;
    return ka.every((k) => deepEqual((a as any)[k], (b as any)[k], "exact"));
  }
  return false;
}

/** Pretty-print a value for the result panel. */
export function pretty(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") return String(value);
  if (typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

export { deepEqual };
