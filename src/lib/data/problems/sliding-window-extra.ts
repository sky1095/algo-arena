import type { Problem } from "@/lib/types";

export const slidingWindowExtra: Problem[] = [
  {
    slug: "permutation-in-string",
    title: "Permutation in String",
    difficulty: "Medium",
    category: "sliding-window",
    topics: ["Hash Table", "Two Pointers", "String"],
    order: 5,
    description: `Given two strings \`s1\` and \`s2\`, return \`true\` if \`s2\` contains a permutation of \`s1\`, or \`false\` otherwise.\n\nIn other words, return \`true\` if one of \`s1\`'s permutations is a substring of \`s2\`.`,
    examples: [
      { args: ["ab", "eidbaooo"], output: true, explain: "s2 contains one permutation of s1 (\"ba\")." },
      { args: ["ab", "eidboaoo"], output: false },
    ],
    constraints: ["1 <= s1.length, s2.length <= 10^4", "s1 and s2 consist of lowercase English letters."],
    starter: {
      python: `def checkInclusion(s1: str, s2: str) -> bool:
    pass
`,
      javascript: `function checkInclusion(s1, s2) {
    
}`,
      typescript: `function checkInclusion(s1: string, s2: string): boolean {
    
}`,
      java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        
    }
};`,
    },
    methodName: "checkInclusion",
    argTypes: ["string", "string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["ab", "eidbaooo"], output: true },
      { args: ["ab", "eidboaoo"], output: false },
    ],
    hiddenTests: [
      { args: ["a", "a"], output: true },
      { args: ["a", "b"], output: false },
      { args: ["ab", "a"], output: false },
      { args: ["abc", "ccccbbbbaaaa"], output: false },
      { args: ["adc", "dcda"], output: true },
      { args: ["hello", "ooolleoooleh"], output: false },
      { args: ["abc", "bbbca"], output: true },
    ],
    editorial: {
      approach: `A permutation of \`s1\` has the same character counts as \`s1\` and the same length. So slide a window of length \`len(s1)\` across \`s2\` and compare its character-count array to \`s1\`'s.\n\nTrack a \`matches\` counter of how many of the 26 letters currently agree. Each time the window moves, adjust counts for the letter leaving and entering, updating \`matches\` accordingly. When \`matches == 26\`, a permutation was found.\n\nO(len(s1) + 26 * len(s2)) time — practically O(n) — and O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False
    count1 = [0] * 26
    count2 = [0] * 26
    for ch in s1:
        count1[ord(ch) - 97] += 1
    for i in range(len(s2)):
        count2[ord(s2[i]) - 97] += 1
        if i >= len(s1):
            count2[ord(s2[i - len(s1)]) - 97] -= 1
        if count1 == count2:
            return True
    return False`,
        javascript: `function checkInclusion(s1, s2) {
  if (s1.length > s2.length) return false;
  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);
  for (const ch of s1) count1[ch.charCodeAt(0) - 97]++;
  for (let i = 0; i < s2.length; i++) {
    count2[s2.charCodeAt(i) - 97]++;
    if (i >= s1.length) count2[s2.charCodeAt(i - s1.length) - 97]--;
    if (count1.every((v, j) => v === count2[j])) return true;
  }
  return false;
}`,
        typescript: `function checkInclusion(s1: string, s2: string): boolean {
  if (s1.length > s2.length) return false;
  const count1 = new Array(26).fill(0);
  const count2 = new Array(26).fill(0);
  for (const ch of s1) count1[ch.charCodeAt(0) - 97]++;
  for (let i = 0; i < s2.length; i++) {
    count2[s2.charCodeAt(i) - 97]++;
    if (i >= s1.length) count2[s2.charCodeAt(i - s1.length) - 97]--;
    if (count1.every((v, j) => v === count2[j])) return true;
  }
  return false;
}`,
        java: `class Solution {
    public boolean checkInclusion(String s1, String s2) {
        if (s1.length() > s2.length()) return false;
        int[] a = new int[26], b = new int[26];
        for (int i = 0; i < s1.length(); i++) {
            a[s1.charAt(i) - 'a']++;
            b[s2.charAt(i) - 'a']++;
        }
        int matches = 0;
        for (int i = 0; i < 26; i++) if (a[i] == b[i]) matches++;
        for (int i = s1.length(); i < s2.length(); i++) {
            if (matches == 26) return true;
            int add = s2.charAt(i) - 'a';
            int rem = s2.charAt(i - s1.length()) - 'a';
            b[add]++;
            if (a[add] == b[add]) matches++;
            else if (a[add] + 1 == b[add]) matches--;
            b[rem]--;
            if (a[rem] == b[rem]) matches++;
            else if (a[rem] - 1 == b[rem]) matches--;
        }
        return matches == 26;
    }
}`,
        cpp: `class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if (s1.size() > s2.size()) return false;
        int a[26] = {}, b[26] = {};
        for (int i = 0; i < (int)s1.size(); i++) {
            a[s1[i] - 'a']++;
            b[s2[i] - 'a']++;
        }
        int matches = 0;
        for (int i = 0; i < 26; i++) if (a[i] == b[i]) matches++;
        for (int i = s1.size(); i < s2.size(); i++) {
            if (matches == 26) return true;
            int add = s2[i] - 'a';
            int rem = s2[i - s1.size()] - 'a';
            if (++b[add] == a[add]) matches++;
            else if (b[add] == a[add] + 1) matches--;
            if (--b[rem] == a[rem]) matches++;
            else if (b[rem] == a[rem] - 1) matches--;
        }
        return matches == 26;
    }
};`,
      },
    },
  },
  {
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    difficulty: "Hard",
    category: "sliding-window",
    topics: ["Array", "Queue", "Sliding Window", "Heap"],
    order: 6,
    description: `You are given an array of integers \`nums\`, there is a sliding window of size \`k\` which is moving from the very left of the array to the very right. You can only see the \`k\` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the **max sliding window**.`,
    examples: [
      { args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], output: [3, 3, 5, 5, 6, 7] },
      { args: [[1], 1], output: [1] },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "1 <= k <= nums.length"],
    starter: {
      python: `from typing import List


def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    pass
`,
      javascript: `function maxSlidingWindow(nums, k) {
    
}`,
      typescript: `function maxSlidingWindow(nums: number[], k: number): number[] {
    
}`,
      java: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        
    }
};`,
    },
    methodName: "maxSlidingWindow",
    argTypes: ["int[]", "int"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[1, 3, -1, -3, 5, 3, 6, 7], 3], output: [3, 3, 5, 5, 6, 7] },
      { args: [[1], 1], output: [1] },
    ],
    hiddenTests: [
      { args: [[1, -1], 1], output: [1, -1] },
      { args: [[9, 8, 7, 6, 5], 2], output: [9, 8, 7, 6] },
      { args: [[1, 3, 1, 2, 0, 5], 3], output: [3, 3, 2, 5] },
      { args: [[-7, -8, 7, 5, 7, 1, 6, 0], 4], output: [7, 7, 7, 7, 7] },
      { args: [[5, 5, 5, 5, 5], 3], output: [5, 5, 5] },
    ],
    editorial: {
      approach: `A **monotonic deque** keeps candidate maximums in decreasing order. For each new element, pop from the back while it is smaller than the incoming element (those can never be the window max), then push the index. Also pop from the front any index that has fallen out of the window (\`index <= i - k\`). The front of the deque is always the current window's maximum.\n\nEvery index enters and leaves the deque once: O(n) time, O(k) space.`,
      complexity: { time: "O(n)", space: "O(k)" },
      code: {
        python: `from collections import deque


def maxSlidingWindow(nums: List[int], k: int) -> List[int]:
    q = deque()
    out = []
    for i, num in enumerate(nums):
        while q and nums[q[-1]] <= num:
            q.pop()
        q.append(i)
        if q[0] <= i - k:
            q.popleft()
        if i >= k - 1:
            out.append(nums[q[0]])
    return out`,
        javascript: `function maxSlidingWindow(nums, k) {
  const q = [];
  const out = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift();
    if (i >= k - 1) out.push(nums[q[0]]);
  }
  return out;
}`,
        typescript: `function maxSlidingWindow(nums: number[], k: number): number[] {
  const q: number[] = [];
  const out: number[] = [];
  for (let i = 0; i < nums.length; i++) {
    while (q.length && nums[q[q.length - 1]] <= nums[i]) q.pop();
    q.push(i);
    if (q[0] <= i - k) q.shift();
    if (i >= k - 1) out.push(nums[q[0]]);
  }
  return out;
}`,
        java: `class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int[] res = new int[nums.length - k + 1];
        Deque<Integer> dq = new ArrayDeque<>();
        int idx = 0;
        for (int i = 0; i < nums.length; i++) {
            while (!dq.isEmpty() && dq.peekFirst() <= i - k) dq.pollFirst();
            while (!dq.isEmpty() && nums[dq.peekLast()] <= nums[i]) dq.pollLast();
            dq.addLast(i);
            if (i >= k - 1) res[idx++] = nums[dq.peekFirst()];
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        vector<int> res;
        deque<int> dq;
        for (int i = 0; i < (int)nums.size(); i++) {
            while (!dq.empty() && dq.front() <= i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};`,
      },
    },
  },
];
