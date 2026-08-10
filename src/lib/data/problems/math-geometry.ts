import type { Problem } from "@/lib/types";

export const mathGeometryProblems: Problem[] = [
  {
    slug: "happy-number",
    title: "Happy Number",
    difficulty: "Easy",
    category: "math-geometry",
    topics: ["Math", "Hash Set", "Two Pointers"],
    order: 1,
    description: `Write an algorithm to determine if a number \`n\` is happy.

A **happy number** is a number defined by the following process:
- Starting with any positive integer, replace the number by the sum of the squares of its digits.
- Repeat the process until the number equals 1 (where it will stay), or it **loops endlessly in a cycle** which does not include 1.
- Those numbers for which this process ends in 1 are happy.

Return \`true\` if \`n\` is a happy number, and \`false\` if not.`,
    examples: [
      { args: [19], output: true, explain: "1^2 + 9^2 = 82, 8^2 + 2^2 = 68, 6^2 + 8^2 = 100, 1^2 + 0^2 + 0^2 = 1" },
      { args: [2], output: false },
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    starter: {
      python: `def isHappy(n: int) -> bool:\n    pass\n`,
      javascript: `function isHappy(n) {\n    \n}`,
      typescript: `function isHappy(n: number): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean isHappy(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isHappy(int n) {\n        \n    }\n};`,
    },
    methodName: "isHappy",
    argTypes: ["int"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [19], output: true },
      { args: [2], output: false },
    ],
    hiddenTests: [
      { args: [1], output: true },
      { args: [7], output: true },
      { args: [4], output: false },
      { args: [100], output: true },
      { args: [1111111], output: true },
      { args: [2147483647], output: false },
    ],
    editorial: {
      approach: `Repeatedly replace the number with the sum of squared digits. The process either reaches 1 or enters a cycle. Track visited numbers in a hash set — if we see a number twice, we are in a cycle and can return false.

Floyd's cycle detection (slow/fast pointers) also works with O(1) space.`,
      complexity: { time: "O(log n)", space: "O(log n)" },
      code: {
        python: `def isHappy(n: int) -> bool:
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1`,
        javascript: `function isHappy(n) {
  const seen = new Set();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = String(n).split("").reduce((acc, d) => acc + Number(d) ** 2, 0);
  }
  return n === 1;
}`,
        typescript: `function isHappy(n: number): boolean {
  const seen = new Set<number>();
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = String(n).split("").reduce((acc, d) => acc + Number(d) ** 2, 0);
  }
  return n === 1;
}`,

        java: `class Solution {
    public boolean isHappy(int n) {
        Set<Integer> seen = new HashSet<>();
        while (n != 1 && seen.add(n)) {
            int sum = 0;
            while (n > 0) {
                int d = n % 10;
                sum += d * d;
                n /= 10;
            }
            n = sum;
        }
        return n == 1;
    }
}`,
        cpp: `class Solution {
public:
    bool isHappy(int n) {
        unordered_set<int> seen;
        while (n != 1 && seen.insert(n).second) {
            int sum = 0;
            while (n > 0) {
                int d = n % 10;
                sum += d * d;
                n /= 10;
            }
            n = sum;
        }
        return n == 1;
    }
};`,      },
    },
  },
  {
    slug: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    category: "math-geometry",
    topics: ["Array", "Math"],
    order: 2,
    description: `You are given a **large integer** represented as an integer array \`digits\`, where each \`digits[i]\` is the i-th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading \`0\`'s.

Increment the large integer by one and return the resulting array of digits.`,
    examples: [
      { args: [[1, 2, 3]], output: [1, 2, 4], explain: "The array represents 123, and 123 + 1 = 124." },
      { args: [[4, 3, 2, 1]], output: [4, 3, 2, 2] },
      { args: [[9]], output: [1, 0] },
    ],
    constraints: ["1 <= digits.length <= 100", "0 <= digits[i] <= 9", "digits does not contain any leading 0's."],
    starter: {
      python: `from typing import List\n\n\ndef plusOne(digits: List[int]) -> List[int]:\n    pass\n`,
      javascript: `function plusOne(digits) {\n    \n}`,
      typescript: `function plusOne(digits: number[]): number[] {\n    \n}`,
      java: `class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};`,
    },
    methodName: "plusOne",
    argTypes: ["int[]"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3]], output: [1, 2, 4] },
      { args: [[4, 3, 2, 1]], output: [4, 3, 2, 2] },
      { args: [[9]], output: [1, 0] },
    ],
    hiddenTests: [
      { args: [[0]], output: [1] },
      { args: [[9, 9, 9]], output: [1, 0, 0, 0] },
      { args: [[1, 9, 9]], output: [2, 0, 0] },
      { args: [[2, 0, 0]], output: [2, 0, 1] },
      { args: [[9, 8, 9]], output: [9, 9, 0] },
    ],
    editorial: {
      approach: `Work from the least significant digit. Add 1; if the digit becomes 10, set it to 0 and carry into the next digit. If the carry survives past the most significant digit, prepend a 1.

O(n) time, O(n) space in the worst case (when the number of digits grows).`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def plusOne(digits: List[int]) -> List[int]:
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,
        javascript: `function plusOne(digits) {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i] < 9) {
      digits[i]++;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}`,
        typescript: `function plusOne(digits: number[]): number[] {
  for (let i = digits.length - 1; i >= 0; i--) {
    if (digits[i]! < 9) {
      digits[i] = digits[i]! + 1;
      return digits;
    }
    digits[i] = 0;
  }
  return [1, ...digits];
}`,

        java: `class Solution {
    public int[] plusOne(int[] digits) {
        for (int i = digits.length - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        int[] res = new int[digits.length + 1];
        res[0] = 1;
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        for (int i = (int)digits.size() - 1; i >= 0; i--) {
            if (digits[i] < 9) {
                digits[i]++;
                return digits;
            }
            digits[i] = 0;
        }
        vector<int> res(digits.size() + 1, 0);
        res[0] = 1;
        return res;
    }
};`,      },
    },
  },
  {
    slug: "pow-x-n",
    title: "Pow(x, n)",
    difficulty: "Medium",
    category: "math-geometry",
    topics: ["Math", "Recursion"],
    order: 3,
    description: `Implement \`pow(x, n)\`, which calculates \`x\` raised to the power \`n\` (i.e., \`x^n\`).`,
    examples: [
      { args: [2.0, 10], output: 1024.0 },
      { args: [2.1, 3], output: 9.261 },
      { args: [2.0, -2], output: 0.25 },
    ],
    constraints: ["-100.0 < x < 100.0", "-2^31 <= n <= 2^31 - 1", "n is an integer.", "Either x is not zero or n > 0.", "-10^4 <= x^n <= 10^4"],
    starter: {
      python: `def myPow(x: float, n: int) -> float:\n    pass\n`,
      javascript: `function myPow(x, n) {\n    \n}`,
      typescript: `function myPow(x: number, n: number): number {\n    \n}`,
      java: `class Solution {\n    public double myPow(double x, int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    double myPow(double x, int n) {\n        \n    }\n};`,
    },
    methodName: "myPow",
    argTypes: ["double", "int"],
    outputType: "double",
    compare: "exact",
    visibleTests: [
      { args: [2.0, 10], output: 1024.0 },
      { args: [2.1, 3], output: 9.261 },
      { args: [2.0, -2], output: 0.25 },
    ],
    hiddenTests: [
      { args: [1.0, 0], output: 1.0 },
      { args: [2.0, 1], output: 2.0 },
      { args: [3.0, 5], output: 243.0 },
      { args: [0.5, 4], output: 0.0625 },
      { args: [2.0, -2147483648], output: 0.0 },
      { args: [-2.0, 3], output: -8.0 },
    ],
    editorial: {
      approach: `Binary exponentiation: \`x^n = (x^2)^(n/2)\` when n is even, and \`x * x^(n-1)\` when odd. This halves the exponent every step, so only O(log n) multiplications are needed.

Handle negative exponents by computing the positive power and taking the reciprocal. Careful with \`n = -2^31\`: negating overflows, so use a long.`,
      complexity: { time: "O(log n)", space: "O(log n)" },
      code: {
        python: `def myPow(x: float, n: int) -> float:
    if n < 0:
        x = 1 / x
        n = -n
    result = 1.0
    while n:
        if n % 2 == 1:
            result *= x
        x *= x
        n //= 2
    return result`,
        javascript: `function myPow(x, n) {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}`,
        typescript: `function myPow(x: number, n: number): number {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) result *= x;
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}`,

        java: `class Solution {
    public double myPow(double x, int n) {
        long p = n;
        if (p < 0) {
            x = 1 / x;
            p = -p;
        }
        double res = 1;
        while (p > 0) {
            if ((p & 1) == 1) res *= x;
            x *= x;
            p >>= 1;
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    double myPow(double x, int n) {
        long long p = n;
        if (p < 0) {
            x = 1 / x;
            p = -p;
        }
        double res = 1;
        while (p > 0) {
            if (p & 1) res *= x;
            x *= x;
            p >>= 1;
        }
        return res;
    }
};`,      },
    },
  },
];
