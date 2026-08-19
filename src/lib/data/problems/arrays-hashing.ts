import type { Problem } from "@/lib/types";

export const arraysHashingProblems: Problem[] = [
  {
    slug: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "arrays-hashing",
    topics: ["Array", "Hash Set"],
    order: 1,
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { args: [[1, 2, 3, 1]], output: true, explain: "The value 1 appears twice." },
      { args: [[1, 2, 3, 4]], output: false, explain: "All elements are distinct." },
      { args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], output: true },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starter: {
      python: `from typing import List


def containsDuplicate(nums: List[int]) -> bool:
    pass
`,
      javascript: `function containsDuplicate(nums) {
    
}`,
      typescript: `function containsDuplicate(nums: number[]): boolean {
    
}`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        
    }
};`,
      dart: `class Solution {
  bool containsDuplicate(List<int> nums) {
    
  }
}`,
    },
    methodName: "containsDuplicate",
    argTypes: ["int[]"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 1]], output: true },
      { args: [[1, 2, 3, 4]], output: false },
      { args: [[1, 1, 1, 3, 3, 4, 3, 2, 4, 2]], output: true },
    ],
    hiddenTests: [
      { args: [[]], output: false },
      { args: [[42]], output: false },
      { args: [[7, 7]], output: true },
      { args: [[-1, 0, 1, 2, -1]], output: true },
      { args: [[10, 20, 30, 40, 50, 50]], output: true },
      { args: [[3, 2, 1, 0, -1, -2, -3, 1000000, -1000000]], output: false },
    ],
    editorial: {
      approach: `The brute-force approach compares every pair of elements in O(n^2) time, which is too slow for large inputs.

Instead, iterate over the array once and insert each element into a hash set. If an element is already in the set, we have found a duplicate and can return \`true\` immediately. Each lookup and insertion is O(1) on average, so the total time is O(n).`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def containsDuplicate(nums: List[int]) -> bool:
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
        javascript: `function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
        typescript: `function containsDuplicate(nums: number[]): boolean {
  const seen = new Set<number>();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}`,
        java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> seen = new HashSet<>();
        for (int n : nums) {
            if (!seen.add(n)) return true;
        }
        return false;
    }
}`,
        cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        unordered_set<int> seen;
        for (int n : nums) {
            if (seen.count(n)) return true;
            seen.insert(n);
        }
        return false;
    }
};`,
        dart: `bool containsDuplicate(List<int> nums) {
  final seen = <int>{};
  for (final n in nums) {
    if (!seen.add(n)) return true;
  }
  return false;
}`,
      },
    },
  },
  {
    slug: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "arrays-hashing",
    topics: ["String", "Hash Table"],
    order: 2,
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an **anagram** of \`s\`, and \`false\` otherwise.

An anagram is a word formed by rearranging the letters of another word, using all the original letters exactly once.`,
    examples: [
      { args: ["anagram", "nagaram"], output: true, explain: "Both strings use the letters a, a, g, n, r, m exactly once." },
      { args: ["rat", "car"], output: false, explain: "The strings share some letters but not all of them." },
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters."],
    starter: {
      python: `def isAnagram(s: str, t: str) -> bool:
    pass
`,
      javascript: `function isAnagram(s, t) {
    
}`,
      typescript: `function isAnagram(s: string, t: string): boolean {
    
}`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        
    }
};`,
      dart: `class Solution {
  bool isAnagram(String s, String t) {
    
  }
}`,
    },
    methodName: "isAnagram",
    argTypes: ["string", "string"],
    outputType: "bool",
    compare: "exact",
    visibleTests: [
      { args: ["anagram", "nagaram"], output: true },
      { args: ["rat", "car"], output: false },
    ],
    hiddenTests: [
      { args: ["a", "a"], output: true },
      { args: ["a", "b"], output: false },
      { args: ["", ""], output: true },
      { args: ["abc", "abcd"], output: false },
      { args: ["listen", "silent"], output: true },
      { args: ["aaabbb", "ababab"], output: true },
      { args: ["aaabbb", "aaabbbc"], output: false },
    ],
    editorial: {
      approach: `Two strings are anagrams exactly when they have the same character counts.

Count the frequency of each character in \`s\`, then decrement the counts as we scan \`t\`. If any count goes negative (or a character in \`t\` was never in \`s\`), the strings are not anagrams. If the lengths differ, they can never be anagrams, so return \`false\` immediately.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def isAnagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
    for ch in t:
        if ch not in counts or counts[ch] == 0:
            return False
        counts[ch] -= 1
    return True`,
        javascript: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const counts = {};
  for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of t) {
    if (!counts[ch]) return false;
    counts[ch]--;
  }
  return true;
}`,
        typescript: `function isAnagram(s: string, t: string): boolean {
  if (s.length !== t.length) return false;
  const counts: Record<string, number> = {};
  for (const ch of s) counts[ch] = (counts[ch] || 0) + 1;
  for (const ch of t) {
    if (!counts[ch]) return false;
    counts[ch]--;
  }
  return true;
}`,
        java: `class Solution {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        int[] cnt = new int[26];
        for (char c : s.toCharArray()) cnt[c - 'a']++;
        for (char c : t.toCharArray()) {
            if (--cnt[c - 'a'] < 0) return false;
        }
        return true;
    }
}`,
        cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.size()) return false;
        int cnt[26] = {};
        for (char c : s) cnt[c - 'a']++;
        for (char c : t) if (--cnt[c - 'a'] < 0) return false;
        return true;
    }
};`,
        dart: `bool isAnagram(String s, String t) {
  if (s.length != t.length) return false;
  final cnt = List.filled(26, 0);
  for (final c in s.codeUnits) cnt[c - 97]++;
  for (final c in t.codeUnits) {
    if (--cnt[c - 97] < 0) return false;
  }
  return true;
}`,
      },
    },
  },
  {
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "arrays-hashing",
    topics: ["Array", "Hash Table"],
    order: 3,
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input has **exactly one solution**, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      { args: [[2, 7, 11, 15], 9], output: [0, 1], explain: "nums[0] + nums[1] == 9, so we return [0, 1]." },
      { args: [[3, 2, 4], 6], output: [1, 2] },
      { args: [[3, 3], 6], output: [0, 1] },
    ],
    constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Exactly one valid answer exists."],
    starter: {
      python: `from typing import List


def twoSum(nums: List[int], target: int) -> List[int]:
    pass
`,
      javascript: `function twoSum(nums, target) {
    
}`,
      typescript: `function twoSum(nums: number[], target: number): number[] {
    
}`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
      dart: `class Solution {
  List<int> twoSum(List<int> nums, int target) {
    
  }
}`,
    },
    methodName: "twoSum",
    argTypes: ["int[]", "int"],
    outputType: "int[]",
    compare: "sorted",
    visibleTests: [
      { args: [[2, 7, 11, 15], 9], output: [0, 1] },
      { args: [[3, 2, 4], 6], output: [1, 2] },
      { args: [[3, 3], 6], output: [0, 1] },
    ],
    hiddenTests: [
      { args: [[1, 2, 3, 4, 5], 9], output: [3, 4] },
      { args: [[-3, 4, 3, 90], 0], output: [0, 2] },
      { args: [[0, 4, 3, 0], 0], output: [0, 3] },
      { args: [[-1, -2, -3, -4, -5], -8], output: [2, 4] },
      { args: [[10, 20, 30, 40, 50, 60, 70, 80, 90, 100], 190], output: [8, 9] },
    ],
    editorial: {
      approach: `A nested loop over every pair of indices costs O(n^2), which is too slow for large arrays.

The classic trick is a **complement lookup**: as we scan the array, the number we need to complete the pair with \`nums[i]\` is \`target - nums[i]\`. Store each value together with its index in a hash map. For every element, check whether its complement is already in the map — if so, we have found the pair.

Because we insert elements as we go, an element is never paired with itself.`,
      complexity: { time: "O(n)", space: "O(n)" },
      code: {
        python: `def twoSum(nums: List[int], target: int) -> List[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
        javascript: `function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement), i];
    seen.set(nums[i], i);
  }
  return [];
}`,
        typescript: `function twoSum(nums: number[], target: number): number[] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}`,
        java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) return new int[]{seen.get(need), i};
            seen.put(nums[i], i);
        }
        return new int[0];
    }
}`,
        cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int need = target - nums[i];
            if (seen.count(need)) return {seen[need], i};
            seen[nums[i]] = i;
        }
        return {};
    }
};`,
        dart: `List<int> twoSum(List<int> nums, int target) {
  final seen = <int, int>{};
  for (var i = 0; i < nums.length; i++) {
    final need = target - nums[i];
    if (seen.containsKey(need)) return [seen[need]!, i];
    seen[nums[i]] = i;
  }
  return [];
}`,
      },
    },
  },
  {
    slug: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "arrays-hashing",
    topics: ["Array", "Hash Table", "String"],
    order: 4,
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in **any order**.

Two strings are anagrams if one can be rearranged to form the other using all characters exactly once.`,
    examples: [
      {
        args: [["eat", "tea", "tan", "ate", "nat", "bat"]],
        output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
        explain: "The groups are formed by strings that use identical multisets of letters.",
      },
      { args: [[""]], output: [[""]] },
      { args: [["a"]], output: [["a"]] },
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100", "strs[i] consists of lowercase English letters."],
    starter: {
      python: `from typing import List


def groupAnagrams(strs: List[str]) -> List[List[str]]:
    pass
`,
      javascript: `function groupAnagrams(strs) {
    
}`,
      typescript: `function groupAnagrams(strs: string[]): string[][] {
    
}`,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        
    }
};`,
      dart: `class Solution {
  List<List<String>> groupAnagrams(List<String> strs) {
    
  }
}`,
    },
    methodName: "groupAnagrams",
    argTypes: ["string[]"],
    outputType: "string[][]",
    compare: "anyOrder",
    visibleTests: [
      { args: [["eat", "tea", "tan", "ate", "nat", "bat"]], output: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]] },
      { args: [[""]], output: [[""]] },
      { args: [["a"]], output: [["a"]] },
    ],
    hiddenTests: [
      { args: [["ab", "ba", "aab", "aba", "baa", "b"]], output: [["b"], ["ab", "ba"], ["aab", "aba", "baa"]] },
      { args: [["tea", "ate", "eat"]], output: [["tea", "ate", "eat"]] },
      { args: [["abc"]], output: [["abc"]] },
      { args: [["", "", ""]], output: [["", "", ""]] },
      { args: [["cab", "tin", "pew", "duh", "may", "ill", "buy", "bar", "max", "doc"]], output: [["max"], ["buy"], ["doc"], ["may"], ["ill"], ["duh"], ["tin"], ["bar"], ["pew"], ["cab"]] },
    ],
    editorial: {
      approach: `Every anagram of a word produces the same sorted form. So use the sorted word as a hash-map key and append each word to the bucket for its key.

Sorting each word costs O(k log k) where k is the word length. A slightly faster variant counts the 26 letters of each word and uses the count tuple as the key, which is O(k) per word.

Finally return all the buckets as a list of lists — the order of groups and of strings within a group does not matter.`,
      complexity: { time: "O(n * k log k)", space: "O(n * k)" },
      code: {
        python: `def groupAnagrams(strs: List[str]) -> List[List[str]]:
    groups = {}
    for s in strs:
        key = "".join(sorted(s))
        groups.setdefault(key, []).append(s)
    return list(groups.values())`,
        javascript: `function groupAnagrams(strs) {
  const groups = new Map();
  for (const s of strs) {
    const key = [...s].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(s);
  }
  return [...groups.values()];
}`,
        typescript: `function groupAnagrams(strs: string[]): string[][] {
  const groups = new Map<string, string[]>();
  for (const s of strs) {
    const key = [...s].sort().join("");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(s);
  }
  return [...groups.values()];
}`,
        java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        Map<String, List<String>> map = new HashMap<>();
        for (String s : strs) {
            char[] ca = s.toCharArray();
            Arrays.sort(ca);
            String key = new String(ca);
            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
        }
        return new ArrayList<>(map.values());
    }
}`,
        cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;
        for (string s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& [k, v] : map) res.push_back(v);
        return res;
    }
};`,
        dart: `List<List<String>> groupAnagrams(List<String> strs) {
  final groups = <String, List<String>>{};
  for (final s in strs) {
    final chars = s.split('')..sort();
    final key = chars.join();
    groups.putIfAbsent(key, () => []).add(s);
  }
  return groups.values.toList();
}`,
      },
    },
  },
  {
    slug: "top-k-frequent-elements",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "arrays-hashing",
    topics: ["Array", "Hash Table", "Heap"],
    order: 5,
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in **any order**.`,
    examples: [
      { args: [[1, 1, 1, 2, 2, 3], 2], output: [1, 2], explain: "1 appears three times and 2 appears twice, so both are returned." },
      { args: [[1], 1], output: [1] },
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4", "k is in the range [1, the number of unique elements in the array].", "It is guaranteed that the answer is unique."],
    starter: {
      python: `from typing import List


def topKFrequent(nums: List[int], k: int) -> List[int]:
    pass
`,
      javascript: `function topKFrequent(nums, k) {
    
}`,
      typescript: `function topKFrequent(nums: number[], k: number): number[] {
    
}`,
      java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        
    }
};`,
      dart: `class Solution {
  List<int> topKFrequent(List<int> nums, int k) {
    
  }
}`,
    },
    methodName: "topKFrequent",
    argTypes: ["int[]", "int"],
    outputType: "int[]",
    compare: "sorted",
    visibleTests: [
      { args: [[1, 1, 1, 2, 2, 3], 2], output: [1, 2] },
      { args: [[1], 1], output: [1] },
    ],
    hiddenTests: [
      { args: [[1, 2], 2], output: [1, 2] },
      { args: [[1, 1, 1, 2, 2, 2, 3, 3, 3], 1], output: [1] },
      { args: [[5, 5, 5, 5, 1, 1, 1, 2, 2, 3], 3], output: [5, 1, 2] },
      { args: [[-1, -1, -1, 0, 0, 1], 2], output: [-1, 0] },
      { args: [[3, 0, 1, 0], 1], output: [0] },
      { args: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3], output: [1, 2, 3] },
    ],
    editorial: {
      approach: `First count the frequency of each element with a hash map in O(n).

Then extract the top k. The simplest approach pushes every (frequency, value) pair into a max-heap and pops k times — O(n log n). A better approach uses a **min-heap of size k**: for each element, if the heap has fewer than k entries, push it; otherwise, if the current frequency is larger than the heap's minimum, pop the minimum and push the current one. This keeps the heap at size k, giving O(n log k) total.`,
      complexity: { time: "O(n log k)", space: "O(n)" },
      code: {
        python: `def topKFrequent(nums: List[int], k: int) -> List[int]:
    counts = {}
    for num in nums:
        counts[num] = counts.get(num, 0) + 1
    buckets = [[] for _ in range(len(nums) + 1)]
    for num, freq in counts.items():
        buckets[freq].append(num)
    result = []
    for freq in range(len(buckets) - 1, 0, -1):
        for num in buckets[freq]:
            result.append(num)
            if len(result) == k:
                return result
    return result`,
        javascript: `function topKFrequent(nums, k) {
  const counts = new Map();
  for (const num of nums) counts.set(num, (counts.get(num) || 0) + 1);
  const buckets = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of counts) buckets[freq].push(num);
  const result = [];
  for (let freq = buckets.length - 1; freq > 0 && result.length < k; freq--) {
    for (const num of buckets[freq]) {
      result.push(num);
      if (result.length === k) return result;
    }
  }
  return result;
}`,
        typescript: `function topKFrequent(nums: number[], k: number): number[] {
  const counts = new Map<number, number>();
  for (const num of nums) counts.set(num, (counts.get(num) || 0) + 1);
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [num, freq] of counts) buckets[freq].push(num);
  const result: number[] = [];
  for (let freq = buckets.length - 1; freq > 0 && result.length < k; freq--) {
    for (const num of buckets[freq]) {
      result.push(num);
      if (result.length === k) return result;
    }
  }
  return result;
}`,
        java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> cnt = new HashMap<>();
        for (int n : nums) cnt.merge(n, 1, Integer::sum);
        @SuppressWarnings("unchecked")
        List<Integer>[] buckets = new List[nums.length + 1];
        for (int i = 0; i < buckets.length; i++) buckets[i] = new ArrayList<>();
        for (var e : cnt.entrySet()) buckets[e.getValue()].add(e.getKey());
        int[] res = new int[k];
        int idx = 0;
        for (int i = buckets.length - 1; i >= 0 && idx < k; i--) {
            for (int n : buckets[i]) {
                res[idx++] = n;
                if (idx == k) break;
            }
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> cnt;
        for (int n : nums) cnt[n]++;
        vector<pair<int, int>> items(cnt.begin(), cnt.end());
        sort(items.begin(), items.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
            if (a.second != b.second) return a.second > b.second;
            return a.first < b.first;
        });
        vector<int> res;
        for (int i = 0; i < k; i++) res.push_back(items[i].first);
        return res;
    }
};`,
        dart: `List<int> topKFrequent(List<int> nums, int k) {
  final counts = <int, int>{};
  for (final n in nums) {
    counts[n] = (counts[n] ?? 0) + 1;
  }
  final entries = counts.entries.toList()
    ..sort((a, b) => b.value.compareTo(a.value));
  return entries.sublist(0, k).map((e) => e.key).toList();
}`,
      },
    },
  },
  {
    slug: "product-of-array-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "arrays-hashing",
    topics: ["Array", "Prefix Sum"],
    order: 6,
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

You must solve it **without using division** and in **O(n)** time.`,
    examples: [
      { args: [[1, 2, 3, 4]], output: [24, 12, 8, 6], explain: "For index 2, 1 * 2 * 4 = 8." },
      { args: [[-1, 1, 0, -3, 3]], output: [0, 0, 9, 0, 0], explain: "Zeros in the input produce zeros in every position except where the zero itself sits." },
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30", "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."],
    starter: {
      python: `from typing import List


def productExceptSelf(nums: List[int]) -> List[int]:
    pass
`,
      javascript: `function productExceptSelf(nums) {
    
}`,
      typescript: `function productExceptSelf(nums: number[]): number[] {
    
}`,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        
    }
};`,
      dart: `class Solution {
  List<int> productExceptSelf(List<int> nums) {
    
  }
}`,
    },
    methodName: "productExceptSelf",
    argTypes: ["int[]"],
    outputType: "int[]",
    compare: "exact",
    visibleTests: [
      { args: [[1, 2, 3, 4]], output: [24, 12, 8, 6] },
      { args: [[-1, 1, 0, -3, 3]], output: [0, 0, 9, 0, 0] },
    ],
    hiddenTests: [
      { args: [[0, 0]], output: [0, 0] },
      { args: [[1, 1]], output: [1, 1] },
      { args: [[2, 3, 5, 7]], output: [105, 70, 42, 30] },
      { args: [[-2, -3, -4]], output: [12, 8, 6] },
      { args: [[10, 20, 30, 40, 50]], output: [1200000, 600000, 400000, 300000, 240000] },
    ],
    editorial: {
      approach: `Division is forbidden, so we build the answer with two passes of **prefix products**.

In the first pass, walk left to right and store, at each position, the product of everything to its left. In the second pass, walk right to left while carrying the product of everything to the right, and multiply the two together.

This uses a single output array plus one running variable, achieving O(n) time and O(1) extra space.`,
      complexity: { time: "O(n)", space: "O(1)" },
      code: {
        python: `def productExceptSelf(nums: List[int]) -> List[int]:
    n = len(nums)
    answer = [1] * n
    prefix = 1
    for i in range(n):
        answer[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n - 1, -1, -1):
        answer[i] *= suffix
        suffix *= nums[i]
    return answer`,
        javascript: `function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  return answer;
}`,
        typescript: `function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const answer = new Array<number>(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  return answer;
}`,
        java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        int n = nums.length;
        int[] res = new int[n];
        res[0] = 1;
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
}`,
        cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        for (int i = 1; i < n; i++) res[i] = res[i - 1] * nums[i - 1];
        int right = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= right;
            right *= nums[i];
        }
        return res;
    }
};`,
        dart: `List<int> productExceptSelf(List<int> nums) {
  final n = nums.length;
  final res = List.filled(n, 1);
  for (var i = 1; i < n; i++) {
    res[i] = res[i - 1] * nums[i - 1];
  }
  var right = 1;
  for (var i = n - 1; i >= 0; i--) {
    res[i] *= right;
    right *= nums[i];
  }
  return res;
}`,
      },
    },
  },
];
