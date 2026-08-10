import type { Problem } from "@/lib/types";

export const slidingWindowProblems: Problem[] = [
  {
    slug: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "sliding-window",
    topics: ["Array", "Sliding Window"],
    order: 1,
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the i-th day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell it. Return the maximum profit you can achieve. If no profit is possible, return \`0\`.`,
    examples: [
      { args: [[7, 1, 5, 3, 6, 4]], output: 5, explain: "Buy on day 2 (price 1) and sell on day 5 (price 6): profit 5." },
      { args: [[7, 6, 4, 3, 1]], output: 0, explain: "Prices only fall, so no profitable transaction exists." },
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starter: {
      python: `from typing import List


def maxProfit(prices: List[int]) -> int:
    pass
`,
      javascript: `function maxProfit(prices) {
    
}`,
      typescript: `function maxProfit(prices: number[]): number {
    
}`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`,
    },
    methodName: "maxProfit",
    argTypes: ["int[]"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: [[7, 1, 5, 3, 6, 4]], output: 5 },
      { args: [[7, 6, 4, 3, 1]], output: 0 },
    ],
    hiddenTests: [
      { args: [[1, 2]], output: 1 },
      { args: [[2, 1]], output: 0 },
      { args: [[1, 2, 4, 2, 5, 7, 2, 4, 9, 0, 9]], output: 9 },
      { args: [[3, 3, 3, 3]], output: 0 },
      { args: [[2, 4, 1]], output: 2 },
      { args: [[100, 90, 80, 70, 1]], output: 0 },
    ],
    editorial: {
      approach: `Track the cheapest price seen so far, and at every day compute the profit of selling that day against that minimum. Keep the best profit over the whole run.

One pass, one variable — O(n) time and O(1) space. This is a special case of the sliding-window / two-pointer pattern where the window keeps only the best buy point.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def maxProfit(prices: List[int]) -> int:
    min_price = prices[0]
    best = 0
    for price in prices[1:]:
        best = max(best, price - min_price)
        min_price = min(min_price, price)
    return best`,
        javascript: `function maxProfit(prices) {
  let minPrice = prices[0];
  let best = 0;
  for (let i = 1; i < prices.length; i++) {
    best = Math.max(best, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }
  return best;
}`,
        typescript: `function maxProfit(prices: number[]): number {
  let minPrice = prices[0];
  let best = 0;
  for (let i = 1; i < prices.length; i++) {
    best = Math.max(best, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }
  return best;
}`,
        java: `class Solution {
    public int maxProfit(int[] prices) {
        int best = 0, minPrice = prices[0];
        for (int p : prices) {
            minPrice = Math.min(minPrice, p);
            best = Math.max(best, p - minPrice);
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int best = 0, minPrice = prices[0];
        for (int p : prices) {
            minPrice = min(minPrice, p);
            best = max(best, p - minPrice);
        }
        return best;
    }
};`,
      },
    },
  },
  {
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "sliding-window",
    topics: ["String", "Hash Table", "Sliding Window"],
    order: 2,
    description: `Given a string \`s\`, find the length of the **longest substring** without repeating characters.`,
    examples: [
      { args: ["abcabcbb"], output: 3, explain: "The answer is \"abc\", with the length of 3." },
      { args: ["bbbbb"], output: 1 },
      { args: ["pwwkew"], output: 3, explain: "The answer is \"wke\", with the length of 3." },
    ],
    constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
    starter: {
      python: `def lengthOfLongestSubstring(s: str) -> int:
    pass
`,
      javascript: `function lengthOfLongestSubstring(s) {
    
}`,
      typescript: `function lengthOfLongestSubstring(s: string): number {
    
}`,
      java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        
    }
};`,
    },
    methodName: "lengthOfLongestSubstring",
    argTypes: ["string"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["abcabcbb"], output: 3 },
      { args: ["bbbbb"], output: 1 },
      { args: ["pwwkew"], output: 3 },
    ],
    hiddenTests: [
      { args: [""], output: 0 },
      { args: [" "], output: 1 },
      { args: ["au"], output: 2 },
      { args: ["dvdf"], output: 3 },
      { args: ["abba"], output: 2 },
      { args: ["aab"], output: 2 },
      { args: ["tmmzuxt"], output: 5 },
    ],
    editorial: {
      approach: `Keep a sliding window defined by a left pointer and a set of characters currently inside it. As the right pointer extends the window, if the new character already appears inside, shrink from the left until the duplicate is gone. The window never contains repeats, so its length is always a candidate answer.

Each character enters and leaves the window at most once, giving O(n) time.`,
      complexity: { time: "O(n)", space: "O(min(n, alphabet))" },
      code: {
        python: `def lengthOfLongestSubstring(s: str) -> int:
    seen = set()
    left = 0
    best = 0
    for right, ch in enumerate(s):
        while ch in seen:
            seen.remove(s[left])
            left += 1
        seen.add(ch)
        best = max(best, right - left + 1)
    return best`,
        javascript: `function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
        typescript: `function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let left = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
        java: `class Solution {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> last = new HashMap<>();
        int best = 0, l = 0;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (last.containsKey(c) && last.get(c) >= l) l = last.get(c) + 1;
            last.put(c, r);
            best = Math.max(best, r - l + 1);
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        unordered_map<char, int> last;
        int best = 0, l = 0;
        for (int r = 0; r < (int)s.size(); r++) {
            char c = s[r];
            if (last.count(c) && last[c] >= l) l = last[c] + 1;
            last[c] = r;
            best = max(best, r - l + 1);
        }
        return best;
    }
};`,
      },
    },
  },
  {
    slug: "longest-repeating-character-replacement",
    title: "Longest Repeating Character Replacement",
    difficulty: "Medium",
    category: "sliding-window",
    topics: ["String", "Hash Table", "Sliding Window"],
    order: 3,
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You may perform this operation at most \`k\` times.

Return the length of the **longest substring** containing the same letter you can get after performing the above operations.`,
    examples: [
      { args: ["ABAB", 2], output: 4, explain: "Change the two 'A's to 'B's (or vice versa) to get \"BBBB\"." },
      { args: ["AABABBA", 1], output: 4, explain: "Change one 'A' in the middle to get \"AABBBBA\" (length 4)." },
    ],
    constraints: ["1 <= s.length <= 10^5", "s consists of only uppercase English letters.", "0 <= k <= s.length"],
    starter: {
      python: `def characterReplacement(s: str, k: int) -> int:
    pass
`,
      javascript: `function characterReplacement(s, k) {
    
}`,
      typescript: `function characterReplacement(s: string, k: number): number {
    
}`,
      java: `class Solution {
    public int characterReplacement(String s, int k) {
        
    }
}`,
      cpp: `class Solution {
public:
    int characterReplacement(string s, int k) {
        
    }
};`,
    },
    methodName: "characterReplacement",
    argTypes: ["string", "int"],
    outputType: "int",
    compare: "exact",
    visibleTests: [
      { args: ["ABAB", 2], output: 4 },
      { args: ["AABABBA", 1], output: 4 },
    ],
    hiddenTests: [
      { args: ["AAAA", 2], output: 4 },
      { args: ["ABCDE", 1], output: 2 },
      { args: ["BAAA", 0], output: 3 },
      { args: ["AAABBC", 2], output: 5 },
      { args: ["ABBB", 2], output: 4 },
      { args: ["AABA", 0], output: 2 },
    ],
    editorial: {
      approach: `In any window, the number of characters we must change to make it uniform is \`window length - (count of the most frequent character)\`. If that cost exceeds \`k\`, the window is invalid, so shrink from the left.

Track character counts with an array of size 26 and keep the maximum frequency seen. Since the window only ever shrinks when invalid, its valid length is maximized along the way — O(n) total.`,
      complexity: { time: "O(n)", space: "O(26)" },
      code: {
        python: `def characterReplacement(s: str, k: int) -> int:
    counts = {}
    left = 0
    max_freq = 0
    best = 0
    for right, ch in enumerate(s):
        counts[ch] = counts.get(ch, 0) + 1
        max_freq = max(max_freq, counts[ch])
        if (right - left + 1) - max_freq > k:
            counts[s[left]] -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,
        javascript: `function characterReplacement(s, k) {
  const counts = {};
  let left = 0, maxFreq = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    counts[s[right]] = (counts[s[right]] || 0) + 1;
    maxFreq = Math.max(maxFreq, counts[s[right]]);
    if (right - left + 1 - maxFreq > k) {
      counts[s[left]]--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
        typescript: `function characterReplacement(s: string, k: number): number {
  const counts: Record<string, number> = {};
  let left = 0, maxFreq = 0, best = 0;
  for (let right = 0; right < s.length; right++) {
    counts[s[right]] = (counts[s[right]] || 0) + 1;
    maxFreq = Math.max(maxFreq, counts[s[right]]);
    if (right - left + 1 - maxFreq > k) {
      counts[s[left]]--;
      left++;
    }
    best = Math.max(best, right - left + 1);
  }
  return best;
}`,
        java: `class Solution {
    public int characterReplacement(String s, int k) {
        int[] cnt = new int[26];
        int best = 0, maxFreq = 0, l = 0;
        for (int r = 0; r < s.length(); r++) {
            maxFreq = Math.max(maxFreq, ++cnt[s.charAt(r) - 'A']);
            if (r - l + 1 - maxFreq > k) cnt[s.charAt(l++) - 'A']--;
            best = Math.max(best, r - l + 1);
        }
        return best;
    }
}`,
        cpp: `class Solution {
public:
    int characterReplacement(string s, int k) {
        int cnt[26] = {};
        int best = 0, maxFreq = 0, l = 0;
        for (int r = 0; r < (int)s.size(); r++) {
            maxFreq = max(maxFreq, ++cnt[s[r] - 'A']);
            if (r - l + 1 - maxFreq > k) cnt[s[l++] - 'A']--;
            best = max(best, r - l + 1);
        }
        return best;
    }
};`,
      },
    },
  },
  {
    slug: "minimum-window-substring",
    title: "Minimum Window Substring",
    difficulty: "Hard",
    category: "sliding-window",
    topics: ["String", "Hash Table", "Sliding Window"],
    order: 4,
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the **minimum window substring** of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.

The test cases will be generated such that the answer is unique.`,
    examples: [
      { args: ["ADOBECODEBANC", "ABC"], output: "BANC", explain: "The smallest window containing A, B and C is \"BANC\"." },
      { args: ["a", "a"], output: "a" },
      { args: ["a", "aa"], output: "" },
    ],
    constraints: ["m == s.length", "n == t.length", "1 <= m, n <= 10^5", "s and t consist of uppercase and lowercase English letters."],
    starter: {
      python: `def minWindow(s: str, t: str) -> str:
    pass
`,
      javascript: `function minWindow(s, t) {
    
}`,
      typescript: `function minWindow(s: string, t: string): string {
    
}`,
      java: `class Solution {
    public String minWindow(String s, String t) {
        
    }
}`,
      cpp: `class Solution {
public:
    string minWindow(string s, string t) {
        
    }
};`,
    },
    methodName: "minWindow",
    argTypes: ["string", "string"],
    outputType: "string",
    compare: "exact",
    visibleTests: [
      { args: ["ADOBECODEBANC", "ABC"], output: "BANC" },
      { args: ["a", "a"], output: "a" },
      { args: ["a", "aa"], output: "" },
    ],
    hiddenTests: [
      { args: ["aa", "aa"], output: "aa" },
      { args: ["ab", "b"], output: "b" },
      { args: ["abc", "ac"], output: "abc" },
      { args: ["bba", "ab"], output: "ba" },
      { args: ["aabdec", "abc"], output: "abdec" },
      { args: ["abcdebdde", "bde"], output: "deb" },
      { args: ["ab", "a"], output: "a" },
    ],
    editorial: {
      approach: `Count the characters required by \`t\`. Slide a window over \`s\` with two pointers: expand the right pointer until the window contains every required character (tracked by how many requirements are still unmet), then shrink the left pointer while the window stays valid, recording the smallest valid window.

Each pointer moves at most m times, so the runtime is O(m + n).`,
      complexity: { time: "O(m + n)", space: "O(n)" },
      code: {
        python: `def minWindow(s: str, t: str) -> str:
    if not t:
        return ""
    need = {}
    for ch in t:
        need[ch] = need.get(ch, 0) + 1
    have = {}
    left = 0
    formed = 0
    required = len(need)
    best_start, best_len = 0, float("inf")
    for right, ch in enumerate(s):
        have[ch] = have.get(ch, 0) + 1
        if ch in need and have[ch] == need[ch]:
            formed += 1
        while formed == required:
            if right - left + 1 < best_len:
                best_start, best_len = left, right - left + 1
            have[s[left]] -= 1
            if s[left] in need and have[s[left]] < need[s[left]]:
                formed -= 1
            left += 1
    return "" if best_len == float("inf") else s[best_start:best_start + best_len]`,
        javascript: `function minWindow(s, t) {
  if (!t) return "";
  const need = {};
  for (const ch of t) need[ch] = (need[ch] || 0) + 1;
  const have = {};
  let left = 0, formed = 0;
  const required = Object.keys(need).length;
  let bestStart = 0, bestLen = Infinity;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    have[ch] = (have[ch] || 0) + 1;
    if (need[ch] && have[ch] === need[ch]) formed++;
    while (formed === required) {
      if (right - left + 1 < bestLen) {
        bestStart = left;
        bestLen = right - left + 1;
      }
      have[s[left]]--;
      if (need[s[left]] && have[s[left]] < need[s[left]]) formed--;
      left++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
}`,
        typescript: `function minWindow(s: string, t: string): string {
  if (!t) return "";
  const need: Record<string, number> = {};
  for (const ch of t) need[ch] = (need[ch] || 0) + 1;
  const have: Record<string, number> = {};
  let left = 0, formed = 0;
  const required = Object.keys(need).length;
  let bestStart = 0, bestLen = Infinity;
  for (let right = 0; right < s.length; right++) {
    const ch = s[right];
    have[ch] = (have[ch] || 0) + 1;
    if (need[ch] && have[ch] === need[ch]) formed++;
    while (formed === required) {
      if (right - left + 1 < bestLen) {
        bestStart = left;
        bestLen = right - left + 1;
      }
      have[s[left]]--;
      if (need[s[left]] && have[s[left]] < need[s[left]]) formed--;
      left++;
    }
  }
  return bestLen === Infinity ? "" : s.slice(bestStart, bestStart + bestLen);
}`,
        java: `class Solution {
    public String minWindow(String s, String t) {
        int[] need = new int[128];
        for (char c : t.toCharArray()) need[c]++;
        int have = 0, required = t.length();
        int l = 0, bestL = 0, bestLen = Integer.MAX_VALUE;
        for (int r = 0; r < s.length(); r++) {
            char c = s.charAt(r);
            if (need[c] > 0) have++;
            need[c]--;
            while (have == required) {
                if (r - l + 1 < bestLen) {
                    bestLen = r - l + 1;
                    bestL = l;
                }
                char cl = s.charAt(l);
                need[cl]++;
                if (need[cl] > 0) have--;
                l++;
            }
        }
        return bestLen == Integer.MAX_VALUE ? "" : s.substring(bestL, bestL + bestLen);
    }
}`,
        cpp: `class Solution {
public:
    string minWindow(string s, string t) {
        int need[128] = {};
        for (char c : t) need[c]++;
        int have = 0, required = t.size();
        int l = 0, bestL = 0, bestLen = INT_MAX;
        for (int r = 0; r < (int)s.size(); r++) {
            char c = s[r];
            if (need[c] > 0) have++;
            need[c]--;
            while (have == required) {
                if (r - l + 1 < bestLen) {
                    bestLen = r - l + 1;
                    bestL = l;
                }
                char cl = s[l];
                need[cl]++;
                if (need[cl] > 0) have--;
                l++;
            }
        }
        return bestLen == INT_MAX ? "" : s.substr(bestL, bestLen);
    }
};`,
      },
    },
  },
];
