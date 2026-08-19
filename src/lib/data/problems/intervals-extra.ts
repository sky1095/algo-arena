import type { Problem } from "@/lib/types";

export const intervalsExtra: Problem[] = [
  {
    slug: "non-overlapping-intervals",
    title: "Non-overlapping Intervals",
    difficulty: "Medium",
    category: "intervals",
    topics: ["Array", "Greedy", "Sorting"],
    order: 3,
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the **minimum number of intervals you need to remove** to make the rest of the intervals non-overlapping.
\nNote that intervals like \`[1, 2]\` and \`[2, 3]\` have **boundaries that touch** ("meet") and so they are **not** overlapping.`,
    examples: [
      { args: [[[1, 2], [2, 3], [3, 4], [1, 3]]], output: 1 },
      { args: [[[1, 2], [1, 2], [1, 2]]], output: 2 },
      { args: [[[1, 2], [2, 3]]], output: 0 },
    ],
    constraints: ["1 <= intervals.length <= 10^5", "intervals[i].length == 2", "-5 * 10^4 <= start_i < end_i <= 5 * 10^4"],
    starter: {
      python: `from typing import List\n\n\ndef eraseOverlapIntervals(intervals: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function eraseOverlapIntervals(intervals) {\n    \n}`,
      typescript: `function eraseOverlapIntervals(intervals: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int eraseOverlapIntervals(int[][] intervals) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int eraseOverlapIntervals(vector<vector<int>>& intervals) {\n        \n    }\n};`,
      dart: `class Solution {
  int eraseOverlapIntervals(List<List<int>> intervals) {
    
  }
}`,
    },
    methodName: "eraseOverlapIntervals",
    argTypes: ["int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 2], [2, 3], [3, 4], [1, 3]]], output: 1 },
      { args: [[[1, 2], [1, 2], [1, 2]]], output: 2 },
      { args: [[[1, 2], [2, 3]]], output: 0 },
    ],
    hiddenTests: [
      { args: [[[1, 100], [11, 22], [1, 11], [2, 12]]], output: 2 },
      { args: [[[0, 2], [1, 3], [2, 4], [3, 5]]], output: 2 },
      { args: [[[1, 5], [2, 6], [3, 7], [4, 8]]], output: 3 },
      { args: [[[1, 3], [2, 4], [3, 5], [4, 6]]], output: 2 },
      { args: [[[1, 2]]], output: 0 },
    ],
    editorial: {
      approach: `Sort intervals by their end time, then greedily keep as many non-overlapping intervals as possible: track the end of the last kept interval, and whenever the next interval starts at or after it, keep it and update the end. The answer is the total count minus the number kept. Greedy by end is optimal because it leaves the most room for later intervals.\n\nO(n log n) time, O(1) space (excluding sort).`,
      complexity: { time: "O(n log n)", space: "O(1)" },
      code: {
        python: `def eraseOverlapIntervals(intervals: List[List[int]]) -> int:
    intervals.sort(key=lambda x: x[1])
    kept = 0
    last_end = float("-inf")
    for start, end in intervals:
        if start >= last_end:
            kept += 1
            last_end = end
    return len(intervals) - kept`,
        javascript: `function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]);
  let kept = 0, lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start >= lastEnd) {
      kept++;
      lastEnd = end;
    }
  }
  return intervals.length - kept;
}`,
        typescript: `function eraseOverlapIntervals(intervals: number[][]): number {
  intervals.sort((a, b) => a[1]! - b[1]!);
  let kept = 0, lastEnd = -Infinity;
  for (const [start, end] of intervals) {
    if (start! >= lastEnd) {
      kept++;
      lastEnd = end!;
    }
  }
  return intervals.length - kept;
}`,

        java: `class Solution {
    public int eraseOverlapIntervals(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
        int count = 0, end = Integer.MIN_VALUE;
        for (int[] iv : intervals) {
            if (iv[0] >= end) end = iv[1];
            else count++;
        }
        return count;
    }
}`,
        cpp: `class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        int count = 0, end = INT_MIN;
        for (auto& iv : intervals) {
            if (iv[0] >= end) end = iv[1];
            else count++;
        }
        return count;
    }
};`,      },
    },
  },
  {
    slug: "meeting-rooms",
    title: "Meeting Rooms",
    difficulty: "Easy",
    category: "intervals",
    topics: ["Array", "Sorting"],
    order: 4,
    description: `Given an array of meeting time interval objects consisting of start and end times \`[[start_1, end_1], [start_2, end_2], ...]\` where \`start_i < end_i\`, determine if a person could attend all meetings.`,
    examples: [
      { args: [[[0, 30], [5, 10], [15, 20]]], output: false },
      { args: [[[7, 10], [2, 4]]], output: true },
    ],
    constraints: ["0 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= start_i < end_i <= 10^6"],
    starter: {
      python: `from typing import List\n\n\ndef canAttendMeetings(intervals: List[List[int]]) -> bool:\n    pass\n`,
      javascript: `function canAttendMeetings(intervals) {\n    \n}`,
      typescript: `function canAttendMeetings(intervals: number[][]): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean canAttendMeetings(int[][] intervals) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canAttendMeetings(vector<vector<int>>& intervals) {\n        \n    }\n};`,
      dart: `class Solution {
  bool canAttendMeetings(List<List<int>> intervals) {
    
  }
}`,
    },
    methodName: "canAttendMeetings",
    argTypes: ["int[][]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[[0, 30], [5, 10], [15, 20]]], output: false },
      { args: [[[7, 10], [2, 4]]], output: true },
    ],
    hiddenTests: [
      { args: [[]], output: true },
      { args: [[[5, 8], [9, 15]]], output: true },
      { args: [[[1, 5], [5, 10]]], output: true },
      { args: [[[1, 5], [2, 6]]], output: false },
      { args: [[[13, 15], [1, 13]]], output: true },
      { args: [[[1, 5], [2, 3], [3, 4]]], output: false },
    ],
    editorial: {
      approach: `Sort meetings by start time. If any meeting starts before the previous one ends, the person would have to be in two places at once — return false. Otherwise true.\n\nO(n log n) time, O(1) space (excluding sort).`,
      complexity: { time: "O(n log n)", space: "O(1)" },
      code: {
        python: `def canAttendMeetings(intervals: List[List[int]]) -> bool:
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True`,
        javascript: `function canAttendMeetings(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i - 1][1]) return false;
  }
  return true;
}`,
        typescript: `function canAttendMeetings(intervals: number[][]): boolean {
  intervals.sort((a, b) => a[0]! - b[0]!);
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i]![0]! < intervals[i - 1]![1]!) return false;
  }
  return true;
}`,

        java: `class Solution {
    public boolean canAttendMeetings(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        for (int i = 1; i < (int)intervals.size(); i++) {
            if (intervals[i][0] < intervals[i - 1][1]) return false;
        }
        return true;
    }
};`,      },
    },
  },
  {
    slug: "minimum-interval-to-include-each-query",
    title: "Minimum Interval to Include Each Query",
    difficulty: "Hard",
    category: "intervals",
    topics: ["Array", "Binary Search", "Heap", "Sorting"],
    order: 6,
    description: `You are given a 2D integer array \`intervals\`, where \`intervals[i] = [left_i, right_i]\` describes the \`i\`th interval starting at \`left_i\` and ending at \`right_i\` **(inclusive)**. The **size** of an interval is defined as the number of integers it contains, or more formally \`right_i - left_i + 1\`.
\nYou are also given an integer array \`queries\`. The answer to the \`j\`th query is the **size of the smallest interval** \`i\` such that \`left_i <= queries[j] <= right_i\`. If there is no such interval, return \`-1\` for that query.`,
    examples: [
      { args: [[[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]], output: [3, 3, 1, 4] },
      { args: [[[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]], output: [2, -1, 4, 6] },
    ],
    constraints: ["1 <= intervals.length <= 10^5", "1 <= queries.length <= 10^5", "intervals[i].length == 2", "1 <= left_i <= right_i <= 10^7", "1 <= queries[j] <= 10^7"],
    starter: {
      python: `from typing import List\n\n\ndef minInterval(intervals: List[List[int]], queries: List[int]) -> List[int]:\n    pass\n`,
      javascript: `function minInterval(intervals, queries) {\n    \n}`,
      typescript: `function minInterval(intervals: number[][], queries: number[]): number[] {\n    \n}`,
      java: `class Solution {\n    public int[] minInterval(int[][] intervals, int[] queries) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {\n        \n    }\n};`,
      dart: `class Solution {
  List<int> minInterval(List<List<int>> intervals, List<int> queries) {
    
  }
}`,
    },
    methodName: "minInterval",
    argTypes: ["int[][]", "int[]"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]], output: [3, 3, 1, 4] },
      { args: [[[2, 3], [2, 5], [1, 8], [20, 25]], [2, 19, 5, 22]], output: [2, -1, 4, 6] },
    ],
    hiddenTests: [
      { args: [[[1, 4]], [1]], output: [4] },
      { args: [[[1, 4]], [5]], output: [-1] },
      { args: [[[1, 4], [2, 3]], [2]], output: [2] },
      { args: [[[2, 3], [1, 4], [1, 8], [20, 25]], [3]], output: [2] },
      { args: [[[1, 2], [3, 4], [5, 6]], [1, 3, 5]], output: [2, 2, 2] },
      { args: [[[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]], output: [3, 3, 1, 4] },
    ],
    editorial: {
      approach: `Sort intervals by left endpoint and process queries in ascending order. For each query, add every interval whose left endpoint is <= query into a min-heap keyed by interval size; then pop intervals whose right endpoint is < query (they can never help later queries either). The heap top, if any, is the smallest interval containing the query.\n\nO((n + q) log n) time, O(n) space.`,
      complexity: { time: "O((n + q) log n)", space: "O(n)" },
      code: {
        python: `def minInterval(intervals: List[List[int]], queries: List[int]) -> List[int]:
    import heapq
    intervals.sort()
    heap = []
    result = {}
    i = 0
    for q in sorted(queries):
        while i < len(intervals) and intervals[i][0] <= q:
            l, r = intervals[i]
            heapq.heappush(heap, (r - l + 1, r))
            i += 1
        while heap and heap[0][1] < q:
            heapq.heappop(heap)
        result[q] = heap[0][0] if heap else -1
    return [result[q] for q in queries]`,
        javascript: `function minInterval(intervals, queries) {
  intervals.sort((a, b) => a[0] - b[0]);
  const heap = [];
  const result = new Map();
  let i = 0;
  for (const q of [...queries].sort((a, b) => a - b)) {
    while (i < intervals.length && intervals[i][0] <= q) {
      const [l, r] = intervals[i];
      heap.push([r - l + 1, r]);
      i++;
    }
    heap.sort((a, b) => a[0] - b[0]);
    while (heap.length && heap[0][1] < q) heap.shift();
    result.set(q, heap.length ? heap[0][0] : -1);
  }
  return queries.map((q) => result.get(q));
}`,
        typescript: `function minInterval(intervals: number[][], queries: number[]): number[] {
  intervals.sort((a, b) => a[0]! - b[0]!);
  const heap: [number, number][] = [];
  const result = new Map<number, number>();
  let i = 0;
  for (const q of [...queries].sort((a, b) => a - b)) {
    while (i < intervals.length && intervals[i]![0]! <= q) {
      const [l, r] = intervals[i]!;
      heap.push([r! - l! + 1, r!]);
      i++;
    }
    heap.sort((a, b) => a[0] - b[0]);
    while (heap.length && heap[0]![1] < q) heap.shift();
    result.set(q, heap.length ? heap[0]![0]! : -1);
  }
  return queries.map((q) => result.get(q)!);
}`,

        java: `class Solution {
    public int[] minInterval(int[][] intervals, int[] queries) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        int[][] qs = new int[queries.length][2];
        for (int i = 0; i < queries.length; i++) qs[i] = new int[]{queries[i], i};
        Arrays.sort(qs, (a, b) -> a[0] - b[0]);
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> (a[1] - a[0]) - (b[1] - b[0]));
        int[] res = new int[queries.length];
        Arrays.fill(res, -1);
        int idx = 0;
        for (int[] q : qs) {
            while (idx < intervals.length && intervals[idx][0] <= q[0]) {
                heap.add(intervals[idx]);
                idx++;
            }
            while (!heap.isEmpty() && heap.peek()[1] < q[0]) heap.poll();
            if (!heap.isEmpty()) {
                int[] top = heap.peek();
                res[q[1]] = top[1] - top[0] + 1;
            }
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> minInterval(vector<vector<int>>& intervals, vector<int>& queries) {
        sort(intervals.begin(), intervals.end());
        vector<pair<int,int>> qs;
        for (int i = 0; i < (int)queries.size(); i++) qs.push_back({queries[i], i});
        sort(qs.begin(), qs.end());
        auto cmp = [](const vector<int>& a, const vector<int>& b) {
            return (a[1] - a[0]) > (b[1] - b[0]);
        };
        priority_queue<vector<int>, vector<vector<int>>, decltype(cmp)> heap(cmp);
        vector<int> res(queries.size(), -1);
        int idx = 0;
        for (auto& q : qs) {
            while (idx < (int)intervals.size() && intervals[idx][0] <= q.first) {
                heap.push(intervals[idx]);
                idx++;
            }
            while (!heap.empty() && heap.top()[1] < q.first) heap.pop();
            if (!heap.empty()) res[q.second] = heap.top()[1] - heap.top()[0] + 1;
        }
        return res;
    }
};`,      },
    },
  },
];
