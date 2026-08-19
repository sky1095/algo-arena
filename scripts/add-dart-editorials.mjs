#!/usr/bin/env node
/**
 * Adds Dart editorial solutions by translating Python editorial code.
 * Handles Python-specific constructs: tuple unpacking, range(), etc.
 */
import fs from 'fs';
import path from 'path';

const PROBLEMS_DIR = path.resolve('src/lib/data/problems');

function extractBacktick(str, idx) {
  if (str[idx] !== '`') return null;
  for (let i = idx + 1; i < str.length; i++) {
    if (str[i] === '\\') { i++; continue; }
    if (str[i] === '`') return { content: str.substring(idx + 1, i), endIdx: i + 1 };
  }
  return null;
}

function pythonToDart(pyCode) {
  let d = pyCode;
  
  // Remove imports
  d = d.replace(/from typing import List\\n/g, '');
  d = d.replace(/from typing import.*\\n/g, '');
  
  // Convert function signatures
  // def name(params) -> returnType:\n
  d = d.replace(/def (\w+)\(([^)]*)\)\s*->\s*\w+:\s*\\n/g, (_, name, params) => {
    const dartParams = params.split(',').map(p => {
      p = p.trim();
      if (p.includes(': List[int]')) return 'List<int> ' + p.split(':')[0].trim();
      if (p.includes(': List[str]')) return 'List<String> ' + p.split(':')[0].trim();
      if (p.includes(': List[List[int]]')) return 'List<List<int>> ' + p.split(':')[0].trim();
      if (p.includes(': str')) return 'String ' + p.split(':')[0].trim();
      if (p.includes(': int')) return 'int ' + p.split(':')[0].trim();
      if (p.includes(': bool')) return 'bool ' + p.split(':')[0].trim();
      return 'dynamic ' + p;
    }).join(', ');
    return `${name}(${dartParams}) {\\n`;
  });
  
  // Convert nested function definitions
  d = d.replace(/def (\w+)\(([^)]*)\)\s*->\s*\w+:\s*\\n/g, (_, name, params) => {
    const dartParams = params.split(',').map(p => {
      p = p.trim();
      if (p.includes(': List[int]')) return 'List<int> ' + p.split(':')[0].trim();
      if (p.includes(': int')) return 'int ' + p.split(':')[0].trim();
      if (p.includes(': str')) return 'String ' + p.split(':')[0].trim();
      return 'dynamic ' + p;
    }).join(', ');
    return `${name}(${dartParams}) {\\n`;
  });
  
  // Handle tuple unpacking: a, b = expr1, expr2
  // Convert to: var _tmp = [expr1, expr2]; var a = _tmp[0]; var b = _tmp[1];
  d = d.replace(/(\w+), (\w+) = ([^\\]+)\\n/g, (match, a, b, expr) => {
    // Simple case: a, b = x, y
    const parts = expr.split(',').map(s => s.trim());
    if (parts.length === 2) {
      return `var ${a} = ${parts[0]}; var ${b} = ${parts[1]};\\n`;
    }
    return match; // Keep as-is if complex
  });
  
  // Handle for i in range(n)
  d = d.replace(/for (\w+) in range\((\w+)\):\s*\\n/g, 'for (var $1 = 0; $1 < $2; $1++) {\\n');
  // Handle for i in range(a, b)
  d = d.replace(/for (\w+) in range\((\w+), (\w+)\):\s*\\n/g, 'for (var $1 = $2; $1 < $3; $1++) {\\n');
  // Handle for i in range(a, b, step)
  d = d.replace(/for (\w+) in range\((\w+), (\w+), (\w+)\):\s*\\n/g, 'for (var $1 = $2; $1 < $3; $1 += $4) {\\n');
  
  // Handle for x in list
  d = d.replace(/for (\w+) in (\w+):\s*\\n/g, 'for (var $1 in $2) {\\n');
  
  // Handle for i, x in enumerate(list)
  d = d.replace(/for (\w+), (\w+) in enumerate\((\w+)\):\s*\\n/g, 'for (var $1 = 0; $1 < $3.length; $1++) {\\n');
  
  // Keywords
  d = d.replace(/\bNone\b/g, 'null');
  d = d.replace(/\bTrue\b/g, 'true');
  d = d.replace(/\bFalse\b/g, 'false');
  d = d.replace(/\bpass\b/g, '');
  d = d.replace(/\bself\b/g, 'this');
  d = d.replace(/\bnonlocal\b/g, '');
  
  // Collections
  d = d.replace(/\bset\(\)/g, '{}');
  d = d.replace(/\bdict\(\)/g, '{}');
  d = d.replace(/\blist\(\)/g, '[]');
  d = d.replace(/\[(\w+) for (\w+) in (\w+)\]/g, '$3.toList()');
  d = d.replace(/\[(\w+) for (\w+) in (\w+) if ([^\]]+)\]/g, '$3.where(($2) => $4).toList()');
  
  // List/Dict methods
  d = d.replace(/\.append\(/g, '.add(');
  d = d.replace(/\.extend\(/g, '.addAll(');
  d = d.replace(/\.pop\(\)/g, '.removeLast()');
  d = d.replace(/len\((\w+)\)/g, '$1.length');
  d = d.replace(/\.keys\(\)/g, '.keys');
  d = d.replace(/\.values\(\)/g, '.values');
  d = d.replace(/\.items\(\)/g, '.entries');
  d = d.replace(/\.get\(([^,)]+)(?:,\s*[^)]+)?\)/g, '[$1]');
  d = d.replace(/\.has_key\(([^)]+)\)/g, '.containsKey($1)');
  
  // String methods
  d = d.replace(/\.lower\(\)/g, '.toLowerCase()');
  d = d.replace(/\.upper\(\)/g, '.toUpperCase()');
  d = d.replace(/\.strip\(\)/g, '.trim()');
  d = d.replace(/\.split\(/g, '.split(');
  d = d.replace(/\.join\(/g, '.join(');
  d = d.replace(/\.replace\(/g, '.replaceAll(');
  d = d.replace(/\.find\(/g, '.indexOf(');
  d = d.replace(/\.isdigit\(\)/g, '.contains(RegExp(r\'[0-9]\'))');
  d = d.replace(/\.isalnum\(\)/g, '.contains(RegExp(r\'[a-zA-Z0-9]\'))');
  d = d.replace(/\.isalpha\(\)/g, '.contains(RegExp(r\'[a-zA-Z]\'))');
  
  // Math
  d = d.replace(/int\(([^)]+)\)/g, '$1.toInt()');
  
  // List slicing
  d = d.replace(/(\w+)\[(\d+):\]/g, '$1.sublist($2)');
  d = d.replace(/(\w+)\[:-(\d+)\]/g, '$1.sublist(0, $1.length - $2)');
  d = d.replace(/(\w+)\[(\d+):(\d+)\]/g, '$1.sublist($2, $3)');
  
  // Boolean operators
  d = d.replace(/\band\b/g, '&&');
  d = d.replace(/\bor\b/g, '||');
  d = d.replace(/\bnot\b/g, '!');
  
  // Indentation: Python uses 4 spaces, Dart uses 2
  // But since we're in a single line with \n, just reduce indentation
  d = d.replace(/\\\\n        /g, '\\\\n      ');  // 8 spaces → 6
  d = d.replace(/\\\\n    /g, '\\\\n  ');  // 4 spaces → 2
  
  // Clean up empty lines
  d = d.replace(/\\\\n\\\\n/g, '\\\\n');
  
  return d.trim();
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip if already has dart editorial code
  const editorialIdx = content.indexOf('editorial:');
  if (editorialIdx !== -1) {
    const afterEd = content.substring(editorialIdx);
    const codeIdx = afterEd.indexOf('code: {');
    if (codeIdx !== -1) {
      const afterCode = afterEd.substring(codeIdx);
      let depth = 0, endIdx = 0;
      for (let k = 0; k < afterCode.length; k++) {
        if (afterCode[k] === '{') depth++;
        if (afterCode[k] === '}') { depth--; if (depth === 0) { endIdx = k; break; } }
      }
      if (afterCode.substring(0, endIdx).includes('dart:')) return false;
    }
  }

  // Find python entries in editorial code blocks
  const entries = [];
  let searchFrom = 0;
  while (true) {
    const pyLabelIdx = content.indexOf('python: `', searchFrom);
    if (pyLabelIdx === -1) break;
    
    const before = content.substring(0, pyLabelIdx);
    const lastEd = before.lastIndexOf('editorial:');
    const lastCode = before.lastIndexOf('code: {');
    if (lastEd === -1 || lastCode === -1 || lastCode < lastEd) {
      searchFrom = pyLabelIdx + 9;
      continue;
    }
    
    const backtickIdx = pyLabelIdx + 8;
    const result = extractBacktick(content, backtickIdx);
    if (!result) { searchFrom = pyLabelIdx + 9; continue; }
    
    // Skip if it's just a starter (contains only 'pass')
    if (result.content.trim() === 'pass' || result.content.includes('\\n    pass\\n')) {
      searchFrom = result.endIdx;
      continue;
    }
    
    entries.push({
      pyCode: result.content,
      fullEnd: result.endIdx,
      idx: pyLabelIdx
    });
    searchFrom = result.endIdx;
  }

  if (entries.length === 0) return false;

  let result = content;
  for (let i = entries.length - 1; i >= 0; i--) {
    const e = entries[i];
    const dartCode = pythonToDart(e.pyCode);
    const escaped = dartCode.replace(/`/g, '\\`');

    const after = result.substring(e.fullEnd);
    const cppLabelIdx = after.indexOf('cpp: `');
    if (cppLabelIdx === -1) continue;
    
    const cppBacktickIdx = e.fullEnd + cppLabelIdx + 5;
    const cppResult = extractBacktick(result, cppBacktickIdx);
    if (!cppResult) continue;

    const insertPos = cppResult.endIdx;
    const lineStart = result.lastIndexOf('\n', e.fullEnd) + 1;
    const indent = result.substring(lineStart, e.fullEnd).match(/^(\s*)/)[1];
    
    const dartEntry = `\n${indent}dart: \`${escaped}\`,`;
    result = result.substring(0, insertPos) + dartEntry + result.substring(insertPos);
  }

  if (result !== content) {
    fs.writeFileSync(filePath, result);
    return true;
  }
  return false;
}

console.log('Adding Dart editorial solutions...\n');
const files = fs.readdirSync(PROBLEMS_DIR)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts')
  .sort()
  .map(f => path.join(PROBLEMS_DIR, f));

let updated = 0;
for (const file of files) {
  if (processFile(file)) {
    console.log(`  UPDATED: ${path.basename(file)}`);
    updated++;
  } else {
    console.log(`  SKIP: ${path.basename(file)}`);
  }
}
console.log(`\nDone! Updated ${updated}/${files.length} files.`);
