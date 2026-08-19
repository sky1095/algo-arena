import type { Problem } from "@/lib/types";

export const advancedGraphsProblems: Problem[] = [
  {
    slug: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Graph", "DFS", "BFS", "Topological Sort"],
    order: 1,
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you **must** take course \`b_i\` first if you want to take course \`a_i\`.

For example, the pair \`[0, 1]\` indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses, or \`false\` otherwise.`,
    examples: [
      { args: [2, [[1, 0]]], output: true, explain: "There are a total of 2 courses to take. To take course 1 you should have finished course 0. So it is possible." },
      { args: [2, [[1, 0], [0, 1]]], output: false, explain: "The courses form a cycle: 0 requires 1, and 1 requires 0." },
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= 5000", "prerequisites[i].length == 2", "0 <= a_i, b_i < numCourses", "All the pairs prerequisites[i] are unique."],
    starter: {
      python: `from typing import List\n\n\ndef canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:\n    pass\n`,
      javascript: `function canFinish(numCourses, prerequisites) {\n    \n}`,
      typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean canFinish(int numCourses, int[][] prerequisites) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};`,
      dart: `class Solution {
  bool canFinish(int numCourses, List<List<int>> prerequisites) {
    
  }
}`,
    },
    methodName: "canFinish",
    argTypes: ["int", "int[][]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [2, [[1, 0]]], output: true },
      { args: [2, [[1, 0], [0, 1]]], output: false },
    ],
    hiddenTests: [
      { args: [1, []], output: true },
      { args: [3, [[1, 0], [2, 1]]], output: true },
      { args: [3, [[1, 0], [2, 1], [0, 2]]], output: false },
      { args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], output: true },
      { args: [4, [[0, 1], [1, 2], [2, 3], [3, 0]]], output: false },
      { args: [5, [[1, 0], [2, 1], [3, 1], [4, 2], [4, 3]]], output: true },
    ],
    editorial: {
      approach: `The problem asks whether the prerequisite graph has a cycle: you can finish all courses iff the graph is a DAG. Build the adjacency list, then run DFS with three states — unvisited, in progress, done. If DFS ever revisits an in-progress node, a cycle exists.

Alternatively, Kahn's algorithm (BFS on indegrees) counts how many courses can be topologically sorted; if the count is less than numCourses, a cycle exists. Both run in O(V + E).`,
      complexity: { time: "O(V + E)", space: "O(V + E)" },
      code: {
        python: `def canFinish(numCourses: int, prerequisites: List[List[int]]) -> bool:
    adj = [[] for _ in range(numCourses)]
    for a, b in prerequisites:
        adj[b].append(a)
    state = [0] * numCourses  # 0 = unvisited, 1 = in progress, 2 = done

    def dfs(course: int) -> bool:
        if state[course] == 1:
            return False
        if state[course] == 2:
            return True
        state[course] = 1
        for nxt in adj[course]:
            if not dfs(nxt):
                return False
        state[course] = 2
        return True

    return all(dfs(c) for c in range(numCourses))`,
        javascript: `function canFinish(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) adj[b].push(a);
  const state = new Array(numCourses).fill(0);
  const dfs = (course) => {
    if (state[course] === 1) return false;
    if (state[course] === 2) return true;
    state[course] = 1;
    for (const next of adj[course]) {
      if (!dfs(next)) return false;
    }
    state[course] = 2;
    return true;
  };
  for (let c = 0; c < numCourses; c++) {
    if (!dfs(c)) return false;
  }
  return true;
}`,
        typescript: `function canFinish(numCourses: number, prerequisites: number[][]): boolean {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  for (const [a, b] of prerequisites) adj[b]!.push(a);
  const state = new Array<number>(numCourses).fill(0);
  const dfs = (course: number): boolean => {
    if (state[course] === 1) return false;
    if (state[course] === 2) return true;
    state[course] = 1;
    for (const next of adj[course]!) {
      if (!dfs(next)) return false;
    }
    state[course] = 2;
    return true;
  };
  for (let c = 0; c < numCourses; c++) {
    if (!dfs(c)) return false;
  }
  return true;
}`,

        java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] e : prerequisites) {
            adj.get(e[1]).add(e[0]);
            indeg[e[0]]++;
        }
        ArrayDeque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);
        int seen = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            seen++;
            for (int v : adj.get(u)) {
                if (--indeg[v] == 0) q.add(v);
            }
        }
        return seen == numCourses;
    }
}`,
        cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indeg(numCourses, 0);
        for (auto& e : prerequisites) {
            adj[e[1]].push_back(e[0]);
            indeg[e[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.push(i);
        int seen = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            seen++;
            for (int v : adj[u]) {
                if (--indeg[v] == 0) q.push(v);
            }
        }
        return seen == numCourses;
    }
};`,      },
    },
  },
  {
    slug: "number-of-connected-components",
    title: "Number of Connected Components",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Graph", "Union-Find", "DFS"],
    order: 2,
    description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an array \`edges\` where \`edges[i] = [a_i, b_i]\` indicates that there is an undirected edge between nodes \`a_i\` and \`b_i\`.

Return the number of **connected components** in the graph.`,
    examples: [
      { args: [5, [[0, 1], [1, 2], [3, 4]]], output: 2 },
      { args: [5, [[0, 1], [1, 2], [2, 3], [3, 4]]], output: 1 },
    ],
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000", "edges[i].length == 2", "0 <= a_i, b_i < n"],
    starter: {
      python: `from typing import List\n\n\ndef countComponents(n: int, edges: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function countComponents(n, edges) {\n    \n}`,
      typescript: `function countComponents(n: number, edges: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int countComponents(int n, int[][] edges) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int countComponents(int n, vector<vector<int>>& edges) {\n        \n    }\n};`,
      dart: `class Solution {
  int countComponents(int n, List<List<int>> edges) {
    
  }
}`,
    },
    methodName: "countComponents",
    argTypes: ["int", "int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [5, [[0, 1], [1, 2], [3, 4]]], output: 2 },
      { args: [5, [[0, 1], [1, 2], [2, 3], [3, 4]]], output: 1 },
    ],
    hiddenTests: [
      { args: [1, []], output: 1 },
      { args: [3, []], output: 3 },
      { args: [4, [[0, 1], [2, 3]]], output: 2 },
      { args: [6, [[0, 1], [2, 3], [4, 5], [1, 2]]], output: 2 },
      { args: [4, [[0, 1], [1, 2], [2, 3], [3, 0]]], output: 1 },
    ],
    editorial: {
      approach: `Union-Find is the natural fit: start with every node in its own component, then union the endpoints of each edge, decrementing the count whenever two different components merge. Path compression + union by rank keeps operations near O(1).

Complexity is O(E * α(n)) — effectively linear.`,
      complexity: { time: "O(E * α(n))", space: "O(n)" },
      code: {
        python: `def countComponents(n: int, edges: List[List[int]]) -> int:
    parent = list(range(n))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    count = n
    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra != rb:
            parent[ra] = rb
            count -= 1
    return count`,
        javascript: `function countComponents(n, edges) {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  let count = n;
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      count--;
    }
  }
  return count;
}`,
        typescript: `function countComponents(n: number, edges: number[][]): number {
  const parent = Array.from({ length: n }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]!]!;
      x = parent[x]!;
    }
    return x;
  };
  let count = n;
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra !== rb) {
      parent[ra] = rb;
      count--;
    }
  }
  return count;
}`,

        java: `class Solution {
    private int[] parent;
    private int[] rank;

    public int countComponents(int n, int[][] edges) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
        for (int[] e : edges) union(e[0], e[1]);
        int count = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) count++;
        return count;
    }

    private int find(int x) {
        if (parent[x] != x) parent[x] = find(parent[x]);
        return parent[x];
    }

    private void union(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb) return;
        if (rank[ra] < rank[rb]) parent[ra] = rb;
        else if (rank[ra] > rank[rb]) parent[rb] = ra;
        else { parent[rb] = ra; rank[ra]++; }
    }
}`,
        cpp: `class Solution {
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        vector<int> parent(n), rank(n, 0);
        for (int i = 0; i < n; i++) parent[i] = i;
        function<int(int)> find = [&](int x) -> int {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        };
        auto uni = [&](int a, int b) {
            int ra = find(a), rb = find(b);
            if (ra == rb) return;
            if (rank[ra] < rank[rb]) parent[ra] = rb;
            else if (rank[ra] > rank[rb]) parent[rb] = ra;
            else { parent[rb] = ra; rank[ra]++; }
        };
        for (auto& e : edges) uni(e[0], e[1]);
        int count = 0;
        for (int i = 0; i < n; i++) if (find(i) == i) count++;
        return count;
    }
};`,      },
    },
  },
];
