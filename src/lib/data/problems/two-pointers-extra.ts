import type { Problem } from "@/lib/types";

export const twoPointersExtra: Problem[] = [
  {
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    difficulty: "Hard",
    category: "two-pointers",
    topics: ["Array", "Two Pointers", "Stack"],
    order: 5,
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    examples: [
      { args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], output: 6, explain: "The elevation map traps 6 units of water." },
      { args: [[4, 2, 0, 3, 2, 5]], output: 9 },
    ],
    constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 10^5"],
    starter: {
      python: `from typing import List


def trap(height: List[int]) -> int:
    pass
`,
      javascript: `function trap(height) {
    
}`,
      typescript: `function trap(height: number[]): number {
    
}`,
      java: `class Solution {
    public int trap(int[] height) {
        
    }
}`,
      cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        
    }
};`,
      dart: `class Solution {
  int trap(List<int> height) {
    
  }
}`,
    },
    methodName: "trap",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]], output: 6 },
      { args: [[4, 2, 0, 3, 2, 5]], output: 9 },
    ],
    hiddenTests: [
      { args: [[0]], output: 0 },
      { args: [[1, 1, 1, 1]], output: 0 },
      { args: [[3, 0, 0, 3]], output: 6 },
      { args: [[0, 2, 0, 2, 0]], output: 2 },
      { args: [[5, 4, 3, 2, 1]], output: 0 },
      { args: [[1, 0, 2, 0, 1]], output: 2 },
      { args: [[5, 2, 1, 2, 1, 5]], output: 14 },
    ],
    editorial: {
      approach: `Water trapped above a bar depends on the **shorter of the tallest bars to its left and right** minus its own height.\n\nTwo pointers meet in the middle. Keep running maximums \`leftMax\` and \`rightMax\`. At each step move the pointer with the smaller max: if the current bar is below its side's max, the difference is trapped water; otherwise update the max. Because we always advance the side with the smaller max, the min(leftMax, rightMax) is known exactly.\n\nO(n) time and O(1) extra space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def trap(height: List[int]) -> int:
    left, right = 0, len(height) - 1
    left_max = right_max = total = 0
    while left < right:
        if height[left] <= height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total += right_max - height[right]
            right -= 1
    return total`,
        javascript: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, total = 0;
  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else total += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else total += rightMax - height[right];
      right--;
    }
  }
  return total;
}`,
        typescript: `function trap(height: number[]): number {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0, total = 0;
  while (left < right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else total += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else total += rightMax - height[right];
      right--;
    }
  }
  return total;
}`,
        java: `class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int l = 0, r = n - 1, leftMax = 0, rightMax = 0, total = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                leftMax = Math.max(leftMax, height[l]);
                total += leftMax - height[l];
                l++;
            } else {
                rightMax = Math.max(rightMax, height[r]);
                total += rightMax - height[r];
                r--;
            }
        }
        return total;
    }
}`,
        cpp: `class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        int l = 0, r = n - 1, leftMax = 0, rightMax = 0, total = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                leftMax = max(leftMax, height[l]);
                total += leftMax - height[l];
                l++;
            } else {
                rightMax = max(rightMax, height[r]);
                total += rightMax - height[r];
                r--;
            }
        }
        return total;
    }
};`,
      },
    },
  },
];
