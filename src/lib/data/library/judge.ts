import type { InputType, LanguageId, Problem } from "@/lib/types";
import { LIBRARY_PROBLEMS, libraryProblemBySlug, librarySolutionBySlug } from "@/lib/data/library";
import judgeData from "@/lib/data/library/judge.json";

interface LibraryJudgeEntry {
  methodName: string;
  paramNames: string[];
  argTypes: InputType[];
  outputType: InputType;
  compare: "exact" | "sorted" | "anyOrder" | "topo";
  visibleTests: { args: unknown[]; output: unknown }[];
  hiddenTests: { args: unknown[]; output: unknown }[];
}

const JUDGE = judgeData as Record<string, LibraryJudgeEntry>;

/** Library problems are solvable in these languages (JS-compatible numeric
 *  semantics; Java/C++ int-vs-double behavior can't be derived safely). */
export const LIBRARY_LANGS: LanguageId[] = ["python", "javascript", "typescript"];

const TS_RET: Record<string, string> = {
  int: "number",
  double: "number",
  bool: "boolean",
  string: "string",
  "int[]": "number[]",
  "double[]": "number[]",
  "bool[]": "boolean[]",
  "string[]": "string[]",
  "int[][]": "number[][]",
  "string[][]": "string[][]",
  "char[]": "string[]",
  "char[][]": "string[][]",
  void: "void",
};

const PY_RET: Record<string, string> = {
  int: "int",
  double: "float",
  bool: "bool",
  string: "str",
  "int[]": "List<int>",
  "double[]": "List<double>",
  "bool[]": "List<bool>",
  "string[]": "List<String>",
  "int[][]": "List<List<int>>",
  "string[][]": "List<List<String>>",
  "char[]": "List<String>",
  "char[][]": "List<List<String>>",
  void: "None",
};

const DART_RET: Record<string, string> = {
  int: "int",
  double: "double",
  bool: "bool",
  string: "String",
  "int[]": "List<int>",
  "double[]": "List<double>",
  "bool[]": "List<bool>",
  "string[]": "List<String>",
  "int[][]": "List<List<int>>",
  "string[][]": "List<List<String>>",
  "char[]": "List<String>",
  "char[][]": "List<List<String>>",
  void: "void",
};

function makeStarter(entry: LibraryJudgeEntry) {
  const args = entry.paramNames.join(", ");
  const pyTyped = entry.paramNames
    .map((n, i) => `${n}: ${PY_RET[entry.argTypes[i]] ?? "Any"}`)
    .join(", ");
  const tsTyped = entry.paramNames
    .map((n, i) => `${n}: ${TS_RET[entry.argTypes[i]] ?? "any"}`)
    .join(", ");
  const pyRet = PY_RET[entry.outputType] ?? "Any";
  const tsRet = TS_RET[entry.outputType] ?? "any";

  const dartTyped = entry.paramNames
    .map((n, i) => `${n}: ${DART_RET[entry.argTypes[i]] ?? 'dynamic'}`)
    .join(", ");
  const dartRet = DART_RET[entry.outputType] ?? 'dynamic';

  return {
    python: `from typing import List, Optional\n\n\ndef ${entry.methodName}(${pyTyped}) -> ${pyRet}:\n    pass\n`,
    javascript: `function ${entry.methodName}(${args}) {\n    \n}\n`,
    typescript: `function ${entry.methodName}(${tsTyped}): ${tsRet} {\n    \n}\n`,
    java: "",
    cpp: "",
    dart: `class Solution {\n  ${dartRet} ${entry.methodName}(${dartTyped}) {\n    \n  }\n}`,
  };
}

/**
 * Build a full judgeable `Problem` for a library archive problem. Accepts the
 * namespaced judge slug ("lib-<urlSlug>") so archive progress/code stays
 * separate from the roadmap problems. Returns undefined when the problem isn't
 * auto-judged (tree/linked-list/class problems stay view-only).
 */
export function libraryProblemAsProblem(slug: string): Problem | undefined {
  const urlSlug = slug.startsWith("lib-") ? slug.slice(4) : slug;
  const problem = libraryProblemBySlug(urlSlug);
  const solution = librarySolutionBySlug(urlSlug);
  const entry = JUDGE[urlSlug];
  if (!problem || !solution || !entry) return undefined;

  const examples = entry.visibleTests.map((t) => ({ args: t.args, output: t.output }));

  return {
    slug, // namespaced: "lib-two-sum"
    title: problem.title,
    difficulty: problem.difficulty,
    category: "library",
    topics: [],
    order: problem.id,
    description: solution.description,
    examples,
    constraints: [],
    starter: makeStarter(entry),
    methodName: entry.methodName,
    argTypes: entry.argTypes,
    outputType: entry.outputType,
    compare: entry.compare,
    visibleTests: entry.visibleTests,
    hiddenTests: entry.hiddenTests,
    availableLangs: LIBRARY_LANGS,
    isLibrary: true,
    editorial: {
      approach:
        "This problem comes from the open-source archive collection. The tests are generated automatically and validated against this reference solution — a correct implementation must match its output on the same inputs.",
      complexity: { time: "—", space: "—" },
      code: { javascript: solution.solution },
    },
  };
}

export const LIBRARY_JUDGED_COUNT = Object.keys(JUDGE).length;

export function isLibraryJudged(urlSlug: string): boolean {
  return urlSlug in JUDGE;
}

// Keep the module graph aware of the full problem list for static generation.
export { LIBRARY_PROBLEMS };
