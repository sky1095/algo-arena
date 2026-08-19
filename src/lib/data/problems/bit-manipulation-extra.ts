import type { Problem } from "@/lib/types";

export const bitManipulationExtra: Problem[] = [
  {
    slug: "reverse-bits",
    title: "Reverse Bits",
    difficulty: "Easy",
    category: "bit-manipulation",
    topics: ["Divide and Conquer", "Bit Manipulation"],
    order: 4,
    description: `Reverse bits of a given 32 bits unsigned integer.
\n**Note:** The input is a 32-bit unsigned integer, and the output is expected to be returned as a 32-bit unsigned integer as well.`,
    examples: [
      { args: [43261596], output: 964176192, explain: "The input binary string 00000010100101000001111010011100 represents the unsigned integer 43261596, so return 964176192 whose binary representation is 00111001011110000010100101000000." },
      { args: [2147483646], output: 2147483646 },
    ],
    constraints: ["The input must be a binary string of length 32."],
    starter: {
      python: `def reverseBits(n: int) -> int:\n    pass\n`,
      javascript: `function reverseBits(n) {\n    \n}`,
      typescript: `function reverseBits(n: number): number {\n    \n}`,
      java: `public class Solution {\n    // you need treat n as an unsigned value\n    public int reverseBits(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    uint32_t reverseBits(uint32_t n) {\n        \n    }\n};`,
      dart: `class Solution {
  int reverseBits(int n) {
    
  }
}`,
    },
    methodName: "reverseBits",
    argTypes: ["int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [43261596], output: 964176192 },
      { args: [2147483646], output: 2147483646 },
    ],
    hiddenTests: [
      { args: [0], output: 0 },
      { args: [2], output: 1073741824 },
      { args: [12345678], output: 1921400064 },
      { args: [964176192], output: 43261596 },
    ],
    editorial: {
      approach: `Iterate 32 times: shift the result left by one, OR in the current lowest bit of \`n\`, then shift \`n\` right (unsigned shift for JS/Java so the sign bit doesn't propagate). After 32 iterations the bits are fully reversed.\n\nO(1) time and space.`,
      complexity: { time: "O(1)", space: "O(1)" },
      code: {
        python: `def reverseBits(n: int) -> int:
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res`,
        javascript: `function reverseBits(n) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res << 1) | (n & 1);
    n >>>= 1;
  }
  return res >>> 0;
}`,
        typescript: `function reverseBits(n: number): number {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    res = (res << 1) | (n & 1);
    n >>>= 1;
  }
  return res >>> 0;
}`,

        java: `class Solution {
    public int reverseBits(int n) {
        int res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1);
            n >>>= 1;
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    int reverseBits(uint32_t n) {
        uint32_t res = 0;
        for (int i = 0; i < 32; i++) {
            res = (res << 1) | (n & 1);
            n >>= 1;
        }
        return (int) res;
    }
};`,      },
    },
  },
  {
    slug: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    category: "bit-manipulation",
    topics: ["Array", "Hash Table", "Math", "Bit Manipulation"],
    order: 5,
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    examples: [
      { args: [[3, 0, 1]], output: 2 },
      { args: [[0, 1]], output: 2 },
      { args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], output: 8 },
    ],
    constraints: ["n == nums.length", "1 <= n <= 10^4", "0 <= nums[i] <= n", "All the numbers of nums are unique."],
    starter: {
      python: `from typing import List\n\n\ndef missingNumber(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function missingNumber(nums) {\n    \n}`,
      typescript: `function missingNumber(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};`,
      dart: `class Solution {
  int missingNumber(List<int> nums) {
    
  }
}`,
    },
    methodName: "missingNumber",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 0, 1]], output: 2 },
      { args: [[0, 1]], output: 2 },
      { args: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], output: 8 },
    ],
    hiddenTests: [
      { args: [[0]], output: 1 },
      { args: [[1]], output: 0 },
      { args: [[0, 2]], output: 1 },
      { args: [[0, 1, 2, 3]], output: 4 },
      { args: [[1, 2, 3, 4]], output: 0 },
      { args: [[5, 3, 1, 0, 2]], output: 4 },
    ],
    editorial: {
      approach: `XOR is its own inverse: XOR all array elements together with every index and \`n\`. Numbers appearing in both the range and the array cancel out, leaving exactly the missing number.\n\nO(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def missingNumber(nums: List[int]) -> int:
    res = len(nums)
    for i, x in enumerate(nums):
        res ^= i ^ x
    return res`,
        javascript: `function missingNumber(nums) {
  let res = nums.length;
  for (let i = 0; i < nums.length; i++) res ^= i ^ nums[i];
  return res;
}`,
        typescript: `function missingNumber(nums: number[]): number {
  let res = nums.length;
  for (let i = 0; i < nums.length; i++) res ^= i ^ nums[i]!;
  return res;
}`,

        java: `class Solution {
    public int missingNumber(int[] nums) {
        int res = nums.length;
        for (int i = 0; i < nums.length; i++) {
            res ^= i ^ nums[i];
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int res = nums.size();
        for (int i = 0; i < (int)nums.size(); i++) {
            res ^= i ^ nums[i];
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "sum-of-two-integers",
    title: "Sum of Two Integers",
    difficulty: "Medium",
    category: "bit-manipulation",
    topics: ["Math", "Bit Manipulation"],
    order: 6,
    description: `Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.`,
    examples: [
      { args: [1, 2], output: 3 },
      { args: [2, 3], output: 5 },
    ],
    constraints: ["-1000 <= a, b <= 1000"],
    starter: {
      python: `def getSum(a: int, b: int) -> int:\n    pass\n`,
      javascript: `function getSum(a, b) {\n    \n}`,
      typescript: `function getSum(a: number, b: number): number {\n    \n}`,
      java: `class Solution {\n    public int getSum(int a, int b) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int getSum(int a, int b) {\n        \n    }\n};`,
      dart: `class Solution {
  int getSum(int a, int b) {
    
  }
}`,
    },
    methodName: "getSum",
    argTypes: ["int", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [1, 2], output: 3 },
      { args: [2, 3], output: 5 },
    ],
    hiddenTests: [
      { args: [0, 0], output: 0 },
      { args: [-1, 1], output: 0 },
      { args: [5, 7], output: 12 },
      { args: [-2, 3], output: 1 },
      { args: [100, 250], output: 350 },
      { args: [-10, -5], output: -15 },
    ],
    editorial: {
      approach: `Bitwise addition: \`a ^ b\` gives the sum bits without carries, and \`(a & b) << 1\` gives the carries. Repeat until there are no carries. In languages with arbitrary precision (Python), mask to 32 bits and convert the final unsigned value back to signed.\n\nO(1) time and space.`,
      complexity: { time: "O(1)", space: "O(1)" },
      code: {
        python: `def getSum(a: int, b: int) -> int:
    mask = 0xFFFFFFFF
    while b:
        carry = (a & b) << 1
        a = (a ^ b) & mask
        b = carry & mask
    return a if a <= 0x7FFFFFFF else a - 0x100000000`,
        javascript: `function getSum(a, b) {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,
        typescript: `function getSum(a: number, b: number): number {
  while (b !== 0) {
    const carry = (a & b) << 1;
    a = a ^ b;
    b = carry;
  }
  return a;
}`,

        java: `class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}`,
        cpp: `class Solution {
public:
    int getSum(int a, int b) {
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
};`,      },
    },
  },
  {
    slug: "reverse-integer",
    title: "Reverse Integer",
    difficulty: "Medium",
    category: "bit-manipulation",
    topics: ["Math"],
    order: 7,
    description: `Given a signed 32-bit integer \`x\`, return \`x\` **with its digits reversed**. If reversing \`x\` causes the value to go outside the signed 32-bit integer range \`[-2^31, 2^31 - 1]\`, then return \`0\`.
\n**Assume the environment does not allow you to store 64-bit integers (signed or unsigned).**`,
    examples: [
      { args: [123], output: 321 },
      { args: [-123], output: -321 },
      { args: [120], output: 21 },
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    starter: {
      python: `def reverse(x: int) -> int:\n    pass\n`,
      javascript: `function reverse(x) {\n    \n}`,
      typescript: `function reverse(x: number): number {\n    \n}`,
      java: `class Solution {\n    public int reverse(int x) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int reverse(int x) {\n        \n    }\n};`,
      dart: `class Solution {
  int reverse(int x) {
    
  }
}`,
    },
    methodName: "reverse",
    argTypes: ["int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [123], output: 321 },
      { args: [-123], output: -321 },
      { args: [120], output: 21 },
    ],
    hiddenTests: [
      { args: [0], output: 0 },
      { args: [1534236469], output: 0 },
      { args: [2147483647], output: 0 },
      { args: [123456789], output: 987654321 },
      { args: [-120], output: -21 },
      { args: [1463847412], output: 2147483641 },
      { args: [-2147483648], output: 0 },
    ],
    editorial: {
      approach: `Repeatedly pop the last digit with \`x % 10\` and push it onto the reversed number with \`rev = rev * 10 + digit\`, shrinking \`x\` by \`x / 10\`. Before pushing, check whether \`rev\` would overflow the signed 32-bit range; if so return 0.\n\nO(log x) time, O(1) space.`,
      complexity: { time: "O(log x)", space: "O(1)" },
      code: {
        python: `def reverse(x: int) -> int:
    sign = -1 if x < 0 else 1
    x = abs(x)
    rev = 0
    while x:
        rev = rev * 10 + x % 10
        x //= 10
    rev *= sign
    return rev if -(2**31) <= rev <= 2**31 - 1 else 0`,
        javascript: `function reverse(x) {
  let sign = x < 0 ? -1 : 1;
  let n = Math.abs(x);
  let rev = 0;
  while (n > 0) {
    rev = rev * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  rev *= sign;
  return rev < -(2 ** 31) || rev > 2 ** 31 - 1 ? 0 : rev;
}`,
        typescript: `function reverse(x: number): number {
  let sign = x < 0 ? -1 : 1;
  let n = Math.abs(x);
  let rev = 0;
  while (n > 0) {
    rev = rev * 10 + (n % 10);
    n = Math.floor(n / 10);
  }
  rev *= sign;
  return rev < -(2 ** 31) || rev > 2 ** 31 - 1 ? 0 : rev;
}`,

        java: `class Solution {
    public int reverse(int x) {
        long res = 0;
        while (x != 0) {
            res = res * 10 + x % 10;
            x /= 10;
        }
        if (res > Integer.MAX_VALUE || res < Integer.MIN_VALUE) return 0;
        return (int) res;
    }
}`,
        cpp: `class Solution {
public:
    int reverse(int x) {
        long long res = 0;
        while (x != 0) {
            res = res * 10 + x % 10;
            x /= 10;
        }
        if (res > INT_MAX || res < INT_MIN) return 0;
        return (int) res;
    }
};`,      },
    },
  },
];
