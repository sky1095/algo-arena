import type { Problem } from "@/lib/types";

export const graphsExtra: Problem[] = [
  {
    slug: "max-area-of-island",
    title: "Max Area of Island",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Array", "DFS", "BFS", "Matrix"],
    order: 4,
    description: `You are given an \`m x n\` binary matrix \`grid\`. An island is a group of \`1\`'s (representing land) connected **4-directionally** (horizontal or vertical.) You may assume all four edges of the grid are surrounded by water.
\nThe **area** of an island is the number of cells with a value \`1\` in the island.\n\nReturn the maximum **area** of an island in \`grid\`. If there is no island, return \`0\`.`,
    examples: [
      {
        args: [
          [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          ],
        ],
        output: 6,
      },
      { args: [[[0, 0, 0, 0, 0, 0, 0, 0]]], output: 0 },
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 50", "grid[i][j] is either 0 or 1."],
    starter: {
      python: `from typing import List\n\n\ndef maxAreaOfIsland(grid: List[List[int]]) -> int:\n    pass\n`,
      javascript: `function maxAreaOfIsland(grid) {\n    \n}`,
      typescript: `function maxAreaOfIsland(grid: number[][]): number {\n    \n}`,
      java: `class Solution {\n    public int maxAreaOfIsland(int[][] grid) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int maxAreaOfIsland(vector<vector<int>>& grid) {\n        \n    }\n};`,
      dart: `class Solution {
  int maxAreaOfIsland(List<List<int>> grid) {
    
  }
}`,
    },
    methodName: "maxAreaOfIsland",
    argTypes: ["int[][]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      {
        args: [
          [
            [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0],
            [0, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
          ],
        ],
        output: 6,
      },
      { args: [[[0, 0, 0, 0, 0, 0, 0, 0]]], output: 0 },
    ],
    hiddenTests: [
      { args: [[[1, 1], [1, 1]]], output: 4 },
      { args: [[[0]]], output: 0 },
      { args: [[[1, 0, 1], [0, 1, 0], [1, 0, 1]]], output: 1 },
      { args: [[[0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 0, 0], [1, 0, 0, 1]]], output: 4 },
      { args: [[[1, 1, 1, 1], [1, 0, 0, 1], [1, 1, 1, 1]]], output: 10 },
    ],
    editorial: {
      approach: `Scan every cell; when a \`1\` is found, flood-fill the whole island with DFS (or BFS), counting its cells and marking them visited (flip to \`0\` or use a visited set). Track the maximum count.\n\nEach cell is visited once: O(m * n) time and O(m * n) worst-case recursion space.`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def maxAreaOfIsland(grid: List[List[int]]) -> int:
    m, n = len(grid), len(grid[0])
    best = 0

    def dfs(r: int, c: int) -> int:
        if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] == 0:
            return 0
        grid[r][c] = 0
        return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1)

    for r in range(m):
        for c in range(n):
            if grid[r][c] == 1:
                best = max(best, dfs(r, c))
    return best`,
        javascript: `function maxAreaOfIsland(grid) {
  const m = grid.length, n = grid[0].length;
  let best = 0;
  const dfs = (r, c) => {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) return 0;
    grid[r][c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r][c] === 1) best = Math.max(best, dfs(r, c));
    }
  }
  return best;
}`,
        typescript: `function maxAreaOfIsland(grid: number[][]): number {
  const m = grid.length, n = grid[0]!.length;
  let best = 0;
  const dfs = (r: number, c: number): number => {
    if (r < 0 || r >= m || c < 0 || c >= n || grid[r]![c] === 0) return 0;
    grid[r]![c] = 0;
    return 1 + dfs(r + 1, c) + dfs(r - 1, c) + dfs(r, c + 1) + dfs(r, c - 1);
  };
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (grid[r]![c] === 1) best = Math.max(best, dfs(r, c));
    }
  }
  return best;
}`,

        java: `class Solution {
    public int maxAreaOfIsland(int[][] grid) {
        int m = grid.length, n = grid[0].length;
        int best = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) {
                    best = Math.max(best, area(grid, i, j));
                }
            }
        }
        return best;
    }

    private int area(int[][] grid, int i, int j) {
        if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != 1) return 0;
        grid[i][j] = 0;
        return 1 + area(grid, i + 1, j) + area(grid, i - 1, j) + area(grid, i, j + 1) + area(grid, i, j - 1);
    }
}`,
        cpp: `class Solution {
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        function<int(int,int)> area = [&](int i, int j) -> int {
            if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] != 1) return 0;
            grid[i][j] = 0;
            return 1 + area(i + 1, j) + area(i - 1, j) + area(i, j + 1) + area(i, j - 1);
        };
        int best = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == 1) best = max(best, area(i, j));
            }
        }
        return best;
    }
};`,      },
    },
  },
  {
    slug: "pacific-atlantic-water-flow",
    title: "Pacific Atlantic Water Flow",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Array", "DFS", "BFS", "Matrix"],
    order: 5,
    description: `There is an \`m x n\` rectangular island that borders both the **Pacific Ocean** and **Atlantic Ocean**. The Pacific Ocean touches the island's left and top edges, and the Atlantic Ocean touches the right and bottom edges.
\nThe island is partitioned into a grid of square cells. You are given an \`m x n\` integer matrix \`heights\` where \`heights[r][c]\` represents the height above sea level of the cell at coordinate \`(r, c)\`.\n\nThe island receives a lot of rain, and the rain water can flow to neighboring cells directly north, south, east, and west if the neighboring cell's height is **less than or equal to** the current cell's height. Water can flow from any cell adjacent to an ocean into the ocean.\n\nReturn a **2D list** of grid coordinates \`result\` where \`result[i] = [r_i, c_i]\` denotes that rain water can flow from cell \`(r_i, c_i)\` to **both** the Pacific and Atlantic oceans.`,
    examples: [
      {
        args: [
          [
            [1, 2, 2, 3, 5],
            [3, 2, 3, 4, 4],
            [2, 4, 5, 3, 1],
            [6, 7, 1, 4, 5],
            [5, 1, 1, 2, 4],
          ],
        ],
        output: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
      },
      { args: [[[1]]], output: [[0, 0]] },
    ],
    constraints: ["m == heights.length", "n == heights[r].length", "1 <= m, n <= 200", "0 <= heights[r][c] <= 10^5"],
    starter: {
      python: `from typing import List\n\n\ndef pacificAtlantic(heights: List[List[int]]) -> List[List[int]]:\n    pass\n`,
      javascript: `function pacificAtlantic(heights) {\n    \n}`,
      typescript: `function pacificAtlantic(heights: number[][]): number[][] {\n    \n}`,
      java: `class Solution {\n    public List<List<Integer>> pacificAtlantic(int[][] heights) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {\n        \n    }\n};`,
      dart: `class Solution {
  List<List<int>> pacificAtlantic(List<List<int>> heights) {
    
  }
}`,
    },
    methodName: "pacificAtlantic",
    argTypes: ["int[][]"],
    outputType: "int[][]",
    compare: "anyOrder",
    visibleTests: [
      {
        args: [
          [
            [1, 2, 2, 3, 5],
            [3, 2, 3, 4, 4],
            [2, 4, 5, 3, 1],
            [6, 7, 1, 4, 5],
            [5, 1, 1, 2, 4],
          ],
        ],
        output: [[0, 4], [1, 3], [1, 4], [2, 2], [3, 0], [3, 1], [4, 0]],
      },
      { args: [[[1]]], output: [[0, 0]] },
    ],
    hiddenTests: [
      { args: [[[2, 1], [1, 2]]], output: [[0, 0], [0, 1], [1, 0], [1, 1]] },
      {
        args: [
          [
            [1, 2, 3],
            [8, 9, 4],
            [7, 6, 5],
          ],
        ],
        output: [[0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]],
      },
      {
        args: [
          [
            [10, 10, 10],
            [10, 1, 10],
            [10, 10, 10],
          ],
        ],
        output: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]],
      },
      { args: [[[3, 3, 3], [3, 1, 3], [0, 2, 4]]], output: [[0, 0], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1], [2, 2]] },
    ],
    editorial: {
      approach: `Flood-fill **backwards** from the oceans. Water flows downhill (to cells with height <= current), so any cell reachable from an ocean going *uphill* (or equal) can drain into that ocean. Run DFS/BFS from every Pacific-border cell marking the pacific-reachable set, and likewise for the Atlantic. The answer is the intersection.\n\nO(m * n) time and space.`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def pacificAtlantic(heights: List[List[int]]) -> List[List[int]]:
    m, n = len(heights), len(heights[0])
    pac = [[False] * n for _ in range(m)]
    atl = [[False] * n for _ in range(m)]

    def dfs(r: int, c: int, seen: List[List[bool]]) -> None:
        seen[r][c] = True
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and not seen[nr][nc] and heights[nr][nc] >= heights[r][c]:
                dfs(nr, nc, seen)

    for r in range(m):
        dfs(r, 0, pac)
        dfs(r, n - 1, atl)
    for c in range(n):
        dfs(0, c, pac)
        dfs(m - 1, c, atl)

    return [[r, c] for r in range(m) for c in range(n) if pac[r][c] and atl[r][c]]`,
        javascript: `function pacificAtlantic(heights) {
  const m = heights.length, n = heights[0].length;
  const pac = Array.from({ length: m }, () => new Array(n).fill(false));
  const atl = Array.from({ length: m }, () => new Array(n).fill(false));
  const dfs = (r, c, seen) => {
    seen[r][c] = true;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !seen[nr][nc] && heights[nr][nc] >= heights[r][c]) {
        dfs(nr, nc, seen);
      }
    }
  };
  for (let r = 0; r < m; r++) {
    dfs(r, 0, pac);
    dfs(r, n - 1, atl);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, pac);
    dfs(m - 1, c, atl);
  }
  const result = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r][c] && atl[r][c]) result.push([r, c]);
    }
  }
  return result;
}`,
        typescript: `function pacificAtlantic(heights: number[][]): number[][] {
  const m = heights.length, n = heights[0]!.length;
  const pac = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
  const atl = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));
  const dfs = (r: number, c: number, seen: boolean[][]): void => {
    seen[r]![c] = true;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !seen[nr]![nc] && heights[nr]![nc]! >= heights[r]![c]!) {
        dfs(nr, nc, seen);
      }
    }
  };
  for (let r = 0; r < m; r++) {
    dfs(r, 0, pac);
    dfs(r, n - 1, atl);
  }
  for (let c = 0; c < n; c++) {
    dfs(0, c, pac);
    dfs(m - 1, c, atl);
  }
  const result: number[][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (pac[r]![c] && atl[r]![c]) result.push([r, c]);
    }
  }
  return result;
}`,

        java: `class Solution {
    public int[][] pacificAtlantic(int[][] heights) {
        int m = heights.length, n = heights[0].length;
        boolean[][] pac = new boolean[m][n];
        boolean[][] atl = new boolean[m][n];
        for (int i = 0; i < m; i++) {
            dfs(heights, pac, i, 0);
            dfs(heights, atl, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(heights, pac, 0, j);
            dfs(heights, atl, m - 1, j);
        }
        List<int[]> res = new ArrayList<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pac[i][j] && atl[i][j]) res.add(new int[]{i, j});
            }
        }
        return res.toArray(new int[0][]);
    }

    private void dfs(int[][] h, boolean[][] seen, int i, int j) {
        if (seen[i][j]) return;
        seen[i][j] = true;
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        for (int[] d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= 0 && ni < h.length && nj >= 0 && nj < h[0].length && !seen[ni][nj] && h[ni][nj] >= h[i][j]) {
                dfs(h, seen, ni, nj);
            }
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));
        function<void(vector<vector<bool>>&,int,int)> dfs = [&](vector<vector<bool>>& seen, int i, int j) {
            if (seen[i][j]) return;
            seen[i][j] = true;
            int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
            for (auto& d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && !seen[ni][nj] && heights[ni][nj] >= heights[i][j]) {
                    dfs(seen, ni, nj);
                }
            }
        };
        for (int i = 0; i < m; i++) {
            dfs(pac, i, 0);
            dfs(atl, i, n - 1);
        }
        for (int j = 0; j < n; j++) {
            dfs(pac, 0, j);
            dfs(atl, m - 1, j);
        }
        vector<vector<int>> res;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (pac[i][j] && atl[i][j]) res.push_back({i, j});
            }
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "walls-and-gates",
    title: "Walls and Gates",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Array", "BFS", "Matrix"],
    order: 6,
    description: `You are given an \`m x n\` grid \`rooms\` initialized with these three possible values.
\n- \`-1\` A wall or an obstacle.\n- \`0\` A gate.\n- \`INF\` Infinity means an empty room. We use the value \`2147483647\` to represent \`INF\` as you may assume that the distance to a gate is less than \`2147483647\`.\n\nFill each empty room with the distance to its **nearest gate**. If it is impossible to reach a gate, it should be filled with \`INF\`.\n\nMutate \`rooms\` in place and return nothing.`,
    examples: [
      {
        args: [
          [
            [2147483647, -1, 0, 2147483647],
            [2147483647, 2147483647, 2147483647, -1],
            [2147483647, -1, 2147483647, -1],
            [0, -1, 2147483647, 2147483647],
          ],
        ],
        output: [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]],
      },
      { args: [[[-1]]], output: [[-1]] },
    ],
    constraints: ["m == rooms.length", "n == rooms[i].length", "1 <= m, n <= 250", "rooms[i][j] is -1, 0, or 2^31 - 1."],
    starter: {
      python: `from typing import List\n\n\ndef wallsAndGates(rooms: List[List[int]]) -> None:\n    pass\n`,
      javascript: `function wallsAndGates(rooms) {\n    \n}`,
      typescript: `function wallsAndGates(rooms: number[][]): void {\n    \n}`,
      java: `class Solution {\n    public void wallsAndGates(int[][] rooms) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    void wallsAndGates(vector<vector<int>>& rooms) {\n        \n    }\n};`,
      dart: `class Solution {
  void wallsAndGates(List<List<int>> rooms) {
    
  }
}`,
    },
    methodName: "wallsAndGates",
    argTypes: ["int[][]"],
    outputType: "void",
    compare: "exact",
    visibleTests: [
      {
        args: [
          [
            [2147483647, -1, 0, 2147483647],
            [2147483647, 2147483647, 2147483647, -1],
            [2147483647, -1, 2147483647, -1],
            [0, -1, 2147483647, 2147483647],
          ],
        ],
        output: [[3, -1, 0, 1], [2, 2, 1, -1], [1, -1, 2, -1], [0, -1, 3, 4]],
      },
      { args: [[[-1]]], output: [[-1]] },
    ],
    hiddenTests: [
      { args: [[[0]]], output: [[0]] },
      { args: [[[2147483647]]], output: [[2147483647]] },
      { args: [[[0, -1], [2147483647, 2147483647]]], output: [[0, -1], [1, 2]] },
      { args: [[[0, 0], [0, 0]]], output: [[0, 0], [0, 0]] },
      { args: [[[2147483647, 2147483647], [2147483647, 0]]], output: [[2, 1], [1, 0]] },
      { args: [[[0, 2147483647, -1], [2147483647, 2147483647, -1], [2147483647, -1, 0]]], output: [[0, 1, -1], [1, 2, -1], [2, -1, 0]] },
    ],
    editorial: {
      approach: `Multi-source BFS: seed the queue with every gate and run BFS outward. The first time a room is reached gives its shortest distance to a gate, because BFS explores in order of increasing distance. Walls (\`-1\`) are simply skipped.\n\nO(m * n) time and space.`,
      complexity: { time: "O(m * n)", space: "O(m * n)" },
      code: {
        python: `def wallsAndGates(rooms: List[List[int]]) -> None:
    m, n = len(rooms), len(rooms[0])
    from collections import deque
    q = deque()
    for r in range(m):
        for c in range(n):
            if rooms[r][c] == 0:
                q.append((r, c))
    while q:
        r, c = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < m and 0 <= nc < n and rooms[nr][nc] == 2147483647:
                rooms[nr][nc] = rooms[r][c] + 1
                q.append((nr, nc))`,
        javascript: `function wallsAndGates(rooms) {
  const m = rooms.length, n = rooms[0].length;
  const q = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (rooms[r][c] === 0) q.push([r, c]);
    }
  }
  for (let head = 0; head < q.length; head++) {
    const [r, c] = q[head];
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr][nc] === 2147483647) {
        rooms[nr][nc] = rooms[r][c] + 1;
        q.push([nr, nc]);
      }
    }
  }
}`,
        typescript: `function wallsAndGates(rooms: number[][]): void {
  const m = rooms.length, n = rooms[0]!.length;
  const q: number[][] = [];
  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) {
      if (rooms[r]![c] === 0) q.push([r, c]);
    }
  }
  for (let head = 0; head < q.length; head++) {
    const [r, c] = q[head]!;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && rooms[nr]![nc] === 2147483647) {
        rooms[nr]![nc] = rooms[r]![c]! + 1;
        q.push([nr, nc]);
      }
    }
  }
}`,

        java: `class Solution {
    public void wallsAndGates(int[][] rooms) {
        int m = rooms.length, n = rooms[0].length;
        ArrayDeque<int[]> q = new ArrayDeque<>();
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rooms[i][j] == 0) q.add(new int[]{i, j});
            }
        }
        int[][] dirs = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        while (!q.isEmpty()) {
            int[] cell = q.poll();
            for (int[] d : dirs) {
                int ni = cell[0] + d[0], nj = cell[1] + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && rooms[ni][nj] == Integer.MAX_VALUE) {
                    rooms[ni][nj] = rooms[cell[0]][cell[1]] + 1;
                    q.add(new int[]{ni, nj});
                }
            }
        }
    }
}`,
        cpp: `class Solution {
public:
    void wallsAndGates(vector<vector<int>>& rooms) {
        int m = rooms.size(), n = rooms[0].size();
        queue<pair<int,int>> q;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (rooms[i][j] == 0) q.push({i, j});
            }
        }
        int dirs[4][2] = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
        while (!q.empty()) {
            auto [i, j] = q.front(); q.pop();
            for (auto& d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && rooms[ni][nj] == INT_MAX) {
                    rooms[ni][nj] = rooms[i][j] + 1;
                    q.push({ni, nj});
                }
            }
        }
    }
};`,      },
    },
  },
  {
    slug: "course-schedule-ii",
    title: "Course Schedule II",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Graph", "DFS", "BFS", "Topological Sort"],
    order: 7,
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you **must** take course \`b_i\` first if you want to take course \`a_i\`.
\n- For example, the pair \`[0, 1]\`, indicates that to take course \`0\` you have to first take course \`1\`.\n\nReturn the ordering of courses you should take to finish all courses. If there are many valid answers, return **any** of them. If it is impossible to finish all courses, return **an empty array**.`,
    examples: [
      { args: [2, [[1, 0]]], output: [0, 1] },
      { args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], output: [0, 2, 1, 3] },
      { args: [1, []], output: [0] },
    ],
    constraints: ["1 <= numCourses <= 2000", "0 <= prerequisites.length <= numCourses * (numCourses - 1)", "prerequisites[i].length == 2", "0 <= a_i, b_i < numCourses", "All the pairs prerequisites[i] are unique."],
    starter: {
      python: `from typing import List\n\n\ndef findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:\n    pass\n`,
      javascript: `function findOrder(numCourses, prerequisites) {\n    \n}`,
      typescript: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {\n    \n}`,
      java: `class Solution {\n    public int[] findOrder(int numCourses, int[][] prerequisites) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {\n        \n    }\n};`,
      dart: `class Solution {
  List<int> findOrder(int numCourses, List<List<int>> prerequisites) {
    
  }
}`,
    },
    methodName: "findOrder",
    argTypes: ["int", "int[][]"],
    outputType: "int[]",
    compare: "topo",
    visibleTests: [
      { args: [2, [[1, 0]]], output: [0, 1] },
      { args: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], output: [0, 2, 1, 3] },
      { args: [1, []], output: [0] },
    ],
    hiddenTests: [
      { args: [3, [[1, 0], [2, 1]]], output: [0, 1, 2] },
      { args: [2, [[1, 0], [0, 1]]], output: [] },
      { args: [6, [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4]]], output: [0, 1, 2, 3, 4, 5] },
      { args: [4, [[0, 1], [1, 2], [2, 3], [3, 0]]], output: [] },
      { args: [5, [[1, 0], [2, 0], [3, 1], [3, 2], [4, 3]]], output: [0, 1, 2, 3, 4] },
    ],
    editorial: {
      approach: `Kahn's algorithm: compute indegrees, put all zero-indegree courses in a queue, repeatedly pop a course, append it to the order, and decrement the indegrees of its dependents. If the produced order has \`numCourses\` entries, return it; otherwise a cycle exists and the answer is \`[]\`.\n\nO(V + E) time and space.`,
      complexity: { time: "O(V + E)", space: "O(V + E)" },
      code: {
        python: `def findOrder(numCourses: int, prerequisites: List[List[int]]) -> List[int]:
    adj = [[] for _ in range(numCourses)]
    indeg = [0] * numCourses
    for a, b in prerequisites:
        adj[b].append(a)
        indeg[a] += 1
    from collections import deque
    q = deque(i for i in range(numCourses) if indeg[i] == 0)
    order = []
    while q:
        u = q.popleft()
        order.append(u)
        for v in adj[u]:
            indeg[v] -= 1
            if indeg[v] == 0:
                q.append(v)
    return order if len(order) == numCourses else []`,
        javascript: `function findOrder(numCourses, prerequisites) {
  const adj = Array.from({ length: numCourses }, () => []);
  const indeg = new Array(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    adj[b].push(a);
    indeg[a]++;
  }
  const q = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  const order = [];
  for (let head = 0; head < q.length; head++) {
    const u = q[head];
    order.push(u);
    for (const v of adj[u]) {
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return order.length === numCourses ? order : [];
}`,
        typescript: `function findOrder(numCourses: number, prerequisites: number[][]): number[] {
  const adj: number[][] = Array.from({ length: numCourses }, () => []);
  const indeg = new Array<number>(numCourses).fill(0);
  for (const [a, b] of prerequisites) {
    adj[b]!.push(a);
    indeg[a]!++;
  }
  const q: number[] = [];
  for (let i = 0; i < numCourses; i++) if (indeg[i] === 0) q.push(i);
  const order: number[] = [];
  for (let head = 0; head < q.length; head++) {
    const u = q[head]!;
    order.push(u);
    for (const v of adj[u]!) {
      if (--indeg[v] === 0) q.push(v);
    }
  }
  return order.length === numCourses ? order : [];
}`,

        java: `class Solution {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        int[] indeg = new int[numCourses];
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] e : prerequisites) {
            adj.get(e[1]).add(e[0]);
            indeg[e[0]]++;
        }
        ArrayDeque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.add(i);
        int[] order = new int[numCourses];
        int idx = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            order[idx++] = u;
            for (int v : adj.get(u)) {
                if (--indeg[v] == 0) q.add(v);
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`,
        cpp: `class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indeg(numCourses, 0);
        for (auto& e : prerequisites) {
            adj[e[1]].push_back(e[0]);
            indeg[e[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) if (indeg[i] == 0) q.push(i);
        vector<int> order;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            order.push_back(u);
            for (int v : adj[u]) {
                if (--indeg[v] == 0) q.push(v);
            }
        }
        if ((int)order.size() != numCourses) return {};
        return order;
    }
};`,      },
    },
  },
  {
    slug: "redundant-connection",
    title: "Redundant Connection",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Graph", "DFS", "BFS", "Union-Find"],
    order: 8,
    description: `In this problem, a tree is an **undirected graph** that is connected and has no cycles.
\nYou are given a graph that started as a tree with \`n\` nodes labeled from \`1\` to \`n\`, with one additional edge added. The added edge has two **different** vertices chosen from \`1\` to \`n\`, and was not an edge that already existed. The graph is represented as an array \`edges\` of length \`n\` where \`edges[i] = [a_i, b_i]\` indicates that there is an edge between nodes \`a_i\` and \`b_i\` in the graph.\n\nReturn an edge that can be removed so that the resulting graph is a tree of \`n\` nodes. If there are multiple answers, return the answer that occurs last in the input.`,
    examples: [
      { args: [[[1, 2], [1, 3], [2, 3]]], output: [2, 3] },
      { args: [[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], output: [1, 4] },
    ],
    constraints: ["n == edges.length", "3 <= n <= 1000", "edges[i].length == 2", "1 <= a_i < b_i <= edges.length", "The input is generated such that adding edges[i] creates a graph that is connected and has exactly one cycle."],
    starter: {
      python: `from typing import List\n\n\ndef findRedundantConnection(edges: List[List[int]]) -> List[int]:\n    pass\n`,
      javascript: `function findRedundantConnection(edges) {\n    \n}`,
      typescript: `function findRedundantConnection(edges: number[][]): number[] {\n    \n}`,
      java: `class Solution {\n    public int[] findRedundantConnection(int[][] edges) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> findRedundantConnection(vector<vector<int>>& edges) {\n        \n    }\n};`,
      dart: `class Solution {
  List<int> findRedundantConnection(List<List<int>> edges) {
    
  }
}`,
    },
    methodName: "findRedundantConnection",
    argTypes: ["int[][]"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 2], [1, 3], [2, 3]]], output: [2, 3] },
      { args: [[[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]]], output: [1, 4] },
    ],
    hiddenTests: [
      { args: [[[1, 2], [2, 3], [3, 1]]], output: [3, 1] },
      { args: [[[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]]], output: [1, 5] },
      { args: [[[1, 2], [2, 3], [3, 4], [1, 4], [4, 5]]], output: [1, 4] },
      { args: [[[1, 5], [2, 3], [3, 4], [4, 2], [5, 6]]], output: [4, 2] },
      { args: [[[1, 2], [2, 3], [3, 1], [4, 5], [5, 6], [6, 4]]], output: [3, 1] },
    ],
    editorial: {
      approach: `Union-Find: process edges in order; union the two endpoints of each edge. The first edge whose endpoints are already in the same component is the one that closes the single cycle — and since we scan in input order, it is exactly the last edge that could be removed.\n\nO(n * α(n)) time, O(n) space.`,
      complexity: { time: "O(n * α(n))", space: "O(n)" },
      code: {
        python: `def findRedundantConnection(edges: List[List[int]]) -> List[int]:
    parent = list(range(len(edges) + 1))

    def find(x: int) -> int:
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    for a, b in edges:
        ra, rb = find(a), find(b)
        if ra == rb:
            return [a, b]
        parent[ra] = rb
    return []`,
        javascript: `function findRedundantConnection(edges) {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  const find = (x) => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra === rb) return [a, b];
    parent[ra] = rb;
  }
  return [];
}`,
        typescript: `function findRedundantConnection(edges: number[][]): number[] {
  const parent = Array.from({ length: edges.length + 1 }, (_, i) => i);
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]!]!;
      x = parent[x]!;
    }
    return x;
  };
  for (const [a, b] of edges) {
    const ra = find(a), rb = find(b);
    if (ra === rb) return [a, b];
    parent[ra] = rb;
  }
  return [];
}`,

        java: `class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        int[] parent = new int[n + 1];
        for (int i = 1; i <= n; i++) parent[i] = i;
        for (int[] e : edges) {
            int a = find(parent, e[0]), b = find(parent, e[1]);
            if (a == b) return e;
            parent[a] = b;
        }
        return new int[0];
    }

    private int find(int[] parent, int x) {
        if (parent[x] != x) parent[x] = find(parent, parent[x]);
        return parent[x];
    }
}`,
        cpp: `class Solution {
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> parent(n + 1);
        for (int i = 1; i <= n; i++) parent[i] = i;
        function<int(int)> find = [&](int x) -> int {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        };
        for (auto& e : edges) {
            int a = find(e[0]), b = find(e[1]);
            if (a == b) return e;
            parent[a] = b;
        }
        return {};
    }
};`,      },
    },
  },
  {
    slug: "graph-valid-tree",
    title: "Graph Valid Tree",
    difficulty: "Medium",
    category: "graphs",
    topics: ["Graph", "DFS", "BFS", "Union-Find"],
    order: 9,
    description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [a_i, b_i]\` indicates that there is an undirected edge between nodes \`a_i\` and \`b_i\` in the graph.
\nReturn \`true\` if the edges of the given graph make up a valid tree, and \`false\` otherwise.`,
    examples: [
      { args: [5, [[0, 1], [0, 2], [0, 3], [1, 4]]], output: true },
      { args: [5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]], output: false },
    ],
    constraints: ["1 <= n <= 2000", "0 <= edges.length <= 5000", "edges[i].length == 2", "0 <= a_i, b_i < n", "a_i != b_i", "There are no self-loops or repeated edges."],
    starter: {
      python: `from typing import List\n\n\ndef validTree(n: int, edges: List[List[int]]) -> bool:\n    pass\n`,
      javascript: `function validTree(n, edges) {\n    \n}`,
      typescript: `function validTree(n: number, edges: number[][]): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean validTree(int n, int[][] edges) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool validTree(int n, vector<vector<int>>& edges) {\n        \n    }\n};`,
      dart: `class Solution {
  bool validTree(int n, List<List<int>> edges) {
    
  }
}`,
    },
    methodName: "validTree",
    argTypes: ["int", "int[][]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [5, [[0, 1], [0, 2], [0, 3], [1, 4]]], output: true },
      { args: [5, [[0, 1], [1, 2], [2, 3], [1, 3], [1, 4]]], output: false },
    ],
    hiddenTests: [
      { args: [1, []], output: true },
      { args: [4, [[0, 1], [2, 3]]], output: false },
      { args: [3, [[0, 1], [1, 2], [2, 0]]], output: false },
      { args: [3, [[0, 1], [1, 2]]], output: true },
      { args: [6, [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]], output: true },
      { args: [4, [[0, 1], [1, 2], [2, 3], [3, 1]]], output: false },
    ],
    editorial: {
      approach: `A graph is a tree iff it is connected and has exactly \`n - 1\` edges with no cycles. Two checks suffice: the edge count must be \`n - 1\`, and a DFS/BFS from node \`0\` must visit all \`n\` nodes (any cycle would require extra edges given the count, and disconnection is caught by the visit count).\n\nO(V + E) time and space.`,
      complexity: { time: "O(V + E)", space: "O(V + E)" },
      code: {
        python: `def validTree(n: int, edges: List[List[int]]) -> bool:
    if len(edges) != n - 1:
        return False
    adj = [[] for _ in range(n)]
    for a, b in edges:
        adj[a].append(b)
        adj[b].append(a)
    seen = {0}
    stack = [0]
    while stack:
        u = stack.pop()
        for v in adj[u]:
            if v not in seen:
                seen.add(v)
                stack.append(v)
    return len(seen) == n`,
        javascript: `function validTree(n, edges) {
  if (edges.length !== n - 1) return false;
  const adj = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a].push(b);
    adj[b].push(a);
  }
  const seen = new Set([0]);
  const stack = [0];
  while (stack.length) {
    const u = stack.pop();
    for (const v of adj[u]) {
      if (!seen.has(v)) {
        seen.add(v);
        stack.push(v);
      }
    }
  }
  return seen.size === n;
}`,
        typescript: `function validTree(n: number, edges: number[][]): boolean {
  if (edges.length !== n - 1) return false;
  const adj: number[][] = Array.from({ length: n }, () => []);
  for (const [a, b] of edges) {
    adj[a]!.push(b);
    adj[b]!.push(a);
  }
  const seen = new Set<number>([0]);
  const stack = [0];
  while (stack.length) {
    const u = stack.pop()!;
    for (const v of adj[u]!) {
      if (!seen.has(v)) {
        seen.add(v);
        stack.push(v);
      }
    }
  }
  return seen.size === n;
}`,

        java: `class Solution {
    public boolean validTree(int n, int[][] edges) {
        if (edges.length != n - 1) return false;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        boolean[] seen = new boolean[n];
        ArrayDeque<Integer> q = new ArrayDeque<>();
        q.add(0);
        seen[0] = true;
        int visited = 0;
        while (!q.isEmpty()) {
            int u = q.poll();
            visited++;
            for (int v : adj.get(u)) {
                if (!seen[v]) {
                    seen[v] = true;
                    q.add(v);
                }
            }
        }
        return visited == n;
    }
}`,
        cpp: `class Solution {
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if ((int)edges.size() != n - 1) return false;
        vector<vector<int>> adj(n);
        for (auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        vector<bool> seen(n, false);
        queue<int> q;
        q.push(0);
        seen[0] = true;
        int visited = 0;
        while (!q.empty()) {
            int u = q.front(); q.pop();
            visited++;
            for (int v : adj[u]) {
                if (!seen[v]) {
                    seen[v] = true;
                    q.push(v);
                }
            }
        }
        return visited == n;
    }
};`,      },
    },
  },
  {
    slug: "word-ladder",
    title: "Word Ladder",
    difficulty: "Hard",
    category: "graphs",
    topics: ["Hash Table", "String", "BFS"],
    order: 10,
    description: `A **transformation sequence** from word \`beginWord\` to word \`endWord\` using a dictionary \`wordList\` is a sequence of words \`beginWord -> s1 -> s2 -> ... -> sk\` such that:
\n- Every adjacent pair of words differs by a single letter.\n- Every \`si\` for \`1 <= i <= k\` is in \`wordList\`. Note that \`beginWord\` does not need to be in \`wordList\`.\n- \`sk == endWord\`\n\nGiven two words, \`beginWord\` and \`endWord\`, and a dictionary \`wordList\`, return the **number of words** in the **shortest transformation sequence** from \`beginWord\` to \`endWord\`, or \`0\` if no such sequence exists.`,
    examples: [
      {
        args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]],
        output: 5,
        explain: "One shortest transformation: hit -> hot -> dot -> dog -> cog, which is 5 words long.",
      },
      { args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]], output: 0 },
    ],
    constraints: ["1 <= beginWord.length <= 10", "endWord.length == beginWord.length", "1 <= wordList.length <= 5000", "wordList[i].length == beginWord.length", "beginWord, endWord, and wordList[i] consist of lowercase English letters.", "beginWord != endWord", "All the words in wordList are unique."],
    starter: {
      python: `from typing import List\n\n\ndef ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:\n    pass\n`,
      javascript: `function ladderLength(beginWord, endWord, wordList) {\n    \n}`,
      typescript: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {\n    \n}`,
      java: `class Solution {\n    public int ladderLength(String beginWord, String endWord, List<String> wordList) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {\n        \n    }\n};`,
      dart: `class Solution {
  int ladderLength(String beginWord, String endWord, List<String> wordList) {
    
  }
}`,
    },
    methodName: "ladderLength",
    argTypes: ["string", "string", "string[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"]], output: 5 },
      { args: ["hit", "cog", ["hot", "dot", "dog", "lot", "log"]], output: 0 },
    ],
    hiddenTests: [
      { args: ["a", "c", ["a", "b", "c"]], output: 2 },
      { args: ["hot", "dog", ["hot", "dog"]], output: 0 },
      { args: ["hot", "dog", ["hot", "dot", "dog"]], output: 3 },
      { args: ["red", "tax", ["ted", "tex", "red", "tax", "tad", "den", "rex", "pee"]], output: 4 },
      { args: ["lost", "cost", ["most", "fist", "lost", "cost", "fish"]], output: 2 },
      { args: ["toon", "plea", ["poon", "plee", "same", "poie", "plea", "plie", "poin"]], output: 7 },
    ],
    editorial: {
      approach: `BFS over the word graph: start from \`beginWord\`, and for each word generate all one-letter variations and enqueue the ones present in the dictionary, tracking depth. BFS guarantees the first time \`endWord\` is reached is via the shortest sequence.\n\nWith L = word length and N = dictionary size, time is O(N * L * 26) and space O(N).`,
      complexity: { time: "O(N * L * 26)", space: "O(N)" },
      code: {
        python: `def ladderLength(beginWord: str, endWord: str, wordList: List[str]) -> int:
    word_set = set(wordList)
    if endWord not in word_set:
        return 0
    from collections import deque
    q = deque([(beginWord, 1)])
    while q:
        word, depth = q.popleft()
        if word == endWord:
            return depth
        for i in range(len(word)):
            for ch in "abcdefghijklmnopqrstuvwxyz":
                nxt = word[:i] + ch + word[i + 1 :]
                if nxt in word_set:
                    word_set.remove(nxt)
                    q.append((nxt, depth + 1))
    return 0`,
        javascript: `function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const q = [[beginWord, 1]];
  for (let head = 0; head < q.length; head++) {
    const [word, depth] = q[head];
    if (word === endWord) return depth;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c < 123; c++) {
        const ch = String.fromCharCode(c);
        const next = word.slice(0, i) + ch + word.slice(i + 1);
        if (wordSet.has(next)) {
          wordSet.delete(next);
          q.push([next, depth + 1]);
        }
      }
    }
  }
  return 0;
}`,
        typescript: `function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  const q: [string, number][] = [[beginWord, 1]];
  for (let head = 0; head < q.length; head++) {
    const [word, depth] = q[head]!;
    if (word === endWord) return depth;
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c < 123; c++) {
        const ch = String.fromCharCode(c);
        const next = word.slice(0, i) + ch + word.slice(i + 1);
        if (wordSet.has(next)) {
          wordSet.delete(next);
          q.push([next, depth + 1]);
        }
      }
    }
  }
  return 0;
}`,

        java: `class Solution {
    public int ladderLength(String beginWord, String endWord, String[] wordList) {
        Set<String> words = new HashSet<>(Arrays.asList(wordList));
        if (!words.contains(endWord)) return 0;
        ArrayDeque<String> q = new ArrayDeque<>();
        q.add(beginWord);
        int level = 1;
        while (!q.isEmpty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                String cur = q.poll();
                char[] arr = cur.toCharArray();
                for (int i = 0; i < arr.length; i++) {
                    char orig = arr[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        arr[i] = c;
                        String next = new String(arr);
                        if (next.equals(endWord)) return level + 1;
                        if (words.remove(next)) q.add(next);
                    }
                    arr[i] = orig;
                }
            }
            level++;
        }
        return 0;
    }
}`,
        cpp: `class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> words(wordList.begin(), wordList.end());
        if (!words.count(endWord)) return 0;
        queue<string> q;
        q.push(beginWord);
        int level = 1;
        while (!q.empty()) {
            int size = q.size();
            for (int k = 0; k < size; k++) {
                string cur = q.front(); q.pop();
                for (int i = 0; i < (int)cur.size(); i++) {
                    char orig = cur[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        cur[i] = c;
                        if (cur == endWord) return level + 1;
                        auto it = words.find(cur);
                        if (it != words.end()) {
                            words.erase(it);
                            q.push(cur);
                        }
                    }
                    cur[i] = orig;
                }
            }
            level++;
        }
        return 0;
    }
};`,      },
    },
  },
];
