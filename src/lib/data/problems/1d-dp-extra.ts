import type { Problem } from "@/lib/types";

export const oneDDpExtra: Problem[] = [
  {
    slug: "min-cost-climbing-stairs",
    title: "Min Cost Climbing Stairs",
    difficulty: "Easy",
    category: "1d-dp",
    topics: ["Array", "Dynamic Programming"],
    order: 2,
    description: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`i\`th step on a staircase. Once you pay the cost, you can either climb one or two steps.
\nYou can either start from the step with index \`0\`, or the step with index \`1\`.\n\nReturn the minimum cost to reach the top of the floor.`,
    examples: [
      { args: [[10, 15, 20]], output: 15, explain: "You will start at index 1. - Pay 15 and climb two steps to reach the top." },
      { args: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], output: 6 },
    ],
    constraints: ["2 <= cost.length <= 1000", "0 <= cost[i] <= 999"],
    starter: {
      python: `from typing import List\n\n\ndef minCostClimbingStairs(cost: List[int]) -> int:\n    pass\n`,
      javascript: `function minCostClimbingStairs(cost) {\n    \n}`,
      typescript: `function minCostClimbingStairs(cost: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int minCostClimbingStairs(int[] cost) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int minCostClimbingStairs(vector<int>& cost) {\n        \n    }\n};`,
      dart: `class Solution {
  int minCostClimbingStairs(List<int> cost) {
    
  }
}`,
    },
    methodName: "minCostClimbingStairs",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[10, 15, 20]], output: 15 },
      { args: [[1, 100, 1, 1, 1, 100, 1, 1, 100, 1]], output: 6 },
    ],
    hiddenTests: [
      { args: [[0, 0, 0, 0]], output: 0 },
      { args: [[1, 2]], output: 1 },
      { args: [[2, 1]], output: 1 },
      { args: [[0, 1, 2, 2]], output: 2 },
      { args: [[1, 2, 3, 4, 5]], output: 6 },
    ],
    editorial: {
      approach: `Let \`dp[i]\` be the minimum cost to reach step \`i\`. Since you can arrive from \`i - 1\` or \`i - 2\`, \`dp[i] = cost[i] + min(dp[i - 1], dp[i - 2])\`. The answer is \`min(dp[n - 1], dp[n - 2])\` because the top can be reached from either of the last two steps.\n\nO(n) time, O(1) space with two rolling variables.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def minCostClimbingStairs(cost: List[int]) -> int:
    prev2, prev1 = cost[0], cost[1]
    for i in range(2, len(cost)):
        prev2, prev1 = prev1, cost[i] + min(prev1, prev2)
    return min(prev1, prev2)`,
        javascript: `function minCostClimbingStairs(cost) {
  let prev2 = cost[0], prev1 = cost[1];
  for (let i = 2; i < cost.length; i++) {
    const cur = cost[i] + Math.min(prev1, prev2);
    prev2 = prev1;
    prev1 = cur;
  }
  return Math.min(prev1, prev2);
}`,
        typescript: `function minCostClimbingStairs(cost: number[]): number {
  let prev2 = cost[0]!, prev1 = cost[1]!;
  for (let i = 2; i < cost.length; i++) {
    const cur = cost[i]! + Math.min(prev1, prev2);
    prev2 = prev1;
    prev1 = cur;
  }
  return Math.min(prev1, prev2);
}`,

        java: `class Solution {
    public int minCostClimbingStairs(int[] cost) {
        int n = cost.length;
        int a = cost[0], b = cost[1];
        for (int i = 2; i < n; i++) {
            int c = cost[i] + Math.min(a, b);
            a = b;
            b = c;
        }
        return Math.min(a, b);
    }
}`,
        cpp: `class Solution {
public:
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int a = cost[0], b = cost[1];
        for (int i = 2; i < n; i++) {
            int c = cost[i] + min(a, b);
            a = b;
            b = c;
        }
        return min(a, b);
    }
};`,      },
    },
  },
  {
    slug: "house-robber-ii",
    title: "House Robber II",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["Array", "Dynamic Programming"],
    order: 4,
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are **arranged in a circle**. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.
\nGiven an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight **without alerting the police**.`,
    examples: [
      { args: [[2, 3, 2]], output: 3 },
      { args: [[1, 2, 3, 1]], output: 4 },
      { args: [[1, 2, 3]], output: 3 },
    ],
    constraints: ["1 <= nums.length <= 100", "0 <= nums[i] <= 1000"],
    starter: {
      python: `from typing import List\n\n\ndef rob(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function rob(nums) {\n    \n}`,
      typescript: `function rob(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};`,
      dart: `class Solution {
  int rob(List<int> nums) {
    
  }
}`,
    },
    methodName: "rob",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[2, 3, 2]], output: 3 },
      { args: [[1, 2, 3, 1]], output: 4 },
      { args: [[1, 2, 3]], output: 3 },
    ],
    hiddenTests: [
      { args: [[1]], output: 1 },
      { args: [[1, 2]], output: 2 },
      { args: [[2, 3, 2]], output: 3 },
      { args: [[200, 3, 140, 20, 10]], output: 340 },
      { args: [[0, 0, 0]], output: 0 },
      { args: [[5, 1, 1, 5]], output: 6 },
    ],
    editorial: {
      approach: `The circle breaks into two linear cases: rob houses \`0..n-2\` (skip last) or houses \`1..n-1\` (skip first), and take the better of the two. For each linear range, use the classic House Robber recurrence: \`rob[i] = max(rob[i-1], rob[i-2] + nums[i])\`.\n\nO(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def rob(nums: List[int]) -> int:
    def linear(arr: List[int]) -> int:
        prev2, prev1 = 0, 0
        for x in arr:
            prev2, prev1 = prev1, max(prev1, prev2 + x)
        return prev1

    if len(nums) == 1:
        return nums[0]
    return max(linear(nums[:-1]), linear(nums[1:]))`,
        javascript: `function rob(nums) {
  const linear = (arr) => {
    let prev2 = 0, prev1 = 0;
    for (const x of arr) {
      const cur = Math.max(prev1, prev2 + x);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  };
  if (nums.length === 1) return nums[0];
  return Math.max(linear(nums.slice(0, -1)), linear(nums.slice(1)));
}`,
        typescript: `function rob(nums: number[]): number {
  const linear = (arr: number[]): number => {
    let prev2 = 0, prev1 = 0;
    for (const x of arr) {
      const cur = Math.max(prev1, prev2 + x);
      prev2 = prev1;
      prev1 = cur;
    }
    return prev1;
  };
  if (nums.length === 1) return nums[0]!;
  return Math.max(linear(nums.slice(0, -1)), linear(nums.slice(1)));
}`,

        java: `class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        if (n == 1) return nums[0];
        return Math.max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }

    private int robRange(int[] nums, int lo, int hi) {
        int rob = 0, skip = 0;
        for (int i = lo; i <= hi; i++) {
            int newRob = skip + nums[i];
            skip = Math.max(skip, rob);
            rob = newRob;
        }
        return Math.max(rob, skip);
    }
}`,
        cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return nums[0];
        return max(robRange(nums, 0, n - 2), robRange(nums, 1, n - 1));
    }

    int robRange(vector<int>& nums, int lo, int hi) {
        int rob = 0, skip = 0;
        for (int i = lo; i <= hi; i++) {
            int newRob = skip + nums[i];
            skip = max(skip, rob);
            rob = newRob;
        }
        return max(rob, skip);
    }
};`,      },
    },
  },
  {
    slug: "longest-palindromic-substring",
    title: "Longest Palindromic Substring",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["String", "Dynamic Programming"],
    order: 5,
    description: `Given a string \`s\`, return the **longest palindromic substring** in \`s\`.`,
    examples: [
      { args: ["cbbd"], output: "bb" },
      { args: ["a"], output: "a" },
      { args: ["racecar"], output: "racecar" },
    ],
    constraints: ["1 <= s.length <= 1000", "s consists of only digits and English letters."],
    starter: {
      python: `def longestPalindrome(s: str) -> str:\n    pass\n`,
      javascript: `function longestPalindrome(s) {\n    \n}`,
      typescript: `function longestPalindrome(s: string): string {\n    \n}`,
      java: `class Solution {\n    public String longestPalindrome(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string longestPalindrome(string s) {\n        \n    }\n};`,
      dart: `class Solution {
  String longestPalindrome(String s) {
    
  }
}`,
    },
    methodName: "longestPalindrome",
    argTypes: ["string"],
    outputType: "string",
    compare: "exact",
    visibleTests: [
      { args: ["cbbd"], output: "bb" },
      { args: ["a"], output: "a" },
      { args: ["racecar"], output: "racecar" },
    ],
    hiddenTests: [
      { args: ["ac"], output: "a" },
      { args: ["forgeeksskeegfor"], output: "geeksskeeg" },
      { args: ["bananas"], output: "anana" },
      { args: ["abaxyzzyxf"], output: "xyzzyx" },
      { args: ["aa"], output: "aa" },
      { args: ["abcaacba"], output: "abcaacba" },
    ],
    editorial: {
      approach: `Expand around center: every palindrome has a center (one character for odd length, two for even). For each of the \`2n - 1\` centers, expand outward while the characters match, tracking the longest span found.\n\nO(n^2) time, O(1) space.`,
      complexity: { time: "O(n^2)", space: "O(1)" },
      code: {
        python: `def longestPalindrome(s: str) -> str:
    start, max_len = 0, 0

    def expand(l: int, r: int) -> None:
        nonlocal start, max_len
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        length = r - l - 1
        if length > max_len:
            max_len = length
            start = l + 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)
    return s[start : start + max_len]`,
        javascript: `function longestPalindrome(s) {
  let start = 0, maxLen = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--; r++;
    }
    const length = r - l - 1;
    if (length > maxLen) {
      maxLen = length;
      start = l + 1;
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}`,
        typescript: `function longestPalindrome(s: string): string {
  let start = 0, maxLen = 0;
  const expand = (l: number, r: number): void => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      l--; r++;
    }
    const length = r - l - 1;
    if (length > maxLen) {
      maxLen = length;
      start = l + 1;
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return s.slice(start, start + maxLen);
}`,

        java: `class Solution {
    public String longestPalindrome(String s) {
        String best = "";
        for (int i = 0; i < s.length(); i++) {
            String a = expand(s, i, i);
            String b = expand(s, i, i + 1);
            if (a.length() > best.length()) best = a;
            if (b.length() > best.length()) best = b;
        }
        return best;
    }

    private String expand(String s, int l, int r) {
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            l--;
            r++;
        }
        return s.substring(l + 1, r);
    }
}`,
        cpp: `class Solution {
public:
    string longestPalindrome(string s) {
        string best;
        for (int i = 0; i < (int)s.size(); i++) {
            string a = expand(s, i, i);
            string b = expand(s, i, i + 1);
            if (a.size() > best.size()) best = a;
            if (b.size() > best.size()) best = b;
        }
        return best;
    }

    string expand(const string& s, int l, int r) {
        while (l >= 0 && r < (int)s.size() && s[l] == s[r]) {
            l--;
            r++;
        }
        return s.substr(l + 1, r - l - 1);
    }
};`,      },
    },
  },
  {
    slug: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["String", "Dynamic Programming"],
    order: 6,
    description: `Given a string \`s\`, return the number of **palindromic substrings** in it.
\nA string is a palindrome when it reads the same backward as forward.\n\nA substring is a contiguous sequence of characters within the string.`,
    examples: [
      { args: ["abc"], output: 3 },
      { args: ["aaa"], output: 6 },
    ],
    constraints: ["1 <= s.length <= 1000", "s consists of lowercase English letters."],
    starter: {
      python: `def countSubstrings(s: str) -> int:\n    pass\n`,
      javascript: `function countSubstrings(s) {\n    \n}`,
      typescript: `function countSubstrings(s: string): number {\n    \n}`,
      java: `class Solution {\n    public int countSubstrings(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int countSubstrings(string s) {\n        \n    }\n};`,
      dart: `class Solution {
  int countSubstrings(String s) {
    
  }
}`,
    },
    methodName: "countSubstrings",
    argTypes: ["string"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["abc"], output: 3 },
      { args: ["aaa"], output: 6 },
    ],
    hiddenTests: [
      { args: ["a"], output: 1 },
      { args: ["ab"], output: 2 },
      { args: ["aa"], output: 3 },
      { args: ["aba"], output: 4 },
      { args: ["abba"], output: 6 },
      { args: ["aabaa"], output: 9 },
    ],
    editorial: {
      approach: `Same expand-around-center idea as Longest Palindromic Substring, but count every expansion: each center expands to one palindrome at each step. Odd centers and even centers both contribute.\n\nO(n^2) time, O(1) space.`,
      complexity: { time: "O(n^2)", space: "O(1)" },
      code: {
        python: `def countSubstrings(s: str) -> int:
    count = 0

    def expand(l: int, r: int) -> None:
        nonlocal count
        while l >= 0 and r < len(s) and s[l] == s[r]:
            count += 1
            l -= 1
            r += 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)
    return count`,
        javascript: `function countSubstrings(s) {
  let count = 0;
  const expand = (l, r) => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--; r++;
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}`,
        typescript: `function countSubstrings(s: string): number {
  let count = 0;
  const expand = (l: number, r: number): void => {
    while (l >= 0 && r < s.length && s[l] === s[r]) {
      count++;
      l--; r++;
    }
  };
  for (let i = 0; i < s.length; i++) {
    expand(i, i);
    expand(i, i + 1);
  }
  return count;
}`,

        java: `class Solution {
    public int countSubstrings(String s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            count += expand(s, i, i);
            count += expand(s, i, i + 1);
        }
        return count;
    }

    private int expand(String s, int l, int r) {
        int count = 0;
        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {
            count++;
            l--;
            r++;
        }
        return count;
    }
}`,
        cpp: `class Solution {
public:
    int countSubstrings(string s) {
        int count = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            count += expand(s, i, i);
            count += expand(s, i, i + 1);
        }
        return count;
    }

    int expand(const string& s, int l, int r) {
        int count = 0;
        while (l >= 0 && r < (int)s.size() && s[l] == s[r]) {
            count++;
            l--;
            r++;
        }
        return count;
    }
};`,      },
    },
  },
  {
    slug: "decode-ways",
    title: "Decode Ways",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["String", "Dynamic Programming"],
    order: 7,
    description: `A message containing letters from \`A-Z\` can be **encoded** into numbers using the following mapping:
\n\`'A' -> "1"\`\n\`'B' -> "2"\`\n...\n\`'Z' -> "26"\`\n\nTo **decode** an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above (there may be multiple ways). For example, \`"11106"\` can be mapped into:\n- \`"AAJF"\` with the grouping \`(1 1 10 6)\`\n- \`"KJF"\` with the grouping \`(11 10 6)\`\n\nNote that the grouping \`(1 11 06)\` is invalid because \`"06"\` cannot be mapped into \`'F'\` since \`"6"\` is different from \`"06"\`.\n\nGiven a string \`s\` containing only digits, return the **number** of ways to **decode** it.`,
    examples: [
      { args: ["12"], output: 2 },
      { args: ["226"], output: 3 },
      { args: ["06"], output: 0 },
    ],
    constraints: ["1 <= s.length <= 100", "s contains only digits and may contain leading zero(s)."],
    starter: {
      python: `def numDecodings(s: str) -> int:\n    pass\n`,
      javascript: `function numDecodings(s) {\n    \n}`,
      typescript: `function numDecodings(s: string): number {\n    \n}`,
      java: `class Solution {\n    public int numDecodings(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numDecodings(string s) {\n        \n    }\n};`,
      dart: `class Solution {
  int numDecodings(String s) {
    
  }
}`,
    },
    methodName: "numDecodings",
    argTypes: ["string"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["12"], output: 2 },
      { args: ["226"], output: 3 },
      { args: ["06"], output: 0 },
    ],
    hiddenTests: [
      { args: ["0"], output: 0 },
      { args: ["10"], output: 1 },
      { args: ["27"], output: 1 },
      { args: ["2101"], output: 1 },
      { args: ["111"], output: 3 },
      { args: ["11106"], output: 2 },
      { args: ["123"], output: 3 },
    ],
    editorial: {
      approach: `DP over prefixes: \`dp[i]\` = ways to decode \`s[:i]\`. A single digit is decodable if it is not \`"0"\`; a two-digit group is decodable if it lies between 10 and 26. So \`dp[i] = (dp[i-1] if s[i-1] != '0') + (dp[i-2] if s[i-2:i] is 10..26)\`.\n\nO(n) time, O(1) space with two rolling variables.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def numDecodings(s: str) -> int:
    prev2, prev1 = 1, 1 if s[0] != "0" else 0
    for i in range(1, len(s)):
        cur = 0
        if s[i] != "0":
            cur += prev1
        two = int(s[i - 1 : i + 1])
        if 10 <= two <= 26:
            cur += prev2
        prev2, prev1 = prev1, cur
    return prev1`,
        javascript: `function numDecodings(s) {
  let prev2 = 1, prev1 = s[0] === "0" ? 0 : 1;
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== "0") cur += prev1;
    const two = parseInt(s.slice(i - 1, i + 1));
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,
        typescript: `function numDecodings(s: string): number {
  let prev2 = 1, prev1 = s[0] === "0" ? 0 : 1;
  for (let i = 1; i < s.length; i++) {
    let cur = 0;
    if (s[i] !== "0") cur += prev1;
    const two = parseInt(s.slice(i - 1, i + 1));
    if (two >= 10 && two <= 26) cur += prev2;
    prev2 = prev1;
    prev1 = cur;
  }
  return prev1;
}`,

        java: `class Solution {
    public int numDecodings(String s) {
        int n = s.length();
        int dp2 = 1, dp1 = s.charAt(n - 1) != '0' ? 1 : 0;
        for (int i = n - 2; i >= 0; i--) {
            int cur = 0;
            if (s.charAt(i) != '0') cur += dp1;
            int two = (s.charAt(i) - '0') * 10 + (s.charAt(i + 1) - '0');
            if (two >= 10 && two <= 26) cur += dp2;
            dp2 = dp1;
            dp1 = cur;
        }
        return dp1;
    }
}`,
        cpp: `class Solution {
public:
    int numDecodings(string s) {
        int n = s.size();
        int dp2 = 1, dp1 = s[n - 1] != '0' ? 1 : 0;
        for (int i = n - 2; i >= 0; i--) {
            int cur = 0;
            if (s[i] != '0') cur += dp1;
            int two = (s[i] - '0') * 10 + (s[i + 1] - '0');
            if (two >= 10 && two <= 26) cur += dp2;
            dp2 = dp1;
            dp1 = cur;
        }
        return dp1;
    }
};`,      },
    },
  },
  {
    slug: "maximum-product-subarray",
    title: "Maximum Product Subarray",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["Array", "Dynamic Programming"],
    order: 9,
    description: `Given an integer array \`nums\`, find a subarray that has the largest product, and return the product.
\nThe test cases are generated so that the answer will fit in a **32-bit** integer.`,
    examples: [
      { args: [[2, 3, -2, 4]], output: 6 },
      { args: [[-2, 0, -1]], output: 0 },
    ],
    constraints: ["1 <= nums.length <= 2 * 10^4", "-10 <= nums[i] <= 10", "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."],
    starter: {
      python: `from typing import List\n\n\ndef maxProduct(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function maxProduct(nums) {\n    \n}`,
      typescript: `function maxProduct(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int maxProduct(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxProduct(vector<int>& nums) {\n        \n    }\n};`,
      dart: `class Solution {
  int maxProduct(List<int> nums) {
    
  }
}`,
    },
    methodName: "maxProduct",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[2, 3, -2, 4]], output: 6 },
      { args: [[-2, 0, -1]], output: 0 },
    ],
    hiddenTests: [
      { args: [[0, 2]], output: 2 },
      { args: [[-2]], output: -2 },
      { args: [[2, 3, -2, 4, -1]], output: 48 },
      { args: [[1, 2, 3, 0, 4, 5]], output: 20 },
      { args: [[-1, -2, -3, 0]], output: 6 },
      { args: [[-2, -3, 7]], output: 42 },
    ],
    editorial: {
      approach: `A negative number can flip the best product into the worst, so track both the maximum and minimum product ending at each position. For each element, the new max is \`max(x, maxProd * x, minProd * x)\` and likewise for min. Keep the global best.\n\nO(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def maxProduct(nums: List[int]) -> int:
    best = cur_max = cur_min = nums[0]
    for x in nums[1:]:
        candidates = (x, cur_max * x, cur_min * x)
        cur_max = max(candidates)
        cur_min = min(candidates)
        best = max(best, cur_max)
    return best`,
        javascript: `function maxProduct(nums) {
  let best = nums[0], curMax = nums[0], curMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i];
    const a = x, b = curMax * x, c = curMin * x;
    curMax = Math.max(a, b, c);
    curMin = Math.min(a, b, c);
    best = Math.max(best, curMax);
  }
  return best;
}`,
        typescript: `function maxProduct(nums: number[]): number {
  let best = nums[0]!, curMax = nums[0]!, curMin = nums[0]!;
  for (let i = 1; i < nums.length; i++) {
    const x = nums[i]!;
    const a = x, b = curMax * x, c = curMin * x;
    curMax = Math.max(a, b, c);
    curMin = Math.min(a, b, c);
    best = Math.max(best, curMax);
  }
  return best;
}`,

        java: `class Solution {
    public int maxProduct(int[] nums) {
        int curMax = nums[0], curMin = nums[0], best = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int a = nums[i] * curMax, b = nums[i] * curMin;
            curMax = Math.max(nums[i], Math.max(a, b));
            curMin = Math.min(nums[i], Math.min(a, b));
            best = Math.max(best, curMax);
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int curMax = nums[0], curMin = nums[0], best = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            int a = nums[i] * curMax, b = nums[i] * curMin;
            curMax = max(nums[i], max(a, b));
            curMin = min(nums[i], min(a, b));
            best = max(best, curMax);
        }
        return best;
    }
};`,      },
    },
  },
  {
    slug: "partition-equal-subset-sum",
    title: "Partition Equal Subset Sum",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["Array", "Dynamic Programming"],
    order: 12,
    description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal, or \`false\` otherwise.`,
    examples: [
      { args: [[1, 5, 11, 5]], output: true },
      { args: [[1, 2, 3, 5]], output: false },
    ],
    constraints: ["1 <= nums.length <= 200", "1 <= nums[i] <= 100"],
    starter: {
      python: `from typing import List\n\n\ndef canPartition(nums: List[int]) -> bool:\n    pass\n`,
      javascript: `function canPartition(nums) {\n    \n}`,
      typescript: `function canPartition(nums: number[]): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean canPartition(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canPartition(vector<int>& nums) {\n        \n    }\n};`,
      dart: `class Solution {
  bool canPartition(List<int> nums) {
    
  }
}`,
    },
    methodName: "canPartition",
    argTypes: ["int[]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[1, 5, 11, 5]], output: true },
      { args: [[1, 2, 3, 5]], output: false },
    ],
    hiddenTests: [
      { args: [[1]], output: false },
      { args: [[1, 1]], output: true },
      { args: [[1, 2, 5]], output: false },
      { args: [[3, 3, 3, 3]], output: true },
      { args: [[1, 2, 3, 4]], output: true },
      { args: [[1, 2, 3, 4, 6]], output: true },
      { args: [[1, 2, 5, 9]], output: false },
    ],
    editorial: {
      approach: `The total sum must be even — a partition into equal halves requires each half to sum to \`total / 2\`. Then it is a subset-sum problem: determine whether some subset sums to \`target\`. Use a 1-D boolean DP where \`dp[s]\` indicates whether sum \`s\` is achievable; iterate numbers and update sums in descending order.\n\nO(n * target) time, O(target) space.`,
      complexity: { time: "O(n * target)", space: "O(target)" },
      code: {
        python: `def canPartition(nums: List[int]) -> bool:
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    for x in nums:
        for s in range(target, x - 1, -1):
            if dp[s - x]:
                dp[s] = True
    return dp[target]`,
        javascript: `function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) {
      if (dp[s - x]) dp[s] = true;
    }
  }
  return dp[target];
}`,
        typescript: `function canPartition(nums: number[]): boolean {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2) return false;
  const target = total / 2;
  const dp = new Array<boolean>(target + 1).fill(false);
  dp[0] = true;
  for (const x of nums) {
    for (let s = target; s >= x; s--) {
      if (dp[s - x]!) dp[s] = true;
    }
  }
  return dp[target]!;
}`,

        java: `class Solution {
    public boolean canPartition(int[] nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        boolean[] dp = new boolean[target + 1];
        dp[0] = true;
        for (int n : nums) {
            for (int s = target; s >= n; s--) {
                if (dp[s - n]) dp[s] = true;
            }
        }
        return dp[target];
    }
}`,
        cpp: `class Solution {
public:
    bool canPartition(vector<int>& nums) {
        int sum = 0;
        for (int n : nums) sum += n;
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        for (int n : nums) {
            for (int s = target; s >= n; s--) {
                if (dp[s - n]) dp[s] = true;
            }
        }
        return dp[target];
    }
};`,      },
    },
  },
];
