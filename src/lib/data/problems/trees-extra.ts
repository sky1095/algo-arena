import type { Problem } from "@/lib/types";

export const treesExtra: Problem[] = [
  {
    slug: "diameter-of-binary-tree",
    title: "Diameter of Binary Tree",
    difficulty: "Easy",
    category: "trees",
    topics: ["Tree", "DFS"],
    order: 7,
    description: `Given the \`root\` of a binary tree, return the length of the **diameter** of the tree.\n\nThe diameter of a binary tree is the length of the longest path between any two nodes in a tree. This path may or may not pass through the \`root\`.\n\nThe length of a path between two nodes is represented by the number of edges between them.`,
    examples: [
      { args: [[1, 2, 3, 4, 5]], output: 3, explain: "The longest path is 4 -> 2 -> 1 -> 3 or 5 -> 2 -> 1 -> 3, with 3 edges." },
      { args: [[1, 2]], output: 1 },
    ],
    constraints: ["1 <= number of nodes <= 10^4", "-100 <= Node.val <= 100"],
    starter: {
      python: `from typing import Optional\n\n\ndef diameterOfBinaryTree(root: Optional[TreeNode]) -> int:\n    pass\n`,
      javascript: `function diameterOfBinaryTree(root) {\n    \n}`,
      typescript: `function diameterOfBinaryTree(root: TreeNode | null): number {\n    \n}`,
      java: `class Solution {\n    public int diameterOfBinaryTree(TreeNode root) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int diameterOfBinaryTree(TreeNode* root) {\n        \n    }\n};`,
      dart: `class Solution {
  int diameterOfBinaryTree(TreeNode? root) {
    
  }
}`,
    },
    methodName: "diameterOfBinaryTree",
    argTypes: ["tree"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 4, 5]], output: 3 },
      { args: [[1, 2]], output: 1 },
    ],
    hiddenTests: [
      { args: [[1]], output: 0 },
      { args: [[1, 2, 3, 4, 5, 6, 7]], output: 4 },
      { args: [[1, 2, null, 3, null, 4]], output: 3 },
      { args: [[4, 2, 6, 1, 3, 5, 7]], output: 4 },
    ],
    editorial: {
      approach: `The longest path through any node equals the height of its left subtree plus the height of its right subtree. So compute the height of every subtree in a post-order pass while tracking the maximum \`leftHeight + rightHeight\` seen.\n\nHeight itself is \`1 + max(height(left), height(right))\`. O(n) time, O(h) space.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def diameterOfBinaryTree(root: Optional[TreeNode]) -> int:
    best = 0

    def height(node):
        nonlocal best
        if node is None:
            return 0
        left = height(node.left)
        right = height(node.right)
        best = max(best, left + right)
        return 1 + max(left, right)

    height(root)
    return best`,
        javascript: `function diameterOfBinaryTree(root) {
  let best = 0;
  const height = (node) => {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  };
  height(root);
  return best;
}`,
        typescript: `function diameterOfBinaryTree(root: TreeNode | null): number {
  let best = 0;
  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    const left = height(node.left);
    const right = height(node.right);
    best = Math.max(best, left + right);
    return 1 + Math.max(left, right);
  };
  height(root);
  return best;
}`,

        java: `class Solution {
    private int best = 0;

    public int diameterOfBinaryTree(TreeNode root) {
        best = 0;
        height(root);
        return best;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        int right = height(node.right);
        best = Math.max(best, left + right);
        return 1 + Math.max(left, right);
    }
}`,
        cpp: `class Solution {
public:
    int best = 0;

    int diameterOfBinaryTree(TreeNode* root) {
        best = 0;
        height(root);
        return best;
    }

    int height(TreeNode* node) {
        if (!node) return 0;
        int left = height(node->left);
        int right = height(node->right);
        best = max(best, left + right);
        return 1 + max(left, right);
    }
};`,      },
    },
  },
  {
    slug: "balanced-binary-tree",
    title: "Balanced Binary Tree",
    difficulty: "Easy",
    category: "trees",
    topics: ["Tree", "DFS"],
    order: 8,
    description: `Given a binary tree, determine if it is **height-balanced**.\n\nA binary tree is height-balanced if, for every node, the heights of the left and right subtrees differ by at most 1.`,
    examples: [
      { args: [[3, 9, 20, null, null, 15, 7]], output: true },
      { args: [[1, 2, 2, 3, 3, null, null, 4, 4]], output: false },
      { args: [[]], output: true },
    ],
    constraints: ["0 <= number of nodes <= 5000", "-10^4 <= Node.val <= 10^4"],
    starter: {
      python: `from typing import Optional\n\n\ndef isBalanced(root: Optional[TreeNode]) -> bool:\n    pass\n`,
      javascript: `function isBalanced(root) {\n    \n}`,
      typescript: `function isBalanced(root: TreeNode | null): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean isBalanced(TreeNode root) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isBalanced(TreeNode* root) {\n        \n    }\n};`,
      dart: `class Solution {
  bool isBalanced(TreeNode? root) {
    
  }
}`,
    },
    methodName: "isBalanced",
    argTypes: ["tree"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[3, 9, 20, null, null, 15, 7]], output: true },
      { args: [[1, 2, 2, 3, 3, null, null, 4, 4]], output: false },
      { args: [[]], output: true },
    ],
    hiddenTests: [
      { args: [[1]], output: true },
      { args: [[1, 2, null, 3, null, 4]], output: false },
      { args: [[1, 2, 3, 4, 5, null, null, 8]], output: false },
      { args: [[1, null, 2, null, 3]], output: false },
    ],
    editorial: {
      approach: `A post-order traversal returns the height of each subtree, or signals imbalance. At every node, if the difference between left and right heights exceeds 1, the tree is unbalanced; otherwise return \`1 + max(left, right)\`. Propagate a sentinel (e.g. -1) to mark imbalance.\n\nO(n) time and O(h) space.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def isBalanced(root: Optional[TreeNode]) -> bool:
    def height(node):
        if node is None:
            return 0
        left = height(node.left)
        if left == -1:
            return -1
        right = height(node.right)
        if right == -1 or abs(left - right) > 1:
            return -1
        return 1 + max(left, right)

    return height(root) != -1`,
        javascript: `function isBalanced(root) {
  const height = (node) => {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1 || Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  };
  return height(root) !== -1;
}`,
        typescript: `function isBalanced(root: TreeNode | null): boolean {
  const height = (node: TreeNode | null): number => {
    if (!node) return 0;
    const left = height(node.left);
    if (left === -1) return -1;
    const right = height(node.right);
    if (right === -1 || Math.abs(left - right) > 1) return -1;
    return 1 + Math.max(left, right);
  };
  return height(root) !== -1;
}`,

        java: `class Solution {
    public boolean isBalanced(TreeNode root) {
        return height(root) != -1;
    }

    private int height(TreeNode node) {
        if (node == null) return 0;
        int left = height(node.left);
        if (left == -1) return -1;
        int right = height(node.right);
        if (right == -1) return -1;
        if (Math.abs(left - right) > 1) return -1;
        return 1 + Math.max(left, right);
    }
}`,
        cpp: `class Solution {
public:
    bool isBalanced(TreeNode* root) {
        return height(root) != -1;
    }

    int height(TreeNode* node) {
        if (!node) return 0;
        int left = height(node->left);
        if (left == -1) return -1;
        int right = height(node->right);
        if (right == -1) return -1;
        if (abs(left - right) > 1) return -1;
        return 1 + max(left, right);
    }
};`,      },
    },
  },
  {
    slug: "subtree-of-another-tree",
    title: "Subtree of Another Tree",
    difficulty: "Easy",
    category: "trees",
    topics: ["Tree", "DFS"],
    order: 9,
    description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\`, and \`false\` otherwise.\n\nA subtree of a binary tree \`tree\` is a tree that consists of a node in \`tree\` and all of this node's descendants. The tree \`tree\` could also be considered as a subtree of itself.`,
    examples: [
      { args: [[3, 4, 5, 1, 2], [4, 1, 2]], output: true },
      { args: [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], output: false },
    ],
    constraints: ["The number of nodes in the root tree is in the range [1, 2000].", "The number of nodes in the subRoot tree is in the range [1, 1000].", "-10^4 <= root.val <= 10^4", "-10^4 <= subRoot.val <= 10^4"],
    starter: {
      python: `from typing import Optional\n\n\ndef isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:\n    pass\n`,
      javascript: `function isSubtree(root, subRoot) {\n    \n}`,
      typescript: `function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {\n    \n}`,
      java: `class Solution {\n    public boolean isSubtree(TreeNode root, TreeNode subRoot) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    bool isSubtree(TreeNode* root, TreeNode* subRoot) {\n        \n    }\n};`,
      dart: `class Solution {
  bool isSubtree(TreeNode? root, TreeNode? subRoot) {
    
  }
}`,
    },
    methodName: "isSubtree",
    argTypes: ["tree", "tree"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[3, 4, 5, 1, 2], [4, 1, 2]], output: true },
      { args: [[3, 4, 5, 1, 2, null, null, null, null, 0], [4, 1, 2]], output: false },
    ],
    hiddenTests: [
      { args: [[1], [1]], output: true },
      { args: [[1, 2, 3], [2]], output: true },
      { args: [[1, 2, 3], [3]], output: true },
      { args: [[1, 2, 3], [1, 2]], output: false },
      { args: [[1, 1], [1]], output: true },
    ],
    editorial: {
      approach: `Reuse a "same tree" check. At each node of \`root\`, test whether the subtree starting here equals \`subRoot\`; if not, recurse into both children. The base "same tree" comparison checks values and recurses on left and right simultaneously.\n\nWorst case is O(|root| * |subRoot|) time and O(h) space.`,
      complexity: { time: "O(|root| * |subRoot|)", space: "O(h)" },
      code: {
        python: `def isSubtree(root: Optional[TreeNode], subRoot: Optional[TreeNode]) -> bool:
    def same(a, b):
        if a is None and b is None:
            return True
        if a is None or b is None or a.val != b.val:
            return False
        return same(a.left, b.left) and same(a.right, b.right)

    if root is None:
        return False
    if same(root, subRoot):
        return True
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)`,
        javascript: `function isSubtree(root, subRoot) {
  const same = (a, b) => {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  };
  if (!root) return false;
  if (same(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}`,
        typescript: `function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
  const same = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (!a && !b) return true;
    if (!a || !b || a.val !== b.val) return false;
    return same(a.left, b.left) && same(a.right, b.right);
  };
  if (!root) return false;
  if (same(root, subRoot)) return true;
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
}`,

        java: `class Solution {
    public boolean isSubtree(TreeNode root, TreeNode subRoot) {
        if (root == null) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
    }

    private boolean isSame(TreeNode a, TreeNode b) {
        if (a == null && b == null) return true;
        if (a == null || b == null || a.val != b.val) return false;
        return isSame(a.left, b.left) && isSame(a.right, b.right);
    }
}`,
        cpp: `class Solution {
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }

    bool isSame(TreeNode* a, TreeNode* b) {
        if (!a && !b) return true;
        if (!a || !b || a->val != b->val) return false;
        return isSame(a->left, b->left) && isSame(a->right, b->right);
    }
};`,      },
    },
  },
  {
    slug: "lowest-common-ancestor-of-a-binary-search-tree",
    title: "Lowest Common Ancestor of a BST",
    difficulty: "Medium",
    category: "trees",
    topics: ["Tree", "DFS", "BST"],
    order: 10,
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.\n\nAccording to the definition of LCA: "The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in T that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself)."`,
    examples: [
      {
        args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 8],
        output: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5],
        explain: "The LCA of nodes 2 and 8 is 6. The judge serializes the returned subtree rooted at the LCA.",
      },
      { args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], 2, 4], output: [2, 0, 4, null, null, 3, 5] },
    ],
    constraints: ["The number of nodes in the tree is in the range [2, 10^5].", "-10^9 <= Node.val <= 10^9", "All Node.val are unique.", "p != q", "p and q will exist in the BST."],
    starter: {
      python: `from typing import Optional\n\n\ndef lowestCommonAncestor(root: Optional[TreeNode], p: Optional[TreeNode], q: Optional[TreeNode]) -> Optional[TreeNode]:\n    pass\n`,
      javascript: `function lowestCommonAncestor(root, p, q) {\n    \n}`,
      typescript: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {\n    \n}`,
      java: `class Solution {\n    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {\n        \n    }\n};`,
      dart: `class Solution {
  TreeNode? lowestCommonAncestor(TreeNode? root, TreeNode? p, TreeNode? q) {
    
  }
}`,
    },
    methodName: "lowestCommonAncestor",
    argTypes: ["tree", "tree", "tree"],
    outputType: "tree",
    compare: "exact",
    visibleTests: [
      { args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], [2], [8]], output: [6, 2, 8, 0, 4, 7, 9, null, null, 3, 5] },
      { args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], [2], [4]], output: [2, 0, 4, null, null, 3, 5] },
      { args: [[2, 1], [2], [1]], output: [2, 1] },
    ],
    hiddenTests: [
      { args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], [8], [9]], output: [8, 7, 9] },
      { args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], [4], [5]], output: [4, 3, 5] },
      { args: [[6, 2, 8, 0, 4, 7, 9, null, null, 3, 5], [0], [5]], output: [2, 0, 4, null, null, 3, 5] },
      { args: [[5, 3, 8, 1, 4, 7, 9], [1], [9]], output: [5, 3, 8, 1, 4, 7, 9] },
    ],
    editorial: {
      approach: `Use the BST ordering property. Starting at the root:\n- If both \`p\` and \`q\` are smaller, the LCA is in the left subtree.\n- If both are larger, the LCA is in the right subtree.\n- Otherwise the current node is between them (or equals one of them) — that node is the LCA.\n\nThis descends once down the tree: O(h) time and O(1) space (iterative).`,
      complexity: { time: "O(h)", space: "O(1)" },
      code: {
        python: `def lowestCommonAncestor(root: Optional[TreeNode], p: Optional[TreeNode], q: Optional[TreeNode]) -> Optional[TreeNode]:
    cur = root
    while cur:
        if p.val < cur.val and q.val < cur.val:
            cur = cur.left
        elif p.val > cur.val and q.val > cur.val:
            cur = cur.right
        else:
            return cur
    return None`,
        javascript: `function lowestCommonAncestor(root, p, q) {
  let cur = root;
  while (cur) {
    if (p.val < cur.val && q.val < cur.val) cur = cur.left;
    else if (p.val > cur.val && q.val > cur.val) cur = cur.right;
    else return cur;
  }
  return null;
}`,
        typescript: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode | null, q: TreeNode | null): TreeNode | null {
  let cur = root;
  while (cur) {
    if (p!.val < cur.val && q!.val < cur.val) cur = cur.left;
    else if (p!.val > cur.val && q!.val > cur.val) cur = cur.right;
    else return cur;
  }
  return null;
}`,

        java: `class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        while (root != null) {
            if (p.val < root.val && q.val < root.val) root = root.left;
            else if (p.val > root.val && q.val > root.val) root = root.right;
            else return root;
        }
        return null;
    }
}`,
        cpp: `class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) root = root->left;
            else if (p->val > root->val && q->val > root->val) root = root->right;
            else return root;
        }
        return nullptr;
    }
};`,      },
    },
  },
  {
    slug: "binary-tree-right-side-view",
    title: "Binary Tree Right Side View",
    difficulty: "Medium",
    category: "trees",
    topics: ["Tree", "BFS", "DFS"],
    order: 11,
    description: `Given the \`root\` of a binary tree, imagine yourself standing on the **right side** of it, return the values of the nodes you can see ordered from top to bottom.`,
    examples: [
      { args: [[1, 2, 3, null, 5, null, 4]], output: [1, 3, 4] },
      { args: [[1, null, 3]], output: [1, 3] },
      { args: [[]], output: [] },
    ],
    constraints: ["0 <= number of nodes <= 100", "-100 <= Node.val <= 100"],
    starter: {
      python: `from typing import List, Optional\n\n\ndef rightSideView(root: Optional[TreeNode]) -> List[int]:\n    pass\n`,
      javascript: `function rightSideView(root) {\n    \n}`,
      typescript: `function rightSideView(root: TreeNode | null): number[] {\n    \n}`,
      java: `class Solution {\n    public List<Integer> rightSideView(TreeNode root) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<int> rightSideView(TreeNode* root) {\n        \n    }\n};`,
      dart: `class Solution {
  List<int> rightSideView(TreeNode? root) {
    
  }
}`,
    },
    methodName: "rightSideView",
    argTypes: ["tree"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, null, 5, null, 4]], output: [1, 3, 4] },
      { args: [[1, null, 3]], output: [1, 3] },
      { args: [[]], output: [] },
    ],
    hiddenTests: [
      { args: [[1]], output: [1] },
      { args: [[1, 2, 3, 4]], output: [1, 3, 4] },
      { args: [[1, 2, null, 3, null, 4]], output: [1, 2, 3, 4] },
      { args: [[5, 3, 8, 1, 4, 7, 9, null, null, null, null, null, null, 6]], output: [5, 8, 9, 6] },
    ],
    editorial: {
      approach: `BFS level by level; the last node of each level is the one visible from the right.\n\nAlternative DFS: visit right child first at each depth, and record the first node seen at each depth. Both run in O(n); the BFS uses O(w) queue space, the DFS O(h) recursion space.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def rightSideView(root: Optional[TreeNode]) -> List[int]:
    result = []
    if root is None:
        return result
    queue = [root]
    while queue:
        level_size = len(queue)
        for i in range(level_size):
            node = queue.pop(0)
            if i == level_size - 1:
                result.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
    return result`,
        javascript: `function rightSideView(root) {
  const result = [];
  if (!root) return result;
  const queue = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}`,
        typescript: `function rightSideView(root: TreeNode | null): number[] {
  const result: number[] = [];
  if (!root) return result;
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      if (i === size - 1) result.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
}`,

        java: `class Solution {
    public List<Integer> rightSideView(TreeNode root) {
        List<Integer> res = new ArrayList<>();
        if (root == null) return res;
        ArrayDeque<TreeNode> q = new ArrayDeque<>();
        q.add(root);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode node = q.poll();
                if (i == size - 1) res.add(node.val);
                if (node.left != null) q.add(node.left);
                if (node.right != null) q.add(node.right);
            }
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        if (!root) return res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                if (i == size - 1) res.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "count-good-nodes-in-binary-tree",
    title: "Count Good Nodes in Binary Tree",
    difficulty: "Medium",
    category: "trees",
    topics: ["Tree", "DFS", "BFS"],
    order: 12,
    description: `Given a binary tree \`root\`, a node **X** in the tree is named **good** if in the path from root to X there are **no nodes with a value greater than X**.\n\nReturn the number of **good** nodes in the binary tree.`,
    examples: [
      { args: [[3, 1, 4, 3, null, 1, 5]], output: 4, explain: "Nodes 3 (root), 3 (left child), 4 and 5 are good." },
      { args: [[3, 3, null, 4, 2]], output: 3 },
      { args: [[1]], output: 1 },
    ],
    constraints: ["The number of nodes in the tree is in the range [1, 10^5].", "-10^4 <= Node.val <= 10^4"],
    starter: {
      python: `from typing import Optional\n\n\ndef goodNodes(root: Optional[TreeNode]) -> int:\n    pass\n`,
      javascript: `function goodNodes(root) {\n    \n}`,
      typescript: `function goodNodes(root: TreeNode | null): number {\n    \n}`,
      java: `class Solution {\n    public int goodNodes(TreeNode root) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int goodNodes(TreeNode* root) {\n        \n    }\n};`,
      dart: `class Solution {
  int goodNodes(TreeNode? root) {
    
  }
}`,
    },
    methodName: "goodNodes",
    argTypes: ["tree"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 1, 4, 3, null, 1, 5]], output: 4 },
      { args: [[3, 3, null, 4, 2]], output: 3 },
      { args: [[1]], output: 1 },
    ],
    hiddenTests: [
      { args: [[2, null, 4, 10, 8, null, null, 4]], output: 4 },
      { args: [[9, null, 3, 6]], output: 1 },
      { args: [[1, 2, 3, 4, 5, 6, 7]], output: 7 },
      { args: [[-1, -2, 0, -3, null, null, 1]], output: 3 },
    ],
    editorial: {
      approach: `DFS with the maximum value seen so far on the path from the root. A node is good if its value \`>= maxSoFar\`; then recurse with an updated max. The root is always good since it has no ancestors.\n\nO(n) time and O(h) space.`,
      complexity: { time: "O(n)", space: "O(h)" },
      code: {
        python: `def goodNodes(root: Optional[TreeNode]) -> int:
    count = 0

    def dfs(node, max_so_far):
        nonlocal count
        if node is None:
            return
        if node.val >= max_so_far:
            count += 1
        new_max = max(max_so_far, node.val)
        dfs(node.left, new_max)
        dfs(node.right, new_max)

    dfs(root, float("-inf"))
    return count`,
        javascript: `function goodNodes(root) {
  let count = 0;
  const dfs = (node, maxSoFar) => {
    if (!node) return;
    if (node.val >= maxSoFar) count++;
    const newMax = Math.max(maxSoFar, node.val);
    dfs(node.left, newMax);
    dfs(node.right, newMax);
  };
  dfs(root, -Infinity);
  return count;
}`,
        typescript: `function goodNodes(root: TreeNode | null): number {
  let count = 0;
  const dfs = (node: TreeNode | null, maxSoFar: number): void => {
    if (!node) return;
    if (node.val >= maxSoFar) count++;
    const newMax = Math.max(maxSoFar, node.val);
    dfs(node.left, newMax);
    dfs(node.right, newMax);
  };
  dfs(root, -Infinity);
  return count;
}`,

        java: `class Solution {
    public int goodNodes(TreeNode root) {
        return dfs(root, Integer.MIN_VALUE);
    }

    private int dfs(TreeNode node, int maxSoFar) {
        if (node == null) return 0;
        int count = node.val >= maxSoFar ? 1 : 0;
        maxSoFar = Math.max(maxSoFar, node.val);
        return count + dfs(node.left, maxSoFar) + dfs(node.right, maxSoFar);
    }
}`,
        cpp: `class Solution {
public:
    int goodNodes(TreeNode* root) {
        return dfs(root, INT_MIN);
    }

    int dfs(TreeNode* node, int maxSoFar) {
        if (!node) return 0;
        int count = node->val >= maxSoFar ? 1 : 0;
        maxSoFar = max(maxSoFar, node->val);
        return count + dfs(node->left, maxSoFar) + dfs(node->right, maxSoFar);
    }
};`,      },
    },
  },
  {
    slug: "kth-smallest-element-in-a-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "trees",
    topics: ["Tree", "DFS", "BST"],
    order: 13,
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return the \`kth\` smallest value (1-indexed) of all the values of the nodes in the tree.`,
    examples: [
      { args: [[3, 1, 4, null, 2], 1], output: 1 },
      { args: [[5, 3, 6, 2, 4, null, null, 1], 3], output: 3 },
    ],
    constraints: ["The number of nodes in the tree is n.", "1 <= k <= n <= 10^4", "0 <= Node.val <= 10^4"],
    starter: {
      python: `from typing import Optional\n\n\ndef kthSmallest(root: Optional[TreeNode], k: int) -> int:\n    pass\n`,
      javascript: `function kthSmallest(root, k) {\n    \n}`,
      typescript: `function kthSmallest(root: TreeNode | null, k: number): number {\n    \n}`,
      java: `class Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int kthSmallest(TreeNode* root, int k) {\n        \n    }\n};`,
      dart: `class Solution {
  int kthSmallest(TreeNode? root, int k) {
    
  }
}`,
    },
    methodName: "kthSmallest",
    argTypes: ["tree", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[3, 1, 4, null, 2], 1], output: 1 },
      { args: [[5, 3, 6, 2, 4, null, null, 1], 3], output: 3 },
    ],
    hiddenTests: [
      { args: [[1], 1], output: 1 },
      { args: [[2, 1, 3], 2], output: 2 },
      { args: [[3, 1, 4, null, 2], 4], output: 4 },
      { args: [[5, 3, 6, 2, 4, null, null, 1], 5], output: 5 },
    ],
    editorial: {
      approach: `An in-order traversal of a BST visits nodes in sorted order, so the kth visited node is the answer. Iterative in-order with an explicit stack lets us stop as soon as we reach k, visiting only k nodes.\n\nO(h + k) time and O(h) space.`,
      complexity: { time: "O(h + k)", space: "O(h)" },
      code: {
        python: `def kthSmallest(root: Optional[TreeNode], k: int) -> int:
    stack = []
    cur = root
    while True:
        while cur:
            stack.append(cur)
            cur = cur.left
        cur = stack.pop()
        k -= 1
        if k == 0:
            return cur.val
        cur = cur.right`,
        javascript: `function kthSmallest(root, k) {
  const stack = [];
  let cur = root;
  while (true) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop();
    k--;
    if (k === 0) return cur.val;
    cur = cur.right;
  }
}`,
        typescript: `function kthSmallest(root: TreeNode | null, k: number): number {
  const stack: TreeNode[] = [];
  let cur: TreeNode | null = root;
  while (true) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop()!;
    k--;
    if (k === 0) return cur.val;
    cur = cur.right;
  }
}`,

        java: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        ArrayDeque<TreeNode> stack = new ArrayDeque<>();
        TreeNode cur = root;
        while (cur != null || !stack.isEmpty()) {
            while (cur != null) {
                stack.push(cur);
                cur = cur.left;
            }
            cur = stack.pop();
            if (--k == 0) return cur.val;
            cur = cur.right;
        }
        return -1;
    }
}`,
        cpp: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        stack<TreeNode*> st;
        TreeNode* cur = root;
        while (cur || !st.empty()) {
            while (cur) {
                st.push(cur);
                cur = cur->left;
            }
            cur = st.top(); st.pop();
            if (--k == 0) return cur->val;
            cur = cur->right;
        }
        return -1;
    }
};`,      },
    },
  },
  {
    slug: "construct-binary-tree-from-preorder-and-inorder-traversal",
    title: "Construct Binary Tree from Preorder and Inorder Traversal",
    difficulty: "Medium",
    category: "trees",
    topics: ["Array", "Tree", "Divide and Conquer"],
    order: 14,
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.`,
    examples: [
      { args: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], output: [3, 9, 20, null, null, 15, 7] },
      { args: [[-1], [-1]], output: [-1] },
    ],
    constraints: ["1 <= preorder.length <= 3000", "inorder.length == preorder.length", "-3000 <= preorder[i], inorder[i] <= 3000", "preorder and inorder consist of unique values.", "Each value of inorder also appears in preorder.", "preorder is guaranteed to be the preorder traversal of the tree.", "inorder is guaranteed to be the inorder traversal of the tree."],
    starter: {
      python: `from typing import List, Optional\n\n\ndef buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:\n    pass\n`,
      javascript: `function buildTree(preorder, inorder) {\n    \n}`,
      typescript: `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {\n    \n}`,
      java: `class Solution {\n    public TreeNode buildTree(int[] preorder, int[] inorder) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {\n        \n    }\n};`,
      dart: `class Solution {
  TreeNode? buildTree(List<int> preorder, List<int> inorder) {
    
  }
}`,
    },
    methodName: "buildTree",
    argTypes: ["int[]", "int[]"],
    outputType: "tree",
    compare: "exact",
    visibleTests: [
      { args: [[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]], output: [3, 9, 20, null, null, 15, 7] },
      { args: [[-1], [-1]], output: [-1] },
    ],
    hiddenTests: [
      { args: [[1, 2], [2, 1]], output: [1, 2] },
      { args: [[1, 2], [1, 2]], output: [1, null, 2] },
      { args: [[1, 2, 3], [2, 1, 3]], output: [1, 2, 3] },
      { args: [[4, 2, 1, 3, 6, 5, 7], [1, 2, 3, 4, 5, 6, 7]], output: [4, 2, 6, 1, 3, 5, 7] },
    ],
    editorial: {
      approach: `The first element of \`preorder\` is always the root. Its index in \`inorder\` splits the inorder array into the left and right subtrees. Recurse on both halves, consuming preorder from left to right.\n\nPrecompute each value's index in inorder with a hash map so the split is O(1). Total time O(n); space O(n).`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def buildTree(preorder: List[int], inorder: List[int]) -> Optional[TreeNode]:
    index = {val: i for i, val in enumerate(inorder)}
    pre_idx = 0

    def build(left, right):
        nonlocal pre_idx
        if left > right:
            return None
        val = preorder[pre_idx]
        pre_idx += 1
        root = TreeNode(val)
        mid = index[val]
        root.left = build(left, mid - 1)
        root.right = build(mid + 1, right)
        return root

    return build(0, len(inorder) - 1)`,
        javascript: `function buildTree(preorder, inorder) {
  const index = new Map(inorder.map((val, i) => [val, i]));
  let preIdx = 0;
  const build = (left, right) => {
    if (left > right) return null;
    const val = preorder[preIdx++];
    const root = new TreeNode(val);
    const mid = index.get(val);
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);
    return root;
  };
  return build(0, inorder.length - 1);
}`,
        typescript: `function buildTree(preorder: number[], inorder: number[]): TreeNode | null {
  const index = new Map(inorder.map((val, i) => [val, i]));
  let preIdx = 0;
  const build = (left: number, right: number): TreeNode | null => {
    if (left > right) return null;
    const val = preorder[preIdx++]!;
    const root = new TreeNode(val);
    const mid = index.get(val)!;
    root.left = build(left, mid - 1);
    root.right = build(mid + 1, right);
    return root;
  };
  return build(0, inorder.length - 1);
}`,

        java: `class Solution {
    private Map<Integer, Integer> index = new HashMap<>();
    private int pre = 0;

    public TreeNode buildTree(int[] preorder, int[] inorder) {
        pre = 0;
        for (int i = 0; i < inorder.length; i++) index.put(inorder[i], i);
        return build(preorder, 0, inorder.length - 1);
    }

    private TreeNode build(int[] preorder, int lo, int hi) {
        if (lo > hi) return null;
        int val = preorder[pre++];
        TreeNode node = new TreeNode(val);
        int mid = index.get(val);
        node.left = build(preorder, lo, mid - 1);
        node.right = build(preorder, mid + 1, hi);
        return node;
    }
}`,
        cpp: `class Solution {
public:
    unordered_map<int, int> index;
    int pre = 0;

    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        pre = 0;
        for (int i = 0; i < (int)inorder.size(); i++) index[inorder[i]] = i;
        return build(preorder, 0, (int)inorder.size() - 1);
    }

    TreeNode* build(vector<int>& preorder, int lo, int hi) {
        if (lo > hi) return nullptr;
        int val = preorder[pre++];
        TreeNode* node = new TreeNode(val);
        int mid = index[val];
        node->left = build(preorder, lo, mid - 1);
        node->right = build(preorder, mid + 1, hi);
        return node;
    }
};`,      },
    },
  },
  {
    slug: "serialize-and-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    difficulty: "Hard",
    category: "trees",
    topics: ["Tree", "DFS", "BFS", "Design"],
    order: 15,
    description: `Serialization is the process of translating a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\n\n**Recommended format**: level-order with \`null\` for missing children, comma-separated, e.g. \`"1,2,3,null,null,4,5"\`. The judge tests both \`serialize\` (tree -> string) and \`deserialize\` (string -> tree) against this format.`,
    examples: [
      {
        ops: ["Codec", "serialize", "deserialize"],
        args: [[], [[1, 2, 3, null, null, 4, 5]], ["1,2,3,null,null,4,5"]],
        output: [null, "1,2,3,null,null,4,5", [1, 2, 3, null, null, 4, 5]],
      },
      {
        ops: ["Codec", "serialize", "deserialize"],
        args: [[], [[]], [""]],
        output: [null, "", null],
      },
    ],
    constraints: ["The number of nodes in the tree is in the range [0, 10^4].", "-1000 <= Node.val <= 1000"],
    starter: {
      python: `class Codec:\n    def serialize(self, root: Optional[TreeNode]) -> str:\n        pass\n\n    def deserialize(self, data: str) -> Optional[TreeNode]:\n        pass\n`,
      javascript: `class Codec {\n    serialize(root) {\n        \n    }\n    \n    deserialize(data) {\n        \n    }\n}`,
      typescript: `class Codec {\n    serialize(root: TreeNode | null): string {\n        \n    }\n    \n    deserialize(data: string): TreeNode | null {\n        \n    }\n}`,
      java: `class Codec {\n    public String serialize(TreeNode root) {\n        \n    }\n    \n    public TreeNode deserialize(String data) {\n        \n    }\n}`,
      cpp: `class Codec {\npublic:\n    string serialize(TreeNode* root) {\n        \n    }\n    \n    TreeNode* deserialize(string data) {\n        \n    }\n};`,
      dart: `class Solution {
  String serialize(TreeNode? root) {
    
  }
}`,
    },
    methodName: "",
    argTypes: [],
    outputType: "string",
    compare: "exact",
    classSpec: {
      className: "Codec",
      ops: [
        { name: "Codec", argTypes: [], ret: "void" },
        { name: "serialize", argTypes: ["tree"], ret: "value" },
        { name: "deserialize", argTypes: ["string"], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["Codec", "serialize", "deserialize"],
        args: [[], [[1, 2, 3, null, null, 4, 5]], ["1,2,3,null,null,4,5"]],
        output: [null, "1,2,3,null,null,4,5", [1, 2, 3, null, null, 4, 5]],
      },
      {
        ops: ["Codec", "serialize", "deserialize"],
        args: [[], [[]], [""]],
        output: [null, "", null],
      },
    ],
    hiddenTests: [
      {
        ops: ["Codec", "serialize", "deserialize"],
        args: [[], [[1]], ["1"]],
        output: [null, "1", [1]],
      },
      {
        ops: ["Codec", "serialize", "deserialize"],
        args: [[], [[1, 2]], ["1,2,null,null,null"]],
        output: [null, "1,2", [1, 2]],
      },
      {
        ops: ["Codec", "serialize", "deserialize"],
        args: [[], [[5, 3, 8, 1, 4, 7, 9]], ["5,3,8,1,4,7,9"]],
        output: [null, "5,3,8,1,4,7,9", [5, 3, 8, 1, 4, 7, 9]],
      },
    ],
    editorial: {
      approach: `**Serialize** with BFS: push the root, then for each node push "null" for a missing child or the value for a real one, level by level. Trim trailing "null"s so the output matches the level-order format.\n\n**Deserialize**: split on commas; build nodes in the same BFS order, attaching children as they appear in the list.\n\nBoth operations are O(n).`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `from collections import deque


class Codec:
    def serialize(self, root: Optional[TreeNode]) -> str:
        if root is None:
            return ""
        parts = []
        queue = deque([root])
        while queue:
            node = queue.popleft()
            if node is None:
                parts.append("null")
            else:
                parts.append(str(node.val))
                queue.append(node.left)
                queue.append(node.right)
        while parts and parts[-1] == "null":
            parts.pop()
        return ",".join(parts)

    def deserialize(self, data: str) -> Optional[TreeNode]:
        if not data:
            return None
        values = data.split(",")
        root = TreeNode(int(values[0]))
        queue = deque([root])
        i = 1
        while queue and i < len(values):
            node = queue.popleft()
            if values[i] != "null":
                node.left = TreeNode(int(values[i]))
                queue.append(node.left)
            i += 1
            if i < len(values) and values[i] != "null":
                node.right = TreeNode(int(values[i]))
                queue.append(node.right)
            i += 1
        return root`,
        javascript: `class Codec {
    serialize(root) {
        if (!root) return "";
        const parts = [];
        const queue = [root];
        while (queue.length) {
            const node = queue.shift();
            if (node === null) parts.push("null");
            else {
                parts.push(String(node.val));
                queue.push(node.left);
                queue.push(node.right);
            }
        }
        while (parts.length && parts[parts.length - 1] === "null") parts.pop();
        return parts.join(",");
    }

    deserialize(data) {
        if (!data) return null;
        const values = data.split(",");
        const root = new TreeNode(parseInt(values[0]));
        const queue = [root];
        let i = 1;
        while (queue.length && i < values.length) {
            const node = queue.shift();
            if (values[i] !== "null") {
                node.left = new TreeNode(parseInt(values[i]));
                queue.push(node.left);
            }
            i++;
            if (i < values.length && values[i] !== "null") {
                node.right = new TreeNode(parseInt(values[i]));
                queue.push(node.right);
            }
            i++;
        }
        return root;
    }
}`,
        typescript: `class Codec {
    serialize(root: TreeNode | null): string {
        if (!root) return "";
        const parts: string[] = [];
        const queue: (TreeNode | null)[] = [root];
        while (queue.length) {
            const node = queue.shift()!;
            if (node === null) parts.push("null");
            else {
                parts.push(String(node.val));
                queue.push(node.left);
                queue.push(node.right);
            }
        }
        while (parts.length && parts[parts.length - 1] === "null") parts.pop();
        return parts.join(",");
    }

    deserialize(data: string): TreeNode | null {
        if (!data) return null;
        const values = data.split(",");
        const root = new TreeNode(parseInt(values[0]!));
        const queue: TreeNode[] = [root];
        let i = 1;
        while (queue.length && i < values.length) {
            const node = queue.shift()!;
            if (values[i] !== "null") {
                node.left = new TreeNode(parseInt(values[i]!));
                queue.push(node.left);
            }
            i++;
            if (i < values.length && values[i] !== "null") {
                node.right = new TreeNode(parseInt(values[i]!));
                queue.push(node.right);
            }
            i++;
        }
        return root;
    }
}`,

        java: `class Codec {
    public String serialize(TreeNode root) {
        if (root == null) return "";
        LinkedList<TreeNode> q = new LinkedList<>();
        q.add(root);
        List<String> parts = new ArrayList<>();
        while (!q.isEmpty()) {
            TreeNode node = q.poll();
            if (node == null) {
                parts.add("null");
            } else {
                parts.add(String.valueOf(node.val));
                q.add(node.left);
                q.add(node.right);
            }
        }
        while (!parts.isEmpty() && parts.get(parts.size() - 1).equals("null")) {
            parts.remove(parts.size() - 1);
        }
        return String.join(",", parts);
    }

    public TreeNode deserialize(String data) {
        if (data.isEmpty()) return null;
        String[] parts = data.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(parts[0]));
        LinkedList<TreeNode> q = new LinkedList<>();
        q.add(root);
        int i = 1;
        while (!q.isEmpty() && i < parts.length) {
            TreeNode node = q.poll();
            if (!parts[i].equals("null")) {
                node.left = new TreeNode(Integer.parseInt(parts[i]));
                q.add(node.left);
            }
            i++;
            if (i < parts.length && !parts[i].equals("null")) {
                node.right = new TreeNode(Integer.parseInt(parts[i]));
                q.add(node.right);
            }
            i++;
        }
        return root;
    }
}`,
        cpp: `class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "";
        queue<TreeNode*> q;
        q.push(root);
        vector<string> parts;
        while (!q.empty()) {
            TreeNode* node = q.front(); q.pop();
            if (!node) {
                parts.push_back("null");
            } else {
                parts.push_back(to_string(node->val));
                q.push(node->left);
                q.push(node->right);
            }
        }
        while (!parts.empty() && parts.back() == "null") parts.pop_back();
        string res;
        for (int i = 0; i < (int)parts.size(); i++) {
            if (i) res += ",";
            res += parts[i];
        }
        return res;
    }

    TreeNode* deserialize(string data) {
        if (data.empty()) return nullptr;
        vector<string> parts;
        size_t start = 0, pos;
        while ((pos = data.find(',', start)) != string::npos) {
            parts.push_back(data.substr(start, pos - start));
            start = pos + 1;
        }
        parts.push_back(data.substr(start));
        TreeNode* root = new TreeNode(stoi(parts[0]));
        queue<TreeNode*> q;
        q.push(root);
        int i = 1;
        while (!q.empty() && i < (int)parts.size()) {
            TreeNode* node = q.front(); q.pop();
            if (parts[i] != "null") {
                node->left = new TreeNode(stoi(parts[i]));
                q.push(node->left);
            }
            i++;
            if (i < (int)parts.size() && parts[i] != "null") {
                node->right = new TreeNode(stoi(parts[i]));
                q.push(node->right);
            }
            i++;
        }
        return root;
    }
};`,      },
    },
  },
];
