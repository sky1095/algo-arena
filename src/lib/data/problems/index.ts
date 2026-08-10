import type { Problem } from "@/lib/types";
import { CATEGORIES } from "@/lib/data/categories";
import { arraysHashingProblems } from "@/lib/data/problems/arrays-hashing";
import { arraysHashingExtra } from "@/lib/data/problems/arrays-hashing-extra";
import { twoPointersProblems } from "@/lib/data/problems/two-pointers";
import { twoPointersExtra } from "@/lib/data/problems/two-pointers-extra";
import { slidingWindowProblems } from "@/lib/data/problems/sliding-window";
import { slidingWindowExtra } from "@/lib/data/problems/sliding-window-extra";
import { stackProblems } from "@/lib/data/problems/stack";
import { stackExtra } from "@/lib/data/problems/stack-extra";
import { binarySearchProblems } from "@/lib/data/problems/binary-search";
import { binarySearchExtra } from "@/lib/data/problems/binary-search-extra";
import { linkedListProblems } from "@/lib/data/problems/linked-list";
import { linkedListExtra } from "@/lib/data/problems/linked-list-extra";
import { treesProblems } from "@/lib/data/problems/trees";
import { treesExtra } from "@/lib/data/problems/trees-extra";
import { triesProblems } from "@/lib/data/problems/tries";
import { heapProblems } from "@/lib/data/problems/heap-priority-queue";
import { heapExtra } from "@/lib/data/problems/heap-extra";
import { backtrackingProblems } from "@/lib/data/problems/backtracking";
import { backtrackingExtra } from "@/lib/data/problems/backtracking-extra";
import { graphsProblems } from "@/lib/data/problems/graphs";
import { graphsExtra } from "@/lib/data/problems/graphs-extra";
import { advancedGraphsProblems } from "@/lib/data/problems/advanced-graphs";
import { advancedGraphsExtra } from "@/lib/data/problems/advanced-graphs-extra";
import { oneDDpProblems } from "@/lib/data/problems/1d-dp";
import { oneDDpExtra } from "@/lib/data/problems/1d-dp-extra";
import { twoDDpProblems } from "@/lib/data/problems/2d-dp";
import { twoDDpExtra } from "@/lib/data/problems/2d-dp-extra";
import { greedyProblems } from "@/lib/data/problems/greedy";
import { greedyExtra } from "@/lib/data/problems/greedy-extra";
import { intervalsProblems } from "@/lib/data/problems/intervals";
import { intervalsExtra } from "@/lib/data/problems/intervals-extra";
import { mathGeometryProblems } from "@/lib/data/problems/math-geometry";
import { mathGeometryExtra } from "@/lib/data/problems/math-geometry-extra";
import { bitManipulationProblems } from "@/lib/data/problems/bit-manipulation";
import { bitManipulationExtra } from "@/lib/data/problems/bit-manipulation-extra";

export const ALL_PROBLEMS: Problem[] = [
  ...arraysHashingProblems,
  ...arraysHashingExtra,
  ...twoPointersProblems,
  ...twoPointersExtra,
  ...slidingWindowProblems,
  ...slidingWindowExtra,
  ...stackProblems,
  ...stackExtra,
  ...binarySearchProblems,
  ...binarySearchExtra,
  ...linkedListProblems,
  ...linkedListExtra,
  ...treesProblems,
  ...treesExtra,
  ...triesProblems,
  ...heapProblems,
  ...heapExtra,
  ...backtrackingProblems,
  ...backtrackingExtra,
  ...graphsProblems,
  ...graphsExtra,
  ...advancedGraphsProblems,
  ...advancedGraphsExtra,
  ...oneDDpProblems,
  ...oneDDpExtra,
  ...twoDDpProblems,
  ...twoDDpExtra,
  ...greedyProblems,
  ...greedyExtra,
  ...intervalsProblems,
  ...intervalsExtra,
  ...mathGeometryProblems,
  ...mathGeometryExtra,
  ...bitManipulationProblems,
  ...bitManipulationExtra,
];

// Wire problems into their categories (in roadmap order).
const bySlug = new Map(ALL_PROBLEMS.map((p) => [p.slug, p]));
for (const cat of CATEGORIES) {
  cat.problems = ALL_PROBLEMS.filter((p) => p.category === cat.id)
    .sort((a, b) => a.order - b.order)
    .map((p) => p.slug);
}

export function problemBySlug(slug: string): Problem | undefined {
  return bySlug.get(slug);
}

export function problemsInCategory(categoryId: string): Problem[] {
  return ALL_PROBLEMS.filter((p) => p.category === categoryId).sort((a, b) => a.order - b.order);
}

export const TOTAL_PROBLEMS = ALL_PROBLEMS.length;

export function dailyProblem(date: Date = new Date()): Problem {
  const start = new Date(date.getFullYear(), 0, 0);
  const day = Math.floor((date.getTime() - start.getTime()) / 86_400_000);
  return ALL_PROBLEMS[day % ALL_PROBLEMS.length];
}

export function problemListMeta() {
  return ALL_PROBLEMS.map((p) => ({
    slug: p.slug,
    title: p.title,
    difficulty: p.difficulty,
    category: p.category,
    topics: p.topics,
    order: p.order,
  }));
}
