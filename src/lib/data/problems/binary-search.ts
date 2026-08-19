import type { Problem } from "@/lib/types";

export const binarySearchProblems: Problem[] = [
  {
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "binary-search",
    topics: ["Array", "Binary Search"],
    order: 1,
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { args: [[-1, 0, 3, 5, 9, 12], 9], output: 4 },
      { args: [[-1, 0, 3, 5, 9, 12], 2], output: -1 },
    ],
    constraints: ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4", "All the integers in nums are unique.", "nums is sorted in ascending order."],
    starter: {
      python: `from typing import List


def search(nums: List[int], target: int) -> int:
    pass
`,
      javascript: `function search(nums, target) {
    
}`,
      typescript: `function search(nums: number[], target: number): number {
    
}`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`,
      dart: `class Solution {
  int search(List<int> nums, int target) {
    
  }
}`,
    },
    methodName: "search",
    argTypes: ["int[]", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[-1, 0, 3, 5, 9, 12], 9], output: 4 },
      { args: [[-1, 0, 3, 5, 9, 12], 2], output: -1 },
    ],
    hiddenTests: [
      { args: [[5], 5], output: 0 },
      { args: [[5], 4], output: -1 },
      { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1], output: 0 },
      { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10], output: 9 },
      { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7], output: 6 },
      { args: [[-100, -50, 0, 50, 100], 50], output: 3 },
    ],
    editorial: {
      approach: `Maintain a search interval \`[left, right]\`. Look at the middle element; if it equals the target, return its index. If the middle is smaller than the target, the answer must lie in the right half; otherwise in the left half. Halving the interval each step gives O(log n) time and O(1) space.`,
      complexity: { time: "O(log n)", space: "O(1)" },
      code: {
        python: `def search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1`,
        javascript: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
        typescript: `function search(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid]! < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,

        java: `class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return -1;
    }
};`,      },
    },
  },
  {
    slug: "search-a-2d-matrix",
    title: "Search a 2D Matrix",
    difficulty: "Medium",
    category: "binary-search",
    topics: ["Array", "Binary Search", "Matrix"],
    order: 2,
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:
- Each row is sorted in non-decreasing order.
- The first integer of each row is greater than the last integer of the previous row.

Given an integer \`target\`, return \`true\` if \`target\` is in \`matrix\`, or \`false\` otherwise.

You must write a solution in **O(log(m * n))** time.`,
    examples: [
      {
        args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3],
        output: true,
      },
      {
        args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13],
        output: false,
      },
    ],
    constraints: ["m == matrix.length", "n == matrix[i].length", "1 <= m, n <= 100", "-10^4 <= matrix[i][j], target <= 10^4"],
    starter: {
      python: `from typing import List


def searchMatrix(matrix: List[List[int]], target: int) -> bool:
    pass
`,
      javascript: `function searchMatrix(matrix, target) {
    
}`,
      typescript: `function searchMatrix(matrix: number[][], target: number): boolean {
    
}`,
      java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        
    }
};`,
      dart: `class Solution {
  bool searchMatrix(List<List<int>> matrix, int target) {
    
  }
}`,
    },
    methodName: "searchMatrix",
    argTypes: ["int[][]", "int"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3], output: true },
      { args: [[[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13], output: false },
    ],
    hiddenTests: [
      { args: [[[1]], 1], output: true },
      { args: [[[1]], 0], output: false },
      { args: [[[1, 3]], 3], output: true },
      { args: [[[1, 3, 5]], 4], output: false },
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 9], output: true },
      { args: [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], 10], output: false },
    ],
    editorial: {
      approach: `The matrix's ordering makes it behave like one long sorted array: element at flat index \`i\` maps to row \`i // n\` and column \`i % n\`. Run a standard binary search over the range \`[0, m * n)\` and translate each midpoint into matrix coordinates.

That yields O(log(m * n)) time and O(1) space.`,
      complexity: { time: "O(log(m * n))", space: "O(1)" },
      code: {
        python: `def searchMatrix(matrix: List[List[int]], target: int) -> bool:
    m, n = len(matrix), len(matrix[0])
    left, right = 0, m * n - 1
    while left <= right:
        mid = (left + right) // 2
        value = matrix[mid // n][mid % n]
        if value == target:
            return True
        if value < target:
            left = mid + 1
        else:
            right = mid - 1
    return False`,
        javascript: `function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = matrix[Math.floor(mid / n)][mid % n];
    if (value === target) return true;
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}`,
        typescript: `function searchMatrix(matrix: number[][], target: number): boolean {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const value = matrix[Math.floor(mid / n)][mid % n]!;
    if (value === target) return true;
    if (value < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}`,

        java: `class Solution {
    public boolean searchMatrix(int[][] matrix, int target) {
        int m = matrix.length, n = matrix[0].length;
        int lo = 0, hi = m * n - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int v = matrix[mid / n][mid % n];
            if (v == target) return true;
            if (v < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
}`,
        cpp: `class Solution {
public:
    bool searchMatrix(vector<vector<int>>& matrix, int target) {
        int m = matrix.size(), n = matrix[0].size();
        int lo = 0, hi = m * n - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            int v = matrix[mid / n][mid % n];
            if (v == target) return true;
            if (v < target) lo = mid + 1;
            else hi = mid - 1;
        }
        return false;
    }
};`,      },
    },
  },
  {
    slug: "koko-eating-bananas",
    title: "Koko Eating Bananas",
    difficulty: "Medium",
    category: "binary-search",
    topics: ["Array", "Binary Search"],
    order: 3,
    description: `Koko loves to eat bananas. There are \`n\` piles of bananas, the i-th pile has \`piles[i]\` bananas. The guards have gone and will come back in \`h\` hours.

Koko can decide her bananas-per-hour eating speed of \`k\`. Each hour, she chooses some pile of bananas and eats \`k\` bananas from that pile. If the pile has less than \`k\` bananas, she eats all of them instead and will not eat any more bananas during this hour.

Return the minimum integer \`k\` such that she can eat all the bananas within \`h\` hours.`,
    examples: [
      { args: [[3, 6, 7, 11], 8], output: 4 },
      { args: [[30, 11, 23, 4, 20], 5], output: 30 },
      { args: [[30, 11, 23, 4, 20], 6], output: 23 },
    ],
    constraints: ["1 <= piles.length <= 10^4", "piles.length <= h <= 10^9", "1 <= piles[i] <= 10^9"],
    starter: {
      python: `from typing import List


def minEatingSpeed(piles: List[int], h: int) -> int:
    pass
`,
      javascript: `function minEatingSpeed(piles, h) {
    
}`,
      typescript: `function minEatingSpeed(piles: number[], h: number): number {
    
}`,
      java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        
    }
}`,
      cpp: `class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        
    }
};`,
      dart: `class Solution {
  int minEatingSpeed(List<int> piles, int h) {
    
  }
}`,
    },
    methodName: "minEatingSpeed",
    argTypes: ["int[]", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 6, 7, 11], 8], output: 4 },
      { args: [[30, 11, 23, 4, 20], 5], output: 30 },
      { args: [[30, 11, 23, 4, 20], 6], output: 23 },
    ],
    hiddenTests: [
      { args: [[3, 6, 7, 11], 4], output: 11 },
      { args: [[1], 1], output: 1 },
      { args: [[5], 2], output: 3 },
      { args: [[1000000000], 1000000000], output: 1 },
      { args: [[312884470, 312884470, 312884470], 312884469], output: 4 },
      { args: [[805306368, 805306368, 805306368], 1000000000], output: 3 },
    ],
    editorial: {
      approach: `At speed \`k\`, a pile of size \`p\` takes \`ceil(p / k)\` hours, so the feasibility check — \`sum(ceil(p / k)) <= h\` — is cheap. The answer is the smallest speed that works, and feasibility is monotonic: if speed \`k\` works, every larger speed works too.

Binary search the speed over \`[1, max(piles)]\`, checking feasibility at each midpoint. Each check is O(n), so the total is O(n log max(piles)).`,
      complexity: { time: "O(n log max(piles))", space: "O(1)" },
      code: {
        python: `def minEatingSpeed(piles: List[int], h: int) -> int:
    def feasible(k: int) -> bool:
        return sum((p + k - 1) // k for p in piles) <= h

    left, right = 1, max(piles)
    while left < right:
        mid = (left + right) // 2
        if feasible(mid):
            right = mid
        else:
            left = mid + 1
    return left`,
        javascript: `function minEatingSpeed(piles, h) {
  const feasible = (k) => piles.reduce((acc, p) => acc + Math.ceil(p / k), 0) <= h;
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (feasible(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}`,
        typescript: `function minEatingSpeed(piles: number[], h: number): number {
  const feasible = (k: number): boolean =>
    piles.reduce((acc, p) => acc + Math.ceil(p / k), 0) <= h;
  let left = 1, right = Math.max(...piles);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (feasible(mid)) right = mid;
    else left = mid + 1;
  }
  return left;
}`,

        java: `class Solution {
    public int minEatingSpeed(int[] piles, int h) {
        int lo = 1, hi = 0;
        for (int p : piles) hi = Math.max(hi, p);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            int hours = 0;
            for (int p : piles) hours += (p + mid - 1) / mid;
            if (hours <= h) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
}`,
        cpp: `class Solution {
public:
    int minEatingSpeed(vector<int>& piles, int h) {
        int lo = 1, hi = 0;
        for (int p : piles) hi = max(hi, p);
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            long long hours = 0;
            for (int p : piles) hours += (p + mid - 1) / mid;
            if (hours <= h) hi = mid;
            else lo = mid + 1;
        }
        return lo;
    }
};`,      },
    },
  },
  {
    slug: "search-in-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "binary-search",
    topics: ["Array", "Binary Search"],
    order: 4,
    description: `There is an integer array \`nums\` sorted in ascending order (with **distinct** values).

Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index \`k\` (1 <= k < nums.length) such that the resulting array is \`[nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]]\`.

Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with **O(log n)** runtime complexity.`,
    examples: [
      { args: [[4, 5, 6, 7, 0, 1, 2], 0], output: 4 },
      { args: [[4, 5, 6, 7, 0, 1, 2], 3], output: -1 },
      { args: [[1], 0], output: -1 },
    ],
    constraints: ["1 <= nums.length <= 5000", "-10^4 <= nums[i] <= 10^4", "All values of nums are unique.", "nums is an ascending array that is possibly rotated."],
    starter: {
      python: `from typing import List


def search(nums: List[int], target: int) -> int:
    pass
`,
      javascript: `function search(nums, target) {
    
}`,
      typescript: `function search(nums: number[], target: number): number {
    
}`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`,
      dart: `class Solution {
  int search(List<int> nums, int target) {
    
  }
}`,
    },
    methodName: "search",
    argTypes: ["int[]", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[4, 5, 6, 7, 0, 1, 2], 0], output: 4 },
      { args: [[4, 5, 6, 7, 0, 1, 2], 3], output: -1 },
      { args: [[1], 0], output: -1 },
    ],
    hiddenTests: [
      { args: [[1], 1], output: 0 },
      { args: [[3, 1], 1], output: 1 },
      { args: [[3, 1], 3], output: 0 },
      { args: [[5, 1, 3], 3], output: 2 },
      { args: [[5, 1, 3], 5], output: 0 },
      { args: [[4, 5, 6, 7, 0, 1, 2], 5], output: 1 },
      { args: [[8, 9, 2, 3, 4], 9], output: 1 },
    ],
    editorial: {
      approach: `A rotated sorted array still has one key property: in every mid-split, **at least one half is fully sorted**. Determine which half is sorted by comparing the middle with the left end. If the target lies within the sorted half's range, search there; otherwise search the other half.

The pivot never confuses the search because each iteration halves the interval, giving O(log n) time and O(1) space.`,
      complexity: { time: "O(log n)", space: "O(1)" },
      code: {
        python: `def search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
        javascript: `function search(nums, target) {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left] <= nums[mid]) {
      if (nums[left] <= target && target < nums[mid]) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid] < target && target <= nums[right]) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,
        typescript: `function search(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;
    if (nums[left]! <= nums[mid]!) {
      if (nums[left]! <= target && target < nums[mid]!) right = mid - 1;
      else left = mid + 1;
    } else {
      if (nums[mid]! < target && target <= nums[right]!) left = mid + 1;
      else right = mid - 1;
    }
  }
  return -1;
}`,

        java: `class Solution {
    public int search(int[] nums, int target) {
        int lo = 0, hi = nums.length - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[lo] <= nums[mid]) {
                if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] == target) return mid;
            if (nums[lo] <= nums[mid]) {
                if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
                else lo = mid + 1;
            } else {
                if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
                else hi = mid - 1;
            }
        }
        return -1;
    }
};`,      },
    },
  },
];
