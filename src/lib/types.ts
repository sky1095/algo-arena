export type Difficulty = "Easy" | "Medium" | "Hard";

export type CompareMode = "exact" | "sorted" | "anyOrder" | "topo";

export type InputType =
  | "int"
  | "double"
  | "bool"
  | "string"
  | "int[]"
  | "int[][]"
  | "double[]"
  | "string[]"
  | "bool[]"
  | "string[][]"
  | "char[]"
  | "char[][]"
  | "tree" // TreeNode, given as level-order array in tests
  | "linked" // ListNode, given as array in tests
  | "linked[]" // ListNode[], each given as an array (e.g. Merge k Sorted Lists)
  | "randomLinked" // ListNode with a random pointer: [[val, randomIdx|null], ...]
  | "cycle" // ListNode with a cycle, given as [values, pos-index] (pos = -1 for none)
  | "graph" // undirected graph given as 1-indexed adjacency list
  | "void"; // only valid as outputType: the function mutates its first argument

export type LanguageId = "python" | "javascript" | "typescript" | "java" | "cpp";

export interface TestCase {
  args: unknown[];
  output: unknown;
}

export interface ClassOp {
  name: string;
  argTypes: InputType[];
  ret?: "void" | "value";
}

export interface ClassSpec {
  className: string;
  ops: ClassOp[];
}

export interface ClassTestCase {
  ops: string[];
  args: unknown[][];
  output: unknown[];
}

export interface Example extends TestCase {
  explain?: string;
}

export interface ClassExample extends ClassTestCase {
  explain?: string;
}

export interface ProblemStarter {
  python: string;
  javascript: string;
  typescript: string;
  java: string;
  cpp: string;
}

export interface EditorialCode {
  python?: string;
  javascript?: string;
  typescript?: string;
  java?: string;
  cpp?: string;
}

export interface Problem {
  slug: string;
  title: string;
  difficulty: Difficulty;
  category: string; // category id
  topics: string[];
  order: number; // position within the category roadmap
  description: string; // markdown
  examples: (Example | ClassExample)[];
  constraints: string[];
  starter: ProblemStarter;
  methodName: string;
  argTypes: InputType[];
  outputType: InputType;
  compare: CompareMode;
  visibleTests: (TestCase | ClassTestCase)[];
  hiddenTests: (TestCase | ClassTestCase)[];
  classSpec?: ClassSpec;
  /** Restrict the language selector (e.g. archive problems: JS/TS/Python only). */
  availableLangs?: LanguageId[];
  /** Marks archive problems so the workspace breadcrumb links to the library. */
  isLibrary?: boolean;
  editorial: {
    approach: string; // markdown
    complexity: { time: string; space: string };
    code: EditorialCode;
  };
}

export interface Category {
  id: string;
  name: string;
  color: string; // hex accent
  description: string;
  order: number;
  section: "Data Structures" | "Algorithms";
  problems: string[]; // slugs in roadmap order
}

export type ProblemStatus = "solved" | "attempted";

export interface Submission {
  id: string;
  slug: string;
  language: LanguageId;
  code: string;
  status: "Accepted" | "Wrong Answer" | "Runtime Error" | "Time Limit Exceeded" | "Compile Error";
  runtimeMs: number;
  createdAt: number; // epoch ms
  testResults?: JudgeResult[];
}

export interface JudgeResult {
  index: number;
  passed: boolean;
  output: unknown;
  expected: unknown;
  error?: string;
  timedOut?: boolean;
}

export interface JudgeOutcome {
  results: JudgeResult[];
  status: Submission["status"];
  runtimeMs: number;
  compileMs: number;
  userStdout: string;
}

export interface UserProfile {
  email: string;
  name: string;
  joinedAt: number;
}
