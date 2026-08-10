import type { Problem } from "@/lib/types";

export const binarySearchExtra: Problem[] = [
  {
    slug: "find-minimum-in-rotated-sorted-array",
    title: "Find Minimum in Rotated Sorted Array",
    difficulty: "Medium",
    category: "binary-search",
    topics: ["Array", "Binary Search"],
    order: 5,
    description: `Suppose an array of length \`n\` sorted in ascending order is **rotated** between 1 and \`n\` times. For example, the array \`nums = [0, 1, 2, 4, 5, 6, 7]\` might become \`[4, 5, 6, 7, 0, 1, 2]\`.\n\nGiven the possibly rotated array \`nums\` of **unique** elements, return the **minimum element** of this array.\n\nYou must write an algorithm that runs in **O(log n)** time.`,
    examples: [
      { args: [[3, 4, 5, 1, 2]], output: 1 },
      { args: [[4, 5, 6, 7, 0, 1, 2]], output: 0 },
      { args: [[11, 13, 15, 17]], output: 11 },
    ],
    constraints: ["n == nums.length", "1 <= n <= 5000", "-5000 <= nums[i] <= 5000", "All the integers of nums are unique.", "nums is sorted and rotated between 1 and n times."],
    starter: {
      python: `from typing import List\n\n\ndef findMin(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function findMin(nums) {\n    \n}`,
      typescript: `function findMin(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "findMin",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 4, 5, 1, 2]], output: 1 },
      { args: [[4, 5, 6, 7, 0, 1, 2]], output: 0 },
      { args: [[11, 13, 15, 17]], output: 11 },
    ],
    hiddenTests: [
      { args: [[1]], output: 1 },
      { args: [[2, 1]], output: 1 },
      { args: [[1, 2]], output: 1 },
      { args: [[5, 6, 7, 8, 9, 1, 2, 3, 4]], output: 1 },
      { args: [[2, 3, 4, 5, 6, 7, 8, 1]], output: 1 },
      { args: [[-10, -5, 0, 3, 8]], output: -10 },
    ],
    editorial: {
      approach: `In a rotated sorted array, the minimum is the only element smaller than its left neighbor. Binary search: compare the middle element with the right endpoint.\n\n- If \`nums[mid] > nums[right]\`, the rotation point (and minimum) lies to the right, so move \`left = mid + 1\`.\n- Otherwise the minimum is at or left of \`mid\`, so move \`right = mid\`.\n\nWhen \`left == right\` we have found the minimum. This is O(log n).`,
      complexity: { time: "O(log n)", space: "O(1)" },
      code: {
        python: `def findMin(nums: List[int]) -> int:
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return nums[left]`,
        javascript: `function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) left = mid + 1;
    else right = mid;
  }
  return nums[left];
}`,
        typescript: `function findMin(nums: number[]): number {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid]! > nums[right]!) left = mid + 1;
    else right = mid;
  }
  return nums[left]!;
}`,

        java: `class Solution {
    public int findMin(int[] nums) {
        int lo = 0, hi = nums.length - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return nums[lo];
    }
}`,
        cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        int lo = 0, hi = (int)nums.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (nums[mid] > nums[hi]) lo = mid + 1;
            else hi = mid;
        }
        return nums[lo];
    }
};`,      },
    },
  },
  {
    slug: "time-based-key-value-store",
    title: "Time Based Key-Value Store",
    difficulty: "Medium",
    category: "binary-search",
    topics: ["Hash Table", "Binary Search", "Design"],
    order: 6,
    description: `Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.\n\nImplement the \`TimeMap\` class:\n- \`TimeMap()\` — Initializes the object.\n- \`void set(String key, String value, int timestamp)\` — Stores the key \`key\` with the value \`value\` at the given time \`timestamp\`.\n- \`String get(String key, int timestamp)\` — Returns a value such that \`set\` was called previously, with \`timestamp_prev <= timestamp\`. If there are multiple such values, it returns the value associated with the largest \`timestamp_prev\`. If there are no values, it returns \`""\`.\n\nTests call the methods as an operations list with expected outputs.`,
    examples: [
      {
        ops: ["TimeMap", "set", "get", "get", "set", "get", "get"],
        args: [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]],
        output: [null, null, "bar", "bar", null, "bar2", "bar2"],
      },
    ],
    constraints: ["1 <= key.length, value.length <= 100", "key and value consist of lowercase English letters and digits.", "1 <= timestamp <= 10^7", "All the timestamps of set are strictly increasing.", "At most 2 * 10^5 calls will be made to set and get."],
    starter: {
      python: `class TimeMap:\n    def __init__(self):\n        pass\n\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        pass\n\n    def get(self, key: str, timestamp: int) -> str:\n        pass\n`,
      javascript: `class TimeMap {\n    constructor() {\n        \n    }\n    \n    set(key, value, timestamp) {\n        \n    }\n    \n    get(key, timestamp) {\n        \n    }\n}`,
      typescript: `class TimeMap {\n    constructor() {\n        \n    }\n    \n    set(key: string, value: string, timestamp: number): void {\n        \n    }\n    \n    get(key: string, timestamp: number): string {\n        \n    }\n}`,
      java: `class TimeMap {\n    public TimeMap() {\n        \n    }\n    \n    public void set(String key, String value, int timestamp) {\n        \n    }\n    \n    public String get(String key, int timestamp) {\n        \n    }\n}`,
      cpp: `class TimeMap {\npublic:\n    TimeMap() {\n        \n    }\n    \n    void set(string key, string value, int timestamp) {\n        \n    }\n    \n    string get(string key, int timestamp) {\n        \n    }\n};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "string",
    compare: "exact",
    classSpec: {
      className: "TimeMap",
      ops: [
        { name: "TimeMap", argTypes: [], ret: "void" },
        { name: "set", argTypes: ["string", "string", "int"], ret: "void" },
        { name: "get", argTypes: ["string", "int"], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["TimeMap", "set", "get", "get", "set", "get", "get"],
        args: [[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]],
        output: [null, null, "bar", "bar", null, "bar2", "bar2"],
      },
    ],
    hiddenTests: [
      {
        ops: ["TimeMap", "set", "set", "get", "get", "get", "get"],
        args: [[], ["a", "v1", 10], ["a", "v2", 20], ["a", 5], ["a", 10], ["a", 15], ["a", 25]],
        output: [null, null, null, "", "v1", "v1", "v2"],
      },
      {
        ops: ["TimeMap", "set", "get", "set", "get", "get"],
        args: [[], ["k", "x", 100], ["k", 99], ["k", "y", 200], ["k", 150], ["k", 201]],
        output: [null, null, "", null, "x", "y"],
      },
      {
        ops: ["TimeMap", "get", "set", "get", "set", "get", "set", "get"],
        args: [[], ["absent", 1], ["key", "val", 5], ["key", 5], ["key", "val2", 7], ["key", 7], ["key", "val3", 9], ["key", 8]],
        output: [null, "", null, "val", null, "val2", null, "val2"],
      },
    ],
    editorial: {
      approach: `For each key, keep a list of \`[timestamp, value]\` pairs. Because set is called with strictly increasing timestamps per key, the pairs stay sorted.\n\n\`get\` runs **binary search** over the key's list to find the largest timestamp \`<=\` the query, and returns its value (or \`""\` if none).\n\nEach set is O(1); each get is O(log m) where m is the number of entries for that key.`,
      complexity: { time: "set O(1); get O(log m)", space: "O(total entries)" },
      code: {
        python: `import bisect\n\n\nclass TimeMap:\n    def __init__(self):\n        self.store = {}\n\n    def set(self, key: str, value: str, timestamp: int) -> None:\n        self.store.setdefault(key, []).append((timestamp, value))\n\n    def get(self, key: str, timestamp: int) -> str:\n        pairs = self.store.get(key, [])\n        i = bisect.bisect_right(pairs, (timestamp, "{"))\n        return pairs[i - 1][1] if i else ""`,
        javascript: `class TimeMap {
    constructor() {
        this.store = new Map();
    }

    set(key, value, timestamp) {
        if (!this.store.has(key)) this.store.set(key, []);
        this.store.get(key).push([timestamp, value]);
    }

    get(key, timestamp) {
        const pairs = this.store.get(key) || [];
        let lo = 0, hi = pairs.length - 1, ans = -1;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (pairs[mid][0] <= timestamp) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans === -1 ? "" : pairs[ans][1];
    }
}`,
        typescript: `class TimeMap {
    private store = new Map<string, [number, string][]>();

    set(key: string, value: string, timestamp: number): void {
        if (!this.store.has(key)) this.store.set(key, []);
        this.store.get(key)!.push([timestamp, value]);
    }

    get(key: string, timestamp: number): string {
        const pairs = this.store.get(key) || [];
        let lo = 0, hi = pairs.length - 1, ans = -1;
        while (lo <= hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (pairs[mid]![0] <= timestamp) {
                ans = mid;
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans === -1 ? "" : pairs[ans]![1];
    }
}`,

        java: `class TimeMap {
    private Map<String, TreeMap<Integer, String>> map = new HashMap<>();

    public TimeMap() {
    }

    public void set(String key, String value, int timestamp) {
        map.computeIfAbsent(key, k -> new TreeMap<>()).put(timestamp, value);
    }

    public String get(String key, int timestamp) {
        TreeMap<Integer, String> m = map.get(key);
        if (m == null) return "";
        Map.Entry<Integer, String> e = m.floorEntry(timestamp);
        return e == null ? "" : e.getValue();
    }
}`,
        cpp: `class TimeMap {
public:
    unordered_map<string, map<int, string>> store;

    TimeMap() {
    }

    void set(string key, string value, int timestamp) {
        store[key][timestamp] = value;
    }

    string get(string key, int timestamp) {
        auto it = store.find(key);
        if (it == store.end()) return "";
        auto& m = it->second;
        auto up = m.upper_bound(timestamp);
        if (up == m.begin()) return "";
        return prev(up)->second;
    }
};`,      },
    },
  },
  {
    slug: "median-of-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    difficulty: "Hard",
    category: "binary-search",
    topics: ["Array", "Binary Search", "Divide and Conquer"],
    order: 7,
    description: `Given two sorted arrays \`nums1\` and \`nums2\` of size \`m\` and \`n\` respectively, return **the median** of the two sorted arrays.\n\nThe overall run time complexity should be **O(log (m+n))**.`,
    examples: [
      { args: [[1, 3], [2]], output: 2.0 },
      { args: [[1, 2], [3, 4]], output: 2.5 },
    ],
    constraints: ["nums1.length == m", "nums2.length == n", "0 <= m <= 1000", "0 <= n <= 1000", "1 <= m + n <= 2000", "-10^6 <= nums1[i], nums2[i] <= 10^6"],
    starter: {
      python: `from typing import List\n\n\ndef findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:\n    pass\n`,
      javascript: `function findMedianSortedArrays(nums1, nums2) {\n    \n}`,
      typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {\n    \n}`,
      java: `class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
    },
    methodName: "findMedianSortedArrays",
    argTypes: ["int[]", "int[]"],
    outputType: "double",
    compare: "exact",
    visibleTests: [
      { args: [[1, 3], [2]], output: 2.0 },
      { args: [[1, 2], [3, 4]], output: 2.5 },
    ],
    hiddenTests: [
      { args: [[], [1]], output: 1.0 },
      { args: [[2], []], output: 2.0 },
      { args: [[], [2, 3]], output: 2.5 },
      { args: [[0, 0], [0, 0]], output: 0.0 },
      { args: [[1, 2, 3], [4, 5, 6]], output: 3.5 },
      { args: [[1, 5, 9], [2, 3, 6, 7]], output: 5.0 },
    ],
    editorial: {
      approach: `Binary search the smaller array for a split point that divides the combined array into two halves of equal size, with every element of the left half \`<=\` every element of the right half.\n\nGiven a split of \`nums1\` at index \`i\`, the required split of \`nums2\` is \`j = (m + n + 1) / 2 - i\`. Adjust \`i\` so that \`maxLeft1 <= minRight2\` and \`maxLeft2 <= minRight1\`. Then the median is the max of the left half (odd total) or the average of the two middle values (even total).\n\nO(log(min(m, n))) time and O(1) space.`,
      complexity: { time: "O(log(min(m, n)))", space: "O(1)" },
      code: {
        python: `def findMedianSortedArrays(nums1: List[int], nums2: List[int]) -> float:
    a, b = nums1, nums2
    if len(a) > len(b):
        a, b = b, a
    m, n = len(a), len(b)
    total = m + n
    half = (total + 1) // 2
    left, right = 0, m
    while left <= right:
        i = (left + right) // 2
        j = half - i
        a_left = a[i - 1] if i > 0 else float("-inf")
        a_right = a[i] if i < m else float("inf")
        b_left = b[j - 1] if j > 0 else float("-inf")
        b_right = b[j] if j < n else float("inf")
        if a_left <= b_right and b_left <= a_right:
            if total % 2:
                return max(a_left, b_left)
            return (max(a_left, b_left) + min(a_right, b_right)) / 2
        if a_left > b_right:
            right = i - 1
        else:
            left = i + 1
    return 0.0`,
        javascript: `function findMedianSortedArrays(nums1, nums2) {
  let a = nums1, b = nums2;
  if (a.length > b.length) [a, b] = [b, a];
  const m = a.length, n = b.length;
  const total = m + n;
  const half = Math.floor((total + 1) / 2);
  let left = 0, right = m;
  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = half - i;
    const aLeft = i > 0 ? a[i - 1] : -Infinity;
    const aRight = i < m ? a[i] : Infinity;
    const bLeft = j > 0 ? b[j - 1] : -Infinity;
    const bRight = j < n ? b[j] : Infinity;
    if (aLeft <= bRight && bLeft <= aRight) {
      if (total % 2) return Math.max(aLeft, bLeft);
      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    }
    if (aLeft > bRight) right = i - 1;
    else left = i + 1;
  }
  return 0;
}`,
        typescript: `function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  let a = nums1, b = nums2;
  if (a.length > b.length) [a, b] = [b, a];
  const m = a.length, n = b.length;
  const total = m + n;
  const half = Math.floor((total + 1) / 2);
  let left = 0, right = m;
  while (left <= right) {
    const i = Math.floor((left + right) / 2);
    const j = half - i;
    const aLeft = i > 0 ? a[i - 1]! : -Infinity;
    const aRight = i < m ? a[i]! : Infinity;
    const bLeft = j > 0 ? b[j - 1]! : -Infinity;
    const bRight = j < n ? b[j]! : Infinity;
    if (aLeft <= bRight && bLeft <= aRight) {
      if (total % 2) return Math.max(aLeft, bLeft);
      return (Math.max(aLeft, bLeft) + Math.min(aRight, bRight)) / 2;
    }
    if (aLeft > bRight) right = i - 1;
    else left = i + 1;
  }
  return 0;
}`,

        java: `class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.length, n = nums2.length;
        int lo = 0, hi = m;
        while (lo <= hi) {
            int i = (lo + hi) / 2;
            int j = (m + n + 1) / 2 - i;
            int left1 = i == 0 ? Integer.MIN_VALUE : nums1[i - 1];
            int right1 = i == m ? Integer.MAX_VALUE : nums1[i];
            int left2 = j == 0 ? Integer.MIN_VALUE : nums2[j - 1];
            int right2 = j == n ? Integer.MAX_VALUE : nums2[j];
            if (left1 <= right2 && left2 <= right1) {
                if ((m + n) % 2 == 0) {
                    return (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;
                }
                return Math.max(left1, left2);
            }
            if (left1 > right2) hi = i - 1;
            else lo = i + 1;
        }
        return 0;
    }
}`,
        cpp: `class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if (nums1.size() > nums2.size()) return findMedianSortedArrays(nums2, nums1);
        int m = nums1.size(), n = nums2.size();
        int lo = 0, hi = m;
        while (lo <= hi) {
            int i = (lo + hi) / 2;
            int j = (m + n + 1) / 2 - i;
            int left1 = i == 0 ? INT_MIN : nums1[i - 1];
            int right1 = i == m ? INT_MAX : nums1[i];
            int left2 = j == 0 ? INT_MIN : nums2[j - 1];
            int right2 = j == n ? INT_MAX : nums2[j];
            if (left1 <= right2 && left2 <= right1) {
                if ((m + n) % 2 == 0) {
                    return (max(left1, left2) + min(right1, right2)) / 2.0;
                }
                return max(left1, left2);
            }
            if (left1 > right2) hi = i - 1;
            else lo = i + 1;
        }
        return 0;
    }
};`,      },
    },
  },
];
