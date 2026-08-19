import type { Problem } from "@/lib/types";

export const advancedGraphsExtra: Problem[] = [
  {
    slug: "reconstruct-itinerary",
    title: "Reconstruct Itinerary",
    difficulty: "Hard",
    category: "advanced-graphs",
    topics: ["Graph", "DFS", "Eulerian Path"],
    order: 1,
    description: `You are given a list of airline \`tickets\` where \`tickets[i] = [from_i, to_i]\` represent the departure and the arrival airports of one flight. Reconstruct the itinerary in order and return it.
\nAll of the tickets belong to a man who departs from \`"JFK"\`, thus, the itinerary must begin with \`"JFK"\`. If there are multiple valid itineraries, you should return the itinerary that has the smallest **lexical order** when read as a single string.\n\n- For example, the itinerary \`["JFK", "LGA"]\` has a smaller lexical order than \`["JFK", "LGB"]\`.\n\nYou may assume all tickets form at least one valid itinerary. You must use all the tickets once and only once.`,
    examples: [
      {
        args: [
          [
            ["MUC", "LHR"],
            ["JFK", "MUC"],
            ["SFO", "SJC"],
            ["LHR", "SFO"],
          ],
        ],
        output: ["JFK", "MUC", "LHR", "SFO", "SJC"],
      },
      {
        args: [
          [
            ["JFK", "SFO"],
            ["JFK", "ATL"],
            ["SFO", "ATL"],
            ["ATL", "JFK"],
            ["ATL", "SFO"],
          ],
        ],
        output: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
      },
    ],
    constraints: ["1 <= tickets.length <= 300", "tickets[i].length == 2", "from_i.length == 3", "to_i.length == 3", "from_i and to_i consist of uppercase English letters.", "from_i != to_i"],
    starter: {
      python: `from typing import List\n\n\ndef findItinerary(tickets: List[List[str]]) -> List[str]:\n    pass\n`,
      javascript: `function findItinerary(tickets) {\n    \n}`,
      typescript: `function findItinerary(tickets: string[][]): string[] {\n    \n}`,
      java: `class Solution {\n    public String[] findItinerary(String[][] tickets) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<string> findItinerary(vector<vector<string>>& tickets) {\n        \n    }\n};`,
      dart: `class Solution {
  List<String> findItinerary(List<String>[] tickets) {
    
  }
}`,
    },
    methodName: "findItinerary",
    argTypes: ["string[][]"],
    outputType: "string[]",
    compare: "exact",
    visibleTests: [
      {
        args: [
          [
            ["MUC", "LHR"],
            ["JFK", "MUC"],
            ["SFO", "SJC"],
            ["LHR", "SFO"],
          ],
        ],
        output: ["JFK", "MUC", "LHR", "SFO", "SJC"],
      },
      {
        args: [
          [
            ["JFK", "SFO"],
            ["JFK", "ATL"],
            ["SFO", "ATL"],
            ["ATL", "JFK"],
            ["ATL", "SFO"],
          ],
        ],
        output: ["JFK", "ATL", "JFK", "SFO", "ATL", "SFO"],
      },
    ],
    hiddenTests: [
      {
        args: [
          [
            ["JFK", "KUL"],
            ["JFK", "NRT"],
            ["NRT", "JFK"],
          ],
        ],
        output: ["JFK", "NRT", "JFK", "KUL"],
      },
      {
        args: [
          [
            ["JFK", "ATL"],
            ["ATL", "JFK"],
          ],
        ],
        output: ["JFK", "ATL", "JFK"],
      },
      {
        args: [
          [
            ["JFK", "AXA"],
            ["AXA", "TIA"],
            ["TIA", "JFK"],
            ["JFK", "AXA"],
            ["AXA", "EZE"],
            ["EZE", "TIA"],
            ["TIA", "AUA"],
            ["AUA", "AXA"],
          ],
        ],
        output: ["JFK", "AXA", "EZE", "TIA", "AUA", "AXA", "TIA", "JFK", "AXA"],
      },
      {
        args: [
          [
            ["JFK", "AAA"],
            ["JFK", "BBB"],
            ["BBB", "JFK"],
          ],
        ],
        output: ["JFK", "BBB", "JFK", "AAA"],
      },
    ],
    editorial: {
      approach: `Hierholzer's algorithm: build an adjacency list where each airport's destinations are kept sorted (use a min-heap or sort in reverse and pop from the end). Run a DFS from \`"JFK"\` consuming edges; because we always take the lexicographically smallest remaining edge, the first path that runs out of edges is the correct Eulerian path. Append airports post-order and reverse at the end.\n\nO(E log E) time (sorting), O(E) space.`,
      complexity: { time: "O(E log E)", space: "O(E)" },
      code: {
        python: `def findItinerary(tickets: List[List[str]]) -> List[str]:
    adj = {}
    for frm, to in tickets:
        adj.setdefault(frm, []).append(to)
    for frm in adj:
        adj[frm].sort(reverse=True)
    result = []

    def dfs(airport: str) -> None:
        while adj.get(airport):
            dfs(adj[airport].pop())
        result.append(airport)

    dfs("JFK")
    return result[::-1]`,
        javascript: `function findItinerary(tickets) {
  const adj = {};
  for (const [from, to] of tickets) {
    (adj[from] ||= []).push(to);
  }
  for (const key of Object.keys(adj)) adj[key].sort().reverse();
  const result = [];
  const dfs = (airport) => {
    const dests = adj[airport];
    while (dests && dests.length) dfs(dests.pop());
    result.push(airport);
  };
  dfs("JFK");
  return result.reverse();
}`,
        typescript: `function findItinerary(tickets: string[][]): string[] {
  const adj: Record<string, string[]> = {};
  for (const [from, to] of tickets) {
    (adj[from] ||= []).push(to);
  }
  for (const key of Object.keys(adj)) adj[key]!.sort().reverse();
  const result: string[] = [];
  const dfs = (airport: string): void => {
    const dests = adj[airport];
    while (dests && dests.length) dfs(dests.pop()!);
    result.push(airport);
  };
  dfs("JFK");
  return result.reverse();
}`,

        java: `class Solution {
    public String[] findItinerary(String[][] tickets) {
        Map<String, PriorityQueue<String>> adj = new HashMap<>();
        for (String[] t : tickets) {
            adj.computeIfAbsent(t[0], k -> new PriorityQueue<>()).add(t[1]);
        }
        LinkedList<String> route = new LinkedList<>();
        dfs("JFK", adj, route);
        return route.toArray(new String[0]);
    }

    private void dfs(String airport, Map<String, PriorityQueue<String>> adj, LinkedList<String> route) {
        PriorityQueue<String> next = adj.get(airport);
        while (next != null && !next.isEmpty()) {
            dfs(next.poll(), adj, route);
        }
        route.addFirst(airport);
    }
}`,
        cpp: `class Solution {
public:
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        unordered_map<string, priority_queue<string, vector<string>, greater<string>>> adj;
        for (auto& t : tickets) adj[t[0]].push(t[1]);
        vector<string> route;
        function<void(const string&)> dfs = [&](const string& airport) {
            auto& pq = adj[airport];
            while (!pq.empty()) {
                string nxt = pq.top();
                pq.pop();
                dfs(nxt);
            }
            route.push_back(airport);
        };
        dfs("JFK");
        reverse(route.begin(), route.end());
        return route;
    }
};`,      },
    },
  },
  {
    slug: "min-cost-to-connect-all-points",
    title: "Min Cost to Connect All Points",
    difficulty: "Medium",
    category: "advanced-graphs",
    topics: ["Array", "Graph", "Minimum Spanning Tree", "Heap"],
    order: 2,
    description: `You are given an array \`points\` representing integer coordinates of some points on a 2D plane, where \`points[i] = [x_i, y_i]\`.
\nThe cost of connecting two points \`[x_i, y_i]\` and \`[x_j, y_j]\` is the **Manhattan distance** between them: \`|x_i - x_j| + |y_i - y_j|\`.\n\nReturn the **minimum cost** to make all points connected. All points are connected if there is exactly one simple path between any two points.`,
    examples: [
      { args: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], output: 20 },
      { args: [[[3, 12], [-2, 5], [-4, 1]]], output: 18 },
    ],
    constraints: ["1 <= points.length <= 1000", "-10^6 <= x_i, y_i <= 10^6", "All pairs (x_i, y_i) are distinct."],
    starter: {
      python: `from typing import List\n\n\ndef minCostConnectPoints(points: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function minCostConnectPoints(points) {\n    \n}`,
      typescript: `function minCostConnectPoints(points: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int minCostConnectPoints(int[][] points) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int minCostConnectPoints(vector<vector<int>>& points) {\n        \n    }\n};`,
      dart: `class Solution {
  int minCostConnectPoints(List<List<int>> points) {
    
  }
}`,
    },
    methodName: "minCostConnectPoints",
    argTypes: ["int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]], output: 20 },
      { args: [[[3, 12], [-2, 5], [-4, 1]]], output: 18 },
    ],
    hiddenTests: [
      { args: [[[0, 0]]], output: 0 },
      { args: [[[0, 0], [1, 1], [1, 0], [-1, 1]]], output: 4 },
      { args: [[[0, 0], [1, 0], [2, 0], [3, 0]]], output: 3 },
      { args: [[[2, -3], [-17, -8], [13, 8], [-17, -15]]], output: 53 },
      { args: [[[0, 0], [0, 0]]], output: 0 },
    ],
    editorial: {
      approach: `Prim's algorithm with a min-heap: start at point 0 and repeatedly add the cheapest edge connecting an unvisited point to the growing tree, tracking the total cost. To avoid recomputing every distance, push each candidate edge onto the heap as it is discovered.\n\nO(n^2 log n) time with a heap over all point pairs, O(n) space.`,
      complexity: { time: "O(n^2 log n)", space: "O(n)" },
      code: {
        python: `def minCostConnectPoints(points: List[List[int]]) -> int:
    n = len(points)
    import heapq
    min_heap = [(0, 0)]  # (cost, point index)
    in_mst = [False] * n
    total = 0
    used = 0
    while used < n:
        cost, u = heapq.heappop(min_heap)
        if in_mst[u]:
            continue
        in_mst[u] = True
        total += cost
        used += 1
        for v in range(n):
            if not in_mst[v]:
                dist = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1])
                heapq.heappush(min_heap, (dist, v))
    return total`,
        javascript: `function minCostConnectPoints(points) {
  const n = points.length;
  const heap = [[0, 0]];
  const inMst = new Array(n).fill(false);
  let total = 0, used = 0;
  while (used < n) {
    heap.sort((a, b) => a[0] - b[0]);
    const [cost, u] = heap.shift();
    if (inMst[u]) continue;
    inMst[u] = true;
    total += cost;
    used++;
    for (let v = 0; v < n; v++) {
      if (!inMst[v]) {
        const dist = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
        heap.push([dist, v]);
      }
    }
  }
  return total;
}`,
        typescript: `function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  const heap: [number, number][] = [[0, 0]];
  const inMst = new Array<boolean>(n).fill(false);
  let total = 0, used = 0;
  while (used < n) {
    heap.sort((a, b) => a[0] - b[0]);
    const [cost, u] = heap.shift()!;
    if (inMst[u]) continue;
    inMst[u] = true;
    total += cost;
    used++;
    for (let v = 0; v < n; v++) {
      if (!inMst[v]) {
        const dist = Math.abs(points[u]![0]! - points[v]![0]!) + Math.abs(points[u]![1]! - points[v]![1]!);
        heap.push([dist, v]);
      }
    }
  }
  return total;
}`,

        java: `class Solution {
    public int minCostConnectPoints(int[][] points) {
        int n = points.length;
        boolean[] inMst = new boolean[n];
        int[] minDist = new int[n];
        Arrays.fill(minDist, Integer.MAX_VALUE);
        minDist[0] = 0;
        int total = 0;
        for (int i = 0; i < n; i++) {
            int u = -1;
            for (int j = 0; j < n; j++) {
                if (!inMst[j] && (u == -1 || minDist[j] < minDist[u])) u = j;
            }
            inMst[u] = true;
            total += minDist[u];
            for (int v = 0; v < n; v++) {
                if (!inMst[v]) {
                    int d = Math.abs(points[u][0] - points[v][0]) + Math.abs(points[u][1] - points[v][1]);
                    minDist[v] = Math.min(minDist[v], d);
                }
            }
        }
        return total;
    }
}`,
        cpp: `class Solution {
public:
    int minCostConnectPoints(vector<vector<int>>& points) {
        int n = points.size();
        vector<bool> inMst(n, false);
        vector<int> minDist(n, INT_MAX);
        minDist[0] = 0;
        int total = 0;
        for (int i = 0; i < n; i++) {
            int u = -1;
            for (int j = 0; j < n; j++) {
                if (!inMst[j] && (u == -1 || minDist[j] < minDist[u])) u = j;
            }
            inMst[u] = true;
            total += minDist[u];
            for (int v = 0; v < n; v++) {
                if (!inMst[v]) {
                    int d = abs(points[u][0] - points[v][0]) + abs(points[u][1] - points[v][1]);
                    minDist[v] = min(minDist[v], d);
                }
            }
        }
        return total;
    }
};`,      },
    },
  },
  {
    slug: "network-delay-time",
    title: "Network Delay Time",
    difficulty: "Medium",
    category: "advanced-graphs",
    topics: ["Graph", "Heap", "Shortest Path"],
    order: 3,
    description: `You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (u_i, v_i, w_i)\`, where \`u_i\` is the source node, \`v_i\` is the target node, and \`w_i\` is the time it takes for a signal to travel from source to target.
\nWe will send a signal from a given node \`k\`. Return the **minimum** time it takes for all the \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.`,
    examples: [
      { args: [[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2], output: 2 },
      { args: [[[1, 2, 1]], 2, 1], output: 1 },
      { args: [[[1, 2, 1]], 2, 2], output: -1 },
    ],
    constraints: ["1 <= k <= n <= 100", "1 <= times.length <= 6000", "times[i].length == 3", "1 <= u_i, v_i <= n", "u_i != v_i", "0 <= w_i <= 100", "All the pairs (u_i, v_i) are unique (i.e., no multiple edges)."],
    starter: {
      python: `from typing import List\n\n\ndef networkDelayTime(times: List[List[int]], n: int, k: int) -> int:\n    pass\n`,
      javascript: `function networkDelayTime(times, n, k) {\n    \n}`,
      typescript: `function networkDelayTime(times: number[][], n: number, k: number): number {\n    \n}`,
      java: `class Solution {\n    public int networkDelayTime(int[][] times, int n, int k) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int networkDelayTime(vector<vector<int>>& times, int n, int k) {\n        \n    }\n};`,
      dart: `class Solution {
  int networkDelayTime(List<List<int>> times, int n, int k) {
    
  }
}`,
    },
    methodName: "networkDelayTime",
    argTypes: ["int[][]", "int", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[[2, 1, 1], [2, 3, 1], [3, 4, 1]], 4, 2], output: 2 },
      { args: [[[1, 2, 1]], 2, 1], output: 1 },
      { args: [[[1, 2, 1]], 2, 2], output: -1 },
    ],
    hiddenTests: [
      { args: [[[1, 2, 1], [2, 3, 2], [1, 3, 4]], 3, 1], output: 3 },
      { args: [[[1, 2, 1], [2, 3, 2], [3, 4, 3], [4, 5, 4]], 5, 1], output: 10 },
      { args: [[[1, 2, 1], [2, 3, 2], [1, 3, 4], [3, 4, 1], [2, 4, 10]], 4, 1], output: 4 },
      { args: [[[1, 2, 1], [2, 3, 1], [3, 1, 1]], 3, 1], output: 2 },
      { args: [[[1, 2, 100]], 3, 1], output: -1 },
    ],
    editorial: {
      approach: `Dijkstra's algorithm from node \`k\`: use a min-heap of (time, node), relax edges, and record the arrival time of each node. The answer is the maximum arrival time over all nodes; if any node is unreachable, return -1.\n\nO(E log V) time, O(V + E) space.`,
      complexity: { time: "O(E log V)", space: "O(V + E)" },
      code: {
        python: `def networkDelayTime(times: List[List[int]], n: int, k: int) -> int:
    adj = [[] for _ in range(n + 1)]
    for u, v, w in times:
        adj[u].append((v, w))
    import heapq
    dist = [float("inf")] * (n + 1)
    dist[k] = 0
    heap = [(0, k)]
    while heap:
        d, u = heapq.heappop(heap)
        if d > dist[u]:
            continue
        for v, w in adj[u]:
            if d + w < dist[v]:
                dist[v] = d + w
                heapq.heappush(heap, (dist[v], v))
    ans = max(dist[1:])
    return ans if ans != float("inf") else -1`,
        javascript: `function networkDelayTime(times, n, k) {
  const adj = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u].push([v, w]);
  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap = [[0, k]];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [d, u] = heap.shift();
    if (d > dist[u]) continue;
    for (const [v, w] of adj[u]) {
      if (d + w < dist[v]) {
        dist[v] = d + w;
        heap.push([dist[v], v]);
      }
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    ans = Math.max(ans, dist[i]);
  }
  return ans;
}`,
        typescript: `function networkDelayTime(times: number[][], n: number, k: number): number {
  const adj: [number, number][][] = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) adj[u]!.push([v, w]);
  const dist = new Array<number>(n + 1).fill(Infinity);
  dist[k] = 0;
  const heap: [number, number][] = [[0, k]];
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [d, u] = heap.shift()!;
    if (d > dist[u]!) continue;
    for (const [v, w] of adj[u]!) {
      if (d + w < dist[v]!) {
        dist[v] = d + w;
        heap.push([dist[v]!, v]);
      }
    }
  }
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    ans = Math.max(ans, dist[i]!);
  }
  return ans;
}`,

        java: `class Solution {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<int[]>[] adj = new List[n + 1];
        for (int i = 1; i <= n; i++) adj[i] = new ArrayList<>();
        for (int[] t : times) adj[t[0]].add(new int[]{t[1], t[2]});
        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        pq.add(new int[]{k, 0});
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int u = top[0], d = top[1];
            if (d > dist[u]) continue;
            for (int[] e : adj[u]) {
                int v = e[0], nd = d + e[1];
                if (nd < dist[v]) {
                    dist[v] = nd;
                    pq.add(new int[]{v, nd});
                }
            }
        }
        int max = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == Integer.MAX_VALUE) return -1;
            max = Math.max(max, dist[i]);
        }
        return max;
    }
}`,
        cpp: `class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int,int>>> adj(n + 1);
        for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
        vector<int> dist(n + 1, INT_MAX);
        dist[k] = 0;
        priority_queue<pair<int,int>, vector<pair<int,int>>, greater<pair<int,int>>> pq;
        pq.push({0, k});
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for (auto& [v, w] : adj[u]) {
                int nd = d + w;
                if (nd < dist[v]) {
                    dist[v] = nd;
                    pq.push({nd, v});
                }
            }
        }
        int maxDist = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            maxDist = max(maxDist, dist[i]);
        }
        return maxDist;
    }
};`,      },
    },
  },
  {
    slug: "swim-in-rising-water",
    title: "Swim in Rising Water",
    difficulty: "Hard",
    category: "advanced-graphs",
    topics: ["Array", "Binary Search", "DFS", "BFS", "Heap"],
    order: 4,
    description: `You are given an \`n x n\` integer matrix \`grid\` where each value \`grid[i][j]\` represents the elevation at that point \`(i, j)\`.
\nThe rain starts to fall. At time \`t\`, the depth of the water everywhere is \`t\`. You can swim from a square to another 4-directionally adjacent square if and only if the elevation of both squares individually are at most \`t\`. You can swim infinite distances in zero time. Of course, you must stay within the boundaries of the grid during your swim.\n\nReturn the least time until you can reach the bottom right square \`(n - 1, n - 1)\` if you start at the top left square \`(0, 0)\`.`,
    examples: [
      { args: [[[0, 2], [1, 3]]], output: 3 },
      { args: [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]], output: 16 },
    ],
    constraints: ["n == grid.length", "n == grid[i].length", "1 <= n <= 50", "0 <= grid[i][j] < n^2", "Each value grid[i][j] is unique."],
    starter: {
      python: `from typing import List\n\n\ndef swimInWater(grid: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function swimInWater(grid) {\n    \n}`,
      typescript: `function swimInWater(grid: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int swimInWater(int[][] grid) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int swimInWater(vector<vector<int>>& grid) {\n        \n    }\n};`,
      dart: `class Solution {
  int swimInWater(List<List<int>> grid) {
    
  }
}`,
    },
    methodName: "swimInWater",
    argTypes: ["int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[[0, 2], [1, 3]]], output: 3 },
      { args: [[[0, 1, 2, 3, 4], [24, 23, 22, 21, 5], [12, 13, 14, 15, 16], [11, 17, 18, 19, 20], [10, 9, 8, 7, 6]]], output: 16 },
    ],
    hiddenTests: [
      { args: [[[3, 2], [0, 1]]], output: 3 },
      { args: [[[0, 1, 2], [3, 4, 5], [6, 7, 8]]], output: 8 },
      { args: [[[10, 12, 4], [6, 2, 3], [1, 5, 7]]], output: 10 },
      { args: [[[0]]], output: 0 },
      { args: [[[0, 3], [2, 1]]], output: 2 },
    ],
    editorial: {
      approach: `This is a shortest-path problem where the cost of a path is the maximum elevation along it. Use a min-heap (Dijkstra-like) ordered by elevation: pop the lowest-elevation frontier cell, relax its neighbors, and the time when the bottom-right is first popped is the answer.\n\nO(n^2 log n) time, O(n^2) space.`,
      complexity: { time: "O(n^2 log n)", space: "O(n^2)" },
      code: {
        python: `def swimInWater(grid: List[List[int]]) -> int:
    n = len(grid)
    import heapq
    heap = [(grid[0][0], 0, 0)]
    seen = {(0, 0)}
    while heap:
        t, r, c = heapq.heappop(heap)
        if r == n - 1 and c == n - 1:
            return t
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < n and 0 <= nc < n and (nr, nc) not in seen:
                seen.add((nr, nc))
                heapq.heappush(heap, (max(t, grid[nr][nc]), nr, nc))
    return -1`,
        javascript: `function swimInWater(grid) {
  const n = grid.length;
  const heap = [[grid[0][0], 0, 0]];
  const seen = new Set(["0,0"]);
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [t, r, c] = heap.shift();
    if (r === n - 1 && c === n - 1) return t;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen.has(nr + "," + nc)) {
        seen.add(nr + "," + nc);
        heap.push([Math.max(t, grid[nr][nc]), nr, nc]);
      }
    }
  }
  return -1;
}`,
        typescript: `function swimInWater(grid: number[][]): number {
  const n = grid.length;
  const heap: [number, number, number][] = [[grid[0]![0]!, 0, 0]];
  const seen = new Set<string>(["0,0"]);
  while (heap.length) {
    heap.sort((a, b) => a[0] - b[0]);
    const [t, r, c] = heap.shift()!;
    if (r === n - 1 && c === n - 1) return t;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < n && !seen.has(nr + "," + nc)) {
        seen.add(nr + "," + nc);
        heap.push([Math.max(t, grid[nr]![nc]!), nr, nc]);
      }
    }
  }
  return -1;
}`,

        java: `class Solution {
    public int swimInWater(int[][] grid) {
        int n = grid.length;
        boolean[][] seen = new boolean[n][n];
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.add(new int[]{grid[0][0], 0, 0});
        seen[0][0] = true;
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int ans = 0;
        while (!pq.isEmpty()) {
            int[] top = pq.poll();
            int t = top[0], i = top[1], j = top[2];
            ans = Math.max(ans, t);
            if (i == n - 1 && j == n - 1) return ans;
            for (int[] d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < n && nj >= 0 && nj < n && !seen[ni][nj]) {
                    seen[ni][nj] = true;
                    pq.add(new int[]{grid[ni][nj], ni, nj});
                }
            }
        }
        return ans;
    }
}`,
        cpp: `class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        vector<vector<bool>> seen(n, vector<bool>(n, false));
        priority_queue<tuple<int,int,int>, vector<tuple<int,int,int>>, greater<tuple<int,int,int>>> pq;
        pq.push({grid[0][0], 0, 0});
        seen[0][0] = true;
        int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int ans = 0;
        while (!pq.empty()) {
            auto [t, i, j] = pq.top(); pq.pop();
            ans = max(ans, t);
            if (i == n - 1 && j == n - 1) return ans;
            for (auto& d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < n && nj >= 0 && nj < n && !seen[ni][nj]) {
                    seen[ni][nj] = true;
                    pq.push({grid[ni][nj], ni, nj});
                }
            }
        }
        return ans;
    }
};`,      },
    },
  },
  {
    slug: "alien-dictionary",
    title: "Alien Dictionary",
    difficulty: "Hard",
    category: "advanced-graphs",
    topics: ["Graph", "Topological Sort"],
    order: 5,
    description: `There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.
\nYou are given a list of strings \`words\` from the alien language's dictionary, where the strings are **sorted lexicographically** by the rules of this new language.\n\nReturn a string of the unique letters in the new alien language sorted in **lexicographically increasing order** by the new language's rules. If there is no solution, return \`""\`. If there are multiple solutions, return **any of them**.\n\n- A string \`s\` is lexicographically smaller than a string \`t\` if at the first position where they differ, the character in \`s\` is smaller than the character in \`t\`, or if \`s\` is a prefix of \`t\`.\n\nIf the order is invalid, return an empty string.`,
    examples: [
      { args: [["wrt", "wrf", "er", "ett", "rftt"]], output: "wertf" },
      { args: [["z", "x"]], output: "zx" },
      { args: [["z", "x", "z"]], output: "" },
    ],
    constraints: ["1 <= words.length <= 100", "1 <= words[i].length <= 100", "words[i] consists of only lowercase English letters."],
    starter: {
      python: `from typing import List\n\n\ndef alienOrder(words: List[str]) -> str:\n    pass\n`,
      javascript: `function alienOrder(words) {\n    \n}`,
      typescript: `function alienOrder(words: string[]): string {\n    \n}`,
      java: `class Solution {\n    public String alienOrder(String[] words) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    string alienOrder(vector<string>& words) {\n        \n    }\n};`,
      dart: `class Solution {
  String alienOrder(List<String> words) {
    
  }
}`,
    },
    methodName: "alienOrder",
    argTypes: ["string[]"],
    outputType: "string",
    compare: "exact",
    visibleTests: [
      { args: [["wrt", "wrf", "er", "ett", "rftt"]], output: "wertf" },
      { args: [["z", "x"]], output: "zx" },
      { args: [["z", "x", "z"]], output: "" },
    ],
    hiddenTests: [
      { args: [["baa", "abcd", "abca", "cab", "cad"]], output: "bdac" },
      { args: [["wrtkj", "wrt"]], output: "" },
      { args: [["abc", "ab"]], output: "" },
      { args: [["a", "b", "c"]], output: "abc" },
      { args: [["ac", "ab", "zc", "zb"]], output: "acbz" },
    ],
    editorial: {
      approach: `Build a directed graph from adjacent word pairs: for \`words[i]\` and \`words[i + 1]\`, find the first differing character — that gives an edge \`words[i][j] -> words[i + 1][j]\`. If one word is a proper prefix of the next, the list is invalid (return \`""\`). Then run topological sort (Kahn's algorithm, processing letters in sorted order for a deterministic result); if a cycle exists or not all letters are emitted, return \`""\`.\n\nO(C) time over total characters, O(26) space.`,
      complexity: { time: "O(C)", space: "O(26)" },
      code: {
        python: `def alienOrder(words: List[str]) -> str:
    adj = {ch: set() for word in words for ch in word}
    indeg = {ch: 0 for ch in adj}
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        if len(w1) > len(w2) and w1[: len(w2)] == w2:
            return ""
        for a, b in zip(w1, w2):
            if a != b:
                if b not in adj[a]:
                    adj[a].add(b)
                    indeg[b] += 1
                break
    import heapq
    heap = [ch for ch in indeg if indeg[ch] == 0]
    heapq.heapify(heap)
    result = []
    while heap:
        ch = heapq.heappop(heap)
        result.append(ch)
        for nxt in sorted(adj[ch]):
            indeg[nxt] -= 1
            if indeg[nxt] == 0:
                heapq.heappush(heap, nxt)
    return "".join(result) if len(result) == len(adj) else ""`,
        javascript: `function alienOrder(words) {
  const adj = {};
  const indeg = {};
  for (const word of words) {
    for (const ch of word) {
      adj[ch] = new Set();
      indeg[ch] = 0;
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj[w1[j]].has(w2[j])) {
          adj[w1[j]].add(w2[j]);
          indeg[w2[j]]++;
        }
        break;
      }
    }
  }
  const q = Object.keys(indeg).filter((ch) => indeg[ch] === 0).sort();
  const result = [];
  while (q.length) {
    const ch = q.shift();
    result.push(ch);
    for (const next of [...adj[ch]].sort()) {
      if (--indeg[next] === 0) q.push(next);
      q.sort();
    }
  }
  return result.length === Object.keys(adj).length ? result.join("") : "";
}`,
        typescript: `function alienOrder(words: string[]): string {
  const adj: Record<string, Set<string>> = {};
  const indeg: Record<string, number> = {};
  for (const word of words) {
    for (const ch of word) {
      adj[ch] = new Set();
      indeg[ch] = 0;
    }
  }
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i]!, w2 = words[i + 1]!;
    if (w1.length > w2.length && w1.startsWith(w2)) return "";
    for (let j = 0; j < Math.min(w1.length, w2.length); j++) {
      if (w1[j] !== w2[j]) {
        if (!adj[w1[j]!]!.has(w2[j]!)) {
          adj[w1[j]!]!.add(w2[j]!);
          indeg[w2[j]!]!++;
        }
        break;
      }
    }
  }
  const q = Object.keys(indeg).filter((ch) => indeg[ch] === 0).sort();
  const result: string[] = [];
  while (q.length) {
    const ch = q.shift()!;
    result.push(ch);
    for (const next of [...adj[ch]!].sort()) {
      if (--indeg[next]! === 0) q.push(next);
      q.sort();
    }
  }
  return result.length === Object.keys(adj).length ? result.join("") : "";
}`,

        java: `class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> adj = new HashMap<>();
        Map<Character, Integer> indeg = new HashMap<>();
        for (String w : words) {
            for (char c : w.toCharArray()) {
                adj.putIfAbsent(c, new HashSet<>());
                indeg.putIfAbsent(c, 0);
            }
        }
        for (int i = 0; i + 1 < words.length; i++) {
            String a = words[i], b = words[i + 1];
            if (a.length() > b.length() && a.startsWith(b)) return "";
            int len = Math.min(a.length(), b.length());
            for (int k = 0; k < len; k++) {
                if (a.charAt(k) != b.charAt(k)) {
                    if (adj.get(a.charAt(k)).add(b.charAt(k))) {
                        indeg.merge(b.charAt(k), 1, Integer::sum);
                    }
                    break;
                }
            }
        }
        PriorityQueue<Character> pq = new PriorityQueue<>();
        for (char c : indeg.keySet()) if (indeg.get(c) == 0) pq.add(c);
        StringBuilder sb = new StringBuilder();
        while (!pq.isEmpty()) {
            char c = pq.poll();
            sb.append(c);
            for (char nxt : adj.get(c)) {
                indeg.merge(nxt, -1, Integer::sum);
                if (indeg.get(nxt) == 0) pq.add(nxt);
            }
        }
        return sb.length() == indeg.size() ? sb.toString() : "";
    }
}`,
        cpp: `class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> indeg;
        for (auto& w : words) {
            for (char c : w) {
                adj[c];
                indeg[c];
            }
        }
        for (int i = 0; i + 1 < (int)words.size(); i++) {
            string a = words[i], b = words[i + 1];
            if (a.size() > b.size() && a.substr(0, b.size()) == b) return "";
            for (int k = 0; k < (int)min(a.size(), b.size()); k++) {
                if (a[k] != b[k]) {
                    if (adj[a[k]].insert(b[k]).second) indeg[b[k]]++;
                    break;
                }
            }
        }
        priority_queue<char, vector<char>, greater<char>> pq;
        for (auto& [c, _] : indeg) if (indeg[c] == 0) pq.push(c);
        string res;
        while (!pq.empty()) {
            char c = pq.top(); pq.pop();
            res.push_back(c);
            for (char nxt : adj[c]) {
                if (--indeg[nxt] == 0) pq.push(nxt);
            }
        }
        return res.size() == indeg.size() ? res : "";
    }
};`,      },
    },
  },
  {
    slug: "cheapest-flights-within-k-stops",
    title: "Cheapest Flights Within K Stops",
    difficulty: "Medium",
    category: "advanced-graphs",
    topics: ["Graph", "BFS", "Heap", "Shortest Path"],
    order: 6,
    description: `There are \`n\` cities connected by some number of flights. You are given an array \`flights\` where \`flights[i] = [from_i, to_i, price_i]\` indicates that there is a flight from city \`from_i\` to city \`to_i\` with cost \`price_i\`.
\nYou are also given three integers \`src\`, \`dst\`, and \`k\`, return **the cheapest price** from \`src\` to \`dst\` with at most \`k\` stops. If there is no such route, return \`-1\`.`,
    examples: [
      {
        args: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1],
        output: 700,
      },
      {
        args: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 0],
        output: -1,
      },
    ],
    constraints: ["1 <= n <= 100", "0 <= flights.length <= (n * (n - 1) / 2)", "flights[i].length == 3", "0 <= from_i, to_i < n", "from_i != to_i", "1 <= price_i <= 10^4", "There will not be any multiple flights between two cities.", "0 <= src, dst, k < n", "src != dst"],
    starter: {
      python: `from typing import List\n\n\ndef findCheapestPrice(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:\n    pass\n`,
      javascript: `function findCheapestPrice(n, flights, src, dst, k) {\n    \n}`,
      typescript: `function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {\n    \n}`,
      java: `class Solution {\n    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {\n        \n    }\n};`,
      dart: `class Solution {
  int findCheapestPrice(int n, List<List<int>> flights, int src, int dst, int k) {
    
  }
}`,
    },
    methodName: "findCheapestPrice",
    argTypes: ["int", "int[][]", "int", "int", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 1], output: 700 },
      { args: [4, [[0, 1, 100], [1, 2, 100], [2, 0, 100], [1, 3, 600], [2, 3, 200]], 0, 3, 0], output: -1 },
    ],
    hiddenTests: [
      { args: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 1], output: 200 },
      { args: [3, [[0, 1, 100], [1, 2, 100], [0, 2, 500]], 0, 2, 0], output: 500 },
      { args: [5, [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 2], [4, 2, 1]], 0, 2, 2], output: 8 },
      { args: [5, [[0, 1, 5], [1, 2, 5], [0, 3, 2], [3, 1, 2], [1, 4, 2], [4, 2, 1]], 0, 2, 3], output: 7 },
      { args: [3, [[0, 1, 100]], 0, 2, 1], output: -1 },
      { args: [4, [[0, 1, 1], [0, 2, 5], [1, 2, 1], [2, 3, 1]], 0, 3, 1], output: 6 },
    ],
    editorial: {
      approach: `BFS with a cost array: track the cheapest known price to reach each city with the number of stops used. From \`src\`, expand level by level up to \`k\` stops; whenever a cheaper arrival to a city is found, enqueue it. This naturally bounds exploration to at most k stops and avoids revisiting states that are strictly worse.\n\nO(k * E) time, O(n) space.`,
      complexity: { time: "O(k * E)", space: "O(n)" },
      code: {
        python: `def findCheapestPrice(n: int, flights: List[List[int]], src: int, dst: int, k: int) -> int:
    adj = [[] for _ in range(n)]
    for frm, to, price in flights:
        adj[frm].append((to, price))
    from collections import deque
    q = deque([(src, 0)])  # (city, cost so far)
    min_cost = [float("inf")] * n
    min_cost[src] = 0
    stops = 0
    while q and stops <= k:
        for _ in range(len(q)):
            city, cost = q.popleft()
            for nxt, price in adj[city]:
                new_cost = cost + price
                if new_cost < min_cost[nxt]:
                    min_cost[nxt] = new_cost
                    q.append((nxt, new_cost))
        stops += 1
    return min_cost[dst] if min_cost[dst] != float("inf") else -1`,
        javascript: `function findCheapestPrice(n, flights, src, dst, k) {
  const adj = Array.from({ length: n }, () => []);
  for (const [from, to, price] of flights) adj[from].push([to, price]);
  const minCost = new Array(n).fill(Infinity);
  minCost[src] = 0;
  let q = [[src, 0]];
  let stops = 0;
  while (q.length && stops <= k) {
    const next = [];
    for (const [city, cost] of q) {
      for (const [nxt, price] of adj[city]) {
        const newCost = cost + price;
        if (newCost < minCost[nxt]) {
          minCost[nxt] = newCost;
          next.push([nxt, newCost]);
        }
      }
    }
    q = next;
    stops++;
  }
  return minCost[dst] === Infinity ? -1 : minCost[dst];
}`,
        typescript: `function findCheapestPrice(n: number, flights: number[][], src: number, dst: number, k: number): number {
  const adj: [number, number][][] = Array.from({ length: n }, () => []);
  for (const [from, to, price] of flights) adj[from]!.push([to, price]);
  const minCost = new Array<number>(n).fill(Infinity);
  minCost[src] = 0;
  let q: [number, number][] = [[src, 0]];
  let stops = 0;
  while (q.length && stops <= k) {
    const next: [number, number][] = [];
    for (const [city, cost] of q) {
      for (const [nxt, price] of adj[city]!) {
        const newCost = cost + price;
        if (newCost < minCost[nxt]!) {
          minCost[nxt] = newCost;
          next.push([nxt, newCost]);
        }
      }
    }
    q = next;
    stops++;
  }
  return minCost[dst] === Infinity ? -1 : minCost[dst]!;
}`,

        java: `class Solution {
    public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            int[] next = dist.clone();
            for (int[] f : flights) {
                if (dist[f[0]] != Integer.MAX_VALUE) {
                    next[f[1]] = Math.min(next[f[1]], dist[f[0]] + f[2]);
                }
            }
            dist = next;
        }
        return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
    }
}`,
        cpp: `class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        for (int i = 0; i <= k; i++) {
            vector<int> next = dist;
            for (auto& f : flights) {
                if (dist[f[0]] != INT_MAX) {
                    next[f[1]] = min(next[f[1]], dist[f[0]] + f[2]);
                }
            }
            dist = next;
        }
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};`,      },
    },
  },
];
