import type { Problem } from "@/lib/types";

export const triesProblems: Problem[] = [
  {
    slug: "implement-trie-prefix-tree",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "tries",
    topics: ["Trie", "Hash Table", "String", "Design"],
    order: 1,
    description: `A **trie** (pronounced "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the \`Trie\` class:
- \`Trie()\` — Initializes the trie object.
- \`void insert(String word)\` — Inserts the string \`word\` into the trie.
- \`boolean search(String word)\` — Returns \`true\` if the string \`word\` is in the trie (i.e., was inserted before), and \`false\` otherwise.
- \`boolean startsWith(String prefix)\` — Returns \`true\` if there is a previously inserted string \`word\` that has the prefix \`prefix\`, and \`false\` otherwise.

Tests call the methods as an operations list, e.g. \`["Trie", "insert", "search", "search"]\` with arguments \`[[], ["apple"], ["apple"], ["app"]]\` and expected outputs \`[null, null, true, false]\`.`,
    examples: [
      {
        ops: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"],
        args: [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
        output: [null, null, true, false, true, null, true],
      },
    ],
    constraints: ["1 <= word.length, prefix.length <= 2000", "word and prefix consist only of lowercase English letters.", "At most 3 * 10^4 calls in total will be made to insert, search and startsWith."],
    starter: {
      python: `class Trie:
    def __init__(self):
        pass

    def insert(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass

    def startsWith(self, prefix: str) -> bool:
        pass
`,
      javascript: `class Trie {
    constructor() {
        
    }
    
    insert(word) {
        
    }
    
    search(word) {
        
    }
    
    startsWith(prefix) {
        
    }
}`,
      typescript: `class Trie {
    constructor() {
        
    }
    
    insert(word: string): void {
        
    }
    
    search(word: string): boolean {
        
    }
    
    startsWith(prefix: string): boolean {
        
    }
}`,
      java: `class Trie {
    public Trie() {
        
    }
    
    public void insert(String word) {
        
    }
    
    public boolean search(String word) {
        
    }
    
    public boolean startsWith(String prefix) {
        
    }
}`,
      cpp: `class Trie {
public:
    Trie() {
        
    }
    
    void insert(string word) {
        
    }
    
    bool search(string word) {
        
    }
    
    bool startsWith(string prefix) {
        
    }
};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "bool",
    compare: "exact",
    classSpec: {
      className: "Trie",
      ops: [
        { name: "Trie", argTypes: [], ret: "void" },
        { name: "insert", argTypes: ["string"], ret: "void" },
        { name: "search", argTypes: ["string"], ret: "value" },
        { name: "startsWith", argTypes: ["string"], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["Trie", "insert", "search", "search", "startsWith", "insert", "search"],
        args: [[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]],
        output: [null, null, true, false, true, null, true],
      },
    ],
    hiddenTests: [
      {
        ops: ["Trie", "insert", "search", "search", "startsWith", "search"],
        args: [[], ["hello"], ["hell"], ["hello"], ["hell"], ["hell"]],
        output: [null, null, false, true, true, false],
      },
      {
        ops: ["Trie", "insert", "insert", "search", "startsWith", "startsWith", "startsWith"],
        args: [[], ["a"], ["ab"], ["a"], ["a"], ["ab"], ["abc"]],
        output: [null, null, null, true, true, true, false],
      },
      {
        ops: ["Trie", "insert", "insert", "insert", "search", "search"],
        args: [[], ["app"], ["apple"], ["ap"], ["apple"], ["appl"]],
        output: [null, null, null, null, true, false],
      },
      {
        ops: ["Trie", "search", "startsWith", "insert", "search"],
        args: [[], ["x"], ["x"], ["xyz"], ["xyz"]],
        output: [null, false, false, null, true],
      },
    ],
    editorial: {
      approach: `Each node of the trie holds a hash map from character to child node, plus a boolean \`isEnd\` marking whether a word ends here.

- \`insert\`: walk character by character, creating nodes as needed; mark the final node as a word end.
- \`search\`: walk the characters; if any is missing, return false; otherwise return the \`isEnd\` flag of the final node.
- \`startsWith\`: same walk as search but return true as soon as the whole prefix exists (no \`isEnd\` check).

Every operation is O(L) where L is the word/prefix length.`,
      complexity: { time: "O(L) per op", space: "O(total characters inserted)" },
      code: {
        python: `class Trie:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def insert(self, word: str) -> None:
        node = self
        for ch in word:
            if ch not in node.children:
                node.children[ch] = Trie()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        node = self._walk(word)
        return node is not None and node.is_end

    def startsWith(self, prefix: str) -> bool:
        return self._walk(prefix) is not None

    def _walk(self, s: str):
        node = self
        for ch in s:
            if ch not in node.children:
                return None
            node = node.children[ch]
        return node`,
        javascript: `class Trie {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }

    insert(word) {
        let node = this;
        for (const ch of word) {
            if (!node.children[ch]) node.children[ch] = new Trie();
            node = node.children[ch];
        }
        node.isEnd = true;
    }

    search(word) {
        const node = this._walk(word);
        return node !== null && node.isEnd;
    }

    startsWith(prefix) {
        return this._walk(prefix) !== null;
    }

    _walk(s) {
        let node = this;
        for (const ch of s) {
            if (!node.children[ch]) return null;
            node = node.children[ch];
        }
        return node;
    }
}`,
        typescript: `class Trie {
    children: Record<string, Trie> = {};
    isEnd = false;

    insert(word: string): void {
        let node: Trie = this;
        for (const ch of word) {
            if (!node.children[ch]) node.children[ch] = new Trie();
            node = node.children[ch];
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        const node = this._walk(word);
        return node !== null && node.isEnd;
    }

    startsWith(prefix: string): boolean {
        return this._walk(prefix) !== null;
    }

    private _walk(s: string): Trie | null {
        let node: Trie = this;
        for (const ch of s) {
            if (!node.children[ch]) return null;
            node = node.children[ch];
        }
        return node;
    }
}`,

        java: `class Trie {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean end;
    }

    private TrieNode root = new TrieNode();

    public Trie() {
    }

    public void insert(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) cur.children[idx] = new TrieNode();
            cur = cur.children[idx];
        }
        cur.end = true;
    }

    public boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.end;
    }

    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }

    private TrieNode find(String s) {
        TrieNode cur = root;
        for (char c : s.toCharArray()) {
            cur = cur.children[c - 'a'];
            if (cur == null) return null;
        }
        return cur;
    }
}`,
        cpp: `class Trie {
public:
    struct TrieNode {
        TrieNode* children[26] = {};
        bool end = false;
        ~TrieNode() {
            for (int i = 0; i < 26; i++) delete children[i];
        }
    };

    TrieNode* root = new TrieNode();

    Trie() {
    }

    void insert(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!cur->children[idx]) cur->children[idx] = new TrieNode();
            cur = cur->children[idx];
        }
        cur->end = true;
    }

    bool search(string word) {
        TrieNode* node = find(word);
        return node && node->end;
    }

    bool startsWith(string prefix) {
        return find(prefix) != nullptr;
    }

    TrieNode* find(const string& s) {
        TrieNode* cur = root;
        for (char c : s) {
            cur = cur->children[c - 'a'];
            if (!cur) return nullptr;
        }
        return cur;
    }
};`,      },
    },
  },
  {
    slug: "design-add-and-search-words",
    title: "Design Add and Search Words",
    difficulty: "Medium",
    category: "tries",
    topics: ["Trie", "DFS", "Design"],
    order: 2,
    description: `Design a data structure that supports adding new words and finding if a string matches any previously added string.

Implement the \`WordDictionary\` class:
- \`WordDictionary()\` — Initializes the object.
- \`void addWord(word)\` — Adds \`word\` to the data structure.
- \`bool search(word)\` — Returns \`true\` if there is any string in the data structure that matches \`word\`. \`word\` may contain dots \`'.'\` where dots can be matched with any letter.

Tests call the methods as an operations list with expected outputs.`,
    examples: [
      {
        ops: ["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"],
        args: [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
        output: [null, null, null, null, false, true, true, true],
      },
    ],
    constraints: ["1 <= word.length <= 25", "word in addWord consists of lowercase English letters.", "word in search consist of '.' or lowercase English letters.", "There will be at most 10^4 calls in total."],
    starter: {
      python: `class WordDictionary:
    def __init__(self):
        pass

    def addWord(self, word: str) -> None:
        pass

    def search(self, word: str) -> bool:
        pass
`,
      javascript: `class WordDictionary {
    constructor() {
        
    }
    
    addWord(word) {
        
    }
    
    search(word) {
        
    }
}`,
      typescript: `class WordDictionary {
    constructor() {
        
    }
    
    addWord(word: string): void {
        
    }
    
    search(word: string): boolean {
        
    }
}`,
      java: `class WordDictionary {
    public WordDictionary() {
        
    }
    
    public void addWord(String word) {
        
    }
    
    public boolean search(String word) {
        
    }
}`,
      cpp: `class WordDictionary {
public:
    WordDictionary() {
        
    }
    
    void addWord(string word) {
        
    }
    
    bool search(string word) {
        
    }
};`,
    },
    methodName: "",
    argTypes: [],
    outputType: "bool",
    compare: "exact",
    classSpec: {
      className: "WordDictionary",
      ops: [
        { name: "WordDictionary", argTypes: [], ret: "void" },
        { name: "addWord", argTypes: ["string"], ret: "void" },
        { name: "search", argTypes: ["string"], ret: "value" },
      ],
    },
    visibleTests: [
      {
        ops: ["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search"],
        args: [[], ["bad"], ["dad"], ["mad"], ["pad"], ["bad"], [".ad"], ["b.."]],
        output: [null, null, null, null, false, true, true, true],
      },
    ],
    hiddenTests: [
      {
        ops: ["WordDictionary", "addWord", "search", "search", "search", "search"],
        args: [[], ["a"], ["."], ["a"], ["ab"], ["b"]],
        output: [null, null, true, true, false, false],
      },
      {
        ops: ["WordDictionary", "addWord", "addWord", "search", "search", "search", "search", "search"],
        args: [[], ["at"], ["and"], [".at"], ["a."], ["a.d"], [".d"], ["..t"]],
        output: [null, null, null, false, true, true, false, false],
      },
      {
        ops: ["WordDictionary", "addWord", "addWord", "addWord", "search", "search", "search", "search", "search"],
        args: [[], ["at"], ["and"], ["an"], ["a.t"], ["an."], [".an"], ["a.."], ["..."]],
        output: [null, null, null, null, false, true, false, true, true],
      },
    ],
    editorial: {
      approach: `Store words in a trie where each node has a children map and an \`isEnd\` flag. \`addWord\` is a standard trie insert.

\`search\` is a DFS with backtracking: at a dot, try every child and recurse; at a letter, follow only the matching child (if any). A match is found when the end of the pattern coincides with an \`isEnd\` node.

In the worst case (a pattern of all dots) the search explores the whole trie: O(number of words * word length).`,
      complexity: { time: "addWord O(L); search O(26^L) worst case", space: "O(total characters)" },
      code: {
        python: `class WordDictionary:
    def __init__(self):
        self.children = {}
        self.is_end = False

    def addWord(self, word: str) -> None:
        node = self
        for ch in word:
            if ch not in node.children:
                node.children[ch] = WordDictionary()
            node = node.children[ch]
        node.is_end = True

    def search(self, word: str) -> bool:
        return self._match(word, 0)

    def _match(self, word: str, i: int) -> bool:
        if i == len(word):
            return self.is_end
        ch = word[i]
        if ch == ".":
            return any(child._match(word, i + 1) for child in self.children.values())
        if ch in self.children:
            return self.children[ch]._match(word, i + 1)
        return False`,
        javascript: `class WordDictionary {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }

    addWord(word) {
        let node = this;
        for (const ch of word) {
            if (!node.children[ch]) node.children[ch] = new WordDictionary();
            node = node.children[ch];
        }
        node.isEnd = true;
    }

    search(word) {
        return this._match(word, 0);
    }

    _match(word, i) {
        if (i === word.length) return this.isEnd;
        const ch = word[i];
        if (ch === ".") {
            return Object.values(this.children).some((c) => c._match(word, i + 1));
        }
        if (this.children[ch]) return this.children[ch]._match(word, i + 1);
        return false;
    }
}`,
        typescript: `class WordDictionary {
    children: Record<string, WordDictionary> = {};
    isEnd = false;

    addWord(word: string): void {
        let node: WordDictionary = this;
        for (const ch of word) {
            if (!node.children[ch]) node.children[ch] = new WordDictionary();
            node = node.children[ch];
        }
        node.isEnd = true;
    }

    search(word: string): boolean {
        return this._match(word, 0);
    }

    private _match(word: string, i: number): boolean {
        if (i === word.length) return this.isEnd;
        const ch = word[i];
        if (ch === ".") {
            return Object.values(this.children).some((c) => c._match(word, i + 1));
        }
        if (this.children[ch]) return this.children[ch]._match(word, i + 1);
        return false;
    }
}`,

        java: `class WordDictionary {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        boolean end;
    }

    private TrieNode root = new TrieNode();

    public WordDictionary() {
    }

    public void addWord(String word) {
        TrieNode cur = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (cur.children[idx] == null) cur.children[idx] = new TrieNode();
            cur = cur.children[idx];
        }
        cur.end = true;
    }

    public boolean search(String word) {
        return dfs(root, word, 0);
    }

    private boolean dfs(TrieNode node, String word, int i) {
        if (i == word.length()) return node.end;
        char c = word.charAt(i);
        if (c != '.') {
            TrieNode next = node.children[c - 'a'];
            return next != null && dfs(next, word, i + 1);
        }
        for (TrieNode child : node.children) {
            if (child != null && dfs(child, word, i + 1)) return true;
        }
        return false;
    }
}`,
        cpp: `class WordDictionary {
public:
    struct TrieNode {
        TrieNode* children[26] = {};
        bool end = false;
        ~TrieNode() {
            for (int i = 0; i < 26; i++) delete children[i];
        }
    };

    TrieNode* root = new TrieNode();

    WordDictionary() {
    }

    void addWord(string word) {
        TrieNode* cur = root;
        for (char c : word) {
            int idx = c - 'a';
            if (!cur->children[idx]) cur->children[idx] = new TrieNode();
            cur = cur->children[idx];
        }
        cur->end = true;
    }

    bool search(string word) {
        return dfs(root, word, 0);
    }

    bool dfs(TrieNode* node, const string& word, int i) {
        if (i == (int)word.size()) return node->end;
        char c = word[i];
        if (c != '.') {
            TrieNode* next = node->children[c - 'a'];
            return next && dfs(next, word, i + 1);
        }
        for (TrieNode* child : node->children) {
            if (child && dfs(child, word, i + 1)) return true;
        }
        return false;
    }
};`,      },
    },
  },
  {
    slug: "word-search-ii",
    title: "Word Search II",
    difficulty: "Hard",
    category: "tries",
    topics: ["Trie", "Backtracking", "Matrix"],
    order: 3,
    description: `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return **all words** on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.`,
    examples: [
      {
        args: [[["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]],
        output: ["eat", "oath"],
      },
      { args: [[["a", "b"], ["c", "d"]], ["abcb"]], output: [] },
    ],
    constraints: ["m == board.length", "n == board[i].length", "1 <= m, n <= 12", "1 <= words.length <= 3 * 10^4", "1 <= words[i].length <= 10", "board and words[i] consist only of lowercase English letters."],
    starter: {
      python: `from typing import List


def findWords(board: List[List[str]], words: List[str]) -> List[str]:
    pass
`,
      javascript: `function findWords(board, words) {
    
}`,
      typescript: `function findWords(board: string[][], words: string[]): string[] {
    
}`,
      java: `class Solution {
    public List<String> findWords(char[][] board, String[] words) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        
    }
};`,
    },
    methodName: "findWords",
    argTypes: ["char[][]", "string[]"],
    outputType: "string[]",
    compare: "anyOrder",
    visibleTests: [
      {
        args: [[["o", "a", "a", "n"], ["e", "t", "a", "e"], ["i", "h", "k", "r"], ["i", "f", "l", "v"]], ["oath", "pea", "eat", "rain"]],
        output: ["eat", "oath"],
      },
      { args: [[["a", "b"], ["c", "d"]], ["abcb"]], output: [] },
    ],
    hiddenTests: [
      { args: [[["a"]], ["a"]], output: ["a"] },
      { args: [[["a"]], ["b"]], output: [] },
      { args: [[["o", "a", "b", "n"], ["o", "t", "a", "e"], ["a", "h", "k", "r"], ["a", "f", "l", "v"]], ["oa", "oaa"]], output: ["oa", "oaa"] },
      { args: [[["a", "a", "a", "a"], ["a", "a", "a", "a"], ["a", "a", "a", "a"]], ["aaaaaaaaaa", "aaaa"]], output: ["aaaa", "aaaaaaaaaa"] },
      { args: [[["a", "b"], ["c", "d"]], ["ab", "ac", "ad", "bd", "cd"]], output: ["ab", "ac", "bd", "cd"] },
    ],
    editorial: {
      approach: `Building a trie of all target words lets us prune the DFS: we only continue a path if the current prefix exists in the trie.

Run a DFS from every cell, tracking the trie node for the current prefix. When a node's \`isEnd\` is true, record the word (and unset the flag so each word is reported once). Mark visited cells (or temporarily clear their character) to avoid reusing a cell within one word.

Complexity is bounded by the total number of trie nodes visited: O(m * n * 4^L) worst case but typically far less with pruning.`,
      complexity: { time: "O(m * n * 4^L)", space: "O(sum of word lengths)" },
      code: {
        python: `def findWords(board: List[List[str]], words: List[str]) -> List[str]:
    trie = {}
    for word in words:
        node = trie
        for ch in word:
            node = node.setdefault(ch, {})
        node["#"] = True

    m, n = len(board), len(board[0])
    result = []
    seen = [[False] * n for _ in range(m)]

    def dfs(r, c, node, path):
        if "#" in node:
            result.append(path)
            del node["#"]
        if r < 0 or r >= m or c < 0 or c >= n or seen[r][c]:
            return
        ch = board[r][c]
        if ch not in node:
            return
        seen[r][c] = True
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            dfs(r + dr, c + dc, node[ch], path + ch)
        seen[r][c] = False

    for r in range(m):
        for c in range(n):
            dfs(r, c, trie, "")
    return result`,
        javascript: `function findWords(board, words) {
  const trie = {};
  for (const word of words) {
    let node = trie;
    for (const ch of word) node = node[ch] || (node[ch] = {});
    node["#"] = true;
  }
  const m = board.length, n = board[0].length;
  const result = [];
  const seen = Array.from({ length: m }, () => new Array(n).fill(false));

  const dfs = (r, c, node, path) => {
    if (node["#"]) {
      result.push(path);
      delete node["#"];
    }
    if (r < 0 || r >= m || c < 0 || c >= n || seen[r][c]) return;
    const ch = board[r][c];
    if (!node[ch]) return;
    seen[r][c] = true;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      dfs(r + dr, c + dc, node[ch], path + ch);
    }
    seen[r][c] = false;
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) dfs(r, c, trie, "");
  }
  return result;
}`,
        typescript: `function findWords(board: string[][], words: string[]): string[] {
  const trie: any = {};
  for (const word of words) {
    let node = trie;
    for (const ch of word) node = node[ch] || (node[ch] = {});
    node["#"] = true;
  }
  const m = board.length, n = board[0].length;
  const result: string[] = [];
  const seen = Array.from({ length: m }, () => new Array<boolean>(n).fill(false));

  const dfs = (r: number, c: number, node: any, path: string): void => {
    if (node["#"]) {
      result.push(path);
      delete node["#"];
    }
    if (r < 0 || r >= m || c < 0 || c >= n || seen[r][c]) return;
    const ch = board[r][c];
    if (!node[ch]) return;
    seen[r][c] = true;
    for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      dfs(r + dr, c + dc, node[ch], path + ch);
    }
    seen[r][c] = false;
  };

  for (let r = 0; r < m; r++) {
    for (let c = 0; c < n; c++) dfs(r, c, trie, "");
  }
  return result;
}`,

        java: `class Solution {
    private static class TrieNode {
        TrieNode[] children = new TrieNode[26];
        String word;
    }

    public List<String> findWords(char[][] board, String[] words) {
        TrieNode root = new TrieNode();
        for (String w : words) {
            TrieNode cur = root;
            for (char c : w.toCharArray()) {
                int idx = c - 'a';
                if (cur.children[idx] == null) cur.children[idx] = new TrieNode();
                cur = cur.children[idx];
            }
            cur.word = w;
        }
        List<String> res = new ArrayList<>();
        int m = board.length, n = board[0].length;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(board, root, i, j, res);
            }
        }
        return res;
    }

    private void dfs(char[][] board, TrieNode node, int i, int j, List<String> res) {
        if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
        char c = board[i][j];
        if (c == '#' || node.children[c - 'a'] == null) return;
        TrieNode next = node.children[c - 'a'];
        if (next.word != null) {
            res.add(next.word);
            next.word = null;
        }
        board[i][j] = '#';
        dfs(board, next, i + 1, j, res);
        dfs(board, next, i - 1, j, res);
        dfs(board, next, i, j + 1, res);
        dfs(board, next, i, j - 1, res);
        board[i][j] = c;
    }
}`,
        cpp: `class Solution {
public:
    struct TrieNode {
        TrieNode* children[26] = {};
        string word;
        ~TrieNode() {
            for (int i = 0; i < 26; i++) delete children[i];
        }
    };

    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        TrieNode* root = new TrieNode();
        for (auto& w : words) {
            TrieNode* cur = root;
            for (char c : w) {
                int idx = c - 'a';
                if (!cur->children[idx]) cur->children[idx] = new TrieNode();
                cur = cur->children[idx];
            }
            cur->word = w;
        }
        vector<string> res;
        int m = board.size(), n = board[0].size();
        function<void(TrieNode*,int,int)> dfs = [&](TrieNode* node, int i, int j) {
            if (i < 0 || i >= m || j < 0 || j >= n) return;
            char c = board[i][j];
            if (c == '#' || !node->children[c - 'a']) return;
            TrieNode* next = node->children[c - 'a'];
            if (!next->word.empty()) {
                res.push_back(next->word);
                next->word.clear();
            }
            board[i][j] = '#';
            dfs(next, i + 1, j);
            dfs(next, i - 1, j);
            dfs(next, i, j + 1);
            dfs(next, i, j - 1);
            board[i][j] = c;
        };
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                dfs(root, i, j);
            }
        }
        return res;
    }
};`,      },
    },
  },
];
