import type { Problem } from "@/lib/types";

export const graphsProblems: Problem[] = [
  {
    slug: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Matrix", "DFS", "BFS"],
    order: 1,
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

The grid is given as an array of strings like \`["11000", "11000", "00100", "00011"]\`.`,
    examples: [
      {
        args: [[["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]],
        output: 1,
      },
      {
        args: [[["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]],
        output: 3,
      },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300", "grid[i][j] is '0' or '1'."],
    starter: {
      python: `from typing import List\n\n\ndef numIslands(grid: List[List[str]]) -> int:\n    pass\n`,
      javascript: `function numIslands(grid) {\n    \n}`,
      typescript: `function numIslands(grid: string[][]): number {\n    \n}`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};`,
    },
    methodName: "numIslands",
    argTypes: ["char[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      {
        args: [[["1", "1", "1", "1", "0"], ["1", "1", "0", "1", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "0", "0", "0"]]],
        output: 1,
      },
      {
        args: [[["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]],
        output: 3,
      },
    ],
    hiddenTests: [
      { args: [[["1"]]], output: 1 },
      { args: [[["0"]]], output: 0 },
      { args: [[["1", "0", "1"], ["0", "1", "0"], ["1", "0", "1"]]], output: 5 },
      { args: [[["1", "1", "1"], ["1", "1", "1"], ["1", "1", "1"]]], output: 1 },
      { args: [[["1", "0", "0", "1"]]], output: 2 },
    ],
    editorial: {
      approach: `Scan every cell. When a \`'1'\` is found that hasn't been visited, it starts a new island: increment the count and flood-fill all reachable land with DFS (or BFS), marking cells visited so they are never recounted.

Each cell is visited at most once, so the runtime is O(m * n) with O(m * n) worst-case recursion space.`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def numIslands(grid: List[List[str]]) -> int:
    m, n = len(grid), len(grid[0])
    count = 0

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != "1":
            return
        grid[r][c] = "0"
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(m):
        for c in range(n):
            if grid[r][c] == "1":
                count += 1
                dfs(r, c)
    return count`,
        javascript: `function numIslands(grid) {
  const m = grid.length, n = grid[0].length;
  let count = 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
        typescript: `function numIslands(grid: string[][]): number {
  const m = grid.length, n = grid[0].length;
  let count = 0;
  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== "1") return;
    grid[r][c] = "0";
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,

        java: `class Solution {
    public int numIslands(char[][] grid) {
        int m = grid.length, n = grid[0].length;
        int count = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    sink(grid, i, j);
                }
            }
        }
        return count;
    }

    private void sink(char[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != '1') return;
        grid[i][j] = '0';
        sink(grid, i + 1, j);
        sink(grid, i - 1, j);
        sink(grid, i, j + 1);
        sink(grid, i, j - 1);
    }
}`,
        cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        int m = grid.size(), n = grid[0].size();
        int count = 0;
        function<void(int,int)> sink = [&](int i, int j) {
            if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != '1') return;
            grid[i][j] = '0';
            sink(i + 1, j);
            sink(i - 1, j);
            sink(i, j + 1);
            sink(i, j - 1);
        };
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    sink(i, j);
                }
            }
        }
        return count;
    }
};`,      },
    },
  },
  {
    slug: "clone-graph",
    title: "Clone Graph",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Graph", "DFS", "BFS", "Hash Table"],
    order: 2,
    description: `Given a reference of a node in a **connected** undirected graph, return a **deep copy** (clone) of the graph.

Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.

**Test format**: the graph is given as an adjacency list, e.g. \`[[2, 4], [1, 3], [2, 4], [1, 3]]\` means node 1 connects to nodes 2 and 4, node 2 to 1 and 3, and so on (1-indexed). The \`Node\` class is provided with \`val\` and \`neighbors\` fields. Return the cloned node whose value is 1; the judge compares it by serializing to an adjacency list.`,
    examples: [
      { args: [[[2, 4], [1, 3], [2, 4], [1, 3]]], output: [[2, 4], [1, 3], [2, 4], [1, 3]] },
      { args: [[[]]], output: [[]] },
      { args: [[]], output: null },
    ],
    constraints: ["0 <= number of nodes <= 100", "1 <= Node.val <= 100", "Node.val is unique for each node.", "The graph is a simple graph with no repeated edges and no self-loops."],
    starter: {
      python: `from typing import Optional\n\n\ndef cloneGraph(node: Optional[Node]) -> Optional[Node]:\n    pass\n`,
      javascript: `function cloneGraph(node) {\n    \n}`,
      typescript: `function cloneGraph(node: Node | null): Node | null {\n    \n}`,
      java: `class Solution {\n    public Node cloneGraph(Node node) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    Node* cloneGraph(Node* node) {\n        \n    }\n};`,
    },
    methodName: "cloneGraph",
    argTypes: ["graph"],
    outputType: "graph",
    compare: "exact",
    visibleTests: [
      { args: [[[2, 4], [1, 3], [2, 4], [1, 3]]], output: [[2, 4], [1, 3], [2, 4], [1, 3]] },
      { args: [[[]]], output: [[]] },
      { args: [[]], output: null },
    ],
    hiddenTests: [
      { args: [[[2], [1]]], output: [[2], [1]] },
      { args: [[[2, 3], [1, 3], [1, 2]]], output: [[2, 3], [1, 3], [1, 2]] },
      { args: [[[2], [1, 3], [2]]], output: [[2], [1, 3], [2]] },
      { args: [[[2, 5], [1, 3], [2, 4], [3, 5], [1, 4]]], output: [[2, 5], [1, 3], [2, 4], [3, 5], [1, 4]] },
    ],
    editorial: {
      approach: `Use a hash map from original node to its clone to guarantee each node is copied exactly once and to break cycles.

BFS or DFS from the input node: for each neighbor, clone it if unseen and link it; otherwise reuse the existing clone from the map. Recursion naturally handles cycles because a node already in the map is returned immediately.`,
      complexity: { time: "O(V + E)", space: "O(V)" },
      code: {
        python: `def cloneGraph(node: Optional[Node]) -> Optional[Node]:
    clones = {}

    def dfs(n: Optional[Node]) -> Optional[Node]:
        if n is None:
            return None
        if n in clones:
            return clones[n]
        copy = Node(n.val)
        clones[n] = copy
        copy.neighbors = [dfs(nei) for nei in n.neighbors]
        return copy

    return dfs(node)`,
        javascript: `function cloneGraph(node) {
  const clones = new Map();
  const dfs = (n) => {
    if (!n) return null;
    if (clones.has(n)) return clones.get(n);
    const copy = new Node(n.val);
    clones.set(n, copy);
    copy.neighbors = n.neighbors.map((nei) => dfs(nei));
    return copy;
  };
  return dfs(node);
}`,
        typescript: `function cloneGraph(node: Node | null): Node | null {
  const clones = new Map<Node, Node>();
  const dfs = (n: Node | null): Node | null => {
    if (!n) return null;
    if (clones.has(n)) return clones.get(n)!;
    const copy = new Node(n.val);
    clones.set(n, copy);
    copy.neighbors = n.neighbors.map((nei) => dfs(nei));
    return copy;
  };
  return dfs(node);
}`,

        java: `class Solution {
    public Node cloneGraph(Node node) {
        if (node == null) return null;
        Map<Node, Node> map = new HashMap<>();
        ArrayDeque<Node> q = new ArrayDeque<>();
        q.add(node);
        map.put(node, new Node(node.val));
        while (!q.isEmpty()) {
            Node cur = q.poll();
            for (Node nb : cur.neighbors) {
                if (!map.containsKey(nb)) {
                    map.put(nb, new Node(nb.val));
                    q.add(nb);
                }
                map.get(cur).neighbors.add(map.get(nb));
            }
        }
        return map.get(node);
    }
}`,
        cpp: `class Solution {
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        unordered_map<Node*, Node*> map;
        queue<Node*> q;
        q.push(node);
        map[node] = new Node(node->val);
        while (!q.empty()) {
            Node* cur = q.front(); q.pop();
            for (Node* nb : cur->neighbors) {
                if (!map.count(nb)) {
                    map[nb] = new Node(nb->val);
                    q.push(nb);
                }
                map[cur]->neighbors.push_back(map[nb]);
            }
        }
        return map[node];
    }
};`,      },
    },
  },
  {
    slug: "surrounded-regions",
    title: "Surrounded Regions",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Matrix", "DFS", "BFS"],
    order: 3,
    description: `Given an \`m x n\` matrix \`board\` containing \`'X'\` and \`'O'\`, capture all regions that are surrounded by \`'X'\`.

A region is captured by flipping all \`'O'\`s into \`'X'\`s in that surrounded region. A region is **surrounded** if it is enclosed by \`'X'\` cells, i.e., no \`'O'\` in the region touches the border of the board (directly or through other \`'O'\`s).

The board is given as an array of strings like \`["XXXX", "XOOX", "XXOX", "XOXX"]\`.`,
    examples: [
      {
        args: [[["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]],
        output: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]],
      },
      { args: [[["X"]]], output: [["X"]] },
    ],
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 200", "board[i][j] is 'X' or 'O'."],
    starter: {
      python: `from typing import List\n\n\ndef solve(board: List[List[str]]) -> None:\n    pass\n`,
      javascript: `function solve(board) {\n    \n}`,
      typescript: `function solve(board: string[][]): void {\n    \n}`,
      java: `class Solution {\n    public void solve(char[][] board) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void solve(vector<vector<char>>& board) {\n        \n    }\n};`,
    },
    methodName: "solve",
    argTypes: ["char[][]"],
    outputType: "void",
    compare: "exact",
    visibleTests: [
      {
        args: [[["X", "X", "X", "X"], ["X", "O", "O", "X"], ["X", "X", "O", "X"], ["X", "O", "X", "X"]]],
        output: [["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "X", "X", "X"], ["X", "O", "X", "X"]],
      },
      { args: [[["X"]]], output: [["X"]] },
    ],
    hiddenTests: [
      { args: [[["O", "O"], ["O", "O"]]], output: [["O", "O"], ["O", "O"]] },
      { args: [[["X", "O", "X"], ["O", "O", "O"], ["X", "O", "X"]]], output: [["X", "O", "X"], ["O", "O", "O"], ["X", "O", "X"]] },
      { args: [[["O", "X", "X"], ["X", "O", "X"], ["X", "X", "O"]]], output: [["O", "X", "X"], ["X", "X", "X"], ["X", "X", "O"]] },
      { args: [[["X", "O", "X", "O", "X", "O"], ["O", "X", "O", "X", "O", "X"], ["X", "O", "X", "O", "X", "O"], ["O", "X", "O", "X", "O", "X"]]], output: [["X", "O", "X", "O", "X", "O"], ["O", "X", "X", "X", "X", "X"], ["X", "X", "X", "X", "X", "O"], ["O", "X", "O", "X", "O", "X"]] },
    ],
    editorial: {
      approach: `An \`'O'\` region survives only if it touches the border. So instead of finding surrounded regions directly, find the **safe** ones: run DFS/BFS from every border \`'O'\` and mark all reachable \`'O'\`s (they cannot be captured). Then flip every unmarked \`'O'\` to \`'X'\`.

Each cell is visited once, giving O(m * n) time and space.`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def solve(board: List[List[str]]) -> None:
    m, n = len(board), len(board[0])
    safe = [[False] * n for _ in range(m)]

    def dfs(r: int, c: int) -> None:
        if r < 0 or r >= m or c < 0 or c >= n or board[r][c] != "O" or safe[r][c]:
            return
        safe[r][c] = True
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(m):
        dfs(r, 0)
        dfs(r, n - 1)
    for c in range(n):
        dfs(0, c)
        dfs(m - 1, c)

    for r in range(m):
        for c in range(n):
            if board[r][c] == "O" and not safe[r][c]:
                board[r][c] = "X"`,
        javascript: `function solve(board) {
  const m = board.length, n = board[0].length;
  const safe = Array.from({ length: m }, () => new Array(n).fill(false));
  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== "O" || safe[r][c]) return;
    safe[r][c] = true;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < m; r++) { dfs(r, 0); dfs(r, n - 1); }
  for (let c = 0; c < n; c++) { dfs(0, c); dfs(m - 1, c); }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "O" && !safe[r][c]) board[r][c] = "X";
    }
  }
}`,
        typescript: `function solve(board: string[][]): void {
  const m = board.length, n = board[0].length;
  const safe = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
  const dfs = (r: number, c: number): void => {
    if (r < 0 || r >= m || c < 0 || c >= n || board[r][c] !== "O" || safe[r][c]) return;
    safe[r][c] = true;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  };
  for (let r = 0; r < m; r++) { dfs(r, 0); dfs(r, n - 1); }
  for (let c = 0; c < n; c++) { dfs(0, c); dfs(m - 1, c); }
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (board[r][c] === "O" && !safe[r][c]) board[r][c] = "X";
    }
  }
}`,

        java: `class Solution {
    public void solve(char[][] board) {
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') mark(board, i, 0);
            if (board[i][n - 1] == 'O') mark(board, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') mark(board, 0, j);
            if (board[m - 1][j] == 'O') mark(board, m - 1, j);
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == '#') board[i][j] = 'O';
            }
        }
    }

    private void mark(char[][] board, int i, int j) {
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != 'O') return;
        board[i][j] = '#';
        mark(board, i + 1, j);
        mark(board, i - 1, j);
        mark(board, i, j + 1);
        mark(board, i, j - 1);
    }
}`,
        cpp: `class Solution {
public:
    void solve(vector<vector<char>>& board) {
        int m = board.size(), n = board[0].size();
        function<void(int,int)> mark = [&](int i, int j) {
            if (i < 0 || i >= m || j < 0 || j >= n || board[i][j] != 'O') return;
            board[i][j] = '#';
            mark(i + 1, j);
            mark(i - 1, j);
            mark(i, j + 1);
            mark(i, j - 1);
        };
        for (int i = 0; i < m; i++) {
            if (board[i][0] == 'O') mark(i, 0);
            if (board[i][n - 1] == 'O') mark(i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            if (board[0][j] == 'O') mark(0, j);
            if (board[m - 1][j] == 'O') mark(m - 1, j);
        }
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (board[i][j] == 'O') board[i][j] = 'X';
                else if (board[i][j] == '#') board[i][j] = 'O';
            }
        }
    }
};`,      },
    },
  },
  {
    slug: "rotting-oranges",
    title: "Rotting Oranges",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Matrix", "BFS"],
    order: 4,
    description: `You are given an \`m x n\` grid where each cell can have one of three values:
- \`0\` representing an empty cell,
- \`1\` representing a fresh orange, or
- \`2\` representing a rotten orange.

Every minute, any fresh orange that is **4-directionally adjacent** to a rotten orange becomes rotten.

Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.`,
    examples: [
      { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], output: 4 },
      { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], output: -1 },
      { args: [[[0, 2]]], output: 0 },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 10", "grid[i][j] is 0, 1, or 2."],
    starter: {
      python: `from typing import List\n\n\ndef orangesRotting(grid: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function orangesRotting(grid) {\n    \n}`,
      typescript: `function orangesRotting(grid: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int orangesRotting(int[][] grid) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int orangesRotting(vector<vector<int>>& grid) {\n        \n    }\n};`,
    },
    methodName: "orangesRotting",
    argTypes: ["int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[[2, 1, 1], [1, 1, 0], [0, 1, 1]]], output: 4 },
      { args: [[[2, 1, 1], [0, 1, 1], [1, 0, 1]]], output: -1 },
      { args: [[[0, 2]]], output: 0 },
    ],
    hiddenTests: [
      { args: [[[1]]], output: -1 },
      { args: [[[2]]], output: 0 },
      { args: [[[0]]], output: 0 },
      { args: [[[2, 2, 2], [2, 2, 2], [2, 2, 2]]], output: 0 },
      { args: [[[1, 2, 1, 1], [1, 1, 0, 1], [1, 1, 1, 1]]], output: 4 },
    ],
    editorial: {
      approach: `Multi-source BFS: enqueue every initially rotten orange at "minute 0", then process level by level. Each minute, newly rotted neighbors are enqueued for the next level. Track the count of fresh oranges — if any remain after the BFS, return -1.

Each cell is enqueued once, so the time is O(m * n).`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def orangesRotting(grid: List[List[int]]) -> int:
    from collections import deque

    m, n = len(grid), len(grid[0])
    q = deque()
    fresh = 0
    for r in range(m):
        for c in range(n):
            if grid[r][c] == 2:
                q.append((r, c))
            elif grid[r][c] == 1:
                fresh += 1
    minutes = 0
    while q and fresh:
        for _ in range(len(q)):
            r, c = q.popleft()
            for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nr, nc = r + dr, c + dc
                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc))
        minutes += 1
    return minutes if fresh == 0 else -1`,
        javascript: `function orangesRotting(grid) {
  const m = grid.length, n = grid[0].length;
  const q = [];
  let fresh = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  let minutes = 0;
  while (q.length && fresh) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift();
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          q.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,
        typescript: `function orangesRotting(grid: number[][]): number {
  const m = grid.length, n = grid[0].length;
  const q: number[][] = [];
  let fresh = 0;
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 2) q.push([r, c]);
      else if (grid[r][c] === 1) fresh++;
    }
  }
  let minutes = 0;
  while (q.length && fresh) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const [r, c] = q.shift()!;
      for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          q.push([nr, nc]);
        }
      }
    }
    minutes++;
  }
  return fresh === 0 ? minutes : -1;
}`,

        java: `class Solution {
    public int orangesRotting(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        ArrayDeque<int[]> q = new ArrayDeque<>();
        int fresh = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.add(new int[]{i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int minutes = 0;
        while (!q.isEmpty() && fresh > 0) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                int[] cell = q.poll();
                for (int[] d : dirs) {
                    int ni = cell[0] + d[0], nj = cell[1] + d[1];
                    if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1) {
                        grid[ni][nj] = 2;
                        fresh--;
                        q.add(new int[]{ni, nj});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
}`,
        cpp: `class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        queue<pair<int,int>> q;
        int fresh = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        int minutes = 0;
        while (!q.empty() && fresh > 0) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                auto [i, j] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int ni = i + d[0], nj = j + d[1];
                    if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1) {
                        grid[ni][nj] = 2;
                        fresh--;
                        q.push({ni, nj});
                    }
                }
            }
            minutes++;
        }
        return fresh == 0 ? minutes : -1;
    }
};`,      },
    },
  },
];
