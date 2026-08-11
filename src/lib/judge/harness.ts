import type { ClassSpec, InputType, LanguageId, TestCase } from "@/lib/types";

export interface HarnessFile {
  name: string;
  content: string;
}

export interface BuiltSubmission {
  files: HarnessFile[];
  compile?: string[];
  run: string[];
  stdin?: string;
}

/* ------------------------------------------------------------------ */
/* JSON escaping helpers                                               */
/* ------------------------------------------------------------------ */

function jsonEsc(s: string): string {
  return s.replace(/[\\"\u0000-\u001f\u007f]/g, (ch) => {
    switch (ch) {
      case '"':
        return '\\"';
      case "\\":
        return "\\\\";
      case "\b":
        return "\\b";
      case "\f":
        return "\\f";
      case "\n":
        return "\\n";
      case "\r":
        return "\\r";
      case "\t":
        return "\\t";
      default:
        return "\\u" + ch.charCodeAt(0).toString(16).padStart(4, "0");
    }
  });
}

/* ------------------------------------------------------------------ */
/* Python prelude                                                      */
/* ------------------------------------------------------------------ */

const PY_PRELUDE = `import json, sys
from collections import deque
from typing import List, Optional

sys.setrecursionlimit(100000)


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class RandomListNode:
    def __init__(self, val=0, next=None, random=None):
        self.val = val
        self.next = next
        self.random = random


class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []


def _list_to_tree(arr):
    if not arr:
        return None
    root = TreeNode(arr[0])
    q = deque([root])
    i = 1
    while q and i < len(arr):
        node = q.popleft()
        if i < len(arr) and arr[i] is not None:
            node.left = TreeNode(arr[i])
            q.append(node.left)
        i += 1
        if i < len(arr) and arr[i] is not None:
            node.right = TreeNode(arr[i])
            q.append(node.right)
        i += 1
    return root


def _tree_to_list(root):
    if root is None:
        return None
    out = []
    q = deque([root])
    while q:
        node = q.popleft()
        if node is None:
            out.append(None)
            continue
        out.append(node.val)
        q.append(node.left)
        q.append(node.right)
    while out and out[-1] is None:
        out.pop()
    return out


def _list_to_node(arr):
    dummy = ListNode()
    cur = dummy
    for v in arr:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next


def _node_to_list(head):
    out = []
    while head is not None:
        out.append(head.val)
        head = head.next
    return out


def _list_to_cycle(data):
    values, pos = data
    head = _list_to_node(values)
    if pos >= 0 and head is not None:
        tail = head
        while tail.next is not None:
            tail = tail.next
        target = head
        for _ in range(pos):
            target = target.next
        tail.next = target
    return head


def _list_to_random(data):
    if not data:
        return None
    nodes = [RandomListNode(v) for v, _ in data]
    for i, (_, r) in enumerate(data):
        if i + 1 < len(nodes):
            nodes[i].next = nodes[i + 1]
        if r is not None:
            nodes[i].random = nodes[r]
    return nodes[0]


def _random_to_list(head):
    if head is None:
        return None
    node_to_idx = {}
    cur = head
    idx = 0
    while cur is not None:
        node_to_idx[cur] = idx
        cur = cur.next
        idx += 1
    out = []
    cur = head
    while cur is not None:
        r = node_to_idx.get(cur.random) if cur.random is not None else None
        out.append([cur.val, r])
        cur = cur.next
    return out


def _list_to_node_array(data):
    return [_list_to_node(arr) if arr is not None else None for arr in data]


def _adj_to_graph(adj):
    if not adj:
        return None
    nodes = [Node(i + 1) for i in range(len(adj))]
    for i, nbrs in enumerate(adj):
        nodes[i].neighbors = [nodes[j - 1] for j in nbrs]
    return nodes[0]


def _graph_to_adj(node):
    if node is None:
        return None
    seen = {}
    stack = [node]
    while stack:
        n = stack.pop()
        if n.val in seen:
            continue
        seen[n.val] = n
        stack.extend(n.neighbors)
    return [sorted(nb.val for nb in seen[i].neighbors) for i in range(1, len(seen) + 1)]


def _convert(v, t):
    if t == "graph":
        return _adj_to_graph(v)
    if t == "cycle":
        return _list_to_cycle(v)
    if t == "tree":
        return _list_to_tree(v)
    if t == "linked":
        return _list_to_node(v)
    if t == "linked[]":
        return _list_to_node_array(v)
    if t == "randomLinked":
        return _list_to_random(v)
    return v


def _to_plain(x):
    if isinstance(x, Node):
        return _graph_to_adj(x)
    if isinstance(x, TreeNode):
        return _tree_to_list(x)
    if isinstance(x, RandomListNode):
        return _random_to_list(x)
    if isinstance(x, ListNode):
        return _node_to_list(x)
    return x

`;

const PY_HARNESS = `
def _main():
    data = json.load(sys.stdin)
    fn = globals().get(data["method"])
    if fn is None:
        print("@@ERROR " + json.dumps({"i": 0, "msg": "Function '" + data["method"] + "' not found"}))
        return
    for i, c in enumerate(data["cases"]):
        try:
            args = [_convert(a, t) for a, t in zip(c["args"], data["argTypes"])]
            res = fn(*args)
            value = args[0] if data.get("void") else res
            plain = json.loads(json.dumps(_to_plain(value), default=str))
            print("@@RESULT " + json.dumps({"i": i, "out": plain}))
        except Exception as e:
            print("@@ERROR " + json.dumps({"i": i, "msg": str(e)}))
        sys.stdout.flush()


_main()
`;

/* ------------------------------------------------------------------ */
/* JS/TS (deno) prelude                                                */
/* ------------------------------------------------------------------ */

const JS_PRELUDE = `class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class RandomListNode {
  constructor(val = 0, next = null, random = null) {
    this.val = val;
    this.next = next;
    this.random = random;
  }
}

class Node {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function _listToTree(arr) {
  if (!arr || arr.length === 0) return null;
  const root = new TreeNode(arr[0]);
  const q = [root];
  let i = 1;
  while (q.length && i < arr.length) {
    const node = q.shift();
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      node.left = new TreeNode(arr[i]);
      q.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null && arr[i] !== undefined) {
      node.right = new TreeNode(arr[i]);
      q.push(node.right);
    }
    i++;
  }
  return root;
}

function _treeToList(root) {
  if (root === null || root === undefined) return null;
  const out = [];
  const q = [root];
  while (q.length) {
    const node = q.shift();
    if (node === null || node === undefined) {
      out.push(null);
      continue;
    }
    out.push(node.val);
    q.push(node.left);
    q.push(node.right);
  }
  while (out.length && out[out.length - 1] === null) out.pop();
  return out;
}

function _listToNode(arr) {
  const dummy = new ListNode(0);
  let cur = dummy;
  for (const v of arr) {
    cur.next = new ListNode(v);
    cur = cur.next;
  }
  return dummy.next;
}

function _nodeToList(head) {
  const out = [];
  while (head !== null && head !== undefined) {
    out.push(head.val);
    head = head.next;
  }
  return out;
}

function _listToCycle(data) {
  const values = data[0];
  const pos = data[1];
  const head = _listToNode(values);
  if (pos >= 0 && head !== null) {
    let tail = head;
    while (tail.next !== null) {
      tail = tail.next;
    }
    let target = head;
    for (let i = 0; i < pos; i++) {
      target = target.next;
    }
    tail.next = target;
  }
  return head;
}

function _listToRandom(data) {
  if (!data || data.length === 0) return null;
  const nodes = data.map(([v]) => new RandomListNode(v));
  data.forEach(([, r], i) => {
    if (i + 1 < nodes.length) nodes[i].next = nodes[i + 1];
    if (r !== null && r !== undefined) nodes[i].random = nodes[r];
  });
  return nodes[0];
}

function _randomToList(head) {
  if (!head) return null;
  const nodeToIdx = new Map();
  let cur = head;
  let idx = 0;
  while (cur) {
    nodeToIdx.set(cur, idx);
    cur = cur.next;
    idx++;
  }
  const out = [];
  cur = head;
  while (cur) {
    out.push([cur.val, cur.random ? nodeToIdx.get(cur.random) : null]);
    cur = cur.next;
  }
  return out;
}

function _listToNodeArray(data) {
  return data.map((arr) => (arr === null || arr === undefined ? null : _listToNode(arr)));
}

function _adjToGraph(adj) {
  if (!adj || adj.length === 0) return null;
  const nodes = adj.map((_, i) => new Node(i + 1));
  adj.forEach((nbrs, i) => {
    nodes[i].neighbors = nbrs.map((j) => nodes[j - 1]);
  });
  return nodes[0];
}

function _graphToAdj(node) {
  if (!node) return null;
  const seen = new Map();
  const stack = [node];
  while (stack.length) {
    const n = stack.pop();
    if (seen.has(n.val)) continue;
    seen.set(n.val, n);
    stack.push(...n.neighbors);
  }
  const out = [];
  for (let i = 1; i <= seen.size; i++) {
    out.push(seen.get(i).neighbors.map((nb) => nb.val).sort((a, b) => a - b));
  }
  return out;
}

function _convert(v, t) {
  if (t === "graph") return _adjToGraph(v);
  if (t === "cycle") return _listToCycle(v);
  if (t === "tree") return _listToTree(v);
  if (t === "linked") return _listToNode(v);
  if (t === "linked[]") return _listToNodeArray(v);
  if (t === "randomLinked") return _listToRandom(v);
  return v;
}

function _toPlain(x) {
  if (x instanceof Node) return _graphToAdj(x);
  if (x instanceof TreeNode) return _treeToList(x);
  if (x instanceof RandomListNode) return _randomToList(x);
  if (x instanceof ListNode) return _nodeToList(x);
  return x;
}

`;

const JS_HARNESS = `
async function _main() {
  let input = "";
  const dec = new TextDecoder();
  for await (const chunk of Deno.stdin.readable) {
    input += dec.decode(chunk);
  }
  const data = JSON.parse(input);
  const fn = eval(data.method);
  if (typeof fn !== "function") {
    console.log("@@ERROR " + JSON.stringify({ i: 0, msg: "Function '" + data.method + "' not found" }));
    return;
  }
  for (let i = 0; i < data.cases.length; i++) {
    try {
      const c = data.cases[i];
      const args = c.args.map((a, idx) => _convert(a, data.argTypes[idx]));
      const res = fn(...args);
      console.log("@@RESULT " + JSON.stringify({ i: i, out: _toPlain(data.void ? args[0] : res) }));
    } catch (e) {
      console.log("@@ERROR " + JSON.stringify({ i: i, msg: String(e && e.message ? e.message : e) }));
    }
  }
}

await _main();
`;

/* ------------------------------------------------------------------ */
/* Java harness (generated literals — no JSON parser needed)           */
/* ------------------------------------------------------------------ */

const JAVA_PRELUDE = `import java.util.*;

class TreeNode {
  int val;
  TreeNode left, right;
  TreeNode(int v) { val = v; }
  TreeNode(int v, TreeNode l, TreeNode r) { val = v; left = l; right = r; }
}

class ListNode {
  int val;
  ListNode next;
  ListNode(int v) { val = v; }
}

class RandomListNode {
  int val;
  RandomListNode next, random;
  RandomListNode(int v) { val = v; }
}

class Node {
  int val;
  List<Node> neighbors;
  Node(int v) { val = v; neighbors = new ArrayList<>(); }
}

public class Main {
  static TreeNode node(String s) {
    if (s == null || s.isEmpty()) return null;
    String[] parts = s.split(",");
    TreeNode root = new TreeNode(Integer.parseInt(parts[0].trim()));
    ArrayDeque<TreeNode> q = new ArrayDeque<>();
    q.add(root);
    int i = 1;
    while (!q.isEmpty() && i < parts.length) {
      TreeNode cur = q.poll();
      if (i < parts.length && !parts[i].trim().equals("null")) {
        cur.left = new TreeNode(Integer.parseInt(parts[i].trim()));
        q.add(cur.left);
      }
      i++;
      if (i < parts.length && !parts[i].trim().equals("null")) {
        cur.right = new TreeNode(Integer.parseInt(parts[i].trim()));
        q.add(cur.right);
      }
      i++;
    }
    return root;
  }

  static ListNode listNode(int[] arr) {
    ListNode dummy = new ListNode(0);
    ListNode cur = dummy;
    for (int v : arr) {
      cur.next = new ListNode(v);
      cur = cur.next;
    }
    return dummy.next;
  }

  static RandomListNode randomNode(int[] vals, int[] rands) {
    if (vals.length == 0) return null;
    RandomListNode[] nodes = new RandomListNode[vals.length];
    for (int i = 0; i < vals.length; i++) nodes[i] = new RandomListNode(vals[i]);
    for (int i = 0; i < vals.length; i++) {
      if (i + 1 < vals.length) nodes[i].next = nodes[i + 1];
      if (rands[i] >= 0) nodes[i].random = nodes[rands[i]];
    }
    return nodes[0];
  }

  static String randomListToJson(RandomListNode head) {
    if (head == null) return "null";
    Map<RandomListNode, Integer> idx = new HashMap<>();
    int i = 0;
    for (RandomListNode cur = head; cur != null; cur = cur.next) idx.put(cur, i++);
    StringBuilder sb = new StringBuilder("[");
    boolean first = true;
    for (RandomListNode cur = head; cur != null; cur = cur.next) {
      if (!first) sb.append(",");
      first = false;
      sb.append("[").append(cur.val).append(",");
      sb.append(cur.random == null ? "null" : idx.get(cur.random));
      sb.append("]");
    }
    return sb.append("]").toString();
  }

  static ListNode[] listNodeArray(int[][] arr) {
    ListNode[] out = new ListNode[arr.length];
    for (int i = 0; i < arr.length; i++) out[i] = listNode(arr[i]);
    return out;
  }

  static Node graph(int[][] adj) {
    if (adj.length == 0) return null;
    Node[] nodes = new Node[adj.length];
    for (int i = 0; i < adj.length; i++) nodes[i] = new Node(i + 1);
    for (int i = 0; i < adj.length; i++) {
      for (int j : adj[i]) nodes[i].neighbors.add(nodes[j - 1]);
    }
    return nodes[0];
  }

  static String graphToJson(Node node) {
    if (node == null) return "null";
    Map<Integer, Node> seen = new HashMap<>();
    ArrayDeque<Node> stack = new ArrayDeque<>();
    stack.push(node);
    while (!stack.isEmpty()) {
      Node n = stack.pop();
      if (seen.containsKey(n.val)) continue;
      seen.put(n.val, n);
      for (Node nb : n.neighbors) stack.push(nb);
    }
    StringBuilder sb = new StringBuilder("[");
    for (int i = 1; i <= seen.size(); i++) {
      if (i > 1) sb.append(",");
      List<Integer> vals = new ArrayList<>();
      for (Node nb : seen.get(i).neighbors) vals.add(nb.val);
      Collections.sort(vals);
      sb.append("[");
      for (int k = 0; k < vals.size(); k++) {
        if (k > 0) sb.append(",");
        sb.append(vals.get(k));
      }
      sb.append("]");
    }
    return sb.append("]").toString();
  }

  static ListNode cycle(int[] arr, int pos) {
    ListNode head = listNode(arr);
    if (pos >= 0 && head != null) {
      ListNode tail = head;
      while (tail.next != null) tail = tail.next;
      ListNode target = head;
      for (int i = 0; i < pos; i++) target = target.next;
      tail.next = target;
    }
    return head;
  }

  static String treeToJson(TreeNode root) {
    if (root == null) return "null";
    List<String> parts = new ArrayList<>();
    LinkedList<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
      TreeNode n = q.poll();
      if (n == null) { parts.add("null"); continue; }
      parts.add(String.valueOf(n.val));
      q.add(n.left);
      q.add(n.right);
    }
    while (parts.size() > 1 && parts.get(parts.size() - 1).equals("null")) {
      parts.remove(parts.size() - 1);
    }
    return "[" + String.join(",", parts) + "]";
  }

  static String listToJson(ListNode head) {
    if (head == null) return "null";
    StringBuilder sb = new StringBuilder("[");
    while (head != null) {
      if (sb.length() > 1) sb.append(",");
      sb.append(head.val);
      head = head.next;
    }
    return sb.append("]").toString();
  }

  static String stackOf(Throwable t) {
    java.io.StringWriter sw = new java.io.StringWriter();
    t.printStackTrace(new java.io.PrintWriter(sw));
    return sw.toString();
  }

  static String esc(String s) {
    StringBuilder sb = new StringBuilder("\\"");
    for (int i = 0; i < s.length(); i++) {
      char c = s.charAt(i);
      switch (c) {
        case '"': sb.append("\\\\\\""); break;
        case '\\\\': sb.append("\\\\\\\\"); break;
        case '\\n': sb.append("\\\\n"); break;
        case '\\r': sb.append("\\\\r"); break;
        case '\\t': sb.append("\\\\t"); break;
        default:
          if (c < 0x20) sb.append(String.format("\\\\u%04x", (int) c));
          else sb.append(c);
      }
    }
    return sb.append('"').toString();
  }

  static String toJson(Object o) {
    if (o == null) return "null";
    if (o instanceof TreeNode) return treeToJson((TreeNode) o);
    if (o instanceof Node) return graphToJson((Node) o);
    if (o instanceof RandomListNode) return randomListToJson((RandomListNode) o);
    if (o instanceof ListNode) return listToJson((ListNode) o);
    if (o instanceof String) return esc((String) o);
    if (o instanceof Boolean || o instanceof Integer || o instanceof Long
        || o instanceof Double || o instanceof Float || o instanceof Short || o instanceof Byte) {
      return String.valueOf(o);
    }
    if (o instanceof int[]) {
      int[] a = (int[]) o;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(","); sb.append(a[i]); }
      return sb.append("]").toString();
    }
    if (o instanceof long[]) {
      long[] a = (long[]) o;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(","); sb.append(a[i]); }
      return sb.append("]").toString();
    }
    if (o instanceof double[]) {
      double[] a = (double[]) o;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(","); sb.append(a[i]); }
      return sb.append("]").toString();
    }
    if (o instanceof boolean[]) {
      boolean[] a = (boolean[]) o;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(","); sb.append(a[i]); }
      return sb.append("]").toString();
    }
    if (o instanceof char[]) {
      char[] a = (char[]) o;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(","); sb.append(esc(String.valueOf(a[i]))); }
      return sb.append("]").toString();
    }
    if (o instanceof Object[]) {
      Object[] a = (Object[]) o;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < a.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(a[i])); }
      return sb.append("]").toString();
    }
    if (o instanceof List) {
      List<?> a = (List<?>) o;
      StringBuilder sb = new StringBuilder("[");
      for (int i = 0; i < a.size(); i++) { if (i > 0) sb.append(","); sb.append(toJson(a.get(i))); }
      return sb.append("]").toString();
    }
    if (o instanceof Map) {
      Map<?, ?> m = (Map<?, ?>) o;
      StringBuilder sb = new StringBuilder("{");
      boolean first = true;
      for (Map.Entry<?, ?> e : m.entrySet()) {
        if (!first) sb.append(",");
        first = false;
        sb.append(esc(String.valueOf(e.getKey()))).append(":").append(toJson(e.getValue()));
      }
      return sb.append("}").toString();
    }
    return esc(String.valueOf(o));
  }

`;

const JAVA_MAIN_OPEN_FUNCTION = `
  public static void main(String[] args) {
    Solution s = new Solution();
`;

const JAVA_MAIN_OPEN_CLASS = `
  public static void main(String[] args) {
`;

const JAVA_MAIN_END = `
  }
}
`;

/* ------------------------------------------------------------------ */
/* C++ harness (generated literals)                                    */
/* ------------------------------------------------------------------ */

const CPP_PRELUDE = `#include <iostream>
#include <vector>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <deque>
#include <list>
#include <algorithm>
#include <numeric>
#include <sstream>
#include <iomanip>
#include <climits>
#include <cstdlib>
#include <cstring>
#include <cmath>
#include <functional>
#include <utility>
#include <optional>
using namespace std;

struct TreeNode {
  int val;
  TreeNode *left, *right;
  TreeNode(int v) : val(v), left(nullptr), right(nullptr) {}
};

struct ListNode {
  int val;
  ListNode *next;
  ListNode(int v) : val(v), next(nullptr) {}
};

struct RandomListNode {
  int val;
  RandomListNode *next, *random;
  RandomListNode(int v) : val(v), next(nullptr), random(nullptr) {}
};

struct Node {
  int val;
  vector<Node*> neighbors;
  Node(int v) : val(v) {}
};

string jsonEsc(const string& s) {
  string out;
  out.reserve(s.size());
  for (unsigned char c : s) {
    switch (c) {
      case '"': out += "\\\\\\""; break;
      case '\\\\': out += "\\\\\\\\"; break;
      case '\\n': out += "\\\\n"; break;
      case '\\r': out += "\\\\r"; break;
      case '\\t': out += "\\\\t"; break;
      case '\\b': out += "\\\\b"; break;
      case '\\f': out += "\\\\f"; break;
      default:
        if (c < 0x20) {
          char buf[8];
          snprintf(buf, sizeof(buf), "\\\\u%04x", c);
          out += buf;
        } else {
          out += (char) c;
        }
    }
  }
  return out;
}

string toJson(const string& s) { return "\\"" + jsonEsc(s) + "\\""; }
string toJson(bool b) { return b ? "true" : "false"; }
string toJson(int v) { return to_string(v); }
string toJson(long long v) { return to_string(v); }
string toJson(double v) {
  ostringstream oss;
  oss << setprecision(15) << v;
  return oss.str();
}
string toJson(const vector<char>& v) {
  string out = "[";
  for (size_t i = 0; i < v.size(); i++) {
    if (i) out += ",";
    out += toJson(string(1, v[i]));
  }
  return out + "]";
}
template <typename T>
string toJson(const vector<T>& v) {
  string out = "[";
  for (size_t i = 0; i < v.size(); i++) {
    if (i) out += ",";
    out += toJson(v[i]);
  }
  return out + "]";
}
string toJson(TreeNode* root) {
  if (!root) return "null";
  vector<string> parts;
  queue<TreeNode*> q;
  q.push(root);
  while (!q.empty()) {
    TreeNode* n = q.front(); q.pop();
    if (!n) { parts.push_back("null"); continue; }
    parts.push_back(to_string(n->val));
    q.push(n->left);
    q.push(n->right);
  }
  while (parts.size() > 1 && parts.back() == "null") parts.pop_back();
  string out = "[";
  for (size_t i = 0; i < parts.size(); i++) {
    if (i) out += ",";
    out += parts[i];
  }
  return out + "]";
}
string toJson(ListNode* head) {
  if (!head) return "null";
  string out = "[";
  bool first = true;
  while (head) {
    if (!first) out += ",";
    first = false;
    out += to_string(head->val);
    head = head->next;
  }
  return out + "]";
}

string toJson(Node* node) {
  if (!node) return "null";
  unordered_map<int, Node*> seen;
  vector<Node*> stack{node};
  while (!stack.empty()) {
    Node* n = stack.back();
    stack.pop_back();
    if (seen.count(n->val)) continue;
    seen[n->val] = n;
    for (Node* nb : n->neighbors) stack.push_back(nb);
  }
  string out = "[";
  for (int i = 1; i <= (int)seen.size(); i++) {
    if (i > 1) out += ",";
    vector<int> vals;
    for (Node* nb : seen[i]->neighbors) vals.push_back(nb->val);
    sort(vals.begin(), vals.end());
    out += "[";
    for (size_t k = 0; k < vals.size(); k++) {
      if (k) out += ",";
      out += to_string(vals[k]);
    }
    out += "]";
  }
  return out + "]";
}

TreeNode* N(const string& s) {
  if (s.empty()) return nullptr;
  vector<string> parts;
  size_t start = 0, pos;
  while ((pos = s.find(',', start)) != string::npos) {
    parts.push_back(s.substr(start, pos - start));
    start = pos + 1;
  }
  parts.push_back(s.substr(start));
  if (parts[0] == "null") return nullptr;
  TreeNode* root = new TreeNode(stoi(parts[0]));
  queue<TreeNode*> q;
  q.push(root);
  size_t i = 1;
  while (!q.empty() && i < parts.size()) {
    TreeNode* cur = q.front(); q.pop();
    if (i < parts.size() && parts[i] != "null") {
      cur->left = new TreeNode(stoi(parts[i]));
      q.push(cur->left);
    }
    i++;
    if (i < parts.size() && parts[i] != "null") {
      cur->right = new TreeNode(stoi(parts[i]));
      q.push(cur->right);
    }
    i++;
  }
  return root;
}

ListNode* L(const vector<int>& v) {
  ListNode dummy(0);
  ListNode* cur = &dummy;
  for (int x : v) {
    cur->next = new ListNode(x);
    cur = cur->next;
  }
  return dummy.next;
}

ListNode* C(const vector<int>& v, int pos) {
  ListNode* head = L(v);
  if (pos >= 0 && head) {
    ListNode* tail = head;
    while (tail->next) tail = tail->next;
    ListNode* target = head;
    for (int i = 0; i < pos; i++) target = target->next;
    tail->next = target;
  }
  return head;
}

RandomListNode* R(const vector<int>& vals, const vector<int>& rands) {
  if (vals.empty()) return nullptr;
  vector<RandomListNode*> nodes;
  for (int v : vals) nodes.push_back(new RandomListNode(v));
  for (size_t i = 0; i < vals.size(); i++) {
    if (i + 1 < vals.size()) nodes[i]->next = nodes[i + 1];
    if (rands[i] >= 0) nodes[i]->random = nodes[rands[i]];
  }
  return nodes[0];
}

string toJson(RandomListNode* head) {
  if (!head) return "null";
  unordered_map<RandomListNode*, int> idx;
  int i = 0;
  for (RandomListNode* cur = head; cur; cur = cur->next) idx[cur] = i++;
  string out = "[";
  bool first = true;
  for (RandomListNode* cur = head; cur; cur = cur->next) {
    if (!first) out += ",";
    first = false;
    out += "[" + to_string(cur->val) + ",";
    out += (cur->random ? to_string(idx[cur->random]) : "null");
    out += "]";
  }
  return out + "]";
}

vector<ListNode*> LA(const vector<vector<int>>& arr) {
  vector<ListNode*> out;
  for (const auto& v : arr) out.push_back(L(v));
  return out;
}

Node* G(const vector<vector<int>>& adj) {
  if (adj.empty()) return nullptr;
  vector<Node*> nodes;
  for (size_t i = 0; i < adj.size(); i++) nodes.push_back(new Node((int)i + 1));
  for (size_t i = 0; i < adj.size(); i++) {
    for (int j : adj[i]) nodes[i]->neighbors.push_back(nodes[j - 1]);
  }
  return nodes[0];
}

`;

const CPP_MAIN_START = `int main() {
  Solution s;
`;

const CPP_MAIN_START_CLASS = `int main() {
`;

const CPP_MAIN_END = `  return 0;
}
`;

/* ------------------------------------------------------------------ */
/* Literal codegen for Java and C++                                    */
/* ------------------------------------------------------------------ */

function jsLiteral(v: unknown): string {
  if (v === null || v === undefined) return "null";
  if (typeof v === "number") return Number.isInteger(v) ? String(v) : String(v);
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(jsLiteral).join(",")}]`;
  return JSON.stringify(v);
}

function javaLiteral(v: unknown, t: InputType): string {
  switch (t) {
    case "int":
      return String(Math.trunc(Number(v)));
    case "double":
      return String(Number(v));
    case "bool":
      return v ? "true" : "false";
    case "string":
      return `"${jsonEsc(String(v))}"`;
    case "int[]":
      return `new int[]{${(v as unknown[]).map((x) => String(Math.trunc(Number(x)))).join(",")}}`;
    case "int[][]":
      return `new int[][]{${(v as unknown[][]).map((row) => `new int[]{${row.map((x) => String(Math.trunc(Number(x)))).join(",")}}`).join(",")}}`;
    case "double[]":
      return `new double[]{${(v as unknown[]).map((x) => String(Number(x))).join(",")}}`;
    case "string[]":
      return `new String[]{${(v as unknown[]).map((x) => `"${jsonEsc(String(x))}"`).join(",")}}`;
    case "string[][]":
      return `new String[][]{${(v as unknown[][]).map((row) => `new String[]{${row.map((x) => `"${jsonEsc(String(x))}"`).join(",")}}`).join(",")}}`;
    case "bool[]":
      return `new boolean[]{${(v as unknown[]).map((x) => (x ? "true" : "false")).join(",")}}`;
    case "char[]":
      return `new char[]{${(v as unknown[]).map((x) => `'${String(x).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`).join(",")}}`;
    case "char[][]":
      return `new char[][]{${(v as unknown[][]).map((row) => `new char[]{${row.map((x) => `'${String(x).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`).join(",")}}`).join(",")}}`;
    case "tree":
      return `node(${(v as unknown[]).length ? `"${(v as unknown[]).map((x) => (x === null ? "null" : String(x))).join(",")}"` : `""`})`;
    case "linked":
      return `listNode(new int[]{${(v as unknown[]).map((x) => String(Math.trunc(Number(x)))).join(",")}})`;
    case "linked[]":
      return `listNodeArray(new int[][]{${(v as unknown[][]).map((arr) => `new int[]{${arr.map((x) => String(Math.trunc(Number(x)))).join(",")}}`).join(",")}})`;
    case "randomLinked": {
      const pairs = v as [unknown, unknown][];
      const vals = pairs.map((p) => String(Math.trunc(Number(p[0])))).join(",");
      const rands = pairs.map((p) => (p[1] === null ? "-1" : String(Math.trunc(Number(p[1]))))).join(",");
      return `randomNode(new int[]{${vals}}, new int[]{${rands}})`;
    }
    case "cycle": {
      const [values, pos] = v as [unknown[], number];
      return `cycle(new int[]{${values.map((x) => String(Math.trunc(Number(x)))).join(",")}}, ${pos})`;
    }
    case "graph":
      return `graph(new int[][]{${(v as unknown[][]).map((row) => `new int[]{${row.map((x) => String(Math.trunc(Number(x)))).join(",")}}`).join(",")}})`;
    default:
      return jsLiteral(v);
  }
}

function cppLiteral(v: unknown, t: InputType): string {
  switch (t) {
    case "int":
      return String(Math.trunc(Number(v)));
    case "double": {
      const n = Number(v);
      return Number.isInteger(n) ? `${n}.0` : String(n);
    }
    case "bool":
      return v ? "true" : "false";
    case "string":
      return `string("${jsonEsc(String(v))}")`;
    case "int[]":
      return `vector<int>{${(v as unknown[]).map((x) => String(Math.trunc(Number(x)))).join(",")}}`;
    case "int[][]":
      return `vector<vector<int>>{${(v as unknown[][]).map((row) => `{${row.map((x) => String(Math.trunc(Number(x)))).join(",")}}`).join(",")}}`;
    case "double[]":
      return `vector<double>{${(v as unknown[]).map((x) => String(Number(x))).join(",")}}`;
    case "string[]":
      return `vector<string>{${(v as unknown[]).map((x) => `"${jsonEsc(String(x))}"`).join(",")}}`;
    case "string[][]":
      return `vector<vector<string>>{${(v as unknown[][]).map((row) => `{${row.map((x) => `"${jsonEsc(String(x))}"`).join(",")}}`).join(",")}}`;
    case "bool[]":
      return `vector<bool>{${(v as unknown[]).map((x) => (x ? "true" : "false")).join(",")}}`;
    case "char[]":
      return `vector<char>{${(v as unknown[]).map((x) => `'${String(x).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`).join(",")}}`;
    case "char[][]":
      return `vector<vector<char>>{${(v as unknown[][]).map((row) => `{${row.map((x) => `'${String(x).replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`).join(",")}}`).join(",")}}`;
    case "tree":
      return `N("${(v as unknown[]).map((x) => (x === null ? "null" : String(x))).join(",")}")`;
    case "linked":
      return `L(vector<int>{${(v as unknown[]).map((x) => String(Math.trunc(Number(x)))).join(",")}})`;
    case "linked[]":
      return `LA(vector<vector<int>>{${(v as unknown[][]).map((arr) => `vector<int>{${arr.map((x) => String(Math.trunc(Number(x)))).join(",")}}`).join(",")}})`;
    case "randomLinked": {
      const pairs = v as [unknown, unknown][];
      const vals = pairs.map((p) => String(Math.trunc(Number(p[0])))).join(",");
      const rands = pairs.map((p) => (p[1] === null ? "-1" : String(Math.trunc(Number(p[1]))))).join(",");
      return `R(vector<int>{${vals}}, vector<int>{${rands}})`;
    }
    case "cycle": {
      const [values, pos] = v as [unknown[], number];
      return `C(vector<int>{${values.map((x) => String(Math.trunc(Number(x)))).join(",")}}, ${pos})`;
    }
    case "graph":
      return `G(vector<vector<int>>{${(v as unknown[][]).map((row) => `vector<int>{${row.map((x) => String(Math.trunc(Number(x)))).join(",")}}`).join(",")}})`;
    default:
      return jsLiteral(v);
  }
}

/* ------------------------------------------------------------------ */
/* Builders                                                            */
/* ------------------------------------------------------------------ */

const PY_CLASS_HARNESS = `
def _main():
    data = json.load(sys.stdin)
    cls = globals().get(data["className"])
    if cls is None:
        print("@@ERROR " + json.dumps({"i": 0, "msg": "Class '" + data["className"] + "' not found"}))
        return
    ops_map = {op["name"]: op for op in data["ops"]}
    for i, c in enumerate(data["cases"]):
        try:
            obj = None
            results = []
            for j, op in enumerate(c["ops"]):
                arg_types = ops_map.get(op, {}).get("argTypes", [])
                args = [_convert(a, t) for a, t in zip(c["args"][j], arg_types)]
                if j == 0:
                    obj = cls(*args)
                    results.append(None)
                else:
                    res = getattr(obj, op)(*args)
                    results.append(_to_plain(res))
            print("@@RESULT " + json.dumps({"i": i, "out": results}))
        except Exception as e:
            print("@@ERROR " + json.dumps({"i": i, "msg": str(e)}))
        sys.stdout.flush()


_main()
`;

const JS_CLASS_HARNESS = `
async function _main() {
  let input = "";
  const dec = new TextDecoder();
  for await (const chunk of Deno.stdin.readable) {
    input += dec.decode(chunk);
  }
  const data = JSON.parse(input);
  const cls = eval(data.className);
  if (typeof cls !== "function") {
    console.log("@@ERROR " + JSON.stringify({ i: 0, msg: "Class '" + data.className + "' not found" }));
    return;
  }
  for (let i = 0; i < data.cases.length; i++) {
    try {
      const c = data.cases[i];
      let obj = null;
      const results = [];
      const opsMap = Object.fromEntries(data.ops.map((o) => [o.name, o]));
      for (let j = 0; j < c.ops.length; j++) {
        const argTypes = (opsMap[c.ops[j]] || {}).argTypes || [];
        const args = c.args[j].map((a, idx) => _convert(a, argTypes[idx]));
        if (j === 0) {
          obj = new cls(...args);
          results.push(null);
        } else {
          results.push(_toPlain(obj[c.ops[j]](...args)));
        }
      }
      console.log("@@RESULT " + JSON.stringify({ i: i, out: results }));
    } catch (e) {
      console.log("@@ERROR " + JSON.stringify({ i: i, msg: String(e && e.message ? e.message : e) }));
    }
  }
}

await _main();
`;


export function buildSubmission(
  lang: LanguageId,
  userCode: string,
  methodName: string,
  argTypes: InputType[],
  cases: TestCase[],
  outputType: InputType,
  classSpec?: ClassSpec
): BuiltSubmission {
  if (classSpec) {
    return buildClassSubmission(lang, userCode, classSpec, cases as never);
  }
  switch (lang) {
    case "python": {
      const payload = JSON.stringify({ method: methodName, cases, argTypes, void: outputType === "void" });
      return {
        files: [{ name: "main.py", content: PY_PRELUDE + userCode + PY_HARNESS }],
        run: ["bash", "-c", `ulimit -v 524288 2>/dev/null; ulimit -t 8; exec python3 -I -B main.py`],
        stdin: payload,
      };
    }
    case "javascript":
    case "typescript": {
      const payload = JSON.stringify({ method: methodName, cases, argTypes, void: outputType === "void" });
      const ext = lang === "typescript" ? "ts" : "js";
      return {
        files: [{ name: `main.${ext}`, content: JS_PRELUDE + userCode + JS_HARNESS }],
        run: [
          "bash",
          "-c",
          `ulimit -v 524288 2>/dev/null; ulimit -t 8; exec deno run --no-config --no-check --quiet main.${ext}`,
        ],
        stdin: payload,
      };
    }
    case "java": {
      const isVoid = outputType === "void";
      const lines: string[] = [];
      cases.forEach((c, idx) => {
        const decls = c.args.map((a, i) => javaLiteral(a, argTypes[i] ?? "int"));
        lines.push("    try {");
        c.args.forEach((_, i) => {
          lines.push(`      var v${idx}_${i} = ${decls[i]};`);
        });
        const callArgs = c.args.map((_, i) => `v${idx}_${i}`).join(", ");
        if (isVoid) {
          lines.push(`      s.${methodName}(${callArgs});`);
          lines.push(`      Object r = v${idx}_0;`);
        } else {
          lines.push(`      Object r = s.${methodName}(${callArgs});`);
        }
        lines.push(`      System.out.println("@@RESULT {\\\"i\\\":" + ${idx} + ",\\\"out\\\":" + toJson(r) + "}");`);
        lines.push("    } catch (Throwable t) {");
        lines.push(`      System.out.println("@@ERROR {\\\"i\\\":" + ${idx} + ",\\\"msg\\\":" + esc(stackOf(t)) + "}");`);
        lines.push("    }");
      });
      const mainBody = lines.join("\n") + "\n";
      return {
        files: [
          { name: "Main.java", content: JAVA_PRELUDE + JAVA_MAIN_OPEN_FUNCTION + mainBody + JAVA_MAIN_END },
          { name: "Solution.java", content: "import java.util.*;\n\n" + userCode },
        ],
        compile: ["javac", "-encoding", "UTF-8", "-d", "out", "Main.java", "Solution.java"],
        run: ["bash", "-c", `ulimit -t 10; exec java -Xmx384m -Xss64m -cp out Main`],
      };
    }
    case "cpp": {
      const isVoid = outputType === "void";
      const lines: string[] = [];
      cases.forEach((c, idx) => {
        const decls = c.args.map((a, i) => cppLiteral(a, argTypes[i] ?? "int"));
        lines.push("  try {");
        c.args.forEach((_, i) => {
          lines.push(`    auto v${idx}_${i} = ${decls[i]};`);
        });
        const callArgs = c.args.map((_, i) => `v${idx}_${i}`).join(", ");
        if (isVoid) {
          lines.push(`    s.${methodName}(${callArgs});`);
          lines.push(`    auto r = v${idx}_0;`);
        } else {
          lines.push(`    auto r = s.${methodName}(${callArgs});`);
        }
        lines.push(`    cout << "@@RESULT {\\\"i\\\":" << ${idx} << ",\\\"out\\\":" << toJson(r) << "}" << endl;`);
        lines.push("  } catch (const exception& e) {");
        lines.push(`    cout << "@@ERROR {\\\"i\\\":" << ${idx} << ",\\\"msg\\\":\\\"" << jsonEsc(string(e.what())) << "\\\"}" << endl;`);
        lines.push("  }");
      });
      const mainBody = lines.join("\n") + "\n";
      return {
        files: [
          { name: "main.cpp", content: CPP_PRELUDE + userCode + "\n" + CPP_MAIN_START + mainBody + CPP_MAIN_END },
        ],
        compile: ["g++", "-std=c++17", "-O2", "-o", "main", "main.cpp"],
        run: ["bash", "-c", `ulimit -v 524288 2>/dev/null; ulimit -t 8; exec ./main`],
      };
    }
  }
}

interface ClassCaseLike {
  ops: string[];
  args: unknown[][];
}

function buildClassSubmission(
  lang: LanguageId,
  userCode: string,
  spec: ClassSpec,
  cases: ClassCaseLike[]
): BuiltSubmission {
  const ops = spec.ops;
  switch (lang) {
    case "python": {
      const payload = JSON.stringify({ className: spec.className, ops, cases });
      return {
        files: [{ name: "main.py", content: PY_PRELUDE + userCode + PY_CLASS_HARNESS }],
        run: ["bash", "-c", `ulimit -v 524288 2>/dev/null; ulimit -t 8; exec python3 -I -B main.py`],
        stdin: payload,
      };
    }
    case "javascript":
    case "typescript": {
      const payload = JSON.stringify({ className: spec.className, ops, cases });
      const ext = lang === "typescript" ? "ts" : "js";
      return {
        files: [{ name: `main.${ext}`, content: JS_PRELUDE + userCode + JS_CLASS_HARNESS }],
        run: [
          "bash",
          "-c",
          `ulimit -v 524288 2>/dev/null; ulimit -t 8; exec deno run --no-config --no-check --quiet main.${ext}`,
        ],
        stdin: payload,
      };
    }
    case "java": {
      const lines: string[] = [];
      cases.forEach((c, idx) => {
        const v = `v${idx}`;
        const ctorLits = (c.args[0] ?? []).map((a, i) => javaLiteral(a, ops[0].argTypes[i] ?? "int"));
        lines.push("    try {");
        lines.push(`    ${spec.className} ${v} = new ${spec.className}(${ctorLits.join(", ")});`);
        lines.push("    List<Object> outs = new ArrayList<>();");
        lines.push("    outs.add(null);");
        c.ops.slice(1).forEach((op, j) => {
          const opIdx = j + 1;
          const opSpec =
            ops.find((o) => o.name === op) ?? { name: op, argTypes: [] as InputType[], ret: "value" as const };
          const lits = (c.args[opIdx] ?? []).map((a, k) => javaLiteral(a, opSpec.argTypes[k] ?? "int"));
          if (opSpec.ret === "void") {
            lines.push(`    ${v}.${op}(${lits.join(", ")});`);
            lines.push("    outs.add(null);");
          } else {
            lines.push(`    outs.add(${v}.${op}(${lits.join(", ")}));`);
          }
        });
        lines.push(`      System.out.println("@@RESULT {\\\"i\\\":" + ${idx} + ",\\\"out\\\":" + toJson(outs) + "}");`);
        lines.push("    } catch (Throwable t) {");
        lines.push(`      System.out.println("@@ERROR {\\\"i\\\":" + ${idx} + ",\\\"msg\\\":" + esc(stackOf(t)) + "}");`);
        lines.push("    }");
      });
      const mainBody = lines.join("\n") + "\n";
      return {
        files: [
          { name: "Main.java", content: JAVA_PRELUDE + JAVA_MAIN_OPEN_CLASS + mainBody + JAVA_MAIN_END },
          { name: "Solution.java", content: "import java.util.*;\n\n" + userCode },
        ],
        compile: ["javac", "-encoding", "UTF-8", "-d", "out", "Main.java", "Solution.java"],
        run: ["bash", "-c", `ulimit -t 10; exec java -Xmx384m -Xss64m -cp out Main`],
      };
    }
    case "cpp": {
      const lines: string[] = [];
      cases.forEach((c, idx) => {
        const v = `v${idx}`;
        const ctorLits = (c.args[0] ?? []).map((a, i) => cppLiteral(a, ops[0].argTypes[i] ?? "int"));
        lines.push("  {");
        lines.push("    try {");
        lines.push(`    auto* ${v} = new ${spec.className}(${ctorLits.join(", ")});`);
        lines.push("    vector<string> outs;");
        lines.push('    outs.push_back("null");');
        c.ops.slice(1).forEach((op, j) => {
          const opIdx = j + 1;
          const opSpec =
            ops.find((o) => o.name === op) ?? { name: op, argTypes: [] as InputType[], ret: "value" as const };
          const lits = (c.args[opIdx] ?? []).map((a, k) => cppLiteral(a, opSpec.argTypes[k] ?? "int"));
          if (opSpec.ret === "void") {
            lines.push(`    ${v}->${op}(${lits.join(", ")});`);
            lines.push('    outs.push_back("null");');
          } else {
            lines.push(`    outs.push_back(toJson(${v}->${op}(${lits.join(", ")})));`);
          }
        });
        lines.push("    string joined;");
        lines.push('    for (size_t k = 0; k < outs.size(); k++) { if (k) joined += ","; joined += outs[k]; }');
        lines.push(`    cout << "@@RESULT {\\\"i\\\":" << ${idx} << ",\\\"out\\\":[" << joined << "]}" << endl;`);
        lines.push(`    delete ${v};`);
        lines.push("    } catch (const exception& e) {");
        lines.push(`    cout << "@@ERROR {\\\"i\\\":" << ${idx} << ",\\\"msg\\\":\\\"" << jsonEsc(string(e.what())) << "\\\"}" << endl;`);
        lines.push("    }");
        lines.push("  }");
      });
      const mainBody = lines.join("\n") + "\n";
      return {
        files: [
          { name: "main.cpp", content: CPP_PRELUDE + userCode + "\n" + CPP_MAIN_START_CLASS + mainBody + CPP_MAIN_END },
        ],
        compile: ["g++", "-std=c++17", "-O2", "-o", "main", "main.cpp"],
        run: ["bash", "-c", `ulimit -v 524288 2>/dev/null; ulimit -t 8; exec ./main`],
      };
    }
  }
}



