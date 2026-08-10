import type { Difficulty } from "@/lib/types";
import meta from "@/lib/data/library/meta.json";
import solutions from "@/lib/data/library/solutions.json";

export interface LibraryProblem {
  id: number; // Problem number in the archive
  title: string;
  difficulty: Difficulty;
  slug: string;
}

export interface LibrarySolution {
  description: string;
  solution: string;
}

export const LIBRARY_PROBLEMS = meta as LibraryProblem[];
export const LIBRARY_TOTAL = LIBRARY_PROBLEMS.length;

const bySlug = new Map(LIBRARY_PROBLEMS.map((p) => [p.slug, p]));

export function libraryProblemBySlug(slug: string): LibraryProblem | undefined {
  return bySlug.get(slug);
}

export function librarySolutionBySlug(slug: string): LibrarySolution | undefined {
  const s = (solutions as Record<string, LibrarySolution>)[slug];
  if (!s) return undefined;
  return { description: s.description, solution: s.solution };
}

// Rough topic bucket from the file slug pattern is not available; instead we
// offer a per-difficulty breakdown for stats.
export function libraryStats() {
  const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 } as Record<Difficulty, number>;
  for (const p of LIBRARY_PROBLEMS) byDifficulty[p.difficulty] += 1;
  return { total: LIBRARY_TOTAL, byDifficulty };
}
