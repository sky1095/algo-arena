import type { Problem } from "@/lib/types";

export const twoPointersProblems: Problem[] = [
  {
    slug: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "two-pointers",
    topics: ["String", "Two Pointers"],
    order: 1,
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      { args: ["A man, a plan, a canal: Panama"], output: true, explain: "\"amanaplanacanalpanama\" reads the same forward and backward." },
      { args: ["race a car"], output: false },
      { args: [" "], output: true, explain: "After removing non-alphanumerics, s is empty, which is a palindrome." },
    ],
    constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
    starter: {
      python: `def isPalindrome(s: str) -> bool:
    pass
`,
      javascript: `function isPalindrome(s) {
    
}`,
      typescript: `function isPalindrome(s: string): boolean {
    
}`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        
    }
};`,
      dart: `class Solution {
  bool isPalindrome(String s) {
    
  }
}`,
    },
    methodName: "isPalindrome",
    argTypes: ["string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["A man, a plan, a canal: Panama"], output: true },
      { args: ["race a car"], output: false },
      { args: [" "], output: true },
    ],
    hiddenTests: [
      { args: ["ab_a"], output: true },
      { args: ["0P"], output: false },
      { args: ["a"], output: true },
      { args: ["Madam, I'm Adam"], output: true },
      { args: ["never odd or even"], output: true },
      { args: ["hello world"], output: false },
    ],
    editorial: {
      approach: `Clean the string by keeping only alphanumeric characters in lowercase, then use two pointers — one at the start and one at the end — moving them inward while comparing characters. If any pair mismatches, return false.

The cleaning pass costs O(n), and the pointer walk costs O(n), so the whole solution is linear.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def isPalindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        if s[left].lower() != s[right].lower():
            return False
        left += 1
        right -= 1
    return True`,
        javascript: `function isPalindrome(s) {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
        typescript: `function isPalindrome(s: string): boolean {
  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0, right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}`,
        java: `class Solution {
    public boolean isPalindrome(String s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;
            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;
            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;
            l++; r--;
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.size() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};`,
      },
    },
  },
  {
    slug: "two-sum-ii",
    title: "Two Sum II — Sorted Array",
    difficulty: "Medium",
    category: "two-pointers",
    topics: ["Array", "Two Pointers", "Binary Search"],
    order: 2,
    description: `Given a **1-indexed** array of integers \`numbers\` that is already **sorted in non-decreasing order**, find two numbers such that they add up to a specific \`target\`. Return the indices of the two numbers as an integer array \`[index1, index2]\` of length 2.

You may not use the same element twice, and there is exactly one solution.`,
    examples: [
      { args: [[2, 7, 11, 15], 9], output: [1, 2], explain: "The sum of numbers[1] = 2 and numbers[2] = 7 is 9." },
      { args: [[2, 3, 4], 6], output: [1, 3] },
      { args: [[-1, 0], -1], output: [1, 2] },
    ],
    constraints: ["2 <= numbers.length <= 3 * 10^4", "-1000 <= numbers[i] <= 1000", "numbers is sorted in non-decreasing order.", "Exactly one solution exists."],
    starter: {
      python: `from typing import List


def twoSum(numbers: List[int], target: int) -> List[int]:
    pass
`,
      javascript: `function twoSum(numbers, target) {
    
}`,
      typescript: `function twoSum(numbers: number[], target: number): number[] {
    
}`,
      java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        
    }
};`,
      dart: `class Solution {
  List<int> twoSum(List<int> numbers, int target) {
    
  }
}`,
    },
    methodName: "twoSum",
    argTypes: ["int[]", "int"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[2, 7, 11, 15], 9], output: [1, 2] },
      { args: [[2, 3, 4], 6], output: [1, 3] },
      { args: [[-1, 0], -1], output: [1, 2] },
    ],
    hiddenTests: [
      { args: [[1, 2, 3, 4, 4, 9, 56, 90], 8], output: [4, 5] },
      { args: [[5, 25, 75], 100], output: [2, 3] },
      { args: [[-10, -5, 0, 5, 10], 0], output: [1, 5] },
      { args: [[0, 0, 3, 4], 0], output: [1, 2] },
      { args: [[2, 7, 11, 15, 18], 26], output: [3, 4] },
    ],
    editorial: {
      approach: `Because the array is sorted, place one pointer at the start and one at the end. If their sum equals the target, return their 1-based indices. If the sum is too small, the only way to increase it is to move the left pointer right; if too large, move the right pointer left.

Each step shrinks the search window, so the loop runs at most n times — O(n) time and O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def twoSum(numbers: List[int], target: int) -> List[int]:
    left, right = 0, len(numbers) - 1
    while left < right:
        total = numbers[left] + numbers[right]
        if total == target:
            return [left + 1, right + 1]
        if total < target:
            left += 1
        else:
            right -= 1
    return []`,
        javascript: `function twoSum(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) left++;
    else right--;
  }
  return [];
}`,
        typescript: `function twoSum(numbers: number[], target: number): number[] {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const total = numbers[left] + numbers[right];
    if (total === target) return [left + 1, right + 1];
    if (total < target) left++;
    else right--;
  }
  return [];
}`,
        java: `class Solution {
    public int[] twoSum(int[] numbers, int target) {
        int l = 0, r = numbers.length - 1;
        while (l < r) {
            int sum = numbers[l] + numbers[r];
            if (sum == target) return new int[]{l + 1, r + 1};
            if (sum < target) l++;
            else r--;
        }
        return new int[0];
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& numbers, int target) {
        int l = 0, r = numbers.size() - 1;
        while (l < r) {
            int sum = numbers[l] + numbers[r];
            if (sum == target) return {l + 1, r + 1};
            if (sum < target) l++;
            else r--;
        }
        return {};
    }
};`,
      },
    },
  },
  {
    slug: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "two-pointers",
    topics: ["Array", "Two Pointers", "Sorting"],
    order: 3,
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { args: [[-1, 0, 1, 2, -1, -4]], output: [[-1, -1, 2], [-1, 0, 1]], explain: "The only distinct triplets that sum to zero." },
      { args: [[0, 1, 1]], output: [], explain: "No triplet sums to zero." },
      { args: [[0, 0, 0]], output: [[0, 0, 0]] },
    ],
    constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    starter: {
      python: `from typing import List


def threeSum(nums: List[int]) -> List[List[int]]:
    pass
`,
      javascript: `function threeSum(nums) {
    
}`,
      typescript: `function threeSum(nums: number[]): number[][] {
    
}`,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        
    }
};`,
      dart: `class Solution {
  List<List<int>> threeSum(List<int> nums) {
    
  }
}`,
    },
    methodName: "threeSum",
    argTypes: ["int[]"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [[-1, 0, 1, 2, -1, -4]], output: [[-1, -1, 2], [-1, 0, 1]] },
      { args: [[0, 1, 1]], output: [] },
      { args: [[0, 0, 0]], output: [[0, 0, 0]] },
    ],
    hiddenTests: [
      { args: [[-2, 0, 1, 1, 2]], output: [[-2, 0, 2], [-2, 1, 1]] },
      { args: [[-2, 0, 1, 1]], output: [[-2, 1, 1]] },
      { args: [[3, 0, -2, -1, 1, 2]], output: [[-2, -1, 3], [-2, 0, 2], [-1, 0, 1]] },
      { args: [[0, 0, 0, 0]], output: [[0, 0, 0]] },
      { args: [[-1, -1, 2, 2]], output: [[-1, -1, 2]] },
      { args: [[1, 1, -2]], output: [[-2, 1, 1]] },
    ],
    editorial: {
      approach: `Sort the array, then fix each element as the potential first value and solve a **two-sum with two pointers** on the remaining suffix, looking for pairs that sum to the negation of the fixed element.

Skip duplicate values at every level — when the fixed element repeats, or when either pointer lands on a value equal to the previous one — so no triplet is produced twice. The sort costs O(n log n) and the pointer scans cost O(n^2) in total.`,
      complexity: { time: "O(n^2)", space: "O(1)" },
      code: {
        python: `def threeSum(nums: List[int]) -> List[List[int]]:
    nums.sort()
    result = []
    n = len(nums)
    for i in range(n):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                result.append([nums[i], nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return result`,
        javascript: `function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = n - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        while (left < right && nums[left] === nums[left - 1]) left++;
      } else if (total < 0) left++;
      else right--;
    }
  }
  return result;
}`,
        typescript: `function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const result: number[][] = [];
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let left = i + 1, right = n - 1;
    while (left < right) {
      const total = nums[i] + nums[left] + nums[right];
      if (total === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        while (left < right && nums[left] === nums[left - 1]) left++;
      } else if (total < 0) left++;
      else right--;
    }
  }
  return result;
}`,
        java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> res = new ArrayList<>();
        for (int i = 0; i < nums.length - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.length - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        int n = nums.size();
        for (int i = 0; i < n - 2; i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = n - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) l++;
                else r--;
            }
        }
        return res;
    }
};`,
      },
    },
  },
  {
    slug: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "two-pointers",
    topics: ["Array", "Two Pointers", "Greedy"],
    order: 4,
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the endpoints of the i-th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container that holds the most water. Return the maximum amount of water a container can store.

The container's area is \`min(height[i], height[j]) * (j - i)\`.`,
    examples: [
      { args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], output: 49, explain: "Lines at indices 1 and 8 give min(8, 7) * 7 = 49." },
      { args: [[1, 1]], output: 1 },
    ],
    constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starter: {
      python: `from typing import List


def maxArea(height: List[int]) -> int:
    pass
`,
      javascript: `function maxArea(height) {
    
}`,
      typescript: `function maxArea(height: number[]): number {
    
}`,
      java: `class Solution {
    public int maxArea(int[] height) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`,
      dart: `class Solution {
  int maxArea(List<int> height) {
    
  }
}`,
    },
    methodName: "maxArea",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], output: 49 },
      { args: [[1, 1]], output: 1 },
    ],
    hiddenTests: [
      { args: [[4, 3, 2, 1, 4]], output: 16 },
      { args: [[1, 2, 1]], output: 2 },
      { args: [[2, 3, 4, 5, 18, 17, 6]], output: 17 },
      { args: [[1, 100, 1, 1, 1, 100, 1]], output: 400 },
      { args: [[0, 0, 0, 10, 0, 0, 0]], output: 0 },
    ],
    editorial: {
      approach: `Start with the widest container — pointers at both ends — and record its area. The width can only shrink from here, so the only way to beat the current best is to raise the shorter wall. Move the pointer on the shorter line inward and recompute.

Since each step moves one pointer and the pointers meet after at most n steps, the runtime is O(n) with O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def maxArea(height: List[int]) -> int:
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        best = max(best, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`,
        javascript: `function maxArea(height) {
  let left = 0, right = height.length - 1, best = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    best = Math.max(best, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}`,
        typescript: `function maxArea(height: number[]): number {
  let left = 0, right = height.length - 1, best = 0;
  while (left < right) {
    const area = Math.min(height[left], height[right]) * (right - left);
    best = Math.max(best, area);
    if (height[left] < height[right]) left++;
    else right--;
  }
  return best;
}`,
        java: `class Solution {
    public int maxArea(int[] height) {
        int l = 0, r = height.length - 1, best = 0;
        while (l < r) {
            best = Math.max(best, Math.min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        int l = 0, r = height.size() - 1, best = 0;
        while (l < r) {
            best = max(best, min(height[l], height[r]) * (r - l));
            if (height[l] < height[r]) l++;
            else r--;
        }
        return best;
    }
};`,
      },
    },
  },
];
