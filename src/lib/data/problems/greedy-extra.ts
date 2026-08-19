import type { Problem } from "@/lib/types";

export const greedyExtra: Problem[] = [
  {
    slug: "jump-game-ii",
    title: "Jump Game II",
    difficulty: "Medium",
    category: "greedy",
    topics: ["Array", "Greedy", "Dynamic Programming"],
    order: 3,
    description: `You are given a **0-indexed** array of integers \`nums\` of length \`n\`. You are initially positioned at \`nums[0]\`.
\nEach element \`nums[i]\` represents the maximum length of a forward jump from index \`i\`. In other words, if you are at \`nums[i]\`, you can jump to any \`nums[i + j]\` where:\n- \`0 <= j <= nums[i]\` and\n- \`i + j < n\`\n\nReturn the minimum number of jumps to reach \`nums[n - 1]\`. The test cases are generated such that you can reach \`nums[n - 1]\`.`,
    examples: [
      { args: [[2, 3, 1, 1, 4]], output: 2 },
      { args: [[2, 3, 0, 1, 4]], output: 2 },
    ],
    constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 1000"],
    starter: {
      python: `from typing import List\n\n\ndef jump(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function jump(nums) {\n    \n}`,
      typescript: `function jump(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int jump(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int jump(vector<int>& nums) {\n        \n    }\n};`,
      dart: `class Solution {
  int jump(List<int> nums) {
    
  }
}`,
    },
    methodName: "jump",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[2, 3, 1, 1, 4]], output: 2 },
      { args: [[2, 3, 0, 1, 4]], output: 2 },
    ],
    hiddenTests: [
      { args: [[1, 2]], output: 1 },
      { args: [[2, 1]], output: 1 },
      { args: [[1, 1, 1, 1]], output: 3 },
      { args: [[4, 1, 1, 1, 1]], output: 1 },
      { args: [[1, 2, 1, 1, 1]], output: 3 },
      { args: [[1, 1, 1, 1, 1, 1]], output: 5 },
    ],
    editorial: {
      approach: `Greedy BFS over jump "levels": at each level, compute the farthest index reachable from anywhere in the current window, then jump the window to that far boundary and increment the jump count. When the window reaches the last index, return the count.\n\nO(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def jump(nums: List[int]) -> int:
    jumps = 0
    cur_end = 0
    farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == cur_end:
            jumps += 1
            cur_end = farthest
    return jumps`,
        javascript: `function jump(nums) {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}`,
        typescript: `function jump(nums: number[]): number {
  let jumps = 0, curEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]!);
    if (i === curEnd) {
      jumps++;
      curEnd = farthest;
    }
  }
  return jumps;
}`,

        java: `class Solution {
    public int jump(int[] nums) {
        int jumps = 0, curEnd = 0, curFarthest = 0;
        for (int i = 0; i < nums.length - 1; i++) {
            curFarthest = Math.max(curFarthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = curFarthest;
            }
        }
        return jumps;
    }
}`,
        cpp: `class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, curEnd = 0, curFarthest = 0;
        for (int i = 0; i < (int)nums.size() - 1; i++) {
            curFarthest = max(curFarthest, i + nums[i]);
            if (i == curEnd) {
                jumps++;
                curEnd = curFarthest;
            }
        }
        return jumps;
    }
};`,      },
    },
  },
  {
    slug: "hand-of-straights",
    title: "Hand of Straights",
    difficulty: "Medium",
    category: "greedy",
    topics: ["Array", "Hash Table", "Greedy", "Sorting"],
    order: 5,
    description: `Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size \`groupSize\`, and consists of \`groupSize\` **consecutive** cards.
\nGiven an integer array \`hand\` where \`hand[i]\` is the value written on the \`i\`th card and an integer \`groupSize\`, return \`true\` if she can rearrange the cards, or \`false\` otherwise.`,
    examples: [
      { args: [[1, 2, 3, 6, 2, 3, 4, 7, 8], 3], output: true },
      { args: [[1, 2, 3, 4, 5], 4], output: false },
    ],
    constraints: ["1 <= hand.length <= 10^4", "0 <= hand[i] <= 10^9", "1 <= groupSize <= hand.length"],
    starter: {
      python: `from typing import List\n\n\ndef isNStraightHand(hand: List[int], groupSize: int) -> bool:\n    pass\n`,
      javascript: `function isNStraightHand(hand, groupSize) {\n    \n}`,
      typescript: `function isNStraightHand(hand: number[], groupSize: number): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean isNStraightHand(int[] hand, int groupSize) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isNStraightHand(vector<int>& hand, int groupSize) {\n        \n    }\n};`,
      dart: `class Solution {
  bool isNStraightHand(List<int> hand, int groupSize) {
    
  }
}`,
    },
    methodName: "isNStraightHand",
    argTypes: ["int[]", "int"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 6, 2, 3, 4, 7, 8], 3], output: true },
      { args: [[1, 2, 3, 4, 5], 4], output: false },
    ],
    hiddenTests: [
      { args: [[1, 2, 3], 1], output: true },
      { args: [[2, 1], 2], output: true },
      { args: [[1, 1, 2, 2, 3, 3], 3], output: true },
      { args: [[1, 2, 3, 4, 5, 6], 4], output: false },
      { args: [[8, 8, 9, 7, 7, 6, 6, 5], 4], output: true },
      { args: [[1, 2, 4, 5], 2], output: true },
    ],
    editorial: {
      approach: `If the total count is not divisible by \`groupSize\`, return false. Count card values, then iterate the distinct values in ascending order; for the smallest remaining card \`x\`, form a group \`x, x+1, ..., x+groupSize-1\`, decrementing counts, and fail if any required card is missing.\n\nO(n log n) time for the sort, O(n) space.`,
      complexity: { time: "O(n log n)", space: "O(n)" },
      code: {
        python: `def isNStraightHand(hand: List[int], groupSize: int) -> bool:
    if len(hand) % groupSize:
        return False
    from collections import Counter
    cnt = Counter(hand)
    for x in sorted(cnt):
        if cnt[x] == 0:
            continue
        need = cnt[x]
        for i in range(groupSize):
            if cnt.get(x + i, 0) < need:
                return False
            cnt[x + i] -= need
    return True`,
        javascript: `function isNStraightHand(hand, groupSize) {
  if (hand.length % groupSize) return false;
  const cnt = new Map();
  for (const x of hand) cnt.set(x, (cnt.get(x) || 0) + 1);
  for (const x of [...cnt.keys()].sort((a, b) => a - b)) {
    const need = cnt.get(x);
    if (need === 0) continue;
    for (let i = 0; i < groupSize; i++) {
      const have = cnt.get(x + i) || 0;
      if (have < need) return false;
      cnt.set(x + i, have - need);
    }
  }
  return true;
}`,
        typescript: `function isNStraightHand(hand: number[], groupSize: number): boolean {
  if (hand.length % groupSize) return false;
  const cnt = new Map<number, number>();
  for (const x of hand) cnt.set(x, (cnt.get(x) || 0) + 1);
  for (const x of [...cnt.keys()].sort((a, b) => a - b)) {
    const need = cnt.get(x)!;
    if (need === 0) continue;
    for (let i = 0; i < groupSize; i++) {
      const have = cnt.get(x + i) || 0;
      if (have < need) return false;
      cnt.set(x + i, have - need);
    }
  }
  return true;
}`,

        java: `class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0) return false;
        TreeMap<Integer, Integer> counts = new TreeMap<>();
        for (int h : hand) counts.merge(h, 1, Integer::sum);
        while (!counts.isEmpty()) {
            int first = counts.firstKey();
            for (int i = 0; i < groupSize; i++) {
                int card = first + i;
                Integer c = counts.get(card);
                if (c == null) return false;
                if (c == 1) counts.remove(card);
                else counts.put(card, c - 1);
            }
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if ((int)hand.size() % groupSize != 0) return false;
        map<int, int> counts;
        for (int h : hand) counts[h]++;
        while (!counts.empty()) {
            int first = counts.begin()->first;
            for (int i = 0; i < groupSize; i++) {
                int card = first + i;
                auto it = counts.find(card);
                if (it == counts.end()) return false;
                if (--it->second == 0) counts.erase(it);
            }
        }
        return true;
    }
};`,      },
    },
  },
  {
    slug: "merge-triplets-to-form-target-triplet",
    title: "Merge Triplets to Form Target Triplet",
    difficulty: "Medium",
    category: "greedy",
    topics: ["Array", "Greedy"],
    order: 6,
    description: `A **triplet** is an array of three integers. You are given a 2D integer array \`triplets\`, where \`triplets[i] = [a_i, b_i, c_i]\` describes the \`i\`th **triplet**. You are also given an integer array \`target = [x, y, z]\` that describes the **triplet** you want to obtain.
\nTo obtain \`target\`, you may apply the following operation on \`triplets\` any number of times (possibly **zero**):\n- Choose two indices (0-indexed) \`i\` and \`j\` (\`i != j\`) and **update** \`triplets[j]\` to become \`[max(a_i, a_j), max(b_i, b_j), max(c_i, c_j)]\`.\n  - For example, if \`triplets[i] = [2, 5, 3]\` and \`triplets[j] = [1, 7, 5]\`, \`triplets[j]\` will be updated to \`[max(2, 1), max(5, 7), max(3, 5)] = [2, 7, 5]\`.\n\nReturn \`true\` if it is possible to obtain the \`target\` triplet \`[x, y, z]\` as an **element** of \`triplets\`, or \`false\` otherwise.`,
    examples: [
      { args: [[[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]], output: true },
      { args: [[[3, 4, 5], [4, 5, 6]], [3, 2, 5]], output: false },
      { args: [[[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]], output: true },
    ],
    constraints: ["1 <= triplets.length <= 10^5", "triplets[i].length == target.length == 3", "1 <= a_i, b_i, c_i, x, y, z <= 1000"],
    starter: {
      python: `from typing import List\n\n\ndef mergeTriplets(triplets: List[List[int]], target: List[int]) -> bool:\n    pass\n`,
      javascript: `function mergeTriplets(triplets, target) {\n    \n}`,
      typescript: `function mergeTriplets(triplets: number[][], target: number[]): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean mergeTriplets(int[][] triplets, int[] target) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {\n        \n    }\n};`,
      dart: `class Solution {
  bool mergeTriplets(List<List<int>> triplets, List<int> target) {
    
  }
}`,
    },
    methodName: "mergeTriplets",
    argTypes: ["int[][]", "int[]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]], output: true },
      { args: [[[3, 4, 5], [4, 5, 6]], [3, 2, 5]], output: false },
      { args: [[[2, 5, 3], [2, 3, 4], [1, 2, 5], [5, 2, 3]], [5, 5, 5]], output: true },
    ],
    hiddenTests: [
      { args: [[[1, 2, 3]], [1, 2, 3]], output: true },
      { args: [[[1, 2, 3]], [1, 2, 4]], output: false },
      { args: [[[1, 3, 5]], [2, 3, 5]], output: false },
      { args: [[[1, 2, 3], [4, 5, 6]], [4, 5, 3]], output: false },
      { args: [[[2, 5, 3], [1, 8, 4], [1, 7, 5]], [2, 7, 5]], output: true },
      { args: [[[1, 2, 3], [3, 2, 1], [2, 3, 2]], [3, 3, 3]], output: true },
    ],
    editorial: {
      approach: `Merging only ever takes element-wise maxima, so a useful triplet is one where no component exceeds the target. Collect the maxima of all such "good" triplets; the target is achievable iff the resulting component-wise max equals the target in every position.\n\nO(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def mergeTriplets(triplets: List[List[int]], target: List[int]) -> bool:
    x, y, z = target
    good = [False, False, False]
    for a, b, c in triplets:
        if a <= x and b <= y and c <= z:
            good[0] = good[0] or a == x
            good[1] = good[1] or b == y
            good[2] = good[2] or c == z
    return all(good)`,
        javascript: `function mergeTriplets(triplets, target) {
  const [x, y, z] = target;
  const good = [false, false, false];
  for (const [a, b, c] of triplets) {
    if (a <= x && b <= y && c <= z) {
      good[0] = good[0] || a === x;
      good[1] = good[1] || b === y;
      good[2] = good[2] || c === z;
    }
  }
  return good[0] && good[1] && good[2];
}`,
        typescript: `function mergeTriplets(triplets: number[][], target: number[]): boolean {
  const [x, y, z] = target;
  const good = [false, false, false];
  for (const [a, b, c] of triplets) {
    if (a! <= x! && b! <= y! && c! <= z!) {
      good[0] = good[0] || a === x;
      good[1] = good[1] || b === y;
      good[2] = good[2] || c === z;
    }
  }
  return good[0] && good[1] && good[2];
}`,

        java: `class Solution {
    public boolean mergeTriplets(int[][] triplets, int[] target) {
        boolean[] good = new boolean[3];
        for (int[] t : triplets) {
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
                for (int i = 0; i < 3; i++) {
                    if (t[i] == target[i]) good[i] = true;
                }
            }
        }
        return good[0] && good[1] && good[2];
    }
}`,
        cpp: `class Solution {
public:
    bool mergeTriplets(vector<vector<int>>& triplets, vector<int>& target) {
        vector<bool> good(3, false);
        for (auto& t : triplets) {
            if (t[0] <= target[0] && t[1] <= target[1] && t[2] <= target[2]) {
                for (int i = 0; i < 3; i++) {
                    if (t[i] == target[i]) good[i] = true;
                }
            }
        }
        return good[0] && good[1] && good[2];
    }
};`,      },
    },
  },
  {
    slug: "partition-labels",
    title: "Partition Labels",
    difficulty: "Medium",
    category: "greedy",
    topics: ["Hash Table", "Two Pointers", "String", "Greedy"],
    order: 7,
    description: `You are given a string \`s\`. We want to partition the string into as many parts as possible so that each letter appears in at most one part.
\nNote that the partition is done so that after concatenating all the parts in order, the resultant string should be \`s\`.\n\nReturn a list of integers representing the size of these parts.`,
    examples: [
      { args: ["ababcbacadefegdehijhklij"], output: [9, 7, 8] },
      { args: ["eccbbbbdec"], output: [10] },
    ],
    constraints: ["1 <= s.length <= 500", "s consists of lowercase English letters."],
    starter: {
      python: `from typing import List\n\n\ndef partitionLabels(s: str) -> List[int]:\n    pass\n`,
      javascript: `function partitionLabels(s) {\n    \n}`,
      typescript: `function partitionLabels(s: string): number[] {\n    \n}`,
      java: `class Solution {\n    public List<Integer> partitionLabels(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> partitionLabels(string s) {\n        \n    }\n};`,
      dart: `class Solution {
  List<int> partitionLabels(String s) {
    
  }
}`,
    },
    methodName: "partitionLabels",
    argTypes: ["string"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: ["ababcbacadefegdehijhklij"], output: [9, 7, 8] },
      { args: ["eccbbbbdec"], output: [10] },
    ],
    hiddenTests: [
      { args: ["a"], output: [1] },
      { args: ["ab"], output: [1, 1] },
      { args: ["abc"], output: [1, 1, 1] },
      { args: ["caedbdedda"], output: [1, 9] },
      { args: ["aaaa"], output: [4] },
      { args: ["ababcbacadefegdehijhklij"], output: [9, 7, 8] },
    ],
    editorial: {
      approach: `Record the last occurrence index of every character. Then scan left to right, extending the current segment's end to the max last-occurrence seen so far. Whenever the scan index reaches that end, close the segment and record its size.\n\nO(n) time, O(1) space (26 letters).`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def partitionLabels(s: str) -> List[int]:
    last = {ch: i for i, ch in enumerate(s)}
    result = []
    start = end = 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])
        if i == end:
            result.append(end - start + 1)
            start = i + 1
    return result`,
        javascript: `function partitionLabels(s) {
  const last = {};
  for (let i = 0; i < s.length; i++) last[s[i]] = i;
  const result = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]]);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }
  return result;
}`,
        typescript: `function partitionLabels(s: string): number[] {
  const last: Record<string, number> = {};
  for (let i = 0; i < s.length; i++) last[s[i]!] = i;
  const result: number[] = [];
  let start = 0, end = 0;
  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, last[s[i]!]!);
    if (i === end) {
      result.push(end - start + 1);
      start = i + 1;
    }
  }
  return result;
}`,

        java: `class Solution {
    public int[] partitionLabels(String s) {
        int[] last = new int[26];
        for (int i = 0; i < s.length(); i++) {
            last[s.charAt(i) - 'a'] = i;
        }
        List<Integer> res = new ArrayList<>();
        int start = 0, end = 0;
        for (int i = 0; i < s.length(); i++) {
            end = Math.max(end, last[s.charAt(i) - 'a']);
            if (i == end) {
                res.add(end - start + 1);
                start = i + 1;
            }
        }
        int[] out = new int[res.size()];
        for (int i = 0; i < res.size(); i++) out[i] = res.get(i);
        return out;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> partitionLabels(string s) {
        vector<int> last(26, 0);
        for (int i = 0; i < (int)s.size(); i++) last[s[i] - 'a'] = i;
        vector<int> res;
        int start = 0, end = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            end = max(end, last[s[i] - 'a']);
            if (i == end) {
                res.push_back(end - start + 1);
                start = i + 1;
            }
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "valid-parenthesis-string",
    title: "Valid Parenthesis String",
    difficulty: "Medium",
    category: "greedy",
    topics: ["String", "Dynamic Programming", "Greedy"],
    order: 8,
    description: `Given a string \`s\` containing only three types of characters: \`'('\`, \`')'\` and \`'*'\`, return \`true\` if \`s\` is **valid**.
\nThe following rules define a **valid** string:\n- Any left parenthesis \`'('\` must have a corresponding right parenthesis \`')'\`.\n- Any right parenthesis \`')'\` must have a corresponding left parenthesis \`'('\`.\n- Left parenthesis \`'('\` must go before the corresponding right parenthesis \`')'\`.\n- \`'*'\` could be treated as a single right parenthesis \`')'\` or a single left parenthesis \`'('\` or an empty string \`""\`.`,
    examples: [
      { args: ["()"], output: true },
      { args: ["(*)"], output: true },
      { args: ["(*))"], output: true },
    ],
    constraints: ["1 <= s.length <= 100", "s consists of parentheses, lowercase English letters, and '*' characters."],
    starter: {
      python: `def checkValidString(s: str) -> bool:\n    pass\n`,
      javascript: `function checkValidString(s) {\n    \n}`,
      typescript: `function checkValidString(s: string): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean checkValidString(String s) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool checkValidString(string s) {\n        \n    }\n};`,
      dart: `class Solution {
  bool checkValidString(String s) {
    
  }
}`,
    },
    methodName: "checkValidString",
    argTypes: ["string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["()"], output: true },
      { args: ["(*)"], output: true },
      { args: ["(*))"], output: true },
    ],
    hiddenTests: [
      { args: ["("], output: false },
      { args: [")"], output: false },
      { args: ["*"], output: true },
      { args: ["((*)"], output: true },
      { args: ["((*))"], output: true },
      { args: ["*()"], output: true },
      { args: ["*)("], output: false },
    ],
    editorial: {
      approach: `Greedy with two bounds: maintain \`lo\` and \`hi\`, the minimum and maximum possible balance treating \`'*'\` as \`')'\` and \`'('\` respectively. For \`'('\` increment both; for \`')'\` decrement both; for \`'*'\` decrement \`lo\` and increment \`hi\`. Clamp \`lo\` at 0; if \`hi\` ever goes negative the string is invalid. Valid iff \`lo == 0\` at the end.\n\nO(n) time, O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def checkValidString(s: str) -> bool:
    lo = hi = 0
    for ch in s:
        if ch == "(":
            lo += 1
            hi += 1
        elif ch == ")":
            lo = max(lo - 1, 0)
            hi -= 1
        else:
            lo = max(lo - 1, 0)
            hi += 1
        if hi < 0:
            return False
    return lo == 0`,
        javascript: `function checkValidString(s) {
  let lo = 0, hi = 0;
  for (const ch of s) {
    if (ch === "(") { lo++; hi++; }
    else if (ch === ")") { lo = Math.max(lo - 1, 0); hi--; }
    else { lo = Math.max(lo - 1, 0); hi++; }
    if (hi < 0) return false;
  }
  return lo === 0;
}`,
        typescript: `function checkValidString(s: string): boolean {
  let lo = 0, hi = 0;
  for (const ch of s) {
    if (ch === "(") { lo++; hi++; }
    else if (ch === ")") { lo = Math.max(lo - 1, 0); hi--; }
    else { lo = Math.max(lo - 1, 0); hi++; }
    if (hi < 0) return false;
  }
  return lo === 0;
}`,

        java: `class Solution {
    public boolean checkValidString(String s) {
        int lo = 0, hi = 0;
        for (char c : s.toCharArray()) {
            if (c == '(') { lo++; hi++; }
            else if (c == ')') { lo--; hi--; }
            else { lo--; hi++; }
            if (hi < 0) return false;
            lo = Math.max(lo, 0);
        }
        return lo == 0;
    }
}`,
        cpp: `class Solution {
public:
    bool checkValidString(string s) {
        int lo = 0, hi = 0;
        for (char c : s) {
            if (c == '(') { lo++; hi++; }
            else if (c == ')') { lo--; hi--; }
            else { lo--; hi++; }
            if (hi < 0) return false;
            lo = max(lo, 0);
        }
        return lo == 0;
    }
};`,      },
    },
  },
];
