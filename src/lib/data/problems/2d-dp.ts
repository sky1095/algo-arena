import type { Problem } from "@/lib/types";

export const twoDDpProblems: Problem[] = [
  {
    slug: "unique-paths",
    title: "Unique Paths",
    difficulty: "Medium",
    category: "2d-dp",
    topics: ["Grid", "DP"],
    order: 1,
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the **top-left corner** (i.e., \`grid[0][0]\`). The robot tries to move to the **bottom-right corner** (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
    examples: [
      { args: [3, 7], output: 28 },
      { args: [3, 2], output: 3, explain: "From the top-left, there are a total of 3 ways: Right-Down-Down, Down-Right-Down, Down-Down-Right." },
    ],
    constraints: ["1 <= m, n <= 100", "The answer is guaranteed to be less than or equal to 2 * 10^9."],
    starter: {
      python: `def uniquePaths(m: int, n: int) -> int:\n    pass\n`,
      javascript: `function uniquePaths(m, n) {\n    \n}`,
      typescript: `function uniquePaths(m: number, n: number): number {\n    \n}`,
      java: `class Solution {\n    public int uniquePaths(int m, int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int uniquePaths(int m, int n) {\n        \n    }\n};`,
      dart: `class Solution {
  int uniquePaths(int m, int n) {
    
  }
}`,
    },
    methodName: "uniquePaths",
    argTypes: ["int", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [3, 7], output: 28 },
      { args: [3, 2], output: 3 },
    ],
    hiddenTests: [
      { args: [1, 1], output: 1 },
      { args: [1, 5], output: 1 },
      { args: [5, 1], output: 1 },
      { args: [2, 3], output: 3 },
      { args: [10, 10], output: 48620 },
      { args: [23, 12], output: 193536720 },
    ],
    editorial: {
      approach: `Every cell can be reached from its top neighbor or its left neighbor, so \`dp[r][c] = dp[r-1][c] + dp[r][c-1]\` with the top row and left column all equal to 1.

Only the previous row is needed, so a single rolling array gives O(m * n) time and O(n) space. (Note: for very large grids the count overflows 32-bit; the constraints guarantee the answer fits.)`,
      complexity: { time: "O(m * n)", space: "O(n)" },
      code: {
        python: `def uniquePaths(m: int, n: int) -> int:
    row = [1] * n
    for _ in range(1, m):
        for c in range(1, n):
            row[c] += row[c - 1]
    return row[-1]`,
        javascript: `function uniquePaths(m, n) {
  const row = new Array(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) row[c] += row[c - 1];
  }
  return row[n - 1];
}`,
        typescript: `function uniquePaths(m: number, n: number): number {
  const row = new Array<number>(n).fill(1);
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) row[c] = row[c]! + row[c - 1]!;
  }
  return row[n - 1]!;
}`,

        java: `class Solution {
    public int uniquePaths(int m, int n) {
        int[] dp = new int[n];
        Arrays.fill(dp, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
}`,
        cpp: `class Solution {
public:
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
};`,      },
    },
  },
  {
    slug: "longest-common-subsequence",
    title: "Longest Common Subsequence",
    difficulty: "Medium",
    category: "2d-dp",
    topics: ["String", "DP"],
    order: 2,
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest **common subsequence**. If there is no common subsequence, return \`0\`.

A **subsequence** of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.`,
    examples: [
      { args: ["abcde", "ace"], output: 3, explain: "The longest common subsequence is \"ace\"." },
      { args: ["abc", "abc"], output: 3 },
      { args: ["abc", "def"], output: 0 },
    ],
    constraints: ["1 <= text1.length, text2.length <= 1000", "text1 and text2 consist of only lowercase English characters."],
    starter: {
      python: `def longestCommonSubsequence(text1: str, text2: str) -> int:\n    pass\n`,
      javascript: `function longestCommonSubsequence(text1, text2) {\n    \n}`,
      typescript: `function longestCommonSubsequence(text1: string, text2: string): number {\n    \n}`,
      java: `class Solution {\n    public int longestCommonSubsequence(String text1, String text2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int longestCommonSubsequence(string text1, string text2) {\n        \n    }\n};`,
      dart: `class Solution {
  int longestCommonSubsequence(String text1, String text2) {
    
  }
}`,
    },
    methodName: "longestCommonSubsequence",
    argTypes: ["string", "string"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["abcde", "ace"], output: 3 },
      { args: ["abc", "abc"], output: 3 },
      { args: ["abc", "def"], output: 0 },
    ],
    hiddenTests: [
      { args: ["a", "a"], output: 1 },
      { args: ["a", "b"], output: 0 },
      { args: ["abcba", "abcbcba"], output: 5 },
      { args: ["oxcpqrsvwf", "shmtulqrypy"], output: 2 },
      { args: ["bl", "yby"], output: 1 },
      { args: ["pmjghexybyrgzczy", "hafcdqbgncrcbihkd"], output: 4 },
    ],
    editorial: {
      approach: `Compare characters from the end. If \`text1[i] == text2[j]\`, the match contributes 1 plus the LCS of the remaining prefixes. Otherwise, the LCS is the best of dropping one character from either string.

That gives \`dp[i][j] = (text1[i] == text2[j]) ? dp[i-1][j-1] + 1 : max(dp[i-1][j], dp[i][j-1])\`, computed with two rolling rows. O(m * n) time and O(n) space.`,
      complexity: { time: "O(m * n)", space: "O(min(m, n))" },
      code: {
        python: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    prev = [0] * (n + 1)
    for i in range(1, m + 1):
        curr = [0] * (n + 1)
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                curr[j] = prev[j - 1] + 1
            else:
                curr[j] = max(prev[j], curr[j - 1])
        prev = curr
    return prev[n]`,
        javascript: `function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  let prev = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    const curr = new Array(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) curr[j] = prev[j - 1] + 1;
      else curr[j] = Math.max(prev[j], curr[j - 1]);
    }
    prev = curr;
  }
  return prev[n];
}`,
        typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  let prev = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    const curr = new Array<number>(n + 1).fill(0);
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) curr[j] = prev[j - 1]! + 1;
      else curr[j] = Math.max(prev[j]!, curr[j - 1]!);
    }
    prev = curr;
  }
  return prev[n]!;
}`,

        java: `class Solution {
    public int longestCommonSubsequence(String a, String b) {
        int m = a.length(), n = b.length();
        int[] dp = new int[n + 1];
        for (int i = 1; i <= m; i++) {
            int prev = 0;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (a.charAt(i - 1) == b.charAt(j - 1)) dp[j] = prev + 1;
                else dp[j] = Math.max(dp[j], dp[j - 1]);
                prev = temp;
            }
        }
        return dp[n];
    }
}`,
        cpp: `class Solution {
public:
    int longestCommonSubsequence(string a, string b) {
        int m = a.size(), n = b.size();
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= m; i++) {
            int prev = 0;
            for (int j = 1; j <= n; j++) {
                int temp = dp[j];
                if (a[i - 1] == b[j - 1]) dp[j] = prev + 1;
                else dp[j] = max(dp[j], dp[j - 1]);
                prev = temp;
            }
        }
        return dp[n];
    }
};`,      },
    },
  },
  {
    slug: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "1d-dp",
    topics: ["String", "DP", "Hash Table"],
    order: 3,
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.`,
    examples: [
      { args: ["applepenapple", ["apple", "pen"]], output: true, explain: "Return true because \"applepenapple\" can be segmented as \"apple pen apple\"." },
      { args: ["catsanddog", ["cats", "dog", "sand", "and", "cat"]], output: true, explain: "Return true because \"catsanddog\" can be segmented as \"cats and dog\"." },
      { args: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], output: false },
    ],
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000", "1 <= wordDict[i].length <= 20", "s and wordDict[i] consist of only lowercase English letters.", "All the strings of wordDict are unique."],
    starter: {
      python: `from typing import List\n\n\ndef wordBreak(s: str, wordDict: List[str]) -> bool:\n    pass\n`,
      javascript: `function wordBreak(s, wordDict) {\n    \n}`,
      typescript: `function wordBreak(s: string, wordDict: string[]): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean wordBreak(String s, String[] wordDict) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};`,
      dart: `class Solution {
  bool wordBreak(String s, List<String> wordDict) {
    
  }
}`,
    },
    methodName: "wordBreak",
    argTypes: ["string", "string[]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["applepenapple", ["apple", "pen"]], output: true },
      { args: ["catsanddog", ["cats", "dog", "sand", "and", "cat"]], output: true },
      { args: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], output: false },
    ],
    hiddenTests: [
      { args: ["a", ["a"]], output: true },
      { args: ["a", ["b"]], output: false },
      { args: ["aaaaaaa", ["aaaa", "aaa"]], output: true },
      { args: ["cars", ["car", "ca", "rs"]], output: true },
      { args: ["cbca", ["bc", "ca"]], output: false },
      { args: ["abcd", ["a", "abc", "b", "cd"]], output: true },
    ],
    editorial: {
      approach: `\`dp[i]\` = true if the prefix \`s[0:i]\` can be segmented. Scan each position \`i\`; for every word that matches the suffix ending at \`i\`, set \`dp[i]\` if \`dp[i - word.length]\` is true.

Use a hash set for O(1) word lookups. O(n * m * L) time where m is the number of words and L their average length.`,
      complexity: { time: "O(n * m * L)", space: "O(n)" },
      code: {
        python: `def wordBreak(s: str, wordDict: List[str]) -> bool:
    words = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    for i in range(1, len(s) + 1):
        for word in words:
            if i >= len(word) and dp[i - len(word)] and s[i - len(word):i] == word:
                dp[i] = True
                break
    return dp[len(s)]`,
        javascript: `function wordBreak(s, wordDict) {
  const words = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (const word of words) {
      if (i >= word.length && dp[i - word.length] && s.slice(i - word.length, i) === word) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length];
}`,
        typescript: `function wordBreak(s: string, wordDict: string[]): boolean {
  const words = new Set(wordDict);
  const dp = new Array<boolean>(s.length + 1).fill(false);
  dp[0] = true;
  for (let i = 1; i <= s.length; i++) {
    for (const word of words) {
      if (i >= word.length && dp[i - word.length] && s.slice(i - word.length, i) === word) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length]!;
}`,

        java: `class Solution {
    public boolean wordBreak(String s, String[] wordDict) {
        Set<String> dict = new HashSet<>(Arrays.asList(wordDict));
        boolean[] dp = new boolean[s.length() + 1];
        dp[0] = true;
        for (int i = 1; i <= s.length(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.contains(s.substring(j, i))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
}`,
        cpp: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        vector<bool> dp(s.size() + 1, false);
        dp[0] = true;
        for (int i = 1; i <= (int)s.size(); i++) {
            for (int j = 0; j < i; j++) {
                if (dp[j] && dict.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.size()];
    }
};`,      },
    },
  },
];
