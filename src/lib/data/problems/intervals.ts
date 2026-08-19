import type { Problem } from "@/lib/types";

export const intervalsProblems: Problem[] = [
  {
    slug: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "intervals",
    topics: ["Array", "Sorting"],
    order: 1,
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      { args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], output: [[1, 6], [8, 10], [15, 18]], explain: "Intervals [1,3] and [2,6] overlap, so they merge into [1,6]." },
      { args: [[[1, 4], [4, 5]]], output: [[1, 5]], explain: "Intervals [1,4] and [4,5] are considered overlapping." },
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= start_i <= end_i <= 10^4"],
    starter: {
      python: `from typing import List\n\n\ndef merge(intervals: List[List[int]]) -> List[List[int]]:\n    pass\n`,
      javascript: `function merge(intervals) {\n    \n}`,
      typescript: `function merge(intervals: number[][]): number[][] {\n    \n}`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};`,
      dart: `class Solution {
  List<List<int>> merge(List<List<int>> intervals) {
    
  }
}`,
    },
    methodName: "merge",
    argTypes: ["int[][]"],
    outputType: "int[][]",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 3], [2, 6], [8, 10], [15, 18]]], output: [[1, 6], [8, 10], [15, 18]] },
      { args: [[[1, 4], [4, 5]]], output: [[1, 5]] },
    ],
    hiddenTests: [
      { args: [[[1, 1], [1, 1]]], output: [[1, 1]] },
      { args: [[[1, 2], [3, 4], [5, 6]]], output: [[1, 2], [3, 4], [5, 6]] },
      { args: [[[2, 3], [1, 4], [0, 1]]], output: [[0, 4]] },
      { args: [[[1, 3], [2, 6], [8, 10], [9, 12], [15, 18]]], output: [[1, 6], [8, 12], [15, 18]] },
      { args: [[[0, 10], [2, 3], [4, 5]]], output: [[0, 10]] },
    ],
    editorial: {
      approach: `Sort intervals by start time, then walk through them. If the current interval's start is within the last merged interval's end, extend the merged end; otherwise start a new merged interval.

Sorting dominates: O(n log n) time and O(n) space for the result.`,
      complexity: { time: "O(n log n)", space: "O(n)" },
      code: {
        python: `def merge(intervals: List[List[int]]) -> List[List[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = []
    for start, end in intervals:
        if not merged or start > merged[-1][1]:
            merged.append([start, end])
        else:
            merged[-1][1] = max(merged[-1][1], end)
    return merged`,
        javascript: `function merge(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const [start, end] of intervals) {
    if (!merged.length || start > merged[merged.length - 1][1]) {
      merged.push([start, end]);
    } else {
      merged[merged.length - 1][1] = Math.max(merged[merged.length - 1][1], end);
    }
  }
  return merged;
}`,
        typescript: `function merge(intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0]! - b[0]!);
  const merged: number[][] = [];
  for (const [start, end] of intervals) {
    if (!merged.length || start! > merged[merged.length - 1]![1]!) {
      merged.push([start, end]);
    } else {
      merged[merged.length - 1]![1] = Math.max(merged[merged.length - 1]![1]!, end!);
    }
  }
  return merged;
}`,

        java: `class Solution {
    public int[][] merge(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        List<int[]> res = new ArrayList<>();
        for (int[] iv : intervals) {
            if (res.isEmpty() || res.get(res.size() - 1)[1] < iv[0]) {
                res.add(iv);
            } else {
                res.get(res.size() - 1)[1] = Math.max(res.get(res.size() - 1)[1], iv[1]);
            }
        }
        return res.toArray(new int[res.size()][]);
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> res;
        for (auto& iv : intervals) {
            if (res.empty() || res.back()[1] < iv[0]) res.push_back(iv);
            else res.back()[1] = max(res.back()[1], iv[1]);
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "insert-interval",
    title: "Insert Interval",
    difficulty: "Medium",
    category: "intervals",
    topics: ["Array"],
    order: 2,
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\` represent the start and the end of the i-th interval, sorted in ascending order by \`start_i\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`start_i\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary). Return \`intervals\` after the insertion.`,
    examples: [
      { args: [[[1, 3], [6, 9]], [2, 5]], output: [[1, 5], [6, 9]] },
      { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], output: [[1, 2], [3, 10], [12, 16]] },
    ],
    constraints: ["0 <= intervals.length <= 10^4", "intervals[i].length == 2", "0 <= start_i <= end_i <= 10^5", "intervals is sorted by start_i in ascending order.", "newInterval.length == 2", "0 <= start <= end <= 10^5"],
    starter: {
      python: `from typing import List\n\n\ndef insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:\n    pass\n`,
      javascript: `function insert(intervals, newInterval) {\n    \n}`,
      typescript: `function insert(intervals: number[][], newInterval: number[]): number[][] {\n    \n}`,
      java: `class Solution {\n    public int[][] insert(int[][] intervals, int[] newInterval) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {\n        \n    }\n};`,
      dart: `class Solution {
  List<List<int>> insert(List<List<int>> intervals, List<int> newInterval) {
    
  }
}`,
    },
    methodName: "insert",
    argTypes: ["int[][]", "int[]"],
    outputType: "int[][]",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 3], [6, 9]], [2, 5]], output: [[1, 5], [6, 9]] },
      { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]], output: [[1, 2], [3, 10], [12, 16]] },
    ],
    hiddenTests: [
      { args: [[], [5, 7]], output: [[5, 7]] },
      { args: [[[1, 5]], [2, 3]], output: [[1, 5]] },
      { args: [[[1, 5]], [6, 8]], output: [[1, 5], [6, 8]] },
      { args: [[[2, 3], [5, 6]], [0, 1]], output: [[0, 1], [2, 3], [5, 6]] },
      { args: [[[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [0, 17]], output: [[0, 17]] },
    ],
    editorial: {
      approach: `Walk the sorted intervals and handle three cases: intervals entirely before \`newInterval\` (add as-is), intervals entirely after (add as-is, then the new interval), and overlapping ones (merge by widening the new interval's bounds). Emit the merged interval once the walk passes its end.

Single pass: O(n) time and space.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def insert(intervals: List[List[int]], newInterval: List[int]) -> List[List[int]]:
    result = []
    i = 0
    n = len(intervals)
    while i < n and intervals[i][1] < newInterval[0]:
        result.append(intervals[i])
        i += 1
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    result.append(newInterval)
    while i < n:
        result.append(intervals[i])
        i += 1
    return result`,
        javascript: `function insert(intervals, newInterval) {
  const result = [];
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i][1] < newInterval[0]) result.push(intervals[i++]);
  while (i < n && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);
  while (i < n) result.push(intervals[i++]);
  return result;
}`,
        typescript: `function insert(intervals: number[][], newInterval: number[]): number[][] {
  const result: number[][] = [];
  let i = 0;
  const n = intervals.length;
  while (i < n && intervals[i]![1]! < newInterval[0]!) result.push(intervals[i++]!);
  while (i < n && intervals[i]![0]! <= newInterval[1]!) {
    newInterval[0] = Math.min(newInterval[0]!, intervals[i]![0]!);
    newInterval[1] = Math.max(newInterval[1]!, intervals[i]![1]!);
    i++;
  }
  result.push(newInterval);
  while (i < n) result.push(intervals[i++]!);
  return result;
}`,

        java: `class Solution {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> res = new ArrayList<>();
        int i = 0, n = intervals.length;
        while (i < n && intervals[i][1] < newInterval[0]) res.add(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.add(newInterval);
        while (i < n) res.add(intervals[i++]);
        return res.toArray(new int[res.size()][]);
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        while (i < n && intervals[i][1] < newInterval[0]) res.push_back(intervals[i++]);
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        while (i < n) res.push_back(intervals[i++]);
        return res;
    }
};`,      },
    },
  },
  {
    slug: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    difficulty: "Medium",
    category: "intervals",
    topics: ["Array", "Sorting", "Heap", "Two Pointers"],
    order: 3,
    description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of conference rooms required.`,
    examples: [
      { args: [[[0, 30], [5, 10], [15, 20]]], output: 2 },
      { args: [[[7, 10], [2, 4]]], output: 1 },
    ],
    constraints: ["1 <= intervals.length <= 10^4", "0 <= start_i < end_i <= 10^6"],
    starter: {
      python: `from typing import List\n\n\ndef minMeetingRooms(intervals: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function minMeetingRooms(intervals) {\n    \n}`,
      typescript: `function minMeetingRooms(intervals: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int minMeetingRooms(vector<vector<int>>& intervals) {\n        \n    }\n};`,
      dart: `class Solution {
  int minMeetingRooms(List<List<int>> intervals) {
    
  }
}`,
    },
    methodName: "minMeetingRooms",
    argTypes: ["int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[[0, 30], [5, 10], [15, 20]]], output: 2 },
      { args: [[[7, 10], [2, 4]]], output: 1 },
    ],
    hiddenTests: [
      { args: [[[1, 5], [2, 6], [3, 7]]], output: 3 },
      { args: [[[1, 5], [5, 10]]], output: 1 },
      { args: [[[0, 2], [2, 4], [4, 6]]], output: 1 },
      { args: [[[1, 10], [2, 3], [4, 5], [6, 7]]], output: 2 },
      { args: [[[13, 15], [1, 13]]], output: 1 },
      { args: [[[1, 20], [2, 5], [3, 6], [4, 7], [8, 9]]], output: 4 },
    ],
    editorial: {
      approach: `The number of rooms needed equals the maximum number of meetings in progress at any instant. Sort all start times and all end times separately, then sweep: every start increments a counter, every end decrements it; the peak is the answer.

Two-pointer sweep: O(n log n) time (dominated by the two sorts) and O(n) space.`,
      complexity: { time: "O(n log n)", space: "O(n)" },
      code: {
        python: `def minMeetingRooms(intervals: List[List[int]]) -> int:
    starts = sorted(i[0] for i in intervals)
    ends = sorted(i[1] for i in intervals)
    rooms = 0
    peak = 0
    i = j = 0
    while i < len(starts):
        if starts[i] < ends[j]:
            rooms += 1
            i += 1
            peak = max(peak, rooms)
        else:
            rooms -= 1
            j += 1
    return peak`,
        javascript: `function minMeetingRooms(intervals) {
  const starts = intervals.map((i) => i[0]).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]).sort((a, b) => a - b);
  let rooms = 0, peak = 0, i = 0, j = 0;
  while (i < starts.length) {
    if (starts[i] < ends[j]) {
      rooms++;
      i++;
      peak = Math.max(peak, rooms);
    } else {
      rooms--;
      j++;
    }
  }
  return peak;
}`,
        typescript: `function minMeetingRooms(intervals: number[][]): number {
  const starts = intervals.map((i) => i[0]!).sort((a, b) => a - b);
  const ends = intervals.map((i) => i[1]!).sort((a, b) => a - b);
  let rooms = 0, peak = 0, i = 0, j = 0;
  while (i < starts.length) {
    if (starts[i]! < ends[j]!) {
      rooms++;
      i++;
      peak = Math.max(peak, rooms);
    } else {
      rooms--;
      j++;
    }
  }
  return peak;
}`,

        java: `class Solution {
    public int minMeetingRooms(int[][] intervals) {
        Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
        PriorityQueue<Integer> ends = new PriorityQueue<>();
        int rooms = 0;
        for (int[] iv : intervals) {
            ends.add(iv[1]);
            if (ends.peek() <= iv[0]) ends.poll();
            rooms = Math.max(rooms, ends.size());
        }
        return rooms;
    }
}`,
        cpp: `class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        priority_queue<int, vector<int>, greater<int>> ends;
        int rooms = 0;
        for (auto& iv : intervals) {
            ends.push(iv[1]);
            if (ends.top() <= iv[0]) ends.pop();
            rooms = max(rooms, (int)ends.size());
        }
        return rooms;
    }
};`,      },
    },
  },
];
