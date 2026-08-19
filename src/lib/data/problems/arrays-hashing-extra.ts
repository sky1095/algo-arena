import type { Problem } from "@/lib/types";

export const arraysHashingExtra: Problem[] = [
  {
    slug: "valid-sudoku",
    title: "Valid Sudoku",
    difficulty: "Medium",
    category: "arrays-hashing",
    topics: ["Array", "Hash Table", "Matrix"],
    order: 7,
    description: `Determine if a \`9 x 9\` Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:\n\n1. Each row must contain the digits \`1-9\` without repetition.\n2. Each column must contain the digits \`1-9\` without repetition.\n3. Each of the nine \`3 x 3\` sub-boxes of the grid must contain the digits \`1-9\` without repetition.\n\nA partially filled sudoku board (with \`'.'\` for empty cells) is valid if it satisfies the rules above. Note: the board does not need to be solvable.`,
    examples: [
      {
        args: [
          [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        ],
        output: true,
      },
      {
        args: [
          [
            ["8", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        ],
        output: false,
        explain: "The value 8 appears twice in the top-left 3x3 sub-box.",
      },
    ],
    constraints: ["board.length == 9", "board[i].length == 9", "board[i][j] is a digit 1-9 or '.'."],
    starter: {
      python: `from typing import List


def isValidSudoku(board: List[List[str]]) -> bool:
    pass
`,
      javascript: `function isValidSudoku(board) {
    
}`,
      typescript: `function isValidSudoku(board: string[][]): boolean {
    
}`,
      java: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        
    }
};`,
      dart: `class Solution {
  bool isValidSudoku(List<String>[] board) {
    
  }
}`,
    },
    methodName: "isValidSudoku",
    argTypes: ["char[][]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      {
        args: [
          [
            ["5", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        ],
        output: true,
      },
      {
        args: [
          [
            ["8", "3", ".", ".", "7", ".", ".", ".", "."],
            ["6", ".", ".", "1", "9", "5", ".", ".", "."],
            [".", "9", "8", ".", ".", ".", ".", "6", "."],
            ["8", ".", ".", ".", "6", ".", ".", ".", "3"],
            ["4", ".", ".", "8", ".", "3", ".", ".", "1"],
            ["7", ".", ".", ".", "2", ".", ".", ".", "6"],
            [".", "6", ".", ".", ".", ".", "2", "8", "."],
            [".", ".", ".", "4", "1", "9", ".", ".", "5"],
            [".", ".", ".", ".", "8", ".", ".", "7", "9"],
          ],
        ],
        output: false,
      },
    ],
    hiddenTests: [
      {
        args: [
          [
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        ],
        output: true,
      },
      {
        args: [
          [
            ["1", "1", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        ],
        output: false,
      },
      {
        args: [
          [
            ["1", ".", ".", ".", ".", ".", ".", ".", "."],
            ["1", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        ],
        output: false,
      },
      {
        args: [
          [
            ["1", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", "1", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", ".", "."],
          ],
        ],
        output: false,
      },
      {
        args: [
          [
            ["5", "3", "4", "6", "7", "8", "9", "1", "2"],
            ["6", "7", "2", "1", "9", "5", "3", "4", "8"],
            ["1", "9", "8", "3", "4", "2", "5", "6", "7"],
            ["8", "5", "9", "7", "6", "1", "4", "2", "3"],
            ["4", "2", "6", "8", "5", "3", "7", "9", "1"],
            ["7", "1", "3", "9", "2", "4", "8", "5", "6"],
            ["9", "6", "1", "5", "3", "7", "2", "8", "4"],
            ["2", "8", "7", "4", "1", "9", "6", "3", "5"],
            ["3", "4", "5", "2", "8", "6", "1", "7", "9"],
          ],
        ],
        output: true,
      },
    ],
    editorial: {
      approach: `Track three hash sets: one per row, one per column, and one per \`3 x 3\` box.\n\nFor every filled cell, compute its box index as \`(r / 3) * 3 + (c / 3)\`. If the digit already exists in any of the three relevant sets, the board is invalid; otherwise insert it. Digits are skipped when the cell is \`'.'\`.\n\nTime is O(1) — the board is always 9x9 — and space is O(1).`,
      complexity: { time: "O(1)", space: "O(1)" },
      code: {
        python: `def isValidSudoku(board: List[List[str]]) -> bool:
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    for r in range(9):
        for c in range(9):
            ch = board[r][c]
            if ch == ".":
                continue
            b = (r // 3) * 3 + c // 3
            if ch in rows[r] or ch in cols[c] or ch in boxes[b]:
                return False
            rows[r].add(ch)
            cols[c].add(ch)
            boxes[b].add(ch)
    return True`,
        javascript: `function isValidSudoku(board) {
  const rows = Array.from({ length: 9 }, () => new Set());
  const cols = Array.from({ length: 9 }, () => new Set());
  const boxes = Array.from({ length: 9 }, () => new Set());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const ch = board[r][c];
      if (ch === ".") continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(ch) || cols[c].has(ch) || boxes[b].has(ch)) return false;
      rows[r].add(ch);
      cols[c].add(ch);
      boxes[b].add(ch);
    }
  }
  return true;
}`,
        typescript: `function isValidSudoku(board: string[][]): boolean {
  const rows = Array.from({ length: 9 }, () => new Set<string>());
  const cols = Array.from({ length: 9 }, () => new Set<string>());
  const boxes = Array.from({ length: 9 }, () => new Set<string>());
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const ch = board[r][c];
      if (ch === ".") continue;
      const b = Math.floor(r / 3) * 3 + Math.floor(c / 3);
      if (rows[r].has(ch) || cols[c].has(ch) || boxes[b].has(ch)) return false;
      rows[r].add(ch);
      cols[c].add(ch);
      boxes[b].add(ch);
    }
  }
  return true;
}`,
        java: `class Solution {
    public boolean isValidSudoku(char[][] board) {
        Set<String> seen = new HashSet<>();
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char ch = board[r][c];
                if (ch == '.') continue;
                if (!seen.add("r" + r + ch) || !seen.add("c" + c + ch) ||
                    !seen.add("b" + (r / 3) + "," + (c / 3) + ch)) return false;
            }
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        bool rows[9][9] = {}, cols[9][9] = {}, boxes[9][9] = {};
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') continue;
                int d = board[r][c] - '1';
                int b = (r / 3) * 3 + c / 3;
                if (rows[r][d] || cols[c][d] || boxes[b][d]) return false;
                rows[r][d] = cols[c][d] = boxes[b][d] = true;
            }
        }
        return true;
    }
};`,
      },
    },
  },
  {
    slug: "encode-and-decode-strings",
    title: "Encode and Decode Strings",
    difficulty: "Medium",
    category: "arrays-hashing",
    topics: ["Array", "String", "Design"],
    order: 8,
    description: `Design an algorithm to encode a **list of strings** into a **single string** and to decode that string back into the original list of strings.\n\nThe encoding must be self-delimiting: \`decode(encode(strs)) == strs\` must hold for any input.\n\n**Recommended format**: length-prefix each string as \`<length>#<string>\` and concatenate, e.g. \`["neet","code"]\` encodes to \`"4#neet4#code"\`. Any encoding is accepted as long as it round-trips; this judge tests your code against the length-prefix format above.`,
    examples: [
      {
        args: [["neet", "code"]],
        output: "4#neet4#code",
        explain: "Each string is prefixed by its length followed by '#'.",
      },
      { args: [["hello", "world", ""]], output: "5#hello5#world0#" },
      { args: [[""]], output: "0#" },
    ],
    constraints: ["0 <= strs.length <= 200", "0 <= strs[i].length <= 200", "strs[i] contains any printable ASCII character."],
    starter: {
      python: `from typing import List


def encode(strs: List[str]) -> str:
    pass


def decode(s: str) -> List[str]:
    pass
`,
      javascript: `function encode(strs) {
    
}

function decode(s) {
    
}`,
      typescript: `function encode(strs: string[]): string {
    
}

function decode(s: string): string[] {
    
}`,
      java: `class Solution {
    public String encode(String[] strs) {
        
    }
    
    public String[] decode(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    string encode(vector<string>& strs) {
        
    }
    
    vector<string> decode(string s) {
        
    }
};`,
      dart: `class Solution {
  String encode(List<String> strs) {
    
  }
}`,
    },
    methodName: "encode",
    argTypes: ["string[]"],
    outputType: "string",
    compare: "exact",
    visibleTests: [
      { args: [["neet", "code"]], output: "4#neet4#code" },
      { args: [["hello", "world", ""]], output: "5#hello5#world0#" },
      { args: [[""]], output: "0#" },
    ],
    hiddenTests: [
      { args: [["a"]], output: "1#a" },
      { args: [["", "", ""]], output: "0#0#0#" },
      { args: [["ab", "cd", "ef"]], output: "2#ab2#cd2#ef" },
      { args: [["longer", "s", "strings"]], output: "6#longer1#s7#strings" },
      { args: [["has#hash", "sep#x"]], output: "8#has#hash5#sep#x" },
    ],
    editorial: {
      approach: `Because strings can contain any character (including the delimiter), a plain delimiter is not enough. Use a **length prefix**: write the byte-length of each string, followed by \`#\`, followed by the string itself.\n\nTo decode, scan the string; read digits until \`#\`, parse the length, then take exactly that many characters as the next string. This is unambiguous even when strings contain \`#\` or digits.\n\nTime is O(n) for both operations over the total input size.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def encode(strs: List[str]) -> str:
    return "".join(str(len(s)) + "#" + s for s in strs)


def decode(s: str) -> List[str]:
    out = []
    i = 0
    while i < len(s):
        j = s.find("#", i)
        length = int(s[i:j])
        out.append(s[j + 1 : j + 1 + length])
        i = j + 1 + length
    return out`,
        javascript: `function encode(strs) {
  return strs.map((s) => s.length + "#" + s).join("");
}

function decode(s) {
  const out = [];
  let i = 0;
  while (i < s.length) {
    const j = s.indexOf("#", i);
    const length = parseInt(s.slice(i, j));
    out.push(s.slice(j + 1, j + 1 + length));
    i = j + 1 + length;
  }
  return out;
}`,
        typescript: `function encode(strs: string[]): string {
  return strs.map((s) => s.length + "#" + s).join("");
}

function decode(s: string): string[] {
  const out: string[] = [];
  let i = 0;
  while (i < s.length) {
    const j = s.indexOf("#", i);
    const length = parseInt(s.slice(i, j));
    out.push(s.slice(j + 1, j + 1 + length));
    i = j + 1 + length;
  }
  return out;
}`,
        java: `class Solution {
    public String encode(String[] strs) {
        StringBuilder sb = new StringBuilder();
        for (String s : strs) sb.append(s.length()).append('#').append(s);
        return sb.toString();
    }

    public String[] decode(String s) {
        List<String> out = new ArrayList<>();
        int i = 0;
        while (i < s.length()) {
            int j = s.indexOf('#', i);
            int len = Integer.parseInt(s.substring(i, j));
            out.add(s.substring(j + 1, j + 1 + len));
            i = j + 1 + len;
        }
        return out.toArray(new String[0]);
    }
}`,
        cpp: `class Solution {
public:
    string encode(vector<string>& strs) {
        string out;
        for (string& s : strs) out += to_string(s.size()) + "#" + s;
        return out;
    }

    vector<string> decode(string s) {
        vector<string> out;
        int i = 0;
        while (i < (int)s.size()) {
            int j = s.find('#', i);
            int len = stoi(s.substr(i, j - i));
            out.push_back(s.substr(j + 1, len));
            i = j + 1 + len;
        }
        return out;
    }
};`,
      },
    },
  },
  {
    slug: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "arrays-hashing",
    topics: ["Array", "Hash Set"],
    order: 9,
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in **O(n)** time.`,
    examples: [
      { args: [[100, 4, 200, 1, 3, 2]], output: 4, explain: "The longest consecutive elements sequence is [1, 2, 3, 4]." },
      { args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], output: 9 },
    ],
    constraints: ["0 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starter: {
      python: `from typing import List


def longestConsecutive(nums: List[int]) -> int:
    pass
`,
      javascript: `function longestConsecutive(nums) {
    
}`,
      typescript: `function longestConsecutive(nums: number[]): number {
    
}`,
      java: `class Solution {
    public int longestConsecutive(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        
    }
};`,
      dart: `class Solution {
  int longestConsecutive(List<int> nums) {
    
  }
}`,
    },
    methodName: "longestConsecutive",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[100, 4, 200, 1, 3, 2]], output: 4 },
      { args: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], output: 9 },
    ],
    hiddenTests: [
      { args: [[]], output: 0 },
      { args: [[1]], output: 1 },
      { args: [[1, 2, 3, 4, 5]], output: 5 },
      { args: [[5, 4, 3, 2, 1]], output: 5 },
      { args: [[1, 3, 5, 7]], output: 1 },
      { args: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], output: 7 },
      { args: [[-7, -1, 3, -9, -4, 7, -3, 2, 4, 9, 4, -9, 8, -7, 5, -1, -7]], output: 4 },
    ],
    editorial: {
      approach: `Sorting would give O(n log n); to hit O(n) we use a hash set.\n\nInsert every number into a set. Then iterate the set, and only start counting from a number that has **no left neighbor** (\`num - 1\` not in the set) — these are the starts of sequences. Walk rightward while consecutive numbers exist, tracking the maximum run length.\n\nEach number is visited a constant number of times, so the total is O(n) time and O(n) space.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def longestConsecutive(nums: List[int]) -> int:
    nums_set = set(nums)
    best = 0
    for num in nums_set:
        if num - 1 not in nums_set:
            length = 1
            while num + length in nums_set:
                length += 1
            best = max(best, length)
    return best`,
        javascript: `function longestConsecutive(nums) {
  const set = new Set(nums);
  let best = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let length = 1;
      while (set.has(num + length)) length++;
      best = Math.max(best, length);
    }
  }
  return best;
}`,
        typescript: `function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);
  let best = 0;
  for (const num of set) {
    if (!set.has(num - 1)) {
      let length = 1;
      while (set.has(num + length)) length++;
      best = Math.max(best, length);
    }
  }
  return best;
}`,
        java: `class Solution {
    public int longestConsecutive(int[] nums) {
        Set<Integer> set = new HashSet<>();
        for (int n : nums) set.add(n);
        int best = 0;
        for (int n : set) {
            if (set.contains(n - 1)) continue;
            int len = 1;
            while (set.contains(n + len)) len++;
            best = Math.max(best, len);
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> s(nums.begin(), nums.end());
        int best = 0;
        for (int n : s) {
            if (s.count(n - 1)) continue;
            int len = 1;
            while (s.count(n + len)) len++;
            best = max(best, len);
        }
        return best;
    }
};`,
      },
    },
  },
];
