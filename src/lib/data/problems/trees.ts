import type { Problem } from "@/lib/types";

export const treesProblems: Problem[] = [
  {
    slug: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "trees",
    topics: ["Tree", "DFS"],
    order: 1,
    description: `Given the root of a binary tree, invert the tree, and return its root.

A binary tree is given in tests as a level-order array where \`null\` marks a missing child, e.g. \`[4, 2, 7, 1, 3, 6, 9]\`. The \`TreeNode\` class has \`val\`, \`left\` and \`right\` fields. Return the root of the inverted tree (the judge serializes it back to an array).`,
    examples: [
      { args: [[4, 2, 7, 1, 3, 6, 9]], output: [4, 7, 2, 9, 6, 3, 1] },
      { args: [[2, 1, 3]], output: [2, 3, 1] },
      { args: [[]], output: null },
    ],
    constraints: ["0 <= number of nodes <= 100", "-100 <= Node.val <= 100"],
    starter: {
      python: `from typing import Optional


def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    pass
`,
      javascript: `function invertTree(root) {
    
}`,
      typescript: `function invertTree(root: TreeNode | null): TreeNode | null {
    
}`,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        
    }
}`,
      cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        
    }
};`,
    },
    methodName: "invertTree",
    argTypes: ["tree"],
    outputType: "tree",
    compare: "exact",
    visibleTests: [
      { args: [[4, 2, 7, 1, 3, 6, 9]], output: [4, 7, 2, 9, 6, 3, 1] },
      { args: [[2, 1, 3]], output: [2, 3, 1] },
      { args: [[]], output: null },
    ],
    hiddenTests: [
      { args: [[1]], output: [1] },
      { args: [[1, 2]], output: [1, null, 2] },
      { args: [[1, null, 2]], output: [1, 2] },
      { args: [[3, 2, 1, 4, 5, 6, 7]], output: [3, 1, 2, 7, 6, 5, 4] },
    ],
    editorial: {
      approach: `Recursively swap every node's left and right children. For each node: recurse into the left subtree, recurse into the right subtree, then swap them. The base case is a null node.

Every node is visited once, so the time is O(n); recursion uses O(h) stack space, where h is the tree height.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def invertTree(root: Optional[TreeNode]) -> Optional[TreeNode]:
    if root is None:
        return None
    root.left, root.right = invertTree(root.right), invertTree(root.left)
    return root`,
        javascript: `function invertTree(root) {
  if (!root) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}`,
        typescript: `function invertTree(root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const left = invertTree(root.left);
  root.left = invertTree(root.right);
  root.right = left;
  return root;
}`,

        java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        if (root == null) return null;
        TreeNode left = invertTree(root.left);
        root.left = invertTree(root.right);
        root.right = left;
        return root;
    }
}`,
        cpp: `class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* left = invertTree(root->left);
        root->left = invertTree(root->right);
        root->right = left;
        return root;
    }
};`,      },
    },
  },
  {
    slug: "maximum-depth-of-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "trees",
    topics: ["Tree", "DFS", "BFS"],
    order: 2,
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

Trees are given as level-order arrays in tests.`,
    examples: [
      { args: [[3, 9, 20, null, null, 15, 7]], output: 3 },
      { args: [[1, null, 2]], output: 2 },
    ],
    constraints: ["0 <= number of nodes <= 10^4", "-100 <= Node.val <= 100"],
    starter: {
      python: `from typing import Optional


def maxDepth(root: Optional[TreeNode]) -> int:
    pass
`,
      javascript: `function maxDepth(root) {
    
}`,
      typescript: `function maxDepth(root: TreeNode | null): number {
    
}`,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    }
};`,
    },
    methodName: "maxDepth",
    argTypes: ["tree"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 9, 20, null, null, 15, 7]], output: 3 },
      { args: [[1, null, 2]], output: 2 },
    ],
    hiddenTests: [
      { args: [[]], output: 0 },
      { args: [[1]], output: 1 },
      { args: [[1, 2, 3, 4, null, null, 5]], output: 3 },
      { args: [[1, 2, null, 3, null, 4]], output: 4 },
    ],
    editorial: {
      approach: `The depth of a tree is 1 plus the maximum of the depths of its subtrees. Recurse: a null node has depth 0; otherwise return \`1 + max(maxDepth(left), maxDepth(right))\`.

O(n) time, O(h) recursion space.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def maxDepth(root: Optional[TreeNode]) -> int:
    if root is None:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
        javascript: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        typescript: `function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,

        java: `class Solution {
    public int maxDepth(TreeNode root) {
        if (root == null) return 0;
        return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
    }
}`,
        cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};`,      },
    },
  },
  {
    slug: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "trees",
    topics: ["Tree", "DFS", "BFS"],
    order: 3,
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

Trees are given as level-order arrays in tests.`,
    examples: [
      { args: [[1, 2, 3], [1, 2, 3]], output: true },
      { args: [[1, 2], [1, null, 2]], output: false },
      { args: [[1, 2, 1], [1, 1, 2]], output: false },
    ],
    constraints: ["0 <= number of nodes <= 100", "-10^4 <= Node.val <= 10^4"],
    starter: {
      python: `from typing import Optional


def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    pass
`,
      javascript: `function isSameTree(p, q) {
    
}`,
      typescript: `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
    
}`,
      java: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        
    }
};`,
    },
    methodName: "isSameTree",
    argTypes: ["tree", "tree"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3], [1, 2, 3]], output: true },
      { args: [[1, 2], [1, null, 2]], output: false },
      { args: [[1, 2, 1], [1, 1, 2]], output: false },
    ],
    hiddenTests: [
      { args: [[], []], output: true },
      { args: [[1], []], output: false },
      { args: [[], [1]], output: false },
      { args: [[1, 2, 3, 4], [1, 2, 3, null, null, 4]], output: false },
      { args: [[1, 2, 3], [1, 2, 3, null, null, null, 4]], output: false },
    ],
    editorial: {
      approach: `Compare nodes pairwise. Both null means equal; exactly one null means different; otherwise the values must match and both left subtrees and right subtrees must be equal recursively.

O(min(n, m)) time and O(h) space.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def isSameTree(p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
    if p is None and q is None:
        return True
    if p is None or q is None:
        return False
    return (
        p.val == q.val
        and isSameTree(p.left, q.left)
        and isSameTree(p.right, q.right)
    )`,
        javascript: `function isSameTree(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
        typescript: `function isSameTree(p: TreeNode | null, q: TreeNode | null): boolean {
  if (!p && !q) return true;
  if (!p || !q) return false;
  return p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,

        java: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        if (p == null && q == null) return true;
        if (p == null || q == null || p.val != q.val) return false;
        return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
    }
}`,
        cpp: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q || p->val != q->val) return false;
        return isSameTree(p->left, q->left) && isSameTree(p->right, q->right);
    }
};`,      },
    },
  },
  {
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "trees",
    topics: ["Tree", "BFS"],
    order: 4,
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).

Trees are given as level-order arrays in tests.`,
    examples: [
      { args: [[3, 9, 20, null, null, 15, 7]], output: [[3], [9, 20], [15, 7]] },
      { args: [[1]], output: [[1]] },
      { args: [[]], output: [] },
    ],
    constraints: ["0 <= number of nodes <= 2000", "-1000 <= Node.val <= 1000"],
    starter: {
      python: `from typing import List, Optional


def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    pass
`,
      javascript: `function levelOrder(root) {
    
}`,
      typescript: `function levelOrder(root: TreeNode | null): number[][] {
    
}`,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        
    }
};`,
    },
    methodName: "levelOrder",
    argTypes: ["tree"],
    outputType: "int[][]",
    compare: "exact",
    visibleTests: [
      { args: [[3, 9, 20, null, null, 15, 7]], output: [[3], [9, 20], [15, 7]] },
      { args: [[1]], output: [[1]] },
      { args: [[]], output: [] },
    ],
    hiddenTests: [
      { args: [[1, 2, 3, 4, null, null, 5]], output: [[1], [2, 3], [4, 5]] },
      { args: [[1, null, 2, null, 3]], output: [[1], [2], [3]] },
      { args: [[5, 3, 8, 1, 4, 7, 9]], output: [[5], [3, 8], [1, 4, 7, 9]] },
    ],
    editorial: {
      approach: `Run a breadth-first search with a queue. Process the tree level by level: at each level, record the number of nodes currently in the queue, pop exactly that many, collect their values, and enqueue their children — the next level is then fully queued.

O(n) time and O(n) space for the queue.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def levelOrder(root: Optional[TreeNode]) -> List[List[int]]:
    result = []
    if root is None:
        return result
    queue = [root]
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.pop(0)
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result`,
        javascript: `function levelOrder(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];
  while (queue.length) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,
        typescript: `function levelOrder(root: TreeNode | null): number[][] {
  const result: number[][] = [];
  if (!root) return result;
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const level: number[] = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}`,

        java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> res = new ArrayList<>();
        if (root == null) return res;
        ArrayDeque<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            List<Integer> level = new ArrayList<>();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                level.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
            res.add(level);
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            vector<int> level;
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "validate-binary-search-tree",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "trees",
    topics: ["Tree", "DFS", "BST"],
    order: 5,
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

Trees are given as level-order arrays in tests.`,
    examples: [
      { args: [[2, 1, 3]], output: true },
      { args: [[5, 1, 4, null, null, 3, 6]], output: false, explain: "The right child 4 is smaller than the root 5." },
    ],
    constraints: ["1 <= number of nodes <= 10^4", "-2^31 <= Node.val <= 2^31 - 1"],
    starter: {
      python: `from typing import Optional


def isValidBST(root: Optional[TreeNode]) -> bool:
    pass
`,
      javascript: `function isValidBST(root) {
    
}`,
      typescript: `function isValidBST(root: TreeNode | null): boolean {
    
}`,
      java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        
    }
};`,
    },
    methodName: "isValidBST",
    argTypes: ["tree"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[2, 1, 3]], output: true },
      { args: [[5, 1, 4, null, null, 3, 6]], output: false },
    ],
    hiddenTests: [
      { args: [[2147483647]], output: true },
      { args: [[2, 2, 2]], output: false },
      { args: [[5, 4, 6, null, null, 3, 7]], output: false },
      { args: [[3, 1, 5, null, null, 4, 6]], output: true },
      { args: [[10, 5, 15, null, null, 6, 20]], output: false },
    ],
    editorial: {
      approach: `A node is valid only if its value falls inside a strict range inherited from its ancestors. Recurse with a lower and upper bound: for the left child, the upper bound tightens to the parent's value; for the right child, the lower bound tightens to the parent's value.

Alternatively, an in-order traversal of a valid BST yields strictly increasing values — checking that property is an equivalent approach. O(n) time, O(h) space.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def isValidBST(root: Optional[TreeNode]) -> bool:
    def valid(node, low, high):
        if node is None:
            return True
        if not (low < node.val < high):
            return False
        return valid(node.left, low, node.val) and valid(node.right, node.val, high)

    return valid(root, float("-inf"), float("inf"))`,
        javascript: `function isValidBST(root) {
  const valid = (node, low, high) => {
    if (!node) return true;
    if (!(low < node.val && node.val < high)) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  };
  return valid(root, -Infinity, Infinity);
}`,
        typescript: `function isValidBST(root: TreeNode | null): boolean {
  const valid = (node: TreeNode | null, low: number, high: number): boolean => {
    if (!node) return true;
    if (!(low < node.val && node.val < high)) return false;
    return valid(node.left, low, node.val) && valid(node.right, node.val, high);
  };
  return valid(root, -Infinity, Infinity);
}`,

        java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        return check(root, Long.MIN_VALUE, Long.MAX_VALUE);
    }

    private boolean check(TreeNode node, long lo, long hi) {
        if (node == null) return true;
        if (node.val <= lo || node.val >= hi) return false;
        return check(node.left, lo, node.val) && check(node.right, node.val, hi);
    }
}`,
        cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        return check(root, LONG_MIN, LONG_MAX);
    }

    bool check(TreeNode* node, long long lo, long long hi) {
        if (!node) return true;
        if (node->val <= lo || node->val >= hi) return false;
        return check(node->left, lo, node->val) && check(node->right, node->val, hi);
    }
};`,      },
    },
  },
  {
    slug: "binary-tree-maximum-path-sum",
    title: "Binary Tree Maximum Path Sum",
    difficulty: "Hard",
    category: "trees",
    topics: ["Tree", "DFS", "DP"],
    order: 6,
    description: `A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the \`root\` of a binary tree, return the **maximum path sum**.

Trees are given as level-order arrays in tests.`,
    examples: [
      { args: [[1, 2, 3]], output: 6, explain: "The optimal path is 2 -> 1 -> 3 with a sum of 6." },
      { args: [[-10, 9, 20, null, null, 15, 7]], output: 42, explain: "The optimal path is 15 -> 20 -> 7 with a sum of 42." },
    ],
    constraints: ["1 <= number of nodes <= 3 * 10^4", "-1000 <= Node.val <= 1000"],
    starter: {
      python: `from typing import Optional


def maxPathSum(root: Optional[TreeNode]) -> int:
    pass
`,
      javascript: `function maxPathSum(root) {
    
}`,
      typescript: `function maxPathSum(root: TreeNode | null): number {
    
}`,
      java: `class Solution {
    public int maxPathSum(TreeNode root) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxPathSum(TreeNode* root) {
        
    }
};`,
    },
    methodName: "maxPathSum",
    argTypes: ["tree"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3]], output: 6 },
      { args: [[-10, 9, 20, null, null, 15, 7]], output: 42 },
    ],
    hiddenTests: [
      { args: [[-3]], output: -3 },
      { args: [[2, -1]], output: 2 },
      { args: [[-2, -1]], output: -1 },
      { args: [[1, -2, 3]], output: 4 },
      { args: [[5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1]], output: 48 },
    ],
    editorial: {
      approach: `For each node, consider two quantities:
- The **max downward sum** starting at the node and going down one side: \`node.val + max(0, bestLeft, bestRight)\` — taking 0 for a side means we simply don't extend into it.
- The **path through the node**: \`node.val + bestLeft + bestRight\`, which is a candidate for the global answer.

Post-order DFS computes both, and the global maximum is updated at every node. Negative subtrees are dropped by the \`max(0, ...)\` clamp, which also handles all-negative trees.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def maxPathSum(root: Optional[TreeNode]) -> int:
    best = float("-inf")

    def dfs(node):
        nonlocal best
        if node is None:
            return 0
        left = max(dfs(node.left), 0)
        right = max(dfs(node.right), 0)
        best = max(best, node.val + left + right)
        return node.val + max(left, right)

    dfs(root)
    return best`,
        javascript: `function maxPathSum(root) {
  let best = -Infinity;
  const dfs = (node) => {
    if (!node) return 0;
    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  };
  dfs(root);
  return best;
}`,
        typescript: `function maxPathSum(root: TreeNode | null): number {
  let best = -Infinity;
  const dfs = (node: TreeNode | null): number => {
    if (!node) return 0;
    const left = Math.max(dfs(node.left), 0);
    const right = Math.max(dfs(node.right), 0);
    best = Math.max(best, node.val + left + right);
    return node.val + Math.max(left, right);
  };
  dfs(root);
  return best;
}`,

        java: `class Solution {
    private int best = Integer.MIN_VALUE;

    public int maxPathSum(TreeNode root) {
        best = Integer.MIN_VALUE;
        dfs(root);
        return best;
    }

    private int dfs(TreeNode node) {
        if (node == null) return 0;
        int left = Math.max(0, dfs(node.left));
        int right = Math.max(0, dfs(node.right));
        best = Math.max(best, node.val + left + right);
        return node.val + Math.max(left, right);
    }
}`,
        cpp: `class Solution {
public:
    int best = INT_MIN;

    int maxPathSum(TreeNode* root) {
        best = INT_MIN;
        dfs(root);
        return best;
    }

    int dfs(TreeNode* node) {
        if (!node) return 0;
        int left = max(0, dfs(node->left));
        int right = max(0, dfs(node->right));
        best = max(best, node->val + left + right);
        return node->val + max(left, right);
    }
};`,      },
    },
  },
];
