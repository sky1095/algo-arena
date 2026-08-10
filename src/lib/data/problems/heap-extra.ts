import type { Problem } from "@/lib/types";

export const heapExtra: Problem[] = [
  {
    slug: "kth-largest-element-in-an-array",
    title: "Kth Largest Element in an Array",
    difficulty: "Medium",
    category: "heap-priority-queue",
    topics: ["Array", "Heap", "Divide and Conquer"],
    order: 4,
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`kth\` largest element in the array.\n\nNote that it is the kth largest element in the sorted order, not the kth distinct element.`,
    examples: [
      { args: [[3, 2, 1, 5, 6, 4], 2], output: 5 },
      { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], output: 4 },
    ],
    constraints: ["1 <= k <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starter: {
      python: `from typing import List\n\n\ndef findKthLargest(nums: List[int], k: int) -> int:\n    pass\n`,
      javascript: `function findKthLargest(nums, k) {\n    \n}`,
      typescript: `function findKthLargest(nums: number[], k: number): number {\n    \n}`,
      java: `class Solution {\n    public int findKthLargest(int[] nums, int k) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findKthLargest(vector<int>& nums, int k) {\n        \n    }\n};`,
    },
    methodName: "findKthLargest",
    argTypes: ["int[]", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 2, 1, 5, 6, 4], 2], output: 5 },
      { args: [[3, 2, 3, 1, 2, 4, 5, 5, 6], 4], output: 4 },
    ],
    hiddenTests: [
      { args: [[1], 1], output: 1 },
      { args: [[-1, -2, -3], 1], output: -1 },
      { args: [[3, 3, 3, 3], 1], output: 3 },
      { args: [[5, 5, 5, 5, 5, 5, 5], 7], output: 5 },
      { args: [[10, 9, 8, 7, 6, 5, 4, 3, 2, 1], 5], output: 6 },
    ],
    editorial: {
      approach: `The simplest correct approach keeps a **min-heap of size k**: for each element, push it and, if the heap exceeds k, pop the smallest. The heap's top is then the kth largest.\n\nO(n log k) time and O(k) space. A more advanced quickselect solution reaches O(n) average time.`,
      complexity: { time: "O(n log k)", space: "O(k)" },
      code: {
        python: `import heapq\n\n\ndef findKthLargest(nums: List[int], k: int) -> int:\n    heap = []\n    for num in nums:\n        heapq.heappush(heap, num)\n        if len(heap) > k:\n            heapq.heappop(heap)\n    return heap[0]`,
        javascript: `function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek();
}

class MinHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(v) {
    this.data.push(v);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p] <= this.data[i]) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = 2 * i + 2;
        let m = i;
        if (l < this.data.length && this.data[l] < this.data[m]) m = l;
        if (r < this.data.length && this.data[r] < this.data[m]) m = r;
        if (m === i) break;
        [this.data[m], this.data[i]] = [this.data[i], this.data[m]];
        i = m;
      }
    }
    return top;
  }
}`,
        typescript: `function findKthLargest(nums: number[], k: number): number {
  const heap = new MinHeap();
  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop();
  }
  return heap.peek()!;
}

class MinHeap {
  data: number[] = [];
  size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(v: number) {
    this.data.push(v);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p]! <= this.data[i]!) break;
      [this.data[p], this.data[i]] = [this.data[i]!, this.data[p]!];
      i = p;
    }
  }
  pop(): number | undefined {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length && last !== undefined) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = 2 * i + 2;
        let m = i;
        if (l < this.data.length && this.data[l]! < this.data[m]!) m = l;
        if (r < this.data.length && this.data[r]! < this.data[m]!) m = r;
        if (m === i) break;
        [this.data[m], this.data[i]] = [this.data[i]!, this.data[m]!];
        i = m;
      }
    }
    return top;
  }
}`,

        java: `class Solution {
    public int findKthLargest(int[] nums, int k) {
        PriorityQueue<Integer> heap = new PriorityQueue<>();
        for (int n : nums) {
            heap.add(n);
            if (heap.size() > k) heap.poll();
        }
        return heap.peek();
    }
}`,
        cpp: `class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> heap;
        for (int n : nums) {
            heap.push(n);
            if ((int)heap.size() > k) heap.pop();
        }
        return heap.top();
    }
};`,      },
    },
  },
  {
    slug: "task-scheduler",
    title: "Task Scheduler",
    difficulty: "Medium",
    category: "heap-priority-queue",
    topics: ["Array", "Hash Table", "Greedy", "Heap"],
    order: 5,
    description: `Given a characters array \`tasks\`, representing the tasks a CPU needs to do, where each letter represents a different task. Tasks could be done in any order. Each task is done in one unit of time. For each unit of time, the CPU could complete either one task or just be idle.\n\nHowever, there is a non-negative integer \`n\` that represents the cooldown period between two **same tasks** (the same letter in the array), that is that there must be at least \`n\` units of time between any two same tasks.\n\nReturn the **least number of units of times** that the CPU will take to finish all the given tasks.`,
    examples: [
      { args: [["A", "A", "A", "B", "B", "B"], 2], output: 8, explain: "A -> B -> idle -> A -> B -> idle -> A -> B, or A -> B -> B -> A ... with idle slots." },
      { args: [["A", "A", "A", "B", "B", "B"], 0], output: 6 },
      { args: [["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2], output: 16 },
    ],
    constraints: ["1 <= tasks.length <= 10^4", "tasks[i] is an uppercase English letter.", "0 <= n <= 100"],
    starter: {
      python: `from typing import List\n\n\ndef leastInterval(tasks: List[str], n: int) -> int:\n    pass\n`,
      javascript: `function leastInterval(tasks, n) {\n    \n}`,
      typescript: `function leastInterval(tasks: string[], n: number): number {\n    \n}`,
      java: `class Solution {\n    public int leastInterval(char[] tasks, int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int leastInterval(vector<char>& tasks, int n) {\n        \n    }\n};`,
    },
    methodName: "leastInterval",
    argTypes: ["char[]", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [["A", "A", "A", "B", "B", "B"], 2], output: 8 },
      { args: [["A", "A", "A", "B", "B", "B"], 0], output: 6 },
      { args: [["A", "A", "A", "A", "A", "A", "B", "C", "D", "E", "F", "G"], 2], output: 16 },
    ],
    hiddenTests: [
      { args: [["A"], 3], output: 1 },
      { args: [["A", "B", "C"], 2], output: 3 },
      { args: [["A", "A", "A", "A"], 1], output: 7 },
      { args: [["A", "A", "B", "B", "C", "C", "D", "D"], 1], output: 8 },
    ],
    editorial: {
      approach: `Count the frequency of each task. The greedy upper bound: the most frequent task (frequency \`maxFreq\`, count of such tasks \`maxCount\`) forces the schedule length to at least \`(maxFreq - 1) * (n + 1) + maxCount\` — we place the frequent tasks with n idle slots between cycles and fill the rest.\n\nThe answer is the maximum of that bound and the total number of tasks (when the cooldown never forces idle). This formula runs in O(n) time and O(1) space over the 26 letters.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def leastInterval(tasks: List[str], n: int) -> int:
    counts = [0] * 26
    for t in tasks:
        counts[ord(t) - ord("A")] += 1
    max_freq = max(counts)
    max_count = counts.count(max_freq)
    return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)`,
        javascript: `function leastInterval(tasks, n) {
  const counts = new Array(26).fill(0);
  for (const t of tasks) counts[t.charCodeAt(0) - 65]++;
  const maxFreq = Math.max(...counts);
  const maxCount = counts.filter((c) => c === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}`,
        typescript: `function leastInterval(tasks: string[], n: number): number {
  const counts = new Array(26).fill(0);
  for (const t of tasks) counts[t.charCodeAt(0) - 65]++;
  const maxFreq = Math.max(...counts);
  const maxCount = counts.filter((c) => c === maxFreq).length;
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}`,

        java: `class Solution {
    public int leastInterval(char[] tasks, int n) {
        int[] counts = new int[26];
        for (char t : tasks) counts[t - 'A']++;
        int maxFreq = 0, maxCount = 0;
        for (int c : counts) maxFreq = Math.max(maxFreq, c);
        for (int c : counts) if (c == maxFreq) maxCount++;
        int idle = (maxFreq - 1) * (n + 1) + maxCount;
        return Math.max(idle, tasks.length);
    }
}`,
        cpp: `class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> counts(26, 0);
        for (char t : tasks) counts[t - 'A']++;
        int maxFreq = 0, maxCount = 0;
        for (int c : counts) maxFreq = max(maxFreq, c);
        for (int c : counts) if (c == maxFreq) maxCount++;
        int idle = (maxFreq - 1) * (n + 1) + maxCount;
        return max(idle, (int)tasks.size());
    }
};`,      },
    },
  },
  {
    slug: "design-twitter",
    title: "Design Twitter",
    difficulty: "Medium",
    category: "heap-priority-queue",
    topics: ["Hash Table", "Heap", "Design"],
    order: 6,
    description: `Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.\n\nImplement the \`Twitter\` class:\n- \`Twitter()\` — Initializes the twitter object.\n- \`void postTweet(int userId, int tweetId)\` — Composes a new tweet with ID \`tweetId\` by the user \`userId\`. Each call to this function will be made with a unique tweetId.\n- \`List<Integer> getNewsFeed(int userId)\` — Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.\n- \`void follow(int followerId, int followeeId)\` — The user with ID \`followerId\` started following the user with ID \`followeeId\`.\n- \`void unfollow(int followerId, int followeeId)\` — The user with ID \`followerId\` started unfollowing the user with ID \`followeeId\`.\n\nTests call the methods as an operations list with expected outputs.`,
    examples: [
      {
        ops: ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"],
        args: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
        output: [null, null, [5], null, null, [6, 5], null, [5]],
      },
    ],
    constraints: ["1 <= userId, followerId, followeeId <= 500", "0 <= tweetId <= 10^4", "All the tweets have unique IDs.", "At most 3 * 10^4 calls will be made to postTweet, getNewsFeed, follow, and unfollow."],
    starter: {
      python: `from typing import List\n\n\nclass Twitter:\n    def __init__(self):\n        pass\n\n    def postTweet(self, userId: int, tweetId: int) -> None:\n        pass\n\n    def getNewsFeed(self, userId: int) -> List[int]:\n        pass\n\n    def follow(self, followerId: int, followeeId: int) -> None:\n        pass\n\n    def unfollow(self, followerId: int, followeeId: int) -> None:\n        pass\n`,
      javascript: `class Twitter {\n    constructor() {\n        \n    }\n    \n    postTweet(userId, tweetId) {\n        \n    }\n    \n    getNewsFeed(userId) {\n        \n    }\n    \n    follow(followerId, followeeId) {\n        \n    }\n    \n    unfollow(followerId, followeeId) {\n        \n    }\n}`,
      typescript: `class Twitter {\n    constructor() {\n        \n    }\n    \n    postTweet(userId: number, tweetId: number): void {\n        \n    }\n    \n    getNewsFeed(userId: number): number[] {\n        \n    }\n    \n    follow(followerId: number, followeeId: number): void {\n        \n    }\n    \n    unfollow(followerId: number, followeeId: number): void {\n        \n    }\n}`,
      java: `class Twitter {\n    public Twitter() {\n        \n    }\n    \n    public void postTweet(int userId, int tweetId) {\n        \n    }\n    \n    public List<Integer> getNewsFeed(int userId) {\n        \n    }\n    \n    public void follow(int followerId, int followeeId) {\n        \n    }\n    \n    public void unfollow(int followerId, int followeeId) {\n        \n    }\n}`,
      cpp: `class Twitter {\npublic:\n    Twitter() {\n        \n    }\n    \n    void postTweet(int userId, int tweetId) {\n        \n    }\n    \n    vector<int> getNewsFeed(int userId) {\n        \n    }\n    \n    void follow(int followerId, int followeeId) {\n        \n    }\n    \n    void unfollow(int followerId, int followeeId) {\n        \n    }\n};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "int[]",
    compare: "exact",
    classSpec: {
      className: "Twitter",
      ops: [
        { name: "Twitter", argTypes: [], ret: "void" },
        { name: "postTweet", argTypes: ["int", "int"], ret: "void" },
        { name: "getNewsFeed", argTypes: ["int"], ret: "value" },
        { name: "follow", argTypes: ["int", "int"], ret: "void" },
        { name: "unfollow", argTypes: ["int", "int"], ret: "void" },
      ],
    },
    visibleTests: [
      {
        ops: ["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"],
        args: [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]],
        output: [null, null, [5], null, null, [6, 5], null, [5]],
      },
    ],
    hiddenTests: [
      {
        ops: ["Twitter", "postTweet", "postTweet", "getNewsFeed", "getNewsFeed", "follow", "getNewsFeed"],
        args: [[], [1, 1], [1, 2], [1], [2], [1, 2], [1]],
        output: [null, null, null, [2, 1], [], null, [2, 1]],
      },
      {
        ops: ["Twitter", "follow", "follow", "getNewsFeed", "postTweet", "getNewsFeed", "unfollow", "unfollow", "getNewsFeed"],
        args: [[], [1, 2], [1, 3], [1], [2, 10], [1], [1, 2], [1, 3], [1]],
        output: [null, null, null, [], null, [10], null, null, []],
      },
      {
        ops: ["Twitter", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "postTweet", "getNewsFeed"],
        args: [[], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6], [1, 7], [1, 8], [1, 9], [1, 10], [1, 11], [1, 12], [1]],
        output: [null, null, null, null, null, null, null, null, null, null, null, null, null, [12, 11, 10, 9, 8, 7, 6, 5, 4, 3]],
      },
    ],
    editorial: {
      approach: `Keep per-user tweet lists tagged with a global, ever-increasing counter (so recency is comparable across users) and a follow graph (sets of followees).\n\nFor \`getNewsFeed\`, merge the most recent tweets from the user and all followees with a max-heap, popping until 10 are collected — or simpler, gather each source's latest tweets, sort by the global counter, and take the top 10.\n\npostTweet/follow/unfollow are O(1); getNewsFeed is O(k log k) over the followed users' recent tweets.`,
      complexity: { time: "getNewsFeed O(k log k)", space: "O(total tweets)" },
      code: {
        python: `import heapq
from collections import defaultdict


class Twitter:
    def __init__(self):
        self.time = 0
        self.tweets = defaultdict(list)
        self.following = defaultdict(set)

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweets[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        users = self.following[userId] | {userId}
        recent = []
        for u in users:
            recent.extend(self.tweets[u][-10:])
        recent.sort(reverse=True)
        return [tweet for _, tweet in recent[:10]]

    def follow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.following[followerId].discard(followeeId)`,
        javascript: `class Twitter {
    constructor() {
        this.time = 0;
        this.tweets = new Map();
        this.following = new Map();
    }

    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) this.tweets.set(userId, []);
        this.tweets.get(userId).push([this.time++, tweetId]);
    }

    getNewsFeed(userId) {
        const users = new Set(this.following.get(userId) || []);
        users.add(userId);
        const recent = [];
        for (const u of users) {
            const list = this.tweets.get(u) || [];
            recent.push(...list.slice(-10));
        }
        recent.sort((a, b) => b[0] - a[0]);
        return recent.slice(0, 10).map(([, tweet]) => tweet);
    }

    follow(followerId, followeeId) {
        if (!this.following.has(followerId)) this.following.set(followerId, new Set());
        this.following.get(followerId).add(followeeId);
    }

    unfollow(followerId, followeeId) {
        if (this.following.has(followerId)) this.following.get(followerId).delete(followeeId);
    }
}`,
        typescript: `class Twitter {
    private time = 0;
    private tweets = new Map<number, [number, number][]>();
    private following = new Map<number, Set<number>>();

    postTweet(userId: number, tweetId: number): void {
        if (!this.tweets.has(userId)) this.tweets.set(userId, []);
        this.tweets.get(userId)!.push([this.time++, tweetId]);
    }

    getNewsFeed(userId: number): number[] {
        const users = new Set(this.following.get(userId) || []);
        users.add(userId);
        const recent: [number, number][] = [];
        for (const u of users) {
            recent.push(...(this.tweets.get(u) || []).slice(-10));
        }
        recent.sort((a, b) => b[0] - a[0]);
        return recent.slice(0, 10).map(([, tweet]) => tweet);
    }

    follow(followerId: number, followeeId: number): void {
        if (!this.following.has(followerId)) this.following.set(followerId, new Set());
        this.following.get(followerId)!.add(followeeId);
    }

    unfollow(followerId: number, followeeId: number): void {
        this.following.get(followerId)?.delete(followeeId);
    }
}`,

        java: `class Twitter {
    private int time = 0;
    private Map<Integer, Set<Integer>> following = new HashMap<>();
    private Map<Integer, List<int[]>> tweets = new HashMap<>();

    public Twitter() {
    }

    public void postTweet(int userId, int tweetId) {
        tweets.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{time++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        Set<Integer> users = new HashSet<>(following.getOrDefault(userId, Collections.emptySet()));
        users.add(userId);
        for (int u : users) {
            List<int[]> list = tweets.get(u);
            if (list == null) continue;
            for (int i = list.size() - 1; i >= Math.max(0, list.size() - 10); i--) {
                heap.add(list.get(i));
                if (heap.size() > 10) heap.poll();
            }
        }
        List<int[]> top = new ArrayList<>(heap);
        top.sort((a, b) -> b[0] - a[0]);
        List<Integer> res = new ArrayList<>();
        for (int[] t : top) res.add(t[1]);
        return res;
    }

    public void follow(int followerId, int followeeId) {
        following.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        Set<Integer> set = following.get(followerId);
        if (set != null) set.remove(followeeId);
    }
}`,
        cpp: `class Twitter {
public:
    int time = 0;
    unordered_map<int, unordered_set<int>> following;
    unordered_map<int, vector<pair<int,int>>> tweets;

    Twitter() {
    }

    void postTweet(int userId, int tweetId) {
        tweets[userId].push_back({time++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        auto cmp = [](const pair<int,int>& a, const pair<int,int>& b) { return a.first > b.first; };
        priority_queue<pair<int,int>, vector<pair<int,int>>, decltype(cmp)> heap(cmp);
        unordered_set<int> users = following[userId];
        users.insert(userId);
        for (int u : users) {
            auto& list = tweets[u];
            for (int i = (int)list.size() - 1; i >= max(0, (int)list.size() - 10); i--) {
                heap.push(list[i]);
                if ((int)heap.size() > 10) heap.pop();
            }
        }
        vector<pair<int,int>> top;
        while (!heap.empty()) {
            top.push_back(heap.top());
            heap.pop();
        }
        sort(top.begin(), top.end(), [](const pair<int,int>& a, const pair<int,int>& b) { return a.first > b.first; });
        vector<int> res;
        for (auto& t : top) res.push_back(t.second);
        return res;
    }

    void follow(int followerId, int followeeId) {
        following[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        following[followerId].erase(followeeId);
    }
};`,      },
    },
  },
  {
    slug: "find-median-from-data-stream",
    title: "Find Median from Data Stream",
    difficulty: "Hard",
    category: "heap-priority-queue",
    topics: ["Heap", "Design"],
    order: 7,
    description: `The **median** is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.\n\nImplement the \`MedianFinder\` class:\n- \`MedianFinder()\` — Initializes the object.\n- \`void addNum(int num)\` — Adds the integer \`num\` from the data stream to the data structure.\n- \`double findMedian()\` — Returns the median of all elements so far.\n\nTests call the methods as an operations list with expected outputs.`,
    examples: [
      {
        ops: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
        args: [[], [1], [2], [], [3], []],
        output: [null, null, null, 1.5, null, 2.0],
      },
    ],
    constraints: ["-10^5 <= num <= 10^5", "There will be at least one element in the data structure before calling findMedian.", "At most 5 * 10^4 calls will be made to addNum and findMedian."],
    starter: {
      python: `class MedianFinder:\n    def __init__(self):\n        pass\n\n    def addNum(self, num: int) -> None:\n        pass\n\n    def findMedian(self) -> float:\n        pass\n`,
      javascript: `class MedianFinder {\n    constructor() {\n        \n    }\n    \n    addNum(num) {\n        \n    }\n    \n    findMedian() {\n        \n    }\n}`,
      typescript: `class MedianFinder {\n    constructor() {\n        \n    }\n    \n    addNum(num: number): void {\n        \n    }\n    \n    findMedian(): number {\n        \n    }\n}`,
      java: `class MedianFinder {\n    public MedianFinder() {\n        \n    }\n    \n    public void addNum(int num) {\n        \n    }\n    \n    public double findMedian() {\n        \n    }\n}`,
      cpp: `class MedianFinder {\npublic:\n    MedianFinder() {\n        \n    }\n    \n    void addNum(int num) {\n        \n    }\n    \n    double findMedian() {\n        \n    }\n};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "double",
    compare: "exact",
    classSpec: {
      className: "MedianFinder",
      ops: [
        { name: "MedianFinder", argTypes: [], ret: "void" },
        { name: "addNum", argTypes: ["int"], ret: "void" },
        { name: "findMedian", argTypes: [], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
        args: [[], [1], [2], [], [3], []],
        output: [null, null, null, 1.5, null, 2.0],
      },
    ],
    hiddenTests: [
      {
        ops: ["MedianFinder", "addNum", "findMedian", "addNum", "findMedian", "addNum", "findMedian"],
        args: [[], [1], [], [2], [], [3], []],
        output: [null, null, 1.0, null, 1.5, null, 2.0],
      },
      {
        ops: ["MedianFinder", "addNum", "addNum", "addNum", "findMedian", "addNum", "findMedian"],
        args: [[], [-1], [-2], [-3], [], [-4], []],
        output: [null, null, null, null, -2.0, null, -2.5],
      },
      {
        ops: ["MedianFinder", "addNum", "addNum", "addNum", "addNum", "findMedian"],
        args: [[], [5], [5], [5], [5], []],
        output: [null, null, null, null, null, 5.0],
      },
    ],
    editorial: {
      approach: `Maintain two heaps: a **max-heap** for the smaller half and a **min-heap** for the larger half, with sizes differing by at most one.\n\n\`addNum\`: push into the max-heap, then rebalance so the min-heap holds the larger elements (push the max-heap's top into the min-heap and pop it; if the min-heap grew too large, move its top back).\n\n\`findMedian\`: if sizes are equal, the median is the average of both tops; otherwise it is the top of the larger heap. Each addNum is O(log n).`,
      complexity: { time: "addNum O(log n); findMedian O(1)", space: "O(n)" },
      code: {
        python: `import heapq


class MedianFinder:
    def __init__(self):
        self.small = []
        self.large = []

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2`,
        javascript: `class MedianFinder {
    constructor() {
        this.small = new MaxHeap();
        this.large = new MinHeap();
    }

    addNum(num) {
        this.small.push(num);
        this.large.push(this.small.pop());
        if (this.large.size() > this.small.size()) {
            this.small.push(this.large.pop());
        }
    }

    findMedian() {
        if (this.small.size() > this.large.size()) return this.small.peek();
        return (this.small.peek() + this.large.peek()) / 2;
    }
}

class MaxHeap {
    constructor() { this.data = []; }
    size() { return this.data.length; }
    peek() { return this.data[0]; }
    push(v) {
        this.data.push(v);
        let i = this.data.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.data[p] >= this.data[i]) break;
            [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
            i = p;
        }
    }
    pop() {
        const top = this.data[0];
        const last = this.data.pop();
        if (this.data.length) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = 2 * i + 2;
                let m = i;
                if (l < this.data.length && this.data[l] > this.data[m]) m = l;
                if (r < this.data.length && this.data[r] > this.data[m]) m = r;
                if (m === i) break;
                [this.data[m], this.data[i]] = [this.data[i], this.data[m]];
                i = m;
            }
        }
        return top;
    }
}

class MinHeap {
    constructor() { this.data = []; }
    size() { return this.data.length; }
    peek() { return this.data[0]; }
    push(v) {
        this.data.push(v);
        let i = this.data.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.data[p] <= this.data[i]) break;
            [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
            i = p;
        }
    }
    pop() {
        const top = this.data[0];
        const last = this.data.pop();
        if (this.data.length) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = 2 * i + 2;
                let m = i;
                if (l < this.data.length && this.data[l] < this.data[m]) m = l;
                if (r < this.data.length && this.data[r] < this.data[m]) m = r;
                if (m === i) break;
                [this.data[m], this.data[i]] = [this.data[i], this.data[m]];
                i = m;
            }
        }
        return top;
    }
}`,
        typescript: `class MedianFinder {
    private small = new MaxHeap();
    private large = new MinHeap();

    addNum(num: number): void {
        this.small.push(num);
        this.large.push(this.small.pop()!);
        if (this.large.size() > this.small.size()) {
            this.small.push(this.large.pop()!);
        }
    }

    findMedian(): number {
        if (this.small.size() > this.large.size()) return this.small.peek()!;
        return (this.small.peek()! + this.large.peek()!) / 2;
    }
}

class MaxHeap {
    data: number[] = [];
    size() { return this.data.length; }
    peek() { return this.data[0]; }
    push(v: number) {
        this.data.push(v);
        let i = this.data.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.data[p]! >= this.data[i]!) break;
            [this.data[p], this.data[i]] = [this.data[i]!, this.data[p]!];
            i = p;
        }
    }
    pop(): number | undefined {
        const top = this.data[0];
        const last = this.data.pop();
        if (this.data.length && last !== undefined) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = 2 * i + 2;
                let m = i;
                if (l < this.data.length && this.data[l]! > this.data[m]!) m = l;
                if (r < this.data.length && this.data[r]! > this.data[m]!) m = r;
                if (m === i) break;
                [this.data[m], this.data[i]] = [this.data[i]!, this.data[m]!];
                i = m;
            }
        }
        return top;
    }
}

class MinHeap {
    data: number[] = [];
    size() { return this.data.length; }
    peek() { return this.data[0]; }
    push(v: number) {
        this.data.push(v);
        let i = this.data.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.data[p]! <= this.data[i]!) break;
            [this.data[p], this.data[i]] = [this.data[i]!, this.data[p]!];
            i = p;
        }
    }
    pop(): number | undefined {
        const top = this.data[0];
        const last = this.data.pop();
        if (this.data.length && last !== undefined) {
            this.data[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = 2 * i + 2;
                let m = i;
                if (l < this.data.length && this.data[l]! < this.data[m]!) m = l;
                if (r < this.data.length && this.data[r]! < this.data[m]!) m = r;
                if (m === i) break;
                [this.data[m], this.data[i]] = [this.data[i]!, this.data[m]!];
                i = m;
            }
        }
        return top;
    }
}`,

        java: `class MedianFinder {
    private PriorityQueue<Integer> lo = new PriorityQueue<>(Collections.reverseOrder());
    private PriorityQueue<Integer> hi = new PriorityQueue<>();

    public MedianFinder() {
    }

    public void addNum(int num) {
        lo.add(num);
        hi.add(lo.poll());
        if (hi.size() > lo.size()) lo.add(hi.poll());
    }

    public double findMedian() {
        if (lo.size() > hi.size()) return lo.peek();
        return (lo.peek() + hi.peek()) / 2.0;
    }
}`,
        cpp: `class MedianFinder {
public:
    priority_queue<int> lo;
    priority_queue<int, vector<int>, greater<int>> hi;

    MedianFinder() {
    }

    void addNum(int num) {
        lo.push(num);
        hi.push(lo.top());
        lo.pop();
        if (hi.size() > lo.size()) {
            lo.push(hi.top());
            hi.pop();
        }
    }

    double findMedian() {
        if (lo.size() > hi.size()) return lo.top();
        return (lo.top() + hi.top()) / 2.0;
    }
};`,      },
    },
  },
];
