import type { Problem } from "@/lib/types";

export const heapProblems: Problem[] = [
  {
    slug: "kth-largest-element-in-a-stream",
    title: "Kth Largest Element in a Stream",
    difficulty: "Easy",
    category: "heap-priority-queue",
    topics: ["Heap", "Design"],
    order: 1,
    description: `Design a class to find the \`kth\` largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Implement the \`KthLargest\` class:
- \`KthLargest(int k, int[] nums)\` — Initializes the object with the integer \`k\` and the stream of integers \`nums\`.
- \`int add(int val)\` — Appends the integer \`val\` to the stream and returns the element representing the kth largest element in the stream.

Tests call the methods as an operations list.`,
    examples: [
      {
        ops: ["KthLargest", "add", "add", "add", "add", "add"],
        args: [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
        output: [null, 4, 5, 5, 8, 8],
      },
    ],
    constraints: ["1 <= k <= 10^4", "0 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4", "-10^4 <= val <= 10^4", "At most 10^4 calls will be made to add.", "It is guaranteed that there will be at least k elements in the array when you search for the kth element."],
    starter: {
      python: `from typing import List


class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        pass

    def add(self, val: int) -> int:
        pass
`,
      javascript: `class KthLargest {
    constructor(k, nums) {
        
    }
    
    add(val) {
        
    }
}`,
      typescript: `class KthLargest {
    constructor(k: number, nums: number[]) {
        
    }
    
    add(val: number): number {
        
    }
}`,
      java: `class KthLargest {
    public KthLargest(int k, int[] nums) {
        
    }
    
    public int add(int val) {
        
    }
}`,
      cpp: `class KthLargest {
public:
    KthLargest(int k, vector<int>& nums) {
        
    }
    
    int add(int val) {
        
    }
};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "int",
    compare: "exact",
    classSpec: {
      className: "KthLargest",
      ops: [
        { name: "KthLargest", argTypes: ["int", "int[]"], ret: "void" },
        { name: "add", argTypes: ["int"], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["KthLargest", "add", "add", "add", "add", "add"],
        args: [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]],
        output: [null, 4, 5, 5, 8, 8],
      },
    ],
    hiddenTests: [
      {
        ops: ["KthLargest", "add", "add", "add", "add"],
        args: [[1, []], [-3], [-2], [-4], [0]],
        output: [null, -3, -2, -2, 0],
      },
      {
        ops: ["KthLargest", "add", "add", "add", "add", "add", "add"],
        args: [[2, [0, -1]], [-2], [-3], [1], [2], [5], [10]],
        output: [null, -1, -1, 0, 1, 2, 5],
      },
      {
        ops: ["KthLargest", "add", "add", "add", "add", "add"],
        args: [[3, [10, 1, 2, 3, 4, 5]], [6], [7], [8], [9], [0]],
        output: [null, 5, 6, 7, 8, 8],
      },
    ],
    editorial: {
      approach: `Keep a **min-heap of exactly size k**. After seeding it with the initial stream, the heap's top is always the kth largest: any larger element would have pushed a smaller one out, and any smaller element never makes the top.

\`add\` pushes the new value and, if the heap exceeds size k, pops the minimum — O(log k) per call.`,
      complexity: { time: "O(n log k + m log k)", space: "O(k)" },
      code: {
        python: `import heapq


class KthLargest:
    def __init__(self, k: int, nums: List[int]):
        self.k = k
        self.heap = []
        for num in nums:
            heapq.heappush(self.heap, num)
            if len(self.heap) > k:
                heapq.heappop(self.heap)

    def add(self, val: int) -> int:
        heapq.heappush(self.heap, val)
        if len(self.heap) > self.k:
            heapq.heappop(self.heap)
        return self.heap[0]`,
        javascript: `class KthLargest {
    constructor(k, nums) {
        this.k = k;
        this.heap = new MinHeap();
        for (const num of nums) {
            this.heap.push(num);
            if (this.heap.size() > k) this.heap.pop();
        }
    }

    add(val) {
        this.heap.push(val);
        if (this.heap.size() > this.k) this.heap.pop();
        return this.heap.peek();
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
        typescript: `class KthLargest {
    private k: number;
    private heap: number[] = [];

    constructor(k: number, nums: number[]) {
        this.k = k;
        for (const num of nums) this._push(num);
        while (this.heap.length > k) this._pop();
    }

    add(val: number): number {
        this._push(val);
        if (this.heap.length > this.k) this._pop();
        return this.heap[0];
    }

    private _push(v: number): void {
        this.heap.push(v);
        let i = this.heap.length - 1;
        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            if (this.heap[p]! <= this.heap[i]!) break;
            [this.heap[p], this.heap[i]] = [this.heap[i]!, this.heap[p]!];
            i = p;
        }
    }

    private _pop(): number {
        const top = this.heap[0]!;
        const last = this.heap.pop()!;
        if (this.heap.length) {
            this.heap[0] = last;
            let i = 0;
            while (true) {
                const l = 2 * i + 1, r = 2 * i + 2;
                let m = i;
                if (l < this.heap.length && this.heap[l]! < this.heap[m]!) m = l;
                if (r < this.heap.length && this.heap[r]! < this.heap[m]!) m = r;
                if (m === i) break;
                [this.heap[m], this.heap[i]] = [this.heap[i]!, this.heap[m]!];
                i = m;
            }
        }
        return top;
    }
}`,

        java: `class KthLargest {
    private PriorityQueue<Integer> heap = new PriorityQueue<>();
    private int k;

    public KthLargest(int k, int[] nums) {
        this.k = k;
        for (int n : nums) add(n);
    }

    public int add(int val) {
        heap.add(val);
        if (heap.size() > k) heap.poll();
        return heap.peek();
    }
}`,
        cpp: `class KthLargest {
public:
    priority_queue<int, vector<int>, greater<int>> heap;
    int k;

    KthLargest(int k, vector<int> nums) : k(k) {
        for (int n : nums) add(n);
    }

    int add(int val) {
        heap.push(val);
        if ((int)heap.size() > k) heap.pop();
        return heap.top();
    }
};`,      },
    },
  },
  {
    slug: "last-stone-weight",
    title: "Last Stone Weight",
    difficulty: "Easy",
    category: "heap-priority-queue",
    topics: ["Heap", "Array"],
    order: 2,
    description: `You are given an array of integers \`stones\` where \`stones[i]\` is the weight of the i-th stone.

We are playing a game with the stones. On each turn, we choose the **heaviest two stones** and smash them together:
- If \`x == y\`, both stones are destroyed.
- If \`x != y\`, the stone of weight \`x\` is destroyed, and the stone of weight \`y\` has new weight \`y - x\`.

At the end of the game, there is **at most one** stone left. Return the weight of the last remaining stone. If there are no stones left, return \`0\`.`,
    examples: [
      { args: [[2, 7, 4, 1, 8, 1]], output: 1, explain: "7 and 8 smash to 1; then 2 and 4 smash to 2; then 1 and 2 smash to 1; the last stone weighs 1." },
      { args: [[1]], output: 1 },
    ],
    constraints: ["1 <= stones.length <= 30", "1 <= stones[i] <= 1000"],
    starter: {
      python: `from typing import List


def lastStoneWeight(stones: List[int]) -> int:
    pass
`,
      javascript: `function lastStoneWeight(stones) {
    
}`,
      typescript: `function lastStoneWeight(stones: number[]): number {
    
}`,
      java: `class Solution {
    public int lastStoneWeight(int[] stones) {
        
    }
}`,
      cpp: `class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        
    }
};`,
    },
    methodName: "lastStoneWeight",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[2, 7, 4, 1, 8, 1]], output: 1 },
      { args: [[1]], output: 1 },
    ],
    hiddenTests: [
      { args: [[2, 2]], output: 0 },
      { args: [[1, 3]], output: 2 },
      { args: [[10, 4, 2, 10]], output: 2 },
      { args: [[5, 5, 5, 5]], output: 0 },
      { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9]], output: 1 },
    ],
    editorial: {
      approach: `Repeatedly extracting the two heaviest stones is exactly what a **max-heap** is for. Push all stones, then loop: pop the two largest, push their difference if non-zero, and continue. The heap empties to 0 or a single value.

Each operation is O(log n), giving O(n log n) total.`,
      complexity: { time: "O(n log n)", space: "O(n)" },
      code: {
        python: `import heapq


def lastStoneWeight(stones: List[int]) -> int:
    heap = [-s for s in stones]
    heapq.heapify(heap)
    while len(heap) > 1:
        a = -heapq.heappop(heap)
        b = -heapq.heappop(heap)
        if a != b:
            heapq.heappush(heap, -(a - b))
    return -heap[0] if heap else 0`,
        javascript: `function lastStoneWeight(stones) {
  const arr = [...stones];
  while (arr.length > 1) {
    arr.sort((a, b) => b - a);
    const a = arr.shift(), b = arr.shift();
    if (a !== b) arr.push(a - b);
  }
  return arr.length ? arr[0] : 0;
}`,
        typescript: `function lastStoneWeight(stones: number[]): number {
  const arr = [...stones];
  while (arr.length > 1) {
    arr.sort((a, b) => b - a);
    const a = arr.shift()!, b = arr.shift()!;
    if (a !== b) arr.push(a - b);
  }
  return arr.length ? arr[0]! : 0;
}`,

        java: `class Solution {
    public int lastStoneWeight(int[] stones) {
        PriorityQueue<Integer> heap = new PriorityQueue<>(Collections.reverseOrder());
        for (int s : stones) heap.add(s);
        while (heap.size() > 1) {
            int a = heap.poll(), b = heap.poll();
            if (a != b) heap.add(a - b);
        }
        return heap.isEmpty() ? 0 : heap.peek();
    }
}`,
        cpp: `class Solution {
public:
    int lastStoneWeight(vector<int>& stones) {
        priority_queue<int> heap(stones.begin(), stones.end());
        while (heap.size() > 1) {
            int a = heap.top(); heap.pop();
            int b = heap.top(); heap.pop();
            if (a != b) heap.push(a - b);
        }
        return heap.empty() ? 0 : heap.top();
    }
};`,      },
    },
  },
  {
    slug: "k-closest-points-to-origin",
    title: "K Closest Points to Origin",
    difficulty: "Medium",
    category: "heap-priority-queue",
    topics: ["Heap", "Array", "Math"],
    order: 3,
    description: `Given an array of \`points\` where \`points[i] = [x_i, y_i]\` represents a point on the X-Y plane and an integer \`k\`, return the \`k\` closest points to the origin \`(0, 0)\`.

The distance between two points on the X-Y plane is the Euclidean distance \`sqrt((x1 - x2)^2 + (y1 - y2)^2)\`. You may return the answer in **any order**.`,
    examples: [
      { args: [[[1, 3], [-2, 2]], 1], output: [[-2, 2]] },
      { args: [[[3, 3], [5, -1], [-2, 4]], 2], output: [[3, 3], [-2, 4]] },
    ],
    constraints: ["1 <= k <= points.length <= 10^4", "-10^4 <= x_i, y_i <= 10^4"],
    starter: {
      python: `from typing import List


def kClosest(points: List[List[int]], k: int) -> List[List[int]]:
    pass
`,
      javascript: `function kClosest(points, k) {
    
}`,
      typescript: `function kClosest(points: number[][], k: number): number[][] {
    
}`,
      java: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        
    }
};`,
    },
    methodName: "kClosest",
    argTypes: ["int[][]", "int"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [[[1, 3], [-2, 2]], 1], output: [[-2, 2]] },
      { args: [[[3, 3], [5, -1], [-2, 4]], 2], output: [[3, 3], [-2, 4]] },
    ],
    hiddenTests: [
      { args: [[[0, 0]], 1], output: [[0, 0]] },
      { args: [[[1, 1], [2, 2], [3, 3], [4, 4]], 2], output: [[1, 1], [2, 2]] },
      { args: [[[1, 2], [-2, -2], [3, 1], [0, 3]], 3], output: [[1, 2], [-2, -2], [0, 3]] },
      { args: [[[2, 3], [1, 1], [0, 1], [5, 5]], 3], output: [[1, 1], [0, 1], [2, 3]] },
    ],
    editorial: {
      approach: `The squared distance \`x^2 + y^2\` preserves ordering without square roots. Push (squared distance, point) pairs into a **max-heap of size k**: when the heap exceeds k, evict the farthest. The heap then holds the k closest points.

Total cost is O(n log k).`,
      complexity: { time: "O(n log k)", space: "O(k)" },
      code: {
        python: `import heapq


def kClosest(points: List[List[int]], k: int) -> List[List[int]]:
    heap = []
    for x, y in points:
        dist = x * x + y * y
        heapq.heappush(heap, (-dist, x, y))
        if len(heap) > k:
            heapq.heappop(heap)
    return [[x, y] for _, x, y in heap]`,
        javascript: `function kClosest(points, k) {
  return points
    .map((p) => [p[0] * p[0] + p[1] * p[1], p])
    .sort((a, b) => a[0] - b[0])
    .slice(0, k)
    .map(([, p]) => p);
}`,
        typescript: `function kClosest(points: number[][], k: number): number[][] {
  return points
    .map((p) => [p[0]! * p[0]! + p[1]! * p[1]!, p])
    .sort((a, b) => a[0]! - b[0]!)
    .slice(0, k)
    .map(([, p]) => p);
}`,

        java: `class Solution {
    public int[][] kClosest(int[][] points, int k) {
        Arrays.sort(points, (a, b) ->
            (a[0] * a[0] + a[1] * a[1]) - (b[0] * b[0] + b[1] * b[1]));
        return Arrays.copyOfRange(points, 0, k);
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        nth_element(points.begin(), points.begin() + k, points.end(),
            [](const vector<int>& a, const vector<int>& b) {
                return a[0]*a[0] + a[1]*a[1] < b[0]*b[0] + b[1]*b[1];
            });
        points.resize(k);
        return points;
    }
};`,      },
    },
  },
];
