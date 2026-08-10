import type { Problem } from "@/lib/types";

export const stackProblems: Problem[] = [
  {
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "stack",
    topics: ["String", "Stack"],
    order: 1,
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { args: ["()"], output: true },
      { args: ["()[]{}"], output: true },
      { args: ["(]"], output: false },
      { args: ["([)]"], output: false, explain: "The brackets must close in order." },
      { args: ["{[]}"], output: true },
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'."],
    starter: {
      python: `def isValid(s: str) -> bool:
    pass
`,
      javascript: `function isValid(s) {
    
}`,
      typescript: `function isValid(s: string): boolean {
    
}`,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
    },
    methodName: "isValid",
    argTypes: ["string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["()"], output: true },
      { args: ["()[]{}"], output: true },
      { args: ["(]"], output: false },
      { args: ["([)]"], output: false },
      { args: ["{[]}"], output: true },
    ],
    hiddenTests: [
      { args: ["["], output: false },
      { args: ["]"], output: false },
      { args: ["((()))"], output: true },
      { args: ["(()"], output: false },
      { args: ["())(()"], output: false },
      { args: ["{}{}{}{}"], output: true },
    ],
    editorial: {
      approach: `Scan the string with a stack. On an opening bracket, push it. On a closing bracket, pop the top — if the stack is empty or the top does not match the closer, the string is invalid. At the end, the string is valid only if the stack is empty.

Every character is pushed and popped at most once: O(n) time and O(n) space.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def isValid(s: str) -> bool:
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in pairs:
            if not stack or stack.pop() != pairs[ch]:
                return False
        else:
            stack.append(ch)
    return not stack`,
        javascript: `function isValid(s) {
  const pairs = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,
        typescript: `function isValid(s: string): boolean {
  const pairs: Record<string, string> = { ")": "(", "]": "[", "}": "{" };
  const stack: string[] = [];
  for (const ch of s) {
    if (pairs[ch]) {
      if (stack.pop() !== pairs[ch]) return false;
    } else {
      stack.push(ch);
    }
  }
  return stack.length === 0;
}`,

        java: `class Solution {
    public boolean isValid(String s) {
        ArrayDeque<Character> stack = new ArrayDeque<>();
        for (char c : s.toCharArray()) {
            if (c == '(' || c == '[' || c == '{') {
                stack.push(c);
            } else {
                if (stack.isEmpty()) return false;
                char open = stack.pop();
                if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) {
                    return false;
                }
            }
        }
        return stack.isEmpty();
    }
}`,
        cpp: `class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '[' || c == '{') {
                st.push(c);
            } else {
                if (st.empty()) return false;
                char open = st.top(); st.pop();
                if ((c == ')' && open != '(') || (c == ']' && open != '[') || (c == '}' && open != '{')) {
                    return false;
                }
            }
        }
        return st.empty();
    }
};`,      },
    },
  },
  {
    slug: "evaluate-reverse-polish-notation",
    title: "Evaluate Reverse Polish Notation",
    difficulty: "Medium",
    category: "stack",
    topics: ["Array", "Stack", "Math"],
    order: 2,
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in **Reverse Polish Notation** (operators appear after their operands).

Evaluate the expression and return an integer that represents the value of the expression. Note that:
- The valid operators are \`'+'\`, \`'-'\`, \`'*'\`, and \`'/'\`.
- Each operand may be an integer or another expression.
- Division between two integers always truncates toward zero.`,
    examples: [
      { args: [["2", "1", "+", "3", "*"]], output: 9, explain: "((2 + 1) * 3) = 9" },
      { args: [["4", "13", "5", "/", "+"]], output: 6, explain: "(4 + (13 / 5)) = 6" },
      { args: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], output: 22 },
    ],
    constraints: ["1 <= tokens.length <= 10^4", "tokens[i] is either an operator or an integer in the range [-200, 200]."],
    starter: {
      python: `from typing import List


def evalRPN(tokens: List[str]) -> int:
    pass
`,
      javascript: `function evalRPN(tokens) {
    
}`,
      typescript: `function evalRPN(tokens: string[]): number {
    
}`,
      java: `class Solution {
    public int evalRPN(String[] tokens) {
        
    }
}`,
      cpp: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        
    }
};`,
    },
    methodName: "evalRPN",
    argTypes: ["string[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [["2", "1", "+", "3", "*"]], output: 9 },
      { args: [["4", "13", "5", "/", "+"]], output: 6 },
      { args: [["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]], output: 22 },
    ],
    hiddenTests: [
      { args: [["18"]], output: 18 },
      { args: [["3", "4", "+"]], output: 7 },
      { args: [["4", "3", "-"]], output: 1 },
      { args: [["6", "4", "/"]], output: 1 },
      { args: [["-6", "4", "/"]], output: -1 },
      { args: [["2", "3", "11", "+", "*"]], output: 28 },
    ],
    editorial: {
      approach: `Maintain a stack of operands. For each token: if it is a number, push it; otherwise pop two values, apply the operator (with the second popped value as the left operand), and push the result back.

Integer division that truncates toward zero needs care — in most languages an integer division of mixed signs already truncates toward zero, but a float-based implementation must truncate manually.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def evalRPN(tokens: List[str]) -> int:
    stack = []
    for token in tokens:
        if token in "+-*/":
            b = stack.pop()
            a = stack.pop()
            if token == "+":
                stack.append(a + b)
            elif token == "-":
                stack.append(a - b)
            elif token == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))
        else:
            stack.append(int(token))
    return stack[0]`,
        javascript: `function evalRPN(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop();
      const a = stack.pop();
      if (token === "+") stack.push(a + b);
      else if (token === "-") stack.push(a - b);
      else if (token === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0];
}`,
        typescript: `function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const token of tokens) {
    if (token === "+" || token === "-" || token === "*" || token === "/") {
      const b = stack.pop()!;
      const a = stack.pop()!;
      if (token === "+") stack.push(a + b);
      else if (token === "-") stack.push(a - b);
      else if (token === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0];
}`,

        java: `class Solution {
    public int evalRPN(String[] tokens) {
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        for (String t : tokens) {
            if (t.equals("+") || t.equals("-") || t.equals("*") || t.equals("/")) {
                int b = stack.pop(), a = stack.pop();
                switch (t) {
                    case "+": stack.push(a + b); break;
                    case "-": stack.push(a - b); break;
                    case "*": stack.push(a * b); break;
                    default: stack.push(a / b);
                }
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,
        cpp: `class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<int> st;
        for (auto& t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                int b = st.top(); st.pop();
                int a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else st.push(a / b);
            } else {
                st.push(stoi(t));
            }
        }
        return st.top();
    }
};`,      },
    },
  },
  {
    slug: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "stack",
    topics: ["Array", "Stack", "Monotonic Stack"],
    order: 3,
    description: `Given an array of integers \`temperatures\` representing the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the i-th day to get a warmer temperature. If there is no future day with a warmer temperature, keep \`answer[i] == 0\` instead.`,
    examples: [
      { args: [[73, 74, 75, 71, 69, 72, 76, 73]], output: [1, 1, 4, 2, 1, 1, 0, 0] },
      { args: [[30, 40, 50, 60]], output: [1, 1, 1, 0] },
      { args: [[30, 60, 90]], output: [1, 1, 0] },
    ],
    constraints: ["1 <= temperatures.length <= 10^5", "30 <= temperatures[i] <= 100"],
    starter: {
      python: `from typing import List


def dailyTemperatures(temperatures: List[int]) -> List[int]:
    pass
`,
      javascript: `function dailyTemperatures(temperatures) {
    
}`,
      typescript: `function dailyTemperatures(temperatures: number[]): number[] {
    
}`,
      java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        
    }
};`,
    },
    methodName: "dailyTemperatures",
    argTypes: ["int[]"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[73, 74, 75, 71, 69, 72, 76, 73]], output: [1, 1, 4, 2, 1, 1, 0, 0] },
      { args: [[30, 40, 50, 60]], output: [1, 1, 1, 0] },
      { args: [[30, 60, 90]], output: [1, 1, 0] },
    ],
    hiddenTests: [
      { args: [[100, 99, 98, 97]], output: [0, 0, 0, 0] },
      { args: [[55, 55, 55]], output: [0, 0, 0] },
      { args: [[89, 62, 70, 58, 47, 47, 46, 76, 100, 70]], output: [8, 1, 5, 4, 3, 2, 1, 1, 0, 0] },
      { args: [[34, 80, 80, 34, 34, 80, 80, 80, 80, 34]], output: [1, 0, 0, 2, 1, 0, 0, 0, 0, 0] },
      { args: [[31, 32]], output: [1, 0] },
    ],
    editorial: {
      approach: `For each day, the answer is the distance to the next day with a strictly greater temperature. A **monotonic decreasing stack** of indices solves this in one pass: while the stack is non-empty and the current temperature is greater than the temperature at the stack's top index, pop — the popped index's answer is the distance to the current day — then push the current index.

Each index is pushed and popped once: O(n) time and space.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def dailyTemperatures(temperatures: List[int]) -> List[int]:
    answer = [0] * len(temperatures)
    stack = []
    for i, temp in enumerate(temperatures):
        while stack and temperatures[stack[-1]] < temp:
            j = stack.pop()
            answer[j] = i - j
        stack.append(i)
    return answer`,
        javascript: `function dailyTemperatures(temperatures) {
  const answer = new Array(temperatures.length).fill(0);
  const stack = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]] < temperatures[i]) {
      const j = stack.pop();
      answer[j] = i - j;
    }
    stack.push(i);
  }
  return answer;
}`,
        typescript: `function dailyTemperatures(temperatures: number[]): number[] {
  const answer = new Array<number>(temperatures.length).fill(0);
  const stack: number[] = [];
  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[stack[stack.length - 1]]! < temperatures[i]!) {
      const j = stack.pop()!;
      answer[j] = i - j;
    }
    stack.push(i);
  }
  return answer;
}`,

        java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        int n = temperatures.length;
        int[] res = new int[n];
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && temperatures[stack.peek()] < temperatures[i]) {
                int idx = stack.pop();
                res[idx] = i - idx;
            }
            stack.push(i);
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        int n = temperatures.size();
        vector<int> res(n, 0);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temperatures[st.top()] < temperatures[i]) {
                int idx = st.top(); st.pop();
                res[idx] = i - idx;
            }
            st.push(i);
        }
        return res;
    }
};`,      },
    },
  },
  {
    slug: "largest-rectangle-in-histogram",
    title: "Largest Rectangle in Histogram",
    difficulty: "Hard",
    category: "stack",
    topics: ["Array", "Stack", "Monotonic Stack"],
    order: 4,
    description: `Given an array of integers \`heights\` representing the histogram's bar height where the width of each bar is \`1\`, return the area of the largest rectangle in the histogram.`,
    examples: [
      { args: [[2, 1, 5, 6, 2, 3]], output: 10, explain: "The largest rectangle uses bars 5 and 6, giving width 2 and height 5." },
      { args: [[2, 4]], output: 4 },
    ],
    constraints: ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
    starter: {
      python: `from typing import List


def largestRectangleArea(heights: List[int]) -> int:
    pass
`,
      javascript: `function largestRectangleArea(heights) {
    
}`,
      typescript: `function largestRectangleArea(heights: number[]): number {
    
}`,
      java: `class Solution {
    public int largestRectangleArea(int[] heights) {
        
    }
}`,
      cpp: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        
    }
};`,
    },
    methodName: "largestRectangleArea",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[2, 1, 5, 6, 2, 3]], output: 10 },
      { args: [[2, 4]], output: 4 },
    ],
    hiddenTests: [
      { args: [[1]], output: 1 },
      { args: [[0]], output: 0 },
      { args: [[1, 2, 3, 4, 5]], output: 9 },
      { args: [[5, 4, 3, 2, 1]], output: 9 },
      { args: [[2, 1, 2]], output: 3 },
      { args: [[6, 2, 5, 4, 5, 1, 6]], output: 12 },
      { args: [[3, 6, 5, 7, 4, 8, 1, 0]], output: 20 },
    ],
    editorial: {
      approach: `For every bar, the largest rectangle anchored at that bar's height extends until the first shorter bar on each side. A **monotonic increasing stack of indices** finds those boundaries in one pass.

Iterate the heights; while the current height is smaller than the height at the stack's top, pop — the popped index has its right boundary at the current index and its left boundary at the new stack top — and compute the area. Append a sentinel bar of height 0 to flush the stack at the end.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def largestRectangleArea(heights: List[int]) -> int:
    stack = []
    best = 0
    for i, h in enumerate(heights + [0]):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            best = max(best, height * width)
        stack.append(i)
    return best`,
        javascript: `function largestRectangleArea(heights) {
  const stack = [];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i];
    while (stack.length && heights[stack[stack.length - 1]] > h) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      best = Math.max(best, height * width);
    }
    stack.push(i);
  }
  return best;
}`,
        typescript: `function largestRectangleArea(heights: number[]): number {
  const stack: number[] = [];
  let best = 0;
  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]!;
    while (stack.length && heights[stack[stack.length - 1]!]! > h) {
      const height = heights[stack.pop()!]!;
      const width = stack.length === 0 ? i : i - stack[stack.length - 1]! - 1;
      best = Math.max(best, height * width);
    }
    stack.push(i);
  }
  return best;
}`,

        java: `class Solution {
    public int largestRectangleArea(int[] heights) {
        int n = heights.length;
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        int best = 0;
        for (int i = 0; i <= n; i++) {
            int h = i == n ? 0 : heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] > h) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                best = Math.max(best, height * width);
            }
            stack.push(i);
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        stack<int> st;
        int best = 0;
        for (int i = 0; i <= n; i++) {
            int h = i == n ? 0 : heights[i];
            while (!st.empty() && heights[st.top()] > h) {
                int height = heights[st.top()]; st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                best = max(best, height * width);
            }
            st.push(i);
        }
        return best;
    }
};`,      },
    },
  },
];
