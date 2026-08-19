import type { Problem } from "@/lib/types";

export const bitManipulationProblems: Problem[] = [
  {
    slug: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    category: "bit-manipulation",
    topics: ["Array", "Bit Manipulation"],
    order: 1,
    description: `Given a **non-empty** array of integers \`nums\`, every element appears **twice** except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.`,
    examples: [
      { args: [[2, 2, 1]], output: 1 },
      { args: [[4, 1, 2, 1, 2]], output: 4 },
      { args: [[1]], output: 1 },
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "-3 * 10^4 <= nums[i] <= 3 * 10^4", "Each element in the array appears twice except for one element which appears only once."],
    starter: {
      python: `from typing import List\n\n\ndef singleNumber(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function singleNumber(nums) {\n    \n}`,
      typescript: `function singleNumber(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};`,
      dart: `class Solution {
  int singleNumber(List<int> nums) {
    
  }
}`,
    },
    methodName: "singleNumber",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[2, 2, 1]], output: 1 },
      { args: [[4, 1, 2, 1, 2]], output: 4 },
      { args: [[1]], output: 1 },
    ],
    hiddenTests: [
      { args: [[0, 0, 5]], output: 5 },
      { args: [[-1, -1, 7]], output: 7 },
      { args: [[1, 2, 3, 2, 1]], output: 3 },
      { args: [[9, 8, 7, 6, 7, 8, 9]], output: 6 },
      { args: [[100, 50, 100, 50, -3]], output: -3 },
    ],
    editorial: {
      approach: `XOR is its own inverse: \`a ^ a = 0\` and \`a ^ 0 = a\`, and it is commutative and associative. XOR every element together — paired elements cancel out, leaving exactly the single number.

O(n) time and O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def singleNumber(nums: List[int]) -> int:
    result = 0
    for num in nums:
        result ^= num
    return result`,
        javascript: `function singleNumber(nums) {
  let result = 0;
  for (const num of nums) result ^= num;
  return result;
}`,
        typescript: `function singleNumber(nums: number[]): number {
  let result = 0;
  for (const num of nums) result ^= num;
  return result;
}`,

        java: `class Solution {
    public int singleNumber(int[] nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }
}`,
        cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int res = 0;
        for (int n : nums) res ^= n;
        return res;
    }
};`,      },
    },
  },
  {
    slug: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "bit-manipulation",
    topics: ["Bit Manipulation"],
    order: 2,
    description: `Write a function that takes the binary representation of an unsigned integer and returns the number of '1' bits it has (also known as the **Hamming weight**).

The input is given as a non-negative integer \`n\` (the test cases interpret it as its 32-bit unsigned representation).`,
    examples: [
      { args: [11], output: 3, explain: "The binary form of 11 is 1011, which has three 1 bits." },
      { args: [128], output: 1 },
      { args: [1073741823], output: 30 },
    ],
    constraints: ["0 <= n <= 2^32 - 1"],
    starter: {
      python: `def hammingWeight(n: int) -> int:\n    pass\n`,
      javascript: `function hammingWeight(n) {\n    \n}`,
      typescript: `function hammingWeight(n: number): number {\n    \n}`,
      java: `class Solution {\n    public int hammingWeight(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int hammingWeight(int n) {\n        \n    }\n};`,
      dart: `class Solution {
  int hammingWeight(int n) {
    
  }
}`,
    },
    methodName: "hammingWeight",
    argTypes: ["int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [11], output: 3 },
      { args: [128], output: 1 },
      { args: [1073741823], output: 30 },
    ],
    hiddenTests: [
      { args: [0], output: 0 },
      { args: [1], output: 1 },
      { args: [65535], output: 16 },
      { args: [65535], output: 16 },
      { args: [1073741824], output: 1 },
    ],
    editorial: {
      approach: `The trick \`n & (n - 1)\` clears the lowest set bit. Repeatedly apply it and count iterations until the number becomes zero — the count is the number of 1 bits.

Each iteration removes one set bit, so the runtime is O(number of set bits), worst case O(32).`,
      complexity: { time: "O(number of 1 bits)", space: "O(1)" },
      code: {
        python: `def hammingWeight(n: int) -> int:
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
        javascript: `function hammingWeight(n) {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
}`,
        typescript: `function hammingWeight(n: number): number {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
}`,

        java: `class Solution {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= n - 1;
            count++;
        }
        return count;
    }
}`,
        cpp: `class Solution {
public:
    int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n &= n - 1;
            count++;
        }
        return count;
    }
};`,      },
    },
  },
  {
    slug: "counting-bits",
    title: "Counting Bits",
    difficulty: "Easy",
    category: "bit-manipulation",
    topics: ["Bit Manipulation", "DP"],
    order: 3,
    description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the **number of 1's** in the binary representation of \`i\`.`,
    examples: [
      { args: [2], output: [0, 1, 1] },
      { args: [5], output: [0, 1, 1, 2, 1, 2] },
    ],
    constraints: ["0 <= n <= 10^5"],
    starter: {
      python: `from typing import List\n\n\ndef countBits(n: int) -> List[int]:\n    pass\n`,
      javascript: `function countBits(n) {\n    \n}`,
      typescript: `function countBits(n: number): number[] {\n    \n}`,
      java: `class Solution {\n    public int[] countBits(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> countBits(int n) {\n        \n    }\n};`,
      dart: `class Solution {
  List<int> countBits(int n) {
    
  }
}`,
    },
    methodName: "countBits",
    argTypes: ["int"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [2], output: [0, 1, 1] },
      { args: [5], output: [0, 1, 1, 2, 1, 2] },
    ],
    hiddenTests: [
      { args: [0], output: [0] },
      { args: [1], output: [0, 1] },
      { args: [3], output: [0, 1, 1, 2] },
      { args: [8], output: [0, 1, 1, 2, 1, 2, 2, 3, 1] },
      { args: [16], output: [0, 1, 1, 2, 1, 2, 2, 3, 1, 2, 2, 3, 2, 3, 3, 4, 1] },
    ],
    editorial: {
      approach: `Use the recurrence \`ans[i] = ans[i >> 1] + (i & 1)\`: the number of bits in \`i\` equals the bits in \`i\` without its lowest bit, plus whether that bit was set. Equivalently, \`ans[i] = ans[i & (i - 1)] + 1\`.

O(n) time and O(1) extra space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def countBits(n: int) -> List[int]:
    ans = [0] * (n + 1)
    for i in range(1, n + 1):
        ans[i] = ans[i >> 1] + (i & 1)
    return ans`,
        javascript: `function countBits(n) {
  const ans = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1] + (i & 1);
  }
  return ans;
}`,
        typescript: `function countBits(n: number): number[] {
  const ans = new Array<number>(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    ans[i] = ans[i >> 1]! + (i & 1);
  }
  return ans;
}`,

        java: `class Solution {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> countBits(int n) {
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
};`,      },
    },
  },
];
