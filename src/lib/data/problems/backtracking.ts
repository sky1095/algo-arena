import type { Problem } from "@/lib/types";

export const backtrackingProblems: Problem[] = [
  {
    slug: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["Array", "Backtracking", "Bit Manipulation"],
    order: 1,
    description: `Given an integer array \`nums\` of **unique** elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.`,
    examples: [
      { args: [[1, 2, 3]], output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
      { args: [[0]], output: [[], [0]] },
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10", "All the numbers of nums are unique."],
    starter: {
      python: `from typing import List\n\n\ndef subsets(nums: List[int]) -> List[List[int]]:\n    pass\n`,
      javascript: `function subsets(nums) {\n    \n}`,
      typescript: `function subsets(nums: number[]): number[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "subsets",
    argTypes: ["int[]"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [[1, 2, 3]], output: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
      { args: [[0]], output: [[], [0]] },
    ],
    hiddenTests: [
      { args: [[]], output: [[]] },
      { args: [[1]], output: [[], [1]] },
      { args: [[1, 2]], output: [[], [1], [2], [1, 2]] },
      { args: [[5, 6, 7]], output: [[], [5], [6], [7], [5, 6], [5, 7], [6, 7], [5, 6, 7]] },
    ],
    editorial: {
      approach: `Recursively decide for each element whether to include it. At index \`i\`, branch twice: skip \`nums[i]\` or add it to the current path and recurse at \`i + 1\`. When \`i\` reaches the end, copy the current path into the result.

There are 2^n subsets, each built in O(n) worst case, so the total is O(n * 2^n).`,
      complexity: { time: "O(n * 2^n)", space: "O(n)" },
      code: {
        python: `def subsets(nums: List[int]) -> List[List[int]]:
    result = []

    def backtrack(i: int, path: List[int]) -> None:
        if i == len(nums):
            result.append(path.copy())
            return
        backtrack(i + 1, path)
        path.append(nums[i])
        backtrack(i + 1, path)
        path.pop()

    backtrack(0, [])
    return result`,
        javascript: `function subsets(nums) {
  const result = [];
  const backtrack = (i, path) => {
    if (i === nums.length) {
      result.push([...path]);
      return;
    }
    backtrack(i + 1, path);
    path.push(nums[i]);
    backtrack(i + 1, path);
    path.pop();
  };
  backtrack(0, []);
  return result;
}`,
        typescript: `function subsets(nums: number[]): number[][] {
  const result: number[][] = [];
  const backtrack = (i: number, path: number[]): void => {
    if (i === nums.length) {
      result.push([...path]);
      return;
    }
    backtrack(i + 1, path);
    path.push(nums[i]!);
    backtrack(i + 1, path);
    path.pop();
  };
  backtrack(0, []);
  return result;
}`,

        java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] nums, int start, List<Integer> cur, List<List<Integer>> res) {
        res.add(new ArrayList<>(cur));
        for (int i = start; i < nums.length; i++) {
            cur.add(nums[i]);
            backtrack(nums, i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        function<void(int)> backtrack = [&](int start) {
            res.push_back(cur);
            for (int i = start; i < (int)nums.size(); i++) {
                cur.push_back(nums[i]);
                backtrack(i + 1);
                cur.pop_back();
            }
        };
        backtrack(0);
        return res;
    }
};`,      },
    },
  },
  {
    slug: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["Array", "Backtracking"],
    order: 2,
    description: `Given an array of **distinct** integers \`candidates\` and a target integer \`target\`, return a list of all **unique combinations** of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in **any order**.

The **same** number may be chosen from \`candidates\` an **unlimited number of times**. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`,
    examples: [
      { args: [[2, 3, 6, 7], 7], output: [[2, 2, 3], [7]] },
      { args: [[2, 3, 5], 8], output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
      { args: [[2], 1], output: [] },
    ],
    constraints: ["1 <= candidates.length <= 30", "2 <= candidates[i] <= 40", "All elements of candidates are distinct.", "1 <= target <= 40"],
    starter: {
      python: `from typing import List\n\n\ndef combinationSum(candidates: List[int], target: int) -> List[List[int]]:\n    pass\n`,
      javascript: `function combinationSum(candidates, target) {\n    \n}`,
      typescript: `function combinationSum(candidates: number[], target: number): number[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        \n    }\n};`,
    },
    methodName: "combinationSum",
    argTypes: ["int[]", "int"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [[2, 3, 6, 7], 7], output: [[2, 2, 3], [7]] },
      { args: [[2, 3, 5], 8], output: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
      { args: [[2], 1], output: [] },
    ],
    hiddenTests: [
      { args: [[1], 1], output: [[1]] },
      { args: [[2], 3], output: [] },
      { args: [[3, 5, 8], 11], output: [[3, 8], [3, 3, 5]] },
      { args: [[1, 2], 4], output: [[1, 1, 1, 1], [1, 1, 2], [2, 2]] },
      { args: [[4, 2, 8], 8], output: [[2, 2, 2, 2], [2, 2, 4], [4, 4], [8]] },
    ],
    editorial: {
      approach: `Sort the candidates (helps pruning). Backtrack over indices: at each step, repeatedly add the current candidate while the remaining sum allows, then move to the next candidate. Restricting choices to \`start\` onward prevents permutations of the same combination.

When the remaining sum is zero, record the path. The recursion branches at most target/candidate times per path.`,
      complexity: { time: "O(target * 2^candidates)", space: "O(target)" },
      code: {
        python: `def combinationSum(candidates: List[int], target: int) -> List[List[int]]:
    candidates.sort()
    result = []

    def backtrack(start: int, remaining: int, path: List[int]) -> None:
        if remaining == 0:
            result.append(path.copy())
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            path.append(candidates[i])
            backtrack(i, remaining - candidates[i], path)
            path.pop()

    backtrack(0, target, [])
    return result`,
        javascript: `function combinationSum(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];
  const backtrack = (start, remaining, path) => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;
      path.push(candidates[i]);
      backtrack(i, remaining - candidates[i], path);
      path.pop();
    }
  };
  backtrack(0, target, []);
  return result;
}`,
        typescript: `function combinationSum(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];
  const backtrack = (start: number, remaining: number, path: number[]): void => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i]! > remaining) break;
      path.push(candidates[i]!);
      backtrack(i, remaining - candidates[i]!, path);
      path.pop();
    }
  };
  backtrack(0, target, []);
  return result;
}`,

        java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(candidates, target, 0, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] cand, int target, int start, List<Integer> cur, List<List<Integer>> res) {
        if (target == 0) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = start; i < cand.length; i++) {
            if (cand[i] > target) continue;
            cur.add(cand[i]);
            backtrack(cand, target - cand[i], i, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> cur;
        function<void(int,int)> backtrack = [&](int start, int remain) {
            if (remain == 0) {
                res.push_back(cur);
                return;
            }
            for (int i = start; i < (int)candidates.size(); i++) {
                if (candidates[i] > remain) continue;
                cur.push_back(candidates[i]);
                backtrack(i, remain - candidates[i]);
                cur.pop_back();
            }
        };
        backtrack(0, target);
        return res;
    }
};`,      },
    },
  },
  {
    slug: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["Array", "Backtracking"],
    order: 3,
    description: `Given an array \`nums\` of distinct integers, return all the possible permutations. You can return the answer in any order.`,
    examples: [
      { args: [[1, 2, 3]], output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
      { args: [[0, 1]], output: [[0, 1], [1, 0]] },
      { args: [[1]], output: [[1]] },
    ],
    constraints: ["1 <= nums.length <= 6", "-10 <= nums[i] <= 10", "All the integers of nums are unique."],
    starter: {
      python: `from typing import List\n\n\ndef permute(nums: List[int]) -> List[List[int]]:\n    pass\n`,
      javascript: `function permute(nums) {\n    \n}`,
      typescript: `function permute(nums: number[]): number[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "permute",
    argTypes: ["int[]"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [[1, 2, 3]], output: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
      { args: [[0, 1]], output: [[0, 1], [1, 0]] },
      { args: [[1]], output: [[1]] },
    ],
    hiddenTests: [
      { args: [[1, 2]], output: [[1, 2], [2, 1]] },
      { args: [[1, 2, 3, 4]], output: [[1, 2, 3, 4], [1, 2, 4, 3], [1, 3, 2, 4], [1, 3, 4, 2], [1, 4, 2, 3], [1, 4, 3, 2], [2, 1, 3, 4], [2, 1, 4, 3], [2, 3, 1, 4], [2, 3, 4, 1], [2, 4, 1, 3], [2, 4, 3, 1], [3, 1, 2, 4], [3, 1, 4, 2], [3, 2, 1, 4], [3, 2, 4, 1], [3, 4, 1, 2], [3, 4, 2, 1], [4, 1, 2, 3], [4, 1, 3, 2], [4, 2, 1, 3], [4, 2, 3, 1], [4, 3, 1, 2], [4, 3, 2, 1]] },
      { args: [[1, 2, 3]], output: [[3, 2, 1], [1, 2, 3], [2, 1, 3], [3, 1, 2], [1, 3, 2], [2, 3, 1]] },
    ],
    editorial: {
      approach: `Build permutations by swapping. At position \`i\`, swap \`nums[i]\` with every index \`j >= i\`, recurse at \`i + 1\`, then swap back to restore the array. When \`i\` reaches the end, the current arrangement is a permutation.

There are n! permutations, each recorded in O(n) — O(n * n!) total.`,
      complexity: { time: "O(n * n!)", space: "O(n)" },
      code: {
        python: `def permute(nums: List[int]) -> List[List[int]]:
    result = []

    def backtrack(i: int) -> None:
        if i == len(nums):
            result.append(nums.copy())
            return
        for j in range(i, len(nums)):
            nums[i], nums[j] = nums[j], nums[i]
            backtrack(i + 1)
            nums[i], nums[j] = nums[j], nums[i]

    backtrack(0)
    return result`,
        javascript: `function permute(nums) {
  const result = [];
  const backtrack = (i) => {
    if (i === nums.length) {
      result.push([...nums]);
      return;
    }
    for (let j = i; j < nums.length; j++) {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      backtrack(i + 1);
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  };
  backtrack(0);
  return result;
}`,
        typescript: `function permute(nums: number[]): number[][] {
  const result: number[][] = [];
  const backtrack = (i: number): void => {
    if (i === nums.length) {
      result.push([...nums]);
      return;
    }
    for (let j = i; j < nums.length; j++) {
      [nums[i], nums[j]] = [nums[j]!, nums[i]!];
      backtrack(i + 1);
      [nums[i], nums[j]] = [nums[j]!, nums[i]!];
    }
  };
  backtrack(0);
  return result;
}`,

        java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, new boolean[nums.length], new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] nums, boolean[] used, List<Integer> cur, List<List<Integer>> res) {
        if (cur.size() == nums.length) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue;
            used[i] = true;
            cur.add(nums[i]);
            backtrack(nums, used, cur, res);
            cur.remove(cur.size() - 1);
            used[i] = false;
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> cur;
        vector<bool> used(nums.size(), false);
        function<void()> backtrack = [&]() {
            if (cur.size() == nums.size()) {
                res.push_back(cur);
                return;
            }
            for (int i = 0; i < (int)nums.size(); i++) {
                if (used[i]) continue;
                used[i] = true;
                cur.push_back(nums[i]);
                backtrack();
                cur.pop_back();
                used[i] = false;
            }
        };
        backtrack();
        return res;
    }
};`,      },
    },
  },
  {
    slug: "n-queens",
    title: "N-Queens",
    difficulty: "Hard",
    category: "backtracking",
    topics: ["Array", "Backtracking"],
    order: 4,
    description: `The **n-queens** puzzle is the problem of placing \`n\` queens on an \`n x n\` chessboard such that no two queens attack each other.

Given an integer \`n\`, return all distinct solutions to the n-queens puzzle. You may return the answer in **any order**.

Each solution contains a distinct board configuration of the n-queens' placement, where \`'Q'\` and \`'.'\` both indicate a queen and an empty space, respectively.`,
    examples: [
      { args: [4], output: [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]] },
      { args: [1], output: [["Q"]] },
    ],
    constraints: ["1 <= n <= 9"],
    starter: {
      python: `from typing import List\n\n\ndef solveNQueens(n: int) -> List[List[str]]:\n    pass\n`,
      javascript: `function solveNQueens(n) {\n    \n}`,
      typescript: `function solveNQueens(n: number): string[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        \n    }\n};`,
    },
    methodName: "solveNQueens",
    argTypes: ["int"],
    outputType: "string[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [4], output: [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]] },
      { args: [1], output: [["Q"]] },
    ],
    hiddenTests: [
      { args: [2], output: [] },
      { args: [3], output: [] },
      { args: [5], output: [["Q....", "..Q..", "....Q", ".Q...", "...Q."], ["Q....", "...Q.", ".Q...", "....Q", "..Q.."], [".Q...", "...Q.", "Q....", "..Q..", "....Q"], [".Q...", "....Q", "..Q..", "Q....", "...Q."], ["...Q.", "Q....", "..Q..", "....Q", ".Q..."], ["...Q.", ".Q...", "....Q", "..Q..", "Q...."], ["..Q..", "Q....", "...Q.", ".Q...", "....Q"], ["..Q..", "....Q", ".Q...", "...Q.", "Q...."], ["....Q", ".Q...", "...Q.", "Q....", "..Q.."], ["....Q", "..Q..", "Q....", "...Q.", ".Q..."]] },
    ],
    editorial: {
      approach: `Place queens row by row. For each row, try every column; a column is valid if no queen occupies it, its diagonal \`row + col\`, or its anti-diagonal \`row - col\`. Track those three sets and recurse to the next row; backtrack by removing the queen.

The branching factor shrinks quickly and invalid placements are pruned early, so the practical runtime is far below the n^n worst case.`,
      complexity: { time: "O(n!)", space: "O(n)" },
      code: {
        python: `def solveNQueens(n: int) -> List[List[str]]:
    cols, diag, anti = set(), set(), set()
    board = [["."] * n for _ in range(n)]
    result = []

    def backtrack(row: int) -> None:
        if row == n:
            result.append(["".join(r) for r in board])
            return
        for col in range(n):
            if col in cols or (row + col) in diag or (row - col) in anti:
                continue
            cols.add(col)
            diag.add(row + col)
            anti.add(row - col)
            board[row][col] = "Q"
            backtrack(row + 1)
            board[row][col] = "."
            cols.remove(col)
            diag.remove(row + col)
            anti.remove(row - col)

    backtrack(0)
    return result`,
        javascript: `function solveNQueens(n) {
  const cols = new Set(), diag = new Set(), anti = new Set();
  const board = Array.from({ length: n }, () => new Array(n).fill("."));
  const result = [];

  const backtrack = (row) => {
    if (row === n) {
      result.push(board.map((r) => r.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag.has(row + col) || anti.has(row - col)) continue;
      cols.add(col);
      diag.add(row + col);
      anti.add(row - col);
      board[row][col] = "Q";
      backtrack(row + 1);
      board[row][col] = ".";
      cols.delete(col);
      diag.delete(row + col);
      anti.delete(row - col);
    }
  };
  backtrack(0);
  return result;
}`,
        typescript: `function solveNQueens(n: number): string[][] {
  const cols = new Set<number>(), diag = new Set<number>(), anti = new Set<number>();
  const board = Array.from({ length: n }, () => new Array<string>(n).fill("."));
  const result: string[][] = [];

  const backtrack = (row: number): void => {
    if (row === n) {
      result.push(board.map((r) => r.join("")));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag.has(row + col) || anti.has(row - col)) continue;
      cols.add(col);
      diag.add(row + col);
      anti.add(row - col);
      board[row][col] = "Q";
      backtrack(row + 1);
      board[row][col] = ".";
      cols.delete(col);
      diag.delete(row + col);
      anti.delete(row - col);
    }
  };
  backtrack(0);
  return result;
}`,

        java: `class Solution {
    public List<List<String>> solveNQueens(int n) {
        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];
        for (char[] row : board) Arrays.fill(row, '.');
        solve(board, 0, new boolean[n], new boolean[2 * n], new boolean[2 * n], res);
        return res;
    }

    private void solve(char[][] board, int r, boolean[] cols, boolean[] diag, boolean[] anti, List<List<String>> res) {
        int n = board.length;
        if (r == n) {
            List<String> rows = new ArrayList<>();
            for (char[] row : board) rows.add(new String(row));
            res.add(rows);
            return;
        }
        for (int c = 0; c < n; c++) {
            int d = r - c + n, a = r + c;
            if (cols[c] || diag[d] || anti[a]) continue;
            board[r][c] = 'Q';
            cols[c] = diag[d] = anti[a] = true;
            solve(board, r + 1, cols, diag, anti, res);
            cols[c] = diag[d] = anti[a] = false;
            board[r][c] = '.';
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        vector<bool> cols(n, false), diag(2 * n, false), anti(2 * n, false);
        function<void(int)> solve = [&](int r) {
            if (r == n) {
                res.push_back(board);
                return;
            }
            for (int c = 0; c < n; c++) {
                int d = r - c + n, a = r + c;
                if (cols[c] || diag[d] || anti[a]) continue;
                board[r][c] = 'Q';
                cols[c] = diag[d] = anti[a] = true;
                solve(r + 1);
                cols[c] = diag[d] = anti[a] = false;
                board[r][c] = '.';
            }
        };
        solve(0);
        return res;
    }
};`,      },
    },
  },
];
