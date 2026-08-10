import type { Problem } from "@/lib/types";

export const twoDDpExtra: Problem[] = [
  {
    slug: "best-time-to-buy-and-sell-stock-with-cooldown",
    title: "Best Time to Buy and Sell Stock with Cooldown",
    difficulty: "Medium",
    category: "2d-dp",
    topics: ["Array", "Dynamic Programming"],
    order: 3,
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.
\nFind the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:\n- After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).\n\n**Note:** You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).`,
    examples: [
      { args: [[1, 2, 3, 0, 2]], output: 3 },
      { args: [[1]], output: 0 },
    ],
    constraints: ["1 <= prices.length <= 5000", "0 <= prices[i] <= 1000"],
    starter: {
      python: `from typing import List\n\n\ndef maxProfit(prices: List[int]) -> int:\n    pass\n`,
      javascript: `function maxProfit(prices) {\n    \n}`,
      typescript: `function maxProfit(prices: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};`,
    },
    methodName: "maxProfit",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 0, 2]], output: 3 },
      { args: [[1]], output: 0 },
    ],
    hiddenTests: [
      { args: [[1, 2, 4]], output: 3 },
      { args: [[2, 1, 4]], output: 3 },
      { args: [[2, 1, 2, 0, 1]], output: 1 },
      { args: [[6, 1, 3, 2, 4, 7]], output: 6 },
      { args: [[1, 2, 3, 0, 2]], output: 3 },
      { args: [[5, 4, 3, 2, 1]], output: 0 },
    ],
    editorial: {
      approach: `State-machine DP with three states per day: holding a stock, in cooldown (just sold), and free to buy. \`hold = max(hold, free - price)\`, \`free = max(free, cool)\`, \`cool = hold + price\`. Slide day by day keeping only the current values.\n\nO(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def maxProfit(prices: List[int]) -> int:
    free, hold, cool = 0, -prices[0], 0
    for price in prices[1:]:
        new_free = max(free, cool)
        new_hold = max(hold, free - price)
        new_cool = hold + price
        free, hold, cool = new_free, new_hold, new_cool
    return max(free, cool)`,
        javascript: `function maxProfit(prices) {
  let free = 0, hold = -prices[0], cool = 0;
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i];
    const newFree = Math.max(free, cool);
    const newHold = Math.max(hold, free - price);
    const newCool = hold + price;
    free = newFree; hold = newHold; cool = newCool;
  }
  return Math.max(free, cool);
}`,
        typescript: `function maxProfit(prices: number[]): number {
  let free = 0, hold = -prices[0]!, cool = 0;
  for (let i = 1; i < prices.length; i++) {
    const price = prices[i]!;
    const newFree = Math.max(free, cool);
    const newHold = Math.max(hold, free - price);
    const newCool = hold + price;
    free = newFree; hold = newHold; cool = newCool;
  }
  return Math.max(free, cool);
}`,

        java: `class Solution {
    public int maxProfit(int[] prices) {
        int sold = 0, held = Integer.MIN_VALUE, rest = 0;
        for (int p : prices) {
            int newSold = held + p;
            held = Math.max(held, rest - p);
            rest = Math.max(rest, sold);
            sold = newSold;
        }
        return Math.max(sold, rest);
    }
}`,
        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int sold = 0, held = INT_MIN, rest = 0;
        for (int p : prices) {
            int newSold = held + p;
            held = max(held, rest - p);
            rest = max(rest, sold);
            sold = newSold;
        }
        return max(sold, rest);
    }
};`,      },
    },
  },
  {
    slug: "coin-change-ii",
    title: "Coin Change II",
    difficulty: "Medium",
    category: "2d-dp",
    topics: ["Array", "Dynamic Programming"],
    order: 4,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.
\nReturn the **number of combinations** that make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`0\`.\n\nYou may assume that you have an infinite number of each kind of coin.\n\nThe answer is guaranteed to fit into a signed 32-bit integer.`,
    examples: [
      { args: [5, [1, 2, 5]], output: 4 },
      { args: [3, [2]], output: 0 },
      { args: [10, [10]], output: 1 },
    ],
    constraints: ["1 <= coins.length <= 300", "1 <= coins[i] <= 5000", "0 <= amount <= 5000", "All the values of coins are unique."],
    starter: {
      python: `from typing import List\n\n\ndef change(amount: int, coins: List[int]) -> int:\n    pass\n`,
      javascript: `function change(amount, coins) {\n    \n}`,
      typescript: `function change(amount: number, coins: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int change(int amount, int[] coins) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int change(int amount, vector<int>& coins) {\n        \n    }\n};`,
    },
    methodName: "change",
    argTypes: ["int", "int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [5, [1, 2, 5]], output: 4 },
      { args: [3, [2]], output: 0 },
      { args: [10, [10]], output: 1 },
    ],
    hiddenTests: [
      { args: [0, [1]], output: 1 },
      { args: [4, [1, 2]], output: 3 },
      { args: [6, [2, 3]], output: 2 },
      { args: [11, [5, 7]], output: 0 },
      { args: [5, [1, 2, 5]], output: 4 },
      { args: [500, [3, 5, 7, 8, 9, 10, 11]], output: 35502874 },
    ],
    editorial: {
      approach: `Classic unbounded knapsack counting. Iterate coins in the outer loop (this prevents counting permutations as distinct), and for each coin update \`dp[s] += dp[s - coin]\` for sums from coin to amount.\n\nO(coins * amount) time, O(amount) space.`,
      complexity: { time: "O(coins * amount)", space: "O(amount)" },
      code: {
        python: `def change(amount: int, coins: List[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    for coin in coins:
        for s in range(coin, amount + 1):
            dp[s] += dp[s - coin]
    return dp[amount]`,
        javascript: `function change(amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
    for (let s = coin; s <= amount; s++) {
      dp[s] += dp[s - coin];
    }
  }
  return dp[amount];
}`,
        typescript: `function change(amount: number, coins: number[]): number {
  const dp = new Array<number>(amount + 1).fill(0);
  dp[0] = 1;
  for (const coin of coins) {
    for (let s = coin; s <= amount; s++) {
      dp[s] = dp[s]! + dp[s - coin]!;
    }
  }
  return dp[amount]!;
}`,

        java: `class Solution {
    public int change(int amount, int[] coins) {
        int[] dp = new int[amount + 1];
        dp[0] = 1;
        for (int c : coins) {
            for (int a = c; a <= amount; a++) {
                dp[a] += dp[a - c];
            }
        }
        return dp[amount];
    }
}`,
        cpp: `class Solution {
public:
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int c : coins) {
            for (int a = c; a <= amount; a++) {
                dp[a] += dp[a - c];
            }
        }
        return dp[amount];
    }
};`,      },
    },
  },
  {
    slug: "target-sum",
    title: "Target Sum",
    difficulty: "Medium",
    category: "2d-dp",
    topics: ["Array", "Dynamic Programming", "Backtracking"],
    order: 5,
    description: `You are given an integer array \`nums\` and an integer \`target\`.
\nYou want to build an expression out of nums by adding one of the symbols \`+\` and \`-\` before each integer in nums, and then concatenate all the integers.\n\n- For example, if \`nums = [2, 1]\`, you can add a \`+\` before \`2\` and a \`-\` before \`1\` and concatenate them to build the expression \`"+2-1"\`.\n\nReturn the number of different **expressions** that you can build, which evaluates to \`target\`.`,
    examples: [
      { args: [[1, 1, 1, 1, 1], 3], output: 5 },
      { args: [[1], 1], output: 1 },
    ],
    constraints: ["1 <= nums.length <= 20", "0 <= nums[i] <= 1000", "0 <= sum(nums[i]) <= 1000", "-1000 <= target <= 1000"],
    starter: {
      python: `from typing import List\n\n\ndef findTargetSumWays(nums: List[int], target: int) -> int:\n    pass\n`,
      javascript: `function findTargetSumWays(nums, target) {\n    \n}`,
      typescript: `function findTargetSumWays(nums: number[], target: number): number {\n    \n}`,
      java: `class Solution {\n    public int findTargetSumWays(int[] nums, int target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findTargetSumWays(vector<int>& nums, int target) {\n        \n    }\n};`,
    },
    methodName: "findTargetSumWays",
    argTypes: ["int[]", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 1, 1, 1, 1], 3], output: 5 },
      { args: [[1], 1], output: 1 },
    ],
    hiddenTests: [
      { args: [[1], 2], output: 0 },
      { args: [[1, 0], 1], output: 2 },
      { args: [[1, 2, 3, 4, 5], 3], output: 3 },
      { args: [[0, 0, 0, 0, 0, 0, 0, 0, 1], 1], output: 256 },
      { args: [[1, 1, 1, 1, 1], 3], output: 5 },
    ],
    editorial: {
      approach: `Let \`P\` be the numbers assigned \`+\` and \`N\` those assigned \`-\`. Then \`P - N = target\` and \`P + N = total\`, so \`P = (total + target) / 2\` — a subset-sum problem. If \`total + target\` is odd or negative, answer is 0. Count subsets summing to \`P\` with a 1-D DP.\n\nO(n * (total + target)) time, O(total) space.`,
      complexity: { time: "O(n * total)", space: "O(total)" },
      code: {
        python: `def findTargetSumWays(nums: List[int], target: int) -> int:
    total = sum(nums)
    if (total + target) % 2 or total + target < 0:
        return 0
    target_sum = (total + target) // 2
    dp = [0] * (target_sum + 1)
    dp[0] = 1
    for x in nums:
        for s in range(target_sum, x - 1, -1):
            dp[s] += dp[s - x]
    return dp[target_sum]`,
        javascript: `function findTargetSumWays(nums, target) {
  const total = nums.reduce((a, b) => a + b, 0);
  if ((total + target) % 2 || total + target < 0) return 0;
  const targetSum = (total + target) / 2;
  const dp = new Array(targetSum + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) {
    for (let s = targetSum; s >= x; s--) {
      dp[s] += dp[s - x];
    }
  }
  return dp[targetSum];
}`,
        typescript: `function findTargetSumWays(nums: number[], target: number): number {
  const total = nums.reduce((a, b) => a + b, 0);
  if ((total + target) % 2 || total + target < 0) return 0;
  const targetSum = (total + target) / 2;
  const dp = new Array<number>(targetSum + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) {
    for (let s = targetSum; s >= x; s--) {
      dp[s] = dp[s]! + dp[s - x]!;
    }
  }
  return dp[targetSum]!;
}`,

        java: `class Solution {
    public int findTargetSumWays(int[] nums, int target) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (target > sum || (sum - target) % 2 != 0) return 0;
        int T = (sum - target) / 2;
        int[] dp = new int[T + 1];
        dp[0] = 1;
        for (int n : nums) {
            for (int s = T; s >= n; s--) {
                dp[s] += dp[s - n];
            }
        }
        return dp[T];
    }
}`,
        cpp: `class Solution {
public:
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (target > sum || (sum - target) % 2 != 0) return 0;
        int T = (sum - target) / 2;
        vector<int> dp(T + 1, 0);
        dp[0] = 1;
        for (int n : nums) {
            for (int s = T; s >= n; s--) {
                dp[s] += dp[s - n];
            }
        }
        return dp[T];
    }
};`,      },
    },
  },
  {
    slug: "interleaving-string",
    title: "Interleaving String",
    difficulty: "Medium",
    category: "2d-dp",
    topics: ["String", "Dynamic Programming"],
    order: 6,
    description: `Given strings \`s1\`, \`s2\`, and \`s3\`, return \`true\` if \`s3\` is formed by an **interleaving** of \`s1\` and \`s2\`.
\nAn interleaving of two strings \`s\` and \`t\` is a configuration where \`s\` and \`t\` are divided into \`n\` and \`m\` substrings respectively, such that:\n- \`s = s1 + s2 + ... + sn\`\n- \`t = t1 + t2 + ... + tm\`\n- \`|n - m| <= 1\`\n- The interleaving is \`s1 + t1 + s2 + t2 + s3 + t3 + ...\` or \`t1 + s1 + t2 + s2 + t3 + s3 + ...\`\n\n**Note:** \`a + b\` is the concatenation of strings \`a\` and \`b\`.`,
    examples: [
      { args: ["aabcc", "dbbca", "aadbbcbcac"], output: true },
      { args: ["aabcc", "dbbca", "aadbbbaccc"], output: false },
    ],
    constraints: ["0 <= s1.length, s2.length <= 100", "0 <= s3.length <= 200", "s1, s2, and s3 consist of lowercase English letters."],
    starter: {
      python: `def isInterleave(s1: str, s2: str, s3: str) -> bool:\n    pass\n`,
      javascript: `function isInterleave(s1, s2, s3) {\n    \n}`,
      typescript: `function isInterleave(s1: string, s2: string, s3: string): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean isInterleave(String s1, String s2, String s3) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isInterleave(string s1, string s2, string s3) {\n        \n    }\n};`,
    },
    methodName: "isInterleave",
    argTypes: ["string", "string", "string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["aabcc", "dbbca", "aadbbcbcac"], output: true },
      { args: ["aabcc", "dbbca", "aadbbbaccc"], output: false },
    ],
    hiddenTests: [
      { args: ["", "", ""], output: true },
      { args: ["a", "", "a"], output: true },
      { args: ["a", "b", "ab"], output: true },
      { args: ["a", "b", "ba"], output: true },
      { args: ["a", "b", "ac"], output: false },
      { args: ["abc", "def", "abdecf"], output: true },
      { args: ["aabcc", "dbbca", "aadbbcbcac"], output: true },
    ],
    editorial: {
      approach: `2-D DP where \`dp[i][j]\` means the first \`i\` chars of \`s1\` and first \`j\` chars of \`s2\` can interleave to form \`s3[:i+j]\`. Transition: \`dp[i][j] = (dp[i-1][j] && s1[i-1] == s3[i+j-1]) || (dp[i][j-1] && s2[j-1] == s3[i+j-1])\`. Use a 1-D rolling array for space.\n\nO(m * n) time and space.`,
      complexity: { time: "O(m * n)", space: "O(n)" },
      code: {
        python: `def isInterleave(s1: str, s2: str, s3: str) -> bool:
    m, n = len(s1), len(s2)
    if m + n != len(s3):
        return False
    dp = [False] * (n + 1)
    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 and j == 0:
                dp[j] = True
            elif i == 0:
                dp[j] = dp[j - 1] and s2[j - 1] == s3[j - 1]
            elif j == 0:
                dp[j] = dp[j] and s1[i - 1] == s3[i - 1]
            else:
                dp[j] = (dp[j] and s1[i - 1] == s3[i + j - 1]) or (
                    dp[j - 1] and s2[j - 1] == s3[i + j - 1]
                )
    return dp[n]`,
        javascript: `function isInterleave(s1, s2, s3) {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = new Array(n + 1).fill(false);
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) dp[j] = true;
      else if (i === 0) dp[j] = dp[j - 1] && s2[j - 1] === s3[j - 1];
      else if (j === 0) dp[j] = dp[j] && s1[i - 1] === s3[i - 1];
      else dp[j] = (dp[j] && s1[i - 1] === s3[i + j - 1]) || (dp[j - 1] && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return dp[n];
}`,
        typescript: `function isInterleave(s1: string, s2: string, s3: string): boolean {
  const m = s1.length, n = s2.length;
  if (m + n !== s3.length) return false;
  const dp = new Array<boolean>(n + 1).fill(false);
  for (let i = 0; i <= m; i++) {
    for (let j = 0; j <= n; j++) {
      if (i === 0 && j === 0) dp[j] = true;
      else if (i === 0) dp[j] = dp[j - 1]! && s2[j - 1] === s3[j - 1];
      else if (j === 0) dp[j] = dp[j]! && s1[i - 1] === s3[i - 1];
      else dp[j] = (dp[j]! && s1[i - 1] === s3[i + j - 1]) || (dp[j - 1]! && s2[j - 1] === s3[i + j - 1]);
    }
  }
  return dp[n]!;
}`,

        java: `class Solution {
    public boolean isInterleave(String s1, String s2, String s3) {
        int m = s1.length(), n = s2.length();
        if (m + n != s3.length()) return false;
        boolean[] dp = new boolean[n + 1];
        dp[0] = true;
        for (int j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2.charAt(j - 1) == s3.charAt(j - 1);
        for (int i = 1; i <= m; i++) {
            dp[0] = dp[0] && s1.charAt(i - 1) == s3.charAt(i - 1);
            for (int j = 1; j <= n; j++) {
                char c = s3.charAt(i + j - 1);
                dp[j] = (dp[j] && s1.charAt(i - 1) == c) || (dp[j - 1] && s2.charAt(j - 1) == c);
            }
        }
        return dp[n];
    }
}`,
        cpp: `class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.size(), n = s2.size();
        if (m + n != (int)s3.size()) return false;
        vector<bool> dp(n + 1, false);
        dp[0] = true;
        for (int j = 1; j <= n; j++) dp[j] = dp[j - 1] && s2[j - 1] == s3[j - 1];
        for (int i = 1; i <= m; i++) {
            dp[0] = dp[0] && s1[i - 1] == s3[i - 1];
            for (int j = 1; j <= n; j++) {
                char c = s3[i + j - 1];
                dp[j] = (dp[j] && s1[i - 1] == c) || (dp[j - 1] && s2[j - 1] == c);
            }
        }
        return dp[n];
    }
};`,      },
    },
  },
  {
    slug: "longest-increasing-path-in-a-matrix",
    title: "Longest Increasing Path in a Matrix",
    difficulty: "Hard",
    category: "2d-dp",
    topics: ["Array", "Dynamic Programming", "DFS", "Matrix"],
    order: 7,
    description: `Given an \`m x n\` integers matrix \`matrix\`, return the length of the longest increasing path in \`matrix\`.
\nFrom each cell, you can either move in four directions: left, right, up, or down. You **may not** move diagonally or move outside the boundary (i.e., wrap-around is not allowed).`,
    examples: [
      { args: [[[9, 9, 4], [6, 6, 8], [2, 1, 1]]], output: 4 },
      { args: [[[3, 4, 5], [3, 2, 6], [2, 2, 1]]], output: 4 },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 200", "0 <= matrix[i][j] <= 2^31 - 1"],
    starter: {
      python: `from typing import List\n\n\ndef longestIncreasingPath(matrix: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function longestIncreasingPath(matrix) {\n    \n}`,
      typescript: `function longestIncreasingPath(matrix: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int longestIncreasingPath(int[][] matrix) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int longestIncreasingPath(vector<vector<int>>& matrix) {\n        \n    }\n};`,
    },
    methodName: "longestIncreasingPath",
    argTypes: ["int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[[9, 9, 4], [6, 6, 8], [2, 1, 1]]], output: 4 },
      { args: [[[3, 4, 5], [3, 2, 6], [2, 2, 1]]], output: 4 },
    ],
    hiddenTests: [
      { args: [[[1]]], output: 1 },
      { args: [[[1, 2], [2, 3]]], output: 3 },
      { args: [[[7, 7, 7], [7, 7, 7], [7, 7, 7]]], output: 1 },
      { args: [[[1, 2, 3], [6, 5, 4], [7, 8, 9]]], output: 9 },
      { args: [[[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [19, 18, 17, 16, 15, 14, 13, 12, 11, 10], [20, 21, 22, 23, 24, 25, 26, 27, 28, 29], [39, 38, 37, 36, 35, 34, 33, 32, 31, 30]]], output: 40 },
    ],
    editorial: {
      approach: `DFS with memoization: \`dfs(r, c)\` returns the longest increasing path starting at \`(r, c)\` by exploring the four neighbors with strictly larger values and taking the max plus one. Cache results so each cell is computed once.\n\nO(m * n) time, O(m * n) space.`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def longestIncreasingPath(matrix: List[List[int]]) -> int:
    m, n = len(matrix), len(matrix[0])
    memo = [[0] * n for _ in range(m)]

    def dfs(r: int, c: int) -> int:
        if memo[r][c]:
            return memo[r][c]
        best = 1
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and matrix[nr][nc] > matrix[r][c]:
                best = max(best, 1 + dfs(nr, nc))
        memo[r][c] = best
        return best

    return max(dfs(r, c) for r in range(m) for c in range(n))`,
        javascript: `function longestIncreasingPath(matrix) {
  const m = matrix.length, n = matrix[0].length;
  const memo = Array.from({ length: m }, () => new Array(n).fill(0));
  const dfs = (r, c) => {
    if (memo[r][c]) return memo[r][c];
    let best = 1;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr][nc] > matrix[r][c]) {
        best = Math.max(best, 1 + dfs(nr, nc));
      }
    }
    memo[r][c] = best;
    return best;
  };
  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) ans = Math.max(ans, dfs(r, c));
  }
  return ans;
}`,
        typescript: `function longestIncreasingPath(matrix: number[][]): number {
  const m = matrix.length, n = matrix[0]!.length;
  const memo = Array.from({ length: m }, () => new Array<number>(n).fill(0));
  const dfs = (r: number, c: number): number => {
    if (memo[r]![c]) return memo[r]![c]!;
    let best = 1;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && matrix[nr]![nc]! > matrix[r]![c]!) {
        best = Math.max(best, 1 + dfs(nr, nc));
      }
    }
    memo[r]![c] = best;
    return best;
  };
  let ans = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) ans = Math.max(ans, dfs(r, c));
  }
  return ans;
}`,

        java: `class Solution {
    private int[][] memo;
    private int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};

    public int longestIncreasingPath(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        memo = new int[m][n];
        int best = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                best = Math.max(best, dfs(matrix, i, j));
            }
        }
        return best;
    }

    private int dfs(int[][] grid, int i, int j) {
        if (memo[i][j] != 0) return memo[i][j];
        int best = 1;
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < grid.length && nj >= 0 && nj < grid[0].length && grid[ni][nj] > grid[i][j]) {
                best = Math.max(best, 1 + dfs(grid, ni, nj));
            }
        }
        memo[i][j] = best;
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int longestIncreasingPath(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        vector<vector<int>> memo(m, vector<int>(n, 0));
        int best = 0;
        int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        function<int(int,int)> dfs = [&](int i, int j) -> int {
            if (memo[i][j] != 0) return memo[i][j];
            int b = 1;
            for (auto& d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && matrix[ni][nj] > matrix[i][j]) {
                    b = max(b, 1 + dfs(ni, nj));
                }
            }
            return memo[i][j] = b;
        };
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                best = max(best, dfs(i, j));
            }
        }
        return best;
    }
};`,      },
    },
  },
  {
    slug: "distinct-subsequences",
    title: "Distinct Subsequences",
    difficulty: "Hard",
    category: "2d-dp",
    topics: ["String", "Dynamic Programming"],
    order: 8,
    description: `Given two strings \`s\` and \`t\`, return the number of distinct subsequences of \`s\` which equals \`t\`.
\nThe test cases are generated so that the answer fits on a 32-bit signed integer.`,
    examples: [
      { args: ["rabbbit", "rabbit"], output: 3 },
      { args: ["babgbag", "bag"], output: 5 },
    ],
    constraints: ["1 <= s.length, t.length <= 1000", "s and t consist of English letters."],
    starter: {
      python: `def numDistinct(s: str, t: str) -> int:\n    pass\n`,
      javascript: `function numDistinct(s, t) {\n    \n}`,
      typescript: `function numDistinct(s: string, t: string): number {\n    \n}`,
      java: `class Solution {\n    public int numDistinct(String s, String t) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numDistinct(string s, string t) {\n        \n    }\n};`,
    },
    methodName: "numDistinct",
    argTypes: ["string", "string"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["rabbbit", "rabbit"], output: 3 },
      { args: ["babgbag", "bag"], output: 5 },
    ],
    hiddenTests: [
      { args: ["", ""], output: 1 },
      { args: ["abc", "abc"], output: 1 },
      { args: ["abc", "def"], output: 0 },
      { args: ["aaa", "aa"], output: 3 },
      { args: ["r", "r"], output: 1 },
      { args: ["rabbbit", "rabbit"], output: 3 },
      { args: ["babgbag", "bag"], output: 5 },
    ],
    editorial: {
      approach: `DP where \`dp[j]\` counts subsequences of the processed prefix of \`s\` equal to \`t[:j]\`. Iterate \`s\`; when \`s[i] == t[j-1]\`, add the count from the previous row (\`dp[j-1]\`) — iterate \`j\` backwards so each character of \`s\` is used at most once.\n\nO(|s| * |t|) time, O(|t|) space.`,
      complexity: { time: "O(|s| * |t|)", space: "O(|t|)" },
      code: {
        python: `def numDistinct(s: str, t: str) -> int:
    dp = [0] * (len(t) + 1)
    dp[0] = 1
    for ch in s:
        for j in range(len(t), 0, -1):
            if ch == t[j - 1]:
                dp[j] += dp[j - 1]
    return dp[len(t)]`,
        javascript: `function numDistinct(s, t) {
  const dp = new Array(t.length + 1).fill(0);
  dp[0] = 1;
  for (const ch of s) {
    for (let j = t.length; j >= 1; j--) {
      if (ch === t[j - 1]) dp[j] += dp[j - 1];
    }
  }
  return dp[t.length];
}`,
        typescript: `function numDistinct(s: string, t: string): number {
  const dp = new Array<number>(t.length + 1).fill(0);
  dp[0] = 1;
  for (const ch of s) {
    for (let j = t.length; j >= 1; j--) {
      if (ch === t[j - 1]) dp[j] = dp[j]! + dp[j - 1]!;
    }
  }
  return dp[t.length]!;
}`,

        java: `class Solution {
    public int numDistinct(String s, String t) {
        int m = t.length();
        long[] dp = new long[m + 1];
        dp[0] = 1;
        for (int i = 0; i < s.length(); i++) {
            for (int j = m; j >= 1; j--) {
                if (s.charAt(i) == t.charAt(j - 1)) dp[j] += dp[j - 1];
            }
        }
        return (int) dp[m];
    }
}`,
        cpp: `class Solution {
public:
    int numDistinct(string s, string t) {
        int m = t.size();
        vector<long long> dp(m + 1, 0);
        dp[0] = 1;
        for (int i = 0; i < (int)s.size(); i++) {
            for (int j = m; j >= 1; j--) {
                if (s[i] == t[j - 1]) dp[j] += dp[j - 1];
            }
        }
        return (int) dp[m];
    }
};`,      },
    },
  },
  {
    slug: "edit-distance",
    title: "Edit Distance",
    difficulty: "Medium",
    category: "2d-dp",
    topics: ["String", "Dynamic Programming"],
    order: 9,
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.
\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character`,
    examples: [
      { args: ["horse", "ros"], output: 3 },
      { args: ["intention", "execution"], output: 5 },
    ],
    constraints: ["0 <= word1.length, word2.length <= 500", "word1 and word2 consist of lowercase English letters."],
    starter: {
      python: `def minDistance(word1: str, word2: str) -> int:\n    pass\n`,
      javascript: `function minDistance(word1, word2) {\n    \n}`,
      typescript: `function minDistance(word1: string, word2: string): number {\n    \n}`,
      java: `class Solution {\n    public int minDistance(String word1, String word2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        \n    }\n};`,
    },
    methodName: "minDistance",
    argTypes: ["string", "string"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["horse", "ros"], output: 3 },
      { args: ["intention", "execution"], output: 5 },
    ],
    hiddenTests: [
      { args: ["", ""], output: 0 },
      { args: ["a", ""], output: 1 },
      { args: ["", "a"], output: 1 },
      { args: ["a", "a"], output: 0 },
      { args: ["abc", "abc"], output: 0 },
      { args: ["abc", "yabc"], output: 1 },
      { args: ["plasma", "altruism"], output: 6 },
    ],
    editorial: {
      approach: `Classic Levenshtein distance: \`dp[i][j]\` = edit distance between \`word1[:i]\` and \`word2[:j]\`. If the chars match, carry \`dp[i-1][j-1]\`; otherwise take 1 + min of insert, delete, replace. Roll the table to a single array with a corner variable.\n\nO(m * n) time, O(n) space.`,
      complexity: { time: "O(m * n)", space: "O(n)" },
      code: {
        python: `def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    prev = list(range(n + 1))
    for i in range(1, m + 1):
        cur = [i] + [0] * n
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                cur[j] = prev[j - 1]
            else:
                cur[j] = 1 + min(prev[j], cur[j - 1], prev[j - 1])
        prev = cur
    return prev[n]`,
        javascript: `function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = new Array(n + 1).fill(0);
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) cur[j] = prev[j - 1];
      else cur[j] = 1 + Math.min(prev[j], cur[j - 1], prev[j - 1]);
    }
    prev = cur;
  }
  return prev[n];
}`,
        typescript: `function minDistance(word1: string, word2: string): number {
  const m = word1.length, n = word2.length;
  let prev = Array.from({ length: n + 1 }, (_, j) => j);
  for (let i = 1; i <= m; i++) {
    const cur = new Array<number>(n + 1).fill(0);
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) cur[j] = prev[j - 1]!;
      else cur[j] = 1 + Math.min(prev[j]!, cur[j - 1]!, prev[j - 1]!);
    }
    prev = cur;
  }
  return prev[n]!;
}`,

        java: `class Solution {
    public int minDistance(String word1, String word2) {
        int m = word1.length(), n = word2.length();
        int[] dp = new int[n + 1];
        for (int j = 0; j <= n; j++) dp[j] = j;
        for (int i = 1; i <= m; i++) {
            int prev = dp[0];
            dp[0] = i;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[j] = prev;
                else dp[j] = 1 + Math.min(dp[j], Math.min(dp[j - 1], prev));
                prev = temp;
            }
        }
        return dp[n];
    }
}`,
        cpp: `class Solution {
public:
    int minDistance(string word1, string word2) {
        int m = word1.size(), n = word2.size();
        vector<int> dp(n + 1);
        for (int j = 0; j <= n; j++) dp[j] = j;
        for (int i = 1; i <= m; i++) {
            int prev = dp[0];
            dp[0] = i;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (word1[i - 1] == word2[j - 1]) dp[j] = prev;
                else dp[j] = 1 + min(dp[j], min(dp[j - 1], prev));
                prev = temp;
            }
        }
        return dp[n];
    }
};`,      },
    },
  },
  {
    slug: "burst-balloons",
    title: "Burst Balloons",
    difficulty: "Hard",
    category: "2d-dp",
    topics: ["Array", "Dynamic Programming"],
    order: 10,
    description: `You are given \`n\` balloons, indexed from \`0\` to \`n - 1\`. Each balloon is painted with a number on it represented by an array \`nums\`. You are asked to burst all the balloons.
\nIf you burst the \`i\`th balloon, you will get \`nums[i - 1] * nums[i] * nums[i + 1]\` coins. If \`i - 1\` or \`i + 1\` goes out of bounds of the array, then treat it as if there is a balloon with a \`1\` painted on it.\n\nReturn the maximum coins you can collect by bursting the balloons wisely.`,
    examples: [
      { args: [[3, 1, 5, 8]], output: 167 },
      { args: [[1, 5]], output: 10 },
    ],
    constraints: ["n == nums.length", "1 <= n <= 300", "0 <= nums[i] <= 100"],
    starter: {
      python: `from typing import List\n\n\ndef maxCoins(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function maxCoins(nums) {\n    \n}`,
      typescript: `function maxCoins(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int maxCoins(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxCoins(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "maxCoins",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 1, 5, 8]], output: 167 },
      { args: [[1, 5]], output: 10 },
    ],
    hiddenTests: [
      { args: [[5]], output: 5 },
      { args: [[1, 2, 3]], output: 12 },
      { args: [[2, 3, 4]], output: 36 },
      { args: [[3, 1, 5, 8]], output: 167 },
      { args: [[1, 2, 3, 4, 5]], output: 110 },
    ],
    editorial: {
      approach: `Add virtual balloons of value 1 at both ends, giving array \`a[0..n+1]\`. \`dp[i][j]\` = max coins from bursting all balloons strictly between \`i\` and \`j\`. For the last balloon \`k\` burst in the range: \`dp[i][j] = max(dp[i][k] + dp[k][j] + a[i]*a[k]*a[j])\`. The virtual balloons are never burst, which makes the subproblems independent.\n\nO(n^3) time, O(n^2) space.`,
      complexity: { time: "O(n^3)", space: "O(n^2)" },
      code: {
        python: `def maxCoins(nums: List[int]) -> int:
    a = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * (n + 2) for _ in range(n + 2)]
    for length in range(1, n + 1):
        for i in range(1, n - length + 2):
            j = i + length - 1
            for k in range(i, j + 1):
                coins = a[i - 1] * a[k] * a[j + 1]
                dp[i][j] = max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + coins)
    return dp[1][n]`,
        javascript: `function maxCoins(nums) {
  const a = [1, ...nums, 1];
  const n = nums.length;
  const dp = Array.from({ length: n + 2 }, () => new Array(n + 2).fill(0));
  for (let length = 1; length <= n; length++) {
    for (let i = 1; i <= n - length + 1; i++) {
      const j = i + length - 1;
      for (let k = i; k <= j; k++) {
        const coins = a[i - 1] * a[k] * a[j + 1];
        dp[i][j] = Math.max(dp[i][j], dp[i][k - 1] + dp[k + 1][j] + coins);
      }
    }
  }
  return dp[1][n];
}`,
        typescript: `function maxCoins(nums: number[]): number {
  const a = [1, ...nums, 1];
  const n = nums.length;
  const dp = Array.from({ length: n + 2 }, () => new Array<number>(n + 2).fill(0));
  for (let length = 1; length <= n; length++) {
    for (let i = 1; i <= n - length + 1; i++) {
      const j = i + length - 1;
      for (let k = i; k <= j; k++) {
        const coins = a[i - 1]! * a[k]! * a[j + 1]!;
        dp[i]![j] = Math.max(dp[i]![j]!, dp[i]![k - 1]! + dp[k + 1]![j]! + coins);
      }
    }
  }
  return dp[1]![n]!;
}`,

        java: `class Solution {
    public int maxCoins(int[] nums) {
        int n = nums.length;
        int[] a = new int[n + 2];
        a[0] = a[n + 1] = 1;
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];
        int[][] dp = new int[n + 2][n + 2];
        for (int len = 1; len <= n; len++) {
            for (int l = 1; l + len - 1 <= n; l++) {
                int r = l + len - 1;
                for (int k = l; k <= r; k++) {
                    dp[l][r] = Math.max(dp[l][r],
                        dp[l][k - 1] + a[l - 1] * a[k] * a[r + 1] + dp[k + 1][r]);
                }
            }
        }
        return dp[1][n];
    }
}`,
        cpp: `class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        vector<int> a(n + 2, 1);
        for (int i = 0; i < n; i++) a[i + 1] = nums[i];
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int len = 1; len <= n; len++) {
            for (int l = 1; l + len - 1 <= n; l++) {
                int r = l + len - 1;
                for (int k = l; k <= r; k++) {
                    dp[l][r] = max(dp[l][r],
                        dp[l][k - 1] + a[l - 1] * a[k] * a[r + 1] + dp[k + 1][r]);
                }
            }
        }
        return dp[1][n];
    }
};`,      },
    },
  },
  {
    slug: "regular-expression-matching",
    title: "Regular Expression Matching",
    difficulty: "Hard",
    category: "2d-dp",
    topics: ["String", "Dynamic Programming", "Recursion"],
    order: 11,
    description: `Given an input string \`s\` and a pattern \`p\`, implement regular expression matching with support for \`'.'\` and \`'*'\` where:
\n- \`'.'\` Matches any single character.\n- \`'*'\` Matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).`,
    examples: [
      { args: ["aa", "a"], output: false },
      { args: ["aa", "a*"], output: true },
      { args: ["ab", ".*"], output: true },
    ],
    constraints: ["1 <= s.length <= 20", "1 <= p.length <= 20", "s contains only lowercase English letters.", "p contains only lowercase English letters, '.', and '*' characters.", "It is guaranteed for each appearance of the character '*', there will be a previous valid character to match."],
    starter: {
      python: `def isMatch(s: str, p: str) -> bool:\n    pass\n`,
      javascript: `function isMatch(s, p) {\n    \n}`,
      typescript: `function isMatch(s: string, p: string): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean isMatch(String s, String p) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isMatch(string s, string p) {\n        \n    }\n};`,
    },
    methodName: "isMatch",
    argTypes: ["string", "string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["aa", "a"], output: false },
      { args: ["aa", "a*"], output: true },
      { args: ["ab", ".*"], output: true },
    ],
    hiddenTests: [
      { args: ["", ""], output: true },
      { args: ["", "a*"], output: true },
      { args: ["", "."], output: false },
      { args: ["a", "."], output: true },
      { args: ["a", "ab*"], output: true },
      { args: ["mississippi", "mis*is*p*."], output: false },
      { args: ["aab", "c*a*b"], output: true },
      { args: ["aaa", "a*a"], output: true },
      { args: ["ab", ".*c"], output: false },
    ],
    editorial: {
      approach: `Memoized recursion: \`match(i, j)\` = does \`s[i:]\` match \`p[j:]\`. If \`p[j+1]\` is \`'*'\`, either skip the star (use zero) or, if the current chars match, consume one char of \`s\` and stay. Otherwise a normal character or \`'.'\` must match exactly and both pointers advance.\n\nO(m * n) time and space with memoization.`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def isMatch(s: str, p: str) -> bool:
    memo = {}

    def match(i: int, j: int) -> bool:
        if (i, j) in memo:
            return memo[(i, j)]
        if j == len(p):
            return i == len(s)
        first = i < len(s) and (s[i] == p[j] or p[j] == ".")
        if j + 1 < len(p) and p[j + 1] == "*":
            ans = match(i, j + 2) or (first and match(i + 1, j))
        else:
            ans = first and match(i + 1, j + 1)
        memo[(i, j)] = ans
        return ans

    return match(0, 0)`,
        javascript: `function isMatch(s, p) {
  const memo = new Map();
  const match = (i, j) => {
    const key = i + "," + j;
    if (memo.has(key)) return memo.get(key);
    if (j === p.length) return i === s.length;
    const first = i < s.length && (s[i] === p[j] || p[j] === ".");
    let ans;
    if (j + 1 < p.length && p[j + 1] === "*") {
      ans = match(i, j + 2) || (first && match(i + 1, j));
    } else {
      ans = first && match(i + 1, j + 1);
    }
    memo.set(key, ans);
    return ans;
  };
  return match(0, 0);
}`,
        typescript: `function isMatch(s: string, p: string): boolean {
  const memo = new Map<string, boolean>();
  const match = (i: number, j: number): boolean => {
    const key = i + "," + j;
    const cached = memo.get(key);
    if (cached !== undefined) return cached;
    if (j === p.length) return i === s.length;
    const first = i < s.length && (s[i] === p[j] || p[j] === ".");
    let ans: boolean;
    if (j + 1 < p.length && p[j + 1] === "*") {
      ans = match(i, j + 2) || (first && match(i + 1, j));
    } else {
      ans = first && match(i + 1, j + 1);
    }
    memo.set(key, ans);
    return ans;
  };
  return match(0, 0);
}`,

        java: `class Solution {
    public boolean isMatch(String s, String p) {
        int m = s.length(), n = p.length();
        boolean[][] dp = new boolean[m + 1][n + 1];
        dp[0][0] = true;
        for (int j = 2; j <= n; j++) {
            if (p.charAt(j - 1) == '*') dp[0][j] = dp[0][j - 2];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p.charAt(j - 1);
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 2]
                        || (dp[i - 1][j] && (p.charAt(j - 2) == s.charAt(i - 1) || p.charAt(j - 2) == '.'));
                } else if (pc == '.' || pc == s.charAt(i - 1)) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }
}`,
        cpp: `class Solution {
public:
    bool isMatch(string s, string p) {
        int m = s.size(), n = p.size();
        vector<vector<bool>> dp(m + 1, vector<bool>(n + 1, false));
        dp[0][0] = true;
        for (int j = 2; j <= n; j++) {
            if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2];
        }
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                char pc = p[j - 1];
                if (pc == '*') {
                    dp[i][j] = dp[i][j - 2]
                        || (dp[i - 1][j] && (p[j - 2] == s[i - 1] || p[j - 2] == '.'));
                } else if (pc == '.' || pc == s[i - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                }
            }
        }
        return dp[m][n];
    }
};`,      },
    },
  },
];
