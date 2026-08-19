#!/usr/bin/env node
/**
 * Simple script to add Dart starter and editorial code to all problem files.
 * Strategy: For each problem, find the Java starter, extract signature, generate Dart.
 * Insert dart: line after each cpp: line in starter blocks and editorial code blocks.
 */
import fs from 'fs';
import path from 'path';

const PROBLEMS_DIR = path.resolve('src/lib/data/problems');

function javaTypeToDart(type) {
  return type
    .replace(/List<List<Integer>>/g, 'List<List<int>>')
    .replace(/List<Integer>/g, 'List<int>')
    .replace(/List<String>/g, 'List<String>')
    .replace(/Set<Integer>/g, 'Set<int>')
    .replace(/Set<String>/g, 'Set<String>')
    .replace(/Map<Integer,\s*Integer>/g, 'Map<int, int>')
    .replace(/Map<Integer,\s*List<Integer>>/g, 'Map<int, List<int>>')
    .replace(/Map<String,\s*Integer>/g, 'Map<String, int>')
    .replace(/Map<String,\s*String>/g, 'Map<String, String>')
    .replace(/int\[\]\[\]/g, 'List<List<int>>')
    .replace(/int\[\]/g, 'List<int>')
    .replace(/String\[\]/g, 'List<String>')
    .replace(/String\[\]\[\]/g, 'List<List<String>>')
    .replace(/boolean\[\]/g, 'List<bool>')
    .replace(/char\[\]/g, 'List<String>')
    .replace(/char\[\]\[\]/g, 'List<List<String>>')
    .replace(/double\[\]/g, 'List<double>')
    .replace(/ListNode\[\]/g, 'List<ListNode?>')
    .replace(/TreeNode\[\]/g, 'List<TreeNode?>')
    .replace(/\bListNode\b/g, 'ListNode?')
    .replace(/\bTreeNode\b/g, 'TreeNode?')
    .replace(/\bNode\b/g, 'Node?')
    .replace(/\bRandomListNode\b/g, 'RandomListNode?')
    .replace(/\bboolean\b/g, 'bool')
    .replace(/\bchar\b/g, 'String')
    .replace(/\bString\b/g, 'String')
    .replace(/\bint\b/g, 'int')
    .replace(/\bdouble\b/g, 'double')
    .replace(/\blong\b/g, 'int')
    .replace(/\bvoid\b/g, 'void');
}

// Translate Java editorial to Dart
function javaToDart(javaCode) {
  let d = javaCode;
  
  // Remove class wrapper
  d = d.replace(/class Solution \{\s*public\s+/, '');
  d = d.replace(/\}\s*$/, '');
  
  // Type replacements
  d = d.replace(/Map<Integer,\s*List<Integer>>/g, 'Map<int, List<int>>');
  d = d.replace(/Map<Integer,\s*Integer>/g, 'Map<int, int>');
  d = d.replace(/Map<String,\s*Integer>/g, 'Map<String, int>');
  d = d.replace(/Map<String,\s*String>/g, 'Map<String, String>');
  d = d.replace(/Map<String,\s*List<String>>/g, 'Map<String, List<String>>');
  d = d.replace(/Map<Character,\s*Integer>/g, 'Map<String, int>');
  d = d.replace(/List<List<Integer>>/g, 'List<List<int>>');
  d = d.replace(/List<List<String>>/g, 'List<List<String>>');
  d = d.replace(/List<Integer>/g, 'List<int>');
  d = d.replace(/List<String>/g, 'List<String>');
  d = d.replace(/Set<Integer>/g, 'Set<int>');
  d = d.replace(/Set<String>/g, 'Set<String>');
  d = d.replace(/int\[\]\[\]/g, 'List<List<int>>');
  d = d.replace(/int\[\]/g, 'List<int>');
  d = d.replace(/String\[\]/g, 'List<String>');
  d = d.replace(/boolean\[\]/g, 'List<bool>');
  d = d.replace(/char\[\]/g, 'List<String>');
  d = d.replace(/char\[\]\[\]/g, 'List<List<String>>');
  d = d.replace(/\bboolean\b/g, 'bool');
  d = d.replace(/\bchar\b/g, 'String');
  
  // Collections
  d = d.replace(/new HashSet<>/g, '{}');
  d = d.replace(/new HashMap<>/g, '{}');
  d = d.replace(/new ArrayList<>/g, '[]');
  d = d.replace(/new LinkedList<>/g, '[]');
  d = d.replace(/new PriorityQueue<>\([^)]*\)/g, '[]');
  
  // Static methods
  d = d.replace(/Arrays\.sort\((\w+)\)/g, '$1.sort()');
  d = d.replace(/Collections\.sort\((\w+)\)/g, '$1.sort()');
  d = d.replace(/Math\.max\(/g, 'max(');
  d = d.replace(/Math\.min\(/g, 'min(');
  d = d.replace(/Math\.abs\(/g, 'abs(');
  d = d.replace(/Math\.sqrt\(/g, 'sqrt(');
  d = d.replace(/System\.out\.println\(/g, 'print(');
  d = d.replace(/Integer\.parseInt\(([^)]+)\)/g, 'int.parse($1)');
  d = d.replace(/Integer\.toString\(([^)]+)\)/g, '$1.toString()');
  
  // Array creation
  d = d.replace(/new int\[\]\{([^}]+)\}/g, '[$1]');
  d = d.replace(/new int\[(\w+)\]/g, 'List.filled($1, 0)');
  d = d.replace(/new boolean\[(\w+)\]/g, 'List.filled($1, false)');
  
  // For loops
  d = d.replace(/for \(int (\w+) = 0; (\w+) < (\w+); (\w+)\+\+\)/g,
    'for (var $1 = 0; $1 < $3; $1++)');
  d = d.replace(/for \(int (\w+) = (\d+); (\w+) (<|<=) (\w+); (\w+)\+\+\)/g,
    'for (var $1 = $2; $1 $4 $3; $1++)');
  d = d.replace(/for \((?:final )?(\w+) (\w+) : (\w+)\)/g, 'for (var $2 in $3)');
  
  // Methods
  d = d.replace(/\.length\(\)/g, '.length');
  d = d.replace(/\.charAt\(([^)]+)\)/g, '[$1]');
  d = d.replace(/\.toCharArray\(\)/g, '.split("")');
  d = d.replace(/\.size\(\)/g, '.length');
  d = d.replace(/\.size\b/g, '.length');
  d = d.replace(/\.get\(([^)]+)\)/g, '[$1]');
  d = d.replace(/\.set\(([^,]+),\s*([^)]+)\)/g, '[$1] = $2');
  d = d.replace(/\.offer\(/g, '.add(');
  d = d.replace(/\.push\(/g, '.addFirst(');
  d = d.replace(/\.pop\(\)/g, '.removeFirst()');
  d = d.replace(/\.poll\(\)/g, '.removeAt(0)');
  d = d.replace(/\.peek\(\)/g, '.last');
  d = d.replace(/\.removeFirst\(\)/g, '.removeAt(0)');
  
  d = d.replace(/\bnew\s+/g, '');
  
  return d.trim();
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip if already has dart
  if (content.includes('dart:')) return { status: 'skipped' };
  
  const lines = content.split('\n');
  const result = [];
  
  // Track state
  let inStarter = false;
  let inEditorialCode = false;
  let braceDepth = 0;
  let javaStarterCode = null;
  let javaEditorialCode = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect starter block
    if (line.match(/^\s*starter:\s*\{/)) {
      inStarter = true;
      braceDepth = 1;
    }
    
    // Detect editorial code block
    if (line.match(/^\s*code:\s*\{/)) {
      inEditorialCode = true;
      braceDepth = 1;
    }
    
    // Track brace depth
    if (inStarter || inEditorialCode) {
      for (const ch of line) {
        if (ch === '{') braceDepth++;
        if (ch === '}') braceDepth--;
      }
      
      // End of block
      if (braceDepth <= 0) {
        inStarter = false;
        inEditorialCode = false;
      }
    }
    
    // Capture Java starter code (first one in starter block)
    if (inStarter && line.includes('java:') && !javaStarterCode) {
      // Extract the code between backticks
      const match = line.match(/java: `([\s\S]*?)`/);
      if (match) {
        javaStarterCode = match[1];
      } else {
        // Multi-line - collect until closing backtick
        let block = line;
        while (i + 1 < lines.length && !lines[i + 1].includes('`,')) {
          block += '\n' + lines[++i];
        }
        if (i + 1 < lines.length) block += '\n' + lines[++i];
        const m = block.match(/java: `([\s\S]*?)`/);
        if (m) javaStarterCode = m[1];
      }
    }
    
    // Capture Java editorial code
    if (inEditorialCode && line.includes('java:') && !javaEditorialCode) {
      const match = line.match(/java: `([\s\S]*?)`/);
      if (match) {
        javaEditorialCode = match[1];
      } else {
        let block = line;
        while (i + 1 < lines.length && !lines[i + 1].includes('`,')) {
          block += '\n' + lines[++i];
        }
        if (i + 1 < lines.length) block += '\n' + lines[++i];
        const m = block.match(/java: `([\s\S]*?)`/);
        if (m) javaEditorialCode = m[1];
      }
    }
    
    // After cpp: line in starter block, insert dart starter
    if (inStarter && line.trim().startsWith('cpp:')) {
      result.push(line);
      
      // Generate Dart starter from Java code
      if (javaStarterCode) {
        const sigMatch = javaStarterCode.match(/public\s+(\S+)\s+(\w+)\(([^)]*)\)/);
        if (sigMatch) {
          const dartReturn = javaTypeToDart(sigMatch[1]);
          const methodName = sigMatch[2];
          const rawParams = sigMatch[3].trim();
          const dartParams = rawParams ? rawParams.split(',').map(p => {
            const parts = p.trim().split(/\s+/);
            if (parts.length < 2) return p.trim();
            const javaType = parts.slice(0, -1).join(' ');
            const name = parts[parts.length - 1];
            return `${javaTypeToDart(javaType)} ${name}`;
          }).join(', ') : '';
          
          const dartStarter = `class Solution {\n  ${dartReturn} ${methodName}(${dartParams}) {\n    \n  }\n}`;
          const indent = line.match(/^(\s*)/)[1];
          result.push(`${indent}dart: \`${dartStarter}\`,`);
        }
      }
      
      javaStarterCode = null; // Reset for next problem
      continue;
    }
    
    // After cpp: line in editorial code block, insert dart editorial
    if (inEditorialCode && line.trim().startsWith('cpp:')) {
      result.push(line);
      
      // Generate Dart editorial from Java code
      if (javaEditorialCode) {
        const dartEditorial = javaToDart(javaEditorialCode);
        const escapedDart = dartEditorial.replace(/`/g, '\\`');
        const indent = line.match(/^(\s*)/)[1];
        result.push(`${indent}dart: \`${escapedDart}\`,`);
      }
      
      javaEditorialCode = null; // Reset for next problem
      continue;
    }
    
    result.push(line);
  }
  
  const newContent = result.join('\n');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    return { status: 'updated' };
  }
  return { status: 'unchanged' };
}

console.log('Adding Dart solutions to all problem files...\n');

const files = fs.readdirSync(PROBLEMS_DIR)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts')
  .sort()
  .map(f => path.join(PROBLEMS_DIR, f));

let stats = { skipped: 0, updated: 0, unchanged: 0 };

for (const file of files) {
  const result = processFile(file);
  const name = path.basename(file);
  
  switch (result.status) {
    case 'skipped':
      console.log(`  SKIP: ${name}`);
      stats.skipped++;
      break;
    case 'updated':
      console.log(`  UPDATED: ${name}`);
      stats.updated++;
      break;
    default:
      console.log(`  UNCHANGED: ${name}`);
      stats.unchanged++;
  }
}

console.log(`\nDone! Updated: ${stats.updated}, Skipped: ${stats.skipped}, Unchanged: ${stats.unchanged}`);
