import type { Problem } from "@/lib/types";

export const stackExtra: Problem[] = [
  {
    slug: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    category: "stack",
    topics: ["Stack", "Design"],
    order: 5,
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.\n\nImplement the \`MinStack\` class:\n- \`MinStack()\` — Initializes the stack object.\n- \`void push(int val)\` — Pushes the element \`val\` onto the stack.\n- \`void pop()\` — Removes the element on the top of the stack.\n- \`int top()\` — Gets the top element of the stack.\n- \`int getMin()\` — Retrieves the minimum element in the stack.\n\nTests call the methods as an operations list with expected outputs.`,
    examples: [
      {
        ops: ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
        args: [[], [-2], [0], [-3], [], [], [], []],
        output: [null, null, null, null, -3, null, 0, -2],
      },
    ],
    constraints: ["-2^31 <= val <= 2^31 - 1", "Methods pop, top and getMin operations will always be called on non-empty stacks.", "At most 3 * 10^4 calls will be made to push, pop, top, and getMin."],
    starter: {
      python: `class MinStack:\n    def __init__(self):\n        pass\n\n    def push(self, val: int) -> None:\n        pass\n\n    def pop(self) -> None:\n        pass\n\n    def top(self) -> int:\n        pass\n\n    def getMin(self) -> int:\n        pass\n`,
      javascript: `class MinStack {\n    constructor() {\n        \n    }\n    \n    push(val) {\n        \n    }\n    \n    pop() {\n        \n    }\n    \n    top() {\n        \n    }\n    \n    getMin() {\n        \n    }\n}`,
      typescript: `class MinStack {\n    constructor() {\n        \n    }\n    \n    push(val: number): void {\n        \n    }\n    \n    pop(): void {\n        \n    }\n    \n    top(): number {\n        \n    }\n    \n    getMin(): number {\n        \n    }\n}`,
      java: `class MinStack {\n    public MinStack() {\n        \n    }\n    \n    public void push(int val) {\n        \n    }\n    \n    public void pop() {\n        \n    }\n    \n    public int top() {\n        \n    }\n    \n    public int getMin() {\n        \n    }\n}`,
      cpp: `class MinStack {\npublic:\n    MinStack() {\n        \n    }\n    \n    void push(int val) {\n        \n    }\n    \n    void pop() {\n        \n    }\n    \n    int top() {\n        \n    }\n    \n    int getMin() {\n        \n    }\n};`,
      dart: `class Solution {
  void push(int val) {
    
  }
}`,
    },
    methodName: "",
    argTypes: [],
    outputType: "int",
    compare: "exact",
    classSpec: {
      className: "MinStack",
      ops: [
        { name: "MinStack", argTypes: [], ret: "void" },
        { name: "push", argTypes: ["int"], ret: "void" },
        { name: "pop", argTypes: [], ret: "void" },
        { name: "top", argTypes: [], ret: "value" },
        { name: "getMin", argTypes: [], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["MinStack", "push", "push", "push", "getMin", "pop", "top", "getMin"],
        args: [[], [-2], [0], [-3], [], [], [], []],
        output: [null, null, null, null, -3, null, 0, -2],
      },
    ],
    hiddenTests: [
      {
        ops: ["MinStack", "push", "push", "getMin", "top", "pop", "getMin"],
        args: [[], [5], [3], [], [], [], []],
        output: [null, null, null, 3, 3, null, 5],
      },
      {
        ops: ["MinStack", "push", "push", "push", "push", "getMin", "pop", "getMin", "top"],
        args: [[], [10], [20], [30], [5], [], [], [], []],
        output: [null, null, null, null, null, 5, null, 10, 30],
      },
      {
        ops: ["MinStack", "push", "getMin", "push", "getMin", "push", "getMin", "pop", "getMin"],
        args: [[], [-1], [], [0], [], [-2], [], [], []],
        output: [null, null, -1, null, -1, null, -2, null, -1],
      },
    ],
    editorial: {
      approach: `A single stack alone cannot answer "min so far" in O(1). Keep a **second stack that stores the minimum at every level**: when pushing \`val\`, push \`min(val, currentMin)\` onto the min-stack (or \`val\` if empty). \`getMin\` just peeks the min-stack's top, and \`pop\` pops both stacks together so they stay in sync.\n\nEvery operation is O(1) time; space is O(n).`,
      complexity: { time: "O(1) per op", space: "O(n)" },
      code: {
        python: `class MinStack:\n    def __init__(self):\n        self.stack = []\n        self.min_stack = []\n\n    def push(self, val: int) -> None:\n        self.stack.append(val)\n        cur_min = val if not self.min_stack else min(val, self.min_stack[-1])\n        self.min_stack.append(cur_min)\n\n    def pop(self) -> None:\n        self.stack.pop()\n        self.min_stack.pop()\n\n    def top(self) -> int:\n        return self.stack[-1]\n\n    def getMin(self) -> int:\n        return self.min_stack[-1]`,
        javascript: `class MinStack {\n    constructor() {\n        this.stack = [];\n        this.minStack = [];\n    }\n\n    push(val) {\n        this.stack.push(val);\n        const cur = this.minStack.length ? Math.min(val, this.minStack[this.minStack.length - 1]) : val;\n        this.minStack.push(cur);\n    }\n\n    pop() {\n        this.stack.pop();\n        this.minStack.pop();\n    }\n\n    top() {\n        return this.stack[this.stack.length - 1];\n    }\n\n    getMin() {\n        return this.minStack[this.minStack.length - 1];\n    }\n}`,
        typescript: `class MinStack {\n    private stack: number[] = [];\n    private minStack: number[] = [];\n\n    push(val: number): void {\n        this.stack.push(val);\n        const cur = this.minStack.length ? Math.min(val, this.minStack[this.minStack.length - 1]!) : val;\n        this.minStack.push(cur);\n    }\n\n    pop(): void {\n        this.stack.pop();\n        this.minStack.pop();\n    }\n\n    top(): number {\n        return this.stack[this.stack.length - 1]!;\n    }\n\n    getMin(): number {\n        return this.minStack[this.minStack.length - 1]!;\n    }\n}`,

        java: `class MinStack {
    private ArrayDeque<int[]> stack = new ArrayDeque<>();

    public MinStack() {
    }

    public void push(int val) {
        int min = stack.isEmpty() ? val : Math.min(val, stack.peek()[1]);
        stack.push(new int[]{val, min});
    }

    public void pop() {
        stack.pop();
    }

    public int top() {
        return stack.peek()[0];
    }

    public int getMin() {
        return stack.peek()[1];
    }
}`,
        cpp: `class MinStack {
public:
    stack<pair<int,int>> st;

    MinStack() {
    }

    void push(int val) {
        int mn = st.empty() ? val : min(val, st.top().second);
        st.push({val, mn});
    }

    void pop() {
        st.pop();
    }

    int top() {
        return st.top().first;
    }

    int getMin() {
        return st.top().second;
    }
};`,      },
    },
  },
  {
    slug: "generate-parentheses",
    title: "Generate Parentheses",
    difficulty: "Medium",
    category: "stack",
    topics: ["String", "Backtracking", "Stack"],
    order: 6,
    description: `Given \`n\` pairs of parentheses, write a function to generate **all combinations of well-formed parentheses**.`,
    examples: [
      { args: [3], output: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
      { args: [1], output: ["()"] },
    ],
    constraints: ["1 <= n <= 8"],
    starter: {
      python: `from typing import List\n\n\ndef generateParenthesis(n: int) -> List[str]:\n    pass\n`,
      javascript: `function generateParenthesis(n) {\n    \n}`,
      typescript: `function generateParenthesis(n: number): string[] {\n    \n}`,
      java: `class Solution {\n    public List<String> generateParenthesis(int n) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        \n    }\n};`,
      dart: `class Solution {
  List<String> generateParenthesis(int n) {
    
  }
}`,
    },
    methodName: "generateParenthesis",
    argTypes: ["int"],
    outputType: "string[]",
    compare: "anyOrder",
    visibleTests: [
      { args: [3], output: ["((()))", "(()())", "(())()", "()(())", "()()()"] },
      { args: [1], output: ["()"] },
    ],
    hiddenTests: [
      { args: [2], output: ["(())", "()()"] },
      { args: [4], output: ["(((())))", "((()()))", "((())())", "((()))()", "(()(()))", "(()()())", "(()())()", "(())(())", "(())()()", "()((()))", "()(()())", "()(())()", "()()(())", "()()()()"] },
    ],
    editorial: {
      approach: `Backtracking with two counters: how many opens and closes we have placed. We may place an open paren while \`open < n\`; we may place a close paren while \`close < open\` (a close can never precede its matching open). When both reach \`n\`, record the string.\n\nThis generates exactly the well-formed strings — O(4^n / sqrt(n)) of them — in O(n) depth.`,
      complexity: { time: "O(4^n / sqrt(n))", space: "O(n)" },
      code: {
        python: `def generateParenthesis(n: int) -> List[str]:\n    result = []\n\n    def dfs(open_count, close_count, path):\n        if open_count == n and close_count == n:\n            result.append(path)\n            return\n        if open_count < n:\n            dfs(open_count + 1, close_count, path + "(")\n        if close_count < open_count:\n            dfs(open_count, close_count + 1, path + ")")\n\n    dfs(0, 0, "")\n    return result`,
        javascript: `function generateParenthesis(n) {\n  const result = [];\n  const dfs = (open, close, path) => {\n    if (open === n && close === n) {\n      result.push(path);\n      return;\n    }\n    if (open < n) dfs(open + 1, close, path + "(");\n    if (close < open) dfs(open, close + 1, path + ")");\n  };\n  dfs(0, 0, "");\n  return result;\n}`,
        typescript: `function generateParenthesis(n: number): string[] {\n  const result: string[] = [];\n  const dfs = (open: number, close: number, path: string): void => {\n    if (open === n && close === n) {\n      result.push(path);\n      return;\n    }\n    if (open < n) dfs(open + 1, close, path + "(");\n    if (close < open) dfs(open, close + 1, path + ")");\n  };\n  dfs(0, 0, "");\n  return result;\n}`,

        java: `class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> res = new ArrayList<>();
        backtrack(n, 0, 0, new StringBuilder(), res);
        return res;
    }

    private void backtrack(int n, int open, int close, StringBuilder cur, List<String> res) {
        if (cur.length() == 2 * n) {
            res.add(cur.toString());
            return;
        }
        if (open < n) {
            cur.append('(');
            backtrack(n, open + 1, close, cur, res);
            cur.deleteCharAt(cur.length() - 1);
        }
        if (close < open) {
            cur.append(')');
            backtrack(n, open, close + 1, cur, res);
            cur.deleteCharAt(cur.length() - 1);
        }
    }
}`,
        cpp: `class Solution {
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        string cur;
        function<void(int,int)> backtrack = [&](int open, int close) {
            if ((int)cur.size() == 2 * n) {
                res.push_back(cur);
                return;
            }
            if (open < n) {
                cur.push_back('(');
                backtrack(open + 1, close);
                cur.pop_back();
            }
            if (close < open) {
                cur.push_back(')');
                backtrack(open, close + 1);
                cur.pop_back();
            }
        };
        backtrack(0, 0);
        return res;
    }
};`,      },
    },
  },
  {
    slug: "car-fleet",
    title: "Car Fleet",
    difficulty: "Medium",
    category: "stack",
    topics: ["Array", "Stack", "Sorting", "Monotonic Stack"],
    order: 7,
    description: `There are \`n\` cars going to the same destination along a one-lane road. The destination is \`target\` miles away.\n\nYou are given two integer arrays \`position\` and \`speed\`, both of length \`n\`, where \`position[i]\` is the position of the i-th car and \`speed[i]\` is the speed of the i-th car (in miles per hour).\n\nA car can never pass another car ahead of it, but it can catch up to it and drive bumper to bumper **at the same speed**. The faster car will slow down to match the slower car's speed. The distance between these two cars is ignored (i.e., they are assumed to have the same position).\n\nA **car fleet** is some non-empty set of cars driving at the same position and same speed. Note that a single car is also a car fleet.\n\nIf a car catches up to a car fleet right at the destination point, it will still be considered as one car fleet. Return the **number of car fleets** that will arrive at the destination.`,
    examples: [
      { args: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], output: 3, explain: "The cars starting at 10 (speed 2) and 8 (speed 4) become one fleet; the cars at 5 (1) and 3 (3) become another; the car at 0 (1) is its own fleet." },
      { args: [10, [3], [3]], output: 1 },
      { args: [100, [0, 2, 4], [4, 2, 1]], output: 1 },
    ],
    constraints: ["n == position.length == speed.length", "1 <= n <= 10^5", "0 < target <= 10^6", "0 <= position[i] < target", "All the values of position are unique.", "0 < speed[i] <= 10^6"],
    starter: {
      python: `from typing import List\n\n\ndef carFleet(target: int, position: List[int], speed: List[int]) -> int:\n    pass\n`,
      javascript: `function carFleet(target, position, speed) {\n    \n}`,
      typescript: `function carFleet(target: number, position: number[], speed: number[]): number {\n    \n}`,
      java: `class Solution {\n    public int carFleet(int target, int[] position, int[] speed) {\n        \n    }\n}`,
      cpp: `class Solution {\npublic:\n    int carFleet(int target, vector<int>& position, vector<int>& speed) {\n        \n    }\n};`,
      dart: `class Solution {
  int carFleet(int target, List<int> position, List<int> speed) {
    
  }
}`,
    },
    methodName: "carFleet",
    argTypes: ["int", "int[]", "int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], output: 3 },
      { args: [10, [3], [3]], output: 1 },
      { args: [100, [0, 2, 4], [4, 2, 1]], output: 1 },
    ],
    hiddenTests: [
      { args: [10, [0, 1, 2], [1, 1, 1]], output: 3 },
      { args: [10, [0, 4, 2], [2, 1, 3]], output: 1 },
      { args: [12, [10, 8, 0, 5, 3], [2, 4, 1, 1, 3]], output: 3 },
      { args: [20, [6, 2, 17], [3, 9, 2]], output: 2 },
      { args: [100, [0, 1, 2, 3, 4], [5, 4, 3, 2, 1]], output: 1 },
    ],
    editorial: {
      approach: `Sort cars by position (closest to target first), then compute each car's **time to reach target** = \`(target - position) / speed\`.\n\nA faster car behind a slower one will catch up, so walk from the front: if a car's time is less than or equal to the time of the fleet ahead, it merges into that fleet (stack pop); otherwise it starts a new fleet. The number of remaining entries is the fleet count.\n\nO(n log n) time for the sort, O(n) space.`,
      complexity: { time: "O(n log n)", space: "O(n)" },
      code: {
        python: `def carFleet(target: int, position: List[int], speed: List[int]) -> int:\n    pairs = sorted(zip(position, speed), reverse=True)\n    stack = []\n    for pos, spd in pairs:\n        time = (target - pos) / spd\n        if not stack or time > stack[-1]:\n            stack.append(time)\n    return len(stack)`,
        javascript: `function carFleet(target, position, speed) {
  const pairs = position.map((pos, i) => [pos, speed[i]]).sort((a, b) => b[0] - a[0]);
  const stack = [];
  for (const [pos, spd] of pairs) {
    const time = (target - pos) / spd;
    if (!stack.length || time > stack[stack.length - 1]) stack.push(time);
  }
  return stack.length;
}`,
        typescript: `function carFleet(target: number, position: number[], speed: number[]): number {
  const pairs = position.map((pos, i) => [pos, speed[i]!]).sort((a, b) => b[0]! - a[0]!);
  const stack: number[] = [];
  for (const [pos, spd] of pairs) {
    const time = (target - pos!) / spd!;
    if (!stack.length || time > stack[stack.length - 1]!) stack.push(time);
  }
  return stack.length;
}`,

        java: `class Solution {
    public int carFleet(int target, int[] position, int[] speed) {
        int n = position.length;
        int[][] cars = new int[n][2];
        for (int i = 0; i < n; i++) cars[i] = new int[]{position[i], speed[i]};
        Arrays.sort(cars, (a, b) -> b[0] - a[0]);
        double prevTime = 0;
        int fleets = 0;
        for (int[] car : cars) {
            double time = (double) (target - car[0]) / car[1];
            if (time > prevTime) {
                fleets++;
                prevTime = time;
            }
        }
        return fleets;
    }
}`,
        cpp: `class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();
        vector<pair<int,int>> cars;
        for (int i = 0; i < n; i++) cars.push_back({position[i], speed[i]});
        sort(cars.begin(), cars.end(), [](const pair<int,int>& a, const pair<int,int>& b) {
            return a.first > b.first;
        });
        double prevTime = 0;
        int fleets = 0;
        for (auto& [pos, spd] : cars) {
            double time = (double) (target - pos) / spd;
            if (time > prevTime) {
                fleets++;
                prevTime = time;
            }
        }
        return fleets;
    }
};`,      },
    },
  },
];
