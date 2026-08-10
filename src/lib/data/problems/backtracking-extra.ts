import type { Problem } from "@/lib/types";

export const backtrackingExtra: Problem[] = [
  {
    slug: "subsets-ii",
    title: "Subsets II",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["Array", "Backtracking"],
    order: 5,
    description: `Given an integer array \`nums\` that may contain **duplicates**, return all possible subsets (the power set).
\nThe solution set must not contain duplicate subsets. Return the solution in **any order**.`,
    examples: [
      { args: [[1, 2, 2]], output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
      { args: [[0]], output: [[], [0]] },
    ],
    constraints: ["1 <= nums.length <= 10", "-10 <= nums[i] <= 10"],
    starter: {
      python: `from typing import List\n\n\ndef subsetsWithDup(nums: List[int]) -> List[List[int]]:\n    pass\n`,
      javascript: `function subsetsWithDup(nums) {\n    \n}`,
      typescript: `function subsetsWithDup(nums: number[]): number[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<Integer>> subsetsWithDup(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> subsetsWithDup(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "subsetsWithDup",
    argTypes: ["int[]"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [[1, 2, 2]], output: [[], [1], [1, 2], [1, 2, 2], [2], [2, 2]] },
      { args: [[0]], output: [[], [0]] },
    ],
    hiddenTests: [
      { args: [[]], output: [[]] },
      { args: [[1]], output: [[], [1]] },
      { args: [[1, 1]], output: [[], [1], [1, 1]] },
      { args: [[1, 2, 2, 3]], output: [[], [1], [1, 2], [1, 2, 2], [1, 2, 2, 3], [1, 2, 3], [1, 3], [2], [2, 2], [2, 2, 3], [2, 3], [3]] },
      { args: [[4, 4, 4, 1, 4]], output: [[], [1], [1, 4], [1, 4, 4], [1, 4, 4, 4], [1, 4, 4, 4, 4], [4], [4, 4], [4, 4, 4], [4, 4, 4, 4]] },
    ],
    editorial: {
      approach: `Sort \`nums\` so duplicates are adjacent. Backtrack over indices; at each level, when the loop skips a value equal to the previous one (for \`i > start\`), we avoid generating duplicate subsets. Append a copy of the current path at every node.\n\nSame complexity as Subsets: O(n * 2^n) time, O(n) recursion space.`,
      complexity: { time: "O(n * 2^n)", space: "O(n)" },
      code: {
        python: `def subsetsWithDup(nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []

    def backtrack(start: int, path: List[int]) -> None:
        result.append(path.copy())
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            backtrack(i + 1, path)
            path.pop()

    backtrack(0, [])
    return result`,
        javascript: `function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const backtrack = (start, path) => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
}`,
        typescript: `function subsetsWithDup(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const backtrack = (start: number, path: number[]): void => {
    result.push([...path]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue;
      path.push(nums[i]!);
      backtrack(i + 1, path);
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
}`,

        java: `class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(int[] nums, int start, List<Integer> cur, List<List<Integer>> res) {
        res.add(new ArrayList<>(cur));
        for (int i = start; i < nums.length; i++) {
            if (i > start && nums[i] == nums[i - 1]) continue;
            cur.add(nums[i]);
            backtrack(nums, i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> cur;
        function<void(int)> backtrack = [&](int start) {
            res.push_back(cur);
            for (int i = start; i < (int)nums.size(); i++) {
                if (i > start && nums[i] == nums[i - 1]) continue;
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
    slug: "combination-sum-ii",
    title: "Combination Sum II",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["Array", "Backtracking"],
    order: 6,
    description: `Given a collection of candidate numbers (\`candidates\`) and a target number (\`target\`), find all unique combinations in \`candidates\` where the candidate numbers sum to \`target\`.
\nEach number in \`candidates\` may only be used **once** in the combination.\n\nNote: The solution set must not contain duplicate combinations.`,
    examples: [
      { args: [[10, 1, 2, 7, 6, 1, 5], 8], output: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
      { args: [[2, 5, 2, 1, 2], 5], output: [[1, 2, 2], [5]] },
    ],
    constraints: ["1 <= candidates.length <= 100", "1 <= candidates[i] <= 50", "1 <= target <= 30"],
    starter: {
      python: `from typing import List\n\n\ndef combinationSum2(candidates: List[int], target: int) -> List[List[int]]:\n    pass\n`,
      javascript: `function combinationSum2(candidates, target) {\n    \n}`,
      typescript: `function combinationSum2(candidates: number[], target: number): number[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<Integer>> combinationSum2(int[] candidates, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {\n        \n    }\n};`,
    },
    methodName: "combinationSum2",
    argTypes: ["int[]", "int"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [[10, 1, 2, 7, 6, 1, 5], 8], output: [[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]] },
      { args: [[2, 5, 2, 1, 2], 5], output: [[1, 2, 2], [5]] },
    ],
    hiddenTests: [
      { args: [[1], 1], output: [[1]] },
      { args: [[1], 2], output: [] },
      { args: [[1, 1, 1, 1], 2], output: [[1, 1]] },
      { args: [[2, 2, 2], 4], output: [[2, 2]] },
      { args: [[3, 1, 3, 5, 1, 1], 8], output: [[1, 1, 1, 5], [1, 1, 3, 3], [3, 5]] },
      { args: [[1, 2, 3, 6, 7], 7], output: [[1, 6], [7]] },
    ],
    editorial: {
      approach: `Sort candidates so duplicates are adjacent. Backtrack with \`start\` index; each candidate can be used once, so after taking \`candidates[i]\` recurse at \`i + 1\`. Skip duplicate values within the same level (\`i > start && candidates[i] == candidates[i - 1]\`) to avoid duplicate combinations. Prune when the candidate exceeds the remaining target.\n\nWorst case O(2^n) time.`,
      complexity: { time: "O(2^n)", space: "O(n)" },
      code: {
        python: `def combinationSum2(candidates: List[int], target: int) -> List[List[int]]:
    candidates.sort()
    result = []

    def backtrack(start: int, remaining: int, path: List[int]) -> None:
        if remaining == 0:
            result.append(path.copy())
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            if i > start and candidates[i] == candidates[i - 1]:
                continue
            path.append(candidates[i])
            backtrack(i + 1, remaining - candidates[i], path)
            path.pop()

    backtrack(0, target, [])
    return result`,
        javascript: `function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];
  const backtrack = (start, remaining, path) => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break;
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      path.push(candidates[i]);
      backtrack(i + 1, remaining - candidates[i], path);
      path.pop();
    }
  };
  backtrack(0, target, []);
  return result;
}`,
        typescript: `function combinationSum2(candidates: number[], target: number): number[][] {
  candidates.sort((a, b) => a - b);
  const result: number[][] = [];
  const backtrack = (start: number, remaining: number, path: number[]): void => {
    if (remaining === 0) {
      result.push([...path]);
      return;
    }
    for (let i = start; i < candidates.length; i++) {
      if (candidates[i]! > remaining) break;
      if (i > start && candidates[i] === candidates[i - 1]) continue;
      path.push(candidates[i]!);
      backtrack(i + 1, remaining - candidates[i]!, path);
      path.pop();
    }
  };
  backtrack(0, target, []);
  return result;
}`,

        java: `class Solution {
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
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
            if (i > start && cand[i] == cand[i - 1]) continue;
            if (cand[i] > target) break;
            cur.add(cand[i]);
            backtrack(cand, target - cand[i], i + 1, cur, res);
            cur.remove(cur.size() - 1);
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> cur;
        function<void(int,int)> backtrack = [&](int start, int remain) {
            if (remain == 0) {
                res.push_back(cur);
                return;
            }
            for (int i = start; i < (int)candidates.size(); i++) {
                if (i > start && candidates[i] == candidates[i - 1]) continue;
                if (candidates[i] > remain) break;
                cur.push_back(candidates[i]);
                backtrack(i + 1, remain - candidates[i]);
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
    slug: "word-search",
    title: "Word Search",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["Array", "Backtracking", "Matrix"],
    order: 7,
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.
\nThe word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once.`,
    examples: [
      {
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCCED",
        ],
        output: true,
      },
      {
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "SEE",
        ],
        output: true,
      },
      {
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCB",
        ],
        output: false,
      },
    ],
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 6", "1 <= word.length <= 15", "board and word consist of only lowercase and uppercase English letters."],
    starter: {
      python: `from typing import List\n\n\ndef exist(board: List[List[str]], word: str) -> bool:\n    pass\n`,
      javascript: `function exist(board, word) {\n    \n}`,
      typescript: `function exist(board: string[][], word: string): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean exist(char[][] board, String word) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool exist(vector<vector<char>>& board, string word) {\n        \n    }\n};`,
    },
    methodName: "exist",
    argTypes: ["char[][]", "string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      {
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCCED",
        ],
        output: true,
      },
      {
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "SEE",
        ],
        output: true,
      },
      {
        args: [
          [
            ["A", "B", "C", "E"],
            ["S", "F", "C", "S"],
            ["A", "D", "E", "E"],
          ],
          "ABCB",
        ],
        output: false,
      },
    ],
    hiddenTests: [
      { args: [[["A"]], "A"], output: true },
      { args: [[["A"]], "B"], output: false },
      { args: [[["A", "B"], ["C", "D"]], "ACDB"], output: true },
      { args: [[["A", "B"], ["C", "D"]], "ABCD"], output: false },
      { args: [[["a", "a", "a"], ["a", "b", "a"]], "abaa"], output: true },
      { args: [[["C", "A", "A"], ["A", "A", "A"], ["B", "C", "D"]], "AAB"], output: true },
    ],
    editorial: {
      approach: `DFS from every cell that matches the first character. At each step mark the current cell visited (temporarily replace it with a sentinel), try all four directions, then restore it. If we reach the end of the word, return true.\n\nTime O(m * n * 4^L) worst case, space O(L) for the recursion depth.`,
      complexity: { time: "O(m * n * 4^L)", space: "O(L)" },
      code: {
        python: `def exist(board: List[List[str]], word: str) -> bool:
    rows, cols = len(board), len(board[0])

    def dfs(r: int, c: int, i: int) -> bool:
        if i == len(word):
            return True
        if r < 0 or r >= rows or c < 0 or c >= cols or board[r][c] != word[i]:
            return False
        board[r][c] = "#"
        found = (
            dfs(r + 1, c, i + 1)
            or dfs(r - 1, c, i + 1)
            or dfs(r, c + 1, i + 1)
            or dfs(r, c - 1, i + 1)
        )
        board[r][c] = word[i]
        return found

    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0):
                return True
    return False`,
        javascript: `function exist(board, word) {
  const rows = board.length, cols = board[0].length;
  const dfs = (r, c, i) => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== word[i]) return false;
    const ch = board[r][c];
    board[r][c] = "#";
    const found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r][c] = ch;
    return found;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}`,
        typescript: `function exist(board: string[][], word: string): boolean {
  const rows = board.length, cols = board[0]!.length;
  const dfs = (r: number, c: number, i: number): boolean => {
    if (i === word.length) return true;
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r]![c] !== word[i]) return false;
    const ch = board[r]![c]!;
    board[r]![c] = "#";
    const found = dfs(r + 1, c, i + 1) || dfs(r - 1, c, i + 1) || dfs(r, c + 1, i + 1) || dfs(r, c - 1, i + 1);
    board[r]![c] = ch;
    return found;
  };
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (dfs(r, c, 0)) return true;
    }
  }
  return false;
}`,

        java: `class Solution {
    public boolean exist(char[][] board, String word) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, 0, i, j)) return true;
            }
        }
        return false;
    }

    private boolean dfs(char[][] board, String word, int k, int i, int j) {
        if (k == word.length()) return true;
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != word.charAt(k)) return false;
        char tmp = board[i][j];
        board[i][j] = '#';
        boolean found = dfs(board, word, k + 1, i + 1, j) || dfs(board, word, k + 1, i - 1, j)
            || dfs(board, word, k + 1, i, j + 1) || dfs(board, word, k + 1, i, j - 1);
        board[i][j] = tmp;
        return found;
    }
}`,
        cpp: `class Solution {
public:
    bool exist(vector<vector<char>>& board, string word) {
        int m = board.size(), n = board[0].size();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (dfs(board, word, 0, i, j)) return true;
            }
        }
        return false;
    }

    bool dfs(vector<vector<char>>& board, string& word, int k, int i, int j) {
        if (k == (int)word.size()) return true;
        if (i < 0 || i >= (int)board.size() || j < 0 || j >= (int)board[0].size() || board[i][j] != word[k]) return false;
        char tmp = board[i][j];
        board[i][j] = '#';
        bool found = dfs(board, word, k + 1, i + 1, j) || dfs(board, word, k + 1, i - 1, j)
            || dfs(board, word, k + 1, i, j + 1) || dfs(board, word, k + 1, i, j - 1);
        board[i][j] = tmp;
        return found;
    }
};`,      },
    },
  },
  {
    slug: "palindrome-partitioning",
    title: "Palindrome Partitioning",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["String", "Backtracking", "Dynamic Programming"],
    order: 8,
    description: `Given a string \`s\`, partition \`s\` such that every substring of the partition is a **palindrome**. Return all possible palindrome partitioning of \`s\`.`,
    examples: [
      { args: ["aab"], output: [["a", "a", "b"], ["aa", "b"]] },
      { args: ["a"], output: [["a"]] },
    ],
    constraints: ["1 <= s.length <= 16", "s contains only lowercase English letters."],
    starter: {
      python: `from typing import List\n\n\ndef partition(s: str) -> List[List[str]]:\n    pass\n`,
      javascript: `function partition(s) {\n    \n}`,
      typescript: `function partition(s: string): string[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<String>> partition(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> partition(string s) {\n        \n    }\n};`,
    },
    methodName: "partition",
    argTypes: ["string"],
    outputType: "string[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: ["aab"], output: [["a", "a", "b"], ["aa", "b"]] },
      { args: ["a"], output: [["a"]] },
    ],
    hiddenTests: [
      { args: ["ab"], output: [["a", "b"]] },
      { args: ["aa"], output: [["a", "a"], ["aa"]] },
      { args: ["aaa"], output: [["a", "a", "a"], ["a", "aa"], ["aa", "a"], ["aaa"]] },
      { args: ["aabbaa"], output: [["a", "a", "b", "b", "a", "a"], ["a", "a", "b", "b", "aa"], ["a", "a", "bb", "a", "a"], ["a", "a", "bb", "aa"], ["a", "abba", "a"], ["aa", "b", "b", "a", "a"], ["aa", "b", "b", "aa"], ["aa", "bb", "a", "a"], ["aa", "bb", "aa"], ["aabbaa"]] },
    ],
    editorial: {
      approach: `Backtrack over cut positions. At index \`start\`, try every end \`end\` where \`s[start:end+1]\` is a palindrome; recurse from \`end + 1\`. When \`start\` reaches the end of the string, record the path.\n\nPrecomputing palindrome booleans with DP is optional given n <= 16; checking each substring is cheap enough.`,
      complexity: { time: "O(n * 2^n)", space: "O(n)" },
      code: {
        python: `def partition(s: str) -> List[List[str]]:
    result = []

    def is_pal(i: int, j: int) -> bool:
        while i < j:
            if s[i] != s[j]:
                return False
            i += 1
            j -= 1
        return True

    def backtrack(start: int, path: List[str]) -> None:
        if start == len(s):
            result.append(path.copy())
            return
        for end in range(start, len(s)):
            if is_pal(start, end):
                path.append(s[start : end + 1])
                backtrack(end + 1, path)
                path.pop()

    backtrack(0, [])
    return result`,
        javascript: `function partition(s) {
  const result = [];
  const isPal = (i, j) => {
    while (i < j) {
      if (s[i] !== s[j]) return false;
      i++; j--;
    }
    return true;
  };
  const backtrack = (start, path) => {
    if (start === s.length) {
      result.push([...path]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };
  backtrack(0, []);
  return result;
}`,
        typescript: `function partition(s: string): string[][] {
  const result: string[][] = [];
  const isPal = (i: number, j: number): boolean => {
    while (i < j) {
      if (s[i] !== s[j]) return false;
      i++; j--;
    }
    return true;
  };
  const backtrack = (start: number, path: string[]): void => {
    if (start === s.length) {
      result.push([...path]);
      return;
    }
    for (let end = start; end < s.length; end++) {
      if (isPal(start, end)) {
        path.push(s.slice(start, end + 1));
        backtrack(end + 1, path);
        path.pop();
      }
    }
  };
  backtrack(0, []);
  return result;
}`,

        java: `class Solution {
    public List<List<String>> partition(String s) {
        List<List<String>> res = new ArrayList<>();
        backtrack(s, 0, new ArrayList<>(), res);
        return res;
    }

    private void backtrack(String s, int start, List<String> cur, List<List<String>> res) {
        if (start == s.length()) {
            res.add(new ArrayList<>(cur));
            return;
        }
        for (int end = start + 1; end <= s.length(); end++) {
            if (isPal(s, start, end - 1)) {
                cur.add(s.substring(start, end));
                backtrack(s, end, cur, res);
                cur.remove(cur.size() - 1);
            }
        }
    }

    private boolean isPal(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> cur;
        function<void(int)> backtrack = [&](int start) {
            if (start == (int)s.size()) {
                res.push_back(cur);
                return;
            }
            for (int end = start + 1; end <= (int)s.size(); end++) {
                if (isPal(s, start, end - 1)) {
                    cur.push_back(s.substr(start, end - start));
                    backtrack(end);
                    cur.pop_back();
                }
            }
        };
        backtrack(0);
        return res;
    }

    bool isPal(const string& s, int l, int r) {
        while (l < r) {
            if (s[l++] != s[r--]) return false;
        }
        return true;
    }
};`,      },
    },
  },
  {
    slug: "letter-combinations-of-a-phone-number",
    title: "Letter Combinations of a Phone Number",
    difficulty: "Medium",
    category: "backtracking",
    topics: ["Hash Table", "String", "Backtracking"],
    order: 9,
    description: `Given a string containing digits from \`2-9\` inclusive, return all possible letter combinations that the number could represent. Return the answer in **any order**.
\nA mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.`,
    examples: [
      { args: ["23"], output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] },
      { args: [""], output: [] },
      { args: ["2"], output: ["a", "b", "c"] },
    ],
    constraints: ["0 <= digits.length <= 4", "digits[i] is a digit in the range ['2', '9']."],
    starter: {
      python: `from typing import List\n\n\ndef letterCombinations(digits: str) -> List[str]:\n    pass\n`,
      javascript: `function letterCombinations(digits) {\n    \n}`,
      typescript: `function letterCombinations(digits: string): string[] {\n    \n}`,
      java: `class Solution {\n    public List<String> letterCombinations(String digits) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<string> letterCombinations(string digits) {\n        \n    }\n};`,
    },
    methodName: "letterCombinations",
    argTypes: ["string"],
    outputType: "string[]",
    compare: "anyOrder",
    visibleTests: [
      { args: ["23"], output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"] },
      { args: [""], output: [] },
      { args: ["2"], output: ["a", "b", "c"] },
    ],
    hiddenTests: [
      { args: ["7"], output: ["p", "q", "r", "s"] },
      { args: ["9"], output: ["w", "x", "y", "z"] },
      { args: ["234"], output: ["adg", "adh", "adi", "aeg", "aeh", "aei", "afg", "afh", "afi", "bdg", "bdh", "bdi", "beg", "beh", "bei", "bfg", "bfh", "bfi", "cdg", "cdh", "cdi", "ceg", "ceh", "cei", "cfg", "cfh", "cfi"] },
      { args: ["22"], output: ["aa", "ab", "ac", "ba", "bb", "bc", "ca", "cb", "cc"] },
    ],
    editorial: {
      approach: `Map each digit to its letters, then DFS over the digits. At each position, branch over the letters of the current digit, appending to the running string, and recurse to the next digit. When the path length equals the number of digits, record it.\n\nWith at most 4 digits of up to 4 letters each, the output size is at most 4^4 = 256.`,
      complexity: { time: "O(4^n * n)", space: "O(n)" },
      code: {
        python: `def letterCombinations(digits: str) -> List[str]:
    if not digits:
        return []
    mapping = {
        "2": "abc", "3": "def", "4": "ghi", "5": "jkl",
        "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz",
    }
    result = []

    def backtrack(i: int, path: str) -> None:
        if i == len(digits):
            result.append(path)
            return
        for ch in mapping[digits[i]]:
            backtrack(i + 1, path + ch)

    backtrack(0, "")
    return result`,
        javascript: `function letterCombinations(digits) {
  if (!digits) return [];
  const map = {
    2: "abc", 3: "def", 4: "ghi", 5: "jkl",
    6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz",
  };
  const result = [];
  const backtrack = (i, path) => {
    if (i === digits.length) {
      result.push(path);
      return;
    }
    for (const ch of map[digits[i]]) backtrack(i + 1, path + ch);
  };
  backtrack(0, "");
  return result;
}`,
        typescript: `function letterCombinations(digits: string): string[] {
  if (!digits) return [];
  const map: Record<string, string> = {
    2: "abc", 3: "def", 4: "ghi", 5: "jkl",
    6: "mno", 7: "pqrs", 8: "tuv", 9: "wxyz",
  };
  const result: string[] = [];
  const backtrack = (i: number, path: string): void => {
    if (i === digits.length) {
      result.push(path);
      return;
    }
    for (const ch of map[digits[i]!]!) backtrack(i + 1, path + ch);
  };
  backtrack(0, "");
  return result;
}`,

        java: `class Solution {
    private static final String[] MAP = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

    public List<String> letterCombinations(String digits) {
        List<String> res = new ArrayList<>();
        if (digits.isEmpty()) return res;
        backtrack(digits, 0, new StringBuilder(), res);
        return res;
    }

    private void backtrack(String digits, int i, StringBuilder cur, List<String> res) {
        if (i == digits.length()) {
            res.add(cur.toString());
            return;
        }
        for (char c : MAP[digits.charAt(i) - '0'].toCharArray()) {
            cur.append(c);
            backtrack(digits, i + 1, cur, res);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<string> letterCombinations(string digits) {
        vector<string> res;
        if (digits.empty()) return res;
        vector<string> map = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
        string cur;
        function<void(int)> backtrack = [&](int i) {
            if (i == (int)digits.size()) {
                res.push_back(cur);
                return;
            }
            for (char c : map[digits[i] - '0']) {
                cur.push_back(c);
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
];
