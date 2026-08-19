import type { Problem } from "@/lib/types";

export const linkedListProblems: Problem[] = [
  {
    slug: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "linked-list",
    topics: ["Linked List", "Recursion"],
    order: 1,
    description: `Given the head of a singly linked list, reverse the list, and return the new head.

A linked list is represented in tests as a level-order-like array, e.g. \`[1, 2, 3, 4, 5]\` means \`1 -> 2 -> 3 -> 4 -> 5\`. The \`ListNode\` class is provided with \`val\` and \`next\` fields.`,
    examples: [
      { args: [[1, 2, 3, 4, 5]], output: [5, 4, 3, 2, 1] },
      { args: [[1, 2]], output: [2, 1] },
      { args: [[]], output: null },
    ],
    constraints: ["0 <= number of nodes <= 5000", "-5000 <= Node.val <= 5000"],
    starter: {
      python: `from typing import Optional


def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:
    pass
`,
      javascript: `function reverseList(head) {
    
}`,
      typescript: `function reverseList(head: ListNode | null): ListNode | null {
    
}`,
      java: `class Solution {
    public ListNode reverseList(ListNode head) {
        
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`,
      dart: `class Solution {
  ListNode? reverseList(ListNode? head) {
    
  }
}`,
    },
    methodName: "reverseList",
    argTypes: ["linked"],
    outputType: "linked",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 4, 5]], output: [5, 4, 3, 2, 1] },
      { args: [[1, 2]], output: [2, 1] },
      { args: [[]], output: null },
    ],
    hiddenTests: [
      { args: [[1]], output: [1] },
      { args: [[1, 2, 3]], output: [3, 2, 1] },
      { args: [[5, 4, 3, 2, 1, 0]], output: [0, 1, 2, 3, 4, 5] },
      { args: [[-1, 0, 1]], output: [1, 0, -1] },
    ],
    editorial: {
      approach: `Walk the list with three references: \`prev\`, \`curr\` and \`next\`. At each node, save the next pointer, flip \`curr.next\` to point at \`prev\`, then advance all three. When \`curr\` becomes null, \`prev\` is the new head.

This runs in O(n) time with O(1) space. A recursive variant is equally valid but uses O(n) stack space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def reverseList(head: Optional[ListNode]) -> Optional[ListNode]:
    prev, curr = None, head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
        javascript: `function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,
        typescript: `function reverseList(head: ListNode | null): ListNode | null {
  let prev: ListNode | null = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}`,

        java: `class Solution {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null, cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            cur.next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* cur = head;
        while (cur) {
            ListNode* next = cur->next;
            cur->next = prev;
            prev = cur;
            cur = next;
        }
        return prev;
    }
};`,      },
    },
  },
  {
    slug: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "linked-list",
    topics: ["Linked List", "Recursion"],
    order: 2,
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.

Lists are given as arrays in tests; the \`ListNode\` class has \`val\` and \`next\` fields.`,
    examples: [
      { args: [[1, 2, 4], [1, 3, 4]], output: [1, 1, 2, 3, 4, 4] },
      { args: [[], []], output: null },
      { args: [[], [0]], output: [0] },
    ],
    constraints: ["0 <= number of nodes in each list <= 50", "-100 <= Node.val <= 100", "Both lists are sorted in non-decreasing order."],
    starter: {
      python: `from typing import Optional


def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    pass
`,
      javascript: `function mergeTwoLists(list1, list2) {
    
}`,
      typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    
}`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        
    }
};`,
      dart: `class Solution {
  ListNode? mergeTwoLists(ListNode? list1, ListNode? list2) {
    
  }
}`,
    },
    methodName: "mergeTwoLists",
    argTypes: ["linked", "linked"],
    outputType: "linked",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 4], [1, 3, 4]], output: [1, 1, 2, 3, 4, 4] },
      { args: [[], []], output: null },
      { args: [[], [0]], output: [0] },
    ],
    hiddenTests: [
      { args: [[1], [2]], output: [1, 2] },
      { args: [[2], [1]], output: [1, 2] },
      { args: [[1, 2, 3], []], output: [1, 2, 3] },
      { args: [[-5, 0, 5], [-3, 3]], output: [-5, -3, 0, 3, 5] },
      { args: [[1, 1, 1], [1, 1]], output: [1, 1, 1, 1, 1] },
    ],
    editorial: {
      approach: `Use a dummy head to simplify the wiring. Compare the two current nodes; attach the smaller one to the result and advance that list. When one list is exhausted, append the remainder of the other.

Each node is visited once, giving O(n + m) time and O(1) space (excluding the dummy).`,
      complexity: { time: "O(n + m)", space: "O(1)" },
      code: {
        python: `def mergeTwoLists(list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
    dummy = ListNode()
    tail = dummy
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
    tail.next = list1 or list2
    return dummy.next`,
        javascript: `function mergeTwoLists(list1, list2) {
  const dummy = new ListNode(0);
  let tail = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`,
        typescript: `function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
  const dummy = new ListNode(0);
  let tail: ListNode = dummy;
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tail.next = list1;
      list1 = list1.next;
    } else {
      tail.next = list2;
      list2 = list2.next;
    }
    tail = tail.next;
  }
  tail.next = list1 || list2;
  return dummy.next;
}`,

        java: `class Solution {
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode cur = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                cur.next = l1;
                l1 = l1.next;
            } else {
                cur.next = l2;
                l2 = l2.next;
            }
            cur = cur.next;
        }
        cur.next = l1 != null ? l1 : l2;
        return dummy.next;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* cur = &dummy;
        while (l1 && l2) {
            if (l1->val <= l2->val) {
                cur->next = l1;
                l1 = l1->next;
            } else {
                cur->next = l2;
                l2 = l2->next;
            }
            cur = cur->next;
        }
        cur->next = l1 ? l1 : l2;
        return dummy.next;
    }
};`,      },
    },
  },
  {
    slug: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "linked-list",
    topics: ["Linked List", "Two Pointers", "Hash Table"],
    order: 3,
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer. Return \`true\` if there is a cycle, or \`false\` otherwise.

**Test format**: a cycle is encoded as a two-element array \`[values, pos]\` where \`values\` is the list as an array and \`pos\` is the index (0-based) of the node the tail connects back to, or \`-1\` for no cycle. Your function receives the head node.`,
    examples: [
      { args: [[[3, 2, 0, -4], 1]], output: true, explain: "The tail connects to the node at index 1." },
      { args: [[[1, 2], 0]], output: true },
      { args: [[[1], -1]], output: false },
    ],
    constraints: ["0 <= number of nodes <= 10^4", "-10^5 <= Node.val <= 10^5", "pos is -1 or a valid index in the linked-list."],
    starter: {
      python: `from typing import Optional


def hasCycle(head: Optional[ListNode]) -> bool:
    pass
`,
      javascript: `function hasCycle(head) {
    
}`,
      typescript: `function hasCycle(head: ListNode | null): boolean {
    
}`,
      java: `class Solution {
    public boolean hasCycle(ListNode head) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        
    }
};`,
      dart: `class Solution {
  bool hasCycle(ListNode? head) {
    
  }
}`,
    },
    methodName: "hasCycle",
    argTypes: ["cycle"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[[3, 2, 0, -4], 1]], output: true },
      { args: [[[1, 2], 0]], output: true },
      { args: [[[1], -1]], output: false },
    ],
    hiddenTests: [
      { args: [[[], -1]], output: false },
      { args: [[[1, 2, 3, 4], 3]], output: true },
      { args: [[[1, 2, 3, 4, 5], 0]], output: true },
      { args: [[[1, 2, 3, 4, 5], -1]], output: false },
      { args: [[[42, 42, 42], 1]], output: true },
    ],
    editorial: {
      approach: `Use **Floyd's cycle detection** (tortoise and hare): a slow pointer advances one node per step, a fast pointer advances two. If there is a cycle, the fast pointer will eventually lap the slow pointer inside it; if not, the fast pointer reaches the end first.

O(n) time and O(1) space — no extra memory for visited nodes.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def hasCycle(head: Optional[ListNode]) -> bool:
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,
        javascript: `function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
        typescript: `function hasCycle(head: ListNode | null): boolean {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,

        java: `class Solution {
    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
        cpp: `class Solution {
public:
    bool hasCycle(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};`,      },
    },
  },
  {
    slug: "reorder-list",
    title: "Reorder List",
    difficulty: "Medium",
    category: "linked-list",
    topics: ["Linked List", "Two Pointers", "Stack"],
    order: 4,
    description: `You are given the head of a singly linked-list. The list can be represented as:

\`L0 -> L1 -> ... -> Ln-1 -> Ln\`

Reorder the list to be on the following form:

\`L0 -> Ln -> L1 -> Ln-1 -> L2 -> Ln-2 -> ...\`

You may not modify the values in the list's nodes; only nodes themselves may be changed. **Return the head of the reordered list** (you may reorder in place and return \`head\`).

Lists are given as arrays in tests.`,
    examples: [
      { args: [[1, 2, 3, 4]], output: [1, 4, 2, 3] },
      { args: [[1, 2, 3, 4, 5]], output: [1, 5, 2, 4, 3] },
    ],
    constraints: ["1 <= number of nodes <= 5 * 10^4", "-1000 <= Node.val <= 1000"],
    starter: {
      python: `from typing import Optional


def reorderList(head: Optional[ListNode]) -> Optional[ListNode]:
    pass
`,
      javascript: `function reorderList(head) {
    
}`,
      typescript: `function reorderList(head: ListNode | null): ListNode | null {
    
}`,
      java: `class Solution {
    public ListNode reorderList(ListNode head) {
        
    }
}`,
      cpp: `class Solution {
public:
    ListNode* reorderList(ListNode* head) {
        
    }
};`,
      dart: `class Solution {
  ListNode? reorderList(ListNode? head) {
    
  }
}`,
    },
    methodName: "reorderList",
    argTypes: ["linked"],
    outputType: "linked",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 4]], output: [1, 4, 2, 3] },
      { args: [[1, 2, 3, 4, 5]], output: [1, 5, 2, 4, 3] },
    ],
    hiddenTests: [
      { args: [[1]], output: [1] },
      { args: [[1, 2]], output: [1, 2] },
      { args: [[1, 2, 3]], output: [1, 3, 2] },
      { args: [[1, 2, 3, 4, 5, 6]], output: [1, 6, 2, 5, 3, 4] },
      { args: [[1, 2, 3, 4, 5, 6, 7]], output: [1, 7, 2, 6, 3, 5, 4] },
    ],
    editorial: {
      approach: `Split the work into three steps:
1. Find the middle of the list with fast & slow pointers.
2. Reverse the second half.
3. Interleave the two halves: take one node from the front half, then one from the reversed back half, and so on.

Each step is O(n), so the whole procedure is O(n) time and O(1) space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def reorderList(head: Optional[ListNode]) -> Optional[ListNode]:
    if not head or not head.next:
        return head
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    second = slow.next
    slow.next = None
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2
    return head`,
        javascript: `function reorderList(head) {
  if (!head || !head.next) return head;
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let second = slow.next;
  slow.next = null;
  let prev = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }
  let first = head;
  second = prev;
  while (second) {
    const tmp1 = first.next, tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
  return head;
}`,
        typescript: `function reorderList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) return head;
  let slow: ListNode | null = head, fast: ListNode | null = head;
  while (fast && fast.next) {
    slow = slow.next!;
    fast = fast.next.next;
  }
  let second = slow.next;
  slow.next = null;
  let prev: ListNode | null = null;
  while (second) {
    const next = second.next;
    second.next = prev;
    prev = second;
    second = next;
  }
  let first: ListNode | null = head;
  second = prev;
  while (second) {
    const tmp1 = first.next, tmp2 = second.next;
    first.next = second;
    second.next = tmp1;
    first = tmp1;
    second = tmp2;
  }
  return head;
}`,

        java: `class Solution {
    public ListNode reorderList(ListNode head) {
        if (head == null || head.next == null) return head;
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        ListNode second = reverse(slow.next);
        slow.next = null;
        ListNode first = head;
        while (second != null) {
            ListNode t1 = first.next, t2 = second.next;
            first.next = second;
            second.next = t1;
            first = t1;
            second = t2;
        }
        return head;
    }

    private ListNode reverse(ListNode node) {
        ListNode prev = null;
        while (node != null) {
            ListNode next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }
        return prev;
    }
}`,
        cpp: `class Solution {
public:
    ListNode* reorderList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode* slow = head;
        ListNode* fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        ListNode* second = reverse(slow->next);
        slow->next = nullptr;
        ListNode* first = head;
        while (second) {
            ListNode* t1 = first->next;
            ListNode* t2 = second->next;
            first->next = second;
            second->next = t1;
            first = t1;
            second = t2;
        }
        return head;
    }

    ListNode* reverse(ListNode* node) {
        ListNode* prev = nullptr;
        while (node) {
            ListNode* next = node->next;
            node->next = prev;
            prev = node;
            node = next;
        }
        return prev;
    }
};`,      },
    },
  },
];
