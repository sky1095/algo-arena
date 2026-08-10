import type { Problem } from "@/lib/types";

export const greedyProblems: Problem[] = [
  {
    slug: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "greedy",
    topics: ["Array", "Divide & Conquer", "DP", "Kadane"],
    order: 1,
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return **its sum**.`,
    examples: [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], output: 6, explain: "The subarray [4, -1, 2, 1] has the largest sum 6." },
      { args: [[1]], output: 1 },
      { args: [[5, 4, -1, 7, 8]], output: 23 },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starter: {
      python: `from typing import List\n\n\ndef maxSubArray(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function maxSubArray(nums) {\n    \n}`,
      typescript: `function maxSubArray(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "maxSubArray",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], output: 6 },
      { args: [[1]], output: 1 },
      { args: [[5, 4, -1, 7, 8]], output: 23 },
    ],
    hiddenTests: [
      { args: [[-1]], output: -1 },
      { args: [[-2, -1]], output: -1 },
      { args: [[1, 2, 3, 4]], output: 10 },
      { args: [[-1, 2, 3, -1]], output: 5 },
      { args: [[-2, -3, 4, -1, -2, 1, 5, -3]], output: 7 },
    ],
    editorial: {
      approach: `Kadane's algorithm: keep a running sum and reset it to 0 whenever it drops below 0 — a negative prefix can only hurt future subarrays. Track the best sum seen.

One pass: O(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def maxSubArray(nums: List[int]) -> int:
    best = nums[0]
    current = 0
    for num in nums:
        current = max(num, current + num)
        best = max(best, current)
    return best`,
        javascript: `function maxSubArray(nums) {
  let best = nums[0], current = 0;
  for (const num of nums) {
    current = Math.max(num, current + num);
    best = Math.max(best, current);
  }
  return best;
}`,
        typescript: `function maxSubArray(nums: number[]): number {
  let best = nums[0]!, current = 0;
  for (const num of nums) {
    current = Math.max(num, current + num);
    best = Math.max(best, current);
  }
  return best;
}`,

        java: `class Solution {
    public int maxSubArray(int[] nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < nums.length; i++) {
            cur = Math.max(nums[i], cur + nums[i]);
            best = Math.max(best, cur);
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int best = nums[0], cur = nums[0];
        for (int i = 1; i < (int)nums.size(); i++) {
            cur = max(nums[i], cur + nums[i]);
            best = max(best, cur);
        }
        return best;
    }
};`,      },
    },
  },
  {
    slug: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "greedy",
    topics: ["Array", "Greedy"],
    order: 2,
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.`,
    examples: [
      { args: [[2, 3, 1, 1, 4]], output: true, explain: "Jump 1 step to index 1, then 3 steps to the last index." },
      { args: [[3, 2, 1, 0, 4]], output: false, explain: "You will always arrive at index 3, where you cannot jump further." },
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    starter: {
      python: `from typing import List\n\n\ndef canJump(nums: List[int]) -> bool:\n    pass\n`,
      javascript: `function canJump(nums) {\n    \n}`,
      typescript: `function canJump(nums: number[]): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean canJump(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "canJump",
    argTypes: ["int[]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[2, 3, 1, 1, 4]], output: true },
      { args: [[3, 2, 1, 0, 4]], output: false },
    ],
    hiddenTests: [
      { args: [[0]], output: true },
      { args: [[0, 1]], output: false },
      { args: [[1, 1, 1, 1]], output: true },
      { args: [[2, 0, 0]], output: true },
      { args: [[1, 2, 0, 1]], output: true },
      { args: [[3, 0, 8, 2, 0, 1]], output: true },
    ],
    editorial: {
      approach: `Track the farthest index reachable so far. At each index, if it is beyond the current reach, we are stuck — return false. Otherwise extend the reach with \`i + nums[i]\`. Reach the end and we win.

Greedy, one pass: O(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def canJump(nums: List[int]) -> bool:
    reach = 0
    for i, num in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + num)
    return True`,
        javascript: `function canJump(nums) {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]);
  }
  return true;
}`,
        typescript: `function canJump(nums: number[]): boolean {
  let reach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > reach) return false;
    reach = Math.max(reach, i + nums[i]!);
  }
  return true;
}`,

        java: `class Solution {
    public boolean canJump(int[] nums) {
        int reach = 0;
        for (int i = 0; i < nums.length; i++) {
            if (i > reach) return false;
            reach = Math.max(reach, i + nums[i]);
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        int reach = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            if (i > reach) return false;
            reach = max(reach, i + nums[i]);
        }
        return true;
    }
};`,      },
    },
  },
  {
    slug: "gas-station",
    title: "Gas Station",
    difficulty: "Medium",
    category: "greedy",
    topics: ["Array", "Greedy"],
    order: 3,
    description: `There are \`n\` gas stations along a circular route, where the amount of gas at the i-th station is \`gas[i]\`.

You have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the i-th station to its next station. You begin the journey with an empty tank at one of the gas stations.

Given two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is **guaranteed to be unique**.`,
    examples: [
      { args: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]], output: 3, explain: "Start at station 3 (index 3) and fill up with 4 units of gas." },
      { args: [[2, 3, 4], [3, 4, 3]], output: -1 },
    ],
    constraints: ["n == gas.length == cost.length", "1 <= n <= 10^5", "0 <= gas[i], cost[i] <= 10^4"],
    starter: {
      python: `from typing import List\n\n\ndef canCompleteCircuit(gas: List[int], cost: List[int]) -> int:\n    pass\n`,
      javascript: `function canCompleteCircuit(gas, cost) {\n    \n}`,
      typescript: `function canCompleteCircuit(gas: number[], cost: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        \n    }\n};`,
    },
    methodName: "canCompleteCircuit",
    argTypes: ["int[]", "int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 4, 5], [3, 4, 5, 1, 2]], output: 3 },
      { args: [[2, 3, 4], [3, 4, 3]], output: -1 },
    ],
    hiddenTests: [
      { args: [[5], [4]], output: 0 },
      { args: [[1], [2]], output: -1 },
      { args: [[5, 1, 2, 3, 4], [4, 4, 1, 5, 1]], output: 4 },
      { args: [[1, 2, 3, 4, 5, 5, 70], [2, 3, 4, 3, 9, 6, 2]], output: 6 },
      { args: [[2, 2, 2], [2, 2, 2]], output: 0 },
    ],
    editorial: {
      approach: `If total gas is less than total cost, no circuit is possible. Otherwise a solution exists, and the greedy trick finds it in one pass: accumulate \`gas[i] - cost[i]\`; whenever the running total drops below zero, no station up to and including \`i\` can be the start, so reset the candidate to \`i + 1\`.

O(n) time and O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def canCompleteCircuit(gas: List[int], cost: List[int]) -> int:
    if sum(gas) < sum(cost):
        return -1
    start = 0
    tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:
            start = i + 1
            tank = 0
    return start`,
        javascript: `function canCompleteCircuit(gas, cost) {
  if (gas.reduce((a, b) => a + b, 0) < cost.reduce((a, b) => a + b, 0)) return -1;
  let start = 0, tank = 0;
  for (let i = 0; i < gas.length; i++) {
    tank += gas[i] - cost[i];
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return start;
}`,
        typescript: `function canCompleteCircuit(gas: number[], cost: number[]): number {
  if (gas.reduce((a, b) => a + b, 0) < cost.reduce((a, b) => a + b, 0)) return -1;
  let start = 0, tank = 0;
  for (let i = 0; i < gas.length; i++) {
    tank += gas[i]! - cost[i]!;
    if (tank < 0) {
      start = i + 1;
      tank = 0;
    }
  }
  return start;
}`,

        java: `class Solution {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int total = 0, cur = 0, start = 0;
        for (int i = 0; i < gas.length; i++) {
            total += gas[i] - cost[i];
            cur += gas[i] - cost[i];
            if (cur < 0) {
                cur = 0;
                start = i + 1;
            }
        }
        return total >= 0 ? start : -1;
    }
}`,
        cpp: `class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int total = 0, cur = 0, start = 0;
        for (int i = 0; i < (int)gas.size(); i++) {
            total += gas[i] - cost[i];
            cur += gas[i] - cost[i];
            if (cur < 0) {
                cur = 0;
                start = i + 1;
            }
        }
        return total >= 0 ? start : -1;
    }
};`,      },
    },
  },
];
