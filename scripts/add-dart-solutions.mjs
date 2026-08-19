#!/usr/bin/env node
/**
 * Adds Dart starter and editorial code to all problem files.
 * Uses line-by-line processing for reliability.
 */
import fs from 'fs';
import path from 'path';

const PROBLEMS_DIR = path.resolve('src/lib/data/problems');

// Convert Java type to Dart type
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

// Extract method signature from Java code
function extractJavaSignature(javaCode) {
  const m = javaCode.match(/public\s+(\S+)\s+(\w+)\(([^)]*)\)/);
  if (!m) return null;
  return {
    returnType: javaTypeToDart(m[1]),
    methodName: m[2],
    rawParams: m[3].trim()
  };
}

// Convert Java params to Dart
function paramsToDart(rawParams) {
  if (!rawParams) return '';
  return rawParams.split(',').map(p => {
    const parts = p.trim().split(/\s+/);
    if (parts.length < 2) return p.trim();
    const javaType = parts.slice(0, -1).join(' ');
    const name = parts[parts.length - 1];
    return `${javaTypeToDart(javaType)} ${name}`;
  }).join(', ');
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
  d = d.replace(/Set<Character>/g, 'Set<String>');
  d = d.replace(/int\[\]\[\]/g, 'List<List<int>>');
  d = d.replace(/int\[\]/g, 'List<int>');
  d = d.replace(/String\[\]/g, 'List<String>');
  d = d.replace(/boolean\[\]/g, 'List<bool>');
  d = d.replace(/char\[\]/g, 'List<String>');
  d = d.replace(/char\[\]\[\]/g, 'List<List<String>>');
  d = d.replace(/\bboolean\b/g, 'bool');
  d = d.replace(/\bchar\b/g, 'String');
  
  // Collections constructors
  d = d.replace(/new HashSet<>/g, '{}');
  d = d.replace(/new HashMap<>/g, '{}');
  d = d.replace(/new ArrayList<>/g, '[]');
  d = d.replace(/new LinkedList<>/g, '[]');
  d = d.replace(/new PriorityQueue<>\([^)]*\)/g, '[]'); // Manual fix needed
  
  // Static methods
  d = d.replace(/Arrays\.sort\((\w+)\)/g, '$1.sort()');
  d = d.replace(/Collections\.sort\((\w+)\)/g, '$1.sort()');
  d = d.replace(/Collections\.reverse\((\w+)\)/g, '$1 = $1.reversed.toList()');
  d = d.replace(/Math\.max\(/g, 'max(');
  d = d.replace(/Math\.min\(/g, 'min(');
  d = d.replace(/Math\.abs\(/g, 'abs(');
  d = d.replace(/Math\.sqrt\(/g, 'sqrt(');
  d = d.replace(/Math\.PI/g, 'pi');
  d = d.replace(/System\.out\.println\(/g, 'print(');
  d = d.replace(/System\.out\.print\(/g, 'print(');
  d = d.replace(/Integer\.parseInt\(([^)]+)\)/g, 'int.parse($1)');
  d = d.replace(/Integer\.toString\(([^)]+)\)/g, '$1.toString()');
  d = d.replace(/String\.valueOf\(([^)]+)\)/g, '$1.toString()');
  
  // Array creation
  d = d.replace(/new int\[\]\{([^}]+)\}/g, '[$1]');
  d = d.replace(/new int\[(\w+)\]/g, 'List.filled($1, 0)');
  d = d.replace(/new boolean\[(\w+)\]/g, 'List.filled($1, false)');
  d = d.replace(/new String\[(\w+)\]/g, 'List.filled($1, "")');
  
  // For loops
  d = d.replace(/for \(int (\w+) = 0; (\w+) < (\w+); (\w+)\+\+\)/g,
    'for (var $1 = 0; $1 < $3; $1++)');
  d = d.replace(/for \(int (\w+) = (\d+); (\w+) (<|<=) (\w+); (\w+)\+\+\)/g,
    'for (var $1 = $2; $1 $4 $3; $1++)');
  d = d.replace(/for \((?:final )?(\w+) (\w+) : (\w+)\)/g, 'for (var $2 in $3)');
  
  // String/List methods
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
  
  // Remove new keyword
  d = d.replace(/\bnew\s+/g, '');
  
  return d.trim();
}

// Process a single file
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip if already has dart
  if (content.includes('dart:')) return { status: 'skipped' };
  
  const lines = content.split('\n');
  const result = [];
  let i = 0;
  let javaCode = null;
  let javaSignature = null;
  let dartStarter = null;
  
  while (i < lines.length) {
    const line = lines[i];
    
    // Capture Java starter code
    const javaStartMatch = line.match(/java: `(class Solution \{)/);
    if (javaStartMatch) {
      // Collect the full Java code block
      let javaBlock = line;
      if (!line.includes('`,')) {
        i++;
        while (i < lines.length) {
          javaBlock += '\n' + lines[i];
          if (lines[i].includes('`,')) break;
          i++;
        }
      }
      
      // Extract the code between backticks
      const codeMatch = javaBlock.match(/java: `([\s\S]*?)`/);
      if (codeMatch) {
        javaCode = codeMatch[1];
        javaSignature = extractJavaSignature(javaCode);
        if (javaSignature) {
          dartStarter = `class Solution {\n  ${javaSignature.returnType} ${javaSignature.methodName}(${paramsToDart(javaSignature.rawParams)}) {\n    \n  }\n}`;
        }
      }
    }
    
    // Capture Java editorial code
    const javaEditorialMatch = line.match(/java: `(class Solution \{)/);
    if (javaEditorialMatch && !line.includes('public ')) {
      // This might be in editorial block - collect it
      let javaBlock = line;
      if (!line.endsWith('`,')) {
        i++;
        while (i < lines.length) {
          javaBlock += '\n' + lines[i];
          if (lines[i].endsWith('`,')) break;
          i++;
        }
      }
      
      const codeMatch = javaBlock.match(/java: `([\s\S]*?)`/);
      if (codeMatch) {
        javaCode = codeMatch[1];
      }
    }
    
    // After a cpp: line in a starter block, insert dart:
    const cppMatch = line.match(/^(\s*)cpp: `(.*)`/);
    if (cppMatch && dartStarter) {
      result.push(line);
      
      // Check if the next line closes the starter block or has another language
      const nextLine = lines[i + 1];
      if (nextLine && (nextLine.includes('},') || nextLine.trim() === '},')) {
        // This is the last entry in the starter block - add dart before closing
        const indent = cppMatch[1];
        result.push(`${indent}dart: \`${dartStarter}\`,`);
      } else if (nextLine && nextLine.match(/^\s*\w+:/)) {
        // There's another language entry after this - add dart before it
        // Actually, cpp is usually the last, so add after it
        const indent = cppMatch[1];
        result.push(`${indent}dart: \`${dartStarter}\`,`);
      }
      
      dartStarter = null; // Only add once per problem
      i++;
      continue;
    }
    
    result.push(line);
    i++;
  }
  
  const newContent = result.join('\n');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent);
    return { status: 'updated' };
  }
  return { status: 'unchanged' };
}

// Better approach: use regex to find and replace patterns
function processFileSimple(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip if already has dart
  if (content.includes('dart:')) return { status: 'skipped' };
  
  // Find all Java signatures in the file (both starter and editorial)
  const javaSignatures = [];
  const javaPattern = /java: `(class Solution \{[\s\S]*?public\s+(\S+)\s+(\w+)\(([^)]*)\)[\s\S]*?\})`/g;
  let m;
  while ((m = javaPattern.exec(content)) !== null) {
    javaSignatures.push({
      full: m[1],
      returnType: javaTypeToDart(m[2]),
      methodName: m[3],
      rawParams: m[4].trim()
    });
  }
  
  if (javaSignatures.length === 0) return { status: 'error', msg: 'No Java signatures found' };
  
  // For each problem, we need the first Java signature (from starter)
  // Group signatures by methodName to deduplicate
  const seen = new Set();
  const starterSigs = [];
  for (const sig of javaSignatures) {
    if (!seen.has(sig.methodName)) {
      seen.add(sig.methodName);
      starterSigs.push(sig);
    }
  }
  
  // Now, for each starter block, find the cpp: entry and add dart: after it
  // Strategy: find `cpp: \`...\`,` in starter blocks and insert dart: line
  
  let result = content;
  
  for (const sig of starterSigs) {
    const dartCode = `class Solution {\n  ${sig.returnType} ${sig.methodName}(${paramsToDart(sig.rawParams)}) {\n    \n  }\n}`;
    
    // Find the cpp: line for this method in the starter block
    // The starter block contains: python, javascript, typescript, java, cpp
    // We need to find the cpp: that's followed by the starter closing brace
    
    // Look for pattern: cpp: `...` followed by newline and then `},`
    const cppPattern = new RegExp(
      `(cpp: \`[^\`]*\`)(\\s*,\\n)(\\s*\\},)`,
      'g'
    );
    
    let found = false;
    result = result.replace(cppPattern, (match, cpp, comma, closing) => {
      if (found) return match; // Only replace first occurrence per method
      found = true;
      const indent = closing.match(/^(\s*)/)[1];
      return `${cpp},\n${indent}dart: \`${dartCode}\`,\n${closing}`;
    });
    
    if (!found) {
      // Try alternative pattern - cpp might not have trailing comma
      const altPattern = new RegExp(
        `(cpp: \`[^\`]*\`)(\\n)(\\s*\\},)`,
        'g'
      );
      result = result.replace(altPattern, (match, cpp, nl, closing) => {
        if (found) return match;
        found = true;
        const indent = closing.match(/^(\s*)/)[1];
        return `${cpp},\n${indent}dart: \`${dartCode}\`,\n${closing}`;
      });
    }
  }
  
  // Also add dart editorial solutions
  // Find editorial code blocks with Java and add Dart after cpp
  for (const sig of starterSigs) {
    // Find the Java editorial code for this method
    const javaEditorialPattern = new RegExp(
      `java: \`(class Solution \\{[\\s\\S]*?public\\s+${sig.returnType.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+${sig.methodName}\\([\\s\\S]*?\\})\``,
      'g'
    );
    
    const editorialMatch = javaEditorialPattern.exec(content);
    if (!editorialMatch) continue;
    
    const dartEditorial = javaToDart(editorialMatch[1]);
    const escapedDart = dartEditorial.replace(/`/g, '\\`');
    
    // Find the cpp editorial entry and add dart after it
    const editorialCppPattern = new RegExp(
      `(cpp: \`[^\`]*${sig.methodName}[^\`]*\`)(\\s*,\\n)(\\s*\\},)`,
      'g'
    );
    
    let editorialFound = false;
    result = result.replace(editorialCppPattern, (match, cpp, comma, closing) => {
      if (editorialFound) return match;
      editorialFound = true;
      const indent = closing.match(/^(\s*)/)[1];
      return `${cpp},\n${indent}dart: \`${escapedDart}\`,\n${closing}`;
    });
  }
  
  if (result !== content) {
    fs.writeFileSync(filePath, result);
    return { status: 'updated' };
  }
  return { status: 'unchanged' };
}

console.log('Adding Dart solutions to all problem files...\n');

const files = fs.readdirSync(PROBLEMS_DIR)
  .filter(f => f.endsWith('.ts') && f !== 'index.ts')
  .sort()
  .map(f => path.join(PROBLEMS_DIR, f));

let stats = { skipped: 0, updated: 0, errors: 0, unchanged: 0 };

for (const file of files) {
  const result = processFileSimple(file);
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
    case 'error':
      console.log(`  ERROR: ${name} - ${result.msg}`);
      stats.errors++;
      break;
    default:
      console.log(`  UNCHANGED: ${name}`);
      stats.unchanged++;
  }
}

console.log(`\nDone! Updated: ${stats.updated}, Skipped: ${stats.skipped}, Unchanged: ${stats.unchanged}, Errors: ${stats.errors}`);
