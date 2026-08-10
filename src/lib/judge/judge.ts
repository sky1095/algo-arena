import type {
  ClassSpec,
  CompareMode,
  InputType,
  JudgeOutcome,
  JudgeResult,
  LanguageId,
  TestCase,
} from "@/lib/types";
import { deepEqual } from "@/lib/judge/compare";
import { executeSubmission } from "@/lib/judge/runner";

export interface JudgeRequest {
  lang: LanguageId;
  code: string;
  methodName: string;
  argTypes: InputType[];
  outputType: InputType;
  compare: CompareMode;
  testCases: TestCase[];
  classSpec?: ClassSpec;
}

interface ParsedCase {
  i: number;
  out?: unknown;
  err?: string;
}

/** Validate that `order` is a valid topological ordering of the graph described
 *  by a Course Schedule II test case (args = [numCourses, prerequisites]). */
function isTopoOrder(order: number[], tc: TestCase): boolean {
  const [numCourses, prerequisites] = tc.args as [number, [number, number][]];
  if (!Array.isArray(order)) return false;
  // An empty order is only valid when the graph contains a cycle (no full
  // topological order exists).
  if (order.length === 0) {
    const indeg = new Array<number>(numCourses).fill(0);
    const adj: number[][] = Array.from({ length: numCourses }, () => []);
    for (const [course, prereq] of prerequisites) {
      adj[prereq]!.push(course);
      indeg[course]++;
    }
    const q: number[] = [];
    for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
    let processed = 0;
    while (q.length) {
      const u = q.shift()!;
      processed++;
      for (const v of adj[u]!) if (--indeg[v] === 0) q.push(v);
    }
    return processed < numCourses;
  }
  if (order.length !== numCourses) return false;
  const pos = new Map<number, number>();
  order.forEach((c, i) => pos.set(c, i));
  if (pos.size !== numCourses) return false;
  for (const [course, prereq] of prerequisites) {
    const p = pos.get(prereq);
    const c = pos.get(course);
    if (p === undefined || c === undefined || p >= c) return false;
  }
  return true;
}

export async function judgeSolution(req: JudgeRequest): Promise<JudgeOutcome> {
  const exec = await executeSubmission(
    req.lang,
    req.code,
    req.methodName,
    req.argTypes,
    req.testCases,
    { runTimeoutMs: 8000, compileTimeoutMs: 25000 },
    req.outputType,
    req.classSpec
  );

  if (exec.compileFailed) {
    const msg = exec.compileError.trim().split("\n").slice(0, 8).join("\n");
    return {
      results: req.testCases.map((_, index) => ({
        index,
        passed: false,
        output: null,
        expected: req.testCases[index].output,
        error: msg || "Compilation failed",
      })),
      status: "Compile Error",
      runtimeMs: exec.compileMs,
      compileMs: exec.compileMs,
      userStdout: "",
    };
  }

  const results: JudgeResult[] = [];
  const parsed: ParsedCase[] = [];
  const userStdout: string[] = [];

  for (const line of exec.stdout.split("\n")) {
    if (line.startsWith("@@RESULT ")
) {
      try {
        const p = JSON.parse(line.slice(9)) as ParsedCase;
        parsed.push(p);
      } catch {
        /* ignore malformed */
      }
    } else if (line.startsWith("@@ERROR ")) {
      try {
        const raw = JSON.parse(line.slice(8)) as { i: number; out?: unknown; err?: string; msg?: string };
        parsed.push({ i: raw.i, out: raw.out, err: raw.err ?? raw.msg });
      } catch {
        /* ignore malformed */
      }
    } else if (line.trim().length > 0) {
      userStdout.push(line);
    }
  }

  const byIndex = new Map<number, ParsedCase>();
  for (const p of parsed) byIndex.set(p.i, p);

  let anyFailed = false;
  let anyError = false;

  for (let i = 0; i < req.testCases.length; i++) {
    const tc = req.testCases[i];
    const p = byIndex.get(i);
    if (!p) {
      results.push({
        index: i,
        passed: false,
        output: null,
        expected: tc.output,
        error: exec.timedOut ? "Time limit exceeded" : "Process exited before returning a result",
        timedOut: exec.timedOut,
      });
      anyFailed = true;
      anyError = true;
      continue;
    }
    if (p.err !== undefined) {
      results.push({
        index: i,
        passed: false,
        output: null,
        expected: tc.output,
        error: p.err,
      });
      anyFailed = true;
      anyError = true;
      continue;
    }
    let passed: boolean;
    if (req.compare === "topo" && Array.isArray(p.out)) {
      passed = isTopoOrder(p.out as number[], tc);
    } else {
      passed = req.classSpec ? deepEqual(p.out, tc.output, "exact") : deepEqual(p.out, tc.output, req.compare);
    }
    if (!passed) anyFailed = true;
    results.push({ index: i, passed, output: p.out, expected: tc.output });
  }

  let status: JudgeOutcome["status"];
  if (exec.timedOut) status = "Time Limit Exceeded";
  else if (anyError) status = "Runtime Error";
  else if (anyFailed) status = "Wrong Answer";
  else status = "Accepted";

  return {
    results,
    status,
    runtimeMs: exec.runMs,
    compileMs: exec.compileMs,
    userStdout: userStdout.join("\n").slice(0, 4000),
  };
}
