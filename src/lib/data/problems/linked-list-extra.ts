import type { Problem } from "@/lib/types";

export const linkedListExtra: Problem[] = [
  {
    slug: "remove-nth-node-from-end-of-list",
    title: "Remove Nth Node From End of List",
    difficulty: "Medium",
    category: "linked-list",
    topics: ["Linked List", "Two Pointers"],
    order: 5,
    description: `Given the head of a linked list, remove the \`nth\` node from the end of the list and return its head.`,
    examples: [
      { args: [[1, 2, 3, 4, 5], 2], output: [1, 2, 3, 5], explain: "Removing the 2nd node from the end removes the node with value 4." },
      { args: [[1], 1], output: [] },
      { args: [[1, 2], 1], output: [1] },
    ],
    constraints: ["The number of nodes in the list is sz.", "1 <= sz <= 30", "0 <= Node.val <= 100", "1 <= n <= sz"],
    starter: {
      python: `from typing import Optional\n\n\ndef removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:\n    pass\n`,
      javascript: `function removeNthFromEnd(head, n) {\n    \n}`,
      typescript: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {\n    \n}`,
      java: `class Solution {\n    public ListNode removeNthFromEnd(ListNode head, int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* removeNthFromEnd(ListNode* head, int n) {\n        \n    }\n};`,
    },
    methodName: "removeNthFromEnd",
    argTypes: ["linked", "int"],
    outputType: "linked",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 4, 5], 2], output: [1, 2, 3, 5] },
      { args: [[1], 1], output: null },
      { args: [[1, 2], 1], output: [1] },
    ],
    hiddenTests: [
      { args: [[1, 2], 2], output: [2] },
      { args: [[1, 2, 3], 3], output: [2, 3] },
      { args: [[1, 2, 3, 4, 5], 1], output: [1, 2, 3, 4] },
      { args: [[10, 20, 30, 40], 2], output: [10, 20, 40] },
    ],
    editorial: {
      approach: `Use two pointers with a gap of \`n\`: advance \`fast\` \`n\` steps, then walk \`slow\` and \`fast\` together until \`fast\` reaches the end. At that point \`slow\` is the node just before the one to remove, so splice it out.\n\nA dummy head before the real head handles removal of the first node cleanly. O(n) time and O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def removeNthFromEnd(head: Optional[ListNode], n: int) -> Optional[ListNode]:
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n):
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next
    return dummy.next`,
        javascript: `function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0, head);
  let fast = dummy, slow = dummy;
  for (let i = 0; i < n; i++) fast = fast.next;
  while (fast.next) {
    fast = fast.next;
    slow = slow.next;
  }
  slow.next = slow.next.next;
  return dummy.next;
}`,
        typescript: `function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
  const dummy = new ListNode(0, head);
  let fast: ListNode | null = dummy, slow: ListNode | null = dummy;
  for (let i = 0; i < n; i++) fast = fast!.next;
  while (fast!.next) {
    fast = fast!.next;
    slow = slow!.next;
  }
  slow!.next = slow!.next!.next;
  return dummy.next;
}`,

        java: `class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy, slow = dummy;
        for (int i = 0; i <= n; i++) fast = fast.next;
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* fast = &dummy;
        ListNode* slow = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;
        while (fast) {
            fast = fast->next;
            slow = slow->next;
        }
        slow->next = slow->next->next;
        return dummy.next;
    }
};`,      },
    },
  },
  {
    slug: "copy-list-with-random-pointer",
    title: "Copy List with Random Pointer",
    difficulty: "Medium",
    category: "linked-list",
    topics: ["Hash Table", "Linked List"],
    order: 6,
    description: `A linked list of length \`n\` is given such that each node contains an additional random pointer, which could point to any node in the list, or \`null\`.\n\nConstruct a **deep copy** of the list. The deep copy should consist of exactly \`n\` **brand new** nodes, where each new node has its value copied from the corresponding original node and the next and random pointers of the new nodes should point to new nodes representing the nodes in the original list. Return the head of the copied linked list.\n\n**Test format**: the list is encoded as \`[[val, randomIndex], ...]\` where \`randomIndex\` is the index of the node the random pointer points to (or \`null\`). Your function receives a \`RandomListNode\` with \`val\`, \`next\` and \`random\` fields and must return the head of the deep copy.`,
    examples: [
      {
        args: [[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]],
        output: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]],
        explain: "The deep copy must produce the same structure.",
      },
      { args: [[[1, 1], [2, 1]]], output: [[1, 1], [2, 1]] },
      { args: [[[3, null], [3, 0], [3, null]]], output: [[3, null], [3, 0], [3, null]] },
    ],
    constraints: ["0 <= n <= 1000", "-10^4 <= Node.val <= 10^4", "Node.random is null or points to a node in the linked list."],
    starter: {
      python: `from typing import Optional\n\n\ndef copyRandomList(head: Optional[RandomListNode]) -> Optional[RandomListNode]:\n    pass\n`,
      javascript: `function copyRandomList(head) {\n    \n}`,
      typescript: `function copyRandomList(head: RandomListNode | null): RandomListNode | null {\n    \n}`,
      java: `class Solution {\n    public RandomListNode copyRandomList(RandomListNode head) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    RandomListNode* copyRandomList(RandomListNode* head) {\n        \n    }\n};`,
    },
    methodName: "copyRandomList",
    argTypes: ["randomLinked"],
    outputType: "randomLinked",
    compare: "exact",
    visibleTests: [
      { args: [[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]], output: [[7, null], [13, 0], [11, 4], [10, 2], [1, 0]] },
      { args: [[[1, 1], [2, 1]]], output: [[1, 1], [2, 1]] },
      { args: [[[3, null], [3, 0], [3, null]]], output: [[3, null], [3, 0], [3, null]] },
    ],
    hiddenTests: [
      { args: [[]], output: null },
      { args: [[[1, null]]], output: [[1, null]] },
      { args: [[[1, null], [2, null], [3, null]]], output: [[1, null], [2, null], [3, null]] },
      { args: [[[-1, 3], [-2, 0], [-3, 1], [-4, 2]]], output: [[-1, 3], [-2, 0], [-3, 1], [-4, 2]] },
    ],
    editorial: {
      approach: `First pass: build a copy of each node and store it in a hash map keyed by the original node. Second pass: wire up the \`next\` and \`random\` pointers of every copy by looking up the originals' targets in the map.\n\nO(n) time and O(n) space. An O(1)-space variant interleaves copies next to originals, then unweaves, but the map version is the cleanest.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def copyRandomList(head: Optional[RandomListNode]) -> Optional[RandomListNode]:
    if not head:
        return None
    mapping = {}
    cur = head
    while cur:
        mapping[cur] = RandomListNode(cur.val)
        cur = cur.next
    cur = head
    while cur:
        mapping[cur].next = mapping.get(cur.next)
        mapping[cur].random = mapping.get(cur.random)
        cur = cur.next
    return mapping[head]`,
        javascript: `function copyRandomList(head) {
  if (!head) return null;
  const map = new Map();
  let cur = head;
  while (cur) {
    map.set(cur, new RandomListNode(cur.val));
    cur = cur.next;
  }
  cur = head;
  while (cur) {
    map.get(cur).next = map.get(cur.next) || null;
    map.get(cur).random = map.get(cur.random) || null;
    cur = cur.next;
  }
  return map.get(head);
}`,
        typescript: `function copyRandomList(head: RandomListNode | null): RandomListNode | null {
  if (!head) return null;
  const map = new Map<RandomListNode, RandomListNode>();
  let cur: RandomListNode | null = head;
  while (cur) {
    map.set(cur, new RandomListNode(cur.val));
    cur = cur.next;
  }
  cur = head;
  while (cur) {
    map.get(cur)!.next = map.get(cur.next!) || null;
    map.get(cur)!.random = map.get(cur.random!) || null;
    cur = cur.next;
  }
  return map.get(head)!;
}`,

        java: `class Solution {
    public RandomListNode copyRandomList(RandomListNode head) {
        if (head == null) return null;
        Map<RandomListNode, RandomListNode> map = new HashMap<>();
        RandomListNode cur = head;
        while (cur != null) {
            map.put(cur, new RandomListNode(cur.val));
            cur = cur.next;
        }
        cur = head;
        while (cur != null) {
            map.get(cur).next = map.get(cur.next);
            map.get(cur).random = map.get(cur.random);
            cur = cur.next;
        }
        return map.get(head);
    }
}`,
        cpp: `class Solution {
public:
    RandomListNode* copyRandomList(RandomListNode* head) {
        if (!head) return nullptr;
        unordered_map<RandomListNode*, RandomListNode*> map;
        RandomListNode* cur = head;
        while (cur) {
            map[cur] = new RandomListNode(cur->val);
            cur = cur->next;
        }
        cur = head;
        while (cur) {
            map[cur]->next = map[cur->next];
            map[cur]->random = map[cur->random];
            cur = cur->next;
        }
        return map[head];
    }
};`,      },
    },
  },
  {
    slug: "add-two-numbers",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: "linked-list",
    topics: ["Linked List", "Math", "Recursion"],
    order: 7,
    description: `You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.`,
    examples: [
      { args: [[2, 4, 3], [5, 6, 4]], output: [7, 0, 8], explain: "342 + 465 = 807." },
      { args: [[0], [0]], output: [0] },
      { args: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], output: [8, 9, 9, 9, 0, 0, 0, 1] },
    ],
    constraints: ["The number of nodes in each linked list is in the range [1, 100].", "0 <= Node.val <= 9", "It is guaranteed that the list represents a number that does not have leading zeros."],
    starter: {
      python: `from typing import Optional\n\n\ndef addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:\n    pass\n`,
      javascript: `function addTwoNumbers(l1, l2) {\n    \n}`,
      typescript: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {\n    \n}`,
      java: `class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        \n    }\n};`,
    },
    methodName: "addTwoNumbers",
    argTypes: ["linked", "linked"],
    outputType: "linked",
    compare: "exact",
    visibleTests: [
      { args: [[2, 4, 3], [5, 6, 4]], output: [7, 0, 8] },
      { args: [[0], [0]], output: [0] },
      { args: [[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]], output: [8, 9, 9, 9, 0, 0, 0, 1] },
    ],
    hiddenTests: [
      { args: [[1], [9, 9]], output: [0, 0, 1] },
      { args: [[9, 8], [1]], output: [0, 9] },
      { args: [[5], [5]], output: [0, 1] },
      { args: [[1, 2, 3], [4, 5, 6]], output: [5, 7, 9] },
      { args: [[9, 9], [9, 9, 9, 9]], output: [8, 9, 0, 0, 1] },
    ],
    editorial: {
      approach: `Walk both lists together, adding corresponding digits plus any carry from the previous position. Create one output node per digit; when both lists are exhausted, append a final node if the carry is non-zero.\n\nEach node is visited once: O(max(m, n)) time and O(max(m, n)) space for the result.`,
      complexity: { time: "O(max(m, n))", space: "O(max(m, n))" },
      code: {
        python: `def addTwoNumbers(l1: Optional[ListNode], l2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode()
    cur = dummy
    carry = 0
    while l1 or l2 or carry:
        total = carry
        if l1:
            total += l1.val
            l1 = l1.next
        if l2:
            total += l2.val
            l2 = l2.next
        carry, digit = divmod(total, 10)
        cur.next = ListNode(digit)
        cur = cur.next
    return dummy.next`,
        javascript: `function addTwoNumbers(l1, l2) {
  const dummy = new ListNode(0);
  let cur = dummy, carry = 0;
  while (l1 || l2 || carry) {
    let total = carry;
    if (l1) { total += l1.val; l1 = l1.next; }
    if (l2) { total += l2.val; l2 = l2.next; }
    carry = Math.floor(total / 10);
    cur.next = new ListNode(total % 10);
    cur = cur.next;
  }
  return dummy.next;
}`,
        typescript: `function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let cur = dummy, carry = 0;
  while (l1 || l2 || carry) {
    let total = carry;
    if (l1) { total += l1.val; l1 = l1.next; }
    if (l2) { total += l2.val; l2 = l2.next; }
    carry = Math.floor(total / 10);
    cur.next = new ListNode(total % 10);
    cur = cur.next;
  }
  return dummy.next;
}`,

        java: `class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        int carry = 0;
        while (l1 != null || l2 != null || carry != 0) {
            int sum = carry;
            if (l1 != null) { sum += l1.val; l1 = l1.next; }
            if (l2 != null) { sum += l2.val; l2 = l2.next; }
            cur.next = new ListNode(sum % 10);
            cur = cur.next;
            carry = sum / 10;
        }
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* cur = &dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int sum = carry;
            if (l1) { sum += l1->val; l1 = l1->next; }
            if (l2) { sum += l2->val; l2 = l2->next; }
            cur->next = new ListNode(sum % 10);
            cur = cur->next;
            carry = sum / 10;
        }
        return dummy.next;
    }
};`,      },
    },
  },
  {
    slug: "find-the-duplicate-number",
    title: "Find the Duplicate Number",
    difficulty: "Medium",
    category: "linked-list",
    topics: ["Array", "Two Pointers", "Binary Search"],
    order: 8,
    description: `Given an array of integers \`nums\` containing \`n + 1\` integers where each integer is in the range \`[1, n]\` inclusive.\n\nThere is only **one repeated number** in \`nums\`, return this repeated number.\n\nYou must solve the problem **without modifying** the array \`nums\` and uses only constant extra space.`,
    examples: [
      { args: [[1, 3, 4, 2, 2]], output: 2 },
      { args: [[3, 1, 3, 4, 2]], output: 3 },
    ],
    constraints: ["1 <= n <= 10^5", "nums.length == n + 1", "1 <= nums[i] <= n", "All the integers in nums appear only once except for precisely one integer which appears two or more times."],
    starter: {
      python: `from typing import List\n\n\ndef findDuplicate(nums: List[int]) -> int:\n    pass\n`,
      javascript: `function findDuplicate(nums) {\n    \n}`,
      typescript: `function findDuplicate(nums: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int findDuplicate(int[] nums) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int findDuplicate(vector<int>& nums) {\n        \n    }\n};`,
    },
    methodName: "findDuplicate",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[1, 3, 4, 2, 2]], output: 2 },
      { args: [[3, 1, 3, 4, 2]], output: 3 },
    ],
    hiddenTests: [
      { args: [[1, 1]], output: 1 },
      { args: [[1, 1, 2]], output: 1 },
      { args: [[2, 2, 2, 2]], output: 2 },
      { args: [[1, 2, 3, 4, 5, 5]], output: 5 },
      { args: [[4, 3, 1, 2, 4]], output: 4 },
    ],
    editorial: {
      approach: `Treat the array as a linked list where each value is a pointer to the index with that value. Because one value repeats, this "list" contains a cycle, and the problem reduces to finding the entry of the cycle — exactly what **Floyd's tortoise and hare** does.\n\nPhase 1: find where slow and fast meet inside the cycle. Phase 2: reset one pointer to \`nums[0]\` and advance both one step at a time; they meet at the duplicate.\n\nO(n) time, O(1) space, no modification of the input.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def findDuplicate(nums: List[int]) -> int:
    slow = fast = nums[0]
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]
    return slow`,
        javascript: `function findDuplicate(nums) {
  let slow = nums[0], fast = nums[0];
  while (true) {
    slow = nums[slow];
    fast = nums[nums[fast]];
    if (slow === fast) break;
  }
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }
  return slow;
}`,
        typescript: `function findDuplicate(nums: number[]): number {
  let slow = nums[0]!, fast = nums[0]!;
  while (true) {
    slow = nums[slow]!;
    fast = nums[nums[fast]!]!;
    if (slow === fast) break;
  }
  slow = nums[0]!;
  while (slow !== fast) {
    slow = nums[slow]!;
    fast = nums[fast]!;
  }
  return slow;
}`,

        java: `class Solution {
    public int findDuplicate(int[] nums) {
        int slow = nums[0], fast = nums[nums[0]];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[nums[fast]];
        }
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
}`,
        cpp: `class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0], fast = nums[nums[0]];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[nums[fast]];
        }
        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};`,      },
    },
  },
  {
    slug: "lru-cache",
    title: "LRU Cache",
    difficulty: "Medium",
    category: "linked-list",
    topics: ["Hash Table", "Linked List", "Design"],
    order: 9,
    description: `Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the \`LRUCache\` class:\n- \`LRUCache(int capacity)\` — Initialize the LRU cache with positive size \`capacity\`.\n- \`int get(int key)\` — Return the value of the \`key\` if the key exists, otherwise return \`-1\`.\n- \`void put(int key, int value)\` — Update the value of the \`key\` if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the \`capacity\` from this operation, **evict the least recently used key**.\n\nTests call the methods as an operations list with expected outputs.`,
    examples: [
      {
        ops: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
        args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
        output: [null, null, null, 1, null, -1, null, -1, 3, 4],
      },
    ],
    constraints: ["1 <= capacity <= 3000", "0 <= key <= 10^4", "0 <= value <= 10^5", "At most 2 * 10^5 calls will be made to get and put."],
    starter: {
      python: `class LRUCache:\n    def __init__(self, capacity: int):\n        pass\n\n    def get(self, key: int) -> int:\n        pass\n\n    def put(self, key: int, value: int) -> None:\n        pass\n`,
      javascript: `class LRUCache {\n    constructor(capacity) {\n        \n    }\n    \n    get(key) {\n        \n    }\n    \n    put(key, value) {\n        \n    }\n}`,
      typescript: `class LRUCache {\n    constructor(capacity: number) {\n        \n    }\n    \n    get(key: number): number {\n        \n    }\n    \n    put(key: number, value: number): void {\n        \n    }\n}`,
      java: `class LRUCache {\n    public LRUCache(int capacity) {\n        \n    }\n    \n    public int get(int key) {\n        \n    }\n    \n    public void put(int key, int value) {\n        \n    }\n}`,
      cpp: `class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        \n    }\n    \n    int get(int key) {\n        \n    }\n    \n    void put(int key, int value) {\n        \n    }\n};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "int",
    compare: "exact",
    classSpec: {
      className: "LRUCache",
      ops: [
        { name: "LRUCache", argTypes: ["int"], ret: "void" },
        { name: "get", argTypes: ["int"], ret: "value" },
        { name: "put", argTypes: ["int", "int"], ret: "void" },
      ],
    },
    visibleTests: [
      {
        ops: ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"],
        args: [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]],
        output: [null, null, null, 1, null, -1, null, -1, 3, 4],
      },
    ],
    hiddenTests: [
      {
        ops: ["LRUCache", "get", "put", "get", "put", "get"],
        args: [[1], [1], [2, 1], [2], [3, 2], [3]],
        output: [null, -1, null, 1, null, 2],
      },
      {
        ops: ["LRUCache", "put", "put", "put", "get", "put", "get"],
        args: [[2], [1, 10], [2, 20], [3, 30], [2], [4, 40], [1]],
        output: [null, null, null, null, 20, null, -1],
      },
      {
        ops: ["LRUCache", "put", "get", "put", "get", "get"],
        args: [[2], [2, 1], [2], [3, 2], [2], [3]],
        output: [null, null, 1, null, 1, 2],
      },
    ],
    editorial: {
      approach: `A hash map gives O(1) key lookup, but eviction needs order information. Combine both: a **doubly linked list** stores keys in recency order (most recent at the head), and the map points from key to its list node.\n\n- \`get\`: look up the node; if missing return -1, else move it to the head and return its value.\n- \`put\`: if the key exists, update and move to head; else insert at head and, if over capacity, remove the tail node and its map entry.\n\nEvery operation touches a constant number of nodes: O(1) time each, O(capacity) space.`,
      complexity: { time: "O(1) per op", space: "O(capacity)" },
      code: {
        python: `class _Node:\n    def __init__(self, key=0, value=0):\n        self.key = key\n        self.value = value\n        self.prev = None\n        self.next = None\n\n\nclass LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        self.cache = {}\n        self.head = _Node()\n        self.tail = _Node()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def _remove(self, node):\n        node.prev.next = node.next\n        node.next.prev = node.prev\n\n    def _insert(self, node):\n        node.next = self.head.next\n        node.prev = self.head\n        self.head.next.prev = node\n        self.head.next = node\n\n    def get(self, key: int) -> int:\n        if key not in self.cache:\n            return -1\n        node = self.cache[key]\n        self._remove(node)\n        self._insert(node)\n        return node.value\n\n    def put(self, key: int, value: int) -> None:\n        if key in self.cache:\n            node = self.cache[key]\n            node.value = value\n            self._remove(node)\n            self._insert(node)\n            return\n        node = _Node(key, value)\n        self.cache[key] = node\n        self._insert(node)\n        if len(self.cache) > self.capacity:\n            lru = self.tail.prev\n            self._remove(lru)\n            del self.cache[lru.key]`,
        javascript: `class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            const oldest = this.cache.keys().next().value;
            this.cache.delete(oldest);
        }
    }
}`,
        typescript: `class LRUCache {
    private cache = new Map<number, number>();
    private capacity: number;

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    get(key: number): number {
        if (!this.cache.has(key)) return -1;
        const value = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) this.cache.delete(key);
        this.cache.set(key, value);
        if (this.cache.size > this.capacity) {
            const oldest = this.cache.keys().next().value!;
            this.cache.delete(oldest);
        }
    }
}`,

        java: `class LRUCache {
    private LinkedHashMap<Integer, Integer> map;

    public LRUCache(int capacity) {
        map = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry<Integer, Integer> eldest) {
                return size() > capacity;
            }
        };
    }

    public int get(int key) {
        return map.getOrDefault(key, -1);
    }

    public void put(int key, int value) {
        map.put(key, value);
    }
}`,
        cpp: `class LRUCache {
public:
    list<pair<int,int>> items;
    unordered_map<int, list<pair<int,int>>::iterator> pos;
    int cap;

    LRUCache(int capacity) : cap(capacity) {
    }

    int get(int key) {
        auto it = pos.find(key);
        if (it == pos.end()) return -1;
        items.splice(items.begin(), items, it->second);
        return it->second->second;
    }

    void put(int key, int value) {
        auto it = pos.find(key);
        if (it != pos.end()) {
            it->second->second = value;
            items.splice(items.begin(), items, it->second);
            return;
        }
        items.push_front({key, value});
        pos[key] = items.begin();
        if ((int)items.size() > cap) {
            pos.erase(items.back().first);
            items.pop_back();
        }
    }
};`,      },
    },
  },
  {
    slug: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    difficulty: "Hard",
    category: "linked-list",
    topics: ["Linked List", "Heap", "Divide and Conquer"],
    order: 10,
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.`,
    examples: [
      { args: [[[1, 4, 5], [1, 3, 4], [2, 6]]], output: [1, 1, 2, 3, 4, 4, 5, 6] },
      { args: [[]], output: null },
      { args: [[[], []]], output: null },
    ],
    constraints: ["k == lists.length", "0 <= k <= 10^4", "0 <= lists[i].length <= 500", "-10^4 <= lists[i][j] <= 10^4", "lists[i] is sorted in ascending order.", "The sum of all lists[i].length will not exceed 10^4."],
    starter: {
      python: `from typing import List, Optional\n\n\ndef mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:\n    pass\n`,
      javascript: `function mergeKLists(lists) {\n    \n}`,
      typescript: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {\n    \n}`,
      java: `class Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        \n    }\n};`,
    },
    methodName: "mergeKLists",
    argTypes: ["linked[]"],
    outputType: "linked",
    compare: "exact",
    visibleTests: [
      { args: [[[1, 4, 5], [1, 3, 4], [2, 6]]], output: [1, 1, 2, 3, 4, 4, 5, 6] },
      { args: [[]], output: null },
      { args: [[[], []]], output: null },
    ],
    hiddenTests: [
      { args: [[[1], [2], [3]]], output: [1, 2, 3] },
      { args: [[[1, 2, 3], [], [4, 5]]], output: [1, 2, 3, 4, 5] },
      { args: [[[5, 6], [1, 2], [3, 4]]], output: [1, 2, 3, 4, 5, 6] },
      { args: [[[-5, 0], [-10, -1], [2, 7]]], output: [-10, -5, -1, 0, 2, 7] },
    ],
    editorial: {
      approach: `Push the head of every non-empty list into a **min-heap** keyed by node value. Repeatedly pop the smallest node, append it to the result, and push its successor if any. The heap always contains at most k nodes, so each pop/push is O(log k).\n\nTotal time is O(N log k) where N is the total number of nodes; space is O(k).`,
      complexity: { time: "O(N log k)", space: "O(k)" },
      code: {
        python: `import heapq\n\n\ndef mergeKLists(lists: List[Optional[ListNode]]) -> Optional[ListNode]:
    heap = []\n    for i, node in enumerate(lists):\n        if node:\n            heapq.heappush(heap, (node.val, i, node))\n    dummy = ListNode()\n    cur = dummy\n    while heap:\n        _, i, node = heapq.heappop(heap)\n        cur.next = node\n        cur = cur.next\n        if node.next:\n            heapq.heappush(heap, (node.next.val, i, node.next))\n    return dummy.next`,
        javascript: `function mergeKLists(lists) {
  const dummy = new ListNode(0);
  let cur = dummy;
  const arr = [];
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) arr.push([lists[i].val, i, lists[i]]);
  }
  const heap = new MinHeap();
  for (const item of arr) heap.push(item);
  while (heap.size()) {
    const [val, i, node] = heap.pop();
    cur.next = node;
    cur = cur.next;
    if (node.next) heap.push([node.next.val, i, node.next]);
  }
  return dummy.next;
}

class MinHeap {
  constructor() { this.data = []; }
  size() { return this.data.length; }
  push(v) {
    this.data.push(v);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p][0] <= this.data[i][0]) break;
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
        if (l < this.data.length && this.data[l][0] < this.data[m][0]) m = l;
        if (r < this.data.length && this.data[r][0] < this.data[m][0]) m = r;
        if (m === i) break;
        [this.data[m], this.data[i]] = [this.data[i], this.data[m]];
        i = m;
      }
    }
    return top;
  }
}`,
        typescript: `function mergeKLists(lists: (ListNode | null)[]): ListNode | null {
  const dummy = new ListNode(0);
  let cur: ListNode = dummy;
  const heap = new MinHeap<[number, number, ListNode]>();
  for (let i = 0; i < lists.length; i++) {
    if (lists[i]) heap.push([lists[i]!.val, i, lists[i]!]);
  }
  while (heap.size()) {
    const [val, i, node] = heap.pop()!;
    cur.next = node;
    cur = cur.next;
    if (node.next) heap.push([node.next.val, i, node.next]);
  }
  return dummy.next;
}

class MinHeap<T extends [number, ...unknown[]]> {
  data: T[] = [];
  size() { return this.data.length; }
  push(v: T) {
    this.data.push(v);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.data[p]![0] <= this.data[i]![0]) break;
      [this.data[p], this.data[i]] = [this.data[i]!, this.data[p]!];
      i = p;
    }
  }
  pop(): T | undefined {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length && last !== undefined) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        const l = 2 * i + 1, r = 2 * i + 2;
        let m = i;
        if (l < this.data.length && this.data[l]![0] < this.data[m]![0]) m = l;
        if (r < this.data.length && this.data[r]![0] < this.data[m]![0]) m = r;
        if (m === i) break;
        [this.data[m], this.data[i]] = [this.data[i]!, this.data[m]!];
        i = m;
      }
    }
    return top;
  }
}`,

        java: `class Solution {
    public ListNode mergeKLists(ListNode[] lists) {
        PriorityQueue<ListNode> heap = new PriorityQueue<>((a, b) -> a.val - b.val);
        for (ListNode node : lists) {
            if (node != null) heap.add(node);
        }
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (!heap.isEmpty()) {
            ListNode node = heap.poll();
            cur.next = node;
            cur = cur.next;
            if (node.next != null) heap.add(node.next);
        }
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        auto cmp = [](ListNode* a, ListNode* b) { return a->val > b->val; };
        priority_queue<ListNode*, vector<ListNode*>, decltype(cmp)> heap(cmp);
        for (ListNode* node : lists) {
            if (node) heap.push(node);
        }
        ListNode dummy(0);
        ListNode* cur = &dummy;
        while (!heap.empty()) {
            ListNode* node = heap.top();
            heap.pop();
            cur->next = node;
            cur = cur->next;
            if (node->next) heap.push(node->next);
        }
        return dummy.next;
    }
};`,      },
    },
  },
  {
    slug: "reverse-nodes-in-k-group",
    title: "Reverse Nodes in k-Group",
    difficulty: "Hard",
    category: "linked-list",
    topics: ["Linked List", "Recursion"],
    order: 11,
    description: `Given the head of a linked list, reverse the nodes of the list \`k\` at a time, and return the modified list.\n\n\`k\` is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of \`k\` then left-out nodes, in the end, should remain as they are.\n\nYou may not alter the values in the list's nodes, only the nodes themselves may be changed.`,
    examples: [
      { args: [[1, 2, 3, 4, 5], 2], output: [2, 1, 4, 3, 5] },
      { args: [[1, 2, 3, 4, 5], 3], output: [3, 2, 1, 4, 5] },
    ],
    constraints: ["The number of nodes in the list is n.", "1 <= k <= n <= 5000", "0 <= Node.val <= 1000"],
    starter: {
      python: `from typing import Optional\n\n\ndef reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:\n    pass\n`,
      javascript: `function reverseKGroup(head, k) {\n    \n}`,
      typescript: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {\n    \n}`,
      java: `class Solution {\n    public ListNode reverseKGroup(ListNode head, int k) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    ListNode* reverseKGroup(ListNode* head, int k) {\n        \n    }\n};`,
    },
    methodName: "reverseKGroup",
    argTypes: ["linked", "int"],
    outputType: "linked",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 4, 5], 2], output: [2, 1, 4, 3, 5] },
      { args: [[1, 2, 3, 4, 5], 3], output: [3, 2, 1, 4, 5] },
    ],
    hiddenTests: [
      { args: [[1], 1], output: [1] },
      { args: [[1, 2], 1], output: [1, 2] },
      { args: [[1, 2, 3, 4], 2], output: [2, 1, 4, 3] },
      { args: [[1, 2, 3, 4, 5, 6], 3], output: [3, 2, 1, 6, 5, 4] },
      { args: [[1, 2, 3, 4, 5, 6, 7], 3], output: [3, 2, 1, 6, 5, 4, 7] },
    ],
    editorial: {
      approach: `Recursively reverse each group of k nodes: first verify k nodes exist ahead, reverse that segment, then recurse on the remainder and link the reversed segment's tail to the result.\n\nReversing a segment of k nodes is the standard three-pointer reversal. Total time is O(n) with O(n / k) recursion depth (or iterate with O(1) space).`,
      complexity: { time: "O(n)", space: "O(n / k)" },
      code: {
        python: `def reverseKGroup(head: Optional[ListNode], k: int) -> Optional[ListNode]:
    cur = head
    count = 0
    while cur and count < k:
        cur = cur.next
        count += 1
    if count < k:
        return head
    prev = None
    cur = head
    for _ in range(k):
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    head.next = reverseKGroup(cur, k)
    return prev`,
        javascript: `function reverseKGroup(head, k) {
  let cur = head, count = 0;
  while (cur && count < k) {
    cur = cur.next;
    count++;
  }
  if (count < k) return head;
  let prev = null;
  cur = head;
  for (let i = 0; i < k; i++) {
    const next = cur.next;
    cur.next = prev;
    prev = cur;
    cur = next;
  }
  head.next = reverseKGroup(cur, k);
  return prev;
}`,
        typescript: `function reverseKGroup(head: ListNode | null, k: number): ListNode | null {
  let cur: ListNode | null = head, count = 0;
  while (cur && count < k) {
    cur = cur.next;
    count++;
  }
  if (count < k) return head;
  let prev: ListNode | null = null;
  cur = head;
  for (let i = 0; i < k; i++) {
    const next = cur!.next;
    cur!.next = prev;
    prev = cur;
    cur = next;
  }
  head!.next = reverseKGroup(cur, k);
  return prev;
}`,

        java: `class Solution {
    public ListNode reverseKGroup(ListNode head, int k) {
        ListNode cur = head;
        int count = 0;
        while (cur != null && count < k) {
            cur = cur.next;
            count++;
        }
        if (count < k) return head;
        ListNode prev = null, node = head;
        for (int i = 0; i < k; i++) {
            ListNode next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        head.next = reverseKGroup(node, k);
        return prev;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* cur = head;
        int count = 0;
        while (cur && count < k) {
            cur = cur->next;
            count++;
        }
        if (count < k) return head;
        ListNode* prev = nullptr;
        ListNode* node = head;
        for (int i = 0; i < k; i++) {
            ListNode* next = node->next;
            node->next = prev;
            prev = node;
            node = next;
        }
        head->next = reverseKGroup(node, k);
        return prev;
    }
};`,      },
    },
  },
];
