import type { Problem } from "@/lib/types";

export const oneDDpProblems: Problem[] = [
  {
    slug: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "1d-dp",
    topics: ["Math", "DP"],
    order: 1,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { args: [2], output: 2, explain: "1 + 1, 2" },
      { args: [3], output: 3, explain: "1 + 1 + 1, 1 + 2, 2 + 1" },
    ],
    constraints: ["1 <= n <= 45"],
    starter: {
      python: `def climbStairs(n: int) -> int:\n    pass\n`,
      javascript: `function climbStairs(n) {\n    \n}`,
      typescript: `function climbStairs(n: number): number {\n    \n}`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
    },
    methodName: "climbStairs",
    argTypes: ["int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [2], output: 2 },
      { args: [3], output: 3 },
    ],
    hiddenTests: [
      { args: [1], output: 1 },
      { args: [4], output: 5 },
      { args: [5], output: 8 },
      { args: [10], output: 89 },
      { args: [45], output: 1836311903 },
    ],
    editorial: {
      approach: `The number of ways to reach step \`n\` is the sum of ways to reach steps \`n - 1\` and \`n - 2\`, since the last move is either 1 or 2 steps. This is the Fibonacci recurrence \`dp[n] = dp[n-1] + dp[n-2]\`.

Only the two previous values are needed, so keep two rolling variables: O(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def climbStairs(n: int) -> int:
    if n <= 2:
        return n
    prev, curr = 1, 2
    for _ in range(3, n + 1):
        prev, curr = curr, prev + curr
    return curr`,
        javascript: `function climbStairs(n) {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,
        typescript: `function climbStairs(n: number): number {
  if (n <= 2) return n;
  let prev = 1, curr = 2;
  for (let i = 3; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}`,

        java: `class Solution {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`,
        cpp: `class Solution {
public:
    int climbStairs(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
};`,      },
    },
  },
  {
    slug: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["Array", "DP"],
    order: 2,
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, and the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.`,
    examples: [
      { args: [[1, 2, 3, 1]], output: 4, explain: "Rob house 1 (1) and house 3 (3): total 4." },
      { args: [[2, 7, 9, 3, 1]], output: 12, explain: "Rob houses 1, 3 and 5: 2 + 9 + 1 = 12." },
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 400"],
    starter: {
      python: `from typing import List\n\n\ndef rob(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function rob(nums) {\n    \n}`,
      typescript: `function rob(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "rob",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 1]], output: 4 },
      { args: [[2, 7, 9, 3, 1]], output: 12 },
    ],
    hiddenTests: [
      { args: [[1]], output: 1 },
      { args: [[1, 2]], output: 2 },
      { args: [[2, 1, 1, 2]], output: 4 },
      { args: [[5, 3, 4, 11, 2]], output: 16 },
      { args: [[0, 0, 0, 0]], output: 0 },
      { args: [[100, 1, 1, 100]], output: 200 },
    ],
    editorial: {
      approach: `At each house, either skip it (carry over the best from the previous house) or rob it (its value plus the best from two houses ago). The recurrence is \`dp[i] = max(dp[i-1], nums[i] + dp[i-2])\`.

Rolling two variables gives O(n) time and O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def rob(nums: List[int]) -> int:
    prev2, prev1 = 0, 0
    for num in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + num)
    return prev1`,
        javascript: `function rob(nums) {
  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    [prev2, prev1] = [prev1, Math.max(prev1, prev2 + num)];
  }
  return prev1;
}`,
        typescript: `function rob(nums: number[]): number {
  let prev2 = 0, prev1 = 0;
  for (const num of nums) {
    [prev2, prev1] = [prev1, Math.max(prev1, prev2 + num)];
  }
  return prev1;
}`,

        java: `class Solution {
    public int rob(int[] nums) {
        int rob = 0, skip = 0;
        for (int n : nums) {
            int newRob = skip + n;
            skip = Math.max(skip, rob);
            rob = newRob;
        }
        return Math.max(rob, skip);
    }
}`,
        cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        int rob = 0, skip = 0;
        for (int n : nums) {
            int newRob = skip + n;
            skip = max(skip, rob);
            rob = newRob;
        }
        return max(rob, skip);
    }
};`,      },
    },
  },
  {
    slug: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["Array", "DP", "BFS"],
    order: 3,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the **fewest number of coins** that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an **infinite** number of each kind of coin.`,
    examples: [
      { args: [[1, 2, 5], 11], output: 3, explain: "11 = 5 + 5 + 1" },
      { args: [[2], 3], output: -1 },
      { args: [[1], 0], output: 0 },
    ],
    constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    starter: {
      python: `from typing import List\n\n\ndef coinChange(coins: List[int], amount: int) -> int:\n    pass\n`,
      javascript: `function coinChange(coins, amount) {\n    \n}`,
      typescript: `function coinChange(coins: number[], amount: number): number {\n    \n}`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};`,
    },
    methodName: "coinChange",
    argTypes: ["int[]", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 5], 11], output: 3 },
      { args: [[2], 3], output: -1 },
      { args: [[1], 0], output: 0 },
    ],
    hiddenTests: [
      { args: [[1], 1], output: 1 },
      { args: [[1, 3, 4, 5], 7], output: 2 },
      { args: [[3, 7], 11], output: -1 },
      { args: [[2, 5], 1], output: -1 },
      { args: [[1, 2, 5], 100], output: 20 },
      { args: [[186, 419, 83, 408], 6249], output: 20 },
    ],
    editorial: {
      approach: `Let \`dp[x]\` be the fewest coins to make amount \`x\`. Initialize \`dp[0] = 0\` and everything else to infinity. For each amount and each coin, \`dp[x] = min(dp[x], dp[x - coin] + 1)\`.

The answer is \`dp[amount]\` or -1 if it stayed infinite. O(amount * coins) time, O(amount) space.`,
      complexity: { time: "O(amount * coins)", space: "O(amount)" },
      code: {
        python: `def coinChange(coins: List[int], amount: int) -> int:
    dp = [float("inf")] * (amount + 1)
    dp[0] = 0
    for x in range(1, amount + 1):
        for coin in coins:
            if coin <= x:
                dp[x] = min(dp[x], dp[x - coin] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1`,
        javascript: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= amount; x++) {
    for (const coin of coins) {
      if (coin <= x) dp[x] = Math.min(dp[x], dp[x - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
        typescript: `function coinChange(coins: number[], amount: number): number {
  const dp = new Array<number>(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let x = 1; x <= amount; x++) {
    for (const coin of coins) {
      if (coin <= x) dp[x] = Math.min(dp[x]!, dp[x - coin]! + 1);
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount]!;
}`,

        java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (c <= a) dp[a] = Math.min(dp[a], dp[a - c] + 1);
            }
        }
        return dp[amount] == amount + 1 ? -1 : dp[amount];
    }
}`,
        cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int a = 1; a <= amount; a++) {
            for (int c : coins) {
                if (c <= a) dp[a] = min(dp[a], dp[a - c] + 1);
            }
        }
        return dp[amount] == amount + 1 ? -1 : dp[amount];
    }
};`,      },
    },
  },
  {
    slug: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["Array", "DP", "Binary Search"],
    order: 4,
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.`,
    examples: [
      { args: [[10, 9, 2, 5, 3, 7, 101, 18]], output: 4, explain: "The longest increasing subsequence is [2, 3, 7, 101]." },
      { args: [[0, 1, 0, 3, 2, 3]], output: 4 },
      { args: [[7, 7, 7, 7, 7, 7, 7]], output: 1 },
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    starter: {
      python: `from typing import List\n\n\ndef lengthOfLIS(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function lengthOfLIS(nums) {\n    \n}`,
      typescript: `function lengthOfLIS(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "lengthOfLIS",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[10, 9, 2, 5, 3, 7, 101, 18]], output: 4 },
      { args: [[0, 1, 0, 3, 2, 3]], output: 4 },
      { args: [[7, 7, 7, 7, 7, 7, 7]], output: 1 },
    ],
    hiddenTests: [
      { args: [[1]], output: 1 },
      { args: [[1, 2, 3, 4, 5]], output: 5 },
      { args: [[5, 4, 3, 2, 1]], output: 1 },
      { args: [[3, 10, 2, 1, 20]], output: 3 },
      { args: [[1, 3, 6, 7, 9, 4, 10, 5, 6]], output: 6 },
      { args: [[2, 2, 2]], output: 1 },
    ],
    editorial: {
      approach: `\`dp[i]\` = length of the longest increasing subsequence ending at \`nums[i]\`. For each \`i\`, scan all \`j < i\` and take \`dp[i] = max(dp[i], dp[j] + 1)\` when \`nums[j] < nums[i]\`. The answer is the max over all \`dp[i]\`.

The classic O(n^2) DP works here (n ≤ 2500). An O(n log n) variant maintains a patience-sorting "tails" array and binary-searches the insertion point.`,
      complexity: { time: "O(n^2)", space: "O(n)" },
      code: {
        python: `def lengthOfLIS(nums: List[int]) -> int:
    dp = [1] * len(nums)
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,
        javascript: `function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
  return Math.max(...dp);
}`,
        typescript: `function lengthOfLIS(nums: number[]): number {
  const dp = new Array<number>(nums.length).fill(1);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j]! < nums[i]!) dp[i] = Math.max(dp[i]!, dp[j]! + 1);
    }
  }
  return Math.max(...dp);
}`,

        java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        int[] tails = new int[nums.length];
        int size = 0;
        for (int x : nums) {
            int lo = 0, hi = size;
            while (lo < hi) {
                int mid = (lo + hi) >>> 1;
                if (tails[mid] < x) lo = mid + 1;
                else hi = mid;
            }
            tails[lo] = x;
            if (lo == size) size++;
        }
        return size;
    }
}`,
        cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> tails;
        for (int x : nums) {
            auto it = lower_bound(tails.begin(), tails.end(), x);
            if (it == tails.end()) tails.push_back(x);
            else *it = x;
        }
        return tails.size();
    }
};`,      },
    },
  },
];
