import type { Problem } from "@/lib/types";

export const mathGeometryExtra: Problem[] = [
  {
    slug: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    category: "math-geometry",
    topics: ["Array", "Math", "Matrix"],
    order: 1,
    description: `You are given an \`n x n\` 2D \`matrix\` representing an image, rotate the image by **90 degrees** (clockwise).
\nYou have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.`,
    examples: [
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
      { args: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]], output: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]] },
    ],
    constraints: ["n == matrix.length == matrix[i].length", "1 <= n <= 20", "-1000 <= matrix[i][j] <= 1000"],
    starter: {
      python: `from typing import List\n\n\ndef rotate(matrix: List[List[int]]) -> None:\n    pass\n`,
      javascript: `function rotate(matrix) {\n    \n}`,
      typescript: `function rotate(matrix: number[][]): void {\n    \n}`,
      java: `class Solution {\n    public void rotate(int[][] matrix) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void rotate(vector<vector<int>>& matrix) {\n        \n    }\n};`,
    },
    methodName: "rotate",
    argTypes: ["int[][]"],
    outputType: "void",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], output: [[7, 4, 1], [8, 5, 2], [9, 6, 3]] },
      { args: [[[5, 1, 9, 11], [2, 4, 8, 10], [13, 3, 6, 7], [15, 14, 12, 16]]], output: [[15, 13, 2, 5], [14, 3, 4, 1], [12, 6, 8, 9], [16, 7, 10, 11]] },
    ],
    hiddenTests: [
      { args: [[[1]]], output: [[1]] },
      { args: [[[1, 2], [3, 4]]], output: [[3, 1], [4, 2]] },
      { args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]], output: [[13, 9, 5, 1], [14, 10, 6, 2], [15, 11, 7, 3], [16, 12, 8, 4]] },
      { args: [[[1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11, 12, 13, 14, 15], [16, 17, 18, 19, 20], [21, 22, 23, 24, 25]]], output: [[21, 16, 11, 6, 1], [22, 17, 12, 7, 2], [23, 18, 13, 8, 3], [24, 19, 14, 9, 4], [25, 20, 15, 10, 5]] },
    ],
    editorial: {
      approach: `Rotate layer by layer: transpose the matrix (swap \`matrix[i][j]\` with \`matrix[j][i]\` for \`j > i\`), then reverse each row. The combination of transpose + row-reversal produces a 90-degree clockwise rotation.\n\nO(n^2) time, O(1) extra space.`,
      complexity: { time: "O(n^2)", space: "O(1)" },
      code: {
        python: `def rotate(matrix: List[List[int]]) -> None:
    n = len(matrix)
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
    for row in matrix:
        row.reverse()`,
        javascript: `function rotate(matrix) {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }
  for (const row of matrix) row.reverse();
}`,
        typescript: `function rotate(matrix: number[][]): void {
  const n = matrix.length;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      [matrix[i]![j], matrix[j]![i]] = [matrix[j]![i]!, matrix[i]![j]!];
    }
  }
  for (const row of matrix) row.reverse();
}`,

        java: `class Solution {
    public void rotate(int[][] matrix) {
        int n = matrix.length;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                int tmp = matrix[i][j];
                matrix[i][j] = matrix[j][i];
                matrix[j][i] = tmp;
            }
        }
        for (int i = 0; i < n; i++) {
            for (int l = 0, r = n - 1; l < r; l++, r--) {
                int tmp = matrix[i][l];
                matrix[i][l] = matrix[i][r];
                matrix[i][r] = tmp;
            }
        }
    }
}`,
        cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                swap(matrix[i][j], matrix[j][i]);
            }
        }
        for (int i = 0; i < n; i++) {
            reverse(matrix[i].begin(), matrix[i].end());
        }
    }
};`,      },
    },
  },
  {
    slug: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "math-geometry",
    topics: ["Array", "Matrix", "Simulation"],
    order: 2,
    description: `Given an \`m x n\` \`matrix\`, return all elements of the \`matrix\` in spiral order.`,
    examples: [
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], output: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      { args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 10", "-100 <= matrix[i][j] <= 100"],
    starter: {
      python: `from typing import List\n\n\ndef spiralOrder(matrix: List[List[int]]) -> List[int]:\n    pass\n`,
      javascript: `function spiralOrder(matrix) {\n    \n}`,
      typescript: `function spiralOrder(matrix: number[][]): number[] {\n    \n}`,
      java: `class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        \n    }\n};`,
    },
    methodName: "spiralOrder",
    argTypes: ["int[][]"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], output: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
      { args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]]], output: [1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7] },
    ],
    hiddenTests: [
      { args: [[[1]]], output: [1] },
      { args: [[[1, 2], [3, 4]]], output: [1, 2, 4, 3] },
      { args: [[[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]], output: [1, 2, 3, 4, 8, 12, 16, 15, 14, 13, 9, 5, 6, 7, 11, 10] },
      { args: [[[7], [9], [6]]], output: [7, 9, 6] },
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]]], output: [1, 2, 3, 6, 9, 8, 7, 4, 5] },
    ],
    editorial: {
      approach: `Keep four boundaries (top, bottom, left, right) and traverse in four passes: right along the top row, down the right column, left along the bottom row, up the left column — shrinking the boundaries after each pass and stopping once they cross.\n\nO(m * n) time, O(1) extra space.`,
      complexity: { time: "O(m * n)", space: "O(1)" },
      code: {
        python: `def spiralOrder(matrix: List[List[int]]) -> List[int]:
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for c in range(left, right + 1):
            result.append(matrix[top][c])
        top += 1
        for r in range(top, bottom + 1):
            result.append(matrix[r][right])
        right -= 1
        if top <= bottom:
            for c in range(right, left - 1, -1):
                result.append(matrix[bottom][c])
            bottom -= 1
        if left <= right:
            for r in range(bottom, top - 1, -1):
                result.append(matrix[r][left])
            left += 1
    return result`,
        javascript: `function spiralOrder(matrix) {
  const result = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0].length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top][c]);
    top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r][right]);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom][c]);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r][left]);
      left++;
    }
  }
  return result;
}`,
        typescript: `function spiralOrder(matrix: number[][]): number[] {
  const result: number[] = [];
  let top = 0, bottom = matrix.length - 1;
  let left = 0, right = matrix[0]!.length - 1;
  while (top <= bottom && left <= right) {
    for (let c = left; c <= right; c++) result.push(matrix[top]![c]!);
    top++;
    for (let r = top; r <= bottom; r++) result.push(matrix[r]![right]!);
    right--;
    if (top <= bottom) {
      for (let c = right; c >= left; c--) result.push(matrix[bottom]![c]!);
      bottom--;
    }
    if (left <= right) {
      for (let r = bottom; r >= top; r--) result.push(matrix[r]![left]!);
      left++;
    }
  }
  return result;
}`,

        java: `class Solution {
    public int[] spiralOrder(int[][] matrix) {
        if (matrix.length == 0) return new int[0];
        int m = matrix.length, n = matrix[0].length;
        int[] res = new int[m * n];
        int top = 0, bottom = m - 1, left = 0, right = n - 1;
        int idx = 0;
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) res[idx++] = matrix[top][j];
            top++;
            for (int i = top; i <= bottom; i++) res[idx++] = matrix[i][right];
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) res[idx++] = matrix[bottom][j];
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res[idx++] = matrix[i][left];
                left++;
            }
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        if (matrix.empty()) return {};
        int m = matrix.size(), n = matrix[0].size();
        vector<int> res;
        int top = 0, bottom = m - 1, left = 0, right = n - 1;
        while (top <= bottom && left <= right) {
            for (int j = left; j <= right; j++) res.push_back(matrix[top][j]);
            top++;
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int j = right; j >= left; j--) res.push_back(matrix[bottom][j]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "math-geometry",
    topics: ["Array", "Hash Table", "Matrix"],
    order: 3,
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.
\nYou must do it **in place**.`,
    examples: [
      { args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], output: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
      { args: [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]], output: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] },
    ],
    constraints: ["m == matrix.length", "n == matrix[0].length", "1 <= m, n <= 200", "-2^31 <= matrix[i][j] <= 2^31 - 1"],
    starter: {
      python: `from typing import List\n\n\ndef setZeroes(matrix: List[List[int]]) -> None:\n    pass\n`,
      javascript: `function setZeroes(matrix) {\n    \n}`,
      typescript: `function setZeroes(matrix: number[][]): void {\n    \n}`,
      java: `class Solution {\n    public void setZeroes(int[][] matrix) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void setZeroes(vector<vector<int>>& matrix) {\n        \n    }\n};`,
    },
    methodName: "setZeroes",
    argTypes: ["int[][]"],
    outputType: "void",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 1, 1], [1, 0, 1], [1, 1, 1]]], output: [[1, 0, 1], [0, 0, 0], [1, 0, 1]] },
      { args: [[[0, 1, 2, 0], [3, 4, 5, 2], [1, 3, 1, 5]]], output: [[0, 0, 0, 0], [0, 4, 5, 0], [0, 3, 1, 0]] },
    ],
    hiddenTests: [
      { args: [[[1]]], output: [[1]] },
      { args: [[[0]]], output: [[0]] },
      { args: [[[1, 2], [3, 4]]], output: [[1, 2], [3, 4]] },
      { args: [[[0, 1], [1, 1]]], output: [[0, 0], [0, 1]] },
      { args: [[[1, 0, 3], [4, 5, 6], [7, 8, 9]]], output: [[0, 0, 0], [4, 0, 6], [7, 0, 9]] },
    ],
    editorial: {
      approach: `Use the first row and first column as markers. First scan the matrix recording whether the first row / first column themselves contain a zero. Then for each \`matrix[i][j] == 0\`, mark \`matrix[i][0] = 0\` and \`matrix[0][j] = 0\`. Zero out cells using the markers, and finally handle the first row and column based on the saved flags.\n\nO(m * n) time, O(1) extra space.`,
      complexity: { time: "O(m * n)", space: "O(1)" },
      code: {
        python: `def setZeroes(matrix: List[List[int]]) -> None:
    m, n = len(matrix), len(matrix[0])
    first_row = any(matrix[0][c] == 0 for c in range(n))
    first_col = any(matrix[r][0] == 0 for r in range(m))
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][c] == 0:
                matrix[r][0] = 0
                matrix[0][c] = 0
    for r in range(1, m):
        for c in range(1, n):
            if matrix[r][0] == 0 or matrix[0][c] == 0:
                matrix[r][c] = 0
    if first_row:
        for c in range(n):
            matrix[0][c] = 0
    if first_col:
        for r in range(m):
            matrix[r][0] = 0`,
        javascript: `function setZeroes(matrix) {
  const m = matrix.length, n = matrix[0].length;
  let firstRow = matrix[0].includes(0);
  let firstCol = false;
  for (let r = 0; r < m; r++) if (matrix[r][0] === 0) firstCol = true;
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][c] === 0) {
        matrix[r][0] = 0;
        matrix[0][c] = 0;
      }
    }
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r][0] === 0 || matrix[0][c] === 0) matrix[r][c] = 0;
    }
  }
  if (firstRow) for (let c = 0; c < n; c++) matrix[0][c] = 0;
  if (firstCol) for (let r = 0; r < m; r++) matrix[r][0] = 0;
}`,
        typescript: `function setZeroes(matrix: number[][]): void {
  const m = matrix.length, n = matrix[0]!.length;
  let firstRow = matrix[0]!.includes(0);
  let firstCol = false;
  for (let r = 0; r < m; r++) if (matrix[r]![0] === 0) firstCol = true;
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r]![c] === 0) {
        matrix[r]![0] = 0;
        matrix[0]![c] = 0;
      }
    }
  }
  for (let r = 1; r < m; r++) {
    for (let c = 1; c < n; c++) {
      if (matrix[r]![0] === 0 || matrix[0]![c] === 0) matrix[r]![c] = 0;
    }
  }
  if (firstRow) for (let c = 0; c < n; c++) matrix[0]![c] = 0;
  if (firstCol) for (let r = 0; r < m; r++) matrix[r]![0] = 0;
}`,

        java: `class Solution {
    public void setZeroes(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        boolean firstRow = false, firstCol = false;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRow = true;
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstCol = true;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
            }
        }
        if (firstRow) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (firstCol) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
}`,
        cpp: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        bool firstRow = false, firstCol = false;
        for (int j = 0; j < n; j++) if (matrix[0][j] == 0) firstRow = true;
        for (int i = 0; i < m; i++) if (matrix[i][0] == 0) firstCol = true;
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) matrix[i][j] = 0;
            }
        }
        if (firstRow) for (int j = 0; j < n; j++) matrix[0][j] = 0;
        if (firstCol) for (int i = 0; i < m; i++) matrix[i][0] = 0;
    }
};`,      },
    },
  },
  {
    slug: "multiply-strings",
    title: "Multiply Strings",
    difficulty: "Medium",
    category: "math-geometry",
    topics: ["Math", "String", "Simulation"],
    order: 7,
    description: `Given two non-negative integers \`num1\` and \`num2\` represented as strings, return the product of \`num1\` and \`num2\`, also represented as a string.
\n**Note:** You must not use any built-in BigInteger library or convert the inputs to integer directly.`,
    examples: [
      { args: ["2", "3"], output: "6" },
      { args: ["123", "456"], output: "56088" },
    ],
    constraints: ["1 <= num1.length, num2.length <= 200", "num1 and num2 consist of digits only.", "Both num1 and num2 do not contain any leading zero, except the number 0 itself."],
    starter: {
      python: `def multiply(num1: str, num2: str) -> str:\n    pass\n`,
      javascript: `function multiply(num1, num2) {\n    \n}`,
      typescript: `function multiply(num1: string, num2: string): string {\n    \n}`,
      java: `class Solution {\n    public String multiply(String num1, String num2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string multiply(string num1, string num2) {\n        \n    }\n};`,
    },
    methodName: "multiply",
    argTypes: ["string", "string"],
    outputType: "string",
    compare: "exact",
    visibleTests: [
      { args: ["2", "3"], output: "6" },
      { args: ["123", "456"], output: "56088" },
    ],
    hiddenTests: [
      { args: ["0", "0"], output: "0" },
      { args: ["0", "123"], output: "0" },
      { args: ["9", "9"], output: "81" },
      { args: ["99", "99"], output: "9801" },
      { args: ["9133", "0"], output: "0" },
      { args: ["123456789", "987654321"], output: "121932631112635269" },
    ],
    editorial: {
      approach: `Grade-school multiplication: allocate a result array of size \`len1 + len2\`. For each digit pair, add the product into the appropriate position, then propagate carries. Skip leading zeros when building the final string.\n\nO(m * n) time, O(m + n) space.`,
      complexity: { time: "O(m * n)", space: "O(m + n)" },
      code: {
        python: `def multiply(num1: str, num2: str) -> str:
    if num1 == "0" or num2 == "0":
        return "0"
    res = [0] * (len(num1) + len(num2))
    for i in range(len(num1) - 1, -1, -1):
        for j in range(len(num2) - 1, -1, -1):
            mul = (ord(num1[i]) - 48) * (ord(num2[j]) - 48)
            p1, p2 = i + j, i + j + 1
            total = mul + res[p2]
            res[p2] = total % 10
            res[p1] += total // 10
    start = 0
    while start < len(res) - 1 and res[start] == 0:
        start += 1
    return "".join(str(d) for d in res[start:])`,
        javascript: `function multiply(num1, num2) {
  if (num1 === "0" || num2 === "0") return "0";
  const res = new Array(num1.length + num2.length).fill(0);
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const mul = (+num1[i]) * (+num2[j]);
      const p1 = i + j, p2 = i + j + 1;
      const total = mul + res[p2];
      res[p2] = total % 10;
      res[p1] += Math.floor(total / 10);
    }
  }
  let start = 0;
  while (start < res.length - 1 && res[start] === 0) start++;
  return res.slice(start).join("");
}`,
        typescript: `function multiply(num1: string, num2: string): string {
  if (num1 === "0" || num2 === "0") return "0";
  const res = new Array<number>(num1.length + num2.length).fill(0);
  for (let i = num1.length - 1; i >= 0; i--) {
    for (let j = num2.length - 1; j >= 0; j--) {
      const mul = (+num1[i]!) * (+num2[j]!);
      const p1 = i + j, p2 = i + j + 1;
      const total = mul + res[p2]!;
      res[p2] = total % 10;
      res[p1] = res[p1]! + Math.floor(total / 10);
    }
  }
  let start = 0;
  while (start < res.length - 1 && res[start] === 0) start++;
  return res.slice(start).join("");
}`,

        java: `class Solution {
    public String multiply(String num1, String num2) {
        int m = num1.length(), n = num2.length();
        int[] pos = new int[m + n];
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
                int p1 = i + j, p2 = i + j + 1;
                int sum = mul + pos[p2];
                pos[p1] += sum / 10;
                pos[p2] = sum % 10;
            }
        }
        StringBuilder sb = new StringBuilder();
        for (int p : pos) {
            if (!(sb.length() == 0 && p == 0)) sb.append(p);
        }
        return sb.length() == 0 ? "0" : sb.toString();
    }
}`,
        cpp: `class Solution {
public:
    string multiply(string num1, string num2) {
        int m = num1.size(), n = num2.size();
        vector<int> pos(m + n, 0);
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                int mul = (num1[i] - '0') * (num2[j] - '0');
                int p1 = i + j, p2 = i + j + 1;
                int sum = mul + pos[p2];
                pos[p1] += sum / 10;
                pos[p2] = sum % 10;
            }
        }
        string res;
        for (int p : pos) {
            if (!(res.empty() && p == 0)) res.push_back('0' + p);
        }
        return res.empty() ? "0" : res;
    }
};`,      },
    },
  },
  {
    slug: "detect-squares",
    title: "Detect Squares",
    difficulty: "Medium",
    category: "math-geometry",
    topics: ["Array", "Hash Table", "Design", "Counting"],
    order: 8,
    description: `You are given a stream of points on the X-Y plane. Design an algorithm that:
\n- **Adds** new points from the stream into a data structure. Duplicate points are allowed and should be treated as different points.\n- Given a query point, **counts** the number of ways to choose three points from the data structure such that the three points and the query point form an **axis-aligned square** with **positive area**.\n\nAn **axis-aligned square** has four vertices, where the edges are parallel to the x and y axes, and the vertices are \`(x1, y1)\`, \`(x1, y2)\`, \`(x2, y1)\`, \`(x2, y2)\` with \`x1 != x2\` and \`y1 != y2\`.\n\nImplement the \`DetectSquares\` class:\n- \`DetectSquares()\` Initializes the object with an empty data structure.\n- \`void add(int[] point)\` Adds a new point \`point = [x, y]\` to the data structure.\n- \`int count(int[] point)\` Counts the number of ways to form axis-aligned squares with \`point\` as a corner.`,
    examples: [
      {
        args: [[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]],
        output: [null, null, null, null, 1, 0, null, 2],
      },
    ],
    constraints: ["0 <= x, y <= 1000", "At most 3000 calls in total will be made to add and count."],
    starter: {
      python: `from typing import List\n\n\nclass DetectSquares:\n    def __init__(self):\n        pass\n\n    def add(self, point: List[int]) -> None:\n        pass\n\n    def count(self, point: List[int]) -> int:\n        pass\n`,
      javascript: `class DetectSquares {\n    constructor() {\n        \n    }\n    \n    add(point) {\n        \n    }\n    \n    count(point) {\n        \n    }\n}`,
      typescript: `class DetectSquares {\n    constructor() {\n        \n    }\n    \n    add(point: number[]): void {\n        \n    }\n    \n    count(point: number[]): number {\n        \n    }\n}`,
      java: `class DetectSquares {\n    public DetectSquares() {\n        \n    }\n    \n    public void add(int[] point) {\n        \n    }\n    \n    public int count(int[] point) {\n        \n    }\n}`,
      cpp: `class DetectSquares {\npublic:\n    DetectSquares() {\n        \n    }\n    \n    void add(vector<int> point) {\n        \n    }\n    \n    int count(vector<int> point) {\n        \n    }\n};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "int",
    compare: "exact",
    classSpec: {
      className: "DetectSquares",
      ops: [
        { name: "DetectSquares", argTypes: [], ret: "void" },
        { name: "add", argTypes: ["int[]"], ret: "void" },
        { name: "count", argTypes: ["int[]"], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["DetectSquares", "add", "add", "add", "count", "count", "add", "count"],
        args: [[], [[3, 10]], [[11, 2]], [[3, 2]], [[11, 10]], [[14, 8]], [[11, 2]], [[11, 10]]],
        output: [null, null, null, null, 1, 0, null, 2],
      },
    ],
    hiddenTests: [
      {
        ops: ["DetectSquares", "count"],
        args: [[], [[0, 0]]],
        output: [null, 0],
      },
      {
        ops: ["DetectSquares", "add", "add", "add", "count", "add", "count"],
        args: [[], [[0, 0]], [[1, 0]], [[1, 1]], [[0, 1]], [[1, 1]], [[0, 1]]],
        output: [null, null, null, null, 1, null, 2],
      },
      {
        ops: ["DetectSquares", "add", "add", "add", "count"],
        args: [[], [[1, 1]], [[2, 2]], [[1, 2]], [[2, 1]]],
        output: [null, null, null, null, 1],
      },
      {
        ops: ["DetectSquares", "add", "add", "add", "count"],
        args: [[], [[1, 2]], [[2, 1]], [[2, 2]], [[1, 1]]],
        output: [null, null, null, null, 1],
      },
    ],
    editorial: {
      approach: `Store counts of each point in a hash map keyed by \`(x, y)\`. To count squares for query \`(x, y)\`, iterate over every stored point \`(px, py)\` with \`px != x\` and \`py != y\` and \`|px - x| == |py - y|\` — it is the diagonally opposite corner. The other two corners are \`(x, py)\` and \`(px, y)\`; multiply their counts (plus the diagonal point's count) and sum.\n\nO(n) per count call over stored distinct points, O(n) space.`,
      complexity: { time: "O(n) per count", space: "O(n)" },
      code: {
        python: `class DetectSquares:
    def __init__(self):
        self.cnt = {}

    def add(self, point: List[int]) -> None:
        key = tuple(point)
        self.cnt[key] = self.cnt.get(key, 0) + 1

    def count(self, point: List[int]) -> int:
        x, y = point
        total = 0
        for (px, py), c in self.cnt.items():
            if px == x or py == y or abs(px - x) != abs(py - y):
                continue
            total += c * self.cnt.get((x, py), 0) * self.cnt.get((px, y), 0)
        return total`,
        javascript: `class DetectSquares {
  constructor() {
    this.cnt = new Map();
  }

  add(point) {
    const key = point[0] + "," + point[1];
    this.cnt.set(key, (this.cnt.get(key) || 0) + 1);
  }

  count(point) {
    const [x, y] = point;
    let total = 0;
    for (const [key, c] of this.cnt) {
      const [px, py] = key.split(",").map(Number);
      if (px === x || py === y || Math.abs(px - x) !== Math.abs(py - y)) continue;
      total += c * (this.cnt.get(x + "," + py) || 0) * (this.cnt.get(px + "," + y) || 0);
    }
    return total;
  }
}`,
        typescript: `class DetectSquares {
  private cnt = new Map<string, number>();

  constructor() {}

  add(point: number[]): void {
    const key = point[0] + "," + point[1];
    this.cnt.set(key, (this.cnt.get(key) || 0) + 1);
  }

  count(point: number[]): number {
    const [x, y] = point;
    let total = 0;
    for (const [key, c] of this.cnt) {
      const [px, py] = key.split(",").map(Number);
      if (px === x || py === y || Math.abs(px - x) !== Math.abs(py - y)) continue;
      total += c * (this.cnt.get(x + "," + py) || 0) * (this.cnt.get(px + "," + y) || 0);
    }
    return total;
  }
}`,

        java: `class DetectSquares {
    private Map<Integer, Integer> counts = new HashMap<>();

    public DetectSquares() {
    }

    public void add(int[] point) {
        int key = point[0] * 4000 + point[1];
        counts.merge(key, 1, Integer::sum);
    }

    public int count(int[] point) {
        int x = point[0], y = point[1];
        int total = 0;
        for (Map.Entry<Integer, Integer> e : counts.entrySet()) {
            int key = e.getKey();
            int px = key / 4000, py = key % 4000;
            if (px == x || Math.abs(px - x) != Math.abs(py - y)) continue;
            int c1 = counts.getOrDefault(px * 4000 + y, 0);
            int c2 = counts.getOrDefault(x * 4000 + py, 0);
            total += e.getValue() * c1 * c2;
        }
        return total;
    }
}`,
        cpp: `class DetectSquares {
public:
    unordered_map<int, int> counts;

    DetectSquares() {
    }

    void add(vector<int> point) {
        counts[point[0] * 4000 + point[1]]++;
    }

    int count(vector<int> point) {
        int x = point[0], y = point[1];
        int total = 0;
        for (auto& [key, c] : counts) {
            int px = key / 4000, py = key % 4000;
            if (px == x || abs(px - x) != abs(py - y)) continue;
            auto it1 = counts.find(px * 4000 + y);
            auto it2 = counts.find(x * 4000 + py);
            if (it1 == counts.end() || it2 == counts.end()) continue;
            total += c * it1->second * it2->second;
        }
        return total;
    }
};`,      },
    },
  },
];
